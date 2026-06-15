import { IconCheckup, IconWalk, IconWater, IconFood, IconVaccine, IconSleep, IconMeditate, IconCheck } from './Icons'

const ICONS = { checkup: IconCheckup, walk: IconWalk, water: IconWater, food: IconFood, vaccine: IconVaccine, sleep: IconSleep, meditate: IconMeditate }

export default function ChallengeCard({ challenge, done, onToggle, delay = 0 }) {
  const Icon = ICONS[challenge.icon] || IconCheckup
  return (
    <button
      className="animate-fade-up"
      onClick={() => onToggle(challenge.id)}
      style={{
        animationDelay: `${delay}ms`,
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        borderRadius: 16,
        border: `1px solid ${done ? challenge.color + '40' : '#D6E4F0'}`,
        borderLeft: `3px solid ${done ? challenge.color : '#D6E4F0'}`,
        background: done ? challenge.bg : 'white',
        cursor: 'pointer',
      }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 12, background: challenge.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={22} color={challenge.color} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: done ? challenge.color : '#1A2B3C', marginBottom: 2 }}>{challenge.name}</p>
        <p style={{ fontSize: 11, color: '#6B7E91', marginBottom: 4 }}>{challenge.desc}</p>
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: challenge.bg, color: challenge.color, padding: '2px 8px', borderRadius: 999 }}>
          {challenge.category}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: challenge.color, background: challenge.bg, border: `1px solid ${challenge.color}30`, padding: '3px 10px', borderRadius: 8 }}>
          +{challenge.ps} PS
        </span>
        <div style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? challenge.color : '#F0F4F8', border: `1.5px solid ${done ? challenge.color : '#D6E4F0'}` }}>
          {done ? <IconCheck size={14} color="white" /> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D6E4F0' }} />}
        </div>
      </div>
    </button>
  )
}