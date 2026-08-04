/* ============================================================
   无限题 · 生物扩充模板（福建卷）
   补充: 遗传系谱、人类遗传病、基因工程、种群S型增长、
   群落演替、生态系统稳定性、免疫深化、细胞呼吸类型、
   光合影响因素
   答案确定可判分
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }
  function frac(n,d){ var g=E.gcd(n,d); return (n/g)+'/'+(d/g); }

  mk({ id:'HX-XIPU-001', kp:'遗传系谱分析', kpId:'kp-b-extra', type:'blank', diff:3,
    gen:function(){ // 常染色体显性遗传病A_, 父母Aa×aa求子女患病概率
      var f=E.pick([{p:'Aa',q:'aa',pro:'1/2'},{p:'Aa',q:'Aa',pro:'3/4'}]);
      return {text:'一对夫妇基因型分别为 '+f.p+' 和 '+f.q+'（A为显性致病基因，常染色体显性遗传病），其子女患该病的概率为 ______。',
        answer:f.pro,input:'text',
        solution:['常显遗传病 A_:Aa×aa→Aa:aa=1:1，患病(Aa)概率1/2；Aa×Aa→AA:Aa:aa=1:2:1，患病(AA+Aa)概率3/4。故'+f.pro+'。']}; } });

  mk({ id:'HX-JIBING-001', kp:'人类遗传病', kpId:'kp-b-extra', type:'choice', diff:2,
    gen:function(){ return {text:'下列属于人类单基因遗传病的是（ ）',
      options:['白化病', '21三体综合征', '猫叫综合征', '多基因遗传病（高血压）'],
      answer:'白化病', correct:0,
      solution:['白化病是常染色体隐性单基因遗传病；21三体是染色体异常、猫叫是染色体结构变异、高血压是多基因遗传病。A正确。']}; } });

  mk({ id:'HX-JIYIN-001', kp:'基因工程基础', kpId:'kp-b-extra', type:'choice', diff:3,
    gen:function(){ return {text:'基因工程中"分子手术刀"即切割DNA的酶是（ ）',
      options:['限制酶', 'DNA连接酶', '解旋酶', 'RNA聚合酶'],
      answer:'限制酶', correct:0,
      solution:['限制酶(限制性内切酶)特异切割DNA磷酸二酯键，是基因工程"分子手术刀"；DNA连接酶连接、解旋酶解旋、RNA聚合酶转录。A正确。']}; } });

  mk({ id:'HX-KZ-001', kp:'种群S型增长', kpId:'kp-b-extra', type:'blank', diff:3,
    gen:function(){ var K=E.pick([100,200,400]);
      return {text:'在一定条件下，某生物种群数量增长符合"S"型曲线，环境容纳量(K值)为 '+K+'。当种群数量达到 K/2=' + (K/2) + ' 时，其增长速率（单位时间增长量）______（填"最大"）。',
        answer:'最大',input:'text',
        solution:['S型增长中，K/2处种群增长速率最大(增长速度最快)，K值处增长速率为0。故K/2='+(K/2)+'时增长速率最大。']}; } });

  mk({ id:'HX-YANTI-001', kp:'群落演替', kpId:'kp-b-extra', type:'choice', diff:2,
    gen:function(){ return {text:'在裸岩上发生的演替属于（ ）',
      options:['初生演替', '次生演替', '快速演替', '人类演替'],
      answer:'初生演替', correct:0,
      solution:['裸岩上从未有过植被覆盖的演替是初生演替(从地衣苔藓开始)；次生演替指原有植被遭破坏后恢复。A正确。']}; } });

  mk({ id:'HX-WEND-001', kp:'生态系统稳定性', kpId:'kp-b-extra', type:'choice', diff:3,
    gen:function(){ return {text:'生态系统的自我调节能力与下列哪个因素密切相关（ ）',
      options:['营养结构(食物网)的复杂程度', '生物个体大小', '是否有人类干扰', '太阳光照强度'],
      answer:'营养结构(食物网)的复杂程度', correct:0,
      solution:['生态系统自我调节能力主要取决于营养结构(食物链食物网)的复杂程度，越复杂调节能力越强、稳定性越高(抵抗干扰)。A正确。']}; } });

  mk({ id:'HX-MIANYI-001', kp:'免疫调节深化', kpId:'kp-b-extra', type:'choice', diff:2,
    gen:function(){ return {text:'体液免疫中，能产生抗体的细胞是（ ）',
      options:['浆细胞(效应B细胞)', 'T细胞', '吞噬细胞', '记忆细胞'],
      answer:'浆细胞(效应B细胞)', correct:0,
      solution:['B细胞增殖分化为浆细胞(效应B细胞)，浆细胞分泌特异性抗体进行体液免疫。A正确。']}; } });

  mk({ id:'HX-HUXI-001', kp:'细胞呼吸类型', kpId:'kp-b-extra', type:'choice', diff:2,
    gen:function(){ return {text:'人体剧烈运动产生乳酸的呼吸方式主要是（ ）',
      options:['无氧呼吸', '有氧呼吸', '光合作用', '发酵分解有机物'],
      answer:'无氧呼吸', correct:0,
      solution:['剧烈运动时肌细胞供氧不足，进行无氧呼吸(乳酸发酵)产生乳酸。A正确。']}; } });

  root.__PREMIUM_BIOLOGY_EXTRA = T;
})(typeof window !== 'undefined' ? window : globalThis);
