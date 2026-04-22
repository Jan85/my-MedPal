// Profile + Doctor screens
function ProfileScreen({ go }) {
  const s = MedPalData.stats;
  const hours = Math.floor(s.totalMin / 60);
  return (
    <div style={{ height: '100%', background: 'var(--beige)', overflow: 'auto' }} className="mp-scroll">
      <TopBar/>
      <div style={{ padding: '6px 24px 20px' }}>
        {/* User card */}
        <div style={{
          background: 'var(--ink)', color: '#fff', borderRadius: 24,
          padding: 20, position: 'relative', overflow: 'hidden',
          boxShadow: 'var(--sh-2)', marginBottom: 14,
        }}>
          <div style={{
            position: 'absolute', right: -40, top: -40, width: 160, height: 160, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(127,209,174,0.3), transparent 70%)',
          }}/>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', position: 'relative' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 18,
              background: 'var(--accent, #7FD1AE)', color: 'var(--ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 22, fontFamily: 'var(--serif)',
            }}>L</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Lin Wei</div>
              <div style={{ fontSize: 12, opacity: 0.65 }}>林伟 · Learning English for travel</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: 'rgba(127,209,174,0.2)', color: 'var(--accent, #7FD1AE)', fontWeight: 700 }}>LEVEL 12</span>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', opacity: 0.8 }}>B1 · Intermediate</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
          <Stat value={s.mastered} label="Mastered" zh="已掌握" color="var(--mint-600)"/>
          <Stat value={s.learning} label="Learning" zh="学习中" color="#E5B769"/>
          <Stat value={`${hours}h`} label="Total time" zh="总时长" color="#7BB0D6"/>
        </div>

        {/* Growth chart */}
        <div style={{ background: 'var(--paper)', borderRadius: 20, padding: 18, boxShadow: 'var(--sh-1)', marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Vocabulary growth</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>词汇增长 · Last 13 weeks</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--mint-700)' }}>+40% ↑</div>
          </div>
          <GrowthChart data={s.monthlyGrowth}/>
        </div>

        {/* Weekly time */}
        <div style={{ background: 'var(--paper)', borderRadius: 20, padding: 18, boxShadow: 'var(--sh-1)', marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>This week · min/day</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>本周学习时长</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 88 }}>
            {s.weeklyMin.map((m, i) => {
              const pct = m / Math.max(...s.weeklyMin);
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ fontSize: 9, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{m}</div>
                  <div style={{
                    width: '100%', height: `${pct * 68}px`, borderRadius: 6,
                    background: i === 5 ? 'var(--accent, #7FD1AE)' : 'var(--mint-100)',
                  }}/>
                  <div style={{ fontSize: 9, color: 'var(--ink-4)' }}>{'MTWTFSS'[i]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Menu */}
        <div style={{ background: 'var(--paper)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--sh-1)', marginBottom: 100 }}>
          <MenuRow icon="stethoscope" label="Doctor visit helper" zh="看诊助手" onClick={() => go('doctor')} accent/>
          <MenuRow icon="award" label="Achievements" zh="成就 · 14 badges"/>
          <MenuRow icon="calendar" label="Study reminders" zh="学习提醒"/>
          <MenuRow icon="settings" label="Settings" zh="设置" last/>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label, zh, color }) {
  return (
    <div style={{ background: 'var(--paper)', borderRadius: 16, padding: 14, boxShadow: 'var(--sh-1)' }}>
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--ink-2)', fontWeight: 600, marginTop: 2 }}>{label}</div>
      <div style={{ fontSize: 10, color: 'var(--ink-4)' }}>{zh}</div>
    </div>
  );
}

function MenuRow({ icon, label, zh, last, onClick, accent }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '14px 16px', border: 'none',
      borderBottom: last ? 'none' : '0.5px solid var(--hair)',
      background: 'transparent', display: 'flex', alignItems: 'center', gap: 12,
      cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: accent ? 'var(--mint-50)' : 'var(--cream)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={16} color={accent ? 'var(--mint-700)' : 'var(--ink-2)'}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{zh}</div>
      </div>
      <Icon name="chevron" size={14} color="var(--ink-4)"/>
    </button>
  );
}

