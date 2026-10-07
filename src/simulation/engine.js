export function simulate(project,kit){
 const signals={},powered=!!project.states.KIT_ON_SWITCH;
 for(const c of kit.controls){let value=project.states[c.id]||0;if(c.relatedSocket&&['momentary','emergency','toggle'].includes(c.type))signals[c.relatedSocket]=powered?(c.contact==='NC'?1-value:value):0;}
 for(const name of ['PROX','LIMIT','FLOAT','PHOTO']){let v=project.states[`${name}_SENSOR`]||0;signals[`${name}_NO`]=powered?v:0;signals[`${name}_NC`]=powered?1-v:0;signals[`${name}_TERM_NO`]=signals[`${name}_NO`];signals[`${name}_TERM_NC`]=signals[`${name}_NC`];}
 for(const s of kit.sockets){if(s.electricalType==='power24')signals[s.id]=powered?24:0;if(s.electricalType==='power12')signals[s.id]=powered?12:0;if(s.electricalType==='ground')signals[s.id]=0;}
 const analog={AI0:0,AI1:0};
 for(const id of ['AI0','AI1'])if(!project.states[`${id}_SELECTOR`]){analog[id]=powered?(project.states[`${id}_POTENTIOMETER`]||0)/10:0;signals[id]=analog[id];}
 const graph={};for(const w of project.wires){(graph[w.from]??=[]).push(w.to);(graph[w.to]??=[]).push(w.from);}
 const visited=new Set(),conflicts=[];
 for(const s of kit.sockets){if(visited.has(s.id))continue;const stack=[s.id],net=[];while(stack.length){const id=stack.pop();if(visited.has(id))continue;visited.add(id);net.push(id);stack.push(...(graph[id]||[]));}const drivers=net.filter(id=>signals[id]!==undefined),values=drivers.map(id=>signals[id]);let voltage=values.length?Math.max(...values):0;
 if(new Set(values).size>1){conflicts.push(`Conflicting sources: ${drivers.join(', ')}`);voltage=0;}for(const id of net)signals[id]=powered?voltage:0;
 }
 for(const id of ['AI0','AI1'])if(project.states[`${id}_SELECTOR`])analog[id]=Math.min(10,signals[`${id}_B`]||0);
 const inputs=Array.from({length:8},(_,i)=>powered&&signals[`I0_${i}`]>0?1:0),outputs=Array.from({length:6},(_,i)=>powered&&signals[`Q0_${i}`]>0?1:0);
 return {signals,inputs,outputs,analog,powered,conflicts,display:analog[project.states.DISPLAY_SELECTOR?'AI1':'AI0']};
}
export function validate(project,kit){
 const warnings=[],lookup=Object.fromEntries(kit.sockets.map(s=>[s.id,s])),pairs=new Set(),counts={};
 for(const w of project.wires){const a=lookup[w.from],b=lookup[w.to];if(!a||!b){warnings.push(`${w.id}: unknown or disconnected endpoint`);continue;}counts[w.from]=(counts[w.from]||0)+1;counts[w.to]=(counts[w.to]||0)+1;const pair=[w.from,w.to].sort().join(':');if(pairs.has(pair))warnings.push(`${w.id}: duplicate connection`);pairs.add(pair);if(a.type!==b.type)warnings.push(`${w.id}: banana-to-screw connection needs a suitable lead`);if(a.electricalVerified===false||b.electricalVerified===false||a.electricalType==='unknown'||b.electricalType==='unknown')warnings.push(`${w.id}: verify terminal function against the physical kit`);if(a.electricalType==='digital_output'&&b.electricalType==='digital_output')warnings.push(`${w.id}: output-to-output connection`);}
 // Check entire connected nets, including a short made through multiple patch leads.
 const adj={};for(const w of project.wires){(adj[w.from]??=[]).push(w.to);(adj[w.to]??=[]).push(w.from)}const seen=new Set();for(const id of Object.keys(adj)){if(seen.has(id))continue;const todo=[id],net=[];while(todo.length){let k=todo.pop();if(seen.has(k))continue;seen.add(k);net.push(k);todo.push(...(adj[k]||[]))}const types=new Set(net.map(k=>lookup[k]?.electricalType));if(types.has('ground')&&(types.has('power24')||types.has('power12')))warnings.push(`Supply short: ${net.join(' ↔ ')}`);if(types.has('power24')&&types.has('power12'))warnings.push('24V and 12V supplies joined');if((types.has('power24')||types.has('power12'))&&types.has('analog'))warnings.push('Supply voltage exceeds the 0–10V analog range');}
 for(const [id,n]of Object.entries(counts))if(n>(lookup[id]?.maxPlugs||1))warnings.push(`${lookup[id]?.label||id}: ${n} leads exceed socket capacity`);
 return warnings;
}
