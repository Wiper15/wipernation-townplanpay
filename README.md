# 🌍 TownPlanPay — Wipernation  
### AI-Powered Conditional USDC Disbursements for Municipal Projects Worldwide  
*Global Infrastructure Payments, Starting with Nigeria — Built for Every Municipality*

> 🏗️ **"Build trust in public infrastructure — one verified milestone at a time."**  
> TownPlanPay turns municipal project milestones into instant, auditable USDC payouts — no delays, no excuses.

---

## 🧩 Summary
TownPlanPay automates **escrowed USDC payouts** to contractors when real-world milestones are verified.  
Our **AI agent (Cloudflare Workers)** evaluates submitted evidence globally, executes payments via **Circle**, and settles on the **Arc testnet**.  

Every step is verifiable — from submitted evidence to AI rationale and on-chain transaction IDs.

---

## 🌎 Why This Matters Globally

### **Municipal contractors wait months to get paid — even after completing critical infrastructure.**  
Roads, schools, and water systems stall not from lack of funds, but from **bureaucratic inefficiency** and delayed payment approvals.

TownPlanPay changes that — letting **AI validate progress** and release **escrowed USDC instantly**.

**Municipal payment delays are a worldwide crisis:**
- 🇳🇬 **Nigeria:** 6–12 month delays crippling contractors  
- 🇺🇸 **USA:** 45–90 day bureaucratic payment cycles  
- 🌍 **Global:** $1.2+ trillion lost annually to payment inefficiencies  

TownPlanPay cuts payment times from **months to minutes** while ensuring transparency with **on-chain audit trails** for every transaction.

---

## 📊 Global Impact Potential

### **Worldwide Problem Scale**
- 💰 **$9.5 trillion** annual global infrastructure spending (World Bank)  
- 🏛️ **200,000+** municipalities worldwide  
- ⏳ **45–360 day** average payment delays  
- 📉 **$1.2+ trillion** lost annually to inefficiencies  

### **Our Global Solution**
| Metric | Traditional System | TownPlanPay | Improvement |
|:-------|:------------------|:-------------|:-------------|
| Payment Time | 360 days | 5 minutes | 99.9% faster |
| Admin Costs | $150 | $0.50 | 99.7% cheaper |
| Transparency | Opaque | 100% On-chain | Full auditability |
| Scalability | Local | Cloud-native | Global reach |

---

## 🌍 Example Use Case

**Example:**  
A road contractor in **Lagos** uploads verified progress photos for a 5 km road segment.  
TownPlanPay’s AI checks image metadata, evaluates consistency, and within **2 minutes** releases **USDC from escrow** to the contractor’s wallet — all recorded **on-chain** for transparency.

---

## 🚀 Market Adoption Roadmap

| Phase | Region | Focus |
|:------|:--------|:------|
| **1** | 🇳🇬 Nigeria | NDDC & state governments |
| **2** | 🇬🇭🇰🇪🇿🇦 Ghana, Kenya, South Africa | Regional expansion |
| **3** | 🇺🇸🇪🇺 USA & EU | Public infrastructure modernization |
| **4** | 🌎 Global | Standard for public project payments |

---

## 🧠 Core MVP Features

- 🔹 Create tokenized project placeholders and fund escrows (testnet USDC)  
- 🔹 Submit milestone evidence (photo or text) from anywhere  
- 🔹 AI returns `{decision: approve/deny, suggested_amount, explanation, confidence}`  
- 🔹 If approved, AI triggers **Circle USDC transfer** on Arc testnet  
- 🔹 Dashboard: projects, pending milestones, transactions, AI rationale & logs  

---

## 🛠️ Global-Ready Tech Stack

### **Core Infrastructure**
- ⚙️ **AI & Serverless:** Cloudflare Workers (TypeScript) + Workers AI — 300+ global edge nodes  
- 💳 **Payments:** Circle Developer-Controlled Wallets + USDC — borderless settlements  
- 🔗 **Blockchain:** Arc testnet (EVM-compatible) → future multi-chain expansion  
- 💻 **Frontend:** React + Cloudflare Pages — global CDN deployment  
- ☁️ **Hosting:** Replit / Vercel / Cloudflare Pages — instant worldwide access  

### **Global Advantages**
- 🌐 **Cloud-Native:** Deploy globally in seconds  
- 💱 **USDC Settlements:** Stable, borderless, and transparent  
- 🗣️ **Multi-Language AI:** Understands evidence in any language  
- 🏛️ **Configurable Rules:** Tailored for local government compliance  

---

## ⚡ System Architecture Diagram

