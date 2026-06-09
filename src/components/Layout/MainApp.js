import { useState } from 'react'
import TopNav from './TopNav'
import Dashboard from '../Dashboard/Dashboard'
import Markets from '../Markets/Markets'
import Portfolio from '../Portfolio/Portfolio'
import Orders from '../Orders/Orders'
import AIAssistant from '../AI/AIAssistant'
import Profile from '../Profile/Profile'
import Settings from '../Settings/Settings'

export default function MainApp({ user, onLogout, onTrade, onOpenKYC, showToast }) {
  const [page, setPage] = useState('dashboard')

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard onTrade={onTrade} onOpenKYC={onOpenKYC} showToast={showToast} setPage={setPage} />
      case 'markets': return <Markets onTrade={onTrade} />
      case 'portfolio': return <Portfolio onTrade={onTrade} />
      case 'orders': return <Orders />
      case 'ai': return <AIAssistant showToast={showToast} />
      case 'profile': return <Profile user={user} onOpenKYC={onOpenKYC} />
      case 'settings': return <Settings showToast={showToast} />
      default: return <Dashboard onTrade={onTrade} onOpenKYC={onOpenKYC} showToast={showToast} setPage={setPage} />
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopNav
        user={user}
        page={page}
        setPage={setPage}
        onLogout={onLogout}
        onOpenKYC={onOpenKYC}
        showToast={showToast}
      />
      <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px', paddingBottom: 72 }}>
        {renderPage()}
      </div>
    </div>
  )
}