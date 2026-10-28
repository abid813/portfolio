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
  { k: ["your name", "তোমার নাম", "নাম কি", "নাম কী", "who are you", "তুমি কে", "আপনি কে"],
    a: "I'm Abid's AI assistant 🤖 — I live here on his portfolio. My boss is Abidul Islam Abid, a full-stack web developer & AI automation specialist from Khulna, Bangladesh. Ask me anything about him!" },
  { k: ["born", "birth", "birthday", "age", "old", "জন্ম", "বয়স", "কোথায় জন্ম"],
    a: "Abid was born on 5 March 2003 in Kalia, Narail, Bangladesh — he's 23 now. Fun fact: on his very first day of school he said he'd become an expert web developer... and he actually did it! 🚀" },
  { k: ["can you do", "কি পারো", "কী পারো", "পারো কি", "what can you", "help me"],
    a: "I can tell you everything about Abid — his skills, projects, work experience, education, services, rates, and how to contact or hire him. Try: 'What are his skills?' or 'Tell me about his projects' 😊" },
  { k: ["made you", "created you", "built you", "তোমাকে কে", "কে বানিয়েছে"],
    a: "I was built for Abid's portfolio so visitors like you can chat and learn about him instantly. Pretty fun, right? Ask me about his projects!" },
  { k: ["thank", "ধন্যবাদ", "thanks"],
    a: "You're most welcome! 😊 Ask me anything else — or reach Abid directly on WhatsApp: +880 1793-582174" },
  { k: ["bye", "বাই", "টাটা", "goodbye", "see you"],
    a: "Goodbye! 👋 It was lovely chatting with you. If a project idea comes to mind, Abid is just a WhatsApp message away: +880 1793-582174" },
  { k: ["skill", "stack", "technology", "technologies", "know", "language", "tech"],
    a: "Abid is strongest on the frontend — HTML5, CSS3, JavaScript, React and Tailwind CSS. On the backend he works with Node.js, Express.js and Next.js, with MongoDB, PostgreSQL or Supabase for data. He also designs in Figma and builds AI automation systems (Telegram bots, email workflows)." },
  { k: ["project", "work", "portfolio", "built", "made", "প্রজেক্ট"],
    a: "His featured projects:\n1. Nightly News Digest Bot — AI automation that sends the world's top news (economy, conflict, finance) every night around 10 PM.\n2. VORMON 360 — complete Figma UI/UX design of a client app, built with his team.\n3. Smart Form Auto-Reply — automatic personalized thank-you emails after Google Form submissions." },
  { k: ["hire", "price", "rate", "cost", "charge", "upwork", "freelance", "দাম", "কত"],
    a: "Abid works on Upwork at $18/hr and also takes direct projects. He builds full-stack websites, landing pages, Figma designs and AI automation. Fastest contact: WhatsApp +8801793582174 or email abiduleislam@gmail.com." },
  { k: ["education", "study", "college", "school", "degree", "student", "পড়াশোনা", "পড়ে"],
    a: "He's currently completing his BA in Economics at Govt. Brajalal College, Khulna (2023–2026 expected). He scored A+ in HSC from Habibul Alom Birprotik College and GPA 4.89 in SSC from Bishnopur Hamidpur High School." },
  { k: ["contact", "email", "whatsapp", "phone", "reach", "message", "talk", "যোগাযোগ", "ইমেইল"],
    a: "You can reach Abid at:\n📧 abiduleislam@gmail.com\n💬 WhatsApp: +880 1793-582174\n💼 LinkedIn: abidul-islam-abid\n🐙 GitHub: github.com/abid813\nHe usually replies within a few hours." },
  { k: ["experience", "year", "long", "background", "অভিজ্ঞতা"],
    a: "Abid has 1.5+ years of hands-on experience. He's fully self-taught — he bought his first laptop during intermediate college and learned everything by building. Now he freelances on Upwork for international clients and works with local businesses in Bangladesh." },
  { k: ["who", "about", "abid", "yourself", "introduce", "কে আবিদ", "সম্পর্কে"],
    a: "Abidul Islam Abid is a full-stack web developer and AI automation specialist from Khulna, Bangladesh (born 5 March 2003, Narail). He dreamed of becoming a web developer on his very first day of school — and taught himself to code to make it real. He turns ideas into live, high-performing websites." },
  { k: ["automation", "ai", "bot", "telegram", "email", "অটোমেশন"],
    a: "AI automation is one of Abid's specialties! He builds systems that run on their own — like his nightly news digest bot (auto-collects and summarizes world news by category) and smart email auto-replies for form submissions. If your business has repetitive work, he can probably automate it." },
  { k: ["design", "figma", "ui", "ux", "ডিজাইন"],
    a: "Yes — Abid designs in Figma and has real client experience: he designed the complete VORMON 360 app interface with his team. He can take a project from Figma design all the way to deployed code." },
  { k: ["where", "location", "live", "from", "country", "bangladesh", "কোথায় থাকে", "ঠিকানা"],
    a: "Abid is based in Khulna, Bangladesh (GMT+6). He was born in Kalia, Narail. He works remotely with clients worldwide through Upwork." },
  { k: ["service", "offer", "provide", "e-commerce", "ecommerce", "commerce", "shop", "store", "business", "website", "সাইট", "বানাতে"],
    a: "Abid offers:\n• Full-stack websites — personal, business, e-commerce & portfolio sites, end to end\n• Figma UI/UX design for apps and websites\n• AI automation — systems that do repetitive work automatically\n\nWhatever your idea, share it on WhatsApp +880 1793-582174 and Abid will plan it with you! 😊" },
  { k: ["hello", "hi", "hey", "salam", "assalamu", "start", "হ্যালো", "সালাম", "কেমন"],
    a: "Hello! 👋 I'm Abid's AI assistant. Ask me about his skills, projects, experience, education — or how to hire him. I'm happy to help!" },
  { k: ["github", "code", "repo", "source", "গিটহাব"],
    a: "You can find Abid's code on GitHub: github.com/abid813 — this very portfolio is open there too! 😄" },
  { k: ["resume", "cv", "রিজিউমে"],
    a: "You can download Abid's resume using the Resume button in the top navigation bar. 📄" },
  { k: ["bangla", "বাংলা", "bangladesh"],
    a: "Yes, Abid is proudly Bangladeshi 🇧🇩 — based in Khulna, born in Narail. Feel free to ask me anything in Bangla or English!" },
];

const FALLBACK = "Hmm, I'm not sure about that one 🤔 — but I know everything about Abid! Try asking:\n• What's your name?\n• When was Abid born?\n• What are his skills / projects?\n• How much does he charge?\n• How can I contact him?\n\nOr WhatsApp Abid directly: +880 1793-582174 😊";

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

// Close on tap outside + Escape key (mobile friendly)
document.addEventListener("click", (e) => {
  if (chatWindow.hidden) return;
  if (chatWindow.contains(e.target)) return;
  if (e.target.closest("#chatLauncher, #heroAiBtn, #navAiBtn")) return;
  closeChat();
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeChat(); });

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
