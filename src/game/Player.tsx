import { PLAYER_HEIGHT, PLAYER_WIDTH } from './constants'

interface PlayerProps {
  x: number
  invulnerable?: boolean
}

function Player({ x, invulnerable }: PlayerProps) {
  return (
    <div
      className={invulnerable ? 'player invulnerable' : 'player'}
      style={{
        left: x,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
      }}
    />
  )
}

export default Player
