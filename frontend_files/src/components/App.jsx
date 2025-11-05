import { useState } from 'react';
import MilestoneForm from './MilestoneForm';
import AIDecisionCard from './AIDecisionCard';
import TransactionHistory from './TransactionHistory';
import ProjectStatus from './ProjectStatus';

export default function App() {
  const [transactions, setTransactions] = useState([
    {
      date: '2024-10-15',
      milestone: 'Site Preparation',
      amount: 5000,
      txId: 'mock_tx_001',
      status: 'paid',
      confidence: 92,
    },
    {
      date: '2024-10-25',
      milestone: 'Foundation Work',
      amount: 10000,
      txId: 'mock_tx_002',
      status: 'paid',
      confidence: 88,
    },
  ]);

  const [aiDecision, setAiDecision] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('submit');

  const handleMilestoneSubmit = async (formData) => {
    setLoading(true);
    setAiDecision(null);

    try {
      // Call the /suggest-milestone endpoint
      const response = await fetch('/suggest-milestone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_score: 0.75,
          inspector_confidence: 0.85,
          percent_complete: 0.6,
          notional_budget: formData.estimatedBudget || 1000,
          project_id: formData.projectName,
          milestone: formData.milestone,
          description: formData.description,
          gpsCoordinates: formData.gpsCoordinates,
        }),
      });

      const data = await response.json();
      setAiDecision(data);

      // If approved, execute payout after brief delay
      if (data.decision === 'approve') {
        setTimeout(() => {
          executePayout(data, formData);
        }, 1500);
      }
    } catch (error) {
      console.error('Error:', error);
      setAiDecision({
        decision: 'error',
        explanation: 'Error connecting to AI service. Please try again.',
        confidence: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const executePayout = async (aiDecision, formData) => {
    try {
      const payoutResponse = await fetch('/execute-payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: formData.projectName,
          milestone: formData.milestone,
          amount: aiDecision.suggested_amount,
          contractor: formData.contractorAddress,
          confidence: aiDecision.confidence,
        }),
      });

      const payoutData = await payoutResponse.json();

      // Add to transaction history
      const newTransaction = {
        date: new Date().toISOString().split('T')[0],
        milestone: formData.milestone,
        amount: aiDecision.suggested_amount,
        txId: payoutData.tx_id || 'tx_' + Math.random().toString(36).slice(2, 10),
        status: 'paid',
        confidence: Math.round(aiDecision.confidence * 100),
      };

      setTransactions([newTransaction, ...transactions]);
      setAiDecision({ ...aiDecision, txId: newTransaction.txId, paymentExecuted: true });
    } catch (error) {
      console.error('Payout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🏗️</div>
            <div>
              <h1 className="text-3xl font-bold text-white">TownPlanPay</h1>
              <p className="text-blue-100 text-sm">Contractor Portal — AI-Powered Milestone Verification</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'submit'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            📝 Submit Milestone
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'history'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            📊 Transaction History
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'status'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            ✅ Project Status
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Panel */}
          <div className="lg:col-span-2">
            {activeTab === 'submit' && (
              <>
                <MilestoneForm onSubmit={handleMilestoneSubmit} loading={loading} />
                {aiDecision && (
                  <div className="mt-6">
                    <AIDecisionCard decision={aiDecision} />
                  </div>
                )}
              </>
            )}

            {activeTab === 'history' && (
              <TransactionHistory transactions={transactions} />
            )}

            {activeTab === 'status' && (
              <ProjectStatus transactions={transactions} />
            )}
          </div>

          {/* Sidebar - Quick Stats */}
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 sticky top-4">
              <h3 className="text-lg font-bold text-white mb-4">📈 Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">Total Paid</p>
                  <p className="text-2xl font-bold text-green-400">
                    ${transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Transactions</p>
                  <p className="text-2xl font-bold text-blue-400">{transactions.length}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {transactions.length > 0 ? '100%' : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Network</p>
                  <p className="text-sm font-semibold text-cyan-400">Arc Testnet</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 bg-opacity-30 rounded-lg p-6 border border-blue-700">
              <h3 className="font-bold text-blue-300 mb-2">💡 Pro Tips</h3>
              <ul className="text-sm text-blue-200 space-y-2">
                <li>✓ Upload clear, well-lit photos</li>
                <li>✓ Include GPS coordinates</li>
                <li>✓ Write detailed descriptions</li>
                <li>✓ Higher confidence = faster approval</li>
                <li>✓ USDC settled on Arc testnet</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
