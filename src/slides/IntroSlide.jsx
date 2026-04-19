import { motion } from 'framer-motion'

// ---------------------------------------------------------------------------
// Timeline — each node has explicit above/below content types:
//   'logo'       = company logo only (node 0)
//   'logo+text'  = logo + year + role together (node 5)
//   'text'       = year + role only
//   null         = nothing on that side
// ---------------------------------------------------------------------------
const TIMELINE = [
  { year: '2016–2018', role: 'Working Capital',      above: 'logo',      below: 'text', logo: 'paypal' },
  { year: '2018–2019', role: 'PayPal Credit',         above: 'text',      below: null,   logo: null     },
  { year: '2019–2021', role: 'Global Pay Later',      above: null,        below: 'text', logo: null     },
  { year: '2021–2022', role: 'Upstream Presentment',  above: 'text',      below: null,   logo: null     },
  { year: '2022–2024', role: 'Optimization',          above: null,        below: 'text', logo: null     },
  { year: '2024–2025', role: 'Meta Fintech',          above: 'text',      below: 'logo', logo: 'meta'   },
]

const NODE_COLORS = ['#00e5ff', '#3db8ef', '#818cf8', '#8b5cf6', '#b040cc', '#ff0080']

// 84% span — 8% inset each edge gives comfortable label room
const NODE_SPAN   = 0.84
const NODE_OFFSET = (1 - NODE_SPAN) / 2

const LINE_DELAY    = 0.55
const LINE_DURATION = 1.7
const NODE_STAGGER  = 0.2
const LAST_NODE_DELAY = LINE_DELAY + 0.14 + (TIMELINE.length - 1) * NODE_STAGGER

// ---------------------------------------------------------------------------

