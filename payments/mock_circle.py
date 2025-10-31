# Mock Circle Payments for TownPlanPay
from datetime import datetime
import uuid

class MockCirclePayments:
    def __init__(self, starting_balance=50000, verbose=True):
        self.transactions = []
        self.balance = starting_balance
        self.verbose = verbose

    def pay_milestone(self, project_id, milestone, amount, contractor):
        """Simulate USDC payment to contractor"""
        if amount > self.balance:
            return {"error": "Insufficient funds", "available_balance": self.balance}

        tx_id = f"mock_tx_{uuid.uuid4().hex[:8]}"
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        transaction = {
            "tx_id": tx_id,
            "project_id": project_id,
            "milestone": milestone,
            "amount": amount,
            "contractor": contractor,
            "status": "completed",
            "timestamp": timestamp,
            "currency": "USDC"
        }

        self.transactions.append(transaction)
        self.balance -= amount

        if self.verbose:
            print(f"✅ Paid {contractor} ${amount} for milestone '{milestone}' "
                  f"[Project: {project_id} | Tx: {tx_id}]")

        return transaction

    def get_balance(self):
        """Return current available USDC balance"""
        return {"available": round(self.balance, 2), "currency": "USDC"}

    def get_transactions(self, project_id=None):
        """Return all transactions or filter by project"""
        if project_id:
            return [tx for tx in self.transactions if tx["project_id"] == project_id]
        return self.transactions

# ----------------------------------------------------------------------
# Example Usage
# ----------------------------------------------------------------------
if __name__ == "__main__":
    payments = MockCirclePayments()

    # Simulate project payments
    payments.pay_milestone("RD-001", "foundation", 2500, "contractor_A")
    payments.pay_milestone("RD-001", "paving", 5000, "contractor_A")
    payments.pay_milestone("BLD-002", "structural", 10000, "contractor_B")

    print("\n💰 Payment System Ready!")
    print(f"Available Balance: ${payments.get_balance()['available']}")

    print("\n📊 Transaction History:")
    for tx in payments.get_transactions():
        print(f" - [{tx['timestamp']}] {tx['project_id']} | {tx['milestone']}: "
              f"${tx['amount']} → {tx['contractor']}")
