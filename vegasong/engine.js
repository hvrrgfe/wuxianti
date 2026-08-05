/* =========================================================
   虚拟歌姬 · 歌声合成引擎 engine.js
   source-filter 源-滤波器歌声合成：
   · 声源 = 波形叠加(声带激励) + 白噪声(气声)
   · 滤波 = 3 共振峰 bandpass(塑元音) + 低通
   · 颤音 + smooth 包络
   · 支持 在线实时 播放 与 OfflineAudio 离线渲染导出 WAV
   ========================================================= */

const VG = (function(){
  let ctx=null, master=null;

  // 女声元音共振峰 Hz [F1,F2,F3]
  const FORMANT = {
    a:[850,1220,2810], i:[290,2360,3010], u:[380,940,2330],
    e:[530,1840,2480], o:[450,800,2830], yy:[300,1900,2130]
  };

  // 虚拟歌姬声线音库
  const VOICEBANK = {
    luo:{name:'洛神',emo:'🎤',waveMain:'triangle',waveSub:'sawtooth',
      bright:0.35,breath:0.42,vibrato:[5.2,0.35],range:[60,81],formantScale:0.88,gain:0.9,
      desc:'暖糯女中音 · 带气声',
      lyric:['啦','米','嗦','哆','啦','咪','嗦','啦','嘟','咩','咧','哟','哇','呐','哩','噜']},
    chu:{name:'镜晓',emo:'💠',waveMain:'sawtooth',waveSub:'square',
      bright:0.62,breath:0.22,vibrato:[5.8,0.55],range:[64,88],formantScale:1.12,gain:0.85,
      desc:'清亮电子高音 · 颤抖',
      lyric:['啦','希','拉','咪','唆','啦','咪','嗦','嘿','啦','呀','呜','嗒','哩','噜','咩']},
    jing:{name:'灵律',emo:'🔶',waveMain:'square',waveSub:'sawtooth',
      bright:0.5,breath:0.3,vibrato:[4.8,0.4],range:[62,85],formantScale:1.0,gain:0.8,
      desc:'活泼明亮 · 少年感',
      lyric:['喽','啦','咪','嘛','嗒','哆','来','咪','撒','噜','啪','波','啦','达','叮','嘟']}
  };
  const DIVE_NAMES=['luo','chu','jing'];
  // 歌词音节拼音 → 元音序列(用于合成)
  const LYRIC_VOWEL = {
    '啦':'a','米':'i','嗦':'o','哆':'o','咪':'i','嘟':'u','咩':'e','咧':'e',
    '呀':'a','呜':'u','嗒':'a','哩':'i','噜':'u','唆':'o','咯':'o','嘛':'a',
    '来':'e','撒':'a','啪':'a','波':'o','叮':'i','希':'i','嘿':'e','呐':'a'
  };
  const SCALES={major:[0,2,4,5,7,9,11],minor:[0,2,3,5,7,8,10],pent:[0,2,4,7,9],lydian:[0,2,4,6,7,9,11]};
  let scaleName='pent', tonic=60;

  function ensure(){
    if(ctx) return;
    const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
    ctx=new AC();
    master=ctx.createGain();
    const comp=ctx.createDynamicsCompressor();
    comp.threshold.value=-16;comp.ratio.value=6;comp.attack.value=0.004;comp.release.value=0.2;
    master.connect(comp);comp.connect(ctx.destination);
  }
  function resume(){ ensure(); if(ctx&&ctx.state==='suspended')ctx.resume(); }
  function getCtx(){ ensure(); return ctx; }
  function now(){ return ctx?ctx.currentTime:0; }
  function midiToFreq(m){ return 440*Math.pow(2,(m-69)/12); }

  function setScale(s,t){ if(SCALES[s])scaleName=s; if(t!==undefined)tonic=t; }
  function normToMidi(n,octSpan){
    const steps=SCALES[scaleName]||SCALES.pent; const octs=octSpan||3;
    const idx=Math.round(n*(steps.length*octs-1));
    return tonic+Math.floor(idx/steps.length)*12+steps[idx%steps.length];
  }

  // 单个歌声音符 → 目标 context(gx) 的 destination。返回结束时间。
  function sing(bank,note,dur,vol,vowel,start){
    if(!ctx) ensure(); if(!ctx) return;
    const t=start||now()+0.02;
    const f=midiToFreq(note);
    const durSafe=Math.max(0.08,dur||0.5);
    const amp=Math.max(0.02,Math.min(1,vol||0.4))*bank.gain;

    const out=ctx.createGain();
    out.connect(destination());
    applyOutEnv(out,t,amp,durSafe);
    const osc1=gx.osc(bank.waveMain||'sawtooth',f);
    const osc2=bank.waveSub?gx.osc(bank.waveSub,f):null;
    const bright=gx.osc('sine',f*3);
    // 混音增益(恒定)
    const g1=gx.cgain(0.62), g2=gx.cgain(bank.bright||0.4), gb=gx.cgain((bank.bright||0)*0.35);
    const pre=gx.cgain(1);
    osc1.connect(g1); g1.connect(pre);
    if(osc2){osc2.connect(g2); g2.connect(pre);}
    bright.connect(gb); gb.connect(pre);
    // 颤音
    if((bank.vibrato||[0,0])[0]>0){
      const vlfo=gx.osc('sine',bank.vibrato[0]);
      const vg=gx.cgain((bank.vibrato[1]||0)/12*f);
      vlfo.connect(vg); vg.connect(osc1.frequency);
      if(osc2) vg.connect(osc2.frequency);
      gx.startStop(vlfo,t,t+durSafe+0.2);
    }
    // 共振峰 → 低通 → out
    const fs=bank.formantScale||1;
    const fv=FORMANT[vowel]||FORMANT.a;
    const bp1=gx.bp(fv[0]*fs,10), bp2=gx.bp(fv[1]*fs,12), bp3=gx.bp(fv[2]*fs,14);
    const lp=gx.lp(5400,0.4);
    [bp1,bp2,bp3].forEach(bp=>bp.connect(lp));
    lp.connect(out);
    pre.connect(bp1); pre.connect(bp2); pre.connect(bp3);
    // 气声
    if(bank.breath>0){
      const len=durSafe+0.2;
      const buf=gx.noiseBuf(len);
      const n=gx.src(buf);
      const bp=gx.bp(f*2.6,0.5);
      const ng=ctx.createGain();
      gx.nr(n,start,durSafe+0.1);
      gx.env(ng,start,0.05,bank.breath*0.07*amp,durSafe-0.05,0.1);
      n.connect(bp); bp.connect(ng); ng.connect(out);
    }
    // 起停
    gx.startStop(osc1,t,t+durSafe+0.06);
    if(osc2) gx.startStop(osc2,t,t+durSafe+0.06);
    gx.startStop(bright,t,t+durSafe+0.06);
    return t+durSafe;
  }

  // ---- 底层节点工具 (兼容 在线AudioContext 和 OfflineAudioContext) ----
  let _dest = null;
  function destination(){ return _dest || master; }
  const gx = {
    osc(type,f){ const o=ctx.createOscillator();o.type=type;o.frequency.value=f;return o; },
    cgain(val){ const g=ctx.createGain();g.gain.value=val;return g; },
    bp(f,q){ const b=ctx.createBiquadFilter();b.type='bandpass';b.frequency.value=f;b.Q.value=q;return b; },
    lp(f,q){ const b=ctx.createBiquadFilter();b.type='lowpass';b.frequency.value=f;b.Q.value=q;return b; },
    noiseBuf(sec){ const sr=ctx.sampleRate,b=ctx.createBuffer(1,Math.ceil(sr*sec),sr),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return b; },
    src(buf){ const s=ctx.createBufferSource();s.buffer=buf;return s; },
    startStop(n,t0,t1){ try{n.start(t0);}catch(e){} try{n.stop(t1);}catch(e){} },
    nr(src,t0,t1){ try{src.start(t0);}catch(e){} try{src.stop(t1);}catch(e){} },
    env(g,t,atk,peak,durSustain,rel){
      const p=g.gain;
      p.cancelScheduledValues(t);
      p.setValueAtTime(0.0001,t);
      p.linearRampToValueAtTime(peak, t+atk);
      const end=t+atk+durSustain;
      p.setValueAtTime(peak,end);
      p.exponentialRampToValueAtTime(0.0001,end+rel);
    }
  };
  // 包络包装(让 out) —— 用 gx.env 统一
  function applyOutEnv(g,t,amp,durSafe){
    const atk=0.05+Math.min(0.1,durSafe*0.3);
    const rel=Math.min(0.3,durSafe*0.35);
    gx.env(g,t,atk,amp,durSafe-atk-rel,rel);
  }

  // 在线播放一组音符 [{midi,dur,vol,vowel,at}]
  function playNotes(bank,notes){
    resume();
    notes.forEach(n=>{ sing(bank,n.midi,n.dur,n.vol,n.vowel||'a', n.at); });
  }

  // ---- 离线渲染：生成歌曲 WAV(可下载) ----
  function renderToWav(bank,notes,bpm,sampleRate){
    return new Promise((resolve)=>{
      const AC=window.AudioContext||window.webkitAudioContext;
      const sr=sampleRate||44100;
      const total=computeTotalDur(bank,notes);
      const oc=new (window.OfflineAudioContext)(2, Math.ceil((total+1)*sr), sr);
      // 保存原 ctx
      const oldCtx=ctx, oldDest=_dest;
      ctx=oc;
      _dest=oc.destination;
      notes.forEach(n=>{ sing(bank,n.midi,n.dur,n.vol,n.vowel||'a',n.at||0.2); });
      oc.startRendering().then((buffer)=>{
        const wav=audioBufferToWav(buffer);
        ctx=oldCtx; _dest=oldDest;
        resolve(wav);
      });
    });
  }

  function computeTotalDur(bank,notes){
    let max=0;
    notes.forEach(n=>{ const e=(n.at||0)+n.dur; if(e>max)max=e; });
    return max;
  }

  function audioBufferToWav(buf){
    const numCh=buf.numberOfChannels, sr=buf.sampleRate;
    const chs=[];
    let len=0;
    for(let c=0;c<numCh;c++){ chs.push(buf.getChannelData(c)); if(chs[c].length>len)len=chs[c].length; }
    const dataSize=len*numCh*2;
    const ab=new ArrayBuffer(44+dataSize);
    const v=new DataView(ab);
    const ws=function(off,s){ for(let i=0;i<s.length;i++)v.setUint8(off+i,s.charCodeAt(i)); };
    ws(0,"RIFF"); v.setUint32(4,36+dataSize,true); ws(8,"WAVE");
    ws(12,"fmt "); v.setUint32(16,16,true); v.setUint16(20,1,true);
    v.setUint16(22,numCh,true); v.setUint32(24,sr,true);
    v.setUint32(28,sr*numCh*2,true); v.setUint16(32,numCh*2,true); v.setUint16(34,16,true);
    ws(36,"data"); v.setUint32(40,dataSize,true);
    let o=44;
    for(let i=0;i<len;i++){
      for(let c=0;c<numCh;c++){
        const s=Math.max(-1,Math.min(1,chs[c][i]||0));
        v.setInt16(o, s<0?s*0x8000:s*0x7FFF, true); o+=2;
      }
    }
    return ab;
  }

  return {
    ensure,resume,getCtx,now,midiToFreq,
    VOICEBANK,DIVE_NAMES,FORMANT,SCALES,LYRIC_VOWEL,
    setScale,normToMidi,
    setMaster:function(v){ensure();master.gain.value=v;},
    playNotes, sing,
    renderToWav, audioBufferToWav,
    getScaleName:function(){return scaleName;},
    getTonic:function(){return tonic;}
  };
})();
window.VG=VG;
