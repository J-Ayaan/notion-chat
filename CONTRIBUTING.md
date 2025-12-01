# 기여 가이드

NotionChat 프로젝트에 기여해주셔서 감사합니다!

## 개발 환경 설정

### 1. 저장소 포크 및 클론

```bash
git clone https://github.com/your-username/notion-chat.git
cd notion-chat
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

## 코드 스타일

- ESLint 설정을 따릅니다
- Prettier는 사용하지 않습니다 (ESLint만 사용)
- 컴포넌트는 함수형 컴포넌트로 작성
- Material Icons 사용 (Lucide 아님)

## 커밋 메시지 규칙

```
<type>: <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### 타입

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 스타일 변경 (코드 포맷팅)
- `refactor`: 리팩토링
- `test`: 테스트 추가
- `chore`: 빌드/설정 변경

## Pull Request 프로세스

1. 새 브랜치 생성: `git checkout -b feat/your-feature`
2. 변경사항 커밋
3. 푸시: `git push origin feat/your-feature`
4. Pull Request 생성
5. 리뷰 대기

## 기능 제안

- GitHub Issues에서 제안
- 라벨: `enhancement`
- 상세한 설명 포함

## 버그 리포트

- GitHub Issues에서 리포트
- 라벨: `bug`
- 재현 방법 포함

## 질문

- GitHub Discussions 사용
- 또는 Issues에 `question` 라벨

## 라이선스

기여하신 코드는 MIT 라이선스 하에 배포됩니다.
