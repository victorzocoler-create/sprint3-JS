import { useState } from 'react'
import SectionTitle from './SectionTitle'
import { POWERS as ALL_POWERS } from './gameData'

function Tears() {
  return (
    <g>
      <ellipse cx="75" cy="120" rx="3" ry="4" fill="#60B8E0" opacity="0.8"
        style={{ animation: 'tearDrop 1.2s ease-in infinite' }} />
      <ellipse cx="125" cy="120" rx="3" ry="4" fill="#60B8E0" opacity="0.8"
        style={{ animation: 'tearDrop 1.2s ease-in infinite 0.4s' }} />
    </g>
  )
}

function StinkWaves() {
  return (
    <g>
      <text x="30" y="80" fontSize="14" style={{ animation: 'stink 1.5s ease-out infinite' }}>💨</text>
      <text x="150" y="65" fontSize="12" style={{ animation: 'stink 1.5s ease-out infinite 0.5s' }}>💨</text>
      <text x="20" y="55" fontSize="10" style={{ animation: 'stink 1.5s ease-out infinite 1s' }}>💨</text>
    </g>
  )
}

function HungerRumble() {
  return (
    <g style={{ animation: 'rumble 0.6s ease-in-out infinite' }}>
      <text x="78" y="175" fontSize="13" textAnchor="middle">⚡</text>
    </g>
  )
}

function ZZZ() {
  return (
    <g>
      <text x="148" y="68" fontSize="13" fontWeight="bold" fill="#7C3AED" opacity="0.9"
        style={{ animation: 'stink 1.8s ease-out infinite' }}>Z</text>
      <text x="158" y="55" fontSize="10" fontWeight="bold" fill="#7C3AED" opacity="0.7"
        style={{ animation: 'stink 1.8s ease-out infinite 0.5s' }}>Z</text>
      <text x="165" y="44" fontSize="8" fontWeight="bold" fill="#7C3AED" opacity="0.5"
        style={{ animation: 'stink 1.8s ease-out infinite 1s' }}>Z</text>
    </g>
  )
}