```plaintext
                    ┌────────────────────────────┐
                    │        Contractor          │
                    │   (uploads milestone data) │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │     AI Agent (Cloudflare)  │
                    │  • Evidence verification   │
                    │  • Rationale generation    │
                    │  • Decision confidence     │
                    └─────────────┬──────────────┘
                                  │
             ┌────────────────────┴────────────────────┐
             ▼                                         ▼
 ┌────────────────────────────┐          ┌────────────────────────────┐
 │  Circle API (Developer     │          │      Arc Testnet (EVM)     │
 │  Wallets + USDC Transfers) │          │   On-chain settlement log   │
 └─────────────┬──────────────┘          └─────────────┬──────────────┘
               │                                         │
               ▼                                         ▼
        ┌────────────────────────────┐           ┌────────────────────────────┐
        │     Contractor Wallet      │           │     Dashboard (Frontend)   │
        │ Receives verified USDC     │           │ View: Projects, Logs, AI   │
        └────────────────────────────┘           │ Decisions & Tx IDs         │
                                                  └────────────────────────────┘- ✅ Highlight USDC as universal settlement layer
- ✅ Show configurable workflows for different regions
- ✅ Emphasize $9.5T total addressable market

### **Judging Requirements**
- ✅ Public GitHub repo with clear, modular code
- ✅ 3-5 slide deck: problem, solution, tech, demo, global adoption path
- ✅ Live or recorded end-to-end workflow demonstration

## Contributing & Code Style
- Keep code modular and well-commented
- Open an issue for each task and add PRs with descriptive titles
- Add small unit/manual tests for critical flows (e.g., simulate transfer, AI approval)

## Code structure (quick reference)

The repository is organised to separate frontend, serverless AI/worker logic, and utilities.
Use this section as a quick guide to the main folders and important files:

- `frontend_files/` — React frontend and build tooling
       - `src/` — React entry and components
              - `main.jsx` — application entry
              - `components/` — UI components (MilestoneForm, AIDecisionCard, TransactionHistory, etc.)
       - `.env.example` — example environment variables (copy to `.env.local` to run)
       - `vite.config.js` — local dev server and proxy configuration

- `worker/` — Cloudflare Worker code (serverless AI agent)
       - `index.js` — Worker script implementing `/suggest-milestone` and `/execute-payout`
       - `wrangler.toml` — Wrangler config for local dev and publishing
       - Secrets are managed via `wrangler secret put` (do not store API keys in source)

- `ml/` — small ML/validator helpers used for local testing
- `payments/` — mock or integration helpers for payment providers (e.g. Circle SDK stubs)
- `frontend/` and `frontend_files/` contain docs and deployment notes for the UI

This layout keeps the UI and serverless logic decoupled so you can run the frontend locally while using a deployed worker endpoint.

## Using the public Worker URL (recommended for quick testing)

We published a public Cloudflare Worker for development. To point the frontend at the public Worker:

1. Copy the example env file to `.env.local` in the frontend folder:

```powershell
cd frontend_files
copy .env.example .env.local
```

2. Make sure `.env.local` contains:

```
VITE_API_URL=https://townplanpay-worker.esteban-porporato.workers.dev
```

3. Restart the Vite dev server so it picks up the new env var:

```powershell
npm run dev -- --host
```

Notes:
- Do NOT commit `.env.local` to git (it is ignored by `.gitignore`). Use `.env.example` for safe, versioned defaults.
- The Worker exposes two endpoints:
       - `POST /suggest-milestone` — returns an AI decision JSON
       - `POST /execute-payout` — simulates a payout; protected by header `x-execute-payout-key` (do not expose secrets in client JS)

Example curl calls:

```bash
curl -X POST https://townplanpay-worker.esteban-porporato.workers.dev/suggest-milestone \
       -H "Content-Type: application/json" \
       -d '{"image_score":0.75,"inspector_confidence":0.85,"percent_complete":0.6,"notional_budget":1000}'

curl -X POST https://townplanpay-worker.esteban-porporato.workers.dev/execute-payout \
       -H "Content-Type: application/json" \
       -H "x-execute-payout-key: <SECRET>" \
       -d '{"project_id":"RD-001","milestone":"foundation","amount":600}'
```

Security reminder: for production flows do not include sensitive API keys in client-side code. Instead:

- Use a backend or proxy that injects secrets server-side.
- Or implement an authenticated server-to-server flow where the frontend requests a short-lived token from a trusted backend.

## Contact & Team
Team Wipernation — lead: @Wiper15

---

## 🌐 Join the Global Infrastructure Revolution

**TownPlanPay isn't just another payment processor - we're rebuilding trust in public infrastructure spending worldwide.**

**Starting in Nigeria, scaling to every municipality on Earth.**

*Built with 🌍 by Team Wipernation | Cloud-Native | AI-Powered | Borderless*
