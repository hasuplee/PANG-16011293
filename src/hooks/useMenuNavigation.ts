import { useEffect, useState } from 'react'

export function useMenuNavigation(itemCount: number, onConfirm: (index: number) => void) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % itemCount)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + itemCount) % itemCount)
      } else if (event.key === 'Enter') {
        event.preventDefault()
        setSelectedIndex((prev) => {
          onConfirm(prev)
          return prev
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [itemCount, onConfirm])

  return { selectedIndex, setSelectedIndex }
}
