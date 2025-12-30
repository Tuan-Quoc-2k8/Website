/* ===== TRANSLATIONS ===== */
const translations = {
  vi: {
    gameTitle: '🧩 Xếp hình gạch',
    gameSubtitle: 'Thử thách trí tuệ của bạn!',
    play: '▶️ Chơi ngay',
    settings: '⚙️ Cài đặt',
    instructions: 'Kéo và thả các khối để điền vào bảng',
    themeTitle: '🎨 Chủ đề giao diện',
    themeDefault: 'Mặc định',
    themeOcean: 'Đại dương',
    themeSunset: 'Hoàng hôn',
    themeForest: 'Rừng xanh',
    themeNeon: 'Neon',
    themePurple: 'Tím mộng mơ',
    languageTitle: '🌐 Ngôn ngữ',
    back: '← Trở về',
    gameBoard: 'Game xếp gạch',
    gameHint: 'Đặt gạch để có điểm (ít hơn phá). Khi 1 hàng (dọc/ngang) đầy sẽ phá. Phá liên tiếp nhiều hàng sẽ được nhân combo!',
    bomb: 'Bom',
    swap: 'Xáo trộn',
    replace: 'Thay khối',
    blocksStorage: 'Khối & Lưu trữ',
    queue: 'Hàng chờ (3 khối)',
    storage: 'Kho lưu',
    rotate: 'Xoay',
    storeSwap: 'Lưu/Đổi',
    newGame: 'Bắt đầu lại',
    controls: 'Ghi chú: Kéo & thả khối để đặt. Nhấn hoặc dùng phím Q/E để xoay.',
    selectBlock: 'Chọn khối thay thế',
    gameOver: '🎮 Game Over!',
    gameOverMessage: 'Không còn nước đi hợp lệ!',
    finalScore: 'Điểm cuối cùng:',
    playAgain: '🔄 Chơi lại',
    mainMenu: '🏠 Menu chính'
  },
  en: {
    gameTitle: '🧩 Block Puzzle',
    gameSubtitle: 'Challenge your mind!',
    play: '▶️ Play Now',
    settings: '⚙️ Settings',
    instructions: 'Drag and drop blocks to fill the board',
    themeTitle: '🎨 Theme',
    themeDefault: 'Default',
    themeOcean: 'Ocean',
    themeSunset: 'Sunset',
    themeForest: 'Forest',
    themeNeon: 'Neon',
    themePurple: 'Purple Dream',
    languageTitle: '🌐 Language',
    back: '← Back',
    gameBoard: 'Block Puzzle',
    gameHint: 'Place blocks to score points. When a row/column is full, it will be cleared. Clear multiple lines consecutively for combo multipliers!',
    bomb: 'Bomb',
    swap: 'Shuffle',
    replace: 'Replace',
    blocksStorage: 'Blocks & Storage',
    queue: 'Queue (3 blocks)',
    storage: 'Storage',
    rotate: 'Rotate',
    storeSwap: 'Store/Swap',
    newGame: 'New Game',
    controls: 'Note: Drag & drop blocks to place. Click or use Q/E keys to rotate.',
    selectBlock: 'Select replacement block',
    gameOver: '🎮 Game Over!',
    gameOverMessage: 'No more valid moves!',
    finalScore: 'Final Score:',
    playAgain: '🔄 Play Again',
    mainMenu: '🏠 Main Menu'
  }
};

/* ===== GAME STATE ===== */
const ROWS = 8, COLS = 8;
let currentLanguage = 'vi';
let currentTheme = 'default';

const boardEl = document.getElementById('board');
const queueEl = document.getElementById('queue');
const storageEl = document.getElementById('storage');
const scoreEl = document.getElementById('score');
const rotateBtn = document.getElementById('rotateBtn');
const storeBtn = document.getElementById('storeBtn');
const newGameBtn = document.getElementById('newGame');
const bombBtn = document.getElementById('bombBtn');
const swapBtn = document.getElementById('swapBtn');
const hintBtn = document.getElementById('hintBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const replaceGrid = document.getElementById('replaceGrid');
const replaceClose = document.getElementById('replaceClose');

let board = [];
let queue = [];
let storage = null;
let selected = null;
let score = 0;
let combo = 0;
let missCount = 0;
let powerups = { bomb: 3, swap: 3, hint: 3 };
let gameActive = false;

/* ===== PIECE DEFINITIONS ===== */
const PIECES = [
  { name: 'I', cells: [[0,0],[1,0],[2,0],[3,0]] },
  { name: 'O', cells: [[0,0],[0,1],[1,0],[1,1]] },
  { name: 'L', cells: [[0,0],[1,0],[2,0],[2,1]] },
  { name: 'J', cells: [[0,1],[1,1],[2,1],[2,0]] },
  { name: 'S', cells: [[0,1],[0,2],[1,0],[1,1]] },
  { name: 'Z', cells: [[0,0],[0,1],[1,1],[1,2]] },
  { name: 'T', cells: [[0,1],[1,0],[1,1],[1,2]] },
  { name: 'Dot', cells: [[0,0]] },
  { name: 'Big', cells: [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]] }
];

