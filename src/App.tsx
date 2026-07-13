import { useState } from 'react'
import MainScreen from './screens/MainScreen'
import MissionSelectScreen from './screens/MissionSelectScreen'
import GameScreen from './screens/GameScreen'
import ExitedScreen from './screens/ExitedScreen'
import './App.css'

type Screen = 'main' | 'missionSelect' | 'game' | 'exited'

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
      return <GameScreen onBackToMain={() => setScreen('main')} />
    case 'exited':
      return <ExitedScreen onBackToMain={() => setScreen('main')} />
  }
}

export default App
