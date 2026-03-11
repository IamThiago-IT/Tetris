# 🎮 Tetris

> **[PT-BR]** Implementação clássica do Tetris com React, TypeScript e Vite.
> **[EN]** Classic Tetris implementation built with React, TypeScript, and Vite.

---

## ✨ Funcionalidades / Features

**[PT-BR]**
- 7 peças tetromino clássicas (I, O, T, S, Z, J, L) com cores autênticas
- **Ghost piece** — prévia semi-transparente do local de pouso da peça
- **Hard drop** — queda instantânea com bônus de pontuação
- **Soft drop** — aceleração manual da queda
- **Wall kick** — rotação inteligente ao encostar nas paredes
- Sistema de níveis: velocidade aumenta a cada 10 linhas eliminadas
- Prévia da próxima peça
- Controles por teclado e botões touch para mobile
- Tela de pausa, game over e reinício

**[EN]**
- All 7 classic tetromino pieces (I, O, T, S, Z, J, L) with authentic colors
- **Ghost piece** — semi-transparent landing preview
- **Hard drop** — instant placement with bonus points
- **Soft drop** — manual gravity acceleration
- **Wall kick** — smart rotation near walls
- Level system: speed increases every 10 lines cleared
- Next piece preview
- Keyboard controls and on-screen touch buttons for mobile
- Pause, game over, and restart screens

---

## 🛠 Tech Stack

| | |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite](https://vitejs.dev/) + SWC |
| **State** | `useReducer` (no external state library) |

---

## 🚀 Getting Started / Como Rodar

### Pré-requisitos / Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9

### Instalação / Installation

```bash
# Clone o repositório / Clone the repository
git clone <repository-url>
cd Tetris

# Instale as dependências / Install dependencies
npm install
```

### Desenvolvimento / Development

```bash
npm run dev
```

Acesse / Open: `http://localhost:5173`

### Build para produção / Production Build

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.
Output files will be in the `dist/` folder.

### Preview da build / Preview Build

```bash
npm run preview
```

---

## 📜 Scripts

| Comando / Command | Descrição / Description |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento / Start dev server |
| `npm run build` | Compila para produção / Build for production |
| `npm run preview` | Visualiza a build localmente / Preview production build |
| `npm run lint` | Executa o linter / Run ESLint |

---

## 🎮 Como Jogar / How to Play

### Teclado / Keyboard

| Tecla / Key | Ação / Action |
|---|---|
| `←` `→` | Mover peça / Move piece |
| `↑` | Rotacionar / Rotate |
| `↓` | Queda lenta / Soft drop |
| `Space` | Queda rápida / Hard drop |
| `P` | Pausar/Retomar / Pause/Resume |

### Mobile

Use os botões na tela para jogar.
Use the on-screen buttons to play.

---

## 🏆 Sistema de Pontuação / Scoring System

| Linhas / Lines | Pontos base / Base Points |
|---|---|
| 1 (Single) | 100 |
| 2 (Double) | 300 |
| 3 (Triple) | 500 |
| 4 (Tetris) | 800 |

- **Multiplicador de nível / Level multiplier:** `pontos x (nível + 1)` / `points x (level + 1)`
- **Hard drop:** +2 pontos por célula / +2 points per cell dropped
- **Novo nível / New level:** a cada 10 linhas eliminadas / every 10 lines cleared

---

## 📁 Estrutura do Projeto / Project Structure

```
src/
├── components/
│   ├── Cell.tsx          # Célula individual do tabuleiro / Individual board cell
│   ├── GameBoard.tsx     # Tabuleiro com ghost piece / Board with ghost piece
│   ├── GameControls.tsx  # Captura de eventos de teclado / Keyboard event handler
│   └── ScoreBoard.tsx    # Placar e prévia da próxima peça / Score & next piece
├── hooks/
│   └── useTetrisLogic.ts # Estado do jogo com useReducer / Game state with useReducer
├── interfaces/
│   └── index.tsx         # Tipos e interfaces TypeScript / TypeScript types
├── pages/
│   └── TetrisPage.tsx    # Página principal do jogo / Main game page
└── utils/
    ├── board.ts          # Lógica do tabuleiro / Board logic
    └── tetrominos.ts     # Formas e rotações / Shapes and rotations
```

---

## 📄 Licença / License

Este projeto é de código aberto.
This project is open source.