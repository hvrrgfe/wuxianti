/* ============================================================
   无限题 · 生物模板库（福建卷，满分100/75分钟）
   单选20×2 = 40 + 非选择60
   覆盖高频考点：细胞/代谢/遗传/调节/生态（计算与概念类可参数化）
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var templates = [];

  // ===== 遗传：配子概率 =====
  templates.push({
    id: 'B-GEN-001', kp: '遗传·配子比例', kpId: 'kp-genetics', type: 'blank', diff: 2,
    gen: function () {
      // Aa × Aa 后代基因型
      var q = E.pick([
        { p: 'Aa', q: 'Aa', target: 'aa', fen: '1/4', sol: 'Aa×Aa → AA:Aa:aa=1:2:1' },
        { p: 'Aa', q: 'aa', target: 'Aa', fen: '1/2', sol: 'Aa×aa → Aa:aa=1:1' },
        { p: 'Aa', q: 'Aa', target: 'AA', fen: '1/4', sol: 'Aa×Aa → AA:Aa:aa=1:2:1' },
        { p: 'AA', q: 'Aa', target: 'Aa', fen: '1/2', sol: 'AA×Aa → AA:Aa=1:1' }
      ]);
      return { text: '基因型为 ' + q.p + ' 与 ' + q.q + ' 的个体杂交，后代出现 ' + q.target + ' 的概率为 ______。',
        answer: q.fen, solution: [q.sol], input: 'frac' };
    }
  });
  // 遗传：性状分离比
  templates.push({
    id: 'B-GEN-002', kp: '遗传·性状分离比', kpId: 'kp-genetics', type: 'blank', diff: 2,
    gen: function () {
      var q = E.pick([
        { cross: 'Aa × Aa', ratio: '3:1', sol: 'Aa×Aa，显性性状:隐性性状 = 3:1' },
        { cross: 'AaBb × aabb', ratio: '1:1:1:1', sol: 'AaBb×aabb 测交，四种表型1:1:1:1' },
        { cross: 'AaBb × AaBb', ratio: '9:3:3:1', sol: 'AaBb×AaBb，自由组合9:3:3:1' }
      ]);
      return { text: '让 ' + q.cross + ' 杂交（各基因自由组合），后代的表现型分离比约为 ______。',
        answer: q.ratio, solution: [q.sol], input: 'text' };
    }
  });
  // 遗传：概率计算（已知显隐性）
  templates.push({
    id: 'B-GEN-003', kp: '遗传·患病概率', kpId: 'kp-genetics', type: 'blank', diff: 3,
    gen: function () {
      // 常染色体隐性遗传病
      var chance = E.pick(['1/4', '1/2']);
      return { text: '某常染色体隐性遗传病由基因 a 控制。若夫妇基因型均为 Aa，则他们生育一个患该病（aa）后代的概率为 ______。',
        answer: '1/4', solution: ['Aa×Aa，aa 概率 = 1/4'], input: 'frac' };
    }
  });

  // ===== 细胞周期/DNA =====
  templates.push({
    id: 'B-CELL-001', kp: '细胞分裂', kpId: 'kp-cell', type: 'choice', diff: 2,
    gen: function () {
      var q = E.pick([
        { t: 'DNA 复制主要发生在细胞周期的哪一时期', opts: ['G1期', 'S期', 'G2期', 'M期'], c: 1, sol: 'DNA 复制发生在 S 期（间期）' },
        { t: '有丝分裂后期细胞内的主要变化是', opts: ['DNA复制', '着丝点分裂，姐妹染色单体分开', '同源染色体联会', '细胞质分裂完成'], c: 1, sol: '后期着丝点分裂，姐妹染色单体分开移向两极' },
        { t: '减数第一次分裂的主要特征是', opts: ['着丝点分裂', '同源染色体联会并分离', 'DNA 复制一次', '染色体数目加倍'], c: 1, sol: '减Ⅰ同源染色体联会、分离' }
      ]);
      return { text: q.t + '（ ）', options: q.opts, correct: q.c, answer: q.opts[q.c], solution: [q.sol] };
    }
  });

  // ===== 细胞代谢：光合/呼吸 =====
  templates.push({
    id: 'B-META-001', kp: '细胞呼吸', kpId: 'kp-metabolism', type: 'choice', diff: 2,
    gen: function () {
      var q = E.pick([
        { t: '有氧呼吸最常用的底物是', opts: ['蛋白质', '脂肪', '葡萄糖', '核酸'], c: 2, sol: '有氧呼吸主要利用葡萄糖' },
        { t: '有氧呼吸三个阶段都参与的酶存在于', opts: ['细胞质基质和线粒体', '叶绿体', '核糖体', '内质网'], c: 0, sol: '有氧呼吸在细胞质基质和线粒体中进行' },
        { t: '光合作用中产生 O₂ 的场所是', opts: ['类囊体薄膜', '叶绿体基质', '细胞质', '线粒体'], c: 0, sol: '光反应在类囊体薄膜上进行，释放 O₂' }
      ]);
      return { text: q.t + '（ ）', options: q.opts, correct: q.c, answer: q.opts[q.c], solution: [q.sol] };
    }
  });

  // ===== 代谢计算：呼吸底物 =====
  templates.push({
    id: 'B-META-002', kp: '代谢计算', kpId: 'kp-metabolism', type: 'blank', diff: 2,
    gen: function () {
      var g = E.pick([2, 3, 6]);
      return { text: '一分子葡萄糖经彻底有氧呼吸可产生 ' + (6) + ' mol CO₂ 和 ' + (6) + ' mol H₂O。若某细胞呼吸消耗了 ' + g + ' mol 葡萄糖，则释放的 CO₂ 为 ______ mol。',
        answer: String(g * 6), solution: ['C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O，1mol 葡萄糖产 6mol CO₂，' + g + 'mol 产 ' + (g * 6) + 'mol'], input: 'num', unit: 'mol' };
    }
  });
  templates.push({
    id: 'B-META-003', kp: '能量代谢', kpId: 'kp-metabolism', type: 'choice', diff: 2,
    gen: function () {
      return { text: '关于 ATP，下列说法正确的是（ ）',
        options: ['ATP 是细胞中的直接能源物质', 'ATP 含 4 个高能磷酸键', 'ATP 水解只发生在呼吸作用中', 'ATP 与 RNA 无关'],
        correct: 0, answer: 'ATP 是细胞中的直接能源物质', solution: ['ATP 是细胞的直接能源物质，其水解释放能量供生命活动'] };
    }
  });

  // ===== 稳态与调节 =====
  templates.push({
    id: 'B-REG-001', kp: '神经调节', kpId: 'kp-regulation', type: 'choice', diff: 2,
    gen: function () {
      return { text: '兴奋在神经元之间传递时，其化学信使是（ ）',
        options: ['神经递质', '电极', 'ATP', '无机盐离子'], correct: 0, answer: '神经递质', solution: ['突触通过神经递质传递信息'] };
    }
  });
  templates.push({
    id: 'B-REG-002', kp: '血糖调节', kpId: 'kp-regulation', type: 'choice', diff: 2,
    gen: function () {
      return { text: '人体内能促进血糖升高的激素是（ ）',
        options: ['胰岛素', '胰高血糖素', '甲状腺激素', '生长激素'], correct: 1, answer: '胰高血糖素', solution: ['胰高血糖素促进血糖升高；胰岛素促进血糖降低'] };
    }
  });
  templates.push({
    id: 'B-REG-003', kp: '免疫调节', kpId: 'kp-regulation', type: 'choice', diff: 3,
    gen: function () {
      return { text: '能产生抗体的细胞是（ ）',
        options: ['T细胞', 'B细胞', '浆细胞（效应B细胞）', '吞噬细胞'], correct: 2, answer: '浆细胞（效应B细胞）', solution: ['浆细胞分泌特异性抗体'] };
    }
  });

  // ===== 生态 =====
  templates.push({
    id: 'B-ECO-001', kp: '种群增长', kpId: 'kp-ecology', type: 'blank', diff: 2,
    gen: function () {
      var n0 = E.pick([100, 200, 400]); var x = E.pick([2, 4]);
      var pop = n0 * Math.pow(2, x);
      return { text: '某种群初始数量为 ' + n0 + '，若每代增长到原来的 2 倍（增长型资源），则 ' + x + ' 代后数量为 ______。',
        answer: String(pop), solution: ['N = N₀·2^t = ' + n0 + '×2^' + x + ' = ' + pop], input: 'num' };
    }
  });
  templates.push({
    id: 'B-ECO-002', kp: '生态系统组成', kpId: 'kp-ecology', type: 'choice', diff: 2,
    gen: function () {
      return { text: '在生态系统中，属于消费者的是（ ）',
        options: ['草', '兔子', '蘑菇', '细菌'], correct: 1, answer: '兔子', solution: ['草是生产者，兔子以草为食是消费者'] };
    }
  });

  // ===== 基因表达 =====
  templates.push({
    id: 'B-GENE-001', kp: '基因表达', kpId: 'kp-gene', type: 'choice', diff: 3,
    gen: function () {
      var q = E.pick([
        { t: '转录的场所主要发生在', opts: ['核糖体', '细胞核', '细胞质', '内质网'], c: 1, sol: '转录主要在细胞核中' },
        { t: '翻译的场所是', opts: ['核糖体', '细胞核', '线粒体内', '溶酶体'], c: 0, sol: '翻译在核糖体上进行' },
        { t: '密码子存在于', opts: ['DNA', 'mRNA', 'tRNA', 'rRNA'], c: 1, sol: 'mRNA 上每3个碱基为一个密码子' }
      ]);
      return { text: q.t + '（ ）', options: q.opts, correct: q.c, answer: q.opts[q.c], solution: [q.sol] };
    }
  });

  root.__BiologyTemplates = templates;
})(typeof window !== 'undefined' ? window : globalThis);
