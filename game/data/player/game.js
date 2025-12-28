/*State & Utilities*/
const boardEl = document.getElementById('board');
const turnEl  = document.getElementById('turn');
const stateEl = document.getElementById('state');
const statusEl= document.getElementById('status');
const lastMoveEl = document.getElementById('lastMove');
const btnReset = document.getElementById('btnReset');
const btnUndo  = document.getElementById('btnUndo');
const btnFlip  = document.getElementById('btnFlip');
const promoEl  = document.getElementById('promo');

const SIZE=8;
const PIECE_UNI={ 
  wK:'\u265A', wQ:'\u265B', wR:'\u265C', wB:'\u265D', wN:'\u265E', wP:'\u265F', 
  bK:'\u265A', bQ:'\u265B', bR:'\u265C', bB:'\u265D', bN:'\u265E', bP:'\u265F' };
  
const isWhite = p => p && p[0]==='w';
const isBlack = p => p && p[0]==='b';
const inBoard = (r,c)=> r>=0 && r<8 && c>=0 && c<8;

let board, whiteToMove, selected=null, hlSquares=[], flipped=false, last=null;
let history=[]; // stack of snapshots
let enPassant = null; // {r,c,color} target square (landing square)
let movedFlags; // castling flags

function startPosition(){
  return [
    ['bR','bN','bB','bQ','bK','bB','bN','bR'],
    ['bP','bP','bP','bP','bP','bP','bP','bP'],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    ['wP','wP','wP','wP','wP','wP','wP','wP'],
    ['wR','wN','wB','wQ','wK','wB','wN','wR']
  ];
}

function reset(){
  board = startPosition(); whiteToMove=true; selected=null; hlSquares=[]; flipped=false; last=null; history=[]; enPassant=null;
  movedFlags = { wK:false, wR0:false, wR7:false, bK:false, bR0:false, bR7:false };
  render();
  statusEl.textContent = '-'; stateEl.textContent='Sẵn sàng'; stateEl.className='badge';
  turnEl.textContent='Trắng';
}

/*Rendering*/
function render(){
  boardEl.innerHTML='';
  for(let r=0;r<8;r++){
    for(let c=0;c<8;c++){
      const dr = flipped? 7-r : r;
      const dc = flipped? 7-c : c;
      const p = board[dr][dc];
      const cell = document.createElement('div');
      cell.className = 'cell ' + (((r+c)%2)?'dark':'light');
      cell.dataset.row=dr; cell.dataset.col=dc;

      let piece = board[r][c];
      if(p) cell.innerHTML = `<span class="${isWhite(p) ? 'white':'black'}">${PIECE_UNI[p]}</span>`;
     if(p) 
      if(last && ((last.from.r===dr && last.from.c===dc) || (last.to.r===dr && last.to.c===dc))) cell.classList.add('last');
      // selection + move hints
      if(selected && selected.r===dr && selected.c===dc) cell.classList.add('selected');
      if(hlSquares.some(s=>s.r===dr && s.c===dc)){
        if(board[dr][dc]) cell.classList.add('capture'); else cell.classList.add('hl');
      }
      cell.addEventListener('click',()=>onCell(dr,dc));
      boardEl.appendChild(cell);
    }
  }
  // highlight king in check
  highlightCheck();
}

function highlightCheck(){
  const cells=[...document.querySelectorAll('.cell')];
  cells.forEach(c=>c.classList.remove('incheck'));
  ['w','b'].forEach(color=>{
    if(inCheck(color)){
      const k = color==='w'?'wK':'bK';
      for(let r=0;r<8;r++) for(let c=0;c<8;c++) if(board[r][c]===k){
        let idx = r*8+c; if(flipped) idx = (7-r)*8+(7-c); cells[idx]?.classList.add('incheck');
      }
    }
  });
}

