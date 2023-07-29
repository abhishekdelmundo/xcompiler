'use client'
// src/TSToJSConverter.js
import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/theme-monokai';
import ts from 'typescript';

const TSToJSConverter = () => {
  const [tsCode, setTsCode] = useState('');
  const [jsOutput, setJsOutput] = useState('');

  const convertToJS = () => {
    try {
      const jsResult = ts.transpileModule(tsCode, { compilerOptions: {} });
      setJsOutput(jsResult.outputText);
    } catch (error) {
      setJsOutput('Error converting TypeScript to JavaScript');
    }
  };

  return (
    <div>
      <h1>TypeScript to JavaScript Converter</h1>
      <div style={{ display: 'flex' }}>
        <AceEditor
          mode="typescript"
          theme="monokai"
          onChange={setTsCode}
          value={tsCode}
          style={{ flex: 1, height: '400px' }}
        />
        <div style={{ flex: 1, marginLeft: '10px' }}>
          <h3>JavaScript Output:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{jsOutput}</pre>
          <button onClick={convertToJS}>Convert TypeScript to JavaScript</button>
        </div>
      </div>
    </div>
  );
};

export default TSToJSConverter;
