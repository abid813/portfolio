"""Generate Abid's English resume PDF."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

OUT = r"C:\Users\pc\WorkBuddy AI\2026-10-28-20-53-36\portfolio\assets\Abidul_Islam_Abid_Resume.pdf"

ACCENT = HexColor("#10b981")
DARK = HexColor("#0f172a")
DIM = HexColor("#475569")
GOLD = HexColor("#b45309")

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

def rule():
    global y
    y -= 4 * mm
    c.setStrokeColor(ACCENT)
    c.setLineWidth(1.4)
    c.line(M, y, W - M, y)

def section(title):
    global y
    y -= 7 * mm
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(ACCENT)
    c.drawString(M, y, title.upper())
    rule()

def bullet(text, size=9.5):
    line(5.2 * mm, "•  " + text, size=size, color=DIM)

# ── Header ──
line(0, "ABIDUL ISLAM ABID", "Helvetica-Bold", 22, DARK)
line(7 * mm, "Full-Stack Web Developer  |  AI Automation Specialist", "Helvetica", 11.5, ACCENT)
line(5.5 * mm, "Khulna, Bangladesh  ·  abiduleislam@gmail.com  ·  WhatsApp: +880 1793-582174", size=9, color=DIM)
line(4.5 * mm, "github.com/abid813  ·  linkedin.com/in/abidul-islam-abid  ·  Upwork: $18/hr", size=9, color=DIM)

section("Profile")
bullet("Full-stack developer who turns ideas into live, high-performing websites - from Figma design to")
y -= 4.6 * mm; c.setFont("Helvetica", 9.5); c.setFillColor(DIM); c.drawString(M + 5 * mm, y, "production deployment. Self-taught since intermediate college; freelancing on Upwork.")
bullet("Builds AI automation systems (news digest bots, smart email workflows) that save clients hours weekly.")

section("Skills")
bullet("Frontend (advanced): HTML5, CSS3, JavaScript, React, Tailwind CSS, Bootstrap, Responsive Design")
bullet("Backend: Node.js, Express.js, Next.js, REST APIs, Python")
bullet("Databases: MongoDB, PostgreSQL, Supabase    |    Design: Figma (UI/UX), Landing Pages")
bullet("Automation: AI/LLM workflows, Telegram bots, Email automation, API integration, GitHub, Vercel")

section("Featured Projects")
line(5.5 * mm, "Nightly News Digest Bot  (AI Automation)", "Helvetica-Bold", 10, DARK)
bullet("Auto-collects the world's top news each night (~10 PM) by category - economy, conflict, finance -")
y -= 4.6 * mm; c.setFont("Helvetica", 9.5); c.setFillColor(DIM); c.drawString(M + 5 * mm, y, "and delivers a clean digest via Telegram. Zero manual work.")
line(3 * mm, "VORMON 360 - App UI/UX Design  (Client Project)", "Helvetica-Bold", 10, DARK)
bullet("Complete Figma interface design of the VORMON 360 mobile app, delivered with a team - from")
y -= 4.6 * mm; c.setFont("Helvetica", 9.5); c.setFillColor(DIM); c.drawString(M + 5 * mm, y, "wireframes to a developer-ready design system.")
line(3 * mm, "Smart Form Auto-Reply  (AI Automation)", "Helvetica-Bold", 10, DARK)
bullet("Sends personalized thank-you emails automatically when a Google Form is submitted.")

section("Experience")
line(5.5 * mm, "Full-Stack Developer & AI Automation - Upwork (Freelance)          2024 - Present", "Helvetica-Bold", 10, DARK)
bullet("Modern web apps and landing pages with React, Next.js and Tailwind CSS for international clients,")
y -= 4.6 * mm; c.setFont("Helvetica", 9.5); c.setFillColor(DIM); c.drawString(M + 5 * mm, y, "plus AI automation systems. Also serving local and national businesses in Bangladesh.")

section("Education")
bullet("BA in Economics (ongoing, 2023-2026 expected) - Govt. Brajalal College, Khulna")
bullet("HSC - Habibul Alom Birprotik College  |  Result: A+")
bullet("SSC - Bishnopur Hamidpur High School  |  GPA: 4.89 / 5.00")

section("Languages")
bullet("Bengali - native    |    English - conversational (working proficiency)")

c.setFont("Helvetica", 8)
c.setFillColor(DIM)
c.drawString(M, 12 * mm, "References and project case studies available on request.")
c.showPage()
c.save()
print("OK:", OUT)
