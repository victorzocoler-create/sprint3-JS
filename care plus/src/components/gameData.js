// Os dados abaixo espelham src/data/db.json
// Em produção, seriam consumidos via API REST
// O hook useDB (src/data/useDB.js) demonstra o consumo via fetch

export const LEVELS = [
  {
    id: 'recruta',
    name: 'Recruta',
    minPS: 0,
    maxPS: 15000,
    discount: '5%',
    benefit: 'Desconto fixo no Clube de Vantagens e vouchers básicos',
    color: '#6B7E91',
    icon: 'shield',
  },
  {
    id: 'guardiao',
    name: 'Guardião',
    minPS: 15001,
    maxPS: 35000,
    discount: '10%',
    benefit: 'Desconto fixo, vouchers Premium e sorteios exclusivos (1x/ano)',
    color: '#1B6DB8',
    icon: 'shield',
  },
  {
    id: 'mestre',
    name: 'Mestre',
    minPS: 35001,
    maxPS: Infinity,
    discount: '15%',
    benefit: 'Acesso total ao catálogo e Consultoria de Bem-Estar gratuita (1x/ano)',
    color: '#F5A623',
    icon: 'trophy',
  },
]

export function getLevelInfo(ps) {
  const current = LEVELS.find(l => ps >= l.minPS && ps <= l.maxPS) || LEVELS[0]
  const nextIndex = LEVELS.indexOf(current) + 1
  const next = LEVELS[nextIndex] || null
  const rangeSize = (current.maxPS === Infinity ? current.minPS + 20000 : current.maxPS) - current.minPS
  const progress = Math.min(100, Math.round(((ps - current.minPS) / rangeSize) * 100))
  return { current, next, progress }
}

export const DAILY_CHALLENGES = [
  {
    id: 'checkup',
    name: 'Agendar check-up anual',
    desc: 'Marque sua consulta preventiva',
    ps: 500,
    icon: 'checkup',
    color: '#1B6DB8',
    bg: '#EBF3FB',
    category: 'Prevenção',
  },
  {
    id: 'walk',
    name: 'Caminhar 30 minutos',
    desc: 'Qualquer horário, qualquer lugar',
    ps: 80,
    icon: 'walk',
    color: '#28A745',
    bg: '#EAF6ED',
    category: 'Exercício',
  },
  {
    id: 'water',
    name: 'Beber 2L de água',
    desc: 'Hidratação é saúde',
    ps: 50,
    icon: 'water',
    color: '#0EA5E9',
    bg: '#E0F4FD',
    category: 'Hidratação',
  },
  {
    id: 'food',
    name: 'Refeição saudável',
    desc: 'Registre uma refeição equilibrada',
    ps: 60,
    icon: 'food',
    color: '#16A34A',
    bg: '#DCFCE7',
    category: 'Nutrição',
  },
  {
    id: 'vaccine',
    name: 'Registrar vacinação',
    desc: 'Confirme sua carteira de vacinas',
    ps: 300,
    icon: 'vaccine',
    color: '#7C3AED',
    bg: '#F3F0FF',
    category: 'Imunização',
  },
  {
    id: 'sleep',
    name: 'Dormir 8 horas',
    desc: 'Registre seu horário de sono',
    ps: 100,
    icon: 'sleep',
    color: '#6366F1',
    bg: '#EEF2FF',
    category: 'Sono',
  },
  {
    id: 'meditate',
    name: 'Meditar 10 minutos',
    desc: 'Saúde mental também conta',
    ps: 70,
    icon: 'meditate',
    color: '#EC4899',
    bg: '#FDF2F8',
    category: 'Mental',
  },
]

export const BADGES = [
  { id: 'imunidade',    name: 'Imunidade Blindada',   desc: 'Registrou todas as vacinas do ano',       icon: 'shield',  color: '#1B6DB8', bg: '#EBF3FB', unlocked: true  },
  { id: 'checkup_hero', name: 'Herói da Prevenção',   desc: 'Realizou 3 check-ups consecutivos',       icon: 'checkup', color: '#28A745', bg: '#EAF6ED', unlocked: true  },
  { id: 'caminhante',   name: 'Caminhante Dedicado',  desc: 'Completou 30 dias de caminhada',          icon: 'walk',    color: '#F5A623', bg: '#FEF6E7', unlocked: true  },
  { id: 'guardiao_n',   name: 'Guardião da Saúde',    desc: 'Atingiu o nível Guardião',                icon: 'trophy',  color: '#1B6DB8', bg: '#EBF3FB', unlocked: false },
  { id: 'mente_sa',     name: 'Mente Sã',             desc: 'Meditou por 21 dias seguidos',            icon: 'brain',   color: '#7C3AED', bg: '#F3F0FF', unlocked: false },
  { id: 'hidratado',    name: 'Super Hidratado',      desc: 'Bebeu 2L de água por 14 dias',            icon: 'water',   color: '#0EA5E9', bg: '#E0F4FD', unlocked: false },
  { id: 'mestre_n',     name: 'Mestre da Saúde',      desc: 'Atingiu o nível Mestre',                  icon: 'medal',   color: '#F5A623', bg: '#FEF6E7', unlocked: false },
  { id: 'social',       name: 'Saúde em Família',     desc: 'Convidou 3 dependentes para o app',       icon: 'person',  color: '#EC4899', bg: '#FDF2F8', unlocked: false },
]

