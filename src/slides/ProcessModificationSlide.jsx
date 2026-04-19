import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const EASE   = [0.22, 1, 0.36, 1]
const MORPH  = { duration: 0.88, ease: [0.4, 0, 0.2, 1] }

// ─── Part 1 constants (unchanged) ────────────────────────────────────────
const R1    = 66
const TOP_Y = 405
const BOT_Y = 620

// ─── All nodes that exist in BOTH phases ─────────────────────────────────
// p1 = Part 1 state  /  p2 = Part 2 state
const MORPH_NODES = [
  {
    id: 'brief',
    p1: { cx: 148,  cy: TOP_Y, r: R1, stroke: '#00e5ff', fill: 'rgba(0,229,255,0.08)',   lines: ['Product', 'brief'],             fs: 17 },
    p2: { cx: 148,  cy: TOP_Y, r: R1, stroke: '#4a6090', fill: 'rgba(40,60,120,0.18)',   lines: ['Requirement', 'kick-off'],       fs: 14 },
  },
  {
    id: 'discovery',
    p1: { cx: 348,  cy: TOP_Y, r: R1, stroke: '#22cdfb', fill: 'rgba(34,205,251,0.08)',  lines: ['Discovery'],                     fs: 18 },
    p2: { cx: 348,  cy: TOP_Y, r: R1, stroke: '#4a6090', fill: 'rgba(40,60,120,0.18)',   lines: ['Discovery'],                     fs: 18 },
  },
  {
    id: 'iterate',
    p1: { cx: 548,  cy: TOP_Y, r: R1, stroke: '#5f99f8', fill: 'rgba(95,153,248,0.08)',  lines: ['Iterate'],                       fs: 18 },
    p2: { cx: 548,  cy: TOP_Y, r: 84, stroke: '#00cfff', fill: 'rgba(0,207,255,0.22)',   lines: ['Iteration'],                     fs: 21 },
  },
  {
    id: 'uer',
    p1: { cx: 748,  cy: TOP_Y, r: R1, stroke: '#818cf8', fill: 'rgba(129,140,248,0.08)', lines: ['UER'],                           fs: 18 },
    p2: { cx: 748,  cy: TOP_Y, r: 78, stroke: '#00cfff', fill: 'rgba(0,207,255,0.22)',   lines: ['UER'],                           fs: 21 },
  },
  {
    id: 'leadership',
    p1: { cx: 948,  cy: TOP_Y, r: R1, stroke: '#9a6aff', fill: 'rgba(154,106,255,0.08)', lines: ['Leadership', 'review'],          fs: 17 },
    p2: { cx: 750,  cy: 238,   r: 68, stroke: '#00cfff', fill: 'rgba(0,207,255,0.18)',   lines: ['Leadership', 'review'],          fs: 17 },
  },
  {
    id: 'development',
    p1: { cx: 1148, cy: TOP_Y, r: R1, stroke: '#d51bd1', fill: 'rgba(213,27,209,0.08)',  lines: ['Development'],                   fs: 18 },
    p2: { cx: 958,  cy: TOP_Y, r: R1, stroke: '#4a6090', fill: 'rgba(40,60,120,0.18)',   lines: ['Development'],                   fs: 18 },
  },
  {
    id: 'measure',
    p1: { cx: 1348, cy: TOP_Y, r: R1, stroke: '#ff0080', fill: 'rgba(255,0,128,0.08)',   lines: ['Measure', 'results'],            fs: 17 },
    p2: { cx: 1158, cy: TOP_Y, r: R1, stroke: '#4a6090', fill: 'rgba(40,60,120,0.18)',   lines: ['Measure', 'results'],            fs: 17 },
  },
  {
    id: 'crossfunc',
    p1: { cx: 748,  cy: BOT_Y, r: R1, stroke: '#818cf8', fill: 'rgba(129,140,248,0.08)', lines: ['Cross-functional', 'team', 'collaboration'], fs: 13 },
    p2: { cx: 430,  cy: 238,   r: 72, stroke: '#00cfff', fill: 'rgba(0,207,255,0.18)',   lines: ['Crossfunctional', 'team', 'collaboration'],  fs: 15 },
  },
  {
    id: 'design',
    p1: { cx: 548,  cy: BOT_Y, r: R1, stroke: '#5f99f8', fill: 'rgba(95,153,248,0.08)',  lines: ['Design', 'review'],              fs: 17 },
    p2: { cx: 638,  cy: 598,   r: 68, stroke: '#00cfff', fill: 'rgba(0,207,255,0.18)',   lines: ['Design team', 'review'],         fs: 16 },
  },
  {
    id: 'ued',
    p1: { cx: 1148, cy: BOT_Y, r: R1, stroke: '#d51bd1', fill: 'rgba(213,27,209,0.08)',  lines: ['UED', 'support'],                fs: 17 },
    p2: { cx: 958,  cy: 598,   r: 58, stroke: '#4a6090', fill: 'rgba(40,60,120,0.18)',   lines: ['UED', 'support'],                fs: 17 },
  },
]

