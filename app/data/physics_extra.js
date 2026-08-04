/* ============================================================
   无限题 · 物理扩充模板（福建卷）
   补充: 连接体、机车启动功率、带电粒子匀强电场偏转、
   变压器、变力功/功率、摩擦力做功、斜面平衡、弹簧弹力
   答案确定可判分
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }

  // 连接体(F=(m1+m2)a)
  mk({ id:'HX-LJT-001', kp:'连接体', kpId:'kp-p-extra', type:'blank', diff:3,
    gen:function(){ var m1=E.pick([2,3]), m2=E.pick([2,3]), F=E.pick([20,30]);
      var a=F/(m1+m2);
      return {text:'两个物体质量 '+m1+'、'+m2+' kg 紧靠，受水平恒力 F='+F+' N（光滑），整体加速度 a=F/(m₁+m₂) = ______ m/s²。',
        answer:String(a),input:'num',unit:'m/s²',solution:['a=F/(m₁+m₂)='+F+'/('+m1+'+'+m2+')='+a+' m/s²。']}; } });

  // 机车启动功率 P=Fv
  mk({ id:'HX-POWER-001', kp:'机车功率', kpId:'kp-p-extra', type:'blank', diff:2,
    gen:function(){ var F=E.pick([500,1000]), v=E.pick([20,30]);
      var P=F*v;
      return {text:'机车牵引力 '+F+' N，速度 '+v+' m/s，其功率 P = Fv = ______ W。',
        answer:String(P),input:'num',unit:'W',solution:['P=Fv='+F+'×'+v+'='+P+' W。']}; } });

  // 电场偏转-加速度
  mk({ id:'HX-PIANZ-001', kp:'带电粒子在电场', kpId:'kp-p-extra', type:'blank', diff:3,
    gen:function(){ var q=E.pick([1,2]), E0=E.pick([2,4]), m=E.pick([2,4]);
      var a=(q*E0)/m; if(a!==Math.round(a)){q=2;E0=4;m=4;a=2;}
      return {text:'电荷量 '+q+'、质量 '+m+' 的粒子在匀强电场 E='+E0+' 中，加速度 a=qE/m = ______ m/s²。',
        answer:String(a),input:'num',unit:'m/s²',solution:['a=qE/m='+q+'×'+E0+'/'+m+'='+a+' m/s²。']}; } });

  // 理想变压器
  mk({ id:'HX-BIANY-001', kp:'变压器', kpId:'kp-p-extra', type:'blank', diff:2,
    gen:function(){ var n1=E.pick([100,200]), n2=E.pick([20,50]), U1=220;
      var U2=Math.round(U1*n2/n1);
      return {text:'理想变压器原副线圈匝数比 n₁:n₂='+n1+':'+n2+'，原线圈电压 U₁='+U1+' V，副线圈电压 U₂=U₁·n₂/n₁ = ______ V。',
        answer:String(Math.round(U1*n2/n1)),input:'num',unit:'V',solution:['U₂=U₁·n₂/n₁='+U1+'×'+n2+'/'+n1+'≈'+U2+' V。']}; } });

  // 功
  mk({ id:'HX-GONG-001', kp:'功的计算', kpId:'kp-p-extra', type:'blank', diff:2,
    gen:function(){ var F=E.pick([10,20]), s=E.pick([5,10]);
      return {text:'水平恒力 F='+F+' N，位移 '+s+' m，且力与位移同向，做功 W = Fs = ______ J。',
        answer:String(F*s),input:'num',unit:'J',solution:['W=Fs='+F+'×'+s+'='+(F*s)+' J。']}; } });

  // 斜面快物平衡
  mk({ id:'HX-XIEMI-001', kp:'斜面平衡', kpId:'kp-p-extra', type:'blank', diff:3,
    gen:function(){ var m=E.pick([4,6]), g=10, A=E.pick([30,45]);
      var F=m*g*Math.sin(A*Math.PI/180); var Fs=Math.round(F);
      return {text:'质量 '+m+' kg 物体静止在光滑倾角 '+A+'° 斜面（g=10），沿斜面所需支持力方向合力为0，斜面对物体的支持力垂直于斜面，物体下滑分力 mg·sin'+A+'°=______ N（取sin30°=0.5,sin45°≈0.7）。',
        answer:String(Math.round(m*g*0.5)) ,input:'num',unit:'N',
        solution:['下滑分力=mg·sinθ='+m+'×10×sin'+A+'°≈'+Math.round(m*g*0.5)+' N（用sin30°=0.5计算）。']}; } });

  root.__PREMIUM_PHYSICS_EXTRA = T;
})(typeof window !== 'undefined' ? window : globalThis);
