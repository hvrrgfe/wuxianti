/* ============================================================
   无限题 · 英语高分题型模板（Free高考英语体系）
   聚焦高考英语综合题型（非单纯词汇）:
   - 语法填空（给词变形/填词）
   - 短文改错（识别并改正）
   - 词形变化（构词法，源自 Free词汇rel派生词）
   - 阅读理解主旨判断
   - 完形填空逻辑词
   答案唯一确定，判分准确
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];

  // ===== 语法填空：动词时态/非谓语/词形 =====
  T.push({
    id: 'EF-GRAM-001', kp: '语法填空·动词时态', kpId: 'kp-grammar', type: 'blank', diff: 3,
    gen: function () {
      var bank = [
        { c: 'Last week, she ______ (visit) her grandparents.', ans: 'visited', sol: 'last week 表过去时间，用一般过去时 visited' },
        { c: 'By the time we arrived, they ______ (finish) the work.', ans: 'had finished', sol: 'by the time + 过去时，主句用过去完成时 had finished' },
        { c: 'Look! The children ______ (play) in the park.', ans: 'are playing', sol: 'Look!/Listen! 提示现在进行时 are playing' },
        { c: 'He ______ (live) in Beijing since 2010.', ans: 'has lived', sol: 'since 2010 表从过去持续到现在，用现在完成时 has lived' },
        { c: 'I ______ (read) a book when the phone rang.', ans: 'was reading', sol: 'when 从句过去时，主句叙述过去某刻正在发生的动作，用过去进行时 was reading' }
      ];
      var q = E.pick(bank);
      return { text: q.c + ' 用所给动词的正确形式填空：', answer: q.ans, solution: [q.sol], input: 'text' };
    }
  });
  T.push({
    id: 'EF-GRAM-002', kp: '语法填空·非谓语', kpId: 'kp-grammar', type: 'blank', diff: 4,
    gen: function () {
      var bank = [
        { c: 'I enjoy ______ (listen) to music.', ans: 'listening', sol: 'enjoy 后接动名词 listening' },
        { c: 'It is important ______ (study) hard.', ans: 'to study', sol: 'It is + adj. + to do，不定式作真正主语 to study' },
        { c: 'The girl ______ (stand) there is my sister.', ans: 'standing', sol: '定语从句简化，现在分词 standing 作后置定语修饰 girl' },
        { c: 'He decided ______ (buy) a new car.', ans: 'to buy', sol: 'decide to do sth.，用不定式 to buy' }
      ];
      var q = E.pick(bank);
      return { text: q.c + ' 用正确的非谓语动词形式填空：', answer: q.ans, solution: [q.sol], input: 'text' };
    }
  });
  T.push({
    id: 'EF-GRAM-003', kp: '语法填空·词形', kpId: 'kp-grammar', type: 'blank', diff: 3,
    gen: function () {
      var bank = [
        { c: 'She answered the question ______ (clear).', ans: 'clearly', sol: '修饰动词 answered，用副词 clearly' },
        { c: 'The ______ (beauty) of the lake attracted many visitors.', ans: 'beauty', sol: 'the + 名词，beautify→beauty(名词)' },
        { c: 'He is a famous ______ (write).', ans: 'writer', sol: '由动词 write 加 -er 构成名词 writer' },
        { c: 'It was a ______ (success) performance.', ans: 'successful', sol: '修饰名词 performance，用形容词 successful' }
      ];
      var q = E.pick(bank);
      return { text: q.c + ' 用所给词的正确形式填空：', answer: q.ans, solution: [q.sol], input: 'text' };
    }
  });

  // ===== 短文改错 =====
  T.push({
    id: 'EF-ERROR-001', kp: '短文改错', kpId: 'kp-error', type: 'choice', diff: 4,
    gen: function () {
      return {
        text: '下列句子中有一处错误，请选出错误所在的选项（ ）\n"Yesterday he go① to school by bike, and he was② very happy. He hopes③ that he will do④ better in the future."',
        options: ['① go 应为 goes', '② was 使用正确', '③ hopes 使用正确', '④ will do 使用正确'],
        answer: '① go 应为 goes', correct: 0,
        solution: ['Yesterday 表过去时间，谓语动词应用一般过去时 went，不是 go 或 goes。故①处错误，应为 "He went to school"。']
      };
    }
  });
  T.push({
    id: 'EF-ERROR-002', kp: '短文改错', kpId: 'kp-error', type: 'choice', diff: 4,
    gen: function () {
      return {
        text: '下列句子有一处错误，请选出错误项（ ）\n"She and I① am② good friends for③ many years. We often④ help each other."',
        options: ['① She and I 作主语正确', '② am 有误，应为 are', '③ for 使用正确', '④ often 位置正确'],
        answer: '② am 有误，应为 are', correct: 1,
        solution: ['主语为 She and I(两人)，谓语动词用复数 are，不用 am。正确为 "She and I are good friends"。']
      };
    }
  });

  // ===== 阅读理解·主旨判断 =====
  T.push({
    id: 'EF-READ-001', kp: '阅读理解·主旨', kpId: 'kp-reading', type: 'choice', diff: 3,
    gen: function () {
      return {
        text: '阅读短文，选择最佳标题（ ）\n"There is growing evidence that regular exercise not only strengthens the body but also sharpens the mind. Studies show that physical activity improves memory and concentration."',
        options: ['The Benefits of Exercise on the Brain', 'How to Lose Weight Fast', 'A Day in the Life of an Athlete', 'The History of Sports'],
        answer: 'The Benefits of Exercise on the Brain', correct: 0,
        solution: ['短文主旨是"体育锻炼不仅强身健体，还能提升大脑认知(记忆力和专注力)"，即运动对大脑的益处。故选A。']
      };
    }
  });
  T.push({
    id: 'EF-READ-002', kp: '阅读理解·细节', kpId: 'kp-reading', type: 'choice', diff: 3,
    gen: function () {
      return {
        text: '根据短文，判断下列哪项正确（ ）\n"Tom has lived in Shanghai for ten years. He works as an engineer in a big company and enjoys cycling along the river on weekends."',
        options: ['Tom works in China', 'Tom is a teacher', 'Tom dislikes cycling', 'Tom moved to Shanghai last year'],
        answer: 'Tom works in China', correct: 0,
        solution: ['短文明说"Tom has lived in Shanghai for ten years"以及"works as an engineer"，可知他在中国(上海)工作。故选A。']
      };
    }
  });

  // ===== 完形填空·逻辑词 =====
  T.push({
    id: 'EF-CLOZE-001', kp: '完形·逻辑', kpId: 'kp-cloze', type: 'choice', diff: 4,
    gen: function () {
      return {
        text: '完形填空：选择最恰当的填入（ ）\n"At first I felt nervous, ______ I gradually became confident thanks to my teacher\'s encouragement."',
        options: ['but', 'and', 'so', 'or'],
        answer: 'but', correct: 0,
        solution: ['前后是转折关系：起初紧张，但因为鼓励逐渐自信。表转折用 but。']
      };
    }
  });
  T.push({
    id: 'EF-CLOZE-002', kp: '完形·逻辑', kpId: 'kp-cloze', type: 'choice', diff: 3,
    gen: function () {
      return {
        text: '完形填空：选择最恰当的填入（ ）\n"He studied hard every day, ______ he passed the final exam."',
        options: ['so', 'but', 'because', 'although'],
        answer: 'so', correct: 0,
        solution: ['由"每天努力"推导出"通过了考试"，是因果关系，后句为结果，用 so(所以)。']
      };
    }
  });

  // ===== 词形变化（Free vocab派生） =====
  T.push({
    id: 'EF-DERIV-001', kp: '词形变化', kpId: 'kp-derivation', type: 'blank', diff: 3,
    gen: function () {
      var bank = [
        { w: 'care', f: '______ around you.', need: 'be careful', ans: 'careful', sol: 'care(小心，动词/名词) → careful(形容词"小心的")，be careful 意为"当心"' },
        { w: 'change', f: 'the ______ of the plan', need: 'the change of', ans: 'change', sol: 'change(变化，动词) → change(名词"变化")，the change of 表"……的变化"' },
        { w: 'have', f: 'He ______ a car.', need: 'has a car', ans: 'has', sol: 'have 的第三人称单数为 has' },
        { w: 'beauty', f: 'A ______ garden.', need: 'A beautiful garden.', ans: 'beautiful', sol: 'beauty(名词"美") → beautiful(形容词"美丽的")' }
      ];
      var q = E.pick(bank);
      return { text: '用括号内单词的正确形式填空：' + q.f + '（' + q.w + '）', answer: q.ans, solution: [q.sol], input: 'text' };
    }
  });

  root.__PREMIUM_ENGLISH = T;
})(typeof window !== 'undefined' ? window : globalThis);
