/* ============================================================
   无限题 · 历史高分题型模板（新课标卷）
   补足高考常考的高频考点: 古代/近现代/世界史
   答案确定, 判分准确
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }

  // ===== 中国古代史 =====
  mk({
    id: 'S-ANC-005', kp: '宗法制', kpId: 'kp-gudai', type: 'choice', diff: 2,
    gen: function () { return {
      text: '西周宗法制的核心是（ ）',
      options: ['嫡长子继承制', '禅让制', '分封制', '察举制'],
      answer: '嫡长子继承制', correct: 0,
      solution: ['宗法制以嫡长子继承制为核心，确立了区分嫡庶、长幼尊卑的等级秩序。A正确。']
    }; }
  });
  mk({
    id: 'S-ANC-006', kp: '丝绸之路', kpId: 'kp-gudai', type: 'choice', diff: 2,
    gen: function () { return {
      text: '"一带"指丝绸之路经济带。陆上丝绸之路的开辟与下列哪位人物直接相关（ ）',
      options: ['张骞', '郑和', '玄奘', '鉴真'],
      answer: '张骞', correct: 0,
      solution: ['西汉张骞出使西域，开辟了丝绸之路，促进了中外经济文化交流。A正确；郑和是海上(下西洋)。']
    }; }
  });
  mk({
    id: 'S-ANC-007', kp: '君主专制强化', kpId: 'kp-gudai', type: 'choice', diff: 3,
    gen: function () { return {
      text: '明太祖朱元璋废丞相、权分六部，其根本目的是（ ）',
      options: ['加强君主专制', '提高行政效率', '减轻皇帝负担', '防止大臣专权'],
      answer: '加强君主专制', correct: 0,
      solution: ['废丞相、权分六部使皇帝直接统领六部事务，强化君主专制、集权于一身。A最根本；B、C是附带效果，D是表面原因。']
    }; }
  });
  mk({
    id: 'S-ANC-008', kp: '宋元商品经济', kpId: 'kp-gudai', type: 'choice', diff: 3,
    gen: function () { return {
      text: '宋朝商业发展的表现之一是出现了世界上最早的纸币，它是（ ）',
      options: ['交子', '银票', '会子', '铁钱'],
      answer: '交子', correct: 0,
      solution: ['北宋四川地区出现世界最早的纸币"交子"，是商品经济发展的结果。A正确。']
    }; }
  });

  // ===== 中国近现代史 =====
  mk({
    id: 'S-MOD-005', kp: '改革开放', kpId: 'kp-jindai', type: 'choice', diff: 2,
    gen: function () { return {
      text: '我国改革开放的起点是（ ）',
      options: ['1978年十一届三中全会', '1956年社会主义改造', '1949年新中国成立', '1992年南方谈话'],
      answer: '1978年十一届三中全会', correct: 0,
      solution: ['1978年党的十一届三中全会确定把工作重心转移到经济建设上来、实行改革开放，是我国改革开放的起点。A正确。']
    }; }
  });
  mk({
    id: 'S-MOD-006', kp: '抗日战争', kpId: 'kp-jindai', type: 'choice', diff: 2,
    gen: function () { return {
      text: '全民族抗战开始的标志是（ ）',
      options: ['七七事变(卢沟桥事变)', '九一八事变', '西安事变', '南京大屠杀'],
      answer: '七七事变(卢沟桥事变)', correct: 0,
      solution: ['1937年七七事变标志着全民族抗战的开始；九一八事变(1931)是局部抗战开端。A正确。']
    }; }
  });
  mk({
    id: 'S-MOD-007', kp: '经济特区', kpId: 'kp-jindai', type: 'choice', diff: 2,
    gen: function () { return {
      text: '下列最早设立的经济特区是（ ）',
      options: ['深圳', '上海浦东', '海南', '苏州'],
      answer: '深圳', correct: 0,
      solution: ['1980年我国设立深圳、珠海、汕头、厦门四个经济特区，深圳是"改革开放的窗口"。A正确。']
    }; }
  });

  // ===== 世界史 =====
  mk({
    id: 'S-WOR-005', kp: '文艺复兴', kpId: 'kp-world', type: 'choice', diff: 2,
    gen: function () { return {
      text: '文艺复兴的核心思潮是（ ）',
      options: ['人文主义', '理性主义', '自由主义', '科学主义'],
      answer: '人文主义', correct: 0,
      solution: ['文艺复兴以人文主义为核心，主张以人为中心、肯定人的价值和尊严，反对神学束缚。A正确。']
    }; }
  });
  mk({
    id: 'S-WOR-006', kp: '第二次工业革命', kpId: 'kp-world', type: 'choice', diff: 2,
    gen: function () { return {
      text: '第二次工业革命最突出的成就和标志是（ ）',
      options: ['电力的广泛使用', '蒸汽机的改良', '珍妮纺纱机', '原子能的应用'],
      answer: '电力的广泛使用', correct: 0,
      solution: ['第二次工业革命以电力的广泛应用为标志，人类进入"电气时代"。A正确；蒸汽机属于第一次工业革命。']
    }; }
  });
  mk({
    id: 'S-WOR-007', kp: '战后格局', kpId: 'kp-world', type: 'choice', diff: 3,
    gen: function () { return {
      text: '二战后形成的世界格局是（ ）',
      options: ['美苏两极格局', '多极鼎立格局', '单极世界', '凡尔赛-华盛顿体系'],
      answer: '美苏两极格局', correct: 0,
      solution: ['二战后美苏对峙形成两极格局(冷战)。凡尔赛-华盛顿体系是一战后；当今是世界朝着多极化方向发展(D不完整)。A正确。']
    }; }
  });

  root.__PREMIUM_HISTORY = T;
})(typeof window !== 'undefined' ? window : globalThis);
