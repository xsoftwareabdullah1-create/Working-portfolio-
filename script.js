const languageGroups=[['PY','PYTHON'],['C','C'],['C++','C++'],['C#','C SHARP'],['RS','RUST'],['GO','GO'],['J','JAVA'],['KT','KOTLIN'],['SW','SWIFT'],['D','DART'],['JS','JAVASCRIPT'],['TS','TYPESCRIPT'],['PHP','PHP'],['RB','RUBY'],['SQL','SQL'],['R','R'],['LUA','LUA'],['PL','PERL'],['SC','SCALA'],['HS','HASKELL'],['ASM','ASSEMBLY'],['SOL','SOLIDITY'],['HTML','HTML'],['CSS','CSS'],['SH','BASH'],['PS','POWERSHELL'],['GD','GDSCRIPT'],['OBJ','OBJECTIVE-C'],['EX','ELIXIR'],['ER','ERLANG'],['CLJ','CLOJURE'],['F#','F SHARP']];
const languageChips=document.getElementById('languageChips');
languageChips.innerHTML=languageGroups.map(([short,name],i)=>'<span class="chip '+(i===0?'hot':'')+'" title="'+name+'">'+name+'</span>').join('');
document.getElementById('year').textContent=new Date().getFullYear();
const menu=document.getElementById('menuBtn'),nav=document.getElementById('navLinks');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const revealEls=document.querySelectorAll('.section-title,.tool-row,.about-copy,.timeline,.project-card,.ai-list a,.contact-inner');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1});revealEls.forEach(el=>{el.classList.add('reveal');observer.observe(el)})}else revealEls.forEach(el=>el.classList.add('visible'));
const dot=document.getElementById('cursorDot'),ring=document.getElementById('cursorRing');
if(matchMedia('(pointer:fine)').matches){let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.opacity=ring.style.opacity=1;dot.style.left=mx+'px';dot.style.top=my+'px'});(function follow(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(follow)})();document.querySelectorAll('a,button,.chip').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('hover'));el.addEventListener('mouseleave',()=>ring.classList.remove('hover'))})}
const canvas=document.getElementById('heartCanvas'),ctx=canvas.getContext('2d');let points=[],cw=0,ch=0,dpr=1;
function heart(t){return{x:16*Math.pow(Math.sin(t),3),y:-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))}}
function resizeHeart(){dpr=Math.min(devicePixelRatio||1,2);cw=canvas.clientWidth;ch=canvas.clientHeight;canvas.width=cw*dpr;canvas.height=ch*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);points=[];const scale=Math.min(cw,ch)*.014;for(let i=0;i<850;i++){const t=Math.random()*Math.PI*2,r=Math.sqrt(Math.random()),p=heart(t);points.push({x:cw/2+p.x*scale*r,y:ch*.43+p.y*scale*r,baseX:cw/2+p.x*scale*r,baseY:ch*.43+p.y*scale*r,phase:Math.random()*6.28,size:Math.random()*1.35+.35,hue:Math.random()})}}
function drawHeart(){ctx.clearRect(0,0,cw,ch);const now=performance.now()*.001;for(const p of points){const pulse=1+Math.sin(now*1.5+p.phase)*.012;const x=cw/2+(p.baseX-cw/2)*pulse+Math.sin(now*.5+p.phase)*1.5;const y=ch*.43+(p.baseY-ch*.43)*pulse+Math.cos(now*.55+p.phase)*1.5;const colors=['#fff5d8','#f4ed22','#e9d9ff','#d9f6ff','#ffdce9'];ctx.fillStyle=colors[Math.floor(p.hue*colors.length)];ctx.globalAlpha=.55+Math.sin(now*2+p.phase)*.25;ctx.beginPath();ctx.arc(x,y,p.size,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;requestAnimationFrame(drawHeart)}
resizeHeart();drawHeart();addEventListener('resize',resizeHeart);


/* Animated cursor crew: visual choreography, not real remote editors */
(()=>{
 const palette=['#ff6b6b','#78d7ff','#f4ed22','#b7ff9b','#d9a4ff','#ffb5d7','#ffd08a','#8fffe0'];
 const labels=['type','color','pixels','layout','motion','ideas','style','build','spacing','shape','code','detail','focus','design','craft'];
 const crew=[]; const count=15; let slow=false, replaySeed=0, lastHighlight=null;
 const svg='<svg viewBox="0 0 20 26" aria-hidden="true"><path d="M2 1 L2 21 L7.2 16.2 L11.1 24 L14.2 22.5 L10.3 14.8 L17.4 14.2 Z" fill="currentColor" stroke="#080808" stroke-width="1.4" stroke-linejoin="round"/></svg>';
 const rand=(a,b)=>a+Math.random()*(b-a);
 for(let i=0;i<count;i++){
  const el=document.createElement('div');el.className='cursor-agent';el.innerHTML=svg+'<span class="agent-label"></span>';
  const color=palette[i%palette.length];el.style.color=color;el.style.setProperty('--agent-color',color);
  el.querySelector('.agent-label').textContent=labels[i];
  document.body.appendChild(el);
  crew.push({el,x:rand(0,innerWidth),y:rand(0,innerHeight),tx:rand(0,innerWidth),ty:rand(0,innerHeight),wait:rand(0,120),speed:rand(.006,.018),phase:rand(0,6.28),index:i});
 }
 function newTarget(a){
  const targets=[...document.querySelectorAll('.hero h1,.hero-kicker,.hero-content>p,.hero-actions,.section-title h2,.tool-row,.project-card,.timeline-item,.ai-list a,.contact-inner h2')];
  const target=targets[Math.floor(Math.random()*targets.length)];
  if(target){
   const r=target.getBoundingClientRect();
   if(r.width&&r.height){a.tx=Math.max(8,Math.min(innerWidth-20,r.left+rand(0,r.width)));a.ty=Math.max(8,Math.min(innerHeight-20,r.top+rand(0,r.height)));a.focus=target;}
  }else{a.tx=rand(10,innerWidth-20);a.ty=rand(10,innerHeight-20);a.focus=null;}
 }
 function reset(){
  replaySeed++;
  crew.forEach((a,i)=>{a.x=rand(0,innerWidth);a.y=rand(0,innerHeight);newTarget(a);a.wait=i*5;a.el.style.opacity='.95';});
  if(lastHighlight){lastHighlight.classList.remove('agent-highlight');lastHighlight=null;}
 }
 function tick(){
  crew.forEach(a=>{
   if(a.wait>0)a.wait--;
   else if(Math.hypot(a.tx-a.x,a.ty-a.y)<15 || Math.random()<.0025)newTarget(a);
   const k=a.speed*(slow?.45:1);
   a.x+=(a.tx-a.x)*k;a.y+=(a.ty-a.y)*k;
   a.el.style.transform='translate3d('+a.x+'px,'+a.y+'px,0)';
   const selecting=Math.hypot(a.tx-a.x,a.ty-a.y)<22;
   a.el.classList.toggle('is-selecting',selecting);
   if(selecting&&a.focus&&Math.random()<.025){
    if(lastHighlight&&lastHighlight!==a.focus)lastHighlight.classList.remove('agent-highlight');
    a.focus.classList.add('agent-highlight');lastHighlight=a.focus;
    setTimeout(()=>{a.focus&&a.focus.classList.remove('agent-highlight');if(lastHighlight===a.focus)lastHighlight=null;},650);
   }
  });
  requestAnimationFrame(tick);
 }
 document.getElementById('buildReplay')?.addEventListener('click',reset);
 document.addEventListener('keydown',e=>{
  if(e.key.toLowerCase()==='r'&&!/input|textarea/i.test(document.activeElement.tagName))reset();
  if(e.key.toLowerCase()==='a'&&!/input|textarea/i.test(document.activeElement.tagName)){slow=!slow;document.getElementById('buildReplay').textContent=slow?'↻ SLOW BUILD: ON':'↻ REPLAY THE BUILD';}
 });
 addEventListener('resize',()=>crew.forEach(newTarget));
 reset();tick();
})();
