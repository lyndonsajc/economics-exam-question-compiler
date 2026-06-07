export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body || {};
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing text" });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "OPENROUTER_API_KEY is missing in Vercel Environment Variables." });
    }

    const prompt = `
You are an experienced Singapore A-Level Economics teacher and examiner.

The text below may come from one or more Economics exam papers. Extract exam questions into structured records.

Important rules:
- Auto-detect H1 or H2.
- Auto-detect Essay or Case Study.
- For Case Study, capture the relevant extract/source material when present.
- Split separate questions into separate objects.
- If a question has part (a) and part (b), use separate objects when they are clearly separate parts, and put part as "(a)" or "(b)".
- Detect year, JC/source, question number, topic, syllabusArea, keywords.
- syllabusArea should be one of: Demand & Supply, Elasticities, Market Failure, Firms, Market Structure, Macroeconomics, Globalisation, Trade, Exchange Rate, Policies, Other.
- keywords should be a comma-separated string of searchable economics terms.
- Do not invent content that is not visible. Leave unknown fields blank.

Return JSON array only. No markdown. No explanation.

Each object must follow this exact shape:
[
  {
    "year": "",
    "jc": "",
    "level": "H1 or H2",
    "type": "Essay or Case Study",
    "qNumber": "",
    "part": "",
    "topic": "",
    "syllabusArea": "",
    "question": "",
    "extract": "",
    "answerOutline": "",
    "keywords": "",
    "extractSummary": ""
  }
]

Text:
${text.slice(0, 70000)}
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://economics-question-bank.vercel.app",
        "X-Title": "Economics Question Bank"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: "Return clean JSON only. No markdown." },
          { role: "user", content: prompt }
        ],
        temperature: 0.1
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(500).json({ error: data?.error?.message || data?.error || "AI request failed" });
    }

    return res.status(200).json({ result: data.choices?.[0]?.message?.content || "[]" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
