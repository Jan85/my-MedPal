// Review (Ebbinghaus) + Quiz screens
function ReviewScreen({ go }) {
  const due = MedPalData.review.due;
  const stages = ['5m', '30m', '1h', '8h', '24h', '2d', '4d', '7d'];
  return (
    <div style={{ height: '100%', background: 'var(--beige)', overflow: 'auto' }} className="mp-scroll">
      <TopBar/>
      <div style={{ padding: '8px 24px 20px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>Review</div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>艾宾浩斯复习 · Ebbinghaus</div>
      </div>

      {/* Curve card */}
      <div style={{ padding: '0 24px 16px' }}>
        <div style={{
          background: 'var(--paper)', borderRadius: 22, padding: 18,
          boxShadow: 'var(--sh-1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Forgetting curve</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>Memory retention over time</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--mint-700)', fontWeight: 700 }}>{due.length} due</div>
          </div>
          <EbbingCurve/>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: 10, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-4)',
          }}>
            {stages.map((s, i) => <div key={i}>{s}</div>)}
          </div>
        </div>
      </div>

      {/* Due list */}
      <div style={{ padding: '0 24px 120px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
          <span>Due soon · 待复习</span>
          <span style={{ color: 'var(--ink-3)', fontWeight: 500 }}>Sorted by urgency</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {due.map((d, i) => (
            <div key={i} style={{
              background: 'var(--paper)', borderRadius: 16, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 12, boxShadow: 'var(--sh-1)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `oklch(0.92 0.05 ${150 + i * 20})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: 'var(--ink-2)',
                fontFamily: 'var(--serif)',
              }}>{d.word[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{d.word}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{d.zh}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>STAGE {d.stage}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--mint-700)', marginTop: 1 }}>in {d.dueIn}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="mp-btn mp-btn-primary" style={{ width: '100%', marginTop: 18, height: 52 }}>
          <Icon name="play" size={16} color="#fff"/>
          Start review session · 开始复习
        </button>

        {/* Legend */}
        <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <LegendChip color="var(--mint-600)" label="Understand" zh="记住"/>
          <LegendChip color="#E5B769" label="Fuzzy" zh="模糊"/>
          <LegendChip color="#E8896B" label="Forgot" zh="忘记"/>
        </div>
      </div>
    </div>
  );
}

function LegendChip({ color, label, zh }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '6px 12px', background: 'var(--paper)', borderRadius: 999,
      fontSize: 12, boxShadow: 'var(--sh-1)',
    }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }}/>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <span style={{ color: 'var(--ink-3)' }}>{zh}</span>
    </div>
  );
}

function EbbingCurve() {
  // points: time in days (log-ish) vs retention %
  const w = 320, h = 100;
  const pts = [
    [0, 100], [0.05, 58], [0.3, 44], [1, 33], [2, 28], [5, 20], [7, 18]
  ];
  // after review, curves reset higher
  const refreshed = [
    { x0: 0.05, y0: 58 }, { x0: 1, y0: 33 }
  ];
  const xScale = (x) => 10 + (x / 7) * (w - 20);
  const yScale = (y) => 10 + (100 - y) * 0.8;
  const path = (arr) => arr.map((p, i) => `${i === 0 ? 'M' : 'L'}${xScale(p[0])},${yScale(p[1])}`).join(' ');
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      {/* Grid */}
      {[25, 50, 75].map(g => (
        <line key={g} x1={10} x2={w - 10} y1={yScale(g)} y2={yScale(g)} stroke="var(--hair)" strokeDasharray="2 4"/>
      ))}
      {/* Raw curve (dashed) */}
      <path d={path(pts)} stroke="var(--ink-4)" strokeWidth="1.5" fill="none" strokeDasharray="3 3"/>
      {/* Refreshed */}
      <path d="M 19 42 Q 30 15, 60 22 Q 90 50, 140 38 Q 180 10, 220 22 Q 260 55, 300 42" stroke="var(--mint-600)" strokeWidth="2.2" fill="none"/>
      {/* Review markers */}
      {[60, 140, 220].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={22 + i * 0} r="4" fill="var(--mint-600)"/>
          <circle cx={x} cy={22} r="8" fill="var(--mint-600)" opacity="0.2"/>
        </g>
      ))}
      {/* Now marker */}
      <line x1={xScale(0.3)} x2={xScale(0.3)} y1={5} y2={h-5} stroke="var(--coral, #E8896B)" strokeWidth="1.2" strokeDasharray="2 2"/>
      <text x={xScale(0.3) + 4} y={15} fontSize="8" fill="#E8896B" fontFamily="var(--mono)">NOW</text>
    </svg>
  );
}

