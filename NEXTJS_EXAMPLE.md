# Next.js Integration Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install ckeditor-react-wrapper @ckeditor/ckeditor5-build-classic
```

### 2. Basic Usage with SSR

```tsx
// pages/editor.tsx or app/editor/page.tsx
import React, { useState } from 'react';
import { CKEditorSSR } from 'ckeditor-react-wrapper';

export default function EditorPage() {
  const [data, setData] = useState('<p>Hello CKEditor!</p>');

  return (
    <div>
      <h1>My Editor</h1>
      <CKEditorSSR
        data={data}
        onChange={(event, editor) => setData(editor.getData())}
        config={{
          toolbar: ['heading', '|', 'bold', 'italic', 'link']
        }}
      />
    </div>
  );
}
```

### 3. Dynamic Import (Alternative)

```tsx
// pages/editor.tsx
import dynamic from 'next/dynamic';
import { useState } from 'react';

const CKEditor = dynamic(
  () => import('ckeditor-react-wrapper').then(mod => ({ default: mod.CKEditor })),
  { 
    ssr: false,
    loading: () => <p>Loading editor...</p>
  }
);

export default function EditorPage() {
  const [data, setData] = useState('<p>Hello CKEditor!</p>');

  return (
    <div>
      <h1>My Editor</h1>
      <CKEditor
        data={data}
        onChange={(event, editor) => setData(editor.getData())}
        config={{
          toolbar: ['heading', '|', 'bold', 'italic', 'link']
        }}
      />
    </div>
  );
}
```

### 4. Next.js Configuration

Create or update your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Prevent CKEditor duplicated modules
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ckeditor/ckeditor5-build-classic': require.resolve('@ckeditor/ckeditor5-build-classic'),
    };

    // For server-side rendering
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@ckeditor/ckeditor5-build-classic': 'commonjs @ckeditor/ckeditor5-build-classic',
      });
    }

    return config;
  },
  // Disable static optimization for pages with CKEditor
  experimental: {
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;
```

### 5. App Router (Next.js 13+)

```tsx
// app/editor/page.tsx
'use client'; // This is important for client-side components

import React, { useState } from 'react';
import { CKEditorSSR } from 'ckeditor-react-wrapper';

export default function EditorPage() {
  const [data, setData] = useState('<p>Hello CKEditor!</p>');

  return (
    <div>
      <h1>My Editor</h1>
      <CKEditorSSR
        data={data}
        onChange={(event, editor) => setData(editor.getData())}
        config={{
          toolbar: ['heading', '|', 'bold', 'italic', 'link']
        }}
      />
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **"window is not defined"** - Use `CKEditorSSR` or dynamic imports
2. **"ckeditor-duplicated-modules"** - Add webpack alias in next.config.js
3. **Hydration mismatch** - Use `CKEditorSSR` which handles SSR properly

### Performance Tips

1. **Use dynamic imports** for better performance
2. **Load editor only when needed** - lazy load the component
3. **Consider code splitting** for large applications

### Example with Lazy Loading

```tsx
// components/LazyEditor.tsx
import dynamic from 'next/dynamic';

const CKEditor = dynamic(
  () => import('ckeditor-react-wrapper').then(mod => ({ default: mod.CKEditorSSR })),
  { 
    ssr: false,
    loading: () => <div>Loading editor...</div>
  }
);

export default function LazyEditor(props) {
  return <CKEditor {...props} />;
}
```

## TypeScript Support

The package includes full TypeScript definitions:

```tsx
import { CKEditorSSR, CKEditorProps, CKEditorRef } from 'ckeditor-react-wrapper';

const MyEditor: React.FC<CKEditorProps> = (props) => {
  const editorRef = useRef<CKEditorRef>(null);
  
  return <CKEditorSSR ref={editorRef} {...props} />;
};
```
