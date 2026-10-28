/* ═══════ AI Chatbot — Abid's Assistant ═══════
   Works offline with built-in knowledge.
   Optional: paste a free Groq API key below for full AI answers.
   Get a key free at https://console.groq.com
*/
const GROQ_API_KEY = ""; // ← paste your key here, e.g. "gsk_..."

const ABID_PROFILE = `
You are the AI assistant on the portfolio website of Abidul Islam Abid.
Answer questions about him warmly and concisely (2-4 sentences). If asked something
unrelated to Abid or web development, politely steer back.

PROFILE:
- Name: Abidul Islam Abid
- Role: Full-Stack Web Developer & AI Automation specialist
- Location: Khulna, Bangladesh (born 5 March 2003, Kalia, Narail)
- Rate on Upwork: $18/hr
- Freelance: Upwork (international clients) + local/national businesses in Bangladesh
- Services: full-stack websites (personal, business, portfolio), Figma UI/UX design, AI automation systems
- Frontend (advanced): HTML5, CSS3, JavaScript, React, Tailwind CSS, Bootstrap, responsive design
- Backend: Node.js, Express.js, Next.js, REST APIs, Python
- Databases: MongoDB, PostgreSQL, Supabase
- Design: Figma (real client experience), landing pages
- Automation: AI automation, Telegram bots, email automation, API integration
- Projects:
  1. Nightly News Digest Bot — every night ~10 PM auto-collects top world news by category (economy, conflict, finance) and delivers a digest via Telegram
  2. VORMON 360 — complete Figma UI/UX design of a mobile app for a client (team project)
  3. Smart Form Auto-Reply — auto thank-you emails when someone submits a Google Form
- Education: BA Economics (ongoing, 2023–2026) at Govt. Brajalal College Khulna; HSC A+ from Habibul Alom Birprotik College; SSC GPA 4.89 from Bishnopur Hamidpur High School
- Story: dreamed of being a web developer since his first day of school; self-taught since intermediate
- Contact: abiduleislam@gmail.com · WhatsApp +8801793582174 · GitHub github.com/abid813 · LinkedIn abidul-islam-abid
`;

// ── Local knowledge base (offline fallback) ──
const KB = [
  { k: ["skill", "stack", "technology", "technologies", "know", "language", "tech"],
    a: "Abid is strongest on the frontend — HTML5, CSS3, JavaScript, React and Tailwind CSS. On the backend he works with Node.js, Express.js and Next.js, with MongoDB, PostgreSQL or Supabase for data. He also designs in Figma and builds AI automation systems (Telegram bots, email workflows)." },
  { k: ["project", "work", "portfolio", "built", "made"],
    a: "His featured projects:\n1. Nightly News Digest Bot — AI automation that sends the world's top news (economy, conflict, finance) every night around 10 PM.\n2. VORMON 360 — complete Figma UI/UX design of a client app, built with his team.\n3. Smart Form Auto-Reply — automatic personalized thank-you emails after Google Form submissions." },
  { k: ["hire", "price", "rate", "cost", "charge", "upwork", "freelance"],
    a: "Abid works on Upwork at $18/hr and also takes direct projects. He builds full-stack websites, landing pages, Figma designs and AI automation. Fastest contact: WhatsApp +8801793582174 or email abiduleislam@gmail.com." },
  { k: ["education", "study", "college", "school", "degree", "student"],
    a: "He's currently completing his BA in Economics at Govt. Brajalal College, Khulna (2023–2026 expected). He scored A+ in HSC from Habibul Alom Birprotik College and GPA 4.89 in SSC from Bishnopur Hamidpur High School." },
  { k: ["contact", "email", "whatsapp", "phone", "reach", "message", "talk"],
    a: "You can reach Abid at:\n📧 abiduleislam@gmail.com\n💬 WhatsApp: +880 1793-582174\n💼 LinkedIn: abidul-islam-abid\n🐙 GitHub: github.com/abid813\nHe usually replies within a few hours." },
  { k: ["experience", "year", "long", "background"],
    a: "Abid has 1.5+ years of hands-on experience. He's fully self-taught — he bought his first laptop during intermediate college and learned everything by building. Now he freelances on Upwork for international clients and works with local businesses in Bangladesh." },
  { k: ["who", "about", "abid", "yourself", "introduce"],
    a: "Abidul Islam Abid is a full-stack web developer and AI automation specialist from Khulna, Bangladesh (born 5 March 2003, Narail). He dreamed of becoming a web developer on his very first day of school — and taught himself to code to make it real. He turns ideas into live, high-performing websites." },
  { k: ["automation", "ai", "bot", "telegram", "email"],
    a: "AI automation is one of Abid's specialties! He builds systems that run on their own — like his nightly news digest bot (auto-collects and summarizes world news by category) and smart email auto-replies for form submissions. If your business has repetitive work, he can probably automate it." },
  { k: ["design", "figma", "ui", "ux"],
    a: "Yes — Abid designs in Figma and has real client experience: he designed the complete VORMON 360 app interface with his team. He can take a project from Figma design all the way to deployed code." },
  { k: ["where", "location", "live", "from", "country", "bangladesh"],
    a: "Abid is based in Khulna, Bangladesh (GMT+6). He was born in Kalia, Narail. He works remotely with clients worldwide through Upwork." },
  { k: ["service", "offer", "do", "provide", "help"],
    a: "Abid offers:\n• Full-stack websites — personal, business & portfolio sites, end to end\n• Figma UI/UX design for apps and websites\n• AI automation — systems that do repetitive work automatically\nWhat's your project idea? 😊" },
  { k: ["hello", "hi", "hey", "salam", "assalamu", "start"],
    a: "Hello! 👋 I'm Abid's AI assistant. Ask me about his skills, projects, experience, or how to hire him — I'm happy to help!" },
  { k: ["github", "code", "repo", "source"],
    a: "You can find Abid's code on GitHub: github.com/abid813" },
  { k: ["resume", "cv"],
    a: "You can download Abid's resume using the Resume button in the top navigation bar, or the contact section. 📄" },
];

