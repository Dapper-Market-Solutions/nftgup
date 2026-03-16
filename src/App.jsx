import { useState, useEffect, useRef } from 'react'

/* ─── Reveal on scroll ─── */
function Reveal({ children, className = '', delay = 0, style = {} }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}

/* ─── Unsplash helper ─── */
const img = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const PHOTOS = {
  hero: img('photo-1512621776951-a57141f2eefd', 1800),
  about: img('photo-1498837167922-ddd27525d352', 900),
  mealPrep: img('photo-1540189549336-e6e99c3679fe', 800),
  coaching: img('photo-1573497620053-ea5300f94f21', 800),
  produce: img('photo-1610348725531-843dff563e2c', 800),
  kitchen: img('photo-1556909114-f6e7ad7d3136', 800),
  smoothie: img('photo-1638176066666-ffb2f013c7dd', 800),
  service1: img('photo-1490645935967-10de6ba17061', 800),
  service2: img('photo-1490818387583-1baba5e638af', 800),
  service3: img('photo-1543362906-acfc16c67564', 800),
  cta: img('photo-1494390248081-4e521a5940db', 1400),
}

/* ─── Icons ─── */
const SproutIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 28V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 18C12 14 6 14 6 14C6 14 6 20 10 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M16 14C20 10 26 10 26 10C26 10 26 16 22 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
)

const ArrowRight = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const Star = () => (
  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

/* ─── Data ─── */
const SERVICES = [
  {
    title: 'Personalized Nutrition Plans',
    desc: 'Custom meal plans designed around your unique body, goals, and dietary preferences.',
    img: PHOTOS.service1,
  },
  {
    title: 'Whole Food Guidance',
    desc: 'Learn to nourish your body with nutrient-dense, whole foods for long-term health.',
    img: PHOTOS.smoothie,
  },
  {
    title: 'Ongoing Coaching & Support',
    desc: 'Regular check-ins, progress tracking, and plan adjustments as you evolve.',
    img: PHOTOS.coaching,
  },
  {
    title: 'Health Assessments',
    desc: 'Comprehensive evaluations to build your personalized nutrition roadmap.',
    img: PHOTOS.about,
  },
  {
    title: 'Meal Prep Education',
    desc: 'Practical strategies for planning and preparing healthy meals that fit your life.',
    img: PHOTOS.mealPrep,
  },
  {
    title: 'Lifestyle Integration',
    desc: 'Nutrition guidance that works with family meals, dining out, and busy schedules.',
    img: PHOTOS.produce,
  },
]

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    text: 'Working with Nutrition From the Ground Up completely changed my relationship with food. I have more energy, better sleep, and finally feel in control of my health.',
    result: 'Lost 35 lbs in 6 months',
  },
  {
    name: 'James R.',
    text: 'The personalized approach made all the difference. No cookie-cutter diets — just real guidance that actually works with my lifestyle.',
    result: 'Managing Type 2 Diabetes',
  },
  {
    name: 'Michelle T.',
    text: 'I was skeptical about nutrition coaching but the results speak for themselves. My blood work improved dramatically in just 3 months.',
    result: 'Improved cholesterol levels',
  },
]

