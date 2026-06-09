import { useRef } from 'react'

export default function OTPInput({ length = 6, value, onChange }) {
  const inputs = useRef([])

  const handleChange = (idx, val) => {
    if (val.length > 1) val = val.slice(-1)
    const newOtp = value.split('')
    newOtp[idx] = val
    onChange(newOtp.join(''))

    // Auto-focus next
    if (val && idx < length - 1) {
      inputs.current[idx + 1]?.focus()
    }
  }

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus()
      const newOtp = value.split('')
      newOtp[idx - 1] = ''
      onChange(newOtp.join(''))
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    onChange(pasted.padEnd(length, ' ').slice(0, length))
    inputs.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', margin: '20px 0' }}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => inputs.current[i] = el}
          type="text"
          maxLength={1}
          value={value[i] || ''}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          style={{
            width: 48, height: 56, border: `2px solid ${value[i] ? '#16A34A' : '#E2E8F0'}`,
            borderRadius: 12, textAlign: 'center', fontSize: 22, fontWeight: 700,
            fontFamily: 'inherit', outline: 'none', background: value[i] ? '#DCFCE7' : 'white',
            transition: 'border-color 0.15s',
          }}
        />
      ))}
    </div>
  )
}