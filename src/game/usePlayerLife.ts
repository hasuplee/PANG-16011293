import { useEffect, useRef, useState } from 'react'
import { Balloon, radiusOf } from './balloon'
import { isCircleRectColliding } from './collision'
import {
  GAME_HEIGHT,
  GROUND_HEIGHT,
  INITIAL_LIVES,
  INVULNERABLE_DURATION_MS,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
} from './constants'

export function usePlayerLife(playerX: number, balloons: Balloon[]) {
  const [lives, setLives] = useState(INITIAL_LIVES)
  const [invulnerable, setInvulnerable] = useState(false)
  const invulnerableUntilRef = useRef(0)

  useEffect(() => {
    const now = performance.now()
    if (now < invulnerableUntilRef.current) return

    const playerRect = {
      x: playerX,
      y: GAME_HEIGHT - GROUND_HEIGHT - PLAYER_HEIGHT,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    }

    const hit = balloons.some((balloon) =>
      isCircleRectColliding({ x: balloon.x, y: balloon.y, radius: radiusOf(balloon.tier) }, playerRect),
    )

    if (!hit) return

    invulnerableUntilRef.current = now + INVULNERABLE_DURATION_MS
    setInvulnerable(true)
    setLives((prev) => Math.max(prev - 1, 0))

    window.setTimeout(() => setInvulnerable(false), INVULNERABLE_DURATION_MS)
  }, [playerX, balloons])

  return { lives, invulnerable }
}
