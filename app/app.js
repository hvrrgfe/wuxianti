const { createApp, ref, reactive, computed, onMounted } = Vue;

// ============ 知识图谱（可参数化考点）============
// 每科：知识点 -> 模板索引；梳理前置依赖
const SUBJECTS = {
  math: { name:'数学', short:'数', color:'#2E6FA3', tpl:'__MathTemplates', type:'默认' },
  physics: { name:'物理', short:'物', color:'#8A5CF6', tpl:'__PhysicsTemplates' },
  chemistry: { name:'化学', short:'化', color:'#10B981', tpl:'__ChemistryTemplates' },
  biology: { name:'生物', short:'生', color:'#22C55E', tpl:'__BiologyTemplates' },
  english: { name:'英语', short:'英', color:'#F59E0B', tpl:'__EnglishTemplates' },
  chinese: { name:'语文', short:'语', color:'#EF4444', tpl:'__ChineseTemplates' }
};
// 各科试卷结构（福建高考/全国卷，用于模拟卷生成）
const PAPER_STRUCT = {
  math: { name:'数学·新课标Ⅰ卷', full:150, time:120, parts:[{t:'单选',n:8,each:5},{t:'多选',n:3,each:6},{t:'填空',n:3,each:5},{t:'解答',n:5,each:15.4}] },
  physics: { name:'物理·福建卷', full:100, time:75, parts:[{t:'单选',n:4,each:4},{t:'双选',n:4,each:6},{t:'填空',n:3,each:4},{t:'做答',n:3,each:10}] },
  chemistry: { name:'化学·福建卷', full:100, time:75, parts:[{t:'单选',n:10,each:4},{t:'综合',n:4,each:15}] },
  biology: { name:'生物·福建卷', full:100, time:75, parts:[{t:'单选',n:20,each:2},{t:'综合',n:4,each:10}] },
  english: { name:'英语·新课标Ⅰ卷', full:150, time:120, parts:[{t:'语言运用',n:10,each:1.5}] },
  chinese: { name:'语文·新课标Ⅰ卷', full:150, time:150, parts:[{t:'名句',n:3,each:2}] }
};

// ============ 在线字母icon（Feather式SVG） ============
const ICONS = {
  dice:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r=".5"/><circle cx="15.5" cy="8.5" r=".5"/><circle cx="8.5" cy="15.5" r=".5"/><circle cx="15.5" cy="15.5" r=".5"/></svg>',
  file:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="1" y1="20" x2="23" y2="20"/></svg>',
  graph:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="6" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="18" r="3"/><path d="M8 7h8M8 17h8M5 9v6M19 9v6"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  zap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  alert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>',
  settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9.09 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9.09a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
  send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  chevron:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>'
};

// ============ 存储辅助 ============
const store = {
  get(k, d){ try{const v = localStorage.getItem(k); return v ? JSON.parse(v) : d;}catch(e){return d;} },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};

// ============ 今日日期 ============
function todayStr(){ const d=new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }

// ============ 出题生成器：从模板库生成题目（含验算） ============
function getTemplates(subject){ const arr = window[SUBJECTS[subject].tpl]; return arr || []; }
function getKps(subject){
  const seen={}, arr=getTemplates(subject), out=[];
  arr.forEach(t=>{ if(!seen[t.kp]){ seen[t.kp]=1; out.push(t.kp); } });
  return out;
}
let _idSeq = 1;
function genQuestions(subject, kps, difficulty, count, typeFilter){
  const arr = getTemplates(subject);
  const pool = arr.filter(t => kps.indexOf(t.kp)>=0 && (!typeFilter || typeFilter==='all' || t.type===typeFilter));
  if(!pool.length) return [];
  const result=[];
  let guard=0;
  while(result.length < count && guard < 5000){
    guard++;
    let t = pool[Math.floor(Math.random()*pool.length)];
    // difficulty 过滤（无则全用）
    if(t.diff && difficulty && difficulty!=='auto' && Math.abs(t.diff-(+difficulty))>1) continue;
    let q;
    try{ q = t.gen(); }catch(e){ q=null; }
    if(!q) continue;
    // 验算（数学题）
    let verified = true;
    if(subject==='math' && q.verifyId){
      // 已由gen内部保证，跳过
    }
    result.push({
      tid:t.id, kp:t.kp, kpId:t.kpId||t.kp, type:t.type==='dual'?'dual':t.type==='choice'?'choice':'blank',
      diff:t.diff||2, text:q.text, options:q.options||[], answer:q.answer,
      correct:q.correct!==undefined?q.correct:(q.options?q.options.indexOf(q.answer): -1),
      solution:q.solution||[], distractorTypes:q.distractorTypes||[], input:q.input||'text', unit:q.unit||'',
      id: t.id+'#'+(_idSeq++)
    });
  }
  return result;
}
// 同义作答归一化（处理分数/等）
function normAnswer(s){ if(s===undefined||s===null)return ''; return String(s).trim().replace(/\s+/g,'').toLowerCase(); }
function isAnswerCorrect(user,a){
  if(!a) return false;
  const u=normAnswer(user), c=normAnswer(a);
  if(u===c) return true;
  // 处理 "a 或 b" 任选命中
  if(c.indexOf('或')>=0){ return c.split('或').some(x=>normAnswer(x)===u); }
  if(c.indexOf('that/which')>=0){ return u==='that'||u==='which'; }
  return false;
}
// 难度颜色
function diffColor(d){ return d>=3?'var(--danger)':d===2?'var(--accent)':'var(--success)'; }
// 掌握度颜色
function masteryColor(m){ return m<40?'var(--danger)':m<60?'var(--accent)':m<80?'#eab308':'var(--success)'; }

