# Playwright MCP E2E Workflow

이 프로젝트는 Playwright와 MCP(Model Context Protocol)를 활용한 E2E 테스트 워크플로우를 구현하는 예제입니다.

## 프로젝트 개요

Playwright를 사용하여 웹 애플리케이션의 E2E 테스트를 자동화하고, MCP를 통해 AI 에이전트와의 통합을 제공합니다.

## 주요 기능

- 🎭 Playwright를 활용한 E2E 테스트 자동화
- 🤖 MCP를 통한 AI 에이전트 통합
- 🔄 CI/CD 워크플로우 자동화
- 📊 테스트 결과 리포팅

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
npm install
```

### 테스트 실행

```bash
# E2E 테스트 실행
npm run test:e2e

# 헤드리스 모드로 실행
npm run test:e2e:headless
```

## 프로젝트 구조

```
playwright-mcp-e2e-workflow/
├── tests/           # E2E 테스트 파일
├── pages/           # Page Object Model
├── fixtures/        # 테스트 데이터
├── utils/           # 유틸리티 함수
└── playwright.config.js  # Playwright 설정
```

## 기여하기

1. 이 레포지토리를 포크합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.