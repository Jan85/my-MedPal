// Splash / Login
function LoginScreen({ onLogin }) {
  return (
    <div style={{
      height: '100%', width: '100%',
      background: 'linear-gradient(180deg, #EAF7F0 0%, #F5EFE4 55%, #FBF8F1 100%)',
      position: 'relative', display: 'flex', flexDirection: 'column',
    }}>
      <TopBar />

      {/* Decorative orbs */}
      <div style={{
        position: 'absolute', top: 80, right: -40, width: 220, height: 220,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, rgba(127,209,174,0.55), rgba(127,209,174,0) 70%)',
        filter: 'blur(4px)',
      }}/>
      <div style={{
        position: 'absolute', top: 260, left: -60, width: 180, height: 180,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 60% 40%, rgba(234,223,201,0.9), rgba(234,223,201,0) 70%)',
      }}/>

      <div style={{ padding: '48px 28px 0', position: 'relative', zIndex: 2 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 56 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'var(--accent, #7FD1AE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--sh-mint)',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21s-7-5-7-11a4 4 0 017-2.6A4 4 0 0119 10c0 6-7 11-7 11z"/>
              <path d="M8 11h2l1-2 2 4 1-2h2"/>
            </svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>MedPal</div>
        </div>

        {/* Hero copy */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 40, lineHeight: 1.05, fontWeight: 600, letterSpacing: -1, color: 'var(--ink)' }}>
            Talk to any<br/>
            doctor,<br/>
            <span style={{ color: 'var(--mint-700)' }}>in English.</span>
          </div>
          <div style={{ marginTop: 14, fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.5 }}>
            会基础英语就够了 — 我们帮你学会<br/>
            the medical words you actually need.
          </div>
        </div>

        {/* Illustration card */}
        <div style={{
          margin: '0 auto 40px', width: '100%', height: 150,
          borderRadius: 24, background: 'var(--paper)',
          boxShadow: 'var(--sh-2)',
          position: 'relative', overflow: 'hidden',
          border: '1px solid var(--hair)',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(45deg, rgba(127,209,174,0.06) 0 10px, rgba(127,209,174,0.14) 10px 20px)',
          }}/>
          <div style={{
            position: 'absolute', top: 16, left: 16, right: 16,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: 1, textTransform: 'uppercase' }}>
              Today · 今日
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mint-700)' }}>
              ● {MedPalData.today.streak}d streak
            </div>
          </div>
          <div style={{
            position: 'absolute', bottom: 18, left: 20, right: 20,
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 600, color: 'var(--ink)' }}>Cardiac</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>/ˈkɑːdiæk/</div>
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--accent, #7FD1AE)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
            }}>
              <Icon name="speaker" size={18} color="#fff"/>
            </div>
          </div>
        </div>
      </div>

      {/* Auth buttons */}
      <div style={{ marginTop: 'auto', padding: '0 28px 56px', position: 'relative', zIndex: 2 }}>
        <button className="mp-btn mp-btn-dark" onClick={onLogin} style={{ width: '100%', marginBottom: 10, height: 52 }}>
          <Icon name="apple" size={18} color="#fff"/>
          Continue with Apple
        </button>
        <button className="mp-btn mp-btn-primary" onClick={onLogin} style={{ width: '100%', marginBottom: 10, height: 52 }}>
          <Icon name="mail" size={18} color="#fff"/>
          Continue with Email
        </button>
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink-4)', marginTop: 14, lineHeight: 1.5 }}>
          By continuing you agree to our Terms<br/>
          继续即表示您同意我们的服务条款
        </div>
      </div>
    </div>
  );
}

