(function(){
  const MUSIC_KEY='jruFocusMusic';
  let musicOn=localStorage.getItem(MUSIC_KEY)!=='false';
  let musicTimer=null,musicStep=0,musicCtx=null,lastLines=0;
  const originalSetInterval=window.setInterval.bind(window);

  window.setInterval=function(fn,delay,...args){
    const isFocusTick=typeof fn==='function'&&fn.name==='step'&&delay<=800;
    return originalSetInterval(fn,isFocusTick?Math.max(650,delay*2.15):delay,...args);
  };

  function audio(){if(!musicCtx)musicCtx=new (window.AudioContext||window.webkitAudioContext)();if(musicCtx.state==='suspended')musicCtx.resume();return musicCtx}
  function note(freq,dur=.12,vol=.025,delay=0){if(!musicOn)return;try{const c=audio(),o=c.createOscillator(),g=c.createGain();o.type='square';o.frequency.value=freq;g.gain.value=vol;o.connect(g);g.connect(c.destination);const t=c.currentTime+delay;o.start(t);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.stop(t+dur)}catch(e){}}
  const melody=[262,330,392,330,294,349,440,349,262,330,392,523,494,392,330,294];
  function musicTick(){note(melody[musicStep%melody.length],.16,.018);if(musicStep%4===0)note(131,.22,.012);musicStep++}
  function startMusic(){if(!musicOn||musicTimer)return;musicTick();musicTimer=originalSetInterval(musicTick,260)}
  function stopMusic(){clearInterval(musicTimer);musicTimer=null}

  function addStyles(){
    const s=document.createElement('style');
    s.textContent=`
      #focusView{touch-action:manipulation;-webkit-text-size-adjust:100%;width:100%;max-width:none;padding-bottom:18px}
      #focusView>h1{font-size:clamp(24px,5vw,36px);margin:4px 0}
      #focusView>p{margin:4px auto 10px;max-width:720px;font-size:14px}
      #focusView .focus-wrap{display:flex!important;flex-direction:column!important;align-items:center!important;gap:10px!important;width:100%!important}
      #focusView .focus-game-side{width:100%;display:flex;flex-direction:column;align-items:center;gap:8px}
      #focusView .focus-board{height:clamp(420px,68dvh,760px)!important;width:auto!important;max-width:94vw!important;aspect-ratio:10/18!important;margin:0 auto!important;padding:6px!important;border-radius:14px!important}
      #focusView .focus-board,#focusView .focus-controls,#focusView .focus-controls button{touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
      #focusView .focus-controls{display:grid!important;grid-template-columns:repeat(4,minmax(62px,82px))!important;gap:8px!important;margin-top:2px!important;justify-content:center!important}
      #focusView .focus-controls button{width:100%;min-width:62px;min-height:58px;font-size:27px;margin:0!important}
      #focusView .focus-panel{width:min(94vw,620px)!important;padding:10px 12px!important;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;align-items:center}
      #focusView .focus-panel h2{display:none}
      #focusView .focus-panel .big{font-size:18px!important;margin:0;text-align:center}
      #focusView .focus-panel>p:not(.focus-tip){margin:0;text-align:center;font-size:14px}
      #focusView .focus-panel>button{min-height:44px;margin:0!important;padding:8px 10px!important}
      #focusView .focus-panel .focus-extra-stats{grid-column:1/-1;margin:0;grid-template-columns:repeat(2,1fr)}
      #focusView .focus-panel #focusMessage{grid-column:1/-1;margin:0;padding:8px;font-size:13px;text-align:center}
      #focusView .focus-panel .focus-tip:last-child{display:none}
      #focusView .focus-board.line-flash{animation:focusFlash .42s ease}
      #focusView .focus-board.block-pop{animation:blockPop .18s ease}
      #focusView .focus-cell.filled{transition:transform .12s ease,filter .12s ease}
      #focusView .focus-cell.filled:nth-child(3n){filter:brightness(1.15)}
      .focus-extra-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}
      .focus-stat-box{background:#071a33;border:1px solid #1d74d7;border-radius:10px;padding:7px;text-align:center;font-size:13px}
      @keyframes focusFlash{0%{filter:brightness(1)}45%{filter:brightness(2);box-shadow:0 0 45px #ef233c}100%{filter:brightness(1)}}
      @keyframes blockPop{0%{transform:scale(.985)}100%{transform:scale(1)}}

      @media(max-width:700px){
        main{padding-left:6px!important;padding-right:6px!important}
        #focusView{margin-top:-8px}
        #focusView>button:first-child{padding:8px 11px!important;margin-bottom:1px!important}
        #focusView>p{font-size:12px;line-height:1.3;margin-bottom:6px}
        #focusView .focus-board{height:min(69dvh,680px)!important;min-height:420px!important;max-width:96vw!important}
        #focusView .focus-panel{grid-template-columns:repeat(3,1fr);width:96vw!important}
        #focusView .focus-panel .focus-extra-stats,#focusView .focus-panel #focusMessage{grid-column:1/-1}
        .sound-toggle{bottom:8px!important;right:8px!important}
      }

      @media(orientation:landscape) and (min-width:768px){
        #focusView{padding:4px 8px 10px!important}
        #focusView>h1{font-size:25px;margin:0 0 2px}
        #focusView>p{display:none}
        #focusView .focus-wrap{display:grid!important;grid-template-columns:minmax(570px,1fr) minmax(220px,310px)!important;align-items:start!important;justify-content:center!important;gap:12px!important;max-width:1180px;margin:0 auto}
        #focusView .focus-game-side{display:grid!important;grid-template-columns:auto 92px!important;align-items:center!important;justify-content:center!important;gap:10px!important;width:auto!important}
        #focusView .focus-board{height:min(82dvh,760px)!important;max-height:calc(100dvh - 105px)!important;max-width:none!important;margin:0!important}
        #focusView .focus-controls{grid-template-columns:repeat(2,78px)!important;grid-template-rows:repeat(4,64px)!important;gap:8px!important;margin:0!important;align-content:center!important}
        #focusView .focus-controls span{display:none!important}
        #focusView .focus-controls button{min-width:78px!important;min-height:64px!important;font-size:28px!important}
        #focusView .focus-panel{width:100%!important;max-width:310px!important;grid-template-columns:1fr 1fr!important;gap:8px!important;position:sticky;top:72px}
        #focusView .focus-panel .focus-extra-stats{grid-column:1/-1}
        #focusView .focus-panel #focusMessage{grid-column:1/-1}
        #focusView .focus-panel>button{grid-column:span 1}
      }

      @media(orientation:landscape) and (min-width:768px) and (max-height:760px){
        #focusView .focus-board{height:calc(100dvh - 90px)!important;min-height:0!important}
        #focusView .focus-controls{grid-template-columns:repeat(2,68px)!important;grid-template-rows:repeat(4,54px)!important}
        #focusView .focus-controls button{min-width:68px!important;min-height:54px!important;font-size:24px!important}
        #focusView .focus-panel{padding:8px!important}
      }

      @media(max-height:700px) and (orientation:portrait){
        #focusView>p{display:none}
        #focusView .focus-board{height:61dvh!important;min-height:360px!important}
        #focusView .focus-controls button{min-height:52px!important}
      }
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
    const tip=document.getElementById('focusMessage');if(tip)tip.textContent='Use ↺ and ↻ to turn the shape. The controls stay beside the board in landscape.';
  }

  function protectControls(){
    const controls=document.querySelector('#focusView .focus-controls');if(!controls)return;
    ['touchstart','touchmove','touchend','gesturestart','dblclick'].forEach(type=>controls.addEventListener(type,e=>e.preventDefault(),{passive:false}));
    controls.querySelectorAll('button').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture?.(e.pointerId)}));
  }

  function watchBoard(){
    const board=document.getElementById('focusBoard');if(!board)return;
    let previousFilled=0,pieces=0;
    const update=()=>{const filled=board.querySelectorAll('.focus-cell.filled:not(.active)').length;const blocks=document.getElementById('focusBlocks');if(blocks)blocks.textContent=filled;if(filled>previousFilled){pieces++;const p=document.getElementById('focusPieces');if(p)p.textContent=pieces;board.classList.remove('block-pop');void board.offsetWidth;board.classList.add('block-pop')}previousFilled=filled;const lines=Number(document.getElementById('focusLines')?.textContent||0);if(lines>lastLines){board.classList.remove('line-flash');void board.offsetWidth;board.classList.add('line-flash');if(navigator.vibrate)navigator.vibrate([35,35,55]);lastLines=lines}};
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