const THEME_COLORS = {
  default: [
    ['#10b981','#059669'],
    ['#14b8a6','#0d9488'],
    ['#22c55e','#16a34a'],
    ['#84cc16','#65a30d'],
    ['#06b6d4','#0891b2'],
    ['#3b82f6','#2563eb'],
    ['#8b5cf6','#7c3aed']
  ],
  ocean: [
    ['#60a5fa','#3b82f6'],
    ['#38bdf8','#0ea5e9'],
    ['#2dd4bf','#14b8a6'],
    ['#34d399','#10b981'],
    ['#818cf8','#6366f1'],
    ['#a78bfa','#8b5cf6'],
    ['#c084fc','#a855f7']
  ],
  sunset: [
    ['#fbbf24','#f59e0b'],
    ['#fb923c','#f97316'],
    ['#f87171','#ef4444'],
    ['#fb7185','#f43f5e'],
    ['#fca5a5','#f87171'],
    ['#fdba74','#fb923c'],
    ['#fcd34d','#fbbf24']
  ],
  forest: [
    ['#4ade80','#22c55e'],
    ['#34d399','#10b981'],
    ['#6ee7b7','#34d399'],
    ['#86efac','#4ade80'],
    ['#a7f3d0','#6ee7b7'],
    ['#14b8a6','#0d9488'],
    ['#2dd4bf','#14b8a6']
  ],
  neon: [
    ['#f472b6','#ec4899'],
    ['#e879f9','#d946ef'],
    ['#c084fc','#a855f7'],
    ['#a78bfa','#8b5cf6'],
    ['#fb7185','#f43f5e'],
    ['#fbbf24','#f59e0b'],
    ['#34d399','#10b981']
  ],
  purple: [
    ['#c084fc','#a855f7'],
    ['#a78bfa','#8b5cf6'],
    ['#d8b4fe','#c084fc'],
    ['#e9d5ff','#d8b4fe'],
    ['#f0abfc','#e879f9'],
    ['#e879f9','#d946ef'],
    ['#f472b6','#ec4899']
  ]
};

let COLORS = THEME_COLORS.default;

/* ===== HELPER FUNCTIONS ===== */
function assignColor(piece) {
  const grad = COLORS[Math.floor(Math.random() * COLORS.length)];
  piece.color = grad.slice();
  return piece;
}

function randPiece() {
  const p = JSON.parse(JSON.stringify(PIECES[Math.floor(Math.random() * PIECES.length)]));
  return assignColor(p);
}

function translate(key) {
  return translations[currentLanguage][key] || key;
}

function updateTranslations() {
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    el.textContent = translate(key);
  });
}

function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;
  updateTranslations();
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  updateScore();
  updatePowerups();
}

function setTheme(theme) {
  currentTheme = theme;
  document.body.setAttribute('data-theme', theme);
  COLORS = THEME_COLORS[theme] || THEME_COLORS.default;
  document.querySelectorAll('.theme-card').forEach(card => {
    card.classList.toggle('active', card.dataset.theme === theme);
  });
  // Re-render pieces with new colors if game is active
  if (gameActive) {
    queue = queue.map(p => p ? assignColor(JSON.parse(JSON.stringify({name: p.name, cells: p.cells}))) : null);
    if (storage) {
      storage = assignColor(JSON.parse(JSON.stringify({name: storage.name, cells: storage.cells})));
    }
    renderQueue();
    renderStorage();
    renderBoard();
  }
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

function flash(msg) {
  const old = document.createElement('div');
  old.textContent = msg;
  old.style.cssText = 'position:fixed;left:50%;top:20px;transform:translateX(-50%);padding:8px 12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.06);border-radius:8px;z-index:2000';
  document.body.appendChild(old);
  setTimeout(() => old.remove(), 1400);
}

function showCenterMessage(text) {
  const msg = document.getElementById('centerMessage');
  msg.textContent = text;
  msg.classList.add('show');
  setTimeout(() => {
    msg.classList.remove('show');
  }, 1500);
}

/* ===== GAME INITIALIZATION ===== */
function init() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  queue = [randPiece(), randPiece(), randPiece()];
  storage = null;
  selected = null;
  score = 0;
  combo = 0;
  missCount = 0;
  powerups = { bomb: 3, swap: 3, hint: 3 };
  gameActive = true;
  updateScore();
  updatePowerups();
  renderBoard();
  renderQueue();
  renderStorage();
  hideReplaceModal();
}

