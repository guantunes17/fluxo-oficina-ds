/** Telefone brasileiro: (11) 9000-0000 ou (11) 90000-0000. Aceita colar com ou sem formatação. */
export function maskTelefone(valor: string): string {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (!d) return ''
  const corte = d.length > 10 ? 7 : 6
  let r = `(${d.slice(0, 2)}`
  if (d.length > 2) r += `) ${d.slice(2, corte)}`
  if (d.length > corte) r += `-${d.slice(corte)}`
  return r
}

/** Placa antiga (ABC1234) ou Mercosul (ABC1D23): 7 caracteres, maiúsculas, sem hífen. */
export function maskPlaca(valor: string): string {
  return valor.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 7)
}
