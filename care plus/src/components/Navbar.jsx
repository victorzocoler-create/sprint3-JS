import logo from '../assets/logo.webp'
import { IconFlame } from './Icons'

export default function Navbar({ ps, streak }) {
  return (
    <header style={{
      flexShrink: 0,
      background: '#1B6DB8',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px' }}>

        {/* Logo */}
        <img
          src={logo}
          alt="Care Plus"
          style={{ height: 36, objectFit: 'contain' }}
        />

        {/* Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '5px 12px' }}>
            <IconFlame size={14} color="#F5A623" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{streak} dias</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '5px 12px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F5A623' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{ps.toLocaleString('pt-BR')} PS</span>
          </div>
        </div>

      </div>
    </header>
  )
}