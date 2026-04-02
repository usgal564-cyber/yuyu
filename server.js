const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const HTML = `<!DOCTYPE html>
<html lang="mn">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>IMPOSTER</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
<script src="https://cdn.socket.io/4.7.4/socket.io.min.js"><\/script>
<script>tailwind.config={theme:{extend:{fontFamily:{o:['Orbitron','sans-serif']}}}}<\/script>
<style>
:root{--bg:#060a14;--cd:rgba(15,23,42,.85);--bd:rgba(51,65,85,.5);--r:#ef4444;--rg:rgba(239,68,68,.4);--c:#06b6d4;--cg:rgba(6,182,212,.4);--g:#10b981;--y:#f59e0b;--t1:#f1f5f9;--t2:#94a3b8;--t3:#475569}
*{margin:0;padding:0;box-sizing:border-box}body{background:var(--bg);color:var(--t1);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;min-height:100dvh;overflow:hidden}
#sf{position:fixed;inset:0;z-index:0;pointer-events:none}
.v{position:fixed;inset:0;z-index:10;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .4s,transform .4s;transform:scale(.96)}.v.a{opacity:1;pointer-events:all;transform:scale(1)}
.gl{background:var(--cd);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--bd);border-radius:20px}
.bp{background:linear-gradient(135deg,var(--r),#dc2626);color:#fff;border:none;padding:14px 28px;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;box-shadow:0 4px 20px var(--rg)}.bp:hover{transform:translateY(-2px)}.bp:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}
.bs{background:rgba(51,65,85,.5);color:var(--t1);border:1px solid var(--bd);padding:14px 28px;border-radius:14px;font-size:15px;font-weight:600;cursor:pointer;transition:all .2s}.bs:hover{background:rgba(71,85,105,.5)}
.bc{background:linear-gradient(135deg,var(--c),#0891b2);color:#fff;border:none;padding:14px 28px;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;box-shadow:0 4px 20px var(--cg)}.bc:hover{transform:translateY(-2px)}
.if{background:rgba(15,23,42,.9);border:1px solid var(--bd);color:var(--t1);padding:12px 16px;border-radius:12px;font-size:15px;outline:none;transition:border-color .2s;width:100%}.if:focus{border-color:var(--r)}.if::placeholder{color:var(--t3)}
.lt{font-family:'Orbitron',sans-serif;font-size:clamp(44px,10vw,76px);font-weight:900;letter-spacing:8px;background:linear-gradient(135deg,var(--r),#ff6b6b,var(--r));background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gs 3s ease infinite;text-align:center}
@keyframes gs{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.rcb{font-family:'Orbitron',sans-serif;font-size:34px;font-weight:900;letter-spacing:10px;color:var(--c);text-shadow:0 0 20px var(--cg)}
.pa{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:#fff;flex-shrink:0}
.pc{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;background:rgba(30,41,59,.5);border:1px solid transparent}.pc.ih{border-color:var(--y)}
.sc{padding:10px 12px;border-radius:10px;background:rgba(30,41,59,.5);border:2px solid transparent;cursor:pointer;transition:all .2s;text-align:center;font-size:13px;font-weight:600;color:var(--t2)}.sc:hover{background:rgba(51,65,85,.5);color:var(--t1)}.sc.s{border-color:var(--r);color:var(--r);background:rgba(239,68,68,.1)}
.tc{padding:7px 12px;border-radius:10px;background:rgba(30,41,59,.5);border:2px solid transparent;cursor:pointer;transition:all .2s;text-align:center;font-size:12px;font-weight:700;color:var(--t2)}.tc:hover{background:rgba(51,65,85,.5)}.tc.s{border-color:var(--c);color:var(--c);background:rgba(6,182,212,.1)}
.ic{padding:8px 14px;border-radius:10px;background:rgba(30,41,59,.5);border:2px solid transparent;cursor:pointer;transition:all .2s;text-align:center;font-size:13px;font-weight:700;color:var(--t2)}.ic:hover{background:rgba(51,65,85,.5)}.ic.s{border-color:var(--y);color:var(--y);background:rgba(245,158,11,.1)}
.rr{text-align:center;padding:36px 28px}
.ri{width:100px;height:100px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-size:40px;animation:rp 1.5s ease infinite}
.ri.imp{background:linear-gradient(135deg,var(--r),#991b1b);box-shadow:0 0 50px var(--rg);color:#fff}
.ri.cit{background:linear-gradient(135deg,var(--c),#0e7490);box-shadow:0 0 50px var(--cg);color:#fff}
@keyframes rp{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
.tmr{font-family:'Orbitron',sans-serif;font-size:clamp(60px,15vw,96px);font-weight:900;color:var(--c);line-height:1;text-shadow:0 0 40px var(--cg);transition:color .5s}
.tmr.urg{color:var(--r);text-shadow:0 0 40px var(--rg);animation:tp .5s ease infinite alternate}
@keyframes tp{from{opacity:.7;transform:scale(.98)}to{opacity:1;transform:scale(1)}}
.tbar{height:8px;border-radius:4px;background:rgba(51,65,85,.4);overflow:hidden}.tfill{height:100%;border-radius:4px;transition:width 1s linear;background:var(--c)}.tfill.urg{background:var(--r)}
.dp{display:flex;align-items:center;gap:10px;padding:12px;border-radius:12px;background:rgba(30,41,59,.4);border:1px solid transparent}.dp.el{opacity:.3;text-decoration:line-through}
.vc{padding:16px;border-radius:14px;background:rgba(30,41,59,.5);border:2px solid transparent;cursor:pointer;transition:all .2s;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}
.vc:hover{background:rgba(51,65,85,.5);border-color:var(--t3)}.vc:active{transform:scale(.97)}
.vc.voted{border-color:var(--g);background:rgba(16,185,129,.1);cursor:default;pointer-events:none}
.vc .pa{width:48px;height:48px;font-size:20px}
.re{padding:18px;border-radius:14px;text-align:center;margin:14px 0}.re.f{background:rgba(16,185,129,.15);border:2px solid var(--g)}.re.n{background:rgba(239,68,68,.15);border:2px solid var(--r)}.re.t{background:rgba(245,158,11,.15);border:2px solid var(--y)}.re.w{background:rgba(139,92,246,.15);border:2px solid #8b5cf6}
.vb{height:7px;border-radius:4px;background:rgba(51,65,85,.5);overflow:hidden}.vf{height:100%;border-radius:4px;transition:width .8s}
#tc{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:1000;display:flex;flex-direction:column;gap:6px;pointer-events:none}
.to{padding:10px 20px;border-radius:10px;font-size:13px;font-weight:600;backdrop-filter:blur(20px);opacity:0;transform:translateY(-16px);transition:all .3s;pointer-events:auto;text-align:center;max-width:90vw}
.to.sh{opacity:1;transform:translateY(0)}.te{background:rgba(239,68,68,.9);color:#fff}.ts{background:rgba(16,185,129,.9);color:#fff}.ti{background:rgba(6,182,212,.9);color:#fff}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
@media(max-width:640px){.lt{letter-spacing:4px}.rcb{font-size:26px;letter-spacing:6px}}
</style>
</head>
<body>
<canvas id="sf"></canvas><div id="tc"></div>

<div id="vL" class="v a"><div class="w-full max-w-md px-5">
<div class="text-center mb-8"><h1 class="lt">IMPOSTER</h1><p class="text-base" style="color:var(--t2);letter-spacing:2px">Халдагчийг олж илрүүл</p></div>
<div class="flex flex-col gap-3 mb-5">
<button id="bSC" class="bp w-full text-base"><i class="fas fa-plus mr-2"></i>Room үүсгэх</button>
<button id="bSJ" class="bs w-full text-base"><i class="fas fa-sign-in-alt mr-2"></i>Room-д орох</button>
</div>
<div id="pC" class="gl p-5 hidden"><h3 class="text-base font-bold mb-3 text-center">Room үүсгэх</h3><input id="iCN" class="if mb-3" placeholder="Таны нэр" maxlength="15" autocomplete="off"><button id="bCR" class="bp w-full">Үүсгэх</button></div>
<div id="pJ" class="gl p-5 hidden"><h3 class="text-base font-bold mb-3 text-center">Room-д орох</h3><input id="iJN" class="if mb-2" placeholder="Таны нэр" maxlength="15" autocomplete="off"><input id="iJC" class="if mb-3" placeholder="Room код" maxlength="6" autocomplete="off" style="text-transform:uppercase;font-family:'Orbitron',sans-serif;letter-spacing:4px;text-align:center"><button id="bJO" class="bc w-full">Орох</button></div>
<div class="gl p-4 mt-5"><h3 class="font-bold text-xs mb-2 text-center" style="color:var(--y)"><i class="fas fa-book mr-1"></i> Дүрэм</h3>
<ul class="text-xs space-y-1" style="color:var(--t2);line-height:1.5">
<li><i class="fas fa-users mr-1" style="color:var(--c)"></i>3-10 хүнээр togloh</li>
<li><i class="fas fa-user-secret mr-1" style="color:var(--r)"></i>Хост халдагчийн тоог, sedew songono</li>
<li><i class="fas fa-clock mr-1" style="color:var(--c)"></i>100 секунд ярилцана</li>
<li><i class="fas fa-hand-pointer mr-1" style="color:var(--y)"></i>Товшиж sanal ogno</li>
<li><i class="fas fa-redo mr-1" style="color:var(--y)"></i>Халдагч togloom burt oorchlogdono</li>
</ul></div>
</div></div>

<div id="vW" class="v"><div class="w-full max-w-lg px-5"><div class="gl p-5" style="max-height:90dvh;overflow-y:auto">
<div class="text-center mb-4"><p class="text-xs mb-1" style="color:var(--t3)">Room код:</p><div class="flex items-center justify-center gap-2"><span id="rC" class="rcb">------</span><button id="bCP" class="p-2 rounded-lg" style="background:rgba(51,65,85,.5)"><i class="fas fa-copy text-sm" style="color:var(--c)"></i></button></div></div>
<div class="mb-3"><h3 class="text-xs font-bold mb-2" style="color:var(--t3)">Тоглогчид (<span id="pN">0</span>/10)</h3><div id="pL" class="space-y-1"></div></div>
<div id="sS" class="mb-3 hidden"><h3 class="text-xs font-bold mb-1" style="color:var(--t3)">Ангилал:</h3><div id="sG" class="grid grid-cols-4 gap-1"></div></div>
<div id="tS" class="mb-3 hidden"><h3 class="text-xs font-bold mb-1" style="color:var(--t3)">Сэдэв сонгох:</h3><div id="tG" class="flex flex-wrap gap-1"></div></div>
<div id="iS" class="mb-3 hidden"><h3 class="text-xs font-bold mb-1" style="color:var(--t3)">Халдагчийн тоо:</h3><div id="iG" class="flex gap-1"></div></div>
<div class="text-center"><button id="bSG" class="bp w-full" disabled><i class="fas fa-play mr-2"></i>Тоглоом эхлүүлэх</button><p id="sI" class="text-xs mt-1" style="color:var(--t3)">Давуу 3 хүн</p></div>
</div></div></div>

<div id="vR" class="v"><div class="w-full max-w-md px-5"><div class="gl rr" id="rRC"></div></div></div>

<div id="vD" class="v"><div class="w-full max-w-lg px-5"><div class="gl p-5">
<div class="flex items-center justify-between mb-3"><span id="pB" class="text-xs font-bold px-2 py-1 rounded-full" style="background:rgba(239,68,68,.2);color:var(--r)">1-р үе</span><span id="mR" class="text-xs font-bold px-2 py-1 rounded-full"></span></div>
<div id="tpA" class="text-center mb-4"><p class="text-xs" style="color:var(--t3)">Сэдэв:</p><p id="dT" class="text-lg font-bold" style="color:var(--c)"></p></div>
<div class="text-center mb-5"><div id="tV" class="tmr">100</div><p class="text-xs mt-1" style="color:var(--t3)">секунд</p><div class="tbar mt-2"><div id="tF" class="tfill" style="width:100%"></div></div></div>
<h3 class="text-xs font-bold mb-2" style="color:var(--t3)">Тоглогчид:</h3>
<div id="dP" class="grid grid-cols-2 gap-2"></div>
<div id="hC" class="mt-4 hidden"><button id="bSV" class="bs w-full text-sm" style="padding:10px"><i class="fas fa-vote-yea mr-2"></i>Санал хураалт эхлүүлэх</button></div>
</div></div></div>

<div id="vV" class="v"><div class="w-full max-w-lg px-5"><div class="gl p-5">
<h2 class="text-lg font-bold text-center mb-3">Хэн халдагч вэ?</h2>
<div class="flex items-center gap-2 mb-4"><div class="vb flex-1"><div id="vPB" class="vf" style="width:0%;background:var(--y)"></div></div><span id="vPT" class="text-xs font-bold" style="color:var(--t3)">0/0</span></div>
<div id="vC" class="grid grid-cols-2 gap-3 mb-4"></div>
<button id="bSK" class="bs w-full text-sm" style="padding:10px"><i class="fas fa-forward mr-2"></i>Алгасах</button>
</div></div></div>

<div id="vE" class="v"><div class="w-full max-w-lg px-5"><div class="gl p-5" id="rEC"></div></div></div>

<script>
var cv=document.getElementById('sf'),cx=cv.getContext('2d'),st=[],mx=0,my=0;
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener('resize',rs);
document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY});
for(var i=0;i<120;i++)st.push({x:Math.random()*cv.width,y:Math.random()*cv.height,s:Math.random()*1.6+.3,sp:Math.random()*.2+.03,o:Math.random(),ts:Math.random()*.02+.005,c:Math.random()>.85?'#ef4444':Math.random()>.7?'#06b6d4':'#ffffff'});
function as(){cx.clearRect(0,0,cv.width,cv.height);var px=(mx-cv.width/2)*.01,py=(my-cv.height/2)*.01;st.forEach(function(s){s.o+=s.ts;if(s.o>1||s.o<.2)s.ts*=-1;s.o=Math.max(.1,Math.min(1,s.o));s.y+=s.sp;if(s.y>cv.height){s.y=0;s.x=Math.random()*cv.width}var dx=s.x+px*s.s,dy=s.y+py*s.s;cx.beginPath();cx.arc(dx,dy,s.s,0,Math.PI*2);cx.fillStyle=s.c;cx.globalAlpha=s.o*.6;cx.fill()});cx.globalAlpha=1;requestAnimationFrame(as)}as();

var sk=io(),PC=['#ef4444','#3b82f6','#10b981','#f59e0b','#ec4899','#8b5cf6','#06b6d4','#84cc16','#f97316','#6366f1'];
var mi='',mr='',rc='',ih=false,selCat=null,selTop=null,ic=1;
var cats=['Спорт','Хоол хүнс','Амралт','Шинжлэх ухаан','Урлаг','Технологи','Амьтад','Кино'];
var tops={"Спорт":["Футбол","Сагсан бөмбөг","Бокс","Үндэсний бөх","Жүдо","Тэндэрдэгч","Шагай харваа","Карате"],"Хоол хүнс":["Бууз","Хуушуур","Цуйван","Банш","Шөл","Тахианы шөл","Гоймон","Цэцэг"],"Амралт":["Гадаад аялал","Уулын аялал","Далайн эрэг","Ойн зугаалга","Тэрмийн аялал","Спорт цогцолбор"],"Шинжлэх ухаан":["Сансар огторгуй","Динозавр","Химийн урвал","Цахилгаан сүлдэн","Атомын бүтэц","Нано технологи"],"Урлаг":["Уран зураг","Дуу хоолой","Бүжгийн урлаг","Кино урлаг","Театр","Хөгжим"],"Технологи":["Хиймэл оюун ухаан","Робот техник","Виртуал бодит байдал","Дрон","Гар утас","Блокчейн"],"Амьтад":["Ирвэс","Баавгай","Шилүүс","Арслан","Гахай","Таар","Адуу","Үхэр"],"Кино":["Марвел кино","Аниме","Хоррор кино","Инээдмийн кино","Япон кино","Уран зөгнөлт"]};
var tmI=null;
function gn(i){return'Тоглогч '+(i+1)}
function mi2(n){return n<=4?1:n<=6?2:n<=8?3:4}
function sv(id){document.querySelectorAll('.v').forEach(function(v){v.classList.remove('a')});document.getElementById(id).classList.add('a')}
function ts(m,t){t=t||'i';var e=document.createElement('div');e.className='to t'+t;e.textContent=m;document.getElementById('tc').appendChild(e);setTimeout(function(){e.classList.add('sh')},10);setTimeout(function(){e.classList.remove('sh');setTimeout(function(){e.remove()},300)},3000)}

document.getElementById('bSC').onclick=function(){document.getElementById('pC').classList.toggle('hidden');document.getElementById('pJ').classList.add('hidden')};
document.getElementById('bSJ').onclick=function(){document.getElementById('pJ').classList.toggle('hidden');document.getElementById('pC').classList.add('hidden')};
document.getElementById('bCR').onclick=function(){var n=document.getElementById('iCN').value.trim();if(!n){ts('Нэр оруулна уу','e');return}sk.emit('createRoom',{playerName:n})};
document.getElementById('bJO').onclick=function(){var n=document.getElementById('iJN').value.trim(),c=document.getElementById('iJC').value.trim();if(!n){ts('Нэр оруулна уу','e');return}if(!c){ts('Код оруулна уу','e');return}sk.emit('joinRoom',{roomCode:c,playerName:n})};
document.getElementById('iCN').onkeypress=function(e){if(e.key==='Enter')document.getElementById('bCR').click()};
document.getElementById('iJC').onkeypress=function(e){if(e.key==='Enter')document.getElementById('bJO').click()};
document.getElementById('bCP').onclick=function(){var c=document.getElementById('rC').textContent;navigator.clipboard.writeText(c).then(function(){ts('Хуулагдлаа!','s')}).catch(function(){ts(c,'i')})};

sk.on('roomCreated',function(d){mi=sk.id;rc=d.roomCode;ih=true;document.getElementById('rC').textContent=d.roomCode;sv('vW');rgs();riis();selCat=null;selTop=null;uw(d);ts('Room үүсгэгдлээ!','s')});
sk.on('roomJoined',function(d){mi=sk.id;rc=d.roomCode;ih=false;document.getElementById('rC').textContent=d.roomCode;sv('vW');hideH();selCat=null;selTop=null;document.getElementById('tS').classList.add('hidden');document.getElementById('sS').classList.add('hidden');uw(d);ts('Орлоо!','s')});
sk.on('roomError',function(m){ts(m,'e')});
sk.on('playerUpdate',function(d){uw(d)});
sk.on('hostChanged',function(d){ts('Хост солигдлоо','i');if(d.newHostId===mi){ih=true;showH();rgs();riis();uw(d)}});
sk.on('backToLobby',function(){stopTm();sv('vL');document.getElementById('iCN').value='';document.getElementById('iJN').value='';document.getElementById('iJC').value='';document.getElementById('pC').classList.add('hidden');document.getElementById('pJ').classList.add('hidden')});
sk.on('showWaiting',function(d){stopTm();sv('vW');ih=d.host===mi;if(ih){showH();rgs();riis()}else{hideH();document.getElementById('tS').classList.add('hidden');document.getElementById('sS').classList.add('hidden')}uw(d)});

function showH(){document.getElementById('sS').classList.remove('hidden');document.getElementById('tS').classList.remove('hidden');document.getElementById('iS').classList.remove('hidden');document.getElementById('bSG').style.display='';document.getElementById('sI').style.display=''}
function hideH(){document.getElementById('sS').classList.add('hidden');document.getElementById('tS').classList.add('hidden');document.getElementById('iS').classList.add('hidden');document.getElementById('bSG').style.display='none';document.getElementById('sI').style.display='none'}

function uw(d){
document.getElementById('pN').textContent=d.playerCount;var l=document.getElementById('pL');l.innerHTML='';
d.players.forEach(function(p,i){var c=document.createElement('div');c.className='pc'+(p.isHost?' ih':'');var el=d.eliminated&&d.eliminated.indexOf(p.id)!==-1;
c.innerHTML='<div class="pa" style="background:'+PC[i]+(el?';opacity:.3':'')+'">'+(i+1)+'</div><div class="flex-1"><span class="font-bold text-xs" style="'+(el?'text-decoration:line-through;opacity:.4':'')+'">'+gn(i)+'</span>'+(p.isHost?' <i class="fas fa-crown text-xs" style="color:var(--y)"></i>':'')+(el?' <span class="text-xs" style="color:var(--r)">(хасагдсан)</span>':'')+'</div>';l.appendChild(c)});
if(ih){var b=document.getElementById('bSG');b.disabled=d.playerCount<3||!selTop;document.getElementById('sI').textContent=!selCat?'Ангилал сонгоно уу':!selTop?'Сэдэв сонгоно уу':d.playerCount<3?'Давуу 3 хүн':d.playerCount+' хүн бэлэн!';var mx2=mi2(d.playerCount);if(ic>mx2)ic=1;riis()}}

function rgs(){var g=document.getElementById('sG');g.innerHTML='';cats.forEach(function(c){var d=document.createElement('div');d.className='sc'+(c===selCat?' s':'');d.textContent=c;d.onclick=function(){selCat=c;selTop=null;g.querySelectorAll('.sc').forEach(function(x){x.classList.remove('s')});d.classList.add('s');rts();uw({playerCount:parseInt(document.getElementById('pN').textContent)||3,players:[],eliminated:[],host:mi})};g.appendChild(d)})}

function rts(){var g=document.getElementById('tG');g.innerHTML='';if(!selCat){g.parentElement.classList.add('hidden');return}g.parentElement.classList.remove('hidden');
var list=tops[selCat]||[];list.forEach(function(t){var d=document.createElement('div');d.className='tc'+(t===selTop?' s':'');d.textContent=t;d.onclick=function(){selTop=t;g.querySelectorAll('.tc').forEach(function(x){x.classList.remove('s')});d.classList.add('s');uw({playerCount:parseInt(document.getElementById('pN').textContent)||3,players:[],eliminated:[],host:mi})};g.appendChild(d)})}

function riis(){var g=document.getElementById('iG');g.innerHTML='';var pn=parseInt(document.getElementById('pN').textContent)||3;var mx2=mi2(pn);if(ic>mx2)ic=1;for(var i=1;i<=mx2;i++){var d=document.createElement('div');d.className='ic'+(i===ic?' s':'');d.textContent=i;d.onclick=function(){ic=parseInt(this.textContent);g.querySelectorAll('.ic').forEach(function(x){x.classList.remove('s')});this.classList.add('s')};g.appendChild(d)}}

document.getElementById('bSG').onclick=function(){if(!selTop){ts('Сэдэв сонгоно уу','e');return}sk.emit('startGame',{roomCode:rc,topic:selTop,impostorCount:ic})};

function stopTm(){if(tmI){clearInterval(tmI);tmI=null}}
function startTm(dur){stopTm();var rem=dur;var f=document.getElementById('tF');f.style.width='100%';f.classList.remove('urg');document.getElementById('tV').classList.remove('urg');document.getElementById('tV').textContent=rem;document.getElementById('tV').style.color='var(--c)';
tmI=setInterval(function(){rem--;document.getElementById('tV').textContent=rem;var pct=dur>0?(rem/dur)*100:0;f.style.width=pct+'%';if(rem<=10){f.classList.add('urg');document.getElementById('tV').classList.add('urg');document.getElementById('tV').style.color='var(--r)'}if(rem<=0){stopTm();sk.emit('timerExpired',{roomCode:rc})}},1000)}

sk.on('gameStarted',function(d){mr=d.role;sv('vR');var c=document.getElementById('rRC');
if(d.role==='impostor'){var fi='';if(d.fellows&&d.fellows.length>0)fi='<div class="mt-3 p-3 rounded-xl" style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3)"><p class="text-xs" style="color:var(--t3)">Нөхөр халдагч:</p><p class="text-sm font-bold" style="color:var(--r)">'+d.fellows.join(', ')+'</p></div>';
c.innerHTML='<div class="ri imp"><i class="fas fa-user-secret"></i></div><h2 class="text-2xl font-black mb-2" style="color:var(--r);font-family:Orbitron,sans-serif">ХАЛДАГЧ</h2><p class="text-sm" style="color:var(--t2)">Сэдвийг мэдэхгүй. Жүжиглээрэй!</p>'+fi+'<div class="mt-4 p-3 rounded-xl" style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3)"><p class="text-xs" style="color:var(--t3)">Сэдэв:</p><p class="text-lg font-bold" style="color:var(--r)">???</p></div><p class="text-xs mt-4" style="color:var(--t3)">Хост эхлүүлтэл хүлээнэ үү...</p>'}
else{c.innerHTML='<div class="ri cit"><i class="fas fa-user-shield"></i></div><h2 class="text-2xl font-black mb-2" style="color:var(--c);font-family:Orbitron,sans-serif">ИРГЭН</h2><p class="text-sm mb-1" style="color:var(--t2)">Халдагч: '+d.totalImp+' хүн</p><div class="mt-3 p-3 rounded-xl" style="background:rgba(6,182,212,.1);border:1px solid rgba(6,182,212,.3)"><p class="text-xs" style="color:var(--t3)">Сэдэв:</p><p class="text-lg font-bold" style="color:var(--c)">'+d.topic+'</p></div><p class="text-xs mt-4" style="color:var(--t3)">Хост эхлүүлтэл хүлээнэ үү...</p>'}
if(ih){var b=document.createElement('button');b.className='bp w-full mt-4';b.innerHTML='<i class="fas fa-play mr-2"></i>Ярилцлага эхлүүлэх';b.onclick=function(){sk.emit('startDiscussion',{roomCode:rc})};c.appendChild(b)}});

sk.on('discussionStarted',function(d){sv('vD');var b=document.getElementById('pB');b.textContent=d.round+'-р үе';
var t=document.getElementById('dT');if(mr==='citizen'){t.textContent=d.topic;t.style.color='var(--c)';document.getElementById('tpA').style.display=''}else{t.textContent='???';t.style.color='var(--r)';document.getElementById('tpA').style.display=''}
var rb=document.getElementById('mR');if(mr==='impostor'){rb.textContent='ХАЛДАГЧ';rb.style.background='rgba(239,68,68,.2)';rb.style.color='var(--r)'}else{rb.textContent='ИРГЭН';rb.style.background='rgba(6,182,212,.2)';rb.style.color='var(--c)'}
document.getElementById('hC').classList[ih?'remove':'add']('hidden');
renderDP(d.players,d.eliminated);startTm(100)});

sk.on('roundStarted',function(d){sv('vD');var b=document.getElementById('pB');b.textContent=d.round+'-р үе';
var t=document.getElementById('dT');if(mr==='citizen'){t.textContent=d.topic;t.style.color='var(--c)';document.getElementById('tpA').style.display=''}else{t.textContent='???';t.style.color='var(--r)';document.getElementById('tpA').style.display=''}
document.getElementById('hC').classList[ih?'remove':'add']('hidden');renderDP(d.players,d.eliminated);startTm(100)});

function renderDP(players,eliminated){var g=document.getElementById('dP');g.innerHTML='';
players.forEach(function(p,i){var el=eliminated&&eliminated.indexOf(p.id)!==-1;var d=document.createElement('div');d.className='dp'+(el?' el':'');
d.innerHTML='<div class="pa" style="background:'+PC[i]+'">'+(i+1)+'</div><span class="font-bold text-sm">'+gn(i)+'</span>'+(el?' <i class="fas fa-skull text-xs" style="color:var(--r)"></i>':'');g.appendChild(d)})}

document.getElementById('bSV').onclick=function(){stopTm();sk.emit('startVoting',{roomCode:rc})};

sk.on('votingStarted',function(d){sv('vV');document.getElementById('vPT').textContent='0/'+d.aliveCount;document.getElementById('vPB').style.width='0%';
var g=document.getElementById('vC');g.innerHTML='';hasVoted=false;
d.players.forEach(function(p){if(p.eliminated||p.id===mi)return;var d=document.createElement('div');d.className='vc';d.dataset.id=p.id;
d.innerHTML='<div class="pa" style="background:'+p.color+'">'+p.number+'</div><span class="font-bold text-sm">'+p.name+'</span><span class="text-xs" style="color:var(--t3)">товшино</span>';
d.onclick=function(){if(hasVoted)return;hasVoted=true;sk.emit('castVote',{roomCode:rc,targetId:p.id});
this.classList.add('voted');this.innerHTML='<div class="pa" style="background:var(--g)"><i class="fas fa-check"></i></div><span class="font-bold text-sm" style="color:var(--g)">Санал өгсөн</span>';
g.querySelectorAll('.vc').forEach(function(c){if(c!==d&&!c.classList.contains('voted'))c.style.opacity='.3'})};g.appendChild(d)});
document.getElementById('bSK').onclick=function(){if(hasVoted)return;hasVoted=true;sk.emit('castVote',{roomCode:rc,targetId:'skip'});
document.getElementById('bSK').disabled=true;document.getElementById('bSK').style.opacity='.4';document.getElementById('bSK').textContent='Алгасагдсан';g.querySelectorAll('.vc').forEach(function(c){if(!c.classList.contains('voted'))c.style.opacity='.3'})}});

sk.on('voteUpdate',function(d){document.getElementById('vPT').textContent=d.votedCount+'/'+d.totalPlayers;document.getElementById('vPB').style.width=(d.totalPlayers>0?(d.votedCount/d.totalPlayers)*100:0)+'%'});

sk.on('voteResult',function(d){sv('vE');var c=document.getElementById('rEC');var h='<div class="text-center">';
if(d.tie){h+='<div class="re t"><i class="fas fa-balance-scale text-2xl mb-2" style="color:var(--y)"></i><h3 class="text-lg font-bold" style="color:var(--y)">Тэнцэв!</h3></div>'}
else if(d.eliminated&&d.isImpostor&&d.allFound){h+='<div class="re f"><i class="fas fa-check-circle text-3xl mb-2" style="color:var(--g)"></i><h3 class="text-lg font-bold" style="color:var(--g)">ХАЛДАГЧ ОЛДЛОО!</h3><p class="text-sm mt-1">'+d.eliminated.name+'</p></div>'}
else if(d.eliminated&&d.isImpostor){h+='<div class="re f"><i class="fas fa-check-circle text-3xl mb-2" style="color:var(--g)"></i><h3 class="text-lg font-bold" style="color:var(--g)">ОЛДЛОО!</h3><p class="text-sm">'+d.eliminated.name+'</p><p class="text-xs mt-1" style="color:var(--y)">'+d.remaining+' халдагч үлдсэн</p></div>'}
else if(d.eliminated&&!d.isImpostor&&d.impWin){h+='<div class="re w"><i class="fas fa-skull text-3xl mb-2" style="color:#8b5cf6"></i><h3 class="text-lg font-bold" style="color:#8b5cf6">ХАЛДАГЧИЙН ЯЛАЛТ!</h3><p class="text-sm mt-1">'+d.eliminated.name+' халдагч биш байсан</p></div>'}
else if(d.eliminated&&!d.isImpostor){h+='<div class="re n"><i class="fas fa-times-circle text-3xl mb-2" style="color:var(--r)"></i><h3 class="text-lg font-bold" style="color:var(--r)">БУРУУ!</h3><p class="text-sm">'+d.eliminated.name+'</p><p class="text-xs mt-1" style="color:var(--t2)">Иргэн:'+d.ac+' Халдагч:'+d.ai+'</p></div>'}
h+='<div class="mt-3 text-left"><h4 class="text-xs font-bold mb-1" style="color:var(--t3)">Санал:</h4>';
var mx2=d.vr.length>0?d.vr[0].c:1;d.vr.forEach(function(v){var p=(v.c/mx2)*100;var bc=v.sk?'var(--y)':(v.co||'var(--t3)');h+='<div class="mb-1"><div class="flex justify-between text-xs"><span class="font-bold" style="color:'+bc+'">'+v.n+'</span><span style="color:var(--t3)">'+v.c+'</span></div><div class="vb"><div class="vf" style="width:'+p+'%;background:'+bc+'"></div></div></div>'});
h+='</div><div class="mt-4 space-y-2">';
if(d.ct){if(ih)h+='<button id="bNR" class="bc w-full text-sm"><i class="fas fa-redo mr-2"></i>Шинэ үе</button><button id="bEG" class="bs w-full text-sm"><i class="fas fa-flag-checkered mr-2"></i>Дуусгах</button>';else h+='<p class="text-xs text-center" style="color:var(--t3)">Хост шийдвэрлэнэ...</p>'}
else{h+='<button id="bNW" class="bp w-full text-sm"><i class="fas fa-home mr-2"></i>Дараагийн тоглоом</button><button id="bLL" class="bs w-full text-xs mt-1" style="padding:8px">Лобби руу буцах</button>'}
h+='</div></div>';c.innerHTML=h;
var nr=document.getElementById('bNR');if(nr)nr.onclick=function(){sk.emit('newRound',{roomCode:rc})};
var eg=document.getElementById('bEG');if(eg)eg.onclick=function(){sk.emit('endGame',{roomCode:rc})};
var nw=document.getElementById('bNW');if(nw)nw.onclick=function(){sk.emit('backToWaiting',{roomCode:rc})};
var ll=document.getElementById('bLL');if(ll)ll.onclick=function(){sk.emit('leaveRoom',{roomCode:rc})}});

sk.on('gameEnded',function(d){sv('vE');var c=document.getElementById('rEC');var h='<div class="text-center">';
if(d.ab){h+='<div class="re t"><i class="fas fa-exclamation-triangle text-3xl mb-2" style="color:var(--y)"></i><h3 class="text-lg font-bold" style="color:var(--y)">ТОГЛООМ ЗОГСОЛТОО</h3></div>'}
else if(d.cw){h+='<div style="margin:16px 0"><i class="fas fa-trophy text-5xl mb-3" style="color:var(--g);filter:drop-shadow(0 0 16px rgba(16,185,129,.5))"></i><h2 class="text-xl font-black" style="color:var(--g);font-family:Orbitron,sans-serif">ИРГЭДИЙН ЯЛАЛТ!</h2><p class="text-xs mt-2" style="color:var(--t2)">Халдагчид: '+d.in.join(', ')+'</p></div>'}
else{h+='<div style="margin:16px 0"><i class="fas fa-skull-crossbones text-5xl mb-3" style="color:var(--r);filter:drop-shadow(0 0 16px rgba(239,68,68,.5))"></i><h2 class="text-xl font-black" style="color:var(--r);font-family:Orbitron,sans-serif">ХАЛДАГЧИЙН ЯЛАЛТ!</h2><p class="text-xs mt-2" style="color:var(--t2)">Халдагчид: '+d.in.join(', ')+'</p></div>'}
h+='<div class="mt-4 space-y-2"><button id="bNW2" class="bp w-full text-sm"><i class="fas fa-home mr-2"></i>Дараагийн тоглоом</button><button id="bLL2" class="bs w-full text-xs" style="padding:8px">Лобби руу буцах</button></div></div>';c.innerHTML=h;
document.getElementById('bNW2').onclick=function(){sk.emit('backToWaiting',{roomCode:rc})};
document.getElementById('bLL2').onclick=function(){sk.emit('leaveRoom',{roomCode:rc})}});
<\/script>
</body>
</html>`;

