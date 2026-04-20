import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const EASE = [0.22, 1, 0.36, 1]
const TYPING_SPEED_MS = 36  // ms per character

const LINE1 = '// Good design reduces friction.'
const LINE2 = '// Great design builds confidence.'
const FULL_TEXT = LINE1 + '\n' + LINE2

export default function ThankYouSlide() {
  const [blackout, setBlackout]   = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [cursorOn, setCursorOn]   = useState(true)
  const [isDone, setIsDone]       = useState(false)

  // Typewriter
  useEffect(() => {
    let i = 0
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setCharCount(i)
        if (i >= FULL_TEXT.length) {
          clearInterval(interval)
          setIsDone(true)
        }
      }, TYPING_SPEED_MS)
      return () => clearInterval(interval)
    }, 450)
    return () => clearTimeout(start)
  }, [])

  // Blackout: 6s after typing finishes
  useEffect(() => {
    if (!isDone) return
    const t = setTimeout(() => setBlackout(true), 6000)
    return () => clearTimeout(t)
  }, [isDone])

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(interval)
  }, [])

  const typed = FULL_TEXT.slice(0, charCount)
  const lines  = typed.split('\n')

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ position: 'relative' }}>

      {/* Pulsing green glow */}
      <motion.div
        animate={{ opacity: [0.28, 0.55, 0.28], scale: [1, 1.12, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '55%',
          aspectRatio: '2 / 1',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0,230,118,0.55) 0%, rgba(0,200,100,0.18) 50%, transparent 75%)',
          filter: 'blur(48px)',
          pointerEvents: 'none',
        }}
      />

      {/* Code editor panel — 50% larger */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        style={{
          position: 'relative',
          width: '930px',
          maxWidth: '84%',
          background: '#1e1e1e',
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 28px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,230,118,0.06)',
        }}
      >
        {/* Title bar */}
        <div style={{
          background: '#2d2d2d',
          padding: '15px 21px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#28c840' }} />
          <span style={{
            flex: 1, textAlign: 'center',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            color: 'rgba(255,255,255,0.3)',
            marginRight: '50px',
            letterSpacing: '0.02em',
          }}>
            philosophy.js
          </span>
        </div>

        {/* Code body */}
        <div style={{ padding: '33px 36px 39px', display: 'flex', gap: '26px' }}>

          {/* Line numbers */}
          <div style={{ display: 'flex', flexDirection: 'column', userSelect: 'none', minWidth: '18px' }}>
            {[1, 2].map(n => (
              <span key={n} style={{
                fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
                fontSize: '21px',
                lineHeight: '1.85',
                color: 'rgba(255,255,255,0.18)',
                textAlign: 'right',
                display: 'block',
              }}>{n}</span>
            ))}
          </div>

          {/* Code lines */}
          <div style={{ flex: 1 }}>
            {lines.map((line, lineIdx) => {
              const isLast = lineIdx === lines.length - 1
              return (
                <div
                  key={lineIdx}
                  style={{
                    fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
                    fontSize: '21px',
                    lineHeight: '1.85',
                    color: '#6a9955',
                    whiteSpace: 'pre',
                  }}
                >
                  {line.startsWith('//') ? (
                    <>
                      <span style={{ color: 'rgba(106,153,85,0.55)' }}>//</span>
                      <span>{line.slice(2)}</span>
                    </>
                  ) : line}

                  {isLast && (
                    <span style={{
                      display: 'inline-block',
                      width: '3px',
                      height: '0.95em',
                      background: cursorOn ? 'rgba(174,175,173,0.85)' : 'transparent',
                      verticalAlign: 'text-bottom',
                      marginLeft: '1px',
                      borderRadius: '1px',
                    }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

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
