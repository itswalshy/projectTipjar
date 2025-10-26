# TipJar - Starbucks Tip Distribution Calculator

A web application designed to simplify and fairly distribute cash tips among Starbucks partners based on their tippable hours.

## 🎯 Problem Solved

As a barista at Starbucks, handling weekly cash tips is time-consuming and often results in unfair distribution - partners at the end of the list often get most of the $1 bills. TipJar automates this process to ensure fair, efficient tip distribution.

## ✨ Features

- **📸 Photo-to-Data** – Upload a photo of your Tip Distribution Report directly in the browser.
- **🔍 On-Device OCR** – Tesseract.js runs locally to extract partner names and hours (no server required).
- **💰 Smart Distribution** – Calculates fair payouts based on hours worked.
- **💵 Bill Optimization** – Provides exact bill breakdown ($20, $10, $5, $1) so you know what to pull from the till.
- **📊 Distribution History** – Previous calculations are saved to your browser using `localStorage`.
- **✏️ Manual Entry** – Fallback option if OCR results need correction.
- **🔒 Privacy First** – Images and partner data never leave the device; everything happens in your browser session.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd projectTipjar

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

```bash
# Build for production
npm run build

# Preview the build locally
npm run preview
```

### Deployment

This repository ships with `.github/workflows/deploy.yml`, a GitHub Actions workflow that builds the Vite app and publishes it to GitHub Pages.

1. Push to the `main` branch (or trigger the **Deploy to GitHub Pages** workflow manually).
2. In your repository settings, enable GitHub Pages and choose **GitHub Actions** as the source.
3. The workflow will build the site, upload the `dist/` folder, and publish it to the `gh-pages` branch using `actions/deploy-pages`.

The workflow sets `VITE_BASE_PATH` to `/<repository-name>/` so the app works when served from `https://<user>.github.io/<repository-name>/`. If you are deploying to a custom domain or a user/organization site (`<user>.github.io`), override that environment variable (e.g., `VITE_BASE_PATH=/`) in the workflow or repository secrets.

Prefer to host elsewhere? Run `npm run build` and serve the static files in the `dist/` directory with any static host (Cloudflare Pages, Netlify, S3, etc.).

## 📖 How to Use

### Step 1: Upload Report

1. Take a clear photo of your Starbucks Tip Distribution Report
2. Click "Upload Report" in TipJar
3. Select your image

### Step 2: Review Extracted Data

The app will automatically extract:
- Partner names
- Tippable hours for each partner
- Total hours

Review the extracted data for accuracy.

### Step 3: Enter Tip Amount

Enter the total cash tip amount to distribute.

### Step 4: Calculate Distribution

Click "Calculate Distribution" to see:
- Each partner's payout
- Exact bill breakdown for each partner
- Total distribution summary

### Step 5: Distribute Tips

Use the bill breakdown to count out exact cash for each partner.

## 📁 Project Structure

```
projectTipjar/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── lib/            # Client-side helpers (ocrClient, distribution, persistence)
│   │   └── pages/          # Page components
│   └── index.html
│
├── shared/                # Shared logic used by both client and legacy server
│   ├── ocrParser.ts       # Starbucks OCR parsing rules
│   └── schema.ts          # Shared types
│
├── .github/workflows/     # GitHub Actions pipelines
│   └── deploy.yml         # Builds + deploys to GitHub Pages
│
├── server/                # Legacy Express utilities (not required for GitHub Pages build)
│   └── ...
│
└── *.md                   # Additional documentation and migration notes
```

## 🛠️ Technology Stack

**Frontend:**
- React 19 + TypeScript
- Vite + Tailwind CSS
- Wouter (routing) & Radix UI components
- Tesseract.js for in-browser OCR
- Local storage for persistence

**Legacy utilities (optional):**
- The `server/` folder contains the previous Express implementation and Azure integrations for reference. They are not required when deploying to GitHub Pages.

## 🔐 Privacy & Security

- **Local-Only Processing** – Images never leave the browser; OCR runs with Tesseract.js on the client.
- **Persistent Storage Control** – Partner rosters and history live in `localStorage`; clear your browser data to reset.
- **Optional Legacy Integrations** – Azure Document Intelligence helpers remain in the `server/` folder for teams that still need them, but they are not required for GitHub Pages deployments.

## 📝 Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production
npm run build            # Build for production
npm run preview          # Preview the production build locally

# Type Checking
npm run check            # Run TypeScript type checking
```

## 🐛 Troubleshooting

### OCR Not Working

1. Check image quality - ensure good lighting and focus
2. Make sure image shows the complete report table
3. Try manual entry as fallback
4. Copy the extracted text shown in the app to verify what the OCR engine detected.

### Low OCR Accuracy

- Use well-lit photos
- Keep camera straight (avoid angles)
- Ensure text is readable
- Use higher resolution images
- See [OCR_IMPLEMENTATION.md](OCR_IMPLEMENTATION.md) for tuning

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📊 Performance

- **First OCR Run:** ~5 seconds while the browser downloads and initializes the Tesseract worker.
- **Subsequent Runs:** 2-3 seconds for similarly sized photos (the worker stays warm).
- **Image Guidance:** sharp, well-lit photos with the full table in frame yield the best results.
- **Supported Image Sizes:** Up to ~10MB (browser memory permitting).
- **Supported Formats:** JPG, PNG, WebP.

## 🤝 Contributing

This project was created to solve a real problem at Starbucks Store #69600. If you have ideas for improvements:

1. Test thoroughly with real Tip Distribution Reports
2. Ensure privacy compliance is maintained
3. Document any OCR improvements
4. Consider scalability for multiple stores

## 👤 Author

**William Walsh**  
Starbucks Store #69600

_"If there's a Will, There's a Way!"_ - Lauren 2025

## 📄 License

MIT

## 🙏 Acknowledgments

- Starbucks partners who provided feedback
- The team at Store #69600
- Open source contributors to Tesseract.js and Sharp

---

**Note:** This application is designed for Starbucks tip distribution but is not officially affiliated with Starbucks Corporation.