app.get('/', function(req, res) { res.setHeader('Content-Type', 'text/html; charset=utf-8'); res.send(HTML); });

var rooms = {};
var topics = {"Спорт":["Футбол","Сагсан бөмбөг","Бокс","Үндэсний бөх","Жүдо","Тэндэрдэгч","Шагай харваа","Карате"],"Хоол хүнс":["Бууз","Хуушуур","Цуйван","Банш","Шөл","Тахианы шөл","Гоймон","Цэцэг"],"Амралт":["Гадаад аялал","Уулын аялал","Далайн эрэг","Ойн зугаалга","Тэрмийн аялал","Спорт цогцолбор"],"Шинжлэх ухаан":["Сансар огторгуй","Динозавр","Химийн урвал","Цахилгаан сүлдэн","Атомын бүтэц","Нано технологи"],"Урлаг":["Уран зураг","Дуу хоолой","Бүжгийн урлаг","Кино урлаг","Театр","Хөгжим"],"Технологи":["Хиймэл оюун ухаан","Робот техник","Виртуал бодит байдал","Дрон","Гар утас","Блокчейн"],"Амьтад":["Ирвэс","Баавгай","Шилүүс","Арслан","Гахай","Таар","Адуу","Үхэр"],"Кино":["Марвел кино","Аниме","Хоррор кино","Инээдмийн кино","Япон кино","Уран зөгнөлт"]};
var PC = ['#ef4444','#3b82f6','#10b981','#f59e0b','#ec4899','#8b5cf6','#06b6d4','#84cc16','#f97316','#6366f1'];

