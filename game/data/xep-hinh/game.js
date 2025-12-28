/* ---------- JS TOÀN BỘ ---------- */
const ROWS = 8, COLS = 8;
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
let powerups = { bomb:3, swap:3, hint:3 };
let selectedBlock = null;
let selectedPowerUp = null;
/* Piece defs & colors */
const PIECES = [
  {name:'I',cells:[[0,0],[1,0],[2,0],[3,0]]},
  {name:'O',cells:[[0,0],[0,1],[1,0],[1,1]]},
  {name:'L',cells:[[0,0],[1,0],[2,0],[2,1]]},
  {name:'J',cells:[[0,1],[1,1],[2,1],[2,0]]},
  {name:'S',cells:[[0,1],[0,2],[1,0],[1,1]]},
  {name:'Z',cells:[[0,0],[0,1],[1,1],[1,2]]},
  {name:'T',cells:[[0,1],[1,0],[1,1],[1,2]]},
  {name:'Dot',cells:[[0,0]]},
  {name:'Big',cells:[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]]}
];
const COLORS = [
  ['#12b886','#0ea36b'],
  ['#3b82f6','#1d4ed8'],
  ['#f59e0b','#b45309'],
  ['#ef4444','#b91c1c'],
  ['#a855f7','#6b21a8'],
  ['#ec4899','#be185d'],
  ['#14b8a6','#0f766e']
];

function assignColor(piece){
  const grad = COLORS[Math.floor(Math.random()*COLORS.length)];
  piece.color = grad.slice();
  return piece;
}
function randPiece(){
  const p = JSON.parse(JSON.stringify(PIECES[Math.floor(Math.random()*PIECES.length)]));
  return assignColor(p);
}

function init(){
  board = Array.from({length:ROWS}, ()=> Array(COLS).fill(false));
  queue = [randPiece(), randPiece(), randPiece()];
  storage = null;
  selected = null;
  score = 0;
  combo = 0;
  missCount = 0;
  powerups = { bomb:3, swap:3, hint:3 };
  updateScore();
  updatePowerups();
  renderBoard();
  renderQueue();
  renderStorage();
  hideReplaceModal();
}

function renderBoard(){
  boardEl.innerHTML = '';
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      const val = board[r][c];
      if(val){
        cell.classList.add('filled');
        if(Array.isArray(val)){
          cell.style.background = `linear-gradient(180deg, ${val[0]}, ${val[1]})`;
        } else {
          cell.style.background = '';
        }
      }
      cell.addEventListener('click', onCellClick);
      cell.addEventListener('mouseenter', ()=> showPreview(r,c));
      cell.addEventListener('mouseleave', ()=> clearPreview());
      boardEl.appendChild(cell);
    }
  }
}

function renderQueue(){
  queueEl.innerHTML = '';
  queue.forEach((p,i)=>{
    const slot = document.createElement('div');
    slot.className = 'piece-slot';
    if(!p) slot.classList.add('disabled');
    const mini = document.createElement('div');
    mini.className = 'mini-piece';
    for(let rr=0; rr<4; rr++){
      for(let cc=0; cc<4; cc++){
        const mc = document.createElement('div');
        mc.className = 'mini-cell';
        const has = p && p.cells.some(([ar,ac])=> ar===rr && ac===cc);
        if(has){
          mc.classList.add('on');
          if(p && p.color) mc.style.background = `linear-gradient(180deg, ${p.color[0]}, ${p.color[1]})`;
        }
        mini.appendChild(mc);
      }
    }
    slot.appendChild(mini);

    slot.addEventListener('click', ()=> selectQueuePiece(i));

    slot.draggable = !!p;
    slot.addEventListener('dragstart', (e)=>{
      if(!p){ e.preventDefault(); return; }
      selected = { piece: p, from: 'queue', idx: i };
      highlightSelected();
      e.dataTransfer.setData('text/plain','piece');
      e.dataTransfer.effectAllowed = 'move';
      const dragImage = createDragImage(p);
      e.dataTransfer.setDragImage(dragImage, dragImage.width/2, dragImage.height/2);
    });

    slot.addEventListener('dragover', e=>{ e.preventDefault(); slot.classList.add('highlight'); });
    slot.addEventListener('dragleave', ()=> slot.classList.remove('highlight'));
    slot.addEventListener('drop', e=>{
      e.preventDefault(); slot.classList.remove('highlight');
      if(!selected) return;
      if(selected.from === 'queue'){
        const tmp = queue[i];
        queue[i] = queue[selected.idx];
        queue[selected.idx] = tmp;
      } else if(selected.from === 'storage'){
        const tmp = queue[i];
        queue[i] = storage;
        storage = tmp?tmp:null;
      }
      selected = null;
      renderQueue(); renderStorage(); highlightSelected();
    });

    queueEl.appendChild(slot);
  });
  renderStorage();
  highlightSelected();
}

