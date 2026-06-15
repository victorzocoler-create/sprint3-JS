import { useState } from 'react'
import { POWERS, ELEMENT_ADVANTAGE } from './gameData'

function BattlePet({ mood = 'happy', flip = false, power = null, isAttacking = false }) {
  const colors = { happy: '#4FACDE', neutral: '#5BB8E8', sad: '#7EAEC7', sick: '#96B89A' }
  const body = colors[mood] || colors.happy
  const powerGlow = { fire: '#EF4444', water: '#0EA5E9', earth: '#16A34A', wind: '#7C3AED' }

  return (
    <div style={{
      transform: flip ? 'scaleX(-1)' : 'none',
      filter: isAttacking && power ? `drop-shadow(0 0 12px ${powerGlow[power.id]})` : 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
    }}>
      <svg viewBox="0 0 200 220" width="110" height="110">
        <ellipse cx="100" cy="145" rx="60" ry="65" fill={body} />
        <ellipse cx="100" cy="158" rx="36" ry="40" fill="white" opacity="0.25" />
        <ellipse cx="52"  cy="88"  rx="18" ry="22" fill={body} transform="rotate(-15 52 88)" />
        <ellipse cx="148" cy="88"  rx="18" ry="22" fill={body} transform="rotate(15 148 88)" />
        <ellipse cx="100" cy="108" rx="52" ry="50" fill={body} />
        <ellipse cx="66"  cy="122" rx="13" ry="9"  fill="#FF8FAB" opacity="0.5" />
        <ellipse cx="134" cy="122" rx="13" ry="9"  fill="#FF8FAB" opacity="0.5" />
        <ellipse cx="82"  cy="108" rx="7"  ry="8"  fill="#1A2B3C" />
        <ellipse cx="118" cy="108" rx="7"  ry="8"  fill="#1A2B3C" />
        <ellipse cx="84"  cy="106" rx="2.5" ry="3" fill="white" />
        <ellipse cx="120" cy="106" rx="2.5" ry="3" fill="white" />
        <path d="M88 128 Q100 140 112 128" stroke="#1A2B3C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="44"  cy="148" rx="14" ry="22" fill={body} transform="rotate(-20 44 148)" />
        <ellipse cx="156" cy="148" rx="14" ry="22" fill={body} transform="rotate(20 156 148)" />
        <ellipse cx="76"  cy="202" rx="18" ry="10" fill={body} />
        <ellipse cx="124" cy="202" rx="18" ry="10" fill={body} />
        {power && (
          <ellipse cx="100" cy="130" rx="68" ry="75"
            fill="none" stroke={powerGlow[power.id]}
            strokeWidth="3" opacity="0.6"
            style={{ animation: 'rumble 0.8s ease-in-out infinite' }}
          />
        )}
      </svg>
    </div>
  )
}

function HPBar({ current, max = 300, color, label }) {
  const pct = Math.max(0, Math.round((current / max) * 100))
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7E91' }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 800, color: pct > 50 ? color : pct > 25 ? '#F5A623' : '#EF4444' }}>
          {current} HP
        </span>
      </div>
      <div style={{ height: 10, background: '#F0F4F8', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 999, width: `${pct}%`, background: pct > 50 ? color : pct > 25 ? '#F5A623' : '#EF4444', transition: 'width 0.8s ease' }} />
      </div>
    </div>
  )
}

