import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function RelevanceSlide({ accent }) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#050810]">
      
      {/* Background ambient glow behind the arrow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          background: `radial-gradient(circle at bottom center, ${accent || '#00e5ff'}20 0%, transparent 60%)`
        }}
      />

      {/* Container for Arrow Graphic and Text Overlay */}
      {/* Expanded to cover the full bleed background of the slide */}
      <motion.div
        className="absolute inset-0 w-full h-full flex flex-col items-center z-10"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} 
      >
        {/* The Source Arrow Graphic filling the background with top edge fade */}
        <img
           src="/Thick_glass_arrow_.png"
           alt="Upward Glass Arrow Background"
           className="absolute inset-0 w-full h-full object-cover z-10"
           style={{
             WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)',
             maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)'
           }}
        />

        {/* 
          Text Container overlaid cleanly where the upper arrow pools visually
        */}
        <motion.div 
          className="absolute top-[18%] md:top-[15%] mt-[70px] left-0 right-0 flex flex-col items-center text-center px-4 z-20"
          style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.3))' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease }}
        >
          <h1
            className="font-display text-[90px] md:text-[130px] lg:text-[160px] font-bold leading-none tracking-tighter"
            style={{ color: '#ff0080', filter: 'drop-shadow(0 6px 16px rgba(255,0,128,0.35))' }}
          >
            $3.2B
          </h1>
          <p className="font-body text-white/90 text-[20px] md:text-[24px] -mt-[2px] md:mt-[6px] tracking-wider font-normal">
            PayPal BNPL + PayPal Credit
          </p>
        </motion.div>
      </motion.div>

    </div>
  )
}
