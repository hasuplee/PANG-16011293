import { useEffect, useState } from 'react'
import { GAME_HEIGHT, GAME_WIDTH, GRAVITY, GROUND_HEIGHT } from './constants'

export interface Balloon {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function useBalloonPhysics(initial: Balloon) {
  const [balloon, setBalloon] = useState<Balloon>(initial)

  useEffect(() => {
    let lastTime: number | null = null
    let frameId: number

    function tick(time: number) {
      if (lastTime !== null) {
        const dt = (time - lastTime) / 1000

        setBalloon((prev) => {
          let { x, y, vx, vy } = prev
          const { radius } = prev

          vy += GRAVITY * dt
          x += vx * dt
          y += vy * dt

          const groundY = GAME_HEIGHT - GROUND_HEIGHT - radius
          if (y >= groundY) {
            y = groundY
            vy = -vy
          } else if (y <= radius) {
            y = radius
            vy = -vy
          }

          if (x <= radius) {
            x = radius
            vx = -vx
          } else if (x >= GAME_WIDTH - radius) {
            x = GAME_WIDTH - radius
            vx = -vx
          }

          return { x, y, vx, vy, radius }
        })
      }
      lastTime = time
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return balloon
}
