declare module '@ckeditor/ckeditor5-build-classic' {
  class ClassicEditor {
    static create(element: HTMLElement, config?: any): Promise<ClassicEditor>;
    getData(): string;
    setData(data: string): void;
    destroy(): void;
    enableReadOnlyMode(id: string): void;
    disableReadOnlyMode(id: string): void;
    model: {
      document: {
        on(event: string, callback: (event: any) => void): void;
      };
    };
  }
  export default ClassicEditor;
}
