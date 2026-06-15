import { useState } from 'react'
import logo from '../assets/logo.webp'

const PET_COLORS = [
  { color: '#4FACDE', label: 'Azul'    },
  { color: '#28A745', label: 'Verde'   },
  { color: '#F5A623', label: 'Laranja' },
  { color: '#EC4899', label: 'Rosa'    },
  { color: '#7C3AED', label: 'Roxo'    },
  { color: '#EF4444', label: 'Vermelho'},
]

export default function AuthPage({ onLogin }) {
  const [tab, setTab]               = useState('login')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass,  setLoginPass]  = useState('')
  const [loginError, setLoginError] = useState('')

  const [regName,     setRegName]     = useState('')
  const [regEmail,    setRegEmail]    = useState('')
  const [regPass,     setRegPass]     = useState('')
  const [regPetName,  setRegPetName]  = useState('')
  const [regPetColor, setRegPetColor] = useState('#4FACDE')
  const [regError,    setRegError]    = useState('')

  function handleLogin(e) {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('cp_users') || '[]')
    const user  = users.find(u => u.email === loginEmail && u.password === loginPass)
    if (!user) { setLoginError('E-mail ou senha incorretos.'); return }
    setLoginError('')
    localStorage.setItem('cp_logged', JSON.stringify(user))
    onLogin(user)
  }

  function handleRegister(e) {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('cp_users') || '[]')
    if (users.find(u => u.email === regEmail)) {
      setRegError('Este e-mail já está cadastrado.')
      return
    }
    const newUser = {
      name: regName, email: regEmail, password: regPass,
      petName: regPetName, petColor: regPetColor,
      ps: 9200, streak: 5,
      completedToday: {}, streakDays: [true,true,true,true,true,false,false],
      redeemedVouchers: [], unlockedPowers: [],
      pet: { hunger:100, hygiene:100, happiness:100, energy:100, lastTick: Date.now() },
    }
    users.push(newUser)
    localStorage.setItem('cp_users', JSON.stringify(users))
    localStorage.setItem('cp_logged', JSON.stringify(newUser))
    setRegError('')
    onLogin(newUser)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1B6DB8 0%, #145494 60%, #EBF3FB 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src={logo} alt="Care Plus" style={{ height: 48, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 6 }}>Sua saúde em jogo</p>
        </div>

        {/* Card */}
        <div style={{ background: 'white', borderRadius: 24, padding: '28px 24px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', background: '#F0F4F8', borderRadius: 12, padding: 4, marginBottom: 24 }}>
            {['login', 'register'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1, padding: '10px', border: 'none', borderRadius: 10,
                  fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                  background: tab === t ? 'white' : 'transparent',
                  color:      tab === t ? '#1B6DB8' : '#6B7E91',
                  boxShadow:  tab === t ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {t === 'login' ? 'Entrar' : 'Cadastrar'}
              </button>
            ))}
          </div>

          {/* LOGIN */}
          {tab === 'login' && (
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>E-mail</label>
                <input style={inputStyle} type="email" placeholder="seu@email.com" required
                  value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Senha</label>
                <input style={inputStyle} type="password" placeholder="••••••••" required
                  value={loginPass} onChange={e => setLoginPass(e.target.value)} />
              </div>
              {loginError && <div style={errorStyle}>{loginError}</div>}
              <button type="submit" style={btnStyle}>Entrar</button>
              <p style={switchStyle}>
                Não tem conta?{' '}
                <span onClick={() => setTab('register')} style={switchLinkStyle}>Cadastre-se</span>
              </p>
            </form>
          )}

          {/* CADASTRO */}
          {tab === 'register' && (
            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Nome completo</label>
                <input style={inputStyle} type="text" placeholder="Seu nome" required
                  value={regName} onChange={e => setRegName(e.target.value)} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>E-mail</label>
                <input style={inputStyle} type="email" placeholder="seu@email.com" required
                  value={regEmail} onChange={e => setRegEmail(e.target.value)} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Senha</label>
                <input style={inputStyle} type="password" placeholder="Mínimo 6 caracteres" minLength={6} required
                  value={regPass} onChange={e => setRegPass(e.target.value)} />
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #D6E4F0', margin: '16px 0' }} />
              <p style={{ fontSize: 13, fontWeight: 800, color: '#1B6DB8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
                Seu Pet
              </p>

              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Nome do pet</label>
                <input style={inputStyle} type="text" placeholder="Ex: Bolinha" required
                  value={regPetName} onChange={e => setRegPetName(e.target.value)} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Cor do pet</label>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
                  {PET_COLORS.map(({ color, label }) => (
                    <button
                      key={color}
                      type="button"
                      title={label}
                      onClick={() => setRegPetColor(color)}
                      style={{
                        width: 36, height: 36,
                        borderRadius: '50%',
                        background: color,
                        border: regPetColor === color ? '3px solid #1A2B3C' : '3px solid transparent',
                        cursor: 'pointer',
                        transform: regPetColor === color ? 'scale(1.15)' : 'scale(1)',
                        transition: 'all 0.2s',
                      }}
                    />
                  ))}
                </div>
              </div>

              {regError && <div style={errorStyle}>{regError}</div>}
              <button type="submit" style={btnStyle}>Criar conta</button>
              <p style={switchStyle}>
                Já tem conta?{' '}
                <span onClick={() => setTab('login')} style={switchLinkStyle}>Entrar</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block', fontSize: 12, fontWeight: 700,
  color: '#1A2B3C', marginBottom: 6,
  textTransform: 'uppercase', letterSpacing: '0.05em',
}

const inputStyle = {
  width: '100%', padding: '12px 14px',
  border: '1.5px solid #D6E4F0', borderRadius: 12,
  fontSize: 14, color: '#1A2B3C', outline: 'none',
  fontFamily: 'inherit', boxSizing: 'border-box',
}

const errorStyle = {
  background: '#FEF2F2', border: '1px solid rgba(239,68,68,0.25)',
  color: '#EF4444', fontSize: 12, fontWeight: 600,
  padding: '10px 14px', borderRadius: 10, marginBottom: 12,
}

const btnStyle = {
  width: '100%', padding: 14, borderRadius: 12, border: 'none',
  background: 'linear-gradient(135deg, #1B6DB8, #145494)',
  color: 'white', fontSize: 15, fontWeight: 800,
  cursor: 'pointer', marginTop: 4, fontFamily: 'inherit',
}

const switchStyle = {
  textAlign: 'center', fontSize: 13,
  color: '#6B7E91', marginTop: 16, marginBottom: 0,
}

const switchLinkStyle = {
  color: '#1B6DB8', fontWeight: 700,
  cursor: 'pointer', textDecoration: 'underline',
}