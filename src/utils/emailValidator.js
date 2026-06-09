const validDomains = ['gmail.com','yahoo.com','outlook.com','hotmail.com','icloud.com','protonmail.com','rediffmail.com','ymail.com','aol.com','zoho.com','live.com']

const typoMap = {
  'gmial.com': 'gmail.com', 'gmal.com': 'gmail.com', 'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmai.com': 'gmail.com',
  'yahooo.com': 'yahoo.com', 'hotmal.com': 'hotmail.com',
}

export function validateEmail(email) {
  const v = email.trim().toLowerCase()
  if (!v) return { valid: false, status: 'empty' }

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!regex.test(v)) return { valid: false, status: 'invalid', message: 'Enter a valid email address' }

  const [local, domain] = v.split('@')
  if (local.length < 3) return { valid: false, status: 'invalid', message: 'Email username is too short' }

  // Typo detection
  if (typoMap[domain]) {
    return {
      valid: false, status: 'typo',
      message: `Did you mean ${local}@${typoMap[domain]}?`,
      suggestion: `${local}@${typoMap[domain]}`
    }
  }

  // Gmail-specific rules
  if (domain === 'gmail.com') {
    if (local.startsWith('.') || local.endsWith('.') || local.includes('..'))
      return { valid: false, status: 'invalid', message: 'Invalid Gmail username format' }
    if (!/^[a-zA-Z0-9.]+$/.test(local))
      return { valid: false, status: 'invalid', message: 'Gmail only allows letters, numbers, and periods' }
    if (local.length < 6)
      return { valid: false, status: 'invalid', message: 'Gmail username is too short' }
  }

  if (validDomains.includes(domain)) {
    return { valid: true, status: 'verified', message: `Verified — ${domain} account` }
  }

  return { valid: true, status: 'valid', message: 'Email format valid' }
}

export function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000))
}