// Go Get Hire - Deployment Validation Script
// Run this to check if your deployment is ready

const fs = require('fs');
const path = require('path');

console.log('🔍 Go Get Hire - Deployment Validation\n');

// Check required files
const requiredFiles = [
    'package.json',
    'next.config.js',
    'server.js',
    '.htaccess',
    'app/layout.tsx',
    'app/page.tsx',
    'components/Header.tsx',
    'components/Footer.tsx',
    'utils/dummyData.ts'
];

console.log('📂 Checking required files:');
let allFilesPresent = true;

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        allFilesPresent = false;
    }
});

// Check package.json content
console.log('\n📦 Checking package.json:');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check scripts
    if (packageJson.scripts && packageJson.scripts.build) {
        console.log('✅ Build script found');
    } else {
        console.log('❌ Build script missing');
        allFilesPresent = false;
    }
    
    if (packageJson.scripts && packageJson.scripts.start) {
        console.log('✅ Start script found');
    } else {
        console.log('❌ Start script missing');
        allFilesPresent = false;
    }
    
    // Check dependencies
    const requiredDeps = ['next', 'react', 'react-dom'];
    requiredDeps.forEach(dep => {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
            console.log(`✅ ${dep} dependency found`);
        } else {
            console.log(`❌ ${dep} dependency missing`);
            allFilesPresent = false;
        }
    });
    
} catch (error) {
    console.log('❌ Error reading package.json:', error.message);
    allFilesPresent = false;
}

// Check folder structure
console.log('\n📁 Checking folder structure:');
const requiredFolders = ['app', 'components', 'types', 'utils'];

requiredFolders.forEach(folder => {
    if (fs.existsSync(folder) && fs.statSync(folder).isDirectory()) {
        console.log(`✅ ${folder}/ directory`);
    } else {
        console.log(`❌ ${folder}/ directory missing`);
        allFilesPresent = false;
    }
});

// Check environment
console.log('\n🌍 Environment check:');
console.log(`Node.js version: ${process.version}`);
console.log(`Platform: ${process.platform}`);
console.log(`Architecture: ${process.arch}`);

// Final assessment
console.log('\n' + '='.repeat(50));
if (allFilesPresent) {
    console.log('🎉 DEPLOYMENT READY!');
    console.log('\nNext steps:');
    console.log('1. Enable Node.js in Hostinger control panel');
    console.log('2. Run: npm install --production');
    console.log('3. Run: npm run build');
    console.log('4. Run: node server.js');
    console.log('\n🚀 Your Go Get Hire platform will be live!');
} else {
    console.log('❌ DEPLOYMENT NOT READY');
    console.log('\nPlease fix the missing files/folders above before deploying.');
    console.log('Refer to the deployment guide for help.');
}

console.log('\n📊 Platform Statistics:');
console.log('• 43 cities across Gulf region');
console.log('• 49 job categories');
console.log('• 2,107 total pages (43 × 49)');
console.log('• 15,000+ worker profiles');
console.log('• Mobile responsive design');
console.log('• SEO optimized');