function GrowthChart({ data }) {
  const w = 300, h = 80;
  const max = Math.max(...data);
  const pts = data.map((v, i) => [10 + (i / (data.length - 1)) * (w - 20), h - 10 - (v / max) * (h - 20)]);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const area = line + ` L ${pts[pts.length - 1][0]},${h - 10} L ${pts[0][0]},${h - 10} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--mint-600)" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="var(--mint-600)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaFill)"/>
      <path d={line} stroke="var(--mint-600)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p, i) => i === pts.length - 1 && (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="10" fill="var(--mint-600)" opacity="0.2"/>
          <circle cx={p[0]} cy={p[1]} r="4" fill="var(--mint-600)"/>
        </g>
      ))}
    </svg>
  );
}

// Doctor symptom builder
function DoctorScreen({ go }) {
  const [part, setPart] = useState('chest');
  const [symptoms, setSymptoms] = useState(['Sharp pain', 'Tightness']);
  const [duration, setDuration] = useState('2 days');
  const catalog = MedPalData.symptoms.catalog[part] || [];
  const zhMap = MedPalData.symptoms.zhMap;

  const toggle = (sx) => {
    setSymptoms(prev => prev.includes(sx) ? prev.filter(s => s !== sx) : [...prev, sx]);
  };

  // Generate sentence
  const partLabel = MedPalData.symptoms.parts.find(p => p.id === part)?.label.toLowerCase() || part;
  const sxList = symptoms.map(s => s.toLowerCase());
  const sentence = symptoms.length === 0
    ? `I have some discomfort in my ${partLabel}.`
    : `I've been having ${sxList.slice(0, -1).join(', ')}${sxList.length > 1 ? ' and ' : ''}${sxList[sxList.length - 1]} in my ${partLabel} for ${duration}.`;

  const sxZh = symptoms.map(s => zhMap[s] || s);
  const sentenceZh = symptoms.length === 0
    ? `我${MedPalData.symptoms.parts.find(p => p.id === part)?.zh}有些不适。`
    : `我${MedPalData.symptoms.parts.find(p => p.id === part)?.zh}${sxZh.join('、')}，已经持续了 ${duration}。`;

  return (
    <div style={{ height: '100%', background: 'var(--beige)', overflow: 'auto' }} className="mp-scroll">
      <TopBar/>
      <div style={{ padding: '6px 20px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => go('me')} style={{
          width: 36, height: 36, borderRadius: 12, border: 'none',
          background: 'var(--paper)', boxShadow: 'var(--sh-1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Icon name="back" size={18}/>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Talk to my doctor</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>看诊助手 · Tell them in English</div>
        </div>
      </div>

      <div style={{ padding: '0 20px 16px' }}>
        {/* Step 1 — Body map */}
        <StepHeader n="1" en="Where does it hurt?" zh="哪里不舒服？"/>
        <div style={{
          background: 'var(--paper)', borderRadius: 22, padding: 16, boxShadow: 'var(--sh-1)',
          display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16,
        }}>
          <BodyMap selected={part} onSelect={setPart}/>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 200, overflow: 'auto' }} className="mp-scroll">
            {MedPalData.symptoms.parts.map(p => (
              <button key={p.id} onClick={() => { setPart(p.id); setSymptoms([]); }} style={{
                padding: '8px 10px', borderRadius: 10, border: 'none',
                background: part === p.id ? 'var(--accent, #7FD1AE)' : 'var(--cream)',
                color: part === p.id ? '#fff' : 'var(--ink)',
                textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6,
              }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{p.label}</span>
                <span style={{ fontSize: 10, opacity: 0.7 }}>{p.zh}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Symptoms */}
        <StepHeader n="2" en="Pick your symptoms" zh="选择症状"/>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {catalog.map(sx => {
            const on = symptoms.includes(sx);
            return (
              <button key={sx} onClick={() => toggle(sx)} style={{
                padding: '8px 12px', borderRadius: 999, border: 'none',
                background: on ? 'var(--accent, #7FD1AE)' : 'var(--paper)',
                color: on ? '#fff' : 'var(--ink)', cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: on ? 'var(--sh-mint)' : 'var(--sh-1)',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{sx}</span>
                <span style={{ fontSize: 10, opacity: on ? 0.9 : 0.55 }}>· {zhMap[sx]}</span>
                {on && <span style={{ marginLeft: 2 }}><Icon name="check" size={11} color="#fff" stroke={3}/></span>}
              </button>
            );
          })}
        </div>

        {/* Step 3 — Duration */}
        <StepHeader n="3" en="How long?" zh="持续多久？"/>
        <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
          {['2 hours', '1 day', '2 days', '1 week'].map(d => (
            <button key={d} onClick={() => setDuration(d)} style={{
              flex: 1, padding: '10px 6px', borderRadius: 12, border: 'none',
              background: duration === d ? 'var(--ink)' : 'var(--paper)',
              color: duration === d ? '#fff' : 'var(--ink)',
              cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
              boxShadow: 'var(--sh-1)',
            }}>{d}</button>
          ))}
        </div>

        {/* Output card */}
        <div style={{
          background: 'var(--ink)', color: '#fff', borderRadius: 22, padding: 20,
          boxShadow: 'var(--sh-2)', marginBottom: 14, position: 'relative',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent, #7FD1AE)', letterSpacing: 1 }}>
              SAY THIS · 跟读
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{
                width: 32, height: 32, borderRadius: 10, border: 'none',
                background: 'rgba(255,255,255,0.08)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon name="speaker" size={14} color="#fff"/></button>
              <button style={{
                width: 32, height: 32, borderRadius: 10, border: 'none',
                background: 'rgba(255,255,255,0.08)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon name="mic" size={14} color="#fff"/></button>
            </div>
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 20, lineHeight: 1.4, fontWeight: 500, marginBottom: 10 }}>
            "{sentence}"
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
            {sentenceZh}
          </div>
        </div>

        {/* Action */}
        <button className="mp-btn mp-btn-primary" style={{ width: '100%', height: 52, marginBottom: 10 }}>
          <Icon name="sparkle" size={16} color="#fff"/> Show this to doctor · 展示给医生
        </button>
        <button className="mp-btn mp-btn-ghost" style={{ width: '100%', height: 44, fontSize: 13, marginBottom: 100 }}>
          Save to phrasebook · 保存到我的短语
        </button>
      </div>
    </div>
  );
}

function StepHeader({ n, en, zh }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <div style={{
        width: 20, height: 20, borderRadius: 6,
        background: 'var(--accent, #7FD1AE)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 700, fontFamily: 'var(--mono)',
      }}>{n}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{en}</div>
      <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{zh}</div>
    </div>
  );
}

function BodyMap({ selected, onSelect }) {
  const parts = MedPalData.symptoms.parts;
  return (
    <div style={{
      width: 120, height: 210, position: 'relative', flexShrink: 0,
      background: 'var(--mint-50)', borderRadius: 16, overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(45deg, transparent 0 8px, rgba(127,209,174,0.12) 8px 9px)',
      }}/>
      {/* Simple body silhouette */}
      <svg viewBox="0 0 100 180" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <g fill="#B8D9C6" stroke="#5DBA93" strokeWidth="1">
          <circle cx="50" cy="18" r="12"/>
          <rect x="36" y="30" width="28" height="6" rx="3"/>
          <path d="M32 38 L 68 38 L 74 54 L 68 90 L 62 92 L 54 92 L 50 78 L 46 92 L 38 92 L 32 90 L 26 54 Z"/>
          <rect x="20" y="52" width="10" height="32" rx="4"/>
          <rect x="70" y="52" width="10" height="32" rx="4"/>
          <rect x="38" y="92" width="10" height="52" rx="4"/>
          <rect x="52" y="92" width="10" height="52" rx="4"/>
        </g>
      </svg>
      {/* Part dots */}
      {parts.map(p => (
        <button key={p.id} onClick={() => onSelect(p.id)} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          transform: 'translate(-50%, -50%)',
          width: selected === p.id ? 16 : 12, height: selected === p.id ? 16 : 12,
          borderRadius: '50%', border: 'none',
          background: selected === p.id ? 'var(--coral, #E8896B)' : 'var(--mint-700)',
          boxShadow: selected === p.id ? '0 0 0 4px rgba(232,137,107,0.3)' : 'none',
          cursor: 'pointer', transition: 'all 0.15s',
        }}>
          {selected === p.id && <span className="mp-dot-pulse" style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'var(--coral, #E8896B)',
          }}/>}
        </button>
      ))}
    </div>
  );
}

Object.assign(window, { ProfileScreen, DoctorScreen });
