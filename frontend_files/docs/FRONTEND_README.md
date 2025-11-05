# TownPlanPay Frontend — Contractor Portal

**AI-Powered Milestone Verification & Instant USDC Disbursements**

This is a modern React dashboard for contractors to submit construction milestone evidence and receive instant USDC payments verified by AI, settled on the Arc testnet.

---

## 🎯 Overview

The TownPlanPay frontend is a **clean, modular React application** built with:

- **React 18** — Modern UI framework
- **Vite** — Lightning-fast development server
- **Tailwind CSS** — Utility-first styling
- **Responsive Design** — Works on desktop, tablet, mobile

### Key Features

✅ **Submit Milestone Evidence** — Upload photos, GPS coords, descriptions  
✅ **AI Verification** — Real-time approval decisions with confidence scores  
✅ **Instant USDC Payments** — Approved payments execute on Arc testnet  
✅ **Transaction History** — Track all payments with blockchain explorer links  
✅ **Project Status Dashboard** — Visual milestone timeline  
✅ **Professional UI** — Dark theme optimized for contractors worldwide  

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ (download from https://nodejs.org)
- npm or yarn package manager

### Installation

```bash
# Clone the repo
git clone https://github.com/wipernation/townplanpay.git
cd townplanpay/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at **http://localhost:5173** with hot-reload enabled.

### Build for Production

```bash
npm run build    # Creates optimized dist/ folder
npm run preview  # Preview production build locally
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── MilestoneForm.jsx         # Form for submitting evidence
│   │   ├── AIDecisionCard.jsx        # AI verification results display
│   │   ├── TransactionHistory.jsx    # Payment transaction table
│   │   └── ProjectStatus.jsx         # Milestone timeline & progress
│   ├── App.jsx                       # Main application component
│   ├── main.jsx                      # React entry point
│   └── index.css                     # Global styles + Tailwind
├── index.html                        # HTML template
├── vite.config.js                    # Vite configuration
├── tailwind.config.js                # Tailwind configuration
├── package.json                      # Dependencies & scripts
└── README.md                         # This file
```

---

## 🧩 Component Documentation

### App.jsx
**Main Application Container**

Manages:
- Tab navigation (Submit / History / Status)
- Transaction state management
- API calls to backend endpoints
- Sidebar quick stats display

```jsx
// Main state
const [transactions, setTransactions] = useState([...]);
const [aiDecision, setAiDecision] = useState(null);
const [loading, setLoading] = useState(false);
```

---

### MilestoneForm.jsx
**Contractor Evidence Submission Form**

Handles:
- Project name & milestone type selection
- GPS coordinates (with auto-detect button)
- Photo uploads with preview gallery
- Work description textarea
- Contractor wallet address
- Form validation

**Key Props:**
- `onSubmit` — Callback when form submitted
- `loading` — Boolean to disable form during processing

**Features:**
- Real-time form validation
- GPS auto-detection using browser geolocation
- Multiple photo upload with preview
- Clear UX with disabled state during submission

---

### AIDecisionCard.jsx
**AI Verification Results Display**

Shows:
- ✅ Approval status (approve/deny/error)
- 📊 Confidence score with color-coded progress bar
- 💰 Approved payment amount
- 📝 AI explanation/rationale
- 🔗 Transaction ID with blockchain link
- 💡 Helpful next-step guidance

**Responsive to Decision States:**
- **Approved** — Green theme, payment details, transaction ID
- **Denied** — Red theme, suggestions for improvement
- **Error** — Gray theme, support contact info

---

### TransactionHistory.jsx
**Payment Transaction Table**

Displays:
- Date submitted
- Milestone type
- Payment amount in USDC
- AI confidence score with progress bar
- Transaction ID with Arc explorer link
- Status (Paid/Pending)
- Summary statistics (total paid, avg confidence, etc.)

**Features:**
- Sortable by date (newest first)
- Click transaction ID to view on Arc testnet explorer
- Responsive table (scrollable on mobile)
- Empty state with helpful message

---

### ProjectStatus.jsx
**Milestone Timeline & Progress**

Shows:
- Overall project progress percentage
- Key metrics (milestones completed, total disbursed, network)
- Interactive milestone timeline with:
  - Completion status
  - Payment date & amount
  - AI confidence score
  - Connected visual flow

**Timeline Stages:**
1. 🚧 Site Preparation
2. 🏗️ Foundation Work
3. 🏢 Structural Work
4. 🛣️ Road Paving
5. 📦 Materials Delivered
6. ✨ Project 50% Complete

---

## 🔌 Backend Integration

The frontend expects these **API endpoints** from the backend:

### POST /suggest-milestone
**Purpose:** AI milestone verification decision

**Request Body:**
```json
{
  "image_score": 0.75,
  "inspector_confidence": 0.85,
  "percent_complete": 0.6,
  "notional_budget": 1000,
  "project_id": "RD-001",
  "milestone": "foundation",
  "description": "Foundation work completed...",
  "gpsCoordinates": "6.5244, 3.3792"
}
```

**Response:**
```json
{
  "decision": "approve",
  "suggested_amount": 600,
  "explanation": "Evidence verified. Heuristic score: 0.720",
  "confidence": 0.72
}
```

### POST /execute-payout
**Purpose:** Execute USDC transfer to contractor wallet

**Request Body:**
```json
{
  "project_id": "RD-001",
  "milestone": "foundation",
  "amount": 600,
  "contractor": "0x...",
  "confidence": 0.72
}
```

**Response:**
```json
{
  "status": "simulated",
  "tx_id": "0x7d9e...c42a",
  "timestamp": "2024-10-31T14:30:00Z"
}
```

---

## 🎨 Design System

### Colors
- **Primary Blue** — `#2563eb` (approvals, CTAs)
- **Success Green** — `#16a34a` (payments, confirmed)
- **Danger Red** — `#dc2626` (denials, errors)
- **Slate Gray** — `#334155` (backgrounds, text)
- **Cyan Accent** — `#06b6d4` (highlights)

### Typography
- **Heading 1** — 2xl (28px) bold
- **Heading 2** — xl (20px) bold
- **Body** — sm (14px) regular
- **Small** — xs (12px) regular

### Spacing
Uses Tailwind spacing scale: `0, 2, 4, 6, 8, 12, 16, 20, 24, ...`

### Breakpoints
- Mobile: default
- Tablet: `md` (768px)
- Desktop: `lg` (1024px)

---

## 🔐 Environment Variables

Create a `.env.local` file (ignored by git):

```env
# API Base URL (if not localhost)
VITE_API_URL=http://localhost:3000

# Optional: analytics, feature flags, etc
VITE_ENVIRONMENT=development
```

Access in code:
```jsx
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

---

## 📱 Responsive Behavior

- **Mobile (< 768px):** Single column, stacked components, full-width inputs
- **Tablet (768px - 1024px):** Two-column main layout, sidebar below
- **Desktop (> 1024px):** Three-column layout with sticky sidebar

---

## ♿ Accessibility

- Semantic HTML (`<button>`, `<form>`, `<label>`)
- Color contrast meets WCAG AA standards
- Keyboard navigation fully supported
- Focus indicators visible on all interactive elements
- ARIA labels on icon buttons

---

## 🧪 Testing

Currently uses manual testing. To add unit tests:

```bash
npm install --save-dev vitest @testing-library/react
```

Example test:
```jsx
import { render, screen } from '@testing-library/react';
import MilestoneForm from './components/MilestoneForm';

test('renders form with project name input', () => {
  render(<MilestoneForm onSubmit={() => {}} loading={false} />);
  expect(screen.getByPlaceholderText(/Lagos Road/i)).toBeInTheDocument();
});
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Connect GitHub repo to Vercel dashboard
# Auto-deploys on push to main branch
vercel
```

### Cloudflare Pages
```bash
npm run build
# Drag & drop dist/ folder to Cloudflare Pages dashboard
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 🤝 Contributing

1. **Fork the repo** and create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** with clear commit messages:
   ```bash
   git commit -m "Add milestone evidence carousel"
   ```

3. **Push and open a PR** linking related issues

4. **Code review** — Maintainers will provide feedback

**Code Style:**
- Use functional components with hooks
- Prop validation with TypeScript comments or PropTypes
- Max line length: 100 characters
- Single quotes for JSX strings

---

## 📋 Checklist for Adding New Features

- [ ] Create new component file in `src/components/`
- [ ] Add JSDoc comment block at top of file
- [ ] Use Tailwind for all styling (no CSS files)
- [ ] Test on mobile (use Chrome DevTools)
- [ ] Update this README if UI changes
- [ ] Commit message: `feat: brief description`
- [ ] Open PR with linked issue

---

## 🐛 Troubleshooting

### Vite not starting
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Styles not applying
- Check Tailwind config includes all file paths
- Rebuild: `npm run build`
- Clear browser cache (Cmd+Shift+Delete)

### API calls failing
- Check backend is running on `http://localhost:3000`
- Verify CORS headers allow frontend origin
- Check network tab in browser DevTools

### Forms not submitting
- Verify all required fields filled (marked with `*`)
- Check browser console for error messages
- Ensure backend endpoint returns correct JSON

---

## 📚 Resources

- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev
- **Tailwind Docs:** https://tailwindcss.com
- **Arc Testnet:** https://arc.io
- **Circle Payments:** https://www.circle.com/developers

---

## 📄 License

MIT License © 2025 Team Wipernation

See LICENSE file for details.

---

## 💬 Questions?

- Open an issue on GitHub
- Reach out to @Wiper15 on Discord
- Email: support@townplanpay.io

---

**Built with ❤️ by Team Wipernation — Scaling Global Infrastructure Payments**
