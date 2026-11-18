// Servidor estático mínimo para o storybook-static, sem dependências.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'storybook-static')
const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png', '.ico': 'image/x-icon' }
const porta = Number(process.env.PORT ?? 6007)

createServer(async (req, res) => {
  try {
    let caminho = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '')
    if (caminho.endsWith('/')) caminho += 'index.html'
    const arquivo = join(raiz, caminho)
    if (!arquivo.startsWith(raiz) || !(await stat(arquivo)).isFile()) throw new Error('nao encontrado')
    res.writeHead(200, { 'content-type': tipos[extname(arquivo)] ?? 'application/octet-stream' })
    res.end(await readFile(arquivo))
  } catch {
    res.writeHead(404).end('não encontrado')
  }
}).listen(porta, '127.0.0.1', () => console.log(`storybook-static em http://127.0.0.1:${porta}`))
