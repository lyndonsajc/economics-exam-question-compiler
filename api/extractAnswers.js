export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { text, questions } = req.body || {};
    if (!text) return res.status(400).json({ error: "No answer text supplied" });
    if (!process.env.OPENROUTER_API_KEY) return res.status(500).json({ error: "OPENROUTER_API_KEY is not set in Vercel Environment Variables" });

    const compactQuestions = (questions || []).map(q => ({
      id: q.id, year: q.year, jc: q.jc, level: q.level, type: q.type, qNumber: q.qNumber,
      partAQuestion: q.partAQuestion, partBQuestion: q.partBQuestion, partCQuestion: q.partCQuestion,
      partDQuestion: q.partDQuestion, partEQuestion: q.partEQuestion, partFQuestion: q.partFQuestion, partGQuestion: q.partGQuestion
    }));

    const prompt = `You are an expert Singapore A-Level Economics teacher.

Match this answer key / mark scheme to the saved questions.
Rules:
- Match by year, JC/source, level, type, qNumber, and part label.
- For Essay, match answers to partAAnswer and partBAnswer.
- For Case Study, match answers to partAAnswer through partGAnswer.
- Do not guess if uncertain. Use confidence 0 to 1.
- Return only matches with confidence >= 0.70.

Return JSON array only:
[
  {"id":"saved question id", "part":"A/B/C/D/E/F/G", "answer":"answer text", "confidence":0.0, "reason":"short reason"}
]

Saved questions:\n${JSON.stringify(compactQuestions).slice(0, 60000)}

Answer key text:\n${String(text).slice(0, 100000)}`;

    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: "Return valid JSON only. No markdown. No commentary." },
          { role: "user", content: prompt }
        ]
      })
    });
    const data = await r.json();
    if (!r.ok) return res.status(500).json({ error: data?.error?.message || data?.error || "AI request failed" });
    return res.status(200).json({ result: data.choices?.[0]?.message?.content || "[]" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
