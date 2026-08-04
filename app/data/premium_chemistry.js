/* ============================================================
   无限题 · 化学高分套路模板（福建卷 综合大题方向）
   提炼自B站名师总结的高考化学大题套路:
   - 物质的量与阿伏伽德罗常数 换算
   - 氧化还原 电子转移守恒
   - 化学平衡常数 K
   - 化学反应速率
   - 有机燃烧 求分子式
   答案精确计算, 含套路型solution
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  var MASS = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65, Ba: 137 };

  // ========== 物质的量：质量换算 ==========
  // m 克 X (摩尔质量 M) => n=m/M, 原子数=N·n·atoms(每分子原子数)
  T.push({
    id: 'CX-MOL-001', kp: '物质的量换算', kpId: 'kp-molm', type: 'blank', diff: 3,
    gen: function () {
      // 计算 CO2 等: n(mol) = m/M
      var ops = [
        { f: 'CO₂', M: 44, at: 3 },
        { f: 'H₂O', M: 18, at: 3 },
        { f: 'NH₃', M: 17, at: 4 },
        { f: 'H₂SO₄', M: 98, at: 7 }
      ];
      var op = E.pick(ops);
      // 构造质量为 M 的整数倍, 使 n 为整数或0.5
      var mul = E.pick([1, 2, 0.5]);
      var m = op.M * mul;                 // 质量
      return {
        text: '取 ' + m + ' g 的 ' + op.f + '（摩尔质量 ' + op.M + ' g/mol），则物质的量为 ______ mol。',
        answer: String(mul),
        solution: ['n = m/M = ' + m + '/' + op.M + ' = ' + mul + ' mol。' +
          (op.at ? ('该气体含分子数 = ' + mul + '×N\u2090，原子数 = ' + mul + '×' + op.at + '×N\u2090。') : '')],
        input: 'text'
      };
    }
  });

  // ========== 物质的量：摩尔体积/气体体积 ==========
  // 标准状况下 V L 气体 => n=V/22.4, 分子数=n·NA
  // 构造 V 使 n 整数: V=22.4 →1mol, V=44.8→2mol
  T.push({
    id: 'CX-MOL-002', kp: '气体摩尔体积', kpId: 'kp-molm', type: 'blank', diff: 3,
    gen: function () {
      var n = E.pick([1, 2, 3]); var V = n * 22.4;
      return {
        text: '标准状况下，' + V + ' L 的某气体，物质的量为 ______ mol。',
        answer: String(n),
        solution: ['标况下气体摩尔体积 22.4 L/mol。n = V/Vm = ' + V + '/22.4 = ' + n + ' mol。'],
        input: 'text', unit: 'mol'
      };
    }
  });

  // ========== 氧化还原：电子转移守恒 ==========
  // 求 x mol 金属与酸反应转移电子数
  T.push({
    id: 'CX-RE-001', kp: '电子转移', kpId: 'kp-redox', type: 'blank', diff: 4,
    gen: function () {
      // 金属失去电子数 = 化合价变化量
      var ops = [
        { el: 'Na', val: 1 }, { el: 'Mg', val: 2 }, { el: 'Al', val: 3 }
      ];
      var op = E.pick(ops); var n = E.pick([1, 2, 3]);
      var e = n * op.val;
      return {
        text: '足量盐酸与 ' + n + ' mol ' + op.el + ' 完全反应（' + op.el + ' → ' + op.el + '⁺' + op.val + '），转移电子的物质的量为 ______ mol。',
        answer: String(e),
        solution: ['电子守恒：1 mol ' + op.el + ' 失去 ' + op.val + ' mol 电子。' +
          n + ' mol ' + op.el + ' 转移电子 = ' + n + '×' + op.val + ' = ' + e + ' mol。'],
        input: 'text', unit: 'mol'
      };
    }
  });

  // ========== 化学平衡常数 K ==========
  // 反应 aA+bB ⇌ cC+dD, 平衡浓度, K=[C]^c[D]^d/[A]^a[B]^b
  // 构造整数K: 用 2NO2 ⇌ N2O4, K 简化
  T.push({
    id: 'CX-EQ-001', kp: '化学平衡常数', kpId: 'kp-eq', type: 'blank', diff: 4,
    gen: function () {
      // 反应 H2(g)+I2(g)⇌2HI(g), 平衡浓度 c(H2)=a, c(I2)=b, c(HI)=ab可
      // K=[HI]²/([H2][I2]). 构造: HI=cI2, c(H2)=c(I2)=1, HI=?? K=HI²
      var a = E.pick([1, 2]); 
      // 简化: 取 c(H2)=1, c(I2)=2, c(HI)=4 => K=16/(1*2)=8
      var cH2 = 1, cI2 = E.pick([1, 2]), cHI = E.pick([2, 4, 6]);
      // K=cHI²/(cH2*cI2); 若除法不整洁调整
      var Knum = cHI * cHI, Kden = cH2 * cI2;
      var g = E.gcd(Knum, Kden);
      var Kstr = (Knum / g === 1) ? String(Kden / g === 1 ? 1 : '1/' + (Kden / g)) : ((Knum / Kden === Math.round(Knum / Kden)) ? String(Knum / Kden) : ((Knum / g) + '/' + (Kden / g)));
      return {
        text: '某温度下反应 H₂(g) + I₂(g) ⇌ 2HI(g) 达平衡时，c(H₂)=' + cH2 + ' mol/L，c(I₂)=' + cI2 + ' mol/L，c(HI)=' + cHI + ' mol/L，则该温度下平衡常数 K = ______。',
        answer: (Knum / Kden === Math.round(Knum / Kden)) ? String(Knum / Kden) : (((Knum / g) + '/' + (Kden / g))),
        solution: ['K = [HI]²/[H₂][I₂] = ' + cHI + '²/(' + cH2 + '×' + cI2 + ') = ' + Knum + '/' + Kden + ' = ' + (Knum / Kden === Math.round(Knum / Kden) ? Knum / Kden : (Knum / g) + '/' + (Kden / g)) + '。'],
        input: 'text'
      };
    }
  });

  // ========== 化学反应速率 ==========
  // 平均速率 v=Δc/Δt, 浓度变化量
  T.push({
    id: 'CX-RATE-001', kp: '化学反应速率', kpId: 'kp-rate', type: 'blank', diff: 3,
    gen: function () {
      // v(平均)=Δc/Δt, 取 Δc, Δt 使速率为整数/简单小数
      var dc = E.pick([0.2, 0.4, 0.6, 1]); var dt = E.pick([2, 4, 5]);
      // 使 v=dc/dt 简单: 构造 dc=0.4,dt=2=>0.2; dc=1,dt=5=>0.2
      // 计算速率字符串
      var v = dc / dt; var vstr = (v === Math.round(v)) ? String(v) : String(Math.round(v * 100) / 100);
      return {
        text: '某反应中，物质 A 的浓度在 ' + dt + ' s 内由 0 变化到 ' + dc + ' mol/L，则 A 的平均反应速率为 ______ mol/(L·s)。',
        answer: vstr,
        solution: ['v = Δc/Δt = ' + dc + '/' + dt + ' = ' + vstr + ' mol/(L·s)。注意速率取正值。'],
        input: 'text', unit: 'mol/(L·s)'
      };
    }
  });

  // ========== 有机燃烧：求分子式 ==========
  // 烃燃烧: CxHy + (x+y/4)O2 → xCO2 + y/2 H2O
  // 已知燃烧产物CO2和H2O物质的量, 求烃分子式
  T.push({
    id: 'CX-ORG-001', kp: '有机物分子式', kpId: 'kp-org', type: 'blank', diff: 4,
    gen: function () {
      // 某烃 x mol 燃烧生成 a mol CO2 和 b mol H2O
      // xC氢: C数=a/x, H数=2b/x
      var n = 1;                 // 烃物质的量
      var ops = [
        { a: 2, b: 3, f: 'C₂H₆（乙烷）', formula: 'C2H6' },
        { a: 3, b: 4, f: 'C₃H₈（丙烷）', formula: 'C3H8' },
        { a: 2, b: 2, f: 'C₂H₄（乙烯）', formula: 'C2H4' },
        { a: 4, b: 5, f: 'C₄H₁₀（丁烷）', formula: 'C4H10' }
      ];
      var op = E.pick(ops);
      return {
        text: '某烃 ' + n + ' mol 完全燃烧生成 ' + op.a + ' mol CO₂ 和 ' + op.b + ' mol H₂O，则该烃的分子式为 ______（如 C2H6）。',
        answer: op.formula,
        solution: ['C 来自烃：n(C)=n(CO₂)=' + op.a + ' mol；H 来自烃：n(H)=2n(H₂O)=' + (2 * op.b) + ' mol。' +
          '烃为 ' + n + ' mol，故 C:', op.a + '，H:' + (2 * op.b) + '，分子式 = ' + op.formula + '。'],
        input: 'text'
      };
    }
  });

  // ========== 氧化还原：陌生方程式产物判断 ==========
  // 常见氧化剂/还原剂的产物判断（一化强调"升降守恒"）
  T.push({
    id: 'CX-RE-002', kp: '氧化还原·产物', kpId: 'kp-redox', type: 'choice', diff: 4,
    gen: function () {
      return {
        text: 'Cl₂ 与浓 NaOH 溶液在加热条件下反应，Cl₂ 既作氧化剂又作还原剂，其产物中包含（ ）',
        options: ['NaCl 和 NaClO₃', '只有 NaClO', 'NaCl 和 O₂', 'Cl₂ 不反应'],
        answer: 'NaCl 和 NaClO₃', correct: 0,
        solution: ['氯气与浓热 NaOH 反应生成 NaCl 和 NaClO₃（3Cl₂+6NaOH→5NaCl+NaClO₃+3H₂O），Cl₂ 歧化：一部分得电子变 Cl⁻，一部分失电子变 ClO₃⁻，满足升降守恒。']
      };
    }
  });
  T.push({
    id: 'CX-RE-003', kp: '氧化还原·转移', kpId: 'kp-redox', type: 'blank', diff: 4,
    gen: function () {
      // 反应 2Mn: 求 4 mol KMnO₄ 作氧化剂时转移的电子数(每 mol Mn+7→+2 得5e)
      var n = E.pick([2, 4, 8]);
      var e = n * 5; // Mn+7→Mn+2 得5电子
      return {
        text: '用酸性 KMnO₄ 氧化草酸(H₂C₂O₄)时，KMnO₄ 中 Mn 从+7 降为+2。若恰好消耗 ' + n + ' mol KMnO₄，则此过程转移电子的物质的量为 ______ mol。',
        answer: String(e), input: 'num', unit: 'mol',
        solution: ['每 mol Mn(+7→+2) 得到 5 mol 电子（ΔMn=+7到+2，得5e）。' + n + ' mol × 5 = ' + e + ' mol 电子。']
      };
    }
  });

  // ========== 实验：气体制备与检验 ==========
  T.push({
    id: 'CX-EXP-001', kp: '实验·气体制备', kpId: 'kp-labo', type: 'choice', diff: 3,
    gen: function () {
      return {
        text: '实验室用 MnO₂ 与浓盐酸共热制备 Cl₂，正确的说法是（ ）',
        options: ['该反应需加热，MnO₂ 作氧化剂', '反应不需加热', 'Cl₂ 用排水法收集', '产物中一定有 HClO'],
        answer: '该反应需加热，MnO₂ 作氧化剂', correct: 0,
        solution: ['MnO₂+4HCl(浓)→MnCl₂+Cl₂↑+2H₂O，需加热；MnO₂ 中 Mn+4→+2 得电子，作氧化剂；Cl₂ 溶于水不能用排水法，用向上排空气或饱和食盐水。']
      };
    }
  });
  T.push({
    id: 'CX-EXP-002', kp: '实验·离子检验', kpId: 'kp-labo', type: 'choice', diff: 3,
    gen: function () {
      return {
        text: '检验某溶液中是否含 Fe³⁺，应选用的试剂是（ ）',
        options: ['KSCN 溶液', '酚酞试剂', 'BaCl₂ 溶液', 'AgNO₃ 溶液'],
        answer: 'KSCN 溶液', correct: 0,
        solution: ['Fe³⁺ 遇 KSCN 溶液变红色，这是 Fe³⁺ 的特征检验方法。酚酞测酸碱性、BaCl₂ 检验 SO₄²⁻、AgNO₃ 检验 Cl⁻，均不适用于 Fe³⁺。']
      };
    }
  });

  // ========== 混合物：平均摩尔质量/相对密度 ==========
  T.push({
    id: 'CX-MIX-001', kp: '混合气体计算', kpId: 'kp-molm', type: 'blank', diff: 3,
    gen: function () {
      // 两种气体体积比已知，求平均相对分子质量
      var ops = [
        { g1: 'CO₂', M1: 44, g2: 'N₂', M2: 28, r: 1, avg: (44 + 28 * 1) / 2 },
        { g1: 'H₂', M1: 2, g2: 'O₂', M2: 32, r: 1, avg: (2 + 32) / 2 },
        { g1: 'CO', M1: 28, g2: 'O₂', M2: 32, r: 1, avg: 30 }
      ];
      var o = E.pick(ops);
      var avg = o.avg;
      return {
        text: '等体积（同温同压）混合的 ' + o.g1 + ' 与 ' + o.g2 + ' 气体，其平均摩尔质量为 ______ g/mol。',
        answer: String(avg), input: 'num', unit: 'g/mol',
        solution: ['平均摩尔质量 M = (M₁×n₁ + M₂×n₂)/(n₁+n₂)，等体积即等物质的量，M = (' + o.M1 + ' + ' + o.M2 + ')/2 = ' + avg + ' g/mol。']
      };
    }
  });

  root.__PREMIUM_CHEMISTRY = T;
})(typeof window !== 'undefined' ? window : globalThis);
