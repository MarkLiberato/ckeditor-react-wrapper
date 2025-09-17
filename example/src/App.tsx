import React, { useState, useRef } from 'react';
import { CKEditor, CKEditorRef } from 'ckeditor-react-wrapper';

function App() {
  const [basicData, setBasicData] = useState('<p>Hello CKEditor! This is a basic example.</p>');
  const [advancedData, setAdvancedData] = useState('<p>This is an advanced example with more features.</p>');
  const [status, setStatus] = useState<string>('');
  const editorRef = useRef<CKEditorRef>(null);

  const basicConfig = {
    toolbar: ['heading', '|', 'bold', 'italic', 'link', '|', 'bulletedList', 'numberedList', '|', 'undo', 'redo'],
  };

  const advancedConfig = {
    toolbar: {
      items: [
        'heading', '|',
        'fontSize', 'fontFamily', '|',
        'fontColor', 'fontBackgroundColor', '|',
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'subscript', 'superscript', '|',
        'link', '|',
        'bulletedList', 'numberedList', 'todoList', '|',
        'outdent', 'indent', '|',
        'alignment', '|',
        'blockQuote', 'insertTable', '|',
        'undo', 'redo'
      ]
    },
    language: 'en',
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    }
  };

  const handleBasicChange = (event: any, editor: any) => {
    const newData = editor.getData();
    setBasicData(newData);
  };

  const handleAdvancedChange = (event: any, editor: any) => {
    const newData = editor.getData();
    setAdvancedData(newData);
  };

  const handleSave = () => {
    if (editorRef.current) {
      const data = editorRef.current.getData();
      console.log('Saved data:', data);
      setStatus('Data saved to console!');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const handleLoadData = () => {
    if (editorRef.current) {
      editorRef.current.setData('<p>New content loaded via ref!</p>');
      setStatus('New content loaded!');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.setData('');
      setStatus('Editor cleared!');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const handleEditorReady = (editor: any) => {
    console.log('Editor is ready!', editor);
    setStatus('Editor is ready!');
    setTimeout(() => setStatus(''), 3000);
  };

  const handleError = (error: Error, { willEditorRestart }: { willEditorRestart: boolean }) => {
    console.error('Editor error:', error);
    setStatus(`Error: ${error.message}${willEditorRestart ? ' (Editor will restart)' : ''}`);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>CKEditor React Wrapper</h1>
        <p>Free and open-source CKEditor wrapper for React applications</p>
      </div>

      {status && (
        <div className={`status ${status.includes('Error') ? 'error' : 'success'}`}>
          {status}
        </div>
      )}

      <div className="example-section">
        <h2>Basic Example</h2>
        <p>Simple editor with basic toolbar and data binding.</p>
        <div className="editor-container">
          <CKEditor
            data={basicData}
            onChange={handleBasicChange}
            config={basicConfig}
            onReady={handleEditorReady}
            onError={handleError}
          />
        </div>
        <div className="data-display">
          <h3>Current Data:</h3>
          <pre>{basicData}</pre>
        </div>
      </div>

      <div className="example-section">
        <h2>Advanced Example with Ref</h2>
        <p>Advanced editor with more features and programmatic control via ref.</p>
        <div className="editor-container">
          <CKEditor
            ref={editorRef}
            data={advancedData}
            onChange={handleAdvancedChange}
            config={advancedConfig}
            onReady={handleEditorReady}
            onError={handleError}
          />
        </div>
        <div className="controls">
          <button onClick={handleSave}>Save Data</button>
          <button onClick={handleLoadData}>Load New Data</button>
          <button onClick={handleClear}>Clear Editor</button>
        </div>
        <div className="data-display">
          <h3>Current Data:</h3>
          <pre>{advancedData}</pre>
        </div>
      </div>

      <div className="example-section">
        <h2>Features Demonstrated</h2>
        <ul>
          <li>✅ Basic editor integration</li>
          <li>✅ Data binding and change handling</li>
          <li>✅ Custom configuration</li>
          <li>✅ Ref-based programmatic control</li>
          <li>✅ Event handling (ready, change, error)</li>
          <li>✅ TypeScript support</li>
          <li>✅ Error handling</li>
          <li>✅ Advanced toolbar configuration</li>
          <li>✅ Table support</li>
          <li>✅ Font styling options</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
