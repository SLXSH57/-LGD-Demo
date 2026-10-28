import express from "express";
import "dotenv/config";

const app = express();
app.use(express.text({ type: "application/sdp", limit: "256kb" }));
app.use(express.static("realtime-demo"));

app.post("/session", async (req, res) => {
  if (!process.env.OPENAI_API_KEY) return res.status(500).send("OPENAI_API_KEY is missing");
  if (!req.body || !req.body.startsWith("v=")) return res.status(400).send("Invalid SDP offer");
  const session = {
    type: "realtime",
    model: process.env.REALTIME_MODEL || "gpt-realtime-mini",
    audio: { output: { voice: "marin" } },
  };
  const form = new FormData();
  form.set("sdp", req.body);
  form.set("session", JSON.stringify(session));
  try {
    const response = await fetch("https://api.openai.com/v1/realtime/calls", {
      method: "POST",
      headers: { Authorization: "Bearer " + process.env.OPENAI_API_KEY },
      body: form,
    });
    const body = await response.text();
    res.status(response.status).type(response.ok ? "application/sdp" : "text/plain").send(body);
  } catch (error) {
    console.error("Realtime session failed:", error);
    res.status(502).send("Failed to connect to Realtime API");
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log("Open http://localhost:" + port));
