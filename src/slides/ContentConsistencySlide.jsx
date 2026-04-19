import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const EASE = [0.22, 1, 0.36, 1]

export default function ContentConsistencySlide({ accent = '#00e5ff' }) {
  const [showNew, setShowNew] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowNew(true), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ position: 'relative' }}>

      {/* New Copy — sits underneath, always present */}
      <img
        src="/New Copy.png"
        alt="New copy"
        style={{
          position: 'absolute',
          maxWidth: '80%',
          maxHeight: '78%',
          objectFit: 'contain',
        }}
      />

      {/* Old Copy — on top, fades out to reveal New Copy below */}
      <motion.img
        src="/Old Copy.png"
        alt="Old copy"
        style={{
          position: 'absolute',
          maxWidth: '80%',
          maxHeight: '78%',
          objectFit: 'contain',
        }}
        animate={{ opacity: showNew ? 0 : 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

    </div>
  )
}
