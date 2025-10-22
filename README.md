```markdown
# TownPlanPay — Wipernation
AI-powered conditional USDC disbursements for tokenized municipal infrastructure (Arc + Circle)

Summary
TownPlanPay automates escrowed USDC payouts to contractors when real-world milestones are verified. An AI agent (Cloudflare Workers) evaluates submitted evidence (photos, inspector notes, sensor input), recommends or executes payments via Circle Developer-Controlled Wallets, and settlements occur on Arc testnet. Everything is auditable: evidence, AI rationale, and transaction IDs.

Why this matters
Municipal projects are slowed by manual approvals and opaque payout processes. TownPlanPay speeds payouts, reduces admin, and provides verifiable public records tied to on-chain USDC settlements.

Core MVP features
- Create a tokenized project placeholder and fund an escrow (testnet USDC).
- Submit milestone evidence (photo or text).
- AI agent returns {decision: approve/deny, suggested_amount, explanation, confidence}.
- If approved, agent triggers a Circle USDC transfer to contractor wallet on Arc testnet.
- Dashboard: projects, pending milestones, transaction history, AI rationale and logs.

Tech stack (recommended)
- Agent & serverless: Cloudflare Workers (TypeScript) + Workers AI (optional for prompt-based reasoning)
- Payments / wallets: Circle Developer-Controlled Wallets SDK or Circle REST API (TypeScript/Python)
- Settlement: Arc testnet (EVM-compatible) with Circle testnet USDC
- Frontend: React or static HTML/JS hosted on Replit / Vercel
- Repo & Collaboration: GitHub (issues, project board)
- Optional: ElevenLabs (voice confirmations), Google Colab (if you want custom ML model training)

Quick start (phone-friendly)
1. Create accounts:
   - Circle Developer (dev console) — create test wallets and get testnet keys
   - Arc testnet — note RPC / test endpoints
   - Cloudflare — Workers & Workers AI
   - GitHub + Replit (or Codespaces) for hosting code
2. Create repo: `wipernation-townplanpay` and add these files (README, TEAM.md)
3. Add secrets: Circle API keys to Cloudflare Worker secrets or Replit secrets (do NOT put keys in frontend)
4. Implement flow:
   - /suggest-milestone (returns suggested_amount + rationale)
   - /execute-payout (server-side: call Circle wallet SDK/REST to transfer test USDC)
5. Deploy Cloudflare Worker and host frontend on Replit/Vercel. Test end-to-end using test wallets & test USDC.

Demo checklist for judges
- Live or recorded demo showing:
  - Create project + fund escrow (testnet)
  - Contractor submits milestone evidence
  - AI approves (or suggests amount) and executes test USDC transfer
  - Show transaction id and AI rationale in the UI
- Code: public GitHub repo with clear README and modular code
- Pitch: 3–5 slide deck with problem, solution, tech, demo, adoption path

Contributing & code style
- Keep code modular and well-commented.
- Open an issue for each task and add PRs with descriptive titles.
- Add small unit/manual tests for critical flows (e.g., simulate transfer, AI approval).

Contact & team
Team Wipernation — lead: @Wiper15
```
