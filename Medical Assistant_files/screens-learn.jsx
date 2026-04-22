// Vocab learning — flip cards
function LearnScreen({ go }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const word = MedPalData.vocab[idx];
  const total = MedPalData.vocab.length;

  const next = (mark) => {
    setFlipped(false);
    setTimeout(() => setIdx((idx + 1) % total), 300);
  };

  return (
    <div style={{ height: '100%', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      <TopBar/>
      {/* Header */}
      <div style={{ padding: '6px 20px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => go('home')} style={{
          width: 36, height: 36, borderRadius: 12, border: 'none',
          background: 'var(--paper)', boxShadow: 'var(--sh-1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Icon name="back" size={18}/>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Human Anatomy</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>人体解剖学 · Set 04</div>
        </div>
        <button style={{
          width: 36, height: 36, borderRadius: 12, border: 'none',
          background: 'var(--paper)', boxShadow: 'var(--sh-1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Icon name="shuffle" size={16}/>
        </button>
      </div>

      {/* Progress */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i <= idx ? 'var(--accent, #7FD1AE)' : 'var(--hair)',
            }}/>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{idx + 1} / {total}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>⏱ 02:14</div>
        </div>
      </div>

      {/* Card */}
      <div style={{ flex: 1, padding: '8px 20px 16px', display: 'flex', alignItems: 'stretch' }}>
        <div className={`mp-flip ${flipped ? 'flipped' : ''}`} style={{ width: '100%', height: '100%' }}>
          <div className="mp-flip-inner">
            {/* FRONT */}
            <div className="mp-flip-face" onClick={() => setFlipped(true)} style={{
              background: 'var(--paper)', cursor: 'pointer',
              boxShadow: 'var(--sh-2)', border: '1px solid var(--hair)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                padding: '14px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span className="mp-chip" style={{ background: 'var(--mint-50)', color: 'var(--mint-700)' }}>
                  {word.pos} · MEDICAL
                </span>
                <span style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--mono)' }}>TAP TO FLIP</span>
              </div>

              {/* Organ illustration */}
              <div style={{ padding: '20px 24px 8px' }}>
                <OrganIllustration type={word.organ}/>
              </div>

              <div style={{ flex: 1, padding: '0 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                  fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 600,
                  letterSpacing: -1, color: 'var(--ink)', textAlign: 'center',
                }}>{word.word}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--ink-3)', marginTop: 6 }}>
                  {word.ipa}
                </div>
              </div>

              <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <button style={{
                  width: 64, height: 64, borderRadius: '50%', border: 'none',
                  background: 'var(--accent, #7FD1AE)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'var(--sh-mint)', cursor: 'pointer', position: 'relative',
                }} onClick={(e) => e.stopPropagation()}>
                  <Icon name="speaker" size={24} color="#fff"/>
                  {/* Waves */}
                  <div style={{ display: 'flex', gap: 3, position: 'absolute', right: -28, alignItems: 'center', height: 28 }}>
                    {[0, 0.1, 0.2, 0.3].map((d, i) => (
                      <div key={i} className="mp-wave-bar" style={{
                        width: 3, height: '100%', background: 'var(--mint-600)', borderRadius: 2,
                        animationDelay: `${d}s`,
                      }}/>
                    ))}
                  </div>
                </button>
                <div style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--mono)', letterSpacing: 1 }}>US · UK</div>
              </div>
            </div>

            {/* BACK */}
            <div className="mp-flip-face mp-flip-back" onClick={() => setFlipped(false)} style={{
              background: 'var(--paper)', cursor: 'pointer',
              boxShadow: 'var(--sh-2)', border: '1px solid var(--hair)',
              display: 'flex', flexDirection: 'column', padding: 22, overflow: 'auto',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600 }}>{word.word}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)' }}>{word.ipa}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--mono)' }}>BACK</div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: 1, marginBottom: 4 }}>DEFINITION · 释义</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.35 }}>{word.zh}</div>
              </div>

              <div style={{
                padding: 14, borderRadius: 14,
                background: 'var(--beige)', marginBottom: 14,
              }}>
                <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: 1, marginBottom: 6 }}>EXAMPLE · 例句</div>
                <div style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.5, fontWeight: 500 }}>"{word.sentence}"</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5, marginTop: 6 }}>{word.zhSentence}</div>
              </div>

              <div style={{
                padding: 14, borderRadius: 14,
                border: '1px dashed var(--mint-600)',
                background: 'var(--mint-50)',
              }}>
                <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--mint-700)', letterSpacing: 1, marginBottom: 4 }}>MNEMONIC · 记忆法</div>
                <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{word.mnemonic}</div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 14, fontSize: 11, color: 'var(--ink-4)', textAlign: 'center', fontFamily: 'var(--mono)' }}>
                TAP TO FLIP BACK
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating buttons */}
      <div style={{ padding: '0 20px 32px', display: 'flex', gap: 8 }}>
        <RateBtn label="Forgot" zh="不认识" color="#E8896B" onClick={() => next('forgot')}/>
        <RateBtn label="Fuzzy" zh="模糊" color="#E5B769" onClick={() => next('fuzzy')}/>
        <RateBtn label="Got it" zh="认识" color="var(--mint-600)" onClick={() => next('known')}/>
      </div>
    </div>
  );
}

