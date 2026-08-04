/* ============================================================
   无限题 · 高中英语深化核心模板库（新课标I卷）
   补充高考核心题型考点（原模板偏基础语法/词汇）：
   读后续写衔接、七选五、完形填空逻辑、语法填空深化、
   阅读理解推断、固定句式翻译
   答案确定, 判分可靠
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];

  // 读后续写：情节衔接
  T.push({
    id: 'HS-CONT-001', kp: '读后续写衔接', kpId: 'kp-hs-eng', type: 'choice', diff: 3,
    gen: function () { return {
      text: '读后续写：上文"Tom was about to give up on the climbing, when he remembered his teacher\'s courage-inspiring words."，下列最恰当衔接下文的是（ ）',
      options: ['He felt a surge of new energy and decided to keep trying.', 'He threw the rope away immediately.', 'He closed his eyes and fell asleep.', 'He called his friends to complain.'],
      answer: 'He felt a surge of new energy and decided to keep trying.', correct: 0,
      solution: ['上下文：忘记老师鼓励的话→重燃斗志继续尝试。A(重燃力量继续)与上文"被老师话语激励"自然衔接。B、C、D偏离故事情节。']
    }; }
  });
  // 七选五
  T.push({
    id: 'HS-SEVEN-001', kp: '七选五', kpId: 'kp-hs-eng', type: 'choice', diff: 3,
    gen: function () { return {
      text: '七选五：上文"Regular exercise is important for health. ______. However, too much can harm."选择最恰当的过渡句（选项）',
      options: ['It does good to both body and mind.', 'Exercise is a waste of time.', 'Everyone must run a marathon.', 'Health is not important.'],
      answer: 'It does good to both body and mind.', correct: 0,
      solution: ['前句说运动有益健康，后句"However太多有害"，空白处填"运动身心有益"，形成"有益-但过度有害"的对比。A正确。']
    }; }
  });
  // 完形填空逻辑
  T.push({
    id: 'HS-CLOZE-001', kp: '完形填空逻辑', kpId: 'kp-hs-eng', type: 'choice', diff: 3,
    gen: function () { return {
      text: '完形填空："She worked hard every day; ______, she made great progress in a month."',
      options: ['as a result', 'however', 'on the contrary', 'meanwhile'],
      answer: 'as a result', correct: 0,
      solution: ['前因(努力)后果(进步)是因果关系，"as a result;因此"连接恰当；however表转折、on the contrary相反、meanwhile同时。A正确。']
    }; }
  });
  // 语法填空深化
  T.push({
    id: 'HS-GRAM-001', kp: '语法填空深化', kpId: 'kp-hs-eng', type: 'blank', diff: 3,
    gen: function () {
      var bank = [
        { c: 'She is interested in ______ (read) novels.', ans: 'reading', sol: 'be interested in + 动名词' },
        { c: 'The problem ______ (discuss) yesterday was difficult.', ans: 'discussed', sol: '过去分词作后置定语=which was discussed' },
        { c: 'He looked forward to ______ (visit) the museum.', ans: 'visiting', sol: 'look forward to + 动名词' },
        { c: 'It is necessary ______ (finish) the task on time.', ans: 'to finish', sol: 'It is adj. to do' }
      ];
      var q = E.pick(bank);
      return { text: q.c + ' 用所给词的正确形式填空：', answer: q.ans, solution: [q.sol], input: 'text' };
    }
  });
  // 阅读理解推断
  T.push({
    id: 'HS-READ-001', kp: '阅读理解推断', kpId: 'kp-hs-eng', type: 'choice', diff: 3,
    gen: function () { return {
      text: '阅读推断："The library, built in 1875, has survived two wars and a fire, and still serves the community today."，可推断出（ ）',
      options: ['The library has a long history', 'The library will close soon', 'The library is newly built', 'The library is far from the city'],
      answer: 'The library has a long history', correct: 0,
      solution: ['由"built in 1875(建于1875年)"可知图书馆历史悠久，且历经战火仍在使用。可推出A。B、C与文意相悖，D为未提及。']
    }; }
  });
  // 定语从句/状语从句
  T.push({
    id: 'HS-CLAUSE-001', kp: '从句辨析', kpId: 'kp-hs-eng', type: 'choice', diff: 3,
    gen: function () { return {
      text: '选择最恰当的填入："The man ______ is talking to the teacher is our new coach."',
      options: ['who', 'whom', 'which', 'whose'],
      answer: 'who', correct: 0,
      solution: ['先行词 the man(人)在从句中作主语，用关系代词 who(或that)；(whom 作宾语、which 指物、whose 表所属)。A正确。']
    }; }
  });

  root.__PREMIUM_ENGLISH_HS = T;
})(typeof window !== 'undefined' ? window : globalThis);
