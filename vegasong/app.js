/* =========================================================
   虚拟歌姬 · 旋律织机 主逻辑 app.js
   · 画布点击铺旋律(左右=音高/上下=音量)
   · 虚拟歌姬声线(可插拔:合成或真实采样)
   · 自动生成鼓+和弦+旋律线 → 成"歌"
   ========================================================= */
(function(){
  window.addEventListener('error',function(e){ try{ console.warn('err',e.message); }catch(_){} });

  // ---- 歌姬音库 ----
  // soundType: 'synth' = 合成式女声; 未来可 'sample' = 真实 wav
  const GIRLS = {
    luoshen:{id:'luoshen',name:'洛神',emo:'🎤',color:'#ff5ec9',
      synth:{vowel:'a',formantScale:0.9,breath:0.4,vibrato:[5.0,0.35],bright:0.35},
      desc:'暖糯女中音'},
    jingxiao:{id:'jingxiao',name:'镜晓',emo:'💠',color:'#5ee8ff',
      synth:{vowel:'a',formantScale:1.12,breath:0.2,vibrato:[5.8,0.5],bright:0.6},
      desc:'清亮电子高音'},
    linglv:{id:'linglv',name:'灵律',emo:'🔶',color:'#ffd166',
      synth:{vowel:'o',formantScale:1.0,breath:0.3,vibrato:[4.6,0.4],bright:0.5},
      desc:'活泼明亮'},
    youye:{id:'youye',name:'幽夜',emo:'🌙',color:'#8b6cff',
      synth:{vowel:'u',formantScale:0.85,breath:0.5,vibrato:[4.2,0.25],bright:0.3},
      desc:'空灵幽远'},
    huowu:{id:'huowu',name:'火舞',emo:'🔥',color:'#ff8a5c',
      synth:{vowel:'i',formantScale:1.05,breath:0.35,vibrato:[6.2,0.5],bright:0.7},
      desc:'元气高亢'},
    yinxue:{id:'yinxue',name:'银雪',emo:'❄️',color:'#a5e8ff',
      synth:{vowel:'e',formantScale:1.0,breath:0.25,vibrato:[5.4,0.3],bright:0.55},
      desc:'冰冷清透'}
  };
  const GIRL_IDS=Object.keys(GIRLS);

  // ---- DOM ----
  const canvas=document.getElementById('stage'), ctx2d=canvas.getContext('2d');
  const girlbar=document.getElementById('girlbar'), hint=document.getElementById('hint');
  const noteNow=document.getElementById('noteNow'), stepRow=document.getElementById('stepRow');

  let W=0,H=0;
  function resize(){ W=canvas.clientWidth;H=canvas.clientHeight;const dpr=Math.min(2,window.devicePixelRatio||1);
    canvas.width=W*dpr;canvas.height=H*dpr;ctx2d.setTransform(dpr,0,0,dpr,0,0);drawSteps(); }
  window.addEventListener('resize',resize);

  // ---- 状态 ----
  let girlId='luoshen';
  let scaleName='pent', harmonyOn=true, drumOn=true, autoOn=false;
  let dur=0.55;
  let playing=false;

  const SE=window.SampleEngine, VG=window.VG;

  // ---- 渲染歌姬条 ----
  function renderGirls(){
    girlbar.innerHTML='';
    GIRL_IDS.forEach(id=>{
      const g=GIRLS[id];
      const el=document.createElement('div');
      el.className='girl-chip'+(id===girlId?' on':'');
      el.innerHTML=`<div class="avatar" style="background:${g.color}22;border-color:${g.color}66">${g.emo}</div><div class="nm">${g.name}</div>`;
      el.onclick=()=>setGirl(id);
      girlbar.appendChild(el);
    });
    document.getElementById('chipGirl').textContent=`${GIRLS[girlId].emo} ${GIRLS[girlId].name}`;
  }
  function setGirl(id){ girlId=id; renderGirls(); }
  renderGirls();

  // ---- 交互：点击铺旋律并让歌姬现唱 ----
  let ripples=[],notes=[]
  function addRipple(x,y,hue){ ripples.push({x,y,r:8,hue,vr:1.7,alpha:.8}); }
  function xyToMusic(x,y){
    const nx=Math.max(0,Math.min(1,x/W)), ny=Math.max(0,Math.min(1,1-y/H));
    // 音高(五声) — 5个八度左右
    const tonic=57, span=4;
    const midi = buildMidi(nx, tonic, span);
    const vol=0.25+ny*0.55;
    return {nx,ny,midi,vol};
  }
  function buildMidi(n,tonic,span){
    const scale=SE.PENT;
    const total=scale.length*span;
    const idx=Math.round(n*(total-1));
    return tonic + Math.floor(idx/scale.length)*12 + scale[idx%scale.length];
  }
  function noteName(m){ const names=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    return names[((m%12)+12)%12]+(Math.floor(m/12)-1); }

  function trigger(x,y){
    SE.resume(); if(VG) VG.resume();
    const {nx,ny,midi,vol}=xyToMusic(x,y);
    // 让歌姬发声(当前声线)
    vgSing(midi,vol);
    // 和声
    if(harmonyOn){
      const h=[midi+7, midi+4, midi+11].filter(m=>m>=50&&m<=90);
      (h.length>2?h.slice(0,2):h).forEach(m=> vgSing(m, vol*0.4));
    }
    // 同步鼓点轻击
    showNow(noteName(midi));
    const hue=(nx*360+140)%360;
    addRipple(x,y,hue);
    hint.style.opacity='0';
  }

  // 歌姬发声：优先真实采样，无则合成
  async function vgSing(midi,vol){
    const g=GIRLS[girlId];
    // 若有真实采样(示例 da.wav) 且已加载
    if(SE.buffers['demo']){
      SE.playSample('demo', midi, vol*0.9, SE.quantize8());
      return;
    }
    // 否则用合成女声
    if(VG){
      const s=g.synth||{vowel:'a'};
      VG.sing(seBank(), midi, dur, vol, s.vowel, SE.quantize8());
    }
  }
  function seBank(){
    const g=GIRLS[girlId], s=g.synth||{};
    return {name:g.name, waveMain:'sawtooth', waveSub:'triangle', bright:s.bright||0.4,
      breath:s.breath||0.3, vibrato:s.vibrato||[5,0.4], formantScale:s.formantScale||1, gain:0.9};
  }

  // 自动演奏：随机即兴旋律
  let autoTimer=null;
  function toggleAuto(on){
    autoOn=on;
    if(on){
      autoTimer=setInterval(()=>{
        const x=Math.random()*W, y=H*(0.15+Math.random()*0.6);
        trigger(x,y);
      }, (SE.SPB||0.54)*2*1000);
    } else { if(autoTimer){clearInterval(autoTimer);autoTimer=null;} }
  }

  // ---- 指针 ----
  let down=false,lastX=0,lastY=0;
  function pos(e){const r=canvas.getBoundingClientRect();let cx,cy;
    if(e.touches&&e.touches.length){cx=e.touches[0].clientX;cy=e.touches[0].clientY;}else{cx=e.clientX;cy=e.clientY;}
    return {x:cx-r.left,y:cy-r.top};}
  canvas.addEventListener('touchstart',e=>{e.preventDefault();SE.resume();down=true;const p=pos(e);lastX=p.x;lastY=p.y;trigger(p.x,p.y);},{passive:false});
  canvas.addEventListener('touchmove',e=>{if(!down)return;e.preventDefault();const p=pos(e);if(Math.hypot(p.x-lastX,p.y-lastY)>5){trigger(p.x,p.y);lastX=p.x;lastY=p.y;}},{passive:false});
  canvas.addEventListener('touchend',e=>{down=false;});
  canvas.addEventListener('mousedown',e=>{SE.resume();down=true;const p=pos(e);trigger(p.x,p.y);});
  canvas.addEventListener('mousemove',e=>{if(!down)return;const p=pos(e);if(Math.hypot(p.x-lastX,p.y-lastY)>5){trigger(p.x,p.y);lastX=p.x;lastY=p.y;}});
  window.addEventListener('mouseup',()=>down=false);

  // ---- 绘制 ----
  function draw(){
    ctx2d.clearRect(0,0,W,H);
    drawBack();
    ripples.forEach((r,i)=>{r.r+=r.vr;r.alpha*=.94;if(r.alpha<.02){ripples.splice(i,1);return;}
      ctx2d.beginPath();ctx2d.arc(r.x,r.y,r.r,0,7);ctx2d.strokeStyle=`hsla(${r.hue},95%,65%,${r.alpha})`;ctx2d.lineWidth=2.5*r.alpha;ctx2d.stroke();
      if(r.r>14){ctx2d.beginPath();ctx2d.arc(r.x,r.y,r.r*.5,0,7);ctx2d.fillStyle=`hsla(${r.hue},90%,70%,${r.alpha*.12})`;ctx2d.fill();}});
    requestAnimationFrame(draw);
  }
  function drawBack(){
    const g=ctx2d.createLinearGradient(0,0,W,H);
    g.addColorStop(0,'#1a0f38');g.addColorStop(1,'#0e0a22');ctx2d.fillStyle=g;ctx2d.fillRect(0,0,W,H);
    // 音高区网格
    ctx2d.strokeStyle='rgba(255,255,255,0.03)';ctx2d.lineWidth=1;
    for(let i=0;i<=24;i++){ctx2d.beginPath();ctx2d.moveTo(i*W/24,0);ctx2d.lineTo(i*W/24,H);ctx2d.stroke();}
    // 顶部高音亮区
    const g2=ctx2d.createLinearGradient(0,H*0.72,0,H);
    g2.addColorStop(0,'rgba(0,0,0,0)');g2.addColorStop(1,'rgba(0,0,0,0.4)');
    ctx2d.fillStyle=g2;ctx2d.fillRect(0,H*0.72,W,H*0.28);
    // 当前歌姬主色光晕
    ctx2d.fillStyle=GIRLS[girlId].color+'14';ctx2d.fillRect(0,0,W,H*0.12);
  }
  function showNow(txt){noteNow.textContent=txt;noteNow.style.opacity=1;clearTimeout(showNow._t);showNow._t=setTimeout(()=>noteNow.style.opacity=0,600);}

  // 步骤指示(16分)
  function drawSteps(){ if(!stepRow)return; let h=''; for(let i=0;i<16;i++)h+='<div class="dot"></div>'; stepRow.innerHTML=h; }
  let litIdx=-1;
  (function stepPulse(){ setInterval(()=>{ if(!playing)return; if(litIdx>=0){const d=stepRow.children[litIdx];if(d)d.classList.remove('lit');} litIdx=(SE.stepCount%16); const d=stepRow.children[litIdx]; if(d)d.classList.add('lit'); }, 40); })();

  // ---- 控制 ----
  function setScale(s){ scaleName=s; }
  function toggle(id,which){
    if(which==='harmony')harmonyOn=!harmonyOn;
    else if(which==='drum'){drumOn=!drumOn;}
    else if(which==='auto'){toggleAuto(!autoOn);}
    syncSw();
  }
  function syncSw(){ ['swH','swD','swA'].forEach(id=>{const el=document.getElementById(id);if(!el)return;
    const w=id==='swA'?autoOn: id==='swD'?drumOn:harmonyOn; el.classList.toggle('on',w);}); }
  window.toggle=toggle; window.setScale=setScale;

  // 播放/暂停 背景音乐
  document.getElementById('btnPlay').onclick=function(){
    playing=!playing;
    this.textContent=playing?'⏸ 暂停':'▶ 播放';
    if(playing){ SE.resume(); SE.setBPM(112); SE.startBGM(); drawSteps(); }
    else { SE.stopBGM(); }
  };
  // d=swD 同步 drumOn 到引擎
  // ---- 启动 ----
  resize();
  draw();
  syncSw();
  // 加载真实采样示范(若存在)
  loadDemoSample();
  function closeIntro(){ document.getElementById('intro').classList.remove('show'); SE.resume(); if(VG)VG.resume(); }
  window.closeIntro=closeIntro;
  document.getElementById('intro').addEventListener('click',closeIntro);

  // 尝试加载真实人声采样(da.wav 作为可插拔音源示例)；不存在则忽略
  async function loadDemoSample(){
    try{
      const resp=await fetch('da.wav');
      if(resp.ok){ const buf=await resp.arrayBuffer(); await SE.loadSample('demo', buf, 71.2); }
    }catch(e){ /* 无采样则用合成 */ }
  }
})();
