'use client'
// src/PythonEditor.js
import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import axios from 'axios';

const PythonEditor = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const executePython = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/python', { code });
      if (response.data.success) {
        setOutput(response.data.output);
      } else {
        setOutput('Error executing Python code');
      }
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Python Editor</h1>
      <div style={{ display: 'flex' }}>
        <AceEditor
          mode="python"
          theme="monokai"
          onChange={setCode}
          value={code}
          style={{ flex: 1, height: '400px' }}
        />
        <div style={{ flex: 1, marginLeft: '10px' }}>
          <h3>Output:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{output}</pre>
          <button onClick={executePython}>Execute Python Code</button>
        </div>
      </div>
    </div>
  );
};

export default PythonEditor;
