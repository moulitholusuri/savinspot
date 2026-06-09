import { useState } from 'react'
import EmailInput from '../common/EmailInput'
import { validateEmail } from '../../utils/emailValidator'

export default function SignIn({ onLogin, onSignUp, onForgot, onGoogle, showToast }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (!email) { showToast('Please enter your email'); return }
    const result = validateEmail(email)
    if (!result.valid) { showToast('Please enter a valid email'); return }
    if (!password) { showToast('Please enter your password'); return }
    if (password.length < 6) { showToast('Password must be at least 6 characters'); return }

    const name = email.split('@')[0]
    onLogin(name.charAt(0).toUpperCase() + name.slice(1), email)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'linear-gradient(135deg, #0F172A, #1E293B, #0F172A)' }}>
      {/* Left side - branding */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 80px' }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: 16 }}>
          Invest Smarter.<br />
          <span style={{ background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Trade Faster.</span>
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 400, lineHeight: 1.6 }}>
          India's next-generation investment platform. Stocks, Mutual Funds, IPOs, ETFs, and Gold — all in one place.
        </p>
      </div>

      {/* Right side - form */}
      <div style={{ width: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ background: 'white', borderRadius: 20, padding: 40, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: 16 }}>S</div>
            <span style={{ fontSize: 22, fontWeight: 700 }}>Saving<span style={{ color: '#2563EB' }}>Spot</span></span>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Welcome back</h2>
          <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>Sign in to your trading account</p>

          <EmailInput value={email} onChange={setEmail} label="Email or Client ID" />

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B',
              textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: '100%', padding: '12px 14px', border: '1px solid #E2E8F0',
                borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0' }}>
            <label style={{ fontSize: 13, color: '#64748B', display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" defaultChecked /> Remember me
            </label>
            <a onClick={onForgot} style={{ fontSize: 13, color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>
              Forgot password?
            </a>
          </div>

          <button onClick={handleSubmit} style={{
            width: '100%', padding: 14, border: 'none', borderRadius: 10,
            background: '#2563EB', color: 'white', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit', marginTop: 8,
          }}>Sign In</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', color: '#64748B', fontSize: 12 }}>
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
            or continue with
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onGoogle} style={{
              flex: 1, padding: 11, border: '1px solid #E2E8F0', borderRadius: 10,
              background: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>📱 Google</button>
            <button onClick={() => { showToast('Biometric authentication...'); setTimeout(() => onLogin('User', 'user@gmail.com'), 1500) }}
              style={{ flex: 1, padding: 11, border: '1px solid #E2E8F0', borderRadius: 10,
              background: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              🔑 Biometric
            </button>
          </div>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#64748B' }}>
            Don't have an account? <a onClick={onSignUp} style={{ color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>Create Account</a>
          </p>
        </div>
      </div>
    </div>
  )
}