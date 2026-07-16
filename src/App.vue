<template>
  <main class="app-shell">
    <aside class="sidebar">
      <section class="profile">
        <div class="avatar">👦</div>
        <h2>许一晨</h2>
        <p>九年级</p>
      </section>
      <nav class="menu">
        <button v-for="item in menu" :key="item.key" :class="['menu-item', { active: active === item.key }]" @click="active = item.key">
          <span class="menu-icon">{{ item.icon }}</span><span>{{ item.label }}</span>
        </button>
      </nav>
      <button class="collapse">≪</button>
    </aside>

    <section class="content">
      <div class="city-bg"></div>
      <section v-if="active === 'home'" class="page home-page">
        <div class="module-grid">
          <article v-for="m in modules" :key="m.title" class="module-card">
            <div :class="['module-illus', m.color]">{{ m.icon }}</div>
            <div><h3 :class="m.color">{{ m.title }}</h3><p>{{ m.desc }}</p></div>
            <button :class="['round', m.color]">→</button>
          </article>
        </div>
        <header class="section-title"><span></span><h3>为你推荐</h3><p>根据你的学习目标和兴趣，精选优质内容</p><a>查看更多 ›</a></header>
        <div class="books"><article v-for="(b,i) in books" :key="i" class="book"><div :class="['cover', b.c]">听力一本通</div><div><h4>听力一本通</h4><p>基础能力入门<br/>提升日常理解能力</p><em>初级</em></div></article></div>
      </section>

      <section v-else-if="active === 'mistake'" class="page mistake-page">
        <h1>错题再练</h1><p class="subtitle">按模块整理该学生的全部错题</p>
        <div class="mistake-grid"><article v-for="m in modules" :key="m.title" class="mistake-card"><div class="top"><span :class="['module-illus sm', m.color]">{{ m.icon }}</span><h3 :class="m.color">{{ m.title }}</h3><p>错题数量<br/><b>{{ mistakeMap[m.title] }}</b> 道</p></div><div class="stats"><span>待订正 <b class="orange">{{ pendingMap[m.title] }}</b> 道</span><span>已掌握 <b class="green">{{ doneMap[m.title] }}</b> 道</span><button :class="m.color">进入练习 →</button></div></article></div>
        <h2>近期错题速览 <a>查看全部错题 ›</a></h2><div class="quick-list"><article v-for="m in modules" :key="m.title"><header><b :class="m.color">{{ m.title }}</b><span>共 {{ mistakeMap[m.title] }} 道</span></header><p>1. {{ sample[m.title][0] }} <em>未订正</em></p><p>2. {{ sample[m.title][1] }} <em class="warn">易错</em></p><p>3. {{ sample[m.title][2] }} <em class="ok">已复习</em></p><a>查看全部 ({{ mistakeMap[m.title] }}) →</a></article></div>
        <div class="advice">💡 <b>学习建议</b><span>建议优先订正“待订正”错题，特别是标记为“易错”的题目，巩固薄弱知识点。</span><button>去订正错题 →</button></div>
      </section>

      <section v-else-if="active === 'favorite'" class="page favorite-page">
        <header class="title-row"><span class="big-icon">▣</span><div><h1>收藏中心</h1><p>你收藏的单词，共 <b>10</b> 个</p></div></header>
        <div class="toolbar"><div class="tabs"><button class="active">全部（10）</button><button>最近收藏（10）</button><button>高频词（6）</button><button>待复习（2）</button></div><input placeholder="⌕  搜索单词（中英文均可）"/><span>排序： 最近收藏⌄</span></div>
        <div class="word-grid"><article v-for="w in words" :key="w.word"><button>★</button><h3>{{ w.word }}</h3><p>{{ w.sound }}</p><p>{{ w.mean }}</p><p>例句：{{ w.example }}</p><em :class="{hot:w.hot}">{{ w.hot?'高频':'初中核心' }}</em></article></div>
        <footer class="pager">共 10 个单词 <button>‹</button><button class="active">1</button><button>›</button><button>每页 10 条⌄</button></footer>
      </section>

      <section v-else-if="active === 'analytics'" class="page analytics-page">
        <h1>学情分析</h1><div class="periods"><button>每次练习</button><button>每天</button><button class="active">每周</button><button>每月</button><button>每学期</button><button>全部</button><span>📅 2025.05.12 - 2025.05.18⌄</span></div>
        <div class="kpis"><article class="score"><span>综合得分</span><b>85<small>分</small></b><p>超过了班级 85% 的同学</p></article><article v-for="k in kpis" :key="k.t"><span>{{ k.t }}</span><b>{{ k.v }}</b><p>较上周 ↑ {{ k.up }}</p></article></div>
        <div class="charts"><article><h3>能力维度分析</h3><div class="radar">发音85<br/>词汇78<br/>语法82<br/>流利度88<br/>听力理解90<br/>口语表达84</div></article><article><h3>正确率趋势</h3><div class="line-chart"></div></article><article><h3>练习时长趋势（小时）</h3><div class="bars"><i v-for="h in [42,76,95,62,108,86]" :style="{height:h+'px'}"></i></div></article><article><h3>题型掌握情况</h3><div class="donut">正确率<br/><b>86%</b></div></article><article><h3>错题分布</h3><p v-for="x in ['单词 12','句子 8','语法 15','段落理解 9','短文理解 11']" :key="x"><span class="bar"></span>{{ x }}</p></article><article><h3>学习建议</h3><p>📘 加强语法练习</p><p>🧩 提升词汇量</p><p>🎧 保持听力练习</p></article></div>
      </section>

      <section v-else class="page profile-page"><h1>个人中心</h1><p class="subtitle">管理个人资料与班级信息</p><div class="forms"><article><h2>👤 基本资料</h2><label>昵称<input value="许一晨"/></label><label>年级<select><option>九年级</option></select></label><button>保存修改</button></article><article><h2>🔒 修改密码</h2><label>原密码<input type="password" value="1234567"/></label><label>新密码<input type="password" value="1234567"/></label><button>确认修改</button></article></div><article class="bind"><h2>👥 班级绑定</h2><p>当前状态：<em>未绑定班级</em></p><input placeholder="请输入班级ID或老师手机号"/><button>绑定班级</button></article><div class="info-cards"><article>🛡️<b>学习账号</b><p>ID：XYC202609001<br/>账号类型：学生</p></article><article>✅<b>绑定状态</b><p>班级：未绑定<br/>老师：未绑定</p></article><article>🕒<b>最近登录</b><p>2026-07-14 10:28<br/>合肥 · 设备：Win 11</p></article></div></section>
      <button class="ai">🤖<span>AI 老师</span></button>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref('home')
