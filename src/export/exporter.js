import {signatureSvg} from '../credits/credits.js';
import {ethernetSvg} from '../wiring/ethernet.js';
import {defs,wireSvg,controlSvg,tableSvg} from '../wiring/render.js';
import {simulate} from '../simulation/engine.js';
import {download} from '../storage/projects.js';
let baseData;
async function imageData(){if(window.PANEL_IMAGE)return window.PANEL_IMAGE;if(baseData)return baseData;const blob=await(await fetch('panel.png')).blob();baseData=await new Promise(r=>{let f=new FileReader;f.onload=()=>r(f.result);f.readAsDataURL(blob)});return baseData;}
export async function exportDiagram(project,kit,{format='svg',scale=2,preset='table'}={}){
 const printWindow=format==='pdf'?window.open('','_blank'):null;if(format==='pdf'&&!printWindow)throw Error('Allow pop-ups to print this diagram.');
 const base=await imageData(),sim=simulate(project,kit),p=JSON.parse(JSON.stringify(project));p.table.show=preset==='table';const labels=!['no-labels','clean'].includes(preset);let height=1086;if(p.table.show)height=Math.max(height,p.table.y+(p.wires.length+(p.ethernet&&!p.ethernet.hidden?1:0)+2)*(p.table.fontSize+14)+20);
 if(p.ethernet&&!p.ethernet.hidden)height=Math.max(height,p.ethernet.endpoint.y+112);height+=82;
 let text=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1448" height="${height}" viewBox="0 0 1448 ${height}">${defs()}<rect width="1448" height="${height}" fill="white"/><image href="${base}" width="1448" height="1086"/>${p.wires.map(w=>wireSvg(w,kit,false,false,labels,false)).join('')}${preset==='snapshot'?kit.controls.map(c=>controlSvg(c,p.states,sim,false)).join(''):''}${tableSvg(p,kit,false)}${ethernetSvg(p,kit,false,false,false,labels)}${signatureSvg(height-43)}</svg>`;
 // Embed the authoritative image in any cropped control overlays too.
 text=text.replaceAll('href="panel.png"',`href="${base}"`);
 const name=p.title.replace(/[^a-z0-9_-]+/gi,'_');if(format==='svg'){download(`${name}.svg`,text,'image/svg+xml');return;}
 const url=URL.createObjectURL(new Blob([text],{type:'image/svg+xml'})),img=new Image();try{await new Promise((r,j)=>{img.onload=r;img.onerror=()=>j(Error('Could not render diagram.'));img.src=url});const canvas=document.createElement('canvas');canvas.width=1448*scale;canvas.height=height*scale;canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);const blob=await new Promise(r=>canvas.toBlob(r,'image/png'));if(format==='png')download(`${name}_${scale}x.png`,blob);else{const frame=printWindow;const imageURL=URL.createObjectURL(blob);frame.document.write(`<html><title>${name}</title><style>@page{size:landscape;margin:8mm}body{margin:0}img{width:100%;height:auto}</style><img src="${imageURL}" onload="setTimeout(()=>print(),150)"></html>`);frame.document.close();}}finally{URL.revokeObjectURL(url)}
}
