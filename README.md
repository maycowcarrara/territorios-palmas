# 🗺️ Territórios Palmas

Sistema de gestão digital de territórios de pregação, desenvolvido como uma **PWA (Progressive Web App)** moderna para substituir os cartões físicos. O sistema oferece controle em tempo real de designações, progresso de quadras e relatórios administrativos detalhados.

![Status](https://img.shields.io/badge/Versão-1.8.120-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-KMZ_Converter-yellow?style=for-the-badge&logo=python&logoColor=white)

## 📱 Visão Geral

O **Territórios Palmas** permite que dirigentes visualizem seus mapas designados, marquem quadras concluídas e adicionem observações. Para os administradores, oferece um painel robusto para gerenciar usuários, designar territórios via WhatsApp e gerar relatórios em PDF para auditoria (S-13).

## 🚀 Funcionalidades Principais

### 🗺️ Mapa Inteligente (`Mapa.jsx`)

- **Multicamadas:** Alternância entre **Google Maps (Satélite/Híbrido)**, **Google Maps (Padrão)** e **OpenStreetMap**.
- **Visualização de Status:** Cores dinâmicas baseadas no status (Livre, Meu, Ocupado, Concluído) e tempo sem trabalhar (escala de laranja).
- **Controle de Elementos:** Botões para mostrar/ocultar **Condomínios**, **Pontos de Referência** e **Cores** (modo impressão).
- **Quadras Interativas:**
  - Clique para marcar como feita (Verde) ou pendente (Vermelho).
  - **Notas/Chat:** Sistema de observações por quadra (clique direito ou longo) para registrar "Não bater", "Cão bravo", etc.
- **Geolocalização:** Rastreamento da posição do usuário e compartilhamento de localização via WhatsApp.

### ⚙️ Administração e Gestão (`AdminPanel.jsx`)

- **Gestão de Usuários:** Aprovação de novos cadastros, promoção a Admin e edição de WhatsApp.
- **Designação Ágil:**
  - Envio de link "Deep Link" direto para o WhatsApp do dirigente (abre o mapa focado no território).
  - Controle de devolução e histórico de ciclos.
- **Notificações:** Sistema de "sininho" (`SininhoNotificacoes`) para avisar sobre novas designações ou devoluções.

### 📊 Relatórios Avançados (`Relatorios.jsx`)

- **Filtros Poderosos:**
  - Por Status (Livre/Ocupado).
  - Por Tempo Ocioso (+2, +4, +6 meses - Críticos).
  - Busca por nome, número ou dirigente.
- **Histórico Completo:** Visualização expandida de ciclos anteriores (quem trabalhou, quando pegou, quando devolveu).
- **Exportação PDF:** Geração de relatórios formatados (estilo S-13) usando `jspdf-autotable`.

### 🛠️ Ferramentas Técnicas

- **Conversor KMZ (`conversor.py`):** Script Python personalizado que converte arquivos `.kmz` (do Google Earth) para `geoJson`, mapeando ícones personalizados para números de quadras.
- **PWA Instalável:** Funciona offline (cache) e pode ser instalado na tela inicial (Android/iOS).
- **Auto-Update:** Sistema de verificação de versão (`AutoUpdate.jsx`) que força a atualização do cache quando uma nova versão é publicada.

---

## 📸 Screenshots

*(Espaço reservado para colocar prints das telas: Login, Mapa com Zoom, Modal de Notas e Relatório PDF)*

---

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js (v18+)
- Conta no Firebase (Firestore, Auth, Hosting)
- Python 3 (para conversão de mapas)

### 1. Clonar e Instalar Dependências

```bash
git clone [https://github.com/maycowcarrara/territorios-palmas.git](https://github.com/maycowcarrara/territorios-palmas.git)
cd territorios-palmas
npm install
```

### 2. Configurar o Firebase

Crie um arquivo `src/firebase.js` com suas credenciais:

**JavaScript**

```
import { initializeApp } from "firebase/app";
// ... suas configurações do Firebase Console
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### 3. Executar em Desenvolvimento

**Bash**

```
npm run dev
```

### 4. Deploy

O projeto possui script de deploy automático que atualiza a versão:

**Bash**

```
npm run deploy
# Isso executa: update-version -> build -> firebase deploy
```

---

## 📱 Como Testar no Celular

Como o sistema utiliza Geolocalização e Login Google, testar no celular requer cuidados específicos (HTTPS).

### Opção 1: Firebase Preview (Recomendada) ⭐

Cria um link temporário seguro (HTTPS) idêntico à produção, ideal para testar **GPS e Login** sem afetar o site principal.

1. Gere a build atualizada:
   **Bash**

   ```
   npm run build
   ```
2. Faça o deploy para um canal de teste (ex: `teste-mobile`):
   **Bash**

   ```
   npx firebase hosting:channel:deploy teste-mobile
   ```
3. Acesse o link gerado no terminal (ex: `https://territorios-palmas--teste-mobile...web.app`).

   * **Dica:** Para atualizar, basta rodar os mesmos comandos novamente.

### Opção 2: Rede Local (Wi-Fi)

Útil para ajustes visuais rápidos, mas **o GPS pode falhar** por falta de HTTPS.

1. Rode o servidor expondo o IP:
   **Bash**

   ```
   npm run dev -- --host
   ```
2. Acesse o IP mostrado (ex: `http://192.168.0.X:5173`) no celular.
3. **Nota:** Para o Login funcionar, adicione esse IP em *Authentication > Settings > Authorized Domains* no Firebase Console.

---

## 🗺️ Processamento de Mapas (Python)

O sistema utiliza um arquivo `mapa.json` gerado a partir de arquivos KMZ. O script `kmz/conversor.py` faz essa mágica.

**Como usar:**

1. Salve seus arquivos no diretório `kmz/`: `poligonos.kmz`, `quadras.kmz`, `referencias.kmz`, `condominios.kmz`.
2. Certifique-se de que os ícones no Google Earth correspondam à tabela `ICON_MAPPING` no script Python.
3. Execute o conversor:

**Bash**

```
cd kmz
python conversor.py
```

4. O arquivo `mapa.json` será gerado. Mova-o para a pasta `public/`.

---

## 📄 Estrutura do Banco de Dados (Firestore)

* **`usuarios`** : `{ email, nome, role (admin/comum/aguardando), whatsapp }`
* **`territorios`** :
* ID: `t_{numero}`
* Campos: `status`, `designadoPara`, `quadras_feitas` (array), `notas_quadras` (map), `historico` (array de ciclos).
* **`notificacoes`** : `{ para, texto, lida, tipo }`

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📜 Licença

Desenvolvido para uso local em Palmas-PR.
