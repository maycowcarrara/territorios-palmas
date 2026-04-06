# Notifications Relay

Worker Cloudflare para:

- validar o `idToken` do Firebase recebido do app
- confirmar que o remetente e admin
- gravar o comunicado em `notificacoes`
- enviar push pelo FCM para os tokens salvos em `usuarios`

## Segredos

Defina no Worker:

- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

## Variaveis

Ja previstas em `wrangler.toml`:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_WEB_API_KEY`

## Deploy

1. `npm install`
2. `wrangler secret put GOOGLE_SERVICE_ACCOUNT_EMAIL`
3. `wrangler secret put GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
4. `wrangler deploy`
