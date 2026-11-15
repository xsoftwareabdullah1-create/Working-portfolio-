# Abdullah — Developer Portfolio

A responsive, experimental developer portfolio for Abdullah. The visual direction is intentionally spacious and high-contrast: a pure-black canvas, dotted texture, condensed white typography, yellow accents, outlined technology tags and restrained motion.

## Experience

- Particle-built heart hero with a reduced-motion fallback
- Animated floating labels and a smooth desktop pointer
- A visual 18-cursor choreography with labels, replay, auto/pause and speed controls
- Live UI Lab that generates alternate interface concepts on demand
- Responsive “WHAT I BUILD WITH” toolbox and “HOW I GOT HERE” timeline
- Project cards for JARVIS, Train Simulator, TradeSphere and Minimal Invoice
- AI tools directory with official outbound links
- Keyboard-accessible mobile navigation and focus styles

## Important accuracy note

The 18 cursors are a **front-end visual simulation**. They do not represent real AI agents, remote collaborators or software agents editing the source code. The Live UI Lab generates pre-authored interface concepts in the browser; it is not an autonomous website-building service.

Project cards describe experiments and work in progress, not claims that every project is a finished public release.

## Files

- `index.html` — semantic page structure and content
- `style.css` — responsive design system, effects and mobile layouts
- `script.js` — cursor choreography, heart particles, navigation and UI concept generator
- `scripts/validate-site.mjs` — dependency-free content, link and responsive-feature checks
- `.github/workflows/ci.yml` — pull-request and branch validation
- `.github/workflows/pages.yml` — GitHub Pages deployment from `main`

## Validate locally

Requires Node.js 20 or newer:

```sh
node --check script.js
node scripts/validate-site.mjs
```

No package manager or third-party runtime dependency is needed.

## Public website

[https://xsoftwareabdullah1-create.github.io/Working-portfolio-/](https://xsoftwareabdullah1-create.github.io/Working-portfolio-/)

The repository is public. GitHub Pages deploys the root site from `main` when the Pages workflow runs successfully.

## Personalise

Edit the text and project descriptions in `index.html`. Add verified project demo/repository URLs as they become available. Replace the GitHub contact link with a preferred contact method when ready.
