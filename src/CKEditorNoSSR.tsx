import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { CKEditorProps, CKEditorRef } from './types';

// No-SSR CKEditor wrapper that completely prevents server-side execution
const CKEditorNoSSR = forwardRef<CKEditorRef, CKEditorProps>(
  (props, ref) => {
    const [isClient, setIsClient] = useState(false);
    const [Editor, setEditor] = useState<React.ComponentType<any> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const editorRef = useRef<CKEditorRef>(null);
    const domElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Only run on client side
      if (typeof window !== 'undefined') {
        setIsClient(true);
      }
    }, []);

    useEffect(() => {
      if (!isClient) return;

      const loadEditor = async () => {
        try {
          // Use dynamic import with a timeout to ensure we're in browser
          await new Promise(resolve => setTimeout(resolve, 0));
          
          const { default: CKEditorComponent } = await import('./CKEditor');
          setEditor(() => CKEditorComponent);
        } catch (err) {
          console.error('Failed to load CKEditor:', err);
          setError(err instanceof Error ? err.message : 'Failed to load editor');
        }
      };

      loadEditor();
    }, [isClient]);

    // Expose editor methods through ref
    useImperativeHandle(ref, () => ({
      editor: editorRef.current?.editor || null,
      getData: () => editorRef.current?.getData() || '',
      setData: (data: string) => {
        if (editorRef.current) {
          editorRef.current.setData(data);
        }
      },
      destroy: () => {
        if (editorRef.current) {
          editorRef.current.destroy();
        }
      },
    }));

    // Show loading state during SSR or while loading
    if (!isClient || !Editor) {
      return (
        <div 
          ref={domElementRef}
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            color: '#666',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...props.style
          }}
          className={props.className}
        >
          {error ? (
            <div>
              <p>CKEditor failed to load: {error}</p>
              <p>This component requires a browser environment.</p>
            </div>
          ) : (
            <p>Loading CKEditor...</p>
          )}
        </div>
      );
    }

    // Render the actual CKEditor component
    return <Editor ref={editorRef} {...props} />;
  }
);

CKEditorNoSSR.displayName = 'CKEditorNoSSR';

export default CKEditorNoSSR;
