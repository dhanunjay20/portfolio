import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })
  const visible = useRef(false)

  useEffect(() => {
    // Only on devices that support hover (i.e. not touch)
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    dot.style.display = 'block'
    ring.style.display = 'block'

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (!visible.current) {
        visible.current = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
    }

    const onLeave = () => {
      visible.current = false
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
    }

    const ticker = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18
      gsap.set(dot, { x: mouse.current.x, y: mouse.current.y })
      gsap.set(ring, { x: pos.current.x, y: pos.current.y })
    }

    // Hover detection
    const setHover = () => {
      gsap.to(dot, { scale: 0.5, duration: 0.2 })
      gsap.to(ring, { scale: 1.6, borderColor: 'rgba(10,132,255,0.5)', duration: 0.2 })
    }
    const clearHover = () => {
      gsap.to(dot, { scale: 1, duration: 0.2 })
      gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.35)', duration: 0.2 })
    }

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', setHover)
        el.addEventListener('mouseleave', clearHover)
      })
    }

    addListeners()
    // Re-scan after DOM changes
    const observer = new MutationObserver(() => addListeners())
    observer.observe(document.body, { childList: true, subtree: true })

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    gsap.ticker.add(ticker)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      gsap.ticker.remove(ticker)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{ display: 'none' }} />
      <div ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/35 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{ display: 'none' }} />
    </>
  )
}
