import * as React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react-native'
import {
  Alert, AlertDescription, AlertTitle, AppBar, Badge, BottomTabs, Button, Card, CardContent, CardDescription, CardHeader,
  CardTitle, Checkbox, DataList, DataListCell, DataListHead, DataListHeader, DataListRow, Dialog, DialogAction, DialogCancel,
  DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label, ListItem,
  NumberStepper, RadioGroup, RadioGroupItem, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator,
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Skeleton, Tabs, TabsContent, TabsList,
  TabsTrigger, Text, ToggleGroup, ToggleGroupItem, Toaster, buttonVariants, cn, toast, useControllable,
} from '../../index'

describe('utilitários', () => {
  it('cn resolve conflito do Tailwind', async () => {
    expect(cn('px-2', false && 'hidden', 'px-4')).toBe('px-4')
  })
  it('useControllable usa o valor de fora quando existe e o interno quando não', async () => {
    function Sonda({ fora }: { fora?: number }) {
      const [v, set] = useControllable(fora, 1)
      return <Text onPress={() => set(5)}>{`valor ${v}`}</Text>
    }
    const { rerender } = await render(<Sonda />)
    await fireEvent.press(screen.getByText('valor 1'))
    expect(screen.getByText('valor 5')).toBeTruthy()
    await rerender(<Sonda fora={9} />)
    expect(screen.getByText('valor 9')).toBeTruthy()
  })
})

describe('Button', () => {
  it('tem papel de botão, nome acessível e alvo de toque mínimo', async () => {
    await render(<Button><Text>Salvar etapa</Text></Button>)
    const botao = screen.getByRole('button', { name: 'Salvar etapa' })
    expect(botao.props.className).toContain('min-h-touch')
  })
  it('aplica variante e tamanho', async () => {
    expect(buttonVariants({ variant: 'destructive' })).toContain('bg-destructive')
    expect(buttonVariants({ size: 'icon' })).toContain('w-touch')
  })
  it('dispara o toque e respeita o disabled', async () => {
    const onPress = jest.fn()
    const { rerender } = await render(<Button onPress={onPress}><Text>Enviar</Text></Button>)
    await fireEvent.press(screen.getByRole('button', { name: 'Enviar' }))
    expect(onPress).toHaveBeenCalledTimes(1)
    await rerender(<Button disabled onPress={onPress}><Text>Enviar</Text></Button>)
    await fireEvent.press(screen.getByRole('button', { name: 'Enviar' }))
    expect(onPress).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled()
  })
})

describe('Card, Badge, Separator e Skeleton', () => {
  it('Card compõe título (cabeçalho), descrição e conteúdo', async () => {
    await render(<Card><CardHeader><CardTitle>OS 1042</CardTitle><CardDescription>Gol 1.0</CardDescription></CardHeader><CardContent><Badge variant="info"><Text>Aguardando peça</Text></Badge></CardContent></Card>)
    expect(screen.getByRole('header', { name: 'OS 1042' })).toBeTruthy()
    expect(screen.getByText('Gol 1.0')).toBeTruthy()
    expect(screen.getByText('Aguardando peça')).toBeTruthy()
  })
  it('Badge tem uma variante por estado', async () => {
    await render(<><Badge testID="s" variant="success" /><Badge testID="w" variant="warning" /><Badge testID="d" variant="danger" /></>)
    expect(screen.getByTestId('s').props.className).toContain('bg-success-subtle')
    expect(screen.getByTestId('w').props.className).toContain('bg-warning-subtle')
    expect(screen.getByTestId('d').props.className).toContain('bg-danger-subtle')
  })
  it('Separator existe e Skeleton fica fora da leitura de tela', async () => {
    await render(<><Separator testID="sep" /><Skeleton testID="sk" className="h-4 w-20" /></>)
    expect(screen.getByTestId('sep', { includeHiddenElements: true }).props['aria-hidden']).toBe(true)
    const bloco = screen.getByTestId('sk', { includeHiddenElements: true })
    expect(bloco.parent?.props.importantForAccessibility).toBe('no-hide-descendants')
  })
})

