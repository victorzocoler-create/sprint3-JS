# Health Score — Care Plus
### Web Development | Sprint 3

Aplicação React gamificada para incentivar a saúde preventiva dos beneficiários Care Plus.

## Integrantes

- Eduardo Navarro Lúcio — RM: 568095
- Victor Zocoler — RM: 568234
- Guilherme Pereira — RM: 567487

## Tecnologias

- React 19
- Vite
- Tailwind CSS v4
- JavaScript ES2024
- localStorage para persistência
- JSON local simulando API (src/data/db.json)

## Como rodar

### Pré-requisitos
- Node.js 18+
- npm

### Instalação

```bash
git clone https://github.com/victorzocoler-create/sprint3-JS
cd "care plus"
npm install
npm run dev
```

Acesse http://localhost:5173

### Build para produção

```bash
npm run build
npm run preview
```

## Deploy

🔗 **https://sprint3-js.vercel.app**

## Funcionalidades

- **Login e Cadastro** — autenticação com localStorage, escolha do nome e cor do pet
- **Dashboard** — desafios diários com Pontos de Saúde (PS), barra de nível, sequência da semana e conquistas
- **Sistema de Níveis** — Recruta → Guardião → Mestre, cada um com benefícios e descontos reais
- **Ranking** — classificação global com histórico de batalhas
- **Batalha Elemental** — combate de pets com poderes de Fogo, Água, Terra e Vento
- **Pet Virtual** — stats de fome, higiene, alegria e energia com decay por tempo; cor personalizada no cadastro
- **Poderes Elementais** — desbloqueio por conquistas de saúde (exercício, hidratação, consultas, meditação)
- **Clube de Vantagens** — resgate de vouchers com dedução real de PS
- **Perfil** — histórico de atividades, conquistas e logout

## Dados

Os dados da aplicação ficam em `src/data/db.json`, simulando uma API local.
O hook `src/data/useDB.js` faz o consumo via `fetch`.

## Estrutura do Projeto

```
care plus/
├── src/
│   ├── components/
│   │   ├── AuthPage.jsx       — login e cadastro
│   │   ├── HomePage.jsx       — dashboard principal
│   │   ├── RankingPage.jsx    — ranking global
│   │   ├── BattlePage.jsx     — batalha de pets
│   │   ├── ClubePage.jsx      — clube de vantagens
│   │   ├── MemoryGame.jsx     — jogo da memória
│   │   ├── PetPage.jsx        — pet virtual e poderes
│   │   ├── ProfilePage.jsx    — perfil e logout
│   │   ├── Navbar.jsx         — cabeçalho
│   │   ├── BottomNav.jsx      — navegação inferior
│   │   ├── LevelBar.jsx       — barra de nível
│   │   ├── ChallengeCard.jsx  — card de desafio
│   │   ├── StreakBar.jsx      — sequência semanal
│   │   ├── BadgesGrid.jsx     — grade de conquistas
│   │   ├── Feedback.jsx       — toast e partículas
│   │   ├── SectionTitle.jsx   — título de seção
│   │   ├── Icons.jsx          — ícones SVG
│   │   ├── gameData.js        — dados do jogo
│   │   └── useGameState.js    — estado global
│   ├── data/
│   │   ├── db.json            — dados simulando API
│   │   └── useDB.js           — hook de consumo
│   ├── assets/
│   │   └── logo.png
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```
