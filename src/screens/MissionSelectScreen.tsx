import { useMenuNavigation } from '../hooks/useMenuNavigation'

interface MissionSelectScreenProps {
  onSelectMission1: () => void
  onBack: () => void
}

function MissionSelectScreen({ onSelectMission1, onBack }: MissionSelectScreenProps) {
  const items = [
    { label: 'Mission 1', onSelect: onSelectMission1 },
    { label: '뒤로가기', onSelect: onBack },
  ]

  const { selectedIndex, setSelectedIndex } = useMenuNavigation(items.length, (index) =>
    items[index].onSelect(),
  )

  return (
    <div className="screen">
      <h1 className="title">게임 선택</h1>
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

export default MissionSelectScreen
