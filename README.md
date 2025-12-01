# NotionChat 💬

노션을 백엔드로 사용하는 무료 팀 채팅 솔루션

![NotionChat](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🚀 특징

- **완전 무료**: 서버 비용 없이 노션만으로 팀 채팅 운영
- **설치 불필요**: 웹 브라우저에서 바로 사용
- **데이터 보안**: 모든 데이터는 여러분의 노션에만 저장
- **빠른 설정**: 3분 안에 팀 채팅 시작
- **실시간 업데이트**: 5초마다 자동으로 새 메시지 확인
- **다중 채널**: 일반, 공지, 긴급, 질문, 개발, 디자인, 기획 채널 지원
- **노션 통합**: 노션 페이지에 직접 임베드 가능

## 📋 사용 가이드

자세한 사용 방법은 [USAGE_GUIDE.md](./USAGE_GUIDE.md)를 참고하세요.

### 빠른 시작 (3단계)

#### 1단계: Notion Integration 생성 (1분)
1. [Notion Integrations](https://www.notion.so/my-integrations) 페이지 접속
2. **"+ New integration"** 클릭
3. 이름 입력 (예: "NotionChat")
4. **Submit** → **Internal Integration Token** 복사 (예: `ntn_xxxxx...`)

#### 2단계: Database 템플릿 복사 (30초)
1. [NotionChat Database 템플릿](https://notion.so) 복사 (또는 직접 생성)
2. Database 필수 속성:
   - **Name** (Title)
   - **채널** (Select)
   - **작성자** (Rich Text)
   - **작성일시** (Created Time)
3. Database 페이지 우측 상단 **⋯** → **Connections** → Integration 연결 ⚠️
4. Database ID 복사:
   - URL: `notion.so/workspace/{database-id}?v=...`
   - `{database-id}` 부분 복사

#### 3단계: 설정 입력하고 시작! (30초)
1. NotionChat 접속
2. Token과 Database ID 입력
3. 이름 입력
4. 채팅 시작! 🎉

## 🛠️ 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📦 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript, JavaScript
- **스타일링**: Tailwind CSS
- **API**: Notion API (@notionhq/client)
- **배포**: Vercel

## 🔧 환경 요구사항

- Node.js 18 이상
- npm 또는 yarn
- Notion 계정
- 최신 웹 브라우저 (Chrome, Firefox, Safari, Edge)

## 📝 프로젝트 구조

```
notion_chat/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── proxy-query/   # 메시지 조회
│   │   ├── proxy-create/  # 메시지 생성
│   │   ├── test-connection/ # 연결 테스트
│   │   └── get-channels/  # 채널 목록
│   ├── components/        # React 컴포넌트
│   │   ├── chat/         # 채팅 관련
│   │   ├── common/       # 공통 컴포넌트
│   │   └── onboarding/   # 온보딩
│   ├── hooks/            # Custom Hooks
│   ├── utils/            # 유틸리티 함수
│   ├── page.tsx          # 랜딩 페이지
│   ├── chat/page.tsx     # 채팅 페이지
│   ├── onboarding/page.tsx # 온보딩
│   └── settings/page.tsx  # 설정
├── public/               # 정적 파일
└── USAGE_GUIDE.md        # 상세 사용 가이드
```

## 🤝 여러 사람과 함께 사용하기

### 방법 1: 같은 설정 공유
1. 팀원들에게 같은 **Integration Token**과 **Database ID** 공유
2. 각자 브라우저에서 NotionChat 접속 후 같은 정보 입력
3. 이름만 다르게 입력하면 모두 같은 채팅방 사용 가능!

### 방법 2: 배포된 URL 공유 (권장)
1. Vercel에 배포
2. 배포된 URL을 팀원들에게 공유
3. 각자 접속해서 같은 Token/Database ID 입력

## 🌐 배포

### Vercel 배포 (권장)

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel
```

또는 [Vercel Dashboard](https://vercel.com)에서 GitHub 연동으로 자동 배포

## ⚠️ 중요 참고사항

1. **Integration 연결 필수**: Database 페이지에서 반드시 Integration을 연결해야 합니다
2. **Token 보안**: Integration Token은 절대 공개하지 마세요
3. **API Rate Limit**: Notion API는 초당 3회 제한이 있습니다
4. **브라우저 저장소**: 설정은 localStorage에 저장되므로 브라우저별로 다릅니다

## 📄 라이센스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 🐛 문제 해결

문제가 발생하면 [Issues](https://github.com/J-Ayaan/notion_chat/issues)에 제보해주세요.

## 📮 문의

- GitHub: [@J-Ayaan](https://github.com/J-Ayaan)
- Issues: [notion_chat/issues](https://github.com/J-Ayaan/notion_chat/issues)

---

**Made with ❤️ using Next.js and Notion API**
