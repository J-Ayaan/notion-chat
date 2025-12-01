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

## 🚧 개발 진행 상황

- [x] Phase 0: 프로젝트 초기 설정
- [x] Phase 1: 기본 유틸리티 & 훅
- [x] Phase 2: Serverless Functions
- [x] Phase 3: 온보딩 페이지
- [x] Phase 4: 채팅 메인 화면
- [x] Phase 5: 설정 페이지
- [x] Phase 6: 랜딩 페이지
- [x] Phase 7: 공통 컴포넌트
- [x] Phase 8: 라우팅 & 앱 구조
- [x] Phase 9: 테스트 & 버그 수정 (빌드 성공)
- [ ] Phase 10: Vercel 배포
- [ ] Phase 11: 문서화
- [ ] Phase 12: 런칭 준비
