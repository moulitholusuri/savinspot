import { useEffect, useState } from 'react'

export default function Toast({ message }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2300)
    return () => clearTimeout(timer)
  }, [message])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', top: 70, left: '50%', transform: 'translateX(-50%)',
      background: '#0F172A', color: 'white', padding: '12px 24px', borderRadius: 10,
      fontSize: 13, fontWeight: 600, zIndex: 9999, boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
      animation: 'fadeIn 0.3s ease',
    }}>
      {message}
    </div>
  )
}