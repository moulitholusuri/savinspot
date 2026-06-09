import { useApp } from '../../context/AppContext'
import { parsePrice, formatINR } from '../../utils/formatters'

export default function Portfolio({ onTrade }) {
  const { holdings, stocks } = useApp()

  const rows = holdings.map(holding => {
    const stock = stocks.find(item => item.name === holding.name)
    const current = stock ? parsePrice(stock.price) : holding.avg
    const invested = holding.qty * holding.avg
    const value = holding.qty * current
    const pnl = value - invested
    return { ...holding, stock, current, invested, value, pnl }
  })

  const totalValue = rows.reduce((sum, row) => sum + row.value, 0)
  const totalPnl = rows.reduce((sum, row) => sum + row.pnl, 0)

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Portfolio</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div style={summaryCard}>
          <div style={summaryLabel}>Current Value</div>
          <div style={summaryValue}>₹{formatINR(totalValue)}</div>
        </div>
        <div style={summaryCard}>
          <div style={summaryLabel}>Total P&L</div>
          <div style={{ ...summaryValue, color: totalPnl >= 0 ? '#16A34A' : '#DC2626' }}>₹{formatINR(totalPnl)}</div>
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
        {rows.map(row => (
          <div key={row.name} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 120px',
            gap: 12, alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: row.color, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                {row.name.slice(0, 2)}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{row.name}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{row.qty} shares</div>
              </div>
            </div>
            <div style={cell}>₹{formatINR(row.avg)}</div>
            <div style={cell}>₹{formatINR(row.current)}</div>
            <div style={cell}>₹{formatINR(row.value)}</div>
            <div style={{ ...cell, color: row.pnl >= 0 ? '#16A34A' : '#DC2626' }}>₹{formatINR(row.pnl)}</div>
            <button onClick={() => row.stock && onTrade(row.stock, 'SELL')} style={{ padding: '8px 12px',
              border: 'none', borderRadius: 8, background: '#DC2626', color: 'white',
              fontSize: 12, fontWeight: 700, cursor: row.stock ? 'pointer' : 'not-allowed', opacity: row.stock ? 1 : 0.5 }}>
              Sell
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const summaryCard = { background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: 18 }
const summaryLabel = { fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 6 }
const summaryValue = { fontSize: 24, fontWeight: 800 }
const cell = { fontSize: 13, fontWeight: 700 }
