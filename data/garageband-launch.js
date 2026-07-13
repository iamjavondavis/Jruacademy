(function(){
  const APP_STORE='https://apps.apple.com/us/app/garageband/id408709785';
  const SCHEME='garageband://';
  let currentLesson='music1';

  function getProgress(){
    return JSON.parse(localStorage.getItem('jruMusicWorkflow')||'{}');
  }

  function saveProgress(data){
    localStorage.setItem('jruMusicWorkflow',JSON.stringify(data));
  }

  function setStep(step,value=true){
    const all=getProgress();
    all[currentLesson]=all[currentLesson]||{};
    all[currentLesson][step]=value;
    saveProgress(all);
    renderChecklist();
  }

  function installStyles(){
    if(document.getElementById('garageBandLaunchStyles'))return;
    const style=document.createElement('style');
    style.id='garageBandLaunchStyles';
    style.textContent=`
      .music-workflow{margin:14px 0;padding:14px;border:1px solid #315a9f;border-radius:14px;background:#070d19}
      .music-workflow-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}
      .music-workflow-step{padding:10px;border-radius:10px;background:#111827;border:1px solid #334155;text-align:center;font-weight:800}
      .music-workflow-step.done{background:#123524;border-color:#22c55e}
      .garage-status{margin-top:9px;color:#bfdbfe;font-size:14px}
      @media(max-width:560px){.music-workflow-grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function renderChecklist(){
    const box=document.getElementById('musicWorkflowBox');
    if(!box)return;
    const all=getProgress();
    const p=all[currentLesson]||{};
    box.innerHTML=`
      <b>Your 3 Steps</b>
      <div class="music-workflow-grid">
        <div class="music-workflow-step ${p.listened?'done':''}">1. ${p.listened?'✅':'🎧'} Listen</div>
        <div class="music-workflow-step ${p.opened?'done':''}">2. ${p.opened?'✅':'🎹'} Create</div>
        <div class="music-workflow-step ${p.finished?'done':''}">3. ${p.finished?'✅':'🏆'} Finish</div>
      </div>
      <div id="garageStatus" class="garage-status">Tap Listen first. Then come back and tap Open GarageBand.</div>`;
  }

  function lessonIdFromTitle(){
    const title=(document.getElementById('musicTitle')||{}).textContent||'';
    const map={
      'Hear the Parts of a Song':'music1',
      'Build Your First Drum Beat':'music2',
      'Add a Strong Bass Line':'music3',
      'Make Chords and a Melody':'music4',
      'Make a Dance Groove':'music5',
      'Make a Space Beat':'music6',
      'Mix the Song':'music7',
      'Share Your Original Song':'music8'
    };
    return map[title]||currentLesson;
  }

  function installLessonTools(){
    const view=document.getElementById('musicLessonView');
    if(!view)return;
    currentLesson=lessonIdFromTitle();

    const card=view.querySelector('.card');
    if(card&&!document.getElementById('musicWorkflowBox')){
      const box=document.createElement('div');
      box.id='musicWorkflowBox';
      box.className='music-workflow';
      const steps=view.querySelector('.card:nth-of-type(2)');
      card.appendChild(box);
    }

    const oldLink=[...view.querySelectorAll('a')].find(a=>a.href.includes('garageband'));
    if(oldLink&&!document.getElementById('openGarageBandBtn')){
      const button=document.createElement('button');
      button.id='openGarageBandBtn';
      button.className='red';
      button.textContent='🎹 Open GarageBand';
      button.type='button';
      button.onclick=window.openGarageBandForLesson;
      oldLink.replaceWith(button);
    }
    renderChecklist();
  }

  window.openGarageBandForLesson=function(){
    setStep('opened');
    if(window.jruPlaySound)window.jruPlaySound('correct');
    const status=document.getElementById('garageStatus');
    if(status)status.textContent='Opening GarageBand… If it does not open, the App Store will appear.';

    let leftPage=false;
    const markLeft=()=>{leftPage=true};
    window.addEventListener('pagehide',markLeft,{once:true});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)leftPage=true},{once:true});

    window.location.href=SCHEME;
    setTimeout(()=>{
      if(!leftPage&&!document.hidden){
        window.location.href=APP_STORE;
      }
    },1600);
  };

  function wrapMusicFunctions(){
    if(window.__jruMusicWorkflowWrapped)return;
    if(typeof window.openMusicLesson!=='function'||typeof window.finishMusicLesson!=='function')return;
    window.__jruMusicWorkflowWrapped=true;

    const originalOpen=window.openMusicLesson;
    window.openMusicLesson=function(i){
      currentLesson='music'+(i+1);
      originalOpen(i);
      setTimeout(installLessonTools,50);
    };

    const originalFinish=window.finishMusicLesson;
    window.finishMusicLesson=function(){
      currentLesson=lessonIdFromTitle();
      setStep('finished');
      originalFinish();
    };
  }

  document.addEventListener('click',event=>{
    if(event.target&&event.target.id==='musicListenBtn'){
      currentLesson=lessonIdFromTitle();
      setStep('listened');
    }
  },true);

  installStyles();
  window.addEventListener('load',()=>{
    const timer=setInterval(()=>{
      wrapMusicFunctions();
      installLessonTools();
      if(window.__jruMusicWorkflowWrapped)clearInterval(timer);
    },250);
    setTimeout(()=>clearInterval(timer),10000);
  });

  new MutationObserver(()=>{
    wrapMusicFunctions();
    if(document.getElementById('musicLessonView')&&!document.getElementById('musicLessonView').classList.contains('hidden'))installLessonTools();
  }).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
})();