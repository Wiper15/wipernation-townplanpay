# Frontend Project Structure & Setup Guide

## 📁 Complete Directory Layout

```
townplanpay/
├── frontend/                    # Frontend React application (THIS FOLDER)
│   ├── src/
│   │   ├── components/
│   │   │   ├── MilestoneForm.jsx
│   │   │   ├── AIDecisionCard.jsx
│   │   │   ├── TransactionHistory.jsx
│   │   │   └── ProjectStatus.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/                  # Static assets (optional)
│   │   └── favicon.svg
│   ├── index.html               # HTML entry point
│   ├── package.json             # Dependencies
│   ├── vite.config.js           # Vite config
│   ├── tailwind.config.js       # Tailwind config
│   ├── postcss.config.js        # PostCSS config
│   ├── .gitignore               # Git ignore patterns
│   ├── FRONTEND_README.md       # Full documentation
│   └── QUICK_START.md           # This file
│
├── worker/                      # Cloudflare Workers (backend)
│   └── index.js
├── payments/                    # Payment logic
│   ├── mock_circle.py
│   └── README.md
├── ml/                          # ML validation
│   └── validator.js
├── README.md                    # Main project README
├── SECURITY.md                  # Security policy
└── requirements.txt             # Python dependencies
```

---

## 🚀 Complete Setup Instructions

### Step 1: Clone Repository
```bash
git clone https://github.com/wipernation/townplanpay.git
cd townplanpay/frontend
```

### Step 2: Install Node Modules
```bash
npm install
```

This installs:
- ✓ React 18
- ✓ Vite (dev server)
- ✓ Tailwind CSS
- ✓ Autoprefixer
- ✓ PostCSS

### Step 3: Start Development Server
```bash
npm run dev
```

Output:
```
  VITE v5.0.8  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 4: Open in Browser
Navigate to `http://localhost:5173`

You should see the TownPlanPay Contractor Portal with:
- 🏗️ Header with logo
- 📝 Submit Milestone tab (active)
- 📊 Quick Stats sidebar
- 💡 Pro Tips section

---

## 📋 What Each File Does

### Core React Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main component, manages state & tabs |
| `src/main.jsx` | Entry point for React |
| `src/index.css` | Tailwind imports + globals |

### Components

| Component | Purpose |
|-----------|---------|
| `MilestoneForm.jsx` | Form submission (photos, GPS, description) |
| `AIDecisionCard.jsx` | Display AI verification results |
| `TransactionHistory.jsx` | Table of all past transactions |
| `ProjectStatus.jsx` | Milestone timeline & progress bar |

### Configuration

| File | Purpose |
|------|---------|
| `package.json` | NPM dependencies & scripts |
| `vite.config.js` | Vite server settings & API proxy |
| `tailwind.config.js` | Tailwind color/font customization |
| `postcss.config.js` | PostCSS plugins (Tailwind, autoprefixer) |
| `index.html` | HTML template with root div |

---

## 🔧 Configuration Files (Already Included)

### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### .env.local (Create this)
```env
VITE_API_URL=http://localhost:3000
```

---

## 🎯 Running Different Commands

### Development
```bash
npm run dev        # Start dev server with hot reload
```

### Production Build
```bash
npm run build      # Optimize and minimize code
npm run preview    # Test production build locally
```

### Linting (Optional)
```bash
npm run lint       # Check code style
```

---

## 🔌 Connecting to Backend

### Option A: Local Backend
Backend runs on `http://localhost:3000`

Update `vite.config.js`:
```javascript
proxy: {
  '/suggest-milestone': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  },
  '/execute-payout': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  },
}
```

