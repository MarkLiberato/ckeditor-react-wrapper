import React, { forwardRef } from 'react';
import { CKEditorProps, CKEditorRef } from './types';

// This component should only be used with Next.js dynamic imports
const CKEditorNextJS = forwardRef<CKEditorRef, CKEditorProps>(
  (props, ref) => {
    // This component will be replaced by the actual CKEditor at runtime
    // It should never be rendered directly
    throw new Error(
      'CKEditorNextJS should only be used with Next.js dynamic imports. ' +
      'Use: dynamic(() => import("ckeditor-react-wrapper").then(mod => ({ default: mod.CKEditor })), { ssr: false })'
    );
  }
);

CKEditorNextJS.displayName = 'CKEditorNextJS';

export default CKEditorNextJS;
