// server.js — SportSnap Tutor (Ollama edition — 100% free, runs on your Mac)
// ─────────────────────────────────────────────────────────────────────────
// SETUP (one time):
//   1. Download Ollama: https://ollama.com  → install the Mac app
//   2. Open Terminal and run: ollama pull llama3
//   3. npm start
// ─────────────────────────────────────────────────────────────────────────

const express = require("express");
const cors    = require("cors");
const path    = require("path");

const OLLAMA_URL   = "http://localhost:11434/api/chat";
const OLLAMA_MODEL = "llama3";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const SYSTEM_PROMPTS = {
  Basketball:
    "You are SportSnap Tutor, an expert basketball coach inside the Next Play sports education app. " +
    "Focus ONLY on basketball unless the user explicitly asks about another sport. " +
    "Keep all answers to 2-4 sentences max, friendly and clear. " +
    "Use **bold** for key terms. Occasionally add a fun fact or pro tip. " +
    "Never use bullet points — write in short natural prose.",
  Soccer:
    "You are SportSnap Tutor, an expert soccer coach inside Next Play. " +
    "Focus ONLY on soccer. 2-4 sentences, friendly. **bold** key terms. Natural prose.",
  Baseball:
    "You are SportSnap Tutor, an expert baseball coach inside Next Play. " +
    "Focus ONLY on baseball. 2-4 sentences, friendly. **bold** key terms. Natural prose.",
  "American Football":
    "You are SportSnap Tutor, an expert American football coach inside Next Play. " +
    "Focus ONLY on American football (NFL). 2-4 sentences, friendly. **bold** key terms. Natural prose.",
  Tennis:
    "You are SportSnap Tutor, an expert tennis coach inside Next Play. " +
    "Focus ONLY on tennis. 2-4 sentences, friendly. **bold** key terms. Natural prose.",
  "Ice Hockey":
    "You are SportSnap Tutor, an expert ice hockey coach inside Next Play. " +
    "Focus ONLY on ice hockey (NHL). 2-4 sentences, friendly. **bold** key terms. Natural prose.",
  Cricket:
    "You are SportSnap Tutor, an expert cricket coach inside Next Play. " +
    "Focus ONLY on cricket. 2-4 sentences, friendly. **bold** key terms. Natural prose.",
  Volleyball:
    "You are SportSnap Tutor, an expert volleyball coach inside Next Play. " +
    "Focus ONLY on volleyball. 2-4 sentences, friendly. **bold** key terms. Natural prose.",
};

app.post("/api/chat", async (req, res) => {
  const { sport, message, history } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }

  const systemPrompt   = SYSTEM_PROMPTS[sport] || SYSTEM_PROMPTS["Basketball"];
  const trimmedHistory = Array.isArray(history) ? history.slice(-10) : [];

  const messages = [
    { role: "system",  content: systemPrompt },
    ...trimmedHistory,
    { role: "user",    content: message },
  ];

  try {
    const response = await fetch(OLLAMA_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ model: OLLAMA_MODEL, messages, stream: false }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(500).json({
          error: "Model not found. Open Terminal and run: ollama pull llama3",
        });
      }
      throw new Error(await response.text());
    }

    const data  = await response.json();
    const reply = data?.message?.content || "Sorry, could not generate a response.";
    res.json({ reply });

  } catch (err) {
    console.error("Ollama error:", err.message);
    if (err.code === "ECONNREFUSED" || err.message.includes("ECONNREFUSED")) {
      return res.status(500).json({
        error: "Ollama is not running. Open the Ollama app on your Mac first.",
      });
    }
    res.status(500).json({ error: "AI error: " + err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✅  SportSnap Tutor running at http://localhost:${PORT}`);
  console.log(`🤖  Model: ${OLLAMA_MODEL} via Ollama`);
  console.log(`📌  Make sure Ollama is open and you ran: ollama pull ${OLLAMA_MODEL}\n`);
});
