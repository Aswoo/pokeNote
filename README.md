🧩 Pokémon Viewer (Next.js & Tailwind CSS)
PokeAPI의 데이터를 활용해 포켓몬 정보를 조회할 수 있는 웹 애플리케이션입니다.
Next.js, TypeScript, Tailwind CSS를 기반으로 제작되었습니다.

🎯 주요 기능
포켓몬 목록 페이지: 포켓몬의 이름과 이미지를 페이지 단위로 나누어 보여줍니다.

포켓몬 상세 페이지: 선택한 포켓몬의 타입, 능력치, 기술 등의 상세 정보를 표시합니다.

기본 내비게이션: next/link, next/router를 활용한 리스트 ↔ 상세페이지 간의 자연스러운 전환

검색 기능: 포켓몬 이름으로 검색할 수 있습니다.

반응형 디자인: Tailwind CSS를 활용해 다양한 화면 크기에 대응합니다.

동적 카드 스타일: 마우스를 올리면, 포켓몬 타입에 따라 카드 테두리와 그림자가 색상 반영됨

세대별 필터: 드롭다운 메뉴로 포켓몬 세대를 선택하여 필터링 가능

🏗️ 프로젝트 구조 및 아키텍처
Next.js App Router의 컴포넌트 기반 구조를 따릅니다:

src/app/layout.tsx: 전역 스타일과 페이지 레이아웃 정의

src/app/page.tsx: 메인 포켓몬 목록 페이지. 세대 필터, 카드 스타일 포함

src/app/pokemon/[name]/page.tsx: 개별 포켓몬 정보를 보여주는 동적 라우팅 페이지

src/components/: 재사용 가능한 UI 컴포넌트들 (Header.tsx, SearchBar.tsx 등)

src/lib/pokeapi.ts: https://pokeapi.co/ API 연동, 데이터 요청/처리 로직 포함

src/app/globals.css: Tailwind CSS 지시어와 글로벌 스타일 정의. 포켓몬 타입 색상 변수 포함

tailwind.config.ts, postcss.config.mjs: Tailwind 및 PostCSS 설정 파일

🚀 로컬 실행 방법
프로젝트 디렉터리로 이동

bash
복사
편집
cd /Users/sdu/sdu/pokeview
의존성 설치

bash
복사
편집
npm install
개발 서버 실행

bash
복사
편집
npm run dev
→ 브라우저에서 http://localhost:3000으로 접속 가능

📅 향후 기능 개발 계획 (Task Planner)
1. 타입별 필터링
설명: 포켓몬의 주/부 타입별로 목록 필터링

작업:

PokemonListPage.tsx에 UI(드롭다운 또는 체크박스) 추가

pokeapi.ts에 타입별 API 요청 로직 구현

필터 결과를 목록에 반영

2. 정렬 기능
설명: ID, 이름, 능력치 등 기준으로 정렬

작업:

정렬 UI 요소 추가

클라이언트 정렬 또는 API 정렬 기능 구현

3. 다크 모드
설명: 라이트/다크 테마 토글 지원

작업:

next-themes 또는 CSS 변수 방식으로 테마 전환

Header.tsx에 토글 버튼 추가

Tailwind 다크 모드 스타일 적용

4. 유저 팀/즐겨찾기
설명: 사용자가 포켓몬을 저장하여 팀 구성 또는 즐겨찾기 가능

작업:

로컬 스토리지 또는 간단한 백엔드 연동

카드 및 상세 페이지에 즐겨찾기 버튼 추가

/teams, /favorites 페이지 구현

5. 애니메이션 및 전환 효과
설명: 페이지 전환, 카드 hover 시 부드러운 효과 추가

작업:

Framer Motion 등 Next.js 지원 애니메이션 라이브러리 조사

Tailwind transition, animation 클래스 적용

6. 오프라인 지원 (PWA)
설명: 오프라인에서도 앱 일부 기능 사용 가능하게 만들기

작업:

Next.js PWA 구성

API 응답 및 자산 캐싱 전략 적용

7. 고급 검색 기능
설명: 이름 외에도 ID 검색, 유사 검색(Fuzzy search) 등 지원

작업:

SearchBar.tsx 개선

pokeapi.ts 수정 또는 클라이언트 검색 알고리즘 추가

8. 진화 정보 표시
설명: 포켓몬의 진화 체계를 시각적으로 보여줌

작업:

PokeAPI에서 진화 체계 데이터 요청

PokemonDetailPage.tsx에 진화 체계 UI 추가

9. 능력치 시각화
설명: 능력치를 차트로 표현

작업:

Recharts, Chart.js 등 차트 라이브러리 연동

PokemonDetailPage.tsx에서 능력치 차트 추가

10. 접근성 개선
설명: 키보드 네비게이션, 스크린 리더 등 고려한 접근성 강화

작업:

접근성 진단 도구로 점검

ARIA 속성 및 키보드 네비게이션 구현

