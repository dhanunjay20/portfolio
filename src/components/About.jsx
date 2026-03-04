import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: 'Projects Completed', value: 30, suffix: '+', color: '#0A84FF' },
  { label: 'Technologies Known', value: 20, suffix: '+', color: '#5E5CE6' },
  { label: 'Years Experience', value: 3, suffix: '+', color: '#30D158' },
]

function AnimatedCounter({ value, suffix, color, trigger }) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!trigger || hasRun.current) return
    hasRun.current = true
    const startTime = performance.now()
    const duration = 1800
    const animate = (now) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * value))
      if (p < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [trigger, value])

  return <span style={{ color }}>{count}{suffix}</span>
}

const experiences = [
  { role: 'Full Stack Developer', company: 'Enterprise Solutions', period: '2023 — Present', color: '#0A84FF' },
  { role: 'MERN Stack Developer', company: 'Startup Studio', period: '2022 — 2023', color: '#5E5CE6' },
  { role: 'Java Developer', company: 'Tech Corp', period: '2021 — 2022', color: '#30D158' },
]

const tags = ['Problem Solver', 'Clean Code', 'Microservices', 'Agile', 'Open Source']

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-anim').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7, delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%', once: true },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
  const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center bg-[#0A0A0A] py-20 sm:py-24 overflow-hidden">
      {/* Accent glow */}
      <div className="absolute top-0 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 80% 20%, rgba(94,92,230,0.08) 0%, transparent 60%)', filter: 'blur(40px)' }} />

      <motion.div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6"
        variants={stagger} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>

        <motion.div variants={fadeUp} className="text-center">
          <span className="section-label">Background</span>
        </motion.div>
        <motion.h2 variants={fadeUp} className="section-title text-center text-white mb-10 sm:mb-14">
          About <span className="gradient-text-blue">Me</span>
        </motion.h2>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-14">
          {/* Bio */}
          <div className="about-anim glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl font-black text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}>
                DT
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Dhanunjay Thumula</h3>
                <p className="text-gray-500 text-xs sm:text-sm">Java Full Stack &amp; MERN Developer</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              I&apos;m a passionate Full Stack Developer specializing in building scalable enterprise
              applications with Java and end-to-end web experiences with the MERN stack. I thrive
              on turning complex problems into elegant, performant solutions.
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5 sm:mb-8">
              My toolkit spans microservices architecture, event-driven systems with Kafka, containerized
              deployments with Docker, and rich interactive UIs with React and Next.js. I believe in
              clean code, great UX, and shipping fast.
            </p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium text-gray-400 bg-white/[0.04] border border-white/[0.07]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right cards */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Experience */}
            <div className="about-anim glass rounded-2xl sm:rounded-3xl p-5 sm:p-6">
              <h4 className="text-white font-semibold text-xs sm:text-sm tracking-wide uppercase mb-4">Experience Highlights</h4>
              <div className="space-y-3 sm:space-y-4">
                {experiences.map((exp, i) => (
                  <motion.div key={i} className="flex items-start gap-3 sm:gap-4"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                    <div className="mt-1.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full" style={{ background: exp.color, boxShadow: `0 0 8px ${exp.color}` }} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{exp.role}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{exp.company} · {exp.period}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="about-anim glass rounded-2xl sm:rounded-3xl p-5 sm:p-6">
              <h4 className="text-white font-semibold text-xs sm:text-sm tracking-wide uppercase mb-4">Education</h4>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(10,132,255,0.12)', border: '1px solid rgba(10,132,255,0.2)' }}>
                  🎓
                </div>
                <div>
                  <p className="text-white text-sm font-medium">B.Tech in Computer Science</p>
                  <p className="text-gray-500 text-xs mt-1">University · 2017 — 2021</p>
                  <p className="text-gray-600 text-xs mt-0.5">Data Structures · Algorithms · DBMS · OS</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="about-anim grid grid-cols-3 gap-3 sm:gap-5">
          {stats.map((stat) => (
            <div key={stat.label} className="counter-card">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1.5 sm:mb-3 tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} color={stat.color} trigger={isInView} />
              </div>
              <p className="text-gray-500 text-[11px] sm:text-sm font-medium">{stat.label}</p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-0.5 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
