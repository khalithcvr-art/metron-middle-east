import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dumbbell,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  AlertCircle,
  Shield,
  Star,
  Users,
  Clock,
  TrendingUp,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

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

const GOALS = [
  'Fat Loss',
  'Muscle Building',
  'Strength / Powerlifting',
  'Athletic Performance',
  'Total Transformation',
];

const BENEFITS = [
  'A workout & nutrition plan built entirely around your body and schedule',
  'A free 1-on-1 goal consultation with Shuhaib — no obligation',
  'A response within 24 hours, guaranteed',
];

const STATS = [
  { value: '500+', label: 'Clients Coached', icon: Users },
  { value: '8+', label: 'Years Experience', icon: Clock },
  { value: '97%', label: 'Success Rate', icon: TrendingUp },
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

function encodeForm(data: FormData) {
  return Array.from(data.entries())
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
}

export default function LeadsPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [name, setName] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get('bot-field') || '').length > 0) return;
    setName(String(data.get('name') || '').split(' ')[0] || 'there');
    setStatus('submitting');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="noise-overlay relative min-h-screen bg-dark-950">
      {/* Minimal header — back button + logo, no other nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-dark-300 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Home</span>
        </a>
        <a href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-400 shadow-lg shadow-brand-500/25">
            <Dumbbell className="h-5 w-5 text-dark-950" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            Shuhaib<span className="text-brand-400">.</span>
          </span>
        </a>
      </header>

      <section className="relative overflow-hidden px-6 pb-24 pt-4 sm:pb-32">
        <AmbientBlobs />
        <div className="bg-grid absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="glass-strong mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5">
              <Sparkles className="h-4 w-4 text-brand-400" />
              <span className="text-sm font-medium text-brand-300">Free Custom Consultation</span>
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Get Your Free{' '}
              <span className="text-gradient">Transformation Plan</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-dark-300">
              Tell Trainer Shuhaib your goal and he'll personally map out how to get you
              there — strength, fat loss, or a total transformation. No cost, no obligation.
            </p>
          </motion.div>

          {/* Content grid */}
          <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Left — trust & benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-2"
            >
              <div className="glass rounded-3xl p-7">
                <h2 className="font-display text-lg font-bold text-white">What you'll get</h2>
                <div className="mt-5 space-y-4">
                  {BENEFITS.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/10">
                        <Check className="h-3 w-3 text-brand-400" strokeWidth={3} />
                      </div>
                      <span className="text-sm leading-relaxed text-dark-200">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {STATS.map((s) => (
                  <div key={s.label} className="glass rounded-2xl px-3 py-4 text-center">
                    <s.icon className="mx-auto h-4 w-4 text-brand-400" />
                    <div className="mt-2 font-display text-xl font-bold text-white">{s.value}</div>
                    <div className="mt-0.5 text-[11px] leading-tight text-dark-400">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="glass mt-6 rounded-3xl p-6">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-sm italic leading-relaxed text-dark-200">
                  "Shuhaib doesn't just train your body—he rewires your mindset. Best
                  investment I've ever made."
                </p>
                <p className="mt-3 text-xs font-semibold text-brand-400">Ahmed R. — Lost 30kg in 6 months</p>
              </div>
            </motion.div>

            {/* Right — form card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="lg:col-span-3"
            >
              <div className="glass-strong glow-brand-sm relative overflow-hidden rounded-3xl p-7 sm:p-10">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center py-10 text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10">
                        <CheckCircle2 className="h-8 w-8 text-brand-400" />
                      </div>
                      <h3 className="font-display mt-6 text-2xl font-bold text-white">
                        Thanks, {name}!
                      </h3>
                      <p className="mt-2 max-w-sm text-dark-300">
                        Your request is in. Shuhaib will personally reach out within 24 hours
                        to build your plan.
                      </p>
                      <a
                        href="https://wa.me/971567188990?text=Hi%20Shuhaib%2C%20I%20just%20submitted%20my%20free%20consultation%20request."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                      >
                        <MessageCircle className="h-4 w-4 text-brand-400" />
                        Message me on WhatsApp for a faster reply
                      </a>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      name="lead-capture"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      <input type="hidden" name="form-name" value="lead-capture" />
                      <p className="hidden">
                        <label>
                          Don't fill this out: <input name="bot-field" />
                        </label>
                      </p>

                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-dark-200">
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-dark-500 outline-none transition-colors focus:border-brand-500/50 focus:bg-white/[0.07]"
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-dark-200">
                            WhatsApp Number
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="+971 5X XXX XXXX"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-dark-500 outline-none transition-colors focus:border-brand-500/50 focus:bg-white/[0.07]"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-dark-200">
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@email.com"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-dark-500 outline-none transition-colors focus:border-brand-500/50 focus:bg-white/[0.07]"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="goal" className="mb-1.5 block text-sm font-medium text-dark-200">
                          Primary Goal
                        </label>
                        <select
                          id="goal"
                          name="goal"
                          required
                          defaultValue=""
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-brand-500/50 focus:bg-white/[0.07]"
                        >
                          <option value="" disabled className="bg-dark-900">
                            Select your goal
                          </option>
                          {GOALS.map((g) => (
                            <option key={g} value={g} className="bg-dark-900">
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>

                      {status === 'error' && (
                        <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>
                            Something went wrong sending that. Please try again, or{' '}
                            <a href="https://wa.me/971567188990" className="underline">
                              message me on WhatsApp
                            </a>{' '}
                            instead.
                          </span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="btn-glow group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 px-8 py-4 text-base font-bold text-dark-950 shadow-xl shadow-brand-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/35 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                      >
                        {status === 'submitting' ? 'Sending...' : 'Get My Free Plan'}
                        {status !== 'submitting' && (
                          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-2 text-xs text-dark-500">
                        <Shield className="h-3.5 w-3.5" />
                        Your information is 100% confidential. No spam, ever.
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-sm text-dark-500">
        © {new Date().getFullYear()} Trainer Shuhaib. Dubai, UAE. · +971 56 718 8990
      </footer>
    </div>
  );
}
