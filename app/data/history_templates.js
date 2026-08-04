/* ============================================================
   无限题 · 历史模板库（高中历史）
   覆盖: 中国古代史/中国近现代史/世界史
   题型: 选择题为主(史实判断/因果分析/概念理解)
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var templates = [];
  function mk(o){ templates.push(o); }

  // ===== 中国古代史 =====
  mk({
    id: 'S-ANC-001', kp: '秦朝制度', kpId: 'kp-gudai', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '秦始皇统一后推行的地方行政制度是（ ）',
        options: ['分封制', '郡县制', '行省制', '宗法制'],
        answer: '郡县制', correct: 1,
        solution: ['秦朝废分封、行郡县，郡县制加强了中央对地方的垂直管理，是中央集权制度的重要组成部分。行省制始于元朝。']
      };
    }
  });
  mk({
    id: 'S-ANC-002', kp: '科举制', kpId: 'kp-gudai', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '科举制正式确立的标志是隋炀帝设（ ）',
        options: ['察举制', '九品中正制', '进士科', '八股取士'],
        answer: '进士科', correct: 2,
        solution: ['隋文帝废除九品中正制，隋炀帝设进士科，标志科举制正式确立。科举制以考试成绩作为选官依据，扩大了官吏来源。']
      };
    }
  });
  mk({
    id: 'S-ANC-003', kp: '行省制度', kpId: 'kp-gudai', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '我国省级行政区划与行省制度的渊源始于（ ）',
        options: ['秦朝', '汉朝', '元朝', '明朝'],
        answer: '元朝', correct: 2,
        solution: ['元朝在地方推行行省制度，是我国省制的开端，行省划分突破了以往山川形便的局限。']
      };
    }
  });
  mk({
    id: 'S-ANC-004', kp: '百家争鸣', kpId: 'kp-gudai', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '春秋战国时期，主张"仁"与"兼爱"的学派分别是（ ）',
        options: ['儒家、墨家', '道家、法家', '墨家、儒家', '法家、道家'],
        answer: '儒家、墨家', correct: 0,
        solution: ['孔子(儒家)主张"仁"和"礼"；墨子(墨家)主张"兼爱""非攻"。这是百家争鸣时期的主要思想。']
      };
    }
  });

  // ===== 中国近现代史 =====
  mk({
    id: 'S-MOD-001', kp: '鸦片战争', kpId: 'kp-jindai', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '中国近代史的开端是（ ）',
        options: ['戊戌变法', '鸦片战争', '辛亥革命', '五四运动'],
        answer: '鸦片战争', correct: 1,
        solution: ['1840年鸦片战争是中国近代史的开端，中国开始沦为半殖民地半封建社会。五四运动是中国新民主主义革命的开端。']
      };
    }
  });
  mk({
    id: 'S-MOD-002', kp: '辛亥革命', kpId: 'kp-jindai', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '辛亥革命的历史意义是（ ）',
        options: ['推翻了封建帝制，建立了民主共和国', '彻底改变了中国半殖民地性质', '实现了国家统一', '完成了反帝反封建的革命任务'],
        answer: '推翻了封建帝制，建立了民主共和国', correct: 0,
        solution: ['辛亥革命推翻了清王朝，结束了统治中国两千多年的君主专制制度，建立了资产阶级共和国，使民主共和观念深入人心。但未改变中国社会性质。']
      };
    }
  });
  mk({
    id: 'S-MOD-003', kp: '五四运动', kpId: 'kp-jindai', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '五四运动的导火线是（ ）',
        options: ['巴黎和会上中国外交失败', '俄国十月革命', '新文化运动', '辛丑条约签订'],
        answer: '巴黎和会上中国外交失败', correct: 0,
        solution: ['1919年巴黎和会上中国外交失败，将德国在山东的权益转让给日本，成为五四运动的导火线。五四运动标志着新民主主义革命的开端。']
      };
    }
  });
  mk({
    id: 'S-MOD-004', kp: '新文化运动', kpId: 'kp-jindai', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '新文化运动的两面大旗是民主与（ ）',
        options: ['自由', '科学', '平等', '博爱'],
        answer: '科学', correct: 1,
        solution: ['新文化运动提倡民主与科学，提倡新道德、新文学，以《新青年》为主要阵地，动摇了封建思想的统治地位。']
      };
    }
  });

  // ===== 世界史 =====
  mk({
    id: 'S-WOR-001', kp: '英国资产阶级革命', kpId: 'kp-world', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '1689年英国颁布的，标志君主立宪制确立的法律文件是（ ）',
        options: ['《大宪章》', '《权利法案》', '《人权宣言》', '《独立宣言》'],
        answer: '《权利法案》', correct: 1,
        solution: ['1689年《权利法案》以法律形式限制了国王的权力，确立了议会主权，标志英国君主立宪制确立。《人权宣言》是法国的，《独立宣言》是美国的。']
      };
    }
  });
  mk({
    id: 'S-WOR-002', kp: '第一次工业革命', kpId: 'kp-world', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '第一次工业革命首先发生在（ ）',
        options: ['法国', '美国', '英国', '德国'],
        answer: '英国', correct: 2,
        solution: ['第一次工业革命首先发生在英国棉纺织业，以瓦特改良蒸汽机为标志，人类进入"蒸汽时代"。']
      };
    }
  });
  mk({
    id: 'S-WOR-003', kp: '启蒙运动', kpId: 'kp-world', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '主张"三权分立"的启蒙思想家是（ ）',
        options: ['伏尔泰', '孟德斯鸠', '卢梭', '康德'],
        answer: '孟德斯鸠', correct: 1,
        solution: ['孟德斯鸠在《论法的精神》中提出三权分立学说（立法、行政、司法）。卢梭主张社会契约和人民主权，伏尔泰主张天赋人权。']
      };
    }
  });
  mk({
    id: 'S-WOR-004', kp: '两次世界大战', kpId: 'kp-world', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '第二次世界大战的转折点是（ ）',
        options: ['斯大林格勒战役', '诺曼底登陆', '珍珠港事件', '莫斯科保卫战'],
        answer: '斯大林格勒战役', correct: 0,
        solution: ['1942-1943年斯大林格勒战役的胜利，使苏德战争局势发生根本转折，是二战的转折点。诺曼底登陆开辟了欧洲第二战场。']
      };
    }
  });

  root.__HistoryTemplates = templates;
})(typeof window !== 'undefined' ? window : globalThis);
