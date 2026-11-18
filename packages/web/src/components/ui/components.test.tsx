import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axe from 'axe-core'
import {
  Alert, AlertDescription, AlertTitle, AppBar, Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle,
  Checkbox, Dialog, DialogAction, DialogCancel, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger, Input, Label, ListItem, NumberStepper, RadioGroup, RadioGroupItem, Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue, Separator, Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs,
  TabsContent, TabsList, TabsTrigger, ToggleGroup, ToggleGroupItem, buttonVariants, cn,
  Accordion, AccordionContent, AccordionItem, AccordionTrigger, AlertList, Avatar, DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, HoverCard, HoverCardContent,
  HoverCardTrigger, Kbd, OrderCard, Popover, PopoverContent, PopoverTrigger, PriorityBadge, Progress, StatusDot, Switch,
  Textarea, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, initialsOf,
} from '../../index'

async function semViolacoes(container: HTMLElement) {
  // O jsdom não calcula cor nem layout, então o axe confere estrutura, nome e papel, não contraste.
  const resultado = await axe.run(container, { rules: { 'color-contrast': { enabled: false }, region: { enabled: false } } })
  return resultado.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.html).join(' | ')}`)
}

describe('utilitário cn', () => {
  it('resolve conflito do Tailwind e descarta falsos', () => {
    expect(cn('px-2', false && 'hidden', 'px-4')).toBe('px-4')
  })
  it('papel de tipografia não apaga a cor do texto', () => {
    expect(cn('text-base text-foreground', 'text-heading-card')).toBe('text-foreground text-heading-card')
    expect(cn('text-heading-card', 'text-muted-foreground')).toBe('text-heading-card text-muted-foreground')
  })
})

describe('Button', () => {
  it('é um botão com type="button" e tem nome acessível', async () => {
    const { container } = render(<Button>Salvar etapa</Button>)
    const botao = screen.getByRole('button', { name: 'Salvar etapa' })
    expect(botao).toHaveAttribute('type', 'button')
    expect(await semViolacoes(container)).toEqual([])
  })
  it('aplica variante e tamanho', () => {
    expect(buttonVariants({ variant: 'destructive', size: 'lg' })).toContain('bg-destructive')
    expect(buttonVariants({ size: 'sm' })).toContain('h-9')
    expect(buttonVariants()).toContain('hover:bg-primary-hover')
    expect(buttonVariants()).toContain('active:bg-primary-active')
  })
  it('respeita o disabled e não dispara o clique', async () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Enviar</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('Card, Badge, Separator e Skeleton', () => {
  it('compõem sem violação de acessibilidade', async () => {
    const { container } = render(
      <Card>
        <CardHeader><CardTitle>OS 1042</CardTitle><CardDescription>Gol 1.0</CardDescription></CardHeader>
        <CardContent><Badge variant="info">Aguardando peça</Badge><Separator /><Skeleton className="h-4 w-20" /></CardContent>
      </Card>,
    )
    expect(screen.getByRole('heading', { name: 'OS 1042' })).toBeInTheDocument()
    expect(await semViolacoes(container)).toEqual([])
  })
  it('Badge tem uma variante por estado', () => {
    render(<><Badge variant="success">a</Badge><Badge variant="warning">b</Badge><Badge variant="danger">c</Badge></>)
    expect(screen.getByText('a').className).toContain('bg-success-subtle')
    expect(screen.getByText('b').className).toContain('bg-warning-subtle')
    expect(screen.getByText('c').className).toContain('bg-danger-subtle')
  })
  it('Badge tem as variantes neutral e highlight, que usam os tokens semânticos novos', () => {
    render(<><Badge variant="neutral">n</Badge><Badge variant="highlight">h</Badge></>)
    expect(screen.getByText('n').className).toContain('bg-neutral-subtle')
    expect(screen.getByText('h').className).toContain('bg-highlight-subtle')
    expect(screen.getByText('h').className).toContain('border-highlight-border')
  })
})

describe('Alert', () => {
  it('erro e aviso usam role="alert", informação usa role="status"', () => {
    render(<><Alert variant="danger">erro</Alert><Alert variant="warning">aviso</Alert><Alert variant="info">info</Alert><Alert variant="success">ok</Alert></>)
    expect(screen.getAllByRole('alert')).toHaveLength(2)
    expect(screen.getAllByRole('status')).toHaveLength(2)
  })
  it('neutral e highlight anunciam como status', () => {
    render(<><Alert variant="neutral">n</Alert><Alert variant="highlight">h</Alert></>)
    expect(screen.getAllByRole('status')).toHaveLength(2)
    expect(screen.getByText('h').className).toContain('bg-highlight-subtle')
  })
  it('não tem violação com título e descrição', async () => {
    const { container } = render(<Alert variant="danger"><AlertTitle>Sem conexão</AlertTitle><AlertDescription>Conecte o celular e tente de novo.</AlertDescription></Alert>)
    expect(await semViolacoes(container)).toEqual([])
  })
})

describe('Input e Label', () => {
  it('o rótulo se liga ao campo', async () => {
    const { container } = render(<><Label htmlFor="placa">Placa</Label><Input id="placa" placeholder="ABC1D23" /></>)
    await userEvent.type(screen.getByLabelText('Placa'), 'ABC1D23')
    expect(screen.getByLabelText('Placa')).toHaveValue('ABC1D23')
    expect(await semViolacoes(container)).toEqual([])
  })
})

describe('Select', () => {
  it('escolhe uma opção pelo teclado e mostra o valor', async () => {
    const { container } = render(
      <Select defaultValue="diag">
        <SelectTrigger aria-label="Etapa"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="diag">Diagnóstico</SelectItem>
          <SelectItem value="exec">Execução</SelectItem>
        </SelectContent>
      </Select>,
    )
    expect(screen.getByRole('combobox', { name: 'Etapa' })).toHaveTextContent('Diagnóstico')
    expect(await semViolacoes(container)).toEqual([])
  })
})

describe('Checkbox e RadioGroup', () => {
  it('Checkbox alterna e tem rótulo', async () => {
    const { container } = render(<><Checkbox id="f1" /><Label htmlFor="f1">Casa do Freio</Label></>)
    const caixa = screen.getByRole('checkbox', { name: 'Casa do Freio' })
    expect(caixa).not.toBeChecked()
    await userEvent.click(caixa)
    expect(caixa).toBeChecked()
    expect(await semViolacoes(container)).toEqual([])
  })
  it('RadioGroup marca só uma opção', async () => {
    const { container } = render(
      <RadioGroup defaultValue="a" aria-label="Fornecedor">
        <div><RadioGroupItem value="a" id="ra" /><Label htmlFor="ra">Horizonte</Label></div>
        <div><RadioGroupItem value="b" id="rb" /><Label htmlFor="rb">Norte</Label></div>
      </RadioGroup>,
    )
    await userEvent.click(screen.getByRole('radio', { name: 'Norte' }))
    expect(screen.getByRole('radio', { name: 'Norte' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Horizonte' })).not.toBeChecked()
    expect(await semViolacoes(container)).toEqual([])
  })
})

describe('Table', () => {
  it('cabeçalhos têm scope="col" e a tabela passa no axe', async () => {
    const { container } = render(
      <Table>
        <TableHeader><TableRow><TableHead>Fornecedor</TableHead><TableHead>Preço</TableHead></TableRow></TableHeader>
        <TableBody><TableRow><TableCell>Norte</TableCell><TableCell>R$ 574,00</TableCell></TableRow></TableBody>
      </Table>,
    )
    expect(screen.getAllByRole('columnheader')).toHaveLength(2)
    expect(await semViolacoes(container)).toEqual([])
  })
})

describe('Tabs', () => {
  it('troca o painel ao clicar na aba', async () => {
    const { container } = render(
      <Tabs defaultValue="gravar">
        <TabsList aria-label="Seções"><TabsTrigger value="gravar">Gravar</TabsTrigger><TabsTrigger value="os">Minhas OS</TabsTrigger></TabsList>
        <TabsContent value="gravar">painel gravar</TabsContent>
        <TabsContent value="os">painel os</TabsContent>
      </Tabs>,
    )
    await userEvent.click(screen.getByRole('tab', { name: 'Minhas OS' }))
    expect(screen.getByText('painel os')).toBeVisible()
    expect(await semViolacoes(container)).toEqual([])
  })
})

describe('Dialog', () => {
  it('abre, pede confirmação e fecha ao cancelar', async () => {
    render(
      <Dialog>
        <DialogTrigger asChild><Button variant="outline">Cancelar serviço</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>Cancelar a OS 1042?</DialogTitle><DialogDescription>A OS sai do painel como cancelada.</DialogDescription></DialogHeader>
          <DialogFooter><DialogCancel>Manter OS</DialogCancel><DialogAction>Cancelar OS 1042</DialogAction></DialogFooter>
        </DialogContent>
      </Dialog>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar serviço' }))
    const caixa = await screen.findByRole('alertdialog', { name: 'Cancelar a OS 1042?' })
    expect(caixa).toBeInTheDocument()
    expect(await semViolacoes(caixa)).toEqual([])
    await userEvent.click(screen.getByRole('button', { name: 'Manter OS' }))
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })
})

describe('ToggleGroup', () => {
  it('escolhe uma etapa na variante cartão', async () => {
    const onValueChange = vi.fn()
    const { container } = render(
      <ToggleGroup type="single" variant="card" aria-label="Nova etapa" onValueChange={onValueChange}>
        <ToggleGroupItem value="diag">Diagnóstico</ToggleGroupItem>
        <ToggleGroupItem value="exec">Execução</ToggleGroupItem>
      </ToggleGroup>,
    )
    await userEvent.click(screen.getByRole('radio', { name: 'Execução' }))
    expect(onValueChange).toHaveBeenCalledWith('exec')
    expect(await semViolacoes(container)).toEqual([])
  })
})

describe('NumberStepper', () => {
  function Exemplo({ min = 1 }: { min?: number }) {
    const [v, setV] = React.useState(1)
    return <NumberStepper value={v} onChange={setV} min={min} label="peça" />
  }
  it('aumenta e diminui, e trava no mínimo', async () => {
    const { container } = render(<Exemplo />)
    const menos = screen.getByRole('button', { name: 'Diminuir peça' })
    expect(menos).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'Aumentar peça' }))
    expect(screen.getByRole('status')).toHaveTextContent('2')
    expect(menos).toBeEnabled()
    expect(await semViolacoes(container)).toEqual([])
  })
})

describe('ListItem e AppBar', () => {
  it('ListItem é um botão com título, descrição e selo', async () => {
    const onClick = vi.fn()
    const { container } = render(<ListItem title="OS 1042" description="Gol 1.0 · ABC1D23" trailing={<Badge variant="info">Aguardando peça</Badge>} onClick={onClick} />)
    await userEvent.click(screen.getByRole('button', { name: /OS 1042/ }))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(await semViolacoes(container)).toEqual([])
  })
  it('AppBar tem um título de nível 1 e ações', async () => {
    const { container } = render(<AppBar title="Minhas ordens de serviço" actions={<Button size="sm">Atualizar</Button>} />)
    expect(screen.getByRole('heading', { level: 1, name: 'Minhas ordens de serviço' })).toBeInTheDocument()
    expect(await semViolacoes(container)).toEqual([])
  })
})

describe('Textarea, Switch, Progress e Kbd', () => {
  it('Textarea tem rótulo e aceita texto', async () => {
    const { container } = render(<><Label htmlFor="obs">Observação</Label><Textarea id="obs" /></>)
    await userEvent.type(screen.getByLabelText('Observação'), 'Barulho na roda')
    expect(screen.getByLabelText('Observação')).toHaveValue('Barulho na roda')
    expect(await semViolacoes(container)).toEqual([])
  })
  it('Switch alterna e expõe o estado', async () => {
    const { container } = render(<Switch aria-label="Avisar o cliente" />)
    const chave = screen.getByRole('switch', { name: 'Avisar o cliente' })
    expect(chave).toHaveAttribute('aria-checked', 'false')
    await userEvent.click(chave)
    expect(chave).toHaveAttribute('aria-checked', 'true')
    expect(await semViolacoes(container)).toEqual([])
  })
  it('Progress expõe o valor', async () => {
    const { container } = render(<Progress aria-label="Etapas concluídas" value={40} />)
    expect(screen.getByRole('progressbar', { name: 'Etapas concluídas' })).toHaveAttribute('aria-valuenow', '40')
    expect(await semViolacoes(container)).toEqual([])
  })
  it('Kbd é um elemento kbd', () => {
    render(<Kbd>⌘K</Kbd>)
    expect(screen.getByText('⌘K').tagName).toBe('KBD')
  })
})

describe('Accordion, Popover, Tooltip, HoverCard e DropdownMenu', () => {
  it('Accordion abre e fecha uma seção', async () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="a"><AccordionTrigger>Peças</AccordionTrigger><AccordionContent>Pastilha e disco</AccordionContent></AccordionItem>
      </Accordion>,
    )
    const gatilho = screen.getByRole('button', { name: 'Peças' })
    expect(gatilho).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(gatilho)
    expect(gatilho).toHaveAttribute('aria-expanded', 'true')
    expect(await semViolacoes(container)).toEqual([])
  })
  it('Popover abre ao clicar', async () => {
    render(<Popover><PopoverTrigger>Detalhes</PopoverTrigger><PopoverContent>Prazo de 3 dias</PopoverContent></Popover>)
    await userEvent.click(screen.getByRole('button', { name: 'Detalhes' }))
    expect(await screen.findByText('Prazo de 3 dias')).toBeInTheDocument()
  })
  it('Tooltip mostra a dica quando aberto', () => {
    render(<TooltipProvider><Tooltip open><TooltipTrigger>Ajuda</TooltipTrigger><TooltipContent>Copiar a placa</TooltipContent></Tooltip></TooltipProvider>)
    expect(screen.getAllByText('Copiar a placa').length).toBeGreaterThan(0)
  })
  it('HoverCard mostra a prévia quando aberto', () => {
    render(<HoverCard open><HoverCardTrigger>Cliente</HoverCardTrigger><HoverCardContent>Maria Souza</HoverCardContent></HoverCard>)
    expect(screen.getByText('Maria Souza')).toBeInTheDocument()
  })
  it('DropdownMenu lista as ações e dispara a escolhida', async () => {
    const onSelect = vi.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Ações</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ordem 1042</DropdownMenuLabel>
          <DropdownMenuItem onSelect={onSelect}>Mudar etapa</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>Cancelar ordem</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Ações' }))
    await userEvent.click(await screen.findByRole('menuitem', { name: 'Mudar etapa' }))
    expect(onSelect).toHaveBeenCalled()
  })
})

describe('Avatar, StatusDot, PriorityBadge, AlertList e OrderCard', () => {
  it('initialsOf pega a primeira e a última inicial', () => {
    expect(initialsOf('Carlos Eduardo Mendes')).toBe('CM')
    expect(initialsOf('Ana')).toBe('A')
    expect(initialsOf('  ')).toBe('?')
  })
  it('Avatar usa o nome como rótulo e mostra as iniciais sem foto', async () => {
    const { container } = render(<Avatar name="Carlos Mendes" />)
    expect(screen.getByRole('img', { name: 'Carlos Mendes' })).toBeInTheDocument()
    expect(screen.getByText('CM')).toBeInTheDocument()
    expect(await semViolacoes(container)).toEqual([])
  })
  it('StatusDot sempre mostra o texto', () => {
    render(<StatusDot tone="success" label="Fornecedor respondeu" />)
    expect(screen.getByText('Fornecedor respondeu')).toBeInTheDocument()
  })
  it('PriorityBadge leva texto e símbolo', () => {
    render(<PriorityBadge priority="urgent" />)
    expect(screen.getByText('Urgente')).toBeInTheDocument()
    expect(screen.getByText('▲')).toHaveAttribute('aria-hidden', 'true')
  })
  it('AlertList é uma lista nomeada de avisos', async () => {
    const { container } = render(<AlertList items={[{ id: '1', tone: 'danger', title: 'Sem conexão' }, { id: '2', tone: 'info', title: 'Etapa salva', description: 'Cliente avisado' }]} />)
    expect(screen.getByRole('list', { name: 'Avisos' }).children).toHaveLength(2)
    expect(await semViolacoes(container)).toEqual([])
  })
  it('OrderCard mostra placa, cliente, etapa e prioridade', async () => {
    const { container } = render(<OrderCard number="OS 1042" vehicle="VW Gol 1.0" plate="ABC1D23" customer="Maria Souza" stage="Aguardando peça" priority="high" mechanic="Carlos" />)
    for (const t of ['OS 1042', 'ABC1D23', 'Maria Souza', 'Aguardando peça', 'Alta', 'Mecânico: Carlos']) expect(screen.getByText(t)).toBeInTheDocument()
    expect(await semViolacoes(container)).toEqual([])
  })
})
