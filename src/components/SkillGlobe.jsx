import { useRef, useMemo, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useInView } from 'framer-motion'
import {
  FaJava, FaLeaf, FaReact, FaNode, FaDatabase,
  FaDocker, FaJs, FaServer, FaCube, FaArrowRight,
} from 'react-icons/fa'

const skills = [
  { name: 'Java',        color: '#FF6B35', Icon: FaJava },
  { name: 'Spring Boot', color: '#6DB33F', Icon: FaLeaf },
  { name: 'React',       color: '#61DAFB', Icon: FaReact },
  { name: 'Node.js',     color: '#68A063', Icon: FaNode },
  { name: 'MongoDB',     color: '#47A248', Icon: FaDatabase },
  { name: 'Kafka',       color: '#FF5733', Icon: FaServer },
  { name: 'Docker',      color: '#2496ED', Icon: FaDocker },
  { name: 'MySQL',       color: '#4479A1', Icon: FaDatabase },
  { name: 'JavaScript',  color: '#F7DF1E', Icon: FaJs },
  { name: 'Next.js',     color: '#FFFFFF', Icon: FaCube },
]

function getSpherePoint(index, total, radius) {
  const phi = Math.acos(1 - (2 * (index + 0.5)) / total)
  const theta = Math.PI * (1 + Math.sqrt(5)) * index
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  )
}

function GlobeCore() {
  const groupRef = useRef()
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.04
    }
  })
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#0A84FF" metalness={0.85} roughness={0.15} transparent opacity={0.12} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.01, 20, 20]} />
        <meshBasicMaterial color="#0A84FF" wireframe transparent opacity={0.07} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.97, 24, 24]} />
        <meshStandardMaterial color="#5E5CE6" emissive="#5E5CE6" emissiveIntensity={0.25} transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

