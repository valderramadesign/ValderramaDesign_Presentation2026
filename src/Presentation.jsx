import { useState, useEffect, useCallback, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import IntroSlide from './slides/IntroSlide.jsx'
import AgendaSlide from './slides/AgendaSlide.jsx'
import ImpactSlide from './slides/ImpactSlide.jsx'
import ProblemSlide from './slides/ProblemSlide.jsx'
import RelevanceSlide from './slides/RelevanceSlide.jsx'
import CentralizedDesignSlide from './slides/CentralizedDesignSlide.jsx'
import ProcessModificationSlide from './slides/ProcessModificationSlide.jsx'
import ContentConsistencySlide from './slides/ContentConsistencySlide.jsx'
import ResearchLearningsSlide from './slides/ResearchLearningsSlide.jsx'
import WhatDidIDoSlide from './slides/WhatDidIDoSlide.jsx'
import OptimizedFlowSlide from './slides/OptimizedFlowSlide.jsx'
import OverallImpactSlide from './slides/OverallImpactSlide.jsx'
import ThankYouSlide from './slides/ThankYouSlide.jsx'

const AUTOPLAY_MS = 6000

// ---------------------------------------------------------------------------
// Slide definitions
// ---------------------------------------------------------------------------
const SLIDES = [
  {
    id: 'cover',
    num: '01',
    label: 'Intro',
    bg: '#0a0f1e',
    glow: { color: 'rgba(0,229,255,0.14)', pos: '50% -10%', size: '80% 55%' },
    accent: '#00e5ff',
    note: 'Cover — name, title, portfolio year',
    Content: IntroSlide,
  },
  {
    id: 'agenda',
    num: '02',
    label: 'Project',
    bg: '#09091d',
    glow: { color: 'rgba(139,92,246,0.18)', pos: '88% 12%', size: '65% 55%' },
    accent: '#8b5cf6',
    note: 'Project 1 — PayPal checkout optimization',
    Content: AgendaSlide,
  },
  {
    id: 'impact',
    num: '03',
    label: 'Impact',
    bg: '#091318',
    glow: { color: 'rgba(38,198,218,0.14)', pos: '15% 38%', size: '70% 65%' },
    accent: '#26c6da',
    note: 'Impact — credit utilization, conversion, $784M revenue',
    Content: ImpactSlide,
  },
  {
    id: 'problem',
    num: '04',
    label: 'Problem',
    bg: '#0f0a18',
    glow: { color: 'rgba(255,0,128,0.13)', pos: '82% 52%', size: '60% 80%' },
    accent: '#ff0080',
    note: 'Problem — how might we simplify loan applications',
    Content: ProblemSlide,
  },
  {
    id: 'project-02',
    num: '05',
    label: 'Relevance',
    bg: '#0a0f1e',
    glow: { color: 'rgba(0,229,255,0.11)', pos: '18% 68%', size: '75% 70%' },
    accent: '#00e5ff',
    note: 'Case study — problem, process, outcome',
    Content: RelevanceSlide,
  },
  {
    id: 'centralized-design',
    num: '06',
    label: 'Scope',
    bg: '#214e54',
    glow: { color: 'rgba(56, 114, 119, 0.4)', pos: '50% 50%', size: '80% 80%' },
    accent: '#387277',
    note: 'Structural diagram with disappearing roles',
    duration: 8000,
    Content: CentralizedDesignSlide,
  },
  {
    id: 'process-modification',
    num: '07',
    label: 'Process modification',
    bg: '#0a0514',
    glow: { color: 'rgba(255,0,128,0.12)', pos: '50% 50%', size: '80% 80%' },
    accent: '#ff0080',
    note: 'Workflow iteration mapping chart',
    Content: ProcessModificationSlide,
  },
  {
    id: 'content-consistency',
    num: '08',
    label: 'Content Consistency',
    bg: '#08090f',
    glow: { color: 'rgba(0,229,255,0.10)', pos: '50% 50%', size: '70% 70%' },
    accent: '#00e5ff',
    note: 'Old vs new copy comparison',
    Content: ContentConsistencySlide,
  },
  {
    id: 'research-learnings',
    num: '09',
    label: 'Research Learnings',
    bg: '#0a0618',
    glow: { color: 'rgba(139,92,246,0.28)', pos: '25% 35%', size: '85% 80%' },
    accent: '#8b5cf6',
    note: 'UXR research learnings',
    Content: ResearchLearningsSlide,
  },
  {
    id: 'what-did-i-do',
    num: '10',
    label: 'Deep dive into Pay in 4',
    bg: '#020b18',
    glow: { color: 'rgba(0,229,255,0.12)', pos: '50% 50%', size: '90% 85%' },
    accent: '#ffffff',
    note: 'Prototype video',
    duration: 18000,
    Content: WhatDidIDoSlide,
  },
  {
    id: 'optimized-flow',
    num: '11',
    label: 'Optimized Flow',
    bg: '#07080f',
    glow: { color: 'rgba(255,0,128,0.10)', pos: '50% 50%', size: '80% 75%' },
    accent: '#ff0080',
    note: '3-step flow diagram with pink bar reveal',
    duration: 11000,
    Content: OptimizedFlowSlide,
  },
  {
    id: 'overall-impact',
    num: '12',
    label: 'Overall Impact',
    bg: '#060d1a',
    glow: { color: 'rgba(0,229,255,0.13)', pos: '20% 60%', size: '80% 75%' },
    accent: '#00e5ff',
    note: 'Impact stats with area chart',
    Content: OverallImpactSlide,
  },
  {
    id: 'thank-you',
    num: '13',
    label: 'Thank you',
    bg: '#000000',
    glow: { color: 'rgba(255,255,255,0.0)', pos: '50% 50%', size: '0% 0%' },
    accent: '#ffffff',
    note: 'Closing quote — fades to black after 5s',
    duration: 20000,
    Content: ThankYouSlide,
  },
]

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------
export default function Presentation() {
  const autoplay = useRef(
    Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: false })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current])

  const [current, setCurrent]       = useState(0)
  const [isPaused, setIsPaused]     = useState(false)
  const [tapFeedback, setTapFeedback] = useState(false)

  // Stable ref so effects can access latest emblaApi without re-running
  const emblaApiRef = useRef(null)
  useEffect(() => { emblaApiRef.current = emblaApi }, [emblaApi])

  // Progress bar uses a MotionValue so we can pause/resume at exact position
  const progressX    = useMotionValue(0)
  const progressAnim = useRef(null)
  const manualTimer  = useRef(null)
  // Stable ref for current index — lets togglePause read it without a dep
  const currentRef   = useRef(0)
  useEffect(() => { currentRef.current = current }, [current])

  // Sync current slide index
  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  // On each slide change: reset pause, restart progress, advance after per-slide duration
  useEffect(() => {
    progressAnim.current?.stop()
    clearTimeout(manualTimer.current)
    progressX.set(0)
    setIsPaused(false)

    // Stop the embla autoplay plugin — we drive timing manually
    emblaApiRef.current?.plugins()?.autoplay?.stop()

    const duration = SLIDES[current].duration ?? AUTOPLAY_MS

    progressAnim.current = animate(progressX, 1, {
      duration: duration / 1000,
      ease: 'linear',
    })

    manualTimer.current = setTimeout(() => {
      emblaApiRef.current?.scrollNext()
    }, duration)

    return () => clearTimeout(manualTimer.current)
  }, [current, progressX])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault()
        emblaApi?.scrollNext()
      }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        emblaApi?.scrollPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [emblaApi])

  const goTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi])

  // Toggle pause — also shows a brief feedback icon
  const togglePause = useCallback(() => {
    // Brief icon flash
    setTapFeedback(true)
    setTimeout(() => setTapFeedback(false), 650)

    const duration = SLIDES[currentRef.current].duration ?? AUTOPLAY_MS

    if (isPaused) {
      // Resume from exact position
      setIsPaused(false)
      const remaining = (1 - progressX.get()) * (duration / 1000)
      progressAnim.current = animate(progressX, 1, {
        duration: remaining,
        ease: 'linear',
      })
      manualTimer.current = setTimeout(() => {
        emblaApiRef.current?.scrollNext()
      }, remaining * 1000)
    } else {
      // Pause
      setIsPaused(true)
      progressAnim.current?.stop()
      clearTimeout(manualTimer.current)
    }
  }, [isPaused, progressX])

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#050810] select-none font-body">

      {/* ── 16:9 slide frame ── */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '16 / 9',
          width: 'min(100vw, calc(100vh * 16 / 9))',
          height: 'min(100vh, calc(100vw * 9 / 16))',
        }}
      >

        {/* Tap-to-pause overlay — sits above slide content (z-10) but below controls (z-30) */}
        <div
          className="absolute inset-0 cursor-pointer"
          style={{ zIndex: 12 }}
          onClick={togglePause}
        />

        {/* Tap feedback icon — appears briefly in center on each tap */}
        <AnimatePresence>
          {tapFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 50 }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(0,0,0,0.48)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {isPaused
                  ? <Play  className="w-4 h-4 text-white ml-0.5" />
                  : <Pause className="w-4 h-4 text-white" />
                }
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Embla viewport ── */}
        <div ref={emblaRef} className="h-full w-full overflow-hidden">
          <div className="flex h-full" style={{ willChange: 'transform' }}>
            {SLIDES.map((slide, i) => (
              <Slide key={slide.id} slide={slide} isActive={i === current} />
            ))}
          </div>
        </div>

        {/* ── Navigation arrows ── */}
        <NavArrow dir="prev" onClick={() => emblaApi?.scrollPrev()} />
        <NavArrow dir="next" onClick={() => emblaApi?.scrollNext()} />

        {/* ── Bottom HUD ── */}
        <div className="absolute bottom-0 left-0 right-0 z-30 px-8 md:px-14 pb-7">
          <div className="flex items-center justify-between mb-3">

            {/* Slide counter */}
            <span className="text-white/25 text-[11px] tracking-[0.2em] font-body uppercase tabular-nums">
              {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(SLIDES.length).padStart(2, '0')}
            </span>

            {/* Dot indicators */}
            <div className="flex items-center gap-[6px]">
              {SLIDES.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goTo(i)}
                  animate={{
                    width: i === current ? 28 : 6,
                    height: 3,
                    backgroundColor:
                      i === current
                        ? SLIDES[current].accent
                        : 'rgba(255,255,255,0.18)',
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="rounded-full cursor-pointer"
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Slide label */}
            <span className="text-white/25 text-[11px] tracking-[0.2em] font-body uppercase">
              {SLIDES[current].label}
            </span>
          </div>

          {/* Progress track */}
          <div className="h-px w-full rounded-full overflow-hidden bg-white/10">
            <motion.div
              style={{ scaleX: progressX, backgroundColor: SLIDES[current].accent }}
              className="h-full w-full origin-left rounded-full"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Individual slide
// ---------------------------------------------------------------------------
function Slide({ slide, isActive }) {
  const Content = slide.Content

  return (
    <div
      className="flex-[0_0_100%] min-w-0 relative h-full overflow-hidden"
      style={{ backgroundColor: slide.bg }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse ${slide.glow.size} at ${slide.glow.pos}, ${slide.glow.color} 0%, transparent 70%)`,
        }}
      />

      {/* Slide index label — top left */}
      <div className="absolute top-8 left-8 md:top-10 md:left-12 z-20">
        <span
          className="text-[10px] tracking-[0.25em] uppercase font-body font-medium"
          style={{ color: `${slide.accent}65` }}
        >
          {slide.num}&ensp;—&ensp;{slide.label}
        </span>
      </div>

      {/* Content — custom component or default placeholder */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className={`relative z-10 h-full ${
              Content ? '' : 'flex flex-col justify-center px-10 md:px-20 lg:px-28 pb-20'
            }`}
          >
            {Content ? (
              <Content accent={slide.accent} />
            ) : (
              <div
                className="max-w-2xl rounded-2xl p-10 md:p-14"
                style={{
                  border: `1px dashed ${slide.accent}30`,
                  background: `linear-gradient(140deg, ${slide.accent}08 0%, transparent 55%)`,
                }}
              >
                <p
                  className="text-[10px] tracking-[0.3em] uppercase font-body font-semibold mb-6"
                  style={{ color: slide.accent }}
                >
                  Content placeholder
                </p>
                <h1 className="font-display font-bold text-white leading-[0.95] mb-5 text-5xl md:text-6xl lg:text-7xl">
                  {slide.label}
                </h1>
                <p className="text-white/30 text-sm font-body leading-relaxed">
                  {slide.note}
                </p>
                <div
                  className="mt-8 h-px w-12 rounded-full"
                  style={{ backgroundColor: slide.accent }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Navigation arrow
// ---------------------------------------------------------------------------
function NavArrow({ dir, onClick }) {
  const isPrev = dir === 'prev'
  return (
    <motion.button
      onClick={onClick}
      className="absolute top-1/2 z-30 flex items-center justify-center w-9 h-9 rounded-full cursor-pointer"
      style={{
        [isPrev ? 'left' : 'right']: '1.25rem',
        y: '-50%',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(6px)',
      }}
      whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }}
      whileTap={{ scale: 0.94 }}
      aria-label={isPrev ? 'Previous slide' : 'Next slide'}
    >
      {isPrev
        ? <ChevronLeft  className="w-4 h-4 text-white/50" />
        : <ChevronRight className="w-4 h-4 text-white/50" />
      }
    </motion.button>
  )
}
