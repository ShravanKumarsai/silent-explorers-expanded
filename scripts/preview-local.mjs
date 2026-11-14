// Build a dependency-free local preview using the already-vendored 3D renderer.
// The normal npm build remains the production build path.
import fs from 'node:fs';
import path from 'node:path';
const root='dist/explore',runtime=root+'/runtime';fs.mkdirSync(runtime,{recursive:true});
for(const name of fs.readdirSync('explore-src')){
 if(!name.endsWith('.js')||name==='museum.js')continue;
 let text=fs.readFileSync('explore-src/'+name,'utf8');
 text=text.replace(/^import '\.\/(?:style|vivid)\.css';\r?\n/gm,'');
 if(name==='content.js')text=text.replace("import research from './research.json';",'const research='+fs.readFileSync('explore-src/research.json','utf8')+';');
 fs.writeFileSync(runtime+'/'+name,text);
}
const assets=fs.readdirSync(root+'/assets');const museum=assets.find(n=>/^museum-.*\.js$/.test(n));if(!museum)throw Error('Vendored museum bundle not found');
let museumText=fs.readFileSync(root+'/assets/'+museum,'utf8');
// The bundle imports only the obstacle list from the previous app bundle.
museumText=museumText.replace(/import\{R as (\w+)\}from"\.\/index-[^"]+\.js";/,'import {ROCKS as $1} from "../runtime/simulation.js";');
if(/^import.*index-/.test(museumText))throw Error('Unexpected museum bundle dependency');
fs.writeFileSync(root+'/assets/'+museum,museumText);
fs.writeFileSync(runtime+'/museum.js',`export {mountMuseum,mountSurface} from '../assets/${museum}';\n`);
fs.copyFileSync('explore-src/style.css',root+'/activity-base.css');fs.copyFileSync('explore-src/vivid.css',root+'/vivid.css');
let html=fs.readFileSync('explore-src/index.html','utf8').replace('src="/main.js"','src="/explore/runtime/main.js"').replace('</head>','<link rel="stylesheet" href="/explore/activity-base.css"><link rel="stylesheet" href="/explore/vivid.css"></head>');
fs.writeFileSync(root+'/index.html',html);fs.writeFileSync('dist/index.html',html);
console.log('Local module preview built.');
