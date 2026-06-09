import { useState } from 'react'
import EmailInput from '../common/EmailInput'
import OTPInput from '../common/OTPInput'
import { generateOTP, validateEmail } from '../../utils/emailValidator'

export default function ForgotPassword({ onBack, showToast }) {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [sentOtp, setSentOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [step, setStep] = useState('email')

  const sendOtp = () => {
    const result = validateEmail(email)
    if (!result.valid) { showToast(result.message || 'Please enter a valid email'); return }
    const code = generateOTP()
    setSentOtp(code)
    setStep('verify')
    showToast(`Verification code sent: ${code}`)
  }

  const verifyOtp = () => {
    if (otp.replace(/\s/g, '') !== sentOtp) { showToast('Enter the correct verification code'); return }
    setStep('reset')
  }

  const resetPassword = () => {
    if (newPassword.length < 6) { showToast('Password must be at least 6 characters'); return }
    showToast('Password reset successfully')
    onBack()
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0F172A, #1E293B, #0F172A)', padding: 24 }}>
      <div style={{ background: 'white', borderRadius: 20, padding: 40, width: '100%', maxWidth: 430,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
          <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: 16 }}>S</div>
          <span style={{ fontSize: 22, fontWeight: 700 }}>Saving<span style={{ color: '#2563EB' }}>Spot</span></span>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Reset password</h2>
        <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>
          {step === 'email' && 'Enter your account email to receive a verification code.'}
          {step === 'verify' && 'Enter the code sent to your email.'}
          {step === 'reset' && 'Create a new password for your account.'}
        </p>

        {step === 'email' && (
          <>
            <EmailInput value={email} onChange={setEmail} label="Account Email" />
            <button onClick={sendOtp} style={primaryButton}>Send Code</button>
          </>
        )}

        {step === 'verify' && (
          <>
            <OTPInput value={otp} onChange={setOtp} />
            <button onClick={verifyOtp} style={primaryButton}>Verify Code</button>
            <button onClick={sendOtp} style={secondaryButton}>Resend Code</button>
          </>
        )}

        {step === 'reset' && (
          <>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>New Password</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter a new password" style={inputStyle} />
            </div>
            <button onClick={resetPassword} style={primaryButton}>Reset Password</button>
          </>
        )}

        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: '#64748B' }}>
          Remembered it? <button type="button" onClick={onBack} style={{ color: '#2563EB', fontWeight: 600, cursor: 'pointer',
            border: 'none', background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 13 }}>Back to sign in</button>
        </p>
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

const secondaryButton = { width: '100%', padding: 12, border: '1px solid #E2E8F0', borderRadius: 10,
  background: 'white', color: '#2563EB', fontSize: 14, fontWeight: 700,
  cursor: 'pointer', fontFamily: 'inherit', marginTop: 10 }
