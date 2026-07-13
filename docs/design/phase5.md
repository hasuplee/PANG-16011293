# Phase 5 설계 - 플레이어 충돌 및 라이프 시스템

관련 문서: [../PLAN.md](../PLAN.md) (Phase 5 항목), [../FEATURES/game_rule.md](../FEATURES/game_rule.md)

## 목표

플레이어가 풍선에 닿으면 라이프(목숨)가 1개 줄어들고, 화면에 남은 라이프 개수가 표시된다. 라이프를 모두 소진하면 게임 오버 화면으로 전환된다.

## 충돌 판정 (플레이어 vs 풍선)

- 플레이어는 사각형(`PLAYER_WIDTH` x `PLAYER_HEIGHT`), 풍선은 원(반지름은 tier별로 다름)이므로, **사각형-원 충돌 판정**을 사용한다.
- 판정 방식: 풍선 중심에서 플레이어 사각형까지의 가장 가까운 점을 구하고, 그 점과 풍선 중심 사이 거리가 풍선 반지름 이하이면 충돌로 본다 (표준 rect-circle collision).
- 플레이어의 y좌표는 항상 지면에 고정되어 있으므로(`GAME_HEIGHT - GROUND_HEIGHT - PLAYER_HEIGHT` ~ `GAME_HEIGHT - GROUND_HEIGHT`), 매 프레임 이 고정된 사각형과 모든 풍선을 비교한다.

## 라이프 감소 및 무적 시간

- 충돌이 감지되면 라이프를 1 감소시키고, 이후 짧은 무적 시간(`INVULNERABLE_DURATION_MS`, 1000ms) 동안은 추가로 풍선에 닿아도 라이프가 further 감소하지 않는다.
- 무적 시간을 두지 않으면 풍선과 계속 겹쳐있는 동안 매 프레임 라이프가 깎여 순식간에 게임 오버가 되므로, 체감상 "너무 예민한" 판정을 방지하기 위한 장치다.
- 무적 시간 동안 플레이어를 반투명하게 표시해 현재 무적 상태임을 시각적으로 알려준다.

## 라이프 UI 및 게임 오버

- 게임 화면 상단에 남은 라이프 개수를 텍스트로 표시한다.
- 라이프가 0이 되면 `App`의 화면 상태가 `gameOver`로 전환되어 게임 오버 화면이 표시된다.
- 게임 오버 화면에는 "메인으로 돌아가기" 버튼을 둔다.

## 파일 구조

```
src/game/
  constants.ts      - INITIAL_LIVES, INVULNERABLE_DURATION_MS 추가
  collision.ts       - 사각형-원 충돌 판정 순수 함수 (isCircleRectColliding)
  usePlayerLife.ts   - 플레이어 사각형과 풍선 배열을 비교해 라이프를 관리하는 훅 (무적 시간 포함)
src/screens/
  GameOverScreen.tsx - 게임 오버 안내 + 메인으로 돌아가기 버튼
```

- `App.tsx`의 화면 상태(`Screen`)에 `gameOver`를 추가한다.
- `GameScreen`은 `onGameOver` 콜백을 props로 받아, 라이프가 0이 되면 이를 호출해 화면 전환을 요청한다 (실제 화면 전환 자체는 `App`이 담당).

## Phase 5 테스트 포인트와의 매핑

- "충돌 판정이 체감상 정확한지" → rect-circle 판정 + 무적 시간으로 과도한 연속 감소 방지
- "라이프 UI 숫자가 줄어드는 게 잘 보이는지" → 게임 화면 상단 라이프 텍스트
- "라이프가 0이 되었을 때 게임 오버 화면으로 잘 전환되는지" → `onGameOver` → `App`의 `screen` 상태를 `gameOver`로 전환

## 범위에서 제외한 것

- 점수 획득, 스테이지 클리어 조건 (Phase 6)
- 라이프 초기값(5~10) 중 정확한 기본값 조정 - 우선 5로 설정, 고객님 피드백에 따라 조정
