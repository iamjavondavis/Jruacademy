(function(){
const artists=[
{name:'Michael Jackson',group:'Dance & Pop',idea:'Listen for a steady dance beat, bass, guitar, claps, and layered singing.',url:'https://music.apple.com/us/artist/michael-jackson/32940'},
{name:'Travis Scott',group:'Hip-Hop Production',idea:'Listen for deep bass, roomy drums, repeating patterns, sound effects, and changing energy.',url:'https://music.apple.com/us/artist/travis-scott/549236696'},
{name:'Bruno Mars',group:'Pop & Funk',idea:'Listen for bright drums, bass, guitar, horns, and a catchy melody.',url:'https://music.apple.com/us/artist/bruno-mars/278873078'},
{name:'Stevie Wonder',group:'Soul & Keys',idea:'Listen for keyboards, bass, drums, singing, and rich chords.',url:'https://music.apple.com/us/artist/stevie-wonder/46726'},
{name:'Pharrell Williams',group:'Beat Making',idea:'Listen for simple drum patterns, claps, bass, and space between sounds.',url:'https://music.apple.com/us/artist/pharrell-williams/1361068'},
{name:'Earth, Wind & Fire',group:'Funk & Horns',idea:'Listen for horns, bass guitar, drums, rhythm guitar, and group singing.',url:'https://music.apple.com/us/artist/earth-wind-fire/290699'},
{name:'Daft Punk',group:'Electronic Music',idea:'Listen for electronic drums, synths, robot-style sounds, and repeating loops.',url:'https://music.apple.com/us/artist/daft-punk/5468295'},
{name:'Hans Zimmer',group:'Movie Music',idea:'Listen for strings, brass, drums, piano, and sounds that build tension.',url:'https://music.apple.com/us/artist/hans-zimmer/454295032'}
];

const lessons=[
{id:'music1',title:'Hear the Parts of a Song',level:'Starter',goal:'Learn the five main parts of music: beat, bass, chords, melody, and voice.',artist:0,mission:'Listen to one parent-approved song. Tap your knee to the beat. Then name at least three sounds you hear.',steps:[
'Ask a parent to help you open the Apple Music link.',
'Pick one clean, parent-approved song.',
'Listen once without doing anything. Just enjoy it.',
'Listen again and tap your knee to the steady beat.',
'Listen for the lowest sound. That is often the bass.',
'Listen for the tune you could hum. That is the melody.',
'Listen for sounds behind the melody. Those may be chords, guitar, piano, or synths.',
'Write or say three things you heard.'
],gb:null},
{id:'music2',title:'Build Your First Drum Beat',level:'Starter',goal:'Make an original 8-bar drum beat in GarageBand.',artist:4,mission:'Create a beat with kick, snare or clap, and hi-hat.',steps:[
'Open GarageBand on the iPad or iPhone.',
'Tap the plus sign to start a new song.',
'Choose Drums, then choose Beat Sequencer.',
'Pick a drum kit that sounds good to you. Start with a simple kit.',
'At the top, set the song tempo near 90 BPM. BPM means beats per minute.',
'Find the kick drum row. Add a kick on steps 1 and 9.',
'Find the snare or clap row. Add it on steps 5 and 13.',
'Find the closed hi-hat row. Add a hi-hat on every other step.',
'Press Play. Listen for four even beats.',
'Change only one or two squares at a time. Listen after each change.',
'When the pattern feels steady, tap the Tracks button.',
'Drag the right edge of the drum region until it fills 8 bars.',
'Tap My Songs to save. Name it “Jru First Beat.”'
],gb:{tempo:'90 BPM',tracks:['Beat Sequencer drums'],check:['Kick is easy to hear','Clap or snare lands evenly','Beat plays for 8 bars']}},
{id:'music3',title:'Add a Strong Bass Line',level:'Builder',goal:'Add low notes that work with the drum beat.',artist:1,mission:'Add a simple bass pattern with only two or three notes.',steps:[
'Open “Jru First Beat” in GarageBand.',
'Tap the plus button to add a new track.',
'Choose Bass, then pick a clean or synth bass sound.',
'Tap the Controls button and make sure the bass is not too loud.',
'Press Play and listen to the drum beat first.',
'Tap one low note at the start of each group of four beats.',
'Use only two notes at first. Repeating a good pattern is better than using too many notes.',
'Record for 8 bars. It is okay to try again.',
'Open the track editor. Move any note that is far away from the beat line.',
'Press Play with drums and bass together.',
'Lower the bass volume if it covers the drums.',
'Save a new copy named “Jru Beat With Bass.”'
],gb:{tempo:'85–95 BPM',tracks:['Drums','Bass'],check:['Bass follows the beat','Only two or three notes are used','Drums can still be heard']}},
{id:'music4',title:'Make Chords and a Melody',level:'Builder',goal:'Add music that sounds full, then create a short tune.',artist:3,mission:'Use Smart Keyboard to make four chords and a four-note melody.',steps:[
'Open your beat with drums and bass.',
'Add a new track and choose Keyboard.',
'Choose Smart Piano or Smart Keyboard.',
'Turn on Chords view if it is available.',
'Tap one chord and hold it for four beats.',
'Choose a second chord and hold it for four beats.',
'Repeat those two chords for 8 bars.',
'Keep the chord volume lower than the drums and melody.',
'Add another keyboard track for the melody.',
'Choose a bright piano, bell, or synth sound.',
'Play only four notes at first. Leave small spaces between them.',
'Repeat the notes, then change the last note the second time.',
'Listen from the beginning. Make sure the melody is easy to remember.',
'Save the song as “Jru Melody Mission.”'
],gb:{tempo:'90 BPM',tracks:['Drums','Bass','Chords','Melody'],check:['Chords sound soft behind the beat','Melody is short and clear','Each part has space']}},
{id:'music5',title:'Make a Dance Groove',level:'Creator',goal:'Create an upbeat original song that makes people want to move.',artist:0,mission:'Use drums, bass, claps, and one bright instrument to make a dance groove.',steps:[
'Start a new GarageBand song.',
'Set the tempo between 105 and 115 BPM.',
'Use Beat Sequencer to make a steady kick drum pattern.',
'Put a clap or snare on beats 2 and 4.',
'Add hi-hats, but leave some empty spaces so the beat can breathe.',
'Add a bass track. Use short notes that follow the kick drum.',
'Add a clean guitar, piano, horn, or synth track.',
'Make a short rhythm using one or two chords.',
'Add a four-note melody. Repeat it twice.',
'For the last 4 bars, remove one instrument, then bring it back. This makes the song feel like it changes.',
'Use the track volume sliders. Nothing should hurt your ears or cover every other sound.',
'Listen with the screen turned away. Can you still tell when each part enters?',
'Name the song something original.'
],gb:{tempo:'105–115 BPM',tracks:['Dance drums','Bass','Claps','Bright instrument','Melody'],check:['Beat feels steady','Song has a change','Every track can be heard']}},
{id:'music6',title:'Make a Space Beat',level:'Creator',goal:'Use sound choice, echo, and low bass to make an original space mood.',artist:1,mission:'Create a slow space beat with deep bass and wide sounds.',steps:[
'Start a new song and set the tempo between 70 and 85 BPM.',
'Choose electronic drums. Make a simple kick and snare pattern.',
'Leave more empty steps than you used in the dance beat.',
'Add a deep synth bass. Use long notes, but keep the volume safe.',
'Add a pad or soft synth track. A pad is a sound that holds for a long time.',
'Play two long chords across 8 bars.',
'Add a bell, pluck, or soft lead sound for the melody.',
'Open Track Controls for the melody.',
'Add a small amount of echo or reverb. Reverb makes a sound feel like it is in a large room.',
'Do not turn every effect all the way up. A little is enough.',
'Add one sound effect at the start or before a new section.',
'Create a quiet 4-bar part, then a fuller 4-bar part.',
'Listen on low volume and make sure the bass does not hide the melody.',
'Save it with an original space name.'
],gb:{tempo:'70–85 BPM',tracks:['Electronic drums','Deep bass','Pad chords','Bell or synth melody','One sound effect'],check:['There is space between sounds','Effects are not too strong','Quiet and full sections sound different']}},
{id:'music7',title:'Mix the Song',level:'Producer',goal:'Balance the tracks so the whole song is clear.',artist:2,mission:'Fix volume, left-right space, and song sections.',steps:[
'Open one of your finished songs.',
'Press Play and close your eyes. Which track is too loud?',
'Lower that track a small amount.',
'Listen again. Do not change many things at once.',
'Make sure the drums are clear but not harsh.',
'Make sure the bass is strong but does not shake too much.',
'Make sure the melody can be heard without being the loudest sound all the time.',
'Use pan only a little. Pan moves a sound left or right.',
'Keep kick drum, bass, and main voice near the center.',
'Move a small extra sound slightly left or right.',
'Create an intro with fewer tracks.',
'Create a middle section with most tracks playing.',
'Create an ending where sounds stop in a clean way.',
'Play the song through small speakers and headphones with a parent nearby.',
'Turn down the master volume if the song sounds rough.'
],gb:{tempo:'Keep your song tempo',tracks:['All finished tracks'],check:['No track covers the others','Intro, middle, and ending are clear','Volume stays comfortable']}},
{id:'music8',title:'Share Your Original Song',level:'Producer',goal:'Name, export, and explain the music you made.',artist:7,mission:'Export your song and explain which instruments you used.',steps:[
'Open the My Songs screen in GarageBand.',
'Touch and hold your finished song.',
'Tap Rename and give it an original title.',
'Touch and hold it again, then tap Share.',
'Choose Song, not Project, when you want a listening file.',
'Choose a good audio quality. High Quality is fine for most projects.',
'Ask a parent before sending or posting anything.',
'Save the audio to Files or share it only with an approved family member.',
'Return to Jru Academy.',
'Write the song title.',
'List the instruments you used.',
'Write one sentence about the mood of the song.',
'Write one thing you would improve next time.',
'Never use another person’s music, artwork, or voice without permission.'
],gb:{tempo:'Any',tracks:['Your complete song'],check:['Song has an original name','Parent approves sharing','Jru can explain the instruments']} }
];

let completed=JSON.parse(localStorage.getItem('jruMusicCompleted')||'{}');
function style(){const s=document.createElement('style');s.textContent=`
.music-hero{background:linear-gradient(135deg,#070b18,#123f86 55%,#a20f24);border:1px solid #ef233c}.artist-grid,.music-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}.artist-card{background:#080d19;border:1px solid #274d86;border-radius:16px;padding:14px}.music-step{background:#091326;border-left:4px solid #ef233c;border-radius:10px;padding:11px;margin:8px 0}.music-check{background:#081d18;border:1px solid #1f9d70;border-radius:12px;padding:12px;margin-top:12px}.music-tag{font-size:12px;color:#9fc5ff;text-transform:uppercase;letter-spacing:.08em}.music-progress{font-weight:800;color:#fff}.app-tip{background:#15100a;border:1px solid #f59e0b;border-radius:14px;padding:13px;margin:12px 0}
`;document.head.appendChild(s)}
function install(){
 const hero=document.querySelector('#homeView .hero');
 if(hero&&!document.getElementById('musicBtn')){const b=document.createElement('button');b.id='musicBtn';b.className='red';b.textContent='🎵 Music Studio';b.onclick=showMusic;hero.insertBefore(b,hero.lastElementChild)}
 if(document.getElementById('musicView'))return;
 const sec=document.createElement('section');sec.id='musicView';sec.className='hidden';sec.innerHTML=`<button class="secondary" onclick="show('homeView')">Home</button><div class="hero music-hero"><h1>🎵 Creator Academy: Music Studio</h1><p>Listen closely. Learn what each sound does. Then make your own music in GarageBand.</p><p class="music-progress">Lessons finished: <span id="musicDone">0</span>/8</p></div><div class="app-tip"><b>Parent rule:</b> A parent chooses the song. Use clean versions. Do not browse videos or music alone.</div><h2>Listen in Apple Music</h2><div id="artistGrid" class="artist-grid"></div><h2 style="margin-top:20px">GarageBand Missions</h2><div id="musicGrid" class="music-grid"></div>`;document.querySelector('main').appendChild(sec);
 const lesson=document.createElement('section');lesson.id='musicLessonView';lesson.className='hidden';lesson.innerHTML=`<button class="secondary" onclick="showMusic()">Back</button><div class="card"><div class="music-tag" id="musicLevel"></div><h1 id="musicTitle"></h1><p><b>Goal:</b> <span id="musicGoal"></span></p><p><b>Your mission:</b> <span id="musicMission"></span></p><button class="blue" id="musicListenBtn">Listen in Apple Music</button><a class="button-link" href="https://apps.apple.com/us/app/garageband/id408709785" target="_blank"><button class="secondary">Get or Open GarageBand</button></a></div><div class="card"><h2>Follow These Steps</h2><div id="musicSteps"></div><div id="musicBuildInfo" class="music-check"></div><button class="red" onclick="finishMusicLesson()">I Finished This Mission</button></div>`;document.querySelector('main').appendChild(lesson);
}
function renderMusic(){document.getElementById('musicDone').textContent=Object.values(completed).filter(Boolean).length;document.getElementById('artistGrid').innerHTML=artists.map((a,i)=>`<div class="artist-card"><div class="music-tag">${a.group}</div><h3>${a.name}</h3><p>${a.idea}</p><a href="${a.url}" target="_blank" rel="noopener"><button class="blue">Open ${a.name} on Apple Music</button></a></div>`).join('');document.getElementById('musicGrid').innerHTML=lessons.map((l,i)=>`<div class="card"><div class="music-tag">${l.level}</div><h3>${i+1}. ${l.title}</h3><p>${l.goal}</p><p class="muted">${completed[l.id]?'✅ Finished':'Ready to start'}</p><button onclick="openMusicLesson(${i})">${completed[l.id]?'Do Again':'Start Mission'}</button></div>`).join('')}
let active=0;
window.openMusicLesson=i=>{active=i;const l=lessons[i],a=artists[l.artist];document.querySelectorAll('main > section').forEach(s=>s.classList.add('hidden'));document.getElementById('musicLessonView').classList.remove('hidden');document.getElementById('musicLevel').textContent=l.level;document.getElementById('musicTitle').textContent=l.title;document.getElementById('musicGoal').textContent=l.goal;document.getElementById('musicMission').textContent=l.mission;const listen=document.getElementById('musicListenBtn');listen.textContent='Open '+a.name+' on Apple Music';listen.onclick=()=>window.open(a.url,'_blank','noopener');document.getElementById('musicSteps').innerHTML=l.steps.map((x,n)=>`<div class="music-step"><b>Step ${n+1}:</b> ${x}</div>`).join('');document.getElementById('musicBuildInfo').innerHTML=l.gb?`<b>Project Check</b><p><b>Tempo:</b> ${l.gb.tempo}</p><p><b>Tracks:</b> ${l.gb.tracks.join(', ')}</p><ul>${l.gb.check.map(x=>`<li>${x}</li>`).join('')}</ul>`:'<b>Listening Check</b><p>Tell a parent three sounds you heard.</p>'};
window.finishMusicLesson=()=>{const l=lessons[active];if(!completed[l.id]&&window.state){window.state.xp=(window.state.xp||0)+35;if(window.save)window.save()}completed[l.id]=true;localStorage.setItem('jruMusicCompleted',JSON.stringify(completed));if(window.jruPlaySound)window.jruPlaySound('reward');showMusic()};
window.showMusic=()=>{document.querySelectorAll('main > section').forEach(s=>s.classList.add('hidden'));document.getElementById('musicView').classList.remove('hidden');renderMusic()};
window.addEventListener('load',()=>{style();install();renderMusic()});
})();