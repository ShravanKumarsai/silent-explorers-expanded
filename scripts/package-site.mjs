import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import {spawnSync} from 'node:child_process';
const hosting=JSON.parse(fs.readFileSync('.openai/hosting.json','utf8'));if(hosting.static?.directory!=='dist')throw Error('Expected independent static dist deployment');
const archive=path.resolve(process.argv[2]||path.join(os.tmpdir(),'silent-explorers-deploy.tar.gz'));
const result=spawnSync('tar',['--exclude=dist/.openai','-czf',archive,'.openai/hosting.json','dist'],{stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);console.log(JSON.stringify({archive,project_id:hosting.project_id,excluded:'Original inert dist/.openai hosting identity; source remains unchanged.'}));
