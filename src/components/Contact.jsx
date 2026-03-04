import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@jaydev.com', href: 'mailto:hello@jaydev.com' },
    { icon: MapPin, label: 'Location', value: 'Bengaluru, India', href: '#' },
    { icon: Phone, label: 'Phone', value: '+91-XXXXX-XXXXX', href: 'tel:+91' },
  ]

  const socials = [
    { icon: Github, href: '#', label: 'GitHub', color: '#fff' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0A66C2' },
    { icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
  ]

  return (
    <div ref={ref} className="relative min-h-screen bg-[#0A0A0A] py-20 sm:py-24 overflow-hidden">
      {/* BG glow */}
      <div className="absolute top-0 right-0 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 90% 10%, rgba(94,92,230,0.06) 0%, transparent 60%)', filter: 'blur(50px)' }} />

      <motion.div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6"
        variants={stagger} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>

        <motion.div variants={fadeUp} className="text-center">
          <span className="section-label">Contact</span>
        </motion.div>
        <motion.h2 variants={fadeUp} className="section-title text-center text-white mb-2 sm:mb-3">
          Let&apos;s <span className="gradient-text-purple">Connect</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-500 text-center text-sm sm:text-base max-w-lg mx-auto mb-10 sm:mb-14">
          Have a project in mind or want to collaborate? Drop a message and I&apos;ll get back soon.
        </motion.p>

        {/* Grid – form and info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Form */}
          <motion.form onSubmit={handleSubmit} variants={fadeUp}
            className="lg:col-span-3 glass-card p-5 sm:p-7 space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Name</label>
                <input type="text" placeholder="John Doe" className="contact-input" required />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Email</label>
                <input type="email" placeholder="john@example.com" className="contact-input" required />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">Message</label>
              <textarea rows={5} placeholder="Tell me about your project..." className="contact-input resize-none" required />
            </div>
            <motion.button type="submit"
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2.5 text-sm sm:text-base"
              whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
              {sent ? (
                <>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center text-[10px]">✓</motion.div>
                  Message Sent!
                </>
              ) : (
                <><Send size={15} /> Send Message</>
              )}
            </motion.button>
          </motion.form>

          {/* Sidebar */}
          <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">
            {/* Contact info */}
            <div className="glass-card p-5 sm:p-6 space-y-4 sm:space-y-5">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Get in Touch</h3>
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-[#5E5CE6]/40 transition-colors">
                    <Icon size={15} className="text-gray-400 group-hover:text-[#5E5CE6] transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-wider">{label}</p>
                    <p className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="glass-card p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">Social Connect</h3>
              <div className="flex gap-2.5 sm:gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center"
                    whileHover={{ scale: 1.12, borderColor: `${color}55`, boxShadow: `0 0 14px ${color}25` }}
                    whileTap={{ scale: 0.92 }}>
                    <Icon size={16} className="text-gray-400" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-4 sm:p-5 flex items-center gap-3">
              <div className="relative shrink-0">
                <span className="block w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping opacity-50" />
              </div>
              <span className="text-xs sm:text-sm text-gray-400">Available for new projects & freelance work</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
