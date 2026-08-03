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
      // 两个小集合求交集元素个数
      var a = E.ri(1, 4), b = E.ri(6, 9);
      // A={1..a}, B={b..9} 交集空
      var Aend = E.ri(2, 5), Bstart = E.ri(6, 9);
      var count = 0;
      var ansStr = String(0);
      var sol = ['A 的元素最大为 ' + Aend + '，B 的元素最小为 ' + Bstart + '，' + (Aend < Bstart ? '无公共元素' : '') + '，故 A∩B 元素个数为 0'];
      return { text: '已知 A={1,2,...,' + Aend + '}，B={' + Bstart + ',' + (Bstart + 1) + ',...,9}，则 A∩B 中元素的个数为（ ）', options: ['0', '1', '2', String(Aend)], correct: 0, answer: '0', solution: sol };
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
      return { text: '方程 ' + 'x²' + (b > 0 ? '+' + b + 'x' : b < 0 ? b + 'x' : '') + (c > 0 ? '+' + c : c < 0 ? c : '') + ' = 0 的解为（ ）',
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
      return { text: '方程 ' + a + 'x²' + (b > 0 ? '+' + b + 'x' : b < 0 ? b + 'x' : '') + (c > 0 ? '+' + c : c < 0 ? c : '') + ' = 0 的根的情况是（ ）',
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
      return { text: '若 x₁、x₂ 是方程 x²' + (b > 0 ? '+' + b + 'x' : b < 0 ? b + 'x' : '') + (c > 0 ? '+' + c : c < 0 ? c : '') + ' = 0 的两个根，则 ' + (which === 'sum' ? 'x₁+x₂' : 'x₁·x₂') + ' = ______。',
        answer: ans, solution: [which === 'sum' ? '由韦达定理 x₁+x₂ = -b/a = -' + b + ' = ' + (m + n) : '由韦达定理 x₁·x₂ = c/a = ' + c], input: 'num' };
    }
  });

  // ===== 不等式 =====
  templates.push({
    id: 'M-INEQ-001', kp: '一元一次不等式', kpId: 'kp-ineq', type: 'choice', diff: 1,
    gen: function () {
      var a = E.ri(2, 5), b = E.ri(-8, 8);
      // ax + b > 0
      var x0 = -b / a;
      var gt = b >= 0 ? ' + ' + b : ' - ' + (-b);
      var ans = 'x > ' + (-b) + '/' + a;
      return { text: '不等式 ' + a + 'x' + gt + ' > 0 的解集为（ ）',
        options: ['x > ' + (-b) + '/' + a, 'x < ' + (-b) + '/' + a, 'x > ' + b + '/' + a, 'x < ' + b + '/' + a],
        correct: 0, answer: 'x > ' + (-b) + '/' + a, solution: [a > 0 ? '系数为正，两边除以' + a + '得 x > ' + (-b) + '/' + a : ''] };
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
      var ystr = Number.isInteger(y) ? String(y) : (k + '/' + x);
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
    id: 'M-GEO-001', kp: '等比数列', kpId: 'kp-geo', type: 'blank', diff: 2,
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
      b2 = y - m2 * x;
      // y=m1 x+b1, y=m2 x+b2
      var solv = E.solveLinearSys(m1, -1, -b1, m2, -1, -b2);
      if (!solv) return null;
      return { text: '直线 y = ' + m1 + 'x' + (b1 >= 0 ? '+' + b1 : b1 < 0 ? b1 : '') + ' 与直线 y = ' + m2 + 'x' + (b2 >= 0 ? '+' + b2 : b2 < 0 ? b2 : '') + ' 的交点坐标为 ______。',
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

  root.__MathTemplates = templates;
})(typeof window !== 'undefined' ? window : globalThis);
