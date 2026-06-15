import { WEEK_DAYS } from './gameData'
import { IconCheck } from './Icons'

export default function StreakBar({ streakDays }) {
  const todayIndex = 5
  return (
    <div style={{ display: 'flex', gap: 8, padding: '0 16px 20px' }}>
      {WEEK_DAYS.map((day, i) => {
        const isPast  = i < todayIndex
        const isToday = i === todayIndex
        const done    = streakDays[i]
        return (
          <div key={day} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '10px 0', borderRadius: 12,
            background: isToday ? '#1B6DB8' : (isPast && done) ? '#EBF3FB' : '#F0F4F8',
            border: `1px solid ${isToday ? '#1B6DB8' : (isPast && done) ? 'rgba(27,109,184,0.3)' : '#D6E4F0'}`,
          }}>
            <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isToday
                ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />
                : (isPast && done)
                ? <IconCheck size={14} color="#1B6DB8" />
                : <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D6E4F0' }} />
              }
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: isToday ? 'white' : (isPast && done) ? '#1B6DB8' : '#6B7E91' }}>
              {day}
            </span>
          </div>
        )
      })}
    </div>
  )
}