function PowerSelect({ powers, onSelect, selectedPower, round }) {
  return (
    <div>
      <p style={{ fontSize: 13, fontWeight: 700, color: '#6B7E91', textAlign: 'center', marginBottom: 12 }}>
        Rodada {round} — Escolha seu ataque
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {powers.map(power => {
          const isSelected = selectedPower?.id === power.id
          return (
            <button
              key={power.id}
              onClick={() => onSelect(power)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                padding: 14, borderRadius: 16, textAlign: 'left',
                border: `${isSelected ? 2 : 1}px solid ${isSelected ? power.color : power.color + '40'}`,
                background: isSelected ? power.bg : 'white',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 6 }}>
                <span style={{ fontSize: 24 }}>{power.icon}</span>
                {isSelected && (
                  <span style={{ fontSize: 10, fontWeight: 800, background: power.color, color: 'white', padding: '2px 8px', borderRadius: 999 }}>
                    SELECIONADO
                  </span>
                )}
              </div>
              <p style={{ fontSize: 13, fontWeight: 800, color: power.color, marginBottom: 2 }}>{power.element}</p>
              <p style={{ fontSize: 11, color: '#6B7E91' }}>{power.name}</p>
              <p style={{ fontSize: 10, color: '#9AABB8', marginTop: 4 }}>
                🗡 {power.baseDamage} base · Forte vs {POWERS.find(p => p.id === power.strongAgainst)?.element}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function RoundResult({ result, round }) {
  const advText = {
    player:   '⚡ Vantagem elemental!',
    opponent: '💀 Desvantagem elemental!',
    none:     '⚖️ Neutro',
  }
  return (
    <div style={{ background: 'white', border: '1px solid #D6E4F0', borderRadius: 16, padding: 16, marginBottom: 12 }}>
      <p style={{ fontSize: 12, fontWeight: 800, color: '#6B7E91', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
        Rodada {round}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <p style={{ fontSize: 20 }}>{result.playerPower.icon}</p>
          <p style={{ fontSize: 11, fontWeight: 700, color: result.playerPower.color }}>{result.playerPower.element}</p>
          <p style={{ fontSize: 13, fontWeight: 900, color: '#EF4444' }}>−{result.opponentDamage} HP</p>
          <p style={{ fontSize: 10, color: '#6B7E91' }}>no oponente</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: result.advantage === 'player' ? '#28A745' : result.advantage === 'opponent' ? '#EF4444' : '#6B7E91' }}>
            {advText[result.advantage]}
          </p>
          <p style={{ fontSize: 18 }}>⚔️</p>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <p style={{ fontSize: 20 }}>{result.opponentPower.icon}</p>
          <p style={{ fontSize: 11, fontWeight: 700, color: result.opponentPower.color }}>{result.opponentPower.element}</p>
          <p style={{ fontSize: 13, fontWeight: 900, color: '#EF4444' }}>−{result.playerDamage} HP</p>
          <p style={{ fontSize: 10, color: '#6B7E91' }}>em você</p>
        </div>
      </div>
    </div>
  )
}

export default function BattlePage({ opponent, unlockedPowers, doBattle, onBack, ps }) {
  const [phase, setPhase]               = useState('select')
  const [round, setRound]               = useState(1)
  const [moves, setMoves]               = useState([])
  const [currentMove, setCurrentMove]   = useState(null)
  const [battleResult, setBattleResult] = useState(null)
  const [hp, setHp]                     = useState({ player: 300, opponent: 300 })
  const [roundResults, setRoundResults] = useState([])
  const [isAnimating, setIsAnimating]   = useState(false)

  const confirmMove = () => {
    if (!currentMove) return

    const newMoves    = [...moves, currentMove.id]
    const currentRound = round
    const capturedMove = currentMove
    const capturedHp   = { ...hp }
    const capturedResults = [...roundResults]

    setIsAnimating(true)
    setMoves(newMoves)
    setPhase('fighting')

    setTimeout(() => {
      const oppMove  = opponent.powers[(currentRound - 1) % opponent.powers.length]
      const oppPower = POWERS.find(p => p.id === oppMove)
      const myAdv    = ELEMENT_ADVANTAGE[capturedMove.id].strong === oppMove
      const myWeak   = ELEMENT_ADVANTAGE[capturedMove.id].weak   === oppMove

      const playerDmg   = capturedMove.baseDamage + (myAdv  ? Math.round(capturedMove.baseDamage * 0.5) : myWeak ? -Math.round(capturedMove.baseDamage * 0.4) : 0)
      const opponentDmg = oppPower.baseDamage      + (myWeak ? Math.round(oppPower.baseDamage    * 0.5) : myAdv  ? -Math.round(oppPower.baseDamage    * 0.4) : 0)

      const newRoundResult = {
        playerPower:    capturedMove,
        opponentPower:  oppPower,
        playerDamage:   opponentDmg,
        opponentDamage: playerDmg,
        advantage: myAdv ? 'player' : myWeak ? 'opponent' : 'none',
      }

      const newHp = {
        player:   Math.max(0, capturedHp.player   - opponentDmg),
        opponent: Math.max(0, capturedHp.opponent - playerDmg),
      }

      setHp(newHp)
      setRoundResults([...capturedResults, newRoundResult])
      setIsAnimating(false)

      if (currentRound >= 3) {
        const result = doBattle(opponent, newMoves)
        setBattleResult({ ...result, finalHp: newHp })
        setPhase('result')
        setTimeout(onBack, 3000)
      } else {
        setRound(currentRound + 1)
        setCurrentMove(null)
        setPhase('select')
      }
    }, 1200)
  }

  if (unlockedPowers.length === 0) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: 40, marginBottom: 16 }}>🔒</p>
        <p style={{ fontSize: 18, fontWeight: 900, color: '#1A2B3C', marginBottom: 8 }}>Sem poderes desbloqueados</p>
        <p style={{ fontSize: 13, color: '#6B7E91', marginBottom: 24 }}>Complete desafios de saúde para desbloquear poderes!</p>
        <button onClick={onBack} style={{ background: '#1B6DB8', color: 'white', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 12, border: 'none', cursor: 'pointer' }}>
          Voltar
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ background: '#F0F4F8', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18 }}>
          ←
        </button>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: '#1A2B3C' }}>Batalha!</h1>
          <p style={{ fontSize: 12, color: '#6B7E91' }}>Bolinha vs {opponent.name}</p>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <p style={{ fontSize: 11, color: '#6B7E91' }}>Seu saldo</p>
          <p style={{ fontSize: 14, fontWeight: 900, color: '#1B6DB8' }}>{ps.toLocaleString('pt-BR')} PS</p>
        </div>
      </div>

      {/* Arena */}
      <div style={{ margin: '16px 16px 12px', background: 'linear-gradient(180deg, #1B6DB8 0%, #145494 60%, #EBF3FB 100%)', borderRadius: 20, padding: '20px 16px', position: 'relative', overflow: 'hidden' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', top: `${10 + i * 12}%`, left: `${5 + i * 15}%`, width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
        ))}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <HPBar current={hp.player}   label="Bolinha"       color="#28A745" />
          <HPBar current={hp.opponent} label={opponent.name} color="#EF4444" />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 8px' }}>
          <BattlePet mood="happy" power={isAnimating ? currentMove : null} isAttacking={isAnimating} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            {phase === 'fighting' && isAnimating
              ? <div style={{ fontSize: 28, animation: 'rumble 0.3s ease-in-out infinite' }}>⚔️</div>
              : <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rodada {Math.min(round, 3)}/3</p>
            }
          </div>
          <BattlePet mood={opponent.petMood || 'neutral'} flip={true} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>Você</p>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{opponent.name}</p>
        </div>
      </div>

      {/* Resultados parciais */}
      {roundResults.length > 0 && phase !== 'result' && (
        <div style={{ padding: '0 16px 12px' }}>
          {roundResults.map((r, i) => <RoundResult key={i} result={r} round={i + 1} />)}
        </div>
      )}

      {/* Seleção de poder */}
      {phase === 'select' && (
        <div style={{ padding: '0 16px 24px' }}>
          <PowerSelect
            powers={unlockedPowers}
            onSelect={setCurrentMove}
            selectedPower={currentMove}
            round={round}
          />
          {currentMove && (
            <button
              onClick={confirmMove}
              style={{ marginTop: 16, width: '100%', background: `linear-gradient(135deg, ${currentMove.color}, #1B6DB8)`, color: 'white', fontWeight: 800, fontSize: 15, padding: '14px', borderRadius: 14, border: 'none', cursor: 'pointer' }}
            >
              {currentMove.icon} Atacar com {currentMove.element}!
            </button>
          )}
        </div>
      )}

      {/* Animando */}
      {phase === 'fighting' && isAnimating && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: 32, animation: 'rumble 0.4s ease-in-out infinite' }}>⚡</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#1B6DB8', marginTop: 8 }}>Atacando...</p>
        </div>
      )}

      {/* Resultado final */}
      {phase === 'result' && battleResult && (
        <div style={{ padding: '0 16px 24px' }}>
          {roundResults.map((r, i) => <RoundResult key={i} result={r} round={i + 1} />)}
          <div style={{
            background: battleResult.playerWins ? 'linear-gradient(135deg, #28A745, #16A34A)' : 'linear-gradient(135deg, #EF4444, #DC2626)',
            borderRadius: 20, padding: 24, textAlign: 'center',
          }}>
            <p style={{ fontSize: 40, marginBottom: 8 }}>{battleResult.playerWins ? '🏆' : '💀'}</p>
            <p style={{ fontSize: 22, fontWeight: 900, color: 'white', marginBottom: 4 }}>
              {battleResult.playerWins ? 'Vitória!' : 'Derrota!'}
            </p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>
              {battleResult.playerWins
                ? `${opponent.name} perdeu 150 PS e caiu no ranking!`
                : `Cuide melhor do seu pet e tente novamente!`
              }
            </p>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '10px 20px', display: 'inline-block', marginBottom: 8 }}>
              <p style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>
                {battleResult.playerWins ? '+200 PS' : '−150 PS'}
              </p>
            </div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
              Voltando ao ranking em 3 segundos...
            </p>
            <button
              onClick={onBack}
              style={{ background: 'white', color: battleResult.playerWins ? '#28A745' : '#EF4444', fontWeight: 800, fontSize: 14, padding: '12px 32px', borderRadius: 12, border: 'none', cursor: 'pointer' }}
            >
              {battleResult.playerWins ? '🏆 Voltar ao Ranking' : '😢 Voltar ao Ranking'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}