const FALLBACK = "Great question! I know all about Abid's skills, projects, experience, education, services and how to hire him — try asking about one of those. For anything specific, WhatsApp him directly: +880 1793-582174 😊";

// ── UI wiring ──
const chatWindow = document.getElementById("chatWindow");
const chatFab = document.getElementById("chatFab");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const teaser = document.getElementById("chatTeaser");
let greeted = false;

function openChat() {
  chatWindow.hidden = false;
  if (teaser) teaser.style.display = "none";
  if (!greeted) {
    greeted = true;
    botSay("👋 Hi there! I'm Abid's AI assistant.\n\nI can tell you about his skills, projects, experience — or help you hire him. What would you like to know?");
  }
  chatInput.focus();
}
function closeChat() { chatWindow.hidden = true; }

chatFab.addEventListener("click", () => (chatWindow.hidden ? openChat() : closeChat()));
document.getElementById("chatClose").addEventListener("click", closeChat);
document.getElementById("teaserClose").addEventListener("click", (e) => { e.stopPropagation(); teaser.style.display = "none"; });
document.getElementById("heroAiBtn")?.addEventListener("click", openChat);
document.getElementById("navAiBtn")?.addEventListener("click", openChat);

// Auto-teaser after a few seconds
setTimeout(() => { if (!greeted && teaser) teaser.style.display = "flex"; }, 3500);

// Suggestion chips
document.querySelectorAll("#chatSuggestions button").forEach((b) =>
  b.addEventListener("click", () => { chatInput.value = b.dataset.q; chatForm.requestSubmit(); })
);

function addMsg(text, who) {
  const div = document.createElement("div");
  div.className = `chat-msg ${who}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}
function botSay(text) { addMsg(text, "bot"); }

function showTyping() {
  const t = document.createElement("div");
  t.className = "chat-msg bot typing";
  t.innerHTML = "<span></span><span></span><span></span>";
  chatMessages.appendChild(t);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return t;
}

// ── Answer engine ──
function localAnswer(q) {
  const query = q.toLowerCase();
  let best = null, bestScore = 0;
  for (const item of KB) {
    const score = item.k.reduce((s, kw) => s + (query.includes(kw) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = item; }
  }
  return bestScore > 0 ? best.a : FALLBACK;
}

async function askGroq(q) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: ABID_PROFILE },
        { role: "user", content: q },
      ],
      max_tokens: 220,
    }),
  });
  if (!res.ok) throw new Error("Groq error");
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const q = chatInput.value.trim();
  if (!q) return;
  addMsg(q, "user");
  chatInput.value = "";
  const typing = showTyping();
  try {
    const answer = GROQ_API_KEY ? await askGroq(q) : localAnswer(q);
    typing.remove();
    // small delay so it feels natural
    setTimeout(() => botSay(answer), GROQ_API_KEY ? 0 : 500);
  } catch {
    typing.remove();
    botSay(localAnswer(q)); // graceful offline fallback
  }
});
