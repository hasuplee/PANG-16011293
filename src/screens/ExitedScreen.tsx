interface ExitedScreenProps {
  onBackToMain: () => void
}

function ExitedScreen({ onBackToMain }: ExitedScreenProps) {
  return (
    <div className="screen">
      <h1 className="title">게임을 종료했습니다</h1>
      <div className="menu">
        <button onClick={onBackToMain}>메인으로 돌아가기</button>
      </div>
    </div>
  )
}

export default ExitedScreen
