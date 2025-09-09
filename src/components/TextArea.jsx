import React, { useCallback } from 'react';

export default function TextArea({ id, label, value, onChange, rows = 14, placeholder }) {
  const onDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    const text = await file.text();
    onChange(text);
  }, [onChange]);

  const onPaste = useCallback(async (e) => {
    if (!e.clipboardData) return;
    const file = e.clipboardData.files?.[0];
    if (file) {
      e.preventDefault();
      const text = await file.text();
      onChange(text);
    }
  }, [onChange]);

  const copyToClipboard = useCallback(async () => {
    try { await navigator.clipboard.writeText(value || ''); } catch {}
  }, [value]);
  const clear = useCallback(() => onChange(''), [onChange]);

  return (
    <div className="field">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label htmlFor={id} className="field-label">{label}</label>
        <div style={{ display: 'flex', gap: 6 }}>
          <button type="button" className="btn" onClick={copyToClipboard}>Copy</button>
          <button type="button" className="btn danger" onClick={clear}>Clear</button>
        </div>
      </div>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }}
        onPaste={onPaste}
        rows={rows}
        placeholder={placeholder}
        className="textarea"
        spellCheck={false}
      />
    </div>
  );
}
