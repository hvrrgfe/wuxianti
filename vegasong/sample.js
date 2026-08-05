/* =========================================================
   虚拟歌姬 · 采样驱动引擎 sample.js
   · 加载真实人声 wav 采样(bytes 数组)
   · 变速变调 playbackRate = 2^((target-source)/12)
   · 五声音阶映射 + 节奏量化
   · 自动架子鼓 + 和弦 伴奏(Web Audio 实时)
   主界面点击屏幕即可让"歌姬"唱出成旋律的歌。
   ========================================================= */

const SampleEngine = {
  ctx:null, master:null, noiseBuf:null,
  buffers:{},   // name -> {buffer, sourceMidi}
  voices:[],    // 歌姬音库列表

  init(){
    if(this.ctx) return;
    const AC=window.AudioContext||window.webkitAudioContext;
    if(!AC) return;
    this.ctx=new AC();
    this.master=this.ctx.createGain(); this.master.gain.value=0.85;
    const comp=this.ctx.createDynamicsCompressor();
    comp.threshold.value=-18; comp.ratio.value=7; comp.attack.value=0.003; comp.release.value=0.2;
    this.master.connect(comp); comp.connect(this.ctx.destination);
    // 噪声 buffer(鼓组)
    const sr=this.ctx.sampleRate, len=this.ctx.sampleRate;
    this.noiseBuf=this.ctx.createBuffer(1,len,sr);
    const d=this.noiseBuf.getChannelData(0);
    for(let i=0;i<len;i++)d[i]=Math.random()*2-1;
  },
  resume(){ this.init(); if(this.ctx&&this.ctx.state==='suspended')this.ctx.resume(); },
  getCtx(){ this.init(); return this.ctx; },
  midiToFreq(m){ return 440*Math.pow(2,(m-69)/12); },

  // 解码 wav ArrayBuffer → AudioBuffer，记录原音 MIDI
  async loadSample(name, arrayBuffer, sourceMidi){
    this.init();
    const buf = await this.ctx.decodeAudioData(arrayBuffer);
    this.buffers[name] = {buffer:buf, sourceMidi:sourceMidi};
    return this.buffers[name];
  },

  // 播放采样(变速变调到 targetMidi)
  playSample(name, targetMidi, vol, when){
    const b=this.buffers[name]; if(!b) return false;
    this.init(); const t=when||this.ctx.currentTime;
    const src=this.ctx.createBufferSource();
    src.buffer=b.buffer;
    const rate=Math.pow(2,(targetMidi-b.sourceMidi)/12);
    src.playbackRate.value=rate;
    const g=this.ctx.createGain();
    g.gain.setValueAtTime(0,t);
    g.gain.linearRampToValueAtTime(vol||0.8,t+0.015);
    g.gain.exponentialRampToValueAtTime(0.0001,t+b.buffer.duration+0.05);
    // 加一点滤波柔和
    const lp=this.ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=9000; lp.Q.value=0.4;
    src.connect(lp); lp.connect(g); g.connect(this.master);
    src.start(t); src.stop(t+b.buffer.duration+0.1);
    return true;
  },

  // 五声音阶(2套) 音高迭代
  PENT: [0,2,4,7,9],
  buildMidiFromNorm(n, tonic, base, span){
    // n in [0,1] -> 覆盖 span 个八度的五声音阶
    const scale=this.PENT;
    const total = scale.length*span;
    const idx=Math.round(n*(total-1));
    const note = base + Math.floor(idx/scale.length)*12 + scale[idx%scale.length];
    return note + (tonic? (tonic-base):0);
  },

  /* ---- 自动伴奏：鼓 + 和弦(每 16 分步) ---- */
  BPM:112, SPB:0, S16:0,
  setBPM(b){ this.BPM=b; this.SPB=60/b; this.S16=this.SPB/4; },
  // C 大调 I-V-vi-IV
  CHORDS:[
    {bass:65.41, notes:[261.63,329.63,392.00,523.25]},//C
    {bass:49.00, notes:[196.00,246.94,293.66,392.00]},//G
    {bass:55.00, notes:[220.00,261.63,329.63,440.00]},//Am
    {bass:43.65, notes:[174.61,220.00,261.63,349.23]},//F
  ],
  startTime:0, nextTime:0, stepCount:0, schedulerTimer:null,
  startBGM(){
    this.resume(); this.setBPM(this.BPM);
    this.startTime=this.ctx.currentTime+0.1;
    this.nextTime=this.startTime; this.stepCount=0;
    this.schedulerTimer=setInterval(()=>this.schedule(),25);
  },
  stopBGM(){ if(this.schedulerTimer){clearInterval(this.schedulerTimer);this.schedulerTimer=null;} },
  schedule(){
    const c=this.ctx, horizon=c.currentTime+0.12;
    while(this.nextTime<horizon){
      this.scheduleStep(this.stepCount,this.nextTime);
      this.nextTime+=this.S16; this.stepCount=(this.stepCount+1)%64;
    }
  },
  scheduleStep(s,t){
    const bar=(s/16)|0, pos=s%16, ch=this.CHORDS[bar];
    const c=this.ctx;
    // kick
    if(pos%4===0) this.kick(t);
    // snare
    if(pos===4||pos===12) this.snare(t);
    // hat
    this.hat(t, pos%2===0?0.3:0.15);
    // 和弦 stab(反拍)
    if(pos%4===2) this.stab(ch.notes,t);
    // bass(每半拍)
    if(pos%2===0) this.bassF(ch.bass,t, pos%4===0?0.35:0.22);
  },
  kick(t){ const c=this.ctx; const o=c.createOscillator(); const g=c.createGain();
    o.type='sine'; o.frequency.setValueAtTime(160,t); o.frequency.exponentialRampToValueAtTime(50,t+0.1);
    g.gain.setValueAtTime(0.9,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.2);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t+0.25); },
  snare(t){ const c=this.ctx; const n=c.createBufferSource(); n.buffer=this.noiseBuf;
    const bp=c.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=2000;bp.Q.value=0.8;
    const g=c.createGain(); g.gain.setValueAtTime(0.5,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.15);
    n.connect(bp); bp.connect(g); g.connect(this.master); n.start(t); n.stop(t+0.18); },
  hat(t,v){ const c=this.ctx; const n=c.createBufferSource(); n.buffer=this.noiseBuf;
    const hp=c.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=7000;
    const g=c.createGain(); g.gain.setValueAtTime(v,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.05);
    n.connect(hp); hp.connect(g); g.connect(this.master); n.start(t); n.stop(t+0.06); },
  stab(notes,t){ const c=this.ctx; notes.forEach(f=>{
      const o=c.createOscillator(); o.type='sawtooth'; o.frequency.value=f;
      const lp=c.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=3000;
      const g=c.createGain(); g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.09,t+0.01);
      g.gain.exponentialRampToValueAtTime(0.0001,t+0.18);
      o.connect(lp); lp.connect(g); g.connect(this.master); o.start(t); o.stop(t+0.2); }); },
  bassF(f,t,v){ const c=this.ctx; const o=c.createOscillator(); o.type='sine'; o.frequency.value=f;
    const g=c.createGain(); g.gain.setValueAtTime(v,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.22);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t+0.25); },

  /* ---- 节奏量化：下一个 8 分音符 ---- */
  quantize8(){ const c=this.ctx; const u=this.SPB/2; const k=Math.max(1,Math.ceil((c.currentTime+0.02-this.startTime)/u)); return this.startTime+k*u; }
};
window.SampleEngine=SampleEngine;
