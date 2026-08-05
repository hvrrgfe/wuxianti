/* ============================================================
   无限题 · 数学变式题库（批量扩充，贴近高考题型）
   MB- 前缀模板，覆盖核心考点的多种变式(不同题型/参数/情境)
   全部答案确定、可判分
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }
  function frac(n,d){ var g=E.gcd(n,d); return (n/g)+(d/g===1?'':'/'+(d/g)); }

  // ========== 三角函数 · 特殊角求值变式 ==========
  var trigVars = [
    { f:'sin', a:30, v:'1/2' }, { f:'sin', a:60, v:'√3/2' }, { f:'cos', a:60, v:'1/2' },
    { f:'cos', a:30, v:'√3/2' }, { f:'tan', a:45, v:'1' }, { f:'sin', a:90, v:'1' },
    { f:'cos', a:90, v:'0' }, { f:'tan', a:30, v:'√3/3' }, { f:'sin', a:45, v:'√2/2' },
    { f:'cos', a:0, v:'1' }
  ];
  trigVars.forEach(function(x,i){ mk({ id:'MB-TRIG-'+String(i+1).padStart(3,'0'), kp:'三角求值', kpId:'kp-mb-trig', type:'blank', diff:1,
    gen:function(){ var t = E.pick(trigVars); return { text: t.f+' '+t.a+'° = ______。', answer:t.v, solution:['特殊角三角函数值：'+t.f+' '+t.a+'° = '+t.v], input:'text' }; } }); });

  // ========== 同角三角函数关系 ==========
  mk({ id:'MB-TRIG-011', kp:'三角求值', kpId:'kp-mb-trig', type:'blank', diff:2,
    gen:function(){ var s=[['sin','cos','1'],['tan','','sin/cos']];
      return { text:'已知 sinα = 3/5 且 α 为锐角，则 cosα = √(1−sin²α) = ______。', answer:'4/5',
        solution:['cos²α=1−sin²α=1−9/25=16/25，cosα=4/5(锐角取正)。'], input:'text' }; } });

  // ========== 等差数列通项/求和变式 ==========
  var ariVars = [
    { a1:2, d:3, n:5, an:14 }, { a1:1, d:4, n:6, an:21 }, { a1:5, d:2, n:8, an:19 },
    { a1:3, d:5, n:4, an:18 }, { a1:10, d:3, n:6, an:25 }, { a1:1, d:2, n:10, an:19 }
  ];
  ariVars.forEach(function(x,i){ mk({ id:'MB-ARI-'+String(i+1).padStart(3,'0'), kp:'等差数列', kpId:'kp-mb-ari', type:'blank', diff:2,
    gen:function(){ var t=E.pick(ariVars); return { text:'等差数列首项 '+t.a1+'、公差 '+t.d+'，求第 '+t.n+' 项 aₙ = a₁+(n−1)d = ______。', answer:String(t.an),
      solution:['aₙ='+t.a1+'+('+t.n+'−1)×'+t.d+'='+t.an+'。'], input:'num' }; } }); });
  ariVars.slice(0,4).forEach(function(x,i){ mk({ id:'MB-ARIS-'+String(i+1).padStart(3,'0'), kp:'等差数列', kpId:'kp-mb-ari', type:'blank', diff:2,
    gen:function(){ var t=E.pick(ariVars); var S=t.n*(2*t.a1+(t.n-1)*t.d)/2; return { text:'等差数列首项 '+t.a1+'、公差 '+t.d+'，求前 '+t.n+' 项和 Sₙ = ______。', answer:String(S),
      solution:['Sₙ=n(2a₁+(n−1)d)/2='+t.n+'×('+2*t.a1+'+('+t.n+'−1)×'+t.d+')/2='+S+'。'], input:'num' }; } }); });

  // ========== 二次函数顶点/最值变式 ==========
  var quadVars = [
    { a:1,b:-4,c:3, h:2,k:-1 }, { a:1,b:-6,c:8, h:3,k:-1 }, { a:1,b:-2,c:1, h:1,k:0 },
    { a:1,b:-8,c:15, h:4,k:-1 }, { a:2,b:0,c:5, h:0,k:5 }
  ];
  quadVars.forEach(function(x,i){ mk({ id:'MB-QUAF-'+String(i+1).padStart(3,'0'), kp:'二次函数', kpId:'kp-mb-quad', type:'blank', diff:2,
    gen:function(){ var t=E.pick(quadVars); return { text:'二次函数 y = '+t.a+'x²'+((t.b>=0?'+':'')+t.b)+'x'+((t.c>=0?'+':'')+t.c)+'，其顶点横坐标 x=-b/(2a) = ______（若 a>0，该处即最小值点）。', answer:String(t.h),
      solution:['x=−b/(2a)=−('+t.b+')/(2×'+t.a+')='+t.h+'。'], input:'num' }; } }); });

  // ========== 导数：多项式求导变式 ==========
  var derVars = [
    { expr:'x²', f:function(x){return 2*x;} }, { expr:'3x²', f:function(x){return 6*x;} },
    { expr:'x³', f:function(x){return 3*x*x;} }, { expr:'2x³', f:function(x){return 6*x*x;} },
    { expr:'x²+x', f:function(x){return 2*x+1;} }
  ];
  derVars.forEach(function(x,i){ mk({ id:'MB-DER-'+String(i+1).padStart(3,'0'), kp:'导数', kpId:'kp-mb-der', type:'blank', diff:2,
    gen:function(){ var t=E.pick(derVars); var v=E.pick([1,2]); return { text:'求导函数：f(x)='+t.expr+'，则 f\''+v+') 的值（代 x='+v+'）= ______。', answer:String(t.f(v)),
      solution:['对 '+t.expr+' 求导后代入 x='+v+' 得 '+t.f(v)+'。'], input:'num' }; } }); });

  // ========== 等比数列变式 ==========
  mk({ id:'MB-GEO-001', kp:'等比数列', kpId:'kp-mb-geo', type:'blank', diff:2,
    gen:function(){ var a1=E.pick([2,3]), q=E.pick([2,3]), n=E.pick([3,4,5]); var an=a1*Math.pow(q,n-1);
      return { text:'等比数列首项 '+a1+'、公比 '+q+'，求第 '+n+' 项 aₙ = a₁q^(n−1) = ______。', answer:String(an),
        solution:['aₙ='+a1+'×'+q+'^'+(n-1)+'='+an+'。'], input:'num' }; } });

  // ========== 解一元二次方程变式 ==========
  var eqVars=[
    { a:1,b:-5,c:6, r1:2, r2:3 }, { a:1,b:-8,c:15, r1:3, r2:5 }, { a:1,b:-6,c:8, r1:2, r2:4 },
    { a:1,b:-2,c:-3, r1:-1, r2:3 }, { a:1,b:-4,c:4, r1:2, r2:2 }
  ];
  eqVars.forEach(function(x,i){ mk({ id:'MB-QUAD-'+String(i+1).padStart(3,'0'), kp:'一元二次方程', kpId:'kp-mb-quad', type:'blank', diff:1,
    gen:function(){ var t=E.pick(eqVars); return { text:'解方程：x²'+((t.b>=0?'+':'')+t.b)+'x'+((t.c>=0?'+':'')+t.c)+' = 0，两根之和 x₁+x₂ = ______。', answer:String(-t.b),
      solution:['韦达定理：x₁+x₂=−b/a=−('+t.b+')='+(-t.b)+'（或解出两根 '+t.r1+'+'+t.r2+'）。'], input:'num' }; } }); });

  // ========== 古典概型变式 ==========
  mk({ id:'MB-PROB-001', kp:'古典概型', kpId:'kp-mb-prob', type:'blank', diff:1,
    gen:function(){ var r=E.pick([3,4,5]), w=E.pick([5,4,3]); var g=E.gcd(r,r+w);
      return { text:'袋中 '+r+' 个红球、'+w+' 个白球，随机摸出 1 个球是红球的概率 = ______。', answer:frac(r,r+w),
        solution:['P=红球数/总数='+r+'/'+(r+w)+' = '+frac(r,r+w)+'。'], input:'text' }; } });

  root.__PREMIUM_MATH_BANK = T;
})(typeof window !== 'undefined' ? window : globalThis);
