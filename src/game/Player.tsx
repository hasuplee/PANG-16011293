import { PLAYER_HEIGHT, PLAYER_WIDTH } from './constants'

interface PlayerProps {
  x: number
}

function Player({ x }: PlayerProps) {
  return (
    <div
      className="player"
      style={{
        left: x,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
      }}
    />
  )
}

export default Player