// Home
function HomeScreen({ go }) {
  const d = MedPalData.today;
  const pct = Math.round((d.minutes / d.goalMinutes) * 100);
  return (
    <div style={{ height: '100%', background: 'var(--beige)', overflow: 'auto' }} className="mp-scroll">
      <TopBar/>

      {/* Header */}
      <div style={{ padding: '8px 24px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 500 }}>Good morning · 早上好</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.3, marginTop: 2 }}>Lin 👋</div>
          </div>
          <div style={{
            width: 42, height: 42, borderRadius: '50%',
            background: 'var(--mint-100)', border: '2px solid var(--paper)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, color: 'var(--mint-700)', fontSize: 16,
          }}>L</div>
        </div>

        {/* Streak + progress combined card */}
        <div style={{
          background: 'var(--ink)', color: '#fff',
          borderRadius: 24, padding: 20, position: 'relative', overflow: 'hidden',
          boxShadow: 'var(--sh-2)',
        }}>
          <div style={{
            position: 'absolute', right: -30, top: -30,
            width: 140, height: 140, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(127,209,174,0.35), transparent 70%)',
          }}/>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14, position: 'relative' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="flame" size={22} color="var(--accent, #7FD1AE)" stroke={2}/>
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{d.streak}<span style={{ fontSize: 14, opacity: 0.6, marginLeft: 4, fontWeight: 500 }}>days</span></div>
              <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>Keep it going · 连续打卡</div>
            </div>
          </div>
          {/* Week dots */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 18, position: 'relative' }}>
            {['M','T','W','T','F','S','S'].map((day, i) => {
              const done = i < 5;
              const today = i === 5;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: '100%', height: 34, borderRadius: 10,
                    background: done ? 'var(--accent, #7FD1AE)' : today ? 'rgba(127,209,174,0.2)' : 'rgba(255,255,255,0.06)',
                    border: today ? '1.5px dashed var(--accent, #7FD1AE)' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {done && <Icon name="check" size={14} color="#fff" stroke={3}/>}
                  </div>
                  <div style={{ fontSize: 10, opacity: today ? 1 : 0.5, fontWeight: today ? 700 : 500 }}>{day}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8, position: 'relative' }}>
            <div style={{ fontSize: 13, opacity: 0.7 }}>Today · {d.minutes}/{d.goalMinutes} min</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent, #7FD1AE)' }}>{pct}%</div>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent, #7FD1AE)', borderRadius: 3 }}/>
          </div>
        </div>
      </div>

      {/* Today's plan */}
      <div style={{ padding: '0 24px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Today's plan</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 }}>今日计划</div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Wed, Apr 19</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <PlanCard icon="sparkle" tint="var(--accent, #7FD1AE)" label="New words" zh="新词" value={d.new} onClick={() => go('learn')}/>
          <PlanCard icon="clock" tint="#E5B769" label="To review" zh="待复习" value={d.review} onClick={() => go('review')}/>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <PlanCard icon="target" tint="#E8896B" label="Quiz" zh="挑战测验" value="Start" onClick={() => go('quiz')} small/>
          <PlanCard icon="stethoscope" tint="#7BB0D6" label="Doctor" zh="看诊助手" value="Open" onClick={() => go('doctor')} small/>
        </div>
      </div>

      {/* Books */}
      <div style={{ padding: '16px 24px 120px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Recommended books</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 }}>推荐词书</div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--mint-700)', fontWeight: 600 }}>See all →</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MedPalData.books.map(b => <BookRow key={b.id} book={b}/>)}
        </div>
      </div>
    </div>
  );
}

function PlanCard({ icon, tint, label, zh, value, onClick, small }) {
  return (
    <button onClick={onClick} style={{
      background: 'var(--paper)', border: 'none',
      borderRadius: 20, padding: 16, textAlign: 'left', cursor: 'pointer',
      boxShadow: 'var(--sh-1)', fontFamily: 'inherit',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 12,
        background: `${tint}22`, color: tint,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={18} color={tint}/>
      </div>
      <div>
        <div style={{ fontSize: small ? 20 : 28, fontWeight: 700, letterSpacing: -0.5, color: 'var(--ink)', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 4, fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 1 }}>{zh}</div>
      </div>
    </button>
  );
}

function BookRow({ book }) {
  return (
    <div style={{
      background: 'var(--paper)', borderRadius: 18, padding: 14,
      display: 'flex', gap: 14, alignItems: 'center', boxShadow: 'var(--sh-1)',
    }}>
      <div style={{
        width: 56, height: 72, borderRadius: 8, flexShrink: 0,
        background: `linear-gradient(135deg, ${book.color}, ${book.color}99)`,
        position: 'relative', overflow: 'hidden',
        boxShadow: '2px 2px 6px rgba(0,0,0,0.08)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent 0 10px, rgba(255,255,255,0.15) 10px 11px)',
        }}/>
        <div style={{
          position: 'absolute', left: 6, top: 6, right: 6,
          fontFamily: 'var(--serif)', fontSize: 9, color: 'rgba(255,255,255,0.9)',
          lineHeight: 1.15, fontWeight: 600,
        }}>{book.title}</div>
        <div style={{
          position: 'absolute', bottom: 6, right: 6,
          fontFamily: 'var(--mono)', fontSize: 7, color: 'rgba(255,255,255,0.7)',
        }}>{book.count}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', letterSpacing: -0.2 }}>{book.title}</div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1 }}>{book.zh} · {book.count} words</div>
        <div style={{ marginTop: 8, height: 4, borderRadius: 2, background: 'var(--hair)', overflow: 'hidden' }}>
          <div style={{ width: `${book.progress * 100}%`, height: '100%', background: book.color, borderRadius: 2 }}/>
        </div>
      </div>
      <div className="mp-chip" style={{ background: `${book.color}22`, color: book.color, flexShrink: 0 }}>
        {book.tag}
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen, HomeScreen });
