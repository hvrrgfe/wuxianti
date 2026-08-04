/* ============================================================
   无限题 · 高中数学深化核心模板库（新课标I卷）
   补充高考核心深化考点（原模板偏基础）：
   三角函数变形、解三角形、等比/等差综合、圆锥曲线综合、
   导数综合、空间向量、条件概率与分布、不等式
   答案确定, 判分可靠
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];

  // ===== 三角函数：二倍角 =====
  T.push({
    id: 'HS-TRIG-001', kp: '三角恒等变形', kpId: 'kp-hs-math', type: 'blank', diff: 3,
    gen: function () {
      // sin2x=2sinxcosx, cos2x=cos²x-sin²x; 特殊角求值
      var bank = [
        { q: 'sin 2·30°', ans: '√3/2', sol: 'sin60°=√3/2' },
        { q: 'cos 2·45°', ans: '0', sol: 'cos90°=0' },
        { q: '2sin15°cos15°', ans: '1/2', sol: '2sinxcosx=sin2x=sin30°=1/2' },
        { q: 'cos²45°−sin²45°', ans: '0', sol: 'cos²x−sin²x=cos2x=cos90°=0' }
      ];
      var b = E.pick(bank);
      return { text: '利用恒等变形求值：' + b.q + ' = ______。', answer: b.ans, solution: [b.sol], input: 'text' };
    }
  });

  // ===== 解三角形：正弦定理 =====
  T.push({
    id: 'HS-TRI-001', kp: '解三角形-正弦定理', kpId: 'kp-hs-math', type: 'blank', diff: 3,
    gen: function () {
      // a/sinA = b/sinB = 2R; 给A=30°,sinB, 求b/a
      var a = E.pick([2, 4]); var A = 30;
      var B = E.pick([45, 60]);
      // b/a = sinB/sinA
      var sinA = 0.5; var sinB = B===45?Math.SQRT1_2:Math.sqrt(3)/2;
      var ratio = sinB / sinA;   // 1.414 或 1.732
      var ratioStr = B===45?'√2':B===60?'√3':'1';
      return { text: '在△ABC中，已知 A=' + A + '°、B=' + B + '°，边 a=' + a + '。由正弦定理 a/sinA=b/sinB，求边 b = ______。',
        answer: ratioStr, solution: ['b/a=sinB/sinA=' + sinB + '/0.5=' + ratioStr + '，b=a·' + ratioStr + '=' + a + ratioStr + '。'], input: 'text' };
    }
  });

  // ===== 等比数列综合 =====
  T.push({
    id: 'HS-SEQ-001', kp: '等比数列综合', kpId: 'kp-hs-math', type: 'blank', diff: 3,
    gen: function () {
      var a1 = E.pick([2, 3]); var q = E.pick([2, 3]); var n = E.pick([3, 4, 5]);
      var an = a1 * Math.pow(q, n - 1);
      var Sn = q === 1 ? a1 * n : a1 * (Math.pow(q, n) - 1) / (q - 1);
      return { text: '等比数列 {aₙ}：a₁=' + a1 + '，公比 q=' + q + '。求第 ' + n + ' 项 aₙ = a₁q^(n−1) = ______。',
        answer: String(an), solution: ['aₙ=a₁·q^(n−1)=' + a1 + '×' + q + '^' + (n-1) + '=' + an + '。前n项和 Sₙ=a₁(qⁿ−1)/(q−1)=' + Sn + '。'], input: 'num' };
    }
  });

  // ===== 导数：复合/乘积法则 =====
  T.push({
    id: 'HS-DER-001', kp: '导数运算深化', kpId: 'kp-hs-math', type: 'blank', diff: 3,
    gen: function () {
      // f(x)=x²(常数项), 求 f'(2) 等; 或多项式求导
      var a = E.pick([1, 2]); var n = E.pick([3, 4]); var x = E.pick([1, 2]);
      // f(x)=a·x^n; f'(x)=a·n·x^(n-1); f'(x)=a*n*x^(n-1)
      var d = a * n * Math.pow(x, n - 1);
      return { text: '设 f(x)=' + a + 'x^' + n + '，求导函数在 x=' + x + ' 处的值 f\'(' + x + ') = ______。',
        answer: String(d), solution: ['f\'(x)=' + a + '×' + n + 'x^' + (n-1) + '，f\'(' + x + ')=' + a * n + '×' + x + '^' + (n-1) + '=' + d + '。'], input: 'num' };
    }
  });

  // ===== 圆锥曲线：抛物线焦点 =====
  T.push({
    id: 'HS-CONIC-001', kp: '抛物线', kpId: 'kp-hs-math', type: 'blank', diff: 3,
    gen: function () {
      var p = E.pick([2, 4, 6]);
      // y²=2px 焦点 (p/2,0), 准线 x=-p/2
      var f = p / 2;
      return { text: '抛物线 y²=' + (2 * p) + 'x 的焦点坐标为 ______（填横坐标数值）。',
        answer: String(f), solution: ['标准方程 y²=2px，焦点 (p/2,0)=(' + f + ',0)，准线 x=−' + f + '。'], input: 'num' };
    }
  });

  // ===== 空间向量：夹角/模 =====
  T.push({
    id: 'HS-SPVEC-001', kp: '空间向量', kpId: 'kp-hs-math', type: 'blank', diff: 3,
    gen: function () {
      // a=(1,2,3), 求|a|=√(1+4+9)=√14
      var v = E.pick([[1, 2, 3], [2, 2, 1], [1, 1, 2]]);
      var m = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      var ms = (m === Math.round(m)) ? String(m) : (m === Math.sqrt(6) ? '√6' : m === Math.sqrt(9) ? '3' : m === Math.sqrt(14) ? '√14' : m === Math.sqrt(6) ? '√6' : String(Math.round(m * 100) / 100));
      return { text: '向量 a=(' + v + ')，求其模 |a| = √(x²+y²+z²) = ______。',
        answer: ms, solution: ['|a|=√(' + v[0] + '²+' + v[1] + '²+' + v[2] + '²)=' + ms + '。'], input: 'text' };
    }
  });

  // ===== 条件概率 =====
  T.push({
    id: 'HS-COND-001', kp: '条件概率', kpId: 'kp-hs-math', type: 'blank', diff: 3,
    gen: function () {
      // 一个盒子 a白 b黑, 已知抽到白球, 求再抽黑
      var w = E.pick([3, 4]), bl = E.pick([2, 3]);
      // 已知第一次白(不放回), 第二次黑概率 = bl/(w+bl-1)
      var g = E.gcd(bl, w + bl - 1);
      return { text: '盒中 ' + w + ' 白 ' + bl + ' 黑球，不放回连续取两次。已知第一次摸到白球，求第二次摸到黑球的概率 = ______。',
        answer: (bl / g) + '/' + ((w + bl - 1) / g), solution: ['条件概率，第一次白后盒中剩 ' + (w-1) + ' 白 ' + bl + ' 黑共 ' + (w + bl - 1) + '，第二次黑概率=' + bl + '/' + (w + bl - 1) + '。'], input: 'text' };
    }
  });

  // ===== 基本不等式 =====
  T.push({
    id: 'HS-INEQ-001', kp: '基本不等式', kpId: 'kp-hs-math', type: 'blank', diff: 3,
    gen: function () {
      var a = E.pick([4, 9, 16]);
      // x + a/x ≥ 2√a
      var r = Math.sqrt(a); var m = 2 * r;
      return { text: '已知 x＞0，由基本不等式 x + ' + a + '/x ≥ 2√' + a + '，求其最小值 = ______。',
        answer: String(m), solution: ['x+a/x≥2√(x·a/x)=2√' + a + '=' + m + '，当且仅当 x=√' + a + '=' + r + ' 取等。'], input: 'num' };
    }
  });

  root.__PREMIUM_MATH_HS = T;
})(typeof window !== 'undefined' ? window : globalThis);
