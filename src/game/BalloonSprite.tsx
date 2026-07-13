interface BalloonSpriteProps {
  x: number
  y: number
  radius: number
}

function BalloonSprite({ x, y, radius }: BalloonSpriteProps) {
  return (
    <div
      className="balloon"
      style={{
        left: x - radius,
        top: y - radius,
        width: radius * 2,
        height: radius * 2,
      }}
    />
  )
}

export default BalloonSprite
