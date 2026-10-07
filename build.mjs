import fs from 'node:fs';
import path from 'node:path';
const root=path.dirname(new URL(import.meta.url).pathname);
// Source modules also work as native browser ES modules. Bundle an offline entry with no dependencies.
const modules=['credits/credits.js','kit/kit-definition.ts','experiments/experiments.js','routing/router.js','simulation/engine.js','storage/projects.js','wiring/render.js','wiring/ethernet.js','export/exporter.js','app/main.js'];
let bundle=modules.map(name=>{let code=fs.readFileSync(path.join(root,'src',name),'utf8');code=code.replace(/^import .*?;\s*$/gm,'').replace(/^export /gm,'');return `\n// ${name}\n`+code;}).join('\n');
// Prevent module helper names colliding in a shared offline scope.
bundle=bundle.replace('const E=escapeHtml;','').replace('const E=escapeHtml,$=','const E=escapeHtml,$=');
const css=fs.readFileSync(path.join(root,'src/app/styles.css'),'utf8');
const image=fs.readFileSync(path.join(root,'dist/panel.png')).toString('base64');
const html=(offline=false)=>`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="author" content="Eng. Mahmoud Shreef"><meta name="copyright" content="© 2026 Eng. Mahmoud Shreef. All rights reserved."><meta name="description" content="Interactive SabronPro trainer wiring, control simulation and calibration editor."><title>SabronPro Wiring Studio</title><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23131c26'/%3E%3Cpath d='m3 16 8-8 8 8-8 8z' fill='%23ffcf49'/%3E%3Cpath d='m14 8 6-6 6 6-6 6z' fill='white'/%3E%3C/svg%3E"><style>${css}</style></head><body><!-- SabronPro Wiring Studio · Made with love by Eng. Mahmoud Shreef · © 2026 All rights reserved. --><script>${offline?`window.PANEL_IMAGE='data:image/png;base64,${image}';`:''}\n(()=>{${bundle}\n})();<\/script></body></html>`;
fs.writeFileSync(path.join(root,'dist/index.html'),html());
fs.writeFileSync(path.join(root,'SabronPro-Wiring-Studio.html'),html(true));

fs.copyFileSync(path.join(root,'src/kit/kit-definition.ts'),path.join(root,'src/kit/kit-definition.js'));
console.log('Built hosted and single-file offline applications.');
