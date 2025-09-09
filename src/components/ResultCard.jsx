import React from 'react';

export default function ResultCard({ result }) {
  if (!result) return null;

  const { valid, message, method, warning } = result;
  const tone = valid ? 'success' : 'error';

  return (
    <section className={`result ${tone}`} aria-live="polite" aria-atomic="true">
      <div className="result-header">
        <strong>{valid ? 'Valid ✅' : 'Invalid ❌'}</strong>
        <span className="method">via {method}</span>
      </div>
      {message ? (
        <pre className="result-body" data-testid="result-message">{message}</pre>
      ) : null}
      {warning ? (
        <div className="result-warning">⚠ {warning}</div>
      ) : null}
    </section>
  );
}
