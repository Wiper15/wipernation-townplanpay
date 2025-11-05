/**
 * ProjectStatus Component
 * 
 * Displays an overview of all project milestones with:
 * - Completion status (paid/pending)
 * - Payment amounts
 * - Timeline visualization
 * - Project progress
 * 
 * @param {Array} transactions - List of completed transactions
 */
export default function ProjectStatus({ transactions }) {
  // Group transactions by project
  const projects = {};
  transactions.forEach((tx) => {
    if (!projects[tx.milestone]) {
      projects[tx.milestone] = [];
    }
    projects[tx.milestone].push(tx);
  });

  // Define typical milestone stages
  const milestoneStages = [
    { id: 'site_prep', label: 'Site Preparation', emoji: '🚧', order: 1 },
    { id: 'foundation', label: 'Foundation Work', emoji: '🏗️', order: 2 },
    { id: 'structural', label: 'Structural Work', emoji: '🏢', order: 3 },
    { id: 'paving', label: 'Road Paving', emoji: '🛣️', order: 4 },
    { id: 'materials', label: 'Materials Delivered', emoji: '📦', order: 5 },
    { id: 'completion', label: 'Project 50% Complete', emoji: '✨', order: 6 },
  ];

  const getCompletedMilestones = () => {
    return transactions.length;
  };

  const getTotalPaid = () => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  };

  const getProgressPercentage = () => {
    return Math.round((getCompletedMilestones() / milestoneStages.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">✅ Project Status</h2>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-300">Overall Progress</span>
            <span className="text-lg font-bold text-blue-400">{getProgressPercentage()}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
            <p className="text-slate-400 text-sm mb-1">Milestones Completed</p>
            <p className="text-3xl font-bold text-green-400">
              {getCompletedMilestones()}/{milestoneStages.length}
            </p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
            <p className="text-slate-400 text-sm mb-1">Total Disbursed</p>
            <p className="text-3xl font-bold text-green-400">
              ${getTotalPaid().toLocaleString()}
            </p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
            <p className="text-slate-400 text-sm mb-1">Network</p>
            <p className="text-lg font-bold text-cyan-400">Arc Testnet</p>
            <p className="text-xs text-slate-400 mt-1">USDC Settlements</p>
          </div>
        </div>
      </div>

      {/* Milestone Timeline */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
        <h3 className="text-xl font-bold text-white mb-6">🎯 Milestone Timeline</h3>

        <div className="space-y-4">
          {milestoneStages.map((stage, idx) => {
            const isCompleted = transactions.some((t) => t.milestone.includes(stage.id));
            const milestoneData = transactions.find((t) => t.milestone.includes(stage.id));

            return (
              <div key={stage.id} className="relative">
                {/* Connecting Line */}
                {idx < milestoneStages.length - 1 && (
                  <div
                    className={`absolute left-6 top-12 w-0.5 h-12 ${
                      isCompleted ? 'bg-green-500' : 'bg-slate-600'
                    }`}
                  />
                )}

                {/* Milestone Card */}
                <div
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                    isCompleted
                      ? 'bg-green-900 bg-opacity-20 border-green-600'
                      : 'bg-slate-700 border-slate-600'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                        isCompleted
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-600 text-slate-400'
                      }`}
                    >
                      {stage.emoji}
                    </div>
                  </div>

                  {/* Milestone Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4
                        className={`font-semibold ${
                          isCompleted ? 'text-green-300' : 'text-slate-300'
                        }`}
                      >
                        {stage.label}
                      </h4>
                      {isCompleted && (
                        <span className="text-xs font-bold text-green-400 bg-green-900 px-2 py-1 rounded">
                          COMPLETED
                        </span>
                      )}
                    </div>

                    {isCompleted && milestoneData ? (
                      <div className="text-sm space-y-1">
                        <p className="text-slate-400">
                          Date: <span className="text-slate-200 font-medium">{milestoneData.date}</span>
                        </p>
                        <p className="text-slate-400">
                          Amount: <span className="text-green-300 font-medium">${milestoneData.amount.toLocaleString()} USDC</span>
                        </p>
                        <p className="text-slate-400">
                          AI Confidence:{' '}
                          <span className="text-blue-300 font-medium">{milestoneData.confidence}%</span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">Awaiting submission and verification</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-900 bg-opacity-30 rounded-lg border border-blue-700 p-6">
        <h4 className="font-bold text-blue-300 mb-3">💡 About This Dashboard</h4>
        <ul className="text-sm text-blue-200 space-y-2">
          <li>
            ✓ <strong>Automatic AI Verification:</strong> Each milestone is reviewed by AI to ensure accuracy
          </li>
          <li>
            ✓ <strong>Instant USDC Settlement:</strong> Approved payments are settled on Arc testnet within minutes
          </li>
          <li>
            ✓ <strong>Transparency:</strong> All transactions are on-chain and verifiable
          </li>
          <li>
            ✓ <strong>No Delays:</strong> Get paid as soon as your milestone is verified, not months later
          </li>
        </ul>
      </div>
    </div>
  );
}
