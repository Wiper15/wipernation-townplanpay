/**
 * TransactionHistory Component
 * 
 * Displays a table of all milestone transactions with:
 * - Date submitted
 * - Milestone type
 * - Payment amount
 * - Transaction ID with blockchain link
 * - AI confidence score
 * - Status
 * 
 * @param {Array} transactions - List of transaction objects
 */
export default function TransactionHistory({ transactions }) {
  const getArcTestnetLink = (txId) => {
    // Arc testnet block explorer URL
    return `https://explorer.arc.io/tx/${txId}`;
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">📊 Transaction History</h2>
        <p className="text-slate-400 text-sm">
          All milestone payments settled on Arc testnet with USDC
        </p>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-2">📭</p>
          <p className="text-slate-400">No transactions yet</p>
          <p className="text-sm text-slate-500 mt-2">Submit your first milestone to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left py-3 px-4 text-slate-300 font-semibold text-sm">Date</th>
                <th className="text-left py-3 px-4 text-slate-300 font-semibold text-sm">Milestone</th>
                <th className="text-left py-3 px-4 text-slate-300 font-semibold text-sm">Amount</th>
                <th className="text-left py-3 px-4 text-slate-300 font-semibold text-sm">Confidence</th>
                <th className="text-left py-3 px-4 text-slate-300 font-semibold text-sm">Transaction ID</th>
                <th className="text-left py-3 px-4 text-slate-300 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-700 hover:bg-slate-700 hover:bg-opacity-50 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-300 text-sm">{tx.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🏗️</span>
                      <span className="text-slate-300 text-sm font-medium">{tx.milestone}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-100 font-semibold text-sm">
                      ${tx.amount.toLocaleString()} USDC
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${
                            tx.confidence >= 85
                              ? 'from-green-400 to-green-600'
                              : tx.confidence >= 70
                              ? 'from-yellow-400 to-yellow-600'
                              : 'from-red-400 to-red-600'
                          }`}
                          style={{ width: `${tx.confidence}%` }}
                        />
                      </div>
                      <span className="text-slate-300 text-sm font-medium">{tx.confidence}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-300 text-sm font-mono truncate" title={tx.txId}>
                        {tx.txId.slice(0, 12)}...
                      </span>
                      <a
                        href={getArcTestnetLink(tx.txId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="View on Arc Explorer"
                      >
                        🔗
                      </a>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">✅</span>
                      <span className="text-green-300 text-sm font-medium">
                        {tx.status === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Stats */}
      {transactions.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-700 grid grid-cols-3 gap-4">
          <div>
            <p className="text-slate-400 text-xs mb-1">TOTAL TRANSACTIONS</p>
            <p className="text-2xl font-bold text-white">{transactions.length}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">TOTAL AMOUNT</p>
            <p className="text-2xl font-bold text-green-400">
              ${transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">AVG CONFIDENCE</p>
            <p className="text-2xl font-bold text-blue-400">
              {Math.round(
                transactions.reduce((sum, t) => sum + t.confidence, 0) / transactions.length
              )}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
