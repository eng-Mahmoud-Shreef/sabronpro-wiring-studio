const CELL=16, COLS=91, ROWS=68;
class Heap {constructor(){this.a=[]} push(v){let a=this.a;a.push(v);let i=a.length-1;while(i){let p=(i-1)>>1;if(a[p].f<=v.f)break;a[i]=a[p];i=p}a[i]=v} pop(){let a=this.a,r=a[0],v=a.pop();if(a.length){let i=0;while(i*2+1<a.length){let j=i*2+1;if(j+1<a.length&&a[j+1].f<a[j].f)j++;if(a[j].f>=v.f)break;a[i]=a[j];i=j}a[i]=v}return r}}
export function routeWire(from,to,kit,existing=[],index=0) {
 if(!from||!to)return [];
 const regions=[...kit.obstacles,...kit.controls.filter(c=>c.type!=='sensor').map(c=>({x:c.x-c.radius-8,y:c.y-c.radius-8,w:2*c.radius+16,h:2*c.radius+16})),...kit.sockets.filter(s=>s.id!==from.id&&s.id!==to.id).map(s=>({x:s.x-s.radius-5,y:s.y-s.radius-5,w:2*s.radius+10,h:2*s.radius+10}))];
 const start=[Math.round(from.x/CELL),Math.round(from.y/CELL)],end=[Math.round(to.x/CELL),Math.round(to.y/CELL)];
 const key=(x,y)=>y*COLS+x;
 const nearby=(x,y)=>Math.hypot(x-from.x,y-from.y)<36||Math.hypot(x-to.x,y-to.y)<36;
 const blocked=new Uint8Array(COLS*ROWS),penalty=new Float32Array(COLS*ROWS);
 for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){
  const px=x*CELL,py=y*CELL,k=key(x,y);
  if(!nearby(px,py)&&regions.some(r=>px>r.x-8&&px<r.x+r.w+8&&py>r.y-8&&py<r.y+r.h+8))blocked[k]=1;
  if(px<38||px>1410||py<83||py>972)penalty[k]+=3;
 }
 for(const w of existing){const p=w.waypoints||[];for(let i=1;i<p.length;i++){const a=p[i-1],b=p[i],len=Math.hypot(b.x-a.x,b.y-a.y);for(let t=0;t<=len;t+=8){let x=Math.round((a.x+(b.x-a.x)*t/(len||1))/CELL),y=Math.round((a.y+(b.y-a.y)*t/(len||1))/CELL);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(x+dx>=0&&x+dx<COLS&&y+dy>=0&&y+dy<ROWS)penalty[key(x+dx,y+dy)]+=dx===0&&dy===0?4:1;}}}
 const open=new Heap(),cost=new Float64Array(COLS*ROWS).fill(Infinity),prev=new Int32Array(COLS*ROWS).fill(-1),closed=new Uint8Array(COLS*ROWS);
 const sk=key(...start),ek=key(...end);cost[sk]=0;blocked[sk]=blocked[ek]=0;open.push({k:sk,f:0});
 const dirs=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]];
 let found=false;
 while(open.a.length){const n=open.pop(),k=n.k;if(closed[k])continue;closed[k]=1;if(k===ek){found=true;break}let x=k%COLS,y=Math.floor(k/COLS);for(const [dx,dy]of dirs){const nx=x+dx,ny=y+dy;if(nx<0||nx>=COLS||ny<0||ny>=ROWS)continue;const nk=key(nx,ny);if(blocked[nk]||closed[nk]||(dx&&dy&&(blocked[key(x+dx,y)]||blocked[key(x,y+dy)])))continue;const pk=prev[k],turn=pk<0?0:(((k%COLS)-(pk%COLS)===dx&&Math.floor(k/COLS)-Math.floor(pk/COLS)===dy)?0:.32);const g=cost[k]+(dx&&dy?1.414:1)+penalty[nk]+turn;if(g<cost[nk]){cost[nk]=g;prev[nk]=k;open.push({k:nk,f:g+Math.hypot(nx-end[0],ny-end[1])})}}}
 if(!found)return [{x:from.x,y:from.y},{x:from.x+60,y:Math.min(from.y,to.y)-90-index*18},{x:to.x-60,y:Math.min(from.y,to.y)-90-index*18},{x:to.x,y:to.y}];
 let raw=[],k=ek;while(k!==-1){raw.push({x:(k%COLS)*CELL,y:Math.floor(k/COLS)*CELL});k=prev[k]}raw.reverse();raw[0]={x:from.x,y:from.y};raw[raw.length-1]={x:to.x,y:to.y};
 // Remove collinear grid nodes only; keep safe turns around keep-out regions.
 const p=[raw[0]];for(let i=1;i<raw.length-1;i++){const a=raw[i-1],b=raw[i],c=raw[i+1];if(Math.abs((b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x))>0.1)p.push(b)}p.push(raw.at(-1));
 const clear=(a,b)=>{const length=Math.hypot(b.x-a.x,b.y-a.y);for(let t=4;t<length;t+=4){const x=a.x+(b.x-a.x)*t/length,y=a.y+(b.y-a.y)*t/length;if(!nearby(x,y)&&regions.some(r=>x>r.x-9&&x<r.x+r.w+9&&y>r.y-9&&y<r.y+r.h+9))return false;}return true;};
 const simplified=[p[0]];let i=0;while(i<p.length-1){let j=p.length-1;while(j>i+1&&!clear(p[i],p[j]))j--;simplified.push(p[j]);i=j;}return simplified;
}
export function curvePath(points) {
 if(points.length<2)return '';
 let d=`M ${points[0].x} ${points[0].y}`;
 for(let i=1;i<points.length-1;i++){
  const a=points[i-1],b=points[i],c=points[i+1],ab=Math.hypot(a.x-b.x,a.y-b.y),bc=Math.hypot(c.x-b.x,c.y-b.y),r=Math.min(26,ab*.38,bc*.38);
  const p={x:b.x+(a.x-b.x)*r/(ab||1),y:b.y+(a.y-b.y)*r/(ab||1)},q={x:b.x+(c.x-b.x)*r/(bc||1),y:b.y+(c.y-b.y)*r/(bc||1)};
  d+=` L ${p.x} ${p.y} Q ${b.x} ${b.y} ${q.x} ${q.y}`;
 }
 const e=points.at(-1);return d+` L ${e.x} ${e.y}`;
}
