const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ============================================
// HTML ХУУДАС - ШУУД SERVER ДООР
// ============================================
const HTML_CONTENT = `<!DOCTYPE html>
<html lang="mn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>IMPOSTER - Халдагчийг ол</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
  <script src="https://cdn.socket.io/4.7.4/socket.io.min.js"><\/script>
  <script>
    tailwind.config = {
      theme: { extend: { fontFamily: { orbitron: ['Orbitron', 'sans-serif'] } } }
    }
  <\/script>
  <style>
    :root {
      --bg-deep: #060a14;
      --bg-card: rgba(15, 23, 42, 0.85);
      --border: rgba(51, 65, 85, 0.5);
      --accent-red: #ef4444;
      --accent-red-glow: rgba(239, 68, 68, 0.4);
      --accent-cyan: #06b6d4;
      --accent-cyan-glow: rgba(6, 182, 212, 0.4);
      --accent-green: #10b981;
      --accent-yellow: #f59e0b;
      --text-primary: #f1f5f9;
      --text-secondary: #94a3b8;
      --text-muted: #475569;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: var(--bg-deep);
      color: var(--text-primary);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      min-height: 100dvh;
      overflow: hidden;
      position: relative;
    }
    #starfield {
      position: fixed; top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: 0; pointer-events: none;
    }
    .view {
      position: fixed; top: 0; left: 0;
      width: 100%; height: 100dvh;
      z-index: 10;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none;
      transition: opacity 0.4s ease, transform 0.4s ease;
      transform: scale(0.96);
    }
    .view.active {
      opacity: 1; pointer-events: all; transform: scale(1);
    }
    .glass {
      background: var(--bg-card);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      border-radius: 20px;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--accent-red), #dc2626);
      color: white; border: none;
      padding: 14px 32px; border-radius: 14px;
      font-size: 16px; font-weight: 700; cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 20px var(--accent-red-glow);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 30px var(--accent-red-glow); }
    .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
    .btn-secondary {
      background: rgba(51, 65, 85, 0.5);
      color: var(--text-primary);
      border: 1px solid var(--border);
      padding: 14px 32px; border-radius: 14px;
      font-size: 16px; font-weight: 600; cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-secondary:hover { background: rgba(71, 85, 105, 0.5); }
    .btn-cyan {
      background: linear-gradient(135deg, var(--accent-cyan), #0891b2);
      color: white; border: none;
      padding: 14px 32px; border-radius: 14px;
      font-size: 16px; font-weight: 700; cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 20px var(--accent-cyan-glow);
    }
    .btn-cyan:hover { transform: translateY(-2px); }
    .input-field {
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid var(--border);
      color: var(--text-primary);
      padding: 14px 18px; border-radius: 12px;
      font-size: 16px; outline: none;
      transition: border-color 0.2s ease; width: 100%;
    }
    .input-field:focus { border-color: var(--accent-red); }
    .input-field::placeholder { color: var(--text-muted); }
    .lobby-title {
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(48px, 10vw, 80px);
      font-weight: 900; letter-spacing: 8px;
      background: linear-gradient(135deg, var(--accent-red), #ff6b6b, var(--accent-red));
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientShift 3s ease infinite;
      text-align: center;
    }
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .room-code-box {
      font-family: 'Orbitron', sans-serif;
      font-size: 36px; font-weight: 900;
      letter-spacing: 10px;
      color: var(--accent-cyan);
      text-shadow: 0 0 20px var(--accent-cyan-glow);
    }
    .player-avatar {
      width: 48px; height: 48px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 18px;
      color: white; flex-shrink: 0;
      box-shadow: 0 0 15px rgba(0,0,0,0.3);
    }
    .player-card {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 16px; border-radius: 14px;
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid transparent;
      transition: all 0.2s ease;
    }
    .player-card.is-host { border-color: var(--accent-yellow); }
    .category-card {
      padding: 12px 16px; border-radius: 12px;
      background: rgba(30, 41, 59, 0.5);
      border: 2px solid transparent;
      cursor: pointer; transition: all 0.2s ease;
      text-align: center; font-size: 14px;
      font-weight: 600; color: var(--text-secondary);
    }
    .category-card:hover { background: rgba(51, 65, 85, 0.5); color: var(--text-primary); }
    .category-card.selected {
      border-color: var(--accent-red);
      color: var(--accent-red);
      background: rgba(239, 68, 68, 0.1);
    }
    .role-reveal-card { text-align: center; padding: 48px 40px; }
    .role-icon {
      width: 120px; height: 120px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 24px; font-size: 48px;
      animation: rolePulse 1.5s ease infinite;
    }
    .role-icon.impostor {
      background: linear-gradient(135deg, var(--accent-red), #991b1b);
      box-shadow: 0 0 60px var(--accent-red-glow); color: white;
    }
    .role-icon.citizen {
      background: linear-gradient(135deg, var(--accent-cyan), #0e7490);
      box-shadow: 0 0 60px var(--accent-cyan-glow); color: white;
    }
    @keyframes rolePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }
    .chat-area {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .chat-area::-webkit-scrollbar { width: 4px; }
    .chat-area::-webkit-scrollbar-track { background: transparent; }
    .chat-area::-webkit-scrollbar-thumb { background: var(--text-muted); border-radius: 4px; }
    .chat-bubble {
      max-width: 80%; padding: 10px 14px;
      border-radius: 16px; font-size: 14px;
      line-height: 1.5; animation: bubbleIn 0.3s ease;
    }
    .chat-bubble.self {
      align-self: flex-end;
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-bottom-right-radius: 4px;
    }
    .chat-bubble.other {
      align-self: flex-start;
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid var(--border);
      border-bottom-left-radius: 4px;
    }
    .chat-sender { font-size: 11px; font-weight: 700; margin-bottom: 2px; }
    .chat-time { font-size: 10px; color: var(--text-muted); margin-top: 2px; }
    @keyframes bubbleIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .vote-card {
      padding: 16px; border-radius: 16px;
      background: rgba(30, 41, 59, 0.5);
      border: 2px solid transparent;
      cursor: pointer; transition: all 0.2s ease;
      text-align: center;
      display: flex; flex-direction: column;
      align-items: center; gap: 8px;
    }
    .vote-card:hover { background: rgba(51, 65, 85, 0.5); border-color: var(--text-muted); }
    .vote-card.voted { border-color: var(--accent-red); background: rgba(239, 68, 68, 0.1); }
    .vote-card.disabled { opacity: 0.3; cursor: not-allowed; pointer-events: none; }
    .vote-card .player-avatar { width: 56px; height: 56px; font-size: 22px; }
    .result-eliminated {
      padding: 20px; border-radius: 16px;
      text-align: center; margin: 16px 0;
    }
    .result-eliminated.found { background: rgba(16, 185, 129, 0.15); border: 2px solid var(--accent-green); }
    .result-eliminated.not-found { background: rgba(239, 68, 68, 0.15); border: 2px solid var(--accent-red); }
    .result-eliminated.tie { background: rgba(245, 158, 11, 0.15); border: 2px solid var(--accent-yellow); }
    .vote-bar { height: 8px; border-radius: 4px; background: rgba(51, 65, 85, 0.5); overflow: hidden; margin-top: 4px; }
    .vote-bar-fill { height: 100%; border-radius: 4px; transition: width 0.8s ease; }
    #toast-container {
      position: fixed; top: 20px; left: 50%;
      transform: translateX(-50%); z-index: 1000;
      display: flex; flex-direction: column; gap: 8px;
      pointer-events: none;
    }
    .toast {
      padding: 12px 24px; border-radius: 12px;
      font-size: 14px; font-weight: 600;
      backdrop-filter: blur(20px);
      opacity: 0; transform: translateY(-20px);
      transition: all 0.3s ease;
      pointer-events: auto; text-align: center;
      max-width: 90vw;
    }
    .toast.show { opacity: 1; transform: translateY(0); }
    .toast-error { background: rgba(239, 68, 68, 0.9); color: white; }
    .toast-success { background: rgba(16, 185, 129, 0.9); color: white; }
    .toast-info { background: rgba(6, 182, 212, 0.9); color: white; }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--text-muted); border-radius: 3px; }
    @media (max-width: 640px) {
      .lobby-title { letter-spacing: 4px; }
      .room-code-box { font-size: 28px; letter-spacing: 6px; }
    }
  </style>
</head>
<body>
  <canvas id="starfield"></canvas>
  <div id="toast-container"></div>

  <!-- ЛОББИ -->
  <div id="view-lobby" class="view active">
    <div class="w-full max-w-md px-6">
      <div class="text-center mb-10">
        <h1 class="lobby-title">IMPOSTER</h1>
        <p class="text-lg" style="color:var(--text-secondary); letter-spacing:2px;">Халдагчийг олж илрүүл</p>
      </div>
      <div class="flex flex-col gap-3 mb-6">
        <button id="btn-show-create" class="btn-primary w-full text-lg">
          <i class="fas fa-plus mr-2"></i> Room үүсгэх
        </button>
        <button id="btn-show-join" class="btn-secondary w-full text-lg">
          <i class="fas fa-sign-in-alt mr-2"></i> Room-д орох
        </button>
      </div>
      <div id="create-panel" class="glass p-6 hidden">
        <h3 class="text-lg font-bold mb-4 text-center">Room үүсгэх</h3>
        <input id="create-name" class="input-field mb-4" placeholder="Таны нэр" maxlength="15" autocomplete="off">
        <button id="btn-create" class="btn-primary w-full">Үүсгэх</button>
      </div>
      <div id="join-panel" class="glass p-6 hidden">
        <h3 class="text-lg font-bold mb-4 text-center">Room-д орох</h3>
        <input id="join-name" class="input-field mb-3" placeholder="Таны нэр" maxlength="15" autocomplete="off">
        <input id="join-code" class="input-field mb-4" placeholder="Room код (жишээ: ABC123)" maxlength="6" autocomplete="off" style="text-transform:uppercase; font-family:'Orbitron',sans-serif; letter-spacing:4px; text-align:center;">
        <button id="btn-join" class="btn-cyan w-full">Орох</button>
      </div>
      <div class="glass p-5 mt-6">
        <h3 class="font-bold text-sm mb-3 text-center" style="color:var(--accent-yellow)">
          <i class="fas fa-book mr-1"></i> Тоглоомын дүрэм
        </h3>
        <ul class="text-xs space-y-2" style="color:var(--text-secondary); line-height:1.6;">
          <li><i class="fas fa-users mr-2" style="color:var(--accent-cyan)"></i>3-5 хүнээр тоглох боломжтой</li>
          <li><i class="fas fa-user-secret mr-2" style="color:var(--accent-red)"></i>1 хүн санамсаргүй халдагч болно</li>
          <li><i class="fas fa-eye-slash mr-2" style="color:var(--accent-red)"></i>Халдагч сэдвийг мэдэхгүй</li>
          <li><i class="fas fa-comments mr-2" style="color:var(--accent-cyan)"></i>Ярилцаж халдагчийг олно</li>
          <li><i class="fas fa-vote-yea mr-2" style="color:var(--accent-yellow)"></i>Саналаар халдагчийг хасна</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- ХҮЛЭЭЛГИЙН ROOM -->
  <div id="view-waiting" class="view">
    <div class="w-full max-w-lg px-6">
      <div class="glass p-6">
        <div class="text-center mb-6">
          <p class="text-sm mb-2" style="color:var(--text-muted)">Room код нь:</p>
          <div class="flex items-center justify-center gap-3">
            <span id="room-code" class="room-code-box">------</span>
            <button id="btn-copy-code" class="p-3 rounded-xl transition-colors" style="background:rgba(51,65,85,0.5)" title="Хуулах">
              <i class="fas fa-copy" style="color:var(--accent-cyan)"></i>
            </button>
          </div>
          <p class="text-xs mt-2" style="color:var(--text-muted)">Энэ кодыг найзууддаа илгээнэ үү</p>
        </div>
        <div class="mb-5">
          <h3 class="text-sm font-bold mb-3" style="color:var(--text-muted)">
            Тоглогчид (<span id="player-count">0</span>/5)
          </h3>
          <div id="player-list" class="space-y-2"></div>
        </div>
        <div id="category-section" class="mb-5 hidden">
          <h3 class="text-sm font-bold mb-3" style="color:var(--text-muted)">Сэдвийн ангилал сонгох:</h3>
          <div id="category-grid" class="grid grid-cols-4 gap-2"></div>
        </div>
        <div class="text-center">
          <button id="btn-start-game" class="btn-primary w-full" disabled>
            <i class="fas fa-play mr-2"></i> Тоглоом эхлүүлэх
          </button>
          <p id="start-info" class="text-xs mt-2" style="color:var(--text-muted)">Хамгийн багадаа 3 хүн шаардлагатай</p>
        </div>
      </div>
    </div>
  </div>

  <!-- ROLE REVEAL -->
  <div id="view-role" class="view">
    <div class="w-full max-w-md px-6">
      <div class="glass role-reveal-card" id="role-card-content"></div>
    </div>
  </div>

  <!-- ЯРИЛЦЛАГА -->
  <div id="view-discussion" class="view">
    <div class="w-full h-full max-w-lg flex flex-col" style="padding:0;">
      <div class="glass flex flex-col h-full" style="border-radius:0; border-left:none; border-right:none; border-top:none;">
        <div class="p-4 flex items-center justify-between" style="border-bottom:1px solid var(--border);">
          <div class="flex items-center gap-3">
            <span id="round-badge" class="text-xs font-bold px-3 py-1 rounded-full" style="background:rgba(239,68,68,0.2); color:var(--accent-red);">1-р үе</span>
            <span id="discussion-topic" class="text-sm font-bold" style="color:var(--accent-cyan);"></span>
          </div>
          <span id="my-role-badge" class="text-xs font-bold px-3 py-1 rounded-full"></span>
        </div>
        <div id="chat-messages" class="chat-area flex-1"></div>
        <div class="p-3 flex gap-2" style="border-top:1px solid var(--border);">
          <input id="chat-input" class="input-field flex-1" placeholder="Мессеж бичих..." maxlength="200" autocomplete="off">
          <button id="btn-send" class="btn-primary px-4" style="padding:14px 18px;"><i class="fas fa-paper-plane"></i></button>
        </div>
        <div id="host-controls" class="p-3 hidden" style="border-top:1px solid var(--border);">
          <button id="btn-start-voting" class="btn-secondary w-full">
            <i class="fas fa-vote-yea mr-2"></i> Санал хураалт эхлүүлэх
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- САНАЛ ХУРААЛТ -->
  <div id="view-voting" class="view">
    <div class="w-full max-w-lg px-6">
      <div class="glass p-6">
        <div class="text-center mb-5">
          <h2 class="text-xl font-bold mb-2">Хэн халдагч вэ?</h2>
          <div class="flex items-center justify-center gap-2">
            <div class="vote-bar" style="width:200px;">
              <div id="vote-progress-bar" class="vote-bar-fill" style="width:0%; background:var(--accent-red);"></div>
            </div>
            <span id="vote-progress-text" class="text-xs" style="color:var(--text-muted)">0/0</span>
          </div>
        </div>
        <div id="vote-players" class="grid grid-cols-2 gap-3 mb-4"></div>
        <button id="btn-skip-vote" class="btn-secondary w-full">
          <i class="fas fa-forward mr-2"></i> Саналаас татгалзах
        </button>
      </div>
    </div>
  </div>

  <!-- ҮР ДҮН -->
  <div id="view-result" class="view">
    <div class="w-full max-w-lg px-6">
      <div class="glass p-6" id="result-content"></div>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];
    let mouseX = 0, mouseY = 0;
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random(), twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.85 ? '#ef4444' : (Math.random() > 0.7 ? '#06b6d4' : '#ffffff')
      });
    }
    function animateStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const px = (mouseX - canvas.width / 2) * 0.01;
      const py = (mouseY - canvas.height / 2) * 0.01;
      stars.forEach(s => {
        s.opacity += s.twinkleSpeed;
        if (s.opacity > 1 || s.opacity < 0.2) s.twinkleSpeed *= -1;
        s.opacity = Math.max(0.1, Math.min(1, s.opacity));
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
        const dx = s.x + px * s.size, dy = s.y + py * s.size;
        ctx.beginPath(); ctx.arc(dx, dy, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color; ctx.globalAlpha = s.opacity * 0.8; ctx.fill();
        if (s.size > 1.5) {
          ctx.beginPath(); ctx.arc(dx, dy, s.size * 3, 0, Math.PI * 2);
          const g = ctx.createRadialGradient(dx, dy, 0, dx, dy, s.size * 3);
          g.addColorStop(0, s.color); g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g; ctx.globalAlpha = s.opacity * 0.15; ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animateStars);
    }
    animateStars();

    const socket = io();
    const playerColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];
    let myId = '', myName = '', myRole = '', roomCode = '', isHost = false;
    let selectedCategory = 'Спорт', hasVoted = false;
    const categories = ['Спорт', 'Хоол хүнс', 'Амралт', 'Шинжлэх ухаан', 'Урлаг', 'Технологи', 'Амьтад', 'Кино'];

    function showView(id) {
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      document.getElementById(id).classList.add('active');
    }
    function showToast(msg, type) {
      type = type || 'info';
      const t = document.createElement('div');
      t.className = 'toast toast-' + type;
      t.textContent = msg;
      document.getElementById('toast-container').appendChild(t);
      setTimeout(function() { t.classList.add('show'); }, 10);
      setTimeout(function() { t.classList.remove('show'); setTimeout(function() { t.remove(); }, 300); }, 3000);
    }

    document.getElementById('btn-show-create').addEventListener('click', function() {
      document.getElementById('create-panel').classList.toggle('hidden');
      document.getElementById('join-panel').classList.add('hidden');
    });
    document.getElementById('btn-show-join').addEventListener('click', function() {
      document.getElementById('join-panel').classList.toggle('hidden');
      document.getElementById('create-panel').classList.add('hidden');
    });
    document.getElementById('btn-create').addEventListener('click', function() {
      var n = document.getElementById('create-name').value.trim();
      if (!n) { showToast('Нэрээ оруулна уу', 'error'); return; }
      myName = n;
      socket.emit('createRoom', { playerName: n });
    });
    document.getElementById('btn-join').addEventListener('click', function() {
      var n = document.getElementById('join-name').value.trim();
      var c = document.getElementById('join-code').value.trim();
      if (!n) { showToast('Нэрээ оруулна уу', 'error'); return; }
      if (!c) { showToast('Room код оруулна уу', 'error'); return; }
      myName = n;
      socket.emit('joinRoom', { roomCode: c, playerName: n });
    });
    document.getElementById('create-name').addEventListener('keypress', function(e) { if (e.key === 'Enter') document.getElementById('btn-create').click(); });
    document.getElementById('join-code').addEventListener('keypress', function(e) { if (e.key === 'Enter') document.getElementById('btn-join').click(); });
    document.getElementById('btn-copy-code').addEventListener('click', function() {
      var code = document.getElementById('room-code').textContent;
      navigator.clipboard.writeText(code).then(function() { showToast('Код хуулагдлаа!', 'success'); }).catch(function() { showToast('Код: ' + code, 'info'); });
    });

    socket.on('roomCreated', function(data) {
      myId = socket.id; roomCode = data.roomCode; isHost = true;
      document.getElementById('room-code').textContent = data.roomCode;
      showView('view-waiting');
      renderCategoryGrid();
      document.getElementById('category-section').classList.remove('hidden');
      updateWaitingRoom(data);
      showToast('Room үүсгэгдлээ!', 'success');
    });
    socket.on('roomJoined', function(data) {
      myId = socket.id; roomCode = data.roomCode; isHost = false;
      document.getElementById('room-code').textContent = data.roomCode;
      showView('view-waiting');
      document.getElementById('category-section').classList.add('hidden');
      document.getElementById('btn-start-game').style.display = 'none';
      document.getElementById('start-info').style.display = 'none';
      updateWaitingRoom(data);
      showToast('Room-д орлоо!', 'success');
    });
    socket.on('roomError', function(msg) { showToast(msg, 'error'); });
    socket.on('playerUpdate', function(data) { updateWaitingRoom(data); });
    socket.on('hostChanged', function(data) {
      showToast(data.newHostName + ' хост боллоо', 'info');
      if (data.newHostName === myName) {
        isHost = true;
        document.getElementById('category-section').classList.remove('hidden');
        document.getElementById('btn-start-game').style.display = '';
        document.getElementById('start-info').style.display = '';
        renderCategoryGrid();
      }
    });

    function updateWaitingRoom(data) {
      document.getElementById('player-count').textContent = data.playerCount;
      var list = document.getElementById('player-list');
      list.innerHTML = '';
      data.players.forEach(function(p, i) {
        var card = document.createElement('div');
        card.className = 'player-card' + (p.id === data.host ? ' is-host' : '');
        card.innerHTML = '<div class="player-avatar" style="background:' + playerColors[i] + '">' + (i + 1) + '</div><div class="flex-1"><span class="font-bold text-sm">Тоглогч ' + (i + 1) + '</span><span class="text-xs ml-2" style="color:var(--text-muted)">(' + p.name + ')</span>' + (p.id === data.host ? ' <span class="text-xs ml-1" style="color:var(--accent-yellow)"><i class="fas fa-crown"></i></span>' : '') + '</div>';
        list.appendChild(card);
      });
      if (isHost) {
        var btn = document.getElementById('btn-start-game');
        btn.disabled = data.playerCount < 3;
        document.getElementById('start-info').textContent = data.playerCount < 3 ? 'Давуу 3 хүн хэрэгтэй (' + data.playerCount + '/3)' : data.playerCount + ' хүн бэлэн!';
      }
    }

    function renderCategoryGrid() {
      var grid = document.getElementById('category-grid');
      grid.innerHTML = '';
      categories.forEach(function(cat) {
        var card = document.createElement('div');
        card.className = 'category-card' + (cat === selectedCategory ? ' selected' : '');
        card.textContent = cat;
        card.addEventListener('click', function() {
          selectedCategory = cat;
          grid.querySelectorAll('.category-card').forEach(function(c) { c.classList.remove('selected'); });
          card.classList.add('selected');
        });
        grid.appendChild(card);
      });
    }

    document.getElementById('btn-start-game').addEventListener('click', function() {
      if (!selectedCategory) { showToast('Ангилал сонгоно уу', 'error'); return; }
      socket.emit('startGame', { roomCode: roomCode, category: selectedCategory });
    });

    socket.on('gameStarted', function(data) {
      myRole = data.role;
      showView('view-role');
      var card = document.getElementById('role-card-content');
      if (data.role === 'impostor') {
        card.innerHTML = '<div class="role-icon impostor"><i class="fas fa-user-secret"></i></div><h2 class="text-3xl font-black mb-3" style="color:var(--accent-red); font-family:Orbitron,sans-serif;">ХАЛДАГЧ</h2><p class="text-base mb-2" style="color:var(--text-secondary);">Та халдагч боллоо!</p><p class="text-sm" style="color:var(--text-muted);">Сэдвийг мэдэхгүй байна. Мэдэх мэт жүжиглээрэй.</p><div class="mt-6 p-4 rounded-xl" style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3);"><p class="text-xs" style="color:var(--text-muted);">Сэдэв:</p><p class="text-xl font-bold" style="color:var(--accent-red);">???</p></div><p class="text-xs mt-6" style="color:var(--text-muted);">Хост ярилцлагыг эхлүүлтэл хүлээнэ үү...</p>';
      } else {
        card.innerHTML = '<div class="role-icon citizen"><i class="fas fa-user-shield"></i></div><h2 class="text-3xl font-black mb-3" style="color:var(--accent-cyan); font-family:Orbitron,sans-serif;">ИРГЭН</h2><p class="text-base mb-2" style="color:var(--text-secondary);">Та энгийн иргэн боллоо!</p><p class="text-sm" style="color:var(--text-muted);">Халдагч ярилцлагын үед илэрч магадгүй.</p><div class="mt-6 p-4 rounded-xl" style="background:rgba(6,182,212,0.1); border:1px solid rgba(6,182,212,0.3);"><p class="text-xs" style="color:var(--text-muted);">Сэдэв:</p><p class="text-xl font-bold" style="color:var(--accent-cyan);">' + data.topic + '</p></div><p class="text-xs mt-6" style="color:var(--text-muted);">Хост ярилцлагыг эхлүүлтэл хүлээнэ үү...</p>';
      }
      if (isHost) {
        var btn = document.createElement('button');
        btn.className = 'btn-primary w-full mt-6';
        btn.innerHTML = '<i class="fas fa-comments mr-2"></i> Ярилцлагыг эхлүүлэх';
        btn.addEventListener('click', function() { socket.emit('startDiscussion', { roomCode: roomCode }); });
        card.appendChild(btn);
      }
    });

    socket.on('discussionStarted', function(data) {
      showView('view-discussion');
      document.getElementById('round-badge').textContent = data.round + '-р үе';
      document.getElementById('chat-messages').innerHTML = '';
      var topicEl = document.getElementById('discussion-topic');
      topicEl.style.display = '';
      if (myRole === 'citizen') {
        topicEl.textContent = 'Сэдэв: ' + data.topic;
        topicEl.style.color = 'var(--accent-cyan)';
      } else {
        topicEl.textContent = 'Сэдэв: ???';
        topicEl.style.color = 'var(--accent-red)';
      }
      var badge = document.getElementById('my-role-badge');
      if (myRole === 'impostor') {
        badge.textContent = 'ХАЛДАГЧ'; badge.style.background = 'rgba(239,68,68,0.2)'; badge.style.color = 'var(--accent-red)';
      } else {
        badge.textContent = 'ИРГЭН'; badge.style.background = 'rgba(6,182,212,0.2)'; badge.style.color = 'var(--accent-cyan)';
      }
      document.getElementById('host-controls').classList[isHost ? 'remove' : 'add']('hidden');
      addSystemMessage('Ярилцлага эхэллээ!');
      if (myRole === 'citizen') addSystemMessage('Сэдвийг шууд хэлэхгүй, намуухан сануулаад ярилцана уу.');
    });

    socket.on('roundStarted', function(data) {
      showView('view-discussion');
      document.getElementById('round-badge').textContent = data.round + '-р үе';
      document.getElementById('chat-messages').innerHTML = '';
      var topicEl = document.getElementById('discussion-topic');
      topicEl.style.display = '';
      if (data.role === 'citizen') {
        topicEl.textContent = 'Сэдэв: ' + data.topic;
        topicEl.style.color = 'var(--accent-cyan)';
      } else {
        topicEl.textContent = 'Сэдэв: ???';
        topicEl.style.color = 'var(--accent-red)';
      }
      document.getElementById('host-controls').classList[isHost ? 'remove' : 'add']('hidden');
      addSystemMessage(data.round + '-р үе эхэллээ! Шинэ сэдвээр ярилцана.');
    });

    socket.on('chatMessage', function(data) {
      addChatMessage(data.sender, data.message, data.color, data.time, data.senderId === myId);
    });

    function addChatMessage(sender, message, color, time, isSelf) {
      var chat = document.getElementById('chat-messages');
      var bubble = document.createElement('div');
      bubble.className = 'chat-bubble ' + (isSelf ? 'self' : 'other');
      bubble.innerHTML = '<div class="chat-sender" style="color:' + color + '">' + sender + '</div><div>' + message + '</div><div class="chat-time">' + time + '</div>';
      chat.appendChild(bubble);
      chat.scrollTop = chat.scrollHeight;
    }
    function addSystemMessage(text) {
      var chat = document.getElementById('chat-messages');
      var msg = document.createElement('div');
      msg.style.cssText = 'text-align:center; font-size:11px; color:var(--text-muted); padding:8px; font-style:italic;';
      msg.textContent = text;
      chat.appendChild(msg);
    }

    document.getElementById('btn-send').addEventListener('click', sendChat);
    document.getElementById('chat-input').addEventListener('keypress', function(e) { if (e.key === 'Enter') sendChat(); });
    function sendChat() {
      var input = document.getElementById('chat-input');
      var msg = input.value.trim();
      if (!msg) return;
      socket.emit('chatMessage', { roomCode: roomCode, message: msg });
      input.value = '';
    }

    document.getElementById('btn-start-voting').addEventListener('click', function() {
      socket.emit('startVoting', { roomCode: roomCode });
    });

    socket.on('votingStarted', function(data) {
      showView('view-voting');
      hasVoted = false;
      var grid = document.getElementById('vote-players');
      grid.innerHTML = '';
      data.players.forEach(function(p) {
        if (p.id === myId) return;
        var card = document.createElement('div');
        card.className = 'vote-card';
        card.innerHTML = '<div class="player-avatar" style="background:' + p.color + '">' + p.name.replace('Тоглогч ', '') + '</div><span class="font-bold text-sm">' + p.name + '</span>';
        card.addEventListener('click', function() {
          if (hasVoted) return;
          hasVoted = true;
          card.classList.add('voted');
          grid.querySelectorAll('.vote-card:not(.voted)').forEach(function(c) { c.classList.add('disabled'); });
          document.getElementById('btn-skip-vote').disabled = true;
          document.getElementById('btn-skip-vote').style.opacity = '0.4';
          socket.emit('castVote', { roomCode: roomCode, targetId: p.id });
          showToast('Санал өглөө!', 'info');
        });
        grid.appendChild(card);
      });
      updateVoteProgress(0, data.players.length);
    });

    socket.on('voteUpdate', function(data) { updateVoteProgress(data.votedCount, data.totalPlayers); });
    function updateVoteProgress(voted, total) {
      document.getElementById('vote-progress-bar').style.width = (total > 0 ? (voted / total) * 100 : 0) + '%';
      document.getElementById('vote-progress-text').textContent = voted + '/' + total;
    }

    document.getElementById('btn-skip-vote').addEventListener('click', function() {
      if (hasVoted) return;
      hasVoted = true;
      socket.emit('castVote', { roomCode: roomCode, targetId: 'skip' });
      document.querySelectorAll('.vote-card').forEach(function(c) { c.classList.add('disabled'); });
      document.getElementById('btn-skip-vote').disabled = true;
      document.getElementById('btn-skip-vote').style.opacity = '0.4';
      showToast('Саналаас татгалзлаа', 'info');
    });

    socket.on('voteResult', function(data) {
      showView('view-result');
      var c = document.getElementById('result-content');
      var h = '<div class="text-center">';
      if (data.tie) {
        h += '<div class="result-eliminated tie"><i class="fas fa-balance-scale text-3xl mb-2" style="color:var(--accent-yellow)"></i><h3 class="text-xl font-bold" style="color:var(--accent-yellow)">Тэнцэв!</h3><p class="text-sm mt-1" style="color:var(--text-secondary)">Ихэнх санал тэнцэж, хэн ч хасагдаагүй</p></div>';
      } else if (data.eliminated && data.isImpostor) {
        h += '<div class="result-eliminated found"><i class="fas fa-check-circle text-4xl mb-2" style="color:var(--accent-green)"></i><h3 class="text-xl font-bold" style="color:var(--accent-green)">ХАЛДАГЧ ОЛДЛОО!</h3><p class="text-lg mt-2">' + data.eliminated.name + ' халдагч байсан!</p></div>';
      } else if (data.eliminated && !data.isImpostor) {
        h += '<div class="result-eliminated not-found"><i class="fas fa-times-circle text-4xl mb-2" style="color:var(--accent-red)"></i><h3 class="text-xl font-bold" style="color:var(--accent-red)">БУРУУ ХАССАН!</h3><p class="text-lg mt-2">' + data.eliminated.name + ' халдагч биш байсан!</p><p class="text-sm mt-1" style="color:var(--text-muted)">Жинхэнэ халдагч: ' + data.impostorName + '</p></div>';
      }
      h += '<div class="mt-5 text-left"><h4 class="text-sm font-bold mb-3" style="color:var(--text-muted)">Саналын дүн:</h4>';
      var mx = data.voteResults.length > 0 ? data.voteResults[0].count : 1;
      data.voteResults.forEach(function(v) {
        var pct = (v.count / mx) * 100;
        var bc = v.isSkip ? 'var(--accent-yellow)' : (v.color || 'var(--text-muted)');
        h += '<div class="mb-2"><div class="flex justify-between text-sm"><span class="font-bold" style="color:' + bc + '">' + v.name + '</span><span style="color:var(--text-muted)">' + v.count + ' санал</span></div><div class="vote-bar"><div class="vote-bar-fill" style="width:' + pct + '%; background:' + bc + ';"></div></div></div>';
      });
      h += '</div><div class="mt-6 space-y-3">';
      if (isHost) {
        if (!data.impostorFound && !data.tie) h += '<div class="text-center mb-3"><p class="text-sm" style="color:var(--accent-red)">Халдагч олдоогүй! Тоглоом үргэлжилнэ...</p></div>';
        if (!data.impostorFound) h += '<button id="btn-new-round" class="btn-cyan w-full"><i class="fas fa-redo mr-2"></i> Шинэ үе эхлүүлэх</button>';
        h += '<button id="btn-end-game" class="btn-secondary w-full"><i class="fas fa-flag-checkered mr-2"></i> Тоглоом дуусгах</button>';
      } else {
        h += '<p class="text-sm text-center" style="color:var(--text-muted)">Хост шийдвэр гаргах хүлээж байна...</p>';
      }
      h += '</div></div>';
      c.innerHTML = h;
      var nrb = document.getElementById('btn-new-round');
      if (nrb) nrb.addEventListener('click', function() { socket.emit('newRound', { roomCode: roomCode, category: selectedCategory }); });
      var eb = document.getElementById('btn-end-game');
      if (eb) eb.addEventListener('click', function() { socket.emit('endGame', { roomCode: roomCode }); });
    });

    socket.on('gameEnded', function(data) {
      showView('view-result');
      var c = document.getElementById('result-content');
      var h = '<div class="text-center">';
      if (data.aborted) {
        h += '<div class="result-eliminated tie"><i class="fas fa-exclamation-triangle text-4xl mb-2" style="color:var(--accent-yellow)"></i><h3 class="text-xl font-bold" style="color:var(--accent-yellow)">ТОГЛООМ ЗОГСОЛТОО</h3><p class="text-sm mt-1" style="color:var(--text-secondary)">Тоглогч хангалтгүй болсон</p></div>';
      } else if (data.impostorFound) {
        h += '<div style="margin:20px 0;"><i class="fas fa-trophy text-6xl mb-4" style="color:var(--accent-green); filter:drop-shadow(0 0 20px rgba(16,185,129,0.5));"></i><h2 class="text-2xl font-black" style="color:var(--accent-green); font-family:Orbitron,sans-serif;">ИРГЭДИЙН ЯЛАЛТ!</h2><p class="text-base mt-2" style="color:var(--text-secondary);">Халдагч ' + data.impostorName + ' илэрч, иргэд яллаа!</p><p class="text-sm mt-1" style="color:var(--text-muted);">' + data.rounds + ' үе дууслаа</p></div>';
      } else {
        h += '<div style="margin:20px 0;"><i class="fas fa-skull-crossbones text-6xl mb-4" style="color:var(--accent-red); filter:drop-shadow(0 0 20px rgba(239,68,68,0.5));"></i><h2 class="text-2xl font-black" style="color:var(--accent-red); font-family:Orbitron,sans-serif;">ХАЛДАГЧИЙН ЯЛАЛТ!</h2><p class="text-base mt-2" style="color:var(--text-secondary);">Халдагч ' + data.impostorName + ' мэдэгдэлгүй үлдэж, яллаа!</p><p class="text-sm mt-1" style="color:var(--text-muted);">' + data.rounds + ' үе дууслаа</p></div>';
      }
      h += '<div class="mt-6"><button id="btn-back-lobby" class="btn-primary w-full"><i class="fas fa-home mr-2"></i> Лобби руу буцах</button></div></div>';
      c.innerHTML = h;
      document.getElementById('btn-back-lobby').addEventListener('click', function() {
        showView('view-lobby');
        document.getElementById('create-name').value = '';
        document.getElementById('join-name').value = '';
        document.getElementById('join-code').value = '';
        document.getElementById('create-panel').classList.add('hidden');
        document.getElementById('join-panel').classList.add('hidden');
      });
    });
  <\/script>
</body>
</html>`;

