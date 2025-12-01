# Vercel 배포 가이드 🚀

NotionChat을 Vercel에 배포하는 방법을 안내합니다.

## 목차

1. [준비사항](#준비사항)
2. [방법 1: Vercel Dashboard (추천)](#방법-1-vercel-dashboard-추천)
3. [방법 2: Vercel CLI](#방법-2-vercel-cli)
4. [배포 후 확인사항](#배포-후-확인사항)
5. [커스텀 도메인 설정](#커스텀-도메인-설정)
6. [문제 해결](#문제-해결)

---

## 준비사항

### 필요한 것
- ✅ GitHub 계정
- ✅ Vercel 계정 (무료)
- ✅ 코드가 푸시된 GitHub 레포지토리

### 이미 완료된 것
- ✅ GitHub 레포지토리: https://github.com/J-Ayaan/notion-chat
- ✅ 코드 푸시 완료
- ✅ Next.js 빌드 설정 완료

---

## 방법 1: Vercel Dashboard (추천)

가장 쉽고 빠른 방법입니다.

### 1단계: Vercel 계정 생성 (없으면)

1. [https://vercel.com](https://vercel.com) 접속
2. **Sign Up** 클릭
3. **Continue with GitHub** 선택
4. GitHub 계정으로 로그인

### 2단계: 프로젝트 임포트

1. Vercel Dashboard에서 **Add New...** → **Project** 클릭
2. **Import Git Repository** 섹션에서:
   - **GitHub** 선택
   - `J-Ayaan/notion-chat` 레포지토리 찾기
   - **Import** 클릭

![Import Project](https://via.placeholder.com/800x400?text=Import+Project)

### 3단계: 프로젝트 설정

다음 설정이 자동으로 감지됩니다:

- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

⚠️ **중요**: 기본 설정 그대로 두고 **Deploy** 버튼만 클릭하세요!

### 4단계: 배포 완료!

- 약 2-3분 후 배포 완료
- 배포 URL 표시: `https://notion-chat-xxxx.vercel.app`
- 🎉 완료!

---

## 방법 2: Vercel CLI

터미널에서 배포하는 방법입니다.

### 1단계: Vercel CLI 로그인

```bash
# 이미 설치되어 있음
vercel login
```

이메일 주소 입력 → 이메일에서 확인 링크 클릭

### 2단계: 프로젝트 배포

```bash
# 프로젝트 디렉토리에서 실행
cd /Users/jeongjungyeong/develop/notion_chat

# 프로덕션 배포
vercel --prod
```

### 3단계: 배포 과정

다음 질문들에 답변:

```
? Set up and deploy "~/develop/notion_chat"? [Y/n] Y
? Which scope do you want to deploy to? [Your Account]
? Link to existing project? [n] n
? What's your project's name? notion-chat
? In which directory is your code located? ./
```

Auto-detected Project Settings:
- **Framework**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Development Command**: `next dev`

```
? Want to modify these settings? [n] n
```

### 4단계: 배포 완료

```
🔗  Preview: https://notion-chat-xxxx.vercel.app
```

프로덕션 URL이 표시됩니다!

---

## 배포 후 확인사항

### 1. 사이트 접속 확인

배포된 URL로 접속:
- 랜딩 페이지가 정상적으로 표시되는지 확인
- "시작하기" 버튼 클릭

### 2. 온보딩 테스트

1. Notion Integration Token 입력
2. Database ID 입력
3. 이름 입력
4. 채팅 화면 정상 동작 확인

### 3. API Routes 확인

다음 엔드포인트들이 정상 작동하는지 확인:
- `/api/proxy-query` - 메시지 조회
- `/api/proxy-create` - 메시지 생성
- `/api/test-connection` - 연결 테스트
- `/api/get-channels` - 채널 목록

### 4. 기능 테스트 체크리스트

- [ ] 메시지 전송
- [ ] 메시지 수신 (5초 폴링)
- [ ] 채널 전환
- [ ] 설정 저장
- [ ] 새로고침 후 설정 유지
- [ ] 모바일 반응형

---

## 배포 URL

### 자동 생성 URL

Vercel이 자동으로 생성하는 URL:
```
https://notion-chat-xxxx.vercel.app
```

### 브랜치별 URL

- **Production (master)**: `https://notion-chat.vercel.app`
- **Preview (기타 브랜치)**: `https://notion-chat-git-[branch].vercel.app`

### Commit별 URL

각 커밋마다 고유 Preview URL 생성:
```
https://notion-chat-[commit-hash].vercel.app
```

---

## 커스텀 도메인 설정

자신만의 도메인을 사용하고 싶다면:

### 1. 도메인 준비

도메인을 보유하고 있어야 합니다 (예: `chat.yourdomain.com`)

### 2. Vercel에서 도메인 추가

1. Vercel Dashboard → 프로젝트 선택
2. **Settings** → **Domains** 탭
3. **Add** 버튼 클릭
4. 도메인 입력 (예: `chat.yourdomain.com`)
5. **Add** 클릭

### 3. DNS 설정

도메인 등록업체(Namecheap, GoDaddy 등)에서:

**A Record 방식**:
```
Type: A
Name: chat (또는 @)
Value: 76.76.21.21
```

**CNAME 방식** (추천):
```
Type: CNAME
Name: chat
Value: cname.vercel-dns.com
```

### 4. 확인

- DNS 전파까지 최대 48시간 소요 (보통 몇 분~몇 시간)
- Vercel에서 자동으로 SSL 인증서 발급

---

## 환경 변수 설정 (선택사항)

현재 NotionChat은 클라이언트 사이드에서 설정을 관리하므로 환경 변수가 필요 없습니다.

하지만 나중에 필요하다면:

### Vercel Dashboard에서

1. **Settings** → **Environment Variables**
2. 변수 추가:
   ```
   Key: NEXT_PUBLIC_API_URL
   Value: https://api.example.com
   ```
3. **Save** 클릭
4. 재배포 필요

### Vercel CLI에서

```bash
# 환경 변수 추가
vercel env add NEXT_PUBLIC_API_URL

# 값 입력
? What's the value of NEXT_PUBLIC_API_URL? https://api.example.com

# 재배포
vercel --prod
```

---

## 자동 배포 설정

### GitHub 연동 (이미 완료)

Vercel은 자동으로 다음과 같이 작동합니다:

1. **master 브랜치 push** → 프로덕션 배포
2. **다른 브랜치 push** → Preview 배포
3. **Pull Request** → Preview URL 자동 코멘트

### 배포 알림

Vercel에서 자동으로:
- GitHub Commit Status 업데이트
- PR에 Preview URL 코멘트
- 배포 성공/실패 알림

---

## 문제 해결

### 빌드 실패

**증상**: 배포 중 오류 발생

**확인사항**:
1. 로컬에서 `npm run build` 성공하는지 확인
2. Vercel Logs 확인:
   ```bash
   vercel logs
   ```
3. Node.js 버전 확인 (18 이상 필요)

**해결방법**:
- `package.json`의 `engines` 추가:
  ```json
  "engines": {
    "node": ">=18.0.0"
  }
  ```

### API Routes 404 오류

**증상**: `/api/*` 엔드포인트가 404 에러

**원인**: Next.js API Routes 구조 문제

**확인**:
- `app/api/*/route.ts` 파일들이 올바른 위치에 있는지
- 각 파일이 `export async function POST/GET` 있는지

### 느린 빌드 시간

**해결방법**:
```bash
# .vercelignore 파일 생성
echo "node_modules" > .vercelignore
echo ".next" >> .vercelignore
echo ".git" >> .vercelignore
```

### 배포는 되는데 사이트가 안 열림

**확인사항**:
1. Vercel Logs 확인
2. 브라우저 콘솔 확인 (F12)
3. URL 정확히 입력했는지 확인

---

## 배포 후 할 일

### 1. URL 업데이트

README.md 업데이트:
```markdown
배포 URL: https://notion-chat.vercel.app
```

### 2. 팀원들에게 공유

배포된 URL을 팀원들에게 공유:
- Slack, Discord 등에 링크 공유
- 사용 가이드와 함께 전달

### 3. GitHub README 배지 추가

```markdown
[![Deployed on Vercel](https://vercel.com/button)](https://notion-chat.vercel.app)
```

### 4. 모니터링 설정

Vercel Dashboard에서:
- **Analytics** 탭: 방문자 통계 확인
- **Speed Insights**: 성능 모니터링
- **Logs**: 오류 로그 확인

---

## 비용

### Vercel 무료 플랜

NotionChat은 무료 플랜으로 충분합니다:

- ✅ **대역폭**: 100GB/월
- ✅ **빌드 시간**: 6,000분/월
- ✅ **Serverless Function**: 100GB-시간/월
- ✅ **도메인**: 무제한
- ✅ **프로젝트**: 무제한

대부분의 팀/개인 사용에 충분합니다!

### 업그레이드가 필요한 경우

- 방문자가 매우 많은 경우 (월 10만+ 방문)
- 복잡한 Serverless Functions
- 팀 협업 기능 필요

---

## 추가 리소스

- 📖 [Vercel 공식 문서](https://vercel.com/docs)
- 📖 [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- 💬 [Vercel 커뮤니티](https://github.com/vercel/vercel/discussions)

---

## 요약

### 가장 빠른 배포 방법

1. [Vercel Dashboard](https://vercel.com) 접속
2. GitHub 연동
3. `J-Ayaan/notion-chat` 임포트
4. **Deploy** 클릭
5. 완료! 🎉

배포 시간: **약 2-3분**

---

**배포 후 문제가 있으면 [Issues](https://github.com/J-Ayaan/notion-chat/issues)에 제보해주세요!**
