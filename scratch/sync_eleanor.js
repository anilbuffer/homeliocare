const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      if (dirPath.endsWith('.ts') || dirPath.endsWith('.tsx')) {
        callback(dirPath);
      }
    }
  });
}

walkDir('src', (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace Eleanor Rigby -> Eleanor Ruth Whitfield
  content = content.replace(/Eleanor Rigby/g, 'Eleanor Ruth Whitfield');
  
  // Replace Eleanor Vance -> Eleanor Ruth Whitfield
  content = content.replace(/Eleanor Vance/g, 'Eleanor Ruth Whitfield');

  // Replace Eleanor V. -> Eleanor W.
  content = content.replace(/Eleanor V\./g, 'Eleanor W.');

  // Replace Eleanor Whitfield (if not preceded by Ruth ) -> Eleanor Ruth Whitfield
  content = content.replace(/(?<!Ruth\s)Eleanor Whitfield/g, 'Eleanor Ruth Whitfield');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});
