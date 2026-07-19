import { useState, useEffect, useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Dumbbell,
  Flame,
  Target,
  TrendingUp,
  Users,
  Award,
  Clock,
  Heart,
  Zap,
  Shield,
  Star,
  Check,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Play,
  Sparkles,
  BarChart3,
  Timer,
  Trophy,
  Camera,
  MessageCircle,
  Video,
  ClipboardCheck,
  Activity,
  Utensils,
  Droplets,
  Moon,
  Brain,
  Medal,
  CalendarCheck,
} from 'lucide-react';
import shoulderWorkoutVideo from './assets/shoulder-workout.mp4';

/* ─── Intersection Observer Hook ─── */
function useAnimateInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

/* ─── Fade-in wrapper ─── */
function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useAnimateInView(0.1);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger children ─── */
function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const { ref, isInView } = useAnimateInView(0.1);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Count-Up ─── */
function CountUp({
  end,
  suffix = '',
  duration = 2,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Ambient Background Blobs ─── */
function AmbientBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-500/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-brand-400/8 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-emerald-500/6 blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
    </div>
  );
}

/* ─── Section Divider ─── */
function SectionDivider() {
  return (
    <div className="mx-auto flex max-w-7xl items-center gap-4 px-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
    </div>
  );
}

/* ─── Section Badge ─── */
function SectionBadge({ icon: Icon, children }: { icon: typeof Star; children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5 text-sm font-medium text-brand-400 mb-4">
      <Icon className="h-4 w-4" />
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: 'Method', href: '#method' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Results', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-400 shadow-lg shadow-brand-500/25 transition-transform duration-300 group-hover:scale-110">
            <Dumbbell className="h-5 w-5 text-dark-950" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            Shuhaib<span className="text-brand-400">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="relative px-4 py-2 text-sm font-medium text-dark-300 transition-colors hover:text-white group"
            >
              {l.label}
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-brand-400 transition-all duration-300 group-hover:w-2/3" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="?page=leads"
            className="btn-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 px-6 py-2.5 text-sm font-semibold text-dark-950 shadow-lg shadow-brand-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/30 hover:scale-105"
          >
            Start Training
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white lg:hidden transition-colors hover:bg-white/5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/5 lg:hidden"
          >
            <div className="glass-strong mx-4 mb-4 mt-2 flex flex-col gap-1 rounded-2xl p-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-dark-300 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="?page=leads"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 px-6 py-3 text-sm font-semibold text-dark-950"
                onClick={() => setMobileOpen(false)}
              >
                Start Training
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-32">
      <AmbientBlobs />
      <div className="bg-grid absolute inset-0" />

      <motion.div style={{ y }} className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="glass-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-500" />
              </span>
              <span className="text-sm font-medium text-brand-300">Now accepting new clients</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display max-w-5xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Unleash Your{' '}
            <span className="text-gradient">Ultimate</span>
            <br />
            Physique
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-dark-300 sm:text-xl"
          >
            Trainer Shuhaib delivers elite personal training in Dubai that transforms dedicated
            workout freaks into the strongest, most confident versions of themselves.
            No shortcuts. Just science-backed results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <a
              href="?page=leads"
              className="btn-glow group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 px-8 py-4 text-base font-bold text-dark-950 shadow-xl shadow-brand-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/35 hover:scale-105"
            >
              Start Your Transformation
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#method"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105"
            >
              <Play className="h-5 w-5 text-brand-400" />
              Watch My Approach
            </a>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            {[
              { value: '500+', label: 'Clients Transformed', icon: Users },
              { value: '8+', label: 'Years Experience', icon: Clock },
              { value: '97%', label: 'Success Rate', icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
                className="glass-strong flex items-center gap-3 rounded-2xl px-5 py-3 sm:px-6 sm:py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10">
                  <stat.icon className="h-5 w-5 text-brand-400" />
                </div>
                <div className="text-left">
                  <div className="font-display text-xl font-bold text-white sm:text-2xl">{stat.value}</div>
                  <div className="text-xs text-dark-400 sm:text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative mt-16 w-full max-w-5xl"
          >
            <div className="glow-brand relative overflow-hidden rounded-3xl border border-white/10">
              <video
                src={shoulderWorkoutVideo}
                autoPlay
                loop
                muted
                playsInline
                aria-label="Trainer Shuhaib demonstrating a shoulder workout in his Dubai gym"
                className="h-[350px] w-full object-cover sm:h-[450px] lg:h-[550px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-950/40 via-transparent to-dark-950/40" />
            </div>

            {/* Ambient decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-2xl border border-brand-500/20 bg-brand-500/5 backdrop-blur-sm animate-float hidden lg:block" />
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full border border-brand-400/20 bg-brand-400/5 backdrop-blur-sm animate-float-delayed hidden lg:block" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   KEYWORD MARQUEE
   ═══════════════════════════════════════════ */
function KeywordMarquee() {
  const keywordsA = [
    'Strength', 'Hypertrophy', 'Fat Loss', 'Discipline', 'Nutrition', 'Mobility',
    'Endurance', 'Power', 'Recovery', 'Mindset', 'Consistency', 'Transformation',
  ];
  const keywordsB = [
    'Powerlifting', 'HIIT', 'Conditioning', 'Muscle Building', 'Body Recomposition',
    'Athletic Performance', 'Meal Planning', 'Progressive Overload', 'Core Strength', 'Flexibility',
  ];

  const Row = ({ words, fast, outline }: { words: string[]; fast?: boolean; outline?: boolean }) => (
    <div className="marquee-mask overflow-hidden">
      <div className={`flex w-max items-center gap-8 py-3 ${fast ? 'animate-marquee-fast' : 'animate-marquee'}`}>
        {[...words, ...words].map((word, i) => (
          <div key={`${word}-${i}`} className="flex items-center gap-8">
            <span
              className={`font-display whitespace-nowrap text-3xl font-bold uppercase tracking-tight sm:text-4xl ${
                outline ? 'text-outline' : 'text-white/80'
              }`}
            >
              {word}
            </span>
            <Zap className="h-5 w-5 shrink-0 text-brand-500/60" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section aria-label="Training specialties" className="relative border-y border-white/5 bg-dark-900/40 py-6">
      <Row words={keywordsA} />
      <Row words={keywordsB} fast outline />
    </section>
  );
}

/* ═══════════════════════════════════════════
   SOCIAL PROOF BAR
   ═══════════════════════════════════════════ */
function SocialProof() {
  const logos = [
    'Muscle & Fitness', 'Men\'s Health', 'Bodybuilding.com', 'T-Nation', 'AthleteX',
  ];

  return (
    <section className="relative py-16">
      <SectionDivider />
      <RevealSection>
        <div className="mx-auto max-w-7xl px-6 pt-12">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-dark-500">
            Recognized & Featured By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
            {logos.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="font-display text-lg font-bold text-dark-500/60 transition-colors hover:text-dark-300 sm:text-xl"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ABOUT / MEET SHUHAIB
   ═══════════════════════════════════════════ */
function About() {
  const credentials = [
    { icon: Medal, label: 'Certified Personal Trainer (CPT)' },
    { icon: Utensils, label: 'Sports Nutrition Specialist' },
    { icon: Dumbbell, label: 'Strength & Conditioning Coach' },
    { icon: Heart, label: 'First Aid & CPR Certified' },
  ];

  const stats = [
    { end: 500, suffix: '+', label: 'Clients Coached' },
    { end: 12000, suffix: '+', label: 'Sessions Delivered' },
    { end: 8, suffix: '+', label: 'Years Experience' },
    { end: 97, suffix: '%', label: 'Success Rate' },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      <AmbientBlobs />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left - Portrait */}
          <RevealSection>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glow-brand-sm img-zoom relative overflow-hidden rounded-3xl border border-white/10"
              >
                <img
                  src="https://i.imgur.com/KKycI1z.jpeg"
                  alt="Trainer Shuhaib - certified personal trainer in Dubai"
                  className="aspect-[4/5] w-full object-cover object-top"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
              </motion.div>

              {/* Floating experience badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-strong absolute -top-5 -right-3 sm:-right-6 rounded-2xl p-4 shadow-2xl shadow-black/30 animate-float"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10">
                    <Award className="h-5 w-5 text-brand-400" />
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-white">8+ Years</div>
                    <div className="text-xs text-dark-400">Elite Coaching</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </RevealSection>

          {/* Right - Story */}
          <div>
            <RevealSection>
              <SectionBadge icon={Users}>Meet Your Coach</SectionBadge>
              <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
                The Man Behind the{' '}
                <span className="text-gradient">Method</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-dark-300">
                I'm Shuhaib — a Dubai-based personal trainer, strength coach, and nutrition
                specialist obsessed with one thing: getting you real, measurable results.
                Over the last 8+ years I've coached executives, athletes, busy parents, and
                complete beginners through 500+ transformations.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-dark-300">
                My philosophy is simple: train with intent, eat with precision, recover like a
                professional. No fads, no gimmicks — just proven programming built around
                your body, your schedule, and your goals.
              </p>
            </RevealSection>

            {/* Credentials */}
            <StaggerContainer className="mt-8 grid gap-3 sm:grid-cols-2" staggerDelay={0.08}>
              {credentials.map((c) => (
                <StaggerItem key={c.label}>
                  <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10">
                      <c.icon className="h-4 w-4 text-brand-400" />
                    </div>
                    <span className="text-sm font-medium text-dark-200">{c.label}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Animated counters */}
            <StaggerContainer className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4" staggerDelay={0.1}>
              {stats.map((s) => (
                <StaggerItem key={s.label}>
                  <div className="text-center sm:text-left">
                    <div className="font-display text-3xl font-extrabold text-gradient sm:text-4xl">
                      <CountUp end={s.end} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-dark-400">{s.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURES
   ═══════════════════════════════════════════ */
function Features() {
  const features = [
    {
      icon: Target,
      title: 'Personalized Programming',
      desc: 'Every workout is meticulously crafted for your body, goals, and lifestyle. No cookie-cutter templates—just precision-engineered training.',
      color: 'from-brand-500 to-emerald-400',
    },
    {
      icon: Flame,
      title: 'Progressive Overload System',
      desc: 'Science-backed periodization ensures you never plateau. Strategic progression keeps your muscles guessing and growing week after week.',
      color: 'from-orange-500 to-amber-400',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Performance Tracking',
      desc: 'Data-driven insights on every rep, set, and session. See your strength curves, recovery metrics, and progress visualized in real time.',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: Shield,
      title: 'Injury Prevention Protocol',
      desc: 'Built-in mobility work and prehab exercises protect your joints while maximizing gains. Train hard today so you can train hard tomorrow.',
      color: 'from-purple-500 to-violet-400',
    },
  ];

  return (
    <section id="features" className="relative py-24 lg:py-32">
      <AmbientBlobs />
      <div className="mx-auto max-w-7xl px-6">
        <RevealSection className="text-center">
          <SectionBadge icon={Sparkles}>Why Choose Shuhaib</SectionBadge>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Training Engineered for{' '}
            <span className="text-gradient">Results</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-300">
            Every element of my coaching system is designed to maximize your transformation.
            Here's what sets my approach apart from the rest.
          </p>
        </RevealSection>

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="card-hover glass group relative h-full overflow-hidden rounded-3xl p-8 lg:p-10">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} shadow-lg`}>
                    <f.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white lg:text-2xl">{f.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-dark-300">{f.desc}</p>
                </div>

                {/* Corner glow on hover */}
                <div className={`absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${f.color} opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-10`} />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROGRAMS SHOWCASE
   ═══════════════════════════════════════════ */
function Programs() {
  const programs = [
    {
      title: 'Strength Foundation',
      desc: 'Build raw, functional strength with compound movements and progressive overload. Perfect for those ready to move serious weight.',
      tags: ['Powerlifting', 'Hypertrophy', '12 Weeks'],
      icon: Dumbbell,
      gradient: 'from-brand-500/20 to-brand-400/5',
      accent: 'brand-400',
    },
    {
      title: 'Shred Protocol',
      desc: 'Incinerate body fat while preserving lean muscle. High-intensity training meets precision nutrition for maximum definition.',
      tags: ['Fat Loss', 'HIIT', '8 Weeks'],
      icon: Flame,
      gradient: 'from-orange-500/20 to-red-500/5',
      accent: 'orange-400',
    },
    {
      title: 'Athletic Performance',
      desc: 'Explosive power, speed, and agility for competitive athletes. Sport-specific programming that translates to the field.',
      tags: ['Sports', 'Plyometrics', '10 Weeks'],
      icon: Zap,
      gradient: 'from-blue-500/20 to-cyan-500/5',
      accent: 'blue-400',
    },
    {
      title: 'Total Transformation',
      desc: 'The ultimate body recomposition program. Simultaneously build muscle and burn fat for a complete physical overhaul.',
      tags: ['Recomp', 'Full System', '16 Weeks'],
      icon: Trophy,
      gradient: 'from-purple-500/20 to-pink-500/5',
      accent: 'purple-400',
    },
  ];

  return (
    <section id="programs" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealSection className="text-center">
          <SectionBadge icon={Dumbbell}>Signature Programs</SectionBadge>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Choose Your{' '}
            <span className="text-gradient">Battle Plan</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-300">
            Whether you want raw strength, lean definition, or athletic dominance—there's a
            program engineered for your exact goals.
          </p>
        </RevealSection>

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20">
          {programs.map((p) => (
            <StaggerItem key={p.title}>
              <div className="card-hover glass group relative h-full overflow-hidden rounded-3xl p-8 lg:p-10">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                <div className="relative z-10">
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-${p.accent}/10`}>
                    <p.icon className={`h-6 w-6 text-${p.accent}`} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">{p.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-dark-300">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-dark-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <a
                      href="#pricing"
                      className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition-all hover:gap-3"
                    >
                      Learn More
                      <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   THE METHOD — 4-STEP PROCESS
   ═══════════════════════════════════════════ */
function Method() {
  const steps = [
    {
      icon: ClipboardCheck,
      step: '01',
      title: 'Assess & Analyze',
      desc: 'A deep-dive assessment of your body composition, movement quality, training history, and lifestyle. We establish your true baseline before touching a single weight.',
    },
    {
      icon: Target,
      step: '02',
      title: 'Engineer Your Plan',
      desc: 'Your custom training program and nutrition strategy are built from the assessment data—periodized, goal-specific, and designed around your real schedule.',
    },
    {
      icon: Activity,
      step: '03',
      title: 'Execute & Track',
      desc: 'Coached sessions with relentless attention to form. Every rep, set, and meal is logged so progress is measured in data, not guesswork.',
    },
    {
      icon: TrendingUp,
      step: '04',
      title: 'Evolve & Dominate',
      desc: 'Weekly reviews drive smart adjustments. As your body adapts, the program adapts faster—so the results never stop coming.',
    },
  ];

  return (
    <section id="method" className="relative overflow-hidden py-24 lg:py-32">
      <AmbientBlobs />
      <div className="mx-auto max-w-7xl px-6">
        <RevealSection className="text-center">
          <SectionBadge icon={CalendarCheck}>The Process</SectionBadge>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            The Shuhaib{' '}
            <span className="text-gradient">Method</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-300">
            A proven four-phase system that turns commitment into transformation.
            This is exactly how we'll work together, from day one to your best physique.
          </p>
        </RevealSection>

        <div className="relative mt-16 lg:mt-20">
          {/* Connecting line (desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-7 left-[12%] right-[12%] hidden h-px origin-left bg-gradient-to-r from-brand-500/40 via-brand-400/30 to-brand-500/40 lg:block"
          />

          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.15}>
            {steps.map((s) => (
              <StaggerItem key={s.step}>
                <div className="card-hover glass group relative h-full rounded-3xl p-7">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-400 shadow-lg shadow-brand-500/25 transition-transform duration-300 group-hover:scale-110">
                        <s.icon className="h-7 w-7 text-dark-950" />
                      </div>
                      <span className="font-display text-4xl font-extrabold text-white/10 transition-colors duration-500 group-hover:text-brand-500/30">
                        {s.step}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-white">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-dark-300">{s.desc}</p>
                  </div>
                  <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-brand-500/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TRAINING GALLERY
   ═══════════════════════════════════════════ */
function Gallery() {
  const shots = [
    {
      src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
      title: 'Strength Training',
      tag: 'Compound lifts & raw power',
    },
    {
      src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80',
      title: 'Bodyweight Mastery',
      tag: 'Calisthenics & total control',
    },
    {
      src: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=80',
      title: 'Progressive Overload',
      tag: 'Structured barbell work',
    },
    {
      src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
      title: 'Powerlifting',
      tag: 'Deadlift, squat & press mechanics',
    },
    {
      src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80',
      title: 'Hypertrophy',
      tag: 'Muscle-building precision',
    },
    {
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
      title: 'Core & Conditioning',
      tag: 'Ab work & metabolic finishers',
    },
  ];

  return (
    <section id="gallery" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealSection className="text-center">
          <SectionBadge icon={Camera}>Inside the Grind</SectionBadge>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Where the Work{' '}
            <span className="text-gradient">Gets Done</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-300">
            A look at the training styles that build champions—strength, conditioning,
            hypertrophy, and mobility, all under one system.
          </p>
        </RevealSection>

        <StaggerContainer className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3" staggerDelay={0.1}>
          {shots.map((shot) => (
            <StaggerItem key={shot.title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="img-zoom group relative overflow-hidden rounded-3xl border border-white/10"
              >
                <img
                  src={shot.src}
                  alt={`${shot.title} — personal training with Trainer Shuhaib in Dubai`}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="font-display text-xl font-bold text-white">{shot.title}</h3>
                  <p className="mt-1 text-sm text-brand-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {shot.tag}
                  </p>
                </div>
                <div className="absolute inset-0 border-2 border-brand-500/0 rounded-3xl transition-colors duration-500 group-hover:border-brand-500/30" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   BENEFITS
   ═══════════════════════════════════════════ */
function Benefits() {
  const benefits = [
    { icon: Timer, title: 'Efficient Workouts', desc: 'Maximize results in minimum time with strategically designed 45-60 minute sessions.' },
    { icon: Heart, title: 'Holistic Wellness', desc: 'Beyond muscles—improve sleep, reduce stress, and boost your overall quality of life.' },
    { icon: Award, title: 'Expert Guidance', desc: '8+ years of coaching distilled into every cue, correction, and programming decision.' },
    { icon: TrendingUp, title: 'Measurable Progress', desc: 'Quantifiable improvements tracked weekly so you see your transformation unfold in real time.' },
    { icon: Users, title: 'Community Access', desc: 'Join an exclusive community of driven individuals pushing each other to new heights.' },
    { icon: Shield, title: 'Accountability System', desc: 'Daily check-ins and progress reviews ensure you stay consistent and never fall off track.' },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <AmbientBlobs />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left - Visual */}
          <RevealSection>
            <div className="relative">
              <div className="glow-brand-sm img-zoom relative overflow-hidden rounded-3xl border border-white/10">
                <img
                  src="https://i.imgur.com/6uHBwDx.jpeg"
                  alt="Trainer Shuhaib flexing after an elite strength training session in Dubai"
                  className="aspect-[4/5] w-full object-cover object-top"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-strong absolute -bottom-6 -right-4 sm:-right-6 rounded-2xl p-5 shadow-2xl shadow-black/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10">
                    <Trophy className="h-6 w-6 text-brand-400" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-white">
                      <CountUp end={500} suffix="+" />
                    </div>
                    <div className="text-sm text-dark-400">Transformations</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </RevealSection>

          {/* Right - Content */}
          <div>
            <RevealSection>
              <SectionBadge icon={Star}>The Shuhaib Difference</SectionBadge>
              <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
                More Than a Trainer.{' '}
                <span className="text-gradient">A Partner.</span>
              </h2>
              <p className="mt-4 text-lg text-dark-300">
                I don't just count your reps—I engineer your entire transformation.
                Every aspect of your fitness journey is optimized for maximum impact.
              </p>
            </RevealSection>

            <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2" staggerDelay={0.08}>
              {benefits.map((b) => (
                <StaggerItem key={b.title}>
                  <div className="group flex gap-4 rounded-2xl p-4 transition-colors hover:bg-white/[0.02]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 transition-colors group-hover:bg-brand-500/20">
                      <b.icon className="h-5 w-5 text-brand-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{b.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-dark-400">{b.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   NUTRITION & RECOVERY
   ═══════════════════════════════════════════ */
function Nutrition() {
  const pillars = [
    {
      icon: Utensils,
      title: 'Precision Meal Planning',
      desc: 'Macro-calculated meal plans built around foods you actually enjoy—no bland chicken and broccoli on repeat.',
    },
    {
      icon: Droplets,
      title: 'Hydration & Supplementation',
      desc: 'Evidence-based supplement and hydration protocols. Only what works, nothing you don\'t need.',
    },
    {
      icon: Moon,
      title: 'Sleep & Recovery Systems',
      desc: 'Structured recovery, mobility sessions, and sleep optimization—because muscle is built between workouts.',
    },
    {
      icon: Brain,
      title: 'Mindset Coaching',
      desc: 'Habit engineering and mental frameworks that make discipline automatic, not exhausting.',
    },
  ];

  return (
    <section id="nutrition" className="relative overflow-hidden py-24 lg:py-32">
      <AmbientBlobs />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left - Content */}
          <div className="order-2 lg:order-1">
            <RevealSection>
              <SectionBadge icon={Utensils}>Fuel & Recover</SectionBadge>
              <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
                Abs Are Built in the Gym.{' '}
                <span className="text-gradient">Revealed in the Kitchen.</span>
              </h2>
              <p className="mt-4 text-lg text-dark-300">
                Training is only half the equation. Every coaching plan includes complete
                nutrition, recovery, and mindset systems—so the results you build in the
                gym actually show.
              </p>
            </RevealSection>

            <StaggerContainer className="mt-10 space-y-5" staggerDelay={0.1}>
              {pillars.map((p) => (
                <StaggerItem key={p.title}>
                  <div className="glass group flex gap-4 rounded-2xl p-5 transition-all duration-300 hover:border-brand-500/20">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 transition-colors group-hover:bg-brand-500/20">
                      <p.icon className="h-6 w-6 text-brand-400" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-bold text-white">{p.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-dark-300">{p.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right - Visual */}
          <RevealSection className="order-1 lg:order-2">
            <div className="relative">
              <div className="glow-brand-sm img-zoom relative overflow-hidden rounded-3xl border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
                  alt="Precision nutrition and meal planning for body transformation"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
              </div>
              {/* Floating macro card */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-strong absolute -bottom-6 -left-4 sm:-left-6 rounded-2xl p-5 shadow-2xl shadow-black/30"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-dark-400">Custom Macros</div>
                <div className="mt-2 flex gap-4">
                  {[
                    { label: 'Protein', value: '40%' },
                    { label: 'Carbs', value: '35%' },
                    { label: 'Fats', value: '25%' },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="font-display text-lg font-bold text-brand-400">{m.value}</div>
                      <div className="text-[10px] uppercase tracking-wide text-dark-400">{m.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */
function Testimonials() {
  const testimonials = [
    {
      name: 'Ahmed R.',
      role: 'Lost 30kg in 6 months',
      text: "Shuhaib doesn't just train your body—he rewires your mindset. I came in wanting to lose weight and left with an entirely new identity. Best investment I've ever made.",
      rating: 5,
    },
    {
      name: 'Sarah K.',
      role: 'Competitive Powerlifter',
      text: 'My squat went from 80kg to 140kg in 5 months. The programming is intelligent, the coaching is precise, and the results speak for themselves. Shuhaib is the real deal.',
      rating: 5,
    },
    {
      name: 'Omar M.',
      role: 'Business Executive',
      text: "I've tried a dozen trainers. None understood the demands of a 60-hour work week like Shuhaib does. His programs fit my life—not the other way around. Down 20kg and counting.",
      rating: 5,
    },
    {
      name: 'Fatima Z.',
      role: 'Marathon Runner',
      text: 'The athletic performance program transformed my running. My pace improved by 2 min/km and I finished my first ultra marathon. The strength work was a game changer.',
      rating: 5,
    },
    {
      name: 'Khalid A.',
      role: 'Gained 12kg muscle',
      text: "I was the skinny guy my whole life. Shuhaib's nutrition guidance combined with his training system helped me pack on quality mass I never thought possible. Life-changing.",
      rating: 5,
    },
    {
      name: 'Nadia S.',
      role: 'Working Mother',
      text: "As a mom of three, I thought getting fit was impossible. Shuhaib designed 40-minute sessions that fit between school runs. I'm stronger now than before my kids were born.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealSection className="text-center">
          <SectionBadge icon={Heart}>Client Transformations</SectionBadge>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Real People.{' '}
            <span className="text-gradient">Real Results.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-300">
            Don't take my word for it. Hear from the hundreds of people who've
            transformed their bodies and lives.
          </p>
        </RevealSection>

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-20" staggerDelay={0.08}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="card-hover glass group relative h-full overflow-hidden rounded-3xl p-7">
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-dark-200">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-400 text-sm font-bold text-dark-950">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-brand-400">{t.role}</div>
                  </div>
                </div>
                {/* Subtle hover glow */}
                <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-brand-500/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════ */
function Pricing() {
  const plans = [
    {
      name: 'Starter',
      desc: 'Perfect for those beginning their fitness journey',
      price: 750,
      period: '/month',
      features: [
        'Personalized workout plan',
        'Weekly progress check-ins',
        'Nutrition guidelines',
        'Exercise video library',
        'Community forum access',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      desc: 'For serious athletes ready to transform',
      price: 1500,
      period: '/month',
      features: [
        'Everything in Starter',
        '3x weekly 1-on-1 sessions',
        'Custom meal plans',
        'Form correction videos',
        'WhatsApp support (24h)',
        'Monthly body composition analysis',
        'Supplement guidance',
      ],
      cta: 'Start Training',
      popular: true,
    },
    {
      name: 'Elite',
      desc: 'The ultimate transformation experience',
      price: 2500,
      period: '/month',
      features: [
        'Everything in Pro',
        '5x weekly 1-on-1 sessions',
        'Daily check-ins & support',
        'Competition prep (if applicable)',
        'Priority scheduling',
        'Recovery & mobility sessions',
        'VIP community access',
        'Quarterly strategy sessions',
      ],
      cta: 'Go Elite',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.imgur.com/6uHBwDx.jpeg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-20"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-dark-950/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/80 to-dark-950" />
      </div>
      <AmbientBlobs />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <RevealSection className="text-center">
          <SectionBadge icon={Zap}>Investment Plans</SectionBadge>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Invest in Your{' '}
            <span className="text-gradient">Best Self</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-300">
            Choose the level of commitment that matches your goals. Every plan includes
            my proven training methodology and unwavering support.
          </p>
        </RevealSection>

        <StaggerContainer className="mt-16 grid gap-6 lg:grid-cols-3 lg:mt-20 items-start" staggerDelay={0.12}>
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={`card-hover relative h-full overflow-hidden rounded-3xl p-8 lg:p-10 ${
                  plan.popular
                    ? 'glass-strong border-brand-500/30 ring-1 ring-brand-500/20'
                    : 'glass'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="rounded-bl-2xl bg-gradient-to-r from-brand-500 to-brand-400 px-4 py-1.5 text-xs font-bold text-dark-950">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-dark-400">{plan.desc}</p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-brand-400">AED</span>
                    <span className="font-display text-5xl font-extrabold text-white">{plan.price.toLocaleString()}</span>
                    <span className="text-dark-400">{plan.period}</span>
                  </div>

                  <div className="mt-8 space-y-4">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/10">
                          <Check className="h-3 w-3 text-brand-400" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-dark-200">{f}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="?page=leads"
                    className={`mt-8 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-bold transition-all duration-300 hover:scale-[1.02] ${
                      plan.popular
                        ? 'bg-gradient-to-r from-brand-500 to-brand-400 text-dark-950 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/35'
                        : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                {/* Background glow for popular */}
                {plan.popular && (
                  <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 h-40 w-3/4 rounded-full bg-brand-500/15 blur-3xl" />
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Money-back guarantee */}
        <RevealSection className="mt-12 text-center">
          <div className="glass-strong inline-flex items-center gap-3 rounded-2xl px-6 py-4">
            <Shield className="h-6 w-6 text-brand-400" />
            <span className="text-sm text-dark-200">
              <strong className="text-white">30-Day Money-Back Guarantee.</strong> If you're not satisfied with the quality of coaching, get a full refund. No questions asked.
            </span>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════ */
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="glass overflow-hidden rounded-2xl transition-all duration-300">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-white/[0.02]"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-white pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-brand-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="border-t border-white/5 px-6 pb-6 pt-4">
              <p className="text-base leading-relaxed text-dark-300">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How are the training sessions structured?',
      a: "Each session begins with a dynamic warm-up tailored to your workout, followed by the main training block (strength, hypertrophy, or conditioning), and concludes with cool-down and mobility work. Sessions typically run 45-60 minutes and are designed for maximum efficiency.",
    },
    {
      q: 'Do I need to be experienced to start?',
      a: "Absolutely not. Whether you're a complete beginner or an advanced lifter, I'll meet you exactly where you are. My programs scale from foundational movement patterns all the way to elite-level training. Your starting point doesn't matter—your commitment does.",
    },
    {
      q: 'What if I have injuries or limitations?',
      a: "Safety is my top priority. During our initial assessment, we'll identify any limitations and build your program around them. I have extensive experience working with clients who have knee issues, back pain, shoulder problems, and more. We'll train smart and train safe.",
    },
    {
      q: 'How does online coaching work?',
      a: "You'll receive a fully customized training program via my app, with video demonstrations for every exercise. I provide weekly check-ins, form reviews via video, nutrition adjustments, and unlimited messaging support (response within 24 hours for Pro, same-day for Elite).",
    },
    {
      q: 'Is nutrition coaching included in every plan?',
      a: "Yes. Every plan includes nutrition support—Starter comes with guidelines, while Pro and Elite include fully customized macro-based meal plans, supplement guidance, and ongoing adjustments as your body changes.",
    },
    {
      q: 'Do you train clients outside Dubai?',
      a: "Absolutely. In-person sessions are based in Dubai, UAE, but my online coaching programs serve clients across the GCC and worldwide with the same programming, check-ins, and accountability systems.",
    },
    {
      q: 'Can I switch plans later?',
      a: "Of course! You can upgrade or modify your plan at any time. Many clients start with Starter and upgrade to Pro once they experience the results firsthand. Your journey is flexible—just reach out and we'll make it happen.",
    },
    {
      q: 'What results can I realistically expect?',
      a: "Results depend on your starting point and consistency, but my clients typically see visible changes within 2-3 weeks, significant strength improvements within 4-6 weeks, and complete body transformations within 3-6 months. I guarantee you'll see progress if you follow the program.",
    },
  ];

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <RevealSection className="text-center">
          <SectionBadge icon={Sparkles}>Got Questions?</SectionBadge>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Frequently Asked{' '}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-dark-300">
            Everything you need to know before getting started. Can't find your answer?
            Reach out directly.
          </p>
        </RevealSection>

        <div className="mt-12 space-y-3 lg:mt-16">
          {faqs.map((faq, i) => (
            <RevealSection key={i} delay={i * 0.05}>
              <FAQItem
                question={faq.q}
                answer={faq.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <AmbientBlobs />
      <div className="mx-auto max-w-7xl px-6">
        <RevealSection>
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-500/20 bg-gradient-to-br from-brand-500/10 via-dark-900 to-dark-950 p-10 text-center sm:p-16 lg:p-20">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-brand-500/10 blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-brand-400/10 blur-[80px]" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 shadow-lg shadow-brand-500/10"
              >
                <Flame className="h-8 w-8 text-brand-400" />
              </motion.div>

              <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                Ready to{' '}
                <span className="text-gradient">Transform?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-300">
                Stop waiting for Monday. Stop waiting for the "perfect time."
                The best time to start was yesterday. The second best time is right now.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="?page=leads"
                  className="btn-glow group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 px-10 py-5 text-lg font-bold text-dark-950 shadow-xl shadow-brand-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/40 hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="mailto:Shuhaibkzr786@gmail.com"
                  className="inline-flex items-center gap-2 text-base font-semibold text-dark-300 transition-colors hover:text-white"
                >
                  <Mail className="h-5 w-5 text-brand-400" />
                  Or email me directly
                </a>
              </div>

              <p className="mt-6 text-sm text-dark-500">
                Free consultation • No commitment required • Results guaranteed
              </p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  const footerLinks = [
    {
      title: 'Programs',
      links: ['Strength Foundation', 'Shred Protocol', 'Athletic Performance', 'Total Transformation'],
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Press'],
    },
    {
      title: 'Support',
      links: ['Contact', 'FAQ', 'Privacy Policy', 'Terms of Service'],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5 pt-16 pb-8">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.imgur.com/KKycI1z.jpeg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-20"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Dark overlays for readability */}
        <div className="absolute inset-0 bg-dark-950/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/80 to-dark-950" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-400 shadow-lg shadow-brand-500/25">
                <Dumbbell className="h-5 w-5 text-dark-950" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Shuhaib<span className="text-brand-400">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-base text-dark-400">
              Elite personal training for those who refuse to settle for average.
              Transform your body. Elevate your life.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Camera, label: 'Instagram', href: 'https://www.instagram.com/j_d__lifestyle?igsh=ams4Y2U1Nmp4bXVh' },
                { icon: MessageCircle, label: 'Twitter', href: '#' },
                { icon: Video, label: 'YouTube', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-dark-400 transition-all hover:border-brand-500/30 hover:bg-brand-500/5 hover:text-brand-400"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            {/* Contact details */}
            <div className="mt-6 space-y-2.5">
              <a
                href="mailto:Shuhaibkzr786@gmail.com"
                className="flex items-center gap-2.5 text-sm text-dark-400 transition-colors hover:text-brand-400"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span className="break-all">Shuhaibkzr786@gmail.com</span>
              </a>
              <a
                href="https://wa.me/971567188990"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-dark-400 transition-colors hover:text-brand-400"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                <span>+971 56 718 8990</span>
                <span className="ml-1 rounded-md bg-brand-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-400">
                  WhatsApp
                </span>
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-dark-400 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-dark-500">
            © {new Date().getFullYear()} Trainer Shuhaib. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-dark-500">
            <MapPin className="h-4 w-4" />
            <span>Dubai, UAE</span>
            <span className="mx-2">•</span>
            <a href="tel:+971567188990" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Phone className="h-4 w-4" />
              <span>+971 56 718 8990</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   FLOATING WHATSAPP BUTTON
   ═══════════════════════════════════════════ */
function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    // Show immediately in case the page is short
    setVisible(window.scrollY > 400);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/971567188990?text=Hi%20Shuhaib%2C%20I'm%20interested%20in%20your%20personal%20training%20programs."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          {/* Breathing pulse rings */}
          <span className="pointer-events-none absolute right-0 h-14 w-14 rounded-full bg-brand-500/40 animate-breathe" />
          {/* Tooltip label */}
          <span className="glass-strong pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-xl transition-opacity duration-300 group-hover:opacity-100 sm:block">
            Chat with Shuhaib
          </span>
          {/* Main button */}
          <span className="animate-breathe relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 fill-current"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function App() {
  return (
    <div className="noise-overlay relative min-h-screen bg-dark-950">
      <Navbar />
      <Hero />
      <KeywordMarquee />
      <SocialProof />
      <About />
      <Features />
      <Programs />
      <Method />
      <Gallery />
      <Benefits />
      <Nutrition />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
