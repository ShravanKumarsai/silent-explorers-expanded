import fs from 'node:fs';import path from 'node:path';
// Retain the source experience in its own document; its scripts/styles keep their original scope.
for(const row of fs.readFileSync('docs/ORIGINAL_FILE_MANIFEST.txt','utf8').trim().split('\n')){const file=row.split('\t')[1];if(!file.startsWith('dist/')||file==='dist/index.html'||file.includes('/.openai/'))continue;const dest='dist/heritage/'+file.slice(5);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(file,dest);}
fs.writeFileSync('dist/heritage/index.html',fs.readFileSync('heritage-src/index.html','utf8').replace('</body>','<script src="/heritage-bridge.js" defer></script>\n</body>'));
fs.copyFileSync('heritage-src/bridge.js','dist/heritage-bridge.js');
fs.copyFileSync('dist/explore/index.html','dist/index.html');
console.log('Unified root entry built; original animations retained in opening chapter.');
