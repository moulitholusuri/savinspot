import { useState } from 'react'

export default function Settings({ showToast }) {
  const [alerts, setAlerts] = useState(true)
  const [biometric, setBiometric] = useState(false)

  const save = () => showToast('Settings saved')

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Settings</h2>
      <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: 22, maxWidth: 560 }}>
        <SettingRow label="Price alerts" description="Receive alerts for watchlist and holding changes" value={alerts} onChange={setAlerts} />
        <SettingRow label="Biometric login" description="Enable biometric prompt on supported devices" value={biometric} onChange={setBiometric} />
        <button onClick={save} style={{ padding: '11px 18px', border: 'none', borderRadius: 10,
          background: '#2563EB', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 18 }}>
          Save Settings
        </button>
      </div>
    </div>
  )
}

function SettingRow({ label, description, value, onChange }) {
  return (
    <label style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center',
      padding: '14px 0', borderBottom: '1px solid #E2E8F0', cursor: 'pointer' }}>
      <span>
        <span style={{ display: 'block', fontSize: 14, fontWeight: 800 }}>{label}</span>
        <span style={{ display: 'block', fontSize: 12, color: '#64748B', marginTop: 2 }}>{description}</span>
      </span>
      <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} />
    </label>
  )
}
