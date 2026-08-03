/* ============================================================
   无限题 · 英语模板库（新课标I卷，满分150/120分钟）
   覆盖高频考点：语法填空、词汇、非谓语、时态、从句、完形
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var templates = [];

  // ===== 时态 =====
  templates.push({
    id: 'E-TENSE-001', kp: '一般现在时', kpId: 'kp-tense', type: 'blank', diff: 1,
    gen: function () {
      var bank = [
        { subj: 'She', verb: 'go', obj: 'to school every day', ans: 'goes', sol: '一般现在时，第三人称单数动词加 -es' },
        { subj: 'He', verb: 'play', obj: 'football', ans: 'plays', sol: '一般现在时，第三人称单数加 -s' },
        { subj: 'Tom', verb: 'study', obj: 'English', ans: 'studies', sol: '辅音字母+y结尾，改y为i加es' },
        { subj: 'My father', verb: 'watch', obj: 'TV in the evening', ans: 'watches', sol: '第三人称单数加 -es' },
        { subj: 'She', verb: 'have', obj: 'lunch at noon', ans: 'has', sol: 'have 第三人称单数为 has' }
      ];
      var q = E.pick(bank);
      return { text: q.subj + ' ______ (' + q.verb + ') ' + q.obj + '.', answer: q.ans, solution: [q.sol], input: 'word' };
    }
  });
  templates.push({
    id: 'E-TENSE-002', kp: '现在完成时', kpId: 'kp-tense', type: 'blank', diff: 2,
    gen: function () {
      var bank = [
        { subj: 'I', verb: 'read', obj: 'this book', ans: 'have read', sol: '现在完成时 have + 过去分词' },
        { subj: 'She', verb: 'visit', obj: 'Beijing twice', ans: 'has visited', sol: 'has + 过去分词' },
        { subj: 'They', verb: 'finish', obj: 'their homework', ans: 'have finished', sol: 'have + 过去分词' }
      ];
      var q = E.pick(bank);
      return { text: q.subj + ' ______ (' + q.verb + ') ' + q.obj + '.', answer: q.ans, solution: [q.sol], input: 'word' };
    }
  });
  templates.push({
    id: 'E-TENSE-003', kp: '一般过去时', kpId: 'kp-tense', type: 'blank', diff: 1,
    gen: function () {
      var bank = [
        { subj: 'He', verb: 'go', obj: 'to the park yesterday', ans: 'went', sol: 'go 的过去式为 went' },
        { subj: 'She', verb: 'see', obj: 'a movie last night', ans: 'saw', sol: 'see 的过去式为 saw' },
        { subj: 'They', verb: 'buy', obj: 'some apples', ans: 'bought', sol: 'buy 的过去式为 bought' },
        { subj: 'I', verb: 'eat', obj: 'breakfast at 7', ans: 'ate', sol: 'eat 的过去式为 ate' }
      ];
      var q = E.pick(bank);
      return { text: q.subj + ' ______ (' + q.verb + ') ' + q.obj + '.', answer: q.ans, solution: [q.sol], input: 'word' };
    }
  });

  // ===== 被动语态 =====
  templates.push({
    id: 'E-PASS-001', kp: '被动语态', kpId: 'kp-voice', type: 'blank', diff: 2,
    gen: function () {
      var bank = [
        { subj: 'The book', verb: 'write', by: 'by him', ans: 'was written', sol: '一般过去时被动 was/were + 过去分词' },
        { subj: 'English', verb: 'speak', by: 'all over the world', ans: 'is spoken', sol: '一般现在时被动 is + 过去分词' },
        { subj: 'The bridge', verb: 'build', by: 'last year', ans: 'was built', sol: 'build 过去分词 built，过去被动 was built' }
      ];
      var q = E.pick(bank);
      return { text: q.subj + ' ______ (' + q.verb + ') ' + q.by + '.', answer: q.ans, solution: [q.sol], input: 'word' };
    }
  });

  // ===== 主谓一致 =====
  templates.push({
    id: 'E-AGR-001', kp: '主谓一致', kpId: 'kp-agreement', type: 'blank', diff: 2,
    gen: function () {
      var bank = [
        { subj: 'The number of students', verb: 'be', pred: '50', ans: 'is', sol: 'The number of + 复数名词 作主语，谓语用单数' },
        { subj: 'A number of students', verb: 'be', pred: 'playing', ans: 'are', sol: 'A number of + 复数名词 谓语用复数' },
        { subj: 'Neither he nor I', verb: 'be', pred: 'a teacher', ans: 'am', sol: '就近原则，neither...nor 与最近主语一致' },
        { subj: 'There', verb: 'be', pred: 'a pen and two books', ans: 'is', sol: 'There be 句型采就近原则，离 be 最近的是 a pen' }
      ];
      var q = E.pick(bank);
      return { text: q.subj + ' ______ (' + q.verb + ') ' + q.pred + '.', answer: q.ans, solution: [q.sol], input: 'word' };
    }
  });

  // ===== 非谓语 =====
  templates.push({
    id: 'E-NONFIN-001', kp: '非谓语动词', kpId: 'kp-nonfinite', type: 'blank', diff: 2,
    gen: function () {
      var bank = [
        { s: 'He wants ______ (go) home.', ans: 'to go', sol: 'want to do sth 固定搭配' },
        { s: 'I enjoy ______ (read) books.', ans: 'reading', sol: 'enjoy doing sth 固定搭配' },
        { s: 'She decided ______ (study) abroad.', ans: 'to study', sol: 'decide to do sth' },
        { s: 'The teacher made us ______ (work) hard.', ans: 'work', sol: 'make sb do sth 不带 to' },
        { s: 'It is important for us ______ (learn) English.', ans: 'to learn', sol: 'It is + adj + for sb to do' }
      ];
      var q = E.pick(bank);
      return { text: q.s, answer: q.ans, solution: [q.sol], input: 'word' };
    }
  });

  // ===== 定语从句 =====
  templates.push({
    id: 'E-ATTR-001', kp: '定语从句', kpId: 'kp-clause', type: 'blank', diff: 2,
    gen: function () {
      var bank = [
        { s: 'The man ______ lives next door is a doctor.', ans: 'who', sol: '先行词是人，作主语用 who' },
        { s: 'The book ______ I bought is very interesting.', ans: 'that/which', sol: '先行词是物，作宾语用 that/which' },
        { s: 'This is the school ______ I studied.', ans: 'where', sol: '先行词是地点，作状语用 where' },
        { s: 'Do you know the girl ______ hair is long?', ans: 'whose', sol: '表示所有格用 whose' }
      ];
      var q = E.pick(bank);
      return { text: q.s, answer: q.ans, solution: [q.sol], input: 'word' };
    }
  });

  // ===== 名词性从句 =====
  templates.push({
    id: 'E-NOUN-001', kp: '名词性从句', kpId: 'kp-clause', type: 'blank', diff: 3,
    gen: function () {
      var bank = [
        { s: '______ he said is true.', ans: 'What', sol: '主语从句 what' },
        { s: 'I wonder ______ he will come.', ans: 'whether', sol: 'whether 引导宾语从句表"是否"' },
        { s: 'The news ______ our team won made us happy.', ans: 'that', sol: 'that 引导同位语从句' }
      ];
      var q = E.pick(bank);
      return { text: q.s, answer: q.ans, solution: [q.sol], input: 'word' };
    }
  });

  // ===== 固定搭配 =====
  templates.push({
    id: 'E-PHRASE-001', kp: '固定搭配', kpId: 'kp-phrase', type: 'blank', diff: 1,
    gen: function () {
      var bank = [
        { s: 'look forward to ______ (do) sth', ans: 'doing', sol: 'to 后接动名词' },
        { s: 'be good at ______ (play) tennis', ans: 'playing', sol: 'be good at + 动名词' },
        { s: 'give up ______ (smoke)', ans: 'smoking', sol: 'give up + 动名词' },
        { s: 'be used to ______ (get) up early', ans: 'getting', sol: 'be used to + 动名词' },
        { s: 'keep on ______ (try)', ans: 'trying', sol: 'keep on + 动名词' }
      ];
      var q = E.pick(bank);
      return { text: '用括号内词的适当形式填空：' + q.s + '.', answer: q.ans, solution: [q.sol], input: 'word' };
    }
  });

  // ===== 词汇辨析（完形/情景）=====
  templates.push({
    id: 'E-VOCAB-001', kp: '词汇辨析', kpId: 'kp-vocab', type: 'choice', diff: 2,
    gen: function () {
      var bank = [
        { s: 'The _____ of the meeting is to discuss the plan.', o: ['purpose', 'purposeful', 'purposely'], c: 0 },
        { s: 'He is very _____ in learning English.', o: ['interested', 'interesting', 'interest'], c: 0 },
        { s: 'Please _____ the door before you leave.', o: ['close', 'closed', 'closing'], c: 0 },
        { s: 'She _____ a letter to her friend yesterday.', o: ['wrote', 'written', 'writes'], c: 0 },
        { s: 'It is _____ to help others.', o: ['important', 'importance', 'importantly'], c: 0 }
      ];
      var q = E.pick(bank);
      return { text: '— ' + q.s + ' —', options: q.o, correct: q.c, answer: q.o[q.c], solution: ['词义与词性辨析，应选 ' + q.o[q.c]] };
    }
  });

  // ===== 情景交际 =====
  templates.push({
    id: 'E-DIALOG-001', kp: '情景交际', kpId: 'kp-dialogue', type: 'choice', diff: 1,
    gen: function () {
      var bank = [
        { q: '— Thank you so much for your help!  — ______', o: ['You are welcome.', 'No, thanks.', 'Yes, please.'], c: 0 },
        { q: '— How are you?  — ______', o: ['Fine, thank you.', 'I am 15.', 'Good morning.'], c: 0 },
        { q: '— Could you help me?  — ______', o: ['Sure, what can I do?', 'I am busy.', 'Never mind.'], c: 0 },
        { q: '— Nice to meet you!  — ______', o: ['Nice to meet you, too.', 'Goodbye.', 'Thank you.'], c: 0 }
      ];
      var q = E.pick(bank);
      return { text: q.q, options: q.o, correct: q.c, answer: q.o[q.c], solution: ['根据礼貌交际用语，选 ' + q.o[q.c]] };
    }
  });

  // ===== 高考核心词汇：英→中文义匹配（按词频加权）=====
  // 数据来源：FREE高考英语2050核心词汇表（含词频）
  templates.push({
    id: 'E-VOCAB-002', kp: '词汇辨析', kpId: 'kp-vocab', type: 'choice', diff: 1,
    gen: function () {
      var V = (typeof window !== 'undefined' && window.__ENVOCAB) ? window.__ENVOCAB.core : [];
      if (!V || !V.length) return null;
      // 偏向高频核心词：前50%高频词占80%概率
      var hi = V.filter(function (w) { return w.freq >= 20; });
      var use = (hi.length && Math.random() < 0.8) ? hi : V;
      // 选一个正确词(最好有中文义)
      var correct = null, tries = 0;
      while (!correct && tries < 10) {
        var c = E.pick(use);
        if (c && c.def && c.def.length > 1 && c.w && c.w.length > 1 && !/[A-Z\.][a-z]/.test(c.w)) { correct = c; }
        tries++;
      }
      if (!correct) return null;
      // 干扰项：取其他3个不同词的英文释义
      var others = E.shuffle(V.filter(function (w) { return w.w !== correct.w && w.def; }));
      var wrongDefs = [];
      for (var i = 0; i < others.length && wrongDefs.length < 3; i++) {
        var d = others[i].def && others[i].def.split('、')[0];
        if (d && wrongDefs.indexOf(d) < 0) wrongDefs.push(d);
      }
      while (wrongDefs.length < 3) wrongDefs.push('请根据语境作答');
      var opts = E.shuffle([correct.def].concat(wrongDefs));
      return { text: '请问单词 "' + correct.w + '" 的中文意思是？',
        options: opts, correct: opts.indexOf(correct.def), answer: correct.def,
        solution: ['"' + correct.w + '" 常见义为：' + correct.def + (correct.freq ? '（高考词频 ' + correct.freq + '，高频核心词）' : '')] };
    }
  });

  // ===== 高考核心词汇：派生词/词性变化（选择题式，判分准确）=====
  // 依据 rel 字段（相关词汇/考查形式）出词形变化选择题
  templates.push({
    id: 'E-VOCAB-003', kp: '词汇辨析', kpId: 'kp-vocab', type: 'choice', diff: 2,
    gen: function () {
      var V = (typeof window !== 'undefined' && window.__ENVOCAB) ? window.__ENVOCAB.core : [];
      var pool = V.filter(function (w) { return w.rel && w.rel.length && w.def; });
      if (!pool.length) return null;
      var word = E.pick(pool), tries = 0;
      while (tries < 10) { var w2 = E.pick(pool); if (w2 && w2.w && w2.w.length > 2 && w2.rel.length >= 1) { word = w2; break; } tries++; }
      // 从 rel 里清出干净派生词
      var rels = [];
      word.rel.forEach(function (r) {
        (r.match(/[A-Za-z][A-Za-z']*/g) || []).forEach(function (t) { if (t.toLowerCase() !== word.w.toLowerCase() && rels.indexOf(t) < 0) rels.push(t); });
      });
      if (!rels.length) return null;
      var target = E.pick(rels);
      // 干扰：其他词的错误派生(TODO: 用高频常见干扰词形) 及选项
      var wrongRel = [];
      var others = E.shuffle(pool.filter(function (w) { return w.w !== word.w && w.rel && w.rel.length; }));
      for (var i = 0; i < others.length && wrongRel.length < 3; i++) {
        (others[i].rel[0].match(/[A-Za-z][A-Za-z']*/g) || []).forEach(function (t) {
          if (t.toLowerCase() !== word.w.toLowerCase() && wrongRel.indexOf(t) < 0 && wrongRel.length < 3) wrongRel.push(t);
        });
      }
      // 兜底干扰
      var pad = ['happiness', 'development', 'carefully', 'suggest', 'beautiful', 'allowed'];
      for (var k = 0; k < pad.length && wrongRel.length < 3; k++) { if (pad[k].toLowerCase() !== target.toLowerCase() && wrongRel.indexOf(pad[k]) < 0) wrongRel.push(pad[k]); }
      var opts = E.shuffle([target].concat(wrongRel.slice(0, 3)));
      return { text: '下列单词中，是 "' + word.w + '" 的相关派生词（词形变化）的是（ ）',
        options: opts, correct: opts.indexOf(target), answer: target,
        solution: ['"' + word.w + '" 的相关词形式有：' + rels.join('、'), '根据构词法（前缀/后缀等）判断，应选 ' + target] };
    }
  });

  // ===== 高考核心词汇：语境选词（高频词义）=====
  templates.push({
    id: 'E-VOCAB-004', kp: '词汇辨析', kpId: 'kp-vocab', type: 'choice', diff: 3,
    gen: function () {
      var V = (typeof window !== 'undefined' && window.__ENVOCAB) ? window.__ENVOCAB.core : [];
      var hi = V.filter(function (w) { return w.freq >= 25 && w.def; });
      if (!hi.length) hi = V;
      var correct = null, tries = 0;
      while (!correct && tries < 12) { var c = E.pick(hi); if (c && c.w && c.w.length > 2 && c.def && !/[\.\-]/.test(c.w)) correct = c; tries++; }
      if (!correct) return null;
      // 干扰：取同义近义词义项或泛用干扰
      var wrongs = [];
      var others = E.shuffle(V.filter(function (w) { return w.w !== correct.w && w.def; }));
      for (var i = 0; i < others.length && wrongs.length < 3; i++) {
        var d = others[i].def && others[i].def.split('、')[0];
        if (d && wrongs.indexOf(d) < 0 && d !== correct.def) wrongs.push(d);
      }
      while (wrongs.length < 3) wrongs.push('above', 'below', 'around')[wrongs.length % 3];
      var opts = E.shuffle([correct.def].concat(wrongs));
      var sentence = 'The word "' + correct.w + '" in the passage most likely means ______.';
      return { text: sentence, options: opts, correct: opts.indexOf(correct.def), answer: correct.def,
        solution: ['结合语境理解，"' + correct.w + '" 此处意为：' + correct.def + '（高考词频 ' + correct.freq + '）'] };
    }
  });

  root.__EnglishTemplates = templates;
})(typeof window !== 'undefined' ? window : globalThis);