/* ===== RENDER FUNCTIONS ===== */
function renderBoard() {
  boardEl.innerHTML = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      const val = board[r][c];
      if (val) {
        cell.classList.add('filled');
        if (Array.isArray(val)) {
          cell.style.background = `linear-gradient(180deg, ${val[0]}, ${val[1]})`;
        }
      }
      cell.addEventListener('click', onCellClick);
      cell.addEventListener('mouseenter', () => showPreview(r, c));
      cell.addEventListener('mouseleave', () => clearPreview());
      boardEl.appendChild(cell);
    }
  }
}

function renderQueue() {
  queueEl.innerHTML = '';
  queue.forEach((p, i) => {
    const slot = document.createElement('div');
    slot.className = 'piece-slot';
    if (!p) slot.classList.add('disabled');
    const mini = createMiniPiece(p);
    slot.appendChild(mini);

    slot.addEventListener('click', () => selectQueuePiece(i));

    slot.draggable = !!p;
    slot.addEventListener('dragstart', (e) => {
      if (!p) { e.preventDefault(); return; }
      selected = { piece: p, from: 'queue', idx: i };
      highlightSelected();
      e.dataTransfer.setData('text/plain', 'piece');
      e.dataTransfer.effectAllowed = 'move';
      const dragImage = createDragImage(p);
      e.dataTransfer.setDragImage(dragImage, dragImage.width / 2, dragImage.height / 2);
    });

    slot.addEventListener('dragover', e => { e.preventDefault(); slot.classList.add('highlight'); });
    slot.addEventListener('dragleave', () => slot.classList.remove('highlight'));
    slot.addEventListener('drop', e => {
      e.preventDefault();
      slot.classList.remove('highlight');
      if (!selected) return;
      if (selected.from === 'queue') {
        const tmp = queue[i];
        queue[i] = queue[selected.idx];
        queue[selected.idx] = tmp;
      } else if (selected.from === 'storage') {
        const tmp = queue[i];
        queue[i] = storage;
        storage = tmp ? tmp : null;
      }
      selected = null;
      renderQueue();
      renderStorage();
      highlightSelected();
    });

    queueEl.appendChild(slot);
  });
  renderStorage();
  highlightSelected();
}

function renderStorage() {
  storageEl.innerHTML = '';
  const slot = document.createElement('div');
  slot.className = 'piece-slot';
  const mini = createMiniPiece(storage);
  slot.appendChild(mini);

  slot.addEventListener('click', () => {
    if (storage) {
      selected = { piece: storage, from: 'storage' };
      highlightSelected();
    } else {
      flash(currentLanguage === 'vi' ? 'Kho trống.' : 'Storage empty.');
    }
  });

  slot.draggable = !!storage;
  slot.addEventListener('dragstart', (e) => {
    if (!storage) { e.preventDefault(); return; }
    selected = { piece: storage, from: 'storage' };
    e.dataTransfer.setData('text/plain', 'piece');
    e.dataTransfer.effectAllowed = 'move';
    const dragImage = createDragImage(storage);
    e.dataTransfer.setDragImage(dragImage, dragImage.width / 2, dragImage.height / 2);
  });

  slot.addEventListener('dragover', e => { e.preventDefault(); slot.classList.add('highlight'); });
  slot.addEventListener('dragleave', () => slot.classList.remove('highlight'));
  slot.addEventListener('drop', e => {
    e.preventDefault();
    slot.classList.remove('highlight');
    if (!selected) return;
    if (selected.from === 'queue') {
      const idx = selected.idx;
      const tmp = storage;
      storage = queue[idx];
      queue[idx] = tmp ? tmp : randPiece();
    }
    selected = null;
    renderQueue();
    renderStorage();
    highlightSelected();
  });

  storageEl.appendChild(slot);
}

