# 🗺️ Territórios Digitais

Sistema web moderno e interativo para gestão de territórios de pregação, desenvolvido para substituir ou complementar os cartões físicos. O sistema permite designação digital, acompanhamento de progresso em tempo real e geração de relatórios administrativos.

![Status do Projeto](https://img.shields.io/badge/Status-Funcional-green)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)

## 📸 Screenshots

*(Adicione prints do seu sistema aqui)*
| Mapa Principal | Painel Admin | Relatórios PDF |
|:---:|:---:|:---:|
| ![Mapa](doc/mapa.png) | ![Admin](doc/admin.png) | ![PDF](doc/pdf.png) |

## 🚀 Funcionalidades

### 🌍 Mapa Interativo
- **Visualização:** Polígonos coloridos indicando o status (Livre/Verde, Ocupado/Cinza, Meu/Azul).
- **Camadas:** Alternância entre Google Maps (Padrão/Satélite) e OpenStreetMap.
- **Geolocalização:** Botão para encontrar a posição atual do usuário.
- **Progresso:** Marcação de quadras concluídas individualmente (ficam verdes).

### 👥 Gestão de Usuários
- **Login:** Autenticação segura via Google.
- **Níveis de Acesso:**
  - **Admin:** Pode designar, devolver, editar usuários e ver relatórios.
  - **Dirigente:** Pode ver apenas seus territórios, marcar quadras e ver o histórico.
- **Painel Admin:** Cadastro, edição e remoção de usuários com busca rápida.

### 📅 Controle de Designações
- **Ciclo de Trabalho:** Registro completo de quem trabalhou no território.
- **Histórico:** Log de datas de início, término e responsáveis (ex: "Fulano, Ciclano").
- **Notificações:** "Sininho" no app avisa quando um território é designado ou devolvido.
- **Atalho Rápido:** Modal "Meus Territórios" com link direto e zoom automático.

### 📄 Relatórios (S-13)
- **PDF Automático:** Geração de relatórios com histórico detalhado.
- **Filtros:** Busca por tempo parado (+4 meses, etc), status e nome.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React.js (Vite)
- **Estilização:** Tailwind CSS
- **Mapas:** React-Leaflet & Leaflet API
- **Backend & Banco de Dados:** Firebase (Firestore & Authentication)
- **Relatórios:** jsPDF & jspdf-autotable
- **PWA:** Instalável no celular como aplicativo nativo.

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js instalado.
- Uma conta no Google Firebase.

### 1. Clonar o repositório
```bash
git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)
cd SEU-REPOSITORIO
