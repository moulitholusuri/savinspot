import { useState, useEffect, useRef } from 'react'
import { validateEmail } from '../../utils/emailValidator'

export default function EmailInput({ value, onChange, label = 'Email' }) {
  const [hint, setHint] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!value) { setHint(null); return }

    const basicResult = validateEmail(value)
    if (!basicResult.valid && basicResult.status !== 'empty') {
      setHint(basicResult)
      return
    }

    // Simulate async verification
    setHint({ status: 'verifying', message: 'Verifying account...' })
    timerRef.current = setTimeout(() => {
      setHint(validateEmail(value))
    }, 800)
  }, [value])

  const borderColor = !hint ? '#E2E8F0'
    : hint.status === 'verifying' ? '#2563EB'
    : hint.valid ? '#16A34A' : '#DC2626'

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B',
        textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>{label}</label>
      <input
        type="email"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="you@example.com"
        style={{
          width: '100%', padding: '12px 14px', border: `1px solid ${borderColor}`,
          borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none',
          transition: 'border-color 0.15s',
        }}
      />
      {hint && hint.status !== 'empty' && (
        <div style={{
          fontSize: 11, marginTop: 4, display: 'flex', alignItems: 'center', gap: 5,
          color: hint.status === 'verifying' ? '#2563EB'
            : hint.valid ? '#16A34A' : '#DC2626',
        }}>
          {hint.status === 'verifying' && '⏳ '}
          {hint.valid && '✓ '}
          {!hint.valid && hint.status !== 'verifying' && '⚠ '}
          {hint.message}
          {hint.suggestion && (
            <button type="button" style={{ color: '#2563EB', fontWeight: 600, cursor: 'pointer', marginLeft: 4,
              border: 'none', background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 11 }}
              onClick={() => onChange(hint.suggestion)}>
              Fix it
            </button>
          )}
        </div>
      )}
    </div>
  )
}