function createMiniPiece(piece) {
  const mini = document.createElement('div');
  mini.className = 'mini-piece';
  for (let rr = 0; rr < 4; rr++) {
    for (let cc = 0; cc < 4; cc++) {
      const mc = document.createElement('div');
      mc.className = 'mini-cell';
      if (piece && piece.cells.some(([ar, ac]) => ar === rr && ac === cc)) {
        mc.classList.add('on');
        if (piece.color) {
          mc.style.background = `linear-gradient(180deg, ${piece.color[0]}, ${piece.color[1]})`;
        }
      }
      mini.appendChild(mc);
    }
  }
  return mini;
}

function createDragImage(piece) {
  const cellSize = 18;
  const pad = 4;
  const size = 4;
  const w = size * cellSize + pad * 2;
  const h = size * cellSize + pad * 2;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  piece.cells.forEach(([r, c]) => {
    const x = pad + c * cellSize;
    const y = pad + r * cellSize;
    const grad = ctx.createLinearGradient(x, y, x, y + cellSize);
    const top = (piece.color && piece.color[0]) ? piece.color[0] : '#12b886';
    const bottom = (piece.color && piece.color[1]) ? piece.color[1] : '#0ea36b';
    grad.addColorStop(0, top);
    grad.addColorStop(1, bottom);
    ctx.fillStyle = grad;
    ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
  });
  return canvas;
}

/* ===== PIECE INTERACTION ===== */
function selectQueuePiece(i) {
  if (!queue[i]) return;
  selected = { piece: queue[i], from: 'queue', idx: i };
  highlightSelected();
}

function highlightSelected() {
  Array.from(queueEl.children).forEach((el, idx) => {
    el.style.outline = (selected && selected.from === 'queue' && selected.idx === idx) ? '2px solid rgba(16,185,129,.6)' : '';
  });
  storageEl.style.outline = (selected && selected.from === 'storage') ? '2px solid rgba(16,185,129,.6)' : '';
}

function rotatePiece(p) {
  const rotated = p.cells.map(([r, c]) => [c, -r]);
  const minR = Math.min(...rotated.map(x => x[0]));
  const minC = Math.min(...rotated.map(x => x[1]));
  p.cells = rotated.map(([r, c]) => [r - minR, c - minC]);
}

function showPreview(r, c) {
  if (!selected) return;
  clearPreview();
  const toFill = selected.piece.cells.map(([dr, dc]) => [r + dr, c + dc]);
  const out = toFill.some(([rr, cc]) => rr < 0 || cc < 0 || rr >= ROWS || cc >= COLS);
  const collide = !out && toFill.some(([rr, cc]) => board[rr][cc]);
  toFill.forEach(([rr, cc]) => {
    if (rr >= 0 && cc >= 0 && rr < ROWS && cc < COLS) {
      const idx = rr * COLS + cc;
      const cell = boardEl.children[idx];
      if (cell) {
        if (out || collide) cell.classList.add('preview-bad');
        else cell.classList.add('preview-ok');
      }
    }
  });
}

function clearPreview() {
  Array.from(boardEl.children).forEach(cell => cell.classList.remove('preview-ok', 'preview-bad'));
}

/* ===== GAME LOGIC ===== */
function placePieceAt(r, c) {
  if (!selected) {
    flash(currentLanguage === 'vi' ? 'Chọn 1 khối.' : 'Select a block.');
    return false;
  }
  const cells = selected.piece.cells;
  const toFill = cells.map(([dr, dc]) => [r + dr, c + dc]);
  const out = toFill.some(([rr, cc]) => rr < 0 || cc < 0 || rr >= ROWS || cc >= COLS);
  const collide = toFill.some(([rr, cc]) => board[rr][cc]);
  if (out || collide) {
    flash(currentLanguage === 'vi' ? 'Không thể đặt.' : 'Cannot place.');
    return false;
  }

  toFill.forEach(([rr, cc]) => {
    board[rr][cc] = selected.piece.color ? selected.piece.color.slice() : true;
    score += 1;
  });

  if (selected.from === 'queue') {
    queue[selected.idx] = randPiece();
  } else if (selected.from === 'storage') {
    storage = null;
  }
  selected = null;
  clearPreview();
  highlightSelected();
  renderBoard();
  renderQueue();
  renderStorage();

  const cleared = clearLines();
  if (cleared) {
    missCount = 0;
  } else {
    missCount++;
    if (missCount >= 3) {
      if (combo > 0) {
        flash(currentLanguage === 'vi' ? `💔 Mất combo x${combo} vì không phá hàng trong 3 lượt!` : `💔 Lost combo x${combo} from 3 turns without clearing!`);
        combo = 0;
        updateScore();
      }
      missCount = 0;
    }
  }
  updateScore();
  
  // Check game over
  setTimeout(() => checkGameOver(), 500);
  return true;
}

