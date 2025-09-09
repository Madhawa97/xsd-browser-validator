import React, { useState } from 'react';

function XSDValidator() {
  const [xmlContent, setXmlContent] = useState(`<section><heading/><p/><img/><p/><p/><p/><p/><ul/><p/><ul/><p/><ul/><table/><section/></section>`);

  const [xsdContent, setXsdContent] = useState(`<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element  name="section">  <xs:complexType>
          <xs:sequence minOccurs="0" maxOccurs="1">
        <xs:element name="number" minOccurs="0" maxOccurs="1"/>
    <xs:element name="heading" minOccurs="0" maxOccurs="1"/>
    <xs:element name="subheading" minOccurs="0" maxOccurs="1"/>
    <xs:element name="index" minOccurs="0" maxOccurs="unbounded"/>
    <xs:element name="rule-info" minOccurs="0" maxOccurs="1"/>
    <xs:choice minOccurs="0" maxOccurs="unbounded">
        <xs:element name="address" minOccurs="0" maxOccurs="1"/>
    <xs:element name="figure" minOccurs="0" maxOccurs="1"/>
    <xs:element name="numbered-para" minOccurs="0" maxOccurs="1"/>
    <xs:element name="ol" minOccurs="0" maxOccurs="1"/>
    <xs:element name="ul" minOccurs="0" maxOccurs="1"/>
    <xs:element name="img" minOccurs="0" maxOccurs="1"/>
    <xs:element name="notes" minOccurs="0" maxOccurs="1"/>
    <xs:element name="p" minOccurs="0" maxOccurs="1"/>
    <xs:element name="table" minOccurs="0" maxOccurs="1"/>
    <xs:element name="table-group" minOccurs="0" maxOccurs="1"/>
    <xs:element name="definition-group" minOccurs="0" maxOccurs="1"/>
    <xs:element name="definition" minOccurs="0" maxOccurs="1"/>
    <xs:element name="example" minOccurs="0" maxOccurs="1"/>
    <xs:element name="examples" minOccurs="0" maxOccurs="1"/>
    <xs:element name="informal-section" minOccurs="0" maxOccurs="1"/>
    <xs:element name="steps" minOccurs="0" maxOccurs="1"/>
    <xs:element name="extracts" minOccurs="0" maxOccurs="1"/>
    <xs:element name="airimp" minOccurs="0" maxOccurs="1"/>
    <xs:element name="codes" minOccurs="0" maxOccurs="1"/>
    <xs:element name="metadata" minOccurs="0" maxOccurs="1"/>
    <xs:element name="guidance" minOccurs="0" maxOccurs="1"/>
    <xs:element name="state" minOccurs="0" maxOccurs="1"/>
    <xs:element name="operator" minOccurs="0" maxOccurs="1"/>
    <xs:element name="var-ref-set" minOccurs="0" maxOccurs="1"/>
    <xs:element name="animal-set" minOccurs="0" maxOccurs="1"/>
    <xs:element name="publication" minOccurs="0" maxOccurs="1"/>

  </xs:choice>    <xs:choice minOccurs="0" maxOccurs="unbounded">
        <xs:element name="active-link" minOccurs="0" maxOccurs="1"/>
    <xs:element name="section" minOccurs="0" maxOccurs="1"/>
    <xs:element name="packing-instructions" minOccurs="0" maxOccurs="1"/>

  </xs:choice>    <xs:element name="footnotes" minOccurs="0" maxOccurs="1"/>

  </xs:sequence>
       </xs:complexType></xs:element></xs:schema>`);

  const [validationResult, setValidationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Method 1: Try xmllint-wasm
  const validateWithXmllintWasm = async () => {
    try {
      const xmllint = await import('xmllint-wasm');
      // console.log('xmllint-wasm module:', xmllint);
      // 
      // Try different API patterns
      let result;

      if (typeof xmllint.validateXML === 'function') {
        result = await xmllint.validateXML({
          xml: xmlContent,
          schema: xsdContent
        });
      } else if (typeof xmllint.default === 'function') {
        const validator = xmllint.default();
        result = await validator.validateXML({
          xml: xmlContent,
          schema: xsdContent
        });
      } else {
        throw new Error('Unsupported xmllint-wasm API');
      }

      return {
        success: true,
        valid: await result.valid,
        message: await result.rawOutput
      };
    } catch (error) {
      console.error('xmllint-wasm failed:', error);
      return { success: false, error: error.message };
    }
  };

  const validateXML = async () => {
    setLoading(true);
    setValidationResult(null);

    // Try validation methods in order of preference
    console.log('Attempting xmllint-wasm validation...');
    const xmllintResult = await validateWithXmllintWasm();

    if (xmllintResult.success) {
      setValidationResult({
        valid: xmllintResult.valid,
        message: `✅ xmllint-wasm: ${xmllintResult.valid}`,
        method: 'xmllint-wasm'
      });
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  const loadInvalidExample = () => {
    setXmlContent(`<section><heading/><p/><img/><p/><p/><p/><p/><ul/><p/><ul/><p/><ul/><section/><table/></section>`);
  };

  const loadValidExample = () => {
    setXmlContent(`<section><heading/><p/><img/><p/><p/><p/><p/><ul/><p/><ul/><p/><ul/><table/><section/></section>`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">XSD Validator</h1>

      <div className="mb-4 flex gap-2">
        <button
          onClick={loadValidExample}
          className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
        >
          Load Valid Example
        </button>
        <button
          onClick={loadInvalidExample}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Load Invalid Example
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            XML Document:
          </label>
          <textarea
            value={xmlContent}
            onChange={(e) => setXmlContent(e.target.value)}
            placeholder="Enter XML content to validate"
            rows="15"
            className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            XSD Schema:
          </label>
          <textarea
            value={xsdContent}
            onChange={(e) => setXsdContent(e.target.value)}
            placeholder="Enter XSD schema definition"
            rows="15"
            className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={validateXML}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
        >
          {loading ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              Validating...
            </>
          ) : (
            'Validate XML against XSD'
          )}
        </button>
      </div>

      {validationResult && (
        <div className={`p-4 rounded-lg border-l-4 ${validationResult.valid
            ? 'bg-green-50 border-green-400 text-green-800'
            : 'bg-red-50 border-red-400 text-red-800'
          }`}>
          <div className="font-semibold mb-2">
            Validation Result ({validationResult.method}):
          </div>
          <pre className="whitespace-pre-wrap text-sm font-mono mb-2">
            {validationResult.message}
          </pre>
          {validationResult.warning && (
            <div className="text-yellow-700 bg-yellow-50 p-2 rounded text-sm">
              ⚠️ {validationResult.warning}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default XSDValidator;