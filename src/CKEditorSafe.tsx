import React, { useEffect, useRef, useImperativeHandle, forwardRef, useCallback, useState } from 'react';
import { CKEditorProps, CKEditorRef } from './types';

// Safe wrapper that handles duplicated modules error
const CKEditorSafe = forwardRef<CKEditorRef, CKEditorProps>(
  (props, ref) => {
    const [Editor, setEditor] = useState<React.ComponentType<any> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fallbackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const loadEditor = async () => {
        try {
          // Check if we're in a browser environment
          if (typeof window === 'undefined') {
            setError('CKEditor requires a browser environment. Use dynamic imports for SSR.');
            setIsLoading(false);
            return;
          }

          // Clear any existing CKEditor modules to prevent conflicts
          // @ts-ignore
          delete window.CKEDITOR;
          // @ts-ignore
          delete window.ClassicEditor;

          // Dynamic import to avoid bundling issues
          const CKEditorModule = await import('./CKEditor');
          setEditor(() => CKEditorModule.default);
          setIsLoading(false);
        } catch (err) {
          console.error('Failed to load CKEditor:', err);
          setError(err instanceof Error ? err.message : 'Failed to load editor');
          setIsLoading(false);
        }
      };

      loadEditor();
    }, []);

    // Handle the case where CKEditor fails to load
    if (error) {
      return (
        <div 
          ref={fallbackRef}
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            color: '#666',
            ...props.style
          }}
          className={props.className}
        >
          <p>CKEditor failed to load: {error}</p>
          <p>This might be due to duplicated modules. Please check the console for more details.</p>
          <details>
            <summary>Solutions:</summary>
            <ul>
              <li>Add webpack alias: <code>@ckeditor/ckeditor5-editor-classic: require.resolve('@ckeditor/ckeditor5-editor-classic')</code></li>
              <li>Check for multiple CKEditor installations</li>
              <li>See DUPLICATED_MODULES_SOLUTION.md for detailed fixes</li>
            </ul>
          </details>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div 
          ref={fallbackRef}
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            color: '#666',
            textAlign: 'center',
            ...props.style
          }}
          className={props.className}
        >
          Loading CKEditor...
        </div>
      );
    }

    if (!Editor) {
      return (
        <div 
          ref={fallbackRef}
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            color: '#666',
            ...props.style
          }}
          className={props.className}
        >
          Editor not available
        </div>
      );
    }

    return <Editor ref={ref} {...props} />;
  }
);

CKEditorSafe.displayName = 'CKEditorSafe';

export default CKEditorSafe;
