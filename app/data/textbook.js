// 教材纲目（人教版 A 版）· 用于"按教材章节"精准出题
// 结构: window.__Textbook[subject] = [ {book, grade, chapters:[{ch, title, kps:[知识点]}]} ]
// kps 引用模板库的 kp（知识点名），出题时按所在章节智能推荐
var kpHas = function (subj) {
  var m = { physics:['速度','匀变速直线运动','匀变速位移','牛顿第二定律','重力','密度','液体压强','压强','功','功率','欧姆定律','串联/并联电阻','电功率','比热容','光的反射','透镜成像','电路分析','双项选择·概念'],
    chemistry:['相对分子质量','溶质质量分数','溶液稀释','物质的量浓度','物质的量','化合价','方程式配平','质量守恒','原子结构','化学键','离子共存','氧化还原'],
    biology:['细胞分裂','细胞呼吸','代谢计算','能量代谢','基因表达','遗传·配子比例','遗传·性状分离比','遗传·患病概率','神经调节','血糖调节','免疫调节','种群增长','生态系统组成'],
    english:['一般现在时','现在完成时','一般过去时','被动语态','主谓一致','非谓语动词','定语从句','名词性从句','固定搭配','词汇辨析','情景交际'],
    chinese:['名句默写','名句理解性默写','成语运用','病句辨析','字音','字音字形','文学常识'] };
  return m[subj] || [];
};
window.__Textbook = {
  math: [
    { book:'必修第一册', grade:1,
      chapters:[
        { ch:1, title:'集合与常用逻辑用语', kps:['集合'] },
        { ch:2, title:'一元二次函数、方程和不等式', kps:['一元二次方程','韦达定理','一元一次不等式'] },
        { ch:3, title:'函数的概念与性质', kps:['一次函数','二次函数','反比例函数'] },
        { ch:4, title:'指数函数与对数函数', kps:['幂运算'] },
        { ch:5, title:'三角函数', kps:['三角求值'] }
      ] },
    { book:'必修第二册', grade:2,
      chapters:[
        { ch:6, title:'平面向量及其应用', kps:['平面向量'] },
        { ch:7, title:'复数', kps:['复数'] },
        { ch:8, title:'立体几何初步', kps:['立体几何'] },
        { ch:9, title:'统计', kps:['平均数/中位数'] },
        { ch:10, title:'概率', kps:['古典概型'] }
      ] },
    { book:'选择性必修第一册', grade:3,
      chapters:[
        { ch:1, title:'空间向量与立体几何', kps:['空间向量'] },
        { ch:2, title:'直线和圆的方程', kps:['直线交点','圆·扇形'] },
        { ch:3, title:'圆锥曲线的方程', kps:['圆锥曲线'] }
      ] },
    { book:'选择性必修第二册', grade:4,
      chapters:[
        { ch:4, title:'数列', kps:['等差数列','等比数列'] },
        { ch:5, title:'一元函数的导数及其应用', kps:['导数'] }
      ] },
    { book:'选择性必修第三册', grade:5,
      chapters:[
        { ch:6, title:'计数原理', kps:['排列组合'] },
        { ch:7, title:'随机变量及其分布', kps:['随机变量'] },
        { ch:8, title:'成对数据的统计分析', kps:['成对数据回归'] }
      ] }
  ],
  physics: [
    { book:'必修第一册', grade:1,
      chapters:[
        { ch:1, title:'运动的描述', kps:['速度'] },
        { ch:2, title:'匀变速直线运动', kps:['匀变速直线运动','匀变速位移'] },
        { ch:3, title:'相互作用——力', kps:['重力'] },
        { ch:4, title:'运动和力的关系', kps:['牛顿第二定律'] }
      ] },
    { book:'必修第二册', grade:2,
      chapters:[
        { ch:6, title:'圆周运动', kps:['速度'] },
        { ch:8, title:'机械能守恒定律', kps:['功','功率'] }
      ] },
    { book:'必修第三册', grade:3,
      chapters:[
        { ch:11, title:'电路及其应用', kps:['欧姆定律','电路分析'] },
        { ch:12, title:'电能 能量守恒定律', kps:['电功率','串联/并联电阻'] }
      ] },
    { book:'选择性必修第一册', grade:3,
      chapters:[
        { ch:4, title:'光及其应用', kps:['光的反射','透镜成像'] }
      ] }
  ],
  chemistry: [
    { book:'初中衔接', grade:0,
      chapters:[
        { ch:0, title:'初中化学基础', kps:['化合价','相对分子质量'] }
      ] },
    { book:'必修第一册', grade:1,
      chapters:[
        { ch:1, title:'物质及其变化', kps:['离子共存','氧化还原','方程式配平'] },
        { ch:2, title:'海水中的重要元素——钠和氯', kps:['物质的量','物质的量浓度'] }
      ] },
    { book:'必修第二册', grade:2,
      chapters:[
        { ch:5, title:'化工生产中的重要非金属元素', kps:['原子结构','化学键'] },
        { ch:6, title:'化学反应与能量', kps:['质量守恒'] }
      ] },
    { book:'选择性必修第一册', grade:3,
      chapters:[
        { ch:3, title:'水溶液中的离子反应与平衡', kps:['溶质质量分数','溶液稀释'] }
      ] }
  ],
  biology: [
    { book:'初中衔接', grade:0,
      chapters:[
        { ch:0, title:'初中生物基础', kps:['生态系统组成'] }
      ] },
    { book:'必修第一册', grade:1,
      chapters:[
        { ch:2, title:'组成细胞的分子', kps:['代谢计算'] },
        { ch:5, title:'细胞的能量供应和利用', kps:['细胞呼吸','能量代谢'] },
        { ch:6, title:'细胞的生命历程', kps:['细胞分裂'] }
      ] },
    { book:'必修第二册', grade:3,
      chapters:[
        { ch:3, title:'基因的本质', kps:['基因表达'] },
        { ch:5, title:'基因突变及其他变异', kps:['细胞分裂'] },
        { ch:1, title:'遗传因子的发现', kps:['遗传·配子比例','遗传·性状分离比'] },
        { ch:2, title:'伴性遗传', kps:['遗传·患病概率'] }
      ] },
    { book:'选择性必修第一册', grade:4,
      chapters:[
        { ch:2, title:'神经调节', kps:['神经调节'] },
        { ch:3, title:'体液调节', kps:['血糖调节'] },
        { ch:4, title:'免疫调节', kps:['免疫调节'] }
      ] },
    { book:'选择性必修第二册', grade:4,
      chapters:[
        { ch:1, title:'种群及其动态', kps:['种群增长'] },
        { ch:2, title:'群落及其演替', kps:['生态系统组成'] }
      ] }
  ],
  english: [
    { book:'必修第一册', grade:1,
      chapters:[
        { ch:1, title:'一般现在时', kps:['一般现在时'] },
        { ch:2, title:'一般过去时', kps:['一般过去时'] },
        { ch:3, title:'现在完成时', kps:['现在完成时'] },
        { ch:4, title:'情景交际', kps:['情景交际'] }
      ] },
    { book:'必修第二册', grade:2,
      chapters:[
        { ch:5, title:'被动语态', kps:['被动语态'] },
        { ch:6, title:'主谓一致', kps:['主谓一致'] },
        { ch:7, title:'词汇辨析', kps:['词汇辨析'] }
      ] },
    { book:'选择性必修第一册', grade:3,
      chapters:[
        { ch:8, title:'定语从句', kps:['定语从句'] },
        { ch:9, title:'非谓语动词', kps:['非谓语动词'] },
        { ch:10, title:'固定搭配', kps:['固定搭配'] }
      ] },
    { book:'选择性必修第二册', grade:4,
      chapters:[
        { ch:11, title:'名词性从句', kps:['名词性从句'] }
      ] }
  ],
  chinese: [
    { book:'必修(a)上册', grade:1,
      chapters:[
        { ch:1, title:'字音字形', kps:['字音','字音字形'] },
        { ch:2, title:'成语运用', kps:['成语运用'] },
        { ch:3, title:'文学常识', kps:['文学常识'] }
      ] },
    { book:'必修(a)下册', grade:2,
      chapters:[
        { ch:4, title:'名句默写', kps:['名句默写','名句理解性默写'] },
        { ch:5, title:'病句辨析', kps:['病句辨析'] }
      ] },
    { book:'选择性必修', grade:5,
      chapters:[
        { ch:6, title:'古诗文名句', kps:['名句默写','名句理解性默写'] },
        { ch:7, title:'语言文字运用', kps:['病句辨析','成语运用','字音字形'] }
      ] }
  ]
};
// 常用逻辑/初中基础知识点挂为年级0（复习用）
window.__Textbook.math.unshift({ book:'初中衔接', grade:0, chapters:[{ch:0,title:'初中基础',kps:['三角形','勾股定理','多边形','幂运算','一次函数','反比例函数','直线交点']}] });
