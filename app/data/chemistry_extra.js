/* ============================================================
   无限题 · 化学扩充模板（福建卷）
   补充: 离子方程式、元素周期表应用、化学计算深化、
   有机物同分异构、速率与平衡影响、电化学深化、常见实验
   答案确定可判分
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }
  function frac(n,d){ var g=E.gcd(n,d); return (n/g)+'/'+(d/g); }

  mk({ id:'HX-LIZI-001', kp:'离子方程式', kpId:'kp-c-extra', type:'choice', diff:3,
    gen:function(){ return {text:'下列离子方程式书写正确的是（ ）',
      options:['铁与盐酸：Fe+2H⁺=Fe²⁺+H₂↑', '铁与盐酸：Fe+2H⁺=Fe³⁺+H₂↑', '铁与盐酸：Fe+2H⁺=Fe+H₂', '铁不与盐酸反应'],
      answer:'铁与盐酸：Fe+2H⁺=Fe²⁺+H₂↑', correct:0,
      solution:['铁与盐酸生成Fe²⁺(亚铁离子)和氢气：Fe+2H⁺=Fe²⁺+H₂↑。A正确；B误生成Fe³⁺。']}; } });

  mk({ id:'HX-BANYE-001', kp:'氧化还原配平', kpId:'kp-c-extra', type:'blank', diff:3,
    gen:function(){ var n=E.pick([1,2,3]); var e=2*n; // MnO2+4HCl→ 每mol MnO2得到2mol e(Cl→Cl2)
      return {text:'MnO₂+4HCl(浓)→MnCl₂+Cl₂↑+2H₂O中，若用 '+(n)+' mol MnO₂，氧化产物Cl₂的物质的量为 ______ mol。',
        answer:String(n),input:'num',unit:'mol',
        solution:['每 mol MnO₂ 氧化生成 1 mol Cl₂(Cl⁻→Cl₂失2e，Mn⁴⁺→Mn²⁺得2e守恒)，故 '+n+' mol MnO₂ 生成 '+n+' mol Cl₂。']}; } });

  mk({ id:'HX-ZHOUQI-001', kp:'元素周期表应用', kpId:'kp-c-extra', type:'choice', diff:2,
    gen:function(){ return {text:'第三周期元素中，金属性最强的是（ ）',
      options:['Na', 'Mg', 'Al', 'Cl'],
      answer:'Na', correct:0,
      solution:['同周期从左到右金属性减弱，Na在第三周期最左边、金属性最强。A正确。']}; } });

  mk({ id:'HX-JISUAN-001', kp:'化学计算深化', kpId:'kp-c-extra', type:'blank', diff:3,
    gen:function(){ var m=E.pick([5.6,11.2]); var Fe=56; var n=m/Fe;
      return {text:'铁与足量稀硫酸反应 Fe+H₂SO₄=FeSO₄+H₂↑，用 '+m+' g 铁(Fe=56)完全反应，生成的氢气的物质的量为 ______ mol。',
        answer:String(n),input:'text',unit:'mol',
        solution:['n(Fe)=m/M='+m+'/56='+n+' mol，Fe:H₂=1:1，故n(H₂)='+n+' mol。']}; } });

  mk({ id:'HX-TONG-001', kp:'有机物同分异构', kpId:'kp-c-extra', type:'blank', diff:3,
    gen:function(){ var c=E.pick([4,5]);
      return {text:'分子式为 C'+c+'H₁₀ 的烷烃，对应的同分异构体（含碳链异构）共有 ______ 种。（C4H10有2种，C5H12有3种）',
        answer:String(c===4?2:3),input:'num',
        solution:['C4H10有正丁烷、异丁烷2种；C5H12有正戊烷、异戊烷、新戊烷3种。故C'+c+'H10有'+(c===4?2:3)+'种。']}; } });

  mk({ id:'HX-RATE2-001', kp:'影响速率的因素', kpId:'kp-c-extra', type:'choice', diff:2,
    gen:function(){ return {text:'增大压强（压缩体积）对气体反应速率的影响是（ ）',
      options:['加快气体反应速率', '减慢反应速率', '无影响', '使反应停止'],
      answer:'加快气体反应速率', correct:0,
      solution:['对气体反应，增大压强使浓度增大、分子碰撞频率增加，速率加快。A正确。']}; } });

  mk({ id:'HX-ELEC3-001', kp:'电化学应用', kpId:'kp-c-extra', type:'choice', diff:3,
    gen:function(){ return {text:'钢铁在海水中发生电化学腐蚀（吸氧腐蚀），作负极被腐蚀的是（ ）',
      options:['铁', '石墨杂质', '海水', '氧气'],
      answer:'铁', correct:0,
      solution:['钢铁在海水中形成的原电池中，铁较活泼作负极被氧化腐蚀(Fe-2e=Fe²⁺)。A正确。']}; } });

  root.__PREMIUM_CHEMISTRY_EXTRA = T;
})(typeof window !== 'undefined' ? window : globalThis);
