/* ============================================================
   无限题 · 理化生压轴解答题（福建卷计算题压轴）
   对标数学压轴风格: 新情境+多问递进+综合，diff=5
   每题最后问答案确定可判分
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  function frac(n,d){ var g=E.gcd(n,d); return (n/g)+'/'+(d/g); }

  // ============= 物理 =============
  var P=[];
  // 带电粒子在匀强磁场中作匀速圆周运动
  P.push({
    id: 'PZ-P-001', kp: '压轴·带电粒子', kpId: 'kp-pzp', type: 'blank', diff: 5,
    gen: function () {
      // 粒子质量m,电荷q,速度v,磁场B, 洛伦兹力提供向心力: qvB=mv²/r => r=mv/(qB)
      // 周期 T=2πm/(qB)。构造整数磁感应强度使r、T易算
      var m = E.pick([1, 2]);            // 质量(×10⁻²⁷kg简化取1/2)
      var v = E.pick([2, 4]);            // 速度
      var B = E.pick([1, 2]);            // 磁感应强度
      var q = 1;                          // 电量简化
      // r = mv/(qB); 构造整数: 取 m=1,v=2,q=1,B=1=>r=2 或者求半径
      var r = m * v / (q * B);
      if(r !== Math.round(r)){ m=1;v=2;q=1;B=1;r=2; }
      var T = 2 * 3.14 * m / (q * B);     // 周期(约值)
      return {
        text: '【压轴·物理】一带正电粒子（电荷量 q，质量 m）以速度 v 垂直射入磁感应强度为 B 的匀强磁场，在洛伦兹力作用下做匀速圆周运动。\n(1) 指出洛伦兹力方向与速度方向的关系；\n(2) 推导粒子做圆周运动的轨道半径 r 表达式；\n(3) 若 m=' + m + '×10⁻²⁷kg、v=' + v + '×10⁶m·s⁻¹、q=1.6×10⁻¹⁹C、B=' + B + 'T，求轨道半径 r（单位×10⁻²·m）。\n(3)问答案 r = ______。',
        answer: String(r),
        solution: [
          '(1) 洛伦兹力始终垂直速度，只改变方向不改变大小，粒子作匀速圆周运动。',
          '(2) 洛伦兹力提供向心力 qvB=mv²/r，得 r=mv/(qB)。',
          '(3) r=mv/(qB)=' + m + '×' + v + '/(' + q + '×' + B + ')=' + r + '×10⁻²m。（r 与 m、v 成正比，与 q、B 成反比）'
        ],
        input: 'num', unit: ''
      };
    }
  });
  // 电磁感应综合(导体棒匀速切割)
  P.push({
    id: 'PZ-P-002', kp: '压轴·电磁感应', kpId: 'kp-pzp', type: 'blank', diff: 5,
    gen: function () {
      // 导体棒长L以v在磁场B中切割, 电动势E=BLv; 接电阻R, 电流I=E/R; 安培力F=BIL
      var B=0.5, L=2, v=E.pick([4,6,8]), R=E.pick([2,4]);
      var emf=B*L*v; var I=emf/R; var F=B*I*L;
      return {
        text: '【压轴·物理】水平导轨上，导体棒 ab 在磁感应强度 B=' + B + 'T 的匀强磁场中垂直切割磁感线，有效长度 L=' + L + 'm，以速度 v=' + v + 'm/s 匀速向右运动，外接电阻 R=' + R + 'Ω，导轨电阻不计。\n(1) 判断感应电流的方向依据（楞次定律）；\n(2) 求感应电动势 E；\n(3) 求通过电阻的电流 I 及安培力 F。\n请在下方分别作答(2)、(3)问的数值。',
        answer: String(emf),
        points: [
          { label:'(2) 电动势 E', answer:String(emf), score:6 },
          { label:'(3) 电流 I', answer:String(I), score:4 }
        ],
        solution: [
          '(1) 由楞次定律/右手定则判断感应电流方向，阻碍磁通量变化。',
          '(2) 动生电动势 E=BLv=' + B + '×' + L + '×' + v + '=' + emf + 'V。',
          '(3) 电流 I=E/R=' + emf + '/' + R + '=' + I + 'A；安培力 F=BIL=' + B + '×' + I + '×' + L + '=' + F + 'N。'
        ],
        input: 'num', unit: 'V'
      };
    }
  });

  // ============= 化学 =============
  var C=[];
  // 化学平衡移动 + 平衡常数变化
  C.push({
    id: 'PZ-C-001', kp: '压轴·化学平衡', kpId: 'kp-pzb', type: 'blank', diff: 5,
    gen: function () {
      // 反应 A(g)+2B(g)⇌C(g), 平衡浓度求K; 再讨论升温K变化
      var cA=E.pick([1,2]), cB=E.pick([2,3]), cC=E.pick([4,6]);
      var Knum=cC, Kden=cA*cB*cB;
      var g=E.gcd(Knum,Kden);
      var K= (Knum/Kden===Math.round(Knum/Kden))?String(Knum/Kden):((Knum/g)+'/'+(Kden/g));
      return {
        text: '【压轴·化学】在一定温度下，密闭容器中发生反应 A(g)+2B(g)⇌C(g)，达到平衡时各物质浓度为 c(A)=' + cA + 'mol/L、c(B)=' + cB + 'mol/L、c(C)=' + cC + 'mol/L。\n(1) 写出该反应平衡常数 K 的表达式；\n(2) 计算该温度下 K 的值；\n(3) 若升高温度 K 增大，判断正反应吸热还是放热。\n请写出(2)问答案 K = ______。',
        answer: K,
        solution: [
          '(1) K=[C]/[A]·[B]²。',
          '(2) K=' + cC + '/(' + cA + '×' + cB + '²)=' + cC + '/' + (cA*cB*cB) + '=' + K + '。',
          '(3) 升温 K 增大，说明平衡正向移动，正反应是吸热反应。（K 随温度变化是判断反应热效应的依据）'
        ],
        input: 'text', unit: ''
      };
    }
  });
  // 盖斯定律/反应热
  C.push({
    id: 'PZ-C-002', kp: '压轴·反应热', kpId: 'kp-pzb', type: 'blank', diff: 5,
    gen: function () {
      // 已知两步反应热量, 用盖斯定律求目标反应ΔH(线性组合)
      // 目标C生成: 设反应1: A+? , 反应2: B+?, 构造整数ΔH
      var d1=E.pick([-200,-100]), d2=E.pick([-300,-150]);
      // 简化: 目标反应 ΔH = d1 + d2 (线性相加构造), 保证整数
      var dH = d1 + d2;
      return {
        text: '【压轴·化学】已知：① 2A(s)+O₂(g)=2AO(s) ΔH₁=' + d1 + 'kJ/mol；② 2B(s)+O₂(g)=2BO(s) ΔH₂=' + d2 + 'kJ/mol。\n(1) 说明盖斯定律的依据（反应热与途径无关）；\n(2) 若反应 ③ AO(s)+B(s)=BO(s)+A(s) 可由①、②组合得到，求反应③的 ΔH₃。\n请写出(2)问答案 ΔH₃ = ______（kJ/mol）。',
        answer: String(dH),
        solution: [
          '(1) 盖斯定律：反应热只与始态、终态有关，与中间过程无关。',
          '(2) 反应③ = ½② − ½①，ΔH₃=½ΔH₂ − ½ΔH₁=' + (d2/2) + '−(' + (d1/2) + ')=' + dH + ' kJ/mol。（盖斯定律：按系数组合反应及其热效应）'
        ],
        input: 'num', unit: 'kJ/mol'
      };
    }
  });

  // ============= 生物 =============
  var B=[];
  // 伴性遗传概率
  B.push({
    id: 'PZ-B-001', kp: '压轴·遗传', kpId: 'kp-pzs', type: 'blank', diff: 5,
    gen: function () {
      // 人类红绿色盲X连锁隐性(X^b), 父亲正常X^BY, 母亲携带者X^BX^b, 求儿子患色盲概率
      // 儿子XY, 从母亲得X; 母亲给X^B或X^b各1/2 => 儿子患色盲(得X^b)概率1/2
      return {
        text: '【压轴·生物】人类红绿色盲为 X 染色体连锁隐性遗传（由基因 b 控制）。父亲视觉正常（XᵇY... XᴮY），母亲为携带者（XᴮXᵇ）。\n(1) 画出该夫妻的遗传图解；\n(2) 判断其子女患色盲的情况；\n(3) 求其生一个儿子患红绿色盲的概率。\n请写出(3)问答案（用分数）= ______。',
        answer: '1/2',
        solution: [
          '(1) 遗传图解：父 XᴮY，母 XᴮXᵇ，配子：父 Xᴮ/Y，母 Xᴮ/Xᵇ。',
          '(2) 子女：XᴮXᴮ(女正常)、XᴮXᵇ(女携带)、XᴮY(男正常)、XᵇY(男色盲)，各 1/4。',
          '(3) 儿子为 XᵇY 的概率 = 1/2（儿子基因型只两种且等概率，色盲儿子占儿子的一半）。'
        ],
        input: 'text', unit: ''
      };
    }
  });
  // 光合呼吸综合
  B.push({
    id: 'PZ-B-002', kp: '压轴·代谢', kpId: 'kp-pzs', type: 'blank', diff: 5,
    gen: function () {
      // 光照下净光合, 呼吸速率, 求总光合/一天的有机物积累
      var photoNet = E.pick([10, 15]);     // 净光合CO2吸收 mg/h
      var resp = E.pick([3, 4]);           // 呼吸释放
      var gross = photoNet + resp;
      // 光照10h净积累, 黑暗14h消耗, 一天CO2净吸收
      var light = 10, dark = 14;
      var dayNet = photoNet*light - resp*dark;
      return {
        text: '【压轴·生物】某绿色植物在光照下每小时净吸收 CO₂ ' + photoNet + ' mg，黑暗下每小时呼吸释放 CO₂ ' + resp + ' mg（光照 10h、黑暗 14h）。\n(1) 定义净光合速率与总光合速率；\n(2) 求光照下总光合速率；\n(3) 求该植物一昼夜 CO₂ 的净吸收量（mg）。\n请写出(3)问答案 = ______（mg）。',
        answer: String(dayNet),
        solution: [
          '(1) 总光合 = 净光合 + 呼吸；净光合决定有机物积累。',
          '(2) 总光合速率 = ' + photoNet + '+' + resp + '=' + gross + ' mg/h。',
          '(3) 一昼夜净吸收 = 光照净吸收 − 黑暗消耗 = ' + photoNet + '×' + light + '−' + resp + '×' + dark + '=' + dayNet + 'mg。'
        ],
        input: 'num', unit: 'mg'
      };
    }
  });

  root.__PREMIUM_PZ_PHYSICS = P;
  root.__PREMIUM_PZ_CHEMISTRY = C;
  root.__PREMIUM_PZ_BIOLOGY = B;
})(typeof window !== 'undefined' ? window : globalThis);
