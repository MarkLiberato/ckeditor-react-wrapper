import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import { CKEditorProps, CKEditorRef } from './types';

// Completely client-only CKEditor wrapper
const CKEditorClientOnly = forwardRef<CKEditorRef, CKEditorProps>(
  (props, ref) => {
    const [isMounted, setIsMounted] = useState(false);
    const [Editor, setEditor] = useState<React.ComponentType<any> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const editorRef = useRef<CKEditorRef>(null);
    const domElementRef = useRef<HTMLDivElement>(null);
    const isInitializing = useRef(false);
    const isDestroyed = useRef(false);

    // Only run on client side
    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Load CKEditor only after component is mounted
    useEffect(() => {
      if (!isMounted) return;

      const loadEditor = async () => {
        try {
          // Double check we're in browser
          if (typeof window === 'undefined') {
            setError('Not in browser environment');
            return;
          }

          // Dynamic import to avoid SSR issues
          const { default: CKEditorComponent } = await import('./CKEditor');
          setEditor(() => CKEditorComponent);
        } catch (err) {
          console.error('Failed to load CKEditor:', err);
          setError(err instanceof Error ? err.message : 'Failed to load editor');
        }
      };

      loadEditor();
    }, [isMounted]);

    // Initialize editor when both mounted and editor is loaded
    const initializeEditor = useCallback(async () => {
      if (!isMounted || !Editor || !domElementRef.current || editorRef.current || isInitializing.current) {
        return;
      }

      isInitializing.current = true;

      try {
        // This will be handled by the actual CKEditor component
        // We just need to pass the ref through
      } catch (err) {
        console.error('Failed to initialize editor:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize editor');
      } finally {
        isInitializing.current = false;
      }
    }, [isMounted, Editor]);

    useEffect(() => {
      initializeEditor();
    }, [initializeEditor]);

    // Expose editor methods through ref
    React.useImperativeHandle(ref, () => ({
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
    if (!isMounted || !Editor) {
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

CKEditorClientOnly.displayName = 'CKEditorClientOnly';

export default CKEditorClientOnly;
