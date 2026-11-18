// Servidor estático mínimo para o dist-web (SPA do Expo), sem dependências.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'dist-web')
const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.ttf': 'font/ttf', '.png': 'image/png', '.ico': 'image/x-icon' }
const porta = Number(process.env.PORT ?? 6008)

createServer(async (req, res) => {
  const caminho = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '')
  for (const alvo of [join(raiz, caminho), join(raiz, 'index.html')]) {
    try {
      if (!alvo.startsWith(raiz) || !(await stat(alvo)).isFile()) continue
      res.writeHead(200, { 'content-type': tipos[extname(alvo)] ?? 'application/octet-stream' })
      return res.end(await readFile(alvo))
    } catch { /* tenta o próximo */ }
  }
  res.writeHead(404).end('não encontrado')
}).listen(porta, '127.0.0.1', () => console.log(`dist-web em http://127.0.0.1:${porta}`))
