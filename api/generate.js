// api/generate.js
// Vercel serverless function — place in /api/generate.js at project root
// Environment variable required: ANTHROPIC_API_KEY

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { pairs, location } = req.body;

  if (!pairs || !location) {
    return res.status(400).json({ error: "Missing pairs or location" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const pairsText = pairs
    .map(p => `${p.cue} — ${p.contour}`)
    .join("\n");

  const prompt = `You are a design advisor working with a toolkit called Design Actions. The user is currently at: ${location}.

Their selected design action pairs are:
${pairsText}

Write a short, evocative, place-specific text of around 150–200 words that interprets these design actions for this specific location right now. Be concrete and grounded in the actual place — its character, its challenges, its possibilities. Do not write generic design advice. Write as if you are standing there with the user, interpreting what these actions might mean here and now. Use a thoughtful, direct tone. Write as flowing prose with no bullet points or headers.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic error:", err);
      return res.status(502).json({ error: "Upstream API error" });
    }

    const data = await response.json();
    const text = data.content?.find(b => b.type === "text")?.text || "";

    return res.status(200).json({ text });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
