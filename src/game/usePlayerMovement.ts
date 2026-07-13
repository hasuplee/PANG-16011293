import { useEffect, useRef, useState } from 'react'

const MOVE_KEYS = new Set(['ArrowLeft', 'ArrowRight'])

export function usePlayerMovement(gameWidth: number, playerWidth: number, speed: number) {
  const [playerX, setPlayerX] = useState((gameWidth - playerWidth) / 2)
  const pressedKeys = useRef(new Set<string>())

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (MOVE_KEYS.has(event.key)) {
        event.preventDefault()
        pressedKeys.current.add(event.key)
      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (MOVE_KEYS.has(event.key)) {
        pressedKeys.current.delete(event.key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    let lastTime: number | null = null
    let frameId: number

    function tick(time: number) {
      if (lastTime !== null) {
        const deltaSeconds = (time - lastTime) / 1000
        let direction = 0
        if (pressedKeys.current.has('ArrowLeft')) direction -= 1
        if (pressedKeys.current.has('ArrowRight')) direction += 1

        if (direction !== 0) {
          setPlayerX((prev) => {
            const next = prev + direction * speed * deltaSeconds
            return Math.min(Math.max(next, 0), gameWidth - playerWidth)
          })
        }
      }
      lastTime = time
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      cancelAnimationFrame(frameId)
    }
  }, [gameWidth, playerWidth, speed])

  return playerX
}
