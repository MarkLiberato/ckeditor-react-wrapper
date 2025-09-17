import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export interface CKEditorProps {
  /**
   * The CKEditor configuration object
   */
  config?: EditorConfig;
  
  /**
   * Initial data to be loaded into the editor
   */
  data?: string;
  
  /**
   * Callback fired when the editor is ready
   */
  onReady?: (editor: ClassicEditor) => void;
  
  /**
   * Callback fired when the editor data changes
   */
  onChange?: (event: any, editor: ClassicEditor) => void;
  
  /**
   * Callback fired when the editor is destroyed
   */
  onDestroy?: () => void;
  
  /**
   * Callback fired when an error occurs
   */
  onError?: (error: Error, { willEditorRestart }: { willEditorRestart: boolean }) => void;
  
  /**
   * Whether the editor is disabled
   */
  disabled?: boolean;
  
  /**
   * Custom CSS class name for the editor container
   */
  className?: string;
  
  /**
   * Custom styles for the editor container
   */
  style?: React.CSSProperties;
  
  /**
   * The editor instance to use (for advanced use cases)
   */
  editor?: typeof ClassicEditor;
  
  /**
   * Whether to watch for changes in the data prop
   */
  watchData?: boolean;
}

export interface EditorConfig {
  [key: string]: any;
}

export interface CKEditorRef {
  editor: ClassicEditor | null;
  getData: () => string;
  setData: (data: string) => void;
  destroy: () => void;
}
