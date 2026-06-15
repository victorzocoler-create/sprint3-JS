import { IconShield, IconCheckup, IconWalk, IconTrophy, IconBrain, IconWater, IconMedal, IconPerson, IconLock } from './Icons'

const ICONS = { shield: IconShield, checkup: IconCheckup, walk: IconWalk, trophy: IconTrophy, brain: IconBrain, water: IconWater, medal: IconMedal, person: IconPerson }

export default function BadgesGrid({ badges, onBadgeClick }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, padding: '0 16px 20px' }}>
      {badges.map((badge, i) => {
        const Icon = ICONS[badge.icon] || IconShield
        return (
          <button
            key={badge.id}
            className="animate-fade-up"
            onClick={() => onBadgeClick(badge)}
            style={{
              animationDelay: `${i * 50}ms`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              padding: 12, borderRadius: 16, border: `1px solid ${badge.unlocked ? badge.color + '30' : '#D6E4F0'}`,
              background: badge.unlocked ? badge.bg : '#F0F4F8',
              opacity: badge.unlocked ? 1 : 0.55,
              cursor: 'pointer',
            }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: badge.unlocked ? badge.bg : '#E5EAF0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${badge.unlocked ? badge.color + '25' : '#D6E4F0'}` }}>
                <Icon size={22} color={badge.unlocked ? badge.color : '#9AABB8'} />
              </div>
              {!badge.unlocked && (
                <div style={{ position: 'absolute', bottom: -4, right: -4, width: 16, height: 16, background: '#6B7E91', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconLock size={9} color="white" />
                </div>
              )}
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: 1.3, color: badge.unlocked ? badge.color : '#9AABB8' }}>
              {badge.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}