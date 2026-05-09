# Notifications Relay

Worker Cloudflare para:

- validar o `idToken` do Firebase recebido do app
- confirmar que o remetente e admin
- gravar o comunicado em `notificacoes`
- enviar push pelo OneSignal usando o e-mail do usuário como `external_id`
- usar FCM como fallback se OneSignal não estiver configurado

## Segredos

Defina no Worker:

- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `ONESIGNAL_APP_ID`
- `ONESIGNAL_REST_API_KEY`

## Variaveis

Ja previstas em `wrangler.toml`:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_WEB_API_KEY`

## Deploy

1. `npm install`
2. `wrangler secret put GOOGLE_SERVICE_ACCOUNT_EMAIL`
3. `wrangler secret put GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
4. `wrangler secret put ONESIGNAL_APP_ID`
5. `wrangler secret put ONESIGNAL_REST_API_KEY`
6. `wrangler deploy`
