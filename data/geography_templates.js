/* ============================================================
   无限题 · 地理模板库（高中地理）
   覆盖: 自然地理/人文地理/区域地理
   题型: 选择题+填空为主(规律判断/计算/原理)
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var templates = [];
  function mk(o){ templates.push(o); }

  // ===== 自然地理 =====
  mk({
    id: 'N-GEO-001', kp: '地球运动', kpId: 'kp-ziran', type: 'blank', diff: 2,
    gen: function () {
      // 时区计算: 北京时间(120°E) = 东8区。给经度求相对时差
      var lon = E.ri(90, 135);        // 东经度
      var zone = Math.round((lon - 120) / 15);   // 相对东8区时差(小时)
      var zname = zone === 0 ? '东八区' : (zone > 0 ? ('东' + (8 + zone) + '区') : ('东' + (8 + zone) + '区'));
      return {
        text: '某地位于东经 ' + lon + '°，则该地属于_______时区（写出时区，如"东八区"）。',
        answer: zname, input: 'text',
        solution: ['时区 = 经度 ÷ 15（四舍五入）。' + lon + ' ÷ 15 = ' + (lon / 15).toFixed(1) + '，四舍五入取' + Math.round(lon / 15) + '，即东经' + (Math.round(lon / 15) * 15) + '°所在时区 = ' + zname + '。']
      };
    }
  });
  mk({
    id: 'N-GEO-002', kp: '气候类型', kpId: 'kp-ziran', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '终年受赤道低气压带控制，全年高温多雨的气候类型是（ ）',
        options: ['热带雨林气候', '地中海气候', '温带季风气候', '热带沙漠气候'],
        answer: '热带雨林气候', correct: 0,
        solution: ['热带雨林气候分布在赤道附近，终年受赤道低气压带控制，全年高温多雨。地中海气候夏季受副高控制炎热干燥，冬季受西风带控制温和多雨。']
      };
    }
  });
  mk({
    id: 'N-GEO-003', kp: '洋流', kpId: 'kp-ziran', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '下列洋流中，属于暖流的是（ ）',
        options: ['秘鲁寒流', '日本暖流（黑潮）', '拉布拉多寒流', '千岛寒流'],
        answer: '日本暖流（黑潮）', correct: 1,
        solution: ['暖流是从较低纬度流向较高纬度、水温较流经海区高的洋流。日本暖流(北太平洋暖流)是暖流；秘鲁寒流、拉布拉多寒流、千岛寒流属寒流。']
      };
    }
  });
  mk({
    id: 'N-GEO-004', kp: '地质作用', kpId: 'kp-ziran', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '由内力作用形成的山是（ ）',
        options: ['喜马拉雅山脉', '黄土高原的沟壑', '河口三角洲', '山前冲积扇'],
        answer: '喜马拉雅山脉', correct: 0,
        solution: ['喜马拉雅山脉由板块碰撞挤压(内力作用)形成。黄土沟壑是流水侵蚀(外力)，三角洲和冲积扇是流水堆积(外力)。']
      };
    }
  });

  // ===== 人文地理 =====
  mk({
    id: 'N-HUM-001', kp: '人口迁移', kpId: 'kp-renwen', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '影响人口迁移最主要的因素是（ ）',
        options: ['自然环境的优劣', '经济因素', '政治因素', '战争'],
        answer: '经济因素', correct: 1,
        solution: ['在影响人口迁移的诸多因素中，经济因素往往起主导作用，人们追求较高的经济收入和生活水平。但不同历史阶段主导因素不同。']
      };
    }
  });
  mk({
    id: 'N-HUM-002', kp: '城市化', kpId: 'kp-renwen', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '下列是衡量一个地区城市化水平的主要标志的是（ ）',
        options: ['城市数目的多少', '城市人口占总人口的比重', '城市面积的大小', '城市人口的多少'],
        answer: '城市人口占总人口的比重', correct: 1,
        solution: ['衡量城市化水平高低的最重要标志是城市人口占总人口的比重。城市化还表现为城市数目增多、城市规模扩大。']
      };
    }
  });
  mk({
    id: 'N-HUM-003', kp: '农业区位', kpId: 'kp-renwen', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '西北地区农业以灌溉农业为主，其最主要限制性自然因素是（ ）',
        options: ['热量不足', '水源短缺', '土壤贫瘠', '地形崎岖'],
        answer: '水源短缺', correct: 1,
        solution: ['西北地区深居内陆，降水稀少，气候干旱，水源(河流、地下水灌溉)成为农业发展的最主要制约因素。']
      };
    }
  });
  mk({
    id: 'N-HUM-004', kp: '区域发展', kpId: 'kp-renwen', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '珠江三角洲地区发展外向型经济的突出优势是（ ）',
        options: ['能源资源丰富', '毗邻港澳、多侨乡', '矿产蕴藏量大', '地处内陆腹地'],
        answer: '毗邻港澳、多侨乡', correct: 1,
        solution: ['珠三角毗邻港澳、便于引进外资与技术，且是全国著名侨乡，华侨多、侨汇多，成为其发展外向型经济的独特优势。']
      };
    }
  });

  // ===== 区域地理 =====
  mk({
    id: 'N-REG-001', kp: '中国地理', kpId: 'kp-quyu', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '秦岭-淮河一线是我国重要的地理分界线，它是下列哪条线的分界线（ ）',
        options: ['亚热带与暖温带', '中温带与寒温带', '热带与亚热带', '青藏高寒区与东部季风区'],
        answer: '亚热带与暖温带', correct: 0,
        solution: ['秦岭-淮河大致与1月0°C等温线、800mm年等降水量线重合，是我国亚热带与暖温带、湿润区与半湿润区的分界线。']
      };
    }
  });
  mk({
    id: 'N-REG-002', kp: '区域生态环境', kpId: 'kp-quyu', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '我国西北地区荒漠化的主要人为原因是（ ）',
        options: ['过度开垦、过度放牧、滥伐森林', '全球气候变暖', '流水侵蚀加剧', '沿海咸潮入侵'],
        answer: '过度开垦、过度放牧、滥伐森林', correct: 0,
        solution: ['荒漠化的主要人为原因包括过度樵采、过度放牧、过度开垦，使地表植被破坏，土壤失去保护。降水少本身是自然原因。']
      };
    }
  });

  root.__GeographyTemplates = templates;
})(typeof window !== 'undefined' ? window : globalThis);
