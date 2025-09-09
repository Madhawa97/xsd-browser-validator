# XSD Browser Validator

Validate XML against an XSD schema directly in your browser using `xmllint-wasm`. No server required.

## Quick start

- Dev server: `npm start` then open http://localhost:3000
- Tests: `npm test`
- Build: `npm run build`

## Features

- Client-side XML/XSD validation via WebAssembly
- Split-pane editors for XML and XSD
- One-click valid/invalid XML examples
- Clear result panel with success/error state

## Project structure

```
src/
	components/        # Reusable UI
		Button.jsx
		Footer.jsx
		Header.jsx
		ResultCard.jsx
		TextArea.jsx
	pages/
		ValidatorPage.jsx
	services/
		xmlValidator.js  # Validation abstraction around xmllint-wasm
	App.js
	App.css
	index.js
```

## Notes

`xmllint-wasm` is loaded dynamically to keep the initial bundle lean. All validation happens locally in the browser.

