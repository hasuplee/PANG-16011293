interface BalloonProps {
  x: number
  y: number
  radius: number
}

function Balloon({ x, y, radius }: BalloonProps) {
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

export default Balloon
