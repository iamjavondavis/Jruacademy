(function(){
const swaps=[
['Choose a world and complete today’s mission.','Pick a world and finish one lesson today.'],
['Score 80% or higher.','Get 4 out of 5 right.'],
['Score 75% or higher to unlock the next story.','Get 3 out of 4 right to open the next story.'],
['Questions and answers shuffle every time.','The questions and answers move around each time.'],
['guided hints','helpful hints'],
['randomized','mixed-up'],
['progression','level-up path'],
['customization','make it your own'],
['checkpoint quiz','quick check'],
['correct-answer explanations','easy answer help'],
['Parent recommendations','Tips for parents'],
['Parents Dashboard','Parent Dashboard'],
['Academy Worlds','School Worlds'],
['Skill Report','What Jru Is Learning'],
['Recommendation','What To Practice Next'],
['Complete Lesson','Finish Lesson'],
['Watch Example','Watch a Video'],
['Mastered','Great Job'],
['Needs practice','Keep Practicing'],
['Build Challenge','Try This'],
['Build Steps','Steps'],
['Checkpoint Quiz','Quick Check'],
['progress export','save a copy of progress'],
['Select','Pick'],
['Submit','Check Answer']
];
function simplify(){document.querySelectorAll('button,h1,h2,h3,p,li,th,td,label').forEach(el=>{let t=el.textContent;let changed=t;swaps.forEach(([a,b])=>{changed=changed.split(a).join(b)});if(changed!==t&&el.children.length===0)el.textContent=changed});}
window.addEventListener('load',()=>{simplify();setTimeout(simplify,700);setTimeout(simplify,1800)});
new MutationObserver(()=>simplify()).observe(document.documentElement,{childList:true,subtree:true});
})();