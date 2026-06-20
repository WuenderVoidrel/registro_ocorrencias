# Registro de Ocorrências de Campo

Aplicativo móvel (React Native + Expo) para registrar **ocorrências no campo** de uma usina
sucroenergética — uma colhedora parada, um problema na lavoura, um foco de incêndio — com
**foto**, **localização (GPS)** e descrição, salvos **localmente no celular** (funciona offline).

## Integrantes
<!-- PREENCHER: nome completo de cada integrante da dupla (ou só o seu, se individual) -->
- NOME COMPLETO 1
- NOME COMPLETO 2

## Disciplina / Contexto
- **Disciplina:** [85093] Desenvolvimento de Aplicações para Dispositivos Móveis — Tecnologia em
  Análise e Desenvolvimento de Sistemas (IFMS — Campus Nova Andradina).
- **Contexto:** operação agrícola de uma usina (Energética Santa Helena). Hoje, ocorrências de
  campo são reportadas de forma informal (ligação/WhatsApp/papel), o que perde **localização**,
  **evidência visual** e **histórico** — e falha quando **não há sinal**. O app resolve isso com
  um registro estruturado, georreferenciado, com foto e que funciona offline.

## Objetivo
Permitir que um operador registre rapidamente uma ocorrência de campo com foto e coordenadas,
mesmo sem internet, mantendo um histórico consultável no próprio aparelho.

## Tecnologias
- **React Native + Expo (SDK 54)** — TypeScript
- **React Navigation** — navegação em pilha entre telas
- **expo-sqlite** — persistência local (banco SQLite)
- **expo-image-picker** — câmera (tirar foto)
- **expo-location** — GPS (coordenadas atuais)

## Funcionalidades
- Cadastrar ocorrência (título, descrição, foto, localização)
- Listar ocorrências salvas (mais recentes primeiro)
- Ver detalhe e abrir o local no mapa
- Editar e excluir ocorrências
- Persistência local com SQLite — os dados continuam após fechar o app

## Estrutura do projeto
```
RegistroOcorrencias/
├─ App.tsx                     # entrada: SQLiteProvider + NavigationContainer
├─ app.json                    # config + permissões de câmera/GPS
├─ database/
│  └─ database.ts              # cria a tabela "ocorrencias" (onInit)
├─ repositories/
│  └─ ocorrenciaRepository.ts  # CRUD em SQL (listar/buscar/inserir/atualizar/excluir)
├─ types/
│  ├─ ocorrencia.ts            # tipos do domínio
│  └─ navigation.ts            # rotas tipadas
├─ components/
│  ├─ Botao.tsx                # botão reutilizável (componentização)
│  └─ OcorrenciaCard.tsx       # card da lista (componentização)
├─ routes/
│  └─ stack.routes.tsx         # navegação em pilha (Stack)
└─ screens/
   ├─ ListaScreen.tsx          # lista das ocorrências
   ├─ CadastroScreen.tsx       # formulário + câmera + GPS
   └─ DetalheScreen.tsx        # detalhe + mapa + editar/excluir
```

## Como rodar
1. `npm install`
2. `npm start`
3. Abrir no **Expo Go** (celular) escaneando o QR Code, ou no **emulador Android**.

## APK
<!-- PREENCHER: link da APK gerada via `eas build` -->
- Download da APK: (inserir link)
