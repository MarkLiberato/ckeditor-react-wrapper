# CKEditor Duplicated Modules - Complete Solution

## The Problem

The `ckeditor-duplicated-modules` error occurs when multiple versions of CKEditor 5 modules are loaded in the same application. This typically happens when:

1. Your bundler includes CKEditor modules from different sources
2. Multiple packages depend on different versions of CKEditor
3. The wrapper package bundles CKEditor instead of treating it as external

## Complete Solution

### 1. For Next.js Applications

Create or update your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Prevent CKEditor duplicated modules
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ckeditor/ckeditor5-editor-classic': require.resolve('@ckeditor/ckeditor5-editor-classic'),
      '@ckeditor/ckeditor5-core': require.resolve('@ckeditor/ckeditor5-core'),
      '@ckeditor/ckeditor5-engine': require.resolve('@ckeditor/ckeditor5-engine'),
      '@ckeditor/ckeditor5-ui': require.resolve('@ckeditor/ckeditor5-ui'),
      '@ckeditor/ckeditor5-utils': require.resolve('@ckeditor/ckeditor5-utils'),
    };

    // For server-side rendering
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@ckeditor/ckeditor5-editor-classic': 'commonjs @ckeditor/ckeditor5-editor-classic',
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

### 2. For Webpack Applications

Update your `webpack.config.js`:

```javascript
const path = require('path');

module.exports = {
  // ... your existing config
  resolve: {
    alias: {
      '@ckeditor/ckeditor5-editor-classic': require.resolve('@ckeditor/ckeditor5-editor-classic'),
      '@ckeditor/ckeditor5-core': require.resolve('@ckeditor/ckeditor5-core'),
      '@ckeditor/ckeditor5-engine': require.resolve('@ckeditor/ckeditor5-engine'),
      '@ckeditor/ckeditor5-ui': require.resolve('@ckeditor/ckeditor5-ui'),
      '@ckeditor/ckeditor5-utils': require.resolve('@ckeditor/ckeditor5-utils'),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        ckeditor: {
          test: /[\\/]node_modules[\\/]@ckeditor[\\/]/,
          name: 'ckeditor',
          chunks: 'all',
          priority: 10,
        },
      },
    },
  },
};
```

### 3. For Vite Applications

Update your `vite.config.js`:

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    dedupe: ['@ckeditor/ckeditor5-editor-classic'],
    alias: {
      '@ckeditor/ckeditor5-editor-classic': require.resolve('@ckeditor/ckeditor5-editor-classic'),
    },
  },
  optimizeDeps: {
    include: ['@ckeditor/ckeditor5-editor-classic'],
  },
});
```

### 4. For Create React App

Create a `setupProxy.js` in your `src` folder:

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // This is a workaround for CRA's webpack configuration
  // You may need to eject or use CRACO for more control
};
```

Or use CRACO to customize webpack:

```javascript
// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@ckeditor/ckeditor5-editor-classic': require.resolve('@ckeditor/ckeditor5-editor-classic'),
      };
      return webpackConfig;
    },
  },
};
```

### 5. Dynamic Import Solution (Universal)

If the above solutions don't work, use dynamic imports:

```tsx
import React, { useState, useEffect } from 'react';

function CKEditorWrapper({ ...props }) {
  const [Editor, setEditor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEditor = async () => {
      try {
        const { CKEditor } = await import('ckeditor-react-wrapper');
        setEditor(() => CKEditor);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load CKEditor:', error);
        setIsLoading(false);
      }
    };

    loadEditor();
  }, []);

  if (isLoading) {
    return <div>Loading editor...</div>;
  }

  if (!Editor) {
    return <div>Failed to load editor</div>;
  }

  return <Editor {...props} />;
}

export default CKEditorWrapper;
```

### 6. Package.json Overrides (Last Resort)

Add to your `package.json`:

```json
{
  "overrides": {
    "@ckeditor/ckeditor5-editor-classic": "^40.0.0",
    "@ckeditor/ckeditor5-core": "^40.0.0",
    "@ckeditor/ckeditor5-engine": "^40.0.0",
    "@ckeditor/ckeditor5-ui": "^40.0.0",
    "@ckeditor/ckeditor5-utils": "^40.0.0"
  }
}
```

## Verification

After applying any solution, verify it works by:

1. Check your bundle analyzer for duplicate CKEditor modules
2. Look for the error in browser console
3. Ensure only one version of each CKEditor module is loaded

## Why This Happens

CKEditor 5 uses a version checking system that detects when multiple versions of the same module are loaded. This is a safety feature to prevent conflicts, but it can be triggered by:

- Different packages depending on different CKEditor versions
- Bundlers not properly deduplicating modules
- Incorrect webpack/rollup configuration

## Need Help?

If you're still experiencing issues:

1. Check your `node_modules` for multiple CKEditor installations
2. Use `npm ls @ckeditor/ckeditor5-editor-classic` to see the dependency tree
3. Consider using a monorepo tool like Lerna or Nx to manage dependencies
4. Check if any other packages are bundling CKEditor modules
