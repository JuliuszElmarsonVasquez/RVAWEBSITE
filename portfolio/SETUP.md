# 📁 E-Portfolio — Setup Guide
## Juliusz Elmarson P. Vasquez

---

## FOLDER STRUCTURE

```
portfolio/
├── index.html          ← Main webpage (open this in browser)
├── style.css           ← All styles & dark theme
├── script.js           ← Animations & interactions
├── images/             ← Place ALL your images here
│   ├── profile.jpg     ← Your profile photo
│   ├── image(2).png    ← Your quiz output screenshot
│   └── professor.jpg   ← Your professor's photo
└── SETUP.md            ← This guide
```

---

## WHERE TO PUT YOUR IMAGES

Place these 3 files inside the `images/` folder:

| File Name        | What It Is                     |
|------------------|-------------------------------|
| `profile.jpg`    | Your profile photo (hero)      |
| `image(2).png`   | Quiz output screenshot         |
| `professor.jpg`  | Your professor's photo         |

✅ Make sure the filenames match EXACTLY (including the parentheses in `image(2).png`).
✅ If your professor photo has a different filename, open `index.html` and find:
   `src="images/professor.jpg"` → change it to your actual filename.

---

## HOW TO RUN IN VS CODE WITH LIVE SERVER

### Step 1 — Install Live Server (one-time setup)
1. Open **VS Code**
2. Click the **Extensions** icon on the left sidebar (or press `Ctrl+Shift+X`)
3. Search for **"Live Server"** by Ritwick Dey
4. Click **Install**

### Step 2 — Open the project
1. In VS Code, go to **File → Open Folder**
2. Select the `portfolio` folder
3. You should see `index.html`, `style.css`, `script.js`, and `images/` in the Explorer

### Step 3 — Launch the website
1. Right-click on `index.html` in the Explorer panel
2. Select **"Open with Live Server"**
3. Your browser will open at `http://127.0.0.1:5500/index.html`
4. The page auto-refreshes whenever you save any file ✨

### Alternative — Open directly in browser
- Simply double-click `index.html` in your file explorer
- It will open in your default browser (no server needed for this project)

---

## FEATURES INCLUDED

- ✅ Dark elegant theme with gold accents
- ✅ Smooth scroll-reveal animations on every section
- ✅ Responsive navbar with mobile hamburger menu
- ✅ Hero section with rotating glow ring around photo
- ✅ Interactive tilt effect on cards (desktop)
- ✅ Mouse parallax blobs in hero section
- ✅ Quiz image auto-rotates if portrait orientation detected
- ✅ Glassmorphism quiz showcase frame
- ✅ Timeline layout for Experience section
- ✅ Instructor photo in Feedback section
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth scrolling navigation
- ✅ Active nav link highlighting on scroll

---

## CUSTOMIZATION TIPS

- **Change your name or bio** → Edit text inside `index.html`
- **Change colors** → Edit CSS variables at the top of `style.css` (`:root { ... }`)
- **Add/remove sections** → Copy a section block in `index.html`
- **Change fonts** → Replace the Google Fonts link in `<head>` of `index.html`

---

Good luck with your school requirement! 🎓
