import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      const pct = h > 0 ? window.scrollY / h : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] sm:h-[3px] z-[100] origin-left"
      style={{
        transform: 'scaleX(0)',
        background: 'linear-gradient(90deg, #0A84FF, #5E5CE6, #30D158)',
      }} />
  )
}