export const RANKING = [
  { pos: 1, name: 'Ana Souza',      ps: 42500, level: 'Mestre',   streak: 21, initials: 'AS' },
  { pos: 2, name: 'Carlos Mendes', ps: 38200, level: 'Mestre',   streak: 18, initials: 'CM' },
  { pos: 3, name: 'Beatriz Lima',  ps: 29700, level: 'Guardião', streak: 15, initials: 'BL' },
  { pos: 4, name: 'João Ferreira', ps: 22100, level: 'Guardião', streak: 12, initials: 'JF' },
  { pos: 5, name: 'Maria Costa',   ps: 18400, level: 'Guardião', streak: 9,  initials: 'MC' },
  { pos: 6, name: 'Você',          ps: 9200,  level: 'Recruta',  streak: 5,  initials: 'EU', isUser: true },
]

export const VOUCHERS = [
  { id: 'v1', title: '10% off Academia',  partner: 'Smart Fit',   ps: 2000, category: 'Exercício', available: true  },
  { id: 'v2', title: '15% off Farmácia',  partner: 'Drogasil',    ps: 1500, category: 'Saúde',     available: true  },
  { id: 'v3', title: 'Consulta Nutrição', partner: 'Care Plus',   ps: 3000, category: 'Nutrição',  available: false },
  { id: 'v4', title: 'Desconto Óptica',   partner: 'Ótica Carol', ps: 2500, category: 'Bem-Estar', available: true  },
  { id: 'v5', title: 'Sorteio Exclusivo', partner: 'Care Plus',   ps: 5000, category: 'Premium',   available: false },
]

export const WEEK_DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

// ─── Poderes Elementais ───────────────────────────────────────────────────────

export const POWERS = [
  {
    id: 'fire',
    name: 'Chama Vital',
    element: 'Fogo',
    icon: '🔥',
    color: '#EF4444',
    bg: '#FEF2F2',
    description: 'Ataque explosivo que queima a energia do oponente',
    unlock: 'Complete 7 dias seguidos de exercício',
    baseDamage: 35,
    bonusStat: 'energy',     // stat do pet que dá bônus
    strongAgainst: 'wind',
    weakAgainst: 'water',
    passive: 'Energia do pet decai 50% mais devagar',
  },
  {
    id: 'water',
    name: 'Fluxo Puro',
    element: 'Água',
    icon: '💧',
    color: '#0EA5E9',
    bg: '#E0F4FD',
    description: 'Golpe fluido que dilui as forças do adversário',
    unlock: 'Beba 2L de água por 14 dias seguidos',
    baseDamage: 30,
    bonusStat: 'hygiene',
    strongAgainst: 'fire',
    weakAgainst: 'earth',
    passive: 'Fome do pet decai 50% mais devagar',
  },
  {
    id: 'earth',
    name: 'Raiz Forte',
    element: 'Terra',
    icon: '🌱',
    color: '#16A34A',
    bg: '#DCFCE7',
    description: 'Defesa sólida que drena os pontos do oponente',
    unlock: 'Realize 3 consultas médicas no total',
    baseDamage: 28,
    bonusStat: 'hunger',
    strongAgainst: 'water',
    weakAgainst: 'wind',
    passive: '+20 em todas as stats ao desbloquear',
  },
  {
    id: 'wind',
    name: 'Mente Livre',
    element: 'Vento',
    icon: '🌀',
    color: '#7C3AED',
    bg: '#F3F0FF',
    description: 'Ataque mental que confunde e enfraquece o rival',
    unlock: 'Complete 21 dias de meditação',
    baseDamage: 32,
    bonusStat: 'happiness',
    strongAgainst: 'earth',
    weakAgainst: 'fire',
    passive: 'Alegria do pet decai 50% mais devagar',
  },
]

export const ELEMENT_ADVANTAGE = {
  fire:  { strong: 'wind',  weak: 'water' },
  water: { strong: 'fire',  weak: 'earth' },
  earth: { strong: 'water', weak: 'wind'  },
  wind:  { strong: 'earth', weak: 'fire'  },
}

export const BATTLE_OPPONENTS = [
  { id: 'r1', name: 'Ana Souza',      initials: 'AS', ps: 42500, level: 'Mestre',   powers: ['fire', 'water'],        petMood: 'happy'   },
  { id: 'r2', name: 'Carlos Mendes', initials: 'CM', ps: 38200, level: 'Mestre',   powers: ['earth', 'wind'],        petMood: 'happy'   },
  { id: 'r3', name: 'Beatriz Lima',  initials: 'BL', ps: 29700, level: 'Guardião', powers: ['water', 'wind'],        petMood: 'neutral' },
  { id: 'r4', name: 'João Ferreira', initials: 'JF', ps: 22100, level: 'Guardião', powers: ['fire'],                 petMood: 'neutral' },
  { id: 'r5', name: 'Maria Costa',   initials: 'MC', ps: 18400, level: 'Guardião', powers: ['earth'],                petMood: 'sad'     },
]