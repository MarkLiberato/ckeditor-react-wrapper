# CKEditor React Wrapper

A **100% free and open-source** CKEditor 5 wrapper for React applications. This package provides a simple and flexible way to integrate CKEditor 5 into your React projects **without any licensing restrictions or commercial license requirements**.

## Features

- 🆓 **100% Free**: Uses the free CKEditor 5 build - no commercial license required!
- 🚀 **Easy Integration**: Simple React component wrapper for CKEditor 5
- 📝 **TypeScript Support**: Full TypeScript definitions included
- 🎛️ **Flexible Configuration**: Support for all CKEditor 5 configuration options
- 🔄 **Event Handling**: Built-in support for common editor events
- ♿ **Accessibility**: Proper ARIA attributes and keyboard navigation
- 📦 **Tree Shaking**: Optimized bundle size with tree shaking support
- 🎨 **Customizable**: Support for custom CSS classes and styles

## Installation

```bash
npm install ckeditor-react-wrapper @ckeditor/ckeditor5-build-classic
# or
yarn add ckeditor-react-wrapper @ckeditor/ckeditor5-build-classic
```

> **Important:** This wrapper uses the **free, open-source** CKEditor 5 build (`@ckeditor/ckeditor5-build-classic`) which is available under GPL 2+ license. No commercial license required! The wrapper automatically configures `licenseKey: 'GPL'` for all CKEditor instances.

## Basic Usage

```tsx
import React, { useState } from 'react';
import { CKEditor } from 'ckeditor-react-wrapper';

function App() {
  const [data, setData] = useState('<p>Hello CKEditor!</p>');

  const handleEditorChange = (event, editor) => {
    const newData = editor.getData();
    setData(newData);
  };

  return (
    <div>
      <h1>CKEditor React Wrapper</h1>
      <CKEditor
        data={data}
        onChange={handleEditorChange}
        config={{
          licenseKey: 'GPL',
          toolbar: ['heading', '|', 'bold', 'italic', 'link'],
        }}
      />
    </div>
  );
}

export default App;
```

## Safe Usage (Recommended for Complex Setups)

If you're experiencing the `ckeditor-duplicated-modules` error, use the safe wrapper:

```tsx
import React, { useState } from 'react';
import { CKEditorSafe } from 'ckeditor-react-wrapper';

function App() {
  const [data, setData] = useState('<p>Hello CKEditor!</p>');

  return (
    <CKEditorSafe
      data={data}
      onChange={(event, editor) => setData(editor.getData())}
      config={{ toolbar: ['bold', 'italic', 'link'] }}
    />
  );
}
```

## SSR Support (Next.js, Gatsby, etc.)

**If you're getting "window is not defined" error, use this:**

```tsx
import React, { useState } from 'react';
import { CKEditorNoSSR } from 'ckeditor-react-wrapper';

function App() {
  const [data, setData] = useState('<p>Hello CKEditor!</p>');

  return (
    <CKEditorNoSSR
      data={data}
      onChange={(event, editor) => setData(editor.getData())}
      config={{ toolbar: ['bold', 'italic', 'link'] }}
    />
  );
}
```

### Component Comparison:

- **`CKEditor`** - Basic wrapper, may cause SSR issues
- **`CKEditorSafe`** - Handles duplicated modules errors gracefully
- **`CKEditorSSR`** - Basic SSR support
- **`CKEditorNoSSR`** - **✅ Complete SSR solution (recommended)**
- **`CKEditorClientOnly`** - Advanced client-only handling

## Advanced Usage

### Using with Ref

```tsx
import React, { useRef } from 'react';
import { CKEditor, CKEditorRef } from 'ckeditor-react-wrapper';

function App() {
  const editorRef = useRef<CKEditorRef>(null);

  const handleSave = () => {
    if (editorRef.current) {
      const data = editorRef.current.getData();
      console.log('Editor data:', data);
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
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          console.log('Data changed:', editor.getData());
        }}
        config={{
          toolbar: {
            items: [
              'heading', '|',
              'bold', 'italic', 'underline', '|',
              'bulletedList', 'numberedList', '|',
              'outdent', 'indent', '|',
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
```

