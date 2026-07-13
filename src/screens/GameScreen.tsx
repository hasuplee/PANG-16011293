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
import BalloonSprite from '../game/BalloonSprite'
import Bullet from '../game/Bullet'
import { usePlayerMovement } from '../game/usePlayerMovement'
import { useGameplay } from '../game/useGameplay'
import { createBalloon, radiusOf } from '../game/balloon'

interface GameScreenProps {
  onBackToMain: () => void
}

const INITIAL_BALLOONS = [
  createBalloon('large', GAME_WIDTH / 2, BALLOON_LARGE_RADIUS, BALLOON_INITIAL_SPEED_X, 0),
]

function GameScreen({ onBackToMain }: GameScreenProps) {
  const playerX = usePlayerMovement(GAME_WIDTH, PLAYER_WIDTH, PLAYER_SPEED)

  const playerXRef = useRef(playerX)
  useEffect(() => {
    playerXRef.current = playerX
  }, [playerX])
  const getPlayerCenterX = useCallback(() => playerXRef.current + PLAYER_WIDTH / 2, [])

  const { balloons, bullet } = useGameplay(INITIAL_BALLOONS, getPlayerCenterX)

  return (
    <div className="screen">
      <GameViewport>
        <Player x={playerX} />
        {balloons.map((balloon) => (
          <BalloonSprite key={balloon.id} x={balloon.x} y={balloon.y} radius={radiusOf(balloon.tier)} />
        ))}
        {bullet && <Bullet x={bullet.x} y={bullet.y} />}
      </GameViewport>
      <div className="menu">
        <button onClick={onBackToMain}>메인으로 돌아가기</button>
      </div>
    </div>
  )
}

export default GameScreen
