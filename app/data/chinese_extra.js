/* ============================================================
   无限题 · 语文扩充模板（新课标I卷）
   补充: 语言得体/修辞/压缩语段、文言断句、诗歌炼字、
   现代文信息筛选、文化常识补充、病句改错深化
   答案确定可判分
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }

  // 语言得体
  mk({ id:'HX-DETI-001', kp:'语言得体', kpId:'kp-ct-extra', type:'choice', diff:2,
    gen:function(){ return {
      text:'下列谦敬辞使用恰当的一项是（ ）',
      options:['打扰了您，深表歉意', '请勿打扰，贵姓大名', '今日幸会，幸会（对长辈说自己）', '这是我的大作（介绍自己作品）'],
      answer:'打扰了您，深表歉意', correct:0,
      solution:['"贵姓""大作"是敬辞应用来称对方，"幸会"用于平辈。A"打扰""深表歉意"用于道歉得体。A正确。']
    }; }
  });
  // 修辞
  mk({ id:'HX-XIUC-001', kp:'修辞手法', kpId:'kp-ct-extra', type:'choice', diff:2,
    gen:function(){ return {
      text:'"春天像小姑娘，花枝招展的，笑着，走着。"（朱自清《春》）运用的主要修辞是（ ）',
      options:['比喻和拟人', '夸张和对偶', '排比和借代', '设问和反问'],
      answer:'比喻和拟人', correct:0,
      solution:['本体"春天"，喻体"小姑娘"是比喻；"笑着、走着"赋予春天人的动作是拟人。A正确。']
    }; }
  });
  // 压缩语段
  mk({ id:'HX-YASUO-001', kp:'压缩语段', kpId:'kp-ct-extra', type:'choice', diff:3,
    gen:function(){ return {
      text:'下列最能概括"人工智能正在改变教育方式，使个性化学习成为可能，但同时也带来数据隐私的挑战"一句主旨的是（ ）',
      options:['AI促进个性化学习但也带来数据隐私挑战', 'AI让教育完全自动化', '数据隐私问题无法解决', 'AI取代了教师'],
      answer:'AI促进个性化学习但也带来数据隐私挑战', correct:0,
      solution:['句子核心是"AI使个性化学习成为可能(利)+带来数据隐私挑战(弊)"，A既涵盖利又涵盖弊，概括最完整。']
    }; }
  });
  // 文言断句
  mk({ id:'HX-DUANJU-001', kp:'文言断句', kpId:'kp-ct-extra', type:'choice', diff:3,
    gen:function(){ return {
      text:'对"余闻之也久明道中从先人还家于舅家见之"断句，最恰当的一项是（王安石《伤仲永》）',
      options:['余闻之也久/明道中/从先人还家/于舅家见之', '余闻之也/久明道中/从先人/还家于舅家见之', '余闻之也久明/道中从/先人还家于/舅家见之', '余闻之/也久明道中/从先人还家于/舅家见之'],
      answer:'余闻之也久/明道中/从先人还家/于舅家见之', correct:0,
      solution:['"余闻之也久"主谓完整；"明道中"时间状语；"从先人还家"动宾；"于舅家见之"介词结构后置。A断句正确。']
    }; }
  });
  // 诗歌炼字
  mk({ id:'HX-LIANZI-001', kp:'诗歌炼字', kpId:'kp-ct-extra', type:'choice', diff:3,
    gen:function(){ return {
      text:'"春风又绿江南岸"（王安石《泊船瓜洲》）中"绿"字的妙处，赏析不恰当的是（ ）',
      options:['化静为动，写春风吹绿大地', '形象地展现春回大地的生机', '"绿"是形容词活用为动词', '表达了万籁俱寂的宁静'],
      answer:'表达了万籁俱寂的宁静', correct:3,
      solution:['"绿"形容词活用为动词，化静为动、生动展现生机。D"万籁俱寂"与"春绿生机"意蕴不符，赏析不当。选D。']
    }; }
  });
  // 现代文信息筛选
  mk({ id:'HX-XIANDAI-001', kp:'现代文信息筛选', kpId:'kp-ct-extra', type:'choice', diff:2,
    gen:function(){ return {
      text:'"5G技术传输速度快、延迟低，但基站建设成本高，覆盖偏远地区仍需时日。"据此判断正确的一项是（ ）',
      options:['5G优势在于高速低延迟但成本高、覆盖待完善', '5G完全取代了4G', '5G没有缺点', '偏远地区已完全覆盖'],
      answer:'5G优势在于高速低延迟但成本高、覆盖待完善', correct:0,
      solution:['文本指出5G"传输快、延迟低"（优势），但"建设成本高、覆盖需时日"（局限），A完整概括。B、C、D绝对化或与文意相悖。']
    }; }
  });
  // 文化常识补充
  mk({ id:'HX-WEN-002', kp:'文化常识补充', kpId:'kp-ct-extra', type:'choice', diff:2,
    gen:function(){ return {
      text:'古代"科举"乡试考中者称（ ）',
      options:['举人', '状元', '童生', '贡士'],
      answer:'举人', correct:0,
      solution:['乡试(省级)录取者为举人；殿试第一名称状元；会试(全国)录取者称贡士。A正确。']
    }; }
  });
  // 病句改错深化
  mk({ id:'HX-BINGJU-001', kp:'病句辨析深化', kpId:'kp-ct-extra', type:'choice', diff:3,
    gen:function(){ return {
      text:'下列句子没有语病的一句是（ ）',
      options:['通过这次活动，我们增长了不少见识', '为了避免不再发生类似事故，公司加强了管理', '他的写作水平有了明显的提高和改善', '济南的冬天是美的城市'],
      answer:'通过这次活动，我们增长了不少见识', correct:0,
      solution:['B"避免不再发生"否定不当(应"避免再次发生")；C"提高和改善"搭配混乱；D"济南的冬天是城市"主宾不当(主语应为济南)。A无语病。']
    }; }
  });

  root.__PREMIUM_CHINESE_EXTRA = T;
})(typeof window !== 'undefined' ? window : globalThis);
