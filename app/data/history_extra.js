/* ============================================================
   无限题 · 历史扩充模板（新课标卷）
   补充: 分封/宗法、古代变法、中枢制度、宋元明清商业政治、
   洋务/戊戌/新民主主义革命、五年计划、战后国际格局深化、
   经济全球化
   答案确定可判分
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }

  mk({ id:'HX-FENF-001', kp:'分封与宗法', kpId:'kp-h-extra', type:'choice', diff:3,
    gen:function(){ return {text:'商鞅变法中"废井田，开阡陌"的直接目的是（ ）',
      options:['确立封建土地私有制', '恢复井田制', '废除分封制', '强化宗法制'],
      answer:'确立封建土地私有制', correct:0,
      solution:['商鞅"废井田开阡陌"承认土地私有、允许买卖，确立封建土地私有制。A正确。']}; } });

  mk({ id:'HX-SHANG-001', kp:'商鞅变法', kpId:'kp-h-extra', type:'choice', diff:2,
    gen:function(){ return {text:'商鞅变法中奖励耕战、军功授爵，直接目的是（ ）',
      options:['富国强兵', '推广儒学', '削弱诸侯', '分封宗室'],
      answer:'富国强兵', correct:0,
      solution:['商鞅变法是新兴地主阶级为富国强兵、增强秦国实力而进行的改革。A正确。']}; } });

  mk({ id:'HX-TANG-001', kp:'唐代中枢', kpId:'kp-h-extra', type:'choice', diff:3,
    gen:function(){ return {text:'削弱相权、三省六部制中"尚书省"的职责是（ ）',
      options:['执行诏令政务', '负责决策审议', '起草诏书', '监察百官'],
      answer:'执行诏令政务', correct:0,
      solution:['三省六部：中书省决策起草、门下省审议封驳、尚书省执行，六部属尚书省。A正确。']}; } });

  mk({ id:'HX-SONG-001', kp:'宋元商业', kpId:'kp-h-extra', type:'choice', diff:2,
    gen:function(){ return {text:'北宋"市"的发展，出现的新变化是（ ）',
      options:['城市商业突破坊市界限、出现夜市', '严格市坊分离', '禁止商业活动', '市仅在特定时段开放'],
      answer:'城市商业突破坊市界限、出现夜市', correct:0,
      solution:['北宋商品经济发展，市突破了原先坊市分离的时空限制，商业街、夜市出现。A正确。']}; } });

  mk({ id:'HX-YANGWU-001', kp:'洋务运动', kpId:'kp-h-extra', type:'choice', diff:2,
    gen:function(){ return {text:'洋务运动兴办军事工业，其口号是（ ）',
      options:['自强', '求富', '变法', '民主'],
      answer:'自强', correct:0,
      solution:['前期军工业口号"自强"，后期民用工业口号"求富"。A正确。']}; } });

  mk({ id:'HX-WUXU-001', kp:'戊戌变法', kpId:'kp-h-extra', type:'choice', diff:2,
    gen:function(){ return {text:'领导戊戌变法的维新派代表人物是（ ）',
      options:['康有为、梁启超', '洪秀全', '李鸿章', '孙中山'],
      answer:'康有为、梁启超', correct:0,
      solution:['戊戌变法由康有为、梁启超等维新派领导，主张君主立宪。A正确。']}; } });

  mk({ id:'HX-XMIN-001', kp:'新民主主义革命', kpId:'kp-h-extra', type:'choice', diff:2,
    gen:function(){ return {text:'标志着新民主主义革命开端的历史事件是（ ）',
      options:['五四运动', '鸦片战争', '辛亥革命', '中国共产党成立'],
      answer:'五四运动', correct:0,
      solution:['1919年五四运动无产阶级开始登上政治舞台，成为新民主主义革命的开端。A正确。']}; } });

  mk({ id:'HX-WUWU-001', kp:'第一个五年计划', kpId:'kp-h-extra', type:'choice', diff:2,
    gen:function(){ return {text:'"一五"计划(1953-1957)的重点是（ ）',
      options:['重工业', '农业', '轻工业', '商业'],
      answer:'重工业', correct:0,
      solution:['一五计划优先发展重工业(如鞍钢、长春一汽等)，奠定工业化初步基础。A正确。']}; } });

  mk({ id:'HX-LENGZ-001', kp:'冷战格局', kpId:'kp-h-extra', type:'choice', diff:3,
    gen:function(){ return {text:'二战后美国推行"马歇尔计划"，其直接目的是（ ）',
      options:['扶持西欧复兴、遏制苏联', '帮助发展中国家', '加强对日控制', '扩大对华投资'],
      answer:'扶持西欧复兴、遏制苏联', correct:0,
      solution:['马歇尔计划(欧洲复兴计划)通过经济援助扶持西欧，也是为了遏制苏联、控制西欧。A正确。']}; } });

  mk({ id:'HX-JINGQI-001', kp:'经济全球化', kpId:'kp-h-extra', type:'choice', diff:2,
    gen:function(){ return {text:'世界贸易组织(WTO)的宗旨是（ ）',
      options:['促进自由贸易', '建立军事同盟', '统一各国货币', '限制国际贸易'],
      answer:'促进自由贸易', correct:0,
      solution:['WTO以推进公平自由的国际贸易为宗旨，调解贸易争端。A正确。']}; } });

  root.__PREMIUM_HISTORY_EXTRA = T;
})(typeof window !== 'undefined' ? window : globalThis);
