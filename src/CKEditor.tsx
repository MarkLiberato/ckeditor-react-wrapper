import React, { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorProps, CKEditorRef } from './types';

const CKEditor = forwardRef<CKEditorRef, CKEditorProps>(
  (
    {
      config = {},
      data = '',
      onReady,
      onChange,
      onDestroy,
      onError,
      disabled = false,
      className,
      style,
      editor: EditorClass = ClassicEditor,
      watchData = true,
    },
    ref
  ) => {
    const editorRef = useRef<ClassicEditor | null>(null);
    const domElementRef = useRef<HTMLDivElement>(null);
    const isInitializing = useRef(false);
    const isDestroyed = useRef(false);

    const initializeEditor = useCallback(async () => {
      if (!domElementRef.current || editorRef.current || isInitializing.current) {
        return;
      }

      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        console.warn('CKEditor: window is not defined. Make sure to use this component only in browser environment or use dynamic imports for SSR.');
        return;
      }

      isInitializing.current = true;

      try {
        const editor = await EditorClass.create(domElementRef.current, {
          licenseKey: 'GPL',
          ...config,
          initialData: data,
        });

        if (isDestroyed.current) {
          editor.destroy();
          return;
        }

        editorRef.current = editor;

        // Set up event listeners
        if (onChange) {
          editor.model.document.on('change:data', (event: any) => {
            onChange(event, editor);
          });
        }

        if (onReady) {
          onReady(editor);
        }

        // Handle disabled state
        if (disabled) {
          editor.enableReadOnlyMode('ckeditor-react-wrapper');
        } else {
          editor.disableReadOnlyMode('ckeditor-react-wrapper');
        }
      } catch (error) {
        console.error('Failed to initialize CKEditor:', error);
        if (onError) {
          onError(error as Error, { willEditorRestart: false });
        }
      } finally {
        isInitializing.current = false;
      }
    }, [EditorClass, config, data, onChange, onReady, onError, disabled]);

    const destroyEditor = useCallback(() => {
      if (editorRef.current && !isDestroyed.current) {
        isDestroyed.current = true;
        editorRef.current.destroy();
        editorRef.current = null;
        if (onDestroy) {
          onDestroy();
        }
      }
    }, [onDestroy]);

    // Initialize editor on mount
    useEffect(() => {
      initializeEditor();

      return () => {
        destroyEditor();
      };
    }, [initializeEditor, destroyEditor]);

    // Handle disabled state changes
    useEffect(() => {
      if (editorRef.current) {
        if (disabled) {
          editorRef.current.enableReadOnlyMode('ckeditor-react-wrapper');
        } else {
          editorRef.current.disableReadOnlyMode('ckeditor-react-wrapper');
        }
      }
    }, [disabled]);

    // Handle data changes
    useEffect(() => {
      if (editorRef.current && watchData && data !== editorRef.current.getData()) {
        editorRef.current.setData(data);
      }
    }, [data, watchData]);

    // Handle config changes (reinitialize editor)
    useEffect(() => {
      if (editorRef.current) {
        destroyEditor();
        isDestroyed.current = false;
        initializeEditor();
      }
    }, [config, EditorClass]);

    // Expose editor methods through ref
    useImperativeHandle(ref, () => ({
      editor: editorRef.current,
      getData: () => editorRef.current?.getData() || '',
      setData: (newData: string) => {
        if (editorRef.current) {
          editorRef.current.setData(newData);
        }
      },
      destroy: destroyEditor,
    }));

    return (
      <div
        ref={domElementRef}
        className={className}
        style={style}
      />
    );
  }
);

CKEditor.displayName = 'CKEditor';

export default CKEditor;
