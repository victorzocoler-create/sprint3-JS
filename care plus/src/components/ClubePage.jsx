import { VOUCHERS, LEVELS, getLevelInfo } from './gameData'
import SectionTitle from './SectionTitle'
import { IconShield, IconTrophy, IconDiscount, IconArrowRight, IconLock, IconCheck } from './Icons'

const LEVEL_ICONS = { recruta: IconShield, guardiao: IconShield, mestre: IconTrophy }

export default function ClubePage({ ps, redeemedVouchers = [], redeemVoucher }) {
  const { current } = getLevelInfo(ps)

  return (
    <div>
      <div style={{ padding: '24px 20px 16px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1A2B3C' }}>Clube de Vantagens</h1>
        <p style={{ fontSize: 13, color: '#6B7E91', marginTop: 4 }}>Troque seus PS por benefícios reais</p>
      </div>

      {/* PS balance */}
      <div style={{ margin: '0 16px 16px', background: 'linear-gradient(135deg, #1B6DB8, #145494)', borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Seu saldo</p>
          <p style={{ fontSize: 26, fontWeight: 900, color: 'white', lineHeight: 1.2 }}>
            {ps.toLocaleString('pt-BR')} <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.7 }}>PS</span>
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>Nível atual</p>
          <p style={{ fontSize: 14, fontWeight: 800, color: '#F5A623' }}>{current.name}</p>
        </div>
      </div>

      {/* Level progression */}
      <SectionTitle>Progressão por Nível</SectionTitle>
      <div style={{ padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {LEVELS.map((level, i) => {
          const LevelIcon = LEVEL_ICONS[level.id] || IconShield
          const isActive  = current.id === level.id
          const isPast    = LEVELS.indexOf(current) > i
          return (
            <div key={level.id} className="animate-fade-up"
              style={{ animationDelay: `${i * 70}ms`, display: 'flex', alignItems: 'flex-start', gap: 12, padding: 16, borderRadius: 16, background: isActive ? level.color + '10' : isPast ? '#F0F4F8' : 'white', border: `${isActive ? 2 : 1}px solid ${isActive ? level.color + '40' : '#D6E4F0'}`, opacity: isPast ? 0.7 : 1 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: level.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <LevelIcon size={22} color={level.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 14, fontWeight: 800, color: level.color }}>{level.name}</p>
                  {isActive && <span style={{ fontSize: 9, fontWeight: 700, background: level.color, color: 'white', padding: '2px 8px', borderRadius: 999 }}>ATUAL</span>}
                  {isPast  && <span style={{ fontSize: 9, fontWeight: 700, background: '#28A74520', color: '#28A745', padding: '2px 8px', borderRadius: 999 }}>CONCLUÍDO</span>}
                </div>
                <p style={{ fontSize: 11, color: '#6B7E91', marginBottom: 6 }}>
                  {level.minPS.toLocaleString('pt-BR')}{level.maxPS !== Infinity ? ` – ${level.maxPS.toLocaleString('pt-BR')} PS` : '+ PS'}
                </p>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#1A2B3C' }}>
                  <span style={{ color: level.color, fontWeight: 800 }}>{level.discount}</span> — {level.benefit}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Vouchers */}
      <SectionTitle>Vouchers Disponíveis</SectionTitle>
      <div style={{ padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {VOUCHERS.map((v, i) => {
          const redeemed  = redeemedVouchers.includes(v.id)
          const canAfford = ps >= v.ps
          const canRedeem = v.available && canAfford && !redeemed

          return (
            <div key={v.id} className="animate-fade-up"
              style={{ animationDelay: `${i * 60}ms`, display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, background: redeemed ? '#EAF6ED' : canRedeem ? '#FEF6E7' : 'white', border: `1px solid ${redeemed ? '#28A74540' : canRedeem ? '#F5A62340' : '#D6E4F0'}`, opacity: (!v.available && !redeemed) ? 0.55 : 1 }}>

              <div style={{ width: 44, height: 44, borderRadius: 12, background: redeemed ? '#EAF6ED' : canRedeem ? '#FEF6E7' : '#F0F4F8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {redeemed
                  ? <IconCheck size={22} color="#28A745" />
                  : v.available
                  ? <IconDiscount size={22} color={canRedeem ? '#F5A623' : '#6B7E91'} />
                  : <IconLock size={20} color="#9AABB8" />
                }
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: redeemed ? '#28A745' : '#1A2B3C' }}>{v.title}</p>
                <p style={{ fontSize: 11, color: '#6B7E91', marginBottom: 4 }}>{v.partner}</p>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', background: redeemed ? '#28A74520' : canRedeem ? '#F5A62320' : '#F0F4F8', color: redeemed ? '#28A745' : canRedeem ? '#D4891A' : '#9AABB8', padding: '2px 8px', borderRadius: 999 }}>
                  {v.category}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, background: redeemed ? '#28A74520' : canRedeem ? '#F5A62320' : '#F0F4F8', color: redeemed ? '#28A745' : canRedeem ? '#D4891A' : '#9AABB8', padding: '3px 10px', borderRadius: 8 }}>
                  {redeemed ? 'Resgatado' : `−${v.ps.toLocaleString('pt-BR')} PS`}
                </span>
                {!redeemed && (
                  <button
                    onClick={() => redeemVoucher(v)}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: canRedeem ? 'white' : '#9AABB8', background: canRedeem ? '#F5A623' : '#F0F4F8', border: 'none', borderRadius: 8, padding: '5px 10px', cursor: canRedeem ? 'pointer' : 'not-allowed' }}
                  >
                    Resgatar
                    <IconArrowRight size={13} color={canRedeem ? 'white' : '#9AABB8'} />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}