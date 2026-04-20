import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const EASE = [0.22, 1, 0.36, 1]
const FADE_TO_BLACK_DELAY = 5000  // ms before black overlay fades in

export default function ThankYouSlide() {
  const [blackout, setBlackout] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setBlackout(true), FADE_TO_BLACK_DELAY)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ position: 'relative' }}>

      {/* Quote */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        style={{
          fontFamily: '"PT Serif Caption", serif',
          fontSize: 'clamp(1.4rem, 3vw, 2.6rem)',
          fontWeight: 400,
          color: '#ffffff',
          textAlign: 'center',
          maxWidth: '62%',
          lineHeight: 1.45,
          letterSpacing: '-0.01em',
          margin: 0,
        }}
      >
        Good design reduces friction.
        <br />
        Great design builds confidence.
      </motion.h2>

      {/* Black fade overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: blackout ? 1 : 0 }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          pointerEvents: 'none',
        }}
      />

    </div>
  )
}
