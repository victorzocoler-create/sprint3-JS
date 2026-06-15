import { BATTLE_OPPONENTS } from './gameData'
import SectionTitle from './SectionTitle'
import { IconTrophy, IconMedal, IconShield, IconFlame } from './Icons'

const AVATAR_COLORS = ['#1B6DB8', '#F5A623', '#28A745', '#7C3AED', '#EC4899', '#0EA5E9']

const MEDALS = {
  1: { Icon: IconTrophy, color: '#F5A623' },
  2: { Icon: IconMedal,  color: '#9AABB8' },
  3: { Icon: IconShield, color: '#CD7F32' },
}

export default function RankingPage({ showToast, onBattle, battleHistory = {}, unlockedPowers = [] }) {
  const RANKING = [
    ...BATTLE_OPPONENTS,
    { id: 'me', name: 'Você', initials: 'EU', ps: 9200, level: 'Recruta', streak: 5, isUser: true, pos: 6 },
  ].map((p, i) => ({ ...p, pos: i + 1 }))

  return (
    <div>
      <div style={{ padding: '24px 20px 16px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1A2B3C' }}>Ranking</h1>
        <p style={{ fontSize: 13, color: '#6B7E91', marginTop: 4 }}>
          {unlockedPowers.length > 0
            ? `Você tem ${unlockedPowers.length} poder(es) — desafie alguém!`
            : 'Desbloqueie poderes para batalhar'
          }
        </p>
      </div>

      {/* Podium */}
      <div style={{ margin: '0 16px 16px', background: 'linear-gradient(160deg, #EBF3FB, #FEF6E7)', borderRadius: 20, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 12 }}>
          {[RANKING[1], RANKING[0], RANKING[2]].map((player, i) => {
            const visualPos = [2, 1, 3][i]
            const medal     = MEDALS[visualPos]
            const heights   = ['56px', '80px', '44px']
            return (
              <div key={player.pos} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 88 }}>
                <medal.Icon size={20} color={medal.color} />
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: AVATAR_COLORS[player.pos - 1], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 800, border: '2px solid white' }}>
                  {player.initials}
                </div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#1A2B3C', textAlign: 'center' }}>{player.name.split(' ')[0]}</p>
                <p style={{ fontSize: 10, color: '#6B7E91' }}>{player.ps.toLocaleString('pt-BR')} PS</p>
                <div style={{ width: '100%', height: heights[i], background: visualPos === 1 ? '#F5A623' : visualPos === 2 ? '#9AABB8' : '#CD7F32', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8 }}>
                  <span style={{ color: 'white', fontSize: 14, fontWeight: 900 }}>#{visualPos}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Full list */}
      <SectionTitle>Classificação Geral</SectionTitle>
      <div style={{ padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {RANKING.map((player, i) => {
          const bh         = battleHistory[player.id] || { wins: 0, losses: 0 }
          const hasBattled = bh.wins > 0 || bh.losses > 0
          const canBattle  = !player.isUser && unlockedPowers.length > 0

          return (
            <div key={player.id} className="animate-fade-up"
              style={{ animationDelay: `${i * 60}ms`, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 16, background: player.isUser ? '#EBF3FB' : 'white', border: `${player.isUser ? 2 : 1}px solid ${player.isUser ? '#1B6DB840' : '#D6E4F0'}` }}>

              {/* Position */}
              <div style={{ width: 28, textAlign: 'center', flexShrink: 0 }}>
                {MEDALS[player.pos]
                  ? (() => { const { Icon, color } = MEDALS[player.pos]; return <Icon size={20} color={color} /> })()
                  : <span style={{ fontSize: 13, fontWeight: 700, color: '#6B7E91' }}>#{player.pos}</span>
                }
              </div>

              {/* Avatar */}
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: AVATAR_COLORS[player.pos - 1], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>
                {player.initials}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#1A2B3C' }}>{player.name}</p>
                  {player.isUser && <span style={{ fontSize: 9, fontWeight: 700, background: '#1B6DB8', color: 'white', padding: '1px 6px', borderRadius: 999 }}>você</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <IconFlame size={11} color="#F5A623" />
                  <span style={{ fontSize: 11, color: '#6B7E91' }}>{player.level}</span>
                  {hasBattled && (
                    <span style={{ fontSize: 10, color: '#6B7E91' }}>· {bh.wins}V {bh.losses}D</span>
                  )}
                  
                </div>
              </div>

              {/* PS + battle button */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1B6DB8' }}>{player.ps.toLocaleString('pt-BR')} PS</p>
                {canBattle && (
                  <button
                    onClick={() => onBattle(player)}
                    style={{ fontSize: 10, fontWeight: 800, color: 'white', background: 'linear-gradient(135deg, #EF4444, #7C3AED)', border: 'none', borderRadius: 8, padding: '4px 10px', cursor: 'pointer' }}
                  >
                    ⚔️ Batalhar
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}