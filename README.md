# 🧩 Pokémon Viewer

**Pokémon Viewer**는 [PokeAPI](https://pokeapi.co/)의 데이터를 활용해 포켓몬 정보를 조회할 수 있는 **Next.js 기반 웹 애플리케이션**입니다.  
**Next.js**, **TypeScript**, **Tailwind CSS**를 중심으로 제작되었습니다.

---

## 🎯 주요 기능

- **포켓몬 목록 페이지**  
  포켓몬의 이름과 이미지를 페이지 단위로 보여줍니다.

- **포켓몬 상세 페이지**  
  선택한 포켓몬의 타입, 능력치, 기술 등 상세 정보를 제공합니다.

- **기본 내비게이션**  
  `next/link`, `next/router`를 활용한 리스트 ↔ 상세 페이지 간 자연스러운 전환

- **검색 기능**  
  포켓몬 이름으로 손쉽게 검색

- **반응형 디자인**  
  Tailwind CSS로 다양한 화면 크기 대응

- **동적 카드 스타일**  
  마우스를 올리면 포켓몬 타입에 따라 카드 테두리와 그림자 색상 변경

- **세대별 필터**  
  드롭다운 메뉴로 포켓몬 세대를 선택하여 필터링 가능

---

## 🏗️ 프로젝트 구조

> **Next.js App Router 기반 컴포넌트 구조**

```
src/
 ├── app/
 │   ├── layout.tsx                # 전역 스타일 및 레이아웃
 │   ├── page.tsx                  # 메인 포켓몬 목록 페이지 (세대 필터, 카드 스타일 포함)
 │   └── pokemon/[name]/page.tsx   # 개별 포켓몬 상세 페이지 (동적 라우팅)
 │
 ├── components/                   # 재사용 가능한 UI 컴포넌트
 │   ├── Header.tsx
 │   ├── SearchBar.tsx
 │   └── PokemonCard.tsx
 │
 ├── lib/
 │   └── pokeapi.ts                # PokeAPI 연동 및 데이터 처리 로직
 │
 ├── app/globals.css               # Tailwind CSS 지시어 및 글로벌 스타일 정의
 │                                 # 포켓몬 타입 색상 변수 포함
 │
 ├── tailwind.config.ts            # Tailwind 설정
 └── postcss.config.mjs            # PostCSS 설정
```

---

## 🚀 로컬 실행 방법

```bash
# 1️⃣ 프로젝트 디렉터리 이동
cd /Users/sdu/sdu/pokeview

# 2️⃣ 의존성 설치
npm install

# 3️⃣ 개발 서버 실행
npm run dev
```

➡️ 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 🧭 향후 기능 개발 계획 (Task Planner)

| 기능                        | 설명                                    | 주요 작업                                                    |
| --------------------------- | --------------------------------------- | ------------------------------------------------------------ |
| **타입별 필터링**           | 포켓몬의 주/부 타입으로 목록 필터링     | - `PokemonListPage.tsx`에 UI 추가<br>- `pokeapi.ts`에 타입별 API 요청 로직 구현<br>- 필터 결과 반영 |
| **정렬 기능**               | ID, 이름, 능력치 등 기준으로 정렬       | - 정렬 UI 추가<br>- 클라이언트 또는 API 정렬 구현            |
| **다크 모드**               | 라이트/다크 테마 토글 지원              | - `next-themes` 적용<br>- Header에 토글 버튼 추가<br>- Tailwind 다크 모드 스타일 적용 |
| **유저 팀/즐겨찾기**        | 포켓몬을 저장하여 팀 구성 또는 즐겨찾기 | - LocalStorage 또는 간단한 백엔드 연동<br>- 즐겨찾기 버튼 추가<br>- `/teams`, `/favorites` 페이지 구현 |
| **애니메이션 및 전환 효과** | 부드러운 카드 hover / 페이지 전환       | - `Framer Motion` 또는 Tailwind `transition` 활용            |
| **오프라인 지원 (PWA)**     | 오프라인에서도 일부 기능 사용           | - Next.js PWA 구성<br>- API 응답 및 자산 캐싱 전략 적용      |
| **고급 검색 기능**          | 이름 외에도 ID, 유사 검색 지원          | - `SearchBar.tsx` 개선<br>- 클라이언트 검색 알고리즘 추가    |
| **진화 정보 표시**          | 포켓몬의 진화 체계를 시각화             | - PokeAPI 진화 데이터 요청<br>- `PokemonDetailPage.tsx` UI 추가 |
| **능력치 시각화**           | 차트로 능력치 표현                      | - `Recharts` 또는 `Chart.js` 연동<br>- 상세 페이지에 능력치 차트 추가 |
| **접근성 개선 (A11y)**      | 키보드 네비게이션 및 스크린 리더 지원   | - 접근성 진단 도구로 점검<br>- ARIA 속성 및 키보드 네비게이션 구현 |

---

## 🧱 기술 스택

| 구분          | 사용 기술                      |
| ------------- | ------------------------------ |
| **Framework** | Next.js (App Router)           |
| **Language**  | TypeScript                     |
| **Styling**   | Tailwind CSS                   |
| **API**       | [PokeAPI](https://pokeapi.co/) |
| **Animation** | Framer Motion (예정)           |
| **Theme**     | next-themes (예정)             |

---

## 📷 미리보기 (예시)

> 준비 중 — 추후 스크린샷 또는 GIF 추가 예정  
> *(포켓몬 카드 hover, 검색, 필터 UI, 상세 페이지 전환)*

---

## 📅 업데이트 로그

| 날짜     | 내용                                   |
| -------- | -------------------------------------- |
| `v0.1.0` | 프로젝트 초기 세팅 및 목록 페이지 구현 |
| `v0.2.0` | 상세 페이지, 검색 기능 추가            |
| `v0.3.0` | 세대별 필터 및 반응형 디자인 적용      |

---

## 🧑‍💻 개발자 메모

- PokeAPI는 무료이지만, 응답 속도가 느릴 수 있어 **SSR + 캐싱 전략** 검토 중  
- API 스펙 참고: [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2)
- 추후 Vercel 배포 예정

---

**💡 Made with ❤️ using Next.js, TypeScript, and Tailwind CSS**
