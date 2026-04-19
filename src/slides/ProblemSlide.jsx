import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export default function ProblemSlide({ accent = '#ff0080' }) {
  return (
    <div className="w-full h-full" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* ── Background image — full bleed, woman on the right ── */}
      <motion.img
        src="/WomanShopping.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '65% center',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.18, ease: EASE }}
      />

      {/* ── Gradient scrim — dark left, fades right so text stays readable ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg, rgba(15,10,24,0.97) 0%, rgba(15,10,24,0.82) 38%, rgba(15,10,24,0.42) 62%, rgba(15,10,24,0.08) 80%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Bottom fade — grounds the image ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0, height: '28%',
          background: 'linear-gradient(to top, rgba(15,10,24,0.85) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Headline ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, bottom: '8%', left: '7%', right: '7%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: '68%' }}>
          {/* Eyebrow */}
          <motion.span
            style={{
              display: 'block',
              fontSize: '10px',
              fontFamily: 'Inter, sans-serif',
              color: accent,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '18px',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.55, ease: EASE }}
          >
            The challenge
          </motion.span>

          {/* Main headline */}
          <motion.h2
            style={{
              fontFamily: '"PT Serif Caption", serif',
              fontSize: 'clamp(2rem, 4vw, 3.8rem)',
              color: '#ffffff',
              lineHeight: 1.12,
              letterSpacing: '-0.01em',
              textShadow:
                '0 2px 48px rgba(0,0,0,0.85), 0 1px 10px rgba(0,0,0,0.95)',
              margin: 0,
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.7, ease: EASE }}
          >
            How might we simplify loan applications to be more frictionless in checkout?
          </motion.h2>

          {/* Accent rule */}
          <motion.div
            style={{
              marginTop: '28px',
              height: '2px',
              width: '36px',
              borderRadius: '2px',
              background: accent,
              boxShadow: `0 0 10px ${accent}`,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 1.35, ease: EASE }}
          />
        </div>
      </div>

    </div>
  )
}
