import React from 'react';
import PropTypes from 'prop-types';

export default function Header({ theme = 'dark', onToggleTheme }) {
  return (
    <header className="app-header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1>XSD Validator</h1>
          <p className="subtitle">Validate XML against XSD, entirely in your browser.</p>
        </div>
        <button className="btn" aria-label="Toggle theme" onClick={onToggleTheme}>
          {theme === 'dark' ? '🌙 Dark' : '🌞 Light'}
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  theme: PropTypes.string,
  onToggleTheme: PropTypes.func,
};
