# PokeView Cursor Rules

이 폴더는 PokeView 프로젝트를 위한 Cursor AI 규칙들을 포함하고 있습니다. 각 규칙은 프로젝트의 특정 영역에 집중하여 코드 품질과 일관성을 유지하는 데 도움을 줍니다.

## 📁 폴더 구조

```
.cursor/
├── README.md                    # 이 파일
├── core/                        # 핵심 기술 스택 규칙
│   ├── typescript.mdc          # TypeScript 규칙
│   ├── react.mdc               # React 규칙
│   ├── nextjs.mdc              # Next.js 규칙
│   └── tailwind.mdc            # Tailwind CSS 규칙
├── architecture/                # 아키텍처 패턴 규칙
│   ├── fsd.mdc                 # Feature-Sliced Design 규칙
│   ├── component-structure.mdc # 컴포넌트 구조 규칙
│   └── state-management.mdc    # 상태 관리 규칙
├── features/                    # 프로젝트 특화 기능 규칙
│   ├── pokemon-data.mdc        # 포켓몬 데이터 관련 규칙
│   ├── theme-management.mdc    # 테마 관리 규칙
│   ├── 3d-components.mdc       # 3D 컴포넌트 규칙
│   └── quiz-game.mdc           # 퀴즈 게임 규칙
├── quality/                     # 코드 품질 규칙
│   ├── performance.mdc         # 성능 최적화 규칙
│   ├── accessibility.mdc       # 접근성 규칙
│   ├── testing.mdc             # 테스팅 규칙
│   └── error-handling.mdc      # 에러 처리 규칙
├── tools/                       # 개발 도구 규칙
│   ├── api-fetching.mdc        # API 호출 규칙
│   ├── storage.mdc             # Storage 활용 규칙
│   └── git-commits.mdc         # Git 커밋 규칙
└── examples/                    # 코드 예시
    ├── component-examples.mdc  # 컴포넌트 예시
    ├── hook-examples.mdc       # 훅 예시
    └── api-examples.mdc        # API 예시
```

## 🎯 사용 방법

### 1. Cursor AI에서 규칙 참조
Cursor AI는 이 폴더의 `.mdc` 파일들을 자동으로 인식하고 참조합니다. 특정 주제에 대해 질문하거나 코드를 작성할 때 관련 규칙이 자동으로 적용됩니다.

### 2. 특정 규칙 참조
특정 규칙을 참조하려면 파일명을 언급하세요:
- "TypeScript 규칙에 따라 컴포넌트를 작성해줘"
- "React 규칙을 참고해서 훅을 만들어줘"
- "성능 최적화 규칙에 따라 코드를 개선해줘"

### 3. 예시 코드 활용
`examples/` 폴더의 코드 예시를 참고하여 일관된 패턴으로 코드를 작성할 수 있습니다.

## 📋 규칙 카테고리

### Core (핵심 기술 스택)
- **typescript.mdc**: TypeScript 타입 정의, 인터페이스, 제네릭 사용법
- **react.mdc**: React 컴포넌트, 훅, 성능 최적화
- **nextjs.mdc**: Next.js App Router, 서버/클라이언트 컴포넌트
- **tailwind.mdc**: Tailwind CSS 유틸리티 클래스, 반응형 디자인

### Architecture (아키텍처 패턴)
- **fsd.mdc**: Feature-Sliced Design 구조와 레이어 규칙
- **component-structure.mdc**: 컴포넌트 파일 구조, 네이밍 규칙
- **state-management.mdc**: 상태 관리 패턴, Context API 사용법

### Features (프로젝트 특화 기능)
- **pokemon-data.mdc**: 포켓몬 데이터 처리, 캐싱 전략
- **theme-management.mdc**: 테마 전환, 다크모드 구현
- **3d-components.mdc**: Three.js, React Three Fiber 사용법
- **quiz-game.mdc**: 퀴즈 게임 로직, 타이머 관리

### Quality (코드 품질)
- **performance.mdc**: 성능 최적화, 메모이제이션, 코드 스플리팅
- **accessibility.mdc**: 접근성, WCAG 가이드라인, ARIA 속성
- **testing.mdc**: 테스팅 전략, Vitest, Storybook
- **error-handling.mdc**: 에러 처리, 에러 바운더리, 로깅

### Tools (개발 도구)
- **api-fetching.mdc**: API 호출, Axios 설정, 에러 처리
- **storage.mdc**: localStorage, sessionStorage, 캐싱 전략
- **git-commits.mdc**: Git 커밋 컨벤션, 브랜치 전략

### Examples (코드 예시)
- **component-examples.mdc**: 컴포넌트 작성 예시
- **hook-examples.mdc**: 커스텀 훅 예시
- **api-examples.mdc**: API 함수 예시

## 🔧 규칙 업데이트

프로젝트가 발전하면서 새로운 규칙이나 기존 규칙의 수정이 필요할 수 있습니다. 규칙을 업데이트할 때는 다음 사항을 고려하세요:

1. **일관성 유지**: 기존 규칙과 충돌하지 않도록 주의
2. **명확성**: 규칙이 명확하고 이해하기 쉽게 작성
3. **예시 포함**: 가능한 한 코드 예시를 포함
4. **검증**: 규칙이 실제 프로젝트에 적용 가능한지 확인

## 📝 규칙 작성 가이드

새로운 규칙을 작성할 때는 다음 형식을 따르세요:

```markdown
# 규칙 제목

## 개요
규칙의 목적과 적용 범위를 설명

## 주요 규칙
- 규칙 1
- 규칙 2
- 규칙 3

## 코드 예시
```typescript
// 좋은 예시
const example = () => {
  // 코드
};
```

## 피해야 할 것
- 안티패턴 1
- 안티패턴 2
```

## 📚 추가 자료

- [Cursor AI 공식 문서](https://cursor.sh/docs)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [React 공식 문서](https://react.dev/)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [Feature-Sliced Design](https://feature-sliced.design/)

---

이 규칙들을 통해 PokeView 프로젝트의 코드 품질과 일관성을 유지하고, 개발 효율성을 높일 수 있습니다. 🚀
