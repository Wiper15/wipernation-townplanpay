# 💵 Mock Circle Payments — TownPlanPay

This module simulates **USDC payments** for testing and local development of TownPlanPay.  
It lets you validate payout logic, track transactions, and test AI approval flows **without connecting to live Circle APIs**.

---

## ⚙️ Overview

**File:** `mock_circle_payments.py`  
**Purpose:** Provides a lightweight, local test harness for milestone-based USDC disbursements.

---

## 🧩 Core Functions

### `pay_milestone(project_id, milestone, amount, contractor)`
Simulates a payment to a contractor for a specific project milestone.

**Returns:**
```json
{
  "tx_id": "mock_tx_RD-001_foundation",
  "project": "RD-001",
  "milestone": "foundation",
  "amount": 2500,
  "contractor": "0xContractorA",
  "status": "completed",
  "timestamp": "2024-10-31",
  "currency": "USDC"
}
