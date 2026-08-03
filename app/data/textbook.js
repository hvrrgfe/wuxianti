// 教材纲目（人教版）· "册→章→节"三级，节级精准出题
// 结构: window.__Textbook[subject] = [ {book, grade, chapters:[{ch,title,kps,sections:[{sec,title,kps}]}]} ]
window.__Textbook = {
  math: [
    { book:"初中衔接", grade:0, chapters:[
      { ch:0, title:"初中基础", kps:["三角形","勾股定理","多边形","幂运算","一次函数","反比例函数","直线交点"], sections:[{sec:"覆",title:"三角形与多边形",kps:["三角形","多边形"]},{sec:"覆",title:"勾股定理",kps:["勾股定理"]},{sec:"覆",title:"幂运算与函数",kps:["幂运算","一次函数","反比例函数"]},] }
    ] },
    { book:"必修第一册", grade:1, chapters:[
      { ch:1, title:"集合与常用逻辑用语", kps:["集合"], sections:[{sec:"1.1",title:"集合的概念",kps:["集合"]},{sec:"1.2",title:"集合间的基本关系",kps:["集合"]},{sec:"1.3",title:"集合的基本运算",kps:["集合"]},{sec:"1.4",title:"充分条件与必要条件",kps:["集合"]},] },
      { ch:2, title:"一元二次函数、方程和不等式", kps:["一元二次方程","韦达定理","一元一次不等式"], sections:[{sec:"2.1",title:"等式性质与不等式性质",kps:["一元一次不等式"]},{sec:"2.2",title:"基本不等式",kps:["一元二次方程"]},{sec:"2.3",title:"二次函数与一元二次方程、不等式",kps:["一元二次方程","韦达定理","一元一次不等式"]},] },
      { ch:3, title:"函数的概念与性质", kps:["一次函数","二次函数","反比例函数","幂运算"], sections:[{sec:"3.1",title:"函数的概念及其表示",kps:["一次函数"]},{sec:"3.2",title:"函数的基本性质",kps:["一次函数","二次函数"]},{sec:"3.3",title:"幂函数",kps:["幂运算"]},{sec:"3.4",title:"函数的应用",kps:["一次函数","二次函数"]},] },
      { ch:4, title:"指数函数与对数函数", kps:["幂运算"], sections:[{sec:"4.1",title:"指数",kps:["幂运算"]},{sec:"4.2",title:"指数函数",kps:["幂运算"]},{sec:"4.3",title:"对数",kps:["幂运算"]},{sec:"4.4",title:"对数函数",kps:["幂运算"]},] },
      { ch:5, title:"三角函数", kps:["三角求值"], sections:[{sec:"5.1",title:"任意角和弧度制",kps:["三角求值"]},{sec:"5.2",title:"三角函数的概念",kps:["三角求值"]},{sec:"5.3",title:"诱导公式",kps:["三角求值"]},{sec:"5.4",title:"三角函数的图象与性质",kps:["三角求值"]},{sec:"5.5",title:"三角恒等变换",kps:["三角求值"]},] }
    ] },
    { book:"必修第二册", grade:2, chapters:[
      { ch:6, title:"平面向量及其应用", kps:["平面向量"], sections:[{sec:"6.1",title:"平面向量的概念",kps:["平面向量"]},{sec:"6.2",title:"平面向量的运算",kps:["平面向量"]},{sec:"6.3",title:"平面向量基本定理及坐标表示",kps:["平面向量"]},{sec:"6.4",title:"平面向量的应用",kps:["平面向量"]},] },
      { ch:7, title:"复数", kps:["复数"], sections:[{sec:"7.1",title:"复数的概念",kps:["复数"]},{sec:"7.2",title:"复数的四则运算",kps:["复数"]},] },
      { ch:8, title:"立体几何初步", kps:["立体几何"], sections:[{sec:"8.1",title:"基本立体图形",kps:["立体几何"]},{sec:"8.2",title:"立体图形的直观图",kps:["立体几何"]},{sec:"8.3",title:"简单几何体的表面积与体积",kps:["立体几何"]},{sec:"8.6",title:"空间直线、平面的垂直",kps:["立体几何"]},] },
      { ch:9, title:"统计", kps:["平均数/中位数"], sections:[{sec:"9.1",title:"随机抽样",kps:["平均数/中位数"]},{sec:"9.2",title:"用样本估计总体",kps:["平均数/中位数"]},] },
      { ch:10, title:"概率", kps:["古典概型"], sections:[{sec:"10.1",title:"随机事件与概率",kps:["古典概型"]},{sec:"10.2",title:"事件的相互独立性",kps:["古典概型"]},{sec:"10.3",title:"频率与概率",kps:["古典概型"]},] }
    ] },
    { book:"选择性必修第一册", grade:3, chapters:[
      { ch:1, title:"空间向量与立体几何", kps:["空间向量"], sections:[{sec:"1.1",title:"空间向量及其运算",kps:["空间向量"]},{sec:"1.3",title:"空间向量坐标表示与应用",kps:["空间向量"]},] },
      { ch:2, title:"直线和圆的方程", kps:["直线交点","圆·扇形"], sections:[{sec:"2.3",title:"直线的交点坐标与距离公式",kps:["直线交点"]},{sec:"2.4",title:"圆的方程",kps:["圆·扇形"]},{sec:"2.5",title:"直线与圆的位置关系",kps:["直线交点","圆·扇形"]},] },
      { ch:3, title:"圆锥曲线的方程", kps:["圆锥曲线"], sections:[{sec:"3.1",title:"椭圆",kps:["圆锥曲线"]},{sec:"3.2",title:"双曲线",kps:["圆锥曲线"]},{sec:"3.3",title:"抛物线",kps:["圆锥曲线"]},] }
    ] },
    { book:"选择性必修第二册", grade:4, chapters:[
      { ch:4, title:"数列", kps:["等差数列","等比数列"], sections:[{sec:"4.1",title:"数列的概念",kps:["等差数列"]},{sec:"4.2",title:"等差数列",kps:["等差数列"]},{sec:"4.3",title:"等比数列",kps:["等比数列"]},] },
      { ch:5, title:"一元函数的导数及其应用", kps:["导数"], sections:[{sec:"5.1",title:"导数的概念及其意义",kps:["导数"]},{sec:"5.2",title:"导数的运算",kps:["导数"]},{sec:"5.3",title:"导数在研究函数中的应用",kps:["导数"]},] }
    ] },
    { book:"选择性必修第三册", grade:5, chapters:[
      { ch:6, title:"计数原理", kps:["排列组合"], sections:[{sec:"6.1",title:"分类加法与分步乘法计数原理",kps:["排列组合"]},{sec:"6.2",title:"排列与组合",kps:["排列组合"]},{sec:"6.3",title:"二项式定理",kps:["排列组合"]},] },
      { ch:7, title:"随机变量及其分布", kps:["随机变量"], sections:[{sec:"7.2",title:"离散型随机变量及其分布列",kps:["随机变量"]},{sec:"7.3",title:"离散型随机变量的数字特征",kps:["随机变量"]},{sec:"7.4",title:"二项分布与超几何分布",kps:["随机变量"]},] },
      { ch:8, title:"成对数据的统计分析", kps:["成对数据回归"], sections:[{sec:"8.1",title:"成对数据的统计相关性",kps:["成对数据回归"]},{sec:"8.2",title:"一元线性回归模型及其应用",kps:["成对数据回归"]},{sec:"8.3",title:"列联表与独立性检验",kps:["成对数据回归"]},] }
    ] },
  ],
  physics: [
    { book:"初中衔接", grade:0, chapters:[
      { ch:0, title:"初中物理基础", kps:["密度","压强"], sections:[{sec:"覆",title:"密度",kps:["密度"]},{sec:"覆",title:"压强",kps:["压强"]},] }
    ] },
    { book:"必修第一册", grade:1, chapters:[
      { ch:1, title:"运动的描述", kps:["速度"], sections:[{sec:"1.3",title:"位置变化快慢的描述——速度",kps:["速度"]},{sec:"1.4",title:"速度变化快慢的描述——加速度",kps:["速度"]},] },
      { ch:2, title:"匀变速直线运动的研究", kps:["匀变速直线运动","匀变速位移"], sections:[{sec:"2.2",title:"匀变速直线运动的速度与时间关系",kps:["匀变速直线运动"]},{sec:"2.3",title:"匀变速直线运动的位移与时间关系",kps:["匀变速位移"]},{sec:"2.4",title:"自由落体运动",kps:["匀变速直线运动","匀变速位移"]},] },
      { ch:3, title:"相互作用——力", kps:["重力"], sections:[{sec:"3.1",title:"重力与弹力",kps:["重力"]},] },
      { ch:4, title:"运动和力的关系", kps:["牛顿第二定律"], sections:[{sec:"4.3",title:"牛顿第二定律",kps:["牛顿第二定律"]},{sec:"4.5",title:"牛顿运动定律的应用",kps:["牛顿第二定律"]},] }
    ] },
    { book:"必修第二册", grade:2, chapters:[
      { ch:6, title:"圆周运动", kps:["速度"], sections:[{sec:"6.1",title:"圆周运动",kps:["速度"]},] },
      { ch:8, title:"机械能守恒定律", kps:["功","功率"], sections:[{sec:"8.1",title:"功与功率",kps:["功","功率"]},{sec:"8.4",title:"机械能守恒定律",kps:["功"]},] }
    ] },
    { book:"必修第三册", grade:3, chapters:[
      { ch:11, title:"电路及其应用", kps:["欧姆定律","串联/并联电阻","电路分析"], sections:[{sec:"11.2",title:"导体的电阻",kps:["欧姆定律"]},{sec:"11.4",title:"串联电路和并联电路",kps:["串联/并联电阻","电路分析"]},{sec:"11.2",title:"欧姆定律与电路",kps:["欧姆定律","电路分析"]},] },
      { ch:12, title:"电能 能量守恒定律", kps:["电功率"], sections:[{sec:"12.1",title:"电路中的能量转化",kps:["电功率"]},] }
    ] },
    { book:"选择性必修第一册", grade:3, chapters:[
      { ch:4, title:"光", kps:["光的反射","透镜成像"], sections:[{sec:"4.1",title:"光的折射",kps:["光的反射","透镜成像"]},{sec:"4.2",title:"全反射",kps:["光的反射"]},] }
    ] },
    { book:"概念辨析", grade:5, chapters:[
      { ch:99, title:"物理概念与双项选择", kps:["双项选择·概念"], sections:[{sec:"泛",title:"概念辨析(多选)",kps:["双项选择·概念"]},] }
    ] },
  ],
  chemistry: [
    { book:"初中衔接", grade:0, chapters:[
      { ch:0, title:"初中化学基础", kps:["化合价","相对分子质量"], sections:[{sec:"覆",title:"化合价",kps:["化合价"]},{sec:"覆",title:"相对分子质量",kps:["相对分子质量"]},] }
    ] },
    { book:"必修第一册", grade:1, chapters:[
      { ch:1, title:"物质及其变化", kps:["离子共存","氧化还原","方程式配平"], sections:[{sec:"1.2",title:"离子反应",kps:["离子共存"]},{sec:"1.3",title:"氧化还原反应",kps:["氧化还原","方程式配平"]},] },
      { ch:2, title:"海水中的重要元素——钠和氯", kps:["物质的量","物质的量浓度"], sections:[{sec:"2.3",title:"物质的量",kps:["物质的量","物质的量浓度"]},] }
    ] },
    { book:"必修第二册", grade:2, chapters:[
      { ch:5, title:"化工生产中的重要非金属元素", kps:["原子结构","化学键"], sections:[{sec:"5.1",title:"硫及其化合物",kps:["原子结构"]},{sec:"5.2",title:"氮及其化合物",kps:["化学键"]},] },
      { ch:6, title:"化学反应与能量", kps:["质量守恒"], sections:[{sec:"6.1",title:"化学反应与能量变化",kps:["质量守恒"]},] }
    ] },
    { book:"选择性必修1 化学反应原理", grade:3, chapters:[
      { ch:3, title:"水溶液中的离子反应与平衡", kps:["溶质质量分数","溶液稀释"], sections:[{sec:"3.2",title:"水的电离和溶液的pH",kps:["溶液稀释"]},{sec:"3.3",title:"盐类的水解",kps:["溶质质量分数"]},] }
    ] },
  ],
  biology: [
    { book:"初中衔接", grade:0, chapters:[
      { ch:0, title:"初中生物基础", kps:["生态系统组成"], sections:[{sec:"覆",title:"生态系统概述",kps:["生态系统组成"]},] }
    ] },
    { book:"必修1 分子与细胞", grade:1, chapters:[
      { ch:2, title:"组成细胞的分子", kps:["代谢计算"], sections:[{sec:"2.4",title:"蛋白质是生命活动的主要承担者",kps:["代谢计算"]},{sec:"2.5",title:"核酸是遗传信息的携带者",kps:["代谢计算"]},] },
      { ch:5, title:"细胞的能量供应与利用", kps:["细胞呼吸","能量代谢"], sections:[{sec:"5.2",title:"细胞的能量\"货币\"ATP",kps:["能量代谢"]},{sec:"5.3",title:"细胞呼吸的原理和应用",kps:["细胞呼吸","代谢计算","能量代谢"]},{sec:"5.4",title:"光合作用与能量转化",kps:["能量代谢","代谢计算"]},] },
      { ch:6, title:"细胞的生命历程", kps:["细胞分裂"], sections:[{sec:"6.1",title:"细胞的增殖(有丝分裂)",kps:["细胞分裂"]},] }
    ] },
    { book:"必修2 遗传与进化", grade:3, chapters:[
      { ch:1, title:"遗传因子的发现", kps:["遗传·配子比例","遗传·性状分离比"], sections:[{sec:"1.1",title:"孟德尔的豌豆杂交实验(一)",kps:["遗传·性状分离比","遗传·配子比例"]},{sec:"1.2",title:"孟德尔的豌豆杂交实验(二)",kps:["遗传·配子比例"]},] },
      { ch:2, title:"基因和染色体的关系", kps:["遗传·患病概率"], sections:[{sec:"2.3",title:"伴性遗传",kps:["遗传·患病概率"]},] },
      { ch:4, title:"基因的表达", kps:["基因表达"], sections:[{sec:"4.1",title:"基因指导蛋白质的合成",kps:["基因表达"]},] }
    ] },
    { book:"选择性必修1 稳态与调节", grade:4, chapters:[
      { ch:2, title:"神经调节", kps:["神经调节"], sections:[{sec:"2.2",title:"神经调节的基本方式",kps:["神经调节"]},{sec:"2.3",title:"神经冲动的产生和传导",kps:["神经调节"]},] },
      { ch:3, title:"体液调节", kps:["血糖调节"], sections:[{sec:"3.2",title:"激素调节的过程(血糖)",kps:["血糖调节"]},] },
      { ch:4, title:"免疫调节", kps:["免疫调节"], sections:[{sec:"4.1",title:"免疫系统的组成和功能",kps:["免疫调节"]},{sec:"4.2",title:"特异性免疫",kps:["免疫调节"]},] }
    ] },
    { book:"选择性必修2 生物与环境", grade:4, chapters:[
      { ch:1, title:"种群及其动态", kps:["种群增长"], sections:[{sec:"1.1",title:"种群的数量特征",kps:["种群增长"]},{sec:"1.2",title:"种群数量的变化",kps:["种群增长"]},] },
      { ch:3, title:"生态系统及其稳定性", kps:["生态系统组成"], sections:[{sec:"3.1",title:"生态系统的结构",kps:["生态系统组成"]},] }
    ] },
  ],
  english: [
    { book:"必修第一册", grade:1, chapters:[
      { ch:1, title:"基本时态与交际", kps:["一般现在时","现在完成时","一般过去时","情景交际"], sections:[{sec:"1.1",title:"一般现在时",kps:["一般现在时"]},{sec:"1.2",title:"一般过去时",kps:["一般过去时"]},{sec:"1.3",title:"现在完成时",kps:["现在完成时"]},{sec:"1.4",title:"情景交际",kps:["情景交际"]},] }
    ] },
    { book:"必修第二册", grade:2, chapters:[
      { ch:2, title:"语态·一致·词汇", kps:["被动语态","主谓一致","词汇辨析"], sections:[{sec:"2.1",title:"被动语态",kps:["被动语态"]},{sec:"2.2",title:"主谓一致",kps:["主谓一致"]},{sec:"2.3",title:"词汇辨析",kps:["词汇辨析"]},] }
    ] },
    { book:"选择性必修第一册", grade:3, chapters:[
      { ch:3, title:"从句·非谓语·搭配", kps:["定语从句","非谓语动词","固定搭配"], sections:[{sec:"3.1",title:"定语从句",kps:["定语从句"]},{sec:"3.2",title:"非谓语动词",kps:["非谓语动词"]},{sec:"3.3",title:"固定搭配",kps:["固定搭配"]},] }
    ] },
    { book:"选择性必修第二册", grade:4, chapters:[
      { ch:4, title:"名词性从句", kps:["名词性从句"], sections:[{sec:"4.1",title:"宾语从句",kps:["名词性从句"]},{sec:"4.2",title:"主语从句·表语从句",kps:["名词性从句"]},] }
    ] },
  ],
  chinese: [
    { book:"口诀·基础", grade:1, chapters:[
      { ch:1, title:"字音字形", kps:["字音","字音字形"], sections:[{sec:"1.1",title:"字音",kps:["字音"]},{sec:"1.2",title:"字音字形",kps:["字音字形"]},] },
      { ch:2, title:"成语运用", kps:["成语运用"], sections:[{sec:"2.1",title:"成语辨析与运用",kps:["成语运用"]},] },
      { ch:3, title:"文学常识", kps:["文学常识"], sections:[{sec:"3.1",title:"文学文化常识",kps:["文学常识"]},] }
    ] },
    { book:"默写·病句", grade:2, chapters:[
      { ch:4, title:"名句默写", kps:["名句默写","名句理解性默写"], sections:[{sec:"4.1",title:"直接默写",kps:["名句默写"]},{sec:"4.2",title:"理解性默写",kps:["名句理解性默写"]},] },
      { ch:5, title:"病句辨析", kps:["病句辨析"], sections:[{sec:"5.1",title:"搭配不当·成分残缺",kps:["病句辨析"]},{sec:"5.2",title:"语序不当·句式杂糅",kps:["病句辨析"]},] }
    ] },
    { book:"综合", grade:5, chapters:[
      { ch:6, title:"古诗文名句", kps:["名句默写","名句理解性默写"], sections:[{sec:"6.1",title:"直接默写",kps:["名句默写"]},{sec:"6.2",title:"理解性默写",kps:["名句理解性默写"]},] },
      { ch:7, title:"语言文字运用", kps:["病句辨析","成语运用","字音字形"], sections:[{sec:"7.1",title:"基础综合·字音字形",kps:["字音字形"]},{sec:"7.2",title:"成语·病句综合",kps:["成语运用","病句辨析"]},] }
    ] },
  ],
};