function clearLines() {
  const fullRows = [];
  for (let r = 0; r < ROWS; r++) {
    if (board[r].every(v => v)) fullRows.push(r);
  }
  const fullCols = [];
  for (let c = 0; c < COLS; c++) {
    let all = true;
    for (let r = 0; r < ROWS; r++) {
      if (!board[r][c]) {
        all = false;
        break;
      }
    }
    if (all) fullCols.push(c);
  }
  if (fullRows.length === 0 && fullCols.length === 0) return false;

  fullRows.forEach(r => {
    for (let c = 0; c < COLS; c++) {
      board[r][c] = false;
      const el = boardEl.children[r * COLS + c];
      if (el) el.classList.add('clearing');
    }
  });
  fullCols.forEach(c => {
    for (let r = 0; r < ROWS; r++) {
      board[r][c] = false;
      const el = boardEl.children[r * COLS + c];
      if (el) el.classList.add('clearing');
    }
  });

  const removed = fullRows.length * COLS + fullCols.length * ROWS - (fullRows.length * fullCols.length);
  combo++;
  
  // Enhanced combo scoring system:
  // - Base points: 10 per removed cell
  // - Combo multiplier: 1.5x, 2x, 2.5x, 3x, 3.5x, 4x... (increases by 0.5x per combo)
  // - Combo 1: 1.5x multiplier (50% bonus)
  // - Combo 2: 2x multiplier (100% bonus)
  // - Combo 3: 2.5x multiplier (150% bonus)
  // - Combo 5: 3.5x multiplier (250% bonus)
  // - Combo 10: 6x multiplier (500% bonus!)
  const comboMult = 1 + combo * 0.5;
  const basePoints = removed * 10;
  const bonusPoints = Math.floor(basePoints * (comboMult - 1));
  score += Math.floor(basePoints * comboMult);
  
  // Show combo bonus message
  if (combo > 1) {
    const comboMsg = currentLanguage === 'vi' 
      ? `🔥 Combo x${combo}! +${bonusPoints} điểm thưởng!`
      : `🔥 Combo x${combo}! +${bonusPoints} bonus points!`;
    setTimeout(() => flash(comboMsg), 200);
  }

  const totalCleared = fullRows.length + fullCols.length;
  if (totalCleared >= 4) {
    showCenterMessage('💥 Amazing!');
  } else if (totalCleared === 3) {
    showCenterMessage('🔥 Great!');
  } else if (totalCleared === 2) {
    showCenterMessage('👍 Good!');
  }

  updateScore();
  setTimeout(() => renderBoard(), 400);
  return true;
}

function updateScore() {
  const scoreText = currentLanguage === 'vi' ? 'Điểm' : 'Score';
  const comboText = 'Combo';
  scoreEl.textContent = `${scoreText}: ${score} • ${comboText}: ${combo}`;
  
  // Update combo multiplier display
  const comboMultEl = document.getElementById('comboMultiplier');
  if (combo > 0) {
    const multiplier = (1 + combo * 0.5).toFixed(1);
    const multText = currentLanguage === 'vi' ? 'Nhân' : 'Multiplier';
    comboMultEl.textContent = `🔥 ${multText} x${multiplier}`;
    comboMultEl.style.opacity = '1';
  } else {
    comboMultEl.style.opacity = '0';
  }
}

function updatePowerups() {
  const bombText = translate('bomb');
  const swapText = translate('swap');
  const replaceText = translate('replace');
  bombBtn.innerHTML = `💣 ${bombText} (x${powerups.bomb})`;
  swapBtn.innerHTML = `🔃 ${swapText} (x${powerups.swap})`;
  hintBtn.innerHTML = `🎲 ${replaceText} (x${powerups.hint})`;
  bombBtn.disabled = powerups.bomb <= 0;
  swapBtn.disabled = powerups.swap <= 0;
  hintBtn.disabled = powerups.hint <= 0;
}

