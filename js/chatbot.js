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
Never mention a birth date — his exact date of birth is intentionally not on the site.

PROFILE:
- Name: Abidul Islam Abid
- Role: Web Developer & AI Automation Executive; Web Designer & Frontend Developer
- Focus: Responsive Web Design, AI Workflow Automation, Digital & Office Operations
- Location: Khulna, Bangladesh (originally from Kalia, Narail). Remote Ready.
- Work preference: Remote / work from home is his first choice; on-site roles in Khulna second; Dhaka only as a backup.
- Open to: Remote roles, Full-Time jobs, Executive roles, Internships / Trainee positions
- Availability: actively looking for a job and immediately available
- Core strength: strong web fundamentals, fast at grasping explained concepts, and highly skilled at directing AI tools to research, debug, design and deliver work quickly
- Frontend: HTML5, CSS3, JavaScript (ES6+), React, Next.js, Tailwind CSS, Bootstrap, TypeScript, Responsive Web Design
- Backend & Database: Node.js, Express.js, REST APIs, Supabase, Firebase, MongoDB, PostgreSQL
- UI/UX: Figma, Wireframing, UI Design Systems, Landing Page Design
- AI & Automation: AI Prompt Engineering, AI-Assisted Development, Telegram Bots, Email & Form Automation, API Integration, Git & GitHub, Vercel / Netlify
- Office & Digital Operations: MS Excel (data & reporting), MS PowerPoint, MS Word, Google Workspace, Website Content Management, Windows OS & troubleshooting
- Professional strengths: Fast Learner & Adaptable, AI-Augmented Productivity, Structured Office Execution, Problem Solving, Team Collaboration, Ownership, Time Management
- Personal values: punctual with 5× daily Salat, active blood donor, tree plantation advocate
- Projects (live ones first):
  1. Moddhodanga Madrasa — live institutional website & student homework portal: https://moddhodanga-madrasa.netlify.app (source: github.com/abid813/moddodanga-madrasa)
  2. Satbaria Primary School — school management PWA with Firebase auth & Firestore (source: github.com/abid813/shatbaria-school-app)
  3. VORMON 360 — complete mobile app UI/UX design in Figma, delivered with a team
  4. Nightly News Digest & Smart Form Auto-Reply — AI automation delivering daily categorized news via Telegram plus instant personalized email auto-replies
