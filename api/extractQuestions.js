export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { text } = req.body || {};
    if (!text) return res.status(400).json({ error: "No text supplied" });
    if (!process.env.OPENROUTER_API_KEY) return res.status(500).json({ error: "OPENROUTER_API_KEY is not set in Vercel Environment Variables" });

    const prompt = `You are an expert Singapore A-Level Economics teacher and examiner.

Your job is to extract Economics exam questions accurately. Be strict and structured.

CRITICAL CLASSIFICATION RULES:
1. Classify as "Case Study" if the text contains ANY of these features:
- Extract 1, Extract 2, Extract 3, Source A/B, Table 1/2, Figure 1/2, chart/table references, or multiple data extracts.
- A set of subquestions (a), (b), (c), (d), (e), (f), (g) based on extracts.
- Paper 1 / Case Study / CSQ wording.
For case studies, return ONE record for the full case study. Do NOT split each subquestion into separate records.
Keep ALL extracts together in the extract field, preserving labels such as Extract 1, Extract 2, Table 1, Figure 1. If there are tables or figures, describe or preserve the OCR text.
Store subquestions in partAQuestion to partGQuestion. If subparts appear as (a)(i), (a)(ii), keep them inside partAQuestion clearly as (i), (ii).

2. Classify as "Essay" if the item is an essay question without source extracts.
For essay questions, return ONE record per essay number. Do NOT split (a) and (b) into separate records.
Store (a) in partAQuestion and (b) in partBQuestion. Capture marks in partAMarks and partBMarks.

SCHOOL NORMALISATION RULES:
Return canonical school names only:
- RI, Raffles Inst, RIJC → Raffles Institution
- HCI, HCJC, Hwa Chong → Hwa Chong Institution
- NJC → National Junior College
- VJC → Victoria Junior College
- EJC → Eunoia Junior College
- TJC → Temasek Junior College
- ASRJC, ASR → Anderson Serangoon Junior College
- ACJC → Anglo-Chinese Junior College
- SAJC, St Andrews JC → St Andrew's Junior College
- RVHS → River Valley High School
- DHS → Dunman High School
- NYJC → Nanyang Junior College
- JPJC → Jurong Pioneer Junior College
- TMJC → Tampines Meridian Junior College
- YIJC → Yishun Innova Junior College
- CJC → Catholic Junior College
- MI → Millennia Institute

QUESTION NUMBER RULES:
- Case studies must be named "Case Study 1", "Case Study 2".
- Essays must be named "Essay 1", "Essay 2", etc.
- For prelim papers, expected order is Case Study 1, Case Study 2, Essay 1 to Essay 6.
- For promo/other exams, allow flexible numbering but still use the clearest question number present.

KEYWORD RULES:
Return as many meaningful keywords as useful. Do NOT limit to 5.
Include economic concepts, policies, countries, firms, industries, markets, and case-specific terms.
Examples: PED, market failure, externalities, comparative advantage, exchange rate, BYD, China, EVs, tariffs, globalisation, subsidies, inflation, unemployment.

AUTO-DETECT:
- year
- school/JC/source
- H1 or H2
- Essay or Case Study
- question number
- topic
- syllabusArea: Micro, Macro, International, Policy, Other
- marks for each part if shown

Return JSON array only. No markdown. Use this exact schema:
[
  {
    "year": "",
    "jc": "",
    "level": "H1 or H2",
    "type": "Essay or Case Study",
    "qNumber": "Case Study 1 or Essay 5",
    "topic": "",
    "syllabusArea": "Micro/Macro/International/Policy/Other",
    "extract": "full case study extract/source material, preserving Extract 1, Extract 2, Table 1, Figure 1 labels",
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

Text:\n${String(text).slice(0, 140000)}`;

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
