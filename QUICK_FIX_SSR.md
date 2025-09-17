# Quick Fix for "window is not defined" Error

## 🚨 IMMEDIATE SOLUTION

**Replace your current import with this:**

```tsx
// ❌ DON'T USE (causes SSR error):
import { CKEditor } from 'ckeditor-react-wrapper';

// ✅ USE THIS INSTEAD:
import { CKEditorNoSSR } from 'ckeditor-react-wrapper';

// Everything else stays exactly the same!
<CKEditorNoSSR
  data={data}
  onChange={handleChange}
  config={config}
/>
```

## That's it! 🎉

The `CKEditorNoSSR` component:
- ✅ **Completely prevents** "window is not defined" errors
- ✅ **Works with Next.js, Gatsby, and all SSR frameworks**
- ✅ **Same API** as regular CKEditor
- ✅ **Shows loading state** during hydration
- ✅ **No configuration needed**

## Alternative: Next.js Dynamic Import

If you prefer dynamic imports:

```tsx
import dynamic from 'next/dynamic';

const CKEditor = dynamic(
  () => import('ckeditor-react-wrapper').then(mod => ({ default: mod.CKEditor })),
  { ssr: false }
);

// Use normally
<CKEditor data={data} onChange={handleChange} config={config} />
```

## Why This Works

The error happens because CKEditor 5 tries to access `window` during import, but SSR doesn't have `window`. The `CKEditorNoSSR` component:

1. **Only loads CKEditor on the client side**
2. **Shows a loading state during SSR**
3. **Prevents any server-side execution**
4. **Handles hydration properly**

## Need More Help?

- See [SSR_SOLUTION.md](./SSR_SOLUTION.md) for complete solutions
- See [NEXTJS_EXAMPLE.md](./NEXTJS_EXAMPLE.md) for Next.js specific examples
- Check the main [README.md](./README.md) for full documentation

**The `CKEditorNoSSR` component is specifically designed to solve your exact issue!**
