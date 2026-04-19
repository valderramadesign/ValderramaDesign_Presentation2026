import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1]

// ─── Count-up hook ────────────────────────────────────────────────────────
function useCountUp(target, delaySeconds = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const DURATION = 1600
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / DURATION, 1)
        const eased = 1 - Math.pow(1 - p, 4)
        setValue(Math.round(eased * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delaySeconds * 1000)
    return () => clearTimeout(timeout)
  }, [target, delaySeconds])
  return value
}

// ─── Glass tube bar ───────────────────────────────────────────────────────
// Two segments inside a glass shell:
//   baseline (2023)  — frosted white glass, left-capped
//   growth   (delta) — coloured liquid glass, right-capped, glowing
// Percentages are printed inside each segment; year labels sit below.
function MetricBar({ label, from, to, color, note, baseDelay }) {
  const delta = to - from

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* Label — tight to the tube */}
      <motion.span
        style={{
          fontSize: '10px', fontFamily: 'Inter, sans-serif',
          color: 'rgba(255,255,255,0.38)', letterSpacing: '0.14em',
          textTransform: 'uppercase', fontWeight: 500,
          marginBottom: '7px',
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: baseDelay, duration: 0.35 }}
      >
        {label}
      </motion.span>

      {/* Glass tube shell */}
      <div
        style={{
          position: 'relative', height: '52px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.11)',
          borderRadius: '14px',
          boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
          overflow: 'hidden',
        }}
      >
        {/* ── Baseline segment (frosted white glass) ── */}
        <motion.div
          style={{
            position: 'absolute', left: 0, top: '4px', bottom: '4px',
            borderRadius: '10px 0 0 10px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.13) 55%, rgba(255,255,255,0.09) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${from}%` }}
          transition={{ delay: baseDelay + 0.18, duration: 0.95, ease: EASE }}
        >
          {/* Surface shine */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 50%)',
            pointerEvents: 'none',
          }} />
          {/* Value */}
          <motion.span
            style={{
              position: 'relative', zIndex: 1,
              fontSize: '11px', fontWeight: 700, fontFamily: 'Inter, sans-serif',
              color: 'rgba(255,255,255,0.65)',
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: baseDelay + 0.85, duration: 0.3 }}
          >
            {from}%
          </motion.span>
        </motion.div>

        {/* ── Growth segment (coloured liquid glass) ── */}
        <motion.div
          style={{
            position: 'absolute',
            left: `${from}%`, top: '4px', bottom: '4px',
            borderRadius: '0 10px 10px 0',
            background: `linear-gradient(180deg, ${color}ee 0%, ${color}ff 30%, ${color}ff 65%, ${color}99 100%)`,
            boxShadow: `0 0 22px ${color}65, 0 0 7px ${color}50`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${delta}%` }}
          transition={{ delay: baseDelay + 0.76, duration: 0.82, ease: EASE }}
        >
          {/* Surface shine — stronger on coloured glass */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 45%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          {/* Value */}
          <motion.span
            style={{
              position: 'relative', zIndex: 1,
              fontSize: '11px', fontWeight: 700, fontFamily: 'Inter, sans-serif',
              color: '#fff',
              textShadow: `0 0 8px ${color}`,
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: baseDelay + 1.2, duration: 0.3 }}
          >
            {to}%
          </motion.span>
        </motion.div>

        {/* Outer tube glass surface highlight — sits above everything */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '42%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 5, borderRadius: '14px 14px 0 0',
        }} />
      </div>


      {/* Year labels + note */}
      <motion.div
        style={{
          position: 'relative',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '6px',
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: baseDelay + 0.22, duration: 0.35 }}
      >
        <span style={{ fontSize: '9px', fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          2023
        </span>
        {note && (
          <motion.span
            style={{
              position: 'absolute', left: `${to}%`, transform: 'translateX(-50%)',
              fontSize: '10px', fontFamily: 'Inter, sans-serif',
              color, fontWeight: 600, letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: baseDelay + 1.55, duration: 0.4 }}
          >
            {note}
          </motion.span>
        )}
        <span style={{ fontSize: '9px', fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          H1 2024
        </span>
      </motion.div>
    </div>
  )
}

// ─── ImpactSlide ──────────────────────────────────────────────────────────
export default function ImpactSlide({ accent = '#26c6da' }) {
  const revenue = useCountUp(784, 1.35)

  return (
    <div
      className="w-full h-full flex items-center"
      style={{ position: 'relative', paddingLeft: '7%', paddingRight: '7%', paddingTop: '10%', paddingBottom: '10%', gap: 0 }}
    >

      {/* ── LEFT: Glass tube bars ── */}
      <div style={{ flex: '0 0 56%', display: 'flex', flexDirection: 'column', gap: '32px', paddingRight: '6%' }}>
        <MetricBar
          label="Credit product utilization"
          from={38} to={47}
          color="#00e5ff"
          note={null}
          baseDelay={0.25}
        />
        <MetricBar
          label="Credit product conversion"
          from={51} to={79}
          color="#ff0080"
          note="↑ 27 pts"
          baseDelay={0.5}
        />
      </div>

      {/* ── Vertical rule ── */}
      <motion.div
        style={{
          position: 'absolute',
          left: '58%',
          top: '22%',
          bottom: '22%',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 75%, transparent)',
        }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ delay: 0.9, duration: 0.65, ease: EASE }}
      />

      {/* ── RIGHT: Revenue hero ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: '6%', gap: '14px' }}>
        <motion.span
          style={{ fontSize: '10px', fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em', textTransform: 'uppercase' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
        >
          Annual revenue impact
        </motion.span>

        <motion.div
          style={{
            fontFamily: '"PT Serif Caption", serif',
            fontSize: 'clamp(3.2rem, 6.8vw, 6.2rem)',
            color: '#ffffff', lineHeight: 1, letterSpacing: '-0.02em',
            textShadow: '0 0 55px rgba(0,229,255,0.6), 0 0 110px rgba(0,229,255,0.22)',
          }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.75, ease: EASE }}
        >
          ${revenue}M
        </motion.div>

        <motion.div
          style={{ width: '30px', height: '2px', borderRadius: '2px', background: accent, boxShadow: `0 0 10px ${accent}` }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 1.9, duration: 0.4 }}
        />
      </div>

    </div>
  )
}
