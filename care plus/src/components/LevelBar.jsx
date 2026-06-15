import { useEffect, useState } from 'react'
import { IconShield, IconTrophy } from './Icons'

const ICONS = { shield: IconShield, trophy: IconTrophy }

export default function LevelBar({ ps, levelInfo }) {
  const [barWidth, setBarWidth] = useState(0)
  useEffect(() => { const t = setTimeout(() => setBarWidth(levelInfo.progress), 120); return () => clearTimeout(t) }, [levelInfo.progress])

  const { current, next } = levelInfo
  const LevelIcon = ICONS[current.icon] || IconShield

  return (
    <div style={{ margin: '0 16px 16px', background: 'white', border: '1px solid #D6E4F0', borderRadius: 16, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: current.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LevelIcon size={22} color={current.color} />
          </div>
          <div>
            <p style={{ fontSize: 11, color: '#6B7E91', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Seu nível</p>
            <p style={{ fontSize: 17, fontWeight: 800, color: current.color, lineHeight: 1 }}>{current.name}</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 11, color: '#6B7E91', marginBottom: 2 }}>{next ? `Próximo: ${next.name}` : 'Nível máximo'}</p>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#1A2B3C' }}>
            {ps.toLocaleString('pt-BR')}{next && <span style={{ color: '#6B7E91', fontWeight: 400 }}> / {next.minPS.toLocaleString('pt-BR')} PS</span>}
          </p>
        </div>
      </div>

      <div style={{ height: 10, background: '#F0F4F8', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 999, width: `${barWidth}%`, background: `linear-gradient(90deg, ${current.color}, ${next ? next.color : current.color})`, transition: 'width 1.2s ease' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: '#6B7E91' }}>{current.name}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#6B7E91' }}>{levelInfo.progress}%</span>
      </div>

      <div style={{ marginTop: 12, background: '#F0F4F8', borderRadius: 12, padding: '8px 12px' }}>
        <p style={{ fontSize: 11, color: '#6B7E91' }}>Benefício atual</p>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#1A2B3C', marginTop: 2 }}>
          <span style={{ color: '#F5A623', fontWeight: 800 }}>{current.discount} de desconto</span> — {current.benefit}
        </p>
      </div>
    </div>
  )
}