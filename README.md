# fluxo-oficina-ds

Design system do FluxoOficina para **web** (React, Tailwind 4) e **Expo** (React Native, NativeWind). Escrito do zero, com os componentes do [shadcn/ui](https://ui.shadcn.com) como base, tipografia sans serif (Inter) e tokens de cor próprios (azul-petróleo, âmbar e neutros frios).

| Pacote | O que é |
|---|---|
| [`@fluxo-oficina/tokens`](packages/tokens) | Fonte única de cor, tipografia, raio, espaço e toque. Gera CSS, Tailwind 4, preset Tailwind 3 (NativeWind) e tema TypeScript |
| [`@fluxo-oficina/web`](packages/web) | 20 componentes React web (shadcn/ui, Radix, CVA) |
| [`@fluxo-oficina/native`](packages/native) | 20 componentes React Native (NativeWind, rn-primitives), mesma API do web |
| [`apps/storybook`](apps/storybook) | Catálogo web, com teste de contraste no Chrome |
| [`apps/playground`](apps/playground) | App Expo com o catálogo nativo |

> Os pacotes ainda não estão publicados no npm. O escopo `@fluxo-oficina/*` precisa ser confirmado antes.

## Tokens

- **Cor:** petróleo (primária), âmbar (apoio), neutro frio, verde e vermelho, em escalas 50 a 950. Tokens semânticos no padrão do shadcn (`background`, `primary`, `muted`…), mais os estados `success`, `warning`, `danger` e `info`, cada um com `-foreground`, `-subtle` e `-border`. Temas claro e escuro.
- **Contraste:** `npm run contraste` confere 40 pares WCAG (texto ≥ 4,5:1, interface ≥ 3:1) e falha o build se um reprovar.
- **Tipografia:** Inter, pesos 400 a 700, escala `xs` a `3xl`, números tabulares em preço e prazo.
- **Toque:** alvo mínimo de 44 pt no nativo e 36 px no web.

## Matriz de paridade

Os dois pacotes usam os mesmos nomes de componente e as mesmas variantes. As diferenças estão na última coluna.

| # | Componente | Web | Nativo | Diferença |
|---|---|---|---|---|
| 1 | Button | sim | sim | Nativo usa `onPress` e `<Text>` como filho |
| 2 | Card | sim | sim | — |
| 3 | Badge | sim | sim | Nativo usa `<Text>` como filho |
| 4 | Alert | sim | sim | Nativo anuncia erro e aviso como `alert` |
| 5 | Input | sim | sim | Nativo ganha a prop `invalid` e a cor do placeholder pelo tema |
| 6 | Label | sim | sim | — |
| 7 | Select | sim | sim | Nativo abre a lista numa folha (`Modal`) e o nome acessível inclui o valor |
| 8 | Checkbox | sim | sim | — |
| 9 | RadioGroup | sim | sim | — |
| 10 | Table | `Table` | `DataList` | No celular a tabela vira lista de linhas e células |
| 11 | Tabs | `Tabs` | `Tabs` e `BottomTabs` | `BottomTabs` é a barra inferior do app |
| 12 | Dialog | sim | sim | Confirmação que não fecha ao tocar fora. Nativo usa `Modal` |
| 13 | ToggleGroup | sim | sim | Só `type="single"`, variantes `default` e `card` |
| 14 | NumberStepper | sim | sim | Grupo de dois botões, com rótulos acessíveis |
| 15 | Toast | `Toaster` e `toast` | `Toaster` e `toast` | Mesma chamada. Nativo usa módulo próprio |
| 16 | ListItem | sim | sim | — |
| 17 | AppBar | sim | sim | No aparelho, passe `className="pt-12"` para a área do entalhe |
| 18 | Sheet | sim | sim | Nativo sobe da borda inferior por padrão |
| 19 | Skeleton | sim | sim | — |
| 20 | Separator | sim | sim | — |

## Uso

**Web** (Tailwind 4):

```css
@import "tailwindcss";
@import "@fluxo-oficina/web/styles.css";
@source "../node_modules/@fluxo-oficina/web/dist";
```

```tsx
import { Button, Card, CardTitle } from '@fluxo-oficina/web'
```

**Expo** (NativeWind 4, Tailwind 3): use o preset no `tailwind.config.js` e o `global.css` gerado pelos tokens.

```js
// tailwind.config.js
module.exports = {
  content: ['./App.tsx', './src/**/*.{ts,tsx}', './node_modules/@fluxo-oficina/native/src/**/*.{ts,tsx}'],
  darkMode: 'class',
  presets: [require('@fluxo-oficina/native/tailwind-preset')],
}
```

```tsx
import { Button, Text } from '@fluxo-oficina/native'
<Button><Text>Salvar etapa</Text></Button>
```

A fonte Inter vem de `@expo-google-fonts/inter` (carregue os pesos 400, 500, 600 e 700 com `useFonts`). O `apps/playground` mostra a configuração completa.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run build` | Tokens, web, Storybook estático e `expo export` de iOS, Android e web |
| `npm test` | Testes de tokens, web (vitest com axe) e nativo (jest-expo) |
| `npm run test:browser` | Storybook estático no Chrome com axe e contraste ligados, nos dois temas |
| `npm run typecheck` | TypeScript em todos os pacotes |
| `npm run audit:publico` | `npm audit` só das dependências de produção dos pacotes publicáveis |

## O que foi verificado, e como

| Verificação | Resultado | Limite |
|---|---|---|
| Tokens: 40 pares de contraste, claro e escuro | passa | — |
| Web: 19 testes com axe no jsdom, typecheck e build | passa | O jsdom não mede cor |
| **Web: contraste no Chrome real**, 28 histórias × 2 temas, regra `color-contrast` ligada | passa, 0 violações | Desliga `region` (marco da página, do app) e `aria-hidden-focus` só no Select aberto (comportamento do Radix) |
| Controle negativo: o teste falha com texto de baixo contraste | passa | — |
| Nativo: 28 testes de componente (jest-expo), typecheck | passa | Testa papéis, nomes, toque e variantes, não a aparência |
| Nativo: `expo export` para iOS, Android e web | compila | Prova o bundle, não o comportamento |
| **Nativo: catálogo no Chrome via react-native-web**, axe com contraste, claro e escuro | passa, 0 violações | **Não é um aparelho** |
| **Nativo em aparelho real, simulador ou emulador** | **não verificado** | Esta máquina não tem simulador iOS nem emulador Android. Gestos, teclado, microfone e a fonte nativa ficam por conta de quem rodar `npx expo start` e abrir no Expo Go |

## Segurança

- `npm run audit:publico`: **0 vulnerabilidades** nas dependências de produção dos pacotes `web` e `native`, que são as que um consumidor instala.
- `npm audit` na raiz mostra avisos, todos em **ferramentas de desenvolvimento** (Expo, Jest, Storybook, Vite, tsup), e vêm de três avisos de origem:
  - **`picomatch`, `<= 4.0.7`, alto** ([GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf)): não há versão corrigida publicada, então o aviso se propaga para `vite`, `vitest`, `tsup`, `jest`, `metro` e `expo`. É um ReDoS ao interpretar padrões de glob, que aqui só vêm de arquivos do próprio repositório.
  - **`minimatch`, moderado** ([GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)) e **`glob`, moderado** ([GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4)): o `npm audit fix` só os resolveria baixando o Storybook para a versão 8.5.3, uma regressão que não vale a troca.
- Quando houver versão corrigida do `picomatch`, rode `npm update` e `npm audit` de novo.

## Origem e licenças

Escrito do zero. Usa o modelo do shadcn/ui e as bibliotecas listadas em [NOTICE](NOTICE). Licença [MIT](LICENSE).