// ─── NiAB: Phase 1 only, fades out on morph ──────────────────────────────
const NIAB = { cx: 348, cy: BOT_Y, r: R1, stroke: '#22cdfb', fill: 'rgba(34,205,251,0.08)', lines: ['NiAB'], fs: 18 }

// ─── Phase 2 new nodes (appear after morph) ──────────────────────────────
const DK   = { stroke: 'rgba(255,255,255,0.22)', fill: 'rgba(255,255,255,0.05)' }
const P2_NODES = [
  // Left of Crossfunctional — 2 circles touching each other + CF
  { id: 'xo',    cx: 325, cy: 198, r: 40, ...DK,                                           lines: ['XO'],            fs: 16, delay: 0.38 },
  { id: 'ppui',  cx: 325, cy: 278, r: 40, stroke: '#ff4444', fill: 'rgba(220,40,40,0.18)', lines: ['PPUI+CPS'],      fs: 12, delay: 0.40 },
  // Right of Leadership Review — 3-circle fan touching each other + LR
  { id: 'hod',   cx: 828, cy: 164, r: 40, ...DK,                                           lines: ['Head of', 'design'], fs: 12, delay: 0.42 },
  { id: 'vplr',  cx: 858, cy: 238, r: 40, ...DK,                                           lines: ['VP of', 'product'],  fs: 12, delay: 0.44 },
  { id: 'dirxo', cx: 755, cy: 130, r: 40, ...DK,                                           lines: ['Director', 'of XO'], fs: 11, delay: 0.46 },
  // Product and legal reviews (main node)
  { id: 'plr',    cx: 428, cy: 592, r: 70, stroke: '#00cfff', fill: 'rgba(0,207,255,0.18)', lines: ['Product and', 'legal reviews'], fs: 15, delay: 0.25 },
  // PLR sub-cluster — 2-3-2 hex pack to the LEFT of PLR
  // col 1 (x=327): 2 circles, both touching PLR
  { id: 'vpp',   cx: 327, cy: 554, r: 38, ...DK, lines: ['VP of', 'product'], fs: 12, delay: 0.56 },
  { id: 'pi4',   cx: 327, cy: 630, r: 38, ...DK, lines: ['Pi4'],              fs: 14, delay: 0.58 },
  // col 2 (x=261): 3 circles
  { id: 'pm',    cx: 261, cy: 516, r: 38, ...DK, lines: ['PM'],               fs: 14, delay: 0.60 },
  { id: 'ppc',   cx: 261, cy: 592, r: 38, ...DK, lines: ['PPC'],              fs: 14, delay: 0.61 },
  { id: 'card',  cx: 261, cy: 668, r: 38, ...DK, lines: ['3/2 card'],         fs: 13, delay: 0.62 },
  // col 3 (x=195): 2 circles
  { id: 'pi3',   cx: 195, cy: 554, r: 38, ...DK, lines: ['Pi3'],              fs: 14, delay: 0.64 },
  { id: 'ppcuk', cx: 195, cy: 630, r: 38, ...DK, lines: ['PPC UK'],           fs: 13, delay: 0.65 },
  // Design team review sub-cluster — to the RIGHT of DTR, touching each other + DTR
  { id: 'ux',     cx: 738, cy: 558, r: 40, ...DK, lines: ['UX'],              fs: 14, delay: 0.50 },
  { id: 'content',cx: 738, cy: 638, r: 40, ...DK, lines: ['Content'],         fs: 14, delay: 0.52 },
]

// ─── Part 1 arrows ────────────────────────────────────────────────────────
const P1_ARROWS = [
  [148+R1, TOP_Y,   348-R1, TOP_Y,   false],
  [348+R1, TOP_Y,   548-R1, TOP_Y,   false],
  [548+R1, TOP_Y,   748-R1, TOP_Y,   true ],  // Iterate ↔ UER
  [748+R1, TOP_Y,   948-R1, TOP_Y,   false],
  [948+R1, TOP_Y,  1148-R1, TOP_Y,   false],
  [1148+R1, TOP_Y, 1348-R1, TOP_Y,   false],
  [548, TOP_Y+R1, 548, BOT_Y-R1,    true ],  // Iterate ↕ Design (bidir vert)
  [1148, TOP_Y+R1, 1148, BOT_Y-R1,  false],  // Development ↓ UED
  [548-R1, BOT_Y,  348+R1, BOT_Y,   false],  // Design → NiAB (left)
  [548+R1, BOT_Y,  748-R1, BOT_Y,   true ],  // Design ↔ Crossfunc
]

