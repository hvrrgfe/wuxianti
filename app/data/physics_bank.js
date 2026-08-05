/* ============================================================
   无限题 · 物理变式题库（批量扩充，贴近福建物理卷）
   PB- 前缀模板，覆盖物理核心考点的多种变式
   全部答案确定、可判分
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }

  // ========== 匀变速直线运动变式（求末速度） ==========
  var kin = [
    { v0:0, a:2, t:5, v:10 }, { v0:0, a:4, t:3, v:12 }, { v0:2, a:3, t:4, v:14 },
    { v0:0, a:5, t:4, v:20 }, { v0:3, a:2, t:5, v:13 }, { v0:0, a:1, t:10, v:10 }
  ];
  kin.forEach(function(x,i){
    mk({ id:'PB-KIN-'+String(i+1).padStart(3,'0'), kp:'匀变速直线运动', kpId:'kp-mb-p', type:'blank', diff:1,
      gen:function(){ return { text:'物体初速度 '+x.v0+' m/s、加速度 '+x.a+' m/s²，经过 '+x.t+' s，求末速度 v = v₀+at = ______ m/s。',
        answer:String(x.v), solution:['v='+x.v0+'+'+x.a+'×'+x.t+'='+x.v+' m/s。'], input:'num', unit:'m/s' }; } });
  });

  // ========== 匀变速直线运动变式（求位移） ==========
  var kins = [
    { v0:0, a:2, t:5, s:25 }, { v0:0, a:4, t:3, s:18 }, { v0:2, a:3, t:4, s:32 },
    { v0:0, a:5, t:4, s:40 }, { v0:3, a:2, t:5, s:40 }
  ];
  kins.forEach(function(x,i){
    mk({ id:'PB-KIN-S'+String(i+1).padStart(3,'0'), kp:'匀变速直线运动', kpId:'kp-mb-p', type:'blank', diff:1,
      gen:function(){ return { text:'物体初速度 '+x.v0+' m/s、加速度 '+x.a+' m/s²，经过 '+x.t+' s，求位移 s = v₀t + ½at² = ______ m。',
        answer:String(x.s), solution:['s='+x.v0+'×'+x.t+'+½×'+x.a+'×'+x.t+'²='+x.s+' m。'], input:'num', unit:'m' }; } });
  });

  // ========== 牛顿第二定律变式 ==========
  var newt = [
    { m:2, a:4, F:8 }, { m:3, a:5, F:15 }, { m:4, a:3, F:12 }, { m:5, a:2, F:10 }, { m:6, a:4, F:24 }
  ];
  newt.forEach(function(x,i){
    mk({ id:'PB-NEW-'+String(i+1).padStart(3,'0'), kp:'牛顿第二定律', kpId:'kp-mb-p', type:'blank', diff:1,
      gen:function(){ return { text:'质量 '+x.m+' kg 物体受合力 '+x.F+' N，加速度 a = F/m = ______ m/s²。',
        answer:String(x.a), solution:['a=F/m='+x.F+'/'+x.m+'='+x.a+' m/s²。'], input:'num', unit:'m/s²' }; } });
  });

  // ========== 重力 ==========
  mk({ id:'PB-GRA-001', kp:'重力', kpId:'kp-mb-p', type:'blank', diff:1,
    gen:function(){ var m=[2,3,5,8,10][Math.floor(Math.random()*5)]; var g=10;
      return { text:'质量 '+m+' kg 的物体所受重力 G = mg（g=10 m/s²）= ______ N。',
        answer:String(m*g), solution:['G=mg='+m+'×10='+(m*g)+' N。'], input:'num', unit:'N' }; } });

  // ========== 功变式 ==========
  var work = [ {F:10,s:5,W:50},{F:20,s:3,W:60},{F:15,s:4,W:60},{F:8,s:10,W:80},{F:12,s:8,W:96} ];
  work.forEach(function(x,i){
    mk({ id:'PB-WORK-'+String(i+1).padStart(3,'0'), kp:'功', kpId:'kp-mb-p', type:'blank', diff:1,
      gen:function(){ return { text:'水平恒力 '+x.F+' N 使物体沿位移 '+x.s+' m（力与位移同向），做功 W = F·s = ______ J。',
        answer:String(x.W), solution:['W=Fs='+x.F+'×'+x.s+'='+x.W+' J。'], input:'num', unit:'J' }; } });
  });

  // ========== 功率 ==========
  mk({ id:'PB-POW-001', kp:'功率', kpId:'kp-mb-p', type:'blank', diff:2,
    gen:function(){ var F=[500,1000,2000][Math.floor(Math.random()*3)], v=[2,4,5][Math.floor(Math.random()*3)];
      return { text:'牵引力 '+F+' N、速度 '+v+' m/s，功率 P = F·v = ______ W。',
        answer:String(F*v), solution:['P=Fv='+F+'×'+v+'='+(F*v)+' W。'], input:'num', unit:'W' }; } });

  // ========== 欧姆定律变式 ==========
  var ohm = [ {U:12,R:6,I:2},{U:6,R:3,I:2},{U:24,R:8,I:3},{U:9,R:3,I:3},{U:15,R:5,I:3} ];
  ohm.forEach(function(x,i){
    mk({ id:'PB-OHM-'+String(i+1).padStart(3,'0'), kp:'欧姆定律', kpId:'kp-mb-p', type:'blank', diff:1,
      gen:function(){ return { text:'电阻两端电压 '+x.U+' V、阻值 '+x.R+' Ω，电流 I = U/R = ______ A。',
        answer:String(x.I), solution:['I=U/R='+x.U+'/'+x.R+'='+x.I+' A。'], input:'num', unit:'A' }; } });
  });

  // ========== 串联电阻 ==========
  mk({ id:'PB-SER-001', kp:'串联/并联电阻', kpId:'kp-mb-p', type:'blank', diff:2,
    gen:function(){ var r1=[2,4,6][Math.floor(Math.random()*3)], r2=[3,5,9][Math.floor(Math.random()*3)];
      return { text:'两个电阻 '+r1+' Ω 与 '+r2+' Ω 串联，总电阻 R = R₁+R₂ = ______ Ω。',
        answer:String(r1+r2), solution:['R串='+r1+'+'+r2+'='+(r1+r2)+' Ω。'], input:'num', unit:'Ω' }; } });

  // ========== 并联电阻 ==========
  mk({ id:'PB-PAR-001', kp:'串联/并联电阻', kpId:'kp-mb-p', type:'blank', diff:3,
    gen:function(){ var r=[2,4,6][Math.floor(Math.random()*3)]; var R=r/2;
      return { text:'两个 '+r+' Ω 电阻并联，等效总电阻 R = R₁R₂/(R₁+R₂) = ______ Ω。',
        answer:String(R), solution:['R='+r+'×'+r+'/('+r+'+'+r+')='+r+'/2='+R+' Ω。'], input:'num', unit:'Ω' }; } });

  // ========== 电功率 ==========
  mk({ id:'PB-EPOW-001', kp:'电功率', kpId:'kp-mb-p', type:'blank', diff:2,
    gen:function(){ var U=[12,24,36][Math.floor(Math.random()*3)], I=[1,2,3][Math.floor(Math.random()*3)];
      return { text:'用电器电压 '+U+' V、电流 '+I+' A，电功率 P = U·I = ______ W。',
        answer:String(U*I), solution:['P=UI='+U+'×'+I+'='+(U*I)+' W。'], input:'num', unit:'W' }; } });

  // ========== 密度 ==========
  mk({ id:'PB-DEN-001', kp:'密度', kpId:'kp-mb-p', type:'blank', diff:1,
    gen:function(){ var m=[10,40,80][Math.floor(Math.random()*3)], v=[5,8,10][Math.floor(Math.random()*3)];
      return { text:'质量 '+m+' g 的物体体积 '+v+' cm³，密度 ρ = m/V = ______ g/cm³。',
        answer:String(m/v), solution:['ρ=m/V='+m+'/'+v+'='+(m/v)+' g/cm³。'], input:'num', unit:'g/cm³' }; } });

  // ========== 液体压强 ==========
  mk({ id:'PB-PRE-001', kp:'液体压强', kpId:'kp-mb-p', type:'blank', diff:2,
    gen:function(){ var h=[2,5,10][Math.floor(Math.random()*3)]; var g=10, rho=1000;
      return { text:'水深 '+h+' m（ρ=1000 kg/m³，g=10），水底压强 p = ρgh = ______ Pa。',
        answer:String(rho*g*h), solution:['p=ρgh=1000×10×'+h+'='+(rho*g*h)+' Pa。'], input:'num', unit:'Pa' }; } });

  // ========== 压强概念选择 ==========
  mk({ id:'PB-CON-001', kp:'双项选择·概念', kpId:'kp-mb-p', type:'choice', diff:2,
    gen:function(){ return { text:'关于压强的说法，正确的是（ ）',
      options:['压强=压力/受力面积', '受力面积越大压强越大', '压力越大压强越大(面积不变)', '压强只与液体深度有关'],
      answer:'压强=压力/受力面积', correct:0, solution:['压强定义 p=F/S。A正确；B、C、D表述不完整或错误。'] }; } });

  root.__PREMIUM_PHYSICS_BANK = T;
})(typeof window !== 'undefined' ? window : globalThis);