/*Interaction*/
function onCell(r,c){
  const p=board[r][c];
  if(selected){
    // deselect
    if(selected.r===r && selected.c===c){ selected=null; hlSquares=[]; render(); return; }
    // try move
    const moves = legalMoves(selected.r, selected.c);
    const ok = moves.find(m=>m.r===r && m.c===c && (!m.flag || m.flag));
    if(ok){
      makeMove(selected.r, selected.c, r, c, ok);
      selected=null; hlSquares=[]; render();
      postMoveChecks();
      return;
    }
    // otherwise select another own piece
    if(p && ((whiteToMove && isWhite(p)) || (!whiteToMove && isBlack(p)))){
      selected={r,c}; hlSquares=legalMoves(r,c); render(); return;
    }
    // invalid
    flash('Nước đi không hợp lệ', true);
    selected=null; hlSquares=[]; render();
  } else {
    if(!p) return;
    if((whiteToMove && isWhite(p)) || (!whiteToMove && isBlack(p))){ selected={r,c}; hlSquares=legalMoves(r,c); render(); }
  }
}

function flash(msg,bad=false){
  stateEl.textContent = msg; stateEl.className = 'badge '+(bad?'bad':'ok');
  clearTimeout(flash._t); flash._t = setTimeout(()=>{stateEl.textContent='Sẵn sàng'; stateEl.className='badge';}, 1200);
}

/*Move generation (with legality filtering)*/
function dirRay(r,c,dr,dc){
  const out=[]; let i=1;
  while(true){ const nr=r+dr*i, nc=c+dc*i; if(!inBoard(nr,nc)) break; const t=board[nr][nc]; if(!t){ out.push({r:nr,c:nc}); } else { if(!sameColor(board[r][c],t)) out.push({r:nr,c:nc}); break; } i++; }
  return out;
}
function sameColor(a,b){ if(!a||!b) return false; return (isWhite(a)&&isWhite(b))||(isBlack(a)&&isBlack(b)); }

function pseudoMoves(r,c){
  const p=board[r][c]; if(!p) return [];
  const color = isWhite(p)?'w':'b';
  const type = p[1];
  let m=[];
  if(type==='P'){
    const dir = color==='w' ? -1 : 1;
    const start = color==='w' ? 6 : 1;
    // forward
    const r1=r+dir; if(inBoard(r1,c) && !board[r1][c]){ m.push({r:r1,c}); const r2=r+2*dir; if(r===start && !board[r2][c]) m.push({r:r2,c, flag:'double'}); }
    // captures
    for(const dc of [-1,1]){ const nr=r+dir, nc=c+dc; if(!inBoard(nr,nc)) continue; const t=board[nr][nc]; if(t && !sameColor(p,t)) m.push({r:nr,c:nc}); }
    // en passant
    if(enPassant && enPassant.color !== color){ // available target set by opponent
      const nr=r+dir, nc=enPassant.c; if(nr===enPassant.r && Math.abs(c-nc)===1){ m.push({r:nr,c:nc, flag:'ep'}); }
    }
  }
  if(type==='N'){
    [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]].forEach(([dr,dc])=>{
      const nr=r+dr, nc=c+dc; if(!inBoard(nr,nc)) return; const t=board[nr][nc]; if(!t || !sameColor(p,t)) m.push({r:nr,c:nc});
    });
  }
  if(type==='B' || type==='Q'){ [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(d=> m.push(...dirRay(r,c,...d))); }
  if(type==='R' || type==='Q'){ [[1,0],[-1,0],[0,1],[0,-1]].forEach(d=> m.push(...dirRay(r,c,...d))); }
  if(type==='K'){
    for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++){ if(!dr&&!dc) continue; const nr=r+dr, nc=c+dc; if(!inBoard(nr,nc)) continue; const t=board[nr][nc]; if(!t||!sameColor(p,t)) m.push({r:nr,c:nc}); }
    // castling
    if(color==='w' && !movedFlags.wK && r===7 && c===4){
      // king side
      if(!movedFlags.wR7 && !board[7][5] && !board[7][6]) m.push({r:7,c:6, flag:'castleK'});
      // queen side
      if(!movedFlags.wR0 && !board[7][1] && !board[7][2] && !board[7][3]) m.push({r:7,c:2, flag:'castleQ'});
    }
    if(color==='b' && !movedFlags.bK && r===0 && c===4){
      if(!movedFlags.bR7 && !board[0][5] && !board[0][6]) m.push({r:0,c:6, flag:'castleK'});
      if(!movedFlags.bR0 && !board[0][1] && !board[0][2] && !board[0][3]) m.push({r:0,c:2, flag:'castleQ'});
    }
  }
  return m;
}

