import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown,
  BookOpen,
  Brain,
  Cloud,
  Compass,
  ExternalLink,
  MapPin,
  MessageCircle,
  MoonStar,
  Orbit,
  Rocket,
  Sparkles,
  MessageSquare, Mail
} from 'lucide-react';
import './styles.css';

const tags = ['羽毛球L1', '奶爸', 'vibe coding', '了解自己', 'INTJ', '对抗内耗', '了解心理学'];
const thoughts = [
  // 旧感悟
  {
    content: '我热爱消费者市场，讨厌企业意志。我们推出了一种产品，告诉每个人，大家自己决定要不要买，这很简单。但是，企业市场不是这样，使用产品的人自己做不了主，而做主的人不使用产品。',
    source: '乔布斯',
    category: '市场观'
  },
  {
    content: '一段工作经历让我明白，一个人如果既忙前又忙后，多半一个都忙不好。如有必要，找合适的人合作。',
    source: '自我观察',
    category: '协作'
  },
  {
    content: '建立信任是起步的基石.',
    source: '原则',
    category: '信任'
  },

  // 新增感悟 1: 种树与时间
  {
    content: [
      "最明智的举措不是追逐潮流，而是种下一棵树，让时间来发挥作用。",
      "树木不会在明天带来回报，它们十年后才会产生回报。",
      "它们默默地生长，使周围的一切都变得更好：树荫、价值、美感、寿命。"
    ],
    source: '设计的复利',
    category: '长期主义'
  },

  // 新增感悟 2: 工程师与人性
  {
    content: [
      "工程师不仅需要具备技术技能，还要具备软技能，也就是人际交往的技能。",
      "如果你不理解人类社会的复杂性，就无法理解公司或团队的工作方式，",
      "最终影响到自己的产出和扩大影响力。"
    ],
    source: '被低估的软技能',
    category: '职业观'
  },

  // 新增感悟 3: AI 与系统
  {
    content: [
      "AI 出现以后，程序员的发展方向彻底变了。",
      "你必须专注于理解系统而非理解语法，你的技能必须从编写代码转移到架构、安全、人机协作等方面。",
      "未来属于那些能够构想、开发和维护复杂系统的人。"
    ],
    source: '莱德队长',
    category: 'AI 时代'
  },
];

const books = [
  {
    title: '被讨厌的勇气',
    note: '借阿德勒心理学练习课题分离，把他人的评价还给他人，把自己的路走稳。',
    image: '/books/courage.png',
    source: '心理学',
  },
  {
    title: '网：阿加西自传',
    note: '从网球冠军的坦白叙事里看见热爱、厌倦、重建与自我和解。',
    image: '/books/img.png',
    source: '自传',
  },
  {
    title: '硅谷之火',
    note: '回看个人计算机革命的冒险精神，也提醒程序员不要忘记技术背后的人。',
    image: '/books/silicon-fire.svg',
    source: '科技史',
  },
  // --- 新增书籍 ---
  {
    title: '希腊三部曲：追逐阳光之道',
    note: '领略自然主义的诗意与生命的野性，在希腊小岛的阳光下感受万物生长的律动。',
    image: '/books/greece.png', // 请确保项目中存在该图片路径
    source: '自然文学',
  },
  {
    title: '看不见的孩子',
    note: '一部关于纽约无家可归少女的真实史诗，揭示了社会福利体系下被遗忘的生存挣扎。',
    image: '/books/invisible.png', // 请确保项目中存在该图片路径
    source: '社会纪实',
  },
  {
    title: '今日简史',
    note: '探讨数据主义、人工智能对人类社会的冲击，以及在动荡时代中如何保持心智稳定。',
    image: '/books/today.png', // 请确保项目中存在该图片路径
    source: '未来学',
  },
];

const works = [
  {
    name: '一个云笔记',
    tag: 'Cloud Notes',
    desc: '把碎片想法、阅读记录和日常工作沉淀到一个可持续维护的个人知识空间。',
    href: 'http://8.138.150.215/',
  },
];

const statusCards = [
  {
    icon: MapPin,
    label: '当前所在地',
    value: '北京',
    hint: '在工作、出差、阅读和自我观察之间切换坐标。'
  },
  {
    icon: Rocket,
    label: '我在做什么',
    value: '建设个人知识与作品基地',
    hint: '用 vibe coding 把想法变成页面、工具和可访问的作品。'
  },
  // 修改了这里：从“降低负反馈”改为更积极的“构建系统”
  {
    icon: Brain,
    label: '近期课题',
    value: '构建长期主义系统',
    hint: '种一棵树，理解复杂性，从写代码到做架构。'
  },
];

