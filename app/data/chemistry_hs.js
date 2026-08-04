/* ============================================================
   无限题 · 高中化学核心模板库（福建卷）
   补充高考核心考点（原模板偏基础/初中）：
   电化学(原电池/电解)、元素周期律、盖斯定律、化学反应速率与平衡深化、
   盐类水解、有机官能团、化学计算深化
   答案确定, 判分可靠
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  var MASS = { H:1, C:12, N:14, O:16, Na:23, Mg:24, Al:27, S:32, Cl:35.5, K:39, Ca:40, Fe:56, Cu:64, Zn:65, Ag:108, Ba:137 };
  function frac(n,d){ var g=E.gcd(n,d); return (n/g)+'/'+(d/g); }

  // 电化学：原电池/H2燃料电池的电极判断
  T.push({
    id: 'HS-ELEC-001', kp: '电化学-原电池', kpId: 'kp-hs-chem', type: 'choice', diff: 3,
    gen: function () { return {
      text: '铜锌原电池（Cu、Zn与稀硫酸构成）中，下列说法正确是（ ）',
      options: ['锌作负极被氧化', '铜作负极', '电流方向由锌经导线到铜', '锌发生还原反应'],
      answer: '锌作负极被氧化', correct: 0,
      solution: ['原电池中活泼金属(Zn)作负极发生氧化反应被氧化，Cu作正极；外电路电子由Zn流向Cu，电流方向相反。A正确。']
    }; }
  });
  // 电解
  T.push({
    id: 'HS-ELEC-002', kp: '电化学-电解', kpId: 'kp-hs-chem', type: 'blank', diff: 3,
    gen: function () {
      // 电解氯化铜 CuCl2 => Cu + Cl2, 转移电子守恒: 析出n mol Cu需2n mol电子
      var n = E.pick([1, 2, 3]);
      var e = 2 * n;
      return { text: '用惰性电极电解 CuCl₂ 溶液，阴极析出 ' + n + ' mol Cu（Cu²⁺+2e⁻→Cu），则转移电子的物质的量为 ______ mol。',
        answer: String(e), input: 'num', unit: 'mol',
        solution: ['每析出 1 mol Cu 需 2 mol 电子，故 ' + n + ' mol Cu 需 ' + e + ' mol 电子。']
      };
    }
  });
  // 元素周期律
  T.push({
    id: 'HS-PERIOD-001', kp: '元素周期律', kpId: 'kp-hs-chem', type: 'choice', diff: 2,
    gen: function () { return {
      text: '第三周期元素Na、Mg、Al中，金属性最强的是（ ）',
      options: ['Na', 'Mg', 'Al', '三者相同'],
      answer: 'Na', correct: 0,
      solution: ['同一周期从左到右金属性减弱，第三周期从左至右Na>Mg>Al，Na金属性最强。A正确。']
    }; }
  });
  // 盖斯定律
  T.push({
    id: 'HS-HESS-001', kp: '盖斯定律', kpId: 'kp-hs-chem', type: 'blank', diff: 3,
    gen: function () {
      var d1 = E.pick([-100, -200]), x = E.pick([2, 3]);
      var target = d1 * x;
      return { text: '已知反应 ① C(s)+O₂(g)=CO₂(g) ΔH=' + d1 + ' kJ/mol。若反应 ② 的 ΔH 是①的 ' + x + ' 倍，则 ② 的 ΔH = ______ kJ/mol（盖斯定律：反应热按系数成比例）。',
        answer: String(target), input: 'text', unit: 'kJ/mol',
        solution: ['盖斯定律：反应热与路径无关，反应②=①×' + x + '，ΔH₂=' + d1 + '×' + x + '=' + target + ' kJ/mol。']
      };
    }
  });
  // 反应速率
  T.push({
    id: 'HS-RATE-001', kp: '反应速率计算', kpId: 'kp-hs-chem', type: 'blank', diff: 2,
    gen: function () {
      var dc = E.pick([0.4, 0.6, 1.0]), dt = E.pick([2, 4, 5]);
      var v = dc / dt;
      var vstr = (v===Math.round(v))?String(v):String(Math.round(v*100)/100);
      return { text: '反应中A的浓度在 ' + dt + ' s内由 0 变为 ' + dc + ' mol/L，则A的平均反应速率 v=ΔC/Δt = ______ mol/(L·s)。',
        answer: vstr, input: 'text', unit: 'mol/(L·s)',
        solution: ['v=ΔC/Δt=' + dc + '/' + dt + '=' + vstr + ' mol/(L·s)。']
      };
    }
  });
  // 盐类水解判断
  T.push({
    id: 'HS-HYDRO-001', kp: '盐类水解', kpId: 'kp-hs-chem', type: 'choice', diff: 2,
    gen: function () { return {
      text: '下列盐溶于水后溶液呈酸性的是（ ）',
      options: ['NH₄Cl', 'Na₂CO₃', 'CH₃COONa', 'NaCl'],
      answer: 'NH₄Cl', correct: 0,
      solution: ['NH₄Cl 中 NH₄⁺ 水解使溶液呈酸性；Na₂CO₃、CH₃COONa 弱酸根水解呈碱性；NaCl 强酸强碱盐呈中性。A正确。']
    }; }
  });
  // 有机官能团
  T.push({
    id: 'HS-ORG-001', kp: '有机官能团', kpId: 'kp-hs-chem', type: 'choice', diff: 2,
    gen: function () { return {
      text: '乙醇（CH₃CH₂OH）所含的官能团是（ ）',
      options: ['羟基 -OH', '羧基 -COOH', '醛基 -CHO', '碳碳双键'],
      answer: '羟基 -OH', correct: 0,
      solution: ['乙醇属醇类，官能团是羟基 -OH；羧基是羧酸(如乙酸)，醛基是醛(如乙醛)。A正确。']
    }; }
  });
  // 物质的量浓度计算
  T.push({
    id: 'HS-CONC-001', kp: '物质的量浓度计算', kpId: 'kp-hs-chem', type: 'blank', diff: 2,
    gen: function () {
      var m = E.pick([40, 80, 120]);     // 质量->需摩尔质量对应
      var MB = 40;                        // NaOH 40
      var n = m / MB;
      var V = E.pick([1, 2]);             // 体积L
      var c = n / V;
      return { text: '将 ' + m + ' g NaOH（M=40 g/mol）溶于水配成 ' + V + ' L 溶液，则物质的量浓度 c = n/V = ______ mol/L。',
        answer: String(c), input: 'num', unit: 'mol/L',
        solution: ['n=m/M=' + m + '/40=' + n + ' mol；c=n/V=' + n + '/' + V + '=' + c + ' mol/L。']
      };
    }
  });
  // 化学平衡移动(勒夏特列)
  T.push({
    id: 'HS-SHIFT-001', kp: '化学平衡移动', kpId: 'kp-hs-chem', type: 'choice', diff: 3,
    gen: function () { return {
      text: '对于反应 N₂(g)+3H₂(g)⇌2NH₃(g) ΔH<0（放热），下列措施使平衡正向移动的是（ ）',
      options: ['增大H₂浓度', '升高温度', '减小压强', '使用催化剂'],
      answer: '增大H₂浓度', correct: 0,
      solution: ['勒夏特列原理：增大反应物浓度(H₂)使平衡正向移动(使其浓度下降)；升温使平衡向吸热(逆)方向、减压使平衡向气体分子数增大(逆)方向、催化剂不改变平衡。A正确。']
    }; }
  });

  root.__PREMIUM_CHEMISTRY_HS = T;
})(typeof window !== 'undefined' ? window : globalThis);
