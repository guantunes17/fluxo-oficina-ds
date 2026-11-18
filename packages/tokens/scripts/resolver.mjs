// Resolve as referências {escala.passo} dos tokens semânticos para valores hexadecimais.
export function buscar(tokens, caminho) {
  const [escala, passo] = caminho.split('.')
  const valor = tokens.color?.[escala]?.[passo]
  if (!valor) throw new Error(`Referência de cor desconhecida: {${caminho}}`)
  return valor
}

export function resolverTema(tokens, tema) {
  const saida = {}
  for (const [nome, ref] of Object.entries(tokens.semantic[tema])) {
    const m = /^\{(.+)\}$/.exec(ref)
    saida[nome] = m ? buscar(tokens, m[1]) : ref
  }
  return saida
}
