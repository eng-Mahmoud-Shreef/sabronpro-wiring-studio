/** Authoritative geometry, in original 1448 × 1086 image pixels.
 * Local calibration overrides are merged by ID, never applied to the image.
 * Unknown terminal electronics are marked unknown rather than inferred. */
export const KIT = {id:'sabronpro-s7-1200',width:1448,height:1086,version:1};
export const sockets = [];
const socket = (id,label,group,x,y,electricalType='signal',extra={}) => sockets.push({id,label,group,x,y,type:'banana_socket',radius:17,electricalType,maxPlugs:1,...extra});
for(let i=0;i<8;i++) socket(`I0_${i}`,`I0.${i}`,'Digital inputs',157,273+i*55.5,'digital_input');
for(let i=0;i<6;i++) socket(`Q0_${i}`,`Q0.${i}`,'Digital outputs',1287,273+i*55.5,'digital_output');
[395,450,505,560,616,672].forEach((x,i)=>socket(`24V_BUS_${i+1}`,`+24V · ${i+1}`,'Power distribution',x,181,'power24'));
[773,827,881,937,991,1045].forEach((x,i)=>socket(`0V_BUS_${i+1}`,`0V · ${i+1}`,'Power distribution',x,181,'ground'));
[['AI0',410,315],['AI0_B',480,315],['AI1',967,315],['AI1_B',1035,315]].forEach(([id,x,y])=>socket(id,id.replace('_',' '),'Analog',x,y,'analog',{electricalVerified:false}));
[['TP1_24V','TP1 · +24V',395,'power24'],['TP2_0V','TP2 · 0V',450,'ground'],['TP3_AI0','TP3 · AI0',505,'analog'],['TP4_AI1','TP4 · AI1',562,'analog'],['TP5_SWP','TP5 · SW.P',619,'signal'],['TP6_OPP','TP6 · O/P.P',677,'signal'],['TP7_IPG','TP7 · I/P.G',735,'ground']].forEach(([id,l,x,t])=>socket(id,l,'Test points',x,650,t));
[638,682].forEach((y,i)=>{socket(`12V_PLUS_${i+1}`,`+12V · ${i+1}`,'12V source',998,y,'power12');socket(`12V_0V_${i+1}`,`12V 0V · ${i+1}`,'12V source',1054,y,'ground');});
[['PROX_NO',87,790],['PROX_NC',131,790],['LIMIT_NO',191,826],['LIMIT_NC',240,826],['FLOAT_NO',313,826],['FLOAT_NC',358,826],['PHOTO_NO',422,790],['PHOTO_NC',469,790]].forEach(([id,x,y])=>socket(id,id.replace('_',' '),'External sensors',x,y,'digital_control'));
[624,683,741,799].forEach((x,i)=>socket(`SW${i+1}_OUT`,`SW${i+1} output`,'Switches',x,757,'digital_control'));
[['START_NO',889],['STOP_NC',991],['RESET_NO',1093],['PULSE_NO',1199],['EMERGENCY_NC',1317]].forEach(([id,x])=>socket(id,id.replace('_',' '),'Push buttons',x,757,'digital_control'));
// Screw contacts are selectable, separately classified, and never treated as banana sockets.
[['PROX',117,[839,868,897,921]],['PHOTO',437,[839,868,897,921]]].forEach(([p,x,ys])=>ys.forEach((y,i)=>socket(`${p}_TERM_${['24V','0V','NO','NC'][i]}`,`${p} screw ${['24V','0V','NO','NC'][i]}`,'Screw terminals',x,y,['power24','ground','digital_control','digital_control'][i],{type:'screw_terminal',radius:10})));
['INPUT','OUTPUT'].forEach((g,i)=>[375,405,436,478,507,538].slice(0,i?5:6).forEach((y,j)=>socket(`${g}_TERM_${j+1}`,`${g} screw ${j+1}`,'Screw terminals',i?1340:104,y,'unknown',{type:'screw_terminal',radius:10,electricalVerified:false})));
[['LIMIT',197,354],['FLOAT',313,354]].forEach(([p,x])=>[0,1].forEach(i=>socket(`${p}_TERM_${i?'OUT':'COM'}`,`${p} ${i?'OUT':'COM'}`,'Screw terminals',x+i*40,906,'unknown',{type:'screw_terminal',radius:10,electricalVerified:false})));
socket('TIA_PROFINET','TIA Portal / PROFINET RJ45','Programming interface',1338,154,'network',{type:'rj45_socket',radius:23,maxPlugs:1});
export const controls=[];
const control=(id,label,type,x,y,radius,extra={})=>controls.push({id,label,type,x,y,radius,defaultState:0,...extra});
[['START',885,'#008f7a','NO'],['STOP',990,'#cf1838','NC'],['RESET',1093,'#ffd42b','NO'],['PULSE',1196,'#303136','NO'],['EMERGENCY',1317,'#d81432','NC']].forEach(([p,x,color,contact])=>control(`${p}_BUTTON`,p,p==='EMERGENCY'?'emergency':'momentary',x,875,p==='EMERGENCY'?46:35,{color,contact,relatedSocket:`${p}_${contact}`}));
[620,677,737,797].forEach((x,i)=>control(`SW${i+1}`,`SW${i+1}`,'toggle',x,881,19,{relatedSocket:`SW${i+1}_OUT`}));
control('KIT_ON_SWITCH','KIT ON','toggle',1123,158,20,{defaultState:1});
control('AI0_SELECTOR','AI0 selector','selector',445,390,17);
control('AI1_SELECTOR','AI1 selector','selector',1005,390,17);
control('DISPLAY_SELECTOR','Display selection','selector',866,690,17);
control('INPUT_SELECTOR','Input selector','selector',544,879,23);
control('AI0_POTENTIOMETER','AI0 potentiometer','potentiometer',443,466,42,{defaultState:50,relatedSocket:'AI0'});
control('AI1_POTENTIOMETER','AI1 potentiometer','potentiometer',1006,466,42,{defaultState:50,relatedSocket:'AI1'});
['PROX','LIMIT','FLOAT','PHOTO'].forEach((p,i)=>control(`${p}_SENSOR`,`${p} sensor`,'sensor',[117,215,335,446][i],[811,856,856,811][i],10));
for(let i=0;i<8;i++) control(`I0_${i}_LED`,`I0.${i} indicator`,'led',308,273+i*55.5,21,{relatedSocket:`I0_${i}`});
for(let i=0;i<6;i++) control(`Q0_${i}_LED`,`Q0.${i} indicator`,'led',1133,273+i*55.5,21,{relatedSocket:`Q0_${i}`});
control('ANALOG_DISPLAY','Analog display','display',867,623,45);
control('BUZZER','Buzzer · Q0.5','buzzer',1327,646,40,{relatedSocket:'Q0_5'});
export const obstacles=[
 {id:'plc',label:'PLC body',x:575,y:278,w:300,h:257},
 {id:'input_labels',label:'Input labels',x:208,y:253,w:69,h:426},
 {id:'output_labels',label:'Output labels',x:1173,y:249,w:82,h:327},
 {id:'logo',label:'Brand and kit description',x:81,y:88,w:255,h:119},
 {id:'power_title',label:'Power title',x:368,y:107,w:704,h:34},
 {id:'power_labels',label:'Bus labels',x:424,y:140,w:583,h:23},
 {id:'plc_title',label:'Module title',x:545,y:239,w:362,h:34},
 {id:'ai0_title',label:'AI0 title',x:373,y:241,w:152,h:47},
 {id:'ai1_title',label:'AI1 title',x:929,y:239,w:147,h:49},
 {id:'tp_title',label:'Test point title',x:367,y:560,w:399,h:29},
 {id:'test_labels_top',label:'TP labels',x:371,y:600,w:387,h:28},
 {id:'test_labels_bottom',label:'TP function labels',x:372,y:679,w:387,h:26},
 {id:'profinet',label:'Programming interface',x:1169,y:100,w:219,h:83},
 {id:'buzzer_title',label:'Buzzer title',x:1115,y:628,w:133,h:49},
 {id:'buttons_labels',label:'Button labels',x:848,y:798,w:529,h:28},
 {id:'buttons_contacts',label:'Contact labels',x:853,y:924,w:504,h:25},
 {id:'ai0_selector_label',label:'AI0 selector label',x:368,y:344,w:160,h:28},
 {id:'ai1_selector_label',label:'AI1 selector label',x:927,y:344,w:151,h:28},
 {id:'display_title',label:'Analog display title',x:777,y:559,w:176,h:32},
 {id:'digital_input_title',label:'Input heading',x:65,y:217,w:286,h:33},
 {id:'digital_output_title',label:'Output heading',x:1095,y:214,w:289,h:33},
 {id:'switch_labels',label:'Switch captions',x:596,y:792,w:222,h:68},
 {id:'sensor_labels',label:'Sensor interface titles',x:66,y:738,w:430,h:42}
];
export const defaultStates=()=>Object.fromEntries(controls.map(c=>[c.id,c.defaultState]));
export function calibratedKit(calibration={}) {
 const merge=c=>({...c,...calibration[c.id],id:c.id});
 return {sockets:sockets.map(merge),controls:controls.map(merge),obstacles:obstacles.map(merge)};
}
