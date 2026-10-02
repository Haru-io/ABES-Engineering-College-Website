import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5001;
const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5173";
const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use(express.json());


// ================================
// HEALTH CHECK
// ================================

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "abes-college-demo-backend",
  });
});


// ================================
// AI CHAT
// ================================

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body?.message || "").trim();

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    console.log("Sending question to P_200 AI:", message);

    const aiResponse = await fetch(`${AI_SERVICE_URL}/chat`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message,
        top_k: 3,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();

      console.error(
        "P_200 AI returned error:",
        errorText
      );

      return res.status(502).json({
        message: "P_200 AI service returned an error",
      });
    }

    const data = await aiResponse.json();

    console.log("P_200 AI response received");

    return res.json({
      answer: data.answer,
      intent: data.intent,
      confidence: data.confidence,
      sources: data.sources || [],
      provider: data.provider || "p200-ai",
    });

  } catch (error) {
    console.error(
      "P_200 AI connection error:",
      error
    );

    return res.status(502).json({
      message: "Unable to connect to P_200 AI service",
    });
  }
});


// ================================
// SERVER
// ================================

app.listen(PORT, () => {
  console.log(
    `ABES backend running on http://localhost:${PORT}`
  );

  console.log(
    `P_200 AI configured at ${AI_SERVICE_URL}`
  );
});