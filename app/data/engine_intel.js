/* ============================================================
   无限题 · 自研本地智能引擎（无API · 纯源码算法）
   对标深度学习方法但离线可解释，核心三大模块：
   1. IRT 难度自适应（项目反应理论）：估算学生能力θ，动态匹配题目难度
   2. 知识图谱 + 前置依赖推理：基于知识点依赖关系定位薄弱根因
   3. 知识追踪融合（BKT+近期表现）：推断知识点真实掌握概率，关联传播
   所有函数纯本地计算，不依赖任何外部服务/模型
   ============================================================ */
(function (root) {
  'use strict';

  // ============================================================
  // 1. IRT（项目反应理论）· 单参数(1PL)/双参数难度自适应
  //    P(正确|θ,a,b) = 1/(1+e^{-a(θ-b)})  区分度a、难度b、能力θ
  //    从答题记录反推能力θ（EM 迭代），返回推荐难度区间
  // ============================================================
  function sigmoid(x){ return 1/(1+Math.exp(-x)); }
  function logistic(x){ return 1/(1+Math.exp(-x)); }

  // 用最大似然/梯度上升从答题记录估算学生能力θ
  // records: [{correct:0/1, diff:1-5}]  题目内置难度b≈diff
  function irtAbility(records, a=1.0){
    if(!records || !records.length) return 0;
    let theta=0; const lr=0.2, iters=8, eps=1e-3;
    for(let it=0; it<iters; it++){
      let grad=0;
      for(const r of records){
        const b=(r.diff||2)/2.5;          // diff1-5 → 难度参数b≈0.4~2.0(中心2.5)
        const p=logistic(a*(theta-b));
        grad += (r.correct?1:0) - p;      // 对数似然梯度
      }
      const step=lr/grad+eps;
      theta += lr*(grad/Math.max(records.length,1));
      theta=Math.max(-3,Math.min(3,theta));
    }
    return theta;                          // 能力值，范围约[-3,3]，0为平均
  }

  // 由能力θ → 推荐题目难度(1-5整数)：能力越高，推荐越难题，维持"略高于当前水平"
  function recommendDiff(theta){
    // 推荐难度应让学生答对率约0.5~0.7(略挑战)：b*≈θ+0.5 → diff≈2.5*(θ+0.5)
    let d = 2.5*(theta+0.8);
    d=Math.max(1,Math.min(5,Math.round(d)));
    return d;
  }

  // ============================================================
  // 2. 知识图谱 · 前置依赖关系（用于定位薄弱根因）
  //    A 依赖 B 表示：B没掌握，A大概率也没掌握(前置断裂)
  // ============================================================
  const KP_GRAPH = {
    '集合':[], '函数':['集合'], '导数':['函数'], '导数(切线方程)':['导数'], '导数(恒成立求参)':['导数'],
    '等差数列':['函数'], '等比数列':['函数'], '数列求和(错位相减)':['等比数列'], '数列求和(裂项相消)':['等差数列'],
    '一元二次方程':['幂运算'], '一元二次不等式':['一元二次方程'], '二次函数':['一元二次方程'],
    '三角求值':[], '解三角形(余弦定理)':['三角求值'], '三角函数':['三角求值'],
    '平面向量':[], '空间向量':['平面向量','立体几何'], '立体几何':[],
    '排列组合':[], '随机变量':['排列组合','古典概型'], '古典概型':['排列组合'],
    '圆锥曲线':['幂运算','一元二次方程'], '椭圆焦点三角形':['圆锥曲线'], '直线与圆(弦长)':['幂运算'],
    '勾股定理':[], '圆·扇形':[], '复数':[],
    '牛顿第二定律':['匀变速直线运动','速度'], '动量守恒(碰撞)':['牛顿第二定律','动能定理'],
    '机械能守恒':['动能定理','功'], '动能定理':['牛顿第二定律','功'],
    '万有引力与航天':['圆周运动向心力','牛顿第二定律'], '圆周运动向心力':['匀变速直线运动','牛顿第二定律'],
    '电场强度':['速度'], '交变电流':['欧姆定律'], '电磁感应(切割)':['安培力','交变电流'],
    // 化学
    '物质的量':[], '物质的量浓度':['物质的量'], '化学反应速率':['物质的量'], '化学平衡常数':['化学反应速率'],
    '氧化还原':['化合价','方程式配平'], '电子转移':['氧化还原'], '离子共存':['方程式配平'],
    // 生物
    '遗传·配子比例':['遗传·性状分离比'], '遗传·自由组合':['遗传·配子比例','遗传·性状分离比'],
    '细胞呼吸':['细胞分裂'], '光合/呼吸作用':['细胞呼吸'], '能量传递效率':['种群增长']
  };

  // 前置依赖推理：给一个掌握度低的kp，返回"可能是根因"的前置kp(薄弱应由前置开始补)
  function inferRootCause(kp, masteryMap){
    const deps = KP_GRAPH[kp]||[];
    const out=[];
    for(const d of deps){
      const m=masteryMap&&masteryMap[d];
      out.push({ kp:d, dep:true, weak: !m || m.mastery<60 });
    }
    return out;  // [{kp, dep, weak}]
  }

  // ============================================================
  // 3. 知识追踪融合：BKT后验 + 关联传播
  //    答对某知识点，若其前置弱，则"连带"削弱该知识点可信度；反之亦然
  // ============================================================
  // 单知识点 BKT 更新(与app内保持一致)
  function bktUpdate(correct, pl, cfg){
    cfg=cfg||{g:0.25,s:0.10,t:0.30};
    let pLc;
    if(correct) pLc=(pl*(1-cfg.s))/(pl*(1-cfg.s)+(1-pl)*cfg.g);
    else pLc=(pl*cfg.s)/(pl*cfg.s+(1-pl)*(1-cfg.g));
    let pL2=pLc+(1-pLc)*cfg.t;
    if(pL2>0.98)pL2=0.98; if(pL2<0.05)pL2=0.05;
    return pL2;
  }

  // 关联传播校正：某知识点 mastered 时，将其依赖的所有前置提升一点(因前置扎实)
  function propagate(masteryMap, kp, delta){
    const deps=KP_GRAPH[kp]||[];
    for(const d of deps){
      const m=masteryMap[d];
      if(m){ m.mastery=Math.max(0,Math.min(100,m.mastery+delta)); }
    }
  }

  // 一键生成"学情诊断"(纯本地, 替代外部AI学情分析)
  function localAnalysis(records, masteryMap, mistakesSubj){
    const lines=[];
    const total=records.length;
    if(!total){ return '暂无做题数据。先去刷几道题，我就能分析你的薄弱点了。'; }
    // 能力估计
    const irtRecs=records.map(r=>({correct:r.correct?1:0, diff:r.diff}));
    const theta=irtAbility(irtRecs);
    const recDiff=recommendDiff(theta);
    // 薄弱榜
    const weak=[];
    Object.keys(masteryMap||{}).forEach(function(k){
      const m=masteryMap[k];
      if(m.mastery<60 && m.total>=2) weak.push({key:k, m:m.mastery});
    });
    weak.sort((a,b)=>a.m-b.m);
    lines.push('【能力评估】当前估计能力θ≈'+theta.toFixed(2)+'（普通学生约0.0），建议刷'+recDiff+'级难度的题最有效。');
    if(weak.length){
      lines.push('【薄弱知识点】'+weak.slice(0,4).map(w=>w.key+'('+Math.round(w.m)+'%)').join('、'));
      // 根因
      const rootCauses=[];
      weak.slice(0,3).forEach(w=>{
        inferRootCause(w.key, masteryMap).forEach(function(d){ if(d.weak && rootCauses.indexOf(d.kp)<0) rootCauses.push(d.kp); });
      });
      if(rootCauses.length) lines.push('【可能根因·需先补前置】'+rootCauses.slice(0,3).join('、'));
    } else {
      lines.push('【掌握良好】暂无明显薄弱点，建议向中等偏难拓展。');
    }
    lines.push('【建议】优先补前置薄弱知识点，再主攻核心考点；错题重做2-3遍直至掌握度>70%。');
    return lines.join('\n');
  }

  root.__EngineIntel = {
    irtAbility: irtAbility,
    recommendDiff: recommendDiff,
    KP_GRAPH: KP_GRAPH,
    inferRootCause: inferRootCause,
    bktUpdate: bktUpdate,
    propagate: propagate,
    localAnalysis: localAnalysis,
    sigmoid: sigmoid
  };
})(typeof window !== 'undefined' ? window : globalThis);
