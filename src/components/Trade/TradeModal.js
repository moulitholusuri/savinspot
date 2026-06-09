import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { formatINR, parsePrice } from '../../utils/formatters'

export default function TradeModal({ stock, initialSide, onClose, showToast }) {
  const { balance, updateBalance, addOrder, addHolding, reduceHolding } = useApp()
  const [side, setSide] = useState(initialSide)
  const [orderType, setOrderType] = useState('MARKET')
  const [qty, setQty] = useState(1)
  const [limitPrice, setLimitPrice] = useState(parsePrice(stock.price))

  const price = orderType === 'MARKET' ? parsePrice(stock.price) : limitPrice
  const total = qty * price
  const canSubmit = side === 'SELL' || total <= balance

  const handleSubmit = () => {
    if (!canSubmit) return
    const isMarket = orderType === 'MARKET'
    const now = new Date()
    const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()

    addOrder({ stock: stock.name, type: side, status: isMarket ? 'Executed' : 'Pending', qty, price, time })

    if (side === 'BUY') {
      updateBalance(-total)
      if (isMarket) addHolding(stock.name, qty, price, stock.color)
    } else {
      updateBalance(total)
      if (isMarket) reduceHolding(stock.name, qty)
    }

    onClose()
    showToast(`${side} order ${isMarket ? 'executed' : 'placed'} for ${stock.name}`)
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 300,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ background: 'white', borderRadius: 16, width: 440, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid #E2E8F0' }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700 }}>{stock.name}</h3>
            <p style={{ fontSize: 12, color: '#64748B' }}>NSE · {stock.full} · ₹{stock.price}</p>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid #E2E8F0', background: '#F5F6FA', cursor: 'pointer', fontSize: 14 }}>✕</button>
        </div>

        {/* Balance */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 24px', background: '#EFF6FF', fontSize: 12, fontWeight: 600, color: '#2563EB' }}>
          <span>AVAILABLE BALANCE</span>
          <span style={{ fontSize: 14 }}>₹{balance.toLocaleString('en-IN')}</span>
        </div>

        <div style={{ padding: '18px 24px' }}>
          {/* Buy/Sell Toggle */}
          <div style={{ display: 'flex', background: '#F5F6FA', borderRadius: 10, padding: 3, gap: 3, marginBottom: 16 }}>
            {['BUY', 'SELL'].map(s => (
              <button key={s} onClick={() => setSide(s)} style={{
                flex: 1, padding: 10, border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit', color: side === s ? 'white' : '#64748B',
                background: side === s ? (s === 'BUY' ? '#16A34A' : '#DC2626') : 'transparent',
              }}>{s}</button>
            ))}
          </div>

          {/* Order Type */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['MARKET', 'LIMIT', 'SL'].map(t => (
              <button key={t} onClick={() => setOrderType(t)} style={{
                padding: '6px 14px', fontSize: 12, fontWeight: 600, borderRadius: 8,
                border: `1px solid ${orderType === t ? '#2563EB' : '#E2E8F0'}`,
                background: orderType === t ? '#DBEAFE' : 'white',
                color: orderType === t ? '#2563EB' : '#64748B', cursor: 'pointer',
              }}>{t === 'SL' ? 'Stop Loss' : t.charAt(0) + t.slice(1).toLowerCase()}</button>
            ))}
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 5 }}>Quantity</label>
            <div style={{ display: 'flex', border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 40, height: 42, border: 'none', background: '#F5F6FA', fontSize: 18, cursor: 'pointer' }}>−</button>
              <input type="number" value={qty} onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ flex: 1, border: 'none', fontSize: 15, fontWeight: 600, textAlign: 'center', outline: 'none' }} />
              <button onClick={() => setQty(qty + 1)} style={{ width: 40, height: 42, border: 'none', background: '#F5F6FA', fontSize: 18, cursor: 'pointer' }}>+</button>
            </div>
          </div>

          {/* Limit Price */}
          {orderType !== 'MARKET' && (
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', marginBottom: 5 }}>Price</label>
              <div style={{ display: 'flex', border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden', alignItems: 'center' }}>
                <span style={{ paddingLeft: 14, fontSize: 15, fontWeight: 600, color: '#64748B' }}>₹</span>
                <input type="number" value={limitPrice} onChange={e => setLimitPrice(parseFloat(e.target.value) || 0)}
                  step="0.05" style={{ flex: 1, border: 'none', fontSize: 15, fontWeight: 600, padding: 10, outline: 'none' }} />
              </div>
            </div>
          )}

          {/* Summary */}
          <div style={{ background: '#F5F6FA', borderRadius: 10, padding: 14, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: 13 }}>
              <span style={{ color: '#64748B' }}>Price/share</span>
              <span style={{ fontWeight: 600 }}>₹{formatINR(price)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: 13 }}>
              <span style={{ color: '#64748B' }}>Quantity</span>
              <span style={{ fontWeight: 600 }}>{qty}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: 13 }}>
              <span style={{ color: '#64748B' }}>Brokerage</span>
              <span style={{ fontWeight: 600 }}>₹0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0 0', marginTop: 6,
              borderTop: '1px solid #E2E8F0', fontSize: 13 }}>
              <span style={{ fontWeight: 600 }}>Estimated Value</span>
              <span style={{ fontSize: 16, fontWeight: 700 }}>₹{formatINR(total)}</span>
            </div>
          </div>

          {/* Place Order */}
          <button onClick={handleSubmit} disabled={!canSubmit} style={{
            width: '100%', padding: 14, border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700,
            cursor: canSubmit ? 'pointer' : 'not-allowed', color: 'white',
            background: side === 'BUY' ? '#16A34A' : '#DC2626',
            opacity: canSubmit ? 1 : 0.5,
          }}>
            PLACE {side} ORDER · ₹{formatINR(total)}
          </button>
        </div>
      </div>
    </div>
  )
}