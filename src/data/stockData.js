export const indices = [
  { name: 'NIFTY 50', value: '24,346.70', change: '+128.35', pct: '+0.53%', up: true, data: [24100,24180,24050,24220,24280,24200,24346] },
  { name: 'SENSEX', value: '80,218.37', change: '+410.56', pct: '+0.51%', up: true, data: [79600,79850,79700,80000,80150,79900,80218] },
  { name: 'BANK NIFTY', value: '52,437.80', change: '-142.30', pct: '-0.27%', up: false, data: [52600,52500,52550,52400,52480,52500,52437] },
  { name: 'NIFTY IT', value: '36,892.15', change: '+245.80', pct: '+0.67%', up: true, data: [36500,36600,36550,36700,36800,36750,36892] },
]

export const stocksData = [
  { name: 'RELIANCE', full: 'Reliance Industries', price: '2,945.50', change: '+1.24%', up: true, color: '#2563EB', cat: 'nifty50', vol: '12.4M', pe: '28.3', mcap: '19.9L Cr' },
  { name: 'TCS', full: 'Tata Consultancy Services', price: '3,842.70', change: '+0.87%', up: true, color: '#7C3AED', cat: 'nifty50,it', vol: '4.2M', pe: '32.1', mcap: '13.9L Cr' },
  { name: 'HDFCBANK', full: 'HDFC Bank Ltd', price: '1,724.35', change: '-0.42%', up: false, color: '#DC2626', cat: 'nifty50,banknifty', vol: '8.7M', pe: '19.8', mcap: '13.1L Cr' },
  { name: 'INFY', full: 'Infosys Ltd', price: '1,567.80', change: '+2.13%', up: true, color: '#2563EB', cat: 'nifty50,it', vol: '9.1M', pe: '27.6', mcap: '6.5L Cr' },
  { name: 'ICICIBANK', full: 'ICICI Bank Ltd', price: '1,298.45', change: '+0.56%', up: true, color: '#EA580C', cat: 'nifty50,banknifty', vol: '6.3M', pe: '18.4', mcap: '9.1L Cr' },
  { name: 'BHARTIARTL', full: 'Bharti Airtel Ltd', price: '1,824.90', change: '+1.78%', up: true, color: '#DC2626', cat: 'nifty50', vol: '3.8M', pe: '75.2', mcap: '10.8L Cr' },
  { name: 'ITC', full: 'ITC Ltd', price: '438.25', change: '-0.31%', up: false, color: '#16A34A', cat: 'nifty50', vol: '15.2M', pe: '25.9', mcap: '5.4L Cr' },
  { name: 'SBIN', full: 'State Bank of India', price: '812.60', change: '+0.93%', up: true, color: '#2563EB', cat: 'nifty50,banknifty', vol: '11.8M', pe: '10.2', mcap: '7.2L Cr' },
  { name: 'BAJFINANCE', full: 'Bajaj Finance Ltd', price: '8,234.55', change: '+1.45%', up: true, color: '#7C3AED', cat: 'nifty50', vol: '2.1M', pe: '35.7', mcap: '5.1L Cr' },
  { name: 'WIPRO', full: 'Wipro Ltd', price: '478.30', change: '-0.68%', up: false, color: '#059669', cat: 'nifty50,it', vol: '5.6M', pe: '22.4', mcap: '2.5L Cr' },
  { name: 'TATAMOTORS', full: 'Tata Motors Ltd', price: '724.15', change: '+2.87%', up: true, color: '#1E40AF', cat: 'nifty50,midcap', vol: '18.4M', pe: '8.1', mcap: '2.6L Cr' },
  { name: 'SUNPHARMA', full: 'Sun Pharma Industries', price: '1,892.40', change: '+1.02%', up: true, color: '#EA580C', cat: 'nifty50,pharma', vol: '3.2M', pe: '38.5', mcap: '4.5L Cr' },
]

export const initialHoldings = [
  { name: 'RELIANCE', qty: 15, avg: 2680, color: '#2563EB' },
  { name: 'TCS', qty: 8, avg: 3520, color: '#7C3AED' },
  { name: 'HDFCBANK', qty: 20, avg: 1580, color: '#DC2626' },
  { name: 'INFY', qty: 25, avg: 1420, color: '#2563EB' },
  { name: 'ITC', qty: 100, avg: 460, color: '#16A34A' },
  { name: 'SBIN', qty: 30, avg: 750, color: '#2563EB' },
  { name: 'TATAMOTORS', qty: 40, avg: 620, color: '#1E40AF' },
  { name: 'BAJFINANCE', qty: 5, avg: 7800, color: '#7C3AED' },
]

export const initialOrders = [
  { stock: 'INFY', type: 'BUY', status: 'Executed', qty: 10, price: 1535, time: '09:42 AM' },
  { stock: 'RELIANCE', type: 'BUY', status: 'Executed', qty: 5, price: 2920, time: '10:15 AM' },
  { stock: 'HDFCBANK', type: 'SELL', status: 'Pending', qty: 10, price: 1740, time: '11:30 AM' },
  { stock: 'TCS', type: 'BUY', status: 'Executed', qty: 3, price: 3810, time: '01:22 PM' },
]

export const mutualFunds = [
  { name: 'Axis Bluechip Fund', tag: 'Equity', y1: '18.4%', y3: '14.2%', y5: '16.8%' },
  { name: 'HDFC Mid-Cap Opportunities', tag: 'Equity', y1: '24.6%', y3: '19.8%', y5: '21.3%' },
  { name: 'SBI Small Cap Fund', tag: 'Equity', y1: '32.1%', y3: '22.4%', y5: '26.7%' },
  { name: 'ICICI Pru Corporate Bond', tag: 'Debt', y1: '7.8%', y3: '7.2%', y5: '8.1%' },
  { name: 'Kotak Balanced Advantage', tag: 'Hybrid', y1: '14.2%', y3: '12.6%', y5: '13.8%' },
]