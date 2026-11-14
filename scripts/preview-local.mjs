// Use the same reproducible compiler pipeline for local preview and production.
// Install dependencies with npm ci first; no pre-existing dist chunks are required.
import {spawnSync} from 'node:child_process';
const result=spawnSync('npm',['run','build'],{stdio:'inherit'});
if(result.error)console.error(result.error.message);
process.exitCode=result.status??1;
