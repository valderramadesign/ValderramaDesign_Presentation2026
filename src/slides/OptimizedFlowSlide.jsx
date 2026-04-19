import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const EASE = [0.22, 1, 0.36, 1]

const T_BAR_IN  = 1000
const T_EXPAND  = 4450
const T_ONESTEP = 5450
const T_BAR2_IN = 6500  // ~350ms after 1StepFlow fully visible

const EXPAND_DURATION = 0.9

export default function OptimizedFlowSlide() {
  const [phase, setPhase] = useState(0)
  const [flowHeight, setFlowHeight] = useState(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), T_BAR_IN)
    const t2 = setTimeout(() => setPhase(2), T_EXPAND)
    const t3 = setTimeout(() => setPhase(3), T_ONESTEP)
    const t4 = setTimeout(() => setPhase(4), T_BAR2_IN)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">

      {/* 3StepFlow — slides in from right */}
      <motion.img
        ref={imgRef}
        src="/3StepFlow.png"
        alt="3-step flow"
        initial={{ x: '120%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.85, ease: EASE }}
        onLoad={() => setFlowHeight(imgRef.current?.offsetHeight ?? null)}
        style={{
          maxWidth: '90%',
          maxHeight: '85%',
          objectFit: 'contain',
          display: 'block',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* ── Top panel: grows upward from center ── */}
      <motion.div
        animate={{
          opacity: phase >= 1 ? 1 : 0,
          height: phase >= 2 ? '50%' : '31px',
        }}
        transition={{
          opacity: { duration: 0.45, ease: 'easeOut' },
          height: { duration: EXPAND_DURATION, ease: EASE },
        }}
        style={{
          position: 'absolute',
          bottom: '50%',
          left: 0,
          right: 0,
          backgroundColor: '#000000',
          zIndex: 2,
          opacity: 0,
        }}
      >
        <motion.div
          animate={{ opacity: phase >= 2 ? 0 : 1 }}
          transition={{ duration: EXPAND_DURATION, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(to right, #ff0080, #00e5ff)',
          }}
        />
      </motion.div>

      {/* ── Bottom panel: grows downward from center ── */}
      <motion.div
        animate={{
          opacity: phase >= 1 ? 1 : 0,
          height: phase >= 2 ? '50%' : '31px',
        }}
        transition={{
          opacity: { duration: 0.45, ease: 'easeOut' },
          height: { duration: EXPAND_DURATION, ease: EASE },
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          backgroundColor: '#000000',
          zIndex: 2,
          opacity: 0,
        }}
      >
        <motion.div
          animate={{ opacity: phase >= 2 ? 0 : 1 }}
          transition={{ duration: EXPAND_DURATION, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(to right, #00e5a0, #8b5cf6)',
          }}
        />
      </motion.div>

      {/* ── Text — fades in with bar, fades out on expand ── */}
      <motion.h2
        animate={{ opacity: phase === 1 ? 1 : 0 }}
        transition={{ duration: phase >= 2 ? 0.25 : 0.45, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          zIndex: 3,
          fontFamily: 'Inter, sans-serif',
          color: '#ff0080',
          fontWeight: 400,
          margin: 0,
          fontSize: '28px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        3 STEP APPLICATION
      </motion.h2>

      {/* ── 1StepFlow — fades in at center, same height as 3StepFlow ── */}
      {phase >= 3 && (
        <motion.img
          src="/1StepFlow.png"
          alt="1-step flow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            height: flowHeight ? `${flowHeight}px` : '85%',
            maxWidth: '90%',
            objectFit: 'contain',
            zIndex: 4,
          }}
        />
      )}

      {/* ── Phase 4 bar — "1 STEP APPLICATION" in green ── */}
      {phase >= 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            height: '62px',
            backgroundColor: '#000000',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Top gradient line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(to right, #ff0080, #00e5ff)',
          }} />

          {/* Bottom gradient line */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(to right, #00e5a0, #8b5cf6)',
          }} />

          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#00e5ff',
              fontWeight: 400,
              margin: 0,
              fontSize: '28px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            1 STEP APPLICATION
          </h2>
        </motion.div>
      )}

    </div>
  )
}
