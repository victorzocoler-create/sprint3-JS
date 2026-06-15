import { useState, useEffect, useCallback } from 'react'
import { DAILY_CHALLENGES, BADGES, getLevelInfo, POWERS, ELEMENT_ADVANTAGE, BATTLE_OPPONENTS } from './gameData'

const STORAGE_KEY = 'careplus_health_score_v3'

function loadLoggedUser() {
  try {
    const logged = localStorage.getItem('cp_logged')
    if (logged) {
      const u = JSON.parse(logged)
      if (u.pet) {
        const elapsed = (Date.now() - (u.pet.lastTick || Date.now())) / 1000 / 60
        const decay   = Math.min(elapsed * 0.5, 40)
        u.pet.hunger    = Math.max(0, (u.pet.hunger    || 100) - decay)
        u.pet.hygiene   = Math.max(0, (u.pet.hygiene   || 100) - decay * 0.6)
        u.pet.happiness = Math.max(0, (u.pet.happiness || 100) - decay * 0.4)
        u.pet.energy    = Math.max(0, (u.pet.energy    || 100) - decay * 0.3)
        u.pet.lastTick  = Date.now()
      }
      return u
    }
  } catch {}
  return null
}

const DEFAULT_PET = {
  name: 'Bolinha',
  hunger:    100,
  hygiene:   100,
  happiness: 100,
  energy:    100,
  lastTick:  Date.now(),
}

const DEFAULT_STATE = {
  ps: 9200,
  streak: 5,
  completedToday: { checkup: true },
  unlockedBadges: ['imunidade', 'checkup_hero', 'caminhante'],
  streakDays: [true, true, true, true, true, false, false],
  redeemedVouchers: [],
  pet: DEFAULT_PET,
  unlockedPowers: ['fire'],
  battleHistory: {},
  totalCheckups: 1,
  exerciseStreak: 7,
  waterStreak: 14,
  meditationDays: 21,
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.pet) {
        const elapsed = (Date.now() - (parsed.pet.lastTick || Date.now())) / 1000 / 60
        const decay   = Math.min(elapsed * 0.5, 40)
        parsed.pet.hunger    = Math.max(0, parsed.pet.hunger    - decay)
        parsed.pet.hygiene   = Math.max(0, parsed.pet.hygiene   - decay * 0.6)
        parsed.pet.happiness = Math.max(0, parsed.pet.happiness - decay * 0.4)
        parsed.pet.energy    = Math.max(0, parsed.pet.energy    - decay * 0.3)
        parsed.pet.lastTick  = Date.now()
      }
      return parsed
    }
  } catch {}
  const logged = loadLoggedUser()
  return logged || DEFAULT_STATE
}

function calcDamage(power, petStats, isAdvantage, isWeakness) {
  const statBonus = Math.round(petStats[power.bonusStat] * 0.2)
  let damage = power.baseDamage + statBonus
  if (isAdvantage) damage = Math.round(damage * 1.5)
  if (isWeakness)  damage = Math.round(damage * 0.6)
  return damage
}

function simulateRound(playerPower, opponentPowerId, playerPet) {
  const oppPower = POWERS.find(p => p.id === opponentPowerId)
  const myPower  = POWERS.find(p => p.id === playerPower)
  const myAdv    = ELEMENT_ADVANTAGE[playerPower].strong === opponentPowerId
  const myWeak   = ELEMENT_ADVANTAGE[playerPower].weak   === opponentPowerId
  const playerDmg   = calcDamage(myPower,  playerPet, myAdv,  myWeak)
  const opponentDmg = calcDamage(oppPower, { hunger: 70, hygiene: 70, happiness: 70, energy: 70 }, !myAdv && !myWeak ? false : myWeak, myAdv)
  return {
    playerDamage:   playerDmg,
    opponentDamage: opponentDmg,
    playerPower:    myPower,
    opponentPower:  oppPower,
    advantage:      myAdv ? 'player' : myWeak ? 'opponent' : 'none',
  }
}

