// Shared UI atoms for MedPal
const { useState, useRef, useEffect, useMemo } = React;

// Simple icon set — stroke-based, minimal
const Icon = ({ name, size = 20, color = 'currentColor', stroke = 1.8 }) => {
  const s = { width: size, height: size, fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home: <><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></>,
    book: <><path d="M4 4h10a4 4 0 014 4v12H8a4 4 0 01-4-4V4z"/><path d="M4 4v12a4 4 0 014-4h10"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={color}/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></>,
    stethoscope: <><path d="M6 3v7a5 5 0 0010 0V3"/><path d="M6 3H4M16 3h-2M11 15v3a4 4 0 008 0v-1"/><circle cx="19" cy="14" r="2"/></>,
    flame: <><path d="M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4-1 3 3 3 3 0 0-2-1-4 0-6z"/></>,
    check: <><path d="M4 12l5 5L20 6"/></>,
    close: <><path d="M6 6l12 12M18 6L6 18"/></>,
    play: <><path d="M7 4v16l13-8L7 4z" fill={color}/></>,
    speaker: <><path d="M11 4L6 9H3v6h3l5 5V4z"/><path d="M15 9a4 4 0 010 6M18 6a8 8 0 010 12"/></>,
    mic: <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    back: <><path d="M19 12H5M11 6l-6 6 6 6"/></>,
    shuffle: <><path d="M16 3h5v5M21 3l-7 7M4 20l7-7M16 21h5v-5M4 4l7 7"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 00-.1-1l2-1.6-2-3.4-2.4.9a7 7 0 00-1.7-1l-.4-2.5h-4l-.4 2.5a7 7 0 00-1.7 1l-2.4-.9-2 3.4 2 1.6A7 7 0 005 12a7 7 0 00.1 1l-2 1.6 2 3.4 2.4-.9a7 7 0 001.7 1l.4 2.5h4l.4-2.5a7 7 0 001.7-1l2.4.9 2-3.4-2-1.6c0-.3.1-.6.1-1z"/></>,
    chevron: <><path d="M9 6l6 6-6 6"/></>,
    chevronDown: <><path d="M6 9l6 6 6-6"/></>,
    apple: <><path d="M16 3c-1 .5-2 1.8-2 3 1.5 0 3-1.4 3-3-.3 0-.7 0-1 0z" fill={color} stroke="none"/><path d="M19 17.5c-.5 1.2-1.2 2.3-2 3-1 .8-1.7 1-2.8 1s-1.7-.4-3-.4-1.9.4-3 .4-1.8-.2-2.8-1c-2-2-3.4-6-3.4-9.5 0-3 2-5 4-5 1.3 0 2.3.6 3 .6.6 0 2-.7 3.4-.7 1.2 0 3 .4 4 2-3.4 2-3 6.5.6 7.6z" fill={color} stroke="none"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>,
    award: <><circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-2 5 2-2-7"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
    zap: <><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill={color}/></>,
    headphones: <><path d="M3 15v-3a9 9 0 0118 0v3"/><rect x="3" y="14" width="5" height="7" rx="2"/><rect x="16" y="14" width="5" height="7" rx="2"/></>,
    edit: <><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></>,
    trash: <><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M6 6l1 14a2 2 0 002 2h6a2 2 0 002-2l1-14"/></>,
    sparkle: <><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/></>,
  };
  return <svg viewBox="0 0 24 24" style={s}>{paths[name]}</svg>;
};

// Tab bar (iOS)
function TabBar({ current, setCurrent }) {
  const tabs = [
    { id: 'home', label: 'Home', zh: '首页', icon: 'home' },
    { id: 'learn', label: 'Learn', zh: '学习', icon: 'book' },
    { id: 'review', label: 'Review', zh: '复习', icon: 'clock' },
    { id: 'quiz', label: 'Quiz', zh: '测验', icon: 'target' },
    { id: 'me', label: 'Me', zh: '我的', icon: 'user' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 28, paddingTop: 10, paddingLeft: 12, paddingRight: 12,
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(18px) saturate(180%)',
      WebkitBackdropFilter: 'blur(18px) saturate(180%)',
      borderTop: '0.5px solid rgba(27,36,32,0.08)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'stretch',
      zIndex: 30,
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setCurrent(t.id)} style={{
          flex: 1, background: 'transparent', border: 'none', padding: '4px 0',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          cursor: 'pointer', color: current === t.id ? 'var(--accent, #7FD1AE)' : '#9BA7A2',
          fontFamily: 'inherit',
        }}>
          <Icon name={t.icon} size={24} stroke={current === t.id ? 2.2 : 1.8}/>
          <div style={{ fontSize: 10, fontWeight: 600 }}>{t.label}</div>
        </button>
      ))}
    </div>
  );
}

// Status bar (mint-aware)
function TopBar({ dark = false, time = '9:41' }) {
  const c = dark ? '#fff' : '#1B2420';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 28px 8px', fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600,
      color: c, position: 'relative', zIndex: 20,
    }}>
      <span style={{ fontSize: 16, fontWeight: 600 }}>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill={c}>
          <rect x="0" y="7" width="3" height="4" rx="0.5"/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.5"/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5"/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.5"/>
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill={c}>
          <path d="M7.5 3a6 6 0 014.5 2l1-1a7.5 7.5 0 00-11 0l1 1a6 6 0 014.5-2z"/>
          <path d="M7.5 6a3 3 0 012.1.9l1-1a4.5 4.5 0 00-6.2 0l1 1A3 3 0 017.5 6z"/>
          <circle cx="7.5" cy="9.5" r="1.2"/>
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke={c} strokeOpacity="0.4"/>
          <rect x="2" y="2" width="18" height="8" rx="1.5" fill={c}/>
          <rect x="23.5" y="4" width="1.5" height="4" rx="0.5" fill={c} fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, TabBar, TopBar });
