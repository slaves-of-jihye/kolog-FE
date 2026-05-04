## 커밋 컨벤션

| 태그 이름 | 설명                                                                      |
| --------- | ------------------------------------------------------------------------- |
| Feat      | 새로운 기능을 추가할 경우                                                 |
| Fix       | 버그를 고친 경우                                                          |
| Style     | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우                     |
| Refactor  | 프로덕션 코드 리팩토링                                                    |
| Docs      | 문서를 수정한 경우                                                        |
| Chore     | 빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X) |

---

## 시작하기 (Getting Started)

프로젝트를 처음 클론한 후 아래 순서대로 실행해 주세요.

### 1. 패키지 설치

Husky 설정이 포함되어 있어 설치 후 자동으로 git hook이 활성화됩니다.

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env.local` 파일을 생성하고 필요한 값을 채워주세요.

```bash
cp .env.example .env.local
```

### 3. 개발 서버 실행

```bash
npm run dev
```

---

## 주요 명령어 (Scripts)

- `npm run dev`: 로컬 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run lint`: ESLint 검사
- `npm run format`: Prettier 코드 포맷팅
