// utils/checkImports.js
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const projectRoot = process.argv[2] || '.';
const fileExtensions = ['.js', '.mjs', '.cjs'];

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (fileExtensions.includes(path.extname(fullPath))) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function extractImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = /import\s+(?:[^'";]+\s+from\s+)?["']([^"']+)["']/g;
  const imports = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    imports.push({ source: match[1], filePath });
  }
  return imports;
}

function resolvePath(importPath, baseDir) {
  if (importPath.startsWith('.') || importPath.startsWith('/')) {
    for (const ext of fileExtensions) {
      const fullPath = path.resolve(path.dirname(baseDir), `${importPath}${ext}`);
      if (fs.existsSync(fullPath)) return null;
    }
    return importPath; // not found
  }
  return null; // skip node_modules
}

function checkAllImports(rootDir) {
  const allFiles = getAllFiles(rootDir);
  const missingImports = [];

  allFiles.forEach((file) => {
    const imports = extractImports(file);
    imports.forEach(({ source, filePath }) => {
      const unresolved = resolvePath(source, filePath);
      if (unresolved) {
        missingImports.push({ filePath, importPath: source });
      }
    });
  });

  return missingImports;
}

const results = checkAllImports(projectRoot);

if (results.length === 0) {
  console.log('✅ Todas as importações estão corretas');
} else {
  console.log('❌ Importações ausentes:');
  results.forEach(({ filePath, importPath }) => {
    console.log(`- ${filePath} → ${importPath}`);
  });
  process.exit(1);
}
