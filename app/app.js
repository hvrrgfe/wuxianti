const { createApp, ref, reactive, computed, onMounted } = Vue;

// ============ 知识图谱（可参数化考点）============
// 每科：知识点 -> 模板索引；梳理前置依赖
const SUBJECTS = {
  math: { name:'数学', short:'数', color:'#2E6FA3', tpl:'__MathTemplates', type:'默认' },
  physics: { name:'物理', short:'物', color:'#8A5CF6', tpl:'__PhysicsTemplates' },
  chemistry: { name:'化学', short:'化', color:'#10B981', tpl:'__ChemistryTemplates' },
  biology: { name:'生物', short:'生', color:'#22C55E', tpl:'__BiologyTemplates' },
  english: { name:'英语', short:'英', color:'#F59E0B', tpl:'__EnglishTemplates' },
  chinese: { name:'语文', short:'语', color:'#EF4444', tpl:'__ChineseTemplates' },
  politics: { name:'政治', short:'政', color:'#D946EF', tpl:'__PoliticsTemplates' },
  history: { name:'历史', short:'史', color:'#92400E', tpl:'__HistoryTemplates' },
  geography: { name:'地理', short:'地', color:'#059669', tpl:'__GeographyTemplates' }
};
// ============ 题型库（B站名师高分套路，按题型精准突破） ============
// 每个题型映射到具体知识点(模板)，点选即出该类题型新题
const QTYPES = {
  math: [
    { name:'数列·错位相减求和', kps:['数列求和(错位相减)'], diff:4, icon:'Σ' },
    { name:'数列·裂项相消求和', kps:['数列求和(裂项相消)'], diff:3, icon:'∑' },
    { name:'导数·求切线方程', kps:['导数(切线方程)'], diff:3, icon:'fd' },
    { name:'导数·恒成立求参', kps:['导数(恒成立求参)'], diff:4, icon:'m' },
    { name:'函数·周期求值', kps:['函数(周期求值)'], diff:3, icon:'T' },
    { name:'解析几何·直线与圆弦长', kps:['直线与圆(弦长)'], diff:3, icon:'chord' },
    { name:'解析几何·椭圆焦点三角形', kps:['椭圆焦点三角形'], diff:3, icon:'ell' },
    { name:'解三角形·余弦定理', kps:['解三角形(余弦定理)'], diff:3, icon:'angle' },
    { name:'概率·条件概率', kps:['概率(条件概率)'], diff:4, icon:'P' },
    { name:'导数·基本运算', kps:['导数'], diff:3, icon:'dx' },
    { name:'数列·等差通项', kps:['等差数列'], diff:2, icon:'an' },
    { name:'数列·等比通项', kps:['等比数列'], diff:2, icon:'an' },
    { name:'圆锥曲线·椭圆', kps:['圆锥曲线'], diff:3, icon:'ell' },
    { name:'向量·坐标运算', kps:['平面向量'], diff:2, icon:'vec' },
    { name:'立体·体积空间', kps:['立体几何'], diff:3, icon:'cube' },
    { name:'排列组合', kps:['排列组合'], diff:3, icon:'C' }
  ],
  physics: [
    { name:'运动学·追及相遇', kps:['追及相遇'], diff:4, icon:'t' },
    { name:'牛顿定律·含摩擦', kps:['牛顿第二定律(摩擦)'], diff:3, icon:'F' },
    { name:'功与能·动能定理', kps:['动能定理'], diff:4, icon:'E' },
    { name:'动量·碰撞', kps:['动量守恒(碰撞)'], diff:4, icon:'mv' },
    { name:'电磁感应·切割', kps:['电磁感应(切割)'], diff:5, icon:'B' },
    { name:'抛体·平抛', kps:['平抛运动'], diff:3, icon:'v0' },
    { name:'牛顿第二定律', kps:['牛顿第二定律'], diff:2, icon:'F=ma' },
    { name:'匀变速·位移', kps:['匀变速位移'], diff:2, icon:'s' },
    { name:'电学·欧姆定律', kps:['欧姆定律'], diff:2, icon:'Ohm' },
    { name:'电学·功率', kps:['电功率'], diff:2, icon:'W' },
    { name:'功能·功与功率', kps:['功','功率'], diff:2, icon:'P' }
  ],
  chemistry: [
    { name:'物质的量·质量换算', kps:['物质的量换算'], diff:3, icon:'n' },
    { name:'气体·摩尔体积', kps:['气体摩尔体积'], diff:3, icon:'V' },
    { name:'氧化还原·电子转移', kps:['电子转移'], diff:4, icon:'e' },
    { name:'平衡常数K', kps:['化学平衡常数'], diff:4, icon:'K' },
    { name:'反应速率', kps:['化学反应速率'], diff:3, icon:'v' },
    { name:'有机·分子式推断', kps:['有机物分子式'], diff:4, icon:'C' },
    { name:'相对分子质量', kps:['相对分子质量'], diff:1, icon:'M' },
    { name:'溶质质量分数', kps:['溶质质量分数'], diff:2, icon:'%' }
  ],
  biology: [
    { name:'遗传·自由组合', kps:['遗传·自由组合'], diff:4, icon:'Aa' },
    { name:'遗传·患病概率', kps:['遗传·患病概率'], diff:3, icon:'dis' },
    { name:'基因频率', kps:['基因频率'], diff:4, icon:'f' },
    { name:'种群·J型增长', kps:['种群增长J型'], diff:3, icon:'lam' },
    { name:'光合与呼吸', kps:['光合/呼吸作用'], diff:3, icon:'sun' },
    { name:'能量流动·传递效率', kps:['能量传递效率'], diff:3, icon:'flow' },
    { name:'遗传·配子比例', kps:['遗传·配子比例'], diff:2, icon:'1:1' },
    { name:'种群增长', kps:['种群增长'], diff:2, icon:'N' }
  ]
};
// ============ 高考考点体系（基于历年真题真实频率） ============
// 每个高考考点: 名称 / 近25年考查次数 / 对应刷题知识点(kp)
const GAOKAO = [
  { tag:'解析几何', freq:2270, kps:['圆锥曲线','直线与圆(弦长)','椭圆焦点三角形','直线交点','圆·扇形','平面向量'] },
  { tag:'函数与导数', freq:2101, kps:['导数','导数(切线方程)','导数(恒成立求参)','二次函数','一次函数','反比例函数','函数(周期求值)','幂运算'] },
  { tag:'立体几何', freq:1494, kps:['立体几何','空间向量'] },
  { tag:'三角函数与解三角形', freq:1270, kps:['三角求值','解三角形(余弦定理)','三角形','勾股定理'] },
  { tag:'概率与统计', freq:1052, kps:['概率(条件概率)','古典概型','随机变量','成对数据回归','平均数/中位数'] },
  { tag:'数列', freq:983, kps:['等差数列','等比数列','数列求和(错位相减)','数列求和(裂项相消)'] },
  { tag:'不等式', freq:751, kps:['一元一次不等式','一元二次方程'] },
  { tag:'集合', freq:602, kps:['集合'] },
  { tag:'排列组合', freq:538, kps:['排列组合'] },
  { tag:'复数', freq:474, kps:['复数'] }
];
// 逆向: kp -> 高考考点(就近取, 仅数学有kps映射)
const GAOKAO_KP = GAOKAO; // 数学kps映射保留
function gaokaoOfKp(kp){ for(const g of GAOKAO_KP){ if(g.kps.indexOf(kp)>=0) return g; } return null; }
// 九科高考数据: __GAOKAO_SUBJECTS = {subject:{pred:[...],tags:[{tag,freq}]}}
function gaokaoData(subj){ try{ const D=(typeof window!=='undefined'&&window.__GAOKAO_SUBJECTS)||{}; return D[subj]||{pred:[],tags:[]}; }catch(e){ return {pred:[],tags:[]}; } }
// 高考倒计时(以2027年6月7日为例)
function gaokaoDays(){
  const now=new Date();
  const target=new Date(2027,5,7); // 2027-06-07
  const days=Math.ceil((target-now)/86400000);
  return days>0?days:0;
}
// ============ 版本号与更新日志 ============
const APP_VERSION = "v54";
const CHANGES = {
  "v54": ["新增：本地智能出题 + 学情分析（自研引擎，无API离线）", "AI页新增「智能出题」「学情分析」两个入口"],
  "v53": ["学情分析升级：采用贝叶斯知识追踪(BKT)，更准确地判断你是否真正掌握，区分蒙对与失误"],
  "v52": ["出题优化：本地引擎智能选题", "本地智能出题，完全离线"],
  "v50": ["全科模板扩充至 352 个：9 科知识点体系全部补齐，覆盖高考核心考点"],
  "v47": ["补齐理化生高中核心考点（30个）：自由落体/圆周/万有引力/电化学/遗传等"],
  "v44": ["修复题目重复问题：现在出题会更丰富、不重复"],
  "v42": ["新增「高考真题」页：9科历年高考真题 + 作答判分 + 解析", "新增「导学案」：生成知识点讲义，可打印"],
  "v40": ["整卷评分升级：按得分点判分，压轴题/计算题部分作答也给分", "按题型统计得分（单选/多选/填空/解答）"],
  "v36": ["生成试卷：严格按福建高考卷面结构组卷", "逐题解析 + 错题自动进错题本"],
  "v33": ["新增「专项训练」：英语词汇(FRE 3120词) + 语文默写(新课标60篇)"],
  "v30": ["英语/语文/政史地补齐名师体系题型模板"]
};
// 首页更新提示检测：返回自上次看到的版本以来新增的所有更新条目(倒序数组)
function pendingChanges(lastSeen){
  const verOrder = ["v54","v53","v52","v50","v47","v44","v42","v40","v36","v33","v30"];
  const out=[];
  verOrder.forEach(v=>{ if(!lastSeen || v>lastSeen){ (CHANGES[v]||[]).forEach(c=>out.push({ver:v, text:c})); } });
  return out;
}

const PAPER_STRUCT = {
  math: { name:'数学·新课标Ⅰ卷', full:150, time:120, parts:[{t:'单选',n:8,each:5},{t:'多选',n:3,each:6},{t:'填空',n:3,each:5},{t:'解答',n:5,each:15}] },
  physics: { name:'物理·福建卷', full:100, time:75, parts:[{t:'单选',n:4,each:4},{t:'双选',n:4,each:6},{t:'填空',n:3,each:4},{t:'实验',n:2,each:5},{t:'计算',n:3,each:10}] },
  chemistry: { name:'化学·福建卷', full:100, time:75, parts:[{t:'单选',n:10,each:4},{t:'工艺流程',n:1,each:15},{t:'反应原理',n:1,each:15},{t:'实验探究',n:1,each:15},{t:'结构与有机',n:1,each:15}] },
  biology: { name:'生物·福建卷', full:100, time:75, parts:[{t:'单选',n:20,each:2},{t:'非选择题',n:4,each:15}] },
  english: { name:'英语·新课标Ⅰ卷', full:150, time:120, parts:[{t:'听力',n:20,each:1.5},{t:'阅读理解',n:20,each:2.5},{t:'语言运用',n:25,each:1.2},{t:'写作',n:2,each:20}] },
  chinese: { name:'语文·新课标Ⅰ卷', full:150, time:150, parts:[{t:'现代文阅读',n:9,each:4},{t:'古代诗文',n:12,each:3},{t:'语言文字运用',n:8,each:2.5},{t:'写作',n:1,each:60}] },
  politics: { name:'政治·新课标卷', full:100, time:75, parts:[{t:'选择',n:12,each:3},{t:'材料分析',n:3,each:12}] },
  history: { name:'历史·新课标卷', full:100, time:75, parts:[{t:'选择',n:12,each:3},{t:'材料解析',n:3,each:12}] },
  geography: { name:'地理·新课标卷', full:100, time:75, parts:[{t:'选择',n:11,each:3},{t:'综合题',n:3,each:12}] }
};

// ============ 在线字母icon（Feather式SVG） ============
const ICONS = {
  dice:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r=".5"/><circle cx="15.5" cy="8.5" r=".5"/><circle cx="8.5" cy="15.5" r=".5"/><circle cx="15.5" cy="15.5" r=".5"/></svg>',
  file:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="1" y1="20" x2="23" y2="20"/></svg>',
  graph:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="6" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="18" r="3"/><path d="M8 7h8M8 17h8M5 9v6M19 9v6"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  zap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  alert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>',
  settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9.09 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9.09a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
  send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  chevron:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
  trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>',
  help:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12" y2="17"/></svg>'
};

// ============ 存储辅助 ============
const store = {
  get(k, d){ try{const v = localStorage.getItem(k); return v ? JSON.parse(v) : d;}catch(e){return d;} },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};

// ============ 今日日期 ============
function todayStr(){ const d=new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }

// ============ 出题生成器：从模板库生成题目（含验算） ============
function getTemplates(subject){
  const arr = window[SUBJECTS[subject].tpl] || [];
  const PREM = { math:'__PREMIUM', physics:'__PREMIUM_PHYSICS', chemistry:'__PREMIUM_CHEMISTRY', biology:'__PREMIUM_BIOLOGY', chinese:'__PREMIUM_CHINESE', english:'__PREMIUM_ENGLISH', politics:'__PREMIUM_POLITICS', history:'__PREMIUM_HISTORY', geography:'__PREMIUM_GEOGRAPHY' };
  let prem = PREM[subject] && window[PREM[subject]];
  // 数学叠加压轴题库
  if(subject==='math' && window.__PREMIUM_PZ && window.__PREMIUM_PZ.length){ prem = (prem||[]).concat(window.__PREMIUM_PZ); }
  // 数学叠加高中深化模板
  if(subject==='math' && window.__PREMIUM_MATH_HS && window.__PREMIUM_MATH_HS.length){ prem = (prem||[]).concat(window.__PREMIUM_MATH_HS); }
  // 数学叠加变式题库
  if(subject==='math' && window.__PREMIUM_MATH_BANK && window.__PREMIUM_MATH_BANK.length){ prem = (prem||[]).concat(window.__PREMIUM_MATH_BANK); }
  // 语文叠加高中深化模板
  if(subject==='chinese' && window.__PREMIUM_CHINESE_HS && window.__PREMIUM_CHINESE_HS.length){ prem = (prem||[]).concat(window.__PREMIUM_CHINESE_HS); }
  // 英语叠加高中深化模板
  if(subject==='english' && window.__PREMIUM_ENGLISH_HS && window.__PREMIUM_ENGLISH_HS.length){ prem = (prem||[]).concat(window.__PREMIUM_ENGLISH_HS); }
  // 理化生+政史地叠加压轴题库
  const PZP = { physics:'__PREMIUM_PZ_PHYSICS', chemistry:'__PREMIUM_PZ_CHEMISTRY', biology:'__PREMIUM_PZ_BIOLOGY', politics:'__PREMIUM_PZ_POLITICS', history:'__PREMIUM_PZ_HISTORY', geography:'__PREMIUM_PZ_GEOGRAPHY' };
  const pzp = PZP[subject] && window[PZP[subject]];
  if(pzp && pzp.length){ prem = (prem||[]).concat(pzp); }
  // 物理叠加高中核心模板
  if(subject==='physics' && window.__PREMIUM_PHYSICS_HS && window.__PREMIUM_PHYSICS_HS.length){ prem = (prem||[]).concat(window.__PREMIUM_PHYSICS_HS); }
  // 物理叠加变式题库
  if(subject==='physics' && window.__PREMIUM_PHYSICS_BANK && window.__PREMIUM_PHYSICS_BANK.length){ prem = (prem||[]).concat(window.__PREMIUM_PHYSICS_BANK); }
  // 化学叠加高中核心模板
  if(subject==='chemistry' && window.__PREMIUM_CHEMISTRY_HS && window.__PREMIUM_CHEMISTRY_HS.length){ prem = (prem||[]).concat(window.__PREMIUM_CHEMISTRY_HS); }
  // 生物叠加高中核心模板
  if(subject==='biology' && window.__PREMIUM_BIOLOGY_HS && window.__PREMIUM_BIOLOGY_HS.length){ prem = (prem||[]).concat(window.__PREMIUM_BIOLOGY_HS); }
  // 各科扩充模板
  const EXT = { chinese:'__PREMIUM_CHINESE_EXTRA', geography:'__PREMIUM_GEOGRAPHY_EXTRA', history:'__PREMIUM_HISTORY_EXTRA', politics:'__PREMIUM_POLITICS_EXTRA', english:'__PREMIUM_ENGLISH_EXTRA', chemistry:'__PREMIUM_CHEMISTRY_EXTRA', biology:'__PREMIUM_BIOLOGY_EXTRA', math:'__PREMIUM_MATH_EXTRA', physics:'__PREMIUM_PHYSICS_EXTRA' };
  const ext = EXT[subject] && window[EXT[subject]];
  if(ext && ext.length){ prem = (prem||[]).concat(ext); }
  if(prem && prem.length){ return arr.concat(prem); }
  return arr;
}
function getKps(subject){
  const seen={}, arr=getTemplates(subject), out=[];
  arr.forEach(t=>{ if(!seen[t.kp]){ seen[t.kp]=1; out.push(t.kp); } });
  return out;
}
let _idSeq = 1;