/* ===== GAME OVER DETECTION ===== */
function canPlacePiece(piece, board) {
  // Try all rotations
  for (let rotation = 0; rotation < 4; rotation++) {
    // Try all positions
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const toFill = piece.cells.map(([dr, dc]) => [r + dr, c + dc]);
        const out = toFill.some(([rr, cc]) => rr < 0 || cc < 0 || rr >= ROWS || cc >= COLS);
        const collide = !out && toFill.some(([rr, cc]) => board[rr][cc]);
        if (!out && !collide) {
          return true; // Found valid placement
        }
      }
    }
    // Rotate for next iteration
    rotatePiece(piece);
  }
  return false;
}

function checkGameOver() {
  if (!gameActive) return;
  
  // Get all available pieces
  const availablePieces = [];
  queue.forEach(p => {
    if (p) availablePieces.push(JSON.parse(JSON.stringify(p)));
  });
  if (storage) {
    availablePieces.push(JSON.parse(JSON.stringify(storage)));
  }

  // Check if any piece can be placed
  for (const piece of availablePieces) {
    if (canPlacePiece(piece, board)) {
      return; // At least one valid move exists
    }
  }

  // No valid moves - game over
  gameActive = false;
  showGameOver();
}

function showGameOver() {
  document.getElementById('finalScore').textContent = score;
  document.getElementById('gameOverModal').classList.add('active');
}

function hideGameOver() {
  document.getElementById('gameOverModal').classList.remove('active');
}

/* ===== EVENT HANDLERS ===== */
function onCellClick(e) {
  const r = +e.currentTarget.dataset.r;
  const c = +e.currentTarget.dataset.c;
  placePieceAt(r, c);
}

// Drag and drop for board
boardEl.addEventListener('dragover', (e) => {
  e.preventDefault();
  const rect = boardEl.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cellSize = rect.width / COLS;
  const r = Math.floor(y / cellSize);
  const c = Math.floor(x / cellSize);
  if (r >= 0 && c >= 0 && r < ROWS && c < COLS) showPreview(r, c);
});

boardEl.addEventListener('dragleave', () => clearPreview());

boardEl.addEventListener('drop', (e) => {
  e.preventDefault();
  clearPreview();
  const rect = boardEl.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cellSize = rect.width / COLS;
  const r = Math.floor(y / cellSize);
  const c = Math.floor(x / cellSize);
  if (r >= 0 && c >= 0 && r < ROWS && c < COLS) {
    placePieceAt(r, c);
  }
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
  if (e.key === 'q' || e.key === 'Q') {
    if (selected) {
      rotatePiece(selected.piece);
      renderQueue();
      renderStorage();
      highlightSelected();
    }
  } else if (e.key === 'e' || e.key === 'E') {
    if (selected) {
      rotatePiece(selected.piece);
      rotatePiece(selected.piece);
      rotatePiece(selected.piece);
      renderQueue();
      renderStorage();
      highlightSelected();
    }
  }
});

// Button handlers
rotateBtn.addEventListener('click', () => {
  if (!selected) {
    flash(currentLanguage === 'vi' ? 'Chọn khối để xoay.' : 'Select a block to rotate.');
    return;
  }
  rotatePiece(selected.piece);
  renderQueue();
  renderStorage();
  highlightSelected();
});

storeBtn.addEventListener('click', () => {
  if (!selected) {
    flash(currentLanguage === 'vi' ? 'Chọn khối để lưu/đổi.' : 'Select a block to store/swap.');
    return;
  }
  if (selected.from === 'queue') {
    const idx = selected.idx;
    const tmp = storage;
    storage = queue[idx];
    queue[idx] = tmp ? tmp : randPiece();
    selected = null;
  } else if (selected.from === 'storage') {
    const tmp = storage;
    storage = queue[0];
    queue[0] = tmp;
    selected = null;
  }
  renderQueue();
  renderStorage();
  highlightSelected();
});

newGameBtn.addEventListener('click', init);

