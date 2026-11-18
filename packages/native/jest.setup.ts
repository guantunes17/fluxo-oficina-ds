// O nativewind lê o esquema de cor do sistema. Nos testes ele é fixo em "light".
jest.mock('nativewind', () => ({
  useColorScheme: () => ({ colorScheme: 'light', setColorScheme: () => {}, toggleColorScheme: () => {} }),
  colorScheme: { set: () => {} },
}))
