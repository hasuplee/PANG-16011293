import type { ReactNode } from 'react'
import { GAME_HEIGHT, GAME_WIDTH } from './constants'

interface GameViewportProps {
  children: ReactNode
}

function GameViewport({ children }: GameViewportProps) {
  return (
    <div className="game-viewport" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
      <div className="game-ground" />
      {children}
    </div>
  )
}

export default GameViewport
