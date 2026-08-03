/* ============================================================
   无限题 · 语文模板库（新课标I卷，满分150/150分钟）
   侧重可参数化的考点：名句默写、成语运用、病句辨析、字音字形
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var templates = [];

  // ===== 名篇名句默写（新课标高考必背60篇）=====
  // 依据《新课标高考语文背诵篇目60篇》选取，直击高考默写真题
  templates.push({
    id: 'CH-POEM-001', kp: '名句默写', kpId: 'kp-poetry', type: 'blank', diff: 1,
    gen: function () {
      var bank = [
        // 必修文言文
        { t: '儒', clue: '《论语》中强调学习与思考辩证关系的句子', upper: '学而不思则罔，', lower: '思而不学则殆' },
        { t: '劝学', clue: '荀子《劝学》中"青出于蓝"的比喻句', upper: '青，取之于蓝，', lower: '而青于蓝' },
        { t: '劝学', clue: '荀子《劝学》中强调积累重要性的句子', upper: '不积跬步，', lower: '无以至千里' },
        { t: '师说', clue: '韩愈《师说》中"学生不一定不如老师"的句子', upper: '是故弟子不必不如师，', lower: '师不必贤于弟子' },
        { t: '师说', clue: '韩愈《师说》中点名教师职能的句子', upper: '师者，', lower: '所以传道受业解惑也' },
        { t: '赤壁赋', clue: '苏轼《赤壁赋》中使用"明月清风"典的句子', upper: '清风徐来，', lower: '水波不兴' },
        { t: '赤壁赋', clue: '苏轼《赤壁赋》中慨叹人生短暂的比喻句', upper: '寄蜉蝣于天地，', lower: '渺沧海之一粟' },
        { t: '阿房宫赋', clue: '杜牧《阿房宫赋》中"六王毕"对仗句', upper: '六王毕，', lower: '四海一' },
        { t: '陈情表', clue: '李密《陈情表》中"茕茕孑立"对句', upper: '茕茕孑立，', lower: '形影相吊' },
        { t: '归去来兮辞', clue: '陶渊明《归去来兮辞》中"悟已往之不谏"对句', upper: '悟已往之不谏，', lower: '知来者之可追' },
        // 经典诗词曲
        { t: '离骚', clue: '屈原《离骚》中表达"之路漫漫"追求的句子', upper: '路漫漫其修远兮，', lower: '吾将上下而求索' },
        { t: '短歌行', clue: '曹操《短歌行》中"对酒当歌"的续句', upper: '对酒当歌，', lower: '人生几何' },
        { t: '归园田居', clue: '陶渊明《归园田居》中"羁鸟恋旧林"对句', upper: '羁鸟恋旧林，', lower: '池鱼思故渊' },
        { t: '蜀道难', clue: '李白《蜀道难》中开篇"噫吁嚱"叹息句', upper: '蜀道之难，', lower: '难于上青天' },
        { t: '将进酒', clue: '李白《将进酒》中"天生我材"自信句', upper: '天生我材必有用，', lower: '千金散尽还复来' },
        { t: '登高', clue: '杜甫《登高》中"无边落木"对句', upper: '无边落木萧萧下，', lower: '不尽长江滚滚来' },
        { t: '登高', clue: '杜甫《登高》中"万里悲秋"对句', upper: '万里悲秋常作客，', lower: '百年多病独登台' },
        { t: '琵琶行', clue: '白居易《琵琶行》中"同是天涯"名句', upper: '同是天涯沦落人，', lower: '相逢何必曾相识' },
        { t: '锦瑟', clue: '李商隐《锦瑟》中"此情可待"对句', upper: '此情可待成追忆，', lower: '只是当时已惘然' },
        { t: '虞美人', clue: '李煜《虞美人》中"问君能有几多愁"答句', upper: '问君能有几多愁，', lower: '恰似一江春水向东流' },
        { t: '念奴娇·赤壁怀古', clue: '苏轼《念奴娇》中"大江东去"续句', upper: '大江东去，', lower: '浪淘尽，千古风流人物' },
        { t: '声声慢', clue: '李清照《声声慢》中寻寻觅觅叠字句', upper: '寻寻觅觅，', lower: '冷冷清清' },
        { t: '书愤', clue: '陆游《书愤》中"楼船夜雪"对句', upper: '楼船夜雪瓜洲渡，', lower: '铁马秋风大散关' },
        { t: '永遇乐', clue: '辛弃疾《永遇乐》中"廉颇老矣"句', upper: '廉颇老矣，', lower: '尚能饭否' },
        { t: '青玉案·元夕', clue: '辛弃疾《青玉案》中"蓦然回首"名句', upper: '众里寻他千百度，', lower: '蓦然回首' }
      ];
      var q = E.pick(bank);
      // 随机：上句接下句 或 下句接上句
      if (E.ri(0, 1) === 0) {
        return { text: '补写出下列名句的空缺部分：\n' + q.upper + ' ______。', answer: q.lower, solution: ['（' + '选自查背篇目 ' + q.t + '）'], input: 'text' };
      }
      return { text: '补写出下列名句的空缺部分：\n______。 ' + q.lower.split('，')[0] + '，' + (q.lower.split('，')[1] || ''), answer: q.upper, solution: ['（选自查背篇目 ' + q.t + '）'], input: 'text' };
    }
  });

  // ===== 名句理解性默写（新课标60篇，含情景提示）=====
  templates.push({
    id: 'CH-POEM-002', kp: '名句理解性默写', kpId: 'kp-poetry', type: 'blank', diff: 2,
    gen: function () {
      var bank = [
        { hint: '《论语》中阐述"学习与思考辩证统一"关系的名句是', key: '学而不思则罔，思而不学则殆', from: '《论语》十二章' },
        { hint: '荀子《劝学》中强调"积累促成质变"的名句是', key: '不积跬步，无以至千里；不积小流，无以成江海', from: '荀子《劝学》' },
        { hint: '韩愈《师说》中阐述"弟子与老师才能可以互有长短"的句子是', key: '是故弟子不必不如师，师不必贤于弟子，闻道有先后，术业有专攻', from: '韩愈《师说》' },
        { hint: '苏轼《赤壁赋》中感叹生命短暂、人如沧海一粟的名句是', key: '寄蜉蝣于天地，渺沧海之一粟', from: '苏轼《赤壁赋》' },
        { hint: '李密《陈情表》中描绘孤苦无依之状的两句是', key: '茕茕孑立，形影相吊', from: '李密《陈情表》' },
        { hint: '屈原《离骚》中表达"追求真理永不止息"的诗句是', key: '路漫漫其修远兮，吾将上下而求索', from: '屈原《离骚》（节选）' },
        { hint: '李白《将进酒》中表现豪放自信、乐观豁达的名句是', key: '天生我材必有用，千金散尽还复来', from: '李白《将进酒》' },
        { hint: '杜甫《登高》中描绘夔州秋景、营造苍凉意境的两句是', key: '无边落木萧萧下，不尽长江滚滚来', from: '杜甫《登高》' },
        { hint: '李煜《虞美人》中以水喻愁、写出愁思绵长的名句是', key: '问君能有几多愁？恰似一江春水向东流', from: '李煜《虞美人》' },
        { hint: '辛弃疾《永遇乐·京口北固亭怀古》中借用廉颇典故表达仍愿为国效力的是', key: '凭谁问：廉颇老矣，尚能饭否', from: '辛弃疾《永遇乐》' },
        { hint: '辛弃疾《青玉案·元夕》中描写不刻意寻觅而终得偶遇的名句是', key: '众里寻他千百度，蓦然回首，那人却在灯火阑珊处', from: '辛弃疾《青玉案·元夕》' },
        { hint: '曹操《短歌行》中借"月明星稀"起兴、抒发求贤若渴心情的句子是', key: '月明星稀，乌鹊南飞', from: '曹操《短歌行》' }
      ];
      var q = E.pick(bank);
      return { text: q.hint + '，请写出该句子：______。', answer: q.key, solution: ['（选自查背篇目 ' + q.from + '）理解性默写，注意书写规范'], input: 'text' };
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
