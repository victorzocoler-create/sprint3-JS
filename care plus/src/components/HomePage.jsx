import { DAILY_CHALLENGES } from './gameData'
import LevelBar from './LevelBar'
import ChallengeCard from './ChallengeCard'
import StreakBar from './StreakBar'
import BadgesGrid from './BadgesGrid'
import SectionTitle from './SectionTitle'
import { IconShield } from './Icons'

export default function HomePage({ gameState }) {
  const { state, levelInfo, completedCount, badges, toggleChallenge, showToast } = gameState
  const pct = Math.round((completedCount / DAILY_CHALLENGES.length) * 100)
  const C = 2 * Math.PI * 26

  return (
    <div>
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#1B6DB8', padding: '24px 20px 32px', marginBottom: 16 }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(245,166,35,0.15)' }} />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(245,166,35,0.2)', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 999, padding: '4px 12px', marginBottom: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F5A623' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#F5A623', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{state.streak} dias de sequência</span>
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: 8 }}>Olá, Eduardo!</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, maxWidth: 220 }}>Complete desafios e acumule Pontos de Saúde.</p>
            <button
              onClick={() => showToast('Missão especial desbloqueada!')}
              style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, background: '#F5A623', color: 'white', fontSize: 13, fontWeight: 700, padding: '10px 18px', borderRadius: 12, border: 'none', cursor: 'pointer' }}
            >
              <IconShield size={16} color="white" />
              Missão do Dia
            </button>
          </div>

          {/* Ring */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <svg width="72" height="72" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
              <circle cx="32" cy="32" r="26" fill="none" stroke="#F5A623" strokeWidth="5" strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} transform="rotate(-90 32 32)"
                style={{ transition: 'stroke-dashoffset 1s ease' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: 'white', lineHeight: 1 }}>{completedCount}</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>/{DAILY_CHALLENGES.length}</span>
            </div>
          </div>
        </div>
      </div>

      <LevelBar ps={state.ps} levelInfo={levelInfo} />

      <SectionTitle>Desafios de Hoje</SectionTitle>
      <div style={{ padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {DAILY_CHALLENGES.map((c, i) => (
          <ChallengeCard key={c.id} challenge={c} done={!!state.completedToday[c.id]} onToggle={toggleChallenge} delay={i * 55} />
        ))}
      </div>

      <SectionTitle>Sequência da Semana</SectionTitle>
      <StreakBar streakDays={state.streakDays} />

      <SectionTitle>Conquistas</SectionTitle>
      <BadgesGrid badges={badges} onBadgeClick={(b) => showToast(b.unlocked ? `${b.name}: ${b.desc}` : `Bloqueado — ${b.desc}`)} />
    </div>
  )
}