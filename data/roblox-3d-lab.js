(function(){
  let THREE,renderer,scene,camera,world,animationId,dragging=false,lastX=0,lastY=0,yaw=.45,pitch=.35,zoom=12;
  const lessonScenes=['spawn','plot','script','stardust','planet','traits','hud','complete'];

  function loadThree(done){
    if(window.THREE){THREE=window.THREE;done();return;}
    const s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
    s.onload=()=>{THREE=window.THREE;done();};
    s.onerror=()=>{const m=document.getElementById('rb3dMessage');if(m)m.textContent='The 3D world could not load. Check the internet and try again.';};
    document.head.appendChild(s);
  }

  function styles(){
    const s=document.createElement('style');
    s.textContent=`
      .rb3d-shell{background:linear-gradient(145deg,#05070c,#0c2b58 60%,#67131f);border:2px solid #2563eb;border-radius:20px;padding:12px;margin:14px 0;overflow:hidden}
      #rb3dCanvas{width:100%;height:430px;display:block;border-radius:15px;background:#020617;touch-action:none}
      .rb3d-tools{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px}.rb3d-tools button{min-width:48px}
      .rb3d-help{color:#cbd5e1;font-size:14px;margin:8px 0 0}.rb3d-badge{display:inline-block;background:#071426;border:1px solid #315a9f;border-radius:999px;padding:7px 10px;margin:3px}
      .rb3d-scene-buttons{display:flex;gap:7px;overflow:auto;padding:5px 0 10px}.rb3d-scene-buttons button{white-space:nowrap}
      @media(max-width:600px){#rb3dCanvas{height:360px}}
    `;
    document.head.appendChild(s);
  }

  function install(){
    const view=document.getElementById('robloxView');
    if(view&&!document.getElementById('roblox3dWorld')){
      const shell=document.createElement('div');
      shell.id='roblox3dWorld';shell.className='rb3d-shell';
      shell.innerHTML=`<h2>🌌 3D Galaxy Builder</h2><p id="rb3dMessage">Drag to spin the world. Pinch or scroll to zoom. Tap the buttons to explore each build.</p><div class="rb3d-scene-buttons">${['Spawn','Planet Plot','Touch Script','Stardust','Growing Planet','Cosmic Traits','Game Screen','Full Game'].map((x,i)=>`<button class="secondary" onclick="showRoblox3DScene(${i})">${i+1}. ${x}</button>`).join('')}</div><canvas id="rb3dCanvas"></canvas><div class="rb3d-tools"><button onclick="moveRobloxCamera(-1)">↶ Turn</button><button onclick="moveRobloxCamera(1)">↷ Turn</button><button class="blue" onclick="zoomRoblox3D(-1)">＋ Zoom</button><button class="secondary" onclick="zoomRoblox3D(1)">－ Zoom</button><button class="red" onclick="resetRoblox3D()">Reset View</button></div><p class="rb3d-help">This preview teaches 3D building ideas. Jru still builds the real game inside Roblox Studio.</p>`;
      const hero=view.querySelector('.hero');
      hero.insertAdjacentElement('afterend',shell);
    }
    const lesson=document.getElementById('robloxLessonView');
    if(lesson&&!document.getElementById('rbLesson3dWrap')){
      const box=document.createElement('div');box.id='rbLesson3dWrap';box.className='rb3d-shell';
      box.innerHTML='<h2>👀 See This Lesson in 3D</h2><p>Move the model around before you build it in Roblox Studio.</p><div id="rbLesson3dMount" class="rb3d-badge">Open a lesson to load its 3D example.</div><button class="blue" onclick="openCurrentRoblox3D()">Open 3D Example</button>';
      lesson.children[0].insertAdjacentElement('afterend',box);
    }
  }

  function mat(color,emissive){return new THREE.MeshStandardMaterial({color,roughness:.65,metalness:.08,emissive:emissive||0,emissiveIntensity:emissive?1.3:0});}
  function box(w,h,d,color,x,y,z){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;world.add(m);return m;}
  function sphere(r,color,x,y,z,glow){const m=new THREE.Mesh(new THREE.SphereGeometry(r,28,20),mat(color,glow?color:0));m.position.set(x,y,z);m.castShadow=true;world.add(m);return m;}
  function ring(r,color,x,y,z){const m=new THREE.Mesh(new THREE.TorusGeometry(r,.12,12,48),mat(color));m.position.set(x,y,z);m.rotation.x=Math.PI/2.7;world.add(m);return m;}

  function baseWorld(){
    scene=new THREE.Scene();scene.background=new THREE.Color(0x020617);
    scene.fog=new THREE.Fog(0x020617,16,34);
    camera=new THREE.PerspectiveCamera(48,1,.1,100);
    renderer=new THREE.WebGLRenderer({canvas:document.getElementById('rb3dCanvas'),antialias:true,alpha:false});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.shadowMap.enabled=true;
    scene.add(new THREE.HemisphereLight(0x8ec5ff,0x16030a,1.8));
    const key=new THREE.DirectionalLight(0xffffff,2.1);key.position.set(6,10,7);key.castShadow=true;scene.add(key);
    const red=new THREE.PointLight(0xef233c,12,18);red.position.set(-5,4,-3);scene.add(red);
    world=new THREE.Group();scene.add(world);
    const stars=new THREE.BufferGeometry(),pts=[];for(let i=0;i<450;i++)pts.push((Math.random()-.5)*45,(Math.random()-.5)*28,(Math.random()-.5)*45);stars.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));scene.add(new THREE.Points(stars,new THREE.PointsMaterial({color:0xffffff,size:.045})));
    bindControls();resize();animate();
  }

  function clearWorld(){while(world.children.length)world.remove(world.children[0]);}
  function platform(){box(7,.55,5,0x174a8b,0,-.35,0);box(2.4,.18,2.4,0xef233c,0,0,0);}
  function character(){box(.8,1.25,.55,0x2563eb,-2,.9,1.1);sphere(.42,0x9c633d,-2,1.8,1.1);box(.25,1,.25,0x111827,-2.5,.75,1.1);box(.25,1,.25,0x111827,-1.5,.75,1.1);}
  function buildScene(i){
    if(!world)return;clearWorld();platform();character();
    const msg=document.getElementById('rb3dMessage');
    if(i===0){box(1,.12,1,0x22c55e,-2,.02,-1.2);ring(.72,0x60a5fa,-2,.18,-1.2);msg.textContent='Lesson 1: This is the spawn pad where the player enters the game.';}
    if(i===1){sphere(.9,0x7c3aed,0,1.15,0);ring(1.3,0xfbbf24,0,1.15,0);box(1.2,.2,1.2,0x22d3ee,2,.2,-1);msg.textContent='Lesson 2: Build a floating platform, a planting pad, and a planet shape.';}
    if(i===2){const pad=box(1.5,.25,1.5,0x22d3ee,0,.18,0);pad.userData.pulse=true;msg.textContent='Lesson 3: The glowing pad shows what happens when a touch script changes its color.';}
    if(i===3){for(let n=0;n<6;n++){const a=n/6*Math.PI*2;sphere(.18,0x60a5fa,Math.cos(a)*2.1,.7+Math.sin(a*2)*.35,Math.sin(a)*1.55,true);}msg.textContent='Lesson 4: These glowing orbs are stardust collectibles.';}
    if(i===4){const p=sphere(.45,0x22c55e,0,.7,0);p.userData.grow=true;ring(.75,0xfbbf24,0,.7,0);msg.textContent='Lesson 5: The planet grows from a tiny seed into a larger world.';}
    if(i===5){const colors=[0x60a5fa,0xef233c,0x22c55e,0xfbbf24];colors.forEach((c,n)=>{const x=(n-1.5)*1.55;sphere(.48,c,x,.8,0,true);if(n===3)ring(.7,0xffffff,x,.8,0);});msg.textContent='Lesson 6: Each planet can have a different color, glow, ring, or rare trait.';}
    if(i===6){box(3.8,2.2,.16,0x071426,0,2,-1.6);box(1.2,.3,.08,0xef233c,-1,2.35,-1.48);box(1.2,.3,.08,0x2563eb,.8,1.75,-1.48);msg.textContent='Lesson 7: This floating panel stands for the player’s game screen and buttons.';}
    if(i===7){sphere(.85,0x7c3aed,0,1.2,0);ring(1.2,0xfbbf24,0,1.2,0);for(let n=0;n<5;n++){const a=n/5*Math.PI*2;sphere(.16,0x60a5fa,Math.cos(a)*2.4,.65,Math.sin(a)*1.8,true);}box(1,.12,1,0x22c55e,-2,.02,-1.2);msg.textContent='Lesson 8: The full game loop has a spawn, collectibles, a growing planet, traits, and a game screen.';}
  }

  function bindControls(){
    const c=renderer.domElement;
    c.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;c.setPointerCapture(e.pointerId)});
    c.addEventListener('pointermove',e=>{if(!dragging)return;yaw+=(e.clientX-lastX)*.008;pitch=Math.max(-.15,Math.min(1.05,pitch+(e.clientY-lastY)*.006));lastX=e.clientX;lastY=e.clientY;});
    c.addEventListener('pointerup',()=>dragging=false);c.addEventListener('pointercancel',()=>dragging=false);
    c.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(7,Math.min(20,zoom+e.deltaY*.01));},{passive:false});
    let pinch=0;c.addEventListener('touchmove',e=>{if(e.touches.length===2){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);if(pinch)zoom=Math.max(7,Math.min(20,zoom+(pinch-d)*.02));pinch=d;}},{passive:false});c.addEventListener('touchend',()=>pinch=0);
  }
  function resize(){if(!renderer)return;const c=renderer.domElement,w=c.clientWidth||700,h=c.clientHeight||430;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
  function animate(){animationId=requestAnimationFrame(animate);if(!renderer)return;const t=performance.now()*.001;world.children.forEach(o=>{if(o.userData.pulse)o.material.emissiveIntensity=1.2+Math.sin(t*4)*.8;if(o.userData.grow){const s=1+Math.sin(t*2)*.18;o.scale.setScalar(s);}});camera.position.set(Math.sin(yaw)*Math.cos(pitch)*zoom,Math.sin(pitch)*zoom*.7+2.2,Math.cos(yaw)*Math.cos(pitch)*zoom);camera.lookAt(0,.75,0);renderer.render(scene,camera);}

  window.showRoblox3DScene=i=>{if(!renderer){loadThree(()=>{baseWorld();buildScene(i);});}else buildScene(i);};
  window.moveRobloxCamera=d=>{yaw+=d*.42;};window.zoomRoblox3D=d=>{zoom=Math.max(7,Math.min(20,zoom+d*1.5));};window.resetRoblox3D=()=>{yaw=.45;pitch=.35;zoom=12;};
  window.openCurrentRoblox3D=()=>{const title=(document.getElementById('robloxLessonNumber')?.textContent||'').match(/\d+/);const i=title?Math.max(0,Math.min(7,Number(title[0])-1)):0;window.show('robloxView');setTimeout(()=>window.showRoblox3DScene(i),80);};

  window.addEventListener('resize',resize);
  window.addEventListener('load',()=>{styles();install();setTimeout(()=>window.showRoblox3DScene(0),500);});
})();