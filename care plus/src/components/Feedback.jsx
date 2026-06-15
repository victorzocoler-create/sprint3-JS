import { IconCheck } from './Icons'

export function Toast({ toast }) {
  if (!toast) return null
  return (
    <div
      className="animate-toast"
      role="status"
      style={{
        position: 'fixed',
        bottom: 90,
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#1B6DB8',
        color: 'white',
        fontSize: 13,
        fontWeight: 700,
        padding: '10px 20px',
        borderRadius: 999,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        whiteSpace: 'nowrap',
        zIndex: 200,
        boxShadow: '0 4px 20px rgba(27,109,184,0.4)',
      }}
    >
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconCheck size={12} color="white" />
      </div>
      {toast.msg}
    </div>
  )
}

export function Particles({ particles }) {
  if (!particles.length) return null
  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          className="animate-float"
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: `${p.x}%`,
            bottom: '35%',
            animationDelay: `${p.delay}s`,
            pointerEvents: 'none',
            zIndex: 300,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20">
            <path d="M10 1L12.5 7H19L13.5 11L15.5 17.5L10 13.5L4.5 17.5L6.5 11L1 7H7.5L10 1Z" fill="#F5A623" />
          </svg>
        </div>
      ))}
    </>
  )
}