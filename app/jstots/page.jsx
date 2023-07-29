'use client'
// src/JSToTSConverter.js
import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { transpileModule } from 'typescript';

// import { transpileModule } from 'ts-migrate/dist/index.browser';

const JSToTSConverter = () => {
  const [jsCode, setJsCode] = useState('');
  const [tsOutput, setTsOutput] = useState('');

  const convertToTS = () => {
    try {
      const tsResult = transpileModule(jsCode, { compilerOptions: {} });
      setTsOutput(tsResult.outputText);
    } catch (error) {
      setTsOutput('Error converting JavaScript to TypeScript');
    }
  };

  return (
    <div>
      <h1>JavaScript to TypeScript Converter</h1>
      <div style={{ display: 'flex' }}>
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={setJsCode}
          value={jsCode}
          style={{ flex: 1, height: '400px' }}
        />
        <div style={{ flex: 1, marginLeft: '10px' }}>
          <h3>TypeScript Output:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{tsOutput}</pre>
          <button onClick={convertToTS}>Convert JavaScript to TypeScript</button>
        </div>
      </div>
    </div>
  );
};

export default JSToTSConverter;
