/* ============================================================
   无限题 · 政治高分题型模板（新课标卷）
   补足高考常考的高频考点: 经济/哲学/政治/文化
   答案确定, 判分准确
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }

  // ===== 经济 =====
  mk({
    id: 'Z-ECO-005', kp: '生产与消费', kpId: 'kp-jjjz', type: 'choice', diff: 2,
    gen: function () { return {
      text: '生产与消费的关系中，下列说法正确的是（ ）',
      options: ['消费决定生产', '生产决定消费的对象和方式', '消费对生产没有影响', '生产与消费无关'],
      answer: '生产决定消费的对象和方式', correct: 1,
      solution: ['生产决定消费（对象、水平、方式、为消费创造动力），消费对生产有反作用。A"消费决定生产"错；故B正确。']
    }; }
  });
  mk({
    id: 'Z-ECO-006', kp: '对外开放', kpId: 'kp-jjjz', type: 'choice', diff: 2,
    gen: function () { return {
      text: '我国发展对外经济关系、坚持"引进来"与"走出去"相结合，其根本目的是（ ）',
      options: ['扩大国际影响力', '促进我国经济发展', '增加外汇储备', '引进先进技术'],
      answer: '促进我国经济发展', correct: 1,
      solution: ['"引进来""走出去"相结合的根本目的是充分利用两个市场、两种资源，促进我国经济高质量发展。B最准确。']
    }; }
  });
  mk({
    id: 'Z-ECO-007', kp: '财政与税收', kpId: 'kp-jjjz', type: 'choice', diff: 3,
    gen: function () { return {
      text: '国家通过财政支出的方向调整资源配置、促进经济社会发展，体现财政的作用是（ ）',
      options: ['促进资源配置', '保障国家财政收支平衡', '增加居民个人收入', '取代市场调节'],
      answer: '促进资源配置', correct: 0,
      solution: ['财政是国家宏观调控的重要工具，通过收支方向引导资源合理配置。A正确；财政不能取代市场的基础调节作用(D错)。']
    }; }
  });
  mk({
    id: 'Z-ECO-008', kp: '就业与创业', kpId: 'kp-jjjz', type: 'choice', diff: 2,
    gen: function () { return {
      text: '解决就业问题的根本途径是（ ）',
      options: ['大力发展经济，增加就业岗位', '个人不要求薪资', '完全依靠政府安排', '停止企业裁员'],
      answer: '大力发展经济，增加就业岗位', correct: 0,
      solution: ['就业是民生之本，解决就业的根本途径是发展经济、扩大就业容量。政府促进就业是重要手段而非根本，个人也要树立正确就业观。']
    }; }
  });

  // ===== 哲学 =====
  mk({
    id: 'Z-PHI-005', kp: '实践与认识', kpId: 'kp-zx', type: 'choice', diff: 2,
    gen: function () { return {
      text: '实践是检验认识真理性的唯一标准，这是因为（ ）',
      options: ['实践具有客观物质性和直接现实性', '真理是绝对的', '认识决定实践', '实践无需认识指导'],
      answer: '实践具有客观物质性和直接现实性', correct: 0,
      solution: ['实践能把主观认识与客观实际联系起来加以对照，具有直接现实性，故能检验认识的真理性。B"真理绝对"片面；C、D颠倒实践与认识关系。']
    }; }
  });
  mk({
    id: 'Z-PHI-006', kp: '认识的反复性', kpId: 'kp-zx', type: 'choice', diff: 3,
    gen: function () { return {
      text: '人们对一个复杂事物的正确认识往往需要多次反复才能完成，这体现认识的（ ）',
      options: ['反复性、无限性和上升性', '直观性', '永恒单向性', '不需要条件的绝对性'],
      answer: '反复性、无限性和上升性', correct: 0,
      solution: ['认识具有反复性(受主客观条件限制)、无限性、上升性，追求真理是一个波浪式前进、螺旋式上升的过程。A符合。']
    }; }
  });
  mk({
    id: 'Z-PHI-007', kp: '人生价值', kpId: 'kp-zx', type: 'choice', diff: 2,
    gen: function () { return {
      text: '人生价值包括社会价值和自我价值，其中最根本的是（ ）',
      options: ['个人对社会的责任和贡献(社会价值)', '社会对个人的尊重和满足(自我价值)', '个人的金钱地位', '个人的兴趣自由'],
      answer: '个人对社会的责任和贡献(社会价值)', correct: 0,
      solution: ['人生价值是社会价值与自我价值的统一，但最根本的是个人对社会的责任和贡献，即社会价值。A正确。']
    }; }
  });

  // ===== 政治 =====
  mk({
    id: 'Z-POL-004', kp: '人民代表大会制', kpId: 'kp-zz', type: 'choice', diff: 2,
    gen: function () { return {
      text: '我国的根本政治制度是（ ）',
      options: ['人民代表大会制度', '中国共产党领导的多党合作制', '民族区域自治制度', '基层群众自治制度'],
      answer: '人民代表大会制度', correct: 0,
      solution: ['政体(国家权力机关)是人民代表大会制度，是我国的根本政治制度；多党合作、民族区域自治、基层自治是基本政治制度。A正确。']
    }; }
  });
  mk({
    id: 'Z-POL-005', kp: '依法治国', kpId: 'kp-zz', type: 'choice', diff: 3,
    gen: function () { return {
      text: '全面依法治国的总目标是（ ）',
      options: ['建设中国特色社会主义法治体系、建设社会主义法治国家', '建立完善的市场经济', '提高公民文化素质', '扩大对外开放'],
      answer: '建设中国特色社会主义法治体系、建设社会主义法治国家', correct: 0,
      solution: ['全面依法治国总目标是建设中国特色社会主义法治体系、建设社会主义法治国家。A正确。']
    }; }
  });
  mk({
    id: 'Z-POL-006', kp: '外交政策', kpId: 'kp-zz', type: 'choice', diff: 3,
    gen: function () { return {
      text: '我国奉行的独立自主和平外交政策的宗旨是（ ）',
      options: ['维护世界和平、促进共同发展', '不结盟', '反对霸权主义', '建立单极世界'],
      answer: '维护世界和平、促进共同发展', correct: 0,
      solution: ['我国外交政策的宗旨是维护世界和平、促进共同发展；基本目标是维护我国主权安全和发展利益、促进世界和平与发展。A正确。']
    }; }
  });

  // ===== 文化 =====
  mk({
    id: 'Z-CUL-003', kp: '民族精神', kpId: 'kp-wh', type: 'choice', diff: 2,
    gen: function () { return {
      text: '中华民族精神的核心是（ ）',
      options: ['爱国主义', '团结统一', '改革创新', '自强不息'],
      answer: '爱国主义', correct: 0,
      solution: ['中华民族精神以爱国主义为核心，以团结统一、爱好和平、勤劳勇敢、自强不息为主要内容。A正确。']
    }; }
  });

  root.__PREMIUM_POLITICS = T;
})(typeof window !== 'undefined' ? window : globalThis);
