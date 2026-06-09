import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import ForgotPassword from './components/Auth/ForgotPassword'
import GooglePicker from './components/Auth/GooglePicker'
import MainApp from './components/Layout/MainApp'
import Toast from './components/common/Toast'
import KYCVerification from './components/KYC/KYCVerification'
import TradeModal from './components/Trade/TradeModal'

export default function App() {
  const [currentPage, setCurrentPage] = useState('signin') // signin | signup | forgot | app
  const [toast, setToast] = useState(null)
  const [showGoogle, setShowGoogle] = useState(false)
  const [showKYC, setShowKYC] = useState(false)
  const [showTrade, setShowTrade] = useState(false)
  const [tradeStock, setTradeStock] = useState(null)
  const [tradeSide, setTradeSide] = useState('BUY')
  const [user, setUser] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const handleLogin = (name, email) => {
    setUser({ name, email, initial: name.charAt(0).toUpperCase() })
    setCurrentPage('app')
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage('signin')
  }

  const openTrade = (stock, side = 'BUY') => {
    setTradeStock(stock)
    setTradeSide(side)
    setShowTrade(true)
  }

  return (
    <AppProvider>
      {toast && <Toast message={toast} />}

      {currentPage === 'signin' && (
        <SignIn
          onLogin={handleLogin}
          onSignUp={() => setCurrentPage('signup')}
          onForgot={() => setCurrentPage('forgot')}
          onGoogle={() => setShowGoogle(true)}
          showToast={showToast}
        />
      )}

      {currentPage === 'signup' && (
        <SignUp
          onLogin={handleLogin}
          onSignIn={() => setCurrentPage('signin')}
          showToast={showToast}
        />
      )}

      {currentPage === 'forgot' && (
        <ForgotPassword
          onBack={() => setCurrentPage('signin')}
          showToast={showToast}
        />
      )}

      {currentPage === 'app' && (
        <MainApp
          user={user}
          onLogout={handleLogout}
          onTrade={openTrade}
          onOpenKYC={() => setShowKYC(true)}
          showToast={showToast}
        />
      )}

      {showGoogle && (
        <GooglePicker
          onSelect={(name, email) => { setShowGoogle(false); handleLogin(name, email) }}
          onClose={() => setShowGoogle(false)}
          showToast={showToast}
        />
      )}

      {showKYC && (
        <KYCVerification
          onClose={() => setShowKYC(false)}
          showToast={showToast}
        />
      )}

      {showTrade && tradeStock && (
        <TradeModal
          stock={tradeStock}
          initialSide={tradeSide}
          onClose={() => setShowTrade(false)}
          showToast={showToast}
        />
      )}
    </AppProvider>
  )
}