// Quiz
function QuizScreen({ go }) {
  const [mode, setMode] = useState('mc');
  const [picked, setPicked] = useState(null);
  const tabs = [
    { id: 'mc', label: 'Multiple choice', zh: '选择题', icon: 'target' },
    { id: 'spell', label: 'Spelling', zh: '拼写', icon: 'edit' },
    { id: 'listen', label: 'Listening', zh: '听力', icon: 'headphones' },
  ];

  return (
    <div style={{ height: '100%', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      <TopBar/>
      {/* Header */}
      <div style={{ padding: '6px 24px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.3 }}>Quiz</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>测验 · Session 12 of 28</div>
        </div>
        <div style={{
          padding: '6px 12px', borderRadius: 999, background: 'var(--mint-50)',
          fontSize: 12, fontWeight: 700, color: 'var(--mint-700)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Icon name="zap" size={12} color="var(--mint-700)"/>
          +120 XP
        </div>
      </div>

      {/* Segmented */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          background: 'var(--beige-deep)', borderRadius: 14, padding: 4,
          display: 'flex',
        }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => { setMode(t.id); setPicked(null); }} style={{
              flex: 1, border: 'none', background: mode === t.id ? 'var(--paper)' : 'transparent',
              color: mode === t.id ? 'var(--ink)' : 'var(--ink-3)',
              padding: '8px 6px', borderRadius: 10, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 12, fontWeight: 700,
              boxShadow: mode === t.id ? 'var(--sh-1)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            }}>
              <Icon name={t.icon} size={13}/>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 20px 120px', overflow: 'auto' }} className="mp-scroll">
        {mode === 'mc' && <MCQuiz picked={picked} setPicked={setPicked}/>}
        {mode === 'spell' && <SpellQuiz/>}
        {mode === 'listen' && <ListenQuiz/>}
      </div>
    </div>
  );
}

function MCQuiz({ picked, setPicked }) {
  const q = MedPalData.quiz.mc;
  return (
    <div>
      <div style={{
        background: 'var(--paper)', borderRadius: 22, padding: 22,
        boxShadow: 'var(--sh-1)', marginBottom: 14, textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: 1, marginBottom: 10 }}>
          QUESTION 3 / 10 · 选择正确释义
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 40, fontWeight: 600, letterSpacing: -0.8 }}>
          {q.word}
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-3)', marginTop: 4 }}>
          {q.ipa}
        </div>
        <button style={{
          marginTop: 14, width: 44, height: 44, borderRadius: '50%', border: 'none',
          background: 'var(--mint-50)', color: 'var(--mint-700)', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="speaker" size={18} color="var(--mint-700)"/>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const state = picked !== null ? (opt.correct ? 'right' : isPicked ? 'wrong' : 'dim') : 'idle';
          const colors = {
            idle: { bg: 'var(--paper)', bd: 'var(--hair)', ink: 'var(--ink)' },
            right: { bg: 'var(--mint-50)', bd: 'var(--mint-600)', ink: 'var(--mint-700)' },
            wrong: { bg: '#FCEAE2', bd: '#E8896B', ink: '#B8583A' },
            dim: { bg: 'var(--paper)', bd: 'var(--hair)', ink: 'var(--ink-3)' },
          }[state];
          return (
            <button key={i} onClick={() => picked === null && setPicked(i)} style={{
              background: colors.bg, border: `1.5px solid ${colors.bd}`,
              borderRadius: 16, padding: '14px 16px', textAlign: 'left',
              cursor: picked === null ? 'pointer' : 'default', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 7,
                background: state === 'idle' ? 'var(--cream)' : colors.bd,
                color: state === 'idle' ? 'var(--ink-3)' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, fontFamily: 'var(--mono)',
                flexShrink: 0,
              }}>
                {state === 'right' ? '✓' : state === 'wrong' ? '✕' : String.fromCharCode(65 + i)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: colors.ink }}>{opt.zh}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>{opt.en}</div>
              </div>
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <button className="mp-btn mp-btn-primary" style={{ width: '100%', marginTop: 16, height: 50 }}>
          Next question <Icon name="arrow" size={16} color="#fff"/>
        </button>
      )}
    </div>
  );
}

function SpellQuiz() {
  const q = MedPalData.quiz.spell;
  return (
    <div>
      <div style={{
        background: 'var(--paper)', borderRadius: 22, padding: 22,
        boxShadow: 'var(--sh-1)', marginBottom: 14, textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: 1, marginBottom: 10 }}>
          SPELL THE WORD · 根据释义拼写
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.3, color: 'var(--ink)' }}>
          {q.zh}
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4, fontFamily: 'var(--mono)' }}>
          {q.hint}
        </div>

        <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 22, flexWrap: 'wrap' }}>
          {q.filled.split('').map((ch, i) => {
            const isBlank = ch === '_';
            return (
              <div key={i} style={{
                width: 22, height: 32, borderRadius: 6,
                background: isBlank ? 'var(--mint-50)' : 'var(--cream)',
                border: isBlank ? '1.5px solid var(--mint-600)' : '1px solid var(--hair)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 600,
                color: isBlank ? 'var(--mint-700)' : 'var(--ink)',
              }}>{isBlank ? '' : ch}</div>
            );
          })}
        </div>

        <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 16, fontFamily: 'var(--mono)' }}>
          Hint · Hyper- means "too much"
        </div>
      </div>

      {/* Letter bank */}
      <div style={{
        background: 'var(--paper)', borderRadius: 16, padding: 14,
        boxShadow: 'var(--sh-1)',
      }}>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 8, fontFamily: 'var(--mono)' }}>TAP LETTERS · 点击字母</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['E','I','E','O','S','N','T','Y','P','R','H','M'].map((l, i) => (
            <div key={i} style={{
              flex: '1 1 50px', minWidth: 44, height: 40, borderRadius: 10,
              background: 'var(--cream)', border: '1px solid var(--hair)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600,
              cursor: 'pointer',
            }}>{l}</div>
          ))}
        </div>
      </div>

      <button className="mp-btn mp-btn-ghost" style={{ width: '100%', marginTop: 12, height: 48 }}>
        <Icon name="speaker" size={14}/> Play pronunciation · 播放发音
      </button>
    </div>
  );
}

