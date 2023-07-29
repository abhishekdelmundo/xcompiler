'use client'
// src/JSXToHTMLConverter.js
import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/theme-monokai';
import { renderToStaticMarkup } from 'react-dom/server';

const JSXToHTMLConverter = () => {
  const [jsxCode, setJSXCode] = useState('');
  const [htmlOutput, setHTMLOutput] = useState('');

  const convertToHTML = () => {
    try {
      const transpiledJS = window.Babel.transform(jsxCode, {
        presets: ['@babel/preset-react'],
      }).code;
      const ReactComponent = eval(transpiledJS);
      const html = renderToStaticMarkup(React.createElement(ReactComponent));
      setHTMLOutput(html);
    } catch (error) {
      setHTMLOutput('Error converting JSX to HTML');
    }
  };

  return (
    <div>
      <h1>JSX to HTML Converter</h1>
      <div style={{ display: 'flex' }}>
        <AceEditor
          mode="jsx"
          theme="monokai"
          onChange={setJSXCode}
          value={jsxCode}
          style={{ flex: 1, height: '400px' }}
        />
        <div style={{ flex: 1, marginLeft: '10px' }}>
          <h3>HTML Output:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{htmlOutput}</pre>
          <button onClick={convertToHTML}>Convert JSX to HTML</button>
        </div>
      </div>
    </div>
  );
};

export default JSXToHTMLConverter;
