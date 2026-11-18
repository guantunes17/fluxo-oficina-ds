import './global.css'
import * as React from 'react'
import { ScrollView, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { useFonts } from 'expo-font'
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular'
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium'
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold'
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold'
import {
  Alert, AlertDescription, AlertTitle, AppBar, Badge, BottomTabs, Button, Card, CardContent, CardDescription, CardFooter, CardHeader,
  CardTitle, Checkbox, DataList, DataListCell, DataListHead, DataListHeader, DataListRow, Dialog, DialogAction, DialogCancel,
  DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label, ListItem, NumberStepper,
  RadioGroup, RadioGroupItem, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator, Sheet, SheetContent,
  SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Skeleton, Tabs, TabsContent, TabsList, TabsTrigger, Text,
  ToggleGroup, ToggleGroupItem, Toaster, toast,
} from '@fluxo-oficina/native'

const etapas = ['Diagnóstico', 'Aguardando peça', 'Aprovação do cliente', 'Execução', 'Pronto']

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text accessibilityRole="header" className="font-sans-semibold text-xl">{titulo}</Text>
      {children}
    </View>
  )
}

export default function App() {
  const [fontesProntas] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold })
  const { colorScheme, setColorScheme } = useColorScheme()
  const [quantidade, setQuantidade] = React.useState(2)
  const [aba, setAba] = React.useState('gravar')

  if (!fontesProntas) return null

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <AppBar
        className="pt-12 h-24"
        title="Catálogo FluxoOficina"
        actions={
          <Button size="sm" variant="outline" onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}>
            <Text>{colorScheme === 'dark' ? 'Tema claro' : 'Tema escuro'}</Text>
          </Button>
        }
      />
      <ScrollView contentContainerClassName="gap-8 p-4 pb-24">
        <Secao titulo="Button">
          <View className="flex-row flex-wrap gap-2">
            <Button><Text>Salvar etapa</Text></Button>
            <Button variant="secondary"><Text>Voltar</Text></Button>
            <Button variant="outline"><Text>Cancelar serviço</Text></Button>
            <Button variant="ghost"><Text>Dispensar</Text></Button>
            <Button variant="destructive"><Text>Cancelar OS 1042</Text></Button>
            <Button disabled><Text>Desabilitado</Text></Button>
          </View>
        </Secao>

        <Secao titulo="Card e Badge">
          <Card>
            <CardHeader><CardTitle>OS 1042</CardTitle><CardDescription>Gol 1.0 · placa ABC1D23</CardDescription></CardHeader>
            <CardContent className="flex-row flex-wrap gap-2">
              <Badge variant="info"><Text>Aguardando peça</Text></Badge>
              <Badge variant="success"><Text>Respondeu 10:12</Text></Badge>
              <Badge variant="warning"><Text>Aguardando há 5 h</Text></Badge>
              <Badge variant="danger"><Text>Cancelada</Text></Badge>
              <Badge variant="outline"><Text>Contorno</Text></Badge>
            </CardContent>
            <CardFooter><Button size="sm"><Text>Mudar etapa</Text></Button></CardFooter>
          </Card>
        </Secao>

        <Secao titulo="Alert">
          <Alert variant="info"><AlertTitle>Etapa salva</AlertTitle><AlertDescription>O cliente recebe um aviso por WhatsApp.</AlertDescription></Alert>
          <Alert variant="success"><AlertTitle>Lista enviada</AlertTitle><AlertDescription>O gerente já pode pedir a cotação.</AlertDescription></Alert>
          <Alert variant="warning"><AlertTitle>Fornecedor sem resposta</AlertTitle><AlertDescription>A Casa do Freio não respondeu há 5 horas.</AlertDescription></Alert>
          <Alert variant="danger"><AlertTitle>Sem conexão</AlertTitle><AlertDescription>O áudio não foi enviado. Conecte o celular e tente de novo.</AlertDescription></Alert>
        </Secao>

        <Secao titulo="Input e Label">
          <View className="gap-1.5"><Label>Placa</Label><Input placeholder="ABC1D23" accessibilityLabel="Placa" /></View>
          <View className="gap-1.5"><Label>Contato</Label><Input invalid defaultValue="(11) 9" accessibilityLabel="Contato" /><Text className="text-sm text-danger-foreground">Informe o telefone com DDD.</Text></View>
        </Secao>

        <Secao titulo="Select">
          <Select defaultValue="Aguardando peça">
            <SelectTrigger accessibilityLabel="Etapa"><SelectValue /></SelectTrigger>
            <SelectContent>{etapas.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
          </Select>
        </Secao>

        <Secao titulo="Checkbox e RadioGroup">
          <View className="gap-3">
            {['Auto Peças Horizonte', 'Distribuidora Norte Peças', 'Elétrica Central'].map((nome, i) => (
              <View key={nome} className="flex-row items-center gap-3"><Checkbox accessibilityLabel={nome} defaultChecked={i < 2} /><Text>{nome}</Text></View>
            ))}
          </View>
          <RadioGroup defaultValue="norte">
            <View className="flex-row items-center gap-3"><RadioGroupItem value="horizonte" accessibilityLabel="Horizonte" /><Text>Auto Peças Horizonte, R$ 612,00</Text></View>
            <View className="flex-row items-center gap-3"><RadioGroupItem value="norte" accessibilityLabel="Norte" /><Text>Distribuidora Norte Peças, R$ 574,00</Text></View>
          </RadioGroup>
        </Secao>

        <Secao titulo="DataList">
          <DataList>
            <DataListHeader><DataListHead>Fornecedor</DataListHead><DataListHead>Preço</DataListHead><DataListHead>Prazo</DataListHead></DataListHeader>
            <DataListRow><DataListCell>Horizonte</DataListCell><DataListCell>R$ 612,00</DataListCell><DataListCell>2 dias</DataListCell></DataListRow>
            <DataListRow><DataListCell>Norte</DataListCell><DataListCell>R$ 574,00</DataListCell><DataListCell>4 dias</DataListCell></DataListRow>
          </DataList>
        </Secao>

        <Secao titulo="Tabs">
          <Tabs defaultValue="os">
            <TabsList>
              <TabsTrigger value="os"><Text>Ordens</Text></TabsTrigger>
              <TabsTrigger value="cotacao"><Text>Cotações</Text></TabsTrigger>
            </TabsList>
            <TabsContent value="os"><Text>Quadro de ordens por etapa.</Text></TabsContent>
            <TabsContent value="cotacao"><Text>Pedidos e respostas dos fornecedores.</Text></TabsContent>
          </Tabs>
        </Secao>

        <Secao titulo="ToggleGroup">
          <ToggleGroup variant="card" defaultValue="Execução" accessibilityLabel="Nova etapa">
            {etapas.map((e) => <ToggleGroupItem key={e} value={e} accessibilityLabel={e}><Text>{e}</Text></ToggleGroupItem>)}
          </ToggleGroup>
        </Secao>

        <Secao titulo="NumberStepper">
          <NumberStepper value={quantidade} onChange={setQuantidade} label="disco de freio" />
        </Secao>

        <Secao titulo="ListItem">
          <ListItem title="OS 1040" description="Onix 1.0 · QWE4R56" trailing={<Badge variant="info"><Text>Diagnóstico</Text></Badge>} />
          <ListItem title="OS 1042" description="Gol 1.0 · ABC1D23" trailing={<Badge variant="warning"><Text>Aguardando peça</Text></Badge>} />
        </Secao>

        <Secao titulo="Dialog, Sheet e Toast">
          <View className="gap-2">
            <Dialog>
              <DialogTrigger asChild><Button variant="outline"><Text>Cancelar serviço</Text></Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Cancelar a OS 1042?</DialogTitle><DialogDescription>A OS sai do painel como cancelada. A regra de cobrança ainda não está definida.</DialogDescription></DialogHeader>
                <DialogFooter><DialogCancel><Text>Manter OS</Text></DialogCancel><DialogAction variant="destructive"><Text>Cancelar OS 1042</Text></DialogAction></DialogFooter>
              </DialogContent>
            </Dialog>
            <Sheet>
              <SheetTrigger asChild><Button variant="outline"><Text>Abrir histórico</Text></Button></SheetTrigger>
              <SheetContent>
                <SheetHeader><SheetTitle>Histórico de avisos</SheetTitle><SheetDescription>Mensagens enviadas ao cliente da OS 1042.</SheetDescription></SheetHeader>
                <Text className="text-sm">17/11 14:05, Aguardando peça. Seu Gol está aguardando a chegada de uma peça.</Text>
              </SheetContent>
            </Sheet>
            <Button onPress={() => toast('Cotação respondida na OS 1042', { description: 'Toque para abrir a ordem.' })}><Text>Disparar notificação</Text></Button>
          </View>
        </Secao>

        <Secao titulo="Skeleton e Separator">
          <Card accessibilityRole="progressbar" accessibilityLabel="Carregando a transcrição" className="gap-2 p-5">
            <Skeleton className="h-5 w-40" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" />
          </Card>
          <Separator />
          <View className="h-5 flex-row items-center gap-3"><Text className="text-sm">Peças</Text><Separator orientation="vertical" /><Text className="text-sm">Cotação</Text><Separator orientation="vertical" /><Text className="text-sm">Avisos</Text></View>
        </Secao>
      </ScrollView>
      <BottomTabs value={aba} onValueChange={setAba} items={[{ value: 'gravar', label: 'Gravar' }, { value: 'os', label: 'Minhas OS' }]} />
      <Toaster />
    </View>
  )
}
