# CKEditor React Wrapper - Usage Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install ckeditor-react-wrapper @ckeditor/ckeditor5-editor-classic
```

### 2. Basic Usage

```tsx
import React, { useState } from 'react';
import { CKEditor } from 'ckeditor-react-wrapper';

function MyComponent() {
  const [data, setData] = useState('<p>Hello CKEditor!</p>');

  const handleChange = (event, editor) => {
    const newData = editor.getData();
    setData(newData);
  };

  return (
    <div>
      <h1>My Editor</h1>
      <CKEditor
        data={data}
        onChange={handleChange}
        config={{
          toolbar: ['heading', '|', 'bold', 'italic', 'link']
        }}
      />
    </div>
  );
}

export default MyComponent;
```

### 3. Advanced Usage with Ref

```tsx
import React, { useRef } from 'react';
import { CKEditor, CKEditorRef } from 'ckeditor-react-wrapper';

function AdvancedComponent() {
  const editorRef = useRef<CKEditorRef>(null);

  const handleSave = () => {
    if (editorRef.current) {
      const data = editorRef.current.getData();
      console.log('Saved data:', data);
    }
  };

  const handleLoadData = () => {
    if (editorRef.current) {
      editorRef.current.setData('<p>New content loaded!</p>');
    }
  };

  return (
    <div>
      <CKEditor
        ref={editorRef}
        onReady={(editor) => {
          console.log('Editor is ready!', editor);
        }}
        config={{
          toolbar: {
            items: [
              'heading', '|',
              'bold', 'italic', 'underline', '|',
              'bulletedList', 'numberedList', '|',
              'link', 'blockQuote', '|',
              'undo', 'redo'
            ]
          }
        }}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoadData}>Load Data</button>
    </div>
  );
}

export default AdvancedComponent;
```

## Important Notes

1. **Dependency**: You must install `@ckeditor/ckeditor5-editor-classic` as a peer dependency
2. **Editor Type**: This wrapper uses `ClassicEditor` from CKEditor 5
3. **Configuration**: All CKEditor 5 configuration options are supported
4. **TypeScript**: Full TypeScript support is included

## Troubleshooting

### Module Not Found Error

If you get a "Cannot resolve module" error, make sure you have installed the peer dependency:

```bash
npm install @ckeditor/ckeditor5-editor-classic
```

### Abstract Method Error

This wrapper uses `ClassicEditor` instead of the abstract `Editor` class, so you shouldn't see this error.

## API Reference

See the main README.md for complete API documentation.
