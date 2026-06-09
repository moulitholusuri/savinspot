import { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function KYCVerification({ onClose, showToast }) {
  const { setKycVerified } = useApp()
  const [pan, setPan] = useState('')
  const [aadhaar, setAadhaar] = useState('')

  const submit = () => {
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase())) { showToast('Enter a valid PAN'); return }
    if (!/^\d{12}$/.test(aadhaar)) { showToast('Enter a valid 12 digit Aadhaar number'); return }
    setKycVerified(true)
    showToast('KYC verification completed')
    onClose()
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 260,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div style={{ width: 460, background: 'white', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Account verification</h3>
            <p style={{ fontSize: 12, color: '#64748B' }}>Complete KYC to unlock full trading access</p>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer' }}>x</button>
        </div>
        <div style={{ padding: 24 }}>
          <label style={labelStyle}>PAN</label>
          <input value={pan} onChange={e => setPan(e.target.value.toUpperCase())} placeholder="ABCDE1234F" maxLength={10} style={inputStyle} />
          <label style={{ ...labelStyle, marginTop: 16 }}>Aadhaar Number</label>
          <input value={aadhaar} onChange={e => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
            placeholder="12 digit number" style={inputStyle} />
          <button onClick={submit} style={{ width: '100%', padding: 14, border: 'none', borderRadius: 10,
            background: '#2563EB', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', marginTop: 22 }}>Submit Verification</button>
        </div>
      </div>
    </div>
  )
}

const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B',
  textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }

const inputStyle = { width: '100%', padding: '12px 14px', border: '1px solid #E2E8F0',
  borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none' }
