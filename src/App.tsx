import { useState } from 'react'
import MainScreen from './screens/MainScreen'
import MissionSelectScreen from './screens/MissionSelectScreen'
import GameScreen from './screens/GameScreen'
import ExitedScreen from './screens/ExitedScreen'
import GameOverScreen from './screens/GameOverScreen'
import './App.css'

type Screen = 'main' | 'missionSelect' | 'game' | 'exited' | 'gameOver'

function App() {
  const [screen, setScreen] = useState<Screen>('main')

  switch (screen) {
    case 'main':
      return (
        <MainScreen
          onStart={() => setScreen('game')}
          onSelectMission={() => setScreen('missionSelect')}
          onExit={() => setScreen('exited')}
        />
      )
    case 'missionSelect':
      return (
        <MissionSelectScreen
          onSelectMission1={() => setScreen('game')}
          onBack={() => setScreen('main')}
        />
      )
    case 'game':
      return (
        <GameScreen
          onBackToMain={() => setScreen('main')}
          onGameOver={() => setScreen('gameOver')}
        />
      )
    case 'exited':
      return <ExitedScreen onBackToMain={() => setScreen('main')} />
    case 'gameOver':
      return <GameOverScreen onBackToMain={() => setScreen('main')} />
  }
}

export default App
