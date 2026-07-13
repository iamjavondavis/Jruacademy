(function(){
  const MUSIC_KEY='jruFocusMusic';
  let musicOn=localStorage.getItem(MUSIC_KEY)!=='false';
  let musicTimer=null,musicStep=0,musicCtx=null,lastLines=0;
  const originalSetInterval=window.setInterval.bind(window);

  // Slow only the falling-block timer. Beginner starts near 1.5 seconds.
  window.setInterval=function(fn,delay,...args){
    const isFocusTick=typeof fn==='function'&&fn.name==='step'&&delay<=800;
    return originalSetInterval(fn,isFocusTick?Math.max(650,delay*2.15):delay,...args);
  };

  function audio(){
    if(!musicCtx)musicCtx=new (window.AudioContext||window.webkitAudioContext)();
    if(musicCtx.state==='suspended')musicCtx.resume();
    return musicCtx;
  }
  function note(freq,dur=.12,vol=.025,delay=0){
    if(!musicOn)return;
    try{
      const c=audio(),o=c.createOscillator(),g=c.createGain();
      o.type='square';o.frequency.value=freq;g.gain.value=vol;o.connect(g);g.connect(c.destination);
      const t=c.currentTime+delay;o.start(t);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.stop(t+dur);
    }catch(e){}
  }
  const melody=[262,330,392,330,294,349,440,349,262,330,392,523,494,392,330,294];
  function musicTick(){note(melody[musicStep%melody.length],.16,.018);if(musicStep%4===0)note(131,.22,.012);musicStep++}
  function startMusic(){if(!musicOn||musicTimer)return;musicTick();musicTimer=originalSetInterval(musicTick,260)}
  function stopMusic(){clearInterval(musicTimer);musicTimer=null}

  function addStyles(){
    const s=document.createElement('style');
    s.textContent=`
      #focusView{touch-action:manipulation;-webkit-text-size-adjust:100%}
      #focusView .focus-board,#focusView .focus-controls,#focusView .focus-controls button{touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
      #focusView .focus-controls button{min-width:64px;min-height:58px;font-size:24px}
      #focusView .focus-board.line-flash{animation:focusFlash .42s ease}
      #focusView .focus-board.block-pop{animation:blockPop .18s ease}
      #focusView .focus-cell.filled{transition:transform .12s ease,filter .12s ease}
      #focusView .focus-cell.filled:nth-child(3n){filter:brightness(1.15)}
      .focus-extra-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}
      .focus-stat-box{background:#071a33;border:1px solid #1d74d7;border-radius:12px;padding:10px;text-align:center}
      @keyframes focusFlash{0%{filter:brightness(1)}45%{filter:brightness(2);box-shadow:0 0 45px #ef233c}100%{filter:brightness(1)}}
      @keyframes blockPop{0%{transform:scale(.985)}100%{transform:scale(1)}}
    `;
    document.head.appendChild(s);
  }

  function installUI(){
    const panel=document.querySelector('#focusView .focus-panel');
    if(!panel||document.getElementById('focusBlocks'))return;
    const stats=document.createElement('div');stats.className='focus-extra-stats';
    stats.innerHTML='<div class="focus-stat-box">Blocks on board<br><b id="focusBlocks">0</b></div><div class="focus-stat-box">Pieces placed<br><b id="focusPieces">0</b></div>';
    const firstButton=panel.querySelector('button');panel.insertBefore(stats,firstButton);
    const music=document.createElement('button');music.id='focusMusicToggle';music.className='secondary';
    const draw=()=>music.textContent=musicOn?'🎵 Music On':'🎵 Music Off';draw();
    music.onclick=()=>{musicOn=!musicOn;localStorage.setItem(MUSIC_KEY,String(musicOn));draw();musicOn?startMusic():stopMusic()};
    firstButton.insertAdjacentElement('afterend',music);
    const tip=document.getElementById('focusMessage');if(tip)tip.textContent='Beginner speed is on. Think first, then move the shape.';
  }

  function protectControls(){
    const controls=document.querySelector('#focusView .focus-controls');if(!controls)return;
    ['touchstart','touchmove','touchend','gesturestart','dblclick'].forEach(type=>controls.addEventListener(type,e=>e.preventDefault(),{passive:false}));
    controls.querySelectorAll('button').forEach(b=>{
      b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture?.(e.pointerId)});
    });
  }

  function watchBoard(){
    const board=document.getElementById('focusBoard');if(!board)return;
    let previousFilled=0,pieces=0;
    const update=()=>{
      const filled=board.querySelectorAll('.focus-cell.filled').length;
      const blocks=document.getElementById('focusBlocks');if(blocks)blocks.textContent=filled;
      if(filled>previousFilled){pieces++;const p=document.getElementById('focusPieces');if(p)p.textContent=pieces;board.classList.remove('block-pop');void board.offsetWidth;board.classList.add('block-pop')}
      previousFilled=filled;
      const lines=Number(document.getElementById('focusLines')?.textContent||0);
      if(lines>lastLines){board.classList.remove('line-flash');void board.offsetWidth;board.classList.add('line-flash');if(navigator.vibrate)navigator.vibrate([35,35,55]);lastLines=lines}
    };
    new MutationObserver(update).observe(board,{childList:true,subtree:true,attributes:true});update();
    const start=window.startFocusGame;
    if(start)window.startFocusGame=function(){pieces=0;previousFilled=0;lastLines=0;const p=document.getElementById('focusPieces');if(p)p.textContent='0';start();startMusic()};
  }

  window.addEventListener('load',()=>{
    addStyles();
    setTimeout(()=>{installUI();protectControls();watchBoard()},900);
    document.addEventListener('visibilitychange',()=>document.hidden?stopMusic():(document.getElementById('focusView')&&!document.getElementById('focusView').classList.contains('hidden')&&startMusic()));
    document.addEventListener('click',()=>{const view=document.getElementById('focusView');if(view&&!view.classList.contains('hidden'))startMusic()},{once:true});
  });
})();