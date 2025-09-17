# CKEditor React Wrapper - Setup Guide

## Quick Start

1. **Install dependencies and build:**
   ```bash
   npm install
   npm run build
   ```

2. **Test the example app:**
   ```bash
   cd example
   npm install
   npm start
   ```

## Publishing to NPM

1. **Update package information:**
   - Edit `package.json` to update version, author, repository URLs
   - Update `README.md` with your information

2. **Build and publish:**
   ```bash
   npm run build:package
   npm publish
   ```

## Package Structure

```
ckeditor-react-wrapper/
├── src/                    # Source code
│   ├── CKEditor.tsx       # Main React component
│   ├── types.ts           # TypeScript definitions
│   └── index.ts           # Main export file
├── example/               # Example React app
│   ├── src/
│   │   ├── App.tsx        # Example usage
│   │   └── index.tsx      # App entry point
│   └── package.json       # Example dependencies
├── scripts/               # Build and setup scripts
├── dist/                  # Built package (after build)
├── package.json           # Package configuration
├── tsconfig.json          # TypeScript configuration
├── rollup.config.js       # Build configuration
└── README.md              # Documentation
```

## Key Features

- ✅ **Free and Open Source** - No licensing restrictions
- ✅ **TypeScript Support** - Full type definitions
- ✅ **React Integration** - Easy to use React component
- ✅ **Event Handling** - Ready, change, error callbacks
- ✅ **Ref Support** - Programmatic control
- ✅ **Flexible Config** - All CKEditor 5 options supported
- ✅ **Error Handling** - Built-in error management
- ✅ **Tree Shaking** - Optimized bundle size

## Usage in Your Project

After publishing to npm:

```bash
npm install ckeditor-react-wrapper ckeditor5
```

```tsx
import { CKEditor } from 'ckeditor-react-wrapper';

function MyComponent() {
  return (
    <CKEditor
      data="<p>Hello World!</p>"
      onChange={(event, editor) => {
        console.log(editor.getData());
      }}
      config={{
        toolbar: ['bold', 'italic', 'link']
      }}
    />
  );
}
```

## Development

- `npm run dev` - Start development build with watch mode
- `npm run build` - Build the package
- `npm run lint` - Run ESLint
- `npm run build:package` - Build and prepare for publishing

## License

MIT License - Free to use, modify, and distribute.