function genCode(){var c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',r='';for(var i=0;i<6;i++)r+=c[Math.floor(Math.random()*c.length)];return r}
function gn(i){return'Тоглогч '+(i+1)}
function maxImp(n){return n<=4?1:n<=6?2:n<=8?3:4}
function shuffle(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t}return b}
function rState(r){return{players:r.players.map(function(p){return{id:p.id,isHost:p.id===r.host}}),eliminated:r.eliminated||[],phase:r.phase,host:r.host,round:r.round,playerCount:r.players.length}}
function saveImp(r){var prev=r.lastImpostors||[];r.impostorIds.forEach(function(id){if(prev.indexOf(id)===-1)prev.push(id)});r.lastImpostors=prev}
function resetRoom(r,code){r.phase='waiting';r.players.forEach(function(p){p.role=null;p.voted=false;p.votedFor=null});r.impostorIds=[];r.topic=null;r.round=0;r.eliminated=[];io.to(code).emit('playerUpdate',rState(r))}

io.on('connection',function(socket){
  console.log('+',socket.id);
  socket.on('createRoom',function(d){var n=(d.playerName||'').trim();if(!n){socket.emit('roomError','Нэр оруулна уу');return}var code=genCode();
    rooms[code]={host:socket.id,players:[{id:socket.id,name:n,role:null,voted:false,votedFor:null}],phase:'waiting',impostorIds:[],lastImpostors:[],eliminated:[],topic:null,round:0,impostorCount:1};
    socket.join(code);socket.emit('roomCreated',{roomCode:code,...rState(rooms[code]),isHost:true})});

  socket.on('joinRoom',function(d){var code=(d.roomCode||'').toUpperCase().trim(),n=(d.playerName||'').trim();var r=rooms[code];
    if(!n){socket.emit('roomError','Нэр оруулна уу');return}if(!r){socket.emit('roomError','Код байхгүй');return}
    if(r.phase!=='waiting'){socket.emit('roomError','Эхэлсэн байна');return}if(r.players.length>=10){socket.emit('roomError','Дүүрсэн');return}
    if(r.players.some(function(p){return p.name.toLowerCase()===n.toLowerCase()})){socket.emit('roomError','Ийм нэртэй хүн байна');return}
    r.players.push({id:socket.id,name:n,role:null,voted:false,votedFor:null});socket.join(code);
    socket.emit('roomJoined',{roomCode:code,...rState(r),isHost:false});io.to(code).emit('playerUpdate',rState(r))});

  socket.on('startGame',function(d){var r=rooms[d.roomCode];if(!r||r.host!==socket.id)return;
    if(r.players.length<3){socket.emit('roomError','Давуу 3 хүн');return}if(!d.topic){socket.emit('roomError','Сэдэв сонгоно уу');return}
    var ic=d.impostorCount||1;var mi=maxImp(r.players.length);if(ic>mi)ic=mi;if(ic<1)ic=1;r.impostorCount=ic;
    r.players=shuffle(r.players);var prev=r.lastImpostors||[];var candidates=r.players.filter(function(p){return prev.indexOf(p.id)===-1});
    var pool=candidates.length>=ic?candidates:r.players;var sel=shuffle(pool).slice(0,ic).map(function(p){return p.id});
    r.players.forEach(function(p){p.role=sel.indexOf(p.id)!==-1?'impostor':'citizen';p.voted=false;p.votedFor=null});
    r.impostorIds=sel;r.topic=d.topic;r.phase='roleReveal';r.round=1;r.eliminated=[];
    console.log('Room '+d.roomCode+' Imp('+ic+'): '+sel.map(function(id){return gn(r.players.findIndex(function(p){return p.id===id}))}).join(', '));
    r.players.forEach(function(p,i){var fellows=null;if(p.role==='impostor'){fellows=sel.filter(function(id){return id!==p.id}).map(function(id){return gn(r.players.findIndex(function(pp){return pp.id===id}))})}
      io.to(p.id).emit('gameStarted',{role:p.role,topic:p.role==='citizen'?d.topic:null,playerCount:r.players.length,totalImp:ic,players:r.players.map(function(pl,idx){return{id:pl.id,name:gn(idx),color:PC[idx]}}),fellows:fellows})})});

  socket.on('startDiscussion',function(d){var r=rooms[d.roomCode];if(!r||r.host!==socket.id)return;r.phase='discussion';
    io.to(d.roomCode).emit('discussionStarted',{topic:r.topic,round:r.round,players:r.players.map(function(p,i){return{id:p.id}}),eliminated:r.eliminated||[]})});

  socket.on('timerExpired',function(d){var r=rooms[d.roomCode];if(!r||r.phase!=='discussion')return;startVotingInt(d.roomCode)});

  socket.on('startVoting',function(d){var r=rooms[d.roomCode];if(!r||r.host!==socket.id)return;startVotingInt(d.roomCode)});

  function startVotingInt(code){var r=rooms[code];if(!r)return;r.phase='voting';r.players.forEach(function(p){p.voted=false;p.votedFor=null});
    var alive=r.players.filter(function(p){return r.eliminated.indexOf(p.id)===-1});
    io.to(code).emit('votingStarted',{players:r.players.map(function(p,idx){return{id:p.id,name:gn(idx),color:PC[idx],number:idx+1,eliminated:r.eliminated.indexOf(p.id)!==-1}}),aliveCount:alive.length})}

  socket.on('castVote',function(d){var r=rooms[d.roomCode];if(!r||r.phase!=='voting')return;
    var pl=r.players.find(function(p){return p.id===socket.id});if(!pl)return;
    if(r.eliminated.indexOf(socket.id)!==-1)return;if(pl.voted)return;
    if(d.targetId==='skip'){pl.voted=true;pl.votedFor='skip'}
    else{var ti=r.players.findIndex(function(p){return p.id===d.targetId});if(ti===-1)return;
      var vi=r.players.findIndex(function(p){return p.id===socket.id});if(ti===vi){socket.emit('roomError','Өөрөөсөө');return}
      if(r.eliminated.indexOf(d.targetId)!==-1){socket.emit('roomError','Хасагдсан');return}
      pl.voted=true;pl.votedFor=d.targetId}
    var alive=r.players.filter(function(p){return r.eliminated.indexOf(p.id)===-1});var voted=alive.filter(function(p){return p.voted});
    io.to(d.roomCode).emit('voteUpdate',{votedCount:voted.length,totalPlayers:alive.length});
    if(alive.every(function(p){return p.voted}))processVotes(d.roomCode)});

  function processVotes(code){var r=rooms[code];if(!r)return;
    var alive=r.players.filter(function(p){return r.eliminated.indexOf(p.id)===-1});var vc={};
    alive.forEach(function(p){if(p.votedFor)vc[p.votedFor]=(vc[p.votedFor]||0)+1});
    var mx=0,eid=null,tie=false;for(var id in vc){var c=vc[id];if(c>mx){mx=c;eid=id;tie=false}else if(c===mx)tie=true}
    if(eid==='skip')eid=null;
    function mkVR(){return Object.entries(vc).map(function(e){var i=e[0],c=e[1];if(i==='skip')return{n:'Алгасах',c:c,sk:true};var x=r.players.findIndex(function(p){return p.id===i});return{n:gn(x),c:c,co:PC[x],sk:false}}).sort(function(a,b){return b.c-a.c})}
    if(tie||!eid){io.to(code).emit('voteResult',{tie:true,vr:mkVR(),ct:true});r.phase='discussion';return}
    var eidx=r.players.findIndex(function(p){return p.id===eid});var isImp=r.impostorIds.indexOf(eid)!==-1;r.eliminated.push(eid);
    if(isImp){r.impostorIds=r.impostorIds.filter(function(id){return id!==eid});
      if(r.impostorIds.length===0){saveImp(r);io.to(code).emit('voteResult',{eliminated:{name:gn(eidx)},isImpostor:true,allFound:true,vr:mkVR(),in:[gn(eidx)],ct:false});resetRoom(r,code);return}
      var rn=r.impostorIds.map(function(id){return gn(r.players.findIndex(function(p){return p.id===id}))});
      io.to(code).emit('voteResult',{eliminated:{name:gn(eidx)},isImpostor:true,allFound:false,remaining:r.impostorIds.length,vr:mkVR(),in:rn,ct:true});
      r.phase='discussion';r.players.forEach(function(p){p.voted=false;p.votedFor=null});return}
    var aliveA=r.players.filter(function(p){return r.eliminated.indexOf(p.id)===-1});var impA=aliveA.filter(function(p){return r.impostorIds.indexOf(p.id)!==-1}).length;var citA=aliveA.length-impA;
    if(citA<=impA||aliveA.length<3){saveImp(r);var impN=r.impostorIds.map(function(id){return gn(r.players.findIndex(function(p){return p.id===id}))});
      io.to(code).emit('voteResult',{eliminated:{name:gn(eidx)},isImpostor:false,impWin:true,vr:mkVR(),in:impN,ct:false});
      io.to(code).emit('gameEnded',{ab:false,cw:false,in:impN,rd:r.round});resetRoom(r,code);return}
    var impN2=r.impostorIds.map(function(id){return gn(r.players.findIndex(function(p){return p.id===id}))});
    io.to(code).emit('voteResult',{eliminated:{name:gn(eidx)},isImpostor:false,impWin:false,ac:citA,ai:impA,vr:mkVR(),in:impN2,ct:true});
    r.phase='discussion';r.players.forEach(function(p){p.voted=false;p.votedFor:null})}

  socket.on('newRound',function(d){var r=rooms[d.roomCode];if(!r||r.host!==socket.id)return;if(r.impostorIds.length===0)return;
    r.phase='discussion';r.round++;r.players.forEach(function(p){p.voted=false;p.votedFor=null});
    r.players.forEach(function(p){io.to(p.id).emit('roundStarted',{round:r.round,topic:p.role==='citizen'?r.topic:null,role:p.role,players:r.players.map(function(pl,idx){return{id:pl.id}}),eliminated:r.eliminated||[]})})});

  socket.on('endGame',function(d){var r=rooms[d.roomCode];if(!r||r.host!==socket.id)return;saveImp(r);
    var impN=r.impostorIds.map(function(id){var i=r.players.findIndex(function(p){return p.id===id});return i>=0?gn(i):'?'});
    io.to(d.roomCode).emit('gameEnded',{ab:false,cw:r.impostorIds.length===0,in:impN,rd:r.round});resetRoom(r,d.roomCode)});

  socket.on('backToWaiting',function(d){var r=rooms[d.roomCode];if(!r)return;socket.emit('showWaiting',rState(r))});
  socket.on('leaveRoom',function(d){var r=rooms[d.roomCode];if(!r)return;var idx=r.players.findIndex(function(p){return p.id===socket.id});if(idx===-1)return;
    r.players.splice(idx,1);socket.leave(d.roomCode);socket.emit('backToLobby');
    if(r.players.length===0){delete rooms[d.roomCode];return}
    if(r.host===socket.id){r.host=r.players[0].id;io.to(d.roomCode).emit('hostChanged',{newHostId:r.players[0].id})}
    if(r.phase!=='waiting'){var al=r.players.filter(function(p){return r.eliminated.indexOf(p.id)===-1});if(al.length<3){saveImp(r);io.to(d.roomCode).emit('gameEnded',{ab:true,in:[],rd:r.round});resetRoom(r,d.roomCode)}}
    io.to(d.roomCode).emit('playerUpdate',rState(r))});

  socket.on('disconnect',function(){for(var code in rooms){var r=rooms[code];var idx=r.players.findIndex(function(p){return p.id===socket.id});
    if(idx!==-1){r.players.splice(idx,1);if(r.players.length===0){delete rooms[code];break}
      if(r.host===socket.id){r.host=r.players[0].id;io.to(code).emit('hostChanged',{newHostId:r.players[0].id})}
      if(r.phase!=='waiting'){var al=r.players.filter(function(p){return r.eliminated.indexOf(p.id)===-1});if(al.length<3){saveImp(r);io.to(code).emit('gameEnded',{ab:true,in:[],rd:r.round});resetRoom(r,code)}}
      io.to(code).emit('playerUpdate',rState(r));break}}});
});
