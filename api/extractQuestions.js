export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body || {};
    if (!text || !String(text).trim()) {
      return res.status(400).json({ error: "No text provided" });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "OPENROUTER_API_KEY is not set in Vercel Environment Variables" });
    }

    const prompt = `
You are an experienced Singapore A-Level Economics teacher and examiner.

The text below comes from one or more Economics exam papers. Extract records for a searchable Economics question bank.

IMPORTANT CASE STUDY RULE:
- If the paper contains one full case study with several extracts and sub-questions (a), (b), (c), (d), (e), (f), or (g), return ONE record for that full case study.
- Do NOT split each sub-question into separate records.
- Put the full source material/extracts in "extract".
- Put all sub-questions in "subQuestions" as an array of objects with "part" and "question".
- The main "question" field should be the overall case study title/question heading, e.g. "Question 1: Japan's persistent economic difficulties".

ESSAY RULE:
- If it is an essay section with separate essay questions, return one record per essay question.

Auto-detect as much as possible:
- year
- JC/source/school, e.g. SAJC, RI, HCI, VJC, A Level, prelim, promo
- H1 or H2
- Essay or Case Study
- question number
- part if relevant
- topic
- syllabusArea: Micro, Macro, International, Firms, Market Failure, Elasticities, Demand and Supply, Policy, Other
- keywords as an array
- extractSummary

Return JSON array only. No markdown. No explanation.

Every object must use exactly this structure:
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
    "subQuestions": [
      { "part": "(a)", "question": "" }
    ],
    "extract": "",
    "answerOutline": "",
    "keywords": [],
    "extractSummary": ""
  }
]

Document text:
${String(text).slice(0, 90000)}
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: "Return valid JSON only. No markdown." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(500).json({ error: data?.error?.message || data?.error || "AI request failed" });
    }

    return res.status(200).json({ result: data.choices?.[0]?.message?.content || "[]" });
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}