Then start both:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend (e.g., Python Flask)
python app.py
```

### Option B: Remote Backend
Update API URL in `.env.local`:
```env
VITE_API_URL=https://api.townplanpay.io
```

---

## 📦 Dependency Breakdown

### Production Dependencies
- **react** (18.3.1) — UI framework
- **react-dom** (18.3.1) — React DOM rendering

### Dev Dependencies
- **vite** (5.0.8) — Fast build tool
- **@vitejs/plugin-react** (4.2.1) — React support in Vite
- **tailwindcss** (3.3.6) — Utility CSS framework
- **postcss** (8.4.31) — CSS transformation
- **autoprefixer** (10.4.14) — Browser prefix support

---

## 🧪 Testing Setup (Optional)

### Install Testing Libraries
```bash
npm install --save-dev vitest @testing-library/react jsdom
```

### Create Test File
`src/components/__tests__/MilestoneForm.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MilestoneForm from '../MilestoneForm';

describe('MilestoneForm', () => {
  it('renders form inputs', () => {
    render(<MilestoneForm onSubmit={() => {}} loading={false} />);
    expect(screen.getByPlaceholderText(/Project Name/i)).toBeInTheDocument();
  });
});
```

### Run Tests
```bash
npm run test
```

---

## 🚀 Deployment Guides

### Deploy to Vercel
```bash
npm i -g vercel    # Install Vercel CLI
vercel             # Login and deploy
```

### Deploy to Netlify
```bash
npm run build
npm i -g netlify-cli
netlify deploy
```

### Deploy to Cloudflare Pages
1. `npm run build`
2. Upload `dist/` folder to Cloudflare Pages dashboard
3. Set build command: `npm run build`
4. Set publish directory: `dist`

---

## 🔒 Environment Security

**NEVER commit secrets!**

Ignored files (in `.gitignore`):
```
.env
.env.local
.env.*.local
```

Safe to commit:
```
.env.example (with dummy values)
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3001    # Use different port
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Tailwind Classes Not Working
```bash
# Check config paths are correct
npm run dev    # Restart server
```

### API Calls Failing
1. Verify backend is running
2. Check `/suggest-milestone` endpoint exists
3. Test with curl:
```bash
curl -X POST http://localhost:3000/suggest-milestone \
  -H "Content-Type: application/json" \
  -d '{"image_score": 0.7}'
```

---

## 📚 File-by-File Guide

### App.jsx (800 lines)
- Main state management
- Tab navigation logic
- API integration
- Layout structure
- Quick stats sidebar

**Key Functions:**
- `handleMilestoneSubmit()` — Process form data
- `executePayout()` — Trigger payment

### MilestoneForm.jsx (250 lines)
- Form inputs & validation
- Photo upload & preview
- GPS auto-detect
- Field disabling during loading

**Key Functions:**
- `handleInputChange()` — Update form state
- `handlePhotoUpload()` — Process images
- `handleAutoGPS()` — Browser geolocation
- `handleSubmit()` — Validate & submit

### AIDecisionCard.jsx (150 lines)
- Decision status display
- Confidence score visualization
- Payment details
- Transaction ID with links
- Helpful guidance messages

**Props:**
- `decision` — Object with {decision, confidence, suggested_amount, explanation, txId}

### TransactionHistory.jsx (200 lines)
- Table rendering
- Arc explorer links
- Confidence bars
- Summary statistics
- Empty state

**Props:**
- `transactions` — Array of transaction objects

### ProjectStatus.jsx (250 lines)
- Overall progress bar
- Milestone timeline
- Completion status
- Key metrics cards
- Info section

**Props:**
- `transactions` — Array of completed transactions

---

## 🎯 Next Steps After Setup

1. ✅ Start dev server: `npm run dev`
2. ✅ Test form submission
3. ✅ Connect to backend
4. ✅ Test photo upload
5. ✅ Test GPS auto-detect
6. ✅ Build for production: `npm run build`
7. ✅ Deploy to hosting

---

## 📞 Support

- **GitHub Issues:** https://github.com/wipernation/townplanpay/issues
- **Discord:** @Wiper15
- **Email:** support@townplanpay.io

---

## ✅ Setup Verification Checklist

- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Repository cloned
- [ ] `npm install` completed
- [ ] `npm run dev` running on port 5173
- [ ] Browser opens without errors
- [ ] All tabs clickable
- [ ] Form fields visible and editable
- [ ] Sidebar stats display

**When all boxes checked, you're ready to develop! 🚀**

---

**Built with ❤️ by Team Wipernation**
