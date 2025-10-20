# Playwright MCP E2E Workflow

[![CI](https://github.com/Junhyunny/playwright-mcp-e2e-workflow/actions/workflows/ci.yml/badge.svg)](https://github.com/Junhyunny/playwright-mcp-e2e-workflow/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

이 프로젝트는 Playwright와 MCP(Model Context Protocol)를 활용한 현대적인 E2E 테스트 워크플로우를 구현하는 예제입니다.

## 🚀 프로젝트 개요

Playwright를 사용하여 웹 애플리케이션의 E2E 테스트를 자동화하고, MCP를 통해 AI 에이전트와의 통합을 제공하여 더 스마트한 테스트 환경을 구축합니다.

## ✨ 주요 기능

- 🎭 **Playwright 기반 E2E 테스트**: 모든 주요 브라우저 지원
- 🤖 **MCP 통합**: AI 에이전트와의 원활한 협업
- 🔄 **CI/CD 자동화**: GitHub Actions를 통한 자동 테스트
- 📊 **상세한 리포팅**: 테스트 결과 및 스크린샷 제공
- 🎯 **Page Object Model**: 유지보수 가능한 테스트 구조
- 🔧 **크로스 브라우저 테스트**: Chrome, Firefox, Safari 지원

## 🛠 시작하기

### 사전 요구사항

- Node.js 18.0.0 이상
- npm 8.0.0 이상 또는 yarn 1.22.0 이상

### 설치

```bash
# 프로젝트 클론
git clone https://github.com/Junhyunny/playwright-mcp-e2e-workflow.git
cd playwright-mcp-e2e-workflow

# 의존성 설치
npm install

# Playwright 브라우저 설치
npx playwright install
```

### 테스트 실행

```bash
# 모든 E2E 테스트 실행 (헤드리스 모드)
npm run test:e2e

# UI 모드로 테스트 실행
npm run test:e2e:ui

# 특정 브라우저에서 테스트 실행
npm run test:e2e -- --project=chromium

# 디버그 모드로 테스트 실행
npm run test:e2e:debug
```

### 개발 환경 설정

```bash
# 개발 서버 시작
npm run dev

# 테스트 코드 작성 도우미
npm run test:codegen
```

## 📁 프로젝트 구조

```
playwright-mcp-e2e-workflow/
├── tests/                    # E2E 테스트 파일
│   ├── auth/                # 인증 관련 테스트
│   ├── api/                 # API 테스트
│   └── e2e/                 # 엔드투엔드 테스트
├── pages/                   # Page Object Model
│   ├── basePage.ts          # 기본 페이지 클래스
│   └── components/          # 재사용 가능한 컴포넌트
├── fixtures/                # 테스트 데이터 및 픽스처
├── utils/                   # 유틸리티 함수
│   ├── helpers.ts           # 공통 헬퍼 함수
│   └── mcp-integration.ts   # MCP 통합 유틸리티
├── .github/workflows/       # GitHub Actions 워크플로우
├── playwright.config.ts     # Playwright 설정
├── package.json
└── README.md
```

## 🔧 설정

### Playwright 설정

`playwright.config.ts` 파일에서 테스트 설정을 커스터마이징할 수 있습니다:

```typescript
// 기본 설정 예시
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
});
```

### MCP 통합 설정

MCP 서버 연결 및 AI 에이전트 통합 설정은 `utils/mcp-integration.ts`에서 관리됩니다.

## 🧪 테스트 작성 가이드

### 기본 테스트 예시

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('사용자 로그인 테스트', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await homePage.navigate();
  await homePage.login('user@example.com', 'password');
  
  await expect(page.locator('[data-testid="welcome-message"]')).toBeVisible();
});
```

### MCP 통합 테스트 예시

```typescript
import { test, expect } from '@playwright/test';
import { mcpHelper } from '../utils/mcp-integration';

test('AI 어시스턴트와의 상호작용 테스트', async ({ page }) => {
  const response = await mcpHelper.sendQuery('페이지 상태 확인');
  
  await expect(response).toContain('정상');
});
```

## 🚀 CI/CD

이 프로젝트는 GitHub Actions를 사용하여 자동화된 테스트를 실행합니다:

- **PR 생성 시**: 모든 테스트 실행
- **메인 브랜치 머지 시**: 전체 테스트 스위트 실행
- **스케줄된 실행**: 매일 자정 정기 테스트

## 🤝 기여하기

1. 이 레포지토리를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'feat: Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

### 커밋 컨벤션

- `feat:` 새로운 기능 추가
- `fix:` 버그 수정
- `docs:` 문서 업데이트
- `test:` 테스트 추가 또는 수정
- `refactor:` 코드 리팩토링

## 📚 관련 리소스

- [Playwright 공식 문서](https://playwright.dev/)
- [MCP 프로토콜 스펙](https://modelcontextprotocol.io/)
- [Page Object Model 패턴](https://playwright.dev/docs/pom)

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 언제든지 이슈를 생성해 주세요!

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!