function ListenQuiz() {
  return (
    <div>
      <div style={{
        background: 'var(--paper)', borderRadius: 22, padding: 28,
        boxShadow: 'var(--sh-1)', marginBottom: 14, textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: 1, marginBottom: 20 }}>
          LISTEN & TYPE · 听写
        </div>
        <button style={{
          width: 92, height: 92, borderRadius: '50%', border: 'none',
          background: 'var(--accent, #7FD1AE)', color: '#fff',
          margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--sh-mint)', cursor: 'pointer', position: 'relative',
        }}>
          <Icon name="speaker" size={36} color="#fff"/>
          <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '2px solid var(--mint-600)', opacity: 0.3 }}/>
          <div style={{ position: 'absolute', inset: -18, borderRadius: '50%', border: '1px solid var(--mint-600)', opacity: 0.15 }}/>
        </button>
        <div style={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'end', height: 32, marginBottom: 18 }}>
          {Array.from({ length: 24 }).map((_, i) => {
            const h = 6 + Math.abs(Math.sin(i * 1.2)) * 24;
            return <div key={i} className="mp-wave-bar" style={{
              width: 3, height: h, background: 'var(--mint-600)', borderRadius: 2,
              animationDelay: `${i * 0.05}s`, opacity: 0.8,
            }}/>;
          })}
        </div>

        <div style={{
          padding: '14px 18px', background: 'var(--cream)', borderRadius: 14,
          border: '1.5px dashed var(--hair)',
          fontFamily: 'var(--mono)', fontSize: 16, color: 'var(--ink-3)',
          minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>Type what you hear...</div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'center' }}>
          <button className="mp-btn mp-btn-ghost" style={{ padding: '10px 18px', fontSize: 13 }}>
            0.5x slow
          </button>
          <button className="mp-btn mp-btn-ghost" style={{ padding: '10px 18px', fontSize: 13 }}>
            Replay
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ReviewScreen, QuizScreen });
