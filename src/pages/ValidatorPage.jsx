import React, { useState } from 'react';
import { validateXML } from '../services/xmlValidator';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';

const VALID_XML = `<section><heading/><p/><img/><p/><p/><p/><p/><ul/><p/><ul/><p/><ul/><table/><section/></section>`;
const INVALID_XML = `<section><heading/><p/><img/><p/><p/><p/><p/><ul/><p/><ul/><p/><ul/><section/><table/></section>`;
const DEFAULT_XSD = `<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element  name="section">  <xs:complexType>
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
       </xs:complexType></xs:element></xs:schema>`;

export default function ValidatorPage() {
  const [xml, setXml] = useState(VALID_XML);
  const [xsd, setXsd] = useState(DEFAULT_XSD);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runValidation = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await validateXML(xml, xsd);
      setResult(res);
    } catch (err) {
      setResult({ valid: false, message: err.message, method: 'xmllint-wasm' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="validator-page container">
      <div className="grid">
        <TextArea
          id="xml-input"
          label="XML Document"
          value={xml}
          onChange={setXml}
          placeholder="Paste your XML here"
        />
        <TextArea
          id="xsd-input"
          label="XSD Schema"
          value={xsd}
          onChange={setXsd}
          placeholder="Paste your XSD schema here"
        />
      </div>

      <div className="actions">
        <div className="left">
          <Button onClick={() => setXml(VALID_XML)} variant="success">Load valid XML</Button>
          <Button onClick={() => setXml(INVALID_XML)} variant="danger">Load invalid XML</Button>
        </div>
        <div className="right">
          <Button onClick={runValidation} loading={loading}>Validate XML against XSD</Button>
        </div>
      </div>

      <ResultCard result={result} />
    </main>
  );
}
