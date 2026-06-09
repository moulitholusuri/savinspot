import { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function TopNav({ user, page, setPage, onLogout, onOpenKYC, showToast }) {
  const [showMenu, setShowMenu] = useState(false)
  const { balance } = useApp()
  const tabs = ['dashboard', 'markets', 'portfolio', 'orders', 'ai']
  const labels = { dashboard: 'Dashboard', markets: 'Markets', portfolio: 'Portfolio', orders: 'Orders', ai: '🤖 AI Assistant' }

  return (
    <div style={{ height: 56, background: 'white', borderBottom: '1px solid #E2E8F0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: 13 }}>S</div>
          <span style={{ fontSize: 17, fontWeight: 700 }}>Saving<span style={{ color: '#2563EB' }}>Spot</span></span>
        </div>
        <div style={{ display: 'flex' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setPage(t)} style={{
              padding: '16px 16px', fontSize: 13, fontWeight: 600, border: 'none', background: 'none',
              cursor: 'pointer', fontFamily: 'inherit',
              color: page === t ? '#2563EB' : '#64748B',
              borderBottom: page === t ? '2px solid #2563EB' : '2px solid transparent',
            }}>{labels[t]}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={() => showToast(`Funds: ₹${balance.toLocaleString('en-IN')}`)} style={{
          padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700,
          background: '#DBEAFE', color: '#2563EB', border: 'none', cursor: 'pointer',
        }}>₹ Funds</button>
        <div style={{ position: 'relative' }}>
          <div onClick={() => setShowMenu(!showMenu)} style={{
            width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>{user?.initial || 'U'}</div>
          {showMenu && (
            <div style={{ position: 'absolute', top: 44, right: 0, background: 'white',
              border: '1px solid #E2E8F0', borderRadius: 10, boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              minWidth: 180, zIndex: 100, overflow: 'hidden' }}>
              {[
                { icon: '👤', label: 'My Profile', action: () => { setPage('profile'); setShowMenu(false) } },
                { icon: '🛡️', label: 'Verify Account', action: () => { onOpenKYC(); setShowMenu(false) } },
                { icon: '⚙️', label: 'Settings', action: () => { setPage('settings'); setShowMenu(false) } },
              ].map((item, i) => (
                <div key={i} onClick={item.action} style={{ padding: '10px 16px', fontSize: 13,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {item.icon} {item.label}
                </div>
              ))}
              <div onClick={() => { onLogout(); setShowMenu(false) }}
                style={{ padding: '10px 16px', fontSize: 13, cursor: 'pointer', color: '#DC2626',
                  display: 'flex', alignItems: 'center', gap: 8, borderTop: '1px solid #E2E8F0' }}>
                🚪 Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}