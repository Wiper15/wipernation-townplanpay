// ml/validator.js
// Tiny heuristic validator used as a good-first contributor starting point.
// Place under ml/validator.js and add tests or improvements in a PR.

function evaluateMilestone(input){
  // Expected input: { image_score, inspector_confidence, percent_complete }
  const image_score = Number(input.image_score || 0);
  const inspector_confidence = Number(input.inspector_confidence || 0);
  const percent_complete = Number(input.percent_complete || 0);

  // Weighted heuristic
  const score = (image_score * 0.5) + (inspector_confidence * 0.3) + (percent_complete * 0.2);

  const decision = score >= 0.6 ? 'approve' : 'deny';
  // Example suggested amount logic: percent_complete fraction of a notional budget (e.g., 1000)
  const notional_budget = Number(input.notional_budget || 1000);
  const suggested_amount = Math.round(notional_budget * percent_complete * score * 100) / 100;

  return {
    decision,
    suggested_amount,
    explanation: `Heuristic score=${score.toFixed(3)} (image:${image_score}, inspector:${inspector_confidence}, pct:${percent_complete})`,
    confidence: Math.max(0, Math.min(1, score))
  };
}

// Node/CommonJS export
if(typeof module !== 'undefined' && module.exports){
  module.exports = { evaluateMilestone };
}
// Browser export for quick testing (window.evaluateMilestone)
if(typeof window !== 'undefined'){
  window.evaluateMilestone = evaluateMilestone;
}