function PetSVG({ mood, hunger, hygiene, happiness, energy, bodyColor = '#4FACDE' }) {
  const colors = {
    happy:   { body: bodyColor,         belly: bodyColor + '99', cheek: '#FF8FAB' },
    neutral: { body: bodyColor,         belly: bodyColor + '88', cheek: '#FFB3C6' },
    sad:     { body: bodyColor + 'BB',  belly: bodyColor + '66', cheek: '#C9B8C5' },
    sick:    { body: '#96B89A',         belly: '#C8DDCA',        cheek: '#B8C9B0' },
  }
  const c = colors[mood] || colors.neutral

  const eyes = {
    happy:
      <>
        <ellipse cx="82" cy="108" rx="7" ry="8" fill="#1A2B3C"/>
        <ellipse cx="118" cy="108" rx="7" ry="8" fill="#1A2B3C"/>
        <ellipse cx="84" cy="106" rx="2.5" ry="3" fill="white"/>
        <ellipse cx="120" cy="106" rx="2.5" ry="3" fill="white"/>
      </>,
    neutral:
      <>
        <ellipse cx="82" cy="110" rx="7" ry="7" fill="#1A2B3C"/>
        <ellipse cx="118" cy="110" rx="7" ry="7" fill="#1A2B3C"/>
        <ellipse cx="84" cy="108" rx="2.5" ry="2.5" fill="white"/>
        <ellipse cx="120" cy="108" rx="2.5" ry="2.5" fill="white"/>
      </>,
    sad:
      <>
        <path d="M75 110 Q82 118 89 110" stroke="#1A2B3C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M111 110 Q118 118 125 110" stroke="#1A2B3C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </>,
    sick:
      <>
        <path d="M76 107 L88 113M76 113 L88 107" stroke="#1A2B3C" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M112 107 L124 113M112 113 L124 107" stroke="#1A2B3C" strokeWidth="2.5" strokeLinecap="round"/>
      </>,
  }

  const mouths = {
    happy:   <path d="M88 128 Q100 140 112 128" stroke="#1A2B3C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    neutral: <path d="M90 130 Q100 130 110 130" stroke="#1A2B3C" strokeWidth="2" fill="none" strokeLinecap="round"/>,
    sad:     <path d="M88 135 Q100 125 112 135" stroke="#1A2B3C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    sick:    <path d="M88 135 Q100 125 112 135" stroke="#1A2B3C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
  }

  const isShaking = energy < 30

  return (
    <div className={isShaking ? 'pet-shake' : ''} style={{ display: 'inline-block' }}>
      <svg viewBox="0 0 200 220" width="200" height="200"
        style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.12))' }}>

        {hygiene < 30 && <StinkWaves />}
        {energy < 30 && <ZZZ />}

        <ellipse cx="100" cy="210" rx="55" ry="10" fill="rgba(0,0,0,0.08)" />
        <ellipse cx="100" cy="145" rx="60" ry="65" fill={c.body} />
        <ellipse cx="100" cy="158" rx="36" ry="40" fill={c.belly} opacity="0.7" />
        <ellipse cx="52" cy="88" rx="18" ry="22" fill={c.body} transform="rotate(-15 52 88)" />
        <ellipse cx="52" cy="88" rx="10" ry="13" fill={c.belly} opacity="0.6" transform="rotate(-15 52 88)" />
        <ellipse cx="148" cy="88" rx="18" ry="22" fill={c.body} transform="rotate(15 148 88)" />
        <ellipse cx="148" cy="88" rx="10" ry="13" fill={c.belly} opacity="0.6" transform="rotate(15 148 88)" />
        <ellipse cx="100" cy="108" rx="52" ry="50" fill={c.body} />
        <ellipse cx="66" cy="122" rx="13" ry="9" fill={c.cheek} opacity="0.55" />
        <ellipse cx="134" cy="122" rx="13" ry="9" fill={c.cheek} opacity="0.55" />

        {eyes[mood]}
        {happiness < 30 && <Tears />}
        {mouths[mood]}
        {hunger < 30 && <HungerRumble />}

        <ellipse cx="44" cy="148" rx="14" ry="22" fill={c.body} transform="rotate(-20 44 148)" />
        <ellipse cx="156" cy="148" rx="14" ry="22" fill={c.body} transform="rotate(20 156 148)" />
        <ellipse cx="76" cy="202" rx="18" ry="10" fill={c.body} />
        <ellipse cx="124" cy="202" rx="18" ry="10" fill={c.body} />

        {mood === 'sick' && (
          <g>
            <circle cx="148" cy="72" r="14" fill="#FFE4B5" stroke="#F5A623" strokeWidth="1.5" />
            <text x="148" y="77" textAnchor="middle" fontSize="14">🤒</text>
          </g>
        )}

        {mood === 'happy' && (
          <g>
            <path d="M158 72 L160 66 L162 72 L168 74 L162 76 L160 82 L158 76 L152 74 Z" fill="#F5A623" opacity="0.9" />
            <path d="M36 78 L37.5 74 L39 78 L43 79.5 L39 81 L37.5 85 L36 81 L32 79.5 Z" fill="#F5A623" opacity="0.7" />
          </g>
        )}
      </svg>
    </div>
  )
}

function StatBar({ label, value, color, icon }) {
  const pct   = Math.round(value)
  const isLow = pct <= 30
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#1A2B3C', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 15, display: 'inline-block', animation: isLow ? 'rumble 0.5s ease-in-out infinite' : 'none' }}>
            {icon}
          </span>
          {label}
          {isLow && (
            <span style={{ fontSize: 10, fontWeight: 800, color: '#EF4444', background: '#FEF2F2', padding: '1px 6px', borderRadius: 999 }}>
              BAIXO!
            </span>
          )}
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: pct > 60 ? color : pct > 30 ? '#F5A623' : '#EF4444' }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: 10, background: '#F0F4F8', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 999,
          width: `${pct}%`,
          background: pct > 60 ? color : pct > 30 ? '#F5A623' : '#EF4444',
          transition: 'width 0.6s ease',
          animation: isLow ? 'rumble 0.8s ease-in-out infinite' : 'none',
        }} />
      </div>
    </div>
  )
}