### Custom Editor Configuration

```tsx
import React from 'react';
import { CKEditor } from 'ckeditor-react-wrapper';

function App() {
  const editorConfig = {
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

  return (
    <CKEditor
      config={editorConfig}
      onReady={(editor) => {
        console.log('Editor is ready!');
      }}
    />
  );
}
```

## API Reference

### CKEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `EditorConfig` | `{}` | CKEditor configuration object |
| `data` | `string` | `''` | Initial data to be loaded into the editor |
| `onReady` | `(editor: Editor) => void` | - | Callback fired when the editor is ready |
| `onChange` | `(event: any, editor: Editor) => void` | - | Callback fired when the editor data changes |
| `onDestroy` | `() => void` | - | Callback fired when the editor is destroyed |
| `onError` | `(error: Error, { willEditorRestart }: { willEditorRestart: boolean }) => void` | - | Callback fired when an error occurs |
| `disabled` | `boolean` | `false` | Whether the editor is disabled |
| `className` | `string` | - | Custom CSS class name for the editor container |
| `style` | `React.CSSProperties` | - | Custom styles for the editor container |
| `editor` | `typeof Editor` | `Editor` | The editor instance to use (for advanced use cases) |
| `watchData` | `boolean` | `true` | Whether to watch for changes in the data prop |

### CKEditorRef Methods

| Method | Type | Description |
|--------|------|-------------|
| `editor` | `Editor \| null` | The CKEditor instance |
| `getData()` | `() => string` | Get the editor's data |
| `setData(data: string)` | `(data: string) => void` | Set the editor's data |
| `destroy()` | `() => void` | Destroy the editor instance |

## Styling

The component accepts `className` and `style` props for custom styling:

```tsx
<CKEditor
  className="my-custom-editor"
  style={{ minHeight: '300px', border: '1px solid #ccc' }}
  config={config}
/>
```

## Error Handling

The component provides error handling through the `onError` prop:

```tsx
<CKEditor
  onError={(error, { willEditorRestart }) => {
    console.error('Editor error:', error);
    if (willEditorRestart) {
      console.log('Editor will restart automatically');
    }
  }}
  config={config}
/>
```

## Development

To contribute to this project:

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development build: `npm run dev`
4. Build the project: `npm run build`

## License

MIT License - see LICENSE file for details.

## Troubleshooting

### CKEditor Duplicated Modules Error

If you encounter the `ckeditor-duplicated-modules` error, this is usually caused by bundlers including CKEditor modules instead of treating them as external dependencies.

### SSR "window is not defined" Error

If you encounter the `window is not defined` error, this happens during server-side rendering. Use the SSR-compatible component:

```tsx
import { CKEditorSSR } from 'ckeditor-react-wrapper';
// or use dynamic imports with Next.js
``` 

**For Next.js:**
```javascript
// next.config.js
module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ckeditor/ckeditor5-build-classic': require.resolve('@ckeditor/ckeditor5-build-classic'),
    };
    return config;
  },
};
```

**For Webpack:**
```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      '@ckeditor/ckeditor5-build-classic': require.resolve('@ckeditor/ckeditor5-build-classic'),
    }
  }
};
```

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for more detailed solutions.

For a complete solution to the duplicated modules error, see [DUPLICATED_MODULES_SOLUTION.md](./DUPLICATED_MODULES_SOLUTION.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### 1.0.6
- Fixed "window is not defined" SSR error
- Added CKEditorSSR component for server-side rendering
- Improved error handling and browser environment checks
- Added comprehensive Next.js integration guide

### 1.0.5
- Switched to free CKEditor 5 build (no license required)
- Fixed all licensing issues
- Updated to use @ckeditor/ckeditor5-build-classic

### 1.0.3
- Fixed CKEditor duplicated modules error
- Properly externalized all CKEditor dependencies
- Added comprehensive troubleshooting guide

### 1.0.0
- Initial release
- Basic CKEditor 5 integration
- TypeScript support
- Event handling
- Ref support
