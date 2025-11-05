# TownPlanPay Frontend — Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

→ Opens at `http://localhost:5173`

### Step 3: Open in Browser
Click the link or navigate to `http://localhost:5173`

---

## 📂 File Structure

```
src/
├── components/
│   ├── MilestoneForm.jsx       ← Form for submitting evidence
│   ├── AIDecisionCard.jsx      ← AI verification results
│   ├── TransactionHistory.jsx  ← Payment history table
│   └── ProjectStatus.jsx       ← Milestone timeline
├── App.jsx                     ← Main app + tabs
├── main.jsx                    ← React entry point
└── index.css                   ← Tailwind + global styles
```

---

## 🎯 Key Components

| Component | Purpose | Location |
|-----------|---------|----------|
| **MilestoneForm** | Contractor submits evidence | Tab 1 |
| **AIDecisionCard** | Shows AI approval/denial | Below form |
| **TransactionHistory** | All past payments | Tab 2 |
| **ProjectStatus** | Milestone timeline & progress | Tab 3 |

---

## 🔄 Data Flow

```
User Input (MilestoneForm)
    ↓
POST /suggest-milestone (backend)
    ↓
AI Decision (AIDecisionCard)
    ↓
If Approved → POST /execute-payout
    ↓
Update TransactionHistory
```

---

## 🛠️ Common Tasks

### Add a New Tab
1. Open `App.jsx`
2. Add button in tab navigation
3. Add case in content section
4. Create new component in `src/components/`

### Modify Colors
1. Open `tailwind.config.js`
2. Update color values
3. Restart dev server

### Change API Endpoint
1. Open `vite.config.js`
2. Update proxy target
3. Or use `import.meta.env.VITE_API_URL`

### Add Form Validation
1. Open `MilestoneForm.jsx`
2. Add validation in `handleSubmit`
3. Show error messages

---

## 🧪 Testing the UI

### Test Submit Flow
1. Fill all form fields
2. Click "Submit for AI Review"
3. See loading spinner
4. View AI decision card
5. Check Transaction History updated

### Test GPS Auto-Detect
1. Click 📍 button
2. Grant location permission
3. Coordinates auto-fill

### Test Photo Upload
1. Click file input
2. Select multiple photos
3. See previews below
4. Click "Clear photos" to reset

### Test Mobile Responsiveness
1. Open DevTools (F12)
2. Toggle "Device Toolbar" (Ctrl+Shift+M)
3. Try different screen sizes

---

## 📦 Build for Production

```bash
# Creates optimized build in dist/
npm run build

# Preview production build locally
npm run preview
```

Then deploy `dist/` folder to:
- Vercel
- Cloudflare Pages
- AWS S3
- Any static host

---

## 🔌 Backend Integration

### Required Endpoints

**POST /suggest-milestone**
```bash
curl -X POST http://localhost:3000/suggest-milestone \
  -H "Content-Type: application/json" \
  -d '{
    "image_score": 0.75,
    "inspector_confidence": 0.85,
    "percent_complete": 0.6,
    "notional_budget": 1000
  }'
```

**POST /execute-payout**
```bash
curl -X POST http://localhost:3000/execute-payout \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "RD-001",
    "milestone": "foundation",
    "amount": 600,
    "contractor": "0x...",
    "confidence": 0.72
  }'
```

---

## 🚨 Debugging

### Issue: API calls failing
**Solution:**
- Check backend is running
- Verify CORS is enabled
- Check Network tab in DevTools
- Verify endpoint URLs match

### Issue: Styles not applying
**Solution:**
- Restart dev server
- Clear browser cache
- Check Tailwind config paths
- Verify CSS file imported in App.jsx

### Issue: Form not submitting
**Solution:**
- Check all required fields filled
- Look at browser console for errors
- Verify handleSubmit callback works
- Check Network tab for API response

---

## 📝 Environment Setup

Create `.env.local`:
```env
VITE_API_URL=http://localhost:3000
VITE_ENVIRONMENT=development
```

Access in code:
```jsx
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🎓 Learning Resources

- **React Hooks:** https://react.dev/reference/react
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Vite Guide:** https://vitejs.dev/guide/
- **Form Handling:** https://react.dev/reference/react-dom/components/form

---

## ✅ Pre-Deployment Checklist

- [ ] npm run build completes without errors
- [ ] npm run preview works locally
- [ ] API endpoints verified on backend
- [ ] Environment variables set
- [ ] Browser console has no errors
- [ ] Mobile responsive tested
- [ ] All forms validated
- [ ] Accessibility tested (Tab key navigation)

---

## 🆘 Quick Help

| Problem | Solution |
|---------|----------|
| Port 5173 in use | `npm run dev -- --port 3001` |
| Tailwind classes not working | Restart dev server |
| Components not rendering | Check imports in App.jsx |
| API 404 errors | Verify backend running & endpoints exist |
| Git conflicts | Ask maintainer for help |

---

**Need help? Open an issue or contact @Wiper15** 🚀
