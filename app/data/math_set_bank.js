/* ============================================================
   无限题 · 集合专项变式题库（高频考点补强）
   覆盖集合常见高考题型：元素个数/运算/子集/区间/解集
   答案确定可判分
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }
  function frac(n,d){ var g=E.gcd(n,d); return (n/g)+(d/g===1?'':'/'+(d/g)); }

  // 元素个数(列举区间)
  mk({ id:'MS-SET-001', kp:'集合', kpId:'kp-mbs', type:'blank', diff:1,
    gen:function(){ var a=E.ri(0,3), b=E.ri(5,9); return { text:'集合 A={x∈Z | '+a+' ≤ x ≤ '+b+'}，则 A 中元素的个数 = ______。',
      answer:String(b-a+1), solution:['列举 '+a+' 到 '+b+' 的整数，共 '+(b-a+1)+' 个。'], input:'num' }; } });

  // 元素个数(描述/不等) - 用 ≤n的整数
  mk({ id:'MS-SET-002', kp:'集合', kpId:'kp-mbs', type:'blank', diff:1,
    gen:function(){ var n=E.ri(3,9); return { text:'集合 B = {x | 1 ≤ x ≤ '+n+'，x 为正整数}，则 B 的元素个数 = ______。',
      answer:String(n), solution:['正整数 1 到 '+n+'，共 '+n+' 个。'], input:'num' }; } });

  // 交集(具体元素)
  mk({ id:'MS-SET-003', kp:'集合', kpId:'kp-mbs', type:'blank', diff:1,
    gen:function(){ var a=E.ri(1,4), b=E.ri(4,6); var n=b-a+1; return { text:'集合 A={1,2,...,'+b+'}，B={'+a+','+(a+1)+',...,'+b+'}，则 A∩B 的元素个数 = ______。',
      answer:String(n), solution:['A∩B={'+a+','+(a+1)+',...,'+b+'}，共 '+n+' 个。'], input:'num' }; } });

  // 交集为空/非空的元素
  mk({ id:'MS-SET-004', kp:'集合', kpId:'kp-mbs', type:'blank', diff:2,
    gen:function(){ var a=E.ri(2,4), b=E.ri(6,8); return { text:'集合 A={1,...,'+a+'}，B={x∈Z| x>'+b+'}，则 A∩B 的元素个数 = ______。',
      answer:String(0), solution:['A 中最大为 '+a+'，B 中最小为 '+(b+1)+'，'+a+' < '+(b+1)+'，故 A∩B 为空集，0 个。'], input:'num' }; } });

  // 并集元素个数
  mk({ id:'MS-SET-005', kp:'集合', kpId:'kp-mbs', type:'blank', diff:2,
    gen:function(){ var a=E.ri(2,4), b=E.ri(3,5); var n=b; // A={1..a} B={a..b}?? 用错开
      // A={1..a}, B={a+1..b} 不交并集数=a+(b-a)=b
      var n2=a+(b-a); var n3=b; 
      return { text:'集合 A={1,2,...,'+a+'}，B={'+(a+1)+','+(a+2)+',...,'+b+'}，两者互不重复，则 A∪B 的元素个数 = ______。',
        answer:String(n3), solution:['A 有 '+a+' 个，B 有 '+(b-a)+' 个，不相交则总数='+a+'+'+(b-a)+'='+n3+'。'], input:'num' }; } });

  // 子集个数 2^n
  mk({ id:'MS-SET-006', kp:'集合', kpId:'kp-mbs', type:'blank', diff:2,
    gen:function(){ var n=E.ri(2,4); return { text:'集合 A 有 '+n+' 个元素，则 A 的子集个数 = 2^n = ______。',
      answer:String(Math.pow(2,n)), solution:[n+' 个元素子集数 = 2^'+n+' = '+Math.pow(2,n)+'。'], input:'num' }; } });

  // 真子集个数 2^n - 1
  mk({ id:'MS-SET-007', kp:'集合', kpId:'kp-mbs', type:'blank', diff:2,
    gen:function(){ var n=E.ri(2,4); return { text:'集合 A 有 '+n+' 个元素，则 A 的真子集个数 = ______。',
      answer:String(Math.pow(2,n)-1), solution:['真子集数 = 2^'+n+'−1 = '+Math.pow(2,n)+'−1='+(Math.pow(2,n)-1)+'。'], input:'num' }; } });

  // 数轴区间交集（整数个数）
  mk({ id:'MS-SET-008', kp:'集合', kpId:'kp-mbs', type:'blank', diff:2,
    gen:function(){ var a=E.ri(1,3), b=E.ri(4,7); return { text:'集合 A = {x | '+a+' < x < '+b+'，x∈Z}，则 A 的元素个数 = ______。',
      answer:String(b-a-1), solution:['整数 '+a+' 与 '+b+' 之间（不含端点）：'+(a+1)+' 到 '+(b-1)+'，共 '+(b-a-1)+' 个。'], input:'num' }; } });

  // 补集(求B的补集中元素)
  mk({ id:'MS-SET-009', kp:'集合', kpId:'kp-mbs', type:'blank', diff:2,
    gen:function(){ var a=E.ri(3,6); var other=E.ri(a+1,a+3); return { text:'全集 U={1,2,...,'+a+'}，集合 A={'+(a)+'}（若 a 是A）,则 A 在 U 中的补集 ∁U A 的元素个数 = ______。',
      answer:String(a-1), solution:['补集为除该元素外的其余元素，共 '+(a-1)+' 个。'], input:'num' }; } });

  // 交集非空的条件(给区间A,B求交集元素个数已知)
  mk({ id:'MS-SET-010', kp:'集合', kpId:'kp-mbs', type:'blank', diff:1,
    gen:function(){ var a=E.ri(1,3), b=E.ri(4,6), c=E.ri(1,3); 
      return { text:'集合 A={1,2,...,'+a+'} 与 B={'+c+','+(c+1)+',...,'+a+'}（其中 '+c+' ≤ '+a+'）的交集 A∩B 的元素个数 = ______。',
        answer:String(a-c+1), solution:['A∩B={'+c+','+(c+1)+',...,'+a+'}，共 '+(a-c+1)+' 个。'], input:'num' }; } });

  // 集合中元素求和/积
  mk({ id:'MS-SET-011', kp:'集合', kpId:'kp-mbs', type:'blank', diff:2,
    gen:function(){ var a=E.ri(2,5), b=E.ri(4,8); return { text:'集合 A={x∈Z | '+a+' ≤ x ≤ '+b+'}，则 A 中所有元素之和 = ______。',
      answer:String((a+b)*(b-a+1)/2), solution:['等差数列求和：('+a+'+'+b+')×'+(b-a+1)+'/2 = '+( (a+b)*(b-a+1)/2 )+'。'], input:'num' }; } });

  // 集合中偶数的个数
  mk({ id:'MS-SET-012', kp:'集合', kpId:'kp-mbs', type:'blank', diff:2,
    gen:function(){ var a=E.ri(1,2), b=E.ri(5,8); var evens=0; for(var i=a;i<=b;i++) if(i%2===0) evens++;
      return { text:'集合 A={x | '+a+' ≤ x ≤ '+b+'，x 为正整数}，则 A 中偶数的个数 = ______。',
        answer:String(evens), solution:['从 '+a+' 到 '+b+' 中偶数有 '+evens+' 个。'], input:'num' }; } });

  root.__PREMIUM_MATH_SET = T;
})(typeof window !== 'undefined' ? window : globalThis);
