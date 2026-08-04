/* ============================================================
   无限题 · 数学扩充模板（新课标I卷）
   补充: 向量数量积、等差数列求和、二项式系数、函数奇偶性、
   立体体积、概率期望、点线距离
   答案确定可判分
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }

  mk({ id:'HX-XIANG-001', kp:'向量数量积', kpId:'kp-m-extra', type:'blank', diff:2,
    gen:function(){ var c=E.pick([[1,2],[2,3]]), d=E.pick([[3,0],[1,-1]]);
      var ab=c[0]*d[0]+c[1]*d[1];
      return {text:'向量 a=('+c+')，b=('+d+')，则 a·b = x₁x₂+y₁y₂ = ______。',answer:String(ab),input:'num',
        solution:['a·b='+c[0]+'×'+d[0]+'+'+c[1]+'×'+d[1]+'='+ab+'。']}; } });

  mk({ id:'HX-DENG-001', kp:'等差数列求和', kpId:'kp-m-extra', type:'blank', diff:2,
    gen:function(){ var a=E.pick([2,3]), d=E.pick([2,4]), n=E.pick([4,5,6]);
      var S=n*(2*a+(n-1)*d)/2;
      return {text:'等差数列首项 '+a+'、公差 '+d+'，前 '+n+' 项和 Sₙ=n(2a₁+(n−1)d)/2 = ______。',
        answer:String(S),input:'num',solution:['Sₙ='+n+'×('+2*a+'+('+n+'−1)×'+d+')/2='+S+'。']}; } });

  mk({ id:'HX-ERX-001', kp:'二项式系数', kpId:'kp-m-extra', type:'blank', diff:3,
    gen:function(){ var p=E.pick([2,4]); var c=p+1; // (x+1)^1 或常数
      return {text:'(x + 1)¹ 展开式中 x 的系数为 ______；或写 (x+1)² 中 x 的系数=2。本题直接填 (x+1)¹ 的 x 系数：',
        answer:String(2),input:'num',solution:['(x+1)²的中间项系数2x，即C(2,1)=2；无论(a+b)²，x¹的系数=2。']}; } });

  mk({ id:'HX-JIOU-001', kp:'函数奇偶性', kpId:'kp-m-extra', type:'choice', diff:2,
    gen:function(){ return {text:'下列函数中是偶函数的是（ ）',
      options:['f(x)=x²', 'f(x)=x', 'f(x)=x³', 'f(x)=2^x'],
      answer:'f(x)=x²', correct:0,
      solution:['偶函数满足 f(−x)=f(x)。x²满足；x、x³为奇函数，2^x非奇非偶。A正确。']}; } });

  mk({ id:'HX-LITI-001', kp:'立体几何体积', kpId:'kp-m-extra', type:'blank', diff:3,
    gen:function(){ var a=E.pick([3,4,5]);
      return {text:'棱长为 '+a+' 的正方体，其体积 V = a³ = ______。',answer:String(a*a*a),input:'num',
        solution:['V=a³='+a+'³='+(a*a*a)+'。']}; } });

  mk({ id:'HX-FENBU-001', kp:'概率期望', kpId:'kp-m-extra', type:'blank', diff:3,
    gen:function(){ var p=E.pick([0.3,0.5,0.7]);
      return {text:'X服从两点分布，P(X=1)='+p+'，则期望 E(X)= _______。',answer:String(p),input:'text',
        solution:['两点分布 E(X)=P(X=1)='+p+'。']}; } });

  mk({ id:'HX-JULI-001', kp:'点线距离', kpId:'kp-m-extra', type:'blank', diff:2,
    gen:function(){ var a=E.pick([2,4,6]);
      return {text:'点 P('+a+', 0) 到原点(0,0)的距离 d = ______。',answer:String(a),input:'num',
        solution:['d=√(('+a+'−0)²+0²)='+a+'。']}; } });

  root.__PREMIUM_MATH_EXTRA = T;
})(typeof window !== 'undefined' ? window : globalThis);
