import React, { useState, useEffect } from 'react';
import { CKEditorProps, CKEditorRef } from './types';

// SSR-compatible CKEditor wrapper
const CKEditorSSR = React.forwardRef<CKEditorRef, CKEditorProps>(
  (props, ref) => {
    const [isClient, setIsClient] = useState(false);
    const [Editor, setEditor] = useState<React.ComponentType<any> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined') {
        setIsClient(true);
        
        // Dynamically import CKEditor only on client side
        import('./CKEditor')
          .then((module) => {
            setEditor(() => module.default);
          })
          .catch((err) => {
            console.error('Failed to load CKEditor:', err);
            setError(err.message || 'Failed to load editor');
          });
      }
    }, []);

    // Show loading state during SSR or while loading
    if (!isClient || !Editor) {
      return (
        <div 
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
    return <Editor ref={ref} {...props} />;
  }
);

CKEditorSSR.displayName = 'CKEditorSSR';

export default CKEditorSSR;