function renderStorage(){
  storageEl.innerHTML = '';
  const slot = document.createElement('div');
  slot.className = 'piece-slot';
  const mini = document.createElement('div');
  mini.className = 'mini-piece';
  if(storage){
    for(let rr=0; rr<4; rr++){
      for(let cc=0; cc<4; cc++){
        const mc = document.createElement('div');
        mc.className = 'mini-cell';
        if(storage.cells.some(([ar,ac])=> ar===rr && ac===cc)){
          mc.classList.add('on');
          if(storage.color) mc.style.background = `linear-gradient(180deg, ${storage.color[0]}, ${storage.color[1]})`;
        }
        mini.appendChild(mc);
      }
    }
  } else {
    for(let rr=0; rr<4; rr++){
      for(let cc=0; cc<4; cc++){
        const mc = document.createElement('div');
        mc.className = 'mini-cell';
        mini.appendChild(mc);
      }
    }
  }
  slot.appendChild(mini);

  slot.addEventListener('click', ()=>{
    if(storage) selected = { piece: storage, from: 'storage' };
    else flash('Kho trống.');
    highlightSelected();
  });

  slot.draggable = !!storage;
  slot.addEventListener('dragstart', (e)=>{
    if(!storage){ e.preventDefault(); return; }
    selected = { piece: storage, from: 'storage' };
    e.dataTransfer.setData('text/plain','piece');
    e.dataTransfer.effectAllowed = 'move';
    const dragImage = createDragImage(storage);
    e.dataTransfer.setDragImage(dragImage, dragImage.width/2, dragImage.height/2);
  });

  slot.addEventListener('dragover', e=>{ e.preventDefault(); slot.classList.add('highlight'); });
  slot.addEventListener('dragleave', ()=> slot.classList.remove('highlight'));
  slot.addEventListener('drop', e=>{
    e.preventDefault(); slot.classList.remove('highlight');
    if(!selected) return;
    if(selected.from === 'queue'){
      const idx = selected.idx;
      const tmp = storage;
      storage = queue[idx];
      queue[idx] = tmp ? tmp : randPiece();
    }
    // else nếu từ storage thì không đổi
    selected = null;
    renderQueue(); renderStorage(); highlightSelected();
  });

  storageEl.appendChild(slot);
}

function selectQueuePiece(i){
  if(!queue[i]) return;
  selected = { piece: queue[i], from: 'queue', idx: i };
  highlightSelected();
}
function highlightSelected(){
  Array.from(queueEl.children).forEach((el,idx)=>
    el.style.outline = (selected && selected.from==='queue' && selected.idx===idx) ? '2px solid rgba(16,185,129,.6)' : ''
  );
  storageEl.style.outline = (selected && selected.from==='storage') ? '2px solid rgba(16,185,129,.6)' : '';
}
function rotatePiece(p){
  const rotated = p.cells.map(([r,c])=>[c, -r]);
  const minR = Math.min(...rotated.map(x=>x[0]));
  const minC = Math.min(...rotated.map(x=>x[1]));
  p.cells = rotated.map(([r,c])=>[r-minR, c-minC]);
}

function showPreview(r,c){
  if(!selected) return;
  clearPreview();
  const toFill = selected.piece.cells.map(([dr,dc])=>[r+dr, c+dc]);
  const out = toFill.some(([rr,cc])=> rr<0 || cc<0 || rr>=ROWS || cc>=COLS);
  const collide = !out && toFill.some(([rr,cc])=> board[rr][cc]);
  toFill.forEach(([rr,cc])=>{
    if(rr>=0 && cc>=0 && rr<ROWS && cc<COLS){
      const idx = rr*COLS + cc;
      const cell = boardEl.children[idx];
      if(cell){
        if(out || collide) cell.classList.add('preview-bad');
        else cell.classList.add('preview-ok');
      }
    }
  });
}
function clearPreview(){
  Array.from(boardEl.children).forEach(cell=> cell.classList.remove('preview-ok','preview-bad'));
}

