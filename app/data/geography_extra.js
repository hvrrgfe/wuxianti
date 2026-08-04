/* ============================================================
   无限题 · 地理扩充模板（新课标卷）
   补充: 等高线/等值线、地球运动、大气受热、水循环、
   土壤/植被、地质灾害、聚落区位、农业地域、工业集聚、
   区域差异、地域分异
   答案确定可判分
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function mk(o){ T.push(o); }

  // 等高线陡崖相对高度
  mk({ id:'HX-DENGAO-001', kp:'等高线判读', kpId:'kp-d-extra', type:'blank', diff:3,
    gen:function(){ var h=E.pick([10,20,50]); var n=E.ri(3,6); var rel=h*n;
      return {text:'等高距为 '+h+' 米，图中某陡崖跨过 '+n+' 条等高线，其相对高度约为 ______ 米。',answer:String(rel),input:'num',unit:'米',
        solution:['陡崖相对高度≈等高距×跨度='+h+'×'+n+'='+rel+' 米。']}; } });

  // 时区-北京时间
  mk({ id:'HX-SHIQU-001', kp:'时区计算', kpId:'kp-d-extra', type:'blank', diff:2,
    gen:function(){ var lon=E.pick([30,60,90,150]); var zone=lon/15; var zn=Math.round(zone);
      return {text:'东经 '+lon+'° 所在时区为 ______ 时区（填数字，如东八区写8）。',answer:String(zn),input:'num',
        solution:['时区=经度/15='+lon+'/15='+zn+'，即东'+zn+'区。']}; } });

  // 大气受热
  mk({ id:'HX-DAQI-001', kp:'大气受热过程', kpId:'kp-d-extra', type:'choice', diff:2,
    gen:function(){ return {text:'白天多云，气温不会过高，主要原因是（ ）',
      options:['云层反射太阳辐射', '云层释放地面辐射', '空气对流运动弱', '大气逆辐射少'],
      answer:'云层反射太阳辐射', correct:0,
      solution:['白天多云，云层对太阳辐射反射增强，地面获得太阳辐射减少，气温较低。A正确。']}; } });

  // 水循环
  mk({ id:'HX-HUIPENG-001', kp:'水循环', kpId:'kp-d-extra', type:'choice', diff:2,
    gen:function(){ return {text:'下列属于陆地水循环的主要环节的是（ ）',
      options:['降水、蒸发、径流', '洋流、潮汐', '地壳运动', '冰川消融'],
      answer:'降水、蒸发、径流', correct:0,
      solution:['陆地水循环包括蒸发、降水、下渗、地表/地下径流等环节(海陆间循环还包括水汽输送)。A正确。']}; } });

  // 自然灾害
  mk({ id:'HX-DIZAI-001', kp:'地质灾害', kpId:'kp-d-extra', type:'choice', diff:2,
    gen:function(){ return {text:'我国西南地区多发泥石流、滑坡，其主要诱发因素是（ ）',
      options:['降水集中且多山', '气候干旱', '河网稀疏', '土壤贫瘠'],
      answer:'降水集中且多山', correct:0,
      solution:['西南地区山地地形起伏大、降水集中，易诱发滑坡泥石流；干旱、河网稀、土壤瘠不是泥石流主因。A正确。']}; } });

  // 农业地域类型
  mk({ id:'HX-NONGYE-001', kp:'农业地域类型', kpId:'kp-d-extra', type:'choice', diff:3,
    gen:function(){ return {text:'我国商品谷物农业生产的主要特点不包括（ ）',
      options:['生产规模小、商品率低', '科技水平较高', '机械化和规模大', '主要分布在东北'],
      answer:'生产规模小、商品率低', correct:0,
      solution:['商品谷物农业(东北等)以大规模机械化、商品率高、科技化强为特点。A"规模小商品率低"恰恰不符，是"错误项"。故选A。']}; } });

  // 工业集聚
  mk({ id:'HX-GONGYE-001', kp:'工业集聚与分散', kpId:'kp-d-extra', type:'choice', diff:3,
    gen:function(){ return {text:'工业集聚的主要意义不包括（ ）',
      options:['增加生产成本', '共用基础设施', '加强企业协作', '降低运输费用'],
      answer:'增加生产成本', correct:0,
      solution:['工业集聚可共用基础设施、加强协作、降低成本，不是"增加成本"。A与集聚效益相悖，为错误项。故选A。']}; } });

  // 地域分异
  mk({ id:'HX-FENYI-001', kp:'地域分异规律', kpId:'kp-d-extra', type:'choice', diff:3,
    gen:function(){ return {text:'从沿海向内陆，自然带由森林→草原→荒漠更替，体现（ ）',
      options:['经度地带性', '纬度地带性', '垂直地带性', '非地带性'],
      answer:'经度地带性', correct:0,
      solution:['由沿海到内陆，因海陆位置导致水分差异，自然带从森林到荒漠更替，属经度(干湿度)地带性。A正确。']}; } });

  root.__PREMIUM_GEOGRAPHY_EXTRA = T;
})(typeof window !== 'undefined' ? window : globalThis);