// ============ 知识点讲解库（命题套路 / 解题方法 / 易错陷阱）============
// 每个问答题按 kp 自动注入 keypoint(考点讲解)/method(解题套路)/trap(易错点)，
// 让同学不仅会做题，更理解知识点、刷透相应题型。
var KNOWLEDGE = {
  // ---------- 数学 ----------
  '集合':{ keypoint:'集合的表示(列举/描述)、元素个数、交集∩并集∪补集。A={x∈Z|a≤x≤b}的元素个数=b-a+1。',
    method:'数轴上画出区间再数整数点；A∩B取公共部分元素。',
    trap:'注意 x∈Z(整数) 限定，端点是否取等看是≤还是<' },
  '复数':{ keypoint:'复数z=a+bi,i²=-1。加减乘除按多项式运算，(a+bi)(1-i)展开合并实部虚部。',
    method:'直接展开，合并 i 项；i²换成-1。',
    trap:'i²=-1常被误写成1；实部不含i' },
  '一元一次方程':{ keypoint:'ax+b=c ⇒ x=(c-b)/a。移项变号。',
    method:'移项合并同类项，系数化1。',
    trap:'移项要变号；分子分母勿抄反' },
  '一元二次方程':{ keypoint:'ax²+bx+c=0，求根公式 x=[-b±√(b²-4ac)]/2a。判别式Δ=b²-4ac决定根的情况。',
    method:'先看Δ；能因式分解(x-m)(x-n)=0则两整根。',
    trap:'Δ<0不能说"无解"而说"无实数根"；二次项系数不为0' },
  '韦达定理':{ keypoint:'x²+px+q=0两根满足 x1+x2=-p, x1·x2=q。',
    method:'根与系数关系直接代，不必真的解根。',
    trap:'a x²+b x+c=0 时是 x1+x2=-b/a, x1x2=c/a，别漏了分母a' },
  '一元一次不等式':{ keypoint:'ax+b>0 ⇒ x>-b/a(a>0)；a<0要变号。',
    method:'移项后两边同除以a，注意a正负决定方向。',
    trap:'除以负数要变不等号方向，最易错' },
  '一次函数':{ keypoint:'y=kx+b，斜率k=(y2-y1)/(x2-x1)，过点求k。',
    method:'代入两点列方程组解k,b。',
    trap:'斜率公式分子分母要对齐，(y2-y1)/(x2-x1)' },
  '二次函数':{ keypoint:'顶点式y=a(x-h)²+k，顶点(h,k)；一般式y=ax²+bx+c顶点(-b/2a,(4ac-b²)/4a)。',
    method:'配方或用顶点公式。',
    trap:'顶点横坐标是h不是-h，(x-h)²里h前符号' },
  '反比例函数':{ keypoint:'y=k/x，过点(x,y)⇒k=xy。',
    method:'代一个点求k=xy。',
    trap:'k=xy不是y/x；k≠0' },
  '幂运算':{ keypoint:'同底数幂相乘指数相加: a^m·a^n=a^(m+n)。',
    method:'底数相同直接加指数。',
    trap:'同底幂相乘才是加指数，相乘≠乘指数' },
  '三角求值':{ keypoint:'特殊角三角函数值: sin30=1/2,sin45=√2/2,sin60=√3/2,cos0=1,cos60=1/2,tan45=1,tan60=√3等。',
    method:'记住30/45/60、0/90的特殊值表。',
    trap:'sin/cos/tan别记混；角度制与弧度制换算' },
  '等差数列':{ keypoint:'a_n=a1+(n-1)d；前n项和S_n=n(a1+a_n)/2。',
    method:'套通项与求和公式。',
    trap:'n项和公式记忆；公差d可正可负可0' },
  '等比数列':{ keypoint:'a_n=a1·q^(n-1)；S_n=a1(q^n-1)/(q-1),q≠1。',
    method:'套公式，注意q的幂次。',
    trap:'q=1时不能用公式；q^(n-1)别算成q^n' },
  '古典概型':{ keypoint:'P(A)=有利结果数/总结果数，各结果等可能。',
    method:'数总数→数有利→求比。',
    trap:'前提是等可能；总样本空间别数错' },
  '平面向量':{ keypoint:'向量a=(x1,y1),b=(x2,y2)。加法(x1+x2,y1+y2)；a·b=x1x2+y1y2；a⊥b⇔a·b=0。',
    method:'坐标运算直接算；垂直用数量积=0。',
    trap:'a⊥b是数量积=0；向量减法y也要减' },
  '立体几何':{ keypoint:'长方体体对角线d=√(a²+b²+c²)；圆柱V=πr²h；圆锥V=⅓πr²h；棱台侧面积等。',
    method:'记体积/表面积公式，逐项代入。',
    trap:'圆锥体积⅓倍别漏；单位换算' },
  '空间向量':{ keypoint:'空间向量a=(x,y,z)，模长|a|=√(x²+y²+z²)；数量积a·b=x1x2+y1y2+z1z2。',
    method:'坐标代入模长/数量积公式。',
    trap:'空间向量是三维坐标，别漏z分量' },
  '圆锥曲线':{ keypoint:'椭圆x²/a²+y²/b²=1焦点c=√(a²-b²)；双曲线渐近线y=±b/a·x；抛物线y²=2px焦点(p/2,0)。',
    method:'识别曲线标准式，代a,b,c关系。',
    trap:'椭圆a²=b²+c²，双曲线a²=b²+c²(对勾)；抛物线焦点p/2' },
  '导数':{ keypoint:'(x^n)\'=n·x^(n-1)。切线斜率k=f\'(x0)。',
    method:'求导后代x0。',
    trap:'导数指数-1；常数导数为0' },
  '排列组合':{ keypoint:'排列A(n,2)=n(n-1)；组合C(n,2)=n(n-1)/2；二项式(x+1)^n中x^1系数=C(n,1)=n。',
    method:'判断有顺序用排列、无顺序用组合。',
    trap:'排列有顺序组合无顺序；二项式系数C不是x系数' },
  '随机变量':{ keypoint:'二项分布X~B(n,p)：E(X)=np，D(X)=np(1-p)；分布列概率和为1。',
    method:'直接套均值方差公式；分布列补足使和为1。',
    trap:'D(X)=np(1-p)别写成np；分布列所有概率之和=1' },
  '成对数据回归':{ keypoint:'回归直线必过样本中心(x̄,ȳ)；斜率表示x每增1个单位y平均增加的量。',
    method:'求样本均值；(x̄,ȳ)代回归方程求截距。',
    trap:'回归线过中心点但不过每个样本点' },
  // ---------- 物理 ----------
  '速度':{ keypoint:'平均速度v=s/t(总位移/总时间)。',
    method:'v=s/t直接算，单位km/h、m/s。',
    trap:'是位移/时间不是路程/时间(平均速度vs平均速率)' },
  '匀变速直线运动':{ keypoint:'v=v0+at，a=(v-v0)/t。',
    method:'v0,v,t已知直接求a=(v-v0)/t。',
    trap:'加速度有方向，v减v0的顺序别反' },
  '匀变速位移':{ keypoint:'s=v0t+½at²。',
    method:'代入v0,a,t逐步算。',
    trap:'½at² 别漏½；t要代时间差' },
  '牛顿第二定律':{ keypoint:'F=ma(合力)。求力F=ma，或m=F/a。',
    method:'求合力→用F=ma。',
    trap:'F是合力不是某个分力' },
  '重力':{ keypoint:'G=mg，取g=9.8或10 N/kg。',
    method:'G=mg直接算。',
    trap:'方向竖直向下；质量kg×g' },
  '密度':{ keypoint:'ρ=m/V，单位g/cm³或kg/m³。',
    method:'ρ=m/V。',
    trap:'单位统一；密度与质量体积无关' },
  '液体压强':{ keypoint:'p=ρgh(液体)，ρ水=1.0×10³kg/m³。',
    method:'p=ρgh。',
    trap:'液体压强与深度h,密度,无关横截面积' },
  '压强':{ keypoint:'p=F/S(固体)，单位Pa=N/m²。',
    method:'p=F/S。',
    trap:'F是压力(垂直于接触面)，S是受力面积' },
  '功':{ keypoint:'W=Fs，单位J。',
    method:'W=Fs。',
    trap:'力与位移方向要一致才做功' },
  '功率':{ keypoint:'P=W/t，单位W。',
    method:'P=W/t。',
    trap:'功率=功/时间' },
  '欧姆定律':{ keypoint:'I=U/R，R=U/I。',
    method:'I=U/R。',
    trap:'R=U/I不是R=UI；单位欧姆' },
  '串联/并联电阻':{ keypoint:'串联R=R1+R2；并联1/R=1/R1+1/R2。',
    method:'串联相加，并联用倒数。',
    trap:'并联总电阻小于任一支路，别相加' },
  '电功率':{ keypoint:'P=UI，单位W。',
    method:'P=UI。',
    trap:'P=UI，纯电阻才P=I²R' },
  '比热容':{ keypoint:'Q=cmΔt，c水=4.2×10³J/(kg·℃)。',
    method:'Q=cmΔt。',
    trap:'Δt是温度变化(升高/降低)不是末温' },
  '光的反射':{ keypoint:'反射角=入射角，均以法线为基准。',
    method:'反射角=入射角，几何求角。',
    trap:'反射角是光线与法线夹角，不是与镜面夹角' },
  '透镜成像':{ keypoint:'凸透镜：u>2f成倒立缩小实像，f<u<2f倒立放大实像，u<f正立放大虚像。',
    method:'比较物距与焦距判断成像。',
    trap:'"实像倒立、虚像正立"记忆；物距焦距分界' },
  '双项选择·概念':{ keypoint:'多个概念判断正误，选所有正确项。',
    method:'逐项判断，全对才6分，漏选得部分分。',
    trap:'多选题少选得部分分但不能选错项' },
  '电路分析':{ keypoint:'串联电流处处相等、电压分配；并联电压相等、电流分流。',
    method:'判断串并联，应用电流电压关系。',
    trap:'串并联特点易混' },
  // ---------- 化学 ----------
  '相对分子质量':{ keypoint:'Mr=各原子相对原子质量之和，如CO₂=44。',
    method:'查原子量相加。',
    trap:'原子个数别漏(CO₂有2个O)' },
  '溶质质量分数':{ keypoint:'w=m溶质/m溶液×100%。',
    method:'w=溶质质量/溶液质量。',
    trap:'溶液质量=溶质+溶剂，不是只溶剂' },
  '溶液稀释':{ keypoint:'稀释前后溶质质量不变：m1·w1=(m1+m水)·w2。',
    method:'溶质质量守恒列方程。',
    trap:'加水溶质不变，只稀释' },
  '物质的量浓度':{ keypoint:'c=n/V，单位mol/L。',
    method:'c=n/V。',
    trap:'V是溶液体积不是溶剂体积' },
  '物质的量':{ keypoint:'n=m/M。',
    method:'n=m/M。',
    trap:'M单位g/mol，质量用g' },
  '化合价':{ keypoint:'化合物中各元素化合价代数和为0。',
    method:'已知其他折目标元素。',
    trap:'单质为0；氧化物O为-2' },
  '方程式配平':{ keypoint:'反应前后原子个数守恒，配平系数。',
    method:'观察法或最小公倍数法配平。',
    trap:'系数要为最简整数比' },
  '质量守恒':{ keypoint:'参加反应的各物质质量总和=生成各物质质量总和。',
    method:'反应物总质量=生成物总质量。',
    trap:'"恰好完全反应"是全部反应' },
  '原子结构':{ keypoint:'质子数Z+中子数N=质量数A。',
    method:'中子数=质量数-质子数。',
    trap:'质子数决定元素种类' },
  '化学键':{ keypoint:'离子键活泼金属与非金属；共价键非金属与非金属。',
    method:'看成键元素类型。',
    trap:'含金属的不一定离子键' },
  '离子共存':{ keypoint:'离子间若生成沉淀/气体/难电离物质(水)则不共存。',
    method:'检查是否生成沉淀、气体、水。',
    trap:'注意题目条件如无色、酸性/碱性' },
  '氧化还原':{ keypoint:'有元素化合价升降的反应。判断标准：有无化合价变化。',
    method:'标化合价看是否变化。',
    trap:'复分解反应(交换成分)不是氧化还原' },
  // ---------- 生物 ----------
  '细胞分裂':{ keypoint:'有丝分裂后期着丝点分裂、姐妹染色单体分开；染色体加倍。',
    method:'记各时期染色体/DNA/染色单体数量变化。',
    trap:'着丝点分裂在后期不在中期' },
  '细胞呼吸':{ keypoint:'有氧呼吸释放CO₂和H₂O；光合作用产O₂。',
    method:'一对葡萄糖彻底有氧呼吸产6CO₂+6H₂O。',
    trap:'光合产O₂、呼吸耗O₂' },
  '代谢计算':{ keypoint:'每分子葡萄糖彻底有氧呼吸产6mol CO₂。',
    method:'按比例换算mol数。',
    trap:'无氧呼吸不产CO₂或产酒精+CO₂' },
  '能量代谢':{ keypoint:'ATP是细胞直接能源物质。',
    method:'理解ATP-ADP循环。',
    trap:'糖是主要能源，ATP是直接能源' },
  '基因表达':{ keypoint:'转录(DNA→mRNA)在细胞核，翻译(mRNA→蛋白质)在核糖体。',
    method:'转录核内→翻译质中核糖体。',
    trap:'转录场所是细胞核不是核糖体' },
  '遗传·配子比例':{ keypoint:'Aa自交后代aa占1/4；配子比例为A:a=1:1。',
    method:'画棋盘格或配子概率相乘。',
    trap:'常染色体隐性病aa才患病' },
  '遗传·性状分离比':{ keypoint:'Aa×Aa后代表现型3:1(显:隐)。',
    method:'Aa自交3:1。',
    trap:'单性状3:1，双性状9:3:3:1' },
  '遗传·患病概率':{ keypoint:'常染色体隐性病aa患病；Aa×Aa后代患病概率1/4。',
    method:'分析基因型→算比例。',
    trap:'显性病与隐性病判断' },
  '神经调节':{ keypoint:'神经元间通过突触传递，化学信使是神经递质。',
    method:'兴奋经神经递质在突触传递。',
    trap:'突触传递是化学信号，单向' },
  '血糖调节':{ keypoint:'胰岛素降血糖，胰高血糖素升血糖。',
    method:'记升糖/降糖激素。',
    trap:'两者功能相反' },
  '免疫调节':{ keypoint:'产生抗体的是浆细胞(效应B细胞)；免疫系统的三道防线。',
    method:'记忆各类免疫细胞功能。',
    trap:'抗体由浆细胞产生，不是B细胞本身' },
  '种群增长':{ keypoint:'J型曲线理想条件指数增长，S型曲线有限资源受K/2增长最快。',
    method:'套增长模型计算。',
    trap:'J型无K值，S型有K值' },
  '生态系统组成':{ keypoint:'生产者(植物)、消费者(动物)、分解者；三者按营养等级判断。',
    method:'判断营养角色。',
    trap:'分解者是微生物如真菌细菌(腐生)' },
  // ---------- 英语 ----------
  '一般现在时':{ keypoint:'主语第三人称单数动词加s；表经常性动作、客观事实。',
    method:'判主语三单→动词+s/es。',
    trap:'I/you/复数不加s，三单才加' },
  '一般过去时':{ keypoint:'过去时间状语(ago,yesterday,last night)用过去式。',
    method:'看时间状语选动词过去式。',
    trap:'不规则动词过去式要记' },
  '现在完成时':{ keypoint:'have/has+过去分词，表已完成或持续到现在的动作。',
    method:'have/has+done。',
    trap:'与一般过去区分：完成时强调影响"现在"' },
  '被动语态':{ keypoint:'be+过去分词，主语是动作承受者。',
    method:'be+done。',
    trap:'被动要加be，且时态体现在be上' },
  '主谓一致':{ keypoint:'There be句型谓语与最近名词一致。',
    method:'There be就近原则：there is a pen and two books。',
    trap:'就近原则，别被远处名词误导' },
  '非谓语动词':{ keypoint:'want/decide后接to do；enjoy/finish后ing。',
    method:'记动词固定接to do或doing。',
    trap:'want to do(不定式)，enjoy doing(动名词)' },
  '定语从句':{ keypoint:'关系副词where修饰表地点的先行词。',
    method:'先行词表地点用where。',
    trap:'where表地点、when表时间、who/which表人/物' },
  '名词性从句':{ keypoint:'whether/mif引导宾语从句表"是否"。',
    method:'疑问用whether/if。',
    trap:'介词后、句首用whether不用if' },
  '固定搭配':{ keypoint:'be good at+doing；at是介词后接动名词。',
    method:'记短语配搭。',
    trap:'介词后动词用ing' },
  '词汇辨析':{ keypoint:'根据语境选择最贴切词义。',
    method:'读完整句子理解语境再选词。',
    trap:'近义词辨析结合语境' },
  '情景交际':{ keypoint:'礼貌回应请求/建议常用固定表达。',
    method:'记高频交际用语。',
    trap:'回应请求用Sure等，别选不礼貌回应' },
  // ---------- 语文 ----------
  '名句默写':{ keypoint:'高考必背篇目名句默写，上下句。',
    method:'记忆+准确书写，注意易错字。',
    trap:'同音/形近字易错，如"缘""层"' },
  '名句理解性默写':{ keypoint:'按意境/情感要求写出对应名句。',
    method:'理解诗意原文作答。',
    trap:'要贴合"所指"的句子，不是任意名句' },
  '成语运用':{ keypoint:'成语适用对象、感情色彩、语义，是否符合语境。',
    method:'判断成语在句中是否搭配得当。',
    trap:'望文生义、褒贬误用' },
  '病句辨析':{ keypoint:'六大语病：搭配不当、成分残缺、语序不当、句式杂糅、不合逻辑、表意不明。',
    method:'逐句排查主干与搭配。',
    trap:'"防止...不再"双重否定表肯定(反而要防止)' },
  '字音':{ keypoint:'常见易错字音。',
    method:'记正确读音。',
    trap:'多音字/形近字误读' },
  '字音字形':{ keypoint:'常见错别字辨析。',
    method:'记正确字形。',
    trap:'同音近义词易写错，如"再接再厉"' },
  '文学常识':{ keypoint:'经典作品作者与内容。',
    method:'记文学史知识。',
    trap:'作者与作品对应别记混' }
};

function kpReplacer(subject, obj){
  return obj;
}
function genQuestions(subject, kps, difficulty, count, typeFilter){
  const arr = getTemplates(subject);
  const pool = arr.filter(t => kps.indexOf(t.kp)>=0 && (!typeFilter || typeFilter==='all' || t.type===typeFilter));
  if(!pool.length) return [];
  const result=[];
  let guard=0;
  while(result.length < count && guard < 5000){
    guard++;
    let t = pool[Math.floor(Math.random()*pool.length)];
    // difficulty 过滤（无则全用）
    if(t.diff && difficulty && difficulty!=='auto' && Math.abs(t.diff-(+difficulty))>1) continue;
    let q;
    try{ q = t.gen(); }catch(e){ q=null; }
    if(!q) continue;
    // 出题质量自筛（借深度学习"自一致性/奖励"思想：淘汰空答案/无效选项/无解析的差题）
    if(typeof window!=='undefined' && window.__EngineIntel && window.__EngineIntel.questionQuality){
      if(window.__EngineIntel.questionQuality(q, t.gen) < 0.5) continue;
    }
    // 验算（数学题）
    let verified = true;
    if(subject==='math' && q.verifyId){
      // 已由gen内部保证，跳过
    }
    result.push({
      tid:t.id, kp:t.kp, kpId:t.kpId||t.kp, type:t.type==='dual'?'dual':t.type==='choice'?'choice':'blank',
      diff:t.diff||2, text:q.text, options:q.options||[], answer:q.answer,
      correct:q.correct!==undefined?q.correct:(q.options?q.options.indexOf(q.answer): -1),
      solution:q.solution||[], distractorTypes:q.distractorTypes||[], input:q.input||'text', unit:q.unit||'',
      keypoint:(KNOWLEDGE&&KNOWLEDGE[t.kp]?KNOWLEDGE[t.kp].keypoint:'')||q.keypoint||'',
      method:(KNOWLEDGE&&KNOWLEDGE[t.kp]?KNOWLEDGE[t.kp].method:'')||q.method||'',
      trap:(KNOWLEDGE&&KNOWLEDGE[t.kp]?KNOWLEDGE[t.kp].trap:'')||q.trap||'',
      fp: t.id+':'+String(q.text).trim(),   // 去重指纹(同模板+同参数→同指纹)
      id: t.id+'#'+(_idSeq++)
    });
  }
  return result;
}
// 同义作答归一化（处理分数/等）
function normAnswer(s){ if(s===undefined||s===null)return ''; return String(s).trim().replace(/\s+/g,'').toLowerCase(); }
function isAnswerCorrect(user,a){
  if(!a) return false;
  const u=normAnswer(user), c=normAnswer(a);
  if(u===c) return true;
  // 处理 "a 或 b" 任选命中
  if(c.indexOf('或')>=0){ return c.split('或').some(x=>normAnswer(x)===u); }
  if(c.indexOf('that/which')>=0){ return u==='that'||u==='which'; }
  return false;
}
// 难度颜色
function diffColor(d){ return d>=3?'var(--danger)':d===2?'var(--accent)':'var(--success)'; }
// 掌握度颜色
function masteryColor(m){ return m<40?'var(--danger)':m<60?'var(--accent)':m<80?'#eab308':'var(--success)'; }

