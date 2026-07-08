const fs = require('fs');
const path = require('path');
const dir = 'e:\\homeliocare\\src\\components\\billing';

const files = fs.readdirSync(dir);
for (const file of files) {
  if (file.endsWith('.tsx')) {
    const fp = path.join(dir, file);
    let c = fs.readFileSync(fp, 'utf8');
    
    // Fix the broken replacements
    c = c.replace(/toLocaleString\(" en-US\)/g, 'toLocaleString("en-US")');
    c = c.replace(/toLocaleString\(en-US,/g, 'toLocaleString("en-US",');
    
    fs.writeFileSync(fp, c, 'utf8');
  }
}
console.log('Done fixing string replacements.');