function SkillNode({ skill, position, index }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime
      ref.current.position.x = position.x + Math.sin(t * 0.4 + index) * 0.025
      ref.current.position.y = position.y + Math.cos(t * 0.35 + index) * 0.025
      ref.current.position.z = position.z
    }
  })

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[hovered ? 0.05 : 0.035, 10, 10]} />
        <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={hovered ? 2 : 0.7} />
      </mesh>
      <Html distanceFactor={5} occlude={false} style={{ pointerEvents: 'none', userSelect: 'none', transform: 'translate(-50%, -50%)' }}>
        <div onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}
          style={{ pointerEvents: 'auto', transition: 'transform 0.2s', transform: hovered ? 'scale(1.12)' : 'scale(1)', position: 'relative', left: '-50%', top: '-50%' }}>
          <div style={{
            background: hovered ? `rgba(${hexToRgb(skill.color)},0.22)` : 'rgba(12,12,16,0.88)',
            border: `1px solid ${hovered ? skill.color : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 16, padding: '3px 9px', display: 'flex', alignItems: 'center', gap: 4,
            backdropFilter: 'blur(8px)', boxShadow: hovered ? `0 0 18px ${skill.color}55` : 'none',
            whiteSpace: 'nowrap', minWidth: 'max-content'
          }}>
            <span style={{ fontSize: 9, display: 'flex', alignItems: 'center' }}>
              <skill.Icon style={{ color: hovered ? skill.color : '#aaa', width: 9, height: 9 }} />
            </span>
            <span style={{ color: hovered ? skill.color : '#d0d0d0', fontSize: 10, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
              {skill.name}
            </span>
          </div>
        </div>
      </Html>
    </group>
  )
}

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '255,255,255'
}

function OrbitRings() {
  const r1 = useRef(), r2 = useRef(), r3 = useRef()
  useFrame(() => {
    if (r1.current) r1.current.rotation.y += 0.003
    if (r2.current) r2.current.rotation.z += 0.002
    if (r3.current) r3.current.rotation.x += 0.0015
  })
  return (
    <group>
      <mesh ref={r1}><torusGeometry args={[1.7, 0.004, 2, 80]} /><meshBasicMaterial color="#0A84FF" transparent opacity={0.12} /></mesh>
      <mesh ref={r2} rotation={[Math.PI/3, 0, Math.PI/4]}><torusGeometry args={[2, 0.003, 2, 80]} /><meshBasicMaterial color="#5E5CE6" transparent opacity={0.08} /></mesh>
      <mesh ref={r3} rotation={[Math.PI/2, Math.PI/6, 0]}><torusGeometry args={[1.5, 0.003, 2, 80]} /><meshBasicMaterial color="#30D158" transparent opacity={0.06} /></mesh>
    </group>
  )
}

function Scene({ isMobile }) {
  const radius = isMobile ? 1.35 : 1.6
  const positions = useMemo(() => skills.map((_, i) => getSpherePoint(i, skills.length, radius)), [radius])

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.8} color="#0A84FF" />
      <pointLight position={[-5, -3, -5]} intensity={1.2} color="#5E5CE6" />
      <pointLight position={[0, 4, -5]} intensity={0.8} color="#30D158" />
      <Stars radius={60} depth={40} count={1500} factor={2.5} fade speed={0.4} />
      <GlobeCore />
      <OrbitRings />
      {skills.map((skill, i) => (
        <SkillNode key={skill.name} skill={skill} position={positions[i]} index={i} />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} rotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.25} maxPolarAngle={Math.PI * 0.75} />
    </>
  )
}

export default function SkillGlobe() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [isMobile, setIsMobile] = useState(false)

  // Check mobile once
  useState(() => {
    if (typeof window !== 'undefined') setIsMobile(window.innerWidth < 640)
  })

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }
  const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }

  return (
    <div ref={ref} className="relative min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] py-16 sm:py-20 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(10,132,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <motion.div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6"
        variants={stagger} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>

        <motion.div variants={fadeUp} className="text-center">
          <span className="section-label">Capabilities</span>
        </motion.div>
        <motion.h2 variants={fadeUp} className="section-title text-center text-white mb-2 sm:mb-3">
          Interactive <span className="gradient-text-blue">Skill Globe</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-500 text-center text-sm sm:text-base max-w-lg mx-auto mb-8 sm:mb-12">
          Drag to explore. Hover skills to highlight. Each node represents a technology I work with daily.
        </motion.p>

        {/* Globe */}
        <motion.div variants={fadeUp} className="relative mx-auto w-full overflow-visible flex justify-center">
          <div className="relative w-full sm:max-w-[560px] lg:w-full overflow-visible" style={{ perspective: '1000px' }}>
            <div className="relative w-full aspect-square overflow-visible max-h-[500px] sm:max-h-[600px] lg:max-h-[700px]">
              <Canvas camera={{ position: [0, 0, isMobile ? 5 : 4.5], fov: 45 }}
                gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
                <Suspense fallback={null}><Scene isMobile={isMobile} /></Suspense>
              </Canvas>
            </div>
            <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-gray-600 select-none whitespace-nowrap">
              Drag to rotate · Hover to explore
            </p>
          </div>
        </motion.div>

        {/* Infinite marquee */}
        <motion.div variants={fadeUp} className="mt-6 sm:mt-8 overflow-hidden relative" style={{ perspective: '1200px' }}>
          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10" style={{ background: 'linear-gradient(to right, #0A0A0A, transparent)' }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10" style={{ background: 'linear-gradient(to left, #0A0A0A, transparent)' }} />
          <motion.div className="marquee-track flex gap-3" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
            {[...skills, ...skills].map((skill, i) => (
              <motion.div key={i}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full glass text-xs sm:text-sm font-medium text-gray-300 cursor-default"
                style={{ border: '1px solid rgba(255,255,255,0.07)', transformStyle: 'preserve-3d' }}
                whileHover={{ scale: 1.08, rotateY: 15, z: 50 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = skill.color
                  e.currentTarget.style.borderColor = skill.color
                  e.currentTarget.style.boxShadow = `0 0 18px ${skill.color}28`
                  e.currentTarget.querySelector('.skill-icon').style.color = skill.color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = ''
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.querySelector('.skill-icon').style.color = ''
                }}
              >
                <skill.Icon className="skill-icon" style={{ width: 14, height: 14, color: '#9ca3af', transition: 'color 0.2s' }} />
                <span>{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
