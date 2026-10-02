# Dhani | Portfolio

React + Vite + Three.js portfolio with a scroll-driven 3D background, a 3D skills sphere and tilting project cards.

## Run locally
```bash
npm install
npm run dev        # open the URL it prints (ends with /portfolio/)
```

## Build
```bash
npm run build      # output goes to dist/
npm run preview
```

## Deploy to GitHub Pages (repo name: portfolio)
1. Push this folder to https://github.com/Dhani213/portfolio (branch `main`).
2. On GitHub: Settings > Pages > Source: **GitHub Actions**.
3. Every push to `main` builds and deploys automatically to https://dhani213.github.io/portfolio/

If your repo has a different name, change `base` in `vite.config.js` to `"/<repo-name>/"`.

## Where to edit
- `src/data.js` - your name details, skills, projects, email and phone
- `src/index.css` - colours, background and layout
- `src/components/Scene.jsx` - the 3D background
- `src/components/Orb.jsx` - the 3D skills sphere