- Practical experience: 2+ years of hands-on practice; independent web development, local client/community projects in Khulna, and team collaboration on VORMON 360. He has not yet held a formal corporate job, so present his real project delivery as his experience — never say he has "no experience".
- Education: BA (Pass) in Economics at Govt. Brajalal (B.L.) College, Khulna (2023–Present); HSC GPA 5.00 / A+ from Habibul Alom Birprotik College; SSC GPA 4.89 from Bishnopur Hamidpur High School
- Story: curiosity about technology from childhood, got his first laptop during higher secondary, largely self-taught through hands-on building
- Contact: abiduleislam@gmail.com · WhatsApp +8801793582174 · GitHub github.com/abid813 · LinkedIn linkedin.com/in/abidul-islam-abid
- Resume: downloadable via the Resume button in the top navigation
`;

// ── Local knowledge base (offline fallback) ──
const KB = [
  { k: ["your name", "তোমার নাম", "নাম কি", "নাম কী", "who are you", "তুমি কে", "আপনি কে"],
    a: "I'm Abid's AI assistant 🤖 — I live here on his portfolio. My boss is Abidul Islam Abid, a web developer & AI automation executive from Khulna, Bangladesh. Ask me anything about his skills, live projects, or work preference!" },
  { k: ["born", "birth", "birthday", "age", "old", "জন্ম", "বয়স", "কোথায় জন্ম"],
    a: "Abid hails from Kalia, Narail, and is now based in Khulna, Bangladesh. He's in his early twenties and keeps his exact birth date off the site. Need a personal detail? Just ask him on WhatsApp: +880 1793-582174 😊" },
  { k: ["can you do", "কি পারো", "কী পারো", "পারো কি", "what can you", "help me", "কী জানো"],
    a: "I can tell you everything about Abid — his skills, live projects, hands-on experience, education, work preference, and how to contact him. Try: 'What are his skills?', 'Show me his live projects', or 'Is he open to remote jobs?' 😊" },
  { k: ["made you", "created you", "built you", "তোমাকে কে", "কে বানিয়েছে"],
    a: "I was built for Abid's portfolio so visitors like you can learn about him instantly. Pretty fun, right? Ask me about his live projects!" },
  { k: ["thank", "ধন্যবাদ", "thanks"],
    a: "You're most welcome! 😊 Ask me anything else — or reach Abid directly on WhatsApp: +880 1793-582174" },
  { k: ["bye", "বাই", "টাটা", "goodbye", "see you"],
    a: "Goodbye! 👋 It was lovely chatting with you. If a role or project comes to mind, Abid is just a WhatsApp message away: +880 1793-582174" },
  { k: ["remote", "on-site", "onsite", "work from home", "job", "career", "internship", "intern", "trainee", "full-time", "full time", "open to work", "available", "hire", "hiring", "recruit", "vacancy", "position", "role", "চাকরি", "রিমোট", "জব", "ইন্টার্ন"],
    a: "Abid is actively looking for a job and available right now 🎯\n\n🌐 Remote / work from home — his first choice\n🏢 On-site roles in Khulna — second preference\n🚌 Dhaka — only as a backup with a confirmed paid role\n\nHe's open to Remote, Full-Time, Executive and Internship / Trainee positions in web design, AI automation, and IT & digital operations. Reach him at abiduleislam@gmail.com or WhatsApp +880 1793-582174." },
  { k: ["hard skill", "hard skills", "computer basic", "ms office", "excel", "ms word", "powerpoint", "microsoft", "office", "typing", "reporting", "অফিস", "এক্সেল"],
    a: "Alongside development, Abid is strong in Office & Digital Operations:\n\n📊 MS Excel — data & reporting\n📽️ MS PowerPoint — presentations\n📄 MS Word — documentation\n☁️ Google Workspace & website content management\n🖥️ Windows OS & troubleshooting\n\nThat mix — web, AI and office ops — is exactly what makes him useful in IT & digital operations or agency roles. 💼" },
  { k: ["skill", "stack", "technology", "technologies", "know", "language", "tech", "স্কিল"],
    a: "Abid's skills span 5 areas:\n\n🎨 Frontend & Web Design — HTML5, CSS3, JavaScript, React, Next.js, Tailwind, TypeScript, responsive design\n⚙️ Backend & DB — Node.js, Express, REST APIs, Supabase, Firebase, MongoDB, PostgreSQL\n📐 UI/UX — Figma, wireframing, design systems, landing pages\n🤖 AI & Automation — prompt engineering, AI-assisted development, Telegram bots, email/form automation, Git, Vercel/Netlify\n📊 Office & Digital Ops — Excel reporting, PowerPoint, Word, Google Workspace, web content management\n\nHe's especially strong on the frontend and at using AI tools to deliver work fast." },
  { k: ["project", "work", "portfolio", "built", "made", "demo", "live", "প্রজেক্ট"],
    a: "His featured projects — with real links you can click:\n\n1️⃣ Moddhodanga Madrasa (LIVE) — institutional website & homework portal → https://moddhodanga-madrasa.netlify.app\n2️⃣ Satbaria Primary School — school management PWA with Firebase auth & Firestore → github.com/abid813/shatbaria-school-app\n3️⃣ VORMON 360 — complete mobile app UI/UX design in Figma (team project)\n4️⃣ Nightly News Digest & Smart Form Auto-Reply — Telegram news bot + automatic personalized email replies\n\nJust scroll to the Projects section for the clickable links! 🚀" },
  { k: ["price", "rate", "cost", "charge", "salary", "upwork", "freelance", "দাম", "কত", "বেতন"],
    a: "Abid is currently focused on finding the right full-time, remote or internship role rather than quoting a freelance rate. For any opening, just email abiduleislam@gmail.com or WhatsApp +880 1793-582174 and he'll discuss details directly. 😊" },
  { k: ["education", "study", "college", "school", "degree", "student", "পড়াশোনা", "পড়ে"],
    a: "He's completing his BA (Pass) in Economics at Govt. Brajalal (B.L.) College, Khulna (2023–Present). HSC: GPA 5.00 / A+ from Habibul Alom Birprotik College. SSC: GPA 4.89 / 5.00 from Bishnopur Hamidpur High School." },
  { k: ["contact", "email", "whatsapp", "phone", "reach", "message", "talk", "যোগাযোগ", "ইমেইল"],
    a: "You can reach Abid at:\n📧 abiduleislam@gmail.com\n💬 WhatsApp: +880 1793-582174\n💼 LinkedIn: linkedin.com/in/abidul-islam-abid\n🐙 GitHub: github.com/abid813\n📍 Khulna, Bangladesh (remote ready)\nHe usually replies within a few hours." },
  { k: ["experience", "year", "long", "background", "অভিজ্ঞতা", "অফিস"],
    a: "Abid has 2+ years of hands-on practice. He's largely self-taught — he got his first laptop during higher secondary and learned by building. He has independently delivered responsive websites and AI automations, collaborated with peers on local institutional projects in Khulna, and worked in a team on the VORMON 360 UI/UX design. He hasn't held a formal corporate job yet, but he has real, demonstrable project delivery — the live projects are right here on this site. 💪" },
  { k: ["who", "about", "abid", "yourself", "introduce", "কে আবিদ", "সম্পর্কে"],
    a: "Abidul Islam Abid is a web developer & AI automation executive from Khulna, Bangladesh (originally from Kalia, Narail). He builds clean, responsive websites, streamlines workflows with AI automation, and handles digital operations efficiently. Curious about tech from childhood and largely self-taught, he's now actively looking for a remote or on-site role. 🌱" },
  { k: ["automation", "ai", "bot", "telegram", "email", "অটোমেশন", "এআই"],
    a: "AI automation is one of Abid's specialties! He builds systems that run on their own — a nightly news digest bot that collects and categorizes world news via Telegram, and smart personalized email auto-replies triggered by Google Form submissions. He's also skilled at using AI tools to research, debug and speed up everyday work." },
  { k: ["design", "figma", "ui", "ux", "ডিজাইন"],
    a: "Yes — Abid designs in Figma and has real team experience: he designed the complete VORMON 360 mobile app interface, including the typography and color system, and delivered developer-ready screens. He can take a project from Figma design all the way to deployed code." },
  { k: ["where", "location", "live", "from", "country", "bangladesh", "কোথায় থাকে", "ঠিকানা"],
    a: "Abid is based in Khulna, Bangladesh (GMT+6), originally from Kalia, Narail. He's remote-ready and happy to work with teams anywhere — on-site in Khulna is also a great fit. 🌍" },
  { k: ["service", "offer", "provide", "e-commerce", "ecommerce", "commerce", "shop", "store", "business", "website", "সাইট", "বানাতে", "কাজ"],
    a: "What Abid can do for a team:\n• Responsive websites & landing pages — from Figma design to live deployment\n• AI automation & smart productivity workflows (bots, form/email automation)\n• Website content management and maintenance\n• Office reporting & documentation — Excel, PowerPoint, Word, Google Workspace\n\nGot a role or a project in mind? WhatsApp +880 1793-582174 😊" },
  { k: ["hello", "hi", "hey", "salam", "assalamu", "start", "হ্যালো", "সালাম", "কেমন"],
    a: "Hello! 👋 I'm Abid's AI assistant. Ask me about his skills, live projects, experience, education — or whether he's open to remote work. I'm happy to help!" },
  { k: ["github", "code", "repo", "source", "গিটহাব"],
    a: "You can find Abid's code on GitHub: github.com/abid813 — including the Moddhodanga Madrasa site (github.com/abid813/moddodanga-madrasa), the Satbaria school PWA (github.com/abid813/shatbaria-school-app), and this very portfolio! 😄" },
  { k: ["resume", "cv", "রিজিউমে", "সিভি"],
    a: "You can download Abid's resume with the Resume button in the top navigation bar. 📄 It's synced with everything on this site." },
  { k: ["bangla", "বাংলা", "bangladesh"],
    a: "Yes, Abid is proudly Bangladeshi 🇧🇩 — based in Khulna, originally from Narail. Feel free to ask me anything in Bangla or English!" },
  { k: ["soft skill", "soft", "salat", "prayer", "নামাজ", "সালাত", "blood", "রক্ত", "tree", "গাছ", "plantation", "value", "discipline"],
    a: "Beyond code, Abid brings both character and professional strengths:\n\n🤲 Personal values — 5× daily Salat (discipline & time management), active blood donor, tree plantation advocate.\n💼 Professional strengths — fast learner & adaptable, AI-augmented productivity, structured office execution, problem solving, team collaboration & ownership.\n\nHe's the kind of teammate who takes responsibility and gets work done on time. 💚" },
  { k: ["hobby", "hobbies", "free time", "interest", "প্রিয়", "শখ"],
    a: "Abid's interests beyond coding:\n🕌 Praying 5× daily Salat (his top priority)\n🌱 Planting trees & caring for nature\n🩸 Donating blood regularly\nHe believes a developer should build a better world, not just better websites! 🌍" },
];

const FALLBACK = "Hmm, I'm not sure about that one 🤔 — but I know everything about Abid! Try asking:\n• What's your name?\n• What are his skills?\n• Show me his live projects\n• Is he open to remote jobs?\n• What's his experience?\n• How can I contact him?\n\nOr WhatsApp Abid directly: +880 1793-582174 😊";

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
    botSay("👋 Hi there! I'm Abid's AI assistant.\n\nI can tell you about his skills, live projects, hands-on experience — or whether he's open to remote work. What would you like to know?");
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
