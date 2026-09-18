# Ashish – Developer Portfolio

A modern, high-performance, dark-first developer portfolio tailored specifically for software developer placements, technical recruiters, and internship opportunities.

Built with a focus on **Java development**, **Data Structures & Algorithms (DSA)** problem solving, and modern full-stack web engineering.

---

## 🚀 Key Highlights & Features

- **Dark-First Developer Aesthetic:** Designed with a refined slate/zinc palette and consistent emerald accent (`#10b981`), avoiding generic templates and excessive neon clutter.
- **Recruiter-Focused Hero:** Introduces core competencies with a status indicator for the active **SPARS** project and an interactive, clean Java code snippet card.
- **Featured Projects Showcase:** Comprehensive deep dive into **SPARS** (Student Performance & Skill Assessment System) detailing the specific **Problem**, engineered **Solution**, and **Technology** stack (Java, React, Firebase, Gemini API), plus modular editable slots for upcoming projects.
- **Dedicated Problem Solving (DSA) Section:** Categorized topics (Arrays, Binary Search, Sliding Window, Linked List, Trees, Backtracking) and interactive catalog of practiced algorithms with difficulty indicators—without artificial or inflated statistics.
- **Categorized Technical Skills:** Clean, percentage-free badges across Programming, Web Development, Databases, Developer Tools, and Core CS Concepts (OOP, DBMS, Computer Networks).
- **Single-File Data Management:** All personal links, project entries, contact addresses, and placeholders are centralized inside `src/data/portfolioData.ts` for instantaneous updates.
- **Auto-Hiding Social Links:** If any social or profile URL (LinkedIn, LeetCode, GitHub, Resume) is left empty (`""`), its respective button is automatically hidden rather than rendering a dead or broken link.
- **Accessibility & Motion:** Semantic HTML, ARIA attributes, keyboard-navigable focus states, and `prefers-reduced-motion` compliance.
- **Zero Horizontal Overflow:** Fully responsive layout verified across 320px, 375px, 430px, 768px, 1024px, and 1440px+ screens.

---

## 🛠️ Tech Stack

- **Frontend Library:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** Plus Jakarta Sans & Fira Code

---

## 📁 Project Structure

```
├── index.html                   # HTML entry point with SEO, OpenGraph & JSON-LD schema
├── metadata.json                # App metadata and permissions
├── package.json                 # Project dependencies and npm scripts
├── vite.config.ts               # Vite configuration with base: './' for GitHub Pages
├── README.md                    # Project documentation and deployment guide
└── src/
    ├── App.tsx                  # Main application layout assembling all sections
    ├── main.tsx                 # React DOM mount
    ├── index.css                # Tailwind CSS imports and typography
    ├── data/
    │   └── portfolioData.ts     # Centralized personal info, links & project entries
    └── components/
        ├── Navbar.tsx           # Sticky navigation with mobile menu and blur
        ├── Hero.tsx             # Recruiter hero with interactive Java code preview
        ├── About.tsx            # Professional narrative & engineering pillars
        ├── Skills.tsx           # Categorized badges (No fake percentages)
        ├── Projects.tsx         # SPARS feature showcase & editable project cards
        ├── DSA.tsx              # Problem-solving topics & practiced algorithm list
        ├── Learning.tsx         # Currently exploring cards & technical horizons
        ├── Contact.tsx          # Direct email copy, mailto, and configured socials
        ├── Footer.tsx           # Minimal copyright, social links & scroll-to-top
        └── ResumeModal.tsx      # Resume preview / contact modal
```

---

## 💻 Local Setup & Development

### 1. Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
npm install
```

### 3. Run Development Server
Start the local Vite development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` (or the port displayed in your terminal).

---

## 📦 Production Build

To test and compile the production bundle:

```bash
npm run build
```

This compiles optimized, minified static files into the `dist/` directory.

You can preview the built production output locally with:

```bash
npm run preview
```

---

## 🌐 GitHub Pages Deployment Instructions

This project is pre-configured with relative base paths (`base: './'` in `vite.config.ts`), making it immediately compatible with GitHub Pages.

### Method 1: Automatic Deployment with GitHub Actions (Recommended)

1. Push this repository to GitHub.
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Create a file at `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: |
          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install
          fi

      - name: Build static site
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. Push this workflow file. Every push to `main` will automatically compile and deploy your portfolio to your live GitHub Pages URL (e.g. `https://your-username.github.io/portfolio/`).

---

### Method 2: Manual Deployment using `gh-pages`

1. Install `gh-pages` as a development dependency:
   ```bash
   npm install --save-dev gh-pages
   ```
2. In `package.json`, add deployment scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run:
   ```bash
   npm run deploy
   ```
4. In GitHub repository **Settings** > **Pages**, select the `gh-pages` branch.

---

## ✏️ Personalizing Your Portfolio

Open `src/data/portfolioData.ts` to customize:
- `CONTACT_CONFIG.EMAIL`: Your direct email address
- `CONTACT_CONFIG.GITHUB_URL`: Your GitHub username profile URL
- `CONTACT_CONFIG.LINKEDIN_URL`: Your LinkedIn profile URL
- `CONTACT_CONFIG.LEETCODE_URL`: Your LeetCode profile URL
- `CONTACT_CONFIG.RESUME_URL`: Path to your resume PDF (e.g. place `resume.pdf` in `public/` and reference `'/resume.pdf'`)
- `PROJECTS`: Edit SPARS details or replace `Project 02` and `Project 03` placeholders with your own creations.

---

## 📄 License

This portfolio template is open-source and released under the [Apache-2.0 License](LICENSE).