// ─── Part 2 arrows ────────────────────────────────────────────────────────
// Computed from circle edge positions (cx ± r in direction of travel)
const P2_ARROWS = [
  // Main row
  [214, TOP_Y,  282, TOP_Y,  false],  // Req → Discovery
  [414, TOP_Y,  464, TOP_Y,  false],  // Discovery → Iteration (R=84 → gap ends at 548-84=464)
  [632, TOP_Y,  670, TOP_Y,  true ],  // Iteration(R=84) ↔ UER(R=78)
  [826, TOP_Y,  892, TOP_Y,  false],  // UER → Development
  [1024, TOP_Y, 1092, TOP_Y, false],  // Development → Measure
  // Iteration → satellites (diagonal arrows, from Iteration edge to satellite edge)
  [500, 337,  472, 297,  false],  // → Crossfunctional (up-left)
  [503, 476,  466, 533,  false],  // → Product and legal reviews (down-left)
  [584, 481,  609, 537,  false],  // → Design team review (down-right)
  // Iteration → Leadership Review (diagonal up-right)
  [613, 351,  698, 281,  false],
  // Development → UED Support (down)
  [958, 471,  958, 540,  false],
]

// ─── Week labels ──────────────────────────────────────────────────────────
const WEEK_Y = 296
const P1_WEEKS = [
  { label: 'Week 1',   x: 148  },
  { label: 'Week 2',   x: 348  },
  { label: 'Week 3-5', x: 648  },
  { label: 'Week 6',   x: 948  },
  { label: 'Week 7-8', x: 1148 },
]
const P2_WEEKS = [
  { label: 'Week 1',   x: 148,  y: WEEK_Y },
  { label: 'Week 8',   x: 1058, y: WEEK_Y },
  { label: 'Week 2-7', x: 428,  y: 872    },  // below PLR cluster
]

// ─── Helpers ──────────────────────────────────────────────────────────────
function NodeText({ lines, cx, cy, fs }) {
  const lh = fs * 1.38
  const totalH = (lines.length - 1) * lh
  return lines.map((txt, i) => (
    <text key={i} x={cx} y={cy - totalH / 2 + i * lh}
      textAnchor="middle" dominantBaseline="central"
      fontSize={fs} fontFamily="Inter, sans-serif"
      fontWeight="400" fill="rgba(255,255,255,0.88)"
    >{txt}</text>
  ))
}

function Arrow({ x1, y1, x2, y2, bidir }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="url(#lineGrad)" strokeWidth="1.6"
      markerEnd="url(#ah)"
      markerStart={bidir ? 'url(#ah)' : undefined}
    />
  )
}

