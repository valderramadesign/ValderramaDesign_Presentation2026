import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function AgendaSlide({ accent }) {
  return (
    <div className="w-full h-full flex overflow-hidden items-center" style={{ paddingLeft: '8%', paddingRight: '8%' }}>

      {/* ── LEFT: Phone mockup ─────────────────────────────────────── */}
      <motion.div
        className="relative flex-shrink-0 flex items-center justify-end"
        style={{ width: '50%', paddingRight: '3.5%', paddingLeft: 0 }}
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease }}
      >
        {/* Phone shell */}
        <div
          style={{
            position: 'relative',
            width: '56%', /* Mathematically matched to maintain absolute size on a 50% grid column */
            aspectRatio: '1 / 2.1',
            maxHeight: '90%',
            backgroundColor: '#111111',
            borderRadius: '12%',
            padding: '3% 2.5%',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              position: 'absolute', top: '3%', left: '50%',
              transform: 'translateX(-50%)',
              width: '28%', height: '2.5%',
              backgroundColor: '#000', borderRadius: '20px',
              zIndex: 2,
            }}
          />
          {/* Screen - fade bottom to black and fix gray bar */}
          <div
            style={{
              width: '100%', flex: 1,
              borderRadius: '8%', overflow: 'hidden',
              backgroundColor: '#000', /* True black instead of dark grey to hide layout lines */
              position: 'relative',
            }}
          >
            <video
              src="/Flow_202604162129.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
                transform: 'scale(1.04)', /* Scales slightly to crop any encoded edge artefacts */
                transformOrigin: 'top center',
              }}
            />
            {/* Bottom gradient fade into black */}
            <div
              style={{
                position: 'absolute',
                bottom: 0, left: 0,
                width: '100%', height: '35%',
                background: 'linear-gradient(to bottom, transparent 0%, #000 90%)',
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── RIGHT: Content ─────────────────────────────────────────── */}
      <div
        className="flex flex-col justify-center flex-1 min-w-0"
        style={{ paddingLeft: '3.5%', paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22, ease }}
          className="mb-4"
        >
          <img
            src="/PayPal-monotone.png"
            alt="PayPal"
            style={{ height: '22px', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease }}
          className="font-display text-white leading-[1.06] tracking-tight"
          style={{ fontSize: 'clamp(1.6rem, 3.6vw, 3.6rem)', marginBottom: '6%' }}
        >
          <span style={{ display: 'block' }}>Optimizing</span>
          <span style={{ display: 'block' }}>loan applications</span>
          <span style={{ display: 'block' }}>in PayPal checkout</span>
        </motion.h2>

        {/* Metadata row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.46, ease }}
          className="flex gap-12"
        >
          {/* My role */}
          <div className="flex flex-col gap-2" style={{ maxWidth: '55%' }}>
            <span
              className="font-body font-semibold tracking-wider uppercase"
              style={{ fontSize: '10px', color: accent || '#8b5cf6' }}
            >
              My role
            </span>
            <p className="font-body text-white/60 leading-snug" style={{ fontSize: '13px' }}>
              Partner with leadership, product, and the Checkout team to optimize credit products within a new framework.
            </p>
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-2">
            <span
              className="font-body font-semibold tracking-wider uppercase"
              style={{ fontSize: '10px', color: accent || '#8b5cf6' }}
            >
              Timeline
            </span>
            <p className="font-body text-white/60 leading-snug" style={{ fontSize: '13px' }}>
              1.5 months
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
