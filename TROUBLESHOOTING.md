# CKEditor React Wrapper - Troubleshooting Guide

## Common Issues and Solutions

### 1. CKEditor Duplicated Modules Error

**Error:** `CKEditorError: ckeditor-duplicated-modules`

**Cause:** This error occurs when multiple versions of CKEditor 5 modules are loaded, typically when bundlers include CKEditor modules in your wrapper package instead of treating them as external dependencies.

**Solution:**

1. **Ensure proper installation:**
   ```bash
   npm install ckeditor-react-wrapper @ckeditor/ckeditor5-editor-classic
   ```

2. **Check your bundler configuration:**
   
   For **Webpack** (Next.js, Create React App, etc.):
   ```javascript
   // webpack.config.js or next.config.js
   module.exports = {
     resolve: {
       alias: {
         // Ensure only one version of CKEditor modules
         '@ckeditor/ckeditor5-editor-classic': require.resolve('@ckeditor/ckeditor5-editor-classic'),
         '@ckeditor/ckeditor5-core': require.resolve('@ckeditor/ckeditor5-core'),
         '@ckeditor/ckeditor5-engine': require.resolve('@ckeditor/ckeditor5-engine'),
         '@ckeditor/ckeditor5-ui': require.resolve('@ckeditor/ckeditor5-ui'),
         '@ckeditor/ckeditor5-utils': require.resolve('@ckeditor/ckeditor5-utils'),
       }
     }
   };
   ```

   For **Vite**:
   ```javascript
   // vite.config.js
   export default {
     resolve: {
       dedupe: ['@ckeditor/ckeditor5-editor-classic']
     }
   };
   ```

3. **For Next.js specifically:**
   ```javascript
   // next.config.js
   module.exports = {
     webpack: (config) => {
       config.resolve.alias = {
         ...config.resolve.alias,
         '@ckeditor/ckeditor5-editor-classic': require.resolve('@ckeditor/ckeditor5-editor-classic'),
       };
       return config;
     },
   };
   ```

### 2. Module Not Found Error

**Error:** `Cannot resolve module '@ckeditor/ckeditor5-editor-classic'`

**Solution:**
```bash
npm install @ckeditor/ckeditor5-editor-classic
```

### 3. Abstract Method Error

**Error:** `Abstract method` or similar TypeScript errors

**Solution:** This wrapper uses `ClassicEditor` (concrete implementation) instead of the abstract `Editor` class, so this error should not occur. If you see it, make sure you're using the latest version of the wrapper.

### 4. SSR/Next.js Issues

**Problem:** CKEditor doesn't work with Server-Side Rendering

**Solution:**
```tsx
import dynamic from 'next/dynamic';

const CKEditor = dynamic(() => import('ckeditor-react-wrapper').then(mod => ({ default: mod.CKEditor })), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});
```

### 5. TypeScript Errors

**Error:** TypeScript can't find CKEditor types

**Solution:**
```bash
npm install @types/react @types/react-dom
```

Make sure your `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### 6. Build Size Issues

**Problem:** Bundle size is too large

**Solution:** The wrapper is designed to be lightweight and externalizes all CKEditor modules. If you're seeing large bundle sizes, ensure your bundler is properly externalizing dependencies.

### 7. Version Conflicts

**Problem:** Different CKEditor versions causing conflicts

**Solution:**
1. Check for multiple CKEditor installations:
   ```bash
   npm ls @ckeditor/ckeditor5-editor-classic
   ```

2. Use npm's `overrides` or `resolutions` to force a single version:
   ```json
   // package.json
   {
     "overrides": {
       "@ckeditor/ckeditor5-editor-classic": "^40.0.0"
     }
   }
   ```

## Getting Help

If you're still experiencing issues:

1. Check the [CKEditor 5 documentation](https://ckeditor.com/docs/ckeditor5/latest/)
2. Ensure you're using compatible versions
3. Check your bundler configuration
4. Create a minimal reproduction case

## Version Compatibility

| Wrapper Version | CKEditor 5 Version | React Version |
|----------------|-------------------|---------------|
| 1.0.3+         | 40.0.0+          | 16.8.0+       |