export default function IntroSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 md:px-16 gap-5 pb-8">

      {/* ── Headline + role ──────────────────────────────────────── */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-white leading-[0.9] tracking-tight text-[3.25rem] md:text-[4.25rem] lg:text-[5rem]"
        >
          Timothy<br />Valderrama
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.48 }}
          className="flex items-center gap-3 mt-4"
        >
          <div className="h-px w-5 rounded-full bg-[#00e5ff]" />
          <span className="text-[10px] tracking-[0.25em] uppercase font-body text-white/35">
            Agentic front-end developer + Lead UX designer
          </span>
        </motion.div>
      </div>

      {/* ── Timeline ─────────────────────────────────────────────── */}
      <div>
        {/* Flex row: track ──── dots */}
        <div className="flex items-center gap-3">

          {/* ── Track ── */}
          <div className="relative flex-1" style={{ height: '140px', overflow: 'visible' }}>

            {/* Gradient line — fades to transparent at right edge */}
            <div
              className="absolute left-0 right-0"
              style={{ top: '50%', transform: 'translateY(-50%)', height: '1.5px' }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: LINE_DELAY, duration: LINE_DURATION, ease: [0.4, 0, 0.2, 1] }}
                className="w-full h-full rounded-full origin-left"
                style={{
                  background:
                    'linear-gradient(to right, #00e5ff 0%, #8b5cf6 55%, #ff0080 88%, rgba(255,0,128,0) 100%)',
                }}
              />
            </div>

            {/* Nodes */}
            {TIMELINE.map((item, i) => {
              const pct       = (NODE_OFFSET + (i / (TIMELINE.length - 1)) * NODE_SPAN) * 100
              const nodeDelay = LINE_DELAY + 0.14 + i * NODE_STAGGER
              const lblDelay  = nodeDelay + 0.1
              const color     = NODE_COLORS[i]

              return (
                <div
                  key={i}
                  className="absolute"
                  style={{ left: `${pct}%`, top: '50%', width: 0 }}
                >

                  {/* ── ABOVE the line ── */}
                  {item.above && (
                    <motion.div
                      className="absolute text-center"
                      style={{ width: '82px', left: '-41px', bottom: '18px' }}
                      initial={{ opacity: 0, y: 7 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: lblDelay, duration: 0.4, ease: 'easeOut' }}
                    >
                      {/* Logo row — only when above type explicitly includes a logo */}
                      {(item.above === 'logo' || item.above === 'logo+text') && item.logo && (
                        <div className="flex justify-center mb-[4px]">
                          <img
                            src={item.logo === 'paypal' ? '/PayPal_Logo.png' : '/Meta_Logo.png'}
                            alt={item.logo === 'paypal' ? 'PayPal' : 'Meta'}
                            style={{
                              height: '12px',
                              objectFit: 'contain',
                              filter: 'brightness(0) invert(1)',
                              opacity: 0.65,
                            }}
                          />
                        </div>
                      )}

                      {/* Text (all 'text' and 'logo+text' nodes) */}
                      {(item.above === 'text' || item.above === 'logo+text') && (
                        <>
                          <p
                            className="font-body font-semibold tracking-wider leading-none"
                            style={{ fontSize: '9px', color }}
                          >
                            {item.year}
                          </p>
                          <p
                            className="font-body text-white/55 leading-tight mt-[3px]"
                            style={{ fontSize: '10.5px' }}
                          >
                            {item.role}
                          </p>
                        </>
                      )}

                      {/* Stem — points down toward node */}
                      <motion.div
                        className="mx-auto mt-[5px] rounded-full origin-bottom"
                        style={{ width: '1px', height: '8px', backgroundColor: `${color}50` }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: lblDelay + 0.05, duration: 0.18 }}
                      />
                    </motion.div>
                  )}

                  {/* ── Node dot ── */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: '9px',
                      height: '9px',
                      left: '-4.5px',
                      top: '-4.5px',
                      backgroundColor: color,
                      boxShadow: `0 0 10px ${color}70, 0 0 4px ${color}55`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: nodeDelay, duration: 0.36, ease: [0.34, 1.56, 0.64, 1] }}
                  />

                  {/* ── BELOW the line ── */}
                  {item.below === 'logo' && (
                    <motion.div
                      className="absolute flex flex-col items-center"
                      style={{ left: '-41px', top: '18px', width: '82px' }}
                      initial={{ opacity: 0, y: -7 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: lblDelay, duration: 0.4, ease: 'easeOut' }}
                    >
                      {/* Stem — points up toward node */}
                      <motion.div
                        className="rounded-full origin-top"
                        style={{ width: '1px', height: '8px', backgroundColor: `${color}50`, marginBottom: '5px' }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: lblDelay + 0.05, duration: 0.18 }}
                      />
                      <img
                        src="/Meta_Logo.png"
                        alt="Meta"
                        style={{
                          height: '12px',
                          objectFit: 'contain',
                          filter: 'brightness(0) invert(1)',
                          opacity: 0.65,
                        }}
                      />
                    </motion.div>
                  )}

                  {item.below === 'text' && (
                    <motion.div
                      className="absolute text-center"
                      style={{ width: '82px', left: '-41px', top: '18px' }}
                      initial={{ opacity: 0, y: -7 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: lblDelay, duration: 0.4, ease: 'easeOut' }}
                    >
                      {/* Stem — points up toward node */}
                      <motion.div
                        className="mx-auto mb-[5px] rounded-full origin-top"
                        style={{ width: '1px', height: '8px', backgroundColor: `${color}50` }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: lblDelay + 0.05, duration: 0.18 }}
                      />
                      <p
                        className="font-body font-semibold tracking-wider leading-none"
                        style={{ fontSize: '9px', color }}
                      >
                        {item.year}
                      </p>
                      <p
                        className="font-body text-white/55 leading-tight mt-[3px]"
                        style={{ fontSize: '10.5px' }}
                      >
                        {item.role}
                      </p>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ── Three continuation dots ── */}
          <div className="flex items-center gap-[5px] flex-shrink-0">
            {[0, 1, 2].map((_, j) => (
              <motion.div
                key={j}
                className="rounded-full"
                style={{ width: '3px', height: '3px', backgroundColor: 'rgba(255,255,255,0.22)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: LAST_NODE_DELAY + 0.25 + j * 0.1,
                  duration: 0.25,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
