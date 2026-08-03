/* ============================================================
   无限题 · 化学模板库（福建卷，满分100/75分钟）
   单选10×4 + 非选择4大题
   覆盖高频考点：相对分子质量/摩尔/溶液/浓度/化学键/价态等
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var templates = [];

  // ===== 相对原子质量表（常用）=====
  var MASS = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, Si: 28, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65, Ag: 108, Ba: 137 };

  function addSol(n, d) { var g = E.gcd(n, d); return (n / g) + '/' + (d / g); }

  // ===== 相对分子质量 =====
  templates.push({
    id: 'C-MOL-001', kp: '相对分子质量', kpId: 'kp-molm', type: 'blank', diff: 1,
    gen: function () {
      // 计算 X 的相对分子质量，如 H2O, CO2, H2SO4, NaOH, CaCO3, Na2CO3, H2O2, NH3, CH4, C2H5OH
      var ops = [
        { f: 'H₂O', parts: [['O', 1], ['H', 2]], show: '2×1 + 16' },
        { f: 'CO₂', parts: [['C', 1], ['O', 2]], show: '12 + 2×16' },
        { f: 'H₂SO₄', parts: [['H', 2], ['S', 1], ['O', 4]], show: '2×1 + 32 + 4×16' },
        { f: 'NaOH', parts: [['Na', 1], ['O', 1], ['H', 1]], show: '23 + 16 + 1' },
        { f: 'CaCO₃', parts: [['Ca', 1], ['C', 1], ['O', 3]], show: '40 + 12 + 3×16' },
        { f: 'NH₃', parts: [['N', 1], ['H', 3]], show: '14 + 3×1' },
        { f: 'CH₄', parts: [['C', 1], ['H', 4]], show: '12 + 4×1' },
        { f: 'Na₂CO₃', parts: [['Na', 2], ['C', 1], ['O', 3]], show: '2×23 + 12 + 3×16' }
      ];
      var op = E.pick(ops);
      var Mr = 0;
      op.parts.forEach(function (p) { Mr += MASS[p[0]] * p[1]; });
      return { text: '计算 ' + op.f + ' 的相对分子质量（Mr）：______。',
        answer: (Number.isInteger(Mr) ? String(Mr) : String(Mr)), solution: ['Mr(' + op.f + ') = ' + op.show + ' = ' + Mr], input: 'num' };
    }
  });

  // ===== 溶液的溶质质量分数 =====
  templates.push({
    id: 'C-SOL-001', kp: '溶质质量分数', kpId: 'kp-solution', type: 'blank', diff: 1,
    gen: function () {
      var solute = E.pick([5, 10, 15, 20, 25]); var solvent = E.pick([45, 75, 80, 90]);
      var total = solute + solvent;
      var g = E.gcd(solute, total);
      var frac = (solute / g) + '/' + (total / g);
      var frac10 = Math.round(solute / total * 100);
      return { text: '将 ' + solute + ' g 盐溶解在 ' + solvent + ' g 水中，所得溶液中溶质的质量分数为 ______。',
        answer: frac10 + '%', solution: ['质量分数 = 溶质/溶液 = ' + solute + '/' + total + ' = ' + frac + ' = ' + frac10 + '%'], input: 'percent' };
    }
  });
  templates.push({
    id: 'C-SOL-002', kp: '溶液稀释', kpId: 'kp-solution', type: 'blank', diff: 2,
    gen: function () {
      var c1 = E.pick([20, 30, 40]); var m1 = E.pick([50, 100, 200]); var m2 = E.pick([50, 100]);
      // 溶质守恒：c1*m1 = c2*(m1+m2)
      var solute = c1 * m1 / 100;
      var c2 = solute / (m1 + m2) * 100;
      var c2i = Math.round(c2 * 10) / 10;
      var c2s = Number.isInteger(c2) ? String(c2) : String(c2i);
      return { text: '将 ' + m1 + ' g ' + c1 + '% 的溶液与 ' + m2 + ' g 水混合（假设体积近似、密度1），稀释后溶质质量分数约为 ______%。',
        answer: c2s + '%', solution: ['稀释前后溶质守恒：m质=' + c1 * m1 / 100 + 'g，稀释后溶液=' + (m1 + m2) + 'g，分数=' + Math.round(solute / (m1 + m2) * 1000) / 10 + '%'], input: 'percent' };
    }
  });

  // ===== 物质的量浓度 =====
  templates.push({
    id: 'C-MOLC-001', kp: '物质的量浓度', kpId: 'kp-molc', type: 'blank', diff: 2,
    gen: function () {
      var n = E.pick([0.5, 1, 2]); var V = E.pick([0.5, 1, 2]);
      var c = n / V;
      return { text: '将 ' + n + ' mol 的 NaOH 溶于水配成 ' + V + ' L 溶液，则溶液中 NaOH 的物质的量浓度为 ______ mol/L。',
        answer: String(c), solution: ['c = n/V = ' + n + '/' + V + ' = ' + c + ' mol/L'], input: 'num', unit: 'mol/L' };
    }
  });

  // ===== 摩尔质量与物质的量 =====
  templates.push({
    id: 'C-MOL-002', kp: '物质的量', kpId: 'kp-mole', type: 'blank', diff: 2,
    gen: function () {
      var mass = E.pick([4, 8, 16, 32, 64]); var M = E.pick([16, 32, 44, 64]);
      while (mass <= M) mass = E.pick([4, 16, 32, 64, 80]);
      var n = mass / M;
      var frac = addSol(mass, M);
      // 质量 > 摩尔质量保证 n>1
      var realMass = mass + M;
      n = realMass / M;
      var ans = Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
      return { text: realMass + ' g 的 CO₂（摩尔质量 44 g/mol）的物质的量为 ______ mol。',
        answer: String(realMass / 44), solution: ['n = m/M = ' + realMass + '/44 = ' + realMass / 44 + ' mol'], input: 'num', unit: 'mol' };
    }
  });

  // ===== 化合价 =====
  templates.push({
    id: 'C-VAL-001', kp: '化合价', kpId: 'kp-valence', type: 'blank', diff: 2,
    gen: function () {
      // 求某元素化合价：常见氧化物
      var ops = [
        { f: 'H₂O', target: 'O', knownH: 1, ans: -2 },
        { f: 'CO₂', target: 'C', knownO: -2, ans: 4 },
        { f: 'NaCl', target: 'Na', known: 1, ans: 1 },
        { f: 'Fe₂O₃', target: 'Fe', knownO: -2, ans: 3 },
        { f: 'CuO', target: 'Cu', knownO: -2, ans: 2 },
        { f: 'KMnO₄', target: 'Mn', knownK: 1, knownO: -2, formula: 'K+1 · Mn · O4(-2)', ans: 7 }
      ];
      var op = E.pick(ops);
      if (op.f === 'H₂O') return { text: '在 H₂O 中，O 元素的化合价为 ______。', answer: String(op.ans), solution: ['设O为x，2×(+1)+x=0，x=-2'], input: 'int_sign' };
      if (op.f === 'CO₂') return { text: '在 CO₂ 中，C 元素的化合价为 ______。', answer: String(op.ans), solution: ['设C为x，x+2×(-2)=0，x=' + op.ans], input: 'int_sign' };
      if (op.f === 'NaCl') return { text: '在 NaCl 中，Na 元素的化合价为 ______。', answer: String(op.ans), solution: ['Na 为金属元素，化合价固定 +1'], input: 'int_sign' };
      if (op.f === 'Fe₂O₃') return { text: '在 Fe₂O₃ 中，Fe 元素的化合价为 ______。', answer: String(op.ans), solution: ['2x + 3×(-2)=0，x=' + op.ans], input: 'int_sign' };
      if (op.f === 'CuO') return { text: '在 CuO 中，Cu 元素的化合价为 ______。', answer: String(op.ans), solution: ['x + (-2)=0，x=' + op.ans], input: 'int_sign' };
      return { text: '在 KMnO₄ 中，Mn 元素的化合价为 ______。', answer: String(op.ans), solution: ['+1 + x + 4×(-2)=0，x=' + op.ans], input: 'int_sign' };
    }
  });

  // ===== 化学方程式配平（简单）=====
  templates.push({
    id: 'C-BAL-001', kp: '方程式配平', kpId: 'kp-balance', type: 'blank', diff: 2,
    gen: function () {
      var ops = [
        { eq: 'H₂ + O₂ → H₂O', missing: 2, target: 'O₂ 前系数', ans: 1, sol: '2H₂ + O₂ → 2H₂O，O₂系数为1' },
        { eq: 'Fe + O₂ → Fe₃O₄', missing: 1, target: 'Fe₃O₄ 前系数', ans: 1, sol: '3Fe + 2O₂ → Fe₃O₄' },
        { eq: 'Mg + O₂ → MgO', missing: 'Mg', target: 'MgO 前系数', ans: 2, sol: '2Mg + O₂ → 2MgO' },
        { eq: 'Na + Cl₂ → NaCl', missing: 'NaCl', target: 'NaCl 前系数', ans: 2, sol: '2Na + Cl₂ → 2NaCl' }
      ];
      var op = E.pick(ops);
      return { text: '配平化学方程式：' + op.eq + '，则 ' + op.target + ' 为 ______。',
        answer: String(op.ans), solution: [op.sol], input: 'num' };
    }
  });

  // ===== 质量守恒 =====
  templates.push({
    id: 'C-CONS-001', kp: '质量守恒', kpId: 'kp-conserve', type: 'blank', diff: 2,
    gen: function () {
      var a = E.pick([6, 12, 10, 8]); var b = E.pick([4, 6, 8]);
      var c = a - b; if (c <= 0) c = Math.abs(c) + 2;
      var total = a + 32; var other = total - b;
      // 生成物总质量守恒
      return { text: '某反应 A + B → C + D。若取 A ' + a + ' g、B ' + b + ' g 恰好完全反应，则生成的 C 和 D 的总质量为 ______ g。',
        answer: String(a + b), solution: ['由质量守恒定律，生成物总质量 = 反应物总质量 = ' + a + '+' + b + ' = ' + (a + b) + ' g'], input: 'num', unit: 'g' };
    }
  });

  // ===== 原子结构（质子/中子/电子）=====
  templates.push({
    id: 'C-ATOM-001', kp: '原子结构', kpId: 'kp-atom', type: 'blank', diff: 2,
    gen: function () {
      // Cl-35: Z=17, A=35
      var ops = [
        { name: 'Cl', Z: 17, A: 35 },
        { name: 'Na', Z: 11, A: 23 },
        { name: 'Mg', Z: 12, A: 24 },
        { name: 'Al', Z: 13, A: 27 },
        { name: 'O', Z: 8, A: 16 },
        { name: 'Fe', Z: 26, A: 56 }
      ];
      var op = E.pick(ops);
      var which = E.pick(['neutron', 'electron']);
      if (which === 'neutron') {
        var n = op.A - op.Z;
        return { text: '已知 ' + op.name + ' 原子的质子数为 ' + op.Z + '、质量数为 ' + op.A + '，则其中子数为 ______。',
          answer: String(n), solution: ['中子数 = 质量数 - 质子数 = ' + op.A + '-' + op.Z + ' = ' + n], input: 'num' };
      }
      return { text: '已知 ' + op.name + ' 原子核电荷数（即质子数）为 ' + op.Z + '，则其核外电子数为 ______。',
        answer: String(op.Z), solution: ['原子中核外电子数 = 质子数 = ' + op.Z], input: 'num' };
    }
  });

  // ===== 化学键判断 =====
  templates.push({
    id: 'C-BOND-001', kp: '化学键', kpId: 'kp-bond', type: 'choice', diff: 2,
    gen: function () {
      // ionic: 金属+非金属; covalent: 非金属+非金属
      var ionic = ['NaCl', 'CaO', 'MgCl₂', 'K₂O', 'NaOH'];
      var covalent = ['H₂O', 'CO₂', 'HCl', 'CH₄', 'NH₃'];
      var which = E.pick(['ionic', 'covalent']);
      var subs = which === 'ionic' ? ionic : covalent;
      var correct = which === 'ionic' ? '离子化合物' : '共价化合物';
      var f = E.pick(subs);
      return { text: '下列关于 ' + f + ' 所属化合物类型的判断，正确的是（ ）',
        options: ['离子化合物', '共价化合物', '金属化合物', '无法判断'],
        correct: which === 'ionic' ? 0 : 1, answer: correct,
        solution: f + ' 由' + (which === 'ionic' ? '金属离子和非金属离子（或原子团）' : '非金属原子') + '构成，属于' + correct };
    }
  });

  // ===== 选择题：离子共存 =====
  templates.push({
    id: 'C-ION-001', kp: '离子共存', kpId: 'kp-ion', type: 'choice', diff: 3,
    gen: function () {
      // 判断能大量共存的组合
      var yes = ['Na⁺、Cl⁻、K⁺、NO₃⁻', 'H⁺、Na⁺、Cl⁻、SO₄²⁻', 'K⁺、NO₃⁻、SO₄²⁻、Na⁺', 'NH₄⁺、Cl⁻、Na⁺、NO₃⁻'];
      var no = ['H⁺、OH⁻、Na⁺、Cl⁻', 'Ba²⁺、SO₄²⁻、K⁺、NO₃⁻', 'Ca²⁺、CO₃²⁻、Na⁺、Cl⁻', 'Cu²⁺、OH⁻、K⁺、Cl⁻'];
      var ans = E.pick(yes);
      var opts = E.shuffle(yes.concat(E.pick([], no) ? [] : no.slice(0, 3)).slice());
      var pool = yes.concat(no);
      var shuffled = E.shuffle(pool);
      var correctIdx = shuffled.indexOf(ans);
      return { text: '下列各组离子在水溶液中能大量共存的是（ ）',
        options: shuffled, correct: correctIdx, answer: ans,
        solution: ['能共存的离子间不能生成沉淀、气体或水等物质。A中' + ans + '离子间不反应，能大量共存'] };
    }
  });

  // ===== 氧化还原判断 =====
  templates.push({
    id: 'C-REDOX-001', kp: '氧化还原', kpId: 'kp-redox', type: 'choice', diff: 3,
    gen: function () {
      var q = E.pick([
        { r: '2H₂O₂ → 2H₂O + O₂↑', is: true, why: '有元素化合价变化' },
        { r: 'Na₂O + H₂O → 2NaOH', is: false, why: '各元素化合价均未变化' },
        { r: '2KClO₃ → 2KCl + 3O₂↑', is: true },
        { r: 'HCl + NaOH → NaCl + H₂O', is: false }
      ]);
      var correct = q.is ? '是' : '不是';
      return { text: '反应 ' + q.r + ' ______（选填"是/不是"）氧化还原反应。',
        answer: correct, options: ['是', '不是'], correct: q.is ? 0 : 1,
        solution: [q.why || (q.is ? '有元素化合价升降' : '无元素化合价变化')] };
    }
  });

  root.__ChemistryTemplates = templates;
})(typeof window !== 'undefined' ? window : globalThis);
