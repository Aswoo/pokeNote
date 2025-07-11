# 프론트엔드 기술 요약: PokeView 프로젝트

이 문서는 `PokeView` 프로젝트에서 사용된 주요 프론트엔드 기술, 아키텍처 패턴, 구현 세부사항을 정리한 자료로, 학습 및 향후 참고를 위한 포괄적인 개요를 제공합니다.

------

## 1. 프로젝트 개요

`PokeView`는 사용자가 포켓몬을 탐색하고 세대별로 필터링하며 세부 정보를 볼 수 있는 Next.js 기반 웹 애플리케이션입니다. 포켓몬 타입에 따라 동적으로 스타일이 적용되며, 라이트/다크 테마 전환 기능도 포함되어 있습니다.

------

## 2. 핵심 기술

### ● Next.js (React 프레임워크)

- **목적:** 파일 기반 라우팅, API 라우트, 서버 사이드 렌더링 등을 지원하는 React 앱 구축용 프레임워크.
- **주요 사용 기능:**
  - `src/app` 디렉터리 기반 App Router 사용.
  - `next/link`: 페이지 간 클라이언트 측 이동.
  - `'use client'` 지시어: 클라이언트에서 실행되는 컴포넌트 표시 (React Hooks 및 브라우저 API 사용 가능).

### ● React

- **목적:** 선언형 UI 및 컴포넌트 기반 구조를 갖는 JavaScript 라이브러리.
- **핵심 개념 사용:**
  - **함수형 컴포넌트**를 통한 UI 구성.
  - **Hooks** 사용:
    - `useState`: 상태 관리 (예: `pokemonList`, `loading`, `isHovered`).
    - `useEffect`: 데이터 요청 및 DOM 조작.
    - `useContext`: 전역 상태 접근 (예: `useTheme`).
  - **Props**를 통한 부모 → 자식 데이터 전달.
  - **조건부 렌더링**: 상태에 따른 UI 변경 (예: 로딩, 에러 표시).

### ● TypeScript

- **목적:** 정적 타입을 제공하는 JavaScript 상위 집합으로, 코드 가독성과 오류 방지, 자동 완성 등의 툴링 개선에 도움.
- **사용 예시:**
  - `Pokemon`, `PokemonCardProps` 등 인터페이스 정의.
  - 함수/변수의 타입 명시로 안정성 확보.

### ● Tailwind CSS

- **목적:** HTML/JSX에 직접 유틸리티 클래스를 조합하여 빠르게 UI를 개발할 수 있는 유틸리티 우선 CSS 프레임워크.
- **사용 방법:**
  - `flex`, `grid`, `bg-white`, `shadow-md`, `hover:scale-105` 등 유틸리티 클래스 다수 사용.
  - 포켓몬 타입별 색상을 위한 **커스텀 컬러** (`tailwind.config.ts` 설정).
  - **safelist 설정**: 동적 스타일(예: `hover:border-fire`)을 위해 필수.

------

## 3. 아키텍처 패턴

- **컴포넌트 기반 아키텍처**: UI를 재사용 가능한 독립형 컴포넌트로 분리 (`Header`, `PokemonCard`, `PaginationControls` 등).
- **관심사 분리 (Separation of Concerns)**:
  - **UI 컴포넌트**: 렌더링과 사용자 상호작용만 담당.
  - **로직/데이터**: `PokemonListPage`와 `lib/pokeapi.ts`에서 처리.
  - **스타일**: Tailwind CSS 및 `globals.css`로 관리.
- **클라이언트 사이드 렌더링(CSR)** 사용: 대부분의 데이터 요청 및 렌더링이 클라이언트에서 발생 (`useEffect` 중심).

------

## 4. 상태 관리

- **`useState` Hook**:
  - `pokemonList`, `loading`, `error`, `offset`, `selectedGeneration`, `isHovered` 등 컴포넌트 상태 관리.
- **`Context API` 사용**:
  - **`ThemeContext` (`ThemeContext.tsx`)**:
    - `theme` 및 `toggleTheme` 제공.
    - 테마 상태를 `localStorage`에 저장.
    - `<html>` 요소에 `light` 또는 `dark` 클래스를 추가하여 전체 스타일 적용.

------

## 5. 데이터 요청

- **`lib/pokeapi.ts`**:
  - PokeAPI와 통신하는 서비스 파일.
  - `fetch`를 사용해 API 요청 처리.
  - `getPokemonList`, `getPokemonByUrl`, `getGenerations` 등의 함수 정의.
  - API 응답에 대한 TypeScript 인터페이스 정의 포함.

------

## 6. 스타일링 전략

- **Tailwind CSS**: 기본 스타일 도구.
- **동적 Hover 스타일링**:
  - **`safelist` 설정**: Tailwind가 정적 분석에서 감지하지 못하는 `hover:shadow-fire` 같은 클래스를 강제로 포함시킴.
  - **인라인 스타일 (`style` prop)**:
    - `isHovered` 상태에 따라 border, boxShadow 스타일을 동적으로 지정.
  - **CSS 변수 (`--type-normal` 등)**:
    - `globals.css`에 정의되어 일관된 색상 관리에 활용됨.
- **`globals.css`**:
  - Tailwind 기본 import 및 커스텀 테마 색상 변수 정의.

------

## 7. 테마 구현

- **`ThemeContext`**: 전역 테마 상태 관리.
- **`localStorage`**: 브라우저 세션 간 테마 유지.
- **`document.documentElement.classList`**:
  - `<html>`에 테마 클래스를 추가하여 전역 스타일 적용.
- **조건부 클래스네임 적용**: `Header` 컴포넌트에서 테마 상태에 따라 배경/글자색 변경.

------

## 8. 라우팅

- **Next.js App Router 사용**:
  - `src/app/page.tsx`: 루트 페이지(`/`).
  - `src/app/pokemon/[name]/page.tsx`: 포켓몬 상세 페이지 (동적 라우팅 추정).

------

## 9. 컴포넌트 구성 (예시)

- **`Header.tsx`**: 앱 타이틀 및 테마 전환 버튼 표시.
- **`PokemonCard.tsx`**: 포켓몬 카드 렌더링 (이미지, 이름, hover 스타일 포함).
- **`GenerationFilter.tsx`**: 세대 필터 드롭다운 관리.
- **`PaginationControls.tsx`**: 페이지네이션 버튼 ("이전", "다음").
- **`PokemonListPage.tsx`**: 전체 페이지 컴포넌트로 데이터 요청, 상태 관리, 컴포넌트 렌더링 담당.
