const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 Setting up CKEditor React Wrapper...');

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build the package
  console.log('🔨 Building package...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Setup completed successfully!');
  console.log('');
  console.log('Available commands:');
  console.log('- npm run dev: Start development build');
  console.log('- npm run build: Build the package');
  console.log('- npm run lint: Run linter');
  console.log('- npm run build:package: Build and prepare for publishing');
  console.log('');
  console.log('To test the example:');
  console.log('1. cd example');
  console.log('2. npm install');
  console.log('3. npm start');
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}
