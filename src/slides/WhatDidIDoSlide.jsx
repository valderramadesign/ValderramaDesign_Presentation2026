export default function WhatDidIDoSlide() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#000000' }}>
      <video
        src="/Prototype.mov"
        autoPlay
        loop
        muted
        playsInline
        style={{
          maxWidth: '80%',
          maxHeight: '80%',
          objectFit: 'contain',
          display: 'block',
          transform: 'translateX(-150px)',
        }}
      />
    </div>
  )
}
