/* ============================================================
   无限题 · 物理模板库（福建卷，满分100/75分钟）
   单选4×4 + 双选4×6 + 填空/实验 + 计算3题
   覆盖高频考点：匀变速/牛顿/功与能/电学/光学等
   ============================================================ */
(function (root) {
  'use strict';
  var E = root.__Engine;
  var templates = [];
  function fmt1(v) { return Math.round(v * 10) / 10; }

  // ===== 运动学：平均速度 =====
  templates.push({
    id: 'P-KIN-001', kp: '速度', kpId: 'kp-speed', type: 'blank', diff: 1,
    gen: function () {
      var s = E.pick([40, 60, 90, 120, 150]); var t = E.pick([1, 2, 3, 4, 5]);
      if (s % t !== 0) t = E.pick([1, 2, 3, 4, 5]); while (s % t !== 0 && t < 5) t++;
      var v = s / t;
      var tMin = t * 60;
      return { text: '一辆汽车行驶了 ' + s + ' km，用时 ' + t + ' h，则它的平均速度为 ______ km/h。',
        answer: String(v), solution: ['v = s/t = ' + s + '/' + t + ' = ' + v + ' km/h'], input: 'num', unit: 'km/h' };
    }
  });

  // ===== 匀变速：加速度 =====
  templates.push({
    id: 'P-KIN-002', kp: '匀变速直线运动', kpId: 'kp-kinematics', type: 'blank', diff: 2,
    gen: function () {
      var v0 = E.pick([0, 5, 10]); var v = E.pick([15, 20, 25, 30]);
      var t = E.pick([2, 4, 5, 10]);
      var a = (v - v0) / t;
      return { text: '物体做初速度 ' + v0 + ' m/s、末速度 ' + v + ' m/s 的匀加速直线运动，经过 ' + t + ' s，则加速度 a = ______ m/s²。',
        answer: String(a), solution: ['a = (v-v₀)/t = (' + v + '-' + v0 + ')/' + t + ' = ' + a + ' m/s²'], input: 'num', unit: 'm/s²' };
    }
  });
  templates.push({
    id: 'P-KIN-003', kp: '匀变速位移', kpId: 'kp-kinematics', type: 'blank', diff: 2,
    gen: function () {
      var v0 = E.pick([0, 2, 4]); var a = E.pick([2, 3, 4]); var t = E.pick([3, 5, 6]);
      var s = v0 * t + 0.5 * a * t * t;
      return { text: '初速度为 ' + v0 + ' m/s、加速度为 ' + a + ' m/s² 的物体做匀加速直线运动，经 ' + t + ' s 通过的位移 s = ______ m。',
        answer: String(s), solution: ['s = v₀t + ½at² = ' + v0 + '×' + t + ' + ½×' + a + '×' + (t * t) + ' = ' + s + ' m'], input: 'num', unit: 'm' };
    }
  });

  // ===== 牛顿第二定律 =====
  templates.push({
    id: 'P-NEW-001', kp: '牛顿第二定律', kpId: 'kp-newton', type: 'blank', diff: 2,
    gen: function () {
      var m = E.pick([2, 3, 4, 5, 6]); var a = E.pick([2, 3, 4, 5]);
      var F = m * a;
      return { text: '质量 ' + m + ' kg 的物体在力 F 作用下获得 ' + a + ' m/s² 的加速度，则 F = ______ N。',
        answer: String(F), solution: ['F = ma = ' + m + '×' + a + ' = ' + F + ' N'], input: 'num', unit: 'N' };
    }
  });
  templates.push({
    id: 'P-NEW-002', kp: '牛顿第二定律', kpId: 'kp-newton', type: 'blank', diff: 2,
    gen: function () {
      var m = E.pick([2, 5, 10]); var g = 10;
      return { text: '质量为 ' + m + ' kg 的物体静止在水平面上，受到竖直向上的拉力 ' + (m * g + 40) + ' N（取 g=10 m/s²），则物体对地面的压力为 ______ N。',
        answer: String(40), solution: ['F向=mg=' + m + '×10=' + m * g + 'N，拉力T=' + (m * g + 40) + 'N，' + (m * g + 40 > m * g ? '物体将被拉起' : ''), 'N = mg - T = ' + m * g + '-' + (m * g + 40) + ' = -40N（说明物体离开地面）'], input: 'num', unit: 'N' };
    }
  });

  // ===== 重力/质量 =====
  templates.push({
    id: 'P-GRA-001', kp: '重力', kpId: 'kp-gravity', type: 'blank', diff: 1,
    gen: function () {
      var m = E.pick([2, 3, 5, 8, 10, 50]); var g = E.pick([9.8, 10]);
      var G = m * g;
      return { text: '质量 ' + m + ' kg 的物体，重力大小（取 g=' + g + ' N/kg）为 ______ N。',
        answer: (Number.isInteger(G) ? String(G) : fmt1(G)), solution: ['G = mg = ' + m + '×' + g + ' = ' + (Number.isInteger(G) ? G : fmt1(G)) + ' N'], input: 'num', unit: 'N' };
    }
  });

  // ===== 密度 =====
  templates.push({
    id: 'P-DEN-001', kp: '密度', kpId: 'kp-density', type: 'blank', diff: 1,
    gen: function () {
      var m = E.pick([27, 54, 79, 108, 200]); var V = E.pick([10, 20, 30, 40]);
      while (m % V !== 0) V = E.pick([10, 20, 30, 40]);
      var d = m / V;
      return { text: '某金属块质量 ' + m + ' g，体积 ' + V + ' cm³，则其密度为 ______ g/cm³。',
        answer: String(d), solution: ['ρ = m/V = ' + m + '/' + V + ' = ' + d + ' g/cm³'], input: 'num', unit: 'g/cm³' };
    }
  });

  // ===== 液体压强 =====
  templates.push({
    id: 'P-PRE-001', kp: '液体压强', kpId: 'kp-pressure', type: 'blank', diff: 2,
    gen: function () {
      var h = E.pick([1, 2, 3, 5]);
      var p = 1000 * 10 * h;
      return { text: '水深 ' + h + ' m 处（水的密度 1.0×10³ kg/m³，g=10 N/kg）的液体压强为 ______ Pa。',
        answer: String(p), solution: ['p = ρgh = 1.0×10³×10×' + h + ' = ' + p + ' Pa'], input: 'num', unit: 'Pa' };
    }
  });
  // 固体压强
  templates.push({
    id: 'P-PRE-002', kp: '压强', kpId: 'kp-pressure', type: 'blank', diff: 1,
    gen: function () {
      var F = E.pick([20, 50, 100]); var S = E.pick([0.1, 0.2, 0.5]);
      var p = F / S;
      return { text: '压力 ' + F + ' N 作用在面积 ' + S + ' m² 的受力面上，压强为 ______ Pa。',
        answer: String(p), solution: ['p = F/S = ' + F + '/' + S + ' = ' + p + ' Pa'], input: 'num', unit: 'Pa' };
    }
  });

  // ===== 功与功率 =====
  templates.push({
    id: 'P-WORK-001', kp: '功', kpId: 'kp-work', type: 'blank', diff: 1,
    gen: function () {
      var F = E.pick([10, 20, 50]); var s = E.pick([2, 3, 5]);
      var W = F * s;
      return { text: '用 ' + F + ' N 的力沿水平方向推动物体移动 ' + s + ' m，做功为 ______ J。',
        answer: String(W), solution: ['W = Fs = ' + F + '×' + s + ' = ' + W + ' J'], input: 'num', unit: 'J' };
    }
  });
  templates.push({
    id: 'P-POW-001', kp: '功率', kpId: 'kp-power', type: 'blank', diff: 2,
    gen: function () {
      var W = E.pick([200, 300, 600]); var t = E.pick([2, 4, 5, 10]);
      var P = W / t;
      return { text: '用一台机器 ' + t + ' s 内做功 ' + W + ' J，则其功率为 ______ W。',
        answer: String(P), solution: ['P = W/t = ' + W + '/' + t + ' = ' + P + ' W'], input: 'num', unit: 'W' };
    }
  });

  // ===== 欧姆定律 =====
  templates.push({
    id: 'P-OME-001', kp: '欧姆定律', kpId: 'kp-ohm', type: 'blank', diff: 1,
    gen: function () {
      var U = E.pick([6, 9, 12]); var R = E.pick([3, 6, 10]);
      var I = U / R;
      return { text: '电阻 ' + R + ' Ω 两端电压为 ' + U + ' V，流过它的电流为 ______ A。',
        answer: (Number.isInteger(I) ? String(I) : fmt1(I)), solution: ['I = U/R = ' + U + '/' + R + ' = ' + (Number.isInteger(I) ? I : fmt1(I)) + ' A'], input: 'num', unit: 'A' };
    }
  });
  // 串联电阻
  templates.push({
    id: 'P-RES-001', kp: '串联/并联电阻', kpId: 'kp-resist', type: 'blank', diff: 2,
    gen: function () {
      var r1 = E.pick([2, 3, 4, 6]); var r2 = E.pick([2, 3, 4, 6]);
      var mode = E.pick(['series', 'parallel']);
      if (mode === 'series') {
        var Rt = r1 + r2;
        return { text: '两电阻 R₁=' + r1 + ' Ω、R₂=' + r2 + ' Ω 串联，总电阻为 ______ Ω。',
          answer: String(Rt), solution: ['串联 R = R₁+R₂ = ' + r1 + '+' + r2 + ' = ' + Rt + ' Ω'], input: 'num', unit: 'Ω' };
      }
      var Rp = r1 * r2 / (r1 + r2);
      var fN = r1 + r2;
      var gd = E.gcd(r1 * r2, fN);
      var ans = (r1 * r2 / gd) + '/' + (fN / gd);
      return { text: '两电阻 R₁=' + r1 + ' Ω、R₂=' + r2 + ' Ω 并联，总电阻为 ______ Ω。',
        answer: ans, solution: ['并联 1/R = 1/R₁ + 1/R₂，R = R₁R₂/(R₁+R₂) = ' + r1 * r2 + '/' + fN + ' = ' + ans + ' Ω'], input: 'frac', unit: 'Ω' };
    }
  });

  // ===== 电功率 =====
  templates.push({
    id: 'P-ELE-001', kp: '电功率', kpId: 'kp-power', type: 'blank', diff: 2,
    gen: function () {
      var U = E.pick([6, 12, 220]); var I = E.pick([0.5, 1, 2]);
      var P = U * I;
      return { text: '用电器两端电压 ' + U + ' V、通过的电流 ' + I + ' A，则电功率为 ______ W。',
        answer: String(P), solution: ['P = UI = ' + U + '×' + I + ' = ' + P + ' W'], input: 'num', unit: 'W' };
    }
  });

  // ===== 比热容 =====
  templates.push({
    id: 'P-HEAT-001', kp: '比热容', kpId: 'kp-heat', type: 'blank', diff: 2,
    gen: function () {
      var m = E.pick([1, 2]); var dt = E.pick([10, 20, 30]);
      var c = 4200;
      var Q = c * m * dt;
      return { text: '质量为 ' + m + ' kg 的水温度升高 ' + dt + ' ℃（水的比热容 4.2×10³ J/(kg·℃)），吸收的热量为 ______ J。',
        answer: String(Q), solution: ['Q = cmΔt = 4.2×10³×' + m + '×' + dt + ' = ' + Q + ' J'], input: 'num', unit: 'J' };
    }
  });

  // ===== 光学：反射角 =====
  templates.push({
    id: 'P-OPT-001', kp: '光的反射', kpId: 'kp-optics', type: 'choice', diff: 1,
    gen: function () {
      var ang = E.pick([30, 45, 60]);
      return { text: '一束光与平面镜成 ' + ang + '° 角入射，则反射角为（ ）',
        options: [String(ang) + '°', String(90 - ang) + '°', String(2 * ang) + '°', String(180 - ang) + '°'],
        correct: 1, answer: (90 - ang) + '°', solution: ['反射角 = 入射角，入射角 = 90°-' + ang + '° = ' + (90 - ang) + '°'] };
    }
  });

  // ===== 凸透镜成像 =====
  templates.push({
    id: 'P-OPT-002', kp: '透镜成像', kpId: 'kp-optics', type: 'choice', diff: 3,
    gen: function () {
      var f = E.pick([10, 20]);
      var u = f * 2 + E.pick([5, 10]);
      var ans = '倒立、缩小的实像'; var cond = 'u > 2f';
      return { text: '凸透镜焦距 f=' + f + ' cm，物距 u=' + u + ' cm，则成像情况是（ ）',
        options: ['倒立、放大的实像', '倒立、等大的实像', '倒立、缩小的实像', '正立、放大的虚像'],
        correct: 2, answer: ans, solution: [cond + '，成倒立缩小实像'] };
    }
  });

  // ===== 双项选择题（福建特色）=====
  templates.push({
    id: 'P-DUAL-001', kp: '双项选择·概念', kpId: 'kp-concept', type: 'dual', diff: 2,
    gen: function () {
      // 力与运动概念：正确两个
      var which = E.pick(['惯性与力', '能量转化']);
      if (which === '惯性与力') {
        return { text: '关于惯性和力，下列说法正确的有（ ）',
          options: ['物体的质量越大，惯性越大', '力是维持物体运动的原因', '力是改变物体运动状态的原因', '物体不受力时一定静止'],
          answer: [0, 2].join(','), correct: [0, 2], solution: ['惯性只与质量有关，①正确；力改变运动状态而非维持，③正确'] };
      }
      return { text: '关于能量，下列说法正确的有（ ）',
        options: ['动能大小与质量、速度有关', '重力势能与质量、高度有关', '能量转化过程总量不守恒', '摩擦力做功一定为负'],
        answer: [0, 1].join(','), correct: [0, 1], solution: ['动能½mv²与质量和速度正相关，①正确；重力势能mgh与质量和高度正相关，②正确'] };
    }
  });

  // ===== 电路故障（双选/多选）=====
  templates.push({
    id: 'P-DUAL-002', kp: '电路分析', kpId: 'kp-circuit', type: 'dual', diff: 3,
    gen: function () {
      return { text: '关于串联电路，下列说法正确的有（ ）',
        options: ['各处电流相等', '总电压等于各电阻电压之和', '总电阻小于任一电阻', '某处断开，其他用电器仍工作'],
        answer: [0, 1].join(','), correct: [0, 1], solution: ['串联电流处处相等，①正确；串联分压总电压等于各分电压之和，②正确'] };
    }
  });

  root.__PhysicsTemplates = templates;
})(typeof window !== 'undefined' ? window : globalThis);
