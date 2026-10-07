import {curvePath} from '../routing/router.js';
export const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const E=escapeHtml;
export function defs(){return `<defs>
<filter id="leadShadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="1" dy="4" stdDeviation="2" flood-opacity=".38"/></filter>
<filter id="glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="5"/></filter>
<linearGradient id="plugLight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="white" stop-opacity=".72"/><stop offset=".28" stop-color="white" stop-opacity=".15"/><stop offset=".6" stop-color="black" stop-opacity="0"/><stop offset="1" stop-color="black" stop-opacity=".5"/></linearGradient>
<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#30363b"/><stop offset=".3" stop-color="#f5fafc"/><stop offset=".54" stop-color="#707980"/><stop offset=".76" stop-color="#e9edf0"/><stop offset="1" stop-color="#262e36"/></linearGradient>
<radialGradient id="ledOff"><stop stop-color="#123b2b"/><stop offset=".8" stop-color="#07512c"/><stop offset="1" stop-color="#07201a"/></radialGradient>
<radialGradient id="ledOn"><stop stop-color="#c2ffd6"/><stop offset=".3" stop-color="#40ff8c"/><stop offset="1" stop-color="#00a33f"/></radialGradient>
</defs>`}
export function plug(x,y,angle,color,attrs=''){return `<g ${attrs} transform="translate(${x} ${y}) rotate(${angle})" filter="url(#leadShadow)">
<path d="M -6 -6 L 9 -7 L 12 7 L -6 6 Z" fill="url(#metal)" stroke="#283039" stroke-width="1"/>
<path d="M 0 -12 Q -8 -12 -8 0 Q -8 12 0 12 L 27 10 Q 35 10 35 6 L 35 -6 Q 35 -10 27 -10 Z" fill="${color}" stroke="#14212b" stroke-opacity=".7" stroke-width="1.5"/>
<path d="M 0 -12 Q -8 -12 -8 0 Q -8 12 0 12 L 27 10 Q 35 10 35 6 L 35 -6 Q 35 -10 27 -10 Z" fill="url(#plugLight)"/>
<path d="M 29 -7 L 43 -5 Q 48 -5 48 0 Q 48 5 43 5 L 29 7 Z" fill="${color}" stroke="#203038" stroke-opacity=".6"/>
<path d="M 29 -7 L 43 -5 Q 48 -5 48 0 Q 48 5 43 5 L 29 7 Z" fill="url(#plugLight)"/>
<path d="M 32 -6 L 32 6 M 36 -5 L 36 5 M 40 -5 L 40 5" stroke="#000" stroke-opacity=".26"/>
<ellipse cx="1" cy="0" rx="4" ry="5" fill="#29353d" stroke="#d5e3e9" stroke-width="1.4"/>
<path d="M 4 -9 L 24 -8" fill="none" stroke="white" stroke-opacity=".8" stroke-width="1.4"/>
</g>`}
export function wireSvg(w,kit,selected=false,editing=false,labels=true,interactive=true){
 if(w.hidden)return '';
 const a=kit.sockets.find(s=>s.id===w.from),b=kit.sockets.find(s=>s.id===w.to);if(!a||!b)return '';
 const points=[{x:a.x,y:a.y},...(w.waypoints||[]).slice(1,-1),{x:b.x,y:b.y}],d=curvePath(points);if(!d)return '';
 const p=points[1],q=points.at(-2),angleA=Math.atan2(p.y-a.y,p.x-a.x)*180/Math.PI,angleB=Math.atan2(q.y-b.y,q.x-b.x)*180/Math.PI;
 const attr=interactive?`data-wire="${E(w.id)}"`:'';
 let mid=points[Math.floor(points.length/2)];if(points.length===2)mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2};
 return `<g ${attr} class="wire" ${w.locked?'data-locked="true"':''}>
${selected?`<path d="${d}" fill="none" stroke="#ffcf49" stroke-opacity=".6" stroke-width="18"/>`:''}
<path d="${d}" fill="none" stroke="#111a21" stroke-opacity=".4" stroke-width="12" transform="translate(1 4)" filter="url(#leadShadow)"/>
<path d="${d}" fill="none" stroke="#142332" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>
<path d="${d}" fill="none" stroke="${w.color}" stroke-width="7.5" stroke-linecap="round"/>
<path d="${d}" fill="none" stroke="white" stroke-opacity=".58" stroke-width="1.8" transform="translate(0 -1.8)" stroke-linecap="round"/>
${interactive?`<path ${attr} d="${d}" fill="none" stroke="transparent" stroke-width="23" class="wire-hit"/>`:''}
${plug(a.x,a.y,angleA,w.color,interactive?`data-endpoint="from" ${attr}`:'')}${plug(b.x,b.y,angleB,w.color,interactive?`data-endpoint="to" ${attr}`:'')}
${labels?`<g transform="translate(${mid.x} ${mid.y})" ${attr}><rect x="${-Math.max(52,(w.label||w.id).length*10+16)/2}" y="-14" width="${Math.max(52,(w.label||w.id).length*10+16)}" height="28" rx="5" fill="#fffffb" stroke="#2f3941" stroke-width="1.5"/><text x="0" y="6" font-family="Arial,sans-serif" font-size="19" font-weight="700" fill="#151b20" text-anchor="middle">${E(w.label||w.id)}</text></g>`:''}
${editing&&!w.locked?points.slice(1,-1).map((p,i)=>`<circle data-waypoint="${i+1}" ${attr} cx="${p.x}" cy="${p.y}" r="8" fill="#fff2b3" stroke="#925d00" stroke-width="2"/>`).join(''):''}
</g>`;
}
export function controlSvg(c,states,sim,interactive=true,mode='design'){
 const v=states[c.id]||0,attr=interactive?`data-control="${c.id}" role="button" tabindex="0" aria-label="${E(c.label)}"`:'',title=`<title>${E(c.label)} · ${E(c.type)} · ${v}</title>`;
 let art='';
 if(['momentary','emergency'].includes(c.type)){
  art=`<circle cx="${c.x}" cy="${c.y}" r="${c.radius}" fill="${c.color}" opacity="${v?.22:0}"/>`;
  if(v)art+=`<clipPath id="crop-${c.id}"><circle cx="${c.x}" cy="${c.y}" r="${c.radius-2}"/></clipPath><circle cx="${c.x}" cy="${c.y}" r="${c.radius}" fill="#14191b"/><g transform="translate(0 5)"><image href="${window.PANEL_IMAGE||'panel.png'}" width="1448" height="1086" clip-path="url(#crop-${c.id})"/><circle cx="${c.x}" cy="${c.y}" r="${c.radius-2}" fill="black" opacity=".12"/></g>`;
 }else if(c.type==='potentiometer'){
  const angle=-135+v*2.7;art=`<clipPath id="crop-${c.id}"><circle cx="${c.x}" cy="${c.y}" r="${c.radius-3}"/></clipPath><g transform="rotate(${angle} ${c.x} ${c.y})"><image href="${window.PANEL_IMAGE||'panel.png'}" width="1448" height="1086" clip-path="url(#crop-${c.id})"/></g>`;
 }else if(['toggle','selector'].includes(c.type)){
  const angle=c.type==='selector'?(v?38:-38):0;const y=v?-10:8;
  art=`<g transform="translate(${c.x} ${c.y}) rotate(${angle})"><circle r="${c.radius-1}" fill="url(#metal)" stroke="#23292c" stroke-width="2"/><circle r="${c.radius*.64}" fill="#171b1d" stroke="#f2f4f3" stroke-width="1.8"/>${c.type==='selector'?`<rect x="-5" y="-${c.radius}" width="10" height="${c.radius+7}" rx="3" fill="#252a2d" stroke="#a4aeb5" stroke-width="1.5"/>`:`<path d="M -4 5 L -4 ${y-15} Q 0 ${y-20} 4 ${y-15} L 5 5 Z" fill="url(#metal)" stroke="#353b40" stroke-width="1.3"/>`}</g>`;
 }else if(c.type==='led'){
  const id=c.relatedSocket,on=(sim.signals[id]||0)>0;art=`${on?`<circle cx="${c.x}" cy="${c.y}" r="${c.radius+3}" fill="#24f475" opacity=".45" filter="url(#glow)"/>`:''}<circle cx="${c.x}" cy="${c.y}" r="${c.radius-3}" fill="url(#${on?'ledOn':'ledOff'})" stroke="#081c10" stroke-width="1.5"/><ellipse cx="${c.x-4}" cy="${c.y-8}" rx="8" ry="3" fill="white" opacity="${on?.38:.12}"/>`;
 }else if(c.type==='display')art=`<rect x="${c.x-49}" y="${c.y-24}" width="99" height="46" rx="2" fill="#171d20"/><text x="${c.x+39}" y="${c.y+13}" text-anchor="end" font-family="monospace" font-size="34" fill="${sim.powered?'#ff383c':'#632326'}">${sim.display.toFixed(1)}</text>`;
 else if(c.type==='sensor')art=`<circle cx="${c.x}" cy="${c.y}" r="7" fill="${v?'#ffc736':'#606a72'}" stroke="#12171c" stroke-width="1.5"/>`;
 else if(c.type==='buzzer'&&sim.outputs[5])art=`<circle cx="${c.x}" cy="${c.y}" r="43" fill="none" stroke="#ffb52f" stroke-width="4" stroke-dasharray="8 5"/>`;
 return `<g ${attr} class="control ${v?'active':''}">${title}${art}${interactive?`<circle cx="${c.x}" cy="${c.y}" r="${c.radius}" fill="transparent" class="control-hit"/>`:''}</g>`;
}
export function tableSvg(project,kit,interactive=true){
 const t=project.table;if(!t.show)return '';const connections=project.wires.filter(w=>!w.hidden);if(project.ethernet&&!project.ethernet.hidden)connections.push({...project.ethernet,from:'TIA_PROFINET',to:project.ethernet.deviceLabel||'Programming PC',function:'PROFINET programming (diagram)'});const f=t.fontSize||16,columns=t.columns||['Wire','From','To','Color'],width=t.width||610,row=f+14,height=(connections.length+2)*row;
 const lookup=Object.fromEntries(kit.sockets.map(s=>[s.id,s.label])),bg=t.style==='dark'?'#18232f':'#fffef8',fg=t.style==='dark'?'#edf2f7':'#1d2730';let x=t.x||38,y=t.y||1008;let head=`<g ${interactive?'data-table="true"':''} transform="translate(${x} ${y})"><rect width="${width}" height="${height}" rx="8" fill="${bg}" stroke="#83919e" stroke-width="1"/><text x="15" y="${f+9}" fill="${fg}" font-family="Arial" font-size="${f+2}" font-weight="bold">${E(t.title||'Connection table')}</text>`;
 const colWidth=(width-24)/columns.length;
 columns.forEach((c,i)=>head+=`<text x="${12+i*colWidth}" y="${2*row-8}" font-size="${f}" fill="${fg}" font-family="Arial" font-weight="bold">${E(c)}</text>`);
 connections.forEach((w,j)=>columns.forEach((c,i)=>{const value={Wire:w.label||w.id,From:t.useIds?w.from:(lookup[w.from]||w.from),To:t.useIds?w.to:(lookup[w.to]||w.to),Color:w.color,Function:w.function||'',Notes:w.notes||''}[c];head+=`<text x="${12+i*colWidth}" y="${(j+3)*row-8}" font-size="${f}" fill="${c==='Color'?w.color:fg}" font-family="Arial">${E(String(value||'').slice(0,Math.floor(colWidth/(f*.55))))}</text>`;}));
 if(interactive)head+=`<rect data-table-resize="true" x="${width-10}" y="${height-10}" width="15" height="15" fill="#ffcb45"/>`;
 return head+'</g>';
}
