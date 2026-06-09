import { useState } from 'react'
import EmailInput from '../common/EmailInput'
import { validateEmail } from '../../utils/emailValidator'

export default function SignUp({ onLogin, onSignIn, showToast }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) { showToast('Please enter your full name'); return }
    const result = validateEmail(email)
    if (!result.valid) { showToast(result.message || 'Please enter a valid email'); return }
    if (password.length < 6) { showToast('Password must be at least 6 characters'); return }
    showToast('Account created successfully')
    onLogin(name.trim(), email.trim().toLowerCase())
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'linear-gradient(135deg, #0F172A, #1E293B, #0F172A)' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 80px' }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: 16 }}>
          Start investing<br /><span style={{ background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>with clarity.</span>
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 400, lineHeight: 1.6 }}>
          Open a demo trading account and explore stocks, funds, orders, and portfolio tools.
        </p>
      </div>

      <div style={{ width: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ background: 'white', borderRadius: 20, padding: 40, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: 16 }}>S</div>
            <span style={{ fontSize: 22, fontWeight: 700 }}>Saving<span style={{ color: '#2563EB' }}>Spot</span></span>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Create account</h2>
          <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>Set up your trading profile</p>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" style={inputStyle} />
          </div>
          <EmailInput value={email} onChange={setEmail} label="Email" />
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Create a password" style={inputStyle} />
          </div>

          <button onClick={handleSubmit} style={primaryButton}>Create Account</button>
          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#64748B' }}>
            Already have an account? <button type="button" onClick={onSignIn} style={{ color: '#2563EB', fontWeight: 600,
              cursor: 'pointer', border: 'none', background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 13 }}>Sign in</button>
          </p>
        </div>
      </div>
    </div>
  )
}

const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B',
  textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }

const inputStyle = { width: '100%', padding: '12px 14px', border: '1px solid #E2E8F0',
  borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none' }

const primaryButton = { width: '100%', padding: 14, border: 'none', borderRadius: 10,
  background: '#2563EB', color: 'white', fontSize: 15, fontWeight: 700,
  cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 }