function App() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">

      {/* ═══ NAV ═══ */}
      <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? 'shadow-[0_2px_8px_rgba(0,0,0,0.06)]' : ''} border-b border-border`}>
        <div className="container-main flex items-center justify-between" style={{ height: '72px' }}>
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center text-white">
              <SproutIcon className="w-5 h-5" />
            </div>
            <div className="leading-none">
              <div className="font-heading text-xl font-semibold text-charcoal">Nutrition</div>
              <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-warm mt-0.5">From the Ground Up</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-3">
            {['Services', 'About', 'Results'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-charcoal/60 hover:text-teal rounded-lg transition-colors" style={{ padding: '12px 24px' }}>
                {item}
              </a>
            ))}
            <a href="#contact" className="ml-6 text-sm font-semibold text-white bg-terra hover:bg-terra-dark rounded-lg transition-colors shadow-[0_2px_4px_rgba(196,124,90,0.3)] hover:shadow-[0_4px_8px_rgba(196,124,90,0.3)]" style={{ padding: '14px 48px' }}>
              Free Consultation
            </a>
          </div>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-charcoal/60">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileMenu
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              }
            </svg>
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-border bg-white py-6 space-y-2 shadow-lg" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            {['Services', 'About', 'Results'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="block text-sm text-charcoal/70 py-3 px-4 rounded-lg hover:bg-bg-alt">{item}</a>
            ))}
            <a href="#contact" onClick={() => setMobileMenu(false)} className="block text-sm font-semibold text-white bg-terra text-center rounded-lg mt-4" style={{ padding: '14px 48px' }}>Free Consultation</a>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={PHOTOS.hero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-charcoal/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-charcoal/10" />
        </div>

        <div className="relative container-main py-24 w-full">
          <div className="max-w-[600px]">
            <div className="animate-fade-up inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/80">Now Accepting New Clients</span>
            </div>

            <h1 className="animate-fade-up delay-1 font-heading text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-normal text-white leading-[1.1] mb-6">
              Where Better Health{' '}
              <em className="text-sage-light font-medium">Begins</em>
            </h1>

            <p className="animate-fade-up delay-2 text-[1.125rem] text-white/55 leading-relaxed max-w-[480px]" style={{ marginBottom: '48px' }}>
              Evidence-based nutritional guidance personalized to your body, your goals, and your life.
              Build lasting health from the foundation up.
            </p>

            <div className="animate-fade-up delay-3 flex flex-col sm:flex-row" style={{ gap: '16px', marginBottom: '64px' }}>
              <a href="#contact" className="group inline-flex items-center justify-center gap-3 bg-terra text-white font-semibold text-sm rounded-lg hover:bg-terra-dark transition-colors shadow-[0_4px_12px_rgba(196,124,90,0.4)]" style={{ padding: '16px 32px' }}>
                Book Free Consultation
                <ArrowRight />
              </a>
              <a href="#services" className="inline-flex items-center justify-center gap-2 text-white/70 font-medium text-sm rounded-lg border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all" style={{ padding: '16px 32px' }}>
                Explore Services
              </a>
            </div>

            <div className="animate-fade-up delay-4 flex flex-wrap border-t border-white/10" style={{ gap: '24px', paddingTop: '32px' }}>
              {[
                { value: '500+', label: 'Clients Served' },
                { value: '95%', label: 'Satisfaction' },
                { value: '10+', label: 'Years Experience' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-heading text-[1.75rem] font-semibold text-white leading-none">{stat.value}</div>
                  <div className="text-[10px] text-white/30 tracking-[0.08em] uppercase mt-1.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="bg-teal" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '48px' }}>
            {[
              { title: 'Evidence-Based', desc: 'Grounded in nutritional science', icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              )},
              { title: 'Personalized', desc: 'Built for your unique body', icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )},
              { title: 'Sustainable', desc: 'Habits that last a lifetime', icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              )},
              { title: 'Supportive', desc: 'With you every step', icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              )},
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 60} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white/80 flex items-center justify-center mx-auto" style={{ marginBottom: '16px' }}>
                  {v.icon}
                </div>
                <div className="text-sm font-semibold text-white" style={{ marginBottom: '6px' }}>{v.title}</div>
                <div className="text-xs text-white/35">{v.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="bg-white" style={{ paddingTop: '112px', paddingBottom: '112px' }}>
        <div className="container-main">
          <Reveal className="text-center" style={{ marginBottom: '64px' }}>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-terra" style={{ marginBottom: '12px' }}>What We Offer</p>
            <h2 className="font-heading text-[2rem] md:text-[2.5rem] font-normal text-charcoal" style={{ marginBottom: '20px' }}>
              Comprehensive Nutrition Services
            </h2>
            <p className="max-w-[540px] mx-auto text-gray-warm leading-relaxed">
              From personalized meal plans to ongoing coaching, everything you need to transform your relationship with food.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '32px' }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <a href="#contact" className="group block h-full bg-white border border-border rounded-xl overflow-hidden hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="relative overflow-hidden" style={{ height: '200px' }}>
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div style={{ padding: '28px 28px 24px' }}>
                    <h3 className="text-[1.125rem] font-heading font-semibold text-charcoal group-hover:text-teal transition-colors" style={{ marginBottom: '10px' }}>{s.title}</h3>
                    <p className="text-sm text-gray-warm leading-relaxed">{s.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-terra group-hover:gap-2.5 transition-all" style={{ marginTop: '20px' }}>
                      Get started <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="bg-bg-alt" style={{ paddingTop: '112px', paddingBottom: '112px' }}>
        <div className="container-main">
          <div className="grid lg:grid-cols-2 items-center" style={{ gap: '64px' }}>
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden" style={{ minHeight: '280px' }}>
              <img src={PHOTOS.about} alt="Fresh produce" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <Reveal>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-terra" style={{ marginBottom: '14px' }}>Our Approach</p>
                <h2 className="font-heading text-[2rem] md:text-[2.5rem] font-normal text-charcoal leading-tight" style={{ marginBottom: '28px' }}>
                  Science-backed,{' '}
                  <em className="text-teal">human-centered</em>{' '}
                  nutrition
                </h2>
                <p className="text-gray-warm leading-relaxed" style={{ marginBottom: '16px' }}>
                  We believe great nutrition isn't about restriction — it's about building a sustainable
                  foundation for lifelong health. Our evidence-based approach combines the latest science
                  with practical, real-world strategies.
                </p>
                <p className="text-gray-warm leading-relaxed" style={{ marginBottom: '40px' }}>
                  Every person is different. That's why we start with a comprehensive assessment before
                  creating your personalized plan — then walk with you every step of the way.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <div style={{ marginBottom: '48px' }}>
                  {[
                    { num: '01', title: 'Discover', desc: 'Comprehensive assessment of your health, habits, and goals.' },
                    { num: '02', title: 'Design', desc: 'Customized plan crafted using evidence-based strategies.' },
                    { num: '03', title: 'Deliver', desc: 'Ongoing support and adjustments for sustainable results.' },
                  ].map((step, i) => (
                    <div key={step.num} className="flex items-start" style={{ gap: '20px', marginBottom: i < 2 ? '28px' : '0' }}>
                      <div className="w-10 h-10 rounded-lg bg-teal text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {step.num}
                      </div>
                      <div style={{ paddingTop: '2px' }}>
                        <h4 className="text-sm font-bold text-charcoal" style={{ marginBottom: '4px' }}>{step.title}</h4>
                        <p className="text-sm text-gray-warm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={180}>
                <a href="#contact" className="group inline-flex items-center gap-3 bg-terra text-white font-semibold text-sm rounded-lg hover:bg-terra-dark transition-colors shadow-[0_2px_4px_rgba(196,124,90,0.3)]" style={{ padding: '18px 48px' }}>
                  Start Your Journey <ArrowRight />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PHOTO STRIP ═══ */}
      <section className="grid grid-cols-2 sm:grid-cols-4" style={{ height: '160px' }}>
        {[PHOTOS.mealPrep, PHOTOS.produce, PHOTOS.smoothie, PHOTOS.kitchen].map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-teal/15" />
          </div>
        ))}
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="results" className="bg-white" style={{ paddingTop: '112px', paddingBottom: '112px' }}>
        <div className="container-main">
          <Reveal className="text-center" style={{ marginBottom: '64px' }}>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-terra" style={{ marginBottom: '12px' }}>Client Results</p>
            <h2 className="font-heading text-[2rem] md:text-[2.5rem] font-normal text-charcoal">
              Real people, real results
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3" style={{ gap: '32px' }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="h-full bg-white border border-border rounded-xl flex flex-col hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300" style={{ padding: '32px' }}>
                  <div className="flex" style={{ gap: '3px', marginBottom: '20px' }}>
                    {[...Array(5)].map((_, j) => <Star key={j} />)}
                  </div>
                  <blockquote className="text-sm text-gray-warm leading-relaxed flex-1" style={{ marginBottom: '28px' }}>
                    "{t.text}"
                  </blockquote>
                  <div className="border-t border-border flex items-center" style={{ paddingTop: '20px', gap: '14px' }}>
                    <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center">
                      <span className="text-sm font-bold text-teal">{t.name[0]}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-charcoal">{t.name}</div>
                      <div className="text-xs text-sage font-medium">{t.result}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative min-h-[480px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={PHOTOS.cta} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-teal-dark/80" />
        </div>
        <div className="relative container-narrow text-center" style={{ paddingTop: '128px', paddingBottom: '128px' }}>
          <Reveal>
            <h2 className="font-heading text-[2rem] md:text-[2.75rem] text-white font-normal leading-tight" style={{ marginBottom: '24px' }}>
              Ready to transform your health?
            </h2>
            <p className="text-white/45 leading-relaxed max-w-[480px] mx-auto" style={{ marginBottom: '48px' }}>
              Join hundreds of clients who have built healthier, more energized lives
              with personalized nutritional guidance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center" style={{ gap: '16px' }}>
              <a href="#contact" className="inline-flex items-center justify-center gap-3 bg-terra text-white font-semibold text-sm rounded-lg hover:bg-terra-dark transition-colors shadow-[0_4px_12px_rgba(196,124,90,0.4)]" style={{ padding: '16px 32px' }}>
                Book Your Free Consultation <ArrowRight />
              </a>
              <a href="#about" className="inline-flex items-center justify-center text-white/60 font-medium text-sm rounded-lg border border-white/15 hover:bg-white/10 transition-all" style={{ padding: '16px 32px' }}>
                Learn More
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="bg-bg-alt" style={{ paddingTop: '112px', paddingBottom: '112px' }}>
        <div className="container-narrow">
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-terra" style={{ marginBottom: '12px' }}>Get Started</p>
              <h2 className="font-heading text-[2rem] md:text-[2.5rem] font-normal text-charcoal" style={{ marginBottom: '20px' }}>
                Let's build your foundation
              </h2>
              <p className="text-gray-warm leading-relaxed">
                Reach out to book your free 30-minute consultation.
              </p>
              <p className="text-gray-warm leading-relaxed">
                No obligation — just a conversation about your goals.
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2" style={{ gap: '24px', marginBottom: '48px', alignItems: 'stretch' }}>
            <Reveal style={{ height: '100%' }}>
              <a href="mailto:info@nutritionftgup.com" className="group block bg-white rounded-xl border border-border hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all" style={{ padding: '32px', height: '100%' }}>
                <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center" style={{ marginBottom: '20px' }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-mid" style={{ marginBottom: '8px' }}>Email</div>
                <div className="text-charcoal font-medium group-hover:text-teal transition-colors">info@nutritionftgup.com</div>
              </a>
            </Reveal>
            <Reveal delay={80} style={{ height: '100%' }}>
              <div className="bg-white rounded-xl border border-border" style={{ padding: '32px', height: '100%' }}>
                <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center" style={{ marginBottom: '20px' }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-mid" style={{ marginBottom: '8px' }}>Location</div>
                <div className="text-charcoal font-medium">Ann Arbor, MI</div>
                <div className="text-sm text-gray-warm" style={{ marginTop: '4px' }}>Serving clients across the country</div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: '20px', marginBottom: '48px' }}>
              <a href="https://www.instagram.com/ftgunutrition/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white border border-border rounded-xl hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all" style={{ padding: '16px 28px' }}>
                <svg className="w-5 h-5 text-teal" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                <span className="text-sm font-medium text-charcoal">Instagram</span>
              </a>
              <a href="https://www.facebook.com/ftgunutrition" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white border border-border rounded-xl hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all" style={{ padding: '16px 28px' }}>
                <svg className="w-5 h-5 text-teal" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span className="text-sm font-medium text-charcoal">Facebook</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex flex-col items-center text-center" style={{ gap: '24px' }}>
              <div style={{ marginBottom: '8px' }}>
                {[
                  'Free 30-minute consultation',
                  'No commitment required',
                  'Personalized recommendations',
                  'Serving clients nationwide',
                ].map((item, idx) => (
                  <div key={item} className="inline-flex items-center" style={{ gap: '8px', marginRight: idx < 3 ? '24px' : '0' }}>
                    <div className="w-4 h-4 rounded-full bg-sage-light text-teal flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </div>
                    <span className="text-xs text-gray-warm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-border max-w-md" style={{ padding: '24px' }}>
                <div className="flex justify-center" style={{ gap: '3px', marginBottom: '10px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} />)}
                </div>
                <p className="text-sm text-gray-warm italic leading-relaxed">"The best decision I made for my health this year."</p>
                <p className="text-xs text-gray-mid" style={{ marginTop: '10px' }}>— Recent client</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-charcoal">
        <div className="container-main" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between" style={{ gap: '24px', marginBottom: '24px' }}>
            <a href="#" className="flex items-center" style={{ gap: '10px' }}>
              <div className="w-8 h-8 rounded-md flex items-center justify-center text-white/70" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <SproutIcon className="w-4 h-4" />
              </div>
              <div className="leading-none">
                <div className="font-heading text-base font-semibold text-white/80">Nutrition</div>
                <div className="text-[9px] font-semibold tracking-[0.15em] uppercase text-white/40" style={{ marginTop: '1px' }}>From the Ground Up</div>
              </div>
            </a>
            <div className="flex flex-wrap items-center justify-center sm:justify-end" style={{ gap: '16px' }}>
              {['Services', 'About', 'Results', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-xs text-white/50 hover:text-white/80 transition-colors">{item}</a>
              ))}
            </div>
          </div>
          <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.08)', paddingTop: '20px' }}>
            <div className="flex flex-col items-center" style={{ gap: '14px' }}>
              <p className="text-xs text-white/35">&copy; {new Date().getFullYear()} Nutrition From the Ground Up. All rights reserved.</p>
              <div className="flex items-center" style={{ gap: '16px' }}>
                <a href="https://www.instagram.com/ftgunutrition/" target="_blank" rel="noopener noreferrer" className="text-white/35 hover:text-white/60 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.facebook.com/ftgunutrition" target="_blank" rel="noopener noreferrer" className="text-white/35 hover:text-white/60 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
