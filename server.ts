import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "You are an expert trading analyst. Provide concise, actionable insights based on the trading data provided.",
        },
      });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Mock Trade Data API
  app.get("/api/trades", (req, res) => {
    // In a real app, this would fetch from a database
    res.json({
      trades: [
        { id: 1, date: "2023-08-02", symbol: "SPY", netPnL: 412.80, status: "Win" },
        { id: 2, date: "2023-08-02", symbol: "SPY", netPnL: -4956.97, status: "Loss" },
        { id: 3, date: "2023-08-02", symbol: "SPY", netPnL: 67.75, status: "Win" },
        { id: 4, date: "2023-08-02", symbol: "SPY", netPnL: -332.33, status: "Loss" },
        { id: 5, date: "2023-08-02", symbol: "SPY", netPnL: -432.28, status: "Loss" },
      ]
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
