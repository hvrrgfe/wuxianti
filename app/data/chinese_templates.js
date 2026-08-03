/* ============================================================
   无限题 · 语文模板库（新课标I卷，满分150/150分钟）
   侧重可参数化的考点：名句默写、成语运用、病句辨析、字音字形
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var templates = [];

  // ===== 名篇名句默写（高考必背篇目）=====
  templates.push({
    id: 'CH-POEM-001', kp: '名句默写', kpId: 'kp-poetry', type: 'blank', diff: 1,
    gen: function () {
      var bank = [
        { upper: '落红不是无情物，', lower: '化作春泥更护花', note: '龚自珍《己亥杂诗》' },
        { upper: '不畏浮云遮望眼，', lower: '自缘身在最高层', note: '王安石《登飞来峰》' },
        { upper: '会当凌绝顶，', lower: '一览众山小', note: '杜甫《望岳》' },
        { upper: '海内存知己，', lower: '天涯若比邻', note: '王勃《送杜少府之任蜀州》' },
        { upper: '山重水复疑无路，', lower: '柳暗花明又一村', note: '陆游《游山西村》' },
        { upper: '长风破浪会有时，', lower: '直挂云帆济沧海', note: '李白《行路难》' },
        { upper: '沉舟侧畔千帆过，', lower: '病树前头万木春', note: '刘禹锡《酬乐天扬州初逢席上见赠》' },
        { upper: '但愿人长久，', lower: '千里共婵娟', note: '苏轼《水调歌头》' },
        { upper: '春蚕到死丝方尽，', lower: '蜡炬成灰泪始干', note: '李商隐《无题》' },
        { upper: '大漠孤烟直，', lower: '长河落日圆', note: '王维《使至塞上》' },
        { upper: '人生自古谁无死，', lower: '留取丹心照汗青', note: '文天祥《过零丁洋》' },
        { upper: '问渠那得清如许？', lower: '为有源头活水来', note: '朱熹《观书有感》' }
      ];
      var q = E.pick(bank);
      // 随机：上句接下句 或 下句接上句
      if (E.ri(0, 1) === 0) {
        return { text: '补写出下列名句的空缺部分：\n' + q.upper + ' ______。', answer: q.lower, solution: ['选自' + q.note], input: 'text' };
      }
      return { text: '补写出下列名句的空缺部分：\n______。 ' + q.lower.split('，')[0] + '，' + q.lower.split('，')[1], answer: q.upper, solution: ['选自' + q.note], input: 'text' };
    }
  });

  // ===== 名句理解性默写 =====
  templates.push({
    id: 'CH-POEM-002', kp: '名句理解性默写', kpId: 'kp-poetry', type: 'blank', diff: 2,
    gen: function () {
      var bank = [
        { hint: '《论语》中阐述"学与思"辩证关系的句子是', key: '学而不思则罔，思而不学则殆' },
        { hint: '陶渊明《饮酒》中表现"物我合一、悠然自得"心境的句子是', key: '采菊东篱下，悠然见南山' },
        { hint: '范仲淹《岳阳楼记》中表达"先忧后乐"情怀的句子是', key: '先天下之忧而忧，后天下之乐而乐' },
        { hint: '孟子《鱼我所欲也》中表达"舍生取义"观点的句子是', key: '二者不可得兼，舍生而取义者也' }
      ];
      var q = E.pick(bank);
      return { text: q.hint + '，请写出该句子：______。', answer: q.key, solution: ['理解性默写，注意书写规范'], input: 'text' };
    }
  });

  // ===== 成语运用 =====
  templates.push({
    id: 'CH-IDIOM-001', kp: '成语运用', kpId: 'kp-idiom', type: 'choice', diff: 2,
    gen: function () {
      var bank = [
        { s: '他做事总能做到______，考虑十分周全。', o: ['万无一失', '百里挑一', '不名一文', '名副其实'], c: 0, sol: '"万无一失"形容办事情绝对有把握，符合语境' },
        { s: '面对突如其来的困难，我们应当______，迎难而上。', o: ['知难而退', '望而却步', '勇往直前', '举棋不定'], c: 2, sol: '由"迎难而上"可知应选"勇往直前"' },
        { s: '他的演讲深入浅出，令人______。', o: ['目瞪口呆', '叹为观止', '耳目一新', '左顾右盼'], c: 2, sol: '"耳目一新"指见闻改变，使人耳目一新' },
        { s: '在紧急关头，他______，迅速化解了危机。', o: ['慌手慌脚', '临危不惧', '手足无措', '络绎不绝'], c: 1, sol: '"临危不惧"形容面对危险冷静果断' }
      ];
      var q = E.pick(bank);
      return { text: q.s + '（ ）', options: q.o, correct: q.c, answer: q.o[q.c], solution: [q.sol] };
    }
  });

  // ===== 病句辨析 =====
  templates.push({
    id: 'CH-SICK-001', kp: '病句辨析', kpId: 'kp-sick', type: 'choice', diff: 2,
    gen: function () {
      var bad = [
        '通过这次活动，使我深受教育。（缺主语）',
        '有没有坚定的信念，是一个人的事业取得成功的关键。（两面对一面）',
        '他的写作水平明显增进了。（动宾搭配不当）',
        '我们要尽一切努力防止这类交通事故不再发生。（否定不当）'
      ];
      var good = [
        '通过这次活动，我们深受教育。',
        '他能否取得成功，取决于是否有坚定的信念。',
        '他明显增进了写作水平。',
        '我们要防止这类交通事故再次发生。'
      ];
      var i = E.ri(0, bad.length - 1);
      // 选项：4个句子，只有正确选项无病
      var correctSent = good[i];
      var wrongSent = bad.filter(function (_, j) { return j !== i; });
      var opts = E.shuffle([correctSent].concat(wrongSent.map(function (w) { return w.split('。')[0] + '。'; })).slice(0, 4));
      return { text: '下列句子中，没有语病的一项是（ ）', options: opts, correct: opts.indexOf(correctSent), answer: correctSent, solution: [bad[i].split('（')[0] + '有语病：' + bad[i].split('（')[1].replace('）', '')] };
    }
  });

  // ===== 字音 =====
  templates.push({
    id: 'CH-PRON-001', kp: '字音', kpId: 'kp-pron', type: 'choice', diff: 1,
    gen: function () {
      var bank = [
        { w: '参差', right: 'cēn cī', wrong: 'cān chā' },
        { w: '徘徊', right: 'pái huái', wrong: 'pái huí' },
        { w: '逮捕', right: 'dài bǔ', wrong: 'dǎi pǔ' },
        { w: '徜徉', right: 'cháng yáng', wrong: 'tǎng yáng' },
        { w: '干涸', right: 'gān hé', wrong: 'gān gù' },
        { w: '对称', right: 'duì chèn', wrong: 'duì chèng' }
      ];
      var q = E.pick(bank);
      return { text: '下列词语中，加点字注音正确的一项是（ ）', options: [q.w + ' ' + q.right + '（正确）', q.w + ' ' + q.wrong + '（错误）'], correct: 0, answer: q.w + ' ' + q.right, solution: ['"' + q.w + '"正确读音为 ' + q.right + '，注意与常见误读区分'] };
    }
  });

  // ===== 字音字形选择 =====
  templates.push({
    id: 'CH-ZI-001', kp: '字音字形', kpId: 'kp-zi', type: 'choice', diff: 2,
    gen: function () {
      var right = ['再接再厉', '一筹莫展', '川流不息', '一如既往', '人才辈出', '甘拜下风'];
      var wrong = ['再接再励', '一愁莫展', '穿流不息', '一如继往', '人才倍出', '甘败下风'];
      var i = E.ri(0, right.length - 1);
      var correct = right[i];
      var wpool = wrong.filter(function (_, j) { return j !== i; });
      var opts = E.shuffle([correct].concat(wpool.slice(0, 3)));
      return { text: '下列词语中，没有错别字的一项是（ ）', options: opts, correct: opts.indexOf(correct), answer: correct, solution: ['"' + correct + '"书写正确，注意区别形近字'] };
    }
  });

  // ===== 文学常识 =====
  templates.push({
    id: 'CH-LIT-001', kp: '文学常识', kpId: 'kp-lit', type: 'choice', diff: 1,
    gen: function () {
      var bank = [
        { q: '"诗仙"是指', o: ['李白', '杜甫', '白居易', '王维'], c: 0, sol: '李白被称为"诗仙"' },
        { q: '"诗圣"是指', o: ['杜甫', '李白', '韩愈', '苏轼'], c: 0, sol: '杜甫被称为"诗圣"' },
        { q: '《史记》的作者是', o: ['司马迁', '司马光', '班固', '左丘明'], c: 0, sol: '《史记》为司马迁所著' },
        { q: '"四大名著"不包括下列哪一部？', o: ['《聊斋志异》', '《红楼梦》', '《西游记》', '《三国演义》'], c: 0, sol: '四大名著为水浒传、三国演义、西游记、红楼梦' },
        { q: '《论语》是记录什么的经典？', o: ['孔子及其弟子言行', '老子思想', '庄子寓言', '孟子论辩'], c: 0, sol: '《论语》记录孔子及其弟子言行' }
      ];
      var q = E.pick(bank);
      return { text: q.q + '？（ ）', options: q.o, correct: q.c, answer: q.o[q.c], solution: [q.sol] };
    }
  });

  root.__ChineseTemplates = templates;
})(typeof window !== 'undefined' ? window : globalThis);
