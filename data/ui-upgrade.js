(function(){
  const AUDIO_KEY='jruSoundEnabled';
  let soundEnabled=localStorage.getItem(AUDIO_KEY)!=='false';
  let audioCtx=null;

  function ctx(){
    if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    if(audioCtx.state==='suspended') audioCtx.resume();
    return audioCtx;
  }
  function tone(freq,duration=.12,type='sine',volume=.05,delay=0){
    if(!soundEnabled)return;
    try{
      const c=ctx(),o=c.createOscillator(),g=c.createGain();
      o.type=type;o.frequency.value=freq;g.gain.value=volume;
      o.connect(g);g.connect(c.destination);
      const t=c.currentTime+delay;o.start(t);g.gain.exponentialRampToValueAtTime(.001,t+duration);o.stop(t+duration);
    }catch(e){}
  }
  function playSound(kind){
    if(kind==='correct'){tone(523,.1,'triangle',.06);tone(659,.12,'triangle',.05,.08);tone(784,.14,'triangle',.05,.16)}
    else if(kind==='reward'){tone(392,.12,'square',.04);tone(523,.12,'square',.04,.1);tone(659,.14,'square',.04,.2);tone(784,.22,'square',.04,.3)}
    else if(kind==='match'){tone(440,.08,'sine',.05);tone(660,.12,'sine',.05,.07)}
    else if(kind==='wrong'){tone(180,.12,'sawtooth',.025);tone(140,.16,'sawtooth',.02,.09)}
    else if(kind==='line'){tone(330,.08,'triangle',.05);tone(494,.1,'triangle',.05,.07);tone(659,.14,'triangle',.05,.14)}
  }
  window.jruPlaySound=playSound;

  function installTheme(){
    const style=document.createElement('style');
    style.textContent=`
      :root{--bg:#020817!important;--panel:#071a33!important;--panel2:#0c2748!important;--line:#1f4f7a!important;--text:#f8fafc!important;--muted:#b8c7d9!important;--green:#ef233c!important;--gold:#ff4d5f!important;--purple:#123f73!important;--red:#ef233c!important;--blue:#1d74d7!important;--cyan:#38bdf8!important}
      body{background:radial-gradient(circle at top,#0a3768 0,#020817 42%,#000 100%)!important}
      header{background:rgba(0,5,15,.96)!important;border-bottom:2px solid #ef233c!important;box-shadow:0 8px 30px rgba(0,0,0,.35)}
      .hero{background:linear-gradient(135deg,#071a33 0,#0d4f91 58%,#b80f2e 100%)!important;border:1px solid #ef233c!important;box-shadow:0 16px 40px rgba(0,0,0,.35)}
      .card{background:linear-gradient(180deg,#0a1f3a,#050b14)!important;border:1px solid #214f79!important;box-shadow:0 10px 24px rgba(0,0,0,.25);transition:transform .18s ease,border-color .18s ease}
      .card:hover{transform:translateY(-2px);border-color:#ef233c!important}
      button{background:linear-gradient(180deg,#ef233c,#b80f2e)!important;box-shadow:0 5px 0 #68091a,0 10px 20px rgba(0,0,0,.22);transition:transform .12s ease,filter .12s ease}
      button:active{transform:translateY(3px);box-shadow:0 2px 0 #68091a}
      button.secondary{background:linear-gradient(180deg,#133e68,#071a33)!important;box-shadow:0 5px 0 #020817}
      button.blue,button.cyan,button.purple{background:linear-gradient(180deg,#1976d2,#0a3768)!important;box-shadow:0 5px 0 #031a31}
      button.gold{background:linear-gradient(180deg,#ff4d5f,#c91832)!important;color:#fff!important;box-shadow:0 5px 0 #68091a}
      .pill{background:#020817!important;border-color:#24547e!important}.progress{background:#01040a!important}.bar{background:linear-gradient(90deg,#1d74d7,#ef233c)!important}
      .choice{background:linear-gradient(180deg,#102d50,#071a33)!important;border-color:#2c5d89!important}.choice:hover{border-color:#ef233c!important}.correct{background:#0b5d3b!important;border-color:#22c55e!important}.wrong{background:#6f1024!important;border-color:#ef233c!important}
      .sound-toggle{position:fixed;right:14px;bottom:14px;z-index:9999;border-radius:999px!important;width:48px;height:48px;padding:0!important;font-size:20px}
      .focus-wrap{display:grid;grid-template-columns:minmax(240px,360px) minmax(180px,1fr);gap:18px;align-items:start}.focus-board{background:#01040a;border:3px solid #1d74d7;border-radius:18px;padding:8px;display:grid;grid-template-columns:repeat(10,1fr);aspect-ratio:1/2;gap:2px;box-shadow:0 0 30px rgba(29,116,215,.35)}
      .focus-cell{background:#07111f;border-radius:3px}.focus-cell.filled{background:linear-gradient(135deg,#ef233c,#ff6b7b);box-shadow:inset 0 0 0 1px rgba(255,255,255,.22)}.focus-cell.active{background:linear-gradient(135deg,#1d74d7,#67b5ff);box-shadow:0 0 8px rgba(103,181,255,.8)}
      .focus-controls{display:grid;grid-template-columns:repeat(3,64px);gap:8px;justify-content:center;margin-top:14px}.focus-controls button{font-size:22px;min-height:54px}.focus-panel .big{font-size:28px}.focus-tip{background:#071a33;border-left:4px solid #ef233c;border-radius:10px;padding:12px;margin-top:12px}
      @media(max-width:700px){.focus-wrap{grid-template-columns:1fr}.focus-board{max-width:320px;margin:auto}.sound-toggle{bottom:10px;right:10px}}
    `;
    document.head.appendChild(style);
  }

  function installSoundToggle(){
    if(document.getElementById('soundToggle'))return;
    const b=document.createElement('button');b.id='soundToggle';b.className='sound-toggle secondary';
    const draw=()=>b.textContent=soundEnabled?'🔊':'🔇';draw();
    b.onclick=()=>{soundEnabled=!soundEnabled;localStorage.setItem(AUDIO_KEY,String(soundEnabled));draw();if(soundEnabled)playSound('correct')};
    document.body.appendChild(b);
  }

  function hookFeedback(){
    const observer=new MutationObserver(muts=>{
      for(const m of muts){
        const t=(m.target.textContent||'').toLowerCase();
        if(!t)continue;
        if(/correct|great thinking|nice work|you got it|strong answer|sharp/.test(t))playSound('correct');
        else if(/match found/.test(t))playSound('match');
        else if(/mastered|all pairs matched|earned|badge|complete/.test(t))playSound('reward');
        else if(/not quite|not a match|answer:/.test(t))playSound('wrong');
      }
    });
    document.querySelectorAll('#mathFeedback,#quickFeedback,#readingFeedback,#robloxQuizFeedback,#matchMessage,#resultMessage').forEach(el=>observer.observe(el,{childList:true,subtree:true,characterData:true}));
  }

  const W=10,H=18;
  const SHAPES=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]],[[1,1,0],[0,1,1]],[[0,1,1],[1,1,0]]];
  let board=[],piece=null,px=0,py=0,score=0,lines=0,level=1,loop=null,running=false;
  const clone=m=>m.map(r=>[...r]);
  function rotate(m){return m[0].map((_,i)=>m.map(r=>r[i]).reverse())}
  function collide(nx,ny,shape){for(let y=0;y<shape.length;y++)for(let x=0;x<shape[y].length;x++)if(shape[y][x]){const bx=nx+x,by=ny+y;if(bx<0||bx>=W||by>=H||(by>=0&&board[by][bx]))return true}return false}
  function spawn(){piece=clone(SHAPES[Math.floor(Math.random()*SHAPES.length)]);px=Math.floor((W-piece[0].length)/2);py=-1;if(collide(px,py,piece)){endFocusGame()}}
  function merge(){for(let y=0;y<piece.length;y++)for(let x=0;x<piece[y].length;x++)if(piece[y][x]&&py+y>=0)board[py+y][px+x]=1}
  function clearLines(){let cleared=0;board=board.filter(r=>{if(r.every(Boolean)){cleared++;return false}return true});while(board.length<H)board.unshift(Array(W).fill(0));if(cleared){lines+=cleared;score+=cleared*100*level;level=1+Math.floor(lines/5);playSound('line');restartLoop();updateFocusStats()}}
  function step(){if(!running)return;if(!collide(px,py+1,piece)){py++}else{merge();clearLines();spawn()}renderFocus()}
  function restartLoop(){clearInterval(loop);if(running)loop=setInterval(step,Math.max(180,700-(level-1)*70))}
  function move(dx){if(running&&!collide(px+dx,py,piece)){px+=dx;renderFocus()}}
  function down(){if(running){step();score+=1;updateFocusStats()}}
  function turn(){if(!running)return;const r=rotate(piece);if(!collide(px,py,r)){piece=r;renderFocus()}}
  function drop(){if(!running)return;let d=0;while(!collide(px,py+1,piece)){py++;d++}score+=d*2;step();updateFocusStats()}
  function renderFocus(){const el=document.getElementById('focusBoard');if(!el)return;const view=board.map(r=>[...r]);if(piece)for(let y=0;y<piece.length;y++)for(let x=0;x<piece[y].length;x++)if(piece[y][x]){const yy=py+y,xx=px+x;if(yy>=0&&yy<H&&xx>=0&&xx<W)view[yy][xx]=2}el.innerHTML=view.flat().map(v=>`<div class="focus-cell ${v===1?'filled':v===2?'active':''}"></div>`).join('')}
  function updateFocusStats(){['focusScore','focusLines','focusLevel'].forEach((id,i)=>{const e=document.getElementById(id);if(e)e.textContent=[score,lines,level][i]})}
  function endFocusGame(){running=false;clearInterval(loop);const best=Math.max(Number(localStorage.getItem('jruFocusBest')||0),score);localStorage.setItem('jruFocusBest',best);const m=document.getElementById('focusMessage');if(m)m.textContent=`Game over. Score: ${score}. Best: ${best}.`;playSound('reward');const home=document.getElementById('focusBestHome');if(home)home.textContent=`Best score: ${best}`}
  window.startFocusGame=function(){board=Array.from({length:H},()=>Array(W).fill(0));score=0;lines=0;level=1;running=true;spawn();updateFocusStats();const m=document.getElementById('focusMessage');if(m)m.textContent='Plan ahead, rotate shapes, and complete full rows.';restartLoop();renderFocus()};
  window.focusMove=move;window.focusDown=down;window.focusRotate=turn;window.focusDrop=drop;

  function installFocusUI(){
    const hero=document.querySelector('#homeView .hero');
    if(hero&&!document.getElementById('focusHomeButton')){const b=document.createElement('button');b.id='focusHomeButton';b.className='blue';b.textContent='🧩 Block Focus';b.onclick=()=>window.show('focusView');const parent=[...hero.querySelectorAll('button')].find(x=>x.textContent.includes('Parents Dashboard'));hero.insertBefore(b,parent||null)}
    const grid=document.querySelector('#homeView .grid');
    if(grid&&!document.getElementById('focusHomeCard')){const c=document.createElement('div');c.id='focusHomeCard';c.className='card';const best=localStorage.getItem('jruFocusBest')||0;c.innerHTML=`<h2>🧩 Block Focus</h2><p>Build spatial awareness, planning, and pattern recognition.</p><p class="muted" id="focusBestHome">Best score: ${best}</p>`;grid.insertBefore(c,grid.lastElementChild)}
    if(!document.getElementById('focusView')){const s=document.createElement('section');s.id='focusView';s.className='hidden';s.innerHTML=`<button class="secondary" onclick="show('homeView')">Home</button><h1>🧩 Block Focus</h1><p>Use planning and spatial awareness to complete full rows. This is an original falling-block puzzle.</p><div class="focus-wrap"><div><div id="focusBoard" class="focus-board"></div><div class="focus-controls"><span></span><button onclick="focusRotate()">↻</button><span></span><button onclick="focusMove(-1)">←</button><button onclick="focusDown()">↓</button><button onclick="focusMove(1)">→</button><span></span><button onclick="focusDrop()">⇩</button><span></span></div></div><div class="card focus-panel"><h2>Game Stats</h2><p class="big">Score: <span id="focusScore">0</span></p><p>Lines: <b id="focusLines">0</b></p><p>Level: <b id="focusLevel">1</b></p><button onclick="startFocusGame()">Start New Game</button><p id="focusMessage" class="focus-tip">Think about where each shape will fit before moving it.</p><div class="focus-tip"><b>Skills trained</b><p>Spatial awareness, visual rotation, planning, focus, pattern recognition, and quick decision-making.</p></div></div></div>`;document.querySelector('main').appendChild(s)}
  }

  window.addEventListener('load',()=>{
    installTheme();installSoundToggle();installFocusUI();hookFeedback();
    const originalShow=window.show;
    window.show=function(id){
      const focus=document.getElementById('focusView');
      if(id==='focusView'){
        document.querySelectorAll('main > section').forEach(s=>s.classList.add('hidden'));focus.classList.remove('hidden');if(!running&&!piece)window.startFocusGame();
      }else{
        if(focus)focus.classList.add('hidden');originalShow(id);
      }
    };
    document.addEventListener('keydown',e=>{if(document.getElementById('focusView')?.classList.contains('hidden'))return;if(e.key==='ArrowLeft')move(-1);else if(e.key==='ArrowRight')move(1);else if(e.key==='ArrowDown')down();else if(e.key==='ArrowUp')turn();else if(e.key===' ')drop()});
  });
})();