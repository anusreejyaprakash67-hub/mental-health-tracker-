// ---------------- QUESTIONS ----------------
const questions = [
  "I found it hard to wind down.",
  "I was aware of dryness of my mouth.",
  "I couldn’t seem to experience any positive feeling at all.",
  "I experienced breathing difficulty.",
  "I found it difficult to work up the initiative to do things.",
  "I tended to over-react to situations.",
  "I experienced trembling.",
  "I felt that I was using a lot of nervous energy.",
  "I was worried about situations in which I might panic.",
  "I felt down-hearted and blue.",
  "I found myself getting agitated.",
  "I found it difficult to relax.",
  "I felt that I was close to panic.",
  "I felt I wasn’t worth much as a person.",
  "I felt that I was rather touchy.",
  "I felt scared without any good reason.",
  "I felt that life was meaningless.",
  "I experienced heart palpitations.",
  "I felt that I had nothing to look forward to.",
  "I felt restless and fidgety.",
  "I felt that I was intolerant of anything."
];

// ---------------- INDEX GROUPS ----------------
const depressionIdx = [2, 4, 9, 13, 16, 18];
const anxietyIdx    = [1, 3, 6, 8, 11, 14, 17];
const stressIdx     = [0, 5, 7, 10, 12, 15, 19, 20];

// ---------------- ADVICE ----------------
const ADVICE = {
  Depression: {
    Normal: "No clinical sign of depression. Maintain healthy routines.",
    Mild: "Mild depressive symptoms—try journaling and light exercise.",
    Moderate: "Moderate depression—consider counseling or therapy.",
    Severe: "Severe symptoms—seek professional mental health support.",
    "Extremely Severe": "Extremely severe—contact a professional immediately."
  },
  Anxiety: {
    Normal: "No clinical anxiety detected.",
    Mild: "Mild anxiety—practice breathing and mindfulness.",
    Moderate: "Moderate anxiety—consider CBT techniques.",
    Severe: "Severe anxiety—consult a mental health professional.",
    "Extremely Severe": "Extremely severe anxiety—seek urgent help."
  },
  Stress: {
    Normal: "Stress levels are normal.",
    Mild: "Mild stress—improve time management and relaxation.",
    Moderate: "Moderate stress—set boundaries and prioritize tasks.",
    Severe: "Severe stress—seek professional guidance.",
    "Extremely Severe": "Extremely severe stress—urgent support recommended."
  }
};

// ---------------- STATE ----------------
let currentQuestion = 0;
let answers = [];

// ---------------- LOAD FIRST QUESTION ----------------
document.getElementById("questionText").innerText = questions[currentQuestion];

// ---------------- ANSWER HANDLER ----------------
function answer(value) {
  answers.push(value);
  currentQuestion++;

  if (currentQuestion < questions.length) {
    document.getElementById("questionText").innerText = questions[currentQuestion];
  } else {
    showResult();
  }
}

// ---------------- SCORE CALCULATION ----------------
function computeScore(indexes) {
  return indexes.reduce((sum, i) => sum + answers[i], 0) * 2;
}

// ---------------- CLASSIFICATION ----------------
function classifyDepression(score) {
  if (score <= 9) return "Normal";
  if (score <= 13) return "Mild";
  if (score <= 20) return "Moderate";
  if (score <= 27) return "Severe";
  return "Extremely Severe";
}

function classifyAnxiety(score) {
  if (score <= 7) return "Normal";
  if (score <= 9) return "Mild";
  if (score <= 14) return "Moderate";
  if (score <= 19) return "Severe";
  return "Extremely Severe";
}

function classifyStress(score) {
  if (score <= 14) return "Normal";
  if (score <= 18) return "Mild";
  if (score <= 25) return "Moderate";
  if (score <= 33) return "Severe";
  return "Extremely Severe";
}

// ---------------- RESULT DISPLAY ----------------
function showResult() {
  const depScore = computeScore(depressionIdx);
  const anxScore = computeScore(anxietyIdx);
  const strScore = computeScore(stressIdx);

  const depSev = classifyDepression(depScore);
  const anxSev = classifyAnxiety(anxScore);
  const strSev = classifyStress(strScore);

  document.getElementById("options").style.display = "none";
  document.getElementById("questionText").style.display = "none";

  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";

  resultDiv.innerHTML = `
    <h2>Results</h2>

    <p><strong>Depression:</strong> ${depScore} (${depSev})</p>
    <p>${ADVICE.Depression[depSev]}</p>

    <p><strong>Anxiety:</strong> ${anxScore} (${anxSev})</p>
    <p>${ADVICE.Anxiety[anxSev]}</p>

    <p><strong>Stress:</strong> ${strScore} (${strSev})</p>
    <p>${ADVICE.Stress[strSev]}</p>
  `;
}
