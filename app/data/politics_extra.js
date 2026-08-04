/* ============================================================
   无限题 · 政治扩充模板（新课标卷）
   补充: 联系观、认识论深化、社会发展规律、经济全球化、
   党的领导与民族区域自治、基层民主、人大职权、全过程人民民主
   答案确定可判分
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }

  mk({ id:'HX-LIANXI-001', kp:'联系观', kpId:'kp-z-extra', type:'choice', diff:2,
    gen:function(){ return {text:'"万事万物相互联系、密不可分"，体现的哲学观点是（ ）',
      options:['联系具有普遍性', '联系具有孤立性', '联系是主观的', '联系不可改变'],
      answer:'联系具有普遍性', correct:0,
      solution:['唯物辩证法认为联系是普遍的、客观的、有条件的。事物之间及内部各要素相互影响、相互制约，体现联系普遍性。A正确。']}; } });

  mk({ id:'HX-SHLF-001', kp:'社会发展规律', kpId:'kp-z-extra', type:'choice', diff:3,
    gen:function(){ return {text:'决定社会发展的根本动力是（ ）',
      options:['生产力与生产关系的矛盾', '意识的作用', '人的主观意愿', '地理环境'],
      answer:'生产力与生产关系的矛盾', correct:0,
      solution:['社会基本矛盾(生产力与生产关系、经济基础与上层建筑的矛盾)是社会发展根本动力，其中生产力决定生产关系。A正确。']}; } });

  mk({ id:'HX-JJJH-001', kp:'经济全球化', kpId:'kp-z-extra', type:'choice', diff:2,
    gen:function(){ return {text:'我国坚持"引进来"与"走出去"相结合，其理论基础是（ ）',
      options:['经济全球化、资源配置说', '闭关自守说', '贸易保护说', '零和博弈说'],
      answer:'经济全球化、资源配置说', correct:0,
      solution:['经济全球化要求资源在全球配置，我国引进来走出去以更好地利用两个市场两种资源。A正确。']}; } });

  mk({ id:'HX-DANG-001', kp:'党的领导', kpId:'kp-z-extra', type:'choice', diff:2,
    gen:function(){ return {text:'中国共产党是中国特色社会主义事业的（ ）',
      options:['领导核心', '专政对象', '司法机关', '行政机构'],
      answer:'领导核心', correct:0,
      solution:['中国共产党是执政党，是中国特色社会主义事业的领导核心。A正确。']}; } });

  mk({ id:'HX-MINZU-001', kp:'民族区域自治', kpId:'kp-z-extra', type:'choice', diff:2,
    gen:function(){ return {text:'我国民族区域自治制度中，"自治机关"是指（ ）',
      options:['自治区、自治州、自治县的人大和政府', '民族乡', '全国人大', '各级政协'],
      answer:'自治区、自治州、自治县的人大和政府', correct:0,
      solution:['自治机关是自治区、自治州、自治县的人民代表大会和人民政府(民族乡不是自治地方)。A正确。']}; } });

  mk({ id:'HX-JICENG-001', kp:'基层民主', kpId:'kp-z-extra', type:'choice', diff:2,
    gen:function(){ return {text:'村民委员会的性质是（ ）',
      options:['基层群众性自治组织', '国家基层政权机关', '政府派出机构', '司法机关'],
      answer:'基层群众性自治组织', correct:0,
      solution:['村委会/居委会是基层群众性自治组织，不属于国家机关。A正确。']}; } });

  mk({ id:'HX-RENDA-001', kp:'人民代表大会议', kpId:'kp-z-extra', type:'choice', diff:3,
    gen:function(){ return {text:'全国人大的最高权力主要表现为行使（ ）',
      options:['立法权、决定权、任免权、监督权', '只是一般建议权', '行政权', '司法权'],
      answer:'立法权、决定权、任免权、监督权', correct:0,
      solution:['全国人大作为最高国家权力机关行使立法权、决定权、任免权、监督权四大职权。A正确。']}; } });

  mk({ id:'HX-QUANQ-001', kp:'全过程人民民主', kpId:'kp-z-extra', type:'choice', diff:3,
    gen:function(){ return {text:'"全过程人民民主"强调（ ）',
      options:['民主选举、协商、决策、管理、监督全过程参与', '重大决策无需民主', '只重选举环节', '民主只属于精英'],
      answer:'民主选举、协商、决策、管理、监督全过程参与', correct:0,
      solution:['全过程人民民主覆盖民主选举、协商、决策、管理、监督各环节，是最广泛最真实最管用的民主。A正确。']}; } });

  root.__PREMIUM_POLITICS_EXTRA = T;
})(typeof window !== 'undefined' ? window : globalThis);
