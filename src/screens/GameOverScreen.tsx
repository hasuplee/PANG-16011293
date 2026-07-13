interface GameOverScreenProps {
  onBackToMain: () => void
}

function GameOverScreen({ onBackToMain }: GameOverScreenProps) {
  return (
    <div className="screen">
      <h1 className="title">게임 오버</h1>
      <div className="menu">
        <button onClick={onBackToMain}>메인으로 돌아가기</button>
      </div>
    </div>
  )
}

export default GameOverScreen
