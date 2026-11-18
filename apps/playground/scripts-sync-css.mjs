// Copia o global.css gerado pelo pacote de tokens para a raiz do app, onde o Metro o espera.
import { copyFileSync, existsSync } from 'node:fs'
const origem = new URL('../../packages/tokens/dist/global.css', import.meta.url)
if (!existsSync(origem)) throw new Error('Rode "npm run build -w @fluxo-oficina/tokens" antes.')
copyFileSync(origem, new URL('./global.css', import.meta.url))
console.log('global.css atualizado a partir de @fluxo-oficina/tokens')
