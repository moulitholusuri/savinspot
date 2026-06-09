const accounts = [
  { name: 'Ananya Rao', email: 'ananya.rao@gmail.com', color: '#2563EB' },
  { name: 'Rahul Mehta', email: 'rahul.mehta@gmail.com', color: '#16A34A' },
  { name: 'Demo User', email: 'demo.user@gmail.com', color: '#7C3AED' },
]

export default function GooglePicker({ onSelect, onClose, showToast }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 250,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div style={{ width: 380, background: 'white', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700 }}>Choose an account</h3>
            <p style={{ fontSize: 12, color: '#64748B' }}>Continue to SavingSpot</p>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer' }}>x</button>
        </div>
        {accounts.map(account => (
          <button key={account.email} onClick={() => { showToast('Signed in with Google'); onSelect(account.name, account.email) }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 22px',
              border: 'none', borderBottom: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ width: 36, height: 36, borderRadius: '50%', background: account.color, color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              {account.name.charAt(0)}
            </span>
            <span>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>{account.name}</span>
              <span style={{ display: 'block', fontSize: 12, color: '#64748B' }}>{account.email}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
