import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1, title: 'MERN E-commerce Platform',
    description: 'Full-featured e-commerce with real-time inventory, Stripe payments, cart, wishlist, admin dashboard, and JWT authentication.',
    tags: ['React', 'Node.js', 'MongoDB', 'Redux', 'Stripe'],
    color: '#0A84FF', gradient: 'from-blue-900/30 to-purple-900/20',
    emoji: '🛒', github: '#', demo: '#', featured: true,
  },
  {
    id: 2, title: 'Kafka Event Streaming',
    description: 'Microservices event-driven architecture using Apache Kafka for real-time data streaming and notification pipelines.',
    tags: ['Java', 'Spring Boot', 'Kafka', 'Docker'],
    color: '#5E5CE6', gradient: 'from-purple-900/30 to-indigo-900/20',
    emoji: '⚡', github: '#', demo: '#', featured: true,
  },
  {
    id: 3, title: 'Real-time Chat App',
    description: 'Socket.io powered chat with rooms, DMs, file sharing, emoji reactions, and message encryption.',
    tags: ['React', 'Socket.io', 'Node.js', 'Redis'],
    color: '#30D158', gradient: 'from-green-900/30 to-teal-900/20',
    emoji: '💬', github: '#', demo: '#', featured: false,
  },
  {
    id: 4, title: 'Job Portal',
    description: 'End-to-end job portal with company profiles, listings, resume upload, tracker, and automated email notifications.',
    tags: ['React', 'Spring Boot', 'MySQL', 'AWS'],
    color: '#FF9F0A', gradient: 'from-orange-900/30 to-red-900/20',
    emoji: '💼', github: '#', demo: '#', featured: false,
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [index])

  return (
    <div ref={cardRef} className="project-card group opacity-0">
      {/* Image area */}
      <div className={`relative h-36 sm:h-44 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }} />
        <div className="absolute inset-0 flex items-center justify-center project-image">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl"
            style={{
              background: `${project.color}20`, border: `1px solid ${project.color}35`,
              backdropFilter: 'blur(8px)',
            }}>
            {project.emoji}
          </div>
        </div>
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at center, ${project.color}12, transparent 70%)` }} />
        {project.featured && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold"
            style={{ background: `${project.color}22`, border: `1px solid ${project.color}45`, color: project.color }}>
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2 group-hover:text-[#0A84FF] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium"
              style={{ background: `${project.color}10`, border: `1px solid ${project.color}22`, color: project.color }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5">
          <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-300 bg-white/[0.04] border border-white/[0.08]"
            whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.96 }}>
            <Github size={13} /> GitHub
          </motion.a>
          <motion.a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-white"
            style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)` }}
            whileHover={{ scale: 1.04, boxShadow: `0 4px 18px ${project.color}45` }} whileTap={{ scale: 0.96 }}>
            <ExternalLink size={13} /> Live Demo
          </motion.a>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
  const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }

  return (
    <div ref={ref} className="relative min-h-screen bg-[#0A0A0A] py-20 sm:py-24 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 10% 90%, rgba(10,132,255,0.06) 0%, transparent 60%)', filter: 'blur(50px)' }} />

      <motion.div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6"
        variants={stagger} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>

        <motion.div variants={fadeUp} className="text-center">
          <span className="section-label">Work</span>
        </motion.div>
        <motion.h2 variants={fadeUp} className="section-title text-center text-white mb-2 sm:mb-3">
          Featured <span className="gradient-text-blue">Projects</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-500 text-center text-sm sm:text-base max-w-lg mx-auto mb-10 sm:mb-14">
          A selection of projects showcasing scalable, production-ready applications.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="text-center mt-10 sm:mt-14">
          <motion.a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 btn-secondary text-white"
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
            <Github size={16} /> View All on GitHub
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  )
}
