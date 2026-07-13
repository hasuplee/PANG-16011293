# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 기술 스택

- React 18 + TypeScript + Vite 5 (`@vitejs/plugin-react` 사용)
- 빌드 결과물 검증은 `tsc -b`(project references 기반, `tsconfig.json` → `tsconfig.app.json` / `tsconfig.node.json`)로 수행
- 린트 도구, 테스트 프레임워크는 아직 설정되어 있지 않음 (`package.json`에 관련 스크립트/의존성 없음)

## 주요 명령어

- 의존성 설치: `npm install`
- 개발 서버 실행: `npm run dev`
- 프로덕션 빌드 (타입체크 포함): `npm run build`
- 빌드 결과 미리보기: `npm run preview`
- 타입만 검사 (빌드 산출물 생성 없이): `npx tsc -b --noEmit`

## 테스트

현재 저장소에는 테스트 프레임워크가 설치되어 있지 않다. 테스트를 추가할 경우 `package.json`에 `test` 스크립트와 관련 의존성(예: Vitest)을 먼저 구성해야 한다.

## 아키텍처

- `index.html`이 진입점이며 `src/main.tsx`를 모듈로 로드한다.
- `src/main.tsx`는 `ReactDOM.createRoot`로 `#root`에 `App` 컴포넌트를 마운트한다.
- `src/App.tsx`가 최상위 컴포넌트이며, 현재는 `Hello World` 텍스트만 렌더링하는 단일 컴포넌트 구조다.
- `tsconfig.json`은 파일을 직접 포함하지 않고 `tsconfig.app.json`(앱 소스, `src` 대상)과 `tsconfig.node.json`(`vite.config.ts` 대상)을 참조하는 project references 구조를 사용한다.
