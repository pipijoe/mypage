import React from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown,
  BookOpen,
  Brain,
  Cloud,
  CheckCircle2,
  Compass,
  ExternalLink,
  MapPin,
  MessageCircle,
  MoonStar,
  Orbit,
  Rocket,
  Sparkles,
  Waves,
} from 'lucide-react';
import './styles.css';

const tags = ['羽毛球L1', '奶爸', 'vibe coding', '了解自己', 'INTJ', '对抗内耗', '了解心理学'];

const thoughts = [
  '从后台走到前台，是一次被迫但珍贵的升级：更多交流带来正反馈，也带来负反馈。',
  '减少负反馈对情绪的影响，是我当前的必修课；我想训练的是稳定，而不是迟钝。',
  '最近一年在北京出差和工作的经历，让我更清楚自己适合什么、在意什么、要守住什么。',
];

const books = [
  {
    title: '被讨厌的勇气',
    note: '借阿德勒心理学练习课题分离，把他人的评价还给他人，把自己的路走稳。',
    image: '/books/courage.svg',
    source: '用户提供',
  },
  {
    title: '全情投入',
    note: '提醒我把精力投向真正重要的选择，建立可持续的能量管理和生活秩序。',
    image: '/books/all-in.svg',
    source: '用户提供',
  },
  {
    title: '硅谷之火',
    note: '回看个人计算机革命的冒险精神，也提醒程序员不要忘记技术背后的人。',
    image: '/books/silicon-fire.svg',
    source: '用户提供',
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
  { icon: MapPin, label: '当前所在地', value: '北京', hint: '在工作、出差、阅读和自我观察之间切换坐标。' },
  { icon: Rocket, label: '我在做什么', value: '建设个人知识与作品基地', hint: '用 vibe coding 把想法变成页面、工具和可访问的作品。' },
  { icon: Waves, label: '近期课题', value: '降低负反馈的情绪噪音', hint: '保留反馈里的信息，减少评价对自我状态的消耗。' },
];

const boardItems = ['接住反馈', '理解自己', '对抗内耗'];

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
  const bgY = useTransform(smoothProgress, [0, 1], [0, 220]);
  const progressScale = useTransform(smoothProgress, [0, 1], [0.04, 1]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05070d] text-slate-100 selection:bg-sky-300 selection:text-slate-950">
      <motion.div className="fixed inset-0 pointer-events-none opacity-80" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(59,130,246,0.26),transparent_26%),radial-gradient(circle_at_82%_24%,rgba(250,204,21,0.12),transparent_25%),linear-gradient(135deg,rgba(15,23,42,0),rgba(2,6,23,0.9))]" />
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
                {boardItems.map((item, index) => (
                  <motion.div key={item} className="board-row flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3" style={{ marginLeft: index * 14 }} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.28 + index * 0.1 }} whileHover={{ x: -8, scale: 1.03 }}>
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-sky-300/15 text-sky-100"><CheckCircle2 size={15} /></span>
                    <span>{item}</span>
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
        <SectionHeader kicker="Signals" title="最近的感悟" icon={Brain} />
        <div className="horizontal-depth">
          {thoughts.map((thought, index) => (
            <article key={thought} className="thought-card" style={{ '--i': index }}>
              <span>0{index + 1}</span>
              <p>{thought}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="书单" className="content-section relative z-10">
        <SectionHeader kicker="Books" title="我正在读的书" icon={BookOpen} />
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
        <SectionHeader kicker="Works" title="我的作品介绍" icon={Rocket} />
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
              我在北京冒险湾，
              <span className="block text-sky-100">也在把路写下来。</span>
            </h2>
            <div className="space-y-5 text-slate-300">
              <p>当前所在地：北京。</p>
              <p>正在做：维护“莱德队长的冒险湾”，把阅读、云笔记、代码和自我觉察连接起来。</p>
              <a className="inline-flex items-center gap-2 rounded-full bg-sky-200 px-5 py-3 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-white" href="http://8.138.150.215/" target="_blank" rel="noreferrer">
                访问我的云笔记 <Cloud size={18} />
              </a>
            </div>
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
