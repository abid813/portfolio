"""Generate Abid's English resume PDF (CV-1: Web & AI focus).

Kept in sync with index.html. A second CV (IT & Digital Operations focus)
can be generated from the same data with a different section order.
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

OUT = r"C:\Users\pc\WorkBuddy AI\2026-10-28-20-53-36\portfolio\assets\Abidul_Islam_Abid_Resume.pdf"

ACCENT = HexColor("#10b981")
DARK = HexColor("#0f172a")
DIM = HexColor("#475569")

c = canvas.Canvas(OUT, pagesize=A4)
W, H = A4
M = 18 * mm
y = H - M


def line(dy, text, font="Helvetica", size=10, color=DARK, x=M):
    global y
    y -= dy
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString(x, y, text)


def section(title):
    global y
    y -= 5 * mm
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(ACCENT)
    c.drawString(M, y, title.upper())
    y -= 3 * mm
    c.setStrokeColor(ACCENT)
    c.setLineWidth(1.4)
    c.line(M, y, W - M, y)


def bullet(text, size=9.5):
    line(4.4 * mm, "•  " + text, size=size, color=DIM)


def cont(text, size=9.5):
    """Continuation line, indented to align with a bullet's text."""
    gap = 4.0 * mm
    c.setFont("Helvetica", size)
    c.setFillColor(DIM)
    c.drawString(M + 5 * mm, y - gap, text)
    return gap


# ── Header ──
line(0, "ABIDUL ISLAM ABID", "Helvetica-Bold", 22, DARK)
line(7 * mm, "Web Designer & Frontend Developer  |  AI Workflow & Automation Specialist", "Helvetica", 10.5, ACCENT)
line(5.5 * mm, "Khulna, Bangladesh (Remote Ready)  ·  abiduleislam@gmail.com  ·  WhatsApp: +880 1793-582174", size=9, color=DIM)
line(4.5 * mm, "github.com/abid813  ·  linkedin.com/in/abidul-islam-abid  ·  abid813.github.io/portfolio/", size=9, color=DIM)

section("Profile")
bullet("I build clean, responsive websites, streamline daily workflows with AI automation, and")
y -= cont("manage digital operations efficiently - turning ideas into live, reliable solutions, fast.")
bullet("Strong web fundamentals, a fast learner, and highly skilled at directing AI tools to research,")
y -= cont("debug, design and deliver work in a fraction of traditional time.")
bullet("Open to Remote (primary), Full-Time, Executive, Internship / Trainee and on-site roles in Khulna.")

section("Skills")
bullet("Frontend & Web Design: HTML5, CSS3, JavaScript (ES6+), React, Next.js, Tailwind CSS,")
y -= cont("Bootstrap, TypeScript, Responsive Web Design")
bullet("Backend & Database: Node.js, Express.js, REST APIs, Supabase, Firebase, MongoDB, PostgreSQL")
bullet("UI/UX & Prototyping: Figma, Wireframing, UI Design Systems, Landing Page Design")
bullet("AI & Automation: AI Prompt Engineering, AI-Assisted Development, Telegram Bots,")
y -= cont("Email & Form Automation, API Integration, Git & GitHub, Vercel / Netlify")
bullet("Office & Digital Ops: MS Excel (Data & Reporting), PowerPoint, Word, Google Workspace,")
y -= cont("Website Content Management, Windows OS & Troubleshooting")

section("Featured Projects")
line(5.5 * mm, "Moddhodanga Madrasa - Institutional Web Portal  (LIVE)", "Helvetica-Bold", 10, DARK)
bullet("Responsive institutional website and student homework portal with class-level content,")
y -= cont("clean Bengali typography and easy administration. https://moddhodanga-madrasa.netlify.app")
bullet("Source: github.com/abid813/moddodanga-madrasa")
line(3 * mm, "Satbaria Primary School - Progressive Web App  (PWA)", "Helvetica-Bold", 10, DARK)
bullet("School management web app with dynamic data handling, user authentication and a")
y -= cont("mobile-friendly installable PWA. Source: github.com/abid813/shatbaria-school-app")
line(3 * mm, "VORMON 360 - Mobile App UI/UX Design  (Team Project)", "Helvetica-Bold", 10, DARK)
bullet("Complete Figma interface, typography and color system - developer-ready UI screens.")
line(3 * mm, "Nightly News Digest & Smart Form Auto-Reply  (AI Automation)", "Helvetica-Bold", 10, DARK)
bullet("Automated daily categorized news delivery via Telegram plus instant personalized")
y -= cont("email auto-replies triggered by Google Form submissions.")

section("Experience & Practical Journey")
line(5.5 * mm, "Independent Web Developer & AI Automation Builder            2024 - Present", "Helvetica-Bold", 10, DARK)
bullet("Built and deployed responsive websites and custom web applications; developed Telegram")
y -= cont("news bots and smart form-to-email workflows using AI tools and APIs.")
line(3 * mm, "UI/UX Designer - VORMON 360 Mobile App                          2024", "Helvetica-Bold", 10, DARK)
bullet("Collaborated with a development team to translate client requirements into a clean,")
y -= cont("developer-ready Figma interface.")
line(3 * mm, "Local Web Solutions & Digital Support (Khulna)            2023 - Present", "Helvetica-Bold", 10, DARK)
bullet("Delivered practical digital solutions with peers for local institutions, including a")
y -= cont("live school/madrasa web portal, content updates and structured documentation.")

section("Beyond the Code")
bullet("Personal values: 5x Daily Salat (discipline), Active Blood Donor, Tree Plantation Advocate")
bullet("Professional strengths: Fast Learner, AI-Augmented Productivity, Structured Office")
y -= cont("Execution, Problem Solving, Team Collaboration, Ownership")

section("Education")
bullet("BA (Pass) in Economics (2023 - Present) - Govt. Brajalal (B.L.) College, Khulna")
bullet("HSC - Habibul Alom Birprotik College  |  GPA: 5.00 / A+")
bullet("SSC - Bishnopur Hamidpur High School  |  GPA: 4.89 / 5.00")

section("Languages")
bullet("Bengali - native    |    English - conversational (working proficiency)")

c.setFont("Helvetica", 8)
c.setFillColor(DIM)
c.drawString(M, 12 * mm, "Full project links, live demos and case studies: abid813.github.io/portfolio/")
c.showPage()
c.save()
print("OK:", OUT)
