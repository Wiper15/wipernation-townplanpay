// Cloudflare Worker stub (worker/index.js)
// Handles two endpoints:
// - POST /suggest-milestone  -> returns a suggestion (uses simple heuristic)
// - POST /execute-payout     -> simulates a payout and returns a tx_id
// NOTE: This is a demo stub. Replace /execute-payout body with Circle SDK calls in production.
// Deploy via Cloudflare Workers and set any secrets with `wrangler secret` or the Cloudflare UI.

addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

async function handle(request){
  const url = new URL(request.url);
  if(request.method === 'POST' && url.pathname.endsWith('/suggest-milestone')){
    try {
      const payload = await request.json().catch(()=>({}));
      const input = {
        image_score: payload.image_score ?? 0.7,
        inspector_confidence: payload.inspector_confidence ?? 0.8,
        percent_complete: payload.percent_complete ?? 0.5,
        notional_budget: payload.notional_budget ?? 1000
      };
      // Simple heuristic (same logic as ml/validator.js)
      const score = (input.image_score * 0.5) + (input.inspector_confidence * 0.3) + (input.percent_complete * 0.2);
      const decision = score >= 0.6 ? 'approve' : 'deny';
      const suggested_amount = Math.round(input.notional_budget * input.percent_complete * score * 100) / 100;
      return new Response(JSON.stringify({
        decision, suggested_amount, explanation:`Worker heuristic score=${score.toFixed(3)}`, confidence: Math.max(0, Math.min(1, score))
      }), { status:200, headers: {'content-type':'application/json'}});
    } catch (err) {
      return new Response(JSON.stringify({ error: 'bad request' }), { status:400, headers: {'content-type':'application/json'} });
    }
  }

  if(request.method === 'POST' && url.pathname.endsWith('/execute-payout')){
    // IMPORTANT: this stub only simulates the payout flow.
    // Replace with Circle SDK / REST API call server-side in production.
    // Ensure you store CIRCLE_API_KEY in Worker secrets.
    try {
      const body = await request.json().catch(()=>({}));
      // Simple simulation of a tx id
      const tx_id = 'tx_' + Math.random().toString(36).slice(2,10);
      return new Response(JSON.stringify({ status: 'simulated', tx_id, timestamp: new Date().toISOString() }), {
        status:200, headers: {'content-type':'application/json'}
      });
    } catch(e){
      return new Response(JSON.stringify({ error:'bad request' }), { status:400, headers: {'content-type':'application/json'} });
    }
  }

  return new Response('Not found', { status: 404 });
}