export function useGameState() {
  const [state, setState]         = useState(load)
  const [toast, setToast]         = useState(null)
  const [particles, setParticles] = useState([])

  // Pet decay a cada 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        const hasFire  = prev.unlockedPowers.includes('fire')
        const hasWater = prev.unlockedPowers.includes('water')
        const hasWind  = prev.unlockedPowers.includes('wind')
        return {
          ...prev,
          pet: {
            ...prev.pet,
            hunger:    Math.max(0, prev.pet.hunger    - (hasWater ? 0.25 : 0.5)),
            hygiene:   Math.max(0, prev.pet.hygiene   - 0.3),
            happiness: Math.max(0, prev.pet.happiness - (hasWind  ? 0.1  : 0.2)),
            energy:    Math.max(0, prev.pet.energy    - (hasFire  ? 0.08 : 0.15)),
            lastTick:  Date.now(),
          }
        }
      })
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  // Salva no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      // Sincroniza também no cp_logged
      const logged = localStorage.getItem('cp_logged')
      if (logged) {
        const user = JSON.parse(logged)
        const updated = { ...user, ...state }
        localStorage.setItem('cp_logged', JSON.stringify(updated))
      }
    } catch {}
  }, [state])

  const showToast = useCallback((msg) => {
    setToast({ msg })
    setTimeout(() => setToast(null), 2800)
  }, [])

  const spawnParticles = useCallback(() => {
    const items = Array.from({ length: 5 }, (_, i) => ({
      id: `${Date.now()}-${i}-${Math.random()}`,
      x: 25 + Math.random() * 50,
      delay: i * 0.1,
    }))
    setParticles(p => [...p, ...items])
    setTimeout(() => {
      setParticles(p => p.filter(x => !items.find(n => n.id === x.id)))
    }, 1500)
  }, [])

  const toggleChallenge = useCallback((challengeId) => {
    const ch = DAILY_CHALLENGES.find(c => c.id === challengeId)
    if (!ch) return
    setState(prev => {
      const done        = !!prev.completedToday[challengeId]
      const newCompleted = { ...prev.completedToday }
      const newPS       = done ? prev.ps - ch.ps : prev.ps + ch.ps
      if (done) {
        delete newCompleted[challengeId]
      } else {
        newCompleted[challengeId] = true
        spawnParticles()
        showToast(`+${ch.ps} PS conquistados!`)
      }
      return { ...prev, ps: Math.max(0, newPS), completedToday: newCompleted }
    })
  }, [showToast, spawnParticles])

  const redeemVoucher = useCallback((voucher) => {
    setState(prev => {
      if (prev.ps < voucher.ps) {
        showToast(`PS insuficientes!`)
        return prev
      }
      if (prev.redeemedVouchers.includes(voucher.id)) {
        showToast('Já resgatado!')
        return prev
      }
      if (!voucher.available) {
        showToast('Disponível apenas no nível Guardião+')
        return prev
      }
      spawnParticles()
      showToast(`✓ "${voucher.title}" resgatado! −${voucher.ps.toLocaleString('pt-BR')} PS`)
      return {
        ...prev,
        ps: prev.ps - voucher.ps,
        redeemedVouchers: [...prev.redeemedVouchers, voucher.id],
      }
    })
  }, [showToast, spawnParticles])

  const carePet = useCallback((action) => {
    setState(prev => {
      if (prev.ps < action.cost) {
        showToast(`PS insuficientes!`)
        return prev
      }
      spawnParticles()
      showToast(`${action.label} feito! −${action.cost} PS`)
      return {
        ...prev,
        ps: prev.ps - action.cost,
        pet: {
          ...prev.pet,
          [action.stat]: Math.min(100, prev.pet[action.stat] + action.boost),
        }
      }
    })
  }, [showToast, spawnParticles])

  const doBattle = useCallback((opponent, playerMoves) => {
    const results = playerMoves.map((move, i) => {
      const oppMove = opponent.powers[i % opponent.powers.length]
      return simulateRound(move, oppMove, state.pet)
    })

    const playerHP   = 300 - results.reduce((s, r) => s + r.opponentDamage, 0)
    const opponentHP = 300 - results.reduce((s, r) => s + r.playerDamage,   0)
    const playerWins = playerHP > opponentHP

    setState(prev => {
      const psChange = playerWins ? 200 : -150
      const prev_bh  = prev.battleHistory[opponent.id] || { wins: 0, losses: 0 }
      spawnParticles()
      showToast(playerWins ? `Vitória! +200 PS! 🏆` : `Derrota! −150 PS 😢`)
      return {
        ...prev,
        ps: Math.max(0, prev.ps + psChange),
        battleHistory: {
          ...prev.battleHistory,
          [opponent.id]: {
            wins:       playerWins ? prev_bh.wins + 1 : prev_bh.wins,
            losses:     playerWins ? prev_bh.losses   : prev_bh.losses + 1,
            lastBattle: Date.now(),
          }
        }
      }
    })

    return { results, playerHP: Math.max(0, playerHP), opponentHP: Math.max(0, opponentHP), playerWins }
  }, [state.pet, showToast, spawnParticles])

  const logout = useCallback(() => {
    localStorage.removeItem('cp_logged')
    localStorage.removeItem(STORAGE_KEY)
    window.location.reload()
  }, [])

  const levelInfo      = getLevelInfo(state.ps)
  const completedCount = Object.keys(state.completedToday).length
  const badges         = BADGES.map(b => ({ ...b, unlocked: state.unlockedBadges.includes(b.id) }))
  const unlockedPowers = POWERS.filter(p => state.unlockedPowers.includes(p.id))

  return {
    state, levelInfo, completedCount, badges,
    toast, particles, unlockedPowers,
    toggleChallenge, redeemVoucher, carePet, doBattle, showToast, logout,
  }
}