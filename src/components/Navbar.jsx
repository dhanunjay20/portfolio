import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = navLinks.find((l) => l.href === `#${entry.target.id}`)
            if (link) setActive(link.label)
          }
        })
      },
      { threshold: 0.3 }
    )

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const handleNavClick = (label, href) => {
    setActive(label)
    setMenuOpen(false)
    // Use a small timeout to ensure menu closes before scrolling on mobile
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="fixed top-3 sm:top-5 inset-x-0 mx-auto z-50 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[680px]"
    >
      <div
        className={`relative rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50'
            : 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]'
        }`}
      >
        <div className="flex items-center h-10">
          {/* Logo */}
          <motion.button
            className="flex items-center gap-2 flex-1"
            onClick={() => handleNavClick('Home', '#home')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-[11px]"
              style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}
            >
              DT
            </div>
            <span className="font-semibold text-white text-sm hidden sm:block">Dhanunjay</span>
          </motion.button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center justify-center mx-2">
            {navLinks.map((link) => (
              <motion.button
                key={link.label}
                onClick={() => handleNavClick(link.label, link.href)}
                className={`relative px-2.5 lg:px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors duration-200 whitespace-nowrap ${
                  active === link.label ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                {active === link.label && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.07]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex flex-1 justify-end">
            <motion.button
              onClick={() => handleNavClick('Contact', '#contact')}
              className="px-4 py-1.5 rounded-full text-[13px] font-semibold text-white flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)',
                boxShadow: '0 2px 16px rgba(10,132,255,0.3)',
              }}
              whileHover={{ scale: 1.06, boxShadow: '0 4px 24px rgba(10,132,255,0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-[18px] h-[2px] bg-white rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              className="block w-[18px] h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-[18px] h-[2px] bg-white rounded-full origin-center"
            />
          </motion.button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-2.5 pb-2 border-t border-white/[0.06] mt-2 flex flex-col gap-0.5">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    type="button"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleNavClick(link.label, link.href)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active === link.label
                        ? 'text-white bg-white/[0.07]'
                        : 'text-gray-400 hover:bg-white/[0.04]'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.04 }}
                  onClick={() => handleNavClick('Contact', '#contact')}
                  className="w-full mt-1 py-2.5 rounded-xl text-sm font-semibold text-white text-center"
                  style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
