import { GAME_WIDTH, PLAYER_SPEED, PLAYER_WIDTH } from '../game/constants'
import GameViewport from '../game/GameViewport'
import Player from '../game/Player'
import { usePlayerMovement } from '../game/usePlayerMovement'

interface GameScreenProps {
  onBackToMain: () => void
}

function GameScreen({ onBackToMain }: GameScreenProps) {
  const playerX = usePlayerMovement(GAME_WIDTH, PLAYER_WIDTH, PLAYER_SPEED)

  return (
    <div className="screen">
      <GameViewport>
        <Player x={playerX} />
      </GameViewport>
      <div className="menu">
        <button onClick={onBackToMain}>메인으로 돌아가기</button>
      </div>
    </div>
  )
}

export default GameScreen