const boardCharacters = [
  { name: '自我观察员', mood: '抱着发光日记', accent: 'amber' },
  { name: '内耗清道夫', mood: '背着能量背包', accent: 'violet' },
];

const checkpoints = [
  { label: '今日航线', value: '读书 · 编码 · 复盘' },
  { label: '能量补给', value: '羽毛球 L1 + 陪伴女儿' },
  { label: '冒险原则', value: '把反馈变成信息，而不是噪音' },
];

function App() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.35 });
  const heroY = useTransform(smoothProgress, [0, 1], [0, -160]);
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.84]);
  const heroRotate = useTransform(smoothProgress, [0, 1], [0, 11]);
  const farY = useTransform(smoothProgress, [0, 1], [0, -145]);
  const midY = useTransform(smoothProgress, [0, 1], [0, -260]);
  const nearY = useTransform(smoothProgress, [0, 1], [0, -420]);
  const bgY = useTransform(smoothProgress, [0, 1], [-120, 120]);
  const progressScale = useTransform(smoothProgress, [0, 1], [0.04, 1]);

  const [messages, setMessages] = useState([
    { id: 1, name: '匿名访客', content: '很喜欢你的长期主义理念，一起种树！', time: '2024-05-20' }
  ]);
  const [formData, setFormData] = useState({ name: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    setIsSubmitting(true);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05070d] text-slate-100 selection:bg-sky-300 selection:text-slate-950">
      <motion.div className="site-background fixed -inset-x-24 -bottom-56 -top-56 pointer-events-none opacity-90" style={{ y: bgY }}>
        <div className="aurora-field absolute inset-0" />
        <div className="stars" />
        <div className="depth-object cube left-[4%] top-[22%]" />
        <div className="depth-object prism right-[8%] top-[48%]" />
        <div className="depth-object ring left-[64%] top-[12%]" />
      </motion.div>
      <motion.div className="scroll-progress" style={{ scaleX: progressScale }} />

      <nav className="fixed left-1/2 top-5 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-slate-950/55 px-3 py-2 text-sm text-slate-300 shadow-2xl shadow-sky-950/40 backdrop-blur-xl">
        {['介绍', '想法', '书单', '作品', '坐标'].map((item) => (
          <a key={item} href={`#${item}`} className="rounded-full px-3 py-1.5 transition hover:bg-white/10 hover:text-white">
            {item}
          </a>
        ))}
      </nav>

      <section className="relative min-h-[108vh] px-6 pt-32 sm:px-10">
        <motion.div className="parallax-layer far" aria-hidden="true" style={{ y: farY }}>
          <div className="absolute left-[8%] top-[8%] h-32 w-32 rounded-full border border-sky-300/20 bg-sky-400/10 blur-sm" />
          <div className="absolute right-[10%] top-[28%] h-48 w-48 rounded-full border border-yellow-300/20 bg-yellow-300/10 blur-md" />
        </motion.div>
        <motion.div className="parallax-layer mid" aria-hidden="true" style={{ y: midY }}>
          <div className="paw-badge left-[7%] top-[42%] rotate-[-10deg]">PAW</div>
          <div className="paw-badge right-[12%] top-[16%] rotate-[12deg]">RYDER</div>
        </motion.div>
        <motion.div className="parallax-layer near" aria-hidden="true" style={{ y: nearY }}>
          <div className="absolute bottom-[18%] left-[18%] h-20 w-20 rounded-3xl border border-white/10 bg-white/10 backdrop-blur" />
          <div className="absolute bottom-[28%] right-[22%] h-24 w-24 rounded-full border border-sky-200/20 bg-sky-200/10 backdrop-blur" />
        </motion.div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-100 shadow-lg shadow-sky-950/40">
              <Sparkles size={16} /> 女儿命名 · 北京坐标 · 心理学练习中
            </div>
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.55em] text-sky-200/70">Captain Ryder&apos;s Adventure Bay</p>
              <h1 className="max-w-4xl text-6xl font-black leading-[0.95] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">
                莱德队长的
                <span className="block bg-gradient-to-r from-sky-200 via-white to-yellow-200 bg-clip-text text-transparent">
                  冒险湾
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                这里记录一个程序员、奶爸和 INTJ 的自我探索：读书、vibe coding、云笔记作品，以及我如何在更多交流里接住反馈、减少内耗。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-200 backdrop-blur">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#介绍" className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/20">
                进入冒险湾 <ArrowDown className="transition group-hover:translate-y-1" size={18} />
              </a>
              <a href="#作品" className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/10">
                查看云笔记 <Orbit size={18} />
              </a>
            </div>
          </div>

          <motion.div className="hero-card relative mx-auto aspect-[4/5] w-full max-w-md rounded-[2.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-sky-950/50 backdrop-blur-2xl" style={{ y: heroY, scale: heroScale, rotateX: heroRotate }} initial={{ opacity: 0, rotateY: -10 }} animate={{ opacity: 1, rotateY: 0 }} transition={{ type: 'spring', stiffness: 90, damping: 18 }} whileHover={{ rotateY: -6, rotateX: 4 }}>
            <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-sky-500/20 via-transparent to-yellow-300/20 blur-2xl" />
            <div className="h-full rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.25),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.95))] p-6">
              <div className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="site-mark">C</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs tracking-[0.22em]">ADVENTURE BOARD</span>
                </div>
                <MoonStar size={22} />
              </div>
              <div className="adventure-orbit mt-12 grid place-items-center">
                <motion.div className="relative grid h-48 w-48 place-items-center rounded-full border border-sky-200/30 bg-sky-300/10 shadow-[0_0_80px_rgba(56,189,248,0.28)]" animate={{ rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}>
                  <div className="absolute inset-5 rounded-full border border-dashed border-yellow-200/30" />
                  <div className="absolute -right-2 top-8 h-5 w-5 rounded-full bg-yellow-200 shadow-[0_0_28px_rgba(250,204,21,0.7)]" />
                  <Compass className="text-sky-100" size={82} />
                </motion.div>
              </div>
              <div className="mt-10 space-y-3">
                {boardCharacters.map((character, index) => (
                  <motion.div key={character.name} className={`board-character ${character.accent}`} style={{ marginLeft: index * 14 }} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.28 + index * 0.1 }} whileHover={{ x: -8, scale: 1.03, rotateY: -6 }}>
                    <span className="toon-person" aria-hidden="true">
                      <span className="toon-head" />
                      <span className="toon-body" />
                      <span className="toon-shadow" />
                    </span>
                    <span>
                      <strong>{character.name}</strong>
                      <small>{character.mood}</small>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      <section className="bridge-section relative z-10 mx-auto -mt-24 max-w-7xl px-6 pb-10 sm:px-10">
        <div className="bridge-panel grid gap-5 p-5 md:grid-cols-3">
          {checkpoints.map((item, index) => (
            <motion.article key={item.label} className="checkpoint-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ type: 'spring', stiffness: 110, damping: 18, delay: index * 0.08 }}>
              <span>0{index + 1}</span>
              <p>{item.label}</p>
              <strong>{item.value}</strong>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="介绍" className="content-section relative z-10">
        <SectionHeader kicker="About" title="我的介绍" icon={MessageCircle} />
        <div className="glass-panel grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5 text-lg leading-9 text-slate-300">
            <p>
              “莱德队长的冒险湾”是我给自己的公开基地：一个在北京工作和出差的程序员，正在学习从后台走到前台，和更多人协作、表达、交换反馈。
            </p>
            <p>
              我关心心理学、了解自己和对抗内耗。最近最重要的练习，是把负反馈里的有效信息留下，把对情绪的无谓消耗降下来。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {statusCards.map(({ icon: Icon, label, value, hint }) => (
              <article key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition duration-500 hover:-translate-y-2 hover:bg-white/[0.08]">
                <Icon className="mb-5 text-sky-200" size={28} />
                <p className="text-sm text-slate-400">{label}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{value}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">{hint}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="想法" className="content-section relative z-10">
        <SectionHeader kicker="Signals" title="想法" icon={Brain} />

        {/*
          关键修复：移除了父级的 overflow-hidden，
          并增加 py-6 防止 hover 时阴影被截断
        */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-6">

          {thoughts.map((thought, index) => (
              <article
                  key={index}
                  className="deep-thought-card group relative" // 添加 relative 确保 z-index 生效
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* 装饰性渐变边框 */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-sky-500/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100 blur-sm"></div>

                {/* 卡片主体 */}
                <div className="relative z-10 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-sky-300/30">

                  {/* 引用符号 */}
                  <div className="mb-4 text-2xl text-sky-300/30">“</div>

                  {/* 内容 */}
                  <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
                    {Array.isArray(thought.content) ? (
                        thought.content.map((line, i) => <p key={i} className="mb-1 last:mb-0">{line}</p>)
                    ) : (
                        <p>{thought.content}</p>
                    )}
                  </div>

                  {/* --- 底部元信息 --- */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-400">
                    <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm">{thought.source}</span>
                    <span className="text-sky-300 font-medium">{thought.category}</span>
                  </div>
                </div>
              </article>
          ))}
        </div>
      </section>

      <section id="书单" className="content-section relative z-10">
        <SectionHeader kicker="Books" title="近期书单" icon={BookOpen} />
        <div className="grid gap-5 md:grid-cols-3">
          {books.map((book) => (
            <article key={book.title} className="book-card">
              <div className="book-cover-wrap">
                <img className="book-cover" src={book.image} alt={`《${book.title}》封面`} loading="lazy" />
                <span>{book.source}</span>
              </div>
              <h3>《{book.title}》</h3>
              <p>{book.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="作品" className="content-section relative z-10">
        <SectionHeader kicker="Works" title="作品" icon={Rocket} />
        <div className="work-stage">
          {works.map((work, index) => (
            <article key={work.name} className="work-card" style={{ '--depth': index }}>
              <span>{work.tag}</span>
              <h3>{work.name}</h3>
              <p>{work.desc}</p>
              <a href={work.href} target="_blank" rel="noreferrer" className="work-link">
                打开作品 <ExternalLink size={17} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="坐标" className="content-section relative z-10 pb-28">
        <div className="glass-panel overflow-hidden p-8 sm:p-12">
          <p className="text-sm uppercase tracking-[0.45em] text-sky-200/70">Now / Location / Contact</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <h2 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">
              保持记录，
              <span className="block text-sky-100">持续把想法变成作品。</span>
            </h2>
            <div className="space-y-5 text-slate-300">
              <p>正在做：维护“莱德队长的冒险湾”，把阅读、云笔记、代码和自我觉察连接起来。</p>
              <div className="contact-links">
                <a className="contact-link primary" href="http://8.138.150.215/" target="_blank" rel="noreferrer">
                  访问我的云笔记 <Cloud size={18} />
                </a>
                <a className="contact-link" href="https://www.zhihu.com/people/joe-tao-99" target="_blank" rel="noreferrer">
                  知乎主页 <ExternalLink size={17} />
                </a>
                <a className="contact-link" href="https://space.bilibili.com/412405219?spm_id_from=333.1007.0.0" target="_blank" rel="noreferrer">
                  B站主页 <ExternalLink size={17} />
                </a>
                <a className="contact-link" >
                  <Mail size={17} /> cutesimba@163.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- 访客留言板块 --- */}
      <section id="留言" className="content-section relative z-10">
        <SectionHeader kicker="Guestbook" title="留下足迹" icon={MessageSquare} />

        <div className="grid gap-10 lg:grid-cols-5">
          {/* 左侧：留言表单 */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitMessage} className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-400">称呼</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="你的名字（选填）"
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm text-slate-200 outline-none transition-all focus:border-sky-300/50 focus:ring-1 focus:ring-sky-300/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-400">想说的话</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="分享你的感悟、建议，或者只是打个招呼..."
                    className="w-full resize-none rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm text-slate-200 outline-none transition-all focus:border-sky-300/50 focus:ring-1 focus:ring-sky-300/20"
                ></textarea>
              </div>
              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-300 px-4 py-2 text-sm font-semibold text-slate-900 transition-all hover:bg-sky-200 disabled:opacity-70"
              >
                {isSubmitting ? '发送中...' : '发射信号'}
              </button>
            </form>
          </div>

          {/* 右侧：留言列表 */}
          <div className="space-y-4 lg:col-span-3">
            {messages.length === 0 && (
                <p className="text-center text-sm text-slate-500 py-10">还没有人留下足迹，成为第一个吧！</p>
            )}

            {messages.map((msg) => (
                <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="group rounded-xl border border-white/5 bg-slate-900/40 p-4 transition-all hover:border-sky-300/20"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-sky-300">{msg.name}</span>
                    <span className="text-xs text-slate-500">{msg.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">{msg.content}</p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeader({ kicker, title, icon: Icon }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.45em] text-sky-200/60">{kicker}</p>
        <h2 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">{title}</h2>
      </div>
      <div className="hidden rounded-3xl border border-white/10 bg-white/5 p-4 text-sky-100 sm:block">
        <Icon size={34} />
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
