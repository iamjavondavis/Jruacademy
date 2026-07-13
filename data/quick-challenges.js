window.QUICK_CHALLENGES = Array.from({length:12},(_,i)=>{const table=i+1;return {id:`q${table}`,table,title:`⚡ ${table} Times Table`,xp:25,questions:Array.from({length:12},(_,j)=>({prompt:`${table} × ${j+1} = ?`,answer:table*(j+1)}))};});

(function loadAcademyExpansion(){
  const script=document.createElement('script');
  script.src='data/academy-expansion.js';
  script.defer=true;
  document.head.appendChild(script);
})();