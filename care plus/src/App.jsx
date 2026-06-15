import { useState, useEffect } from 'react'
import { useGameState } from './components/useGameState'
import AuthPage from './components/AuthPage'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import { Toast, Particles } from './components/Feedback'
import HomePage from './components/HomePage'
import RankingPage from './components/RankingPage'
import ClubePage from './components/ClubePage'
import MemoryGame from './components/MemoryGame'
import PetPage from './components/PetPage'
import ProfilePage from './components/ProfilePage'
import BattlePage from './components/BattlePage'

export default function App() {
  const [activeTab, setActiveTab]           = useState('home')
  const [battleOpponent, setBattleOpponent] = useState(null)
  const [loggedUser, setLoggedUser]         = useState(() => {
    try { return JSON.parse(localStorage.getItem('cp_logged')) } catch { return null }
  })

  const gameState = useGameState()
  const { state, toast, particles, showToast, redeemVoucher, carePet, doBattle, unlockedPowers, logout } = gameState

  // Se usuário logar, sincroniza o estado
  function handleLogin(user) {
    setLoggedUser(user)
  }

  // Não logado — mostra tela de auth
  if (!loggedUser) {
    return <AuthPage onLogin={handleLogin} />
  }

  const handleBattle = (opponent) => {
    setBattleOpponent(opponent)
    setActiveTab('battle')
  }

  const handleBackFromBattle = () => {
    setBattleOpponent(null)
    setActiveTab('ranking')
  }

  return (
    <>
      <Navbar ps={state.ps} streak={state.streak} />

      <div id="main" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        {activeTab === 'home'    && <HomePage    gameState={gameState} />}
        {activeTab === 'ranking' && (
          <RankingPage
            showToast={showToast}
            onBattle={handleBattle}
            battleHistory={state.battleHistory}
            unlockedPowers={unlockedPowers}
          />
        )}
        {activeTab === 'clube'   && (
          <ClubePage
            ps={state.ps}
            redeemedVouchers={state.redeemedVouchers}
            redeemVoucher={redeemVoucher}
          />
        )}
        {activeTab === 'memory'  && <MemoryGame  showToast={showToast} />}
        {activeTab === 'pet'     && (
          <PetPage
            pet={state.pet}
            ps={state.ps}
            carePet={carePet}
            unlockedPowers={unlockedPowers}
          />
        )}
        {activeTab === 'profile' && (
          <ProfilePage
            state={state}
            showToast={showToast}
            logout={logout}
            userName={loggedUser.name}
            petName={loggedUser.petName}
          />
        )}
        {activeTab === 'battle'  && battleOpponent && (
          <BattlePage
            opponent={battleOpponent}
            unlockedPowers={unlockedPowers}
            doBattle={doBattle}
            onBack={handleBackFromBattle}
            ps={state.ps}
          />
        )}
      </div>

      {activeTab !== 'battle' && (
        <BottomNav active={activeTab} onTabChange={setActiveTab} />
      )}

      <Toast toast={toast} />
      <Particles particles={particles} />
    </>
  )
}