# Phase 1 설계 - 메인 화면

관련 문서: [../PLAN.md](../PLAN.md) (Phase 1 항목), [../FEATURES/main.md](../FEATURES/main.md)

## 목표

앱 실행 시 메인 화면이 뜨고, **게임 선택 / 시작하기 / 게임 종료** 3가지 메뉴가 동작하는 상태를 만든다. 아직 실제 풍선 게임 로직은 없으며, "시작하기"나 "게임 선택"으로 진입한 게임 화면은 Phase 2 이후에 채워질 자리표시(placeholder) 화면으로 대체한다.

## 화면 상태 (Screen State)

별도 라우팅 라이브러리 없이, `App` 컴포넌트가 현재 화면을 하나의 상태값으로 관리하고 조건부 렌더링한다. Phase 1 범위에서는 화면 종류가 적어 `react-router` 도입 없이 단순 상태 전환으로 충분하다.

```
type Screen = 'main' | 'missionSelect' | 'game' | 'exited'
```

- `main`: 메인 화면 (타이틀 + 3개 메뉴 버튼)
- `missionSelect`: 게임 선택 화면 (미션 목록, 현재는 Mission 1만 존재)
- `game`: 게임 화면 자리표시 (Phase 2~6에서 실제 로직으로 교체 예정)
- `exited`: 게임 종료 후 안내 화면

## 컴포넌트 구조

```
src/
  App.tsx                 - screen 상태 보관 및 화면 전환 라우팅 역할만 수행
  screens/
    MainScreen.tsx         - 타이틀 + 게임 선택 / 시작하기 / 게임 종료 버튼
    MissionSelectScreen.tsx - 미션 목록 (Mission 1 클릭 시 game으로 전환), 뒤로가기 버튼 포함
    GameScreen.tsx          - Phase 1에서는 "게임 화면 준비 중" 문구 + 메인으로 돌아가기 버튼만 표시
    ExitedScreen.tsx        - 종료 안내 문구 + 다시 시작(메인으로) 버튼
```

- `App.tsx`는 `screen` state와 `setScreen` 함수만 소유하고, 각 화면 컴포넌트에 `onNavigate`류의 콜백 props를 내려준다.
- 각 화면 컴포넌트는 자체 상태 없이 props로 받은 콜백만 호출하는 단순 프레젠테이션 컴포넌트로 만든다 (Phase 1 범위에서 전역 상태 관리 라이브러리 불필요).

## 버튼별 동작

### 시작하기 (MainScreen)
- 클릭 시 `screen`을 `game`으로 전환한다.
- Mission 1을 기본값으로 바로 진입한다고 가정 (현재 미션이 1개뿐이므로 선택 과정 생략).

### 게임 선택 (MainScreen)
- 클릭 시 `screen`을 `missionSelect`로 전환한다.
- `MissionSelectScreen`은 미션 목록을 보여주며, 현재는 "Mission 1" 항목 하나만 존재한다.
- Mission 1 항목 클릭 시 `screen`을 `game`으로 전환한다.
- 뒤로가기 버튼 클릭 시 `screen`을 다시 `main`으로 전환한다.

### 게임 종료 (MainScreen)
- 브라우저 환경에서는 스크립트로 임의로 탭/창을 닫을 수 없다는 제약이 있다 (`window.close()`는 스크립트로 직접 연 창이 아니면 대부분 브라우저에서 무시됨).
- 따라서 클릭 시 실제로 탭을 닫으려 시도하지 않고, `screen`을 `exited`로 전환하여 "게임을 종료했습니다" 안내 화면을 보여주는 방식으로 처리한다.
- `ExitedScreen`에는 "메인으로 돌아가기" 버튼을 두어, 실수로 종료를 눌렀을 때 복귀할 수 있게 한다.

### GameScreen (Phase 1 한정 placeholder)
- "게임 화면은 준비 중입니다" 문구와 함께 "메인으로 돌아가기" 버튼만 표시한다.
- Phase 2부터 이 컴포넌트 내부를 실제 플레이어/풍선 로직으로 채워나간다.

## 스타일 방향

- 별도 UI 라이브러리 없이 순수 CSS(컴포넌트별 또는 `App.css`)로 처리한다.
- 화면 중앙 정렬 레이아웃(세로 flex) + 어두운 배경의 아케이드 감성 톤을 기본으로 하되, 디테일한 비주얼 디자인은 Phase 1 이후 별도로 다듬는다.

## Phase 1 테스트 포인트와의 매핑

[PLAN.md](../PLAN.md)의 Phase 1 테스트 포인트 기준으로 아래가 각각 검증된다.

- "메인 화면이 바로 뜨는지" → `App` 초기 `screen` 값이 `main`
- "메뉴 3개가 보이고 클릭 가능한지" → `MainScreen`의 3개 버튼
- "시작 버튼 클릭 시 화면 전환" → `main` → `game` 전환
- "종료 버튼 클릭 시 의도한 동작" → `main` → `exited` 전환 및 안내 문구 표시

## 범위에서 제외한 것

- 실제 미션 로직, 풍선/캐릭터 렌더링 (Phase 2 이후)
- 하이스코어 표시, 조작법 안내 문구 (FEATURES/main.md에는 있으나 Phase 1 최소 범위에서는 제외, 필요 시 후속 Phase나 Phase 1 내에서 추가 검토)
- 라우팅 라이브러리, 전역 상태 관리 라이브러리 도입
