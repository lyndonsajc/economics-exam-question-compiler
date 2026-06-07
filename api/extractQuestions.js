export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { text } = req.body || {};
    if (!text) return res.status(400).json({ error: "No text supplied" });
    if (!process.env.OPENROUTER_API_KEY) return res.status(500).json({ error: "OPENROUTER_API_KEY is not set in Vercel Environment Variables" });

    const prompt = `You are an expert Singapore A-Level Economics teacher and examiner.

Extract exam-paper questions from the text. IMPORTANT STRUCTURE:

1. ESSAY QUESTIONS
- One essay record per essay question number.
- Do NOT split Essay 5(a) and Essay 5(b) into separate records.
- Store Essay 5 as one record with partAQuestion and partBQuestion.
- Label essay subquestions clearly as (a) and (b).
- Capture marks if shown, e.g. [10], [15].

2. CASE STUDY QUESTIONS
- One full case study as one record.
- Do NOT save every subquestion as a separate record.
- Keep the full extract/source material together in extract.
- Store subquestions separately in partAQuestion to partGQuestion.
- Capture marks if shown.

3. AUTO-DETECT ALL METADATA
- year
- JC/source/school, e.g. RI, HCI, VJC, SAJC, A Level
- H1 or H2
- Essay or Case Study
- question number, e.g. Essay 5 or CSQ 1
- topic
- syllabusArea: Micro, Macro, International, Policy, Other
- keywords as an array of short economic terms

Return JSON array only. No markdown. Use this exact schema:
[
  {
    "year": "",
    "jc": "",
    "level": "H1 or H2",
    "type": "Essay or Case Study",
    "qNumber": "Essay 5 or CSQ 1",
    "topic": "",
    "syllabusArea": "Micro/Macro/International/Policy/Other",
    "extract": "full case study extract/source material if any",
    "extractSummary": "",
    "partAQuestion": "",
    "partAMarks": "",
    "partBQuestion": "",
    "partBMarks": "",
    "partCQuestion": "",
    "partCMarks": "",
    "partDQuestion": "",
    "partDMarks": "",
    "partEQuestion": "",
    "partEMarks": "",
    "partFQuestion": "",
    "partFMarks": "",
    "partGQuestion": "",
    "partGMarks": "",
    "keywords": []
  }
]

If a document contains only one case study, return one case study record with all extracts and all subquestions. If it contains essays, return one record per essay number.

Text:\n${String(text).slice(0, 120000)}`;

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
