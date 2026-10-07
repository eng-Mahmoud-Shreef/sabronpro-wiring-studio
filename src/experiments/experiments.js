export const experiments=[
{id:'P01',title:'P01 · Start / Stop / Emergency',description:'Patch the three control contacts into PLC inputs. Run the panel and observe I0.0–I0.2. This simulates contacts and connectivity; PLC ladder logic is not included.',wires:[{id:'W1',from:'EMERGENCY_NC',to:'I0_0',color:'#ec2435'},{id:'W2',from:'STOP_NC',to:'I0_1',color:'#0088ed'},{id:'W3',from:'START_NO',to:'I0_2',color:'#08b958'}]},
{id:'SW',title:'Switches · Four digital inputs',description:'Four independent toggle contacts patched into I0.0–I0.3.',wires:Array.from({length:4},(_,i)=>({id:`W${i+1}`,from:`SW${i+1}_OUT`,to:`I0_${i}`,color:['#ec2435','#0088ed','#08b958','#f8c62b'][i]}))},
{id:'AI',title:'Analog · Potentiometer monitoring',description:'Set the analog selectors to A for the internal potentiometers. Rotate each knob; selector B uses its externally wired analog source.',wires:[{id:'W1',from:'AI0',to:'TP3_AI0',color:'#f49a26'},{id:'W2',from:'AI1',to:'TP4_AI1',color:'#945bf2'}]},
{id:'EMPTY',title:'Untitled experiment',description:'Start with the unmodified panel. Click any two banana sockets to create a patch lead.',wires:[]}
];
