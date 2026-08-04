/* ============================================================
   无限题 · 生物高分套路模板（福建卷 综合大题方向）
   提炼自B站名师总结的高考生物大题套路:
   - 遗传 双因子自由组合 / 患病概率
   - 基因频率计算
   - 种群增长 J型(λ)/S型 K值
   - 光合作用与呼吸作用 表观光合
   - 生态系统 能量流动/传递效率
   答案精确计算, 含套路型solution
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];
  function frac(n, d) { var g = E.gcd(n, d); return (n / g) + '/' + (d / g); }

  // ========== 遗传：双因子自由组合 ==========
  // 两对独立基因 AaBb×AaBb, F2表现型比例 9:3:3:1, 双显=9/16
  T.push({
    id: 'BX-GEN-001', kp: '遗传·自由组合', kpId: 'kp-genetics', type: 'blank', diff: 4,
    gen: function () {
      // AaBb×AaBb (2对独立基因)
      var target = E.pick([
        { d: '同时具有两种显性性状(A_B_)', f: '9/16' },
        { d: '至少一种显性性状', f: '15/16' },
        { d: '双隐性性状(aabb)', f: '1/16' },
        { d: '只有A显性(A_bb)', f: '3/16' }
      ]);
      return {
        text: '两对独立遗传的基因 A/a 与 B/b，基因型为 AaBb 的个体自交，F₂ 中' + target.d + '的比例为 ______。',
        answer: target.f,
        solution: ['AaBb×AaBb，两对独立，F₂ 表现型比例=9(A_B_):3(A_bb):3(aaB_):1(aabb)。' +
          '故' + target.d + '概率=' + target.f + '。'],
        input: 'frac'
      };
    }
  });

  // ========== 遗传：常染色体隐性遗传病 患病概率 ==========
  // 父母均正常(Aa×Aa)，生患病(隐性aa)孩子概率1/4
  T.push({
    id: 'BX-GEN-002', kp: '遗传·患病概率', kpId: 'kp-genetics', type: 'blank', diff: 3,
    gen: function () {
      var n = E.pick([1, 2, 3, 4]);     // 用于说明, 但主问单孩概率
      var pn = Math.pow(4, n);          // (1/4)^n 的分母
      return {
        text: '一对表现正常的夫妇（基因型 Aa×Aa，A 为显性正常、a 为隐性致病），他们生育一个孩子患病的概率为 ______。',
        answer: '1/4',
        solution: ['Aa×Aa 后代基因型 AA:Aa:aa=1:2:1，仅 aa 患病，概率 = 1/4。' +
          '（若连续生育 ' + n + ' 个孩子全部患病，概率为 (1/4)^' + n + ' = 1/' + pn + '。）'],
        input: 'frac'
      };
    }
  });

  // ========== 基因频率 ==========
  // AA/ Aa/ aa 基因型个体数, 算 A 或 a 频率
  T.push({
    id: 'BX-GEN-003', kp: '基因频率', kpId: 'kp-genetics', type: 'blank', diff: 4,
    gen: function () {
      // 种群中 AA=a, Aa=b, aa=c 个体, 算A频率=(2a+b)/(2(a+b+c))
      var a = E.pick([10, 20, 30]), b = E.pick([30, 40, 50]), c = E.pick([10, 20, 30]);
      var total = a + b + c;
      var numA = 2 * a + b;
      var g = E.gcd(numA, 2 * total);
      var Astr = (numA / g) + '/' + (2 * total / g);
      var Afreq = (numA / (2 * total) * 100);
      var Astr2 = (Math.round(Afreq) === Afreq) ? Math.round(Afreq) + '%' : Astr;
      return {
        text: '某群体中 AA 个体 ' + a + ' 个、Aa 个体 ' + b + ' 个、aa 个体 ' + c + ' 个，则 A 基因的频率为 ______（用分数或百分数表示）。',
        answer: Astr === '1/1' ? '100%' : (Astr2.includes('%') ? Astr2 : Astr2),
        solution: ['等位基因总数 = 2×(' + total + ') = ' + (2 * total) + ' 个。' +
          'A 基因数 = 2×' + a + '+' + b + ' = ' + numA + ' 个。' +
          'A 频率 = ' + numA + '/' + (2 * total) + ' = ' + Astr + ' = ' + Astr2 + '。'],
        input: 'text'
      };
    }
  });

  // ========== 种群增长：J型(指数) ==========
  // Nt = N0 × λ^t
  T.push({
    id: 'BX-POP-001', kp: '种群增长J型', kpId: 'kp-pop', type: 'blank', diff: 3,
    gen: function () {
      var N0 = E.pick([10, 100, 1000]); var lam = E.pick([2, 3]); var t = E.pick([2, 3]);
      var Nt = N0 * Math.pow(lam, t);
      return {
        text: '某种群初始数量为 ' + N0 + '，在理想条件下（J 型增长）每代以 ' + lam + ' 倍增长，则增长 ' + t + ' 代后的种群数量为 ______。',
        answer: String(Nt),
        solution: ['J 型增长公式 Nt = N₀×λᵗ = ' + N0 + '×' + lam + '^' + t + ' = ' + N0 + '×' + Math.pow(lam, t) + ' = ' + Nt + '。'],
        input: 'num'
      };
    }
  });

  // ========== 光合作用与呼吸作用 ==========
  // 表观光合速率=总光合-呼吸。某情境
  T.push({
    id: 'BX-EVO-001', kp: '光合/呼吸作用', kpId: 'kp-meta', type: 'blank', diff: 3,
    gen: function () {
      // 叶肉细胞: 呼吸作用消耗O2=a, 光合作用产生O2=b(b>a)
      // 表观光合(释放到环境)O2 = b-a
      var a = E.pick([2, 3, 4]), b = a + E.pick([2, 4, 6]);   // 总光>呼吸
      var net = b - a;
      return {
        text: '某植物叶肉细胞黑暗中呼吸作用每小时消耗 ' + a + ' 单位 O₂，光照下光合作用每小时产生 ' + b + ' 单位 O₂，则光照下该细胞每小时向细胞外释放的 O₂ 为 ______ 单位。',
        answer: String(net),
        solution: ['净光合(表观)放氧 = 总光合产氧 − 呼吸耗氧 = ' + b + ' − ' + a + ' = ' + net + ' 单位。'],
        input: 'num'
      };
    }
  });

  // ========== 生态系统能量流动 ==========
  // 能量传递效率 = 下一营养级同化量 / 上一营养级同化量
  T.push({
    id: 'BX-ECO-001', kp: '能量传递效率', kpId: 'kp-eco', type: 'blank', diff: 3,
    gen: function () {
      // 生产者同化 E1, 初级消费者同化 E2, 效率=E2/E1
      // 构造效率为20%或10%: 取整
      var eff = E.pick([10, 20]);   // %
      var E1 = E.pick([1000, 2000, 5000]); // 生产者
      var E2 = E1 * eff / 100;             // 消费者同化
      return {
        text: '某生态系统中，生产者固定的太阳能为 ' + E1 + ' kJ，初级消费者同化的能量为 ' + E2 + ' kJ，则该生态系统相邻营养级之间的能量传递效率为 ______%。',
        answer: String(eff),
        solution: ['能量传递效率 = 下一营养级同化量 / 上一营养级同化量 = ' + E2 + '/' + E1 + ' = ' + eff + '%。'],
        input: 'num', unit: '%'
      };
    }
  });

  // ========== 遗传：两对独立性状相乘(XY自由组合总数) ==========
  // AaBb×AaBb 或 AABB 等杂交，求后代某基因型/表现型的种类或数目
  T.push({
    id: 'BX-GEN-004', kp: '遗传·基因型种类', kpId: 'kp-genetics', type: 'blank', diff: 4,
    gen: function () {
      // AaBb × AaBb: 每对杂交后代基因型3种(Aa×Aa→AA,Aa,aa)，两对独立相乘=3×3=9
      var ops = [
        { p: 'AaBb', q: 'AaBb', n: 9, sol: 'Aa×Aa→3种基因型；Bb×Bb→3种；两对相乘 3×3=9 种基因型' },
        { p: 'AaBb', q: 'Aabb', n: 6, sol: 'Aa×Aa→3种；Bb×bb→2种(Bb,bb)；3×2=6 种' },
        { p: 'AaBb', q: 'aabb', n: 4, sol: 'Aa×aa→2种；Bb×bb→2种；2×2=4 种' }
      ];
      var o = E.pick(ops);
      return {
        text: '基因型为 ' + o.p + ' 与 ' + o.q + ' 的两亲本杂交（两对基因独立遗传），后代共有 ______ 种基因型。',
        answer: String(o.n), input: 'num',
        solution: ['按孟德尔自由组合，两对独立性状分别计算再相乘：' + o.sol + '，所以后代基因型总数 = ' + o.n + ' 种。']
      };
    }
  });
  T.push({
    id: 'BX-GEN-005', kp: '遗传·表现型比例', kpId: 'kp-genetics', type: 'blank', diff: 4,
    gen: function () {
      var o = E.pick([
        { p: 'AaBb', q: 'AaBb', n: '9:3:3:1', sol: 'AaBb×AaBb 两对独立显性，F2 表现型比例为 9:3:3:1(双显:一显一隐:一隐一显:双隐)' },
        { p: 'AaBb', q: 'Aabb', n: '3:3:1:1', sol: 'Aa×Aa→3:1；Bb×bb→1:1；组合(3:1)(1:1)=3:3:1:1' }
      ]);
      return {
        text: '基因型为 ' + o.p + ' 与 ' + o.q + ' 杂交（两对独立遗传），后代表现型的比例是 ______（写成分数比，如 9:3:3:1）。',
        answer: o.n, input: 'text',
        solution: [o.sol]
      };
    }
  });

  // ========== 染色体：DNA复制与细胞分裂 ==========
  T.push({
    id: 'BX-CHR-001', kp: '染色体/DNA', kpId: 'kp-cell', type: 'blank', diff: 3,
    gen: function () {
      var n = E.ri(4, 16);   // 一个DNA含的碱基对数(选偶数以保证)
      // 某细胞含 X 个DNA分子，体细胞有 2n 条染色体，每条含1个DNA
      var ch = E.pick([8, 16, 24, 32]);  // 染色体数 (2n)
      var dna = ch;  // 分裂间期前每条1个DNA
      return {
        text: '某种生物的体细胞含有 ' + ch + ' 条染色体，正常情况下其体细胞中含有 ______ 个 DNA 分子。',
        answer: String(ch), input: 'num',
        solution: ['体细胞中每条染色体含有 1 个 DNA 分子（分裂间期外），故 DNA 数 = 染色体数 = ' + ch + ' 个。']
      };
    }
  });

  // ========== 光合作用：净光合速率的计算(hour) ==========
  T.push({
    id: 'BX-PHOTO-002', kp: '光合作用计算', kpId: 'kp-meta', type: 'blank', diff: 4,
    gen: function () {
      var A = E.pick([2, 3, 4]);           // 呼吸作用速率 (mg/h)
      var B = 10 + E.ri(0, 2);             // 光饱和时净光合 (mg/h)
      // 总光合 = 净光合 + 呼吸
      var gross = B + A;
      return {
        text: '某植物黑暗中每小时释放 ' + A + ' mg 的 CO₂（呼吸作用速率），光照下净光合作用每小时固定 ' + B + ' mg CO₂，则该植物在光照下的总光合作用速率为 ______ mg/h。',
        answer: String(gross), input: 'num',
        solution: ['总光合速率 = 净光合速率 + 呼吸速率 = ' + B + ' + ' + A + ' = ' + gross + ' mg/h。']
      };
    }
  });

  root.__PREMIUM_BIOLOGY = T;
})(typeof window !== 'undefined' ? window : globalThis);