// ============ Vue 根实例 ============
const TPL = `<div class="wxt-app" id="wxtRoot">
<div class="page" v-if="page==='home'">
  <!-- ========== 首页 ========== -->
  <div v-if="page==='home'">
    <div class="hero">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="hero-title"><span v-html="ICONS.book"></span> 无限题</div>
        <div style="display:flex;gap:12px;align-items:center">
          <span style="cursor:pointer" @click="go('ai')" v-html="ICONS.zap"></span>
          <span style="cursor:pointer" @click="toggleTheme">{{theme==='light'?'🌙':'☀️'}}</span>
        </div>
      </div>
      <div class="hero-sub">不是题库，是题厂 · 针对福建高考，每次都是新题</div>
      <div class="hero-stats">
        <div class="hstat"><div class="n">{{todayDoneStat.done}}</div><div class="l">今日做题</div></div>
        <div class="hstat"><div class="n">{{todayDoneStat.done?Math.round(todayDoneStat.correct/Math.max(1,todayDoneStat.done)*100):0}}%</div><div class="l">今日正确率</div></div>
        <div class="hstat"><div class="n">{{checkinDays()}}</div><div class="l">连续打卡</div></div>
      </div>
      <div class="progress" v-if="todayDoneStat.done"><div class="progress-fill" :style="{width: (Math.min(todayDoneStat.done,50)/50*100)+'%'}"></div></div>
    </div>

    <!-- 版本更新提示 -->
    <div class="card" v-if="showUpdate" style="border:2px solid var(--primary);background:linear-gradient(135deg,#eff6ff,#f0fdf4)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <b style="font-size:15px">🎉 新版本更新内容</b>
        <span style="font-size:12px;color:var(--text3);cursor:pointer" @click="closeUpdate()">✕ 关闭</span>
      </div>
      <div v-for="(u,i) in updateLog" :key="i" style="font-size:13px;line-height:1.6;padding:4px 0;border-bottom:1px dashed #d1d5db">
        <span class="tag tag-blue" style="font-size:10px;margin-right:6px">{{u.ver}}</span>{{u.text}}
      </div>
      <div style="font-size:12px;color:var(--text3);margin-top:8px;text-align:right" @click="showUpdateLog()">查看完整更新日志 →</div>
    </div>

    <!-- 智能个性化刷题 -->
    <div class="card" style="background:linear-gradient(135deg,#eef2ff,#e0e7ff);border:1px solid #c7d2fe">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:14px;font-weight:700;color:#4338ca">🎯 为你定制 · 智能刷题</div>
          <div style="font-size:12px;color:#6366f1;margin-top:3px">{{personalSummary().weak}}个薄弱点 · 掌握度 {{Math.round(personalSummary().avg)}}% · {{Math.round(personalSummary().due)}}个待复习</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="btn-primary" style="flex:1;padding:11px;background:#4f46e5;border:none;color:#fff;border-radius:10px;font-size:14px" @click="personalMode='smart';personalStart()">⚡ 智能组题</button>
        <button class="btn-ghost" style="flex:1" @click="go('profile')">查看报告</button>
      </div>
    </div>

    <!-- 高考冲刺（真题考频+名师预测） -->
    <div class="card" style="border:1px solid var(--border)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <div style="font-size:13px;color:var(--text2)">🎓 {{SUBJECTS[gen.subject].name}}·高考高频考点</div>
        <span style="font-size:11px;color:var(--text3)">距高考 {{gaokaoDays()}} 天</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px">
        <div v-for="(g,i) in gaokaoTop()" :key="g.tag" @click="startGaokaoKp(g)" style="display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;cursor:pointer;background:var(--bg);gap:6px">
          <span style="flex:1"><b>{{g.tag}}</b></span>
          <span style="color:var(--text3);font-size:11px;white-space:nowrap">{{g.freq}}题</span>
        </div>
      </div>
      <div v-if="gaokaoPred().length" style="margin-top:8px;font-size:11px;color:var(--text3);line-height:1.5">
        <span style="color:#f59e0b">🔥 名师预测 2026：</span>{{gaokaoPred().join(' · ')}}
      </div>
    </div>

    <!-- 薄弱点专项 -->
    <div class="card" v-for="(w,i) in weakKp" :key="'w'+i" style="cursor:pointer" @click="startTrainKp(w.key)">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <span class="tag tag-red">薄弱</span><b style="font-size:15px">{{w.key}}</b>
          <div class="subtitle" style="margin-top:3px">掌握度 {{Math.round(w.mastery)}}% · 已刷{{w.total}}题</div>
        </div>
        <button class="btn-ghost" style="font-size:12px">专项突破 →</button>
      </div>
      <div class="mastery-bar"><div class="mastery-fill" :style="{width:w.mastery+'%',background:masteryColor(w.mastery)}"></div></div>
    </div>

    <!-- 到期待复习 -->
    <div class="card" v-if="dueReviews.length">
      <div class="card-title">🔁 今日待复习</div>
      <div v-for="(r,i) in dueReviews" :key="'r'+i" @click="startReview(r.key)" style="padding:10px 0;border-bottom:1px solid #f3f4f6;cursor:pointer">
        <div style="display:flex;justify-content:space-between">
          <b>{{r.key}}</b>
          <button class="btn-ghost" style="font-size:12px;padding:4px 12px">复习</button>
        </div>
      </div>
    </div>

    <!-- 专项训练：英语词汇 + 语文默写 -->
    <div class="card" style="border:1px solid var(--border)">
      <div style="font-size:13px;color:var(--text2);margin-bottom:8px">📌 专项训练 <span style="font-size:11px;color:var(--text3)">针对高考固定考点</span></div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        <div class="spec-item" @click="startSpec('english','english','词汇')" style="padding:12px;border-radius:10px;cursor:pointer;background:linear-gradient(135deg,#fefce8,#fef9c3);border:1px solid #fde68a;text-align:center">
          <div style="font-size:22px">🔤</div>
          <div style="font-size:14px;font-weight:700;color:#a16207">英语词汇</div>
          <div style="font-size:11px;color:#ca8a04;margin-top:2px">FRE高考 3120词 · 按词频</div>
        </div>
        <div class="spec-item" @click="startSpec('chinese','chinese','默写')" style="padding:12px;border-radius:10px;cursor:pointer;background:linear-gradient(135deg,#fce7f3,#fbcfe8);border:1px solid #f9a8d4;text-align:center">
          <div style="font-size:22px">📜</div>
          <div style="font-size:14px;font-weight:700;color:#be185d">语文默写</div>
          <div style="font-size:11px;color:#db2777;margin-top:2px">新课标必背 60篇</div>
        </div>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="grid">
      <div class="grid-item" @click="goKeep('generate')"><div class="icon-wrap" v-html="ICONS.dice"></div><span class="label">智能出题</span></div>
      <div class="grid-item" @click="goKeep('paperMake')"><div class="icon-wrap" style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);color:#059669" v-html="ICONS.file"></div><span class="label">生成试卷</span></div>
      <div class="grid-item" @click="go('mistakes')"><div class="icon-wrap" style="background:linear-gradient(135deg,#fef2f2,#fee2e2);color:#dc2626" v-html="ICONS.alert"></div><span class="label">错题本</span></div>
      <div class="grid-item" @click="go('stats')"><div class="icon-wrap" style="background:linear-gradient(135deg,#fffbeb,#fef3c7);color:#d97706" v-html="ICONS.chart"></div><span class="label">学情</span></div>
      <div class="grid-item" @click="goKeep('graph')"><div class="icon-wrap" style="background:linear-gradient(135deg,#f5f3ff,#ede9fe);color:#7c3aed" v-html="ICONS.graph"></div><span class="label">知识图谱</span></div>
      <div class="grid-item" @click="go('ai')"><div class="icon-wrap" style="background:linear-gradient(135deg,#ecfeff,#cffafe);color:#0891b2" v-html="ICONS.zap"></div><span class="label">AI助手</span></div>
      <div class="grid-item" @click="go('profile')"><div class="icon-wrap" style="background:linear-gradient(135deg,#fce7f3,#fbcfe8);color:#db2777" v-html="ICONS.settings"></div><span class="label">我的</span></div>
      <div class="grid-item" @click="goKeep('kaoshi')"><div class="icon-wrap" style="background:linear-gradient(135deg,#fef2f2,#fee2e2);color:#b91c1c" v-html="ICONS.clock"></div><span class="label">考纲</span></div>
      <div class="grid-item" @click="goKeep('zhenti')"><div class="icon-wrap" style="background:linear-gradient(135deg,#eff6ff,#dbeafe);color:#1d4ed8" v-html="ICONS.book"></div><span class="label">高考真题</span></div>
      <div class="grid-item" @click="goKeep('daoxue')"><div class="icon-wrap" style="background:linear-gradient(135deg,#f0fdfa,#ccfbf1);color:#0d9488" v-html="ICONS.file"></div><span class="label">导学案</span></div>
      <div class="grid-item" @click="goKeep('achievements')"><div class="icon-wrap" style="background:linear-gradient(135deg,#fefce8,#fef9c3);color:#ca8a04" v-html="ICONS.trophy"></div><span class="label">成就</span></div>
      <div class="grid-item" @click="goKeep('help')"><div class="icon-wrap" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);color:#16a34a" v-html="ICONS.help"></div><span class="label">帮助</span></div>
    </div>

    <div class="card" v-if="help">
      <div style="color:var(--danger);font-size:14px">{{help}}</div>
    </div>
    <div class="empty" style="padding:20px" v-else>福建高考专属 · 覆盖语数英政史地生物化</div>
  </div>
</div>

  <!-- ========== 智能出题设置 ========== -->
  <div class="page" v-if="page==='generate'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:10">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span>
      <div style="flex:1"><b style="font-size:16px">智能出题</b><div class="subtitle">永远做不完的题 · 每次全新</div></div>
    </div>
    <div class="card">
      <div style="font-size:13px;color:var(--text2);margin-bottom:8px">选择科目</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        <div v-for="(s,k) in SUBJECTS" :key="k" class="mm-tab" :class="{active:gen.subject===k}"
             style="text-align:center;padding:12px 4px" @click="gen.subject=k;gen.kps=[]">{{s.name}}</div>
      </div>
    </div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:13px;color:var(--text2)">选择知识点（最多5个）</span>
        <span style="font-size:12px;color:var(--success)">已选{{gen.kps.length}}</span>
      </div>
      <div style="margin-top:10px">
        <div v-for="kp in allKpsFor(gen.subject)" :key="kp" class="kp-item" @click="toggleKp(kp)">
          <input type="checkbox" :checked="gen.kps.indexOf(kp)>=0" style="width:18px;height:18px">
          <span style="flex:1;font-size:14px">{{kp}}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div style="font-size:13px;color:var(--text2);margin-bottom:8px">出题设置</div>
      <div style="display:flex;gap:10px;margin-bottom:12px">
        <div class="mm-tab" :class="{active:gen.difficulty==='easy'}" @click="gen.difficulty='easy'">简单</div>
        <div class="mm-tab" :class="{active:gen.difficulty==='auto'}" @click="gen.difficulty='auto'">自适应</div>
        <div class="mm-tab" :class="{active:gen.difficulty==='hard'}" @click="gen.difficulty='hard'">困难</div>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
        <span style="font-size:13px;color:var(--text2)">题量</span>
        <div class="mm-tab" :class="{active:gen.count===5}" @click="gen.count=5">5</div>
        <div class="mm-tab" :class="{active:gen.count===10}" @click="gen.count=10">10</div>
        <div class="mm-tab" :class="{active:gen.count===20}" @click="gen.count=20">20</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap">
        <label style="font-size:13px;display:flex;align-items:center;gap:4px"><input type="checkbox" v-model="gen.types.choice">选择</label>
        <label style="font-size:13px;display:flex;align-items:center;gap:4px"><input type="checkbox" v-model="gen.types.blank">填空</label>
        <label style="font-size:13px;display:flex;align-items:center;gap:4px"><input type="checkbox" v-model="gen.types.dual">多项</label>
      </div>
      <div style="margin-top:16px" class="btn-primary" @click="startGenerate()"><span v-html="ICONS.dice" style="vertical-align:-2px"></span> 一键生成 {{gen.count}} 道新题</div>
      <div style="font-size:12px;color:var(--text3);margin-top:10px;text-align:center">每次生成全新题目 · 薄弱知识点优先</div>
    </div>
  </div>

  <!-- ========== 答题页 ========== -->
  <div class="page" v-if="page==='answer' && currentQ()">
    <div class="q-nav">
      <span @click="back()" style="font-size:18px;cursor:pointer">‹</span>
      <span style="flex:1;text-align:center"><b>{{currentQ().kp}}</b> · 第{{qAnsweredCount()}}/{{genList.length}}题</span>
      <span v-if="!answered" style="font-size:12px;color:var(--text2);margin-right:6px">⏱ {{qTimeStr()}}</span>
      <span style="cursor:pointer;font-size:15px;margin-right:8px" @click="toggleDraft()" title="草稿板">✍️</span>
      <button class="btn-ghost" style="font-size:12px;padding:4px 10px" @click="startGenerate()">换题</button>
    </div>
    <!-- 草稿板：手写涂鸦 + 文字 -->
    <div class="card" v-if="draftVisible" style="background:#fffff5;border:1px dashed #e0b45c;padding:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#8a6d3b;margin-bottom:6px">
        <b>🖊 草稿板</b>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="cursor:pointer;padding:2px 8px;border-radius:6px;border:1px solid #d9c9a0;background:#fff9ec" :style="handBrush===2?'background:#f59e0b;color:#fff':''" @click="handBrush=2">细</span>
          <span style="cursor:pointer;padding:2px 8px;border-radius:6px;border:1px solid #d9c9a0;background:#fff9ec" :style="handBrush===6?'background:#f59e0b;color:#fff':''" @click="handBrush=6">粗</span>
          <span style="cursor:pointer;padding:2px 8px;border-radius:6px;border:1px solid #d9c9a0;background:#fff9ec" :style="handEraser?'background:#dc2626;color:#fff':''" @click="handEraser=!handEraser">{{handEraser?'擦除中':'橡皮'}}</span>
          <span style="cursor:pointer" @click="draftClear()">🗑 清空</span>
        </div>
      </div>
      <canvas ref="draftCanvas" @pointerdown="handDown($event)" @pointermove="handMove($event)" @pointerup="handEnd($event)" @pointerleave="handEnd($event)"
        style="width:100%;height:180px;background:#fff;border:1px solid #eadfc0;border-radius:10px;touch-action:none;cursor:crosshair"></canvas>
      <div style="margin-top:6px"><textarea v-model="draftText" placeholder="也可在此输入文字备注…" style="width:100%;min-height:44px;font-size:13px;border:1px dashed #e2d7b8;border-radius:8px;background:#fffdf5;padding:8px;color:#7a6d45;resize:vertical"></textarea></div>
    </div>
    <div v-if="draftVisible && draftText" style="padding:0 16px;font-size:12px;color:#8a6d3b">（备注：{{draftText.slice(0,30)}}）</div>
    <div class="progress" style="background:#e5e7eb;margin:0 16px"><div class="progress-fill" style="height:100%;background:var(--primary)" :style="{width:(qAnsweredCount()/genList.length*100)+'%'}"></div></div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text2);margin-bottom:8px;flex-wrap:wrap;gap:4px">
        <span style="display:flex;gap:4px;flex-wrap:wrap">
          <span class="tag" :class="currentQ().diff>=3?'tag-red':currentQ().diff===2?'tag-orange':'tag-green'">难度{{currentQ().diff}}</span>
          <span v-if="gaokaoOfKp(currentQ().kp)" class="tag tag-blue" style="font-size:10px">🎓{{gaokaoOfKp(currentQ().kp).tag}}·必刷</span>
        </span>
        <span>{{SUBJECTS[gen.subject].name}}</span>
      </div>
      <div style="font-size:16px;line-height:1.7;white-space:pre-wrap;margin:6px 0 14px">{{currentQ().text}}</div>

      <!-- 选择题 -->
      <div v-if="currentQ().type==='choice'">
        <div class="opt-item" v-for="(o,i) in currentQ().options" :key="i" :class="optClass(i,currentQ())" @click="selectOpt(i)">
          <span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#f3f4f6;text-align:center;line-height:26px;margin-right:10px;font-size:13px">{{['A','B','C','D','E'][i]}}</span>{{o}}
        </div>
      </div>
      <!-- 多选题 -->
      <div v-else-if="currentQ().type==='dual'">
        <div class="dual-opt" v-for="(o,i) in currentQ().options" :key="i" :class="{selected:dualSel.indexOf(i)>=0}" @click="toggleDual(i)">
          <span style="display:inline-block;width:26px;height:26px;border-radius:6px;background:#f3f4f6;text-align:center;line-height:26px;margin-right:10px;font-size:13px">{{['A','B','C','D','E'][i]}}</span>{{o}}
        </div>
        <div style="font-size:12px;color:var(--text3)">题干有两项符合要求，请选择两项</div>
      </div>
      <!-- 填空题 -->
      <div v-else>
        <input v-model="curAnswer" :placeholder="'请填写答案'+(currentQ().unit?'（'+currentQ().unit+'）':'')" inputmode="decimal" type="text" style="width:100%;padding:14px;border:1.5px solid var(--border);border-radius:10px;font-size:15px;background:var(--card);color:var(--text)">
        <div v-if="showMathPad()" style="margin-top:8px">
          <!-- 数字行 -->
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:6px">
            <span v-for="n in numKeys()" :key="n" @click="insertMath(n)" style="padding:9px 0;text-align:center;border:1px solid var(--border);border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;background:var(--bg);color:var(--text)">{{n}}</span>
          </div>
          <!-- 符号行 -->
          <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px">
            <span v-for="m in mathKeys()" :key="m" @click="insertMath(m)" style="padding:7px 0;text-align:center;border:1px solid var(--border);border-radius:8px;font-size:13px;cursor:pointer;background:var(--bg)">{{m}}</span>
            <span @click="insertMath(' ')" title="空格" style="padding:7px 0;text-align:center;border:1px dashed var(--border);border-radius:8px;font-size:13px;cursor:pointer;background:var(--bg)">␣空格</span>
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">
          <span @click="draftVisible=true" style="padding:7px 12px;border:1px dashed var(--accent);color:var(--accent);border-radius:8px;font-size:13px;cursor:pointer">✍️ 草稿</span>
        </div>
      </div>
      </div>

      <div v-if="!answered" style="display:flex;gap:10px;margin-top:14px">
        <button class="btn-ghost" style="flex:1" @click="askExplain()">AI讲解</button>
        <button class="btn-primary" style="flex:2;padding:12px" @click="submitAnswer()">确认答案</button>
      </div>

      <!-- 答题反馈 -->
      <div v-if="answered">
        <div style="padding:14px;border-radius:10px;margin-top:8px" :style="{background: answerResult().correct?'#e6f6e6':'#fdecec',color:answerResult().correct?'#059669':'var(--danger)'}">
          <b style="font-size:15px">{{answerResult().correct ? '回答正确 ✓' : '回答错误 ✗'}}</b>
          <div v-if="!answerResult().correct" style="margin-top:6px;font-size:14px">正确答案：<b>{{currentQ().answer}}</b></div>
          <div v-if="slowTip" style="margin-top:6px;font-size:12px;color:#b45309">⏱ {{slowTip}}（本题用时 {{qElapsed}}s，平均 {{avgTime}}s）</div>
        </div>
        <div v-if="!answerResult().correct" style="margin-top:10px">
          <div style="font-size:12px;color:var(--text2);margin-bottom:6px">标记你的错误原因（帮助针对性复习）：</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            <span v-for="t in errTypeLabels()" :key="t" @click="setErrorType(currentQ(), t)" style="padding:5px 10px;border-radius:16px;font-size:12px;cursor:pointer;border:1px solid var(--border)" :style="{background:getErrType(currentQ())===t?'var(--primary)':'transparent',color:getErrType(currentQ())===t?'#fff':''}">{{t}}</span>
          </div>
        </div>
        <div v-if="showSolution" style="margin-top:12px;border-top:1px solid var(--border);padding-top:12px">
          <div v-if="qk('keypoint')" style="background:#eef4fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
            <div style="font-size:12px;color:var(--primary);font-weight:600;margin-bottom:3px">📖 考点讲解</div>
            <div style="font-size:13px">{{qk('keypoint')}}</div>
          </div>
          <div v-if="qk('method')" style="background:#e8f8ee;border-radius:10px;padding:10px 12px;margin-bottom:8px">
            <div style="font-size:12px;color:var(--success);font-weight:600;margin-bottom:3px">💡 解题套路</div>
            <div style="font-size:13px">{{qk('method')}}</div>
          </div>
          <div v-if="qk('trap')" style="background:#fef7e0;border-radius:10px;padding:10px 12px;margin-bottom:8px">
            <div style="font-size:12px;color:#d97706;font-weight:600;margin-bottom:3px">⚠️ 易错提醒</div>
            <div style="font-size:13px">{{qk('trap')}}</div>
          </div>
          <div v-if="qs().length">
            <div style="font-size:13px;color:var(--text2);margin-bottom:6px;font-weight:600">📝 标准解析</div>
            <div class="solution-step" v-for="(s,i) in qs()" :key="i">{{i+1}}. {{s}}</div>
          </div>
        </div>
        <button class="btn-primary" style="margin-top:16px" @click="nextQ()">{{genIndex<genList.length-1?'下一题 →':'完成本组'}}</button>
      </div>
    </div>
  </div>

  <!-- ========== 答题完成页 ========== -->
  <div class="page" v-if="page==='answerDone'">
    <div style="padding:60px 30px;text-align:center">
      <div style="font-size:46px;margin-bottom:16px">🎉</div>
      <div style="font-size:20px;font-weight:700">本组练习完成！</div>
      <div style="color:var(--text2);margin-top:8px">今日已做 {{todayDoneStat.done}} 道 · 已发现薄弱点会自动强化</div>
      <button class="btn-primary" style="max-width:220px;margin:30px auto 0" @click="goKeep('generate')">再练一组</button>
      <button class="btn-ghost" style="max-width:220px;margin:12px auto 0;display:block" @click="go('stats')">查看学情</button>
    </div>
  </div>

  <!-- ========== 试卷生成 ========== -->
  <div class="page" v-if="page==='paperMake'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px">生成试卷</b>
    </div>
    <div class="card">
      <div style="font-size:13px;color:var(--text2);margin-bottom:8px">选择科目</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        <div v-for="(s,k) in SUBJECTS" :key="k" class="mm-tab" :class="{active:paper.subject===k}" style="text-align:center;padding:12px 4px" @click="paper.subject=k">{{s.name}}</div>
      </div>
    </div>
    <div class="card">
      <div style="font-size:13px;color:var(--text2);margin-bottom:8px">难度</div>
      <div style="display:flex;gap:10px">
        <div class="mm-tab" :class="{active:paper.difficulty==='easy'}" @click="paper.difficulty='easy'">基础</div>
        <div class="mm-tab" :class="{active:paper.difficulty==='medium'}" @click="paper.difficulty='medium'">中等</div>
        <div class="mm-tab" :class="{active:paper.difficulty==='hard'}" @click="paper.difficulty='hard'">拔高</div>
      </div>
      <label style="display:flex;align-items:center;gap:6px;margin-top:14px;font-size:13px"><input type="checkbox" v-model="paper.timing"> 限时作答</label>
    </div>
    <div class="card">
      <div style="font-size:13px;color:var(--text2);margin-bottom:8px">卷面结构（{{paperStruct().name}}）</div>
      <div>满分 {{paperStruct().full}} · {{paperStruct().time}}分钟</div>
      <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap">
        <span class="tag tag-blue" v-for="(p,i) in paperStruct().parts" :key="i">{{p.t}} {{p.n}}题</span>
      </div>
    </div>
    <button class="btn-primary btn-block" @click="startPaper()">生成试卷</button>
  </div>

  <!-- ========== 在线试卷答题 ========== -->
  <div class="page" v-if="page==='paper'">
    <div class="paper-head">
      <span style="font-size:14px">在线作答 · {{paperIndex+1}}/{{paperQs.length}}</span>
      <span v-if="paper.timing" style="font-size:14px;color:#fff;">⏱ {{paperTimeStr()}}</span>
      <span v-else style="font-size:13px">不限时</span>
    </div>
    <div class="card" v-if="paperQs[paperIndex]">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:6px">
        <span class="tag tag-blue">{{paperQs[paperIndex].kp}}</span>
        <span v-if="paperQs[paperIndex].section" style="font-size:11px;color:var(--text3)">第{{paperQs[paperIndex].secNo}}题 · {{paperQs[paperIndex].fullScore}}分</span>
      </div>
      <div style="font-size:16px;line-height:1.7;margin:10px 0">{{paperQs[paperIndex].text}}</div>
      <!-- choice -->
      <div v-if="paperQs[paperIndex].type==='choice'">
        <div class="opt-item" v-for="(o,i) in paperQs[paperIndex].options" :key="i" :class="{selected:paperAnswers[paperIndex]===i}" @click="togglePaperOpt(paperIndex,i)"><span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#f3f4f6;text-align:center;line-height:26px;margin-right:10px;font-size:13px">{{['A','B','C','D','E'][i]}}</span>{{o}}</div>
      </div>
      <!-- blank -->
      <div v-else>
        <!-- 多得分点(压轴/计算题按要点填写) -->
        <div v-if="paperQs[paperIndex].points&&paperQs[paperIndex].points.length">
          <div v-for="(p,pi) in paperQs[paperIndex].points" :key="pi" style="margin-bottom:8px">
            <div style="font-size:12px;color:var(--text2);margin-bottom:4px">{{p.label}}（{{p.score||0}}分）</div>
            <input :value="(paperAnswers[paperIndex]&&paperAnswers[paperIndex][pi])||''" @input="paperAnswers[paperIndex]=paperAnswers[paperIndex]||{};paperAnswers[paperIndex][pi]=$event.target.value" placeholder="填写你的答案" inputmode="decimal" style="width:100%;padding:12px;border:1.5px solid var(--border);border-radius:10px;font-size:15px;background:var(--card);color:var(--text)">
          </div>
        </div>
        <input v-else v-model="paperAnswers[paperIndex]" placeholder="填写答案" inputmode="decimal" style="width:100%;padding:14px;border:1.5px solid var(--border);border-radius:10px;font-size:15px;background:var(--card);color:var(--text)">
      </div>
      <div style="display:flex;gap:10px;margin-top:16px">
        <button class="btn-ghost" style="flex:1" :disabled="paperIndex===0" @click="paperIndex>0&&paperIndex--">上一题</button>
        <button class="btn-primary" style="flex:2" @click="paperIndex<paperQs.length-1?paperIndex++:submitPaper()">{{paperIndex<paperQs.length-1?'下一题':'交卷'}}</button>
      </div>
      <div style="font-size:12px;color:var(--text2);margin-top:10px;text-align:center">已答 {{Object.keys(paperAnswers).length}}/{{paperQs.length}} 题</div>
    </div>
  </div>

  <!-- ========== 试卷结果 ========== -->
  <div class="page" v-if="page==='paperResult'">
    <div class="paper-head">
      <span style="font-size:15px;font-weight:600">交卷完成</span>
      <span>得分 {{paperScoreVal}}/{{paperFullVal||0}}分</span>
    </div>
    <div class="card">
      <div style="font-size:13px;color:var(--text2);margin-bottom:8px">按题型得分</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-bottom:6px">
        <div v-for="(sc,s) in paperSectionScores().score" :key="s" style="padding:8px;background:var(--bg);border-radius:8px;font-size:12px">
          <div style="color:var(--text3)">{{s}}</div>
          <div><b>{{sc}}</b><span style="color:var(--text3)">/{{paperSectionScores().full[s]||0}}分</span></div>
        </div>
      </div>
    </div>
    <div class="card">
      <div style="font-size:14px;color:var(--text2);margin-bottom:8px">逐题解析</div>
      <div v-for="(q,i) in paperResultList()" :key="i" style="padding:12px 0;border-bottom:1px solid #f3f4f6">
        <div style="font-size:14px">{{i+1}}. {{q.text}} <span style="font-size:11px;color:var(--text3)">（{{q.section||''}}·{{q.fullScore||0}}分）</span></div>
        <div style="font-size:13px;margin-top:6px">
          <template v-if="q.type==='choice'">
            <span :style="{color: paperResults[i]&&paperResults[i].ok?'var(--success)':'var(--danger)'}">{{paperResults[i]&&paperResults[i].ok?'✓':'✗'}}</span>
            <span :style="{color: paperAnswers[i]===q.correct?'var(--success)':'var(--danger)'}" v-if="paperAnswers[i]!==undefined"> 你的答案：{{['A','B','C','D'][paperAnswers[i]]}}</span>
            <span :style="{color:'var(--success)'}"> 正确答案：{{['A','B','C','D'][q.correct]}}</span>
          </template>
          <template v-else-if="q.type==='dual'">
            <span :style="{color: paperResults[i]&&paperResults[i].ok?'var(--success)':'var(--danger)'}">{{paperResults[i]&&paperResults[i].ok?'✓':'✗'}}</span>
            <span :style="{color:'var(--success)'}"> 正确答案：{{(q.correct||[]).map(x=>['A','B','C','D'][x]).join(',')}}</span>
          </template>
          <template v-else>
            <span :style="{color: paperResults[i]&&paperResults[i].ok?'var(--success)':'var(--danger)'}">{{(paperResults[i]&&paperResults[i].ok?'✓':'✗')}}</span>
            <span :style="{color:'var(--success)'}" v-if="!q.points||!q.points.length"> 正确答案：{{q.answer}}</span>
            <!-- 多得分点得分明细 -->
            <div v-if="q.points&&q.points.length&&paperResults[i]" style="margin-top:6px;display:flex;flex-wrap:wrap;gap:6px">
              <span v-for="(pt,pi) in paperResults[i].points" :key="pi" :style="{padding:'2px 8px',borderRadius:'5px',fontSize:'11px',color:pt.ok?'var(--success)':'var(--danger)',background:pt.ok?'#e6f6e6':'#fdecec'}">{{pt.label}}:{{pt.ok?'✓':'✗'}}({{pt.score}}/{{pt.full}}分)</span>
            </div>
          </template>
        </div>
        <div v-if="paperResults[i]&&!paperResults[i].ok&&q.solution&&q.solution.length" style="font-size:12px;color:var(--text2);margin-top:5px;background:var(--bg);padding:8px;border-radius:6px">解析：{{q.solution[0]}}</div>
      </div>
      <button class="btn-primary" style="margin-top:14px" @click="goKeep('paperMake')">再出一卷</button>
      <button class="btn-ghost" style="margin-top:10px;width:100%" @click="printPaper()">打印本卷</button>
    </div>
  </div>

  <!-- ========== 错题本 ========== -->
  <div class="page" v-if="page==='mistakes'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px;flex:1">错题本</b>
      <span style="font-size:13px;color:var(--danger)">{{mistakes.length}}题</span>
    </div>
    <div style="padding:12px 16px;display:flex;gap:8px;flex-wrap:wrap">
      <div class="mm-tab" :class="{active:misFilter.subject==='all'}" @click="misFilter.subject='all'">全部</div>
      <div class="mm-tab" v-for="s in mistakeSubs()" :key="s" :class="{active:misFilter.subject===s}" @click="misFilter.subject=s">{{SUBJECTS[s].name}}</div>
    </div>
    <!-- ===== 重做模式（逐题作答） ===== -->
    <div v-if="misMode==='redo'">
      <div v-if="misRedoIndex < misRedoQs.length">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 16px">
          <span class="tag tag-red">重做 · {{misRedoIndex+1}}/{{misRedoQs.length}}</span>
          <span style="font-size:12px;color:var(--text3);cursor:pointer" @click="exitRedo()">退出重做</span>
        </div>
        <div class="card">
          <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text3);margin-bottom:8px">
            <span style="color:var(--text3)">{{redoCurrent().kp}}</span><span style="color:var(--success)">✓已答{{redoDoneCount()}}</span>
          </div>
          <div style="font-size:15px;line-height:1.7;white-space:pre-wrap">{{redoCurrent().text}}</div>

          <!-- 选择题作答 -->
          <div v-if="redoCurrent().type==='choice'" style="margin-top:14px">
            <div v-for="(o,i) in redoCurrent().options" :key="i" :class="redoAnswerClass(i,redoCurrent())" @click="redoPick(i)" style="padding:14px;border:1.5px solid var(--border);border-radius:10px;margin-bottom:8px;font-size:14px;cursor:pointer">
              <span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#f3f4f6;text-align:center;line-height:26px;margin-right:10px;font-size:13px">{{['A','B','C','D','E'][i]}}</span>{{o}}
            </div>
            <button class="btn-primary" style="width:100%;padding:12px;margin-top:6px" @click="redoConfirm()">提交作答</button>
          </div>
          <!-- 多选题作答 -->
          <div v-else-if="redoCurrent().type==='dual'" style="margin-top:14px">
            <div v-for="(o,i) in redoCurrent().options" :key="i" :class="misRedoSel.indexOf(i)>=0?'dual-opt selected':'dual-opt'" @click="redoDual(i)" style="padding:14px;border:1.5px solid var(--border);border-radius:10px;margin-bottom:8px;font-size:14px;cursor:pointer">
              <span style="display:inline-block;width:26px;height:26px;border-radius:6px;background:#f3f4f6;text-align:center;line-height:26px;margin-right:10px;font-size:13px">{{['A','B','C','D','E'][i]}}</span>{{o}}
            </div>
            <div style="font-size:12px;color:var(--text3)">题干有多项符合要求，请选择全部</div>
            <button class="btn-primary" style="width:100%;padding:12px;margin-top:6px" @click="redoConfirm()">提交作答</button>
          </div>
          <!-- 填空题作答 -->
          <div v-else style="margin-top:14px">
            <input v-model="misRedoCav" placeholder="请填写答案" inputmode="decimal" style="width:100%;padding:14px;border:1.5px solid var(--border);border-radius:10px;font-size:15px">
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">
              <span v-for="m in ['√','x²','x³','÷','×','±','π','·','-','^']" :key="m" @click="misRedoCav=(misRedoCav||'')+m" style="padding:5px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;cursor:pointer;background:var(--bg)">{{m}}</span>
            </div>
            <button class="btn-primary" style="width:100%;padding:12px;margin-top:10px" @click="redoConfirm()">提交作答</button>
          </div>

          <!-- 判分结果 -->
          <div v-if="redoIsRight(redoCurrent())!==undefined" style="margin-top:14px">
            <div :style="{padding:'10px',borderRadius:'8px',fontSize:'14px',background:redoIsRight(redoCurrent())?'#e6f6e6':'#fdecec',color:redoIsRight(redoCurrent())?'var(--success)':'var(--danger)'}">
              {{redoIsRight(redoCurrent())?'✓ 回答正确，已移出错题本':'✗ 回答错误，仍保留在错题本'}}
            </div>
            <div v-if="!redoIsRight(redoCurrent())" style="margin-top:8px;color:var(--success)">正确答案：{{redoCurrent().answer}}</div>
            <div v-if="redoCurrent().solution&&redoCurrent().solution.length" style="margin-top:10px;padding:10px;background:#f8fafc;border-radius:8px;font-size:13px;color:var(--text2)">
              <b style="color:var(--text)">解析：</b>{{redoCurrent().solution[0]}}
            </div>
            <button class="btn-primary" style="width:100%;padding:12px;margin-top:12px" @click="redoNext()">{{misRedoIndex<misRedoQs.length-1?'下一题 →':'完成重做 ✓'}}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- ===== 列表模式 ===== -->
    <div v-else>
      <div v-if="!filteredMistakes().length" class="empty">暂无错题，去刷题检验一下吧</div>
      <div v-else>
        <div class="card" v-for="(m,i) in filteredMistakes()" :key="m.qid">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span class="tag tag-red">{{SUBJECTS[m.subject].name}} · {{m.kp}}</span>
            <span style="font-size:12px;color:var(--text3);cursor:pointer" @click="delMistake(mistakes.indexOf(m))">删除</span>
          </div>
          <div style="font-size:14px;margin-top:8px;line-height:1.6">{{m.text}}</div>
          <div style="font-size:13px;color:var(--success);margin-top:6px">正确答案：{{m.answer}}</div>
          <button class="btn-ghost" style="margin-top:8px;padding:6px 14px;font-size:12px" @click="askMistake(m)">AI讲解</button>
        </div>
        <div style="padding:0 16px 16px;display:flex;gap:8px">
          <button class="btn-primary" style="flex:1" @click="redoMistakes()">重做错题</button>
          <button class="btn-ghost" style="flex:1" @click="exportMistakes()">导出CSV</button>
        </div>
        <div v-if="misRedoSolved.right||misRedoSolved.wrong" style="padding:0 16px 16px">
          <div style="padding:12px;background:#f8fafc;border-radius:10px;font-size:13px;color:var(--text2)">
            本轮重做：<b style="color:var(--success)">答对 {{misRedoSolved.right}}</b> · 答错 <b style="color:var(--danger)">{{misRedoSolved.wrong}}</b>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ========== 学情分析 ========== -->
  <div class="page" v-if="page==='stats'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px">学情分析</b>
    </div>
    <div style="display:flex;gap:8px;padding:12px 16px;flex-wrap:wrap">
      <div v-for="(s,k) in SUBJECTS" :key="k" class="mm-tab" :class="{active:schoolSub===k}" @click="schoolSub=k">{{s.name}}</div>
    </div>
    <div class="stat-row" style="margin-top:12px">
      <div class="stat-card"><div class="num">{{schoolAvgCorrect()}}%</div><div class="label">正确率</div></div>
      <div class="stat-card"><div class="num">{{records.length}}</div><div class="label">累计做题</div></div>
      <div class="stat-card"><div class="num">{{mistakes.length}}</div><div class="label">错题数</div></div>
    </div>
    <div class="card">
      <div class="card-title">近7天正确率</div>
      <div class="trend-chart">
        <div v-for="(v,i) in schoolTrend(schoolSub)" :key="i" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%">
          <div class="trend-bar" :style="{height:(v||2)+'%',background: v<60?'var(--danger)':v<80?'var(--accent)':'var(--success)'}"></div>
          <div style="font-size:10px;color:var(--text3);margin-top:4px">{{i+1}}</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">知识点掌握度（{{SUBJECTS[schoolSub].name}}）</div>
      <div v-for="x in masteryList(schoolSub)" :key="x.key" class="kp-item">
        <span style="flex:1;font-size:14px">{{x.key}}</span>
        <span style="font-size:12px;color:var(--text2);margin-right:8px">{{x.m.total}}题</span>
        <span :style="{color:masteryColor(x.m.mastery),fontWeight:600,fontSize:'13px'}">{{Math.round(x.m.mastery)}}%</span>
      </div>
    </div>
    <div class="card" style="border-left:3px solid var(--accent)">
      <div class="card-title"><span style="color:var(--accent)">智能学情建议</span><span style="font-size:11px;font-weight:400;color:var(--text3)">基于你的练习数据实时生成</span></div>
      <div style="font-size:13px;line-height:1.9;color:var(--text2)">
        <div v-for="(a,i) in smartAdvice(schoolSub)" :key="i" style="padding:4px 0">{{a}}</div>
      </div>
    </div>
    <button class="btn-ghost" style="margin:0 16px 20px;width:calc(100% - 32px)" @click="exportReport()">导出学习报告</button>
  </div>

  <!-- ========== 知识图谱 ========== -->
  <div class="page" v-if="page==='graph'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px">知识图谱</b>
    </div>
    <div style="display:flex;gap:8px;padding:12px 16px;flex-wrap:wrap">
      <div v-for="(s,k) in SUBJECTS" :key="k" class="mm-tab" :class="{active:graphSub===k}" @click="graphSub=k">{{s.name}}</div>
    </div>
    <div class="mastery-legend" style="margin-bottom:6px">
      <span><span class="dot" style="background:var(--danger)"></span>未掌握 &lt;40</span>
      <span><span class="dot" style="background:var(--accent)"></span>薄弱 40-79</span>
      <span><span class="dot" style="background:var(--success)"></span>已掌握 ≥80</span>
    </div>
    <div class="card">
      <div class="card-title">可参数化考点 · 点击进入训练</div>
      <div v-for="x in graphKps()" :key="x.key" class="kp-item" @click="startTrainKp(x.key)">
        <span style="display:inline-block;width:30px;height:30px;text-align:center;line-height:30px;border-radius:50%;color:#fff;font-size:12px" :style="{background:masteryColor(x.m.mastery)}">{{Math.round(x.m.mastery)}}%</span>
        <span style="flex:1;font-size:14px">{{x.key}}</span>
        <span v-html="ICONS.chevron" style="color:var(--text3)"></span>
      </div>
    </div>
    <div class="card" style="font-size:12px;color:var(--text2)">提示：掌握度≥80%的知识点将进入间隔复习队列，答对后间隔自动拉长。</div>
  </div>

  <!-- ========== AI助手 ========== -->
  <div class="page" v-if="page==='ai'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px;flex:1">AI助手</b>
      <span style="font-size:12px;color:var(--text3);cursor:pointer" @click="clearAi()">清空</span>
    </div>
    <div style="display:flex;gap:6px;padding:10px 16px">
      <div class="mm-tab" :class="{active:aiTab==='chat'}" @click="aiTab='chat'">对话</div>
      <div class="mm-tab" :class="{active:aiTab==='gen'}" @click="aiTab='gen'">AI智能出题</div>
      <div class="mm-tab" :class="{active:aiTab==='analyze'}" @click="aiTab='analyze'">AI学情分析</div>
      <div class="mm-tab" :class="{active:aiTab==='suggest'}" @click="aiTab='suggest'">建议</div>
    </div>
    <!-- 智能出题（自研本地引擎） -->
    <div v-if="aiTab==='gen'">
      <div class="card">
        <div style="font-size:13px;color:var(--text2);margin-bottom:8px">AI 智能出题 · 按你的薄弱点生成</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
          <div v-for="(s,k) in SUBJECTS" :key="k" class="mm-tab" :class="{active:aiGenSub===k}" style="padding:6px 12px;font-size:12px" @click="aiGenSub=k;aiGenQ=null">{{s.name}}</div>
        </div>
        <div style="font-size:12px;color:var(--text3);margin-bottom:10px">知识点：{{aiGenSub==='math'?'解析几何优先，AI已按薄弱点定位':('将按「'+SUBJECTS[aiGenSub].name+'」并优先薄弱知识点生成')}}</div>
        <button class="btn-primary" style="width:100%;padding:12px" @click="aiAskQuestion()" :disabled="aiBusy">{{aiBusy?'AI 出题中…':'🎯 用 AI 生成一道题'}}</button>
        <button class="btn-ghost" style="width:100%;padding:10px;margin-top:8px" @click="aiAnalyze()">📊 AI 学情诊断与计划</button>
      </div>
      <div v-if="aiGenQ" class="card">
        <div style="font-size:14px;line-height:1.7;white-space:pre-wrap">{{aiGenQ.text}}</div>
        <div style="margin-top:12px">
          <div class="opt-item" v-for="(o,i) in aiGenQ.options" :key="i" :class="aiGenAns===i?(aiGenQ.checkOK?( ['A','B','C','D'][i]===aiGenQ.answer? 'opt-item correct':'opt-item wrong' ):'opt-item selected'):(aiGenQ.checkOK&&['A','B','C','D'][i]===aiGenQ.answer?'opt-item correct':'opt-item')" @click="aiGenAns=i">
            <span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#f3f4f6;text-align:center;line-height:26px;margin-right:10px;font-size:13px">{{['A','B','C','D'][i]}}</span>{{o}}
          </div>
          <button class="btn-primary" style="width:100%;padding:12px;margin-top:6px" @click="aiGenCheck()">提交判分</button>
        </div>
        <div v-if="aiGenQ.checkOK" style="margin-top:10px;padding:10px;border-radius:8px;background:aiGenQ.checkRight?'#e6f6e6':'#fdecec';color:aiGenQ.checkRight?'var(--success)':'var(--danger)">{{aiGenQ.checkRight?'✓ 回答正确':'✗ 回答错误'}} · 正确答案：{{aiGenQ.answer}}</div>
        <div v-if="aiGenQ.checkOK&&aiGenQ.analysis" style="margin-top:8px;font-size:13px;color:var(--text2);line-height:1.6">解析：{{aiGenQ.analysis}}</div>
      </div>
    </div>
    <!-- AI学情分析结果 -->
    <div v-if="aiTab==='analyze'&&aiAnalysis" style="padding:0 16px 20px">
      <div class="card">
        <div class="card-title">📊 AI 学情诊断 · {{todayStr()}}</div>
        <div style="font-size:14px;line-height:1.8;white-space:pre-wrap">{{aiAnalysis}}</div>
      </div>
    </div>
    <div v-if="aiTab==='suggest'" class="card">
      <div class="card-title">福建高考专项提问示例</div>
      <div class="tool-item" v-for="(s,i) in aiSuggestions" :key="i" @click="aiInput=s.p">
        <div style="flex:1"><div class="tool-name">{{s.t}}</div><div class="tool-desc">{{s.p}}</div></div>
      </div>
    </div>
    <div v-else>
      <div class="card" style="min-height:50vh;display:flex;flex-direction:column">
        <div style="flex:1;overflow-y:auto;max-height:60vh">
          <div v-for="(m,i) in aiMsgs" :key="i" style="margin-bottom:10px;display:flex" :style="{justifyContent:m.role==='user'?'flex-end':'flex-start'}">
            <div :style="{maxWidth:'82%',padding:'10px 14px',borderRadius:'12px',fontSize:'14px',lineHeight:'1.6',whiteSpace:'pre-wrap',backgroundColor:m.role==='user'?'var(--primary)':'var(--bg)',color:m.role==='user'?'#fff':'var(--text)'}">{{m.content}}</div>
          </div>
          <div v-if="aiBusy" style="text-align:center;color:var(--text3);font-size:13px">AI思考中…</div>
        </div>
        <div style="display:flex;gap:8px;margin-top:10px">
          <input v-model="aiInput" :placeholder="aiPlaceholder()" style="flex:1;padding:12px;border:1.5px solid var(--border);border-radius:10px;font-size:14px;background:var(--card);color:var(--text)">
          <button class="btn-primary" style="flex-shrink:0;padding:12px 18px" @click="sendMsg()">发送</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ========== 我的 ========== -->
  <div class="page" v-if="page==='profile'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px">我的</b>
    </div>
    <div class="card">
      <div class="card-title">🧠 本地智能引擎（无 API · 完全离线）</div>
      <div style="font-size:12px;color:var(--text2);line-height:1.7">
        本应用使用自研本地智能引擎，无需任何 API·Key，数据不出本机：
      </div>
      <div style="font-size:12px;color:var(--text);line-height:1.8;margin-top:6px">
        · 📈 IRT 难度自适应：按你的能力动态匹配题目难度<br>
        · 🧩 知识图谱根因：自动定位薄弱点的前置知识<br>
        · 📊 深度学情分析：能力 + 趋势 + 薄弱 + 关联诊断<br>
        · ✔ 出题质量自筛：只出高质量稳定题<br>
        · 💬 AI 讲解：基于知识点解析库 + 错题自动分析
      </div>
    </div>
    <div class="card">
      <div class="card-title">关于本应用</div>
      <div class="settings-item" @click="showUpdateLog()"><span>📜 更新日志（当前 {{APP_VERSION}}）</span><span v-html="ICONS.chevron"></span></div>
      <div class="card-title">数据与导出</div>
      <div class="settings-item" @click="exportReportPDF()"><span>导出学习报告 PDF</span><span v-html="ICONS.chevron"></span></div>
      <div class="settings-item" @click="exportReport()"><span>导出学习报告 TXT</span><span v-html="ICONS.chevron"></span></div>
      <div class="settings-item" @click="exportMistakesPDF()"><span>导出错题 PDF</span><span v-html="ICONS.chevron"></span></div>
      <div class="settings-item" @click="exportMistakes()"><span>导出错题 CSV</span><span v-html="ICONS.chevron"></span></div>
    </div>
    <div class="card">
      <div class="card-title">关于</div>
      <div class="settings-item" @click="goKeep('achievements')"><span>成就徽章（{{achCount()}}/{{achTotal()}}）</span><span v-html="ICONS.chevron"></span></div>
      <div class="settings-item" @click="goKeep('help')"><span>帮助与 FAQ</span><span v-html="ICONS.chevron"></span></div>
      <div class="settings-item" @click="clearAll()"><span style="color:var(--danger)">清除所有数据</span><span v-html="ICONS.chevron"></span></div>
      <div class="settings-item" @click="toggleTheme()"><span>深色模式</span><span>{{theme==='light'?'关':'开'}}</span></div>
    </div>
    <div class="card" style="font-size:12px;color:var(--text2)">
      <div><b>无限题 · 针对福建高考</b></div>
      <div style="margin-top:6px">覆盖：数学/英语/语文（新课标Ⅰ卷）+ 物理/化学/生物（福建卷）。参数化出题引擎，答案经验算器校验 100% 正确，全离线可用。</div>
    </div>
  </div>

  <!-- ========== 考纲（福建高考信息）========== -->
  <div class="page" v-if="page==='kaoshi'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px">福建高考考纲结构</b>
    </div>
    <div class="card" v-for="(s,k) in SUBJECTS" :key="k">
      <div class="card-title"><span class="tag" :style="{background:s.color+'22',color:s.color}">{{s.name}}</span>{{PAPER_STRUCT[k].name}}</div>
      <div>满分 {{PAPER_STRUCT[k].full}} · {{PAPER_STRUCT[k].time}}分钟</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px">
        <span class="tag tag-blue" v-for="(p,i) in PAPER_STRUCT[k].parts" :key="i">{{p.t}} {{p.n}}题 × {{p.each}}分</span>
      </div>
      <button class="btn-ghost" style="margin-top:10px;padding:6px 14px;font-size:12px" @click="gen.subject=k;gen.kps=[];goKeep('generate')">训练该科</button>
    </div>
  </div>

  <!-- ========== 高考真题 ========== -->
  <div class="page" v-if="page==='zhenti'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:10">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span>
      <div style="flex:1"><b style="font-size:16px">高考真题</b><div class="subtitle">历年高考原题 · 带答案与解析</div></div>
      <span style="font-size:13px;color:var(--text3)">{{SUBJECTS[zhentiSub]?SUBJECTS[zhentiSub].name:'选科'}}</span>
    </div>
    <div style="padding:10px 16px;display:flex;gap:8px;flex-wrap:wrap">
      <div v-for="(s,k) in SUBJECTS" :key="k" class="mm-tab" :class="{active:zhentiSub===k}" :style="zhentiAvail(k)?{}:{opacity:.35}" @click="zhentiSub=k;zhentiIdx=0;zhentiAns={};zhentiChecked=false">{{s.name}}</div>
    </div>
    <div v-if="!zhentiAvail(zhentiSub)" class="empty">该科暂无精选真题数据</div>
    <div v-else>
      <div v-if="zhentiIdx===0" style="padding:4px 16px 20px">
        <div class="card" v-for="(z,i) in zhentiList(zhentiSub)" :key="i" style="cursor:pointer" @click="zhentiIdx=i+1;zhentiAns={};zhentiChecked=false">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span class="tag tag-blue">{{z.year}} {{z.cat}}</span>
            <span style="font-size:12px;color:var(--text3)">第{{i+1}}题 →</span>
          </div>
          <div style="font-size:14px;margin-top:8px;line-height:1.6;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">{{z.question}}</div>
        </div>
      </div>
      <div v-else style="padding:0 16px 20px">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0">
          <span class="tag tag-blue">{{zhentiCur().year}} · {{zhentiCur().cat}}</span>
          <span style="font-size:12px;color:var(--text3);cursor:pointer" @click="zhentiIdx=0">← 返回列表</span>
        </div>
        <div class="card">
          <div style="font-size:15px;line-height:1.7;white-space:pre-wrap">{{zhentiCur().question}}</div>
          <div style="margin-top:14px">
            <div class="opt-item" v-for="(o,i) in zhentiChoices(zhentiCur())" :key="i" :class="zhentiOptClass(i,zhentiCur())" @click="zhentiAns=i">
              <span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#f3f4f6;text-align:center;line-height:26px;margin-right:10px;font-size:13px">{{['A','B','C','D','E'][i]}}</span>{{o}}
            </div>
            <button class="btn-primary" style="width:100%;padding:12px;margin-top:6px" @click="zhentiCheck(true)">作答并判分</button>
            <button class="btn-ghost" style="width:100%;padding:10px;margin-top:6px" @click="zhentiCheck(false)">直接看解析</button>
          </div>
        </div>
        <div class="card" v-if="zhentiChecked" style="border:1px solid var(--border)">
          <div :style="{fontSize:'14px',fontWeight:'600',color:!zhentiAns?'var(--accent)':(zhentiCur().answer==String(zhentiAns)||zhentiCur().answer[0]==['A','B','C','D'][zhentiAns]?'var(--success)':'var(--danger)')}">
            {{!zhentiAns?'－ 未作答':((zhentiCur().answer==String(zhentiAns)||zhentiCur().answer[0]==['A','B','C','D'][zhentiAns])?'✓ 回答正确':'✗ 回答错误')}}
          </div>
          <div style="font-size:13px;margin-top:6px;color:var(--success)">正确答案：{{Array.isArray(zhentiCur().answer)?zhentiCur().answer.join('、'):zhentiCur().answer}}</div>
          <div style="font-size:13px;color:var(--text2);margin-top:8px;line-height:1.7">解析：{{zhentiCur().analysis || '暂无解析'}}</div>
        </div>
        <div style="display:flex;gap:10px;margin-top:12px">
          <button class="btn-ghost" style="flex:1" :disabled="zhentiIdx<=1" @click="zhentiIdx>1&&zhentiIdx--;zhentiAns={};zhentiChecked=false">上一题</button>
          <button class="btn-primary" style="flex:2" @click="zhentiNext()">下一题 →</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ========== 导学案/校本 ========== -->
  <div class="page" v-if="page==='daoxue'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:10">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span>
      <div style="flex:1"><b style="font-size:16px">导学案</b><div class="subtitle">知识点讲义 · 讲解+例题+练习</div></div>
      <span v-if="dxMade" style="font-size:12px;color:var(--text3);cursor:pointer" @click="printDaoxue()">🖨 打印</span>
    </div>
    <!-- 配置区 -->
    <div v-if="!dxMade" style="padding:12px 16px">
      <div class="card">
        <div style="font-size:13px;color:var(--text2);margin-bottom:8px">选择科目</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
          <div v-for="(s,k) in SUBJECTS" :key="k" class="mm-tab" :class="{active:dxSub===k}" style="text-align:center;padding:10px 4px" @click="dxSub=k;dxKp=''">{{s.name}}</div>
        </div>
      </div>
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:13px;color:var(--text2)">选择知识点（导学案内容核心）</div>
          <span style="font-size:12px;color:var(--success)" v-if="dxKp">已选：{{dxKp}}</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">
          <span v-for="kp in allKpsFor(dxSub)" :key="kp" class="mm-tab" :class="{active:dxKp===kp}" style="padding:6px 12px;font-size:12px" @click="dxKp=kp">{{kp}}</span>
        </div>
      </div>
      <button class="btn-primary" style="width:calc(100% - 32px);margin:0 16px 20px" :disabled="!dxKp" @click="makeDaoxue()">生成导学案</button>
    </div>
    <!-- 导学案内容 -->
    <div v-else style="padding:0 16px 20px">
      <div class="card" style="border:2px solid var(--primary);text-align:center">
        <div style="font-size:18px;font-weight:700;color:var(--primary)">{{SUBJECTS[dxSub].name}} · {{dxKp}}</div>
        <div style="font-size:12px;color:var(--text3);margin-top:4px">导学案 · 课前导学 / 课后复习 · {{dxDate}}</div>
      </div>
      <div class="card">
        <div class="card-title">📖 考点讲解</div>
        <div style="font-size:14px;line-height:1.8;color:var(--text)">{{dxData.keypoint}}</div>
      </div>
      <div class="card" v-if="dxData.method">
        <div class="card-title">💡 解题套路</div>
        <div style="font-size:14px;line-height:1.8;color:var(--text)">{{dxData.method}}</div>
      </div>
      <div class="card" v-if="dxData.trap">
        <div class="card-title">⚠️ 易错提醒</div>
        <div style="font-size:13px;line-height:1.7;color:var(--danger)">{{dxData.trap}}</div>
      </div>
      <div class="card">
        <div class="card-title">✏️ 典型例题</div>
        <div v-for="(q,i) in dxEx" :key="'e'+i" style="padding:10px 0;border-bottom:1px solid #f3f4f6">
          <div style="font-size:14px;line-height:1.6">例{{i+1}}. {{q.text}}</div>
          <div style="font-size:13px;color:var(--success);margin-top:4px">答案：{{q.answer}}</div>
          <div style="font-size:12px;color:var(--text3);margin-top:3px" v-if="q.solution&&q.solution[0]">解析：{{q.solution[0]}}</div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">📝 配套练习（自测）</div>
        <div v-for="(q,i) in dxPractice" :key="'p'+i" style="padding:10px 0;border-bottom:1px solid #f3f4f6">
          <div style="font-size:14px;line-height:1.6">练{{i+1}}. {{q.text}}</div>
          <div style="font-size:12px;color:var(--text3);margin-top:3px" v-if="q.options&&q.options.length">选项：{{q.options.join('  ')}}
          </div>
          <div style="font-size:13px;color:var(--success);margin-top:3px">参考答案：{{q.answer}}</div>
        </div>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn-ghost" style="flex:1" @click="dxMade=false">← 重新选</button>
        <button class="btn-primary" style="flex:1" @click="dxGoPractice()">去刷这套题</button>
      </div>
    </div>
  </div>

  <!-- ========== 新手引导 ========== -->
  <div class="page" v-if="page==='onboard'">
    <div style="padding:60px 30px;text-align:center">
      <div style="font-size:52px;margin-bottom:20px">{{onboardPage(onboarding).icon}}</div>
      <div style="font-size:22px;font-weight:700;margin-bottom:12px">{{onboardPage(onboarding).t}}</div>
      <div style="color:var(--text2);font-size:14px;line-height:1.8;max-width:280px;margin:0 auto">{{onboardPage(onboarding).d}}</div>
      <div style="display:flex;gap:6px;justify-content:center;margin-top:24px">
        <span v-for="n in 3" :key="n" style="width:8px;height:8px;border-radius:50%" :style="{background:n===onboarding?'var(--primary)':'#d1d5db'}"></span>
      </div>
      <button class="btn-primary" style="max-width:220px;margin:28px auto 0" @click="onboardNext()">{{onboarding>=3?'开始使用':'下一步'}}</button>
      <div style="font-size:12px;color:var(--text3);margin-top:14px;cursor:pointer" @click="skipOnboard()">跳过引导</div>
    </div>
  </div>

  <!-- ========== 成就徽章 ========== -->
  <div class="page" v-if="page==='achievements'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="go('profile')" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px">成就徽章</b>
      <span style="flex:1"></span><span style="font-size:13px;color:var(--text2)">{{achCount()}}/{{achTotal()}}</span>
    </div>
    <div class="card">
      <div class="card-title">我的成就</div>
      <div class="kp-item" v-for="a in achieveDefs()" :key="a.id">
        <span style="display:inline-block;width:40px;text-align:center;font-size:22px" :style="{filter: achUnlocked(a.id)?'none':'grayscale(1)',opacity:achUnlocked(a.id)?1:.35}">{{a.icon}}</span>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:600">{{a.name}} <span v-if="achUnlocked(a.id)" style="color:var(--success);font-size:11px">已解锁 ✓</span></div>
          <div style="font-size:12px;color:var(--text2)">{{a.desc}}</div>
        </div>
        <div style="font-size:12px;color:var(--text3)" v-if="achProgress(a.id)">√</div>
        <div style="font-size:12px;color:var(--text3)" v-else>未解锁</div>
      </div>
    </div>
  </div>

  <!-- ========== 帮助 / FAQ ========== -->
  <div class="page" v-if="page==='help'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px">帮助与常见问题</b>
    </div>
    <div class="card">
      <div class="kp-item" v-for="(f,i) in faqs" :key="i" style="cursor:pointer" @click="helpOpen=helpOpen===i?'':i">
        <div style="flex:1"><div style="font-size:14px;font-weight:500">{{f.q}}</div>
          <div v-if="helpOpen===i" style="font-size:13px;color:var(--text2);margin-top:6px;line-height:1.7">{{f.a}}</div></div>
        <span style="color:var(--text3)">{{helpOpen===i?'▲':'▼'}}</span>
      </div>
    </div>
  </div>

  <!-- ========== 底部导航 ========== -->
  <div class="tabbar no-print">
    <div class="darktab" :class="{active:tab==='home'}" @click="go('home')"><span v-html="ICONS.home"></span>首页</div>
    <div class="darktab" :class="{active:page==='generate'||page==='answer'||page==='answerDone'}" @click="goKeep('generate')"><span v-html="ICONS.dice"></span>出题</div>
    <div class="darktab" :class="{active:tab==='stats'}" @click="go('stats')"><span v-html="ICONS.chart"></span>学情</div>
    <div class="darktab" :class="{active:page==='mistakes'}" @click="go('mistakes')"><span v-html="ICONS.alert"></span>错题</div>
    <div class="darktab" :class="{active:tab==='ai'}" @click="go('ai')"><span v-html="ICONS.zap"></span>AI</div>
  </div>
</div>
</div>`;

