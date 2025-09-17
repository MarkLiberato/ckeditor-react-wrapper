# Quick Fix for CKEditor Duplicated Modules Error

## 🚀 Immediate Solutions

### 1. Use CKEditorSafe Component (Easiest)

Replace your CKEditor import with the safe wrapper:

```tsx
// Instead of:
import { CKEditor } from 'ckeditor-react-wrapper';

// Use:
import { CKEditorSafe } from 'ckeditor-react-wrapper';

// Everything else stays the same
<CKEditorSafe
  data={data}
  onChange={handleChange}
  config={config}
/>
```

### 2. Next.js Quick Fix

Add this to your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ckeditor/ckeditor5-editor-classic': require.resolve('@ckeditor/ckeditor5-editor-classic'),
    };
    return config;
  },
};

module.exports = nextConfig;
```

### 3. Webpack Quick Fix

Add this to your `webpack.config.js`:

```javascript
module.exports = {
  resolve: {
    alias: {
      '@ckeditor/ckeditor5-editor-classic': require.resolve('@ckeditor/ckeditor5-editor-classic'),
    },
  },
};
```

### 4. Package.json Override (Last Resort)

Add this to your `package.json`:

```json
{
  "overrides": {
    "@ckeditor/ckeditor5-editor-classic": "^40.0.0"
  }
}
```

Then run:
```bash
npm install
```

## 🔍 Why This Happens

The error occurs when multiple versions of CKEditor modules are loaded. This typically happens with:
- Next.js applications
- Complex webpack configurations
- Multiple packages depending on different CKEditor versions

## 📚 Complete Solutions

For detailed solutions for all frameworks, see:
- [DUPLICATED_MODULES_SOLUTION.md](./DUPLICATED_MODULES_SOLUTION.md)
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## ✅ Verification

After applying any fix:
1. Clear your build cache
2. Restart your development server
3. Check browser console for errors
4. Verify only one CKEditor version is loaded