function placePieceAt(r,c){
  if(!selected){ flash('Chọn 1 khối.'); return false; }
  const cells = selected.piece.cells;
  const toFill = cells.map(([dr,dc])=>[r+dr, c+dc]);
  const out = toFill.some(([rr,cc])=> rr<0||cc<0||rr>=ROWS||cc>=COLS);
  const collide = toFill.some(([rr,cc])=> board[rr][cc]);
  if(out || collide){ flash('Không thể đặt.'); return false; }

  toFill.forEach(([rr,cc])=>{
    board[rr][cc] = selected.piece.color ? selected.piece.color.slice() : true;
    score += 1;
  });

  if(selected.from === 'queue'){
    queue[selected.idx] = randPiece();
  } else if(selected.from === 'storage'){
    storage = null;
  }
  selected = null;
  clearPreview(); highlightSelected();
  renderBoard(); renderQueue(); renderStorage();

  const cleared = clearLines();
  if(cleared) {
    missCount = 0;
  } else {
    missCount++;
    if(missCount >= 3){
      if (combo > 0) {
        flash(`💔 Mất combo x${combo} vì không phá hàng trong 3 lượt!`);
        combo = 0;
        updateScore();  // **[Thay đổi]: cập nhật giao diện khi combo bị mất**
      }
      missCount = 0;
    }
  }
  // **[Thay đổi]: luôn cập nhật score/combo sau mỗi lượt đặt**
  updateScore();
  return true;
}

function clearLines(){
  const fullRows = [];
  for(let r=0;r<ROWS;r++) if(board[r].every(v=>v)) fullRows.push(r);
  const fullCols = [];
  for(let c=0;c<COLS;c++){
    let all=true;
    for(let r=0;r<ROWS;r++) if(!board[r][c]){ all=false; break; }
    if(all) fullCols.push(c);
  }
  if(fullRows.length===0 && fullCols.length===0) return false;

  fullRows.forEach(r=>{
    for(let c=0;c<COLS;c++){
      board[r][c] = false;
      const el = boardEl.children[r*COLS + c];
      if(el) el.classList.add('clearing');
    }
  });
  fullCols.forEach(c=>{
    for(let r=0;r<ROWS;r++){
      board[r][c] = false;
      const el = boardEl.children[r*COLS + c];
      if(el) el.classList.add('clearing');
    }
  });

  const removed = fullRows.length*COLS + fullCols.length*ROWS - (fullRows.length*fullCols.length);
  combo++;
  const comboMult = 1 + combo * 0.1;
  score += Math.floor(removed * 10 * comboMult);

  const totalCleared = fullRows.length + fullCols.length;
  if(totalCleared >= 4){
    showCenterMessage('💥 Amazing!');
  } else if(totalCleared === 3){
    showCenterMessage('🔥 Great!');
  } else if(totalCleared === 2){
    showCenterMessage('👍 Good!');
  }

  // **[Thay đổi]: cập nhật điểm & combo ngay sau khi clear dòng**
  updateScore();
  setTimeout(()=> renderBoard(), 400);
  return true;
}

function updateScore(){
  scoreEl.textContent = `Điểm: ${score} • Combo: ${combo}`;
}

function flash(msg){
  const old = document.createElement('div');
  old.textContent = msg;
  old.style.position='fixed';
  old.style.left='50%'; old.style.top='20px';
  old.style.transform='translateX(-50%)';
  old.style.padding='8px 12px';
  old.style.background='rgba(255,255,255,.06)';
  old.style.border='1px solid rgba(255,255,255,.06)';
  old.style.borderRadius='8px';
  old.style.zIndex = 2000;
  document.body.appendChild(old);
  setTimeout(()=> old.remove(), 1400);
}

function updatePowerups(){
  bombBtn.textContent = `💣 Bom (x${powerups.bomb})`;
  swapBtn.textContent = `🔃 Xáo trộn (x${powerups.swap})`;
  hintBtn.textContent = `🎲 Thay khối (x${powerups.hint})`;
  bombBtn.disabled = powerups.bomb <= 0;
  swapBtn.disabled = powerups.swap <= 0;
  hintBtn.disabled = powerups.hint <= 0;
}

bombBtn.addEventListener('click', ()=>{
  if(powerups.bomb <= 0){ flash('Hết bom!'); return; }
  flash('Click vào ô cần nổ!');
  const handler = (e) => {
    if(!e.target.classList.contains('cell')) return;
    const r = +e.target.dataset.r, c = +e.target.dataset.c;
    for(let i=0;i<COLS;i++) board[r][i] = false;
    for(let j=0;j<ROWS;j++) board[j][c] = false;
    powerups.bomb--;
    updatePowerups();
    renderBoard();
    boardEl.removeEventListener('click', handler);
    // cập nhật score/combo hiển thị
    updateScore();
  };
  boardEl.addEventListener('click', handler);
});

swapBtn.addEventListener('click', ()=>{
  if(powerups.swap <= 0){ flash('Hết lượt xáo trộn!'); return; }
  queue = [randPiece(), randPiece(), randPiece()];
  powerups.swap--;
  updatePowerups();
  renderQueue();
});

hintBtn.addEventListener('click', ()=>{
  if(powerups.hint <= 0){ flash('Hết lượt thay!'); return; }
  if(!selected){ flash('Chọn khối trước!'); return; }
  showReplaceModal();
});

