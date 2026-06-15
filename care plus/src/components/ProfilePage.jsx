import { BADGES, getLevelInfo } from './gameData'
import SectionTitle from './SectionTitle'
import { IconShield, IconTrophy, IconCheckup, IconWalk, IconBrain, IconWater, IconMedal, IconPerson, IconFlame, IconLock } from './Icons'

const ICONS = { shield: IconShield, checkup: IconCheckup, walk: IconWalk, trophy: IconTrophy, brain: IconBrain, water: IconWater, medal: IconMedal, person: IconPerson }

const HISTORY = [
  { desc: 'Agendou check-up anual',    ps: 500, Icon: IconCheckup, color: '#1B6DB8', date: 'Hoje'  },
  { desc: 'Caminhou 30 minutos',       ps: 80,  Icon: IconWalk,    color: '#28A745', date: 'Ontem' },
  { desc: 'Bebeu 2L de água',          ps: 50,  Icon: IconWater,   color: '#0EA5E9', date: 'Ontem' },
  { desc: 'Registrou vacinação',       ps: 300, Icon: IconShield,  color: '#7C3AED', date: '15/05' },
  { desc: 'Jogo da memória concluído', ps: 150, Icon: IconBrain,   color: '#7C3AED', date: '14/05' },
]

export default function ProfilePage({ state, showToast }) {
  const { current } = getLevelInfo(state.ps)
  const LevelIcon = ICONS[current.icon] || IconShield
  const unlocked = BADGES.filter(b => state.unlockedBadges.includes(b.id))

  return (
    <div>
      {/* Header */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #1B6DB8, #145494)', padding: '24px 20px', marginBottom: 16 }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconPerson size={32} color="white" />
          </div>
          <div>
            <p style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>Eduardo Navarro</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: 999 }}>
                <LevelIcon size={12} color="white" />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'white' }}>{current.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: 999 }}>
                <IconFlame size={11} color="#F5A623" />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'white' }}>{state.streak} dias</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total de Pontos de Saúde</p>
            <p style={{ fontSize: 26, fontWeight: 900, color: 'white', lineHeight: 1.2 }}>{state.ps.toLocaleString('pt-BR')} <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.7 }}>PS</span></p>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconMedal size={24} color="#F5A623" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 16px 20px' }}>
        {[
          { label: 'Desafios concluídos', value: '47', Icon: IconCheckup, color: '#1B6DB8' },
          { label: 'Dias de sequência',   value: String(state.streak), Icon: IconFlame, color: '#F5A623' },
          { label: 'Conquistas',          value: String(unlocked.length), Icon: IconTrophy, color: '#28A745' },
          { label: 'Posição no ranking',  value: '#6', Icon: IconMedal, color: '#7C3AED' },
        ].map((s, i) => (
          <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms`, background: 'white', border: '1px solid #D6E4F0', borderRadius: 16, padding: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <s.Icon size={18} color={s.color} />
            </div>
            <p style={{ fontSize: 22, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 11, color: '#6B7E91', marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {unlocked.length > 0 && (
        <>
          <SectionTitle>Conquistas Desbloqueadas</SectionTitle>
          <div style={{ display: 'flex', gap: 10, padding: '0 16px 20px', flexWrap: 'wrap' }}>
            {unlocked.map((b, i) => {
              const Icon = ICONS[b.icon] || IconShield
              return (
                <button key={b.id} className="animate-pop" onClick={() => showToast(`${b.name}: ${b.desc}`)}
                  style={{ animationDelay: `${i * 80}ms`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 12, borderRadius: 16, border: `1px solid ${b.color}30`, background: b.bg, minWidth: 72, cursor: 'pointer' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: b.bg, border: `1px solid ${b.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} color={b.color} />
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em', color: b.color, textAlign: 'center', lineHeight: 1.3 }}>{b.name}</span>
                </button>
              )
            })}
          </div>
        </>
      )}

      <SectionTitle>Histórico Recente</SectionTitle>
      <div style={{ padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {HISTORY.map((h, i) => (
          <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms`, display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'white', border: '1px solid #D6E4F0', borderRadius: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: h.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <h.Icon size={20} color={h.color} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1A2B3C' }}>{h.desc}</p>
              <p style={{ fontSize: 11, color: '#6B7E91', marginTop: 2 }}>{h.date}</p>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#1B6DB8', flexShrink: 0 }}>+{h.ps} PS</span>
          </div>
        ))}
      </div>
    </div>
  )
}