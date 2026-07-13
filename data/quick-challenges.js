window.QUICK_CHALLENGES = Array.from({length:12},(_,i)=>{const table=i+1;return {id:`q${table}`,table,title:`⚡ ${table} Times Table`,xp:25,questions:Array.from({length:12},(_,j)=>({prompt:`${table} × ${j+1} = ?`,answer:table*(j+1)}))};});

(function loadAcademyExpansion(){
  const script=document.createElement('script');
  script.src='data/academy-expansion.js';
  script.defer=true;
  document.head.appendChild(script);
})();

(function(){
  const FACT_POOL=[
    ['2 × 3','6'],['3 × 4','12'],['3 × 7','21'],['4 × 5','20'],['4 × 8','32'],['5 × 6','30'],
    ['6 × 7','42'],['7 × 8','56'],['8 × 9','72'],['9 × 10','90'],['11 × 11','121'],['12 × 12','144']
  ];
  let cards=[],first=null,second=null,locked=false,matches=0,moves=0,startTime=0,timer=null;

  function shuffleLocal(items){
    const copy=[...items];
    for(let i=copy.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  }

  function renameDashboard(){
    document.querySelectorAll('button,h1,h2,h3').forEach(el=>{
      if(el.textContent.includes('Dad Dashboard')) el.textContent=el.textContent.replace('Dad Dashboard','Parents Dashboard');
    });
  }

  function installStyles(){
    const style=document.createElement('style');
    style.textContent=`
      .match-grid{display:grid;grid-template-columns:repeat(4,minmax(65px,1fr));gap:10px;margin-top:16px}
      .match-card{min-height:84px;border:1px solid #3b82f6;border-radius:14px;background:#172844;color:white;font-size:18px;font-weight:800;padding:8px;display:flex;align-items:center;justify-content:center;text-align:center;cursor:pointer;user-select:none}
      .match-card.covered{font-size:28px;background:#1d4ed8}
      .match-card.matched{background:#14532d;border-color:#22c55e;cursor:default}
      .match-stats{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0}
      @media(max-width:560px){.match-grid{grid-template-columns:repeat(3,1fr)}.match-card{min-height:74px;font-size:16px}}
    `;
    document.head.appendChild(style);
  }

  function installUI(){
    const hero=document.querySelector('#homeView .hero');
    if(hero && !document.getElementById('matchHomeButton')){
      const button=document.createElement('button');
      button.id='matchHomeButton';
      button.className='gold';
      button.textContent='🧠 Memory Match';
      button.onclick=()=>window.show('matchView');
      const parentButton=[...hero.querySelectorAll('button')].find(b=>b.textContent.includes('Parents Dashboard')||b.textContent.includes('Dad Dashboard'));
      hero.insertBefore(button,parentButton||null);
    }

    const homeGrid=document.querySelector('#homeView .grid');
    if(homeGrid && !document.getElementById('matchHomeCard')){
      const card=document.createElement('div');
      card.id='matchHomeCard';
      card.className='card';
      card.innerHTML='<h2>🧠 Memory Match</h2><p>Match multiplication problems with their answers.</p><p class="muted" id="matchBestHome">Best result: not played</p>';
      homeGrid.insertBefore(card,homeGrid.lastElementChild);
    }

    if(!document.getElementById('matchView')){
      const section=document.createElement('section');
      section.id='matchView';
      section.className='hidden';
      section.innerHTML=`
        <button class="secondary" onclick="show('homeView')">Home</button>
        <h1>🧠 Multiplication Memory Match</h1>
        <p>Turn over two cards. Match each multiplication problem with its answer.</p>
        <div class="card">
          <div class="match-stats">
            <span class="pill">Moves: <b id="matchMoves">0</b></span>
            <span class="pill">Time: <b id="matchTime">0</b>s</span>
            <span class="pill">Pairs: <b id="matchPairs">0</b>/6</span>
          </div>
          <button class="gold" onclick="startMemoryMatch()">New Game</button>
          <p id="matchMessage" class="muted">Find all six pairs.</p>
          <div id="matchGrid" class="match-grid"></div>
        </div>`;
      document.querySelector('main').appendChild(section);
    }
  }

  function updateBestText(){
    const best=JSON.parse(localStorage.getItem('jruMatchBest')||'null');
    const text=best?`Best: ${best.moves} moves in ${best.seconds}s`:'Best result: not played';
    const home=document.getElementById('matchBestHome');
    if(home) home.textContent=text;
  }

  function render(){
    const grid=document.getElementById('matchGrid');
    if(!grid)return;
    grid.innerHTML=cards.map((card,i)=>{
      const open=card.open||card.matched;
      return `<button class="match-card ${open?'':'covered'} ${card.matched?'matched':''}" onclick="flipMemoryCard(${i})" ${card.matched?'disabled':''}>${open?card.text:'?'}</button>`;
    }).join('');
    document.getElementById('matchMoves').textContent=moves;
    document.getElementById('matchPairs').textContent=matches;
  }

  window.startMemoryMatch=function(){
    clearInterval(timer);
    const selected=shuffleLocal(FACT_POOL).slice(0,6);
    cards=shuffleLocal(selected.flatMap((pair,i)=>[
      {pair:i,text:pair[0],open:false,matched:false},
      {pair:i,text:pair[1],open:false,matched:false}
    ]));
    first=null;second=null;locked=false;matches=0;moves=0;startTime=Date.now();
    document.getElementById('matchTime').textContent='0';
    document.getElementById('matchMessage').textContent='Find all six pairs.';
    timer=setInterval(()=>{
      const el=document.getElementById('matchTime');
      if(el)el.textContent=Math.floor((Date.now()-startTime)/1000);
    },1000);
    render();
  };

  window.flipMemoryCard=function(i){
    if(locked||cards[i].open||cards[i].matched)return;
    cards[i].open=true;
    if(first===null){first=i;render();return;}
    second=i;moves++;render();locked=true;
    if(cards[first].pair===cards[second].pair){
      cards[first].matched=cards[second].matched=true;
      matches++;first=null;second=null;locked=false;
      document.getElementById('matchMessage').textContent='✅ Match found!';
      if(window.jruPlaySound)window.jruPlaySound('match');
      render();
      if(matches===6){
        clearInterval(timer);
        const seconds=Math.max(1,Math.floor((Date.now()-startTime)/1000));
        const current={moves,seconds};
        const old=JSON.parse(localStorage.getItem('jruMatchBest')||'null');
        if(!old||moves<old.moves||(moves===old.moves&&seconds<old.seconds))localStorage.setItem('jruMatchBest',JSON.stringify(current));
        document.getElementById('matchMessage').textContent=`🏆 All pairs matched in ${moves} moves and ${seconds} seconds!`;
        if(window.jruPlaySound)window.jruPlaySound('reward');
        updateBestText();
      }
    }else{
      document.getElementById('matchMessage').textContent='Not a match—remember where those cards are.';
      if(window.jruPlaySound)window.jruPlaySound('wrong');
      setTimeout(()=>{
        cards[first].open=false;cards[second].open=false;first=null;second=null;locked=false;render();
      },700);
    }
  };

  window.addEventListener('load',()=>{
    renameDashboard();installStyles();installUI();updateBestText();
    const originalShow=window.show;
    window.show=function(id){
      const match=document.getElementById('matchView');
      if(id==='matchView'){
        document.querySelectorAll('main > section').forEach(s=>s.classList.add('hidden'));
        match.classList.remove('hidden');
        if(!cards.length)window.startMemoryMatch();
      }else{
        if(match)match.classList.add('hidden');
        originalShow(id);
        if(id==='homeView'){renameDashboard();updateBestText();}
      }
    };
  });
})();

(function loadUIUpgrade(){
  const script=document.createElement('script');
  script.src='data/ui-upgrade.js';
  script.defer=true;
  document.head.appendChild(script);
})();