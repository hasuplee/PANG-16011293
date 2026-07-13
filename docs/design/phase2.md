# Phase 2 설계 - 플레이어 이동

관련 문서: [../PLAN.md](../PLAN.md) (Phase 2 항목), [../FEATURES/game_rule.md](../FEATURES/game_rule.md)

## 목표

`GameScreen`에 실제 게임 플레이 영역(뷰포트)을 만들고, 그 안에 플레이어 캐릭터를 표시한다. 좌/우 방향키를 누르고 있는 동안 캐릭터가 부드럽게(연속적으로) 이동하며, 뷰포트 경계 밖으로는 나가지 않는다. 풍선/발사/충돌 로직은 아직 없다 (Phase 3 이후).

## 게임 뷰포트

- 고정 크기의 게임 영역을 하나 정의한다: 가로 800px, 세로 500px (`GAME_WIDTH`, `GAME_HEIGHT` 상수).
- 뷰포트는 Phase 1의 배경(하늘 그라데이션 + 서울 스카이라인)을 축소된 형태로 재사용하여 게임 화면임을 시각적으로 표현하되, 바닥에는 플레이어가 딛고 서는 명확한 지면 라인을 둔다.
- `overflow: hidden`으로 캐릭터가 시각적으로 뷰포트를 벗어나지 않게 한다.

## 플레이어 이동 방식

- 키를 누르고 있는 동안 계속 이동해야 하므로(연속 이동), `keydown`/`keyup` 시점에 눌린 키 집합을 추적하고 `requestAnimationFrame` 루프에서 매 프레임 위치를 갱신하는 방식을 사용한다. (단발성 `keydown` 이벤트마다 한 칸씩 이동하는 방식은 "부드러운 이동"이라는 목표에 맞지 않아 채택하지 않음)
- 이동 속도는 `PLAYER_SPEED`(px/초) 상수로 정의하고, 프레임 간 경과 시간(delta time)을 곱해 위치를 갱신한다. 이렇게 하면 기기 성능(프레임레이트)에 따라 체감 속도가 달라지지 않는다.
- 좌/우 방향키를 동시에 누른 경우 서로 상쇄되어 정지한다.

## 경계 처리

- 플레이어의 x좌표는 `0` 이상 `GAME_WIDTH - PLAYER_WIDTH` 이하로 클램프(clamp)한다.
- 경계에 도달하면 그 이상 키를 눌러도 더 이상 이동하지 않고 그 자리에서 멈춘다.

## 파일 구조

```
src/game/
  constants.ts        - GAME_WIDTH, GAME_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED
  usePlayerMovement.ts - 키 입력 추적 + rAF 루프로 playerX(0 ~ GAME_WIDTH-PLAYER_WIDTH)를 반환하는 훅
  Player.tsx           - playerX를 받아 캐릭터를 렌더링하는 프레젠테이션 컴포넌트
  GameViewport.tsx      - 고정 크기 게임 영역(배경/지면/overflow 처리)을 감싸는 컨테이너, children으로 Player 등을 받음
```

- `GameScreen.tsx`는 `GameViewport` 안에 `Player`를 배치하고, 기존과 동일하게 하단에 "메인으로 돌아가기" 버튼을 유지한다.
- 메인 화면의 메뉴 키보드 탐색용 `useMenuNavigation` 훅과는 별개로, 게임 플레이용 이동은 `usePlayerMovement` 훅으로 분리한다 (메뉴 탐색 로직과 게임 내 이동 로직은 서로 다른 관심사).

## 플레이어 표시 방식

- 아직 스프라이트/이미지 리소스가 없으므로, 사각형 도형(색상 박스)으로 캐릭터 자리를 표시한다. 세부 캐릭터 디자인은 이후 Phase에서 다듬는다.

## Phase 2 테스트 포인트와의 매핑

- "캐릭터가 좌/우로 부드럽게 움직이는지" → rAF 기반 연속 이동
- "화면 끝에서 멈추고 나가지 않는지" → x좌표 클램프
- "이동 속도가 적절한지" → `PLAYER_SPEED` 상수값으로 조정 가능 (고객님 피드백에 따라 튜닝)

## 범위에서 제외한 것

- 발사, 풍선, 충돌 판정 (Phase 3 이후)
- 캐릭터 스프라이트/애니메이션 (추후 비주얼 다듬기 단계)
