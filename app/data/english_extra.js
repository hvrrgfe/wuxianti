/* ============================================================
   无限题 · 英语扩充模板（新课标I卷）
   补充: 应用文写作要点、听力场景理解、词汇语境辨析、
   情景交际深化、句子翻译(汉译英)、词义猜测
   答案确定可判分
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }

  mk({ id:'HX-APPTXT-001', kp:'应用文写作要点', kpId:'kp-e-extra', type:'choice', diff:3,
    gen:function(){ return {text:'写英文邀请信时，通常应包含（ ）',
      options:['说明活动时间地点、发出邀请、期待回复', '只写问候语', '不写活动内容', '只写抱怨'],
      answer:'说明活动时间地点、发出邀请、期待回复', correct:0,
      solution:['邀请信要写明活动(时间/地点/内容)、真诚邀请、表达期待回信。A要素齐全。']}; } });

  mk({ id:'HX-LISEN-001', kp:'听力场景理解', kpId:'kp-e-extra', type:'choice', diff:2,
    gen:function(){ return {text:'听力对话："What time will the train leave? It\'s scheduled for 9:15."，此时火车（ ）',
      options:['9:15发车', '已经发车', '下午发车', '尚未确定'],
      answer:'9:15发车', correct:0,
      solution:['"scheduled for 9:15"=预定9:15，故火车9:15发车。A正确。']}; } });

  mk({ id:'HX-CIKU-001', kp:'词汇语境', kpId:'kp-e-extra', type:'choice', diff:3,
    gen:function(){ return {text:'The medicine proved quite ______ in treating the disease. (有效的)',
      options:['effective', 'expensive', 'passive', 'relative'],
      answer:'effective', correct:0,
      solution:['"effective"=有效的，符合"药物对治病有效"。expense昂贵、passive被动、relative相对，均不符。A正确。']}; } });

  mk({ id:'HX-QINGJ-001', kp:'情景交际', kpId:'kp-e-extra', type:'choice', diff:2,
    gen:function(){ return {text:'- "Thank you so much for your help!" - "______"',
      options:['You\'re welcome.', 'No problem.', 'Bye.', 'How are you?'],
      answer:'You\'re welcome.', correct:0,
      solution:['对"谢谢"的应答用"You\'re welcome(不客气)"。Bye道别、How are you问候均不恰当。A(还有Not at all等)最常用。']}; } });

  mk({ id:'HX-FANYI-001', kp:'句子翻译', kpId:'kp-e-extra', type:'blank', diff:3,
    gen:function(){ var bank=[
      {c:'I saw him ______ (play) basketball in the yard.', ans:'playing', sol:'see sb doing:看见正在进行'},
      {c:'It\'s important ______ (learn) English well.', ans:'to learn', sol:'It is adj to do'},
      {c:'She is fond of ______ (collect) stamps.', ans:'collecting', sol:'be fond of +动名词'},
      {c:'The book is worth ______ (read) twice.', ans:'reading', sol:'be worth doing'}];
      var q=E.pick(bank);
      return {text:q.c+' 用正确形式填空：',answer:q.ans,solution:[q.sol],input:'text'}; } });

  mk({ id:'HX-TONGYI-001', kp:'同义替换', kpId:'kp-e-extra', type:'choice', diff:3,
    gen:function(){ return {text:'The word "enormous" in "an enormous building" is closest in meaning to（ ）',
      options:['huge', 'tiny', 'empty', 'local'],
      answer:'huge', correct:0,
      solution:['enormous=巨大的=非常庞大的，与huge同义。tiny微小、empty空、local本地。A正确。']}; } });

  root.__PREMIUM_ENGLISH_EXTRA = T;
})(typeof window !== 'undefined' ? window : globalThis);