function legalMoves(r,c){
  const p=board[r][c]; if(!p) return [];
  const color = isWhite(p)?'w':'b';
  const moves = pseudoMoves(r,c).filter(m=>{
    // Additional checks for castling path not in check
    if(p[1]==='K' && (m.flag==='castleK' || m.flag==='castleQ')){
      const cols = m.c===6? [4,5,6] : [4,3,2];
      for(const cc of cols){ if(squareAttacked(r,cc, color==='w'?'b':'w')) return false; }
    }
    // simulate
    const snap = snapshot();
    applyMove(r,c,m.r,m.c,m,true);
    const kingSafe = !inCheck(color);
    restore(snap);
    return kingSafe;
  });
  return moves;
}

/*Checks & Attacks*/
function inCheck(color){
  // find king
  const k = color==='w'?'wK':'bK'; let kr=-1,kc=-1;
  for(let r=0;r<8;r++) for(let c=0;c<8;c++) if(board[r][c]===k){ kr=r; kc=c; }
  return squareAttacked(kr,kc, color==='w'?'b':'w');
}

function squareAttacked(r,c,byColor){
  // pawns
  const dir = byColor==='w' ? -1 : 1; // white attacks upwards
  for(const dc of [-1,1]){ const nr=r-dir, nc=c+dc; if(inBoard(nr,nc) && board[nr][nc]=== (byColor==='w'?'wP':'bP')) return true; }
  // knights
  const K=[[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
  for(const [dr,dc] of K){ const nr=r+dr,nc=c+dc; if(inBoard(nr,nc)){ const t=board[nr][nc]; if(t && (byColor==='w'? t==='wN' : t==='bN')) return true; } }
  // king
  for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++){ if(!dr&&!dc) continue; const nr=r+dr,nc=c+dc; if(inBoard(nr,nc)){ const t=board[nr][nc]; if(t && (byColor==='w'? t==='wK' : t==='bK')) return true; } }
  // sliders (rook/queen)
  const R=[[1,0],[-1,0],[0,1],[0,-1]]; for(const [dr,dc] of R){ let i=1; while(true){ const nr=r+dr*i,nc=c+dc*i; if(!inBoard(nr,nc)) break; const t=board[nr][nc]; if(!t){ i++; continue; } const mine = byColor==='w'? isWhite(t) : isBlack(t); if(mine && (t[1]==='R'||t[1]==='Q')) return true; break; } }
  // diagonals (bishop/queen)
  const B=[[1,1],[1,-1],[-1,1],[-1,-1]]; for(const [dr,dc] of B){ let i=1; while(true){ const nr=r+dr*i,nc=c+dc*i; if(!inBoard(nr,nc)) break; const t=board[nr][nc]; if(!t){ i++; continue; } const mine = byColor==='w'? isWhite(t) : isBlack(t); if(mine && (t[1]==='B'||t[1]==='Q')) return true; break; } }
  return false;
}

/*Apply / Undo moves*/
function snapshot(){
  return { board: board.map(r=>r.slice()), whiteToMove, last: last? JSON.parse(JSON.stringify(last)) : null, enPassant: enPassant? {...enPassant}: null, movedFlags: {...movedFlags} };
}
function restore(s){ board = s.board.map(r=>r.slice()); whiteToMove = s.whiteToMove; last = s.last? JSON.parse(JSON.stringify(s.last)) : null; enPassant = s.enPassant? {...s.enPassant}: null; movedFlags = {...s.movedFlags}; }

function applyMove(r1,c1,r2,c2, meta={}, dry=false){
  const piece = board[r1][c1];
  const color = isWhite(piece)?'w':'b';
  // handle en passant capture removal
  if(meta.flag==='ep'){
    if(color==='w'){ board[r2+1][c2] = null; } else { board[r2-1][c2] = null; }
  }
  // castling rook move
  if(piece[1]==='K' && Math.abs(c2-c1)===2){
    if(c2===6){ // king side
      board[r1][5] = board[r1][7]; board[r1][7]=null;
    } else if(c2===2){ // queen side
      board[r1][3] = board[r1][0]; board[r1][0]=null;
    }
  }
  // move piece
  board[r2][c2] = piece; board[r1][c1] = null;
// promotion(phong tốt)
if(piece==='wP' && r2===0){
  if(!dry){
    askPromotion('w', chosen=>{
      board[r2][c2] = chosen;
      render();
      postMoveChecks();
    });
  } else {
    board[r2][c2] = 'wQ'; // mặc định hậu khi giả lập
  }
}

if(piece==='bP' && r2===7){
  if(!dry){
    askPromotion('b', chosen=>{
      board[r2][c2] = chosen;
      render();
      postMoveChecks();
    });
  } else {
    board[r2][c2] = 'bQ';
  }
}


  // update last
  if(!dry){ last = { from:{r:r1,c:c1}, to:{r:r2,c:c2} }; lastMoveEl.textContent = `Nước vừa đi: ${alg(r1,c1)} → ${alg(r2,c2)}${meta.flag==='ep'? ' (e.p.)':''}`; }

  // update enPassant
  if(meta.flag==='double') enPassant = { r:(r1+r2)/2, c:c1, color }; else enPassant=null;

  // update castling flags if king/rook moved from original squares
  if(piece==='wK') movedFlags.wK=true;
  if(piece==='bK') movedFlags.bK=true;
  if(piece==='wR' && r1===7 && c1===0) movedFlags.wR0=true;
  if(piece==='wR' && r1===7 && c1===7) movedFlags.wR7=true;
  if(piece==='bR' && r1===0 && c1===0) movedFlags.bR0=true;
  if(piece==='bR' && r1===0 && c1===7) movedFlags.bR7=true;
}

function makeMove(r1,c1,r2,c2, meta={}){
  // save snapshot for undo
  history.push(snapshot());
  // apply
  applyMove(r1,c1,r2,c2, meta, false);
  // toggle turn
  whiteToMove = !whiteToMove;
  turnEl.textContent = whiteToMove? 'Trắng':'Đen';
}

/*Post-move: check, mate, stalemate*/
function postMoveChecks(){
  const me = whiteToMove? 'w':'b'; // side to move now
  const opp = me==='w'?'b':'w';
  render();
  const inChk = inCheck(me);
  const hasAny = anyLegalMove(me);
  if(inChk && !hasAny){
    // checkmated
    stateEl.textContent = 'Chiếu hết!'; stateEl.className='badge bad';
    statusEl.textContent = (me==='w'? 'Đen':'Trắng') + ' thắng cuộc!';
    alert('♛ Chiến thắng! ' + (me==='w'? 'Đen':'Trắng') + ' chiếu hết.');
    return;
  }
  if(!inChk && !hasAny){
    stateEl.textContent = 'Hòa (pat)!'; stateEl.className='badge'; statusEl.textContent='Không còn nước hợp lệ.'; return;
  }
  if(inChk){ stateEl.textContent='Chiếu!'; stateEl.className='badge bad'; }
  else { stateEl.textContent='Sẵn sàng'; stateEl.className='badge'; }
}

function anyLegalMove(color){
  for(let r=0;r<8;r++) for(let c=0;c<8;c++){
    const p=board[r][c]; if(!p) continue; if((color==='w' && !isWhite(p)) || (color==='b' && !isBlack(p))) continue;
    if(legalMoves(r,c).length) return true;
  }
  return false;
}

/*Helpers*/
function alg(r,c){ return String.fromCharCode(97+c) + (8-r); }

/*Controls*/
btnReset.addEventListener('click', reset);
btnUndo.addEventListener('click',()=>{
  if(!history.length){ flash('Không còn nước để hoàn tác', true); return; }
  const s = history.pop(); restore(s); render(); turnEl.textContent = whiteToMove? 'Trắng':'Đen'; stateEl.textContent='Hoàn tác'; stateEl.className='badge';
});
btnFlip.addEventListener('click',()=>{ flipped=!flipped; render(); });

// init
reset();