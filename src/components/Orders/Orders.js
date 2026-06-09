import { useApp } from '../../context/AppContext'
import { formatINR } from '../../utils/formatters'

export default function Orders() {
  const { orders } = useApp()

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Orders</h2>
      <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
        {orders.map((order, index) => (
          <div key={`${order.stock}-${order.time}-${index}`} style={{ display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr', gap: 12, alignItems: 'center',
            padding: '14px 18px', borderBottom: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{order.stock}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: order.type === 'BUY' ? '#16A34A' : '#DC2626' }}>{order.type}</div>
            <div style={{ fontSize: 13 }}>{order.qty}</div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>₹{formatINR(order.price)}</div>
            <div style={{ fontSize: 12, color: order.status === 'Executed' ? '#16A34A' : '#D97706', fontWeight: 700 }}>{order.status}</div>
            <div style={{ fontSize: 12, color: '#64748B' }}>{order.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
