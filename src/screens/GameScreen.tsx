import { useCallback, useEffect, useRef, useState } from 'react'
import {
  BALLOON_INITIAL_SPEED_X,
  BALLOON_LARGE_RADIUS,
  GAME_WIDTH,
  PLAYER_SPEED,
  PLAYER_WIDTH,
  SCORE_PER_HIT,
} from '../game/constants'
import GameViewport from '../game/GameViewport'
import Player from '../game/Player'
import BalloonSprite from '../game/BalloonSprite'
import Bullet from '../game/Bullet'
import { usePlayerMovement } from '../game/usePlayerMovement'
import { useGameplay } from '../game/useGameplay'
import { usePlayerLife } from '../game/usePlayerLife'
import { createBalloon, radiusOf } from '../game/balloon'

interface GameScreenProps {
  onBackToMain: () => void
  onGameOver: (score: number) => void
  onStageClear: (score: number) => void
}

const INITIAL_BALLOONS = [
  createBalloon('large', GAME_WIDTH / 2, BALLOON_LARGE_RADIUS, BALLOON_INITIAL_SPEED_X, 0),
]

function GameScreen({ onBackToMain, onGameOver, onStageClear }: GameScreenProps) {
  const playerX = usePlayerMovement(GAME_WIDTH, PLAYER_WIDTH, PLAYER_SPEED)

  const playerXRef = useRef(playerX)
  useEffect(() => {
    playerXRef.current = playerX
  }, [playerX])
  const getPlayerCenterX = useCallback(() => playerXRef.current + PLAYER_WIDTH / 2, [])

  const [score, setScore] = useState(0)
  const handleBalloonHit = useCallback(() => setScore((prev) => prev + SCORE_PER_HIT), [])

  const { balloons, bullet } = useGameplay(INITIAL_BALLOONS, getPlayerCenterX, handleBalloonHit)
  const { lives, invulnerable } = usePlayerLife(playerX, balloons)

  const hasEndedRef = useRef(false)

  useEffect(() => {
    if (hasEndedRef.current) return
    if (lives <= 0) {
      hasEndedRef.current = true
      onGameOver(score)
    }
  }, [lives, score, onGameOver])

  useEffect(() => {
    if (hasEndedRef.current) return
    if (balloons.length === 0) {
      hasEndedRef.current = true
      onStageClear(score)
    }
  }, [balloons, score, onStageClear])

  return (
    <div className="screen">
      <div className="hud">
        <span>라이프: {lives}</span>
        <span>점수: {score}</span>
      </div>
      <GameViewport>
        <Player x={playerX} invulnerable={invulnerable} />
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
