const languageGroups=[['PY','PYTHON'],['C','C'],['C++','C++'],['C#','C SHARP'],['RS','RUST'],['GO','GO'],['J','JAVA'],['KT','KOTLIN'],['SW','SWIFT'],['D','DART'],['JS','JAVASCRIPT'],['TS','TYPESCRIPT'],['PHP','PHP'],['RB','RUBY'],['SQL','SQL'],['R','R'],['LUA','LUA'],['PL','PERL'],['SC','SCALA'],['HS','HASKELL'],['ASM','ASSEMBLY'],['SOL','SOLIDITY'],['HTML','HTML'],['CSS','CSS'],['SH','BASH'],['PS','POWERSHELL'],['GD','GDSCRIPT'],['OBJ','OBJECTIVE-C'],['EX','ELIXIR'],['ER','ERLANG'],['CLJ','CLOJURE'],['F#','F SHARP']];
const languageChips=document.getElementById('languageChips');
languageChips.innerHTML=languageGroups.map(([short,name],i)=>'<span class="chip '+(i===0?'hot':'')+'" title="'+name+'">'+name+'</span>').join('');
document.getElementById('year').textContent=new Date().getFullYear();
const menu=document.getElementById('menuBtn'),nav=document.getElementById('navLinks');
menu.addEventListener('click',()=>{
 const open=nav.classList.toggle('open');
 menu.setAttribute('aria-expanded',String(open));
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
 nav.classList.remove('open');menu.setAttribute('aria-expanded','false');
}));
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
});
const revealEls=document.querySelectorAll('.section-title,.tool-row,.about-copy,.timeline,.project-card,.ai-list a,.contact-inner');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1});revealEls.forEach(el=>{el.classList.add('reveal');observer.observe(el)})}else revealEls.forEach(el=>el.classList.add('visible'));
const dot=document.getElementById('cursorDot'),ring=document.getElementById('cursorRing');
if(matchMedia('(pointer:fine)').matches){let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.opacity=ring.style.opacity=1;dot.style.left=mx+'px';dot.style.top=my+'px'});(function follow(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(follow)})();document.querySelectorAll('a,button,.chip').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('hover'));el.addEventListener('mouseleave',()=>ring.classList.remove('hover'))})}
const canvas=document.getElementById('heartCanvas'),ctx=canvas.getContext('2d');const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;let points=[],cw=0,ch=0,dpr=1;
function heart(t){return{x:16*Math.pow(Math.sin(t),3),y:-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))}}
function resizeHeart(){dpr=Math.min(devicePixelRatio||1,2);cw=canvas.clientWidth;ch=canvas.clientHeight;canvas.width=cw*dpr;canvas.height=ch*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);points=[];const scale=Math.min(cw,ch)*.014;const particleCount=matchMedia('(max-width:620px)').matches?420:850;for(let i=0;i<particleCount;i++){const t=Math.random()*Math.PI*2,r=Math.sqrt(Math.random()),p=heart(t);points.push({x:cw/2+p.x*scale*r,y:ch*.43+p.y*scale*r,baseX:cw/2+p.x*scale*r,baseY:ch*.43+p.y*scale*r,phase:Math.random()*6.28,size:Math.random()*1.35+.35,hue:Math.random()})}}
function drawHeart(){ctx.clearRect(0,0,cw,ch);const now=performance.now()*.001;for(const p of points){const pulse=1+Math.sin(now*1.5+p.phase)*.012;const x=cw/2+(p.baseX-cw/2)*pulse+Math.sin(now*.5+p.phase)*1.5;const y=ch*.43+(p.baseY-ch*.43)*pulse+Math.cos(now*.55+p.phase)*1.5;const colors=['#fff5d8','#f4ed22','#e9d9ff','#d9f6ff','#ffdce9'];ctx.fillStyle=colors[Math.floor(p.hue*colors.length)];ctx.globalAlpha=.55+Math.sin(now*2+p.phase)*.25;ctx.beginPath();ctx.arc(x,y,p.size,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;if(!reduceMotion)requestAnimationFrame(drawHeart)}
resizeHeart();drawHeart();addEventListener('resize',resizeHeart);


/* Animated cursor crew: visual choreography, not real remote editors */
(()=>{
 const palette=['#ff6b6b','#78d7ff','#f4ed22','#b7ff9b','#d9a4ff','#ffb5d7','#ffd08a','#8fffe0'];
 const labels=['type','color','pixels','layout','motion','ideas','style','build','spacing','shape','code','detail','focus','design','craft','grid','texture','finish'];
 const crew=[]; const count=18; let slow=false, auto=true, replaySeed=0, lastHighlight=null, completed=0;
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
  const targets=[...document.querySelectorAll('.hero h1,.hero-kicker,.hero-content>p,.hero-actions,.section-title h2,.tool-row,.project-card,.timeline-item,.ai-list a,.contact-inner h2,.generated-stage .agent-piece,.generated-stage .gen-card')];
  const target=targets[Math.floor(Math.random()*targets.length)];
  if(target){
   const r=target.getBoundingClientRect();
   if(r.width&&r.height){a.tx=Math.max(8,Math.min(innerWidth-20,r.left+rand(0,r.width)));a.ty=Math.max(8,Math.min(innerHeight-20,r.top+rand(0,r.height)));a.focus=target;}
  }else{a.tx=rand(10,innerWidth-20);a.ty=rand(10,innerHeight-20);a.focus=null;}
 }
 function reset(){
  if(window.generateFreshUI)window.generateFreshUI();
  replaySeed++;completed=0;const status=document.getElementById('agentStatus');if(status)status.textContent='0 / 18 cursors · Building';
  crew.forEach((a,i)=>{a.x=rand(0,innerWidth);a.y=rand(0,innerHeight);newTarget(a);a.wait=i*5;a.done=false;a.el.style.opacity='.95';});
  if(lastHighlight){lastHighlight.classList.remove('agent-highlight');lastHighlight=null;}
 }
 function tick(){
  crew.forEach(a=>{
   if(a.wait>0)a.wait--;
   else if(Math.hypot(a.tx-a.x,a.ty-a.y)<15){if(!a.done){a.done=true;completed++;const status=document.getElementById('agentStatus');if(status)status.textContent=Math.min(completed,18)+' / 18 cursors · '+(completed>=18?'Ready':'Building');}if(auto)newTarget(a);}
   else if(auto&&Math.random()<.0025)newTarget(a);
   const k=a.speed*(slow ? .45 : 1);
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
 window.replayCursorBuild=reset;
 document.getElementById('buildReplay')?.addEventListener('click',reset);
 document.getElementById('agentAuto')?.addEventListener('click',e=>{auto=!auto;e.currentTarget.setAttribute('aria-pressed',String(auto));e.currentTarget.textContent=auto?'AUTO':'PAUSED';});
 document.getElementById('agentSpeed')?.addEventListener('click',e=>{slow=!slow;e.currentTarget.textContent=slow?'.5×':'1×';});
 document.addEventListener('keydown',e=>{
  if((e.key.toLowerCase()==='r'||e.code==='Space')&&!/input|textarea/i.test(document.activeElement.tagName)){e.preventDefault();reset();}
  if(e.key.toLowerCase()==='a'&&!/input|textarea/i.test(document.activeElement.tagName)){slow=!slow;const speed=document.getElementById('agentSpeed');if(speed)speed.textContent=slow?'.5×':'1×';}
 });
 addEventListener('resize',()=>crew.forEach(newTarget));
 reset();if(!reduceMotion)tick();
})();

/* Functional custom website builder: live preview + downloadable standalone HTML */
(()=>{
 const $=id=>document.getElementById(id);
 const frame=$('builderPreview');if(!frame)return;
 let accent='#d7ff3f',layout='center';
 const safe=value=>String(value||'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const getData=()=>({name:safe($('builderName').value.trim()||'My Website'),headline:safe($('builderHeadline').value.trim()||'MAKE SOMETHING AMAZING'),description:safe($('builderDescription').value.trim()||'A website made your way.'),button:safe($('builderButton').value.trim()||'EXPLORE'),about:$('builderAbout').checked,work:$('builderWork').checked,contact:$('builderContact').checked,accent,layout});
 function buildDocument(d){
 const heroLayout=d.layout==='split'?'split':'center';
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+d.name+'</title><style>'+
 '*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#090a0b;color:#f6f6f1;font-family:Arial,sans-serif}a{color:inherit;text-decoration:none}.nav{height:70px;padding:0 7%;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #ffffff20}.brand{font-weight:900;letter-spacing:2px}.links{display:flex;gap:22px;font-size:12px;color:#bbb}.hero{min-height:78vh;padding:9vw 8%;display:flex;flex-direction:column;justify-content:center;align-items:'+(heroLayout==='center'?'center':'flex-start')+';text-align:'+(heroLayout==='center'?'center':'left')+';background:radial-gradient(ellipse at 50% 0%,'+d.accent+'20,transparent 55%)}.tag{color:'+d.accent+';font-size:11px;letter-spacing:3px}.hero h1{font-size:clamp(42px,8vw,100px);line-height:.95;max-width:900px;margin:25px 0}.hero p{color:#aaa;line-height:1.8;max-width:540px}.cta{display:inline-block;margin-top:24px;padding:15px 22px;background:'+d.accent+';color:#080808;font-weight:800;font-size:12px;letter-spacing:1px}.section{padding:70px 8%;border-top:1px solid #ffffff18}.section h2{font-size:36px}.section p{max-width:650px;color:#aaa;line-height:1.8}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.card{border:1px solid #444;padding:22px;min-height:100px}.card b{color:'+d.accent+'}footer{padding:25px 8%;border-top:1px solid #333;color:#888;font-size:12px}@media(max-width:600px){.links{gap:10px;font-size:10px}.nav{padding:0 5%}.hero{min-height:70vh;padding:70px 6%}.section{padding:50px 6%}}'+
 '</style></head><body><header class="nav"><a class="brand" href="#">'+d.name+'</a><nav class="links"><a href="#about">About</a><a href="#work">Work</a><a href="#contact">Contact</a></nav></header><main><section class="hero"><div class="tag">INDEPENDENTLY MADE · YOUR STYLE</div><h1>'+d.headline+'</h1><p>'+d.description+'</p><a class="cta" href="#contact">'+d.button+' ↗</a></section>'+
 (d.about?'<section class="section" id="about"><div class="tag">A LITTLE ABOUT</div><h2>Built around your ideas.</h2><p>Tell visitors what makes your work, brand or idea different. Replace this text with your own story.</p></section>':'')+
 (d.work?'<section class="section" id="work"><div class="tag">SELECTED WORK</div><h2>Things in progress.</h2><div class="cards"><div class="card"><b>01 / PROJECT</b><p>Your first project description.</p></div><div class="card"><b>02 / PROJECT</b><p>Your second project description.</p></div><div class="card"><b>03 / PROJECT</b><p>Your third project description.</p></div></div></section>':'')+
 (d.contact?'<section class="section" id="contact"><div class="tag">GET IN TOUCH</div><h2>Have an idea?</h2><p>Add your email or social links here to let people contact you.</p></section>':'')+
 '</main><footer>© '+new Date().getFullYear()+' '+d.name+' · Made with care.</footer></body></html>';
 }
 function update(){const d=getData();frame.srcdoc=buildDocument(d);$('builderStatus').textContent='Preview updated · '+d.layout+' layout · '+d.accent.toUpperCase();}
 ['builderName','builderHeadline','builderDescription','builderButton','builderAbout','builderWork','builderContact'].forEach(id=>$(id).addEventListener('input',update));
 $('builderSwatches').querySelectorAll('.swatch').forEach(btn=>btn.addEventListener('click',()=>{accent=btn.dataset.color;$('builderColor').value=accent;$('builderSwatches').querySelectorAll('.swatch').forEach(b=>b.classList.toggle('active',b===btn));update()}));
 $('builderColor').addEventListener('input',e=>{accent=e.target.value;$('builderSwatches').querySelectorAll('.swatch').forEach(b=>b.classList.remove('active'));update()});
 document.querySelectorAll('.layout-choice').forEach(btn=>btn.addEventListener('click',()=>{layout=btn.dataset.layout;document.querySelectorAll('.layout-choice').forEach(b=>b.classList.toggle('active',b===btn));update()}));
 $('builderGenerate').addEventListener('click',update);
 $('builderDownload').addEventListener('click',()=>{const blob=new Blob([buildDocument(getData())],{type:'text/html'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='my-custom-website.html';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('builderStatus').textContent='Your standalone HTML website has been downloaded.';});
 update();
})();

/* Fresh UI generator: every replay builds a different live interface */
(()=> {
 const stage=document.getElementById('generatedStage');if(!stage)return;
 const variants=[
  {name:'EDITORIAL',layout:'editorial',accent:'#d7ff3f',brand:'FORM / 01',kicker:'INDEPENDENT CREATIVE STUDIO',title:'MAKE ROOM FOR\nBETTER IDEAS.',desc:'A bold editorial landing page with oversized type, a clear story and a direct call to action.',cards:[['01','STRATEGY'],['02','DESIGN SYSTEM'],['03','DEVELOPMENT']],stats:[['12+','PROJECTS'],['04','DISCIPLINES'],['∞','POSSIBILITIES']]},
  {name:'NEON TECH',layout:'neon',accent:'#62f5d0',brand:'NEXUS.LAB',kicker:'NEXT GENERATION DIGITAL',title:'BUILD BEYOND\nTHE EXPECTED.',desc:'A futuristic product interface with luminous details, compact navigation and data-led cards.',cards:[['AI','INTELLIGENCE'],['XR','EXPERIENCES'],['API','CONNECTED']],stats:[['99.9%','UPTIME'],['24/7','SYSTEMS'],['01','MISSION']]},
  {name:'BRUTALIST',layout:'brutal',accent:'#ff4c21',brand:'RAW OBJECTS®',kicker:'NO TEMPLATE. NO LIMITS.',title:'LOUD IDEAS.\nREAL IMPACT.',desc:'A high-contrast brutalist layout with sharp edges, oversized typography and punchy blocks.',cards:[['A','IDENTITY'],['B','DIGITAL'],['C','CULTURE']],stats:[['2026','EDITION'],['03','COLLECTIVES'],['100%','ORIGINAL']]},
  {name:'SOFT PRODUCT',layout:'soft',accent:'#6255d9',brand:'morrow',kicker:'A CALMER WAY TO WORK',title:'LESS NOISE.\nMORE FLOW.',desc:'A soft product homepage with gentle surfaces, friendly spacing and clear feature cards.',cards:[['01','FOCUS MODE'],['02','SMART NOTES'],['03','YOUR SPACE']],stats:[['2 min','TO START'],['1 place','FOR IDEAS'],['∞','ROOM TO GROW']]},
  {name:'SPLIT PORTFOLIO',layout:'split',accent:'#ff9d5c',brand:'STUDIO / ABD',kicker:'DESIGN ENGINEER · AVAILABLE FOR IDEAS',title:'THOUGHTFUL\nBY DESIGN.',desc:'A portfolio concept pairing a strong introduction with a visual identity mark and selected work.',cards:[['01','SELECTED WORK'],['02','PROCESS'],['03','CONTACT']],stats:[['DESIGN','THINKING'],['CODE','CRAFT'],['BUILD','SHIP']]},
  {name:'GRID SYSTEM',layout:'cards',accent:'#8da7ff',brand:'GRIDWORK',kicker:'SYSTEMS FOR WHAT IS NEXT',title:'EVERYTHING\nIN ITS PLACE.',desc:'A modular grid-based studio site that turns capabilities into a crisp, scannable interface.',cards:[['01','WEB SYSTEMS'],['02','MOBILE APPS'],['03','INTERACTIVE'],['04','TOOLS'],['05','PROTOTYPES'],['06','EXPERIMENTS']],stats:[['06','MODULES'],['03','PLATFORMS'],['01','WORKFLOW']]}
 ];
 let previous=-1,current=0;
 const escapeHTML=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 function generate(){
  let next=Math.floor(Math.random()*variants.length);if(variants.length>1)while(next===previous)next=Math.floor(Math.random()*variants.length);previous=current;current=next;
  const v=variants[current];stage.dataset.layout=v.layout;stage.style.setProperty('--stage-accent',v.accent);
  const cards=v.cards.map(([n,label])=>'<div class="gen-card agent-piece"><b>'+escapeHTML(n)+'</b><span>'+escapeHTML(label)+'</span></div>').join('');
  const hero='<div class="gen-hero agent-piece"><div class="gen-hero-copy"><div class="gen-kicker">'+escapeHTML(v.kicker)+'</div><h3 class="gen-title">'+escapeHTML(v.title).replace(/\n/g,'<br>')+'</h3><p class="gen-desc">'+escapeHTML(v.desc)+'</p><a class="gen-cta" href="#contact">EXPLORE THE CONCEPT ↗</a></div>'+(v.layout==='split'?'<div class="gen-visual agent-piece"><div class="gen-orb">IDEAS<br>IN MOTION</div></div>':'')+'</div>';
  stage.innerHTML='<div class="gen-top agent-piece"><span class="gen-logo">'+escapeHTML(v.brand)+'</span><nav class="gen-links"><span>ABOUT</span><span>WORK</span><span>STUDIO</span><span>CONTACT ↗</span></nav></div>'+hero+'<div class="gen-grid">'+cards+'</div><div class="gen-stats agent-piece">'+v.stats.map(([n,l])=>'<div><b>'+escapeHTML(n)+'</b><small>'+escapeHTML(l)+'</small></div>').join('')+'</div>';
  const tag=document.getElementById('labVariant');if(tag)tag.textContent='CONCEPT 0'+(current+1)+' / '+v.name;
  const desc=document.getElementById('labDescription');if(desc)desc.textContent='Generated layout: '+v.name+' · palette '+v.accent+' · tap GENERATE ANOTHER UI for a new design.';
  document.querySelectorAll('.cursor-agent').forEach((el,i)=>{const label=el.querySelector('.agent-label');if(label)label.textContent=['brand','layout','type','color','grid','cards','spacing','motion','copy','visual','detail','contrast','navigation','shape','finish','texture','flow','review'][i]||'design'});
 }
 document.getElementById('generateUI')?.addEventListener('click',()=>{if(window.replayCursorBuild)window.replayCursorBuild();else generate()});
 window.generateFreshUI=generate;
 generate();
})();