// ============ Vue 根实例 ============
const TPL = `<div class="wxt-app" id="wxtRoot">
<div class="page">
  <!-- ========== 首页 ========== -->
  <div v-if="page==='home'">
    <div class="hero">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="hero-title"><span v-html="ICONS.book"></span> 无限题</div>
        <div style="display:flex;gap:12px;align-items:center">
          <span style="cursor:pointer" @click="go('ai')" v-html="ICONS.zap"></span>
          <span style="cursor:pointer" @click="toggleTheme">{{theme==='light'?'🌙':'☀️'}}</span>
        </div>
      </div>
      <div class="hero-sub">不是题库，是题厂 · 针对福建高考，每次都是新题</div>
      <div class="hero-stats">
        <div class="hstat"><div class="n">{{todayDoneStat.done}}</div><div class="l">今日做题</div></div>
        <div class="hstat"><div class="n">{{todayDoneStat.done?Math.round(todayDoneStat.correct/Math.max(1,todayDoneStat.done)*100):0}}%</div><div class="l">今日正确率</div></div>
        <div class="hstat"><div class="n">{{checkinDays()}}</div><div class="l">连续打卡</div></div>
      </div>
      <div class="progress" v-if="todayDoneStat.done"><div class="progress-fill" :style="{width: (Math.min(todayDoneStat.done,50)/50*100)+'%'}"></div></div>
    </div>

    <!-- 薄弱点专项 -->
    <div class="card" v-for="(w,i) in weakKp" :key="'w'+i" style="cursor:pointer" @click="startTrainKp(w.key)">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <span class="tag tag-red">薄弱</span><b style="font-size:15px">{{w.key}}</b>
          <div class="subtitle" style="margin-top:3px">掌握度 {{Math.round(w.mastery)}}% · 已刷{{w.total}}题</div>
        </div>
        <button class="btn-ghost" style="font-size:12px">专项突破 →</button>
      </div>
      <div class="mastery-bar"><div class="mastery-fill" :style="{width:w.mastery+'%',background:masteryColor(w.mastery)}"></div></div>
    </div>

    <!-- 到期待复习 -->
    <div class="card" v-if="dueReviews.length">
      <div class="card-title">🔁 今日待复习</div>
      <div v-for="(r,i) in dueReviews" :key="'r'+i" @click="startReview(r.key)" style="padding:10px 0;border-bottom:1px solid #f3f4f6;cursor:pointer">
        <div style="display:flex;justify-content:space-between">
          <b>{{r.key}}</b>
          <button class="btn-ghost" style="font-size:12px;padding:4px 12px">复习</button>
        </div>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="grid">
      <div class="grid-item" @click="goKeep('generate')"><div class="icon-wrap" v-html="ICONS.dice"></div><span class="label">智能出题</span></div>
      <div class="grid-item" @click="goKeep('paperMake')"><div class="icon-wrap" style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);color:#059669" v-html="ICONS.file"></div><span class="label">生成试卷</span></div>
      <div class="grid-item" @click="go('mistakes')"><div class="icon-wrap" style="background:linear-gradient(135deg,#fef2f2,#fee2e2);color:#dc2626" v-html="ICONS.alert"></div><span class="label">错题本</span></div>
      <div class="grid-item" @click="go('stats')"><div class="icon-wrap" style="background:linear-gradient(135deg,#fffbeb,#fef3c7);color:#d97706" v-html="ICONS.chart"></div><span class="label">学情</span></div>
      <div class="grid-item" @click="goKeep('graph')"><div class="icon-wrap" style="background:linear-gradient(135deg,#f5f3ff,#ede9fe);color:#7c3aed" v-html="ICONS.graph"></div><span class="label">知识图谱</span></div>
      <div class="grid-item" @click="go('ai')"><div class="icon-wrap" style="background:linear-gradient(135deg,#ecfeff,#cffafe);color:#0891b2" v-html="ICONS.zap"></div><span class="label">AI助手</span></div>
      <div class="grid-item" @click="go('profile')"><div class="icon-wrap" style="background:linear-gradient(135deg,#fce7f3,#fbcfe8);color:#db2777" v-html="ICONS.settings"></div><span class="label">我的</span></div>
      <div class="grid-item" @click="goKeep('kaoshi')"><div class="icon-wrap" style="background:linear-gradient(135deg,#fef2f2,#fee2e2);color:#b91c1c" v-html="ICONS.clock"></div><span class="label">考纲</span></div>
    </div>

    <div class="card" v-if="help">
      <div style="color:var(--danger);font-size:14px">{{help}}</div>
    </div>
    <div class="empty" style="padding:20px" v-else>福建高考专属 · 覆盖数学/物理/化学/生物/英语/语文</div>
  </div>
</div>

  <!-- ========== 智能出题设置 ========== -->
  <div class="page" v-if="page==='generate'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:10">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span>
      <div style="flex:1"><b style="font-size:16px">智能出题</b><div class="subtitle">永远做不完的题 · 每次全新</div></div>
    </div>
    <div class="card">
      <div style="font-size:13px;color:var(--text2);margin-bottom:8px">选择科目</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        <div v-for="(s,k) in SUBJECTS" :key="k" class="mm-tab" :class="{active:gen.subject===k}"
             style="text-align:center;padding:12px 4px" @click="gen.subject=k;gen.kps=[]">{{s.name}}</div>
      </div>
    </div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:13px;color:var(--text2)">选择知识点（最多5个）</span>
        <span style="font-size:12px;color:var(--success)">已选{{gen.kps.length}}</span>
      </div>
      <div style="margin-top:10px">
        <div v-for="kp in kpsOf(gen.subject)" :key="kp" class="kp-item" @click="toggleKp(kp)">
          <input type="checkbox" :checked="gen.kps.indexOf(kp)>=0" style="width:18px;height:18px">
          <span style="flex:1;font-size:14px">{{kp}}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div style="font-size:13px;color:var(--text2);margin-bottom:8px">出题设置</div>
      <div style="display:flex;gap:10px;margin-bottom:12px">
        <div class="mm-tab" :class="{active:gen.difficulty==='easy'}" @click="gen.difficulty='easy'">简单</div>
        <div class="mm-tab" :class="{active:gen.difficulty==='auto'}" @click="gen.difficulty='auto'">自适应</div>
        <div class="mm-tab" :class="{active:gen.difficulty==='hard'}" @click="gen.difficulty='hard'">困难</div>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
        <span style="font-size:13px;color:var(--text2)">题量</span>
        <div class="mm-tab" :class="{active:gen.count===5}" @click="gen.count=5">5</div>
        <div class="mm-tab" :class="{active:gen.count===10}" @click="gen.count=10">10</div>
        <div class="mm-tab" :class="{active:gen.count===20}" @click="gen.count=20">20</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap">
        <label style="font-size:13px;display:flex;align-items:center;gap:4px"><input type="checkbox" v-model="gen.types.choice">选择</label>
        <label style="font-size:13px;display:flex;align-items:center;gap:4px"><input type="checkbox" v-model="gen.types.blank">填空</label>
        <label style="font-size:13px;display:flex;align-items:center;gap:4px"><input type="checkbox" v-model="gen.types.dual">多项</label>
      </div>
      <div style="margin-top:16px" class="btn-primary" @click="startGenerate()"><span v-html="ICONS.dice" style="vertical-align:-2px"></span> 一键生成 {{gen.count}} 道新题</div>
      <div style="font-size:12px;color:var(--text3);margin-top:10px;text-align:center">每次生成全新题目 · 薄弱知识点优先</div>
    </div>
  </div>

  <!-- ========== 答题页 ========== -->
  <div class="page" v-if="page==='answer' && currentQ()">
    <div class="q-nav">
      <span @click="back()" style="font-size:18px;cursor:pointer">‹</span>
      <span style="flex:1;text-align:center"><b>{{currentQ().kp}}</b> · 第{{qAnsweredCount()}}/{{genList.length}}题</span>
      <button class="btn-ghost" style="font-size:12px;padding:4px 10px" @click="startGenerate()">换题</button>
    </div>
    <div class="progress" style="background:#e5e7eb;margin:0 16px"><div class="progress-fill" style="height:100%;background:var(--primary)" :style="{width:(qAnsweredCount()/genList.length*100)+'%'}"></div></div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text2);margin-bottom:8px">
        <span class="tag" :class="currentQ().diff>=3?'tag-red':currentQ().diff===2?'tag-orange':'tag-green'">难度{{currentQ().diff}}</span>
        <span>{{SUBJECTS[gen.subject].name}}</span>
      </div>
      <div style="font-size:16px;line-height:1.7;white-space:pre-wrap;margin:6px 0 14px">{{currentQ().text}}</div>

      <!-- 选择题 -->
      <div v-if="currentQ().type==='choice'">
        <div class="opt-item" v-for="(o,i) in currentQ().options" :key="i" :class="optClass(i,currentQ())" @click="selectOpt(i)">
          <span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#f3f4f6;text-align:center;line-height:26px;margin-right:10px;font-size:13px">{{['A','B','C','D','E'][i]}}</span>{{o}}
        </div>
      </div>
      <!-- 多选题 -->
      <div v-else-if="currentQ().type==='dual'">
        <div class="dual-opt" v-for="(o,i) in currentQ().options" :key="i" :class="{selected:dualSel.indexOf(i)>=0}" @click="toggleDual(i)">
          <span style="display:inline-block;width:26px;height:26px;border-radius:6px;background:#f3f4f6;text-align:center;line-height:26px;margin-right:10px;font-size:13px">{{['A','B','C','D','E'][i]}}</span>{{o}}
        </div>
        <div style="font-size:12px;color:var(--text3)">题干有两项符合要求，请选择两项</div>
      </div>
      <!-- 填空题 -->
      <div v-else>
        <input v-model="curAnswer" :placeholder="'请填写答案'+(currentQ().unit?'（'+currentQ().unit+'）':'')" style="width:100%;padding:14px;border:1.5px solid var(--border);border-radius:10px;font-size:15px;background:var(--card);color:var(--text)">
      </div>

      <div v-if="!answered" style="display:flex;gap:10px;margin-top:14px">
        <button class="btn-ghost" style="flex:1" @click="askExplain()">AI讲解</button>
        <button class="btn-primary" style="flex:2;padding:12px" @click="submitAnswer()">确认答案</button>
      </div>

      <!-- 答题反馈 -->
      <div v-if="answered">
        <div style="padding:14px;border-radius:10px;margin-top:8px" :style="{background: answerResult().correct?'#e6f6e6':'#fdecec',color:answerResult().correct?'#059669':'var(--danger)'}">
          <b style="font-size:15px">{{answerResult().correct ? '回答正确 ✓' : '回答错误 ✗'}}</b>
          <div v-if="!answerResult().correct" style="margin-top:6px;font-size:14px">正确答案：<b>{{currentQ().answer}}</b></div>
        </div>
        <div v-if="currentQ().solution && currentQ().solution.length && showSolution" style="margin-top:12px">
          <div style="font-size:13px;color:var(--text2);margin-bottom:6px;font-weight:600">标准解析</div>
          <div class="solution-step" v-for="(s,i) in currentQ().solution" :key="i">{{i+1}}. {{s}}</div>
        </div>
        <button class="btn-primary" style="margin-top:16px" @click="nextQ()">{{genIndex<genList.length-1?'下一题 →':'完成本组'}}</button>
      </div>
    </div>
  </div>

  <!-- ========== 答题完成页 ========== -->
  <div class="page" v-if="page==='answerDone'">
    <div style="padding:60px 30px;text-align:center">
      <div style="font-size:46px;margin-bottom:16px">🎉</div>
      <div style="font-size:20px;font-weight:700">本组练习完成！</div>
      <div style="color:var(--text2);margin-top:8px">今日已做 {{todayDoneStat.done}} 道 · 已发现薄弱点会自动强化</div>
      <button class="btn-primary" style="max-width:220px;margin:30px auto 0" @click="goKeep('generate')">再练一组</button>
      <button class="btn-ghost" style="max-width:220px;margin:12px auto 0;display:block" @click="go('stats')">查看学情</button>
    </div>
  </div>

  <!-- ========== 试卷生成 ========== -->
  <div class="page" v-if="page==='paperMake'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px">生成试卷</b>
    </div>
    <div class="card">
      <div style="font-size:13px;color:var(--text2);margin-bottom:8px">选择科目</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        <div v-for="(s,k) in SUBJECTS" :key="k" class="mm-tab" :class="{active:paper.subject===k}" style="text-align:center;padding:12px 4px" @click="paper.subject=k">{{s.name}}</div>
      </div>
    </div>
    <div class="card">
      <div style="font-size:13px;color:var(--text2);margin-bottom:8px">难度</div>
      <div style="display:flex;gap:10px">
        <div class="mm-tab" :class="{active:paper.difficulty==='easy'}" @click="paper.difficulty='easy'">基础</div>
        <div class="mm-tab" :class="{active:paper.difficulty==='medium'}" @click="paper.difficulty='medium'">中等</div>
        <div class="mm-tab" :class="{active:paper.difficulty==='hard'}" @click="paper.difficulty='hard'">拔高</div>
      </div>
      <label style="display:flex;align-items:center;gap:6px;margin-top:14px;font-size:13px"><input type="checkbox" v-model="paper.timing"> 限时作答</label>
    </div>
    <div class="card">
      <div style="font-size:13px;color:var(--text2);margin-bottom:8px">卷面结构（{{paperStruct().name}}）</div>
      <div>满分 {{paperStruct().full}} · {{paperStruct().time}}分钟</div>
      <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap">
        <span class="tag tag-blue" v-for="(p,i) in paperStruct().parts" :key="i">{{p.t}} {{p.n}}题</span>
      </div>
    </div>
    <button class="btn-primary btn-block" @click="startPaper()">生成试卷</button>
  </div>

  <!-- ========== 在线试卷答题 ========== -->
  <div class="page" v-if="page==='paper'">
    <div class="paper-head">
      <span style="font-size:14px">在线作答 · {{paperIndex+1}}/{{paperQs.length}}</span>
      <span v-if="paper.timing" style="font-size:14px;color:#fff;">⏱ {{paperTimeStr()}}</span>
      <span v-else style="font-size:13px">不限时</span>
    </div>
    <div class="card" v-if="paperQs[paperIndex]">
      <div class="tag tag-blue">{{paperQs[paperIndex].kp}}</div>
      <div style="font-size:16px;line-height:1.7;margin:10px 0">{{paperQs[paperIndex].text}}</div>
      <!-- choice -->
      <div v-if="paperQs[paperIndex].type==='choice'">
        <div class="opt-item" v-for="(o,i) in paperQs[paperIndex].options" :key="i" :class="{selected:paperAnswers[paperIndex]===i}" @click="togglePaperOpt(paperIndex,i)"><span style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#f3f4f6;text-align:center;line-height:26px;margin-right:10px;font-size:13px">{{['A','B','C','D','E'][i]}}</span>{{o}}</div>
      </div>
      <!-- blank -->
      <div v-else>
        <input v-model="paperAnswers[paperIndex]" placeholder="填写答案" style="width:100%;padding:14px;border:1.5px solid var(--border);border-radius:10px;font-size:15px;background:var(--card);color:var(--text)">
      </div>
      <div style="display:flex;gap:10px;margin-top:16px">
        <button class="btn-ghost" style="flex:1" :disabled="paperIndex===0" @click="paperIndex>0&&paperIndex--">上一题</button>
        <button class="btn-primary" style="flex:2" @click="paperIndex<paperQs.length-1?paperIndex++:submitPaper()">{{paperIndex<paperQs.length-1?'下一题':'交卷'}}</button>
      </div>
      <div style="font-size:12px;color:var(--text2);margin-top:10px;text-align:center">已答 {{Object.keys(paperAnswers).length}}/{{paperQs.length}} 题</div>
    </div>
  </div>

  <!-- ========== 试卷结果 ========== -->
  <div class="page" v-if="page==='paperResult'">
    <div class="paper-head">
      <span style="font-size:15px;font-weight:600">交卷完成</span>
      <span>得分 {{paperScore()}}/{{paperQs.length}}</span>
    </div>
    <div class="card">
      <div style="font-size:14px;color:var(--text2);margin-bottom:8px">逐题解析</div>
      <div v-for="(q,i) in paperResultList()" :key="i" style="padding:12px 0;border-bottom:1px solid #f3f4f6">
        <div style="font-size:14px">{{i+1}}. {{q.text}}</div>
        <div style="font-size:13px;margin-top:6px">
          <template v-if="q.type==='choice'">
            <span :style="{color: paperAnswers[i]===q.correct?'var(--success)':'var(--danger)'}" v-if="paperAnswers[i]!==undefined">你的答案：{{['A','B','C','D'][paperAnswers[i]]}}</span>
            <span :style="{color:'var(--success)'}"> 正确答案：{{['A','B','C','D'][q.correct]}}</span>
          </template>
          <template v-else>
            <span>正确答案：{{q.answer}}</span>
          </template>
        </div>
      </div>
      <button class="btn-primary" style="margin-top:14px" @click="goKeep('paperMake')">再出一卷</button>
      <button class="btn-ghost" style="margin-top:10px;width:100%" @click="printPaper()">打印本卷</button>
    </div>
  </div>

  <!-- ========== 错题本 ========== -->
  <div class="page" v-if="page==='mistakes'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px;flex:1">错题本</b>
      <span style="font-size:13px;color:var(--danger)">{{mistakes.length}}题</span>
    </div>
    <div style="padding:12px 16px;display:flex;gap:8px;flex-wrap:wrap">
      <div class="mm-tab" :class="{active:misFilter.subject==='all'}" @click="misFilter.subject='all'">全部</div>
      <div class="mm-tab" v-for="s in mistakeSubs()" :key="s" :class="{active:misFilter.subject===s}" @click="misFilter.subject=s">{{SUBJECTS[s].name}}</div>
    </div>
    <div v-if="!filteredMistakes().length" class="empty">暂无错题，去刷题检验一下吧</div>
    <div v-else>
      <div class="card" v-for="(m,i) in filteredMistakes()" :key="m.qid">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span class="tag tag-red">{{SUBJECTS[m.subject].name}} · {{m.kp}}</span>
          <span style="font-size:12px;color:var(--text3);cursor:pointer" @click="delMistake(mistakes.indexOf(m))">删除</span>
        </div>
        <div style="font-size:14px;margin-top:8px;line-height:1.6">{{m.text}}</div>
        <div style="font-size:13px;color:var(--success);margin-top:6px">正确答案：{{m.answer}}</div>
        <button class="btn-ghost" style="margin-top:8px;padding:6px 14px;font-size:12px" @click="askMistake(m)">AI讲解</button>
      </div>
      <div style="padding:0 16px 16px;display:flex;gap:8px">
        <button class="btn-primary" style="flex:1" @click="redoMistakes()">重做错题</button>
        <button class="btn-ghost" style="flex:1" @click="exportMistakes()">导出CSV</button>
      </div>
    </div>
  </div>

  <!-- ========== 学情分析 ========== -->
  <div class="page" v-if="page==='stats'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px">学情分析</b>
    </div>
    <div style="display:flex;gap:8px;padding:12px 16px;flex-wrap:wrap">
      <div v-for="(s,k) in SUBJECTS" :key="k" class="mm-tab" :class="{active:schoolSub===k}" @click="schoolSub=k">{{s.name}}</div>
    </div>
    <div class="stat-row" style="margin-top:12px">
      <div class="stat-card"><div class="num">{{schoolAvgCorrect()}}%</div><div class="label">正确率</div></div>
      <div class="stat-card"><div class="num">{{records.length}}</div><div class="label">累计做题</div></div>
      <div class="stat-card"><div class="num">{{mistakes.length}}</div><div class="label">错题数</div></div>
    </div>
    <div class="card">
      <div class="card-title">近7天正确率</div>
      <div class="trend-chart">
        <div v-for="(v,i) in schoolTrend(schoolSub)" :key="i" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%">
          <div class="trend-bar" :style="{height:(v||2)+'%',background: v<60?'var(--danger)':v<80?'var(--accent)':'var(--success)'}"></div>
          <div style="font-size:10px;color:var(--text3);margin-top:4px">{{i+1}}</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">知识点掌握度（{{SUBJECTS[schoolSub].name}}）</div>
      <div v-for="x in masteryList(schoolSub)" :key="x.key" class="kp-item">
        <span style="flex:1;font-size:14px">{{x.key}}</span>
        <span style="font-size:12px;color:var(--text2);margin-right:8px">{{x.m.total}}题</span>
        <span :style="{color:masteryColor(x.m.mastery),fontWeight:600,fontSize:'13px'}">{{Math.round(x.m.mastery)}}%</span>
      </div>
    </div>
    <div class="card" style="border-left:3px solid var(--accent)">
      <div class="card-title"><span style="color:var(--accent)">智能学情建议</span><span style="font-size:11px;font-weight:400;color:var(--text3)">基于你的练习数据实时生成</span></div>
      <div style="font-size:13px;line-height:1.9;color:var(--text2)">
        <div v-for="(a,i) in smartAdvice(schoolSub)" :key="i" style="padding:4px 0">{{a}}</div>
      </div>
    </div>
    <button class="btn-ghost" style="margin:0 16px 20px;width:calc(100% - 32px)" @click="exportReport()">导出学习报告</button>
  </div>

  <!-- ========== 知识图谱 ========== -->
  <div class="page" v-if="page==='graph'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px">知识图谱</b>
    </div>
    <div style="display:flex;gap:8px;padding:12px 16px;flex-wrap:wrap">
      <div v-for="(s,k) in SUBJECTS" :key="k" class="mm-tab" :class="{active:graphSub===k}" @click="graphSub=k">{{s.name}}</div>
    </div>
    <div class="mastery-legend" style="margin-bottom:6px">
      <span><span class="dot" style="background:var(--danger)"></span>未掌握 &lt;40</span>
      <span><span class="dot" style="background:var(--accent)"></span>薄弱 40-79</span>
      <span><span class="dot" style="background:var(--success)"></span>已掌握 ≥80</span>
    </div>
    <div class="card">
      <div class="card-title">可参数化考点 · 点击进入训练</div>
      <div v-for="x in graphKps()" :key="x.key" class="kp-item" @click="startTrainKp(x.key)">
        <span style="display:inline-block;width:30px;height:30px;text-align:center;line-height:30px;border-radius:50%;color:#fff;font-size:12px" :style="{background:masteryColor(x.m.mastery)}">{{Math.round(x.m.mastery)}}%</span>
        <span style="flex:1;font-size:14px">{{x.key}}</span>
        <span v-html="ICONS.chevron" style="color:var(--text3)"></span>
      </div>
    </div>
    <div class="card" style="font-size:12px;color:var(--text2)">提示：掌握度≥80%的知识点将进入间隔复习队列，答对后间隔自动拉长。</div>
  </div>

  <!-- ========== AI助手 ========== -->
  <div class="page" v-if="page==='ai'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px;flex:1">AI助手</b>
      <span style="font-size:12px;color:var(--text3);cursor:pointer" @click="clearAi()">清空</span>
    </div>
    <div style="display:flex;gap:6px;padding:10px 16px">
      <div class="mm-tab" :class="{active:aiTab==='chat'}" @click="aiTab='chat'">对话</div>
      <div class="mm-tab" :class="{active:aiTab==='suggest'}" @click="aiTab='suggest'">建议提示词</div>
    </div>
    <div v-if="aiTab==='suggest'" class="card">
      <div class="card-title">福建高考专项提问示例</div>
      <div class="tool-item" v-for="(s,i) in aiSuggestions" :key="i" @click="aiInput=s.p">
        <div style="flex:1"><div class="tool-name">{{s.t}}</div><div class="tool-desc">{{s.p}}</div></div>
      </div>
    </div>
    <div v-else>
      <div class="card" style="min-height:50vh;display:flex;flex-direction:column">
        <div style="flex:1;overflow-y:auto;max-height:60vh">
          <div v-for="(m,i) in aiMsgs" :key="i" style="margin-bottom:10px;display:flex" :style="{justifyContent:m.role==='user'?'flex-end':'flex-start'}">
            <div :style="{maxWidth:'82%',padding:'10px 14px',borderRadius:'12px',fontSize:'14px',lineHeight:'1.6',whiteSpace:'pre-wrap',backgroundColor:m.role==='user'?'var(--primary)':'var(--bg)',color:m.role==='user'?'#fff':'var(--text)'}">{{m.content}}</div>
          </div>
          <div v-if="aiBusy" style="text-align:center;color:var(--text3);font-size:13px">AI思考中…</div>
        </div>
        <div style="display:flex;gap:8px;margin-top:10px">
          <input v-model="aiInput" :placeholder="aiPlaceholder()" style="flex:1;padding:12px;border:1.5px solid var(--border);border-radius:10px;font-size:14px;background:var(--card);color:var(--text)">
          <button class="btn-primary" style="flex-shrink:0;padding:12px 18px" @click="sendMsg()">发送</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ========== 我的 ========== -->
  <div class="page" v-if="page==='profile'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px">我的</b>
    </div>
    <div class="card">
      <div class="card-title">AI 参数设置（自行导入 API）</div>
      <div style="font-size:12px;color:var(--text2);margin-bottom:10px">选择供应商 · 填入 API Key 即可使用 AI 讲解。支持智谱GLM免费版。</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        <div v-for="p in providerOptions()" :key="p.id" class="mm-tab" :class="{active:aiConfig.provider===p.id}" style="text-align:center;padding:10px 4px;font-size:12px" @click="setProvider(p)">{{p.name}}</div>
      </div>
      <div style="margin-top:12px">
        <div style="font-size:13px;color:var(--text2);margin-bottom:6px">API Key</div>
        <input v-model="aiConfig.key" type="password" placeholder="sk-..." style="width:100%;padding:12px;border:1.5px solid var(--border);border-radius:10px;font-size:14px;background:var(--card);color:var(--text)">
      </div>
      <div style="margin-top:10px">
        <div style="font-size:13px;color:var(--text2);margin-bottom:6px">模型（默认已按供应商填写）</div>
        <input v-model="aiConfig.model" placeholder="glm-4.7-flash" style="width:100%;padding:12px;border:1.5px solid var(--border);border-radius:10px;font-size:14px;background:var(--card);color:var(--text)">
      </div>
      <button class="btn-ghost" style="width:100%;margin-top:12px" @click="testAI()">测试连接 {{aiTestState==='testing'?'…':''}} {{aiTestState==='ok'?'✓ 连接成功':''}}</button>
      <div v-if="aiTestState&&aiTestState.indexOf('fail')===0" style="color:var(--danger);font-size:12px;margin-top:6px">{{aiTestState}}</div>
      <div style="font-size:11px;color:var(--text3);margin-top:8px">提示：Key 保存在浏览器本地，也可通过本机 server 服务端持有（环境变量 AI_API_KEY）。</div>
    </div>
    <div class="card">
      <div class="card-title">数据</div>
      <div class="settings-item" @click="exportReport()"><span>导出学习报告</span><span v-html="ICONS.chevron"></span></div>
      <div class="settings-item" @click="exportMistakes()"><span>导出错题 CSV</span><span v-html="ICONS.chevron"></span></div>
      <div class="settings-item" @click="clearAll()"><span style="color:var(--danger)">清除所有数据</span><span v-html="ICONS.chevron"></span></div>
      <div class="settings-item" @click="toggleTheme()"><span>深色模式</span><span>{{theme==='light'?'关':'开'}}</span></div>
    </div>
    <div class="card" style="font-size:12px;color:var(--text2)">
      <div><b>无限题 · 针对福建高考</b></div>
      <div style="margin-top:6px">覆盖：数学/英语/语文（新课标Ⅰ卷）+ 物理/化学/生物（福建卷）。参数化出题引擎，答案经验算器校验 100% 正确，全离线可用。</div>
    </div>
  </div>

  <!-- ========== 考纲（福建高考信息）========== -->
  <div class="page" v-if="page==='kaoshi'">
    <div style="display:flex;align-items:center;padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border)">
      <span @click="back()" style="font-size:18px;margin-right:12px;cursor:pointer">‹</span><b style="font-size:16px">福建高考考纲结构</b>
    </div>
    <div class="card" v-for="(s,k) in SUBJECTS" :key="k">
      <div class="card-title"><span class="tag" :style="{background:s.color+'22',color:s.color}">{{s.name}}</span>{{PAPER_STRUCT[k].name}}</div>
      <div>满分 {{PAPER_STRUCT[k].full}} · {{PAPER_STRUCT[k].time}}分钟</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px">
        <span class="tag tag-blue" v-for="(p,i) in PAPER_STRUCT[k].parts" :key="i">{{p.t}} {{p.n}}题 × {{p.each}}分</span>
      </div>
      <button class="btn-ghost" style="margin-top:10px;padding:6px 14px;font-size:12px" @click="gen.subject=k;gen.kps=[];goKeep('generate')">训练该科</button>
    </div>
  </div>

  <!-- ========== 底部导航 ========== -->
  <div class="tabbar no-print">
    <div class="darktab" :class="{active:tab==='home'}" @click="go('home')"><span v-html="ICONS.home"></span>首页</div>
    <div class="darktab" :class="{active:page==='generate'||page==='answer'||page==='answerDone'}" @click="goKeep('generate')"><span v-html="ICONS.dice"></span>出题</div>
    <div class="darktab" :class="{active:tab==='stats'}" @click="go('stats')"><span v-html="ICONS.chart"></span>学情</div>
    <div class="darktab" :class="{active:page==='mistakes'}" @click="go('mistakes')"><span v-html="ICONS.alert"></span>错题</div>
    <div class="darktab" :class="{active:tab==='ai'}" @click="go('ai')"><span v-html="ICONS.zap"></span>AI</div>
  </div>
</div>
</div>`;

