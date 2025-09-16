import { XmlDocument, XsdValidator, XmlValidateError } from 'libxml2-wasm';

export async function validateXML(xml, xsd) {
  let xmlDoc;
  let xsdDoc;
  let validator;
    
  try {


    xsdDoc = XmlDocument.fromString(xsd);
    validator = XsdValidator.fromDoc(xsdDoc);

    xmlDoc = XmlDocument.fromString(xml);
    validator.validate(xmlDoc);

    return { valid: true, message: 'success', method: 'libxml2-wasm' };

  } catch (err) {

    if (err instanceof XmlValidateError) {
      return Promise.resolve({ valid: false, message: err.message });
    }
    const message = err instanceof Error ? err.message : 'Unknown validation error';
    throw new Error(`Validation failed: ${message}`);
  } finally {
    xmlDoc?.dispose();
    validator?.dispose();
    xsdDoc?.dispose();
  }
}
