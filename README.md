# SportSnap Tutor 🏆
### AI-powered Sports Coach — Next Play Engineering Assessment

> An interactive chatbot that teaches players rules, strategy, history, and positions for 8 sports — powered by a local AI model (Ollama/llama3) with zero API cost.

![SportSnap Tutor](https://img.shields.io/badge/Next%20Play-Assessment-1A3C2B?style=for-the-badge&labelColor=1A3C2B&color=A8D84E)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## Features

- **8 sports supported** — Basketball, Soccer, Baseball, American Football, Tennis, Ice Hockey, Cricket, Volleyball
- **AI-powered answers** — Sport-scoped system prompts keep the AI focused per sport
- **Conversation memory** — Full session history passed on every call (trimmed to last 10 turns)
- **Quick-question chips** — Sport-specific starter questions update on sport switch
- **Zero cost** — Runs entirely on your machine via Ollama, no API key needed
- **Clean state management** — Sport switching resets conversation context instantly

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JS |
| Backend | Node.js + Express |
| AI Model | Ollama (llama3) — runs locally |
| Architecture | REST API + stateless server |
| Production-ready | AWS EC2 + React Native (roadmap) |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) v18+
- [Ollama](https://ollama.com) — download and install the Mac/Windows app

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/sportsnap-tutor.git
cd sportsnap-tutor

# 2. Install dependencies
npm install

# 3. Pull the AI model (one time, ~4GB)
ollama pull llama3

# 4. Start the server
npm start
```

### Open the app
Go to **http://localhost:3000** in your browser.

---

## Project Structure

```
sportsnap-tutor/
├── server.js          # Express backend — prompt engineering + Ollama integration
├── package.json
└── public/
    └── index.html     # Frontend UI — sport selector, chat window, quick questions
```

---

## How It Works

```
User selects sport + types question
        ↓
Browser → POST /api/chat (sport, message, history)
        ↓
server.js injects sport-specific system prompt
        ↓
Trims history to last 10 turns (context window management)
        ↓
POST to Ollama localhost:11434 → llama3 model
        ↓
Response returned → displayed in chat UI
```

---

## Prompt Engineering Strategy

Each sport has its own system prompt injected server-side:

```javascript
const SYSTEM_PROMPTS = {
  Basketball:
    "You are SportSnap Tutor, an expert basketball coach inside Next Play. " +
    "Focus ONLY on basketball. Keep answers to 2-4 sentences. " +
    "Use **bold** for key terms. Write in natural prose.",
  // ... 7 more sports
};
```

This keeps the AI laser-focused on the selected sport and prevents it from wandering mid-conversation.

---

## Production Architecture (Roadmap)

```
React Native (iOS/Android)  +  React.js (Web)
              ↓
        REST API (Node/Express on AWS EC2 Auto Scaling)
              ↓
    Claude API (Anthropic) — swaps Ollama in production
              ↓
  PostgreSQL (AWS RDS)   +   MongoDB (session state)
```

---

## Built By

**Chaitra Aladakatti Ranganath**
M.S. Information Systems — George Mason University (May 2026)
[LinkedIn](https://linkedin.com/in/your-profile)

*Built as part of the Next Play Software Engineer assessment.*
