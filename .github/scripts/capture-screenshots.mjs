import {chromium} from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs/promises';

await fs.mkdir('docs/screenshots',{recursive:true});
const browser=await chromium.launch({headless:true});
try{
  const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});

  if(!(await fileExists('docs/screenshots/credits.png'))){
    await page.click('[data-action="credits"]');
    const dialog=page.locator('dialog[open]');
    await dialog.screenshot({path:'docs/screenshots/credits.png'});
    await page.keyboard.press('Escape');
  }

  if(!(await fileExists('docs/screenshots/p01-ethernet-export.webp'))){
    await page.evaluate(()=>window.SabronPro.addEthernet());
    const downloadPromise=page.waitForEvent('download');
    await page.evaluate(()=>window.SabronPro.exportDiagram({format:'png',scale:1,preset:'table'}));
    const download=await downloadPromise;
    const png='/tmp/p01-ethernet-export.png';
    await download.saveAs(png);
    await sharp(png).webp({quality:92}).toFile('docs/screenshots/p01-ethernet-export.webp');
  }
} finally {
  await browser.close();
}
async function fileExists(path){try{await fs.access(path);return true}catch{return false}}
