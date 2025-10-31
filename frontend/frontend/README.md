# Frontend — Contractor Dashboard

This folder contains the **contractor-facing interface** for TownPlanPay.

## 📄 File: `index.html`
A demo dashboard that simulates the contractor workflow for milestone submissions and payments.

### 💡 Features
- Submit **milestone evidence** for AI review (simulated delay).
- Get instant feedback — approved, denied, or pending.
- Execute **mock USDC payments** and update transaction history.
- Simple and responsive — works on desktop and mobile.

### 🧩 How It Works
1. Contractor fills in milestone details and submits evidence.
2. AI (simulated) reviews and returns a decision after 2 seconds.
3. If approved, contractor can “execute payment” (mocked).
4. Payment history is updated dynamically on the page.

### 🔌 Integration Notes
- This frontend is designed to connect later with backend endpoints:
  - `/suggest-milestone` → for AI rationale & confidence score
  - `/execute-payout` → for real USDC transfers via Circle API
- Currently, all transactions are simulated for testing purposes.

### 🧪 Notes for Testing & Documentation
- You can test different evidence lengths to trigger approval or denial.
- Each executed payment generates a mock transaction ID.
- Future versions will integrate with **MockCirclePayments** (backend).

---

**Built by Team Wipernation 🌍 — Frontend v1**
