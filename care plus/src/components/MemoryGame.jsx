import { useState, useCallback } from 'react'
import { IconBrain, IconCheck, IconArrowRight, IconHeart, IconShield, IconWater, IconWalk, IconFood, IconSleep, IconVaccine, IconCheckup } from './Icons'

const CARD_ICONS = [
  { id: 'heart',   Icon: IconHeart,   color: '#EC4899', bg: '#FDF2F8' },
  { id: 'shield',  Icon: IconShield,  color: '#1B6DB8', bg: '#EBF3FB' },
  { id: 'water',   Icon: IconWater,   color: '#0EA5E9', bg: '#E0F4FD' },
  { id: 'walk',    Icon: IconWalk,    color: '#28A745', bg: '#EAF6ED' },
  { id: 'food',    Icon: IconFood,    color: '#16A34A', bg: '#DCFCE7' },
  { id: 'sleep',   Icon: IconSleep,   color: '#6366F1', bg: '#EEF2FF' },
  { id: 'vaccine', Icon: IconVaccine, color: '#7C3AED', bg: '#F3F0FF' },
  { id: 'checkup', Icon: IconCheckup, color: '#F5A623', bg: '#FEF6E7' },
]

function buildDeck() {
  const pairs = [...CARD_ICONS, ...CARD_ICONS].map((c, i) => ({ ...c, uid: `${c.id}-${i}`, matched: false }))
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]]
  }
  return pairs
}

export default function MemoryGame({ showToast }) {
  const [deck, setDeck] = useState(buildDeck)
  const [flipped, setFlipped] = useState([])
  const [moves, setMoves] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const reset = () => { setDeck(buildDeck()); setFlipped([]); setMoves(0); setCompleted(false); setDisabled(false) }

  const flip = useCallback((uid) => {
    if (disabled || flipped.length === 2 || flipped.includes(uid)) return
    const newFlipped = [...flipped, uid]
    setFlipped(newFlipped)
    if (newFlipped.length === 2) {
      setMoves(m => m + 1)
      setDisabled(true)
      const [a, b] = newFlipped
      const cardA = deck.find(c => c.uid === a)
      const cardB = deck.find(c => c.uid === b)
      if (cardA.id === cardB.id) {
        const newDeck = deck.map(c => c.uid === a || c.uid === b ? { ...c, matched: true } : c)
        setDeck(newDeck)
        setFlipped([])
        setDisabled(false)
        if (newDeck.every(c => c.matched)) { setCompleted(true); showToast('+150 PS do Jogo da Memória!') }
      } else {
        setTimeout(() => { setFlipped([]); setDisabled(false) }, 900)
      }
    }
  }, [disabled, flipped, deck, showToast])

  return (
    <div>
      <div style={{ padding: '24px 20px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <IconBrain size={24} color="#7C3AED" />
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1A2B3C' }}>Jogo da Memória</h1>
          <p style={{ fontSize: 13, color: '#6B7E91' }}>Complete e ganhe <strong style={{ color: '#7C3AED' }}>+150 PS</strong></p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, padding: '0 16px 16px' }}>
        {[{ label: 'Jogadas', value: moves, color: '#7C3AED' }, { label: 'Pares', value: deck.filter(c => c.matched).length / 2, color: '#28A745' }, { label: 'Recompensa', value: 150, color: '#F5A623' }].map((s, i) => (
          <div key={i} style={{ flex: 1, background: 'white', border: '1px solid #D6E4F0', borderRadius: 16, padding: 12, textAlign: 'center' }}>
            <p style={{ fontSize: 20, fontWeight: 900, color: s.color }}>{s.value}</p>
            <p style={{ fontSize: 10, color: '#6B7E91', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {completed ? (
        <div className="animate-pop" style={{ margin: '0 16px', background: 'white', border: '2px solid #28A74530', borderRadius: 20, padding: 24, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, background: '#EAF6ED', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <IconCheck size={32} color="#28A745" />
          </div>
          <p style={{ fontSize: 20, fontWeight: 900, color: '#1A2B3C', marginBottom: 4 }}>Muito bem!</p>
          <p style={{ fontSize: 14, color: '#6B7E91', marginBottom: 4 }}>Concluído em <strong>{moves} jogadas</strong></p>
          <p style={{ fontSize: 16, fontWeight: 900, color: '#28A745', marginBottom: 20 }}>+150 PS conquistados</p>
          <button onClick={reset} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#1B6DB8', color: 'white', fontSize: 14, fontWeight: 700, padding: 12, borderRadius: 12, border: 'none', cursor: 'pointer' }}>
            Jogar Novamente <IconArrowRight size={18} color="white" />
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, padding: '0 16px' }}>
          {deck.map(card => {
            const isFlipped = flipped.includes(card.uid) || card.matched
            return (
              <button key={card.uid} onClick={() => !card.matched && flip(card.uid)} disabled={card.matched}
                style={{ aspectRatio: '1', borderRadius: 12, border: `2px solid ${card.matched ? card.color + '40' : isFlipped ? '#1B6DB840' : '#145494'}`, background: card.matched ? card.bg : isFlipped ? '#EBF3FB' : '#1B6DB8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: card.matched ? 'default' : 'pointer', transition: 'all 0.2s' }}>
                {isFlipped
                  ? <card.Icon size={26} color={card.color} />
                  : <svg width="18" height="18" viewBox="0 0 20 20"><path d="M10 17C10 17 3 12 3 7C3 4.79 4.79 3 7 3C8.5 3 9.84 3.81 10.5 5C11.16 3.81 12.5 3 14 3C16.21 3 18 4.79 18 7C18 12 10 17 10 17Z" fill="white" opacity="0.3" /></svg>
                }
              </button>
            )
          })}
        </div>
      )}

      {!completed && (
        <div style={{ padding: '12px 16px' }}>
          <button onClick={reset} style={{ width: '100%', fontSize: 12, fontWeight: 600, color: '#6B7E91', padding: '10px', borderRadius: 12, border: '1px solid #D6E4F0', background: 'white', cursor: 'pointer' }}>
            Reiniciar jogo
          </button>
        </div>
      )}
    </div>
  )
}