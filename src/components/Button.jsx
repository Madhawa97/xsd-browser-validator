import React from 'react';

export default function Button({ children, onClick, disabled, variant = 'primary', loading = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn ${variant}`}
    >
      {loading ? (
        <>
          <span className="spinner" aria-hidden />
          <span className="sr-only">Loading</span>
        </>
      ) : null}
      <span className="btn-label">{children}</span>
    </button>
  );
}
