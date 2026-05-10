import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown,
  BookOpen,
  Compass,
  MapPin,
  MessageCircle,
  MoonStar,
  Orbit,
  Rocket,
  Sparkles,
  Waves,
} from 'lucide-react';
import './styles.css';

const thoughts = [
  '做产品像带队巡逻：先看见问题，再把路照亮。',
  '每天保留一小段时间，给女儿、书、代码和自己。',
  '好的个人首页不是简历墙，而是一条正在发生的生活轨道。',
];

const books = [
  { title: '纳瓦尔宝典', note: '关于复利、判断力与长期主义。' },
  { title: '原则', note: '把模糊经验沉淀成可复用系统。' },
  { title: '置身事内', note: '理解城市、产业和真实世界如何运转。' },
];

const works = [
  { name: '家庭任务站', tag: 'Life OS', desc: '把家庭计划、阅读、亲子活动做成轻量看板。' },
  { name: '想法雷达', tag: 'Writing', desc: '收集碎片灵感，沉淀成公开文章与产品构想。' },
  { name: '队长工具箱', tag: 'Code', desc: '围绕效率、自动化与创作搭建的小工具合集。' },
];

const statusCards = [
  { icon: MapPin, label: '当前所在地', value: '中国 · 一座正在变亮的城市', hint: '在家、书店、咖啡馆与路上切换坐标。' },
  { icon: Rocket, label: '我在做什么', value: '搭建个人知识与作品基地', hint: '把想法、作品和生活持续公开化。' },
  { icon: Waves, label: '近期节奏', value: '陪伴女儿 + 写作 + 前端实验', hint: '用稳定的小步快跑，穿过复杂日常。' },
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return progress;
}

