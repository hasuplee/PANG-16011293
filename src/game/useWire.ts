import { useEffect, useRef, useState } from 'react'
import { FIRE_KEY, WIRE_DURATION_MS } from './constants'

export function useWire(getPlayerCenterX: () => number) {
  const [wireX, setWireX] = useState<number | null>(null)
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== FIRE_KEY) return
      event.preventDefault()

      setWireX((prev) => {
        if (prev !== null) return prev
        timeoutRef.current = window.setTimeout(() => {
          setWireX(null)
        }, WIRE_DURATION_MS)
        return getPlayerCenterX()
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.clearTimeout(timeoutRef.current)
    }
  }, [getPlayerCenterX])

  return wireX
}
