/**
 * AIDecisionCard Component
 * 
 * Displays the AI milestone verification decision with:
 * - Approval/Denial status
 * - Confidence score
 * - Suggested payment amount
 * - AI explanation/rationale
 * - Transaction ID (if approved and executed)
 * 
 * @param {Object} decision - AI decision object
 * @param {String} decision.decision - 'approve', 'deny', or 'error'
 * @param {Number} decision.confidence - Confidence score 0-1
 * @param {Number} decision.suggested_amount - Recommended payment
 * @param {String} decision.explanation - AI rationale
 * @param {String} decision.txId - Transaction ID (optional)
 * @param {Boolean} decision.paymentExecuted - Whether payment was sent
 */
export default function AIDecisionCard({ decision }) {
  const isApproved = decision.decision === 'approve';
  const isDenied = decision.decision === 'deny';
  const isError = decision.decision === 'error';

  const confidencePercent = Math.round((decision.confidence || 0) * 100);
  const confidenceColor = confidencePercent >= 80 ? 'green' : confidencePercent >= 60 ? 'yellow' : 'red';

  return (
    <div
      className={`rounded-lg border p-8 ${
        isApproved
          ? 'bg-gradient-to-br from-green-900 to-green-800 border-green-600'
          : isDenied
          ? 'bg-gradient-to-br from-red-900 to-red-800 border-red-600'
          : 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">
            {isApproved ? '✅' : isDenied ? '❌' : '⚠️'}
          </span>
          <div>
            <h3 className="text-2xl font-bold text-white">
              {isApproved ? 'Milestone Approved!' : isDenied ? 'Verification Failed' : 'Error Processing'}
            </h3>
            <p className="text-sm text-gray-300">AI Verification Results</p>
          </div>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-200">AI Confidence</span>
          <span className={`text-lg font-bold text-${confidenceColor}-300`}>
            {confidencePercent}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${
              confidenceColor === 'green'
                ? 'from-green-400 to-green-600'
                : confidenceColor === 'yellow'
                ? 'from-yellow-400 to-yellow-600'
                : 'from-red-400 to-red-600'
            }`}
            style={{ width: `${confidencePercent}%` }}
          />
        </div>
      </div>

      {/* Payment Information (if approved) */}
      {isApproved && decision.suggested_amount && (
        <div className="mb-6 p-4 bg-green-700 bg-opacity-40 rounded-lg border border-green-600">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-green-200">Approved Amount</p>
              <p className="text-2xl font-bold text-green-100">
                ${decision.suggested_amount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-green-200">Network</p>
              <p className="text-lg font-bold text-green-100">Arc Testnet</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Explanation */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-200 mb-2">AI Analysis</h4>
        <p className="text-gray-100 text-sm leading-relaxed bg-black bg-opacity-30 p-3 rounded-lg border border-gray-600">
          {decision.explanation || 'No additional details available.'}
        </p>
      </div>

      {/* Transaction Details (if executed) */}
      {decision.paymentExecuted && decision.txId && (
        <div className="mb-6 p-4 bg-blue-700 bg-opacity-40 rounded-lg border border-blue-600">
          <h4 className="text-sm font-semibold text-blue-200 mb-2">💳 Payment Executed</h4>
          <div>
            <p className="text-xs text-blue-300 mb-1">Transaction ID</p>
            <p className="text-sm font-mono text-blue-100 break-all">{decision.txId}</p>
          </div>
          <p className="text-xs text-blue-300 mt-3">
            ✓ Funds are being transferred to contractor wallet. Check status below.
          </p>
        </div>
      )}

      {/* Helpful Messages */}
      <div className="bg-black bg-opacity-20 p-4 rounded-lg">
        {isApproved && decision.paymentExecuted && (
          <div className="flex items-start gap-2">
            <span className="text-xl">✨</span>
            <div>
              <p className="font-semibold text-white text-sm">Payment Processing</p>
              <p className="text-xs text-gray-300">
                Your USDC payment is now on the Arc testnet blockchain. Check the Transaction History tab to view details.
              </p>
            </div>
          </div>
        )}

        {isApproved && !decision.paymentExecuted && (
          <div className="flex items-start gap-2">
            <span className="text-xl">⏳</span>
            <div>
              <p className="font-semibold text-white text-sm">Preparing Payment</p>
              <p className="text-xs text-gray-300">
                Your milestone has been approved. Payment execution is in progress...
              </p>
            </div>
          </div>
        )}

        {isDenied && (
          <div className="flex items-start gap-2">
            <span className="text-xl">📸</span>
            <div>
              <p className="font-semibold text-white text-sm">What to Do Next</p>
              <p className="text-xs text-gray-300">
                Try uploading clearer photos, include GPS coordinates, and provide a more detailed description. Resubmit when ready.
              </p>
            </div>
          </div>
        )}

        {isError && (
          <div className="flex items-start gap-2">
            <span className="text-xl">🔧</span>
            <div>
              <p className="font-semibold text-white text-sm">Technical Issue</p>
              <p className="text-xs text-gray-300">
                Please try again. If the problem persists, contact support at support@townplanpay.io
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
