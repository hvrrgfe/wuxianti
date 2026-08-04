/* ============================================================
   无限题 · 地理高分题型模板（新课标卷）
   补足高考常考的高频考点: 自然/人文/区域地理
   答案确定, 判分准确
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }

  // ===== 自然地理 =====
  mk({
    id: 'N-GEO-005', kp: '大气环流', kpId: 'kp-ziran', type: 'choice', diff: 2,
    gen: function () { return {
      text: '影响我国东部地区降水的主要大气环流是（ ）',
      options: ['季风环流', '三圈环流', '热力环流', '信风带'],
      answer: '季风环流', correct: 0,
      solution: ['我国东部季风区降水主要受东南季风(夏季风)带来的水汽影响，降水集中于夏秋季节。A季风环流正确。']
    }; }
  });
  mk({
    id: 'N-GEO-006', kp: '等高线', kpId: 'kp-ziran', type: 'blank', diff: 3,
    gen: function () {
      // 等高距 h, 相对高差 = 等高距×间隔数
      var hi = E.pick([10, 20, 50]);   // 等高距
      var n = E.ri(3, 6);               // 跨等高线条数
      var rel = hi * n;
      return {
        text: '某地形图等高距为 ' + hi + ' 米，图中甲、乙两点之间跨过 ' + n + ' 条等高线，则两地相对高度约为 ______ 米。',
        answer: String(rel), input: 'num', unit: '米',
        solution: ['相对高度 ≈ 等高距 × 跨过的等高线条数 = ' + hi + ' × ' + n + ' = ' + rel + ' 米。']
      };
    }
  });
  mk({
    id: 'N-GEO-007', kp: '自然带分布', kpId: 'kp-ziran', type: 'choice', diff: 3,
    gen: function () { return {
      text: '按从赤道到两极的地域分异规律，下列自然带正确的是（ ）',
      options: ['热带雨林→热带草原→热带荒漠→亚热带常绿硬叶林', '热带雨林→亚寒带针叶林→苔原', '荒漠→草原→雨林', '冰川→寒带→热带'],
      answer: '热带雨林→热带草原→热带荒漠→亚热带常绿硬叶林', correct: 0,
      solution: ['从赤道到两极纬度地带性：热带雨林→热带草原→热带荒漠→亚热带(硬叶林)→温带落叶阔叶林→亚寒带针叶林→苔原冰原。A描述正确。']
    }; }
  });

  // ===== 人文地理 =====
  mk({
    id: 'N-HUM-005', kp: '工业区位', kpId: 'kp-renwen', type: 'choice', diff: 2,
    gen: function () { return {
      text: '啤酒厂等指向市场型的工业，其布局的主导因素是（ ）',
      options: ['接近消费市场', '接近原料地', '接近廉价劳动力', '接近技术中心'],
      answer: '接近消费市场', correct: 0,
      solution: ['啤酒等产品不宜远距离运输且需保鲜，属市场指向型工业，布局接近消费市场。A正确。']
    }; }
  });
  mk({
    id: 'N-HUM-006', kp: '交通运输', kpId: 'kp-renwen', type: 'choice', diff: 3,
    gen: function () { return {
      text: '我国"西气东输"工程主要运送的能源是（ ）',
      options: ['天然气', '煤炭', '石油', '水电'],
      answer: '天然气', correct: 0,
      solution: ['西气东输主要输送塔里木盆地等地的天然气到东部沿海地区，缓解东部能源短缺、优化能源结构。A正确。']
    }; }
  });
  mk({
    id: 'N-HUM-007', kp: '旅游地理', kpId: 'kp-renwen', type: 'choice', diff: 2,
    gen: function () { return {
      text: '下列不属于旅游资源开发条件评价内容的是（ ）',
      options: ['旅游资源的价值与集群状况', '旅游地的客源市场', '旅游地的交通通达度', '旅游地所在的经纬度高低'],
      answer: '旅游地所在的经纬度高低', correct: 3,
      solution: ['旅游资源开发条件包括：资源价值(美学/科学/s历史)、集群状况、地域组合、客源市场、交通通达度、地区接待能力等。经纬度不属于此。D不合。']
    }; }
  });

  // ===== 区域地理 =====
  mk({
    id: 'N-REG-003', kp: '长江流域', kpId: 'kp-quyu', type: 'choice', diff: 2,
    gen: function () { return {
      text: '长江三峡以上河段(上游)地区主要生态问题是（ ）',
      options: ['水土流失', '土地盐碱化', '洪涝灾害为主', '荒漠化为主'],
      answer: '水土流失', correct: 0,
      solution: ['长江上游(重庆以上)地势陡峭、植被破坏，水土流失严重，是其主要生态问题。A正确。']
    }; }
  });
  mk({
    id: 'N-REG-004', kp: '东北农业', kpId: 'kp-quyu', type: 'choice', diff: 3,
    gen: function () { return {
      text: '东北平原发展商品粮基地的突出优势条件是（ ）',
      options: ['地广人稀、土壤肥沃(黑土)', '光热充足', '交通十分发达', '劳动力充足'],
      answer: '地广人稀、土壤肥沃(黑土)', correct: 0,
      solution: ['东北平原(黑土地)地广人稀、人均耕地多、土壤肥沃，利于大规模机械化经营，是重要商品粮基地。A正确。']
    }; }
  });
  mk({
    id: 'N-REG-005', kp: '荒漠化治理', kpId: 'kp-quyu', type: 'choice', diff: 2,
    gen: function () { return {
      text: '治理西北地区荒漠化的有效措施是（ ）',
      options: ['合理利用水资源、种树种草还牧还草', '大量开垦草地为耕地', '禁止一切农牧业活动', '大量移民撤出'],
      answer: '合理利用水资源、种树种草还牧还草', correct: 0,
      solution: ['防治荒漠化应退耕还林还草、合理利用水资源、控制载畜量、建设防护林等。B、C、D极端或不可行。A正确。']
    }; }
  });

  root.__PREMIUM_GEOGRAPHY = T;
})(typeof window !== 'undefined' ? window : globalThis);
