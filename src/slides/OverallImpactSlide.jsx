import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'

function useCountUp(target, delaySeconds = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (target === 0) { setValue(0); return }
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

const EASE = [0.22, 1, 0.36, 1]

const data = [
  { name: "Q1 '22", value: 18 },
  { name: "Q2 '22", value: 34 },
  { name: "Q3 '22", value: 52 },
  { name: "Q4 '22", value: 71 },
  { name: "Q1 '23", value: 95 },
  { name: "Q2 '23", value: 118 },
  { name: "Q3 '23", value: 148 },
  { name: "Q4 '23", value: 184 },
]

// US cards: count-up starts ~0.9s (after cards fade in at ~0.89s)
const US_CARDS = [
  { product: 'Pay in 4',          label: 'TPV', image: '/PayIn4-card-art.png',     countTarget: 71,  countFormat: v => `$${(v / 10).toFixed(1)}B`, countDelay: 0.9 },
  { product: 'Pay Monthly',       label: 'REV', image: '/PayMonthly-card-art.png', countTarget: 167, countFormat: v => `$${v}M`,                    countDelay: 0.9 },
  { product: 'PayPal Credit',     label: 'REV', image: '/PPC-card-art.png',        countTarget: 315, countFormat: v => `$${v}M`,                    countDelay: 0.9 },
  { product: 'PayPal Mastercard', label: 'REV', image: '/Mastercard-card-art.png', countTarget: 233, countFormat: v => `$${v}M`,                    countDelay: 0.9 },
]

// UK cards: count-up starts ~1.0s (after UK section fades in at ~0.98s)
const UK_CARDS = [
  { product: 'Pay in 3',      label: 'TPV', image: '/PayIn3-Card-Art.png', countTarget: 132, countFormat: v => `$${(v / 100).toFixed(2)}B`, countDelay: 1.0 },
  { product: 'PayPal Credit', label: 'REV', image: '/PPC-card-art.png',    countTarget: 68,  countFormat: v => `$${v}M`,                    countDelay: 1.0 },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

function SectionLabel({ title }) {
  return (
    <p style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.35)',
      marginBottom: '8px',
    }}>
      {title}
    </p>
  )
}

function Card({ product, label, accent, flex, image, countTarget, countFormat, countDelay }) {
  const count = useCountUp(countTarget, countDelay)
  const displayMetric = countFormat(count)

  return (
    <div style={{
      flex,
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: '14px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    }}>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        fontWeight: 500,
        color: 'rgba(255,255,255,0.45)',
        letterSpacing: '0.04em',
        margin: 0,
      }}>
        {product}
      </p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{
          fontFamily: '"PT Serif Caption", serif',
          fontSize: '26px',
          fontWeight: 700,
          color: accent,
          margin: 0,
          lineHeight: 1,
        }}>
          {displayMetric}
        </p>
        {image && (
          <img
            src={image}
            alt={product}
            style={{ height: '26px', width: 'auto', objectFit: 'contain', marginLeft: '8px' }}
          />
        )}
      </div>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.25)',
        margin: 0,
      }}>
        {label}
      </p>
    </div>
  )
}

export default function OverallImpactSlide({ accent = '#00e5ff' }) {
  // Phase 2 triggers after all card counts finish (~2.6s), with a small buffer
  const [phase2, setPhase2] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setPhase2(true), 2800)
    return () => clearTimeout(t)
  }, [])

  // Revenue only counts once phase 2 is active
  const revenue = useCountUp(phase2 ? 784 : 0, 0)

  return (
    <div className="w-full h-full flex items-center justify-center px-16 pb-12 pt-20">
      <motion.div
        className="w-full max-w-5xl flex flex-col"
        style={{ gap: '18px' }}
        variants={container}
        initial="hidden"
        animate="show"
      >

        {/* Headline */}
        <motion.div variants={item} style={{ position: 'relative', top: '-32px' }}>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
            Overall Impact
          </h1>
        </motion.div>

        {/* US CREDIT */}
        <motion.div variants={item} style={{ marginBottom: '32px' }}>
          <SectionLabel title="US Credit" />
          <div style={{ display: 'flex', gap: '12px' }}>
            {US_CARDS.map((c) => (
              <Card key={c.product} {...c} accent={accent} flex={1} />
            ))}
          </div>
        </motion.div>

        {/* UK CREDIT */}
        <motion.div variants={item}>
          <SectionLabel title="UK Credit" />
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {UK_CARDS.map((c) => (
              <Card key={c.product} {...c} accent={accent} flex="0 0 calc(25% - 6px)" />
            ))}

            {/* Revenue counter — appears in phase 2, right-aligned */}
            <div style={{
              flex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '5px',
              paddingRight: '4px',
              alignSelf: 'stretch',
            }}>
              {phase2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}
                >
                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'Inter, sans-serif',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                  }}>
                    Total Revenue
                  </span>
                  <div style={{
                    fontFamily: '"PT Serif Caption", serif',
                    fontSize: '68px',
                    color: '#ffffff',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    textShadow: `0 0 55px rgba(0,229,255,0.6), 0 0 110px rgba(0,229,255,0.22)`,
                  }}>
                    ${revenue}M/yr
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Chart space always reserved — prevents layout shift when chart mounts */}
        <div style={{ width: '100%', height: '155px', marginTop: '120px' }}>
          {phase2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{ width: '100%', height: '100%' }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="impactGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={accent} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(10,15,30,0.9)',
                      border: `1px solid ${accent}40`,
                      borderRadius: '8px',
                      color: '#fff',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                    }}
                    itemStyle={{ color: accent }}
                    cursor={{ stroke: `${accent}40`, strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={accent}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#impactGradient)"
                    dot={false}
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={1200}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>

      </motion.div>
    </div>
  )
}
