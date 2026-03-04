import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = ['Full Stack', 'MERN Stack', 'Java', 'React', 'Cloud Native']
const techBadges = ['Java', 'Spring Boot', 'React', 'Node.js', 'MongoDB', 'Docker']

export default function Hero() {
  const heroRef = useRef(null)
  const orbRef1 = useRef(null)
  const orbRef2 = useRef(null)
  const orbRef3 = useRef(null)
  const wordRef = useRef(null)
  const wordIndex = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating background orbs
      gsap.to(orbRef1.current, { x: 80, y: -50, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to(orbRef2.current, { x: -60, y: 70, duration: 11, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 })
      gsap.to(orbRef3.current, { x: 50, y: 40, duration: 13, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 4 })

      // Parallax on scroll
      gsap.to('.hero-content', {
        y: 120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      })
      gsap.to('.hero-bg-grid', {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      })
    }, heroRef)

    // Word cycling
    const cycleWords = () => {
      if (!wordRef.current) return
      gsap.to(wordRef.current, {
        opacity: 0, y: -16, duration: 0.35, ease: 'power2.in',
        onComplete: () => {
          wordIndex.current = (wordIndex.current + 1) % words.length
          if (wordRef.current) wordRef.current.textContent = words[wordIndex.current]
          gsap.fromTo(wordRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
        },
      })
    }
    const interval = setInterval(cycleWords, 2200)

    return () => { clearInterval(interval); ctx.revert() }
  }, [])

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background gradient orbs */}
      <div ref={orbRef1} className="absolute top-[15%] left-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(10,132,255,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div ref={orbRef2} className="absolute bottom-[20%] right-[10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(94,92,230,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div ref={orbRef3} className="absolute top-[40%] right-[25%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(48,209,88,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* Grid lines */}
      <div className="hero-bg-grid absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      {/* Content */}
      <motion.div className="hero-content relative z-10 text-center px-5 sm:px-6 w-full max-w-4xl mx-auto pt-20 pb-10"
        variants={stagger} initial="hidden" animate="visible">

        {/* Badge */}
        <motion.div variants={fadeUp} className="flex justify-center mb-6 sm:mb-8">
          <div className="glass inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
            <span className="text-xs sm:text-sm text-gray-400 font-medium">Available for opportunities</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.div variants={fadeUp} className="mb-4 sm:mb-5">
          <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-black tracking-tight leading-[0.95] text-white">
            Dhanunjay
          </h1>
          <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-black tracking-tight leading-[0.95] gradient-text">
            Thumula
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p variants={fadeUp} className="text-base sm:text-xl md:text-2xl text-gray-400 font-medium mb-5 sm:mb-6">
          Java Full Stack &amp; MERN Stack Developer
        </motion.p>

        {/* Cycling role pill */}
        <motion.div variants={fadeUp} className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full glass">
            <span className="text-gray-500 text-xs sm:text-sm">Currently crafting</span>
            <span ref={wordRef} className="text-[#0A84FF] font-semibold text-xs sm:text-sm min-w-[70px]">{words[0]}</span>
            <span className="text-gray-500 text-xs sm:text-sm">solutions</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <motion.button onClick={() => scrollTo('#projects')} className="btn-primary text-white w-full sm:w-auto"
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
            View Projects
          </motion.button>
          <motion.button onClick={() => scrollTo('#contact')} className="btn-secondary text-white w-full sm:w-auto"
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
            Contact Me
          </motion.button>
        </motion.div>

        {/* Tech badges */}
        <motion.div variants={fadeUp} className="mt-10 sm:mt-14 flex flex-wrap justify-center gap-2 sm:gap-3">
          {techBadges.map((tech, i) => (
            <motion.span key={tech} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-medium text-gray-400 glass"
              whileHover={{ scale: 1.08, color: '#0A84FF', borderColor: 'rgba(10,132,255,0.3)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.06, duration: 0.5 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] text-gray-600 tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-7 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-[#0A84FF]" />
        </motion.div>
      </motion.div>

      {/* Floating dots */}
      {[
        { size: 5, top: '18%', left: '7%', color: '#0A84FF', d: 0 },
        { size: 3, top: '65%', left: '5%', color: '#5E5CE6', d: 1.2 },
        { size: 6, top: '25%', right: '7%', color: '#30D158', d: 0.6 },
        { size: 4, top: '72%', right: '9%', color: '#0A84FF', d: 1.8 },
      ].map((dot, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none hidden sm:block"
          style={{ width: dot.size, height: dot.size, top: dot.top, left: dot.left, right: dot.right, background: dot.color, boxShadow: `0 0 ${dot.size * 4}px ${dot.color}` }}
          animate={{ y: [-8, 8, -8], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, delay: dot.d, ease: 'easeInOut' }} />
      ))}
    </div>
  )
}
