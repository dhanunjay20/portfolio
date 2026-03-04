import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react'

const socials = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@jaydev.com', label: 'Email' },
]

const links = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/[0.06]">
      {/* Glow */}
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-[#5E5CE6]/30 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 sm:gap-6">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
              Jay<span className="text-[#0A84FF]">.</span>Dev
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-[220px]">Building digital experiences with code & creativity.</p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-5 sm:gap-x-6 gap-y-2">
            {links.map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-xs sm:text-sm text-gray-500 hover:text-white transition-colors duration-200">
                {label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-2.5">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-colors duration-200"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
                aria-label={label}>
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] sm:text-xs text-gray-600">
            © {new Date().getFullYear()} Jay.Dev — All rights reserved.
          </p>
          <motion.button onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-600 hover:text-white transition-colors"
            whileHover={{ y: -2 }} whileTap={{ scale: 0.94 }}>
            Back to top <ArrowUp size={12} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
