// Lightweight XML/XSD validation service using xmllint-wasm
// Contract:
// - validateXML(xml: string, xsd: string) -> Promise<{ valid: boolean, message: string, method: string }>
// - Throws on unexpected failures with a human-friendly error message

export async function validateXML(xml, xsd) {
  try {
    const xmllint = await import('xmllint-wasm');

    let result;
    if (typeof xmllint.validateXML === 'function') {
      result = await xmllint.validateXML({ xml, schema: xsd });
    } else if (typeof xmllint.default === 'function') {
      const validator = xmllint.default();
      result = await validator.validateXML({ xml, schema: xsd });
    } else {
      throw new Error('Unsupported xmllint-wasm API');
    }

    return {
      valid: await result.valid,
      message: String(await result.rawOutput ?? ''),
      method: 'xmllint-wasm',
    };
  } catch (err) {
    // Normalize errors to a concise message
    const message = err?.message || 'Unknown validation error';
    throw new Error(`Validation failed: ${message}`);
  }
}