bombBtn.addEventListener('click', () => {
  if (powerups.bomb <= 0) {
    flash(currentLanguage === 'vi' ? 'Hết bom!' : 'No bombs left!');
    return;
  }
  flash(currentLanguage === 'vi' ? 'Click vào ô cần nổ!' : 'Click cell to bomb!');
  const handler = (e) => {
    if (!e.target.classList.contains('cell')) return;
    const r = +e.target.dataset.r;
    const c = +e.target.dataset.c;
    for (let i = 0; i < COLS; i++) board[r][i] = false;
    for (let j = 0; j < ROWS; j++) board[j][c] = false;
    powerups.bomb--;
    updatePowerups();
    renderBoard();
    boardEl.removeEventListener('click', handler);
    updateScore();
  };
  boardEl.addEventListener('click', handler);
});

swapBtn.addEventListener('click', () => {
  if (powerups.swap <= 0) {
    flash(currentLanguage === 'vi' ? 'Hết lượt xáo trộn!' : 'No shuffles left!');
    return;
  }
  queue = [randPiece(), randPiece(), randPiece()];
  powerups.swap--;
  updatePowerups();
  renderQueue();
  setTimeout(() => checkGameOver(), 100);
});

hintBtn.addEventListener('click', () => {
  if (powerups.hint <= 0) {
    flash(currentLanguage === 'vi' ? 'Hết lượt thay!' : 'No replaces left!');
    return;
  }
  if (!selected) {
    flash(currentLanguage === 'vi' ? 'Chọn khối trước!' : 'Select a block first!');
    return;
  }
  showReplaceModal();
});

// Replace modal
function showReplaceModal() {
  replaceGrid.innerHTML = '';
  const replaceColor = getComputedStyle(document.documentElement).getPropertyValue('--replace-color').trim() || '#10b981';
  PIECES.forEach((pd) => {
    const item = document.createElement('div');
    item.className = 'replace-item';
    const mini = document.createElement('div');
    mini.className = 'mini-piece replace-mini';
    for (let rr = 0; rr < 4; rr++) {
      for (let cc = 0; cc < 4; cc++) {
        const mc = document.createElement('div');
        mc.className = 'mini-cell';
        if (pd.cells.some(([ar, ac]) => ar === rr && ac === cc)) {
          mc.classList.add('on');
          mc.style.background = replaceColor;
        }
        mini.appendChild(mc);
      }
    }
    item.appendChild(mini);
    item.addEventListener('click', () => {
      const newPiece = assignColor(JSON.parse(JSON.stringify(pd)));
      if (selected && selected.from === 'queue') {
        queue[selected.idx] = newPiece;
        selected.piece = newPiece; // Update the selected reference to the new piece
      } else if (selected && selected.from === 'storage') {
        storage = newPiece;
        selected.piece = newPiece; // Update the selected reference to the new piece
      }
      powerups.hint--;
      updatePowerups();
      renderQueue();
      renderStorage();
      highlightSelected();
      hideReplaceModal();
      setTimeout(() => checkGameOver(), 100);
    });
    replaceGrid.appendChild(item);
  });
  modalBackdrop.style.display = 'flex';
  modalBackdrop.setAttribute('aria-hidden', 'false');
}

function hideReplaceModal() {
  modalBackdrop.style.display = 'none';
  modalBackdrop.setAttribute('aria-hidden', 'true');
}

replaceClose.addEventListener('click', hideReplaceModal);
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) hideReplaceModal();
});

/* ===== SCREEN NAVIGATION ===== */
document.getElementById('playBtn').addEventListener('click', () => {
  showScreen('gameScreen');
  init();
});

document.getElementById('settingsBtn').addEventListener('click', () => {
  document.getElementById('settingsModal').classList.add('active');
});

document.getElementById('settingsGameBtn').addEventListener('click', () => {
  document.getElementById('settingsModal').classList.add('active');
});

document.getElementById('closeSettings').addEventListener('click', () => {
  document.getElementById('settingsModal').classList.remove('active');
});

document.getElementById('settingsModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('settingsModal')) {
    document.getElementById('settingsModal').classList.remove('active');
  }
});

document.getElementById('backBtn').addEventListener('click', () => {
  showScreen('introScreen');
  gameActive = false;
});

document.getElementById('restartBtn').addEventListener('click', () => {
  hideGameOver();
  init();
});

document.getElementById('menuBtn').addEventListener('click', () => {
  hideGameOver();
  showScreen('introScreen');
  gameActive = false;
});

// Theme selection
document.querySelectorAll('.theme-card').forEach(card => {
  card.addEventListener('click', () => {
    setTheme(card.dataset.theme);
  });
});

// Language selection
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
  });
});

/* ===== INITIALIZATION ===== */
setTheme('default');
setLanguage('vi');
showScreen('introScreen');