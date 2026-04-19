import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const ease = [0.22, 1, 0.36, 1]

const US_GROUPS = ["Pay in 4", "Pay Monthly", "PayPal Credit", "PayPal Mastercard"]
const UK_GROUPS = ["Pay in 3", "PayPal Credit UK"]

// Explicitly defining only the requested layout roles
const ROLES = [
  { name: "Product Manager", type: "core" },
  { name: "Engineer", type: "core" },
  { name: "Lawyer", type: "core" },
  { name: "Content Designer", type: "design" },
  { name: "Product Designer", type: "design" }
]

export default function CentralizedDesignSlide({ accent }) {
  const [designersVisible, setDesignersVisible] = useState(true)
  const [showHeadline, setShowHeadline] = useState(false)

  useEffect(() => {
    // Dissolve design pills after 4 seconds
    const DISSOLVE_START = 4000
    const DISSOLVE_DURATION = 700
    const t1 = setTimeout(() => {
      setDesignersVisible(false)
    }, DISSOLVE_START)

    // Headline + center graphic appear exactly 1s after pills are fully gone
    const t2 = setTimeout(() => {
      setShowHeadline(true)
    }, DISSOLVE_START + DISSOLVE_DURATION + 300)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[#070b14]">
      
      {/* Intense dark background ambient glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle at center, ${accent || '#00e5ff'}15 0%, transparent 65%)`
        }}
      />

      <motion.div
         className="absolute top-[8%] flex flex-col items-center z-40"
         initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
         animate={showHeadline ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: -20, filter: 'blur(10px)' }}
         transition={{ duration: 1.0, ease }}
      >
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
          Centralized Design Support
        </h1>
      </motion.div>

      {/* Main Glassmorphic Dashboard Layout */}
      <div className="relative w-full max-w-[1400px] h-auto md:h-[75vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 mt-8 md:mt-24 z-10 gap-12 md:gap-0">

        {/* ── SVG NETWORK LINES (Animated Path Tracing) ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line-left" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,0,128,0)" />
              <stop offset="50%" stopColor="rgba(255,0,128,0.5)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0.9)" />
            </linearGradient>
            <linearGradient id="line-right" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(139,92,246,0.9)" />
              <stop offset="50%" stopColor="rgba(0,229,255,0.5)" />
              <stop offset="100%" stopColor="rgba(0,229,255,0)" />
            </linearGradient>
          </defs>

          {/* Left Paths Connecting US Credit Groups to Tim Orb */}
          {[20, 42, 64, 86].map((yOffset, i) => (
             <motion.path
               key={`L${i}`}
               d={`M 33 ${yOffset} L 50 50`}
               stroke="url(#line-left)" strokeWidth="2.5" fill="none" vectorEffect="non-scaling-stroke"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={showHeadline ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
               transition={{ duration: 1.5, delay: showHeadline ? 0.2 + i * 0.1 : 0, ease: 'easeInOut' }}
             />
          ))}

          {/* Right Paths Connecting UK Credit Groups to Tim Orb */}
          {[35, 75].map((yOffset, i) => (
             <motion.path
               key={`R${i}`}
               d={`M 67 ${yOffset} L 50 50`}
               stroke="url(#line-right)" strokeWidth="2.5" fill="none" vectorEffect="non-scaling-stroke"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={showHeadline ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
               transition={{ duration: 1.5, delay: showHeadline ? 0.4 + i * 0.1 : 0, ease: 'easeInOut' }}
             />
          ))}
        </svg>

        {/* ── LEFT COMPONENT: US CREDIT ── */}
        <div className="flex flex-col gap-6 md:gap-8 w-full md:w-[35%] items-start relative z-20">
          <h2 className="text-white/60 font-body text-lg md:text-xl uppercase tracking-[0.2em] font-semibold pl-1 mb-2 border-b border-white/10 pb-3 inline-block">
            US Credit
          </h2>
          {US_GROUPS.map((group, i) => (
            <RoleGroup key={group} title={group} designersVisible={designersVisible} align="left" delay={i * 0.1} />
          ))}
        </div>

        {/* ── CENTER COMPONENT: TIM (Leadership Orb) ── */}
        <div className="relative md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col items-center z-30 my-8 md:my-0">
          
          <motion.div
            className="w-40 h-40 md:w-56 md:h-56 rounded-full relative p-[2px]"
            style={{
              background: 'linear-gradient(135deg, rgba(0,229,255,0.4) 0%, rgba(139,92,246,0.3) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 50px rgba(0,229,255,0.15)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={showHeadline ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0 }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-[#070b14] border-2 border-[#09091d] relative z-10">
               <img src="/Tim.png" alt="Tim Central" className="w-full h-full object-cover object-top" />
            </div>
            
            {/* Broadcast Pulse */}
            <motion.div 
              className="absolute inset-0 rounded-full border border-[#00e5ff] opacity-0 z-0 pointer-events-none"
              animate={!designersVisible ? { scale: [1, 1.3, 1.8], opacity: [0, 0.3, 0] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />
          </motion.div>

          <motion.div
             className="mt-6 flex flex-col items-center text-center max-w-[240px]"
             initial={{ opacity: 0, y: 10 }}
             animate={showHeadline ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
             transition={{ duration: 0.8, delay: showHeadline ? 0.6 : 0 }}
          >
             <span className="text-[#ff007f] font-body text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mt-2 text-center drop-shadow-md">
               Lead Designer for Optimization
             </span>
          </motion.div>
        </div>

        {/* ── RIGHT COMPONENT: UK CREDIT ── */}
        <div className="flex flex-col gap-8 md:gap-12 w-full md:w-[35%] items-end relative z-20">
          <h2 className="text-white/60 font-body text-lg md:text-xl uppercase tracking-[0.2em] font-semibold pr-1 mb-2 border-b border-white/10 pb-3 inline-block text-right">
            UK Credit
          </h2>
          {UK_GROUPS.map((group, i) => (
            <RoleGroup key={group} title={group} designersVisible={designersVisible} align="right" delay={0.4 + i * 0.15} />
          ))}
        </div>

      </div>
    </div>
  )
}

function RoleGroup({ title, designersVisible, align, delay }) {
  return (
    <motion.div 
      className={`flex flex-col gap-3 w-full ${align === 'right' ? 'items-end' : 'items-start'}`}
      initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      <h3 className="text-white/90 font-display text-sm md:text-base font-semibold tracking-wide">{title}</h3>
      {/* Removed tight flex wrappers that might have caused clamping issues on some browsers */}
      <div className={`flex flex-wrap gap-2 w-full ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        {ROLES.map((role, i) => (
           <RolePill 
             key={role.name} 
             name={role.name} 
             type={role.type} 
             visible={role.type === 'core' ? true : designersVisible} 
             delay={delay + 0.3 + (i * 0.05)}
           />
        ))}
      </div>
    </motion.div>
  )
}

function RolePill({ name, type, visible, delay }) {
  const isDesign = type === 'design'
  
  return (
    <motion.div
      className="px-3 md:px-4 py-1.5 md:py-2.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-wider uppercase leading-none backdrop-blur-md shadow-lg"
      style={{
        background: isDesign ? 'rgba(0,229,255,0.15)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${isDesign ? 'rgba(0,229,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
        color: isDesign ? '#00e5ff' : 'rgba(255,255,255,0.7)',
        transformOrigin: "center"
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={visible ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.7, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease, delay: visible ? delay : 0 }}
    >
      {name}
    </motion.div>
  )
}
