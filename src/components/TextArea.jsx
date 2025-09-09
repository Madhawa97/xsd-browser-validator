import React from 'react';

export default function TextArea({ id, label, value, onChange, rows = 14, placeholder }) {
  return (
    <div className="field">
      <label htmlFor={id} className="field-label">{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="textarea"
        spellCheck={false}
      />
    </div>
  );
}