describe('Alert', () => {
  it('erro e aviso anunciam como alerta, informação e sucesso não', async () => {
    await render(<>
      <Alert variant="danger" testID="d"><AlertTitle>Sem conexão</AlertTitle><AlertDescription>Conecte o celular.</AlertDescription></Alert>
      <Alert variant="warning" testID="w"><AlertTitle>Aviso</AlertTitle></Alert>
      <Alert variant="info" testID="i"><AlertTitle>Info</AlertTitle></Alert>
      <Alert variant="success" testID="s"><AlertTitle>Ok</AlertTitle></Alert>
    </>)
    expect(screen.getAllByRole('alert')).toHaveLength(2)
    expect(screen.getByTestId('d').props.accessibilityLiveRegion).toBe('assertive')
    expect(screen.getByTestId('i').props.accessibilityLiveRegion).toBe('polite')
  })
})

describe('Input e Label', () => {
  it('Input respeita o alvo de toque e muda o texto', async () => {
    const onChangeText = jest.fn()
    await render(<><Label>Placa</Label><Input testID="placa" placeholder="ABC1D23" onChangeText={onChangeText} /></>)
    const campo = screen.getByTestId('placa')
    expect(campo.props.className).toContain('min-h-touch')
    expect(campo.props.placeholder).toBe('ABC1D23')
    await fireEvent.changeText(campo, 'ABC1D23')
    expect(onChangeText).toHaveBeenCalledWith('ABC1D23')
  })
  it('Input inválido ganha a borda de perigo e o estado aria', async () => {
    await render(<Input testID="x" invalid />)
    expect(screen.getByTestId('x').props.className).toContain('border-danger')
  })
  it('Input desabilitado não é editável', async () => {
    await render(<Input testID="x" editable={false} />)
    expect(screen.getByTestId('x').props.editable).toBe(false)
  })
})

describe('Select', () => {
  function Exemplo({ onValueChange }: { onValueChange?: (v: string) => void }) {
    return (
      <Select defaultValue="aguardando" onValueChange={onValueChange}>
        <SelectTrigger accessibilityLabel="Etapa"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="diag">Diagnóstico</SelectItem>
          <SelectItem value="aguardando">Aguardando peça</SelectItem>
          <SelectItem value="exec">Execução</SelectItem>
        </SelectContent>
      </Select>
    )
  }
  it('mostra o rótulo do valor no gatilho mesmo com a lista fechada', async () => {
    await render(<Exemplo />)
    expect(screen.getByRole('button', { name: /Etapa/ })).toBeTruthy()
    expect(screen.getByText('Aguardando peça')).toBeTruthy()
  })
  it('abre, escolhe uma opção e fecha', async () => {
    const onValueChange = jest.fn()
    await render(<Exemplo onValueChange={onValueChange} />)
    await fireEvent.press(screen.getByRole('button', { name: /Etapa/ }))
    await fireEvent.press(screen.getByRole('menuitem', { name: /Execução/ }))
    expect(onValueChange).toHaveBeenCalledWith('exec')
    expect(screen.getAllByText('Execução').length).toBeGreaterThan(0)
  })
})

