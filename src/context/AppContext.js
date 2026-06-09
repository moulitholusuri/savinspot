import { createContext, useContext, useState } from 'react'
import { stocksData, initialHoldings, initialOrders } from '../data/stockData'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [holdings, setHoldings] = useState(initialHoldings)
  const [orders, setOrders] = useState(initialOrders)
  const [balance, setBalance] = useState(245000)
  const [kycVerified, setKycVerified] = useState(false)

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev])
  }

  const updateBalance = (amount) => {
    setBalance(prev => prev + amount)
  }

  const addHolding = (name, qty, price, color) => {
    setHoldings(prev => {
      const existing = prev.find(h => h.name === name)
      if (existing) {
        const oldTotal = existing.qty * existing.avg
        const newQty = existing.qty + qty
        return prev.map(h =>
          h.name === name
            ? { ...h, qty: newQty, avg: (oldTotal + qty * price) / newQty }
            : h
        )
      }
      return [...prev, { name, qty, avg: price, color }]
    })
  }

  const reduceHolding = (name, qty) => {
    setHoldings(prev => {
      const updated = prev.map(h =>
        h.name === name ? { ...h, qty: h.qty - qty } : h
      )
      return updated.filter(h => h.qty > 0)
    })
  }

  return (
    <AppContext.Provider value={{
      stocks: stocksData,
      holdings, setHoldings,
      orders, addOrder,
      balance, updateBalance,
      kycVerified, setKycVerified,
      addHolding, reduceHolding,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)