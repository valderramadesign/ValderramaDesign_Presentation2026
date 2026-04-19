const CAPTIONS = [
  "Upstream presentment of our products should be visible and easy to comprehend on our merchant's sites.",
  "Our customers need to be able to easy find and understand BNPL products in PayPal checkout.",
  "Our applications should be clear-cut and effortless to fill out. Loan servicing should be instinctive, fostering repeat usage.",
]

// Per-column padding: col 1 starts flush left, col 3 ends flush right, col 2 symmetric
// Circle centers at 13.2%, 50.0%, 86.8% of image width (not equal thirds).
// Gap between circles = 633/6088 = 10.4% of image → 6.9% offset needed for col 1 & 3.
const COL_PADDING = [
  { paddingLeft: 0,       paddingRight: '6.9%' },
  { paddingLeft: '3.45%', paddingRight: '3.45%' },
  { paddingLeft: '6.9%',  paddingRight: 0 },
]

export default function ResearchLearningsSlide() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{
      background: 'radial-gradient(ellipse 70% 65% at 80% 75%, rgba(76,29,149,0.22) 0%, transparent 70%)',
    }}>
      <div
        style={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: 'translateY(-50px)',
        }}
      >
        {/* Image */}
        <img
          src="/UXR.png"
          alt="Research learnings"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* Caption row */}
        <div style={{ display: 'flex', width: '100%', marginTop: '22px' }}>
          {CAPTIONS.map((text, i) => (
            <div key={i} style={{ flex: 1, ...COL_PADDING[i] }}>
              <p
                style={{
                  color: 'rgba(255,255,255,0.70)',
                  fontSize: '18px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  lineHeight: 1.65,
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