function RateBtn({ label, zh, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, height: 56, border: 'none', borderRadius: 16,
      background: 'var(--paper)', cursor: 'pointer', fontFamily: 'inherit',
      boxShadow: 'var(--sh-1)', borderBottom: `3px solid ${color}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{label}</div>
      <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>{zh}</div>
    </button>
  );
}

// Organ illustration placeholders — simple geometric, placeholder-style
function OrganIllustration({ type }) {
  return (
    <div style={{
      height: 120, borderRadius: 14, position: 'relative', overflow: 'hidden',
      background: 'var(--mint-50)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(45deg, transparent 0 10px, rgba(127,209,174,0.12) 10px 12px)',
      }}/>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 14 }}>
        {type === 'heart' && (
          <svg width="76" height="76" viewBox="0 0 80 80">
            <path d="M40 68 C 14 50, 6 30, 20 18 C 30 10, 40 18, 40 26 C 40 18, 50 10, 60 18 C 74 30, 66 50, 40 68 z" fill="#5DBA93" opacity="0.85"/>
            <path d="M30 34 L 36 34 L 40 28 L 44 46 L 48 34 L 54 34" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {type === 'lungs' && (
          <svg width="80" height="76" viewBox="0 0 88 80">
            <path d="M44 14 V 58" stroke="#3E9E75" strokeWidth="2.4" strokeLinecap="round"/>
            <path d="M38 18 C 22 22, 14 40, 20 60 C 24 70, 38 68, 38 58 z" fill="#5DBA93" opacity="0.75"/>
            <path d="M50 18 C 66 22, 74 40, 68 60 C 64 70, 50 68, 50 58 z" fill="#5DBA93" opacity="0.75"/>
            <circle cx="44" cy="14" r="3.5" fill="#3E9E75"/>
          </svg>
        )}
        {type === 'vessels' && (
          <svg width="80" height="76" viewBox="0 0 80 76">
            <path d="M40 8 V 68" stroke="#5DBA93" strokeWidth="5" strokeLinecap="round" opacity="0.5"/>
            <path d="M40 20 Q 60 26, 58 42 T 52 64" stroke="#E8896B" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M40 20 Q 20 26, 22 42 T 28 64" stroke="#E8896B" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <circle cx="40" cy="20" r="5" fill="#3E9E75"/>
          </svg>
        )}
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mint-700)', letterSpacing: 1 }}>
          {type.toUpperCase()} · 图示
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LearnScreen });
