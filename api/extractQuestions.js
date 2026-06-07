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
- Auto-detect ALL metadata from the paper text: H1/H2, Essay/Case Study, JC/source, year, question number, topic, syllabusArea and keywords.
- For ESSAY questions: return each essay question as a separate object. If the essay has part (a) and part (b), keep both parts together in the same object under subQuestions unless the paper clearly treats them as independent questions.
- For CASE STUDY questions: do NOT split parts (a) to (f)/(g) into separate records. Return ONE object per full case study.
- For a Case Study object, extract must contain the FULL case study source material, including all extracts, tables, data and article/source text that appears before the questions.
- For a Case Study object, question should be the overall case study title/context or "Case Study Question" if there is no title.
- For a Case Study object, subQuestions must contain ALL sub-questions from (a) to (f)/(g), preserving marks and numbering exactly where visible.
- For a Case Study object, qNumber should be like "Case Study 1", "CSQ 2" or the visible paper question number.
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
    "subQuestions": "",
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
