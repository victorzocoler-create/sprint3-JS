import SectionTitle from './SectionTitle'
import { IconWalk, IconBrain, IconCheckup, IconArrowRight, IconShield } from './Icons'

const WEEKLY = [
  { id: 'w1', name: 'Semana Ativa',    desc: 'Complete 5 desafios de exercício',      Icon: IconWalk,    color: '#28A745', bg: '#EAF6ED', ps: 500, progress: 3, total: 5 },
  { id: 'w2', name: 'Mente em Forma',  desc: 'Jogue 7 partidas de memória cognitiva', Icon: IconBrain,   color: '#7C3AED', bg: '#F3F0FF', ps: 700, progress: 2, total: 7 },
  { id: 'w3', name: 'Prevenção Total', desc: 'Realize check-up e registre 3 vacinas', Icon: IconCheckup, color: '#1B6DB8', bg: '#EBF3FB', ps: 900, progress: 3, total: 3, completed: true },
]

export default function MissionsPage({ showToast }) {
  return (
    <div>
      <div style={{ padding: '24px 20px 16px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1A2B3C' }}>Missões</h1>
        <p style={{ fontSize: 13, color: '#6B7E91', marginTop: 4 }}>Desafios semanais com recompensas em PS</p>
      </div>

      <SectionTitle>Missões Semanais</SectionTitle>
      <div style={{ padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {WEEKLY.map((m, i) => {
          const pct = Math.round((m.progress / m.total) * 100)
          return (
            <div key={m.id} className="animate-fade-up" onClick={() => showToast(m.completed ? `${m.name} concluída! +${m.ps} PS` : `${m.progress}/${m.total} concluídos`)}
              style={{ animationDelay: `${i * 80}ms`, background: m.completed ? m.bg : 'white', border: `1px solid ${m.completed ? m.color + '40' : '#D6E4F0'}`, borderRadius: 16, padding: 16, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <m.Icon size={22} color={m.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#1A2B3C' }}>{m.name}</p>
                    {m.completed && <span style={{ fontSize: 10, fontWeight: 700, background: m.color + '20', color: m.color, padding: '2px 8px', borderRadius: 999 }}>Concluída</span>}
                  </div>
                  <p style={{ fontSize: 12, color: '#6B7E91' }}>{m.desc}</p>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, background: m.bg, color: m.color, padding: '4px 10px', borderRadius: 8, flexShrink: 0 }}>+{m.ps} PS</span>
              </div>
              <div style={{ height: 8, background: '#F0F4F8', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 999, width: `${pct}%`, background: `linear-gradient(90deg, #1B6DB8, ${m.color})`, transition: 'width 1s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 11, color: '#6B7E91' }}>{m.progress}/{m.total}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: m.color }}>{pct}%</span>
              </div>
            </div>
          )
        })}
      </div>

      <SectionTitle>Missão Especial</SectionTitle>
      <div style={{ padding: '0 16px 20px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1B6DB8, #145494)', borderRadius: 20, padding: 20 }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <IconShield size={28} color="white" />
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 900, color: 'white', marginBottom: 4 }}>Check-up Anual</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>Realize sua consulta preventiva este mês e ganhe pontos + badge exclusiva</p>
              <span style={{ display: 'inline-block', marginTop: 8, fontSize: 12, fontWeight: 700, background: '#F5A623', color: 'white', padding: '4px 12px', borderRadius: 8 }}>+500 PS + Badge</span>
            </div>
          </div>
          <button
            onClick={() => showToast('Abrindo agenda de consultas...')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'white', color: '#1B6DB8', fontSize: 14, fontWeight: 700, padding: '12px', borderRadius: 12, border: 'none', cursor: 'pointer' }}
          >
            Agendar Consulta
            <IconArrowRight size={18} color="#1B6DB8" />
          </button>
        </div>
      </div>
    </div>
  )
}