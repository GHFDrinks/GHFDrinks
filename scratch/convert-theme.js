const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, '../src/app/(main)'),
  path.join(__dirname, '../src/components')
];

const replacements = [
  { from: /bg-white\b/g, to: 'bg-[var(--background)]' },
  { from: /text-gray-700\b/g, to: 'text-[var(--foreground)]/80' },
  { from: /text-gray-600\b/g, to: 'text-[var(--foreground)]/80' },
  { from: /text-gray-400\b/g, to: 'text-[var(--muted-foreground)]' },
  { from: /border-gray-200\b/g, to: 'border-[var(--border)]' },
  { from: /border-gray-100\b/g, to: 'border-[var(--border)]' },
  { from: /border-gray-50\b/g, to: 'border-[var(--border)]' },
  { from: /hover:bg-gray-50\b/g, to: 'hover:bg-[var(--card)]' },
  { from: /hover:border-gray-400\b/g, to: 'hover:border-[var(--gold)]' }
];

function processFile(filePath) {
  const ext = path.extname(filePath);
  if (!['.ts', '.tsx', '.js', '.jsx', '.css'].includes(ext)) {
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  for (const { from, to } of replacements) {
    if (from.test(content)) {
      content = content.replace(from, to);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(path.join(__dirname, '..'), filePath)}`);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

dirs.forEach(dir => {
  console.log(`Scanning directory: ${dir}`);
  walk(dir);
});
console.log('Theme conversion done.');
