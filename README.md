# Health Score — Care Plus

Sistema gamificado de incentivo à saúde preventiva da Care Plus.

## Integrantes

- Eduardo Navarro Lúcio — RM: 568095
- Victor Zocoler — RM: 568234
- Guilherme Pereira — RM: 567487

## Tecnologias

- React 19
- Vite
- Tailwind CSS v4
- JavaScript (ES2024)
- localStorage para persistência
- JSON local simulando API

## Como instalar e rodar

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/careplus-health-score

# Entre na pasta
cd "care plus"

# Instale as dependências
npm install
```

### Rodando em desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:5173

### Build para produção

```bash
npm run build
npm run preview
```

## Funcionalidades

- **Dashboard** — desafios diários com sistema de Pontos de Saúde (PS)
- **Sistema de Níveis** — Recruta → Guardião → Mestre, com benefícios reais
- **Missões Semanais** — desafios com progresso e recompensas em PS
- **Ranking** — classificação global com sistema de batalha
- **Batalha Elemental** — combate entre pets usando poderes desbloqueáveis (Fogo, Água, Terra, Vento)
- **Pet Virtual** — companheiro com stats de fome, higiene, alegria e energia
- **Clube de Vantagens** — resgate de vouchers usando PS acumulados
- **Jogo da Memória** — jogo cognitivo que rende +150 PS
- **Perfil** — histórico de atividades e conquistas

## Dados

Os dados da aplicação ficam em `src/data/db.json`, simulando uma API local.
O hook `src/data/useDB.js` demonstra o consumo via `fetch`.

## Deploy

Projeto publicado em: https://SEU-LINK.vercel.app