// ============================================
// EXPRESS РОУТ
// ============================================
app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(HTML_CONTENT);
});

// ============================================
// ТОГЛООМЫН СЕРВЕР ЛОГИК
// ============================================
const rooms = {};

const topics = {
  "Спорт": ["Футбол", "Сагсан бөмбөг", "Бокс", "Үндэсний бөх", "Жүдо", "Тэндэрдэгч", "Шагай харваа", "Карате"],
  "Хоол хүнс": ["Бууз", "Хуушуур", "Цуйван", "Банш", "Шөл", "Тахианы шөл", "Гоймон", "Цэцэг"],
  "Амралт": ["Гадаад аялал", "Уулын аялал", "Далайн эрэг", "Ойн зугаалга", "Тэрмийн аялал", "Спорт цогцолбор", "Байгалийн цэцэрлэг"],
  "Шинжлэх ухаан": ["Сансар огторгуй", "Динозавр", "Химийн урвал", "Цахилгаан сүлдэн", "Атомын бүтэц", "Нано технологи", "Давтамж"],
  "Урлаг": ["Уран зураг", "Дуу хоолой", "Бүжгийн урлаг", "Кино урлаг", "Театр", "Хөгжим", "Уран баримал"],
  "Технологи": ["Хиймэл оюун ухаан", "Робот техник", "Виртуал бодит байдал", "Дрон", "Гар утас", "Квант компьютер", "Блокчейн"],
  "Амьтад": ["Ирвэс", "Баавгай", "Шилүүс", "Арслан", "Гахай", "Таар", "Адуу", "Үхэр"],
  "Кино": ["Марвел кино", "Аниме", "Хоррор кино", "Инээдмийн кино", "Япон кино", "Уран зөгнөлт", "Гэр бүлийн кино"]
};

const playerColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

function getRandomTopic(category) {
  const list = topics[category] || topics["Спорт"];
  return list[Math.floor(Math.random() * list.length)];
}

// Тоглогчийн дугаарыг нэр болгох
function getGameName(index) {
  return 'Тоглогч ' + (index + 1);
}

function getRoomState(room) {
  return {
    players: room.players.map(function(p) { return { id: p.id, name: p.name }; }),
    phase: room.phase, host: room.host,
    round: room.round, playerCount: room.players.length
  };
}

// Fisher-Yates shuffle - тоглогчдыг санамсаргүй эрэмбэлэх
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

io.on('connection', function(socket) {
  console.log('Холбогдсон:', socket.id);

  // === ROOM ҮҮСГЭХ ===
  socket.on('createRoom', function({ playerName }) {
    if (!playerName || playerName.trim().length < 1) {
      socket.emit('roomError', 'Нэрээ оруулна уу');
      return;
    }
    const roomCode = generateRoomCode();
    rooms[roomCode] = {
      host: socket.id,
      players: [{ id: socket.id, name: playerName.trim(), role: null, voted: false, votedFor: null }],
      phase: 'waiting', impostor: null, topic: null, topicCategory: null,
      round: 0, impostorFound: false
    };
    socket.join(roomCode);
    socket.emit('roomCreated', { roomCode: roomCode, ...getRoomState(rooms[roomCode]), isHost: true });
  });

  // === ROOM-Д ОРОХ ===
  socket.on('joinRoom', function({ roomCode, playerName }) {
    const code = roomCode.toUpperCase().trim();
    const room = rooms[code];
    if (!playerName || playerName.trim().length < 1) { socket.emit('roomError', 'Нэрээ оруулна уу'); return; }
    if (!room) { socket.emit('roomError', 'Тийм кодтой room олдсонгүй'); return; }
    if (room.phase !== 'waiting') { socket.emit('roomError', 'Тоглоом аль хэдийн эхэлсэн байна'); return; }
    if (room.players.length >= 5) { socket.emit('roomError', 'Room дүүрсэн (хамгийн ихдээ 5 хүн)'); return; }
    if (room.players.some(function(p) { return p.name === playerName.trim(); })) { socket.emit('roomError', 'Ийм нэртэй хүн байна'); return; }
    room.players.push({ id: socket.id, name: playerName.trim(), role: null, voted: false, votedFor: null });
    socket.join(code);
    socket.emit('roomJoined', { roomCode: code, ...getRoomState(room), isHost: false });
    io.to(code).emit('playerUpdate', getRoomState(room));
  });

  // === ТОГЛООМ ЭХЛҮҮЛЭХ ===
  socket.on('startGame', function({ roomCode, category }) {
    const room = rooms[roomCode];
    if (!room || room.host !== socket.id) return;
    if (room.players.length < 3) { socket.emit('roomError', 'Хамгийн багадаа 3 хүн шаардлагатай'); return; }

    const topic = getRandomTopic(category);

    // ★★★ ЧУХАЛ: Тоглогчдыг санамсаргүй эрэмбэлэх ★★★
    room.players = shuffleArray(room.players);

    // ★★★ Санамсаргүй нэг халдагч сонгох (host биш ч болно) ★★★
    const impostorIdx = Math.floor(Math.random() * room.players.length);
    console.log('Room ' + roomCode + ' - Халдагч: Тоглогч ' + (impostorIdx + 1) + ' (' + room.players[impostorIdx].name + ')');

    room.players.forEach(function(p, i) {
      p.role = (i === impostorIdx) ? 'impostor' : 'citizen';
      p.voted = false;
      p.votedFor = null;
    });
    room.impostor = room.players[impostorIdx].id;
    room.topic = topic;
    room.topicCategory = category;
    room.phase = 'roleReveal';
    room.round = 1;
    room.impostorFound = false;

    // Тоглогч бүрт role + "Тоглогч X" нэрээр илгээх
    room.players.forEach(function(p) {
      io.to(p.id).emit('gameStarted', {
        role: p.role,
        topic: (p.role === 'citizen') ? topic : null,
        category: category,
        playerCount: room.players.length,
        players: room.players.map(function(pl, idx) {
          return { id: pl.id, name: getGameName(idx), color: playerColors[idx] };
        })
      });
    });
  });

  // === ЯРИЛЦЛАГА ЭХЛҮҮЛЭХ ===
  socket.on('startDiscussion', function({ roomCode }) {
    const room = rooms[roomCode];
    if (!room || room.host !== socket.id) return;
    room.phase = 'discussion';
    io.to(roomCode).emit('discussionStarted', { topic: room.topic, category: room.topicCategory, round: room.round });
  });

  // === ЧАТ МЕССЕЖ - "Тоглогч X" нэрээр явуулах ===
  socket.on('chatMessage', function({ roomCode, message }) {
    const room = rooms[roomCode];
    if (!room || room.phase !== 'discussion') return;
    const player = room.players.find(function(p) { return p.id === socket.id; });
    if (!player) return;
    const filtered = message.replace(/<[^>]*>/g, '').substring(0, 200);
    if (!filtered.trim()) return;
    const playerIdx = room.players.findIndex(function(p) { return p.id === socket.id; });
    io.to(roomCode).emit('chatMessage', {
      sender: getGameName(playerIdx),
      senderId: socket.id,
      message: filtered,
      color: playerColors[playerIdx] || '#94a3b8',
      time: new Date().toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit' })
    });
  });

  // === САНАЛ ХУРААЛТ ЭХЛҮҮЛЭХ - "Тоглогч X" нэрээр ===
  socket.on('startVoting', function({ roomCode }) {
    const room = rooms[roomCode];
    if (!room || room.host !== socket.id) return;
    room.phase = 'voting';
    room.players.forEach(function(p) { p.voted = false; p.votedFor = null; });
    io.to(roomCode).emit('votingStarted', {
      players: room.players.map(function(p, idx) {
        return { id: p.id, name: getGameName(idx), color: playerColors[idx] };
      })
    });
  });

  // === САНАЛ ӨГӨХ ===
  socket.on('castVote', function({ roomCode, targetId }) {
    const room = rooms[roomCode];
    if (!room || room.phase !== 'voting') return;
    const voter = room.players.find(function(p) { return p.id === socket.id; });
    if (!voter || voter.voted) return;
    if (targetId !== 'skip' && targetId === socket.id) return;
    voter.voted = true;
    voter.votedFor = targetId;
    io.to(roomCode).emit('voteUpdate', {
      votedCount: room.players.filter(function(p) { return p.voted; }).length,
      totalPlayers: room.players.length
    });
    if (room.players.every(function(p) { return p.voted; })) processVotes(roomCode);
  });

  // Саналыг боловсруулах - "Тоглогч X" нэрээр
  function processVotes(roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    const voteCount = {};
    room.players.forEach(function(p) {
      if (p.votedFor) voteCount[p.votedFor] = (voteCount[p.votedFor] || 0) + 1;
    });

    let maxVotes = 0, eliminatedId = null, tie = false;
    for (const id in voteCount) {
      const count = voteCount[id];
      if (count > maxVotes) { maxVotes = count; eliminatedId = id; tie = false; }
      else if (count === maxVotes) { tie = true; }
    }
    if (eliminatedId === 'skip') eliminatedId = null;

    const isImpostor = !tie && eliminatedId === room.impostor;
    const eliminatedPlayer = (!tie && eliminatedId) ? room.players.find(function(p) { return p.id === eliminatedId; }) : null;
    if (isImpostor) room.impostorFound = true;
    room.phase = 'result';

    // "Тоглогч X" нэрээр саналын дүн харуулах
    const voteResults = Object.entries(voteCount)
      .map(function(entry) {
        const id = entry[0], count = entry[1];
        if (id === 'skip') return { name: 'Алгасах', count: count, isSkip: true };
        const idx = room.players.findIndex(function(pl) { return pl.id === id; });
        return { name: getGameName(idx), count: count, color: playerColors[idx], isSkip: false };
      })
      .sort(function(a, b) { return b.count - a.count; });

    io.to(roomCode).emit('voteResult', {
      eliminated: eliminatedPlayer ? { name: getGameName(room.players.findIndex(function(p) { return p.id === eliminatedId; })) } : null,
      isImpostor: isImpostor,
      tie: tie,
      voteResults: voteResults,
      impostorName: getGameName(room.players.findIndex(function(p) { return p.id === room.impostor; })),
      impostorFound: room.impostorFound
    });
  }

  // === ШИНЭ ҮЕ ===
  socket.on('newRound', function({ roomCode, category }) {
    const room = rooms[roomCode];
    if (!room || room.host !== socket.id) return;
    if (room.impostorFound) return;
    const topic = getRandomTopic(category);
    room.topic = topic;
    room.topicCategory = category;
    room.phase = 'discussion';
    room.round++;
    room.players.forEach(function(p) { p.voted = false; p.votedFor = null; });
    room.players.forEach(function(p) {
      io.to(p.id).emit('roundStarted', {
        round: room.round,
        topic: (p.role === 'citizen') ? topic : null,
        category: category,
        role: p.role
      });
    });
  });

  // === ТОГЛООМ ДУУСГАХ ===
  socket.on('endGame', function({ roomCode }) {
    const room = rooms[roomCode];
    if (!room || room.host !== socket.id) return;
    const impIdx = room.players.findIndex(function(p) { return p.id === room.impostor; });
    io.to(roomCode).emit('gameEnded', {
      impostorName: getGameName(impIdx),
      impostorFound: room.impostorFound,
      rounds: room.round
    });
    room.phase = 'waiting';
    room.players.forEach(function(p) { p.role = null; p.voted = false; p.votedFor = null; });
    room.impostor = null; room.topic = null; room.round = 0; room.impostorFound = false;
    io.to(roomCode).emit('playerUpdate', getRoomState(room));
  });

  // === ХОЛБОГДОЛ ДУУСАХ ===
  socket.on('disconnect', function() {
    for (const code in rooms) {
      const room = rooms[code];
      const idx = room.players.findIndex(function(p) { return p.id === socket.id; });
      if (idx !== -1) {
        room.players.splice(idx, 1);
        if (room.players.length === 0) {
          delete rooms[code];
        } else {
          if (room.host === socket.id) {
            room.host = room.players[0].id;
            io.to(code).emit('hostChanged', { newHostName: room.players[0].name });
          }
          if (room.phase !== 'waiting' && room.players.length < 3) {
            const impIdx = room.players.findIndex(function(p) { return p.id === room.impostor; });
            io.to(code).emit('gameEnded', {
              impostorName: impIdx >= 0 ? getGameName(impIdx) : '?',
              impostorFound: false, rounds: room.round, aborted: true
            });
            room.phase = 'waiting';
            room.players.forEach(function(p) { p.role = null; p.voted = false; p.votedFor = null; });
            room.impostor = null; room.topic = null; room.round = 0; room.impostorFound = false;
          }
          io.to(code).emit('playerUpdate', getRoomState(room));
        }
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
  console.log('Сервер ажиллаж байна: порт ' + PORT);
});
