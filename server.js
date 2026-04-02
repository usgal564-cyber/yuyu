const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="mn">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>IMPOSTER</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
<script src="https://cdn.socket.io/4.7.4/socket.io.min.js"><\/script>
<script>tailwind.config={theme:{extend:{fontFamily:{orbitron:['Orbitron','sans-serif']}}}}<\/script>
<style>
:root{--bg:#060a14;--card:rgba(15,23,42,0.85);--border:rgba(51,65,85,0.5);--red:#ef4444;--red-g:rgba(239,68,68,0.4);--cyan:#06b6d4;--cyan-g:rgba(6,182,212,0.4);--green:#10b981;--yellow:#f59e0b;--t1:#f1f5f9;--t2:#94a3b8;--t3:#475569}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--t1);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;min-height:100dvh;overflow:hidden}
#sf{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none}
.v{position:fixed;top:0;left:0;width:100%;height:100dvh;z-index:10;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .4s,transform .4s;transform:scale(.96)}
.v.a{opacity:1;pointer-events:all;transform:scale(1)}
.gl{background:var(--card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--border);border-radius:20px}
.bp{background:linear-gradient(135deg,var(--red),#dc2626);color:#fff;border:none;padding:14px 32px;border-radius:14px;font-size:16px;font-weight:700;cursor:pointer;transition:all .2s;box-shadow:0 4px 20px var(--red-g)}
.bp:hover{transform:translateY(-2px)}.bp:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}
.bs{background:rgba(51,65,85,.5);color:var(--t1);border:1px solid var(--border);padding:14px 32px;border-radius:14px;font-size:16px;font-weight:600;cursor:pointer;transition:all .2s}
.bs:hover{background:rgba(71,85,105,.5)}
.bc{background:linear-gradient(135deg,var(--cyan),#0891b2);color:#fff;border:none;padding:14px 32px;border-radius:14px;font-size:16px;font-weight:700;cursor:pointer;transition:all .2s;box-shadow:0 4px 20px var(--cyan-g)}
.bc:hover{transform:translateY(-2px)}
.if{background:rgba(15,23,42,.9);border:1px solid var(--border);color:var(--t1);padding:14px 18px;border-radius:12px;font-size:16px;outline:none;transition:border-color .2s;width:100%}
.if:focus{border-color:var(--red)}.if::placeholder{color:var(--t3)}.if:disabled{opacity:.4}
.lt{font-family:'Orbitron',sans-serif;font-size:clamp(48px,10vw,80px);font-weight:900;letter-spacing:8px;background:linear-gradient(135deg,var(--red),#ff6b6b,var(--red));background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gs 3s ease infinite;text-align:center}
@keyframes gs{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.rc{font-family:'Orbitron',sans-serif;font-size:36px;font-weight:900;letter-spacing:10px;color:var(--cyan);text-shadow:0 0 20px var(--cyan-g)}
.pa{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;color:#fff;flex-shrink:0}
.pc{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:14px;background:rgba(30,41,59,.5);border:1px solid transparent}
.pc.ih{border-color:var(--yellow)}
.cc{padding:10px 14px;border-radius:12px;background:rgba(30,41,59,.5);border:2px solid transparent;cursor:pointer;transition:all .2s;text-align:center;font-size:13px;font-weight:600;color:var(--t2)}
.cc:hover{background:rgba(51,65,85,.5);color:var(--t1)}
.cc.s{border-color:var(--red);color:var(--red);background:rgba(239,68,68,.1)}
.ic{padding:10px 14px;border-radius:12px;background:rgba(30,41,59,.5);border:2px solid transparent;cursor:pointer;transition:all .2s;text-align:center;font-size:13px;font-weight:700;color:var(--t2)}
.ic:hover{background:rgba(51,65,85,.5)}
.ic.s{border-color:var(--yellow);color:var(--yellow);background:rgba(245,158,11,.1)}
.rr{text-align:center;padding:40px 32px}
.ri{width:110px;height:110px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:44px;animation:rp 1.5s ease infinite}
.ri.imp{background:linear-gradient(135deg,var(--red),#991b1b);box-shadow:0 0 60px var(--red-g);color:#fff}
.ri.cit{background:linear-gradient(135deg,var(--cyan),#0e7490);box-shadow:0 0 60px var(--cyan-g);color:#fff}
@keyframes rp{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
.ca{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:8px}
.ca::-webkit-scrollbar{width:4px}.ca::-webkit-scrollbar-thumb{background:var(--t3);border-radius:4px}
.cb{max-width:80%;padding:10px 14px;border-radius:16px;font-size:14px;line-height:1.5;animation:bi .3s}
.cb.me{align-self:flex-end;background:rgba(239,68,68,.2);border:1px solid rgba(239,68,68,.3);border-bottom-right-radius:4px}
.cb.ot{align-self:flex-start;background:rgba(30,41,59,.7);border:1px solid var(--border);border-bottom-left-radius:4px}
.cb.el{opacity:.5;text-decoration:line-through}
.cs{font-size:11px;font-weight:700;margin-bottom:2px}.ct{font-size:10px;color:var(--t3);margin-top:2px}
@keyframes bi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.vm{text-align:center;padding:8px;font-size:13px;font-weight:700;animation:bi .3s;border-radius:10px;background:rgba(30,41,59,.6)}
.re{padding:20px;border-radius:16px;text-align:center;margin:16px 0}
.re.f{background:rgba(16,185,129,.15);border:2px solid var(--green)}
.re.n{background:rgba(239,68,68,.15);border:2px solid var(--red)}
.re.t{background:rgba(245,158,11,.15);border:2px solid var(--yellow)}
.re.w{background:rgba(139,92,246,.15);border:2px solid #8b5cf6}
.vb{height:8px;border-radius:4px;background:rgba(51,65,85,.5);overflow:hidden;margin-top:4px}
.vf{height:100%;border-radius:4px;transition:width .8s}
#tc{position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:1000;display:flex;flex-direction:column;gap:8px;pointer-events:none}
.to{padding:12px 24px;border-radius:12px;font-size:14px;font-weight:600;backdrop-filter:blur(20px);opacity:0;transform:translateY(-20px);transition:all .3s;pointer-events:auto;text-align:center;max-width:90vw}
.to.sh{opacity:1;transform:translateY(0)}
.to-e{background:rgba(239,68,68,.9);color:#fff}.to-s{background:rgba(16,185,129,.9);color:#fff}.to-i{background:rgba(6,182,212,.9);color:#fff}
#vb2{border-bottom:1px solid var(--border);background:rgba(239,68,68,.03)}
.nt{font-size:11px;padding:3px 8px;border-radius:7px;font-weight:700;display:inline-block}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
@media(max-width:640px){.lt{letter-spacing:4px}.rc{font-size:28px;letter-spacing:6px}}
</style>
</head>
<body>
<canvas id="sf"></canvas>
<div id="tc"></div>

<div id="vL" class="v a">
<div class="w-full max-w-md px-6">
<div class="text-center mb-10"><h1 class="lt">IMPOSTER</h1><p class="text-lg" style="color:var(--t2);letter-spacing:2px">Халдагчийг олж илрүүл</p></div>
<div class="flex flex-col gap-3 mb-6">
<button id="bSC" class="bp w-full text-lg"><i class="fas fa-plus mr-2"></i>Room үүсгэх</button>
<button id="bSJ" class="bs w-full text-lg"><i class="fas fa-sign-in-alt mr-2"></i>Room-д орох</button>
</div>
<div id="pC" class="gl p-6 hidden">
<h3 class="text-lg font-bold mb-4 text-center">Room үүсгэх</h3>
<input id="iCN" class="if mb-4" placeholder="Таны нэр" maxlength="15" autocomplete="off">
<button id="bCR" class="bp w-full">Үүсгэх</button>
</div>
<div id="pJ" class="gl p-6 hidden">
<h3 class="text-lg font-bold mb-4 text-center">Room-д орох</h3>
<input id="iJN" class="if mb-3" placeholder="Таны нэр" maxlength="15" autocomplete="off">
<input id="iJC" class="if mb-4" placeholder="Room код" maxlength="6" autocomplete="off" style="text-transform:uppercase;font-family:'Orbitron',sans-serif;letter-spacing:4px;text-align:center">
<button id="bJO" class="bc w-full">Орох</button>
</div>
<div class="gl p-5 mt-6">
<h3 class="font-bold text-sm mb-3 text-center" style="color:var(--yellow)"><i class="fas fa-book mr-1"></i> Дүрэм</h3>
<ul class="text-xs space-y-2" style="color:var(--t2);line-height:1.6">
<li><i class="fas fa-users mr-2" style="color:var(--cyan)"></i>3-10 хүнээр тоглох</li>
<li><i class="fas fa-user-secret mr-2" style="color:var(--red)"></i>Хост халдагчийн тоог сонгоно</li>
<li><i class="fas fa-eye-slash mr-2" style="color:var(--red)"></i>Халдагч сэдвийг мэдэхгүй</li>
<li><i class="fas fa-vote-yea mr-2" style="color:var(--yellow)"></i>Чатад дугаар бичиж санал өгнө</li>
<li><i class="fas fa-redo mr-2" style="color:var(--cyan)"></i>Халдагч тоглолт бүрт өөрчлөгдөнө</li>
</ul>
</div>
</div>
</div>

<div id="vW" class="v">
<div class="w-full max-w-lg px-6">
<div class="gl p-6">
<div class="text-center mb-6">
<p class="text-sm mb-2" style="color:var(--t3)">Room код:</p>
<div class="flex items-center justify-center gap-3">
<span id="rC" class="rc">------</span>
<button id="bCP" class="p-3 rounded-xl" style="background:rgba(51,65,85,.5)"><i class="fas fa-copy" style="color:var(--cyan)"></i></button>
</div>
</div>
<div class="mb-4">
<h3 class="text-sm font-bold mb-3" style="color:var(--t3)">Тоглогчид (<span id="pN">0</span>/10)</h3>
<div id="pL" class="space-y-2"></div>
</div>
<div id="sS" class="mb-4 hidden">
<h3 class="text-sm font-bold mb-2" style="color:var(--t3)">Ангилал:</h3>
<div id="sG" class="grid grid-cols-4 gap-2"></div>
</div>
<div id="iS" class="mb-4 hidden">
<h3 class="text-sm font-bold mb-2" style="color:var(--t3)">Халдагчийн тоо:</h3>
<div id="iG" class="flex gap-2"></div>
</div>
<div class="text-center">
<button id="bSG" class="bp w-full" disabled><i class="fas fa-play mr-2"></i> Тоглоом эхлүүлэх</button>
<p id="sI" class="text-xs mt-2" style="color:var(--t3)">Хамгийн багадаа 3 хүн</p>
</div>
</div>
</div>
</div>

<div id="vR" class="v"><div class="w-full max-w-md px-6"><div class="gl rr" id="rRC"></div></div></div>

<div id="vD" class="v">
<div class="w-full h-full max-w-lg flex flex-col" style="padding:0">
<div class="gl flex flex-col h-full" style="border-radius:0;border-left:none;border-right:none;border-top:none">
<div class="p-3 flex items-center justify-between" style="border-bottom:1px solid var(--border)">
<div class="flex items-center gap-2">
<span id="pB" class="text-xs font-bold px-3 py-1 rounded-full" style="background:rgba(239,68,68,.2);color:var(--red)">1-р үе</span>
<span id="dT" class="text-sm font-bold" style="color:var(--cyan)"></span>
</div>
<span id="mR" class="text-xs font-bold px-3 py-1 rounded-full"></span>
</div>
<div id="vb2" class="p-3 hidden">
<p class="text-xs font-bold mb-2" style="color:var(--yellow)"><i class="fas fa-vote-yea mr-1"></i> Дугаар бичнэ үү:</p>
<div id="vNL" class="flex flex-wrap gap-1 mb-2"></div>
<div class="flex items-center gap-2"><div class="vb flex-1"><div id="vPB" class="vf" style="width:0%;background:var(--yellow)"></div></div><span id="vPT" class="text-xs" style="color:var(--t3)">0/0</span></div>
</div>
<div id="cM" class="ca flex-1"></div>
<div class="p-3 flex gap-2" style="border-top:1px solid var(--border)">
<input id="cI" class="if flex-1" placeholder="Мессеж..." maxlength="200" autocomplete="off">
<button id="bSE" class="bp px-4" style="padding:14px 18px"><i class="fas fa-paper-plane"></i></button>
</div>
<div id="hC" class="p-3 hidden" style="border-top:1px solid var(--border)">
<button id="bSV" class="bs w-full"><i class="fas fa-vote-yea mr-2"></i> Санал хураалт</button>
</div>
</div>
</div>
</div>

<div id="vE" class="v"><div class="w-full max-w-lg px-6"><div class="gl p-6" id="rEC"></div></div></div>

<script>
var cv=document.getElementById('sf'),cx=cv.getContext('2d'),st=[],mx=0,my=0;
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();
addEventListener('resize',rs);document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY});
for(var i=0;i<200;i++)st.push({x:Math.random()*cv.width,y:Math.random()*cv.height,s:Math.random()*2+.5,sp:Math.random()*.3+.05,o:Math.random(),ts:Math.random()*.02+.005,c:Math.random()>.85?'#ef4444':Math.random()>.7?'#06b6d4':'#ffffff'});
function as(){cx.clearRect(0,0,cv.width,cv.height);var px=(mx-cv.width/2)*.01,py=(my-cv.height/2)*.01;
st.forEach(function(s){s.o+=s.ts;if(s.o>1||s.o<.2)s.ts*=-1;s.o=Math.max(.1,Math.min(1,s.o));s.y+=s.sp;if(s.y>cv.height){s.y=0;s.x=Math.random()*cv.width}
var dx=s.x+px*s.s,dy=s.y+py*s.s;cx.beginPath();cx.arc(dx,dy,s.s,0,Math.PI*2);cx.fillStyle=s.c;cx.globalAlpha=s.o*.8;cx.fill();
if(s.s>1.5){cx.beginPath();cx.arc(dx,dy,s.s*3,0,Math.PI*2);var g=cx.createRadialGradient(dx,dy,0,dx,dy,s.s*3);g.addColorStop(0,s.c);g.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=g;cx.globalAlpha=s.o*.15;cx.fill()}});
cx.globalAlpha=1;requestAnimationFrame(as)}as();

var sk=io(),pc=['#ef4444','#3b82f6','#10b981','#f59e0b','#ec4899','#8b5cf6','#06b6d4','#84cc16','#f97316','#6366f1'];
var mi='',mn='',mr='',rc='',ih=false,sc='Спорт',iv=false,ic=1;
var cats=['Спорт','Хоол хүнс','Амралт','Шинжлэх ухаан','Урлаг','Технологи','Амьтад','Кино'];
function sv(id){document.querySelectorAll('.v').forEach(function(v){v.classList.remove('a')});document.getElementById(id).classList.add('a')}
function ts(m,t){t=t||'i';var e=document.createElement('div');e.className='to to-'+t;e.textContent=m;document.getElementById('tc').appendChild(e);setTimeout(function(){e.classList.add('sh')},10);setTimeout(function(){e.classList.remove('sh');setTimeout(function(){e.remove()},300)},3000)}
function gm(i){return'Тоглогч '+(i+1)}
function mi2(n){return n<=4?1:n<=7?2:3}

document.getElementById('bSC').onclick=function(){document.getElementById('pC').classList.toggle('hidden');document.getElementById('pJ').classList.add('hidden')};
document.getElementById('bSJ').onclick=function(){document.getElementById('pJ').classList.toggle('hidden');document.getElementById('pC').classList.add('hidden')};
document.getElementById('bCR').onclick=function(){var n=document.getElementById('iCN').value.trim();if(!n){ts('Нэрээ оруулна уу','e');return}mn=n;sk.emit('createRoom',{playerName:n})};
document.getElementById('bJO').onclick=function(){var n=document.getElementById('iJN').value.trim(),c=document.getElementById('iJC').value.trim();if(!n){ts('Нэрээ оруулна уу','e');return}if(!c){ts('Код оруулна уу','e');return}mn=n;sk.emit('joinRoom',{roomCode:c,playerName:n})};
document.getElementById('iCN').onkeypress=function(e){if(e.key==='Enter')document.getElementById('bCR').click()};
document.getElementById('iJC').onkeypress=function(e){if(e.key==='Enter')document.getElementById('bJO').click()};
document.getElementById('bCP').onclick=function(){var c=document.getElementById('rC').textContent;navigator.clipboard.writeText(c).then(function(){ts('Хуулагдлаа!','s')}).catch(function(){ts('Код: '+c,'i')})};

sk.on('roomCreated',function(d){mi=sk.id;rc=d.roomCode;ih=true;document.getElementById('rC').textContent=d.roomCode;sv('vW');rgs();ris();riis();uw(d);ts('Room үүсгэгдлээ!','s')});
sk.on('roomJoined',function(d){mi=sk.id;rc=d.roomCode;ih=false;document.getElementById('rC').textContent=d.roomCode;sv('vW');document.getElementById('sS').classList.add('hidden');document.getElementById('iS').classList.add('hidden');document.getElementById('bSG').style.display='none';document.getElementById('sI').style.display='none';uw(d);ts('Орлоо!','s')});
sk.on('roomError',function(m){ts(m,'e')});
sk.on('playerUpdate',function(d){uw(d)});
sk.on('hostChanged',function(d){ts('Хост солигдлоо','i');if(d.newHostId===mi){ih=true;document.getElementById('sS').classList.remove('hidden');document.getElementById('iS').classList.remove('hidden');document.getElementById('bSG').style.display='';document.getElementById('sI').style.display='';rgs();riis()}});
sk.on('backToLobby',function(){sv('vL');document.getElementById('iCN').value='';document.getElementById('iJN').value='';document.getElementById('iJC').value='';document.getElementById('pC').classList.add('hidden');document.getElementById('pJ').classList.add('hidden')});
sk.on('showWaiting',function(d){sv('vW');uw(d);ih=d.host===mi;if(ih){document.getElementById('sS').classList.remove('hidden');document.getElementById('iS').classList.remove('hidden');document.getElementById('bSG').style.display='';document.getElementById('sI').style.display='';rgs();riis()}else{document.getElementById('sS').classList.add('hidden');document.getElementById('iS').classList.add('hidden');document.getElementById('bSG').style.display='none';document.getElementById('sI').style.display='none'}});

function uw(d){
  document.getElementById('pN').textContent=d.playerCount;
  var l=document.getElementById('pL');l.innerHTML='';
  d.players.forEach(function(p,i){
    var c=document.createElement('div');c.className='pc'+(p.isHost?' ih':'');
    var elim=d.eliminated&&d.eliminated.indexOf(p.id)!==-1;
    c.innerHTML='<div class="pa" style="background:'+pc[i]+(elim?';opacity:.3':'')+'">'+(i+1)+'</div><div class="flex-1"><span class="font-bold text-sm" style="'+(elim?'text-decoration:line-through;opacity:.5':'')+'">'+gm(i)+'</span>'+(p.isHost?' <span class="text-xs" style="color:var(--yellow)"><i class="fas fa-crown"></i></span>':'')+(elim?' <span class="text-xs" style="color:var(--red)">(хасагдсан)</span>':'')+'</div>';
    l.appendChild(c);
  });
  if(ih){var b=document.getElementById('bSG');b.disabled=d.playerCount<3;document.getElementById('sI').textContent=d.playerCount<3?'Давуу 3 хүн ('+d.playerCount+'/3)':d.playerCount+' хүн бэлэн!';var mx2=mi2(d.playerCount);if(ic>mx2)ic=mx2;riis()}
}

function rgs(){var g=document.getElementById('sG');g.innerHTML='';cats.forEach(function(c){var d=document.createElement('div');d.className='cc'+(c===sc?' s':'');d.textContent=c;d.onclick=function(){sc=c;g.querySelectorAll('.cc').forEach(function(x){x.classList.remove('s')});d.classList.add('s')};g.appendChild(d)})}

function riis(){
  var g=document.getElementById('iG');g.innerHTML='';
  // get current player count from the displayed list
  var pn=parseInt(document.getElementById('pN').textContent)||3;
  var mx2=mi2(pn);
  if(ic>mx2)ic=1;
  for(var i=1;i<=mx2;i++){var d=document.createElement('div');d.className='ic'+(i===ic?' s':'');d.textContent=i;d.onclick=function(){var n=parseInt(this.textContent);ic=n;g.querySelectorAll('.ic').forEach(function(x){x.classList.remove('s')});this.classList.add('s')};g.appendChild(d)}
  document.getElementById('iS').classList.remove('hidden');
}

document.getElementById('bSG').onclick=function(){if(!sc){ts('Ангилал сонгоно уу','e');return}sk.emit('startGame',{roomCode:rc,category:sc,impostorCount:ic})};

sk.on('gameStarted',function(d){mr=d.role;sv('vR');var c=document.getElementById('rRC');
if(d.role==='impostor'){var fi='';if(d.fellowImpostors&&d.fellowImpostors.length>0)fi='<div class="mt-3 p-3 rounded-xl" style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3)"><p class="text-xs" style="color:var(--t3)">Нөхөр халдагч(ууд):</p><p class="text-base font-bold" style="color:var(--red)">'+d.fellowImpostors.join(', ')+'</p></div>';
c.innerHTML='<div class="ri imp"><i class="fas fa-user-secret"></i></div><h2 class="text-3xl font-black mb-3" style="color:var(--red);font-family:Orbitron,sans-serif">ХАЛДАГЧ</h2><p class="text-sm" style="color:var(--t2)">Сэдвийг мэдэхгүй. Жүжиглээрэй!</p>'+fi+'<div class="mt-5 p-4 rounded-xl" style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3)"><p class="text-xs" style="color:var(--t3)">Сэдэв:</p><p class="text-xl font-bold" style="color:var(--red)">???</p></div><p class="text-xs mt-5" style="color:var(--t3)">Хост ярилцлага эхлүүлтэл хүлээнэ үү...</p>'}
else{c.innerHTML='<div class="ri cit"><i class="fas fa-user-shield"></i></div><h2 class="text-3xl font-black mb-3" style="color:var(--cyan);font-family:Orbitron,sans-serif">ИРГЭН</h2><p class="text-sm mb-1" style="color:var(--t2)">Халдагч(ууд): '+d.totalImpostors+' хүн</p><div class="mt-4 p-4 rounded-xl" style="background:rgba(6,182,212,.1);border:1px solid rgba(6,182,212,.3)"><p class="text-xs" style="color:var(--t3)">Сэдэв:</p><p class="text-xl font-bold" style="color:var(--cyan)">'+d.topic+'</p></div><p class="text-xs mt-5" style="color:var(--t3)">Хост ярилцлага эхлүүлтэл хүлээнэ үү...</p>'}
if(ih){var b=document.createElement('button');b.className='bp w-full mt-5';b.innerHTML='<i class="fas fa-comments mr-2"></i> Ярилцлага эхлүүлэх';b.onclick=function(){sk.emit('startDiscussion',{roomCode:rc})};c.appendChild(b)}});

sk.on('discussionStarted',function(d){iv=false;sv('vD');var b=document.getElementById('pB');b.textContent=d.round+'-р үе';b.style.background='rgba(239,68,68,.2)';b.style.color='var(--red)';
var t=document.getElementById('dT');t.style.display='';if(mr==='citizen'){t.textContent='Сэдэв: '+d.topic;t.style.color='var(--cyan)'}else{t.textContent='Сэдэв: ???';t.style.color='var(--red)'}
var rb=document.getElementById('mR');if(mr==='impostor'){rb.textContent='ХАЛДАГЧ';rb.style.background='rgba(239,68,68,.2)';rb.style.color='var(--red)'}else{rb.textContent='ИРГЭН';rb.style.background='rgba(6,182,212,.2)';rb.style.color='var(--cyan)'}
document.getElementById('vb2').classList.add('hidden');document.getElementById('cM').innerHTML='';document.getElementById('cI').disabled=false;document.getElementById('cI').placeholder='Мессеж...';document.getElementById('bSE').disabled=false;
document.getElementById('hC').classList[ih?'remove':'add']('hidden');asm('Ярилцлага эхэллээ!');if(mr==='citizen')asm('Сэдвийг шууд хэлэхгүй ярилцана уу.')});

sk.on('roundStarted',function(d){iv=false;sv('vD');var b=document.getElementById('pB');b.textContent=d.round+'-р үе';b.style.background='rgba(239,68,68,.2)';b.style.color='var(--red)';
var t=document.getElementById('dT');t.style.display='';if(d.role==='citizen'){t.textContent='Сэдэв: '+d.topic;t.style.color='var(--cyan)'}else{t.textContent='Сэдэв: ???';t.style.color='var(--red)'}
document.getElementById('vb2').classList.add('hidden');document.getElementById('cM').innerHTML='';document.getElementById('cI').disabled=false;document.getElementById('cI').placeholder='Мессеж...';document.getElementById('bSE').disabled=false;
document.getElementById('hC').classList[ih?'remove':'add']('hidden');asm(d.round+'-р үе! Шинэ сэдвээр ярилцана.')});

sk.on('chatMessage',function(d){acm(d.sender,d.message,d.color,d.time,d.senderId===mi,d.eliminated)});
function acm(s,m,c,t,self,el){var ch=document.getElementById('cM'),b=document.createElement('div');b.className='cb '+(self?'me':'ot')+(el?' el':'');b.innerHTML='<div class="cs" style="color:'+c+'">'+s+(el?' (хасагдсан)':'')+'</div><div>'+m+'</div><div class="ct">'+t+'</div>';ch.appendChild(b);ch.scrollTop=ch.scrollHeight}
function asm(t){var ch=document.getElementById('cM'),m=document.createElement('div');m.style.cssText='text-align:center;font-size:11px;color:var(--t3);padding:8px;font-style:italic';m.textContent=t;ch.appendChild(m)}
function avm(t,c){var ch=document.getElementById('cM'),m=document.createElement('div');m.className='vm';m.style.color=c;m.textContent=t;ch.appendChild(m);ch.scrollTop=ch.scrollHeight}

document.getElementById('bSE').onclick=sc;document.getElementById('cI').onkeypress=function(e){if(e.key==='Enter')sc()};
function sc(){var inp=document.getElementById('cI');if(inp.disabled)return;var m=inp.value.trim();if(!m)return;if(iv){var n=parseInt(m);if(isNaN(n)||m!==n.toString()){ts('Дугаар бичнэ үү','e');inp.value='';return}}sk.emit('chatMessage',{roomCode:rc,message:m});inp.value=''}

document.getElementById('bSV').onclick=function(){sk.emit('startVoting',{roomCode:rc})};

sk.on('votingStarted',function(d){iv=true;var b=document.getElementById('pB');b.textContent='САНАЛ ХУРААЛТ';b.style.background='rgba(245,158,11,.2)';b.style.color='var(--yellow)';document.getElementById('dT').style.display='none';
document.getElementById('vb2').classList.remove('hidden');var l=document.getElementById('vNL');l.innerHTML='';
d.players.forEach(function(p){if(p.eliminated)return;var s=document.createElement('span');s.className='nt';s.style.cssText='background:'+p.color+'18;color:'+p.color+';border:1px solid '+p.color+'44';s.textContent=p.number+'.'+p.name;l.appendChild(s)});
var sk2=document.createElement('span');sk2.className='nt';sk2.style.cssText='background:rgba(100,116,139,.15);color:var(--t3);border:1px solid rgba(100,116,139,.3)';sk2.textContent='0.Алгасах';l.appendChild(sk2);
document.getElementById('cM').innerHTML='';asm('Дугаар бичиж саналаа өгнө үү!');document.getElementById('cI').disabled=false;document.getElementById('cI').placeholder='Дугаар (0=алгасах)';document.getElementById('bSE').disabled=false;document.getElementById('hC').classList.add('hidden');uvp(0,d.aliveCount)});

sk.on('voteMessage',function(d){avm(d.text,d.color);if(d.voterId===mi){document.getElementById('cI').disabled=true;document.getElementById('cI').placeholder='Санал өгсөн';document.getElementById('bSE').disabled=true}});
sk.on('voteUpdate',function(d){uvp(d.votedCount,d.totalPlayers)});
function uvp(v,t){document.getElementById('vPB').style.width=(t>0?(v/t)*100:0)+'%';document.getElementById('vPT').textContent=v+'/'+t}

sk.on('voteResult',function(d){
  iv=false;sv('vE');var c=document.getElementById('rEC');var h='<div class="text-center">';
  if(d.tie){h+='<div class="re t"><i class="fas fa-balance-scale text-3xl mb-2" style="color:var(--yellow)"></i><h3 class="text-xl font-bold" style="color:var(--yellow)">Тэнцэв!</h3></div>'}
  else if(d.eliminated&&d.isImpostor&&d.allFound){h+='<div class="re f"><i class="fas fa-check-circle text-4xl mb-2" style="color:var(--green)"></i><h3 class="text-xl font-bold" style="color:var(--green)">ХАЛДАГЧ ОЛДЛОО!</h3><p class="text-lg mt-2">'+d.eliminated.name+' халдагч байсан!</p><p class="text-sm mt-1" style="color:var(--green)">Бүх халдагчид олдлоо!</p></div>'}
  else if(d.eliminated&&d.isImpostor&&!d.allFound){h+='<div class="re f"><i class="fas fa-check-circle text-4xl mb-2" style="color:var(--green)"></i><h3 class="text-xl font-bold" style="color:var(--green)">ХАЛДАГЧ ОЛДЛОО!</h3><p class="text-lg mt-2">'+d.eliminated.name+' халдагч байсан!</p><p class="text-sm mt-1" style="color:var(--yellow)">Гэвч '+d.remaining+' халдагч үлдсэн байна...</p></div>'}
  else if(d.eliminated&&!d.isImpostor&&d.impostorsWin){h+='<div class="re n"><i class="fas fa-times-circle text-4xl mb-2" style="color:var(--red)"></i><h3 class="text-xl font-bold" style="color:var(--red)">БУРУУ ХАССАН!</h3><p class="text-lg mt-2">'+d.eliminated.name+' халдагч биш байсан!</p><p class="text-sm mt-1" style="color:var(--red)">Халдагчид иргэдтэй тэнцэв!</p></div>'}
  else if(d.eliminated&&!d.isImpostor){h+='<div class="re n"><i class="fas fa-times-circle text-4xl mb-2" style="color:var(--red)"></i><h3 class="text-xl font-bold" style="color:var(--red)">БУРУУ ХАССАН!</h3><p class="text-lg mt-2">'+d.eliminated.name+' халдагч биш байсан!</p><p class="text-sm mt-1" style="color:var(--t2)">Амьд иргэд: '+d.aliveCitizens+' | Халдагчид: '+d.aliveImpostors+'</p></div>'}
  h+='<div class="mt-4 text-left"><h4 class="text-sm font-bold mb-2" style="color:var(--t3)">Санал:</h4>';
  var mx2=d.voteResults.length>0?d.voteResults[0].count:1;
  d.voteResults.forEach(function(v){var p=(v.count/mx2)*100;var bc=v.isSkip?'var(--yellow)':(v.color||'var(--t3)');h+='<div class="mb-1"><div class="flex justify-between text-xs"><span class="font-bold" style="color:'+bc+'">'+v.name+'</span><span style="color:var(--t3)">'+v.count+'</span></div><div class="vb"><div class="vf" style="width:'+p+'%;background:'+bc+'"></div></div></div>'});
  h+='</div><div class="mt-5 space-y-2">';
  if(d.canContinue){if(ih)h+='<button id="bNR" class="bc w-full"><i class="fas fa-redo mr-2"></i> Шинэ үе</button><button id="bEG" class="bs w-full"><i class="fas fa-flag-checkered mr-2"></i> Дуусгах</button>';else h+='<p class="text-sm text-center" style="color:var(--t3)">Хост шийдвэрлэхийг хүлээж байна...</p>'}
  else{h+='<p class="text-sm mb-2" style="color:var(--t3)">Халдагчууд: '+d.impostorNames.join(', ')+'</p>';h+='<button id="bBW" class="bp w-full"><i class="fas fa-home mr-2"></i> Дараагийн тоглоом</button><button id="bBL" class="bs w-full mt-2" style="font-size:13px;padding:10px">Лобби руу буцах</button>'}
  h+='</div></div>';c.innerHTML=h;
  var nr=document.getElementById('bNR');if(nr)nr.onclick=function(){sk.emit('newRound',{roomCode:rc,category:sc})};
  var eg=document.getElementById('bEG');if(eg)eg.onclick=function(){sk.emit('endGame',{roomCode:rc})};
  var bw=document.getElementById('bBW');if(bw)bw.onclick=function(){sk.emit('backToWaiting',{roomCode:rc})};
  var bl=document.getElementById('bBL');if(bl)bl.onclick=function(){sk.emit('leaveRoom',{roomCode:rc})};
});

sk.on('gameEnded',function(d){iv=false;sv('vE');var c=document.getElementById('rEC');var h='<div class="text-center">';
if(d.aborted){h+='<div class="re t"><i class="fas fa-exclamation-triangle text-4xl mb-2" style="color:var(--yellow)"></i><h3 class="text-xl font-bold" style="color:var(--yellow)">ТОГЛООМ ЗОГСОЛТОО</h3></div>'}
else if(d.citizensWin){h+='<div style="margin:20px 0"><i class="fas fa-trophy text-6xl mb-4" style="color:var(--green);filter:drop-shadow(0 0 20px rgba(16,185,129,.5))"></i><h2 class="text-2xl font-black" style="color:var(--green);font-family:Orbitron,sans-serif">ИРГЭДИЙН ЯЛАЛТ!</h2><p class="text-sm mt-2" style="color:var(--t2)">Халдагчууд: '+d.impostorNames.join(', ')+'</p><p class="text-xs mt-1" style="color:var(--t3)">'+d.rounds+' үе</p></div>'}
else{h+='<div style="margin:20px 0"><i class="fas fa-skull-crossbones text-6xl mb-4" style="color:var(--red);filter:drop-shadow(0 0 20px rgba(239,68,68,.5))"></i><h2 class="text-2xl font-black" style="color:var(--red);font-family:Orbitron,sans-serif">ХАЛДАГЧИЙН ЯЛАЛТ!</h2><p class="text-sm mt-2" style="color:var(--t2)">Халдагчууд: '+d.impostorNames.join(', ')+'</p><p class="text-xs mt-1" style="color:var(--t3)">'+d.rounds+' үе</p></div>'}
h+='<div class="mt-5 space-y-2"><button id="bBW2" class="bp w-full"><i class="fas fa-home mr-2"></i> Дараагийн тоглоом</button><button id="bBL2" class="bs w-full" style="font-size:13px;padding:10px">Лобби руу буцах</button></div></div>';c.innerHTML=h;
document.getElementById('bBW2').onclick=function(){sk.emit('backToWaiting',{roomCode:rc})};
document.getElementById('bBL2').onclick=function(){sk.emit('leaveRoom',{roomCode:rc})};
});
<\/script>
</body>
</html>`;

app.get('/', function(req, res) { res.setHeader('Content-Type', 'text/html; charset=utf-8'); res.send(HTML_CONTENT); });

// ============================================
// СЕРВЕР
// ============================================
const rooms = {};
const topics = {
  "Спорт":["Футбол","Сагсан бөмбөг","Бокс","Үндэсний бөх","Жүдо","Тэндэрдэгч","Шагай харваа","Карате"],
  "Хоол хүнс":["Бууз","Хуушуур","Цуйван","Банш","Шөл","Тахианы шөл","Гоймон","Цэцэг"],
  "Амралт":["Гадаад аялал","Уулын аялал","Далайн эрэг","Ойн зугаалга","Тэрмийн аялал","Спорт цогцолбор"],
  "Шинжлэх ухаан":["Сансар огторгуй","Динозавр","Химийн урвал","Цахилгаан сүлдэн","Атомын бүтэц","Нано технологи"],
  "Урлаг":["Уран зураг","Дуу хоолой","Бүжгийн урлаг","Кино урлаг","Театр","Хөгжим"],
  "Технологи":["Хиймэл оюун ухаан","Робот техник","Виртуал бодит байдал","Дрон","Гар утас","Блокчейн"],
  "Амьтад":["Ирвэс","Баавгай","Шилүүс","Арслан","Гахай","Таар","Адуу","Үхэр"],
  "Кино":["Марвел кино","Аниме","Хоррор кино","Инээдмийн кино","Япон кино","Уран зөгнөлт"]
};
const PC = ['#ef4444','#3b82f6','#10b981','#f59e0b','#ec4899','#8b5cf6','#06b6d4','#84cc16','#f97316','#6366f1'];

function genCode() { var c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',r=''; for(var i=0;i<6;i++) r+=c[Math.floor(Math.random()*c.length)]; return r; }
function getTopic(cat) { var l=topics[cat]||topics["Спорт"]; return l[Math.floor(Math.random()*l.length)]; }
function gn(i) { return 'Тоглогч '+(i+1); }
function maxImp(n) { return n<=4?1:n<=7?2:3; }
function shuffle(a) { var b=a.slice(); for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t} return b; }

function roomState(r) {
  return {
    players: r.players.map(function(p){ return {id:p.id,isHost:p.id===r.host}; }),
    eliminated: r.eliminated||[],
    phase: r.phase, host: r.host, round: r.round, playerCount: r.players.length
  };
}

io.on('connection', function(socket) {
  console.log('+', socket.id);

  socket.on('createRoom', function(d) {
    var n=(d.playerName||'').trim();
    if(!n){socket.emit('roomError','Нэрээ оруулна уу');return}
    var code=genCode();
    rooms[code]={host:socket.id,players:[{id:socket.id,name:n,role:null,voted:false,votedFor:null}],
      phase:'waiting',impostorIds:[],previousImpostors:[],eliminated:[],
      topic:null,topicCategory:null,round:0,impostorCount:1};
    socket.join(code);
    socket.emit('roomCreated',{roomCode:code,...roomState(rooms[code]),isHost:true});
  });

  socket.on('joinRoom', function(d) {
    var code=(d.roomCode||'').toUpperCase().trim(), n=(d.playerName||'').trim();
    var r=rooms[code];
    if(!n){socket.emit('roomError','Нэрээ оруулна уу');return}
    if(!r){socket.emit('roomError','Тийм кодтой room байхгүй');return}
    if(r.phase!=='waiting'){socket.emit('roomError','Тоглоом эхэлсэн байна');return}
    if(r.players.length>=10){socket.emit('roomError','Room дүүрсэн (10)');return}
    if(r.players.some(function(p){return p.name===n})){socket.emit('roomError','Ийм нэртэй хүн байна');return}
    r.players.push({id:socket.id,name:n,role:null,voted:false,votedFor:null});
    socket.join(code);
    socket.emit('roomJoined',{roomCode:code,...roomState(r),isHost:false});
    io.to(code).emit('playerUpdate',roomState(r));
  });

  socket.on('startGame', function(d) {
    var r=rooms[d.roomCode]; if(!r||r.host!==socket.id) return;
    if(r.players.length<3){socket.emit('roomError','Давуу 3 хүн');return}
    var ic=d.impostorCount||1;
    var mi=maxImp(r.players.length);
    if(ic>mi) ic=mi;
    if(ic<1) ic=1;
    r.impostorCount=ic;

    var topic=getTopic(d.category);
    r.players=shuffle(r.players);

    // ★ Халдагч сонгох - өмнөх халдагчид дахин сонгогдохгүй ★
    var prev=r.previousImpostors||[];
    var candidates=r.players.filter(function(p){return prev.indexOf(p.id)===-1});
    var pool;
    if(candidates.length>=ic){pool=candidates}
    else{pool=r.players} // хүн хангалтгүй бол бүгдээс сонгох
    var shuffled=shuffle(pool);
    var selectedIds=shuffled.slice(0,ic).map(function(p){return p.id});

    r.players.forEach(function(p){
      p.role=selectedIds.indexOf(p.id)!==-1?'impostor':'citizen';
      p.voted=false; p.votedFor=null;
    });
    r.impostorIds=selectedIds;
    r.topic=topic; r.topicCategory=d.category;
    r.phase='roleReveal'; r.round=1; r.eliminated=[];

    console.log('Room '+d.roomCode+' Impostors('+ic+'): '+selectedIds.map(function(id){var i=r.players.findIndex(function(p){return p.id===id});return gn(i)}).join(', '));

    r.players.forEach(function(p,i){
      var fellows=null;
      if(p.role==='impostor'){
        fellows=selectedIds.filter(function(id){return id!==p.id}).map(function(id){var j=r.players.findIndex(function(pp){return pp.id===id});return gn(j)});
      }
      io.to(p.id).emit('gameStarted',{
        role:p.role,
        topic:p.role==='citizen'?topic:null,
        category:d.category,
        playerCount:r.players.length,
        totalImpostors:ic,
        players:r.players.map(function(pl,idx){return{id:pl.id,name:gn(idx),color:PC[idx]}}),
        fellowImpostors:fellows
      });
    });
  });

  socket.on('startDiscussion', function(d) {
    var r=rooms[d.roomCode]; if(!r||r.host!==socket.id) return;
    r.phase='discussion';
    io.to(d.roomCode).emit('discussionStarted',{topic:r.topic,category:r.topicCategory,round:r.round});
  });

  socket.on('chatMessage', function(d) {
    var r=rooms[d.roomCode]; if(!r) return;

    // ★ Санал хураалт ★
    if(r.phase==='voting'){
      var pl=r.players.find(function(p){return p.id===socket.id});
      if(!pl) return;
      if(r.eliminated.indexOf(socket.id)!==-1){socket.emit('roomError','Та хасагдсан');return}
      if(pl.voted){socket.emit('roomError','Санал өгсөн');return}
      var msg=(d.message||'').trim(), num=parseInt(msg);
      if(msg!==num.toString()||isNaN(num)){socket.emit('roomError','Дугаар бичнэ үү');return}
      var vi=r.players.findIndex(function(p){return p.id===socket.id});

      if(num===0){
        pl.voted=true; pl.votedFor='skip';
        io.to(d.roomCode).emit('voteMessage',{text:gn(vi)+' алгаслаа',color:PC[vi],voterId:socket.id});
      } else if(num>=1&&num<=r.players.length){
        var ti=num-1;
        if(ti===vi){socket.emit('roomError','Өөрөөсөө санал өгч болохгүй');return}
        if(r.eliminated.indexOf(r.players[ti].id)!==-1){socket.emit('roomError','Хасагдсан хүн');return}
        pl.voted=true; pl.votedFor=r.players[ti].id;
        io.to(d.roomCode).emit('voteMessage',{text:gn(vi)+' нь '+gn(ti)+'-д саналаа өглөө',color:PC[vi],voterId:socket.id});
      } else {
        socket.emit('roomError','1-'+r.players.length+' хооронд'); return;
      }

      var alive=r.players.filter(function(p){return r.eliminated.indexOf(p.id)===-1});
      var voted=alive.filter(function(p){return p.voted});
      io.to(d.roomCode).emit('voteUpdate',{votedCount:voted.length,totalPlayers:alive.length});
      if(alive.every(function(p){return p.voted})) processVotes(d.roomCode);
      return;
    }

    // ★ Энгийн чат ★
    if(r.phase!=='discussion') return;
    var pl=r.players.find(function(p){return p.id===socket.id}); if(!pl) return;
    var f=d.message.replace(/<[^>]*>/g,'').substring(0,200); if(!f.trim()) return;
    var pi=r.players.findIndex(function(p){return p.id===socket.id});
    var isElim=r.eliminated.indexOf(socket.id)!==-1;
    io.to(d.roomCode).emit('chatMessage',{
      sender:gn(pi), senderId:socket.id, message:f,
      color:isElim?'var(--t3)':(PC[pi]||'#94a3b8'),
      time:new Date().toLocaleTimeString('mn-MN',{hour:'2-digit',minute:'2-digit'}),
      eliminated:isElim
    });
  });

  socket.on('startVoting', function(d) {
    var r=rooms[d.roomCode]; if(!r||r.host!==socket.id) return;
    r.phase='voting';
    r.players.forEach(function(p){p.voted=false;p.votedFor=null});
    var alive=r.players.filter(function(p){return r.eliminated.indexOf(p.id)===-1});
    io.to(d.roomCode).emit('votingStarted',{
      players:r.players.map(function(p,idx){
        return{id:p.id,name:gn(idx),color:PC[idx],number:idx+1,eliminated:r.eliminated.indexOf(p.id)!==-1};
      }),
      aliveCount:alive.length
    });
  });

  function processVotes(code) {
    var r=rooms[code]; if(!r) return;
    var alive=r.players.filter(function(p){return r.eliminated.indexOf(p.id)===-1});
    var vc={};
    alive.forEach(function(p){if(p.votedFor) vc[p.votedFor]=(vc[p.votedFor]||0)+1});
    var mx=0,eid=null,tie=false;
    for(var id in vc){var c=vc[id];if(c>mx){mx=c;eid=id;tie=false}else if(c===mx)tie=true}
    if(eid==='skip') eid=null;

    if(tie||!eid){
      var vr=Object.entries(vc).map(function(e){var i=e[0],c=e[1];if(i==='skip')return{name:'Алгасах',count:c,isSkip:true};var x=r.players.findIndex(function(p){return p.id===i});return{name:gn(x),count:c,color:PC[x],isSkip:false}}).sort(function(a,b){return b.count-a.count});
      io.to(code).emit('voteResult',{tie:true,voteResults:vr,canContinue:true});
      r.phase='discussion'; return;
    }

    var eidx=r.players.findIndex(function(p){return p.id===eid});
    var isImp=r.impostorIds.indexOf(eid)!==-1;
    r.eliminated.push(eid);

    if(isImp){
      r.impostorIds=r.impostorIds.filter(function(id){return id!==eid});
      if(r.impostorIds.length===0){
        // ★ Бүх халдагч олдлоо ★
        var impNames=[gn(eidx)]; // already found
        var prev=r.previousImpostors||[];
        prev.push(eid); r.previousImpostors=prev;
        var vr2=Object.entries(vc).map(function(e){var i=e[0],c=e[1];if(i==='skip')return{name:'Алгасах',count:c,isSkip:true};var x=r.players.findIndex(function(p){return p.id===i});return{name:gn(x),count:c,color:PC[x],isSkip:false}}).sort(function(a,b){return b.count-a.count});
        io.to(code).emit('voteResult',{eliminated:{name:gn(eidx)},isImpostor:true,allFound:true,voteResults:vr2,impostorNames:impNames,canContinue:false});
        r.phase='waiting'; r.players.forEach(function(p){p.role=null;p.voted=false;p.votedFor=null}); r.impostorIds=[]; r.topic=null; r.round=0; r.eliminated=[];
        return;
      } else {
        // ★ Халдагч олдсон, гэвч үлдсэн байна ★
        var remImpNames=r.impostorIds.map(function(id){var x=r.players.findIndex(function(p){return p.id===id});return gn(x)});
        var vr3=Object.entries(vc).map(function(e){var i=e[0],c=e[1];if(i==='skip')return{name:'Алгасах',count:c,isSkip:true};var x=r.players.findIndex(function(p){return p.id===i});return{name:gn(x),count:c,color:PC[x],isSkip:false}}).sort(function(a,b){return b.count-a.count});
        io.to(code).emit('voteResult',{eliminated:{name:gn(eidx)},isImpostor:true,allFound:false,remaining:r.impostorIds.length,voteResults:vr3,impostorNames:remImpNames,canContinue:true});
        r.phase='discussion'; r.players.forEach(function(p){p.voted=false;p.votedFor=null});
        return;
      }
    } else {
      // ★ Буруу хассан ★
      var aliveAfter=r.players.filter(function(p){return r.eliminated.indexOf(p.id)===-1});
      var impAfter=aliveAfter.filter(function(p){return r.impostorIds.indexOf(p.id)!==-1});
      var citAfter=aliveAfter.filter(function(p){return r.impostorIds.indexOf(p.id)===-1});

      if(citAfter.length<=impAfter.length||aliveAfter.length<3){
        // ★ Халдагчид яллаа ★
        var impNames2=r.impostorIds.map(function(id){var x=r.players.findIndex(function(p){return p.id===id});return gn(x)});
        var prev2=r.previousImpostors||[];
        r.impostorIds.forEach(function(id){if(prev2.indexOf(id)===-1)prev2.push(id)});
        r.previousImpostors=prev2;
        var vr4=Object.entries(vc).map(function(e){var i=e[0],c=e[1];if(i==='skip')return{name:'Алгасах',count:c,isSkip:true};var x=r.players.findIndex(function(p){return p.id===i});return{name:gn(x),count:c,color:PC[x],isSkip:false}}).sort(function(a,b){return b.count-a.count});
        io.to(code).emit('gameEnded',{citizensWin:false,impostorNames:impNames2,rounds:r.round});
        r.phase='waiting'; r.players.forEach(function(p){p.role=null;p.voted=false;p.votedFor=null}); r.impostorIds=[]; r.topic=null; r.round=0; r.eliminated=[];
        io.to(code).emit('playerUpdate',roomState(r));
        return;
      } else {
        // ★ Үргэлжилнэ ★
        var vr5=Object.entries(vc).map(function(e){var i=e[0],c=e[1];if(i==='skip')return{name:'Алгасах',count:c,isSkip:true};var x=r.players.findIndex(function(p){return p.id===i});return{name:gn(x),count:c,color:PC[x],isSkip:false}}).sort(function(a,b){return b.count-a.count});
        io.to(code).emit('voteResult',{eliminated:{name:gn(eidx)},isImpostor:false,impostorsWin:false,aliveCitizens:citAfter.length,aliveImpostors:impAfter.length,voteResults:vr5,impostorNames:r.impostorIds.map(function(id){var x=r.players.findIndex(function(p){return p.id===id});return gn(x)}),canContinue:true});
        r.phase='discussion'; r.players.forEach(function(p){p.voted=false;p.votedFor=null});
        return;
      }
    }
  }

  socket.on('newRound', function(d) {
    var r=rooms[d.roomCode]; if(!r||r.host!==socket.id) return;
    if(r.impostorIds.length===0) return;
    var topic=getTopic(d.category);
    r.topic=topic; r.topicCategory=d.category; r.phase='discussion'; r.round++;
    r.players.forEach(function(p){p.voted=false;p.votedFor=null});
    r.players.forEach(function(p){
      io.to(p.id).emit('roundStarted',{round:r.round,topic:p.role==='citizen'?topic:null,category:d.category,role:p.role});
    });
  });

  socket.on('endGame', function(d) {
    var r=rooms[d.roomCode]; if(!r||r.host!==socket.id) return;
    var impNames=r.impostorIds.map(function(id){var i=r.players.findIndex(function(p){return p.id===id});return i>=0?gn(i):'?'});
    var prev=r.previousImpostors||[];
    r.impostorIds.forEach(function(id){if(prev.indexOf(id)===-1)prev.push(id)});
    r.previousImpostors=prev;
    io.to(d.roomCode).emit('gameEnded',{citizensWin:r.impostorIds.length===0,impostorNames:impNames,rounds:r.round});
    r.phase='waiting'; r.players.forEach(function(p){p.role=null;p.voted=false;p.votedFor=null});
    r.impostorIds=[]; r.topic=null; r.round=0; r.eliminated=[];
    io.to(d.roomCode).emit('playerUpdate',roomState(r));
  });

  socket.on('backToWaiting', function(d) {
    var r=rooms[d.roomCode]; if(!r) return;
    socket.emit('showWaiting',roomState(r));
  });

  socket.on('leaveRoom', function(d) {
    var r=rooms[d.roomCode]; if(!r) return;
    var idx=r.players.findIndex(function(p){return p.id===socket.id});
    if(idx===-1) return;
    r.players.splice(idx,1);
    socket.leave(d.roomCode);
    socket.emit('backToLobby');
    if(r.players.length===0){delete rooms[d.roomCode];return}
    if(r.host===socket.id){
      r.host=r.players[0].id;
      io.to(d.roomCode).emit('hostChanged',{newHostId:r.players[0].id});
    }
    if(r.phase!=='waiting'){
      var alive=r.players.filter(function(p){return r.eliminated.indexOf(p.id)===-1});
      if(alive.length<3){
        var impN=r.impostorIds.map(function(id){var i=r.players.findIndex(function(p){return p.id===id});return i>=0?gn(i):'?'});
        var prev=r.previousImpostors||[];
        r.impostorIds.forEach(function(id){if(prev.indexOf(id)===-1)prev.push(id)});
        r.previousImpostors=prev;
        io.to(d.roomCode).emit('gameEnded',{aborted:true,impostorNames:impN,rounds:r.round});
        r.phase='waiting'; r.players.forEach(function(p){p.role=null;p.voted=false;p.votedFor=null});
        r.impostorIds=[]; r.topic=null; r.round=0; r.eliminated=[];
      }
    }
    io.to(d.roomCode).emit('playerUpdate',roomState(r));
  });

  socket.on('disconnect', function() {
    for(var code in rooms){
      var r=rooms[code];
      var idx=r.players.findIndex(function(p){return p.id===socket.id});
      if(idx!==-1){
        r.players.splice(idx,1);
        if(r.players.length===0){delete rooms[code];break}
        if(r.host===socket.id){r.host=r.players[0].id;io.to(code).emit('hostChanged',{newHostId:r.players[0].id})}
        if(r.phase!=='waiting'){
          var alive=r.players.filter(function(p){return r.eliminated.indexOf(p.id)===-1});
          if(alive.length<3){
            var impN=r.impostorIds.map(function(id){var i=r.players.findIndex(function(p){return p.id===id});return i>=0?gn(i):'?'});
            var prev=r.previousImpostors||[];
            r.impostorIds.forEach(function(id){if(prev.indexOf(id)===-1)prev.push(id)});
            r.previousImpostors=prev;
            io.to(code).emit('gameEnded',{aborted:true,impostorNames:impN,rounds:r.round});
            r.phase='waiting'; r.players.forEach(function(p){p.role=null;p.voted=false;p.votedFor:null});
            r.impostorIds=[]; r.topic=null; r.round=0; r.eliminated=[];
          }
        }
        io.to(code).emit('playerUpdate',roomState(r)); break;
      }
    }
  });
});

server.listen(process.env.PORT||3000, function(){console.log('Порт: '+(process.env.PORT||3000))});
