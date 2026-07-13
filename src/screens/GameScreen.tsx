import { useCallback, useEffect, useRef } from 'react'
import {
  BALLOON_INITIAL_SPEED_X,
  BALLOON_LARGE_RADIUS,
  GAME_WIDTH,
  PLAYER_SPEED,
  PLAYER_WIDTH,
} from '../game/constants'
import GameViewport from '../game/GameViewport'
import Player from '../game/Player'
import Balloon from '../game/Balloon'
import Wire from '../game/Wire'
import { usePlayerMovement } from '../game/usePlayerMovement'
import { useBalloonPhysics } from '../game/useBalloonPhysics'
import { useWire } from '../game/useWire'

interface GameScreenProps {
  onBackToMain: () => void
}

function GameScreen({ onBackToMain }: GameScreenProps) {
  const playerX = usePlayerMovement(GAME_WIDTH, PLAYER_WIDTH, PLAYER_SPEED)
  const balloon = useBalloonPhysics({
    x: GAME_WIDTH / 2,
    y: BALLOON_LARGE_RADIUS,
    vx: BALLOON_INITIAL_SPEED_X,
    vy: 0,
    radius: BALLOON_LARGE_RADIUS,
  })

  const playerXRef = useRef(playerX)
  useEffect(() => {
    playerXRef.current = playerX
  }, [playerX])
  const getPlayerCenterX = useCallback(() => playerXRef.current + PLAYER_WIDTH / 2, [])

  const wireX = useWire(getPlayerCenterX)

  return (
    <div className="screen">
      <GameViewport>
        <Player x={playerX} />
        <Balloon x={balloon.x} y={balloon.y} radius={balloon.radius} />
        {wireX !== null && <Wire x={wireX} />}
      </GameViewport>
      <div className="menu">
        <button onClick={onBackToMain}>메인으로 돌아가기</button>
      </div>
    </div>
  )
}

export default GameScreen