function getReplaceColor(){
  return getComputedStyle(document.documentElement).getPropertyValue('--replace-color').trim() || '#10b981';
}
function showReplaceModal(){
  replaceGrid.innerHTML = '';
  const replaceColor = getReplaceColor();
  PIECES.forEach((pd, idx)=>{
    const item = document.createElement('div');
    item.className = 'replace-item';
    const mini = document.createElement('div');
    mini.className = 'mini-piece replace-mini';
    for(let rr=0; rr<4; rr++){
      for(let cc=0; cc<4; cc++){
        const mc = document.createElement('div');
        mc.className = 'mini-cell';
        if(pd.cells.some(([ar,ac])=> ar===rr && ac===cc)){
          mc.classList.add('on');
          mc.style.background = replaceColor;
        }
        mini.appendChild(mc);
      }
    }
    item.appendChild(mini);
    item.addEventListener('click', ()=>{
      const newPiece = assignColor(JSON.parse(JSON.stringify(pd)));
      if(selected && selected.from === 'queue'){
        queue[selected.idx] = newPiece;
      } else if(selected && selected.from === 'storage'){
        storage = newPiece;
      }
      powerups.hint--;
      updatePowerups();
      renderQueue();
      renderStorage();
      highlightSelected();
      hideReplaceModal();
    });
    replaceGrid.appendChild(item);
  });
  modalBackdrop.style.display = 'flex';
  modalBackdrop.setAttribute('aria-hidden','false');
}

replaceClose.addEventListener('click', hideReplaceModal);
modalBackdrop.addEventListener('click', (e)=>{
  if(e.target === modalBackdrop) hideReplaceModal();
});
function hideReplaceModal(){
  modalBackdrop.style.display = 'none';
  modalBackdrop.setAttribute('aria-hidden','true');
}

boardEl.addEventListener('dragover', (e)=>{
  e.preventDefault();
  const rect = boardEl.getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  const cellSize = rect.width / COLS;
  const r = Math.floor(y / cellSize), c = Math.floor(x / cellSize);
  if(r>=0 && c>=0 && r<ROWS && c<COLS) showPreview(r,c);
});
boardEl.addEventListener('dragleave', ()=> clearPreview());
boardEl.addEventListener('drop', (e)=>{
  e.preventDefault();
  clearPreview();
  const rect = boardEl.getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  const cellSize = rect.width / COLS;
  const r = Math.floor(y / cellSize), c = Math.floor(x / cellSize);
  if(r>=0 && c>=0 && r<ROWS && c<COLS){
    placePieceAt(r,c);
  }
});

function createDragImage(piece){
  const cellSize = 18; const pad = 4; const size = 4;
  const w = size*cellSize + pad*2; const h = size*cellSize + pad*2;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  piece.cells.forEach(([r,c])=>{
    const x = pad + c*cellSize, y = pad + r*cellSize;
    const grad = ctx.createLinearGradient(x,y,x,y+cellSize);
    const top = (piece.color && piece.color[0]) ? piece.color[0] : '#12b886';
    const bottom = (piece.color && piece.color[1]) ? piece.color[1] : '#0ea36b';
    grad.addColorStop(0, top);
    grad.addColorStop(1, bottom);
    ctx.fillStyle = grad;
    ctx.fillRect(x+1, y+1, cellSize-2, cellSize-2);
  });
  return canvas;
}

rotateBtn.addEventListener('click', ()=>{
  if(!selected){ flash('Chọn khối để xoay.'); return; }
  rotatePiece(selected.piece);
  renderQueue(); renderStorage(); highlightSelected();
});
storeBtn.addEventListener('click', ()=>{
  if(!selected){ flash('Chọn khối để lưu/đổi.'); return; }
  if(selected.from === 'queue'){
    const idx = selected.idx;
    const tmp = storage;
    storage = queue[idx];
    queue[idx] = tmp ? tmp : randPiece();
    selected = null;
  } else if(selected.from === 'storage'){
    const tmp = storage;
    storage = queue[0];
    queue[0] = tmp;
    selected = null;
  }
  renderQueue(); renderStorage(); highlightSelected();
});
newGameBtn.addEventListener('click', init);

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
      // Xoay theo chiều ngược lại nếu muốn
      rotatePiece(selected.piece);
      rotatePiece(selected.piece);
      rotatePiece(selected.piece);
      renderQueue();
      renderStorage();
      highlightSelected();
    }
  }
});


function onCellClick(e){
  const r = +e.currentTarget.dataset.r, c = +e.currentTarget.dataset.c;
  placePieceAt(r,c);
}

function showCenterMessage(text) {
  const msg = document.getElementById('centerMessage');
  msg.textContent = text;
  msg.classList.add('show');
  setTimeout(() => {
    msg.classList.remove('show');
  }, 1500);
}

/* Khởi tạo đầu tiên */
init();