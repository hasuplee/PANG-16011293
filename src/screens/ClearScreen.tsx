interface ClearScreenProps {
  score: number
  onBackToMain: () => void
}

function ClearScreen({ score, onBackToMain }: ClearScreenProps) {
  return (
    <div className="screen">
      <h1 className="title">Mission 1 클리어!</h1>
      <p className="score-summary">최종 점수: {score}</p>
      <div className="menu">
        <button onClick={onBackToMain}>메인으로 돌아가기</button>
      </div>
    </div>
  )
}

export default ClearScreen
