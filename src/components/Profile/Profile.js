import { useApp } from '../../context/AppContext'

export default function Profile({ user, onOpenKYC }) {
  const { kycVerified } = useApp()

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Profile</h2>
      <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: 22, maxWidth: 560 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 58, height: 58, borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800 }}>
            {user?.initial || 'U'}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{user?.name || 'User'}</div>
            <div style={{ fontSize: 13, color: '#64748B' }}>{user?.email || 'user@example.com'}</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#F8FAFC', borderRadius: 10, padding: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>KYC STATUS</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: kycVerified ? '#16A34A' : '#D97706' }}>
              {kycVerified ? 'Verified' : 'Pending verification'}
            </div>
          </div>
          {!kycVerified && (
            <button onClick={onOpenKYC} style={{ padding: '9px 14px', border: 'none', borderRadius: 8,
              background: '#2563EB', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Verify</button>
          )}
        </div>
      </div>
    </div>
  )
}
