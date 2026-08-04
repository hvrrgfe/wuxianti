/* ============================================================
   无限题 · 政治模板库（高中政治）
   覆盖: 经济生活/生活与哲学/文化生活/政治生活
   题型: 选择题为主(判断/理解/材料分析)，答案100%确定
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var templates = [];
  // 通用选择：构造选择数组
  function mk(o){
    templates.push(o);
  }

  // ===== 经济生活 =====
  mk({
    id: 'Z-ECO-001', kp: '价值规律', kpId: 'kp-jjjz', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '价格围绕价值上下波动是价值规律的表现形式。下列对价值规律理解正确的是（ ）',
        options: ['价格始终等于价值', '价格由供求关系决定', '商品价值量由社会必要劳动时间决定', '价格波动会消失'],
        answer: '商品价值量由社会必要劳动时间决定', correct: 2,
        solution: ['价值规律：商品价值量由社会必要劳动时间决定，商品交换以价值量为基础实行等价交换，价格受供求关系影响围绕价值上下波动。']
      };
    }
  });
  mk({
    id: 'Z-ECO-002', kp: '通货膨胀', kpId: 'kp-jjjz', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '当纸币发行量超过流通中所需要的货币量时，会引起（ ）',
        options: ['通货紧缩', '通货膨胀、物价上涨', '经济快速增长', '商品价值提高'],
        answer: '通货膨胀、物价上涨', correct: 1,
        solution: ['纸币发行量必须以流通中所需要的货币量为限度，超过限度会引起通货膨胀，表现为物价上涨、纸币贬值。']
      };
    }
  });
  mk({
    id: 'Z-ECO-003', kp: '消费与生产', kpId: 'kp-jjjz', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '消费对生产有反作用。下列体现"消费对生产具有导向作用"的是（ ）',
        options: ['生产决定消费对象', '消费者新的需求促进产品的升级换代', '消费为生产创造出新的劳动力', '生产决定消费的水平'],
        answer: '消费者新的需求促进产品的升级换代', correct: 1,
        solution: ['消费对生产有反作用：新的消费热点带动产业出现，消费为生产创造出新的劳动力，消费对生产的调整和升级起着导向作用。消费者新需求导向产品升级换代，体现了导向作用。']
      };
    }
  });
  mk({
    id: 'Z-ECO-004', kp: '市场经济', kpId: 'kp-jjjz', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '我国社会主义市场经济的基本标志是（ ）',
        options: ['市场在资源配置中起决定作用', '坚持公有制为主体', '国家宏观调控', '积极扩大对外开放'],
        answer: '坚持公有制为主体', correct: 1,
        solution: ['社会主义市场经济的基本特征：坚持公有制为主体是基本标志；以共同富裕为根本目标；国家能实行强有力的宏观调控。']
      };
    }
  });

  // ===== 生活与哲学 =====
  mk({
    id: 'Z-PHI-001', kp: '物质与意识', kpId: 'kp-zx', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '下列属于唯物主义观点的有（ ）',
        options: ['存在即被感知', '意识是物质的反映', '精神是世界的本源', '绝对观念决定世界'],
        answer: '意识是物质的反映', correct: 1,
        solution: ['唯物主义认为物质决定意识，意识是物质的反映、对物质有能动反作用。存在即被感知、精神是世界本源等属于唯心主义。']
      };
    }
  });
  mk({
    id: 'Z-PHI-002', kp: '矛盾观', kpId: 'kp-zx', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '矛盾就是对立统一。下列成语最能体现"矛盾双方在一定条件下相互转化"的是（ ）',
        options: ['居安思危', '刻舟求剑', '守株待兔', '掩耳盗铃'],
        answer: '居安思危', correct: 0,
        solution: ['矛盾双方在一定条件下相互转化。居安思危体现安全与危险的相互转化。刻舟求剑否定运动；守株待兔是偶然当作必然；掩耳盗铃是唯心的。']
      };
    }
  });
  mk({
    id: 'Z-PHI-003', kp: '发展观', kpId: 'kp-zx', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '事物的发展是前进性与曲折性的统一。下列体现事物前进性的是（ ）',
        options: ['道路是曲折的', '新事物必然战胜旧事物', '新事物在开始时不完善', '发展的过程有反复'],
        answer: '新事物必然战胜旧事物', correct: 1,
        solution: ['发展的实质是新事物产生和旧事物灭亡，前途是光明的(前进性)、道路是曲折的。新事物必然战胜旧事物体现前进性。']
      };
    }
  });
  mk({
    id: 'Z-PHI-004', kp: '量变与质变', kpId: 'kp-zx', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '量变与质变的辩证关系要求我们（ ）',
        options: ['只要量变就能发生质变', '重视量的积累，为质变创造条件', '质变是无条件的', '量变和质变互相排斥'],
        answer: '重视量的积累，为质变创造条件', correct: 1,
        solution: ['量变是质变的前提和必要准备，质变是量变的必然结果。要求重视量的积累，当量变达到一定程度时积极促成质变。']
      };
    }
  });

  // ===== 文化生活 =====
  mk({
    id: 'Z-CUL-001', kp: '文化传承', kpId: 'kp-wh', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '对待传统文化的正确态度是（ ）',
        options: ['全盘继承', '全盘抛弃', '"取其精华，去其糟粕"，批判继承，古为今用', '照搬照抄'],
        answer: '"取其精华，去其糟粕"，批判继承，古为今用', correct: 2,
        solution: ['对待传统文化要"取其精华、去其糟粕"，批判继承，古为今用，处理好继承与发展的关系，在继承基础上发展，在发展过程中继承。']
      };
    }
  });
  mk({
    id: 'Z-CUL-002', kp: '文化创新', kpId: 'kp-wh', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '文化创新的根本途径是（ ）',
        options: ['继承传统', '社会实践', '面向世界博采众长', '科技的进步'],
        answer: '社会实践', correct: 1,
        solution: ['社会实践是文化创新的源泉和动力，是文化创新的根本途径。继承传统、博采众长是文化创新的重要途径而非根本途径。']
      };
    }
  });

  // ===== 政治生活 =====
  mk({
    id: 'Z-POL-001', kp: '公民权利', kpId: 'kp-zz', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '我国公民最基本的政治权利是（ ）',
        options: ['选举权和被选举权', '言论自由', '监督权', '宗教信仰自由'],
        answer: '选举权和被选举权', correct: 0,
        solution: ['选举权和被选举权是公民基本的民主权利，是公民参与管理国家和社会的基础和标志。']
      };
    }
  });
  mk({
    id: 'Z-POL-002', kp: '人民当家作主', kpId: 'kp-zz', type: 'choice', diff: 1,
    gen: function () {
      return {
        text: '我国的国体（国家性质）是（ ）',
        options: ['人民民主专政的社会主义国家', '人民代表大会制度', '多党合作和政治协商制度', '民族区域自治制度'],
        answer: '人民民主专政的社会主义国家', correct: 0,
        solution: ['我国的国体是人民民主专政的社会主义国家；政体是人民代表大会制度。国体决定政体。']
      };
    }
  });
  mk({
    id: 'Z-POL-003', kp: '政府职能', kpId: 'kp-zz', type: 'choice', diff: 2,
    gen: function () {
      return {
        text: '下列属于政府履行经济职能的是（ ）',
        options: ['教育部组织教材编写', '政府宏观调控稳定物价', '居委会调解邻里矛盾', '人大审议财政预算'],
        answer: '政府宏观调控稳定物价', correct: 1,
        solution: ['政府的经济职能包括宏观调控、市场监管、社会管理和公共服务。稳定物价属于宏观调控。教育部组织教材属于文化职能。']
      };
    }
  });

  root.__PoliticsTemplates = templates;
})(typeof window !== 'undefined' ? window : globalThis);