// ─── Slide ────────────────────────────────────────────────────────────────
export default function ProcessModificationSlide() {
  const [phase, setPhase] = useState(0)

  // Auto-advance to Part 2 after 4 s
  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 4000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full h-full" style={{ position: 'relative', background: '#0a0514' }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(139,92,246,0.10) 0%, transparent 70%)' }}
      />

      <svg viewBox="0 0 1600 900"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1600" y2="0">
            <stop offset="0%"   stopColor="rgba(0,229,255,0.75)" />
            <stop offset="50%"  stopColor="rgba(139,92,246,0.85)" />
            <stop offset="100%" stopColor="rgba(255,0,128,0.75)" />
          </linearGradient>
          <marker id="ah" viewBox="0 0 10 10" refX="10" refY="5"
            markerWidth="7" markerHeight="7"
            orient="auto-start-reverse" markerUnits="userSpaceOnUse"
          >
            <path d="M 0 1 L 10 5 L 0 9 Z" fill="rgba(255,255,255,0.55)" />
          </marker>
        </defs>

        {/* ── Centering group: shifts everything (except title) to center Phase 2 ── */}
        <motion.g
          animate={{ x: phase === 1 ? 110 : 52, y: phase === 1 ? 35 : -63 }}
          transition={MORPH}
        >

        {/* ── Week labels P1 ── */}
        <motion.g animate={{ opacity: phase === 0 ? 1 : 0 }}
          transition={{ duration: 0.4 }}>
          {P1_WEEKS.map(w => (
            <text key={w.label} x={w.x} y={WEEK_Y} textAnchor="middle"
              fontSize="19" fill="rgba(255,255,255,0.28)"
              fontFamily="Inter, sans-serif" fontWeight="500">{w.label}</text>
          ))}
        </motion.g>

        {/* ── Week labels P2 ── */}
        <motion.g
          animate={{ opacity: phase === 1 ? 1 : 0 }}
          transition={{ duration: 0.5, delay: phase === 1 ? 0.5 : 0 }}>
          {P2_WEEKS.map(w => (
            <text key={w.label} x={w.x} y={w.y} textAnchor="middle"
              fontSize="19" fill="rgba(255,255,255,0.28)"
              fontFamily="Inter, sans-serif" fontWeight="500">{w.label}</text>
          ))}
        </motion.g>

        {/* ── Part 1 arrows (fade out on morph) ── */}
        <motion.g animate={{ opacity: phase === 0 ? 1 : 0 }} transition={{ duration: 0.35 }}>
          {P1_ARROWS.map(([x1, y1, x2, y2, bidir], i) => (
            <Arrow key={i} x1={x1} y1={y1} x2={x2} y2={y2} bidir={bidir} />
          ))}
        </motion.g>

        {/* ── Part 2 arrows (fade in after morph starts) ── */}
        <motion.g
          animate={{ opacity: phase === 1 ? 1 : 0 }}
          transition={{ duration: 0.6, delay: phase === 1 ? 0.35 : 0 }}>
          {P2_ARROWS.map(([x1, y1, x2, y2, bidir], i) => (
            <Arrow key={i} x1={x1} y1={y1} x2={x2} y2={y2} bidir={bidir} />
          ))}
        </motion.g>

        {/* ── NiAB – Phase 1 only, scales out on morph ── */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: phase === 0 ? 1 : 0,
            scale: phase === 0 ? 1 : 0.6,
          }}
          transition={{
            opacity: { delay: phase === 0 ? 0.52 : 0, duration: phase === 0 ? 0.45 : 0.3 },
            scale:   { delay: phase === 0 ? 0.52 : 0, duration: phase === 0 ? 0.45 : 0.3 },
          }}
          style={{ transformOrigin: `${NIAB.cx}px ${NIAB.cy}px` }}
        >
          <circle cx={NIAB.cx} cy={NIAB.cy} r={NIAB.r}
            fill={NIAB.fill} stroke={NIAB.stroke} strokeWidth="1.2" />
          <circle cx={NIAB.cx} cy={NIAB.cy} r={NIAB.r}
            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <NodeText lines={NIAB.lines} cx={NIAB.cx} cy={NIAB.cy} fs={NIAB.fs} />
        </motion.g>

        {/* ── Persistent nodes – morph position + color between phases ── */}
        {MORPH_NODES.map((node, i) => {
          const s = phase === 0 ? node.p1 : node.p2
          return (
            <motion.g key={node.id}
              initial={{ x: node.p1.cx, y: node.p1.cy }}
              animate={{ x: s.cx, y: s.cy }}
              transition={MORPH}
            >
              {/* Entry animation wrapper (runs once on mount) */}
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.25 + i * 0.07, ease: EASE }}
                style={{ transformOrigin: '0 0' }}
              >
                {/* Circle – animates size & color on morph */}
                <motion.circle cx={0} cy={0}
                  animate={{ r: s.r, fill: s.fill, stroke: s.stroke }}
                  transition={MORPH}
                  strokeWidth="1.2"
                />
                {/* Subtle inner ring */}
                <circle cx={0} cy={0} r={R1 - 8}
                  fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                {/* Text – cross-fades when label changes */}
                <motion.g key={`${node.id}-${phase}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.08 }}
                >
                  <NodeText lines={s.lines} cx={0} cy={0} fs={s.fs} />
                </motion.g>
              </motion.g>
            </motion.g>
          )
        })}

        {/* ── Phase 2 only nodes ── */}
        {P2_NODES.map(n => (
          <motion.g key={n.id}
            style={{ x: n.cx, y: n.cy }}
            animate={{
              opacity: phase === 1 ? 1 : 0,
              scale:   phase === 1 ? 1 : 0.55,
            }}
            initial={{ opacity: 0, scale: 0.55 }}
            transition={{
              opacity: { duration: 0.4, delay: phase === 1 ? n.delay : 0 },
              scale:   { duration: 0.4, delay: phase === 1 ? n.delay : 0, ease: EASE },
            }}
          >
            <circle cx={0} cy={0} r={n.r} fill={n.fill} stroke={n.stroke} strokeWidth="1.2" />
            <NodeText lines={n.lines} cx={0} cy={0} fs={n.fs} />
          </motion.g>
        ))}

        </motion.g>{/* end centering group */}

        {/* ── Title – always on top, always white ── */}
        <text x="72" y="147" fontFamily='"PT Serif Caption", serif' fontSize="62"
          fill="rgba(255,255,255,1)" fontWeight="400">Process modification</text>

      </svg>
    </div>
  )
}
