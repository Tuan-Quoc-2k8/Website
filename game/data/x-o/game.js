// Game State
let gameState = {
  board: [],
  gridSize: 3,
  winLength: 3,
  currentPlayer: 'X',
  isActive: false,
  mode: 'player',
  player1: 'X',
  player2: 'O',
  currentLang: 'en',
  currentSkin: 'classic'
};

// Translations
const translations = {
  en: {
    title: 'Tic-Tac-Toe',
    play: 'Play',
    settings: 'Settings',
    tutorial: 'Tutorial',
    selectMode: 'Select Game Mode',
    playWithPlayer: 'Play with Another Player',
    playWithComputer: 'Play with Computer',
    selectDifficulty: 'Select Difficulty',
    noob: 'Noob',
    pro: 'Pro',
    expert: 'Expert',
    selectMap: 'Select Map',
    inRow: 'in a row',
    customMap: 'Custom Map',
    customMapInfo: '⚠️ <strong>Note:</strong> Boards larger than 15×15 may take longer to render. For best performance with AI, keep boards under 20×20.',
    boardSize: 'Board Size',
    boardSizeHint: '(Min: 3, Max: 50)',
    winCondition: 'Win Condition',
    winConditionHint: '(Min: 3, Max: 20 or board size)',
    start: 'Start',
    back: 'Back',
    skins: 'Skins',
    classic: 'Classic',
    neon: 'Neon',
    pastel: 'Pastel',
    dark: 'Dark',
    language: 'Language',
    turn: 'Turn',
    restart: 'Restart',
    exit: 'Exit',
    wins: 'wins!',
    draw: 'Draw!',
    errorBoardSize: 'Board size must be between 3 and 50!',
    errorWinCondition: 'Win condition must be between 3 and 20!',
    errorWinTooLarge: 'Win condition cannot be larger than board size!',
    errorWinTooSmall: 'Win condition must be at least 3!',
    tutorialText: '<h3>How to Play</h3><p><strong>Objective:</strong> Get the required number of your symbols in a row (horizontally, vertically, or diagonally) to win.</p><p><strong>Game Modes:</strong></p><ul><li><strong>Player vs Player:</strong> Take turns placing X and O on the board.</li><li><strong>Player vs Computer:</strong> Challenge the AI at different difficulty levels.</li></ul><p><strong>Difficulty Levels:</strong></p><ul><li><strong>Noob:</strong> AI makes random moves.</li><li><strong>Pro:</strong> AI blocks your winning moves and tries to win.</li><li><strong>Expert:</strong> AI uses advanced strategy with smart tactics.</li></ul><p><strong>Map Sizes:</strong></p><ul><li><strong>3×3:</strong> First to get 3 in a row wins.</li><li><strong>7×7:</strong> First to get 4 in a row wins.</li><li><strong>12×12:</strong> First to get 5 in a row wins.</li><li><strong>Custom:</strong> Create your own board size and win condition.</li></ul>'
  },
  vi: {
    title: 'Cờ Caro',
    play: 'Chơi',
    settings: 'Cài Đặt',
    tutorial: 'Hướng Dẫn',
    selectMode: 'Chọn Chế Độ Chơi',
    playWithPlayer: 'Chơi với người khác',
    playWithComputer: 'Chơi với máy',
    selectDifficulty: 'Chọn Độ Khó',
    noob: 'Dễ',
    pro: 'Trung Bình',
    expert: 'Khó',
    selectMap: 'Chọn Bản Đồ',
    inRow: 'ô thắng',
    customMap: 'Tùy Chỉnh',
    customMapInfo: '⚠️ <strong>Lưu ý:</strong> Bàn cờ lớn hơn 15×15 có thể mất nhiều thời gian để hiển thị. Để có hiệu suất tốt nhất với AI, nên giữ bàn cờ dưới 20×20.',
    boardSize: 'Kích Thước Bàn Cờ',
    boardSizeHint: '(Tối thiểu: 3, Tối đa: 50)',
    winCondition: 'Điều Kiện Thắng',
    winConditionHint: '(Tối thiểu: 3, Tối đa: 20 hoặc kích thước bàn cờ)',
    start: 'Bắt Đầu',
    back: 'Quay Lại',
    skins: 'Giao Diện',
    classic: 'Cổ Điển',
    neon: 'Neon',
    pastel: 'Pastel',
    dark: 'Tối',
    language: 'Ngôn Ngữ',
    turn: 'Lượt',
    restart: 'Chơi Lại',
    exit: 'Thoát',
    wins: 'thắng!',
    draw: 'Hòa!',
    errorBoardSize: 'Kích thước bàn cờ phải từ 3 đến 50!',
    errorWinCondition: 'Điều kiện thắng phải từ 3 đến 20!',
    errorWinTooLarge: 'Điều kiện thắng không thể lớn hơn kích thước bàn cờ!',
    errorWinTooSmall: 'Điều kiện thắng phải ít nhất là 3!',
    tutorialText: '<h3>Cách Chơi</h3><p><strong>Mục tiêu:</strong> Đặt đủ số ô liên tiếp (ngang, dọc hoặc chéo) để thắng.</p><p><strong>Chế độ chơi:</strong></p><ul><li><strong>Người vs Người:</strong> Lần lượt đặt X và O lên bàn cờ.</li><li><strong>Người vs Máy:</strong> Thách đấu với AI ở các mức độ khác nhau.</li></ul><p><strong>Độ khó:</strong></p><ul><li><strong>Dễ:</strong> AI đi ngẫu nhiên.</li><li><strong>Trung Bình:</strong> AI chặn nước thắng và cố gắng thắng.</li><li><strong>Khó:</strong> AI sử dụng chiến thuật thông minh.</li></ul><p><strong>Kích thước bàn cờ:</strong></p><ul><li><strong>3×3:</strong> 3 ô liên tiếp thắng.</li><li><strong>7×7:</strong> 4 ô liên tiếp thắng.</li><li><strong>12×12:</strong> 5 ô liên tiếp thắng.</li><li><strong>Tùy chỉnh:</strong> Tạo bàn cờ và điều kiện thắng riêng.</li></ul>'
  }
};

