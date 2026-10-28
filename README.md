# Abidul Islam Abid — Portfolio Website

A premium dark-themed portfolio: hero with live code window, animated stats,
bento about section with live clock, **orbiting skills animation**, tabbed tech
stack, experience timeline, featured projects, education, contact — plus a
**fixed AI chatbot** that answers questions about Abid.

## Run locally
Open `index.html` directly, or serve it:
```bash
cd portfolio
python -m http.server 8000
# → http://localhost:8000
```

## Deploy to GitHub Pages (free live link)
```bash
git init
git add .
git commit -m "My portfolio"
git branch -M main
git remote add origin https://github.com/abid813/portfolio.git
git push -u origin main
```
Then: repo **Settings → Pages → Source: main branch / (root) → Save**
Live at: `https://abid813.github.io/portfolio/`

Or drag the `portfolio` folder into https://app.netlify.com/drop for an instant link.

## Enable the full AI chatbot (optional, free)
The chatbot works offline out of the box. For full AI answers:
1. Get a free key at https://console.groq.com
2. Open `js/chatbot.js` and paste it into `GROQ_API_KEY`.

## Customizing
- Text/content: `index.html`
- Colors/fonts: top of `css/style.css` (`:root` variables)
- Photo: replace `assets/abid.jpeg`
- Resume: replace `assets/Abidul_Islam_Abid_Resume.pdf`