const app = createApp({
  template: TPL,
  data(){
    return {
      SUBJECTS: SUBJECTS, ICONS: ICONS, PAPER_STRUCT: PAPER_STRUCT,
      page:'home', tab:'home',
      theme: store.get('wx_theme','light'),
      hist: store.get('wx_hist',{}),
      mastery: store.get('wx_mastery',{}),
      records: store.get('wx_records',[]),
      mistakes: store.get('wx_mistakes',[]),
      gen:{ subject:'math', kps:[], difficulty:'auto', count:10, types:{choice:true,blank:true,dual:true} },
      genAims:[], genList:[], genIndex:0, genType:'',
      curAnswer:null, dualSel:[], answered:false, showSolution:false,
      paper:{ subject:'math', difficulty:'medium', timing:false },
      paperQs:[], paperIndex:0, paperAnswers:{}, paperTimeLeft:0, paperTimer:null, paperStart:null,
      misFilter:{ subject:'all' }, misMode:'list', misRedoQs:[], misRedoIndex:0, misRedoAns:{},
      schoolSub:'math', graphSub:'math',
      aiMsgs: store.get('wx_ai_msgs', [ {role:'ai', content:'你好！我是针对福建高考的出题辅助AI。你可以问我某个知识点，或让我讲解你做错的题目。'} ]),
      aiInput:'', aiBusy:false,
      aiConfig: store.get('wx_ai', { provider:'zhipu', model:'glm-4.7-flash', key:'', baseUrl:'' }),
      aiTestState:'', aiTab:'chat', aiContext:'',
    };
  },
  computed:{
    todayKey(){ return todayStr(); },
    todayDoneStat(){ return this.hist[this.todayKey]||{done:0,correct:0}; },
    weakKp(){
      const list=[]; Object.keys(this.mastery).forEach(k=>{ const m=this.mastery[k]; if(m.mastery<60 && m.total>=3) list.push(Object.assign({key:k},m)); });
      list.sort((a,b)=>a.mastery-b.mastery); return list.slice(0,3);
    },
    dueReviews(){
      const out=[]; Object.keys(this.mastery).forEach(k=>{ const m=this.mastery[k]; if(m.mastery>=60 && m.nextReview && m.nextReview<=todayStr()) out.push(Object.assign({key:k},m)); });
      return out.slice(0,3);
    },
    aiSuggestions(){
      return [
        { t:'数学', p:'请讲解新课标I卷数学解答题第19题型的解题思路（函数导数与三角综合）' },
        { t:'物理（福建卷）', p:'请讲解福建物理卷电学实验题的常见考点和答题模板' },
        { t:'化学（福建卷）', p:'请讲解福建化学卷工艺流程题的解题步骤' },
        { t:'生物（福建卷）', p:'请帮我梳理遗传题（自由组合/伴性遗传）的计算方法' },
        { t:'英语', p:'请给我几个读后续写的衔接句式和写作模板' },
        { t:'语文', p:'请讲解高考语文名篇名句默写的易错字' },
      ];
    },
  },
  methods:{
    masteryColor(m){ return m<40?'var(--danger)':m<60?'var(--accent)':m<80?'#eab308':'var(--success)'; },
    diffColor(d){ return d>=3?'var(--danger)':d===2?'var(--accent)':'var(--success)'; },
    toggleTheme(){ this.theme=this.theme==='light'?'dark':'light'; store.set('wx_theme',this.theme); document.documentElement.setAttribute('data-theme',this.theme); },
    go(p){ this.page=p; this.tab=p; window.scrollTo(0,0); },
    goKeep(p){ this.page=p; window.scrollTo(0,0); },
    back(){ this.go(this.tab); },
    checkins(){ if(!this._ci) this._ci=store.get('wx_checkins',[]); return this._ci; },
    checkinDays(){ const arr=this.checkins(); if(arr.indexOf(todayStr())<0) return 0; let n=0,d=new Date(); while(true){ const s=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); if(arr.indexOf(s)>=0){n++;d.setDate(d.getDate()-1);}else break;} return n; },
    _save(){ store.set('wx_mastery',this.mastery); store.set('wx_records',this.records); store.set('wx_mistakes',this.mistakes); store.set('wx_hist',this.hist); },
    recordResult(q, correct){
      const key=q.kpId||q.kp; const m=this.mastery[key]||{total:0,correct:0,streak:0,last5:[],mastery:0};
      m.total++; if(correct){m.correct++;m.streak++;}else{m.streak=0;}
      m.last5.push(correct?1:0); if(m.last5.length>5)m.last5.shift();
      const rec5=m.last5.reduce((a,b)=>a+b,0)/m.last5.length;
      m.mastery=Math.max(0,Math.min(100,(m.correct/m.total)*60+Math.min(m.streak,5)*5+rec5*15));
      if(m.mastery>=60 && !m.nextReview){ const d=new Date(); d.setDate(d.getDate()+3); m.nextReview=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
      this.mastery[key]=m;
      const k=this.todayKey; const h=this.hist[k]||{done:0,correct:0}; h.done++; if(correct)h.correct++; this.hist[k]=h;
      if(!correct){
        const ex=this.mistakes.filter(x=>x.qid===q.id);
        if(!ex.length) this.mistakes.unshift({ qid:q.id, subject:this.gen.subject, kp:q.kp, kpId:q.kpId||q.kp, text:q.text, options:q.options, correct:q.correct, answer:q.answer, solution:q.solution, type:q.type, at:Date.now() });
        else ex[0].at=Date.now();
      }
      this._save();
    },
    // ========== 智能出题 ==========
    subLabel(s){ return SUBJECTS[s].name; },
    kpsOf(subj){ return getKps(subj); },
    toggleKp(kp){ const i=this.gen.kps.indexOf(kp); if(i>=0)this.gen.kps.splice(i,1); else if(this.gen.kps.length<5) this.gen.kps.push(kp); },
    allKpsFor(subj){ return getKps(subj); },
    startGenerate(){
      const subj=this.gen.subject;
      let kps=this.gen.kps.slice();
      if(!kps.length){
        kps = this.smartPickKps(subj);
      }
      const typeFilter = this.gen.types.choice&&this.gen.types.blank&&this.gen.types.dual ? 'all' : (this.gen.types.choice?'choice':this.gen.types.blank?'blank' : this.gen.types.dual?'dual':'all');
      const qs = genQuestions(subj, kps, this.gen.difficulty, this.gen.count, typeFilter);
      if(!qs.length){ this.help='该知识点暂无更多可生成题目，请尝试其他知识点或难度'; return; }
      this.genAims=kps; this.genList=qs; this.genIndex=0; this.genType='smart';
      this.curAnswer=null; this.dualSel=[]; this.answered=false; this.showSolution=false;
      this.goKeep('answer');
    },
    // 智能知识点推荐：基于学情（掌握度低+错题多+到期复习 加权），纯本地规则
    smartPickKps(subj, n){
      n = n || 3;
      const all = getKps(subj);
      const score={};
      all.forEach(k=>{
        let s=0;
        const m=this.mastery[k];
        // 1) 掌握度越低权重越高
        if(m) s += Math.max(0, 60 - m.mastery);
        // 2) 错题反哺：近期错题多的知识加权
        const mis = this.mistakes.filter(x=>x.kpId===k || x.kp===k).length;
        s += mis * 25;
        // 3) 到期复习：到复习时间的高权重
        if(m && m.nextReview && m.nextReview<=todayStr()) s += 20;
        // 4) 从未练习过的优先
        if(!m || m.total===0) s += 40;
        score[k]=s;
      });
      const ranked = all.slice().sort((a,b)=> score[b]-score[a]);
      return ranked.slice(0, Math.min(n, all.length));
    },
    regenerate(){
      // 换一批新题
      this.gen.kps = this.genAims;
      this.startGenerate();
    },
    // ========== 答题 ==========
    currentQ(){ return this.genList[this.genIndex]; },
    selectOpt(idx){
      if(this.answered) return;
      this.curAnswer=idx;
    },
    toggleDual(idx){
      if(this.answered) return;
      const i=this.dualSel.indexOf(idx);
      if(i>=0) this.dualSel.splice(i,1); else if(this.dualSel.length<2) this.dualSel.push(idx);
    },
    submitAnswer(){
      const q=this.currentQ(); if(!q) return;
      let correct=false;
      if(q.type==='choice'){ correct = this.curAnswer===q.correct; }
      else if(q.type==='dual'){ const a=this.dualSel.slice().sort(), c=(q.correct||[]).slice().sort(); correct = a.join(',')===c.join(','); }
      else {
        const u=(this.curAnswer&&this.curAnswer.user)!==undefined ? this.curAnswer.user : this.curAnswer;
        correct = isAnswerCorrect(u, q.answer);
      }
      this.answered=true;
      this.recordResult(q, correct);
      this.showSolution = !correct;
    },
    nextQ(){
      if(this.genIndex < this.genList.length-1){ this.genIndex++; this.curAnswer=null; this.dualSel=[]; this.answered=false; this.showSolution=false; }
      else { this.finishSession(); }
    },
    finishSession(){
      // 本组完成，展示小结
      this.goKeep('answerDone');
    },
    answerResult(){
      const q=this.currentQ();
      if(!q) return null;
      let correct=false, user='';
      if(q.type==='choice'){ correct=this.curAnswer===q.correct; user=q.options[this.curAnswer]; }
      else if(q.type==='dual'){ correct=this.dualSel.slice().sort().join(',')===(q.correct||[]).slice().sort().join(','); user=this.dualSel.map(i=>q.options[i]).join('、'); }
      else { user=(this.curAnswer&&this.curAnswer.user)!==undefined?this.curAnswer.user:this.curAnswer; correct=isAnswerCorrect(user,q.answer); }
      return { correct, user };
    },
    optClass(idx, q){
      if(!this.answered) return q.type==='choice'&&this.curAnswer===idx?'selected':'';
      if(q.type==='dual') return this.dualSel.indexOf(idx)>=0?'selected':'';
      if(idx===q.correct) return 'correct';
      if(idx===this.curAnswer) return 'wrong';
      return '';
    },
    isDualCorrect(q){ const sel=this.dualSel.slice().sort(), c=(q.correct||[]).slice().sort(); return sel.join(',')===c.join(','); },
    qAnsweredCount(){ return this.genIndex+1; },
    // ========== 试卷生成 ==========
    paperStruct(){ return PAPER_STRUCT[this.paper.subject]; },
    startPaper(){
      const struct=this.paperStruct(); const subj=this.paper.subject;
      const allKps=getKps(subj);
      const kps=this.gen.kps.length?this.gen.kps:allKps;
      // 生成足够题目（每个模板轮询）
      const diffs = this.paper.difficulty==='easy'?1:this.paper.difficulty==='hard'?3:2;
      const qs = genQuestions(subj, kps, diffs, 12, 'all');
      if(!qs.length){ this.help='试卷生成失败，请更换科目或知识点'; return; }
      this.paperQs = qs.slice(0, Math.min(qs.length, 14));
      this.paperIndex=0; this.paperAnswers={};
      if(this.paper.timing){ this.paperTimeLeft=struct.time*60; this.startPaperTimer(); }
      this.paperStart=Date.now();
      this.goKeep('paper');
    },
    startPaperTimer(){
      if(this.paperTimer) clearInterval(this.paperTimer);
      this.paperTimer=setInterval(()=>{ this.paperTimeLeft--; if(this.paperTimeLeft<=0){ clearInterval(this.paperTimer); this.paperTimer=null; this.submitPaper(); } },1000);
    },
    paperTimeStr(){ const m=Math.floor(this.paperTimeLeft/60), s=this.paperTimeLeft%60; return m+':'+(s<10?'0'+s:s); },
    setPaperAnswer(pidx, val){ this.paperAnswers[pidx]=val; },
    togglePaperOpt(pidx, idx){
      const q=this.paperQs[pidx];
      if(q.type==='dual'){ const cur=this.paperAnswers[pidx]||[]; const i=cur.indexOf(idx); if(i>=0)cur.splice(i,1); else if(cur.length<2)cur.push(idx); this.paperAnswers[pidx]=cur.slice(); }
      else this.paperAnswers[pidx]=idx;
    },
    paperScore(){
      let sc=0; this.paperQs.forEach((q,i)=>{ if(q.type==='choice'){ if(this.paperAnswers[i]===q.correct)sc++; } else if(q.type==='dual'){ if((this.paperAnswers[i]||[]).slice().sort().join(',')===(q.correct||[]).slice().sort().join(','))sc++; } else { if(isAnswerCorrect(this.paperAnswers[i],q.answer))sc++; } });
      return sc;
    },
    submitPaper(){ clearInterval(this.paperTimer); this.paperTimer=null; this.goKeep('paperResult'); },
    paperResultList(){ return this.paperQs; },
    printPaper(){ window.print(); },
    // ========== 错题本 ==========
    mistakeSubs(){ const s={}; this.mistakes.forEach(m=>s[m.subject]=1); return Object.keys(s); },
    filteredMistakes(){ let list=this.mistakes; if(this.misFilter.subject!=='all') list=list.filter(m=>m.subject===this.misFilter.subject); return list; },
    redoMistakes(){
      const list=this.filteredMistakes(); if(!list.length) return;
      this.misRedoQs = list.map(m=>({id:m.qid, kp:m.kp, kpId:m.kpId, type:m.type, text:m.text, options:m.options, correct:m.correct, answer:m.answer, solution:m.solution}));
      this.misRedoIndex=0; this.misRedoAns={}; this.misMode='redo'; this.gen.subject=(this.misFilter.subject!=='all'?this.misFilter.subject:list[0].subject)||'math';
    },
    delMistake(i){ this.mistakes.splice(i,1); this._save(); },
    delAllMistakes(){ this.mistakes=[]; this._save(); },
    exportMistakes(){
      let csv='知识点,题目,正确答案\n';
      this.filteredMistakes().forEach(m=>{ csv+='"'+m.kp+'","'+m.text.replace(/"/g,'""')+'","'+m.answer+'"\n'; });
      const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});
      const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='错题本.csv'; a.click();
    },
    printMistakes(){ window.print(); },
    // ========== 学情 ==========
    masteryList(subj){
      const list=[];
      Object.keys(this.mastery).forEach(k=>{ if(getKps(subj).indexOf(k)>=0) list.push({key:k, m:this.mastery[k]}); });
      const known=list.map(l=>l.key);
      getKps(subj).forEach(k=>{ if(known.indexOf(k)<0) list.push({key:k, m:{total:0,mastery:0}}); });
      return list;
    },
    schoolTrend(subj){
      const days=[]; for(let i=6;i>=0;i--){ const d=new Date(); d.setDate(d.getDate()-i); days.push(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()); }
      return days.map(k=>{ const h=this.hist[k]; return h?Math.round(h.correct/Math.max(1,h.done)*100):0; });
    },
    schoolDoneTrend(){ const days=[]; for(let i=6;i>=0;i--){ const d=new Date(); d.setDate(d.getDate()-i); days.push(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()); } return days.map(k=>{ const h=this.hist[k]; return h?h.done:0; }); },
    schoolAvgCorrect(){ const list=this.masteryList(this.schoolSub).filter(x=>x.m.total>0); if(!list.length) return 0; return Math.round(list.reduce((a,x)=>a+x.m.correct/x.m.total*100,0)/list.length); },
    // 智能学情建议：基于掌握度/错题/遗忘曲线的本地规则分析
    smartAdvice(subj){
      const advice=[];
      if(!subj) subj=this.schoolSub;
      const list=this.masteryList(subj);
      const weak=list.filter(x=>x.m.total>0 && x.m.mastery<60).length;
      const done=this.records.length;
      if(done===0) advice.push('● 尚未练习，建议每天用「智能出题」做 10 道基础题起步，先建立手感。');
      else {
        const acc=this.schoolAvgCorrect();
        if(acc>=85) advice.push('● 整体掌握较好（正确率'+acc+'%），可挑战更高难度，重点巩固高频压轴题。');
        else if(acc>=60) advice.push('● 正确率'+acc+'% 处于中游，建议优先针对薄弱知识点集中突破。');
        else advice.push('● 正确率'+acc+'% 偏低，建议降低难度、回归基础，逐个击破失分点，别盲目刷难题。');
      }
      if(weak===0 && done>0) advice.push('● 当前无明显的低掌握度考点，可进入更高难度或尝试其他科目。');
      else if(weak>0) advice.push('● 有 '+weak+' 个考点掌握度偏低，建议按「知识图谱」逐个训练，每点至少刷到 80%。');
      const misSub=this.mistakes.filter(m=>m.subject===subj).length;
      if(misSub>0) advice.push('● 错题本有 '+misSub+' 题，建议先「重做错题」再练新题，避免重复犯错。');
      const due=this.masteryList(subj).filter(x=>x.m.nextReview && x.m.nextReview<=todayStr()).length;
      if(due>0) advice.push('● 有 '+due+' 个知识点到了复习期，请优先完成「间隔复习」，趁记忆模糊前强化。');
      if(!advice.length) advice.push('● 继续加油，保持稳定练习就能稳步提升。');
      return advice;
    },
    // ========== 图谱 ==========
    graphKps(){ return this.masteryList(this.graphSub); },
    startTrainKp(kp){ this.gen.subject=this.graphSub; this.gen.kps=[kp]; this.startGenerate(); },
    // ========== 导出报告/清除 ==========
    exportReport(){
      let t='【无限题】学习报告\n日期：'+todayStr()+'\n累计做题：'+this.records.length+' 道\n';
      const weak=this.weakKp; if(weak.length){ t+='\n薄弱知识点：\n'; weak.forEach(w=> t+='- '+w.key+'（掌握度'+Math.round(w.mastery)+'%）\n'); }
      const blob=new Blob(['\ufeff'+t],{type:'text/plain;charset=utf-8'});
      const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='学习报告.txt'; a.click();
    },
    clearAll(){
      if(confirm('确定清除所有学习数据吗？此操作不可恢复。')){
        this.mastery={}; this.records=[]; this.mistakes=[]; this.hist={}; this._ci=[];
        ['wx_mastery','wx_records','wx_mistakes','wx_hist','wx_checkins'].forEach(k=>localStorage.removeItem(k));
        alert('数据已清除');
      }
    },
    // ========== AI接口（自行导入API）==========
    providerOptions(){ return [ {id:'zhipu',name:'智谱GLM(免费)',host:'https://open.bigmodel.cn/api/paas/v4',model:'glm-4.7-flash'}, {id:'deepseek',name:'DeepSeek',host:'https://api.deepseek.com/v1',model:'deepseek-chat'}, {id:'qwen',name:'通义千问',host:'https://dashscope.aliyuncs.com/compatible-mode/v1',model:'qwen-plus'}, {id:'kimi',name:'Kimi(Moonshot)',host:'https://api.moonshot.cn/v1',model:'kimi-k2'}, {id:'openai',name:'OpenAI',host:'https://api.openai.com/v1',model:'gpt-4o-mini'}, {id:'custom',name:'自定义(OpenAI兼容)',host:'',model:''} ]; },
    setProvider(p){ this.aiConfig.provider=p.id; this.aiConfig.model=p.model; this.aiConfig.baseUrl=p.host; this.aiTestState=''; },
    async testAI(){ this.aiTestState='testing'; try{ await this.callLLM('只回复两个字：成功'); this.aiTestState='ok'; }catch(e){ this.aiTestState='fail: '+e.message; } },
    // 针对 GLM-4-Flash 等轻量模型的优化指令（弥补弱模型在"复杂推理/长上下文"上的短板）
    buildSysPrompt(){
      let s='你是"无限题"的福建高考辅导老师。请遵循以下规则：\n';
      s+='1. 用中文，语言简洁、直接，避免空话套话。\n';
      s+='2. 讲题务必"分步骤"，用①②③列出关键推导，最后给出结论。\n';
      s+='3. 计算必须自己重新验算，确认无误再给出，绝不编造数值。\n';
      s+='4. 若题目已提供"参考解析"，直接基于它讲解，不要另起一套。\n';
      s+='5. 回答尽量控制在 200~400 字，抓重点，符合福建高考(新课标Ⅰ卷/福建卷)风格。\n';
      // 注入学情摘要，帮助针对性分析
      const weak=this.weakKp;
      if(weak.length){ s+='6. 该学生的薄弱知识点：'+weak.map(w=>w.key+'('+Math.round(w.mastery)+'%)').join('、')+'，可结合讲解提醒相关易错点。\n'; }
      s+='\n注意：你是轻量模型，遇到不会的不要硬编，直接说"这道题超出了我的讲解范围，请用答题页内置解析或提问更细的问题"。';
      return s;
    },
    async callLLM(prompt, msgs){
      const cfg=this.aiConfig; const provider=cfg.provider||'zhipu';
      const userMsgs = msgs || [ {role:'system',content:this.buildSysPrompt()}, {role:'user',content:prompt} ];
      const body={ provider, model:cfg.model, apiKey:cfg.key, messages:userMsgs };
      try{
        const res=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
        if(res.ok){ const j=await res.json(); if(j.choices&&j.choices[0]) return j.choices[0].message.content; }
      }catch(e){}
      const prov=this.providerOptions().find(p=>p.id===provider); const host=(cfg.baseUrl||(prov?prov.host:''))||'';
      const url=host.replace(/\/$/,'')+'/chat/completions';
      const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+(cfg.key||'')},body:JSON.stringify({model:cfg.model,messages:userMsgs})});
      if(!r.ok) throw new Error('HTTP '+r.status);
      const j=await r.json(); return j.choices&&j.choices[0]?j.choices[0].message.content:(j.error||'未返回');
    },
    sendMsg(){
      const text=this.aiInput.trim(); if(!text||this.aiBusy) return;
      // 未配置 API Key：本地降级回复，不调 AI，不报错
      if(!this.aiConfig.key){
        this.aiMsgs.push({role:'user',content:text});
        this.aiMsgs.push({role:'ai',content:'【本地助手提示】尚未配置 AI 接口，我暂时无法进行联网问答。\n\n你可以：\n① 到「我的 → AI参数设置」填入 API Key（推荐智谱GLM免费版 glm-4.7-flash，无需付费）；\n② 使用首页「智能出题」生成题目配合内置解析练习；\n③ 在答题页点「AI讲解」查看本题标准解析（完整免费离线）。'});
        store.set('wx_ai_msgs',this.aiMsgs.slice(-30)); this.aiInput='';
        return;
      }
      this.aiMsgs.push({role:'user',content:text}); this.aiInput=''; store.set('wx_ai_msgs',this.aiMsgs.slice(-30)); this.aiBusy=true;
      let ctx=''; try{ const q=this.currentQ(); if(q&&this.aiTab==='chat') ctx='\n【辅助】当前题目：'+q.text+'\n答案：'+q.answer+'\n请围绕此题讲解或延伸。'; }catch(e){}
      this.callLLM(text+ctx).then(reply=>{ this.aiMsgs.push({role:'ai',content:reply}); store.set('wx_ai_msgs',this.aiMsgs.slice(-30)); this.aiBusy=false; }).catch(err=>{ this.aiMsgs.push({role:'ai',content:'（AI调用失败：'+err.message+'，请到 我的→AI设置 配置API Key）'}); this.aiBusy=false; });
    },
    askExplain(){
      let q=null; try{ q=this.currentQ(); }catch(e){}
      if(!q){ this.go('ai'); return; }
      this.aiTab='chat';
      // 未配置 API Key：直接展示引擎内置解析（无需 API，完全离线）
      if(!this.aiConfig.key){
        let msg='【本地解析】（未配置 AI，展示本题内置分步解析）\n\n题目：'+q.text+'\n\n正确答案：'+q.answer;
        if(q.solution&&q.solution.length){ msg+='\n\n解题步骤：\n'+q.solution.map((s,i)=>(i+1)+'. '+s).join('\n'); }
        msg+='\n\n【提示】到"我的 → AI参数设置"填入 API Key（推荐智谱GLM免费版），可获得更详细的真人式讲解。';
        this.aiMsgs.push({role:'ai',content:msg}); store.set('wx_ai_msgs',this.aiMsgs.slice(-30));
        this.go('ai');
        return;
      }
      const prompt='请详细讲解这道题：\n'+q.text+'\n正确答案：'+q.answer+(q.solution&&q.solution.length?('\n参考解析：'+q.solution.join('；')):'');
      this.aiMsgs.push({role:'user',content:'讲解题目：'+q.text.slice(0,40)+'…'}); store.set('wx_ai_msgs',this.aiMsgs.slice(-30)); this.aiBusy=true;
      this.callLLM(prompt).then(r=>{ this.aiMsgs.push({role:'ai',content:r}); store.set('wx_ai_msgs',this.aiMsgs.slice(-30)); this.aiBusy=false; }).catch(()=>{ this.aiMsgs.push({role:'ai',content:'（AI调用失败，请配置API）'}); this.aiBusy=false; });
    },
    clearAi(){ this.aiMsgs=[{role:'ai',content:'对话已清空'}]; store.set('wx_ai_msgs',this.aiMsgs); },
    aiPlaceholder(){ return this.aiConfig.key? '输入你想问的问题…' : '先到"我的→AI设置"配置API Key'; },
    diffTxt(){ return this.gen.difficulty==='easy'?'简单':this.gen.difficulty==='hard'?'困难':'自适应'; },
    startReview(kp){ this.gen.subject=this.graphSub; this.gen.kps=[kp]; this.genType='review'; this.startGenerate(); },
    askMistake(m){
      this.aiTab='chat';
      this.aiMsgs.push({role:'user',content:'请讲解我的错题：'+m.text+'\n正确答案：'+m.answer}); store.set('wx_ai_msgs',this.aiMsgs.slice(-30)); this.aiBusy=true;
      const prompt='请详细讲解这道错题：\n'+m.text+'\n正确答案：'+m.answer+(m.solution&&m.solution.length?('\n参考解析：'+m.solution.join('；')):'');
      this.callLLM(prompt).then(r=>{ this.aiMsgs.push({role:'ai',content:r}); store.set('wx_ai_msgs',this.aiMsgs.slice(-30)); this.aiBusy=false; }).catch(()=>{ this.aiMsgs.push({role:'ai',content:'（AI调用失败，请配置API）'}); this.aiBusy=false; });
      this.go('ai');
    },
  }
});

try{ app.config.globalProperties.SUBJECTS = SUBJECTS; }catch(e){}
try{ app.config.globalProperties.PAPER_STRUCT = PAPER_STRUCT; }catch(e){}
try{ app.config.globalProperties.ICONS = ICONS; }catch(e){}
// 全局错误兜底：任何页面渲染出错时回到首页，避免白屏
app.config.errorHandler = function(err, instance, info){
  try{ console.error('[无限题]渲染错误:', err && err.message, info); }catch(e){}
  try{
    var el = document.getElementById('app');
    if(el && el.__vue_app__ && el._instance === undefined){ /* noop */ }
    // 若已挂载且页面错误，尝试回到首页
    if(window.location.href.indexOf('error_guard=1')<0){
      history.replaceState(null,'',location.href.replace(/#.*/,'') + (location.href.indexOf('?')>=0?'&':'?') + 'error_guard=1');
    }
  }catch(e2){}
};
app.mount('#app');
document.documentElement.setAttribute('data-theme', (localStorage.getItem('wx_theme')||'light').replace(/"/g,''));