const ACTIONS = [
  { id: 'feed',    label: 'Alimentar', stat: 'hunger',    boost: 30, cost: 50,  icon: '🍎', desc: '+30 Fome',    color: '#EF4444', bg: '#FEF2F2' },
  { id: 'bath',    label: 'Dar Banho', stat: 'hygiene',   boost: 35, cost: 60,  icon: '🛁', desc: '+35 Higiene', color: '#0EA5E9', bg: '#E0F4FD' },
  { id: 'play',    label: 'Brincar',   stat: 'happiness', boost: 25, cost: 40,  icon: '🎾', desc: '+25 Alegria', color: '#F5A623', bg: '#FEF6E7' },
  { id: 'sleep',   label: 'Dormir',    stat: 'energy',    boost: 40, cost: 30,  icon: '💤', desc: '+40 Energia', color: '#7C3AED', bg: '#F3F0FF' },
  { id: 'treat',   label: 'Petisco',   stat: 'happiness', boost: 40, cost: 80,  icon: '🍬', desc: '+40 Alegria', color: '#EC4899', bg: '#FDF2F8' },
  { id: 'vitamin', label: 'Vitamina',  stat: 'hunger',    boost: 50, cost: 120, icon: '💊', desc: '+50 Fome',    color: '#28A745', bg: '#EAF6ED' },
]

