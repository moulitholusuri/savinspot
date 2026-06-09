import { useApp } from '../../context/AppContext'
import { indices } from '../../data/stockData'

export default function Markets({ onTrade }) {
  const { stocks } = useApp()

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Markets</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 22 }}>
        {indices.map(index => (
          <div key={index.name} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 700 }}>{index.name}</div>
            <div style={{ fontSize: 22, fontWeight: 800, margin: '4px 0' }}>{index.value}</div>
            <div style={{ fontSize: 12, color: index.up ? '#16A34A' : '#DC2626', fontWeight: 700 }}>
              {index.up ? '▲' : '▼'} {index.change} ({index.pct})
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
        {stocks.map(stock => (
          <div key={stock.name} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 120px',
            gap: 12, alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: stock.color, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                {stock.name.slice(0, 2)}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{stock.name}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{stock.full}</div>
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>₹{stock.price}</div>
            <div style={{ fontSize: 12, color: stock.up ? '#16A34A' : '#DC2626', fontWeight: 700 }}>{stock.change}</div>
            <div style={{ fontSize: 12, color: '#64748B' }}>{stock.vol}</div>
            <button onClick={() => onTrade(stock)} style={{ padding: '8px 12px', border: 'none', borderRadius: 8,
              background: '#2563EB', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Trade</button>
          </div>
        ))}
      </div>
    </div>
  )
}