const menu = [{key:'home',label:'听说训练',icon:'🎧'},{key:'mistake',label:'错题再练',icon:'🔄'},{key:'favorite',label:'收藏中心',icon:'▣'},{key:'analytics',label:'学情分析',icon:'◷'},{key:'profile',label:'个人中心',icon:'♙'}]
const modules = [{title:'单词',icon:'Aa',color:'blue',desc:'学习常用词汇，夯实词汇基础'},{title:'句子',icon:'●●',color:'green',desc:'熟悉常用句型，增强表达能力'},{title:'段落',icon:'▤',color:'purple',desc:'整合常用话题，培养理解能力'},{title:'单元测试',icon:'☑',color:'orange',desc:'检测知识应用，巩固学习效果'},{title:'阶段测试',icon:'↗',color:'cyan',desc:'评估综合水平，明确学习进度'},{title:'模拟测试',icon:'🎧',color:'indigo',desc:'体验真实场景，提升应试能力'}]
const books = [{c:'green-cover'},{c:'orange-cover'},{c:'blue-cover'},{c:'green-cover'},{c:'orange-cover'}]
const mistakeMap:Record<string,number>={单词:48,句子:36,段落:28,单元测试:32,阶段测试:40,模拟测试:24}; const pendingMap:Record<string,number>={单词:18,句子:12,段落:9,单元测试:14,阶段测试:16,模拟测试:8}; const doneMap:Record<string,number>={单词:22,句子:24,段落:19,单元测试:18,阶段测试:24,模拟测试:16}
const sample:Record<string,string[]>={单词:['magnificent','procedure','contribute'],句子:['翻译: 我喜欢旅行。','改错: He don’t like...','翻译: 她正在学习。'],段落:['主旨大意理解','细节信息匹配','推理判断题'],单元测试:['完形填空题','阅读理解题','语法选择题'],阶段测试:['阅读理解题','任务型阅读','书面表达题'],模拟测试:['听力理解题','完形填空题','写作题']}
const words=[['important','/ɪmˈpɔːtnt/','adj. 重要的','It is important to finish your homework on time.'],['improve','/ɪmˈpruːv/','v. 提高；改善','We should try to improve our listening skills.',true],['practice','/ˈpræktɪs/','n. & v. 练习；实践','Practice makes perfect.'],['sentence','/ˈsentəns/','n. 句子','Please make a sentence with this word.'],['paragraph','/ˈpærəgræf/','n. 段落','This paragraph talks about my family.',true],['listen','/ˈlɪsn/','v. 听；倾听','Listen carefully and follow me.'],['repeat','/rɪˈpiːt/','v. 重复；重做','Please repeat after me.',true],['understand','/ˌʌndəˈstænd/','v. 理解；明白',"I don't understand this sentence."],['progress','/ˈprəʊgres/','n. 进步；进展','You have made great progress.',true],['grammar','/ˈgræmə(r)/','n. 语法','Good grammar is important in writing.']].map(([word,sound,mean,example,hot])=>({word,sound,mean,example,hot}))
const kpis=[{t:'练习时长',v:'6.5小时',up:'12%'},{t:'练习次数',v:'28次',up:'7次'},{t:'正确率',v:'86%',up:'5%'},{t:'排名',v:'12 / 48',up:'3名'}]
</script>
