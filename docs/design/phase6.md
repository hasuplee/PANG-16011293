# Phase 6 설계 - 점수 및 Mission 1 클리어

관련 문서: [../PLAN.md](../PLAN.md) (Phase 6 항목), [../FEATURES/game_rule.md](../FEATURES/game_rule.md)

## 목표

풍선을 맞힐 때마다 점수가 올라가고 화면에 표시된다. 배치된 풍선을 모두 제거하면 스테이지 클리어 화면으로 전환된다. 메인 화면 → 게임 시작 → Mission 1 플레이 → 게임 오버/클리어 → 메인 화면 복귀까지 전체 화면 흐름을 연결해 Mission 1을 처음부터 끝까지 플레이할 수 있게 한다.

## 점수

- 총알이 풍선에 맞을 때마다(분열이든 소멸이든 상관없이) 고정 점수 `SCORE_PER_HIT`를 획득한다.
- `useGameplay` 훅이 충돌을 감지하는 시점에 `onHit` 콜백을 호출하도록 확장하고, `GameScreen`이 이 콜백에서 점수 state를 증가시킨다.
- 게임 화면 상단 HUD에 라이프와 함께 현재 점수를 표시한다.

## 스테이지 클리어 조건

- `balloons` 배열의 길이가 0이 되면(배치된 모든 풍선이 분열을 거쳐 완전히 소멸하면) 스테이지 클리어로 판정한다.
- 클리어 시점의 점수를 들고 `clear` 화면으로 전환한다.

## 화면 흐름 연결

- `App.tsx`의 화면 상태에 `clear`를 추가한다.
- 게임 오버/클리어 시점의 최종 점수를 `App`이 보관했다가 각 결과 화면에 전달한다 (`GameScreen`이 언마운트되면 자체 점수 state는 사라지므로, 전환 콜백에 점수 값을 함께 넘겨 `App`이 기억하게 한다).
- `GameOverScreen`, 새로 추가하는 `ClearScreen` 모두 전달받은 최종 점수를 표시하고, "메인으로 돌아가기" 버튼으로 메인 화면에 복귀한다.
- 라이프 소진과 전체 풍선 제거가 동시에 발생하는 경계 상황에서 결과 화면 전환이 중복 호출되지 않도록, `GameScreen` 내부에 1회성 가드(ref)를 둔다.

## 파일 구조

```
src/game/
  constants.ts   - SCORE_PER_HIT 추가
  useGameplay.ts - 충돌 발생 시 호출할 onHit 콜백 파라미터 추가
src/screens/
  ClearScreen.tsx - "Mission 1 클리어" 안내 + 최종 점수 + 메인으로 돌아가기
  GameOverScreen.tsx - 최종 점수 표시 추가 (기존 화면 확장)
```

- `App.tsx`는 `finalScore` state를 보관하고, `GameScreen`의 `onGameOver`/`onStageClear` 콜백으로부터 점수를 받아 저장한 뒤 해당 결과 화면에 전달한다.

## Phase 6 테스트 포인트와의 매핑

- "점수가 풍선을 맞힐 때마다 정확히 올라가는지" → `onHit` 콜백 기반 점수 누적, HUD 표시
- "모든 풍선을 없앴을 때 클리어 화면이 뜨는지" → `balloons.length === 0` 감지 → `clear` 화면 전환
- "메인 화면부터 게임 오버/클리어 후 메인 화면 복귀까지 전체 흐름이 끊기지 않는지" → `App.tsx` 화면 상태 전체 연결
- "Mission 1을 처음부터 끝까지 플레이했을 때 종합 피드백" → 고객님 직접 플레이 후 코멘트

## 범위에서 제외한 것

- 하이스코어 저장(로컬 저장소 등 영속화) - 이후 별도 Phase
- Mission 2 이상 스테이지 추가
