const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building CKEditor React Wrapper...');

try {
  // Clean dist directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
  }

  // Build the package
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
  console.log('📦 Package is ready for publishing');
  console.log('');
  console.log('To publish to npm:');
  console.log('1. Update version in package.json if needed');
  console.log('2. Run: npm publish');
  console.log('');
  console.log('To test locally:');
  console.log('1. Run: npm pack');
  console.log('2. Install in another project: npm install ./ckeditor-react-wrapper-1.0.0.tgz');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
