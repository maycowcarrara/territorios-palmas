# Territórios Palmas

Sistema web para gestão de territórios de pregação, feito em React + Firebase e usado como PWA em celular e desktop. O app substitui cartões físicos, centraliza designações, marcação de quadras, observações por território e relatórios administrativos.

## Visão Geral

O sistema foi pensado para uso real no dia a dia:

- dirigentes visualizam seus territórios e marcam quadras concluídas
- administradores designam, devolvem, acompanham histórico e geram relatórios
- observações por quadra ficam salvas como conhecimento permanente do território
- campanhas podem ser ativadas algumas vezes por ano sem apagar o progresso normal

## Funcionalidades

### Mapa

- mapa interativo com Google Maps e OpenStreetMap
- cores por status do território
- controle de zoom, GPS, pontos de referência e condomínios
- marcação de quadras feitas e pendentes
- ponto de encontro compartilhável por WhatsApp

### Observações

- notas por quadra e condomínio
- edição e exclusão com controle por autor/admin
- observações permanentes, compartilhadas entre modo normal e campanhas

### Painel do Sistema

- aprovação e gestão de usuários
- edição de nome e WhatsApp
- ativação e desativação de campanhas
- reativação de campanhas salvas
- retorno imediato ao modo normal sem perder progresso anterior

### Campanhas

- o sistema possui um contexto ativo global
- no modo normal, o andamento usa a coleção `territorios`
- no modo campanha, o andamento usa a coleção `territorios_contexto`
- `notas_quadras` permanecem no território base e continuam visíveis em qualquer contexto
- o topo do app mostra chip da campanha, variação de cor e percentual de cobertura

### Relatórios

- filtros por status, busca e tempo ocioso
- histórico de ciclos
- exportação em PDF
- relatórios acompanham o contexto ativo do sistema

## Stack

- React 19
- Vite
- Tailwind CSS
- Firebase Auth
- Cloud Firestore
- Firebase Hosting
- Leaflet / React Leaflet
- jsPDF

## Estrutura de Dados

### Coleções principais

- `usuarios`
  - documento: e-mail em minúsculo
  - campos principais: `nome`, `role`, `whatsapp`

- `territorios`
  - documento: `t_{numero}`
  - dados permanentes e modo normal
  - campos comuns: `designadoPara`, `designadoNome`, `quadras_feitas`, `historico`, `notas_quadras`

- `territorios_contexto`
  - documento: `{contextoId}__t_{numero}`
  - progresso específico de campanhas
  - campos comuns: `contextoId`, `territorioNumero`, `designadoPara`, `quadras_feitas`, `historico`

- `configuracoes`
  - documento: `sistema`
  - controla o contexto ativo do app

- `campanhas`
  - campanhas cadastradas no painel

- `notificacoes`
  - avisos administrativos e notificações do sistema

## Regras do Firestore

As rules do projeto estão versionadas em [firestore.rules](./firestore.rules) e referenciadas em [firebase.json](./firebase.json).

As regras atuais cobrem:

- leitura do contexto ativo por usuários aprovados
- gestão de campanhas apenas por admin
- progresso de campanha em `territorios_contexto`
- manutenção das permissões já existentes para `usuarios`, `territorios` e `notificacoes`

## Instalação

### Pré-requisitos

- Node.js 18+
- projeto Firebase configurado
- Firestore, Auth e Hosting habilitados

### Instalar dependências

```bash
npm install
```

### Configurar Firebase

Crie o arquivo `src/firebase.js` com a inicialização do projeto e exporte `db`, `auth` e `googleProvider`.

### Configurar Firebase no Android

Baixe o arquivo `google-services.json` do projeto Firebase Android com o pacote `br.com.territoriospalmas.app` e salve-o em `android/app/google-services.json`.

Esse arquivo fica apenas no ambiente local e não deve ser versionado no Git.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run deploy
```

Observação: `npm run build` atualiza automaticamente os arquivos de versão antes da build.

## Deploy

Publicar aplicação:

```bash
npm run deploy
```

Publicar apenas as rules do Firestore:

```bash
firebase deploy --only firestore:rules
```

Se o deploy das rules falhar com permissão `serviceusage.services.use`, ajuste o IAM da conta usada no Firebase CLI no projeto Google Cloud.

## Migração para Outro Firebase

Para copiar o Firestore atual para um projeto Firebase em outra conta Google, use o script documentado em [scripts/firestore-migrate.md](./scripts/firestore-migrate.md).

## Teste em Celular

### Opção recomendada

Use um preview channel do Firebase Hosting para testar com HTTPS, GPS e login Google:

```bash
npm run build
npx firebase hosting:channel:deploy teste-mobile
```

### Rede local

```bash
npm run dev -- --host
```

Útil para ajuste visual, mas GPS e login podem depender de configuração extra e HTTPS.

## Mapas

O arquivo `public/mapa.json` é a base do mapa consumido pelo app.

Também existe um fluxo auxiliar em `kmz/` para conversão de arquivos de origem para o formato usado pelo sistema.

## Observações de Produto

- campanhas não apagam o andamento normal
- desativar uma campanha devolve o sistema ao contexto normal imediatamente
- reativar uma campanha retoma o progresso daquela campanha
- observações permanecem disponíveis em qualquer modo

## Licença

Projeto desenvolvido para uso local em Palmas-PR.
