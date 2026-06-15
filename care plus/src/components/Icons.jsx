export function IconHeart({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z"
        fill={color} stroke={color} strokeWidth="0.5" strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconShield({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L4 5.5V11C4 15.52 7.42 19.74 12 21C16.58 19.74 20 15.52 20 11V5.5L12 2Z" fill={color} />
      <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconTrophy({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 2H16V13C16 15.76 14.21 18.1 12 18.87C9.79 18.1 8 15.76 8 13V2Z" fill={color} />
      <path d="M4 4H8V10C8 10 5 10 4 8V4Z" fill={color} opacity="0.7" />
      <path d="M16 4H20V8C20 10 17 10 16 10V4Z" fill={color} opacity="0.7" />
      <rect x="10" y="19" width="4" height="3" rx="1" fill={color} />
      <rect x="7" y="21" width="10" height="2" rx="1" fill={color} />
    </svg>
  )
}

export function IconMedal({ size = 24, color = '#F5A623' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="15" r="7" fill={color} />
      <circle cx="12" cy="15" r="5" fill="white" opacity="0.25" />
      <path d="M9 5L12 2L15 5L12 8L9 5Z" fill={color} />
      <line x1="10" y1="5" x2="10" y2="9" stroke={color} strokeWidth="1.5" />
      <line x1="14" y1="5" x2="14" y2="9" stroke={color} strokeWidth="1.5" />
      <text x="12" y="19" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">PS</text>
    </svg>
  )
}

export function IconCalendar({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="17" rx="3" stroke={color} strokeWidth="2" />
      <path d="M3 9H21" stroke={color} strokeWidth="2" />
      <path d="M8 2V5M16 2V5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <rect x="7" y="13" width="3" height="3" rx="0.5" fill={color} />
      <rect x="11" y="13" width="3" height="3" rx="0.5" fill={color} />
    </svg>
  )
}

export function IconCheckup({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="16" height="20" rx="3" stroke={color} strokeWidth="2" />
      <path d="M8 7H16M8 11H16M8 15H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="17" r="4" fill={color} />
      <path d="M15 17L16.5 18.5L19 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconWalk({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="13" cy="3.5" r="1.5" fill={color} />
      <path d="M10 8.5L13 6.5L16 9L14 12H18" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 12L11 16L8 19" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 12L15 15L18 18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconWater({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 5 10 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 10 12 2 12 2Z" fill={color} />
      <path d="M9 16C9 17.66 10.34 19 12 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconSleep({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79C20.33 14.09 19.28 15.16 18 15.84C16.72 16.52 15.28 16.79 13.85 16.6C12.42 16.42 11.07 15.8 9.97 14.81C8.87 13.82 8.07 12.5 7.67 11.03C7.27 9.56 7.28 8 7.7 6.53C8.12 5.06 8.93 3.76 10.03 2.79C8.07 3.25 6.3 4.32 5 5.84C3.7 7.36 2.96 9.25 2.9 11.22C2.84 13.19 3.47 15.12 4.68 16.72C5.89 18.32 7.61 19.5 9.56 20.1C11.51 20.71 13.61 20.7 15.56 20.08C17.5 19.46 19.22 18.27 20.42 16.66C21.28 15.5 21.79 14.17 21.97 12.79H21Z" fill={color} />
    </svg>
  )
}

export function IconFood({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M18 8C18 8 18 4 15 4C12 4 12 8 12 8H18Z" fill={color} />
      <rect x="11" y="8" width="8" height="12" rx="2" fill={color} opacity="0.8" />
      <path d="M6 4V10C6 11.1 6.9 12 8 12C9.1 12 10 11.1 10 10V4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconMeditate({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="4" r="2" fill={color} />
      <path d="M7 14C7 14 8 11 12 11C16 11 17 14 17 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 16H19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 11V16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 16L5 20M17 16L19 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconVaccine({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M15 3L21 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M14 6L18 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 7L17 13" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <rect x="5" y="11" width="8" height="5" rx="1" transform="rotate(-45 5 11)" fill={color} />
      <path d="M3 21L8 16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconBrain({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3C9.24 3 7 5.24 7 8C7 8.74 7.16 9.44 7.46 10.07C6.58 10.58 6 11.52 6 12.6C6 13.47 6.36 14.25 6.95 14.81C6.36 15.37 6 16.15 6 17C6 18.66 7.34 20 9 20H12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 3C14.76 3 17 5.24 17 8C17 8.74 16.84 9.44 16.54 10.07C17.42 10.58 18 11.52 18 12.6C18 13.47 17.64 14.25 17.05 14.81C17.64 15.37 18 16.15 18 17C18 18.66 16.66 20 15 20H12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="3" x2="12" y2="20" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

export function IconGift({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="10" width="18" height="11" rx="2" fill={color} />
      <rect x="2" y="6" width="20" height="5" rx="1.5" fill={color} opacity="0.85" />
      <line x1="12" y1="6" x2="12" y2="21" stroke="white" strokeWidth="1.5" />
      <path d="M12 6C12 6 9 6 9 4C9 2 12 2 12 6Z" stroke="white" strokeWidth="1.2" fill="none" />
      <path d="M12 6C12 6 15 6 15 4C15 2 12 2 12 6Z" stroke="white" strokeWidth="1.2" fill="none" />
    </svg>
  )
}

export function IconRanking({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2"  y="14" width="5" height="8" rx="1.5" fill={color} opacity="0.6" />
      <rect x="9"  y="9"  width="5" height="13" rx="1.5" fill={color} />
      <rect x="16" y="12" width="5" height="10" rx="1.5" fill={color} opacity="0.75" />
    </svg>
  )
}

export function IconPerson({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="7" r="4" fill={color} />
      <path d="M4 21C4 17.13 7.58 14 12 14C16.42 14 20 17.13 20 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconHome({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 3L21 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10V20C5 20.55 5.45 21 6 21H9V16H15V21H18C18.55 21 19 20.55 19 20V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconCheck({ size = 20, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M4 10L8.5 14.5L16 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconLock({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <rect x="4" y="9" width="12" height="9" rx="2" fill={color} />
      <path d="M7 9V6C7 4.34 8.34 3 10 3C11.66 3 13 4.34 13 6V9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconArrowRight({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M5 10H15M15 10L11 6M15 10L11 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconFlame({ size = 24, color = '#F5A623' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 17 7 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 10 8 8.5 8 8.5C8 8.5 8.5 11 10 11C10 11 9 7 12 2Z" fill={color} />
      <path d="M12 17C12 17 9 17 9 20C9 21.66 10.34 23 12 23C13.66 23 15 21.66 15 20C15 17 12 17 12 17Z" fill={color} opacity="0.7" />
    </svg>
  )
}

export function IconDiscount({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12.586 2.586A2 2 0 0011.172 2H6a2 2 0 00-2 2v5.172a2 2 0 00.586 1.414l8 8a2 2 0 002.828 0l5.172-5.172a2 2 0 000-2.828l-8-8z" fill={color} />
      <circle cx="8.5" cy="8.5" r="1.5" fill="white" />
      <path d="M15 13L9 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconPaw({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="16" rx="5" ry="4" fill={color} />
      <ellipse cx="7"  cy="11" rx="2.5" ry="3" fill={color} />
      <ellipse cx="17" cy="11" rx="2.5" ry="3" fill={color} />
      <ellipse cx="9"  cy="7"  rx="2" ry="2.5" fill={color} />
      <ellipse cx="15" cy="7"  rx="2" ry="2.5" fill={color} />
    </svg>
  )
}