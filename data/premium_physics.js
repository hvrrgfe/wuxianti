/* ============================================================
   无限题 · 物理高分套路模板（福建卷 计算大题方向）
   提炼自B站名师总结的高考物理大题套路:
   - 匀变速运动 追及/相遇
   - 牛顿第二定律 斜面+多物体
   - 动能定理 多过程/变力
   - 动量守恒 碰撞
   - 电磁感应 导体棒切割(v=BLv, E=BLv, F=BIL)
   - 平抛/竖直抛体 运动分解
   所有答案用E工具精确计算, 含套路型solution
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var T = [];

  // ========== 追及相遇：匀加速追匀速 ==========
  // 甲匀速 v, 乙从静止匀加速 a, 求乙追上甲时的位移/时间
  // 相距 d, 追及条件: 1/2 a t² = v t + d(初始在前) => t²-(2v/a)t-(2d/a)=0
  // 简化: 初相距0, 乙追甲(甲在前d): 需 1/2 a t² - v t = d
  T.push({
    id: 'PX-KIN-001', kp: '追及相遇', kpId: 'kp-kin', type: 'blank', diff: 4,
    gen: function () {
      // 甲在乙前方 d0 处同向匀速 v, 乙从静止做匀加速 a 追甲, 求追上的时间
      // 1/2 a t² = v t + d0  => t = [v + √(v²+2ad0)]/a
      // 构造 d0 使 t 为整数: 取 v=2,a=2,d0=1 => t=[2+√(4+4)]/2=[2+√8]/2 非整
      // 用特殊: v=2,a=2,d0=0.75=>v²+2ad0=4+3=7 非平
      // 取 v=2km/h? 换: a=2,v=1,d0=1 v²+2ad=1+4=5 非
      // 构造整数: 令 t=n, d0=0.5 a n² - v n. 取 n=3,a=2,v=2 =>d0=9-6=3
      var n = E.pick([3, 4, 5]); var a = 2, v = 2;
      var d0 = 0.5 * a * n * n - v * n; // = n²-2n
      return {
        text: '甲车以 ' + v + ' m/s 匀速行驶，在甲车前方 ' + d0 + ' m 处，乙车从静止开始以 ' + a + ' m/s² 匀加速追赶甲车，则乙车追上甲车所需时间为 ______ s。',
        answer: String(n),
        solution: ['追及条件：x乙 = x甲 + d₀，即 ½at² = vt + d₀。' +
          '½×' + a + 't² = ' + v + 't + ' + d0 + '，整理 t²−' + v + 't−' + d0 + '=0。' +
          '解得 t = ' + n + ' s（另一根为负舍去）。', '乙追上甲时位移 x乙=½×' + a + '×' + (n * n) + '=' + (a * n * n / 2) + 'm。'],
        input: 'num', unit: 's'
      };
    }
  });

  // ========== 牛顿第二定律：粗糙水平面/斜面 ==========
  // 质量m物体在粗糙水平面，动摩擦因数μ，恒力F水平拉，求加速度
  // a=(F-μmg)/m, 取 g=10, μ, m, F 使 a 为正整数
  T.push({
    id: 'PX-NEW-001', kp: '牛顿第二定律(摩擦)', kpId: 'kp-newton', type: 'blank', diff: 3,
    gen: function () {
      var m = E.pick([2, 3, 4, 5]); var mu = 0.2; var g = 10;
      var f = mu * m * g;                 // 摩擦力
      var a = E.pick([2, 3, 4, 5]);        // 目标加速度
      var F = f + m * a;                   // 拉力
      return {
        text: '质量 ' + m + ' kg 的物体在粗糙水平面上，动摩擦因数 μ = ' + mu + '，现用水平恒力 F = ' + F + ' N 拉动物体（g=10 m/s²），则物体的加速度为 ______ m/s²。',
        answer: String(a),
        solution: ['受力分析：F − f = ma，f = μmg = ' + mu + '×' + m + '×' + g + ' = ' + f + ' N。' +
          '则 ' + F + ' − ' + f + ' = ' + m + '·a，解得 a = ' + a + ' m/s²。'],
        input: 'num', unit: 'm/s²'
      };
    }
  });

  // ========== 动能定理：多过程/功 ==========
  // 质量m物体从静止在恒力F(水平)作用下前进s，摩擦力f恒定，求末速度
  // 动能定理: (F-f)s = 1/2 m v² => v=√(2(F-f)s/m)
  // 构造 v 整数: 取 2(F-f)s/m 为平方数
  T.push({
    id: 'PX-ENERGY-001', kp: '动能定理', kpId: 'kp-work', type: 'blank', diff: 4,
    gen: function () {
      // 构造净合力(net)为整数: v=4,m=2 => net=m·v²/(2s)=16/s, 取 s∈{2,4} 使 net 为整数
      var v = 4, m = 2;
      var s = E.pick([2, 4]);
      var net = m * v * v / (2 * s);       // 合力 F-f (16/2=8 或 16/4=4, 整数)
      var f = 2, F = net + f;
      return {
        text: '质量 ' + m + ' kg 的物体从静止开始在水平恒力 F = ' + F + ' N 作用下沿水平面运动 ' + s + ' m，受到的阻力恒定 f = ' + f + ' N，则物体到达该位置时的速度为 ______ m/s。',
        answer: String(v),
        solution: ['动能定理：合外力做功 = 动能变化 = ½mv²。' +
          '合外力 F合 = F − f = ' + F + ' − ' + f + ' = ' + net + ' N。' +
          'W = F合·s = ' + net + '×' + s + ' = ' + (net * s) + ' J = ½×' + m + '×v²，解得 v = ' + v + ' m/s。'],
        input: 'num', unit: 'm/s²'
      };
    }
  });

  // ========== 动量守恒：完全弹性碰撞(等质量交换) ==========
  // 质量m1、m2两球，m1以v1撞静止m2(光滑水平面)，完全弹性碰撞
  // v1'=(m1-m2)v1/(m1+m2), v2'=2m1·v1/(m1+m2)
  // 构造整数: 取 m1=2m2 => v1'=v1/3, v2'=4v1/3
  T.push({
    id: 'PX-MOM-001', kp: '动量守恒(碰撞)', kpId: 'kp-momentum', type: 'blank', diff: 4,
    gen: function () {
      var m1 = E.pick([2, 4]); var m2 = m1 / 2;   // m1=2m2
      var v1 = E.ri(3, 6);                          // 撞前速度
      // 弹性碰: v2' = 2m1/(m1+m2)·v1 = 2·2/(2+1)v1=4/3 v1(可能非整)
      // 用 m1=m2 等质量弹性碰: 速度交换 v1'=0, v2'=v1 (整数!)
      m1 = m2 = E.pick([1, 2, 3]); v1 = E.ri(3, 6);
      return {
        text: '在光滑水平面上，质量均为 ' + m1 + ' kg 的两球，A 球以速度 ' + v1 + ' m/s 撞向静止的 B 球，发生完全弹性碰撞。碰撞后 B 球的速度为 ______ m/s。',
        answer: String(v1),
        solution: ['等质量完全弹性碰撞：速度交换。' +
          '动量守恒且动能守恒，令两球等质量解得：v₁\'=0，v₂\'=v₁=' + v1 + ' m/s。' +
          '故 A 球静止(0 m/s)，B 球以 ' + v1 + ' m/s 前进。'],
        input: 'num', unit: 'm/s'
      };
    }
  });

  // ========== 电磁感应：导体棒匀速切割 ==========
  // B、L、v 求感应电动势 E=BLv；回路电阻R求感应电流I=E/R；安培力F=BIL
  T.push({
    id: 'PX-EM-001', kp: '电磁感应(切割)', kpId: 'kp-em', type: 'blank', diff: 5,
    gen: function () {
      // 使 E=BLv 为整数: 构造 B·L = bl (1或2), v 为整数
      var bl = E.pick([1, 2]);                       // B·L 的乘积
      var v = E.pick([4, 5, 8, 10]);
      var E0 = bl * v;                               // 感应电动势, 整数
      // 从可凑出乘积 bl 的 (B,L) 组合选一组显示
      var combos = bl === 1 ? [[0.2, 5], [0.5, 2], [0.5, 2]] : [[0.2, 10], [0.4, 5], [0.5, 4]];
      var c = E.pick(combos); var B = c[0], L = c[1];
      var R = E.pick([2, 4]);
      var I = Math.round((E0 / R) * 1000) / 1000;
      return {
        text: '水平导轨上，一导体棒以速度 ' + v + ' m/s 匀速切割磁感线，磁感应强度 B = ' + B + ' T，导体棒有效长度 L = ' + L + ' m。回路总电阻 R = ' + R + ' Ω，则感应电动势大小为 ______ V。',
        answer: String(E0),
        solution: ['法拉第电磁感应定律(动生电动势)：E = BLv = ' + B + '×' + L + '×' + v + ' = ' + E0 + ' V。' +
          '若求电流：I = E/R = ' + E0 + '/' + R + ' = ' + I + ' A。'],
        input: 'num', unit: 'V'
      };
    }
  });

  // ========== 平抛运动：水平+竖直分解 ==========
  // 从高h水平抛出，初速度v0，g=10。落地时间t=√(2h/g)，水平位移x=v0·t
  // 构造 h 使 t 整数: h=5时t=1, h=20时t=2
  T.push({
    id: 'PX-KIN-002', kp: '平抛运动', kpId: 'kp-kin', type: 'blank', diff: 3,
    gen: function () {
      var g = 10; var t = E.pick([1, 2, 3]); var h = 0.5 * g * t * t;  // =5t²
      var v0 = E.pick([4, 6, 8]);
      var x = v0 * t;
      return {
        text: '将物体从高 ' + h + ' m 处以水平初速度 ' + v0 + ' m/s 平抛（g=10 m/s²，不计空气阻力），则物体落地所需时间为 ______ s。',
        answer: String(t),
        solution: ['平抛运动竖直方向自由落体：h = ½gt²，t = √(2h/g) = √(' + (2 * h) + '/' + g + ') = ' + t + ' s。' +
          '（水平射程 x = v₀t = ' + v0 + '×' + t + ' = ' + x + ' m，作为参考。）'],
        input: 'num', unit: 's'
      };
    }
  });

  root.__PREMIUM_PHYSICS = T;
})(typeof window !== 'undefined' ? window : globalThis);
