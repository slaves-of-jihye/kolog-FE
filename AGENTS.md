# AI Agent Guidelines (KOLOG Project)

이 문서는 KOLOG 프로젝트에 참여하는 모든 AI 에이전트(Antigravity 등)가 준수해야 할 행동 지침과 기술적 원칙을 정의합니다. 에이전트는 모든 작업 수행 시 이 문서를 최우선적으로 참고해야 합니다.

## 0. 프로젝트 개요 (Project Overview)

**KOLOG**는 사용자가 매시간 2초 내외의 영상을 촬영하여 일상을 공유하고, 하루가 끝날 때 편집된 데일리 브이로그를 감상할 수 있는 플랫폼입니다.

- **핵심 가치**: 짧은 기록의 축적을 통한 진솔한 일상 공유
- **기술적 목표**: Next.js PWA를 활용하여 Android와 iOS 환경 모두에서 네이티브 앱에 가까운 사용자 경험 제공

## 1. 커밋 컨벤션 (Commit Convention)

에이전트는 코드 수정 후 커밋 시 다음 규칙을 엄격히 준수합니다.

- **형식**: `Type:: Message`
- **허용되는 타입**:
  - `Feat`: 새로운 기능 추가
  - `Fix`: 버그 수정
  - `Style`: 코드 포맷 변경, 세미콜론 누락 등 (비즈니스 로직 변경 없음)
  - `Refactor`: 프로덕션 코드 리팩토링
  - `Docs`: 문서 수정
  - `Chore`: 패키지 매니저 설정, 빌드 업무, 기타 기타 수정
- **주의**: `subject-case` 제한이 없으므로 한국어 및 대문자 사용이 가능합니다.

## 2. 기술적 원칙 (Technical Principles)

에이전트는 프로젝트의 기술 스택을 정확히 이해하고 최신 기능을 활용합니다.

- **Framework**: Next.js 16 (App Router 기반)
- **Library**: React 19 (Server Components 적극 활용)
- **Styling**: Tailwind CSS 4 (최신 유틸리티 클래스 및 CSS 변수 활용)
- **PWA**: 모바일 환경(Android/iOS)에서의 오프라인 지원, 푸시 알림, 설치 가능성(Installability) 고려
- **Data Fetching**: TanStack Query (React Query) 및 Axios 활용
- **Video**: `video/mp4` 형식을 기본으로 사용
- **Utility**: 날짜 및 시간 처리는 Day.js 활용
- **Language**: TypeScript (엄격한 타입 체크 적용)
- **Tools**: Prettier 및 ESLint 설정을 항상 준수하며, 작업 후 `npm run format` 실행 권장

## 3. 아키텍처 및 폴더 구조 (Architecture)

본 프로젝트는 **Next.js App Router와 FSD(Feature-Sliced Design)를 결합한 하이브리드 구조**를 따릅니다.

```
src/
├── app/             # 페이지 및 레이아웃
├── widgets/         # 도메인 기능 (FSD Widget layer)
├── features/        # 비즈니스 로직 (FSD Feature layer)
├── entities/        # 도메인 객체 (FSD Entity layer)
└── shared/          # 공통 모듈 (FSD Shared layer)
```

- **app/**: 라우팅 및 페이지 조립 (로직 최소화)
- **widgets/**: Feature와 Entity의 조합으로 구성된 복잡한 UI 블록
- **features/**: 사용자의 상호작용 및 비즈니스 로직 (API 호출, 상태 변경)
- **entities/**: 비즈니스 도메인 모델 및 최소 단위 컴포넌트 (User, Video 등)
- **shared/**: 공통 UI 컴포넌트, 유틸리티, API 설정 (의존성 없음)

**의존성 규칙**: 상위 레이어는 하위 레이어를 참조할 수 있으나, 하위 레이어는 상위 레이어를 참조할 수 없습니다. (Shared < Entities < Features < Widgets < App)

## 4. 코드 작성 가이드라인

- **가독성 우선**: 복잡한 로직보다 읽기 쉬운 선언적 코드를 지향합니다.
- **아키텍처 준수**: 모든 컴포넌트와 로직은 정의된 레이어(`features`, `entities` 등)에 적절히 배치합니다.
- **컴포넌트 분리**: 재사용 가능한 UI 요소는 `shared/ui` 하위에, 비즈니스 의미를 가진 요소는 `entities` 하위에 분리합니다.
- **현대적 패턴**: 구식 패턴보다 최신 React 기능을 우선 사용합니다.
- **자동화 도구 활용**: 커밋 전 Husky와 lint-staged가 작동하므로, 에러가 발생하지 않도록 미리 확인합니다.

## 5. 커뮤니케이션 스타일

- **언어**: 한국어를 기본 사용 언어로 합니다.
- **태도**: 전문적이지만 친절한 말투를 유지하며, 결정적인 변경 사항에 대해서는 사용자에게 명확한 근거를 설명합니다.
- **정확성**: 불확실한 정보는 추측하지 않으며, 작업 전 프로젝트의 파일 구조와 `package.json`을 먼저 분석합니다.

## 6. 작업 프로세스 (Standard Workflow)

1.  **분석**: 요청받은 작업과 관련된 파일 구조를 파악합니다.
2.  **계획**: 변경할 내용과 영향 범위를 사용자에게 설명합니다.
3.  **실행**: 코드를 수정하고 Prettier/ESLint 검사를 수행합니다.
4.  **검증**: 수정 결과가 의도대로 작동하는지 확인합니다.
5.  **커밋**: 정의된 컨벤션(`Type:: Message`)에 맞춰 커밋합니다.
