interface WireProps {
  x: number
}

function Wire({ x }: WireProps) {
  return <div className="wire" style={{ left: x }} />
}

export default Wire