function App() {
  const progress = useScrollProgress();
  const heroStyle = useMemo(
    () => ({
      '--scroll-progress': progress,
      '--hero-scale': 1 - progress * 0.16,
      '--hero-depth': progress * -160,
      '--near-y': progress * -420,
      '--far-y': progress * -145,
      '--mid-y': progress * -260,
    }),
    [progress],
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05070d] text-slate-100 selection:bg-sky-300 selection:text-slate-950">
      <div className="fixed inset-0 pointer-events-none opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(59,130,246,0.26),transparent_26%),radial-gradient(circle_at_82%_24%,rgba(250,204,21,0.12),transparent_25%),linear-gradient(135deg,rgba(15,23,42,0),rgba(2,6,23,0.9))]" />
        <div className="stars" />
      </div>

      <nav className="fixed left-1/2 top-5 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-slate-950/55 px-3 py-2 text-sm text-slate-300 shadow-2xl shadow-sky-950/40 backdrop-blur-xl">
        {['介绍', '想法', '书单', '作品', '坐标'].map((item) => (
          <a key={item} href={`#${item}`} className="rounded-full px-3 py-1.5 transition hover:bg-white/10 hover:text-white">
            {item}
          </a>
        ))}
      </nav>

      <section className="relative min-h-[118vh] px-6 pt-32 sm:px-10" style={heroStyle}>
        <div className="parallax-layer far" aria-hidden="true">
          <div className="absolute left-[8%] top-[8%] h-32 w-32 rounded-full border border-sky-300/20 bg-sky-400/10 blur-sm" />
          <div className="absolute right-[10%] top-[28%] h-48 w-48 rounded-full border border-yellow-300/20 bg-yellow-300/10 blur-md" />
        </div>
        <div className="parallax-layer mid" aria-hidden="true">
          <div className="paw-badge left-[7%] top-[42%] rotate-[-10deg]">PAW</div>
          <div className="paw-badge right-[12%] top-[16%] rotate-[12deg]">RYDER</div>
        </div>
        <div className="parallax-layer near" aria-hidden="true">
          <div className="absolute bottom-[18%] left-[18%] h-20 w-20 rounded-3xl border border-white/10 bg-white/10 backdrop-blur" />
          <div className="absolute bottom-[28%] right-[22%] h-24 w-24 rounded-full border border-sky-200/20 bg-sky-200/10 backdrop-blur" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-100 shadow-lg shadow-sky-950/40">
              <Sparkles size={16} /> 女儿命名 · 来自《汪汪队》的勇敢暗号
            </div>
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.55em] text-sky-200/70">Captain Ryder</p>
              <h1 className="max-w-4xl text-6xl font-black leading-[0.95] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">
                莱德队长的
                <span className="block bg-gradient-to-r from-sky-200 via-white to-yellow-200 bg-clip-text text-transparent">
                  深夜巡航站
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                这里记录一个父亲、创作者和产品人的轨迹：我如何观察世界、读书、写下想法、完成作品，也如何在日常里保持一点队长式的可靠。
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#介绍" className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/20">
                进入基地 <ArrowDown className="transition group-hover:translate-y-1" size={18} />
              </a>
              <a href="#作品" className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/10">
                查看作品 <Orbit size={18} />
              </a>
            </div>
          </div>

          <div className="hero-card relative mx-auto aspect-[4/5] w-full max-w-md rounded-[2.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-sky-950/50 backdrop-blur-2xl">
            <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-sky-500/20 via-transparent to-yellow-300/20 blur-2xl" />
            <div className="h-full rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.25),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.95))] p-6">
              <div className="flex items-center justify-between text-slate-300">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">MISSION BOARD</span>
                <MoonStar size={22} />
              </div>
              <div className="mt-16 grid place-items-center">
                <div className="relative grid h-44 w-44 place-items-center rounded-full border border-sky-200/30 bg-sky-300/10 shadow-[0_0_80px_rgba(56,189,248,0.28)]">
                  <div className="absolute inset-5 rounded-full border border-dashed border-yellow-200/30 animate-[spin_18s_linear_infinite]" />
                  <Compass className="text-sky-100" size={80} />
                </div>
              </div>
              <div className="mt-14 space-y-4">
                {['可靠', '好奇', '长期主义'].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3" style={{ transform: `translateX(${index * 14}px)` }}>
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_16px_rgba(125,211,252,0.8)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="介绍" className="content-section relative z-10">
        <SectionHeader kicker="About" title="我的介绍" icon={MessageCircle} />
        <div className="glass-panel grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5 text-lg leading-9 text-slate-300">
            <p>
              我喜欢把复杂问题拆成可执行任务，也喜欢把生活里温柔的部分保存下来。“莱德队长”不是一个严肃头衔，而是女儿送给我的身份徽章：遇到问题，先集合，再出发。
            </p>
            <p>
              这个页面会持续更新我的想法、阅读、作品和当下状态。它既是个人首页，也是一个可被时间打磨的公开基地。
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
        <SectionHeader kicker="Signals" title="我发布的想法" icon={Sparkles} />
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
        <SectionHeader kicker="Books" title="我看的书及推荐" icon={BookOpen} />
        <div className="grid gap-5 md:grid-cols-3">
          {books.map((book) => (
            <article key={book.title} className="book-card">
              <BookOpen className="text-yellow-100" size={30} />
              <h3>{book.title}</h3>
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
            </article>
          ))}
        </div>
      </section>

      <section id="坐标" className="content-section relative z-10 pb-28">
        <div className="glass-panel overflow-hidden p-8 sm:p-12">
          <p className="text-sm uppercase tracking-[0.45em] text-sky-200/70">Now / Location / Contact</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <h2 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">
              我当前在路上，
              <span className="block text-sky-100">也在把路写下来。</span>
            </h2>
            <div className="space-y-5 text-slate-300">
              <p>当前所在地：一座适合生活、阅读和构建产品的城市。</p>
              <p>正在做：把“莱德队长”变成长期更新的个人品牌入口。</p>
              <a className="inline-flex items-center gap-2 rounded-full bg-sky-200 px-5 py-3 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-white" href="mailto:hello@example.com">
                和队长联系 <MessageCircle size={18} />
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
