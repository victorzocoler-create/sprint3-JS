import { IconHome, IconCalendar, IconRanking, IconGift, IconPerson, IconPaw } from './Icons'

const TABS = [
  { id: 'home',     label: 'Início',    Icon: IconHome     },
  { id: 'missions', label: 'Missões',   Icon: IconCalendar },
  { id: 'ranking',  label: 'Ranking',   Icon: IconRanking  },
  { id: 'clube',    label: 'Vantagens', Icon: IconGift     },
  { id: 'pet',      label: 'Pet',       Icon: IconPaw      },
  { id: 'profile',  label: 'Perfil',    Icon: IconPerson   },
]

export default function BottomNav({ active, onTabChange }) {
  return (
    <nav style={{ display: 'flex', background: '#FFFFFF', borderTop: '1px solid #D6E4F0', flexShrink: 0 }}>
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            style={{
              flex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, padding: '8px 0',
              background: 'none', border: 'none', cursor: 'pointer',
            }}
          >
            <div style={{ width: 32, height: 26, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isActive ? '#EBF3FB' : 'transparent' }}>
              <Icon size={18} color={isActive ? '#1B6DB8' : '#9AABB8'} />
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em', color: isActive ? '#1B6DB8' : '#9AABB8' }}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}