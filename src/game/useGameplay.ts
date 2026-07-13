import { useEffect, useRef, useState } from 'react'
import {
  Balloon,
  isHitByBullet,
  splitBalloon,
  stepBalloonPhysics,
} from './balloon'
import {
  BULLET_RADIUS,
  BULLET_SPEED,
  FIRE_KEY,
  GAME_HEIGHT,
  GROUND_HEIGHT,
  PLAYER_HEIGHT,
} from './constants'

export interface Bullet {
  x: number
  y: number
}

const BULLET_START_Y = GAME_HEIGHT - GROUND_HEIGHT - PLAYER_HEIGHT

export function useGameplay(
  initialBalloons: Balloon[],
  getPlayerCenterX: () => number,
  onHit?: () => void,
) {
  const [balloons, setBalloons] = useState<Balloon[]>(initialBalloons)
  const [bullet, setBullet] = useState<Bullet | null>(null)

  const balloonsRef = useRef(balloons)
  const bulletRef = useRef(bullet)
  const fireRequestedRef = useRef(false)
  const onHitRef = useRef(onHit)
  useEffect(() => {
    onHitRef.current = onHit
  }, [onHit])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== FIRE_KEY) return
      event.preventDefault()
      if (bulletRef.current === null) {
        fireRequestedRef.current = true
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    let lastTime: number | null = null
    let frameId: number

    function tick(time: number) {
      if (lastTime !== null) {
        const dt = (time - lastTime) / 1000

        if (fireRequestedRef.current && bulletRef.current === null) {
          bulletRef.current = { x: getPlayerCenterX(), y: BULLET_START_Y }
        }
        fireRequestedRef.current = false

        const nextBalloons = balloonsRef.current.map((balloon) => stepBalloonPhysics(balloon, dt))

        let nextBullet = bulletRef.current
        if (nextBullet) {
          const fromY = nextBullet.y
          const toY = fromY - BULLET_SPEED * dt

          const hitIndex = nextBalloons.findIndex((balloon) =>
            isHitByBullet(balloon, nextBullet!.x, fromY, toY, BULLET_RADIUS),
          )

          if (hitIndex !== -1) {
            nextBalloons.splice(hitIndex, 1, ...splitBalloon(nextBalloons[hitIndex]))
            nextBullet = null
            onHitRef.current?.()
          } else if (toY <= 0) {
            nextBullet = null
          } else {
            nextBullet = { x: nextBullet.x, y: toY }
          }
        }

        balloonsRef.current = nextBalloons
        bulletRef.current = nextBullet
        setBalloons(nextBalloons)
        setBullet(nextBullet)
      }
      lastTime = time
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [getPlayerCenterX])

  return { balloons, bullet }
}
