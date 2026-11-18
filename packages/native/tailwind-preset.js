// Preset do Tailwind 3 para apps Expo que usam o @fluxo-oficina/native.
// Uso no tailwind.config.js do app: presets: [require('@fluxo-oficina/native/tailwind-preset')]
module.exports = {
  presets: [require('nativewind/preset'), require('@fluxo-oficina/tokens/tailwind-preset')],
}
