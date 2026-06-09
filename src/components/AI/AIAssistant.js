import { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function AIAssistant({ showToast }) {
  const { stocks } = useApp()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('Ask about watchlists, risk, or market movers.')

  const ask = () => {
    if (!question.trim()) { showToast('Enter a question for the assistant'); return }
    const top = stocks.filter(stock => stock.up).slice(0, 3).map(stock => stock.name).join(', ')
    setAnswer(`Based on the demo market data, strength is concentrated in ${top}. Review allocation and risk before placing orders.`)
  }

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>AI Assistant</h2>
      <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: 20, maxWidth: 760 }}>
        <div style={{ minHeight: 120, background: '#F8FAFC', borderRadius: 10, padding: 16, fontSize: 14, color: '#334155', lineHeight: 1.6, marginBottom: 16 }}>
          {answer}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input value={question} onChange={e => setQuestion(e.target.value)}
            placeholder="Ask about your portfolio or market data" style={{ flex: 1, padding: '12px 14px',
              border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, outline: 'none' }} />
          <button onClick={ask} style={{ padding: '0 18px', border: 'none', borderRadius: 10,
            background: '#2563EB', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Ask</button>
        </div>
      </div>
    </div>
  )
}
