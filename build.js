const fs = require('fs');
const path = require('path');

const root = __dirname;
const appJsPath = path.join(root, 'app.js');
const stylesCssPath = path.join(root, 'styles.css');
const appMinJsPath = path.join(root, 'app.min.js');
const stylesMinCssPath = path.join(root, 'styles.min.css');

const forceRebuild = process.argv.includes('--force');

function isUpToDate(srcPath, destPath) {
    if (!fs.existsSync(destPath)) return false;
    const srcStat = fs.statSync(srcPath);
    const destStat = fs.statSync(destPath);
    return destStat.mtimeMs >= srcStat.mtimeMs;
}

if (!forceRebuild && isUpToDate(appJsPath, appMinJsPath) && isUpToDate(stylesCssPath, stylesMinCssPath)) {
    console.log('Build skipped: app.min.js and styles.min.css are already up to date.');
    process.exit(0);
}

let appJs = fs.readFileSync(appJsPath, 'utf8');
let stylesCss = fs.readFileSync(stylesCssPath, 'utf8');

// Minify CSS - preserve @media queries
let minCss = stylesCss
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*([\{\}\:\;\,])\s*/g, '$1') // Remove spaces around structural characters
    .trim();
// Note: @media queries should be preserved by the above as they don't match the comment or whitespace patterns

// Minify JS safely
let minJs = appJs
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/(?<!:)\/\/[^\r\n]*/g, '') // Remove line comments
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .join('\n');

fs.writeFileSync(appMinJsPath, minJs, 'utf8');
fs.writeFileSync(stylesMinCssPath, minCss, 'utf8');

console.log('Successfully generated app.min.js and styles.min.css');

