# Apresentação e Roteiro de Defesa

Material para montar os slides e para você defender o código com segurança.
Tudo aqui está ligado a um arquivo real do projeto — você não decora, você **entende e aponta**.

---

## Parte 1 — Roteiro dos slides (texto de cada lâmina)

**Slide 1 — Capa**
- Título: *Registro de Ocorrências de Campo*
- Integrantes, disciplina (Desenvolvimento de Aplicações para Dispositivos Móveis — IFMS Nova Andradina)

**Slide 2 — Introdução**
- App mobile (React Native + Expo) para registrar ocorrências no campo de uma usina, com foto e GPS, funcionando offline.

**Slide 3 — Problema / Justificativa** (o coração da defesa)
- Hoje a ocorrência é reportada por ligação/WhatsApp/papel.
- Perde-se: **onde** foi (sem GPS), a **evidência** (sem foto), o **histórico** (mensagem some).
- No campo **falta sinal** → precisa funcionar **offline**.

**Slide 4 — Objetivo**
- Registrar, de forma rápida e estruturada, uma ocorrência com foto + coordenadas, offline, com histórico no aparelho.

**Slide 5 — Tecnologias**
- React Native + Expo (SDK 54), TypeScript, React Navigation, expo-sqlite, expo-image-picker, expo-location.

**Slide 6 — Funcionalidades (com prints das telas)**
- Lista → Cadastro (foto + GPS) → Detalhe (mapa + editar/excluir).

**Slide 7 — Como foi construído** (arquitetura)
- Componentização, navegação em pilha, hooks, banco SQLite (camada repository), acesso ao hardware.

**Slide 8 — Entrega**
- Link do repositório GitHub + link da APK.

**Slide 9 — Conclusão**
- Resolve um problema real da operação; base que poderia, no futuro, sincronizar com um servidor.

---

## Parte 2 — Defesa por requisito (pergunta provável → resposta → onde está no código)

### 1. Componentização
- **Onde:** `components/Botao.tsx` e `components/OcorrenciaCard.tsx`.
- **Explique:** "Em vez de repetir o mesmo botão/cartão em várias telas, criei componentes que recebem
  `props` (ex: `titulo`, `onPress`) e são reaproveitados. O `OcorrenciaCard` recebe uma ocorrência e
  o que fazer ao tocar."
- **Se perguntarem "o que é prop?":** "É a 'entrada' do componente — quem chama decide o conteúdo/ação."

### 2. Navegação
- **Onde:** `routes/stack.routes.tsx` + `App.tsx` (`NavigationContainer`).
- **Explique:** "Uso React Navigation com navegação em **pilha** (Stack): cada tela é uma `Screen`
  registrada; ao navegar eu **empilho** telas e o botão voltar desempilha. Tenho 3 telas: Lista,
  Cadastro e Detalhe."
- **Passagem de parâmetro:** "Da Lista pro Detalhe eu mando o `id` da ocorrência: `navigation.navigate('Detalhe', { id })`."

### 3. Hooks (useState / useEffect)
- **Onde:** todas as telas. Ex.: `CadastroScreen.tsx` (`useState` dos campos) e `ListaScreen.tsx`.
- **Explique:** "`useState` guarda o estado da tela (texto digitado, foto, coordenadas). `useEffect`
  roda um efeito ao abrir a tela — na edição, ele carrega os dados existentes. Na lista uso
  `useFocusEffect` pra recarregar sempre que volto pra ela."

### 4. Persistência com SQLite
- **Onde:** `database/database.ts` (cria a tabela) + `repositories/ocorrenciaRepository.ts` (CRUD).
- **Explique:** "O `SQLiteProvider` (em `App.tsx`) abre o banco e roda `inicializarBanco`, que cria a
  tabela. As telas pegam o banco com `useSQLiteContext()` e chamam o repositório. O repositório tem as
  4 operações: **inserir** (CREATE), **listar/buscar** (READ), **atualizar** (UPDATE) e **excluir** (DELETE)."
- **Por que banco local?** "Porque no campo não tem sinal — precisa salvar offline e persistir mesmo
  fechando o app. `useState` sozinho perderia os dados ao fechar."
- **O que é o `?` no SQL?** "É um parâmetro — separa o dado do comando, evitando SQL injection."

### 5. Acesso ao hardware (câmera + GPS)
- **Onde:** `screens/CadastroScreen.tsx`, funções `tirarFoto()` e `capturarLocalizacao()`.
- **Explique:** "Sigo o fluxo: **pedir permissão → verificar se foi concedida → usar o recurso**.
  Pra foto uso `expo-image-picker` (`launchCameraAsync`); pra localização uso `expo-location`
  (`getCurrentPositionAsync`). As permissões estão declaradas no `app.json`."

### 6. Versionamento (GitHub) + README
- **Onde:** repositório público + `README.md`.
- **Explique:** "Versionei com Git, o repositório é público e o README explica objetivo, integrantes e como rodar."

---

## Parte 3 — Narração do demo (o que falar enquanto mostra)
1. "Abro o app na **Lista** — começa vazia."
2. "Toco em **Nova ocorrência** → vou pra tela de **Cadastro** (isso é a navegação)."
3. "Preencho título e descrição (isso é `useState`), tiro a **foto** (câmera) e capturo a **localização** (GPS)."
4. "Salvo → ele grava no **SQLite** e volta pra lista, que **recarrega** e mostra o novo registro."
5. "Abro o **Detalhe** → vejo foto, coordenadas e posso **abrir no mapa**, **editar** ou **excluir**."
6. "Fecho e abro o app: os dados **continuam lá** — prova da persistência local."

---

## Parte 4 — Perguntas-armadilha (e respostas curtas)
- **"Onde os dados ficam salvos?"** → No próprio aparelho, num banco SQLite (arquivo `ocorrencias.db`).
- **"E se não tiver internet?"** → Funciona normal; é justamente a vantagem do banco local.
- **"Por que separou repositório das telas?"** → Organização: a tela cuida da interface, o repositório
  cuida do SQL. Fica mais fácil de entender e manter (padrão visto em aula).
- **"O que é o SQLiteProvider?"** → Um componente que abre o banco e o disponibiliza para todo o app
  via `useSQLiteContext()`.
- **"Por que TypeScript?"** → Os tipos (ex: `Ocorrencia`) evitam erros — o editor avisa antes de rodar.