export default function PetPage({ pet, ps, carePet, unlockedPowers = [], petName, petColor }) {
  const [confirmAction, setConfirmAction] = useState(null)

  const avg  = (pet.hunger + pet.hygiene + pet.happiness + pet.energy) / 4
  const mood = avg > 70 ? 'happy' : avg > 40 ? 'neutral' : avg > 20 ? 'sad' : 'sick'

  const moodLabel = {
    happy:   '😄 Feliz e saudável!',
    neutral: '😐 Precisando de atenção',
    sad:     '😢 Está tristinho...',
    sick:    '🤒 Está doentinho!',
  }

  const handleAction = (action) => {
    if (confirmAction?.id === action.id) {
      carePet(action)
      setConfirmAction(null)
    } else {
      setConfirmAction(action)
      setTimeout(() => setConfirmAction(null), 3000)
    }
  }

  const anyLow = pet.hunger < 30 || pet.hygiene < 30 || pet.happiness < 30 || pet.energy < 30

  return (
    <div>

      {/* Header */}
      <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1A2B3C' }}>
            {petName || pet.name || 'Bolinha'}
          </h1>
          <p style={{ fontSize: 13, color: '#6B7E91', marginTop: 2 }}>Seu companheiro de saúde</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 11, color: '#6B7E91', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Saldo</p>
          <p style={{ fontSize: 16, fontWeight: 900, color: '#1B6DB8' }}>{ps.toLocaleString('pt-BR')} PS</p>
        </div>
      </div>

      {/* Alerta */}
      {anyLow && (
        <div style={{ margin: '12px 16px 0', background: '#FEF2F2', border: '1px solid #EF444440', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#EF4444' }}>
            Seu pet precisa de atenção! Cuide dele antes que fique doentinho.
          </p>
        </div>
      )}

      {/* Pet display */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0 8px', background: 'linear-gradient(180deg, #EBF3FB 0%, #ffffff 100%)', margin: '12px 16px', borderRadius: 24, border: `1px solid ${anyLow ? '#EF444430' : '#D6E4F0'}`, transition: 'border-color 0.3s' }}>
        <PetSVG
          mood={mood}
          hunger={pet.hunger}
          hygiene={pet.hygiene}
          happiness={pet.happiness}
          energy={pet.energy}
          bodyColor={petColor || '#4FACDE'}
        />
        <div style={{ marginTop: 4, fontSize: 13, fontWeight: 700, color: mood === 'happy' ? '#28A745' : mood === 'sad' || mood === 'sick' ? '#EF4444' : '#F5A623' }}>
          {moodLabel[mood]}
        </div>
      </div>

      {/* Stats */}
      <div style={{ margin: '0 16px 8px', background: 'white', border: '1px solid #D6E4F0', borderRadius: 16, padding: '14px 16px' }}>
        <StatBar label="Fome"    value={pet.hunger}    color="#EF4444" icon="🍎" />
        <StatBar label="Higiene" value={pet.hygiene}   color="#0EA5E9" icon="🛁" />
        <StatBar label="Alegria" value={pet.happiness} color="#F5A623" icon="😄" />
        <StatBar label="Energia" value={pet.energy}    color="#7C3AED" icon="⚡" />
      </div>

      {/* Actions */}
      <SectionTitle>Cuidar do Pet</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 16px 20px' }}>
        {ACTIONS.map((action, i) => {
          const canAfford = ps >= action.cost
          const isConfirm = confirmAction?.id === action.id
          return (
            <button
              key={action.id}
              className="animate-fade-up"
              onClick={() => handleAction(action)}
              style={{
                animationDelay: `${i * 60}ms`,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                padding: 14, borderRadius: 16, textAlign: 'left',
                border: `${isConfirm ? 2 : 1}px solid ${isConfirm ? action.color : canAfford ? action.color + '30' : '#D6E4F0'}`,
                background: isConfirm ? action.bg : canAfford ? 'white' : '#F9FAFB',
                cursor: canAfford ? 'pointer' : 'not-allowed',
                opacity: canAfford ? 1 : 0.5,
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
                <span style={{ fontSize: 26 }}>{action.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: canAfford ? action.color : '#9AABB8', background: canAfford ? action.bg : '#F0F4F8', padding: '3px 8px', borderRadius: 8 }}>
                  −{action.cost} PS
                </span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 800, color: isConfirm ? action.color : '#1A2B3C', marginBottom: 2 }}>
                {isConfirm ? 'Confirmar?' : action.label}
              </p>
              <p style={{ fontSize: 11, color: '#6B7E91' }}>{action.desc}</p>
            </button>
          )
        })}
      </div>

      {/* Poderes Elementais */}
      <SectionTitle>Poderes Elementais</SectionTitle>
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ALL_POWERS.map((power, i) => {
          const isUnlocked = unlockedPowers.some(p => p.id === power.id)
          return (
            <div
              key={power.id}
              className="animate-fade-up"
              style={{
                animationDelay: `${i * 60}ms`,
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 14, borderRadius: 16,
                border: `1px solid ${isUnlocked ? power.color + '40' : '#D6E4F0'}`,
                background: isUnlocked ? power.bg : '#F9FAFB',
                opacity: isUnlocked ? 1 : 0.6,
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: isUnlocked ? power.bg : '#F0F4F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, border: `1px solid ${isUnlocked ? power.color + '30' : '#D6E4F0'}` }}>
                {power.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: isUnlocked ? power.color : '#9AABB8' }}>
                    {power.name}
                  </p>
                  {isUnlocked
                    ? <span style={{ fontSize: 9, fontWeight: 700, background: power.color, color: 'white', padding: '2px 8px', borderRadius: 999 }}>DESBLOQUEADO</span>
                    : <span style={{ fontSize: 9, fontWeight: 700, background: '#F0F4F8', color: '#9AABB8', padding: '2px 8px', borderRadius: 999 }}>BLOQUEADO</span>
                  }
                </div>
                <p style={{ fontSize: 11, color: '#6B7E91' }}>
                  {isUnlocked ? `🛡 ${power.passive}` : `🔒 ${power.unlock}`}
                </p>
                {isUnlocked && (
                  <p style={{ fontSize: 10, color: power.color, marginTop: 4, fontWeight: 600 }}>
                    🗡 {power.baseDamage} de dano base · Forte vs {power.element === 'Fogo' ? 'Vento' : power.element === 'Água' ? 'Fogo' : power.element === 'Terra' ? 'Água' : 'Terra'}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}