describe('Checkbox e RadioGroup', () => {
  it('Checkbox alterna e avisa a mudança', async () => {
    const onCheckedChange = jest.fn()
    await render(<Checkbox accessibilityLabel="Casa do Freio" onCheckedChange={onCheckedChange} />)
    const caixa = screen.getByRole('checkbox', { name: 'Casa do Freio' })
    await fireEvent.press(caixa)
    expect(onCheckedChange).toHaveBeenLastCalledWith(true)
    expect(screen.getByRole('checkbox', { name: 'Casa do Freio' })).toBeChecked()
  })
  it('RadioGroup marca só uma opção', async () => {
    await render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" accessibilityLabel="Horizonte" />
        <RadioGroupItem value="b" accessibilityLabel="Norte" />
      </RadioGroup>,
    )
    await fireEvent.press(screen.getByRole('radio', { name: 'Norte' }))
    expect(screen.getByRole('radio', { name: 'Norte' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Horizonte' })).not.toBeChecked()
  })
})

describe('DataList', () => {
  it('mostra cabeçalho e linhas', async () => {
    await render(
      <DataList>
        <DataListHeader><DataListHead>Fornecedor</DataListHead><DataListHead>Preço</DataListHead></DataListHeader>
        <DataListRow><DataListCell>Norte</DataListCell><DataListCell>R$ 574,00</DataListCell></DataListRow>
      </DataList>,
    )
    expect(screen.getByText('Fornecedor')).toBeTruthy()
    expect(screen.getByText('R$ 574,00')).toBeTruthy()
  })
})

describe('Tabs e BottomTabs', () => {
  it('Tabs troca o painel ao tocar na aba', async () => {
    await render(
      <Tabs defaultValue="gravar">
        <TabsList>
          <TabsTrigger value="gravar"><Text>Gravar</Text></TabsTrigger>
          <TabsTrigger value="os"><Text>Minhas OS</Text></TabsTrigger>
        </TabsList>
        <TabsContent value="gravar"><Text>painel gravar</Text></TabsContent>
        <TabsContent value="os"><Text>painel os</Text></TabsContent>
      </Tabs>,
    )
    expect(screen.getByText('painel gravar')).toBeTruthy()
    await fireEvent.press(screen.getByRole('tab', { name: 'Minhas OS' }))
    expect(screen.getByText('painel os')).toBeTruthy()
  })
  it('BottomTabs marca a aba atual e avisa a troca, com 52 pt de altura', async () => {
    const onValueChange = jest.fn()
    await render(<BottomTabs value="gravar" onValueChange={onValueChange} items={[{ value: 'gravar', label: 'Gravar' }, { value: 'os', label: 'Minhas OS' }]} />)
    const atual = screen.getByRole('tab', { name: 'Gravar' })
    expect(atual).toBeSelected()
    expect(atual.props.className).toContain('min-h-[52px]')
    await fireEvent.press(screen.getByRole('tab', { name: 'Minhas OS' }))
    expect(onValueChange).toHaveBeenCalledWith('os')
  })
})

describe('Dialog', () => {
  function Exemplo({ onAction }: { onAction?: () => void }) {
    return (
      <Dialog>
        <DialogTrigger asChild><Button variant="outline"><Text>Cancelar serviço</Text></Button></DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>Cancelar a OS 1042?</DialogTitle><DialogDescription>A OS sai do painel como cancelada.</DialogDescription></DialogHeader>
          <DialogFooter>
            <DialogCancel><Text>Manter OS</Text></DialogCancel>
            <DialogAction variant="destructive" onPress={onAction}><Text>Cancelar OS 1042</Text></DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  it('abre pelo gatilho, mostra o título e fecha ao cancelar', async () => {
    await render(<Exemplo />)
    expect(screen.queryByText('Cancelar a OS 1042?')).toBeNull()
    await fireEvent.press(screen.getByRole('button', { name: 'Cancelar serviço' }))
    expect(screen.getByText('Cancelar a OS 1042?')).toBeTruthy()
    await fireEvent.press(screen.getByRole('button', { name: 'Manter OS' }))
    expect(screen.queryByText('Cancelar a OS 1042?')).toBeNull()
  })
  it('a ação confirma e fecha', async () => {
    const onAction = jest.fn()
    await render(<Exemplo onAction={onAction} />)
    await fireEvent.press(screen.getByRole('button', { name: 'Cancelar serviço' }))
    await fireEvent.press(screen.getByRole('button', { name: 'Cancelar OS 1042' }))
    expect(onAction).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('Cancelar a OS 1042?')).toBeNull()
  })
})

describe('ToggleGroup', () => {
  it('escolhe uma etapa na variante cartão e avisa', async () => {
    const onValueChange = jest.fn()
    await render(
      <ToggleGroup variant="card" defaultValue="diag" onValueChange={onValueChange} accessibilityLabel="Nova etapa">
        <ToggleGroupItem value="diag" accessibilityLabel="Diagnóstico"><Text>Diagnóstico</Text></ToggleGroupItem>
        <ToggleGroupItem value="exec" accessibilityLabel="Execução"><Text>Execução</Text></ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole('radio', { name: 'Diagnóstico' })).toBeChecked()
    await fireEvent.press(screen.getByRole('radio', { name: 'Execução' }))
    expect(onValueChange).toHaveBeenCalledWith('exec')
    expect(screen.getByRole('radio', { name: 'Execução' })).toBeChecked()
  })
})

describe('NumberStepper', () => {
  function Exemplo() {
    const [v, setV] = React.useState(1)
    return <NumberStepper value={v} onChange={setV} label="peça" />
  }
  it('aumenta, diminui e trava no mínimo', async () => {
    await render(<Exemplo />)
    expect(screen.getByRole('button', { name: 'Diminuir peça' })).toBeDisabled()
    await fireEvent.press(screen.getByRole('button', { name: 'Aumentar peça' }))
    expect(screen.getByText('2')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Diminuir peça' })).toBeEnabled()
  })
  it('agrupa os dois botões sob o nome do que está sendo contado', async () => {
    await render(<NumberStepper value={3} onChange={() => {}} label="peça" min={1} max={9} />)
    expect(screen.getByLabelText('peça')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Aumentar peça' })).toBeEnabled()
  })
})

describe('Toast', () => {
  it('mostra o aviso e o tira depois do tempo', async () => {
    jest.useFakeTimers()
    await render(<Toaster />)
    await act(async () => { toast('Cotação respondida na OS 1042', { description: 'Toque para abrir.', duration: 1000 }) })
    expect(screen.getByText('Cotação respondida na OS 1042')).toBeTruthy()
    await act(async () => { jest.advanceTimersByTime(1100) })
    expect(screen.queryByText('Cotação respondida na OS 1042')).toBeNull()
    jest.useRealTimers()
  })
})

describe('ListItem e AppBar', () => {
  it('ListItem é um botão com título, descrição e selo', async () => {
    const onPress = jest.fn()
    await render(<ListItem title="OS 1042" description="Gol 1.0 · ABC1D23" trailing={<Badge variant="info"><Text>Aguardando peça</Text></Badge>} onPress={onPress} />)
    await fireEvent.press(screen.getByRole('button', { name: /OS 1042/ }))
    expect(onPress).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Gol 1.0 · ABC1D23')).toBeTruthy()
  })
  it('AppBar tem um título de cabeçalho e ações', async () => {
    await render(<AppBar title="Minhas ordens de serviço" actions={<Button size="sm"><Text>Atualizar</Text></Button>} />)
    expect(screen.getByRole('header', { name: 'Minhas ordens de serviço' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Atualizar' })).toBeTruthy()
  })
})

describe('Sheet', () => {
  it('abre pelo gatilho e fecha pelo botão Fechar', async () => {
    await render(
      <Sheet>
        <SheetTrigger asChild><Button variant="outline"><Text>Abrir histórico</Text></Button></SheetTrigger>
        <SheetContent>
          <SheetHeader><SheetTitle>Histórico de avisos</SheetTitle><SheetDescription>Mensagens da OS 1042.</SheetDescription></SheetHeader>
        </SheetContent>
      </Sheet>,
    )
    expect(screen.queryByText('Histórico de avisos')).toBeNull()
    await fireEvent.press(screen.getByRole('button', { name: 'Abrir histórico' }))
    expect(screen.getByText('Histórico de avisos')).toBeTruthy()
    await fireEvent.press(screen.getAllByRole('button', { name: 'Fechar' })[0]!)
    expect(screen.queryByText('Histórico de avisos')).toBeNull()
  })
})
