import { useApp } from '../../context/AppContext'
import { indices, mutualFunds } from '../../data/stockData'
import { parsePrice, formatINR } from '../../utils/formatters'

export default function Dashboard({ onTrade, onOpenKYC, showToast, setPage }) {
  const { stocks, balance, kycVerified } = useApp()

  const gainers = stocks.filter(s => s.up).sort((a, b) => parseFloat(b.change) - parseFloat(a.change)).slice(0, 5)
  const losers = stocks.filter(s => !s.up).slice(0, 5)

  return (
    <div>
      {/* KYC Banner */}
      {!kycVerified && (
        <div style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)', border: '1px solid #FCD34D',
          borderRadius: 12, padding: '14px 20px', marginBottom: 16, display: 'flex',
          justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: '#92400E' }}>Complete Account Verification</h4>
              <p style={{ fontSize: 12, color: '#A16207' }}>Verify your identity to unlock full trading access</p>
            </div>
          </div>
          <button onClick={onOpenKYC} style={{ padding: '8px 18px', background: '#B45309', color: 'white',
            border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Verify Now →</button>
        </div>
      )}

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', marginBottom: 6 }}>Portfolio Value</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>₹8,47,230</div>
          <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: '#DCFCE7', color: '#16A34A' }}>▲ +17.05%</span>
        </div>
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', marginBottom: 6 }}>Today's P&L</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#16A34A' }}>+₹2,340</div>
          <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: '#DCFCE7', color: '#16A34A' }}>▲ +0.28%</span>
        </div>
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', marginBottom: 6 }}>Available Funds</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>₹{balance.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Top Gainers */}
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Top Gainers</h3>
      <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
        {gainers.map(s => (
          <div key={s.name} onClick={() => onTrade(s)} style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 100px', padding: '12px 16px',
            borderBottom: '1px solid #E2E8F0', cursor: 'pointer', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: 11 }}>{s.name.slice(0, 2)}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{s.full}</div>
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>₹{s.price}</div>
            <div style={{ fontSize: 12, color: '#64748B' }}>{s.vol}</div>
            <div style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 6,
              background: '#DCFCE7', color: '#16A34A', textAlign: 'center' }}>▲ {s.change}</div>
          </div>
        ))}
      </div>
    </div>
  )
}