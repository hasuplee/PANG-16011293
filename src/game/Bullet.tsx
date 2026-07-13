import { BULLET_RADIUS } from './constants'

interface BulletProps {
  x: number
  y: number
}

function Bullet({ x, y }: BulletProps) {
  return (
    <div
      className="bullet"
      style={{
        left: x - BULLET_RADIUS,
        top: y - BULLET_RADIUS,
        width: BULLET_RADIUS * 2,
        height: BULLET_RADIUS * 2,
      }}
    />
  )
}

export default Bullet