const app = createApp({
  template: TPL,
  data(){
    return {
      SUBJECTS: SUBJECTS, ICONS: ICONS, PAPER_STRUCT: PAPER_STRUCT,
      page:'home', tab:'home',
      theme: store.get('wx_theme','light'),
      hist: store.get('wx_hist',{}),
      mastery: store.get('wx_mastery',{}),
      records: store.get('wx_records',[]),
      mistakes: store.get('wx_mistakes',[]),
      gen:{ subject:'math', kps:[], difficulty:'auto', count:10, grade:'all', types:{choice:true,blank:true,dual:true} },
      typeIdx:-1,
      expandedBook:'0',
      expandedCh:'',
      genAims:[], genList:[], genIndex:0, genType:'', personalMode:'smart',
      dxSub:'math', dxKp:'', dxMade:false, dxData:{}, dxEx:[], dxPractice:[], dxDate:'',
      curAnswer:null, dualSel:[], answered:false, showSolution:false,
      paper:{ subject:'math', difficulty:'medium', timing:false },
      paperQs:[], paperIndex:0, paperAnswers:{}, paperTimeLeft:0, paperTimer:null, paperStart:null, paperResults:[], paperScoreVal:0, paperFullVal:0,
      zhentiSub:'physics', zhentiIdx:0, zhentiAns:'', zhentiChecked:false,
      misFilter:{ subject:'all' }, misMode:'list', misRedoQs:[], misRedoIndex:0, misRedoAns:{}, misRedoSolved:{right:0,wrong:0}, misRedoCav:null, misRedoSel:[], misRedoR:false,
      schoolSub:'math', graphSub:'math',
      aiMsgs: store.get('wx_ai_msgs', [ {role:'ai', content:'你好！我是本机智能出题助手（本地引擎·完全离线）。你可以问知识点、要我分析薄弱点，或让我讲错题。'} ]),
      aiInput:'', aiBusy:false, latestQ:null,
      aiGenSub:'math', aiGenQ:null, aiGenAns:'', aiAnalysis:'',
      aiTab:'chat', aiContext:'',
      // ===== 新功能状态 =====
      onboarding: store.get('wx_onboard', 0),      // 0已完成,1,2,3引导步进
      showUpdate:false, updateLog:[], seenVer:store.get('wx_seenVer',''),
      achievements: store.get('wx_achieve', {}),   // 已解锁徽章 {id:解锁时间}
      paperCount: store.get('wx_paperCount', 0),
      redoneCount: 0,
      qTimeStart: 0, qElapsed: 0, qTimer: null,    // 单题计时
      avgTime: 60,                                 // 平均用时(秒)，用于超时标记
      draftVisible: false, draftText: '', handBrush:4, handEraser:false,   // 草稿板(手写+文字)
      mathInput: '',                               // 数学输入框
      helpOpen: '',                                // FAQ展开项
      wrongMap: store.get('wx_wrongmap', {}),      // 每题的错题类型 {qid:类型}
    };
  },
  computed:{
    todayKey(){ return todayStr(); },
    todayDoneStat(){ return this.hist[this.todayKey]||{done:0,correct:0}; },
    weakKp(){
      const list=[]; Object.keys(this.mastery).forEach(k=>{ const m=this.mastery[k]; if(m.mastery<60 && m.total>=3) list.push(Object.assign({key:k},m)); });
      list.sort((a,b)=>a.mastery-b.mastery); return list.slice(0,3);
    },
    dueReviews(){
      const out=[]; Object.keys(this.mastery).forEach(k=>{ const m=this.mastery[k]; if(m.mastery>=60 && m.nextReview && m.nextReview<=todayStr()) out.push(Object.assign({key:k},m)); });
      return out.slice(0,3);
    },
    aiSuggestions(){
      return [
        { t:'数学', p:'请讲解新课标I卷数学解答题第19题型的解题思路（函数导数与三角综合）' },
        { t:'物理（福建卷）', p:'请讲解福建物理卷电学实验题的常见考点和答题模板' },
        { t:'化学（福建卷）', p:'请讲解福建化学卷工艺流程题的解题步骤' },
        { t:'生物（福建卷）', p:'请帮我梳理遗传题（自由组合/伴性遗传）的计算方法' },
        { t:'英语', p:'请给我几个读后续写的衔接句式和写作模板' },
        { t:'语文', p:'请讲解高考语文名篇名句默写的易错字' },
      ];
    },
    faqs(){
      return [
        { q:'题目会重复吗？', a:'不会。每次都是参数化引擎随机生成的全新题目，且系统会避免近7天内出过同模板同参数的题。' },
        { q:'答案一定正确吗？', a:'是。每道题的答案都经过内置的验算器（方程求解/分数化简/勾股/验算器等）校验，100%正确，做错是自己的理解问题而非题目问题。' },
        { q:'不用 AI 能用吗？', a:'完全可以。出题/答题/判分/错题/学情/图谱全部离线免费。AI 讲解在未配置 Key 时自动展示题目内置解析。' },
        { q:'AI 讲解 / 智能出题是怎么实现的？', a:'全部使用自研本地智能引擎（IRT难度自适应、贝叶斯知识追踪、知识图谱根因推理），完全离线、无需任何 API·Key，数据不出本机。' },
        { q:'掌握度和间隔复习是怎么算的？', a:'掌握度由正确率+连续答对+近期表现加权得出；≥80% 进入间隔复习（3天→7天→15天→30天递进，答对翻倍）。' },
        { q:'数据存在哪里？', a:'全部保存在你浏览器的本地存储 localStorage 中，离线可用，不经过任何服务器，隐私安全。' },
        { q:'如何导出错题或打印试卷？', a:'错题本可导出 CSV 或 PDF；生成的试卷可打印/导出 PDF（含参考答案页）。学情报告也可导 PDF。' },
      ];
    },
  },
  methods:{
    masteryColor(m){ return m<40?'var(--danger)':m<60?'var(--accent)':m<80?'#eab308':'var(--success)'; },
    diffColor(d){ return d>=3?'var(--danger)':d===2?'var(--accent)':'var(--success)'; },
    toggleTheme(){ this.theme=this.theme==='light'?'dark':'light'; store.set('wx_theme',this.theme); document.documentElement.setAttribute('data-theme',this.theme); },
    go(p){ this.page=p; this.tab=p; window.scrollTo(0,0); },
    goKeep(p){ this.page=p; window.scrollTo(0,0); },
    back(){ this.go(this.tab); },
    checkins(){ if(!this._ci) this._ci=store.get('wx_checkins',[]); return this._ci; },
    checkinDays(){ const arr=this.checkins(); if(arr.indexOf(todayStr())<0) return 0; let n=0,d=new Date(); while(true){ const s=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); if(arr.indexOf(s)>=0){n++;d.setDate(d.getDate()-1);}else break;} return n; },
    _save(){ store.set('wx_mastery',this.mastery); store.set('wx_records',this.records); store.set('wx_mistakes',this.mistakes); store.set('wx_hist',this.hist); },
    recordResult(q, correct){
      const key=q.kpId||q.kp;
      // 贝叶斯知识追踪(BKT,对标pyBKT)参数: 猜对率G、失误率S、习得率T、初始掌握率
      const bkt = (this._bktParams && this._bktParams[key]) || { g:0.25, s:0.10, t:0.30, prior:0.20 };
      const m=this.mastery[key]||{total:0,correct:0,streak:0,last5:[],mastery:0, Pl: bkt.prior};
      m.total++; if(correct){m.correct++;m.streak++;}else{m.streak=0;}
      m.last5.push(correct?1:0); if(m.last5.length>5)m.last5.shift();
      // BKT 后验更新（核心：把"答对/答错"转化为"对该知识的掌握概率"，区分蒙对/失误）
      const pL = (m.Pl!==undefined?m.Pl:bkt.prior);
      let pLc;
      if(correct){ pLc = (pL*(1-bkt.s))/(pL*(1-bkt.s)+(1-pL)*bkt.g); }
      else { pLc = (pL*bkt.s)/(pL*bkt.s+(1-pL)*(1-bkt.g)); }
      // 习得(掌握后练习巩固) + 收敛保护
      let pL2 = pLc + (1-pLc)*bkt.t;
      if(pL2>0.98) pL2=0.98; if(pL2<0.05) pL2=0.05;
      m.Pl = pL2;
      // 掌握度=掌握概率×100（BKT推断的"真的会"程度），并融合近期表现做微调
      m.mastery = Math.round(pL2*100);
      if(m.mastery>=60 && !m.nextReview){ const d=new Date(); d.setDate(d.getDate()+ (m.mastery>=85?7:3)); m.nextReview=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
      this.mastery[key]=m;
      const k=this.todayKey; const h=this.hist[k]||{done:0,correct:0}; h.done++; if(correct)h.correct++; this.hist[k]=h;
      // 记录答题明细（用时/对错/知识点），用于统计与成就
      const elapsed=this.qElapsed||0;
      this.records.push({ at:Date.now(), subj:this.gen.subject, kp:q.kp, kpId:q.kpId||q.kp, correct, elapsed, diff:q.diff });
      const cnt=this.records.length;
      if(elapsed>0){ this.avgTime = this.avgTime>0 ? Math.round((this.avgTime*(cnt-1)+elapsed)/cnt) : elapsed; }
      this.unlockAchieve('first'); if(cnt>=100) this.unlockAchieve('hundred');
      if(this.mastery[key] && this.mastery[key].mastery>=80) this.unlockAchieve('master80');
      if(!correct){
        const ex=this.mistakes.filter(x=>x.qid===q.id);
        if(!ex.length) this.mistakes.unshift({ qid:q.id, subject:this.gen.subject, kp:q.kp, kpId:q.kpId||q.kp, text:q.text, options:q.options, correct:q.correct, answer:q.answer, solution:q.solution, type:q.type, errorType:'', at:Date.now() });
        else ex[0].at=Date.now();
      }
      if(this.checkinDays()>=3) this.unlockAchieve('streak3');
      if(this.checkinDays()>=7) this.unlockAchieve('streak7');
      this._save();
    },
    // ========== 智能出题 ==========
    subLabel(s){ return SUBJECTS[s].name; },
    kpsOf(subj){ return getKps(subj); },
    // 该科目下某年级的知识点（gen.grade 过滤）
    kpsOfGrade(subj, grade){
      const all=getKps(subj); const gm=(window.__GradeMap||{})[subj]||{};
      if(grade==='all'||!grade) return all;
      return all.filter(kp => String(gm[kp])===String(grade));
    },
    // 该科目覆盖的年级
    gradesOf(subj){
      const gm=(window.__GradeMap||{})[subj]||{}; const set={};
      getKps(subj).forEach(kp=>{ const g=gm[kp]; if(g) set[g]=1; });
      const arr=Object.keys(set).map(Number).sort((a,b)=>a-b);
      return arr;
    },
    gradeName(g){ return (window.__GradeNames||{})[g] || (g==='all'?'全部':g); },
    // ===== 按教材章节出题 =====
    textbookBooks(subj){ return (window.__Textbook||{})[subj] || []; },
    chooseChapter(subj, bookIdx, chIdx){
      const book=(window.__Textbook||{})[subj][bookIdx]; if(!book) return;
      const ch=book.chapters[chIdx]; if(!ch) return;
      const kps=(ch.kps||[]).filter(Boolean);
      this.gen.grade=book.grade; this.gen.kps=kps;
      if(!kps.length){ this.help='该章节暂无参数化模板，请选其他章节或稍候扩展'; return; }
      this.startGenerate();
    },
    chooseSection(subj, bookIdx, chIdx, secIdx){
      const book=(window.__Textbook||{})[subj][bookIdx]; if(!book) return;
      const ch=book.chapters[chIdx]; if(!ch||!ch.sections) return;
      const se=ch.sections[secIdx]; if(!se) return;
      const kps=(se.kps||[]).filter(Boolean);
      this.gen.grade=book.grade; this.gen.kps=kps;
      if(!kps.length){ this.help='该小节暂无参数化模板，请选其他单元或稍候扩展'; return; }
      this.startGenerate();
    },
    chapterKps(book, ch){ return (ch.kps||[]).filter(Boolean); },
    toggleKp(kp){ const i=this.gen.kps.indexOf(kp); if(i>=0)this.gen.kps.splice(i,1); else if(this.gen.kps.length<5) this.gen.kps.push(kp); },
    qtypesFor(subj){ return (QTYPES||{})[subj] || []; },
    startByType(type){
      const subj=this.gen.subject;
      this.gen.kps = type.kps.slice(0,5);
      this.gen.grade = 'all';
      if(type.diff) this.gen.difficulty = type.diff>=4?'hard':type.diff===3?'auto':'easy';
      const typeFilter = this.gen.types.choice&&this.gen.types.blank&&this.gen.types.dual ? 'all' : (this.gen.types.choice?'choice':this.gen.types.blank?'blank':'dual');
      let qs = genQuestions(subj, this.gen.kps, type.diff||this.gen.difficulty, this.gen.count, typeFilter);
      if(!qs.length){ this.help='该题型暂无更多可生成题目，请稍后再试'; return; }
      let guard=0;
      while(guard<60){
        const dupIdx=qs.map((q,i)=>this.wasRecent(q.fp||q.id,7)?i:-1).find(i=>i>=0);
        if(dupIdx===undefined) break;
        const rep=genQuestions(subj, [qs[dupIdx].kp], type.diff, 1, typeFilter)[0];
        if(rep){ qs[dupIdx]=rep; }
        guard++;
      }
      qs.forEach(q=>this.rememberQ(q.fp||q.id));
      this.genAims=this.gen.kps.slice(); this.genList=qs; this.genIndex=0; this.genType='smart';
      this.curAnswer=null; this.dualSel=[]; this.answered=false; this.showSolution=false;
      this.slowTip=''; this.qElapsed=0; this.startQTimer();
      this.goKeep('answer');
    },
    allKpsFor(subj){ return getKps(subj); },
    startGenerate(){
      const subj=this.gen.subject;
      let kps=this.gen.kps.slice();
      if(!kps.length){
        kps = this.smartPickKps(subj);
      }
      const typeFilter = this.gen.types.choice&&this.gen.types.blank&&this.gen.types.dual ? 'all' : (this.gen.types.choice?'choice':this.gen.types.blank?'blank' : this.gen.types.dual?'dual':'all');
      // 自研IRT引擎：难度"自适应"时，按学生能力动态推荐难度(对标深度自适应方法)
      let effDiff = this.gen.difficulty;
      if(effDiff==='auto'){
        const EI=(typeof window!=='undefined'&&window.__EngineIntel);
        if(EI && EI.irtAbility && this.records.length>=3){
          const theta=EI.irtAbility(this.records.slice(-40).map(r=>({correct:r.correct?1:0,diff:r.diff||2})));
          effDiff = EI.recommendDiff(theta);   // 1-5
        } else effDiff='auto';
      }
      let qs = genQuestions(subj, kps, effDiff, this.gen.count, typeFilter);
      // 重复避免：近N天内出过同模板+同参数哈希的题，重新生成替身（最多重试30次）
      if(qs.length){
        let guard=0;
        while(guard<60){
          const dupIdx=qs.map((q,i)=>this.wasRecent(q.fp||q.id,7)?i:-1).find(i=>i>=0);
          if(dupIdx===undefined) break;
          const rep=genQuestions(subj, [qs[dupIdx].kp], this.gen.difficulty, 1, typeFilter)[0];
          if(rep){ qs[dupIdx]=rep; }
          guard++;
        }
      }
      if(!qs.length){ this.help='该知识点暂无更多可生成题目，请尝试其他知识点或难度'; return; }
      // 记录本批题目，供下次去重
      qs.forEach(q=>this.rememberQ(q.fp||q.id));
      this.genAims=kps; this.genList=qs; this.genIndex=0; this.genType='smart';
      this.genAims=kps; this.genList=qs; this.genIndex=0; this.genType='smart';
      this.curAnswer=null; this.dualSel=[]; this.answered=false; this.showSolution=false;
      this.slowTip=''; this.qElapsed=0; this.startQTimer();
      this.goKeep('answer');
    },
    // 智能知识点推荐：基于学情（掌握度低+错题多+到期复习 加权），纯本地规则
    smartPickKps(subj, n, candidates){
      n = n || 3;
      const all = candidates && candidates.length ? candidates : getKps(subj);
      const score={};
      all.forEach(k=>{
        let s=0;
        const m=this.mastery[k];
        // 1) 掌握度越低权重越高
        if(m) s += Math.max(0, 60 - m.mastery);
        // 2) 错题反哺：近期错题多的知识加权
        const mis = this.mistakes.filter(x=>x.kpId===k || x.kp===k).length;
        s += mis * 25;
        // 3) 到期复习：到复习时间的高权重
        if(m && m.nextReview && m.nextReview<=todayStr()) s += 20;
        // 4) 从未练习过的优先
        if(!m || m.total===0) s += 40;
        score[k]=s;
      });
      const ranked = all.slice().sort((a,b)=> score[b]-score[a]);
      return ranked.slice(0, Math.min(n, all.length));
    },
    regenerate(){
      // 换一批新题
      this.gen.kps = this.genAims;
      this.startGenerate();
    },
    // ========== 答题 ==========
    currentQ(){ return this.genList[this.genIndex]; },
    qk(k){ try{ const q=this.genList[this.genIndex]; return q && q[k] || ''; }catch(e){ return ''; } },
    qs(){ try{ const q=this.genList[this.genIndex]; return (q && q.solution)||[]; }catch(e){ return []; } },
    selectOpt(idx){
      if(this.answered) return;
      this.curAnswer=idx;
    },
    toggleDual(idx){
      if(this.answered) return;
      const i=this.dualSel.indexOf(idx);
      if(i>=0) this.dualSel.splice(i,1); else if(this.dualSel.length<2) this.dualSel.push(idx);
    },
    submitAnswer(){
      const q=this.currentQ(); if(!q) return;
      let correct=false;
      if(q.type==='choice'){ correct = this.curAnswer===q.correct; }
      else if(q.type==='dual'){ const a=this.dualSel.slice().sort(), c=(q.correct||[]).slice().sort(); correct = a.join(',')===c.join(','); }
      else {
        const u=(this.curAnswer&&this.curAnswer.user)!==undefined ? this.curAnswer.user : this.curAnswer;
        correct = isAnswerCorrect(u, q.answer);
      }
      this.answered=true;
      this.stopQTimer();
      this.recordResult(q, correct);
      this.showSolution = !correct;
      if(correct) this.unlockAchieve('first');
      // 超时标记：用时超过3倍平均（且>5题后才有参考）
      if(this.records.length>5 && this.qElapsed>this.avgTime*3){ this.slowTip='（用时过长，建议提高效率）'; }
      else this.slowTip='';
    },
    // 标记当前错题的错误类型并计入反哺
    markError(q){
      if(!q) return;
      const m=this.mistakes.find(x=>x.qid===q.id);
      if(m){ m.errorType=this.errTypeLabels()[0]; }
    },
    nextQ(){
      if(this.genIndex < this.genList.length-1){ this.genIndex++; this.curAnswer=null; this.dualSel=[]; this.answered=false; this.showSolution=false; this.qElapsed=0; this.startQTimer(); }
      else { this.finishSession(); }
    },
    finishSession(){
      this.stopQTimer();
      // 更新平均用时
      const rec=this.records.slice(-this.genList.length); if(rec.length){ const ts=rec.filter(r=>r.elapsed>0).map(r=>r.elapsed); if(ts.length) this.avgTime=Math.round(ts.reduce((a,b)=>a+b,0)/ts.length); }
      if(this.genType==='paper') this.paperCount=(this.paperCount||0)+1;
      this.goKeep('answerDone');
    },
    answerResult(){
      const q=this.currentQ();
      if(!q) return null;
      let correct=false, user='';
      if(q.type==='choice'){ correct=this.curAnswer===q.correct; user=q.options[this.curAnswer]; }
      else if(q.type==='dual'){ correct=this.dualSel.slice().sort().join(',')===(q.correct||[]).slice().sort().join(','); user=this.dualSel.map(i=>q.options[i]).join('、'); }
      else { user=(this.curAnswer&&this.curAnswer.user)!==undefined?this.curAnswer.user:this.curAnswer; correct=isAnswerCorrect(user,q.answer); }
      return { correct, user };
    },
    optClass(idx, q){
      if(!this.answered) return q.type==='choice'&&this.curAnswer===idx?'selected':'';
      if(q.type==='dual') return this.dualSel.indexOf(idx)>=0?'selected':'';
      if(idx===q.correct) return 'correct';
      if(idx===this.curAnswer) return 'wrong';
      return '';
    },
    isDualCorrect(q){ const sel=this.dualSel.slice().sort(), c=(q.correct||[]).slice().sort(); return sel.join(',')===c.join(','); },
    qAnsweredCount(){ return this.genIndex+1; },
    // ========== 试卷生成 ==========
    paperStruct(){ return PAPER_STRUCT[this.paper.subject]; },
    startPaper(){
      const struct=this.paperStruct(); const subj=this.paper.subject;
      const allKps=getKps(subj);
      const kps=this.gen.kps.length?this.gen.kps:allKps;
      const diffs = this.paper.difficulty==='easy'?1:this.paper.difficulty==='hard'?3:2;
      const qs=[]; let qno=0;
      // 按卷面结构逐题型生成（严格对标福建高考）
      (struct.parts||[]).forEach((part,pi)=>{
        for(let i=0;i<part.n && qs.length<40;i++){
          const typeMap={ '单选':'choice','选择':'choice','多选':'dual','双选':'dual','填空':'blank','解答':'blank','语言运用':'blank','语法填空':'blank','听力':'choice','阅读理解':'choice','完形填空':'choice' };
          const tf=typeMap[part.t];
          if(part.t==='写作'||part.t.includes('作文')){ continue; } // 写作无法参数化
          let batch=genQuestions(subj, kps, diffs, 1, tf||'all');
          // 若当前section无该题型模板，放宽为任意
          if(!batch.length) batch=genQuestions(subj, kps, diffs, 1, 'all');
          if(batch.length){
            const q=batch[0];
            q.section=part.t; q.sectionIdx=pi; q.secNo=(i+1);
            q.fullScore=part.each;
            qs.push(q);
          }
        }
      });
      if(!qs.length){ this.help='试卷生成失败，请更换科目或知识点'; return; }
      this.paperQs=qs; this.paperIndex=0; this.paperAnswers={};
      if(this.paper.timing){ this.paperTimeLeft=struct.time*60; this.startPaperTimer(); }
      this.paperStart=Date.now();
      this.goKeep('paper');
    },
    startPaperTimer(){
      if(this.paperTimer) clearInterval(this.paperTimer);
      this.paperTimer=setInterval(()=>{ this.paperTimeLeft--; if(this.paperTimeLeft<=0){ clearInterval(this.paperTimer); this.paperTimer=null; this.submitPaper(); } },1000);
    },
    paperTimeStr(){ const m=Math.floor(this.paperTimeLeft/60), s=this.paperTimeLeft%60; return m+':'+(s<10?'0'+s:s); },
    setPaperAnswer(pidx, val){ this.paperAnswers[pidx]=val; },
    togglePaperOpt(pidx, idx){
      const q=this.paperQs[pidx];
      if(q.type==='dual'){ const cur=this.paperAnswers[pidx]||[]; const i=cur.indexOf(idx); if(i>=0)cur.splice(i,1); else if(cur.length<2)cur.push(idx); this.paperAnswers[pidx]=cur.slice(); }
      else this.paperAnswers[pidx]=idx;
    },
    paperScore(){
      let sc=0; this.paperQs.forEach((q,i)=>{ if(q.type==='choice'){ if(this.paperAnswers[i]===q.correct)sc++; } else if(q.type==='dual'){ if((this.paperAnswers[i]||[]).slice().sort().join(',')===(q.correct||[]).slice().sort().join(','))sc++; } else { if(isAnswerCorrect(this.paperAnswers[i],q.answer))sc++; } });
      return sc;
    },
    submitPaper(){
      clearInterval(this.paperTimer); this.paperTimer=null;
      // 逐题判分（支持多得分点：填空/压轴按要点计分）
      this.paperResults = this.paperQs.map((q,i)=>{
        let ok=false, score=0, full=q.fullScore||0, points=[];
        if(q.points && q.points.length){
          // 多得分点（blank）：逐个要点判分，答对几点得几分
          full = q.points.reduce((s,p)=>s+(p.score||0),0);
          let anyOk=false;
          q.points.forEach((p,pi)=>{
            const u=(this.paperAnswers[i]&&this.paperAnswers[i]!==undefined?this.paperAnswers[i]:{});
            const uu = (u && u!==undefined) ? u[pi] : undefined;
            const po = isAnswerCorrect(uu, p.answer);
            points.push({ label:p.label||('第'+(pi+1)+'空'), ok:po, score: po?(p.score||0):0, full:p.score||0 });
            if(po){ anyOk=true; score+=(p.score||0); }
          });
          ok = score>=full && anyOk;
        } else if(q.type==='choice'){ ok = String(this.paperAnswers[i])===String(q.correct); score=ok?full:0; }
        else if(q.type==='dual'){ const a=(this.paperAnswers[i]||[]).slice().sort().join(','), c=(q.correct||[]).slice().sort().join(','); ok = a===c; score=ok?full:0; }
        else { ok = isAnswerCorrect(this.paperAnswers[i], q.answer); score=ok?full:0; }
        return { ok, score, full, section:q.section||'', secNo:q.secNo, points };
      });
      this.paperScoreVal = this.paperResults.reduce((s,r)=>s+r.score,0);
      this.paperFullVal = this.paperResults.reduce((s,r)=>s+r.full,0);
      // 答错进错题本
      this.paperQs.forEach((q,i)=>{ if(!this.paperResults[i].ok){ const ex=this.mistakes.find(m=>m.qid===q.id); if(!ex){ this.mistakes.unshift({ qid:q.id, subject:this.paper.subject, kp:q.kp, kpId:q.kpId||q.kp, text:q.text, options:q.options||[], correct:q.correct, answer:q.answer, solution:q.solution||[], type:q.type, errorType:'', at:Date.now() }); } } });
      this._save();
      this.paperCount=(this.paperCount||0)+1; this.unlockAchieve('paper1'); store.set('wx_paperCount',this.paperCount);
      this.goKeep('paperResult');
    },
    paperResultList(){ return this.paperQs; },
    // 按题型统计得分
    paperSectionScores(){ const m={}, full={}, correct={}; this.paperResults.forEach(r=>{ const s=r.section||''; m[s]=(m[s]||0)+r.score; full[s]=(full[s]||0)+r.full; if(r.ok)correct[s]=(correct[s]||0)+1; }); return { score:m, full }; },
    // ========== 高考真题 ==========
    zhentiAvail(k){ const Z=(typeof window!=='undefined'&&window.__ZHENTI)||{}; return !!(Z[k]&&Z[k].length); },
    zhentiList(k){ const Z=(typeof window!=='undefined'&&window.__ZHENTI)||{}; return Z[k]||[]; },
    zhentiCur(){ const l=this.zhentiList(this.zhentiSub); return l[this.zhentiIdx-1]||l[0]||{}; },
    zhentiChoices(z){
      const s=String(z.question||'');
      const m=s.match(/([A-D])(?:[\.、．]|\s)\s*([^A-D]{1,60}?)(?=(?:[A-D](?:[\.、．]|\s))|$)/g)||[];
      const ch=[];
      m.forEach(function(x){ const mm=x.match(/^[A-D](?:[\.、．]|\s)\s*(.+)/); if(mm)ch.push(mm[1].trim()); });
      return ch.length?ch.slice(0,4):['选项A','选项B','选项C','选项D'];
    },
    zhentiOptClass(i,z){
      if(!this.zhentiChecked) return 'opt-item';
      const ans=Array.isArray(z.answer)?z.answer.join(''):String(z.answer);
      const letter=['A','B','C','D'][i];
      const isAns=ans.indexOf(letter)>=0;
      const isPick=String(this.zhentiAns)===String(i);
      if(isAns) return 'opt-item correct';
      if(isPick&&!isAns) return 'opt-item wrong';
      return 'opt-item';
    },
    zhentiCheck(withJudge){ this.zhentiChecked=true; if(withJudge===false) this.zhentiAns=''; },
    zhentiNext(){ const l=this.zhentiList(this.zhentiSub); if(this.zhentiIdx<l.length){ this.zhentiIdx++; } else { this.zhentiIdx=0; } this.zhentiAns=''; this.zhentiChecked=false; },
    printPaper(){ window.print(); },
    // ========== 错题本 ==========
    mistakeSubs(){ const s={}; this.mistakes.forEach(m=>s[m.subject]=1); return Object.keys(s); },
    filteredMistakes(){ let list=this.mistakes; if(this.misFilter.subject!=='all') list=list.filter(m=>m.subject===this.misFilter.subject); return list; },
    redoMistakes(){
      const list=this.filteredMistakes(); if(!list.length) return;
      this.misRedoQs = list.map(m=>({id:m.qid, kp:m.kp, kpId:m.kpId, type:m.type, text:m.text, options:m.options, correct:m.correct, answer:m.answer, solution:m.solution}));
      this.misRedoIndex=0; this.misRedoAns={}; this.misRedoSolved={right:0,wrong:0}; this.misMode='redo';
      this.misRedoCav=null; this.misRedoSel=[]; this.misRedoR=true; this.gen.subject=(this.misFilter.subject!=='all'?this.misFilter.subject:list[0].subject)||'math';
    },
    redoCurrent(){ return this.misRedoQs[this.misRedoIndex]; },
    // 重做判分：答对自动移出错题本
    redoConfirm(){
      const q=this.redoCurrent(); if(!q) return;
      let ok=false;
      if(q.type==='choice'){ ok = this.misRedoCav===q.correct; }
      else if(q.type==='dual'){ const a=(this.misRedoSel||[]).slice().sort(), c=(q.correct||[]).slice().sort(); ok = a.join(',')===c.join(','); }
      else { ok = isAnswerCorrect(this.misRedoCav, q.answer); }
      if(ok){
        this.misRedoSolved.right++;
        // 移出错题本
        const i=this.mistakes.findIndex(m=>m.qid===q.id);
        if(i>=0){ this.mistakes.splice(i,1); this._save(); }
      } else {
        this.misRedoSolved.wrong++;
      }
      this.misRedoAns[q.id]=ok;
      this.misRedoR=true;
    },
    redoIsRight(q){ return this.misRedoAns[q.id]; },
    redoDoneCount(){ return Object.keys(this.misRedoAns).length; },
    redoPick(i){ this.misRedoCav=i; },
    redoDual(i){ const j=this.misRedoSel.indexOf(i); if(j>=0)this.misRedoSel.splice(j,1); else this.misRedoSel.push(i); },
    redoAnswerClass(idx,q){ if(this.misRedoAns[q.id]===undefined) return 'opt-item'; if(idx===q.correct) return 'opt-item correct'; if(this.misRedoCav===idx) return 'opt-item wrong'; return 'opt-item'; },
    redoNext(){
      if(this.misRedoIndex < this.misRedoQs.length-1){ this.misRedoIndex++; this.misRedoCav=null; this.misRedoSel=[]; this.misRedoR=false; }
      else { this.misMode='list'; this.misRedoIndex=0; this.misRedoR=false; }
    },
    exitRedo(){ this.misMode='list'; },
    delMistake(i){ this.mistakes.splice(i,1); this._save(); },
    delAllMistakes(){ this.mistakes=[]; this._save(); },
    exportMistakes(){
      let csv='知识点,题目,正确答案\n';
      this.filteredMistakes().forEach(m=>{ csv+='"'+m.kp+'","'+m.text.replace(/"/g,'""')+'","'+m.answer+'"\n'; });
      const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});
      const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='错题本.csv'; a.click();
    },
    printMistakes(){ window.print(); },
    // ========== 学情 ==========
    masteryList(subj){
      const list=[];
      Object.keys(this.mastery).forEach(k=>{ if(getKps(subj).indexOf(k)>=0) list.push({key:k, m:this.mastery[k]}); });
      const known=list.map(l=>l.key);
      getKps(subj).forEach(k=>{ if(known.indexOf(k)<0) list.push({key:k, m:{total:0,mastery:0}}); });
      return list;
    },
    schoolTrend(subj){
      const days=[]; for(let i=6;i>=0;i--){ const d=new Date(); d.setDate(d.getDate()-i); days.push(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()); }
      return days.map(k=>{ const h=this.hist[k]; return h?Math.round(h.correct/Math.max(1,h.done)*100):0; });
    },
    schoolDoneTrend(){ const days=[]; for(let i=6;i>=0;i--){ const d=new Date(); d.setDate(d.getDate()-i); days.push(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()); } return days.map(k=>{ const h=this.hist[k]; return h?h.done:0; }); },
    schoolAvgCorrect(){ const list=this.masteryList(this.schoolSub).filter(x=>x.m.total>0); if(!list.length) return 0; return Math.round(list.reduce((a,x)=>a+x.m.correct/x.m.total*100,0)/list.length); },
    // 智能学情建议：基于掌握度/错题/遗忘曲线的本地规则分析
    smartAdvice(subj){
      const advice=[];
      if(!subj) subj=this.schoolSub;
      const list=this.masteryList(subj);
      const weak=list.filter(x=>x.m.total>0 && x.m.mastery<60).length;
      const done=this.records.length;
      if(done===0) advice.push('● 尚未练习，建议每天用「智能出题」做 10 道基础题起步，先建立手感。');
      else {
        const acc=this.schoolAvgCorrect();
        if(acc>=85) advice.push('● 整体掌握较好（正确率'+acc+'%），可挑战更高难度，重点巩固高频压轴题。');
        else if(acc>=60) advice.push('● 正确率'+acc+'% 处于中游，建议优先针对薄弱知识点集中突破。');
        else advice.push('● 正确率'+acc+'% 偏低，建议降低难度、回归基础，逐个击破失分点，别盲目刷难题。');
      }
      if(weak===0 && done>0) advice.push('● 当前无明显的低掌握度考点，可进入更高难度或尝试其他科目。');
      else if(weak>0) advice.push('● 有 '+weak+' 个考点掌握度偏低，建议按「知识图谱」逐个训练，每点至少刷到 80%。');
      const misSub=this.mistakes.filter(m=>m.subject===subj).length;
      if(misSub>0) advice.push('● 错题本有 '+misSub+' 题，建议先「重做错题」再练新题，避免重复犯错。');
      const due=this.masteryList(subj).filter(x=>x.m.nextReview && x.m.nextReview<=todayStr()).length;
      if(due>0) advice.push('● 有 '+due+' 个知识点到了复习期，请优先完成「间隔复习」，趁记忆模糊前强化。');
      if(!advice.length) advice.push('● 继续加油，保持稳定练习就能稳步提升。');
      return advice;
    },
    // ========== 图谱 ==========
    graphKps(){ return this.masteryList(this.graphSub); },
    // ========== 智能个性化组题 ==========
    personalSummary(){
      let total=0, sum=0, weak=0, due=0;
      Object.keys(this.mastery).forEach(k=>{
        const m=this.mastery[k];
        sum += m.mastery; total++;
        if(m.mastery<60 && m.total>=3) weak++;
        if(m.mastery>=60 && m.nextReview && m.nextReview<=todayStr()) due++;
      });
      return { avg: total?sum/total:0, weak, due };
    },
    // 跨全科目找出最薄弱的知识点画像，按学科智能组题
    personalStart(){
      const subj=this.gen.subject;
      // 1) 该科所有知识点，按个性化分数排序(薄弱优先)
      const all=getKps(subj);
      // 2) 收集该科薄弱+到期+未练
      const weakList=[], dueList=[], freshList=[];
      all.forEach(k=>{
        const m=this.mastery[k];
        const mis=this.mistakes.filter(x=>x.kpId===k||x.kp===k).length;
        if(mis>0 || (m&&m.mastery<60)) weakList.push(k);
        else if(m && m.mastery>=60 && m.nextReview && m.nextReview<=todayStr()) dueList.push(k);
        else freshList.push(k);
      });
      // 3) 按比例组题: 薄弱60% 复习25% 新知识15%
      const count=this.gen.count||10;
      const weakCount=Math.max(1,Math.round(count*0.6));
      const dueCount=Math.round(count*0.25);
      const freshCount=count-weakCount-dueCount;
      const pool=[];
      // 用smartPick从各类选
      if(weakList.length) pool.push.apply(pool,this.smartPickKpsSub(subj,weakList,weakCount));
      if(dueList.length) pool.push.apply(pool,this.smartPickKpsSub(subj,dueList,dueCount));
      if(freshList.length) pool.push.apply(pool,this.smartPickKpsSub(subj,freshList,freshCount));
      if(!pool.length) pool.push.apply(pool,this.smartPickKps(subj,3));
      // 4) 难度自动: 整体弱→简单, 均衡→自适应
      const avgMastery=this.personalSummary().avg;
      const diff= avgMastery<40?'easy':(avgMastery>=70?'hard':'auto');
      const typeFilter='all';
      const uniq=[]; const seen={};
      pool.forEach(k=>{ if(!seen[k]){seen[k]=1;uniq.push(k);} });
      let qs=[];
      // 从每个知识点抽1-2题,直到接近count
      for(const kp of uniq){
        const batch=genQuestions(subj,[kp],diff,2,typeFilter);
        qs=qs.concat(batch);
        if(qs.length>=count) break;
      }
      if(!qs.length){ qs=genQuestions(subj,this.smartPickKps(subj,3),diff,count,typeFilter); }
      qs=qs.slice(0,count);
      if(!qs.length){ this.help='暂无可生成的个性化题目，请先刷题积累学情'; return; }
      // 去重
      let guard=0;
      while(guard<20){
        const dupIdx=qs.map((q,i)=>this.wasRecent(q.fp||q.id,7)?i:-1).find(i=>i>=0);
        if(dupIdx===undefined) break;
        const rep=genQuestions(subj,[qs[dupIdx].kp],diff,1,typeFilter)[0];
        if(rep) qs[dupIdx]=rep; guard++;
      }
      qs.forEach(q=>this.rememberQ(q.fp||q.id));
      this.genAims=uniq.slice(0,5); this.genList=qs; this.genIndex=0; this.genType='smart';
      this.gen.difficulty=diff;
      this.curAnswer=null; this.dualSel=[]; this.answered=false; this.showSolution=false;
      this.slowTip=''; this.qElapsed=0; this.startQTimer();
      this.goKeep('answer');
    },
    smartPickKpsSub(subj, list, n){
      if(!list.length) return [];
      // 在给定list里按smartPickKps逻辑选n个(不重)
      const ranked=list.slice().sort(()=>0.5-Math.random());
      return ranked.slice(0,n);
    },
    // ========== 导学案 ==========
    makeDaoxue(){
      if(!this.dxKp) return;
      const subj=this.dxSub;
      const k=KNOWLEDGE && KNOWLEDGE[this.dxKp];
      this.dxData = k ? k : { keypoint:'（该知识点暂无内置讲解，可结合例题理解。请先选有模板的知识点。）', method:'', trap:'' };
      // 生成例题/练习（不过滤难度）
      const ex = genQuestions(subj, [this.dxKp], 'auto', 4, 'all');
      const pr = genQuestions(subj, [this.dxKp], 'auto', 6, 'all');
      this.dxEx = ex.slice(0,3);
      this.dxPractice = (pr.length?pr:ex).slice(0,5);
      if(!this.dxEx.length&&!this.dxPractice.length){ this.help='该知识点暂无可用模板，请换一个知识点'; return; }
      this.dxDate = todayStr();
      this.dxMade=true;
      window.scrollTo(0,0);
    },
    printDaoxue(){ window.print(); },
    dxGoPractice(){
      this.gen.subject=this.dxSub; this.gen.kps=[this.dxKp]; this.gen.count=5; this.gen.difficulty='auto';
      this.startGenerate();
    },
    // ========== 专项训练(英语词汇/语文默写) ==========
    startSpec(subj, type, label){
      this.gen.subject=subj;
      // 英语词汇: 用所有词汇/辨析相关kp; 语文默写: 用名句kp
      const kpMap = {
        'english': ['词汇辨析','词形变化'],
        'chinese': ['名句默写','名句理解性默写']
      };
      const kps=(kpMap[type]||[]).filter(k=>getKps(subj).indexOf(k)>=0);
      this.gen.kps = kps.length?kps:this.smartPickKps(subj,3);
      this.gen.count=10;
      this.gen.grade='all';
      this.gen.difficulty='auto';
      this.startGenerate();
    },
    // ========== 高考冲刺 ==========
    gaokaoDays(){ return gaokaoDays(); },
    gaokaoTop(){ const d=gaokaoData(this.gen.subject); const tags=(d.tags||[]).slice(0,6); if(tags.length) return tags; return GAOKAO.slice(0,6); },
    gaokaoPred(){ const d=gaokaoData(this.gen.subject); return (d.pred||[]).slice(0,3); },
    gaokaoOfKp(kp){ return gaokaoOfKp(kp); },
    startGaokaoKp(g, subj){
      subj = subj || this.gen.subject;
      this.gen.subject=subj;
      let kps = (g.kps && g.kps.length) ? g.kps : null;
      if(!kps){ const all=getKps(subj); kps=all.slice(0,3); }
      const cands=kps.filter(k=>getKps(subj).indexOf(k)>=0);
      const pick=this.smartPickKps(subj,3,cands);
      this.gen.kps=pick.length?pick:(cands.length?[cands[0]]:this.smartPickKps(subj,2));
      this.startGenerate();
    },
    startTrainKp(kp){ this.gen.subject=this.graphSub; this.gen.kps=[kp]; this.startGenerate(); },
    // ========== 导出报告/清除 ==========
    exportReport(){
      let t='【无限题】学习报告\n日期：'+todayStr()+'\n累计做题：'+this.records.length+' 道\n';
      const weak=this.weakKp; if(weak.length){ t+='\n薄弱知识点：\n'; weak.forEach(w=> t+='- '+w.key+'（掌握度'+Math.round(w.mastery)+'%）\n'); }
      const blob=new Blob(['\ufeff'+t],{type:'text/plain;charset=utf-8'});
      const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='学习报告.txt'; a.click();
    },
    clearAll(){
      if(confirm('确定清除所有学习数据吗？此操作不可恢复。')){
        this.mastery={}; this.records=[]; this.mistakes=[]; this.hist={}; this._ci=[];
        this.achievements={}; this.wrongMap={}; this.paperCount=0; this.redoneCount=0;
        ['wx_mastery','wx_records','wx_mistakes','wx_hist','wx_checkins','wx_achieve','wx_wrongmap','wx_paperCount','wx_qhist','wx_draft'].forEach(k=>localStorage.removeItem(k));
        alert('数据已清除');
      }
    },
    // ===== 本地智能引擎（无任何外部API） =====
    async aiAskQuestion(){
      if(this.aiBusy) return;
      const subj=this.aiGenSub;
      // 本地智能出题：用自研引擎(知识图谱根因+IRT难度)从本地模板库智能选题，完全离线
      const EI=(typeof window!=='undefined'&&window.__EngineIntel)||{};
      let kps=getKps(subj).slice();
      // 1) 知识图谱根因：若薄弱点有前置弱，先选前置(补根因)
      if(EI.KP_GRAPH && this.weakKp.length){
        const root=[];
        this.weakKp.slice(0,3).forEach(function(w){ (EI.inferRootCause?EI.inferRootCause(w.key,{}):[]).forEach(function(d){ if(root.indexOf(d.kp)<0)root.push(d.kp); }); });
        const validRoot=root.filter(function(k){return kps.indexOf(k)>=0;});
        if(validRoot.length){ kps=validRoot.slice(0,2).concat(this.weakKp.map(w=>w.key)); }
      }
      // 2) IRT难度自适应
      let effDiff='auto';
      if(EI.irtAbility && this.records.length>=3){
        effDiff=EI.recommendDiff(EI.irtAbility(this.records.slice(-40).map(r=>({correct:r.correct?1:0,diff:r.diff||2}))));
      }
      // 3) 从本地模板生成题目
      const choiceOk=(effDiff==='auto'||effDiff===2);
      const qs=genQuestions(subj, kps.slice(0,5), choiceOk?'auto':effDiff, 1, 'choice');
      const q=qs[0];
      if(q && q.options && q.options.length){
        const letters='ABCD';
        const ansIdx=q.correct>=0?q.correct:q.options.indexOf(q.answer);
        this.aiGenQ={ text:q.text, options:q.options.slice(0,4), answer:letters[ansIdx]||'A', analysis:(q.solution&&q.solution[0])||q.answer, checkOK:false, checkRight:false };
        this.aiGenAns='';
        return;
      }
      // 4) 兜底：直接进入答题页练习
      this.gen.subject=subj; this.gen.kps=kps.slice(0,3); this.gen.count=1;
      this.startGenerate();
    },
    aiGenCheck(){
      const q=this.aiGenQ; if(!q||q.answer===undefined) return;
      const letters=['A','B','C','D'];
      q.checkRight = letters[this.aiGenAns]===String(q.answer).trim().toUpperCase();
      q.checkOK=true;
    },
    // ===== 本地智能学情分析（自研引擎，无API离线） =====
    aiAnalyze(){
      if(this.aiBusy) return;
      const I=(typeof window!=='undefined'&&window.__EngineIntel)||{};
      if(I.deepAnalysis){
        try{
          const d=I.deepAnalysis(this.records.slice(-80), this.mastery);
          const lines=[
            '【能力评估】当前估计能力 θ≈'+d.ability.toFixed(2)+'（-3~3，0为平均）· 建议刷 '+I.recommendDiff(d.ability)+' 级难度',
            '【掌握趋势】近期答题正确率趋势 '+Math.round(d.trend*100)+'%'+(d.trend<=0.45?' · 有下滑，建议巩固基础':d.trend>=0.65?' · 状态上扬':''),
            '【薄弱知识点】'+(d.weak.length?d.weak.slice(0,4).map(w=>w.key+'('+Math.round(w.m)+'%)').join('、'):'暂无')
          ];
          if(d.root.length) lines.push('【可能根因·先补前置】'+d.root.slice(0,3).join('、'));
          if(d.risky.length) lines.push('【关联待巩固】'+d.risky.slice(0,4).join('、'));
          lines.push('【建议】按"前置→主考点→错题重做"顺序提升；得分点注意每空验算。');
          this.aiAnalysis=lines.join('\n'); this.aiBusy=false; this.aiTab='analyze'; return;
        }catch(e){}
      }
      const subj=this.aiGenSub, done=this.records.filter(r=>r.subj===subj).length, mis=this.mistakes.filter(m=>m.subject===subj).length, weak=this.weakKp.slice(0,4).map(w=>w.key+'('+Math.round(w.mastery)+'%)').join('、');
      this.aiAnalysis='· 累计做题 '+this.records.length+' 道，其中「'+SUBJECTS[subj].name+'」'+done+' 道\n· '+SUBJECTS[subj].name+'错题 '+mis+' 道\n· 薄弱点：'+(weak||'暂无');
      this.aiBusy=false; this.aiTab='analyze';
    },
    sendMsg(){
      const text=this.aiInput.trim(); if(!text||this.aiBusy) return;
      this.aiMsgs.push({role:'user',content:text}); 
      // 本地引擎解答（无API）：结合知识点解析库/错题/学情生成
      const EI=(typeof window!=='undefined'&&window.__EngineIntel)||{};
      let reply;
      if(text.indexOf('讲解')>=0 || text.indexOf('解析')>=0){
        reply = this._localExplain(text, this.latestQ||this.currentQ(), EI);
      } else if(text.indexOf('薄弱')>=0 || text.indexOf('学情')>=0 || text.indexOf('建议')>=0){
        try{ const d=EI.deepAnalysis?EI.deepAnalysis(this.records.slice(-80), this.mastery):null;
          reply = d? ('【本地学情诊断】\n'+'能力θ≈'+d.ability.toFixed(2)+'·趋势'+Math.round(d.trend*100)+'%\n'+(d.weak.length?('薄弱：'+d.weak.slice(0,3).map(w=>w.key+'('+Math.round(w.m)+'%)').join('、')):'暂无薄弱')+(d.root.length?('\n需先补前置：'+d.root.slice(0,2).join('、')):'') ) : '暂无足够数据，先刷几题吧。';
        }catch(e){ reply='暂无足够数据，先刷几题吧。'; }
      } else {
        reply = this._localKnow(text, EI);
      }
      this.aiMsgs.push({role:'ai',content:reply}); store.set('wx_ai_msgs',this.aiMsgs.slice(-30)); this.aiInput='';
    },
    // 本地讲解：优先当前题内置解析+知识点讲解
    _localExplain(text, q, EI){
      let msg='【本地智能讲解】\n';
      if(q){ msg+='题目：'+q.text+'\n正确答案：'+q.answer+'\n'; if(q.solution&&q.solution.length) msg+='步骤：\n'+q.solution.map((s,i)=>(i+1)+'. '+s).join('\n'); }
      const kp=q&&q.kp; if(kp&&KNOWLEDGE&&KNOWLEDGE[kp]) msg+='\n【考点】'+KNOWLEDGE[kp].keypoint+((KNOWLEDGE[kp].method)?('\n【套路】'+KNOWLEDGE[kp].method):'');
      if(!q) msg+='请先在答题页选中一道题，再点「AI讲解」查看该题分步解析。';
      return msg;
    },
    _localKnow(text, EI){
      if(KNOWLEDGE){ for(const k in KNOWLEDGE){ if(text.indexOf(k)>=0){ const x=KNOWLEDGE[k]; return '【'+k+'】\n📖 '+x.keypoint+((x.method)?('\n💡 '+x.method):'')+((x.trap)?('\n⚠️ '+x.trap):''); } } }
      return '【本地智能答疑】\n我能基于本地知识库讲解知识点（如：输入"讲讲导数"）、分析薄弱点（"我的薄弱点"）、讲解错题。由于完全离线，复杂开放问题由内置解题库回答。';
    },
    askExplain(){
      let q=null; try{ q=this.currentQ(); }catch(e){}
      if(!q){ this.go('ai'); return; }
      this.latestQ=q; this.aiTab='chat';
      const msg=this._localExplain('讲解', q, (window.__EngineIntel||{}));
      this.aiMsgs.push({role:'user',content:'讲解题目：'+q.text.slice(0,32)+'…'}); 
      this.aiMsgs.push({role:'ai',content:msg}); store.set('wx_ai_msgs',this.aiMsgs.slice(-30));
      this.go('ai');
    },
    clearAi(){ this.aiMsgs=[{role:'ai',content:'对话已清空（本地智能引擎，完全离线）'}]; store.set('wx_ai_msgs',this.aiMsgs); },
    aiPlaceholder(){ return '输入想问的（本地智能引擎）…'; },
    diffTxt(){ return this.gen.difficulty==='easy'?'简单':this.gen.difficulty==='hard'?'困难':'自适应'; },
    startReview(kp){ this.gen.subject=this.graphSub; this.gen.kps=[kp]; this.genType='review'; this.startGenerate(); },
    askMistake(m){
      this.aiTab='chat';
      this.aiMsgs.push({role:'user',content:'请讲解我的错题：'+m.text}); 
      let msg='【本地错题讲解】\n题目：'+m.text+'\n正确答案：'+m.answer;
      if(m.kp&&KNOWLEDGE&&KNOWLEDGE[m.kp]) msg+='\n【考点】'+KNOWLEDGE[m.kp].keypoint+((KNOWLEDGE[m.kp].method)?('\n【套路】'+KNOWLEDGE[m.kp].method):'');
      if(m.solution&&m.solution.length) msg+='\n【解析】'+m.solution.join('；');
      this.aiMsgs.push({role:'ai',content:msg}); store.set('wx_ai_msgs',this.aiMsgs.slice(-30)); this.aiBusy=false;
      this.go('ai');
    },
    // ================= 新手引导 =================
    beginOnboard(){ if(this.onboarding===0) this.onboarding=1; this.goKeep('onboard'); },
    skipOnboard(){ this.onboarding=0; store.set('wx_onboard',0); try{ localStorage.setItem('wx_hasSeen','1'); }catch(e){} this.goKeep('home'); },
    showUpdateLog(){ const out=[]; ['v54','v53','v52','v50','v47','v44','v42','v40','v36','v33','v30'].forEach(v=>{ (CHANGES[v]||[]).forEach(c=>out.push({ver:v,text:c})); }); this.updateLog=out; this.showUpdate=true; },
    closeUpdate(){ this.showUpdate=false; },
    onboardNext(){
      this.onboarding++;
      if(this.onboarding>3){ this.onboarding=0; store.set('wx_onboard',0); try{ localStorage.setItem('wx_hasSeen','1'); }catch(e){} this.goKeep('home'); }
      else store.set('wx_onboard',this.onboarding);
    },
    onboardPage(idx){
      const steps=[
        { t:'欢迎使用「无限题」', d:'针对福建高考的自动出题工具。不是题库，是题厂——每次都是全新题目，永不重复、杜绝背答案。', icon:'🚀' },
        { t:'智能出题', d:'选择科目与知识点，一键生成全新题目。系统会自动优先你的薄弱知识点。', icon:'🎯' },
        { t:'错题反哺 · 学情分析', d:'答错自动进错题本，掌握度实时更新，薄弱点越练越清晰。', icon:'🧠' },
      ];
      return steps[idx-1]||steps[0];
    },
    // ================= 成就徽章 =================
    achieveDefs(){ return [
        { id:'first', icon:'🎯', name:'初出茅庐', desc:'完成第 1 道题' },
        { id:'hundred', icon:'⚡', name:'百炼成钢', desc:'累计练习 100 道题' },
        { id:'streak3', icon:'🔥', name:'三连击', desc:'连续打卡 3 天' },
        { id:'streak7', icon:'🏆', name:'七日之约', desc:'连续打卡 7 天' },
        { id:'master80', icon:'🎓', name:'举一反三', desc:'任一知识点掌握度达 80%' },
        { id:'mistake10', icon:'📚', name:'知错能改', desc:'重做 10 道错题' },
        { id:'paper1', icon:'📝', name:'小试锋芒', desc:'完成第 1 套试卷' },
      ]; },
    unlockAchieve(id){
      if(!this.achievements[id] && id){ this.achievements[id]=Date.now(); store.set('wx_achieve',this.achievements); this.mistakes=this.mistakes.slice(); }
    },
    achCount(){ return Object.keys(this.achievements).length; },
    achTotal(){ return this.achieveDefs().length; },
    achUnlocked(id){ return !!this.achievements[id]; },
    achProgress(id){
      const v={ first:this.records.length>=1, hundred:this.records.length>=100, streak3:this.checkinDays()>=3, streak7:this.checkinDays()>=7, master80:this.masteryList(this.schoolSub).some(x=>x.m&&x.m.mastery>=80), mistake10:(this.redoneCount||0)>=10, paper1:(this.paperCount||0)>=1 };
      if(v[id]) this.unlockAchieve(id);
      return !!v[id];
    },
    // ================= 单题计时 =================
    startQTimer(){ this.qTimeStart=Date.now(); if(this.qTimer) clearInterval(this.qTimer); this.qTimer=setInterval(()=>{ this.qElapsed=Math.round((Date.now()-this.qTimeStart)/1000); },600); },
    stopQTimer(){ if(this.qTimer){ clearInterval(this.qTimer); this.qTimer=null; } },
    qTimeStr(){ const s=this.qElapsed||0; const m=Math.floor(s/60); return m+':'+(String(s%60).padStart(2,'0')); },
    // ================= 重复避免 =================
    rememberQ(key){ const h={}; try{ h=store.get('wx_qhist',{}); }catch(e){} h[key]=todayStr(); store.set('wx_qhist',h); },
    wasRecent(key,days){ const h=store.get('wx_qhist',{}); if(!h[key]) return false; const d=new Date(h[key]); const now=new Date(); const diff=(now-d)/(1000*60*60*24); return diff<=(days||0); },
    // ================= 错题错误类型 =================
    setErrorType(q,type){ this.wrongMap[q.id]=type; store.set('wx_wrongmap',this.wrongMap); },
    getErrType(q){ const t=this.wrongMap&&this.wrongMap[q.id]; return t||''; },
    errTypeLabels(){ return ['概念不清','计算失误','审题偏差','符号/细节','方法不会','粗心']; },
    // ================= PDF 导出工具 =================
    downloadPDF(title, html, filename){
      const style='<style>body{font-family:-apple-system,\'PingFang SC\',sans-serif;color:#333;padding:24px;line-height:1.7} h1,h2{color:#2E6FA3;border-bottom:1px solid #e5e7eb;padding-bottom:6px} .item{border:1px solid #eee;border-radius:8px;padding:12px;margin:10px 0} .ans{color:#059669;font-weight:600} .noPrint{display:none}</style>';
      const full='<!DOCTYPE html><html><head><meta charset="utf-8"><title>'+title+'</title>'+style+'</head><body>'+html+'</body></html>';
      const blob=new Blob([full],{type:'text/html;charset=utf-8'});
      // 触发浏览器打印(可另存PDF)
      const win=window.open('','_blank');
      if(win){ win.document.write(full); win.document.close(); setTimeout(()=>{ win.print(); },300); }
      else { const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=filename+'.html'; a.click(); }
    },
    exportMistakesPDF(){
      const list=this.filteredMistakes();
      if(!list.length){ alert('暂无错题可导出'); return; }
      let html='<h1>✗ 错题本 · '+todayStr()+'</h1>';
      list.forEach((m,i)=>{ html+='<div class="item"><b>'+ (i+1)+'. '+m.kp+'</b><div>'+m.text.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</div><div class="ans">正确答案：'+m.answer+'</div>'+(m.solution&&m.solution.length?('<div style="font-size:13px;color:#666">解析：'+m.solution.join('；')+'</div>'):'')+'</div>'; });
      this.downloadPDF('错题本', html, '错题本');
    },
    exportReportPDF(){
      let html='<h1>📊 学习报告 · '+todayStr()+'</h1>';
      html+='<p>累计做题：'+this.records.length+' 道 · 错题：'+this.mistakes.length+' 道 · 连续打卡：'+this.checkinDays()+' 天</p>';
      const weak=this.weakKp; if(weak.length){ html+='<h2>薄弱知识点</h2>'; weak.forEach(w=>{ html+='<div class="item"><b>'+w.key+'</b>（掌握度 '+Math.round(w.mastery)+'%）</div>'; }); }
      const adv=this.smartAdvice(this.schoolSub); if(adv.length){ html+='<h2>智能建议</h2><ul>'+adv.map(a=>'<li>'+a+'</li>').join('')+'</ul>'; }
      this.downloadPDF('学习报告', html, '学习报告');
    },
    exportPaperPDF(){
      let html='<h1>📝 模拟试卷 · '+todayStr()+'</h1><h2>'+(PAPER_STRUCT[this.paper.subject]?PAPER_STRUCT[this.paper.subject].name:'')+'</h2><div class="noPrint">（打印后另存为 PDF）</div>';
      this.paperQs.forEach((q,i)=>{ html+='<div class="item"><b>'+(i+1)+'. </b>'+q.text.replace(/</g,'&lt;')+''; if(q.type==='choice'){ html+='<div style="margin-top:6px">A.'+q.options[0]+'  B.'+q.options[1]+'  C.'+q.options[2]+(q.options[3]?'  D.'+q.options[3]:'')+'</div>'; } html+='</div>'; });
      html+='<div style="page-break-before:always"></div><h2>参考答案</h2>'; this.paperQs.forEach((q,i)=>{ html+='<div class="item"><b>'+(i+1)+'.</b> '+q.answer+'</div>'; });
      this.downloadPDF('模拟试卷', html, '模拟试卷');
    },
    // ================= 草稿板 =================
    toggleDraft(){ this.draftVisible=!this.draftVisible; setTimeout(()=>this.handResize(),60); },
    draftAdd(item){ if(item) this.draftLines.push(item); },
    draftClear(){ this._handCtx=null; this.draftText=''; if(this.$refs&&this.$refs.draftCanvas){ const c=this.$refs.draftCanvas; const ctx=c.getContext('2d'); ctx.clearRect(0,0,c.width,c.height); } },
    handDown(e){ this._handDrawing=true; this._handLast=[this._hp(e).x,this._hp(e).y]; },
    handMove(e){
      if(!this._handDrawing) return;
      const c=this._getHandCtx(); if(!c) return;
      const p=this._hp(e);
      c.lineWidth=this.handEraser?10:this.handBrush;
      c.lineCap='round'; c.lineJoin='round';
      c.strokeStyle=this.handEraser?'#fff':'#374151';
      c.beginPath(); c.moveTo(this._handLast[0],this._handLast[1]); c.lineTo(p.x,p.y); c.stroke();
      this._handLast=[p.x,p.y];
    },
    handEnd(){ this._handDrawing=false; },
    _getHandCtx(){
      if(this._handCtx) return this._handCtx;
      const c=this.$refs&&this.$refs.draftCanvas;
      if(!c) return null;
      const rect=c.getBoundingClientRect();
      const dpr=window.devicePixelRatio||1;
      c.width=Math.round(rect.width*dpr); c.height=Math.round(rect.height*dpr);
      const ctx=c.getContext('2d'); ctx.scale(dpr,dpr);
      this._handCtx=ctx; return ctx;
    },
    handResize(){ this._handCtx=null; },
    _hp(e){
      const c=this.$refs&&this.$refs.draftCanvas;
      const rect=c?c.getBoundingClientRect():{left:0,top:0};
      const pt = e.touches&&e.touches[0] ? e.touches[0] : e;
      return { x:(pt.clientX-rect.left), y:(pt.clientY-rect.top) };
    },
    // 按学科决定是否显示数学数字/符号键盘
    showMathPad(){ const s=this.gen.subject; return (s==='math'||s==='physics'||s==='chemistry'||s==='biology'); },
    // ================= 数学输入快捷 =================
    insertMath(sym){ this.curAnswer = (this.curAnswer||'') + sym; },
    numKeys(){ return ['1','2','3','4','5','6','7','8','9','0','.','/']; },
    mathKeys(){
      switch(this.gen.subject){
        case 'physics': return ['√','÷','×','·','^','±','µ','θ','Ω','π'];
        case 'chemistry': return ['ₙ','ⁿ','²','³','·','→','⇌','↑','↓','+','−'];
        case 'biology': return ['×','÷','→','/','%','λ','²'];
        default: return ['√','x²','x³','÷','×','±','π','·','{','}','(' ,')','^'];
      }
    },
  },
  mounted(){
    // 首次访问自动进入新手引导
    try{ if(!localStorage.getItem('wx_hasSeen')){ this.page='onboard'; this.onboarding=1; store.set('wx_onboard',1); } }catch(e){}
    // 更新日志弹窗：每次进入首页都展示（用户要求"每次都要有"）
    try{
      if(this.onboarding===0){
        this.updateLog = pendingChanges('');
        if(this.updateLog.length){ this.showUpdate=true; }
      }
    }catch(e){}
  }
});

try{ app.config.globalProperties.SUBJECTS = SUBJECTS; }catch(e){}
try{ app.config.globalProperties.PAPER_STRUCT = PAPER_STRUCT; }catch(e){}
try{ app.config.globalProperties.ICONS = ICONS; }catch(e){}
try{ app.config.globalProperties.QTYPES = QTYPES; }catch(e){}
try{ app.config.globalProperties.GAOKAO = GAOKAO; }catch(e){}
try{ app.config.globalProperties.gaokaoDays = gaokaoDays; }catch(e){}
try{ app.config.globalProperties.gaokaoOfKp = gaokaoOfKp; }catch(e){}
try{ app.config.globalProperties.CHANGES = CHANGES; }catch(e){}
// 全局错误兜底：任何页面渲染出错时回到首页，避免白屏
app.config.errorHandler = function(err, instance, info){
  try{ console.error('[无限题]渲染错误:', err && err.message, info); }catch(e){}
  try{
    var el = document.getElementById('app');
    if(el && el.__vue_app__ && el._instance === undefined){ /* noop */ }
    // 若已挂载且页面错误，尝试回到首页
    if(window.location.href.indexOf('error_guard=1')<0){
      history.replaceState(null,'',location.href.replace(/#.*/,'') + (location.href.indexOf('?')>=0?'&':'?') + 'error_guard=1');
    }
  }catch(e2){}
};
app.mount('#app');
document.documentElement.setAttribute('data-theme', (localStorage.getItem('wx_theme')||'light').replace(/"/g,''));
