/* ============================================================
   无限题 · 高中生物核心模板库（福建卷）
   补充高考核心考点（原模板偏基础）：
   细胞器/酶与ATP/细胞增殖/遗传分子基础(DNA复制/转录/翻译)
   内外环境稳态/进化/生态系统能量流动深化
   答案确定, 判分可靠
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function frac(n,d){ var g=E.gcd(n,d); return (n/g)+'/'+(d/g); }

  // 细胞器功能
  T.push({
    id: 'HS-ORG-001', kp: '细胞器功能', kpId: 'kp-hs-bio', type: 'choice', diff: 1,
    gen: function () { return {
      text: '下列细胞器中，被称为"能量转换站"（进行有氧呼吸主要场所）的是（ ）',
      options: ['线粒体', '叶绿体', '内质网', '核糖体'],
      answer: '线粒体', correct: 0,
      solution: ['线粒体是有氧呼吸的主要场所，为生命活动供能，被称"动力车间"；叶绿体是光合作用场所；核糖体合成蛋白质。A正确。']
    }; }
  });
  // 酶的特性
  T.push({
    id: 'HS-ENZ-001', kp: '酶的特性', kpId: 'kp-hs-bio', type: 'choice', diff: 2,
    gen: function () { return {
      text: '关于酶的叙述，正确的是（ ）',
      options: ['酶是蛋白质，能被蛋白酶水解', '酶能降低化学反应的活化能', '酶提供了反应所需的能量', '酶在高温下活性增强'],
      answer: '酶能降低化学反应的活化能', correct: 1,
      solution: ['酶是生物催化剂，本质多为蛋白质(少数RNA)，能降低活化能加快反应但不供能、不改变平衡。大多数酶是蛋白质(A不全对)；高温使酶失活(D错)。B正确。']
    }; }
  });
  // ATP
  T.push({
    id: 'HS-ATP-001', kp: 'ATP的结构', kpId: 'kp-hs-bio', type: 'choice', diff: 2,
    gen: function () { return {
      text: 'ATP（三磷酸腺苷）分子中，高能磷酸键的数量是（ ）',
      options: ['2个', '3个', '1个', '0个'],
      answer: '2个', correct: 0,
      solution: ['ATP 含两个高能磷酸键(腺苷—磷酸~磷酸~磷酸)，水解时断裂末端的磷酸键释放能量。A正确。']
    }; }
  });
  // DNA复制
  T.push({
    id: 'HS-DNA-001', kp: 'DNA复制', kpId: 'kp-hs-bio', type: 'blank', diff: 3,
    gen: function () {
      // DNA双链含碱基对数, 复制n次需游离碱基数
      var pairs = E.pick([100, 200, 300]);  // 碱基对数
      var g = 100;                           // 腺嘌呤A数量
      // 求胞嘧啶C数量: A+C=碱基总数/2 (A=T,C=G,A+C=半)? 实际A+T≠C+G, 用 A+C=总数/2? 不对
      // 双链中嘌呤总数=嘧啶总数, 但A与G、T与C关系不确定。改问: 含400个碱基(即200对), C=G=?
      var bases = pairs * 2;
      var a = E.pick([40, 60]);              // A 占比%
      var nA = bases * a / 100;
      var nC = bases / 2 - nA;               // C = 碱基总数/2 - A (因为A+C=碱基总数/2, 嘌呤=嘧啶)
      if(nC !== Math.round(nC)){ bases = 200; nA = 60; nC = 100 - 60; }
      return { text: '某DNA分子含 ' + bases + ' 个碱基，其中腺嘌呤 ' + nA + ' 个。由于碱基互补配对 A=T、C=G，则该DNA中胞嘧啶C的个数为 ______。',
        answer: String(nC), input: 'num', unit: '个',
        solution: ['嘌呤总数=嘧啶总数，且非配对碱基 A+G=C+T 恒成立（A=C所配的另一条链互补），实际上 A+T+C+G=总数 且 A=T、C=G，故 A+C=总数/2，C=' + bases + '/2 − ' + nA + '=' + nC + '。']
      };
    }
  });
  // 基因表达：密码子翻译
  T.push({
    id: 'HS-TRANS-001', kp: '遗传信息表达', kpId: 'kp-hs-bio', type: 'choice', diff: 2,
    gen: function () { return {
      text: '翻译过程中，运输氨基酸到核糖体的是（ ）',
      options: ['tRNA', 'mRNA', 'rRNA', 'DNA'],
      answer: 'tRNA', correct: 0,
      solution: ['翻译时 tRNA(转运RNA)携带特定氨基酸、以其反密码子识别mRNA上的密码子，将氨基酸运到核糖体。mRNA是模板，rRNA构成核糖体。A正确。']
    }; }
  });
  // 内环境稳态
  T.push({
    id: 'HS-HOME-001', kp: '内环境稳态', kpId: 'kp-hs-bio', type: 'choice', diff: 2,
    gen: function () { return {
      text: '下列属于人体内环境组成成分的是（ ）',
      options: ['血浆、组织液、淋巴', '消化液、尿液', '细胞内液', '泪液、汗液'],
      answer: '血浆、组织液、淋巴', correct: 0,
      solution: ['内环境是细胞外液，主要指血浆、组织液、淋巴（对多细胞动物而言）。A正确；B、D为外界环境，C为细胞内液。']
    }; }
  });
  // 生物进化
  T.push({
    id: 'HS-EVO-001', kp: '生物进化', kpId: 'kp-hs-bio', type: 'choice', diff: 2,
    gen: function () { return {
      text: '现代生物进化理论认为，进化的基本单位是（ ）',
      options: ['种群', '个体', '物种', '群落'],
      answer: '种群', correct: 0,
      solution: ['种群是生物进化的基本单位，基因库等种群基因频率的改变是进化的实质；自然选择决定进化方向。A正确。']
    }; }
  });
  // 血糖调节
  T.push({
    id: 'HS-GLUC-001', kp: '血糖调节', kpId: 'kp-hs-bio', type: 'choice', diff: 2,
    gen: function () { return {
      text: '血糖浓度升高时，胰岛 B 细胞分泌增加、促使血糖降为正常水平的激素是（ ）',
      options: ['胰岛素', '胰高血糖素', '甲状腺激素', '生长激素'],
      answer: '胰岛素', correct: 0,
      solution: ['胰岛素由胰岛B细胞分泌，促进组织细胞摄取利用葡萄糖、降低血糖；胰高血糖素升血糖。A正确。']
    }; }
  });

  root.__PREMIUM_BIOLOGY_HS = T;
})(typeof window !== 'undefined' ? window : globalThis);
