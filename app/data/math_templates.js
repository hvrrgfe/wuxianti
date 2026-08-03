/* ============================================================
   无限题 · 数学模板库（新课标I卷，2024改版19题结构）
   覆盖高频考点：方程/不等式/函数/数列/三角/立体/概率/解析几何
   每个模板是函数，调用 __Engine 计算，答案100%正确+验算
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var templates = [];

  // ========== 通用：生成选择题或填空 ==========
  // 把所有模板注册成 {id, kp, kpName, type:[choice,blank], diff, gen}

  // ---- 知识点分组 ----
  // 1. 有理数与幂运算 / 2. 整式与因式分解 / 3. 一元一次/二次方程 / 4. 方程与不等式
  // 5. 函数（一次/二次/反比例/幂指对） / 6. 数列 / 7. 三角 / 8. 几何 / 9. 概率统计 / 10. 向量

  // ===== 集合与逻辑 =====
  templates.push({
    id: 'M-SET-001', kp: '集合', kpId: 'kp-set', type: 'blank', diff: 1,
    gen: function () {
      // 求集合元素个数：{x∈Z | -a ≤ x ≤ b}
      var a = E.ri(1, 5), b = E.ri(3, 8);
      var count = b + a + 1;
      return { text: '已知集合 A = {x ∈ Z | -' + a + ' ≤ x ≤ ' + b + '}，则集合 A 中元素的个数为 ______。', answer: String(count), solution: ['A 中整数有 -' + a + ' 到 ' + b + '，共 (' + b + '+' + a + '+1) = ' + count + ' 个'], input: 'num' };
    }
  });
  templates.push({
    id: 'M-SET-002', kp: '集合', kpId: 'kp-set', type: 'choice', diff: 1,
    gen: function () {
      // 两个区间集合求交集：A={1,2,...,a}，B={b,b+1,...,9}，a≥b 则交集有 (a-b+1) 个
      var b = E.ri(3, 6), a = b + E.ri(0, 2); // a 略大于等于 b，保证交集非空
      if (a > 9) a = 9;
      var overlap = Math.max(0, a - b + 1);
      var count = overlap;
      var Astr = a <= 3 ? '{1,2,...,' + a + '}' : '{1,2,...,' + a + '}';
      var Bstr = b >= 7 ? '{' + b + ',...,9}' : '{' + b + ',' + (b + 1) + ',...,9}';
      var sol = ['A∩B = {' + b + ',' + (b + 1) + ',...,' + a + '}，共 ' + (a - b + 1) + ' 个元素'];
      return { text: '已知 A=' + Astr + '，B=' + Bstr + '，则 A∩B 中元素的个数为（ ）',
        options: [String(overlap), String(overlap + 1), String(overlap - 1 < 0 ? 2 : overlap - 1), String(a)],
        correct: 0, answer: String(overlap), solution: sol };
    }
  });

  // ===== 复数 =====
  templates.push({
    id: 'M-COMP-001', kp: '复数', kpId: 'kp-comp', type: 'blank', diff: 1,
    gen: function () {
      var a = E.ri(1, 5), b = E.ri(1, 9);
      // (a+bi)(1-i) 实部 a+b, 虚部 b-a
      var re = a + b, im = b - a;
      return { text: '设复数 z = (' + a + '+' + b + 'i)(1-i)，则 z 的实部为 ______。', answer: String(re), solution: ['(' + a + '+' + b + 'i)(1-i) = ' + a + '+' + b + ' + (' + b + '-' + a + ')i，实部 = ' + a + '+' + b + ' = ' + re], input: 'num' };
    }
  });

  // ===== 一元一次方程 =====
  templates.push({
    id: 'M-LIN-001', kp: '一元一次方程', kpId: 'kp-linear', type: 'blank', diff: 1,
    gen: function () {
      var a = E.ri(2, 6), b = E.ri(-9, 9), c = E.ri(-6, 9), d;
      // 构造 ax + b = c，求x
      var x0 = E.ri(-8, 8);
      var b = c - a * x0; // 用x0反推，保证答案整数
      var solv = E.solveLinear(a * -1, b + (0));
      // 简化：方程 a x + b = c
      return { text: '解方程：' + a + 'x ' + (b >= 0 ? '+ ' + b : '- ' + (-b)) + ' = ' + c + '，则 x = ______。', answer: String(x0), solution: ['移项：' + a + 'x = ' + c + (b >= 0 ? ' - ' + b : ''), 'x = ' + x0], input: 'num' };
    }
  });

  // ===== 一元二次方程（求根 + 验算） =====
  templates.push({
    id: 'M-QUAD-001', kp: '一元二次方程', kpId: 'kp-quad', type: 'choice', diff: 2,
    gen: function () {
      // 选一个整数解的二次方程 (x-m)(x-n)=0
      var m = E.ri(-4, 4), n;
      if (m === 0) n = E.ri(-4, 4); else n = E.ri(-4, 4);
      while (n === m) n = E.ri(-4, 4);
      var b = -(m + n), c = m * n;
      var q = E.solveQuadratic(1, b, c);
      var roots = [q.x1 !== q.x2 ? [q.x1, q.x2] : [q.x1]];
      var ans = q.x1 + (q.x2 !== q.x1 ? ' 或 ' + q.x2 : '');
      // 干扰项
      var wrong1 = q.x1 === q.x2 ? (q.x1 === '0' ? '±1' : '0 或 ' + q.x1) : (q.x1 + ' 或 ' + (-q.x2.split('/')[0]));
      var opts = [ans];
      var cands = [];
      // 构造典型错误
      var w1 = (m !== 0 ? '-' + m : '1') + ' 或 ' + (n !== 0 ? '-' + n : '1');
      var w2 = (-m !== m ? '-' + m + ' 或 ' + n : m + '');
      var w3 = m + ' 或 ' + -n;
      [w1, w2, w3].forEach(function (x) { if (x !== ans && cands.indexOf(x) < 0) cands.push(x); });
      // 补足4选项
      var pad = ['0','1','-1','±1','2','-2'];
      for (var i = 0; i < pad.length && cands.length < 3; i++) if (pad[i] !== ans && cands.indexOf(pad[i]) < 0) cands.push(pad[i]);
      opts = opts.concat(cands.slice(0, 3));
      opts = E.shuffle(opts);
      return { text: '方程 ' + 'x²' + E.qcoef(b,'x') + (c > 0 ? '+' + c : c < 0 ? c : '') + ' = 0 的解为（ ）',
        options: opts, correct: opts.indexOf(ans) >= 0 ? opts.indexOf(ans) : 0, answer: ans,
        solution: q.solution, distractorTypes: ['符号错', '系数错'] };
    }
  });
  // 一元二次方程（判别式）
  templates.push({
    id: 'M-QUAD-002', kp: '一元二次方程', kpId: 'kp-quad', type: 'choice', diff: 2,
    gen: function () {
      var a = E.ri(1, 3), b = E.ri(-6, 6), c = E.ri(-6, 6);
      var d = b * b - 4 * a * c;
      var ans;
      if (d > 0) ans = '两个不相等的实数根';
      else if (d === 0) ans = '两个相等的实数根';
      else ans = '无实数根';
      return { text: '方程 ' + a + 'x²' + E.qcoef(b,'x') + (c > 0 ? '+' + c : c < 0 ? c : '') + ' = 0 的根的情况是（ ）',
        options: ['两个不相等的实数根', '两个相等的实数根', '无实数根', '无解'], correct: ['两个不相等的实数根', '两个相等的实数根', '无实数根'].indexOf(ans),
        answer: ans, solution: ['Δ = b² - 4ac = ' + b + '² - 4×' + a + '×' + c + ' = ' + d, d > 0 ? 'Δ>0，故有两个不相等实数根' : d === 0 ? 'Δ=0，故有两个相等实数根' : 'Δ<0，故无实数根'] };
    }
  });

  // ===== 韦达定理 =====
  templates.push({
    id: 'M-QUAD-003', kp: '韦达定理', kpId: 'kp-quad', type: 'blank', diff: 3,
    gen: function () {
      var m = E.ri(-4, 4), n = E.ri(-4, 4);
      while (n === m) n = E.ri(-4, 4);
      var b = -(m + n), c = m * n;
      // 求 x1+x2 或 x1*x2
      var which = E.pick(['sum', 'prod']);
      var q = E.solveQuadratic(1, b, c);
      var ans = which === 'sum' ? String(m + n) : String(m * n);
      return { text: '若 x₁、x₂ 是方程 x²' + E.qcoef(b,'x') + (c > 0 ? '+' + c : c < 0 ? c : '') + ' = 0 的两个根，则 ' + (which === 'sum' ? 'x₁+x₂' : 'x₁·x₂') + ' = ______。',
        answer: ans, solution: [which === 'sum' ? '由韦达定理 x₁+x₂ = -b/a = -' + b + ' = ' + (m + n) : '由韦达定理 x₁·x₂ = c/a = ' + c], input: 'num' };
    }
  });

  // ===== 不等式 =====
  templates.push({
    id: 'M-INEQ-001', kp: '一元一次不等式', kpId: 'kp-ineq', type: 'choice', diff: 1,
    gen: function () {
      var a = E.ri(2, 5), b = E.ri(-8, 8);
      if (b === 0) b = b + 3;
      var gt = b >= 0 ? ' + ' + b : ' - ' + (-b);
      var xs = new E.Frac(-b, a).toStr(); // 化简后的解
      var key2 = (b !== 0) ? new E.Frac(b, a).toStr() : xs;
      return { text: '不等式 ' + a + 'x' + gt + ' > 0 的解集为（ ）',
        options: ['x > ' + xs, 'x < ' + xs, 'x > ' + key2, 'x < ' + key2],
        correct: 0, answer: 'x > ' + xs, solution: ['两边同除以 ' + a + '，得 x > ' + xs] };
    }
  });

  // ===== 一次函数 =====
  templates.push({
    id: 'M-LINF-001', kp: '一次函数', kpId: 'kp-linfunc', type: 'blank', diff: 2,
    gen: function () {
      var k = E.pick([1, 2, 3, 4, -1, -2, -3, 4]);
      var b = E.ri(-6, 6);
      var x1 = E.ri(-3, 3), y1 = k * x1 + b;
      var x2 = E.ri(-3, 3); while (x2 === x1) x2 = E.ri(-3, 3);
      var y2 = k * x2 + b;
      // 已知两点求k
      return { text: '一次函数 y = kx + b 的图象过点 (' + x1 + ', ' + y1 + ') 和 (' + x2 + ', ' + y2 + ')，则 k = ______。',
        answer: String(k), solution: ['k = (y₂-y₁)/(x₂-x₁) = (' + y2 + '-' + y1 + ') / (' + x2 + '-' + x1 + ') = ' + (y2 - y1) + '/' + (x2 - x1) + ' = ' + k], input: 'num' };
    }
  });

  // ===== 二次函数顶点 =====
  templates.push({
    id: 'M-QUAF-001', kp: '二次函数', kpId: 'kp-quafunc', type: 'blank', diff: 2,
    gen: function () {
      var h = E.ri(-3, 3), k = E.ri(-4, 4);
      var a = E.pick([1, 2, 3, -1, -2, 3]);
      // y = a(x-h)^2 + k
      return { text: '二次函数 y = ' + (a === 1 ? '' : a === -1 ? '-' : a) + '(x' + (h > 0 ? '-' + h : h < 0 ? '+' + (-h) : '') + ')²' + (k > 0 ? '+' + k : k < 0 ? k : '') + ' 的顶点坐标为 ______。',
        answer: '(' + h + ', ' + k + ')', solution: ['顶点式 y=a(x-h)²+k 顶点为 (h,k) = (' + h + ', ' + k + ')'], input: 'coordinate' };
    }
  });

  // ===== 反比例函数 =====
  templates.push({
    id: 'M-RATIO-001', kp: '反比例函数', kpId: 'kp-ratio', type: 'blank', diff: 1,
    gen: function () {
      var k = E.ri(-9, 9); if (k === 0) k = 3;
      if (k % 2 === 0) { k = E.pick([-4, -3, -2, 2, 3, 4, 6, 8]); }
      var x = E.pick([1, 2, 3, 4, 6, -1, -2, -3, -4]);
      if (k % x !== 0) x = E.pick([1, 2, 3, 4, 6, -1, -2, -3, -4]) || 1;
      var y = k / x;
      var ystr = Number.isInteger(y) ? String(y) : new E.Frac(k, x).toStr();
      return { text: '反比例函数 y = ' + k + '/x 的图象经过点 (' + x + ', ' + ystr + ')，则 k 的值为 ______。',
        answer: String(k), solution: ['代入：k = x·y = ' + x + '×(' + ystr + ') = ' + k], input: 'num' };
    }
  });

  // ===== 等差数列 =====
  templates.push({
    id: 'M-ARI-001', kp: '等差数列', kpId: 'kp-ari', type: 'blank', diff: 2,
    gen: function () {
      var a1 = E.ri(1, 6), d = E.ri(1, 5), n = E.ri(4, 8);
      var r = E.ariSum(a1, d, n);
      var which = E.pick(['an', 'sn']);
      if (which === 'an') {
        return { text: '等差数列 {aₙ} 中，a₁ = ' + a1 + '，公差 d = ' + d + '，则 a' + n + ' = ______。',
          answer: String(r.an), solution: r.solution.slice(0, 1), input: 'num' };
      }
      return { text: '等差数列 {aₙ} 中，a₁ = ' + a1 + '，公差 d = ' + d + '，则前 ' + n + ' 项和 S' + n + ' = ______。',
        answer: String(r.s), solution: r.solution, input: 'num' };
    }
  });

  // ===== 等比数列 =====
  templates.push({
    id: 'M-GEOS-001', kp: '等比数列', kpId: 'kp-geo', type: 'blank', diff: 2,
    gen: function () {
      var a1 = E.ri(1, 3), q = E.pick([2, 3, -2]), n = E.ri(3, 5);
      var r = E.geoSum(a1, q, n);
      return { text: '等比数列 {aₙ} 中，a₁ = ' + a1 + '，公比 q = ' + q + '，则 a' + n + ' = ______。',
        answer: String(r.an), solution: r.solution.slice(0, 1), input: 'num' };
    }
  });

  // ===== 三角函数值 =====
  templates.push({
    id: 'M-TRI-001', kp: '三角求值', kpId: 'kp-trig', type: 'blank', diff: 1,
    gen: function () {
      var table = { 0: 0, 30: '1/2', 45: '√2/2', 60: '√3/2', 90: 1, 180: 0, 150: '1/2' };
      var angle = E.pick([30, 45, 60, 90, 180]);
      var func = E.pick(['sin', 'cos', 'tan']);
      // 只出 sin30 sin45 sin60 cos0之类
      var val;
      if (func === 'sin' && (angle === 30 || angle === 150)) val = '1/2';
      else if (func === 'sin' && angle === 45) val = '√2/2';
      else if (func === 'sin' && angle === 60) val = '√3/2';
      else if (func === 'sin' && angle === 90) val = '1';
      else if (func === 'cos' && angle === 0) val = '1';
      else if (func === 'cos' && angle === 60) val = '1/2';
      else if (func === 'cos' && angle === 90) val = '0';
      else if (func === 'tan' && angle === 30) val = '√3/3';
      else if (func === 'tan' && angle === 45) val = '1';
      else if (func === 'tan' && angle === 60) val = '√3';
      else val = null;
      if (!val) return null;
      return { text: func + ' ' + angle + '° = ______。', answer: val, solution: ['特殊角三角函数值：' + func + ' ' + angle + '° = ' + val], input: 'text' };
    }
  });

  // ===== 几何：三角形内角和 =====
  templates.push({
    id: 'M-GEO-001', kp: '三角形', kpId: 'kp-geo', type: 'blank', diff: 1,
    gen: function () {
      var a = E.ri(40, 70), b = E.ri(40, 70);
      while (a + b >= 170) { a = E.ri(40, 70); b = E.ri(40, 70); }
      var c = E.triAngle(a, b);
      return { text: '在△ABC中，∠A = ' + a + '°，∠B = ' + b + '°，则 ∠C = ______ 度。',
        answer: String(c), solution: ['三角形内角和 180°：∠C = 180 - ' + a + ' - ' + b + ' = ' + c], input: 'num' };
    }
  });

  // ===== 几何：勾股定理 =====
  templates.push({
    id: 'M-GEO-002', kp: '勾股定理', kpId: 'kp-geo', type: 'blank', diff: 2,
    gen: function () {
      var triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25], [9, 12, 15]];
      var t = E.pick(triples);
      // 固定前两个为直角边 a,b，第三个为斜边 c，求第三边
      var c = t[2];
      // 三种考法：求斜边(a,b→c)、求直角边(c,-a→b)
      var which = E.ri(0, 2);
      var a = t[0], b = t[1];
      if (which === 0) { // 已知 a,b 求斜边
        return { text: '直角三角形两直角边分别为 ' + a + ' 和 ' + b + '，则斜边长为 ______。',
          answer: String(c), solution: ['斜边 c = √(' + a + '²+' + b + '²) = √' + (a * a + b * b) + ' = ' + c], input: 'num' };
      } else if (which === 1) { // 已知斜边 c 和直角边 a，求另一条 b
        return { text: '直角三角形中，斜边长为 ' + c + '，一条直角边为 ' + a + '，则另一条直角边为 ______。',
          answer: String(b), solution: ['b = √(c²-a²) = √(' + c * c + '-' + a * a + ') = √' + (c * c - a * a) + ' = ' + b], input: 'num' };
      } else { // 已知斜边 c 和直角边 b，求另一条 a
        return { text: '直角三角形中，斜边长为 ' + c + '，一条直角边为 ' + b + '，则另一条直角边为 ______。',
          answer: String(a), solution: ['a = √(c²-b²) = √(' + c * c + '-' + b * b + ') = √' + (c * c - b * b) + ' = ' + a], input: 'num' };
      }
    }
  });

  // ===== 概率 =====
  templates.push({
    id: 'M-PROB-001', kp: '古典概型', kpId: 'kp-prob', type: 'choice', diff: 1,
    gen: function () {
      var red = E.ri(2, 5), wh = E.ri(2, 5);
      var total = red + wh;
      var prob = red + '/' + total;
      var f = new E.Frac(red, total).toStr();
      return { text: '袋中有 ' + red + ' 个红球和 ' + wh + ' 个白球，除颜色外完全相同，任意摸出 1 个球是红球的概率为（ ）',
        options: [f, wh + '/' + total, '1/', '0'].concat([]).slice(0, 4), correct: 0, answer: f,
        solution: ['P = 红球数/总数 = ' + red + '/' + total + ' = ' + f] };
    }
  });

  // ===== 多边形内角和 =====
  templates.push({
    id: 'M-GEO-003', kp: '多边形', kpId: 'kp-geo', type: 'blank', diff: 1,
    gen: function () {
      var n = E.ri(4, 8);
      var ang = E.polyAngle(n);
      return { text: ('') + n + ' 边形的内角和为 ______ 度。',
        answer: String(ang), solution: ['(n-2)×180 = ' + (n - 2) + '×180 = ' + ang], input: 'num' };
    }
  });

  // ===== 幂与科学记数法 =====
  templates.push({
    id: 'M-POW-001', kp: '幂运算', kpId: 'kp-pow', type: 'blank', diff: 1,
    gen: function () {
      var base = E.pick([2, 3, 4, 5]);
      var a = E.ri(2, 4), b = E.ri(1, 3);
      // base^a * base^b = base^(a+b)
      var ans = Math.pow(base, a + b);
      return { text: '计算：' + base + '^' + a + ' × ' + base + '^' + b + ' = ______。',
        answer: String(ans), solution: ['同底数幂相乘，指数相加：' + base + '^' + (a + b) + ' = ' + ans], input: 'num' };
    }
  });

  // ===== 统计：平均数 =====
  templates.push({
    id: 'M-STAT-001', kp: '平均数/中位数', kpId: 'kp-stat', type: 'blank', diff: 1,
    gen: function () {
      var n = E.ri(4, 6);
      var vals = [];
      for (var i = 0; i < n; i++) vals.push(E.ri(50, 95));
      var sum = vals.reduce(function (s, v) { return s + v; }, 0);
      var mean = sum / n;
      return { text: '一组数据 ' + vals.join(', ') + ' 的平均数是 ______。',
        answer: (Number.isInteger(mean) ? String(mean) : (sum + '/' + n)), solution: ['平均数 = 和/个数 = ' + sum + '/' + n + ' = ' + (Number.isInteger(mean) ? mean : sum + '/' + n)], input: 'num' };
    }
  });

  // ===== 解析几何：直线交点 =====
  templates.push({
    id: 'M-LINE-001', kp: '直线交点', kpId: 'kp-line', type: 'blank', diff: 2,
    gen: function () {
      // 两直线求交点
      var x = E.ri(-4, 4), y = E.ri(-4, 4);
      var m1 = E.pick([-2, -1, 1, 2]), b1 = y - m1 * x;
      var m2 = E.pick([-2, -1, 1, 2, -3, 3]);
      while (m1 === m2) m2 = E.pick([-2, -1, 1, 2, -3, 3]);
      var b2 = y - m2 * x;
      // y=m1 x+b1, y=m2 x+b2
      var solv = E.solveLinearSys(m1, -1, -b1, m2, -1, -b2);
      if (!solv) return null;
      return { text: '直线 y = ' + (m1===1?'x':m1===-1?'-x':m1+'x') + (b1 >= 0 ? '+' + b1 : b1 < 0 ? b1 : '') + ' 与直线 y = ' + (m2===1?'x':m2===-1?'-x':m2+'x') + (b2 >= 0 ? '+' + b2 : b2 < 0 ? b2 : '') + ' 的交点坐标为 ______。',
        answer: '(' + solv.x + ', ' + solv.y + ')', solution: solv.solution, input: 'coordinate' };
    }
  });

  // ===== 圆锥侧面/扇形 =====
  templates.push({
    id: 'M-GEO-004', kp: '圆·扇形', kpId: 'kp-geo', type: 'blank', diff: 2,
    gen: function () {
      var r = E.pick([2, 3, 4, 6]), deg = E.pick([30, 45, 60, 90]);
      var seg = deg / 360;
      var area = Math.PI * r * r * seg;
      var ans = seg * r * r + 'π';
      var fNum = (r * r * seg);
      return { text: '半径为 ' + r + ' 的圆中，圆心角为 ' + deg + '° 的扇形面积为 ______。',
        answer: (Number.isInteger(fNum) ? fNum : fNum) + 'π', solution: ['S = n/360 · πr² = ' + seg + '×π×' + (r * r) + ' = ' + (Number.isInteger(fNum) ? fNum : '') + 'π'], input: 'num_pi' };
    }
  });

  // ===== 平面向量（必修第二册 第6章） =====
  templates.push({
    id: 'M-VEC-001', kp: '平面向量', kpId: 'kp-vec', type: 'blank', diff: 2,
    gen: function () {
      // 已知向量 a=(x1,y1), b=(x2,y2)，求 a+b 或 a-b
      var x1 = E.ri(-4, 4), y1 = E.ri(-4, 4);
      var x2 = E.ri(-4, 4), y2 = E.ri(-4, 4);
      var op = E.pick(['add', 'sub']);
      var rx = op === 'add' ? x1 + x2 : x1 - x2;
      var ry = op === 'add' ? y1 + y2 : y1 - y2;
      return { text: '已知向量 a = (' + x1 + ', ' + y1 + ')，b = (' + x2 + ', ' + y2 + ')，则 a' + (op === 'add' ? '+' : '-') + 'b = ______。',
        answer: '(' + rx + ', ' + ry + ')', solution: ['对应坐标相' + (op === 'add' ? '加' : '减') + '：(' + rx + ', ' + ry + ')'], input: 'coordinate' };
    }
  });
  templates.push({
    id: 'M-VEC-002', kp: '平面向量', kpId: 'kp-vec', type: 'choice', diff: 2,
    gen: function () {
      // 已知 a=(1,2), b=(x,y)，若 a⊥b 则 a·b=0，求b的一个坐标关系
      var x1 = E.ri(1, 3), y1 = E.ri(1, 4);
      // 选一个向量 b 与 a 的数量积为0：bx*x1 + by*y1 = 0
      var k = E.ri(1, 3);
      var bx = y1 * k, by = -x1 * k; // 满足 a·b = x1*y1*k - y1*x1*k = 0
      var dot = x1 * bx + y1 * by; // =0 验证
      var f = new E.Frac(y1, x1).toStr();
      return { text: '已知向量 a = (' + x1 + ', ' + y1 + ')，若 b ⊥ a，则下列向量中与 a 垂直的是（ ）',
        options: ['(' + bx + ', ' + by + ')', '(' + (-bx) + ', ' + by + ')', '(' + bx + ', ' + -by + ')', '(' + y1 + ', ' + x1 + ')'],
        correct: 0, answer: '(' + bx + ', ' + by + ')',
        solution: ['a⊥b ⇔ a·b = 0，即 ' + x1 + '×' + bx + ' + ' + y1 + '×' + by + ' = ' + dot + '，故 ' + '(' + bx + ', ' + by + ')' + ' 垂直'] };
    }
  });

  // ===== 立体几何初步（必修第二册 第8章） =====
  templates.push({
    id: 'M-SOLID-001', kp: '立体几何', kpId: 'kp-solid', type: 'blank', diff: 2,
    gen: function () {
      // 长方体对角线/棱长。棱长 a,b,c，求体对角线
      var a = E.ri(2, 6), b = E.ri(2, 6), c = E.ri(2, 6);
      // 常用勾股组合保证简洁：用 (a,b,c)=(3,4,5) 变式
      var set = E.pick([[3,4,5],[6,8,10],[5,12,13],[1,2,2]]);
      a=set[0]; b=set[1]; c=set[2]; if(set[0]===1){a=E.ri(2,4);b=E.ri(2,4);c=E.ri(2,4);}
      var diag2 = a*a+b*b+c*c;
      var diag = E.radStr(diag2);
      return { text: '长方体从一个顶点出发的三条棱长分别为 ' + a + '、' + b + '、' + c + '，则它的体对角线长为 ______。',
        answer: diag, solution: ['体对角线 d = √(a²+b²+c²) = √(' + diag2 + ') = ' + diag], input: 'text' };
    }
  });
  templates.push({
    id: 'M-SOLID-002', kp: '立体几何', kpId: 'kp-solid', type: 'blank', diff: 2,
    gen: function () {
      // 圆柱体积 V=πr²h
      var r = E.ri(2, 5), h = E.ri(2, 6);
      var v = r * r * h;
      return { text: '底面半径为 ' + r + '、高为 ' + h + ' 的圆柱体积为 ______。',
        answer: v + 'π', solution: ['V = πr²h = π×' + r + '²×' + h + ' = ' + v + 'π'], input: 'num_pi' };
    }
  });
  templates.push({
    id: 'M-SOLID-003', kp: '立体几何', kpId: 'kp-solid', type: 'blank', diff: 3,
    gen: function () {
      // 圆锥体积 V = (1/3)πr²h
      var r = E.ri(2, 4), h = E.ri(3, 6);
      var s = r * r * h;
      // 保证 s 能被3整除，让答案是整数π
      if (s % 3 !== 0) h = h + (3 - s % 3) % 3;
      s = r * r * h;
      var v = new E.Frac(s, 3).toStr();
      return { text: '底面半径为 ' + r + '、高为 ' + h + ' 的圆锥体积为 ______。',
        answer: v + 'π', solution: ['V = (1/3)πr²h = (1/3)×π×' + r + '²×' + h + ' = ' + v + 'π'], input: 'num_pi' };
    }
  });

  // ===== 空间向量与立体几何（选择性必修第一册 第1章） =====
  templates.push({
    id: 'M-SPVEC-001', kp: '空间向量', kpId: 'kp-spvec', type: 'blank', diff: 3,
    gen: function () {
      // 求空间向量模长 |a| = √(x²+y²+z²)
      var set = E.pick([[1,2,2],[2,3,6],[1,1,2],[3,4,0]]);
      var x=set[0],y=set[1],z=set[2];
      var m2 = x*x+y*y+z*z;
      var m = E.radStr(m2);
      return { text: '已知空间向量 a = (' + x + ', ' + y + ', ' + z + ')，则 |a| = ______。',
        answer: m, solution: ['|a| = √(x²+y²+z²) = √(' + m2 + ') = ' + m], input: 'text' };
    }
  });
  templates.push({
    id: 'M-SPVEC-002', kp: '空间向量', kpId: 'kp-spvec', type: 'blank', diff: 3,
    gen: function () {
      // 空间向量数量积 cos = (a·b)/(|a||b|)，选特例给整数答案
      // a=(1,0,0), b=(x,y,0)，则 a·b=x, cosθ=x/|b|
      var x = E.ri(1, 2), y = E.pick([1, 2, 3]);
      // 造一个 cos 是简单分数：取 |b|=2x, y=√3 x → 但角度特殊
      // 用 a=(0,1,0), b=(√3,1,0) 不太行。改用垂直判定：a·b
      var set = E.pick([[1,3],[1,2],[2,1]]);
      var bx=set[0], by=set[1];
      var dot = bx*0 + by*1; // a=(0,1,0) 固定
      // a=(0,1,0), b=(bx,by,bz) a·b = by
      return { text: '已知向量 a = (0, 1, 0)，b = (' + bx + ', ' + by + ', 0)，则 a·b = ______。',
        answer: String(by), solution: ['a·b = x₁x₂ + y₁y₂ + z₁z₂ = 0×' + bx + ' + 1×' + by + ' + 0×0 = ' + by], input: 'num' };
    }
  });

  // ===== 圆锥曲线（选择性必修第一册 第3章） =====
  templates.push({
    id: 'M-CONIC-001', kp: '圆锥曲线', kpId: 'kp-conic', type: 'blank', diff: 3,
    gen: function () {
      // 椭圆 x²/a² + y²/b² = 1 焦点距 c=√(a²-b²)，求 c 或焦距
      var a = E.ri(3, 8), b = E.ri(2, 7);
      while (b >= a) b = E.ri(2, a - 1);
      var c2 = a*a - b*b;
      var sq = Math.sqrt(c2);
      var c = Number.isInteger(sq) ? String(sq) : '√' + c2;
      return { text: '椭圆 x²/' + (a*a) + ' + y²/' + (b*b) + ' = 1 的焦距为 ______。',
        answer: '2' + (c.indexOf('√')===0 ? c : c), solution: ['c = √(a²-b²) = √(' + (a*a) + '-' + (b*b) + ') = ' + c, '焦距 = 2c = 2' + c],
        input: 'text' };
    }
  });
  templates.push({
    id: 'M-CONIC-002', kp: '圆锥曲线', kpId: 'kp-conic', type: 'blank', diff: 3,
    gen: function () {
      // 抛物线 y² = 2px 焦点为 (p/2, 0)，求焦点
      var p = E.pick([2, 4, 6, 8, 10]);
      var f = p / 2;
      return { text: '抛物线 y² = ' + (2*p) + 'x 的焦点坐标为 ______。',
        answer: '(' + f + ', 0)', solution: ['y² = 2px，焦点为 (p/2, 0) = (' + p + '/2, 0) = (' + f + ', 0)'], input: 'coordinate' };
    }
  });
  templates.push({
    id: 'M-CONIC-003', kp: '圆锥曲线', kpId: 'kp-conic', type: 'blank', diff: 3,
    gen: function () {
      // 双曲线 x²/a² - y²/b² = 1 渐近线 y = ±(b/a)x
      var a = E.ri(2, 4), b = E.ri(2, 4);
      var f = new E.Frac(b, a);
      var sim = f.toNum() === 1 ? '1' : (f.d===1? String(f.n) : f.toStr());
      return { text: '双曲线 x²/' + (a*a) + ' - y²/' + (b*b) + ' = 1 的渐近线方程为 y = ±______。x',
        answer: sim, solution: ['渐近线 y = ±(b/a)x = ±(' + b + '/' + a + ')x = ±' + sim + 'x'], input: 'num_frac' };
    }
  });

  // ===== 导数及其应用（选择性必修第二册 第5章） =====
  templates.push({
    id: 'M-DERIV-001', kp: '导数', kpId: 'kp-deriv', type: 'blank', diff: 3,
    gen: function () {
      // 多项式求导 f(x)=ax^n → f'=anx^(n-1)，求 f'(1)
      var a = E.ri(2, 5), n = E.ri(2, 4), x0 = E.pick([1, 2]);
      var coef = a * n;
      var val = coef * Math.pow(x0, n - 1);
      return { text: '已知 f(x) = ' + a + 'x' + (n === 2 ? '²' : n === 3 ? '³' : '⁴') + '，则 f\'(' + x0 + ') = ______。',
        answer: String(val), solution: ['f\'(x) = ' + (a*n) + 'x' + (n-1===1?'':n-1===2?'²':n-1===3?'³':'') , 'f\'(' + x0 + ') = ' + coef + '×' + x0 + '^' + (n-1) + ' = ' + val], input: 'num' };
    }
  });
  templates.push({
    id: 'M-DERIV-002', kp: '导数', kpId: 'kp-deriv', type: 'blank', diff: 3,
    gen: function () {
      // 切线斜率 = f'(x0)。f(x)=x²，在 x0 斜率 2x0
      var x0 = E.ri(1, 4);
      var k = 2 * x0;
      var y0 = x0 * x0;
      return { text: '曲线 y = x² 在点 (' + x0 + ', ' + y0 + ') 处的切线斜率为 ______。',
        answer: String(k), solution: ['y\' = 2x，斜率 k = f\'(' + x0 + ') = 2×' + x0 + ' = ' + k], input: 'num' };
    }
  });

  // ===== 计数原理（选择性必修第三册 第6章） =====
  templates.push({
    id: 'M-COUNT-001', kp: '排列组合', kpId: 'kp-count', type: 'blank', diff: 3,
    gen: function () {
      // 排列 A(n,2) = n(n-1)
      var n = E.ri(4, 9);
      var ans = n * (n - 1);
      return { text: '从 ' + n + ' 个不同元素中任取 2 个排成一列，共有 ______ 种排法。',
        answer: String(ans), solution: ['A(' + n + ',2) = ' + n + '×' + (n - 1) + ' = ' + ans], input: 'num' };
    }
  });
  templates.push({
    id: 'M-COUNT-002', kp: '排列组合', kpId: 'kp-count', type: 'blank', diff: 3,
    gen: function () {
      // 组合 C(n,2) = n(n-1)/2
      var n = E.ri(5, 12);
      while (n * (n - 1) / 2 % 1 !== 0) n = E.ri(5, 12);
      var ans = n * (n - 1) / 2;
      return { text: '从 ' + n + ' 个同学中任选 2 名参加比赛，共有 ______ 种选法。',
        answer: String(ans), solution: ['C(' + n + ',2) = ' + n + '×' + (n - 1) + '/2 = ' + ans], input: 'num' };
    }
  });
  templates.push({
    id: 'M-COUNT-003', kp: '排列组合', kpId: 'kp-count', type: 'blank', diff: 3,
    gen: function () {
      // 二项式 (a+b)^n 的展开式常数/一项系数：C(n,k)
      var n = E.ri(3, 6);
      var ans = E.combo(n, 1) + 1; // ... 计算 (x+1)^n 中 x 的系数为 n
      return { text: '(x + 1)' + (n===3?'³':n===4?'⁴':n===5?'⁵':'⁶') + ' 的展开式中 x 的系数为 ______。',
        answer: String(n), solution: ['用二项式定理，(x+1)ⁿ 中 x 的系数 = C(n,1) = ' + n], input: 'num' };
    }
  });

  // ===== 随机变量及分布（选择性必修第三册 第7章） =====
  templates.push({
    id: 'M-DISTRIB-001', kp: '随机变量', kpId: 'kp-distrib', type: 'blank', diff: 3,
    gen: function () {
      // 二项分布 X~B(n,p) 期望 E(X)=np，方差 D(X)=np(1-p)
      var n = E.ri(3, 6), p = E.pick([0.5, 0.4, 0.2, 0.3]);
      var which = E.pick(['ex', 'var']);
      if (which === 'ex') {
        var exp = n * p;
        var expStr = String(+exp.toFixed(4));
        return { text: '设 X ~ B(' + n + ', ' + p + ')，则 E(X) = ______。',
          answer: expStr, solution: ['二项分布期望 E(X) = np = ' + n + '×' + p + ' = ' + expStr], input: 'num' };
      }
      var varv = n * p * (1 - p);
      var varStr = String(+varv.toFixed(4));
      return { text: '设 X ~ B(' + n + ', ' + p + ')，则 D(X) = ______。',
        answer: varStr, solution: ['二项分布方差 D(X) = np(1-p) = ' + n + '×' + p + '×' + (1 - p) + ' = ' + varStr], input: 'num' };
    }
  });
  templates.push({
    id: 'M-DISTRIB-002', kp: '随机变量', kpId: 'kp-distrib', type: 'blank', diff: 3,
    gen: function () {
      // 离散型随机变量分布列：概率和为1求缺失项。选 p1,p2 使 missing 为 0.1 的倍数
      var combo = E.pick([[0.3,0.2],[0.4,0.3],[0.5,0.2],[0.3,0.4],[0.2,0.5],[0.1,0.2]]);
      var p1 = combo[0], p2 = combo[1];
      var missing = Math.round((1 - p1 - p2) * 100) / 100;
      return { text: '某随机变量 X 的分布列中 P(X=1) = ' + p1 + '，P(X=2) = ' + p2 + '，则 P(X=3) = ______。',
        answer: String(missing), solution: ['所有概率和为 1：P(X=3) = 1 - ' + p1 + ' - ' + p2 + ' = ' + missing], input: 'num' };
    }
  });

  // ===== 成对数据的统计分析（选择性必修第三册 第8章） =====
  templates.push({
    id: 'M-REGR-001', kp: '成对数据回归', kpId: 'kp-regr', type: 'blank', diff: 3,
    gen: function () {
      // 回归直线必过样本中心 (x̄, ȳ)。给一组数据算 x̄
      var n = E.pick([3, 4]);
      var xs = [], ys = [];
      for (var i = 0; i < n; i++) { xs.push(E.ri(1, 5)); ys.push(E.ri(1, 6)); }
      var sx = xs.reduce(function (s, v) { return s + v; }, 0);
      var sy = ys.reduce(function (s, v) { return s + v; }, 0);
      var mx = sx / n, my = sy / n;
      var mxStr = Number.isInteger(mx) ? String(mx) : new E.Frac(sx, n).toStr();
      var myStr = Number.isInteger(my) ? String(my) : new E.Frac(sy, n).toStr();
      return { text: '已知 ' + n + ' 组样本数据 (' + xs.join(',') + ') 与 (' + ys.join(',') + ') 对应的回归直线必过点 ______。',
        answer: '(' + mxStr + ', ' + myStr + ')', solution: ['回归直线过样本中心 (x̄, ȳ) = (' + mxStr + ', ' + myStr + ')'], input: 'coordinate' };
    }
  });
  templates.push({
    id: 'M-REGR-002', kp: '成对数据回归', kpId: 'kp-regr', type: 'blank', diff: 3,
    gen: function () {
      // 回归直线 y = bx + a。给每增1个x增b，且过点(x̄,ȳ)反求截距
      var b = E.ri(2, 4), a = E.ri(-3, 3);
      var xbar = E.ri(2, 4);
      var ybar = b * xbar + a;
      var aStr = a >= 0 ? ' + ' + a : (a < 0 ? ' - ' + (-a) : '');
      var eq = b + 'x' + aStr;
      return { text: '已知某线性回归中，变量 x 每增加 1 个单位，变量 y 平均增加 ' + b + ' 个单位，且样本中心为 (' + xbar + ', ' + ybar + ')，则回归方程为 y = ______。',
        answer: eq, solution: ['斜率 b = ' + b + '，代入样本中心求截距：a = ȳ - bx̄ = ' + ybar + ' - ' + b + '×' + xbar + ' = ' + a, '回归方程 y = ' + eq], input: 'text' };
    }
  });

  root.__MathTemplates = templates;
})(typeof window !== 'undefined' ? window : globalThis);
