<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Economics Question Bank</title>

  <!-- Document extraction -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <script src="https://unpkg.com/mammoth/mammoth.browser.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js"></script>

  <!-- Export tools -->
  <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #f3f4f6;
      color: #111827;
    }
    header {
      background: #111827;
      color: white;
      padding: 16px;
      text-align: center;
    }
    header h1 { margin: 0; font-size: 24px; }
    .container {
      max-width: 1180px;
      margin: 0 auto;
      padding: 16px;
    }
    .card {
      background: white;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .login-card {
      max-width: 420px;
      margin: 40px auto;
    }
    input, select, textarea, button {
      width: 100%;
      padding: 10px;
      margin: 6px 0 10px;
      font-size: 15px;
      border-radius: 8px;
      border: 1px solid #d1d5db;
    }
    textarea { min-height: 90px; resize: vertical; }
    button {
      background: #2563eb;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: bold;
    }
    button:hover { background: #1d4ed8; }
    button.secondary { background: #4b5563; }
    button.secondary:hover { background: #374151; }
    button.green { background: #059669; }
    button.green:hover { background: #047857; }
    button.danger { background: #dc2626; }
    button.danger:hover { background: #b91c1c; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 10px;
    }
    .question-card { border-left: 6px solid #2563eb; }
    .tags span {
      display: inline-block;
      background: #dbeafe;
      color: #1e3a8a;
      padding: 4px 8px;
      margin: 3px;
      border-radius: 999px;
      font-size: 13px;
    }
    .status { color: #047857; font-weight: bold; font-size: 14px; }
    .error { color: #dc2626; font-weight: bold; font-size: 14px; }
    .small { color: #6b7280; font-size: 13px; }
    #app { display: none; }
  </style>
</head>

<body>
<header>
  <h1>Economics Question Bank</h1>
</header>

<div class="container">
  <div id="loginPage" class="card login-card">
    <h2>Economics Question Bank</h2>
    <input id="passcodeInput" type="password" placeholder="Passcode" autocomplete="current-password" />
    <button id="loginBtn" type="button">Enter</button>
    <p id="loginError" class="error"></p>
  </div>

  <main id="app">
    <div class="card">
      <h2>AI Settings</h2>
      <input id="apiKeyInput" type="password" placeholder="Paste OpenRouter API Key here" autocomplete="off" />
      <button id="saveApiKeyBtn" class="green" type="button">Save AI Key</button>
      <button id="clearApiKeyBtn" class="secondary" type="button">Clear AI Key</button>
      <p id="apiKeyStatus" class="small"></p>
    </div>

    <div class="card">
      <h2>Upload PDF / Word Documents</h2>
      <input type="file" id="docUpload" accept=".pdf,.docx,.png,.jpg,.jpeg" multiple />
      <label class="small" style="display:flex;gap:8px;align-items:center;margin:8px 0;">
        <input id="forceOcr" type="checkbox" style="width:auto;margin:0;" />
        Force OCR for scanned/image PDFs
      </label>
      <button id="extractBtn" type="button">Extract Text from Uploaded Files</button>
      <textarea id="uploadedText" placeholder="Extracted text from all uploaded files will appear here"></textarea>
      <button id="aiUploadBtn" class="green" type="button">AI Capture Questions + Extracts + Keywords</button>
      <p id="uploadStatus" class="status"></p>
    </div>

    <div class="card">
      <h2>Add / Edit Question</h2>
      <input type="hidden" id="editId" />
      <div class="grid">
        <input id="year" placeholder="Year e.g. 2026" />
        <input id="jc" placeholder="JC / Source e.g. SAJC / RI / A Level" />
        <select id="level">
          <option value="H1">H1</option>
          <option value="H2" selected>H2</option>
        </select>
        <select id="type">
          <option value="Essay">Essay</option>
          <option value="Case Study">Case Study</option>
        </select>
        <input id="qNumber" placeholder="Question Number e.g. CSQ 1 / Essay 3" />
        <input id="topic" placeholder="Topic e.g. Market Failure" />
      </div>
      <textarea id="question" placeholder="Question"></textarea>
      <textarea id="extract" placeholder="Case study extract / source material"></textarea>
      <textarea id="keywords" placeholder="AI captured economic keywords"></textarea>
      <textarea id="extractSummary" placeholder="AI captured extract summary"></textarea>
      <button id="aiSingleBtn" type="button">AI Capture Keywords / Topic / Extract Summary</button>
      <button id="saveBtn" class="green" type="button">Save to Firebase</button>
      <button id="clearBtn" class="secondary" type="button">Clear Form</button>
      <p id="saveStatus" class="status"></p>
    </div>

    <div class="card">
      <h2>Search / Filter / Export</h2>
      <div class="grid">
        <input id="searchText" placeholder="Search question, topic, keyword, extract..." />
        <select id="filterYear"><option value="">All Years</option></select>
        <select id="filterJC"><option value="">All JC / Sources</option></select>
        <select id="filterLevel">
          <option value="">All H1/H2</option>
          <option value="H1">H1</option>
          <option value="H2">H2</option>
        </select>
        <select id="filterType">
          <option value="">All Types</option>
          <option value="Essay">Essay</option>
          <option value="Case Study">Case Study</option>
        </select>
      </div>
      <button id="exportExcelBtn" class="secondary" type="button">Export Displayed Questions to Excel</button>
      <button id="exportWordBtn" class="secondary" type="button">Export Displayed Questions to Word</button>
      <button id="exportPDFBtn" class="secondary" type="button">Export Displayed Questions to PDF</button>
      <p id="countStatus" class="small"></p>
      <p id="firebaseStatus" class="small"></p>
    </div>

    <div id="questionList"></div>
  </main>
</div>

<script>
  // Login is deliberately outside the Firebase module so it cannot get stuck.
  const APP_PASSCODE = "7728";
  const loginPage = document.getElementById("loginPage");
  const appPage = document.getElementById("app");
  const passcodeInput = document.getElementById("passcodeInput");
  const loginBtn = document.getElementById("loginBtn");
  const loginError = document.getElementById("loginError");

  function unlockApp() {
    const typed = passcodeInput.value.trim();
    if (typed === APP_PASSCODE) {
      loginPage.style.display = "none";
      appPage.style.display = "block";
      loginError.textContent = "";
      window.dispatchEvent(new Event("app-unlocked"));
    } else {
      loginError.textContent = "Wrong passcode.";
    }
  }

  loginBtn.addEventListener("click", unlockApp);
  passcodeInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") unlockApp();
  });
</script>

<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";



  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }

  const firebaseConfig = {
    apiKey: "AIzaSyC2LkAw5ntmHlquHVl91eX2G5FhDCnHLWE",
    authDomain: "economics-exam-question.firebaseapp.com",
    projectId: "economics-exam-question",
    storageBucket: "economics-exam-question.firebasestorage.app",
    messagingSenderId: "9657008627",
    appId: "1:9657008627:web:5e9b2102d13a074bc1d286"
  };

  // AI key is stored in this browser only. No code editing needed.
  function getOpenRouterKey() {
    return localStorage.getItem("openrouterKey") || "";
  }

  function updateApiKeyStatus() {
    const key = getOpenRouterKey();
    const status = el("apiKeyStatus");
    if (!status) return;
    status.textContent = key ? "AI key saved in this browser." : "No AI key saved yet.";
  }

  function saveApiKey() {
    const key = el("apiKeyInput").value.trim();
    if (!key) {
      alert("Paste your OpenRouter API key first.");
      return;
    }
    localStorage.setItem("openrouterKey", key);
    el("apiKeyInput").value = "";
    updateApiKeyStatus();
    alert("AI key saved.");
  }

  function clearApiKey() {
    localStorage.removeItem("openrouterKey");
    el("apiKeyInput").value = "";
    updateApiKeyStatus();
    alert("AI key cleared.");
  }

  let db = null;
  let questionsRef = null;
  let questions = [];

  const el = id => document.getElementById(id);

  const fields = {
    editId: el("editId"),
    year: el("year"),
    jc: el("jc"),
    level: el("level"),
    type: el("type"),
    qNumber: el("qNumber"),
    topic: el("topic"),
    question: el("question"),
    extract: el("extract"),
    keywords: el("keywords"),
    extractSummary: el("extractSummary")
  };

  function initFirebase() {
    try {
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
      questionsRef = collection(db, "examQuestions");
      el("firebaseStatus").textContent = "Firebase connected.";
      return true;
    } catch (err) {
      console.error(err);
      el("firebaseStatus").textContent = "Firebase not connected. Check Firebase config and Firestore setup.";
      return false;
    }
  }

  async function loadQuestions() {
    if (!questionsRef) return;
    try {
      const snapshot = await getDocs(questionsRef);
      questions = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      renderQuestions();
    } catch (err) {
      console.error(err);
      el("firebaseStatus").textContent = "Could not load from Firebase. Check Firestore rules.";
    }
  }

  window.addEventListener("app-unlocked", async () => {
    initFirebase();
    updateApiKeyStatus();
    renderQuestions();
    await loadQuestions();
  });

  function getFormItem() {
    return {
      year: fields.year.value.trim(),
      jc: fields.jc.value.trim(),
      level: fields.level.value,
      type: fields.type.value,
      qNumber: fields.qNumber.value.trim(),
      topic: fields.topic.value.trim(),
      question: fields.question.value.trim(),
      extract: fields.extract.value.trim(),
      keywords: fields.keywords.value.trim(),
      extractSummary: fields.extractSummary.value.trim(),
      updatedAt: new Date().toISOString()
    };
  }

  async function saveQuestion() {
    if (!questionsRef) {
      alert("Firebase is not connected yet.");
      return;
    }

    const item = getFormItem();
    if (!item.year || !item.jc || !item.question) {
      alert("Please fill in Year, JC/source and Question.");
      return;
    }

    try {
      if (fields.editId.value) {
        await updateDoc(doc(db, "examQuestions", fields.editId.value), item);
        el("saveStatus").textContent = "Updated in Firebase.";
      } else {
        await addDoc(questionsRef, item);
        el("saveStatus").textContent = "Saved to Firebase.";
      }
      clearForm();
      await loadQuestions();
    } catch (err) {
      console.error(err);
      alert("Could not save. Check Firestore rules.");
    }
  }

  function editQuestion(id) {
    const q = questions.find(x => x.id === id);
    if (!q) return;

    fields.editId.value = q.id;
    fields.year.value = q.year || "";
    fields.jc.value = q.jc || "";
    fields.level.value = q.level || "H2";
    fields.type.value = q.type || "Essay";
    fields.qNumber.value = q.qNumber || "";
    fields.topic.value = q.topic || "";
    fields.question.value = q.question || "";
    fields.extract.value = q.extract || "";
    fields.keywords.value = q.keywords || "";
    fields.extractSummary.value = q.extractSummary || "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteQuestion(id) {
    if (!confirm("Delete this question?")) return;
    try {
      await deleteDoc(doc(db, "examQuestions", id));
      await loadQuestions();
    } catch (err) {
      console.error(err);
      alert("Could not delete. Check Firestore rules.");
    }
  }

  function clearForm() {
    Object.values(fields).forEach(input => input.value = "");
    fields.level.value = "H2";
    fields.type.value = "Essay";
  }

  function getFilteredQuestions() {
    const search = el("searchText").value.toLowerCase();
    const fy = el("filterYear").value;
    const fj = el("filterJC").value;
    const fl = el("filterLevel").value;
    const ft = el("filterType").value;

    return questions
      .filter(q => {
        const combined = Object.values(q).join(" ").toLowerCase();
        return (!search || combined.includes(search)) &&
          (!fy || q.year === fy) &&
          (!fj || q.jc === fj) &&
          (!fl || q.level === fl) &&
          (!ft || q.type === ft);
      })
      .sort((a, b) => {
        const byYear = String(b.year || "").localeCompare(String(a.year || ""));
        if (byYear !== 0) return byYear;
        const byJC = String(a.jc || "").localeCompare(String(b.jc || ""));
        if (byJC !== 0) return byJC;
        return String(a.qNumber || "").localeCompare(String(b.qNumber || ""));
      });
  }

  function renderQuestions() {
    updateFilters();
    const filtered = getFilteredQuestions();
    el("countStatus").textContent = `${filtered.length} question(s) displayed.`;
    el("questionList").innerHTML = "";

    if (filtered.length === 0) {
      el("questionList").innerHTML = `<div class="card">No questions found.</div>`;
      return;
    }

    filtered.forEach(q => {
      const div = document.createElement("div");
      div.className = "card question-card";
      div.innerHTML = `
        <h3>${safe(q.year)} | ${safe(q.jc)} | ${safe(q.level)} | ${safe(q.type)} | ${safe(q.qNumber)}</h3>
        <p><b>Topic:</b> ${safe(q.topic || "-")}</p>
        <p><b>Question:</b><br>${format(q.question)}</p>
        ${q.extract ? `<p><b>Case Study Extract:</b><br>${format(q.extract)}</p>` : ""}
        ${q.extractSummary ? `<p><b>Extract Summary:</b><br>${format(q.extractSummary)}</p>` : ""}
        <div class="tags">${(q.keywords || "").split(",").map(k => k.trim()).filter(Boolean).map(k => `<span>${safe(k)}</span>`).join("")}</div>
        <button type="button" data-edit="${q.id}">Edit</button>
        <button class="danger" type="button" data-delete="${q.id}">Delete</button>
      `;
      el("questionList").appendChild(div);
    });
  }

  function updateFilters() {
    fillSelect(el("filterYear"), [...new Set(questions.map(q => q.year).filter(Boolean))].sort().reverse(), "All Years");
    fillSelect(el("filterJC"), [...new Set(questions.map(q => q.jc).filter(Boolean))].sort(), "All JC / Sources");
  }

  function fillSelect(select, values, firstLabel) {
    const current = select.value;
    select.innerHTML = `<option value="">${firstLabel}</option>`;
    values.forEach(v => {
      const option = document.createElement("option");
      option.value = v;
      option.textContent = v;
      select.appendChild(option);
    });
    select.value = current;
  }

  function safe(text) {
    return String(text || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }

  function format(text) {
    return safe(text || "").replace(/\n/g, "<br>");
  }

  async function extractFromDocument() {
    const files = Array.from(el("docUpload").files || []);
    if (files.length === 0) {
      alert("Upload at least one PDF, Word document, or image first.");
      return;
    }

    el("uploadStatus").textContent = "Extracting text from files...";
    let combined = "";

    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const file = files[fileIndex];
      el("uploadStatus").textContent = `Processing ${fileIndex + 1}/${files.length}: ${file.name}`;

      try {
        let text = "";
        const name = file.name.toLowerCase();

        if (name.endsWith(".pdf")) {
          text = await extractPdfText(file, fileIndex + 1, files.length);
        } else if (name.endsWith(".docx")) {
          text = await extractDocxText(file);
        } else if (name.endsWith(".png") || name.endsWith(".jpg") || name.endsWith(".jpeg")) {
          text = await ocrImageFile(file, `OCR image ${fileIndex + 1}/${files.length}: ${file.name}`);
        } else {
          text = `[Skipped unsupported file: ${file.name}]`;
        }

        combined += `

===== FILE: ${file.name} =====

${text}`;
      } catch (err) {
        console.error(err);
        combined += `

===== FILE: ${file.name} =====

[Could not extract this file]`;
      }
    }

    el("uploadedText").value = combined.trim();
    el("uploadStatus").textContent = `Extracted text from ${files.length} file(s). Ready for AI capture.`;
  }

  async function extractPdfText(file, fileIndex, totalFiles) {
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      el("uploadStatus").textContent = `Reading PDF text ${fileIndex}/${totalFiles}: ${file.name}, page ${i}/${pdf.numPages}`;
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(" ") + "

";
    }

    const forceOcr = el("forceOcr") && el("forceOcr").checked;
    const usefulText = text.replace(/\s+/g, "").length;

    if (forceOcr || usefulText < 100) {
      let ocrText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        el("uploadStatus").textContent = `OCR scanned PDF ${fileIndex}/${totalFiles}: ${file.name}, page ${i}/${pdf.numPages}`;
        const page = await pdf.getPage(i);
        const canvas = await renderPdfPageToCanvas(page);
        const pageText = await ocrCanvas(canvas, `OCR ${file.name} page ${i}/${pdf.numPages}`);
        ocrText += pageText + "

";
      }
      return ocrText.trim() || text.trim();
    }

    return text.trim();
  }

  async function renderPdfPageToCanvas(page) {
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;
    return canvas;
  }

  async function ocrCanvas(canvas, label) {
    if (!window.Tesseract) {
      throw new Error("Tesseract OCR library not loaded.");
    }

    const result = await Tesseract.recognize(canvas, "eng", {
      logger: m => {
        if (m.status && typeof m.progress === "number") {
          const pct = Math.round(m.progress * 100);
          el("uploadStatus").textContent = `${label}: ${m.status} ${pct}%`;
        }
      }
    });

    return result.data.text || "";
  }

  async function ocrImageFile(file, label) {
    if (!window.Tesseract) {
      throw new Error("Tesseract OCR library not loaded.");
    }

    const result = await Tesseract.recognize(file, "eng", {
      logger: m => {
        if (m.status && typeof m.progress === "number") {
          const pct = Math.round(m.progress * 100);
          el("uploadStatus").textContent = `${label}: ${m.status} ${pct}%`;
        }
      }
    });

    return result.data.text || "";
  }

  async function extractDocxText(file) {
    const buffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    return result.value;
  }

  async function aiCaptureSingleQuestion() {
    const prompt = `
You are an experienced Singapore A-Level Economics teacher.

From the text below, identify:
1. main economics topic
2. important searchable economic keywords
3. concise extract summary if there is an extract

Return JSON only:
{
  "topic": "",
  "keywords": "",
  "extractSummary": ""
}

Question:
${fields.question.value}

Extract:
${fields.extract.value}
`;

    const result = await callAI(prompt);
    try {
      const data = JSON.parse(cleanJson(result));
      fields.topic.value = data.topic || fields.topic.value;
      fields.keywords.value = data.keywords || fields.keywords.value;
      fields.extractSummary.value = data.extractSummary || fields.extractSummary.value;
    } catch {
      alert("AI output could not be read:\n\n" + result);
    }
  }

  async function aiCaptureFromUploadedText() {
    if (!questionsRef) {
      alert("Firebase is not connected yet.");
      return;
    }

    const text = el("uploadedText").value.trim();
    if (!text) {
      alert("Extract document text first.");
      return;
    }

    el("uploadStatus").textContent = "AI is capturing questions and extracts...";

    const prompt = `
You are an experienced Singapore A-Level Economics teacher.

The text below is from one or more Economics exam papers.

Extract:
- year if available
- JC/source if available
- H1 or H2 if available
- whether each item is Essay or Case Study
- question number
- topic
- full question
- case study extract if relevant
- keywords for searching
- short extract summary if relevant

Return JSON array only. No markdown.

Each object must follow this format:
[
  {
    "year": "",
    "jc": "",
    "level": "H1 or H2",
    "type": "Essay or Case Study",
    "qNumber": "",
    "topic": "",
    "question": "",
    "extract": "",
    "keywords": "",
    "extractSummary": ""
  }
]

Document text:
${text.slice(0, 50000)}
`;

    const result = await callAI(prompt);

    try {
      const arr = JSON.parse(cleanJson(result));
      if (!Array.isArray(arr)) throw new Error("AI did not return array");

      let saved = 0;
      for (const item of arr) {
        if (!item.question) continue;
        await addDoc(questionsRef, {
          year: item.year || "",
          jc: item.jc || "",
          level: item.level || "H2",
          type: item.type || "Essay",
          qNumber: item.qNumber || "",
          topic: item.topic || "",
          question: item.question || "",
          extract: item.extract || "",
          keywords: item.keywords || "",
          extractSummary: item.extractSummary || "",
          updatedAt: new Date().toISOString()
        });
        saved++;
      }

      el("uploadStatus").textContent = `Saved ${saved} item(s) to Firebase.`;
      await loadQuestions();
    } catch (err) {
      console.error(err);
      el("uploadStatus").textContent = "";
      alert("AI output could not be saved automatically. Raw output:\n\n" + result);
    }
  }

  async function callAI(prompt) {
    const apiKey = getOpenRouterKey();

    if (!apiKey) {
      alert("Paste your OpenRouter API key in the AI Settings box, then click Save AI Key.");
      return "{}";
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: "Return clean JSON only. No markdown." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(data);
      alert("AI request failed. Check OpenRouter API key or model.");
      return "{}";
    }
    return data.choices?.[0]?.message?.content || "{}";
  }

  function cleanJson(text) {
    return String(text || "").replace(/```json/g, "").replace(/```/g, "").trim();
  }

  function exportExcel() {
    const data = getFilteredQuestions().map(q => ({
      Year: q.year,
      JC: q.jc,
      Level: q.level,
      Type: q.type,
      "Question Number": q.qNumber,
      Topic: q.topic,
      Question: q.question,
      Extract: q.extract,
      Keywords: q.keywords,
      "Extract Summary": q.extractSummary
    }));

    if (data.length === 0) return alert("No questions to export.");

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Exam Questions");
    XLSX.writeFile(wb, "economics_exam_questions.xlsx");
  }

  async function exportWord() {
    const filtered = getFilteredQuestions();
    if (filtered.length === 0) return alert("No questions to export.");

    const { Document, Packer, Paragraph, TextRun } = docx;
    const children = [
      new Paragraph({ children: [new TextRun({ text: "Economics Exam Questions", bold: true, size: 32 })] }),
      new Paragraph("")
    ];

    filtered.forEach(q => {
      children.push(
        new Paragraph({ children: [new TextRun({ text: `${q.year || ""} | ${q.jc || ""} | ${q.level || ""} | ${q.type || ""} | ${q.qNumber || ""}`, bold: true })] }),
        new Paragraph(`Topic: ${q.topic || "-"}`),
        new Paragraph(`Question: ${q.question || "-"}`),
        new Paragraph(`Extract: ${q.extract || "-"}`),
        new Paragraph(`Keywords: ${q.keywords || "-"}`),
        new Paragraph(`Extract Summary: ${q.extractSummary || "-"}`),
        new Paragraph("")
      );
    });

    const docFile = new Document({ sections: [{ children }] });
    const blob = await Packer.toBlob(docFile);
    downloadBlob(blob, "economics_exam_questions.docx");
  }

  function exportPDF() {
    const filtered = getFilteredQuestions();
    if (filtered.length === 0) return alert("No questions to export.");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    let y = 10;
    pdf.setFontSize(14);
    pdf.text("Economics Exam Questions", 10, y);
    y += 10;
    pdf.setFontSize(10);

    filtered.forEach(q => {
      const text = `
${q.year || ""} | ${q.jc || ""} | ${q.level || ""} | ${q.type || ""} | ${q.qNumber || ""}

Topic: ${q.topic || "-"}

Question:
${q.question || "-"}

Extract:
${q.extract || "-"}

Keywords:
${q.keywords || "-"}

Extract Summary:
${q.extractSummary || "-"}
`;
      const lines = pdf.splitTextToSize(text, 180);
      lines.forEach(line => {
        if (y > 280) {
          pdf.addPage();
          y = 10;
        }
        pdf.text(line, 10, y);
        y += 6;
      });
      y += 8;
    });
    pdf.save("economics_exam_questions.pdf");
  }

  function downloadBlob(blob, filename) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  }

  el("saveApiKeyBtn").addEventListener("click", saveApiKey);
  el("clearApiKeyBtn").addEventListener("click", clearApiKey);
  el("saveBtn").addEventListener("click", saveQuestion);
  el("clearBtn").addEventListener("click", clearForm);
  el("extractBtn").addEventListener("click", extractFromDocument);
  el("aiUploadBtn").addEventListener("click", aiCaptureFromUploadedText);
  el("aiSingleBtn").addEventListener("click", aiCaptureSingleQuestion);
  el("exportExcelBtn").addEventListener("click", exportExcel);
  el("exportWordBtn").addEventListener("click", exportWord);
  el("exportPDFBtn").addEventListener("click", exportPDF);

  ["searchText", "filterYear", "filterJC", "filterLevel", "filterType"].forEach(id => {
    el(id).addEventListener("input", renderQuestions);
    el(id).addEventListener("change", renderQuestions);
  });

  el("questionList").addEventListener("click", e => {
    const editId = e.target.getAttribute("data-edit");
    const deleteId = e.target.getAttribute("data-delete");
    if (editId) editQuestion(editId);
    if (deleteId) deleteQuestion(deleteId);
  });
</script>
</body>
</html>
