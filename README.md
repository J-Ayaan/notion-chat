# NotionChat 🚀

노션을 백엔드로 사용하는 팀 채팅 솔루션

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vercel](https://img.shields.io/badge/deploy-vercel-black.svg)](DEPLOY.md)

## ✨ 특징

- 🆓 **완전 무료** - 서버 비용 없음
- 🔒 **안전** - 자신의 노션에만 저장
- 📱 **모바일 최적화** - 어디서나 사용
- 🎨 **커스터마이징** - 채널/속성 자유 수정
- ⚡ **빠른 설정** - 3분이면 충분
- 🌐 **오픈소스** - MIT 라이선스

## 🚀 빠른 시작

### 사용자용

1. [배포된 사이트](https://your-domain.vercel.app) 접속
2. "시작하기" 클릭
3. 가이드를 따라 3분 안에 설정 완료

### 개발자용

#### 1. 의존성 설치
```bash
npm install
```

#### 2. 개발 서버 실행
```bash
npm run dev
```

#### 3. 빌드
```bash
npm run build
```

## 📖 문서

- [사용자 가이드](./notionchat-saas-guide.md) - 상세한 서비스 기획서
- [배포 가이드](./DEPLOY.md) - Vercel 배포 방법
- [기여 가이드](./CONTRIBUTING.md) - 개발 참여 방법

## 🏗️ 프로젝트 구조

```
notion-chat/
├── src/
│   ├── pages/          # 페이지 컴포넌트
│   ├── components/     # 재사용 컴포넌트
│   ├── hooks/          # 커스텀 훅
│   ├── utils/          # 유틸리티 함수
│   └── App.jsx         # 메인 앱
├── api/                # Vercel Serverless Functions
└── public/             # 정적 파일
```

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

## 🚀 개발 완료!

모든 개발 단계가 완료되었습니다. 이제 배포하고 사용할 수 있습니다!

### 완료된 기능
- ✅ 3단계 온보딩 시스템
- ✅ 실시간 채팅 (폴링)
- ✅ 7개 채널 지원
- ✅ 설정 관리 페이지
- ✅ 반응형 디자인
- ✅ ErrorBoundary
- ✅ Vercel 배포 준비 완료
- ✅ 완전한 문서화

### 다음 단계
1. [배포 가이드](./DEPLOY.md)를 따라 Vercel에 배포
2. [런칭 체크리스트](./LAUNCH_CHECKLIST.md) 확인
3. 실제 Notion과 연동하여 테스트

## 🤝 기여하기

기여는 언제나 환영합니다! [기여 가이드](./CONTRIBUTING.md)를 참고하세요.
