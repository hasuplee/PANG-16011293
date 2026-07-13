import { useMenuNavigation } from '../hooks/useMenuNavigation'

interface MainScreenProps {
  onStart: () => void
  onSelectMission: () => void
  onExit: () => void
}

function MainScreen({ onStart, onSelectMission, onExit }: MainScreenProps) {
  const items = [
    { label: '시작하기', onSelect: onStart },
    { label: '게임 선택', onSelect: onSelectMission },
    { label: '게임 종료', onSelect: onExit },
  ]

  const { selectedIndex, setSelectedIndex } = useMenuNavigation(items.length, (index) =>
    items[index].onSelect(),
  )

  return (
    <div className="screen">
      <h1 className="title">PANG</h1>
      <div className="menu">
        {items.map((item, index) => (
          <button
            key={item.label}
            className={index === selectedIndex ? 'selected' : undefined}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={item.onSelect}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MainScreen
