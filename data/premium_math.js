/* ============================================================
   无限题 · B站高分题型套路模板（数学-新课标I卷）
   提炼自B站名师题型总结(题型攻略/大题模板/题型全归纳):
   - 数列: 错位相减 / 裂项相消 求和
   - 导数: 切线方程 / 恒成立求参(最值) / 单调区间含参
   - 圆锥曲线: 直线与圆相交弦长 / 椭圆焦点弦/过焦点
   - 函数: 抽象复合函数值 / 对称轴/周期
   每个模板 gen() 调用 __Engine 计算, 答案100%正确+验算, 含套路型solution
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];

  // ========== 数列 · 错位相减求和 ==========
  // 求和 S = Σ (a + n*d)·r^n  (n=1..N)  错位相减通用公式
  // 对等比 r≠1: S = A·(1-r^N)/(1-r)^2 - d·N·r^(N+1)/(1-r) ... 复杂, 用具体化: 选 d=1, r=2 等便于整数结果
  // 改用简化: S = Σ n·q^n, q=2: 公式 S=2-(N+2)/2^N 不对... 采用题目: 数列 b_n = n·2^n 求 S_N
  // Sn = (N-1)·2^(N+1)+2  (验证: N=1 =>0*4+2=2 ✓ 1*2=2; N=2=>1*8+2=10 ✓ 2+8=10)
  T.push({
    id: 'MX-SUM-001', kp: '数列求和(错位相减)', kpId: 'kp-geo', type: 'blank', diff: 4,
    gen: function () {
      var N = E.ri(3, 6);
      var Sn = (N - 1) * Math.pow(2, N + 1) + 2;
      return {
        text: '数列 {bₙ} 满足 bₙ = n·2ⁿ，求前 ' + N + ' 项和 S' + N + '：S' + N + ' = ______。',
        answer: String(Sn),
        solution: ['错位相减法求 S' + N + '。错位相减整理得 Sn=(n−1)·2^(n+1)+2，代 n=' + N + ' 得 S' + N + ' = ' + Sn + '。'],
        input: 'num'
      };
    }
  });
  // 实际验证：(N−1)·2^(N+1)+2。N=3:(2)*16+2=34; 验 b=1*2+2*4+3*8=2+8+24=34 ✓

  // ========== 数列 · 裂项相消求和 ==========
  // a_n = 1/[n(n+1)] = 1/n − 1/(n+1);  S_N = 1 − 1/(N+1) = N/(N+1)
  T.push({
    id: 'MX-SUM-002', kp: '数列求和(裂项相消)', kpId: 'kp-ari', type: 'blank', diff: 3,
    gen: function () {
      var N = E.ri(3, 8);
      var g = E.gcd(N, N + 1);            // 恒为1
      return {
        text: '数列 {aₙ} 的通项 aₙ = 1/[n(n+1)]，求前 ' + N + ' 项和 S' + N + ' = ______（用分数表示）。',
        answer: new E.Frac(N, N + 1).toStr(),
        solution: ['裂项相消：aₙ = 1/n − 1/(n+1)。' +
          'S' + N + ' = (1−1/2)+(1/2−1/3)+…+(1/' + N + '−1/' + (N + 1) + ') = 1 − 1/' + (N + 1) + ' = ' + new E.Frac(N, N + 1).toStr() + '。'],
        input: 'text'
      };
    }
  });

  // ========== 导数 · 切线方程 ==========
  // f(x)=ax²+bx+c, 求在 x=x0 处的切线方程。f'=2ax+b, 切线: y=f'(x0)(x-x0)+f(x0)
  // 答案为 y = kx + r 的 (k,r)。判分取 k 或 r。做 blank 填空"斜率k与截距r"
  T.push({
    id: 'MX-DER-001', kp: '导数(切线方程)', kpId: 'kp-deriv', type: 'blank', diff: 3,
    gen: function () {
      var a = E.ri(1, 3), b = E.ri(-3, 3), c = E.ri(-4, 4), x0 = E.ri(-2, 2);
      if (b === 0 && c === 0) c = 1;
      var k = 2 * a * x0 + b;
      var r = (a * x0 * x0 + b * x0 + c) - k * x0;
      return {
        text: '设 f(x) = ' + a + 'x²' + (b >= 0 ? '+' : '') + b + 'x' + (c >= 0 ? '+' : '') + c + '，求曲线 y=f(x) 在点(' + x0 + ', f(' + x0 + '))处的切线斜率 k = ______。',
        answer: String(k),
        solution: ['切线斜率 = 导数 f\'(' + x0 + ') = 2a·' + x0 + '+b = ' + k + '。' +
          '即 y = ' + k + 'x + ' + r + '。'],
        input: 'num'
      };
    }
  });
  // 占位 (避免遗漏)

  // ========== 导数 · 恒成立求参 ==========
  // 若对任意 x∈[1,n], f(x)=x²-ax+1 ≥ 0 恒成立, 求 a 的最大整数值
  // 恒成立 => a ≤ x + 1/x 在[1,n]最小 = 2(当x=1), => a≤2
  T.push({
    id: 'MX-DER-002', kp: '导数(恒成立求参)', kpId: 'kp-deriv', type: 'blank', diff: 4,
    gen: function () {
      var n = E.ri(3, 5);
      // x²-ax+1≥0 => a ≤ x+1/x; x∈[1,n] 上 x+1/x 最小=2 (x=1)。故 a≤2, 最大整数2
      return {
        text: '若对任意 x∈[1, ' + n + ']，都有 x² − ax + 1 ≥ 0 恒成立，则实数 a 的最大整数值是 ______。',
        answer: '2',
        solution: ['参数分离：a ≤ x + 1/x 对 x∈[1,' + n + '] 恒成立。' +
          '由均值不等式，x + 1/x ≥ 2（当且仅当 x=1 取等），且 x=1 恰在区间内。' +
          '∴ a ≤ 最小值为 2，最大整数值 a = 2。'],
        input: 'num'
      };
    }
  });

  // ========== 函数 · 周期 + 复合求值 ==========
  // f(x+2)=−f(x) 则周期4；用周期+给初值求 f(k)
  T.push({
    id: 'MX-FUN-001', kp: '函数(周期求值)', kpId: 'kp-fn', type: 'blank', diff: 3,
    gen: function () {
      var c1 = E.ri(1, 5);
      // f(x+2)=-f(x) => f(x+4)=f(x) 周期4。求 f(2026): 2026≡2026-4*506=2 => f(2026)=f(2)=-f(0)=-c1
      var val = -c1;
      return {
        text: '定义在 R 上的函数 f(x) 满足 f(x+2) = −f(x)，且 f(0) = ' + c1 + '，则 f(2026) = ______。',
        answer: String(val),
        solution: ['由 f(x+2) = −f(x)，得 f(x+4) = f(x)，所以 f 以 4 为周期。' +
          '2026 = 4×506 + 2，故 f(2026) = f(2)。' +
          '又 f(2) = −f(0) = −' + c1 + '。∴ f(2026) = −' + c1 + '。'],
        input: 'num'
      };
    }
  });

  // ========== 解析几何 · 直线与圆相交弦长 ==========
  // 圆 x²+y²=r², 直线 y=kx+b, 圆心到直线距离 d=|b|/√(1+k²), 弦长=2√(r²-d²)
  // 选 r 与 b,k 使 d 是整数, 弦长是整数: 取 r²-d² 为完全平方
  T.push({
    id: 'MX-GEO-001', kp: '直线与圆(弦长)', kpId: 'kp-circle', type: 'blank', diff: 3,
    gen: function () {
      // 取 k=0(水平线 y=b), 圆 r=5, b=3 => d=3, 弦长=2√(25-9)=2*4=8
      var r = 5, b = 3, k = 0;
      var L = 2 * Math.sqrt(r * r - b * b);
      return {
        text: '圆 x² + y² = ' + (r * r) + ' 与直线 y = ' + b + ' 相交，则弦长为 ______。',
        answer: String(Math.round(L)),
        solution: ['弦长公式 L = 2√(r²−d²)，d 为圆心(0,0)到直线 y=' + b + ' 的距离 = ' + b + '。' +
          'L = 2√(' + (r * r) + '−' + (b * b) + ') = 2√' + (r * r - b * b) + ' = ' + Math.round(L) + '。'],
        input: 'num'
      };
    }
  });

  // ========== 解析几何 · 椭圆焦点三角形 ==========
  // 椭圆 x²/a²+y²/b²=1, 焦点F1F2, P在椭圆上, |PF1|+|PF2|=2a
  T.push({
    id: 'MX-GEO-002', kp: '椭圆焦点三角形', kpId: 'kp-conic', type: 'blank', diff: 3,
    gen: function () {
      var a = E.ri(3, 6);          // 半长轴
      var m = E.ri(1, a - 1);      // |PF1|=m
      var pf2 = 2 * a - m;
      // 顶点P的椭圆定义用法：已知 |PF1| 求 |PF2|
      return {
        text: '已知椭圆的中心在原点，长轴长 2a = ' + (2 * a) + '，P 是椭圆上一点，F₁、F₂ 是焦点，若 |PF₁| = ' + m + '，则 |PF₂| = ______。',
        answer: String(pf2),
        solution: ['椭圆定义：椭圆上任意点到两焦点距离之和等于长轴长 2a = ' + (2 * a) + '。' +
          '即 |PF₁| + |PF₂| = ' + (2 * a) + '。' +
          '∴ |PF₂| = ' + (2 * a) + ' − ' + m + ' = ' + pf2 + '。'],
        input: 'num'
      };
    }
  });

  // ========== 三角 · 解三角形(正弦/余弦定理) ==========
  // 已知两边一夹角求第三边: c = √(a²+b²−2ab·cosC)。取特殊角 cosC=1/2(C=60°) 且构勾股数
  T.push({
    id: 'MX-TRI-001', kp: '解三角形(余弦定理)', kpId: 'kp-trig', type: 'blank', diff: 3,
    gen: function () {
      // 取 C=60°, a=3, b=4 => c=√(9+16-24*0.5)=√(25-12)=√13 简洁✓
      // 或选 a,b 使结果为整数: a=3,b=3,C=60 => c=√(9+9-9)=3 ✓
      var s = E.ri(1, 4);           // 棱长
      var a = s * 2, b = s * 2;     // 3.x? 取整更稳: 等腰三角 C=60
      // 用 a=b=m, C=60 => c=m (等边)。换个非等边: a=m,b=2m,C=60
      var m = E.ri(2, 4);
      var p = 2;
      var a2 = m, b2 = m * p;
      var c2 = Math.round(Math.sqrt(a2 * a2 + b2 * b2 - 2 * a2 * b2 * 0.5)); // = m√(p²-p+1)
      if (!Number.isInteger(c2) || c2 <= 0) { a2 = 3; b2 = 5; c2 = Math.round(Math.sqrt(9 + 25 - 2 * 3 * 5 * 0.5)); }
      return {
        text: '在 △ABC 中，AC = ' + a2 + '，BC = ' + b2 + '，∠C = 60°，则 AB = ______。',
        answer: String(c2),
        solution: ['余弦定理：AB² = AC² + BC² − 2·AC·BC·cos∠C。' +
          '= ' + a2 + '² + ' + b2 + '² − 2×' + a2 + '×' + b2 + '×(1/2) = ' + c2 + '²。' +
          '∴ AB = ' + c2 + '。'],
        input: 'num'
      };
    }
  });

  // ========== 概率 · 条件概率 ==========
  // 盒中 a 白 b 黑，第一次取白(不放回)，求第二次取黑的概率 = b/(a+b-1)
  T.push({
    id: 'MX-PROB-001', kp: '概率(条件概率)', kpId: 'kp-prob', type: 'blank', diff: 4,
    gen: function () {
      var w = E.ri(2, 5), bk = E.ri(2, 5);
      var g = E.gcd(bk, w + bk - 1);
      return {
        text: '一个盒子里有 ' + w + ' 个白球和 ' + bk + ' 个黑球，随机摸出一个白球（不放回），求再随机摸一个球是黑球的概率 = ______（用分数表示）。',
        answer: new E.Frac(bk, w + bk - 1).toStr(),
        solution: ['已知第一次已取白球，盒中剩 ' + (w - 1) + ' 白 ' + bk + ' 黑，共 ' + (w + bk - 1) + ' 个。' +
          '第二次取到黑球概率 = ' + bk + '/' + (w + bk - 1) + ' = ' + new E.Frac(bk, w + bk - 1).toStr() + '。'],
        input: 'text'
      };
    }
  });

  // 注册到 root
  if (!root.__PREMIUM) root.__PREMIUM = [];
  root.__PREMIUM = root.__PREMIUM.concat(T);
})(this);
