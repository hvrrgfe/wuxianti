// 教材纲目（人教版 A 版）· 用于"按教材章节"精准出题
// 结构: window.__Textbook[subject] = [ {book, grade, chapters:[{ch, title, kps:[知识点]}]} ]
// kps 引用模板库的 kp（知识点名），出题时按所在章节智能推荐
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
        { ch:6, title:'平面向量及其应用' },
        { ch:7, title:'复数', kps:['复数'] },
        { ch:8, title:'立体几何初步' },
        { ch:9, title:'统计', kps:['平均数/中位数'] },
        { ch:10, title:'概率', kps:['古典概型'] }
      ] },
    { book:'选择性必修第一册', grade:3,
      chapters:[
        { ch:1, title:'空间向量与立体几何' },
        { ch:2, title:'直线和圆的方程', kps:['直线交点','圆·扇形'] },
        { ch:3, title:'圆锥曲线的方程' }
      ] },
    { book:'选择性必修第二册', grade:4,
      chapters:[
        { ch:4, title:'数列', kps:['等差数列','等比数列'] },
        { ch:5, title:'一元函数的导数及其应用' }
      ] },
    { book:'选择性必修第三册', grade:5,
      chapters:[
        { ch:6, title:'计数原理' },
        { ch:7, title:'随机变量及其分布' },
        { ch:8, title:'成对数据的统计分析' }
      ] }
  ]
};
// 常用逻辑/初中基础知识点挂为年级0（复习用）
window.__Textbook.math.unshift({ book:'初中衔接', grade:0, chapters:[{ch:0,title:'初中基础',kps:['三角形','勾股定理','多边形','幂运算','一次函数','反比例函数','直线交点']}] });