// Screen Navigation
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// Language
function changeLanguage(lang) {
  gameState.currentLang = lang;
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

// Skins
function changeSkin(skin) {
  document.body.className = skin;
  gameState.currentSkin = skin;
  document.querySelectorAll('.skin-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

// Mode Selection
function selectMode(mode) {
  gameState.mode = mode;
  showScreen('map-screen');
}

function goBackFromMap() {
  showScreen(gameState.mode === 'player' ? 'play-screen' : 'difficulty-screen');
}

// Map Selection
function selectMap(size, win) {
  gameState.gridSize = size;
  gameState.winLength = win;
  startGame();
}

function showCustomMap() {
  showScreen('custom-map-screen');
}

function applyCustomMap() {
  const sizeInput = document.getElementById('custom-size');
  const winInput = document.getElementById('custom-win');
  const errorDiv = document.getElementById('custom-error');
  const lang = gameState.currentLang;
  
  const size = parseInt(sizeInput.value);
  const win = parseInt(winInput.value);
  
  // Clear previous errors
  errorDiv.classList.remove('show');
  errorDiv.textContent = '';
  sizeInput.classList.remove('error');
  winInput.classList.remove('error');
  
  // Validate board size
  if (isNaN(size) || size < 3 || size > 50) {
    errorDiv.textContent = translations[lang].errorBoardSize;
    errorDiv.classList.add('show');
    sizeInput.classList.add('error');
    return;
  }
  
  // Validate win condition
  if (isNaN(win) || win < 3) {
    errorDiv.textContent = translations[lang].errorWinTooSmall;
    errorDiv.classList.add('show');
    winInput.classList.add('error');
    return;
  }
  
  if (win > 20) {
    errorDiv.textContent = translations[lang].errorWinCondition;
    errorDiv.classList.add('show');
    winInput.classList.add('error');
    return;
  }
  
  if (win > size) {
    errorDiv.textContent = translations[lang].errorWinTooLarge;
    errorDiv.classList.add('show');
    winInput.classList.add('error');
    return;
  }
  
  // All validations passed
  selectMap(size, win);
}

// Game Start
function startGame() {
  gameState.board = Array(gameState.gridSize * gameState.gridSize).fill('');
  gameState.currentPlayer = 'X';
  gameState.isActive = true;
  
  renderBoard();
  updateStatus();
  showScreen('game-screen');
  
  if (gameState.mode !== 'player' && gameState.currentPlayer === gameState.player2) {
    setTimeout(makeAIMove, 500);
  }
}

// Render Board with size optimization
function renderBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  
  // Determine cell size based on grid size
  let cellSize = 60;
  let cellClass = '';
  
  if (gameState.gridSize > 10) {
    cellSize = 30;
    cellClass = 'tiny';
  } else if (gameState.gridSize > 6) {
    cellSize = 40;
    cellClass = 'small';
  }
  
  board.style.gridTemplateColumns = `repeat(${gameState.gridSize}, ${cellSize}px)`;
  
  gameState.board.forEach((cell, index) => {
    const cellEl = document.createElement('div');
    cellEl.className = `cell ${cellClass}`;
    cellEl.textContent = cell;
    if (cell) cellEl.classList.add(cell);
    cellEl.onclick = () => handleClick(index);
    board.appendChild(cellEl);
  });
}

// Handle Click
function handleClick(index) {
  if (!gameState.isActive || gameState.board[index]) return;
  if (gameState.mode !== 'player' && gameState.currentPlayer === gameState.player2) return;
  
  gameState.board[index] = gameState.currentPlayer;
  renderBoard();
  
  if (checkWinner()) return;
  switchPlayer();
  
  if (gameState.mode !== 'player' && gameState.currentPlayer === gameState.player2) {
    setTimeout(makeAIMove, 100);
  }
}

// Switch Player
function switchPlayer() {
  gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function updateStatus() {
  const status = document.getElementById('status');
  const lang = gameState.currentLang;
  status.textContent = `${translations[lang].turn}: ${gameState.currentPlayer}`;
}

// Optimized AI Logic
function makeAIMove() {
  const empty = gameState.board.map((v, i) => v === '' ? i : null).filter(i => i !== null);
  if (!empty.length || !gameState.isActive) return;
  
  let choice;
  
  if (gameState.mode === 'noob') {
    choice = empty[Math.floor(Math.random() * empty.length)];
  } else if (gameState.mode === 'pro') {
    choice = proAI(empty);
  } else if (gameState.mode === 'expert') {
    choice = expertAI(empty);
  }
  
  gameState.board[choice] = gameState.currentPlayer;
  renderBoard();
  
  if (checkWinner()) return;
  switchPlayer();
}

// Pro AI - Fast and effective
function proAI(empty) {
  // Try to win
  for (let i of empty) {
    gameState.board[i] = gameState.currentPlayer;
    if (checkWin(gameState.currentPlayer)) {
      gameState.board[i] = '';
      return i;
    }
    gameState.board[i] = '';
  }
  
  // Block opponent
  const opp = gameState.currentPlayer === 'X' ? 'O' : 'X';
  for (let i of empty) {
    gameState.board[i] = opp;
    if (checkWin(opp)) {
      gameState.board[i] = '';
      return i;
    }
    gameState.board[i] = '';
  }
  
  // Check for threats (opponent one move away from winning)
  for (let i of empty) {
    gameState.board[i] = opp;
    let threatCount = 0;
    for (let j of empty) {
      if (j !== i) {
        gameState.board[j] = opp;
        if (checkWin(opp)) threatCount++;
        gameState.board[j] = '';
      }
    }
    gameState.board[i] = '';
    if (threatCount >= 2) return i; // Block fork
  }
  
  // Try center or strategic positions
  const center = Math.floor(gameState.board.length / 2);
  if (gameState.board[center] === '') return center;
  
  return empty[Math.floor(Math.random() * empty.length)];
}

// Expert AI - Uses optimized strategy based on board size
function expertAI(empty) {
  const size = gameState.gridSize;
  
  // For small boards (3x3), use full minimax
  if (size === 3) {
    return minimaxMove(6);
  }
  
  // For medium boards (4-7), use limited depth
  if (size <= 7) {
    return minimaxMove(3);
  }
  
  // For large boards, use heuristic-based approach
  return smartHeuristicAI(empty);
}

// Smart Heuristic AI for large boards - no minimax
function smartHeuristicAI(empty) {
  const opp = gameState.currentPlayer === 'X' ? 'O' : 'X';
  
  // 1. Win if possible
  for (let i of empty) {
    gameState.board[i] = gameState.currentPlayer;
    if (checkWin(gameState.currentPlayer)) {
      gameState.board[i] = '';
      return i;
    }
    gameState.board[i] = '';
  }
  
  // 2. Block immediate threats
  for (let i of empty) {
    gameState.board[i] = opp;
    if (checkWin(opp)) {
      gameState.board[i] = '';
      return i;
    }
    gameState.board[i] = '';
  }
  
  // 3. Score all moves based on threat potential
  let bestScore = -Infinity;
  let bestMove = -1;
  
  for (let i of empty) {
    const score = evaluatePosition(i, gameState.currentPlayer) - evaluatePosition(i, opp);
    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }
  
  return bestMove;
}

// Evaluate position strength
function evaluatePosition(index, player) {
  let score = 0;
  const row = Math.floor(index / gameState.gridSize);
  const col = index % gameState.gridSize;
  
  // Check all four directions
  const directions = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal \
    [1, -1]   // diagonal /
  ];
  
  for (let [dr, dc] of directions) {
    let count = 1;
    let empty = 0;
    
    // Check forward
    for (let i = 1; i < gameState.winLength; i++) {
      const r = row + dr * i;
      const c = col + dc * i;
      if (r < 0 || r >= gameState.gridSize || c < 0 || c >= gameState.gridSize) break;
      const pos = r * gameState.gridSize + c;
      if (gameState.board[pos] === player) count++;
      else if (gameState.board[pos] === '') empty++;
      else break;
    }
    
    // Check backward
    for (let i = 1; i < gameState.winLength; i++) {
      const r = row - dr * i;
      const c = col - dc * i;
      if (r < 0 || r >= gameState.gridSize || c < 0 || c >= gameState.gridSize) break;
      const pos = r * gameState.gridSize + c;
      if (gameState.board[pos] === player) count++;
      else if (gameState.board[pos] === '') empty++;
      else break;
    }
    
    // Score based on alignment and potential
    if (count >= gameState.winLength - 1) score += 100;
    else if (count >= gameState.winLength - 2 && empty > 0) score += 10;
    else if (count >= 2 && empty > 1) score += 5;
  }
  
  return score;
}

// Minimax with alpha-beta pruning for small/medium boards
function minimaxMove(maxDepth) {
  let bestScore = -Infinity;
  let bestMove = -1;
  let alpha = -Infinity;
  let beta = Infinity;
  
  for (let i = 0; i < gameState.board.length; i++) {
    if (gameState.board[i] === '') {
      gameState.board[i] = gameState.currentPlayer;
      const score = minimax(0, false, alpha, beta, maxDepth);
      gameState.board[i] = '';
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
      alpha = Math.max(alpha, score);
    }
  }
  
  return bestMove;
}

function minimax(depth, isMax, alpha, beta, maxDepth) {
  const opp = gameState.currentPlayer === 'X' ? 'O' : 'X';
  
  if (checkWin(gameState.currentPlayer)) return 1000 - depth;
  if (checkWin(opp)) return depth - 1000;
  if (!gameState.board.includes('') || depth >= maxDepth) return 0;
  
  if (isMax) {
    let maxScore = -Infinity;
    for (let i = 0; i < gameState.board.length; i++) {
      if (gameState.board[i] === '') {
        gameState.board[i] = gameState.currentPlayer;
        const score = minimax(depth + 1, false, alpha, beta, maxDepth);
        gameState.board[i] = '';
        maxScore = Math.max(score, maxScore);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break; // Beta cutoff
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (let i = 0; i < gameState.board.length; i++) {
      if (gameState.board[i] === '') {
        gameState.board[i] = opp;
        const score = minimax(depth + 1, true, alpha, beta, maxDepth);
        gameState.board[i] = '';
        minScore = Math.min(score, minScore);
        beta = Math.min(beta, score);
        if (beta <= alpha) break; // Alpha cutoff
      }
    }
    return minScore;
  }
}

// Win Detection
function checkWinner() {
  const winPos = getWinningPositions(gameState.currentPlayer);
  
  if (winPos.length > 0) {
    const lang = gameState.currentLang;
    document.getElementById('status').textContent = 
      `${gameState.currentPlayer} ${translations[lang].wins}`;
    gameState.isActive = false;
    winPos.forEach(i => {
      document.querySelectorAll('.cell')[i].classList.add('winner');
    });
    return true;
  }
  
  if (!gameState.board.includes('')) {
    const lang = gameState.currentLang;
    document.getElementById('status').textContent = translations[lang].draw;
    gameState.isActive = false;
    return true;
  }
  
  return false;
}

function getWinningPositions(symbol) {
  for (let row = 0; row < gameState.gridSize; row++) {
    for (let col = 0; col < gameState.gridSize; col++) {
      const idx = row * gameState.gridSize + col;
      
      // Horizontal
      if (col + gameState.winLength <= gameState.gridSize) {
        const line = [];
        for (let i = 0; i < gameState.winLength; i++) {
          if (gameState.board[idx + i] === symbol) line.push(idx + i);
        }
        if (line.length === gameState.winLength) return line;
      }
      
      // Vertical
      if (row + gameState.winLength <= gameState.gridSize) {
        const line = [];
        for (let i = 0; i < gameState.winLength; i++) {
          if (gameState.board[idx + i * gameState.gridSize] === symbol) 
            line.push(idx + i * gameState.gridSize);
        }
        if (line.length === gameState.winLength) return line;
      }
      
      // Diagonal \
      if (row + gameState.winLength <= gameState.gridSize && 
          col + gameState.winLength <= gameState.gridSize) {
        const line = [];
        for (let i = 0; i < gameState.winLength; i++) {
          if (gameState.board[idx + i * (gameState.gridSize + 1)] === symbol) 
            line.push(idx + i * (gameState.gridSize + 1));
        }
        if (line.length === gameState.winLength) return line;
      }
      
      // Diagonal /
      if (row + gameState.winLength <= gameState.gridSize && 
          col - gameState.winLength + 1 >= 0) {
        const line = [];
        for (let i = 0; i < gameState.winLength; i++) {
          if (gameState.board[idx + i * (gameState.gridSize - 1)] === symbol) 
            line.push(idx + i * (gameState.gridSize - 1));
        }
        if (line.length === gameState.winLength) return line;
      }
    }
  }
  
  return [];
}

function checkWin(symbol) {
  return getWinningPositions(symbol).length > 0;
}

// Game Controls
function resetGame() {
  startGame();
}

function exitGame() {
  showScreen('intro-screen');
}

// Initialize
window.onload = () => {
  changeLanguage('en');
  changeSkin('classic');
  
  // Add input validation listeners
  const sizeInput = document.getElementById('custom-size');
  const winInput = document.getElementById('custom-win');
  
  sizeInput.addEventListener('input', function() {
    let value = parseInt(this.value);
    if (value > 50) this.value = 50;
    if (value < 0) this.value = 3;
  });
  
  winInput.addEventListener('input', function() {
    let value = parseInt(this.value);
    if (value > 20) this.value = 20;
    if (value < 0) this.value = 3;
  });
};