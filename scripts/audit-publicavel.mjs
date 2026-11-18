// Audita só as dependências de PRODUÇÃO dos pacotes publicáveis (web e native), isoladas do resto do monorepo.
// O `npm audit` da raiz mistura ferramentas de desenvolvimento (Expo, Jest, Storybook, Vite), que o consumidor não instala.
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const ler = (p) => JSON.parse(readFileSync(new URL(`../packages/${p}/package.json`, import.meta.url), 'utf8'))
const dependencies = {}
for (const pacote of ['web', 'native'])
  for (const [nome, versao] of Object.entries(ler(pacote).dependencies ?? {}))
    if (!nome.startsWith('@fluxo-oficina/')) dependencies[nome] = versao

const dir = mkdtempSync(join(tmpdir(), 'audit-publicavel-'))
writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'audit-publicavel', version: '0.0.0', private: true, dependencies }))
execFileSync('npm', ['install', '--package-lock-only', '--ignore-scripts', '--no-audit'], { cwd: dir, stdio: 'ignore' })
try {
  const saida = execFileSync('npm', ['audit', '--json'], { cwd: dir, encoding: 'utf8' })
  const total = JSON.parse(saida).metadata.vulnerabilities.total
  console.log(`${Object.keys(dependencies).length} dependências de produção auditadas, ${total} vulnerabilidade(s).`)
  process.exit(total ? 1 : 0)
} catch (e) {
  const total = JSON.parse(e.stdout ?? '{"metadata":{"vulnerabilities":{"total":-1}}}').metadata.vulnerabilities.total
  console.error(`${Object.keys(dependencies).length} dependências de produção auditadas, ${total} vulnerabilidade(s).`)
  process.exit(1)
}
