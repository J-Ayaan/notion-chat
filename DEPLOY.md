# NotionChat 배포 가이드

## Vercel 배포 방법

### 1. GitHub 저장소 생성 및 푸시

```bash
# 새 원격 저장소 추가
git remote add origin https://github.com/your-username/notion-chat.git

# 푸시
git push -u origin master
```

### 2. Vercel 계정 생성

1. [vercel.com](https://vercel.com) 접속
2. GitHub 계정으로 로그인

### 3. 프로젝트 배포

1. Vercel 대시보드에서 **"New Project"** 클릭
2. GitHub 저장소 선택 (notion-chat)
3. 프로젝트 설정:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **"Deploy"** 클릭

### 4. 환경변수 설정 (선택사항)

현재 프로젝트는 클라이언트 사이드에서 모든 설정을 관리하므로, 서버 환경변수가 필요하지 않습니다.

### 5. 커스텀 도메인 연결 (선택사항)

1. Vercel 프로젝트 설정 → **Domains**
2. 도메인 추가 및 DNS 설정

## 배포 후 확인사항

- [ ] 랜딩 페이지 정상 작동
- [ ] 온보딩 플로우 테스트
- [ ] Notion API 연동 테스트
- [ ] 채팅 메시지 송수신 테스트
- [ ] 설정 페이지 테스트
- [ ] 모바일 반응형 확인

## Serverless Functions 엔드포인트

배포 후 다음 엔드포인트가 자동으로 생성됩니다:

- `https://your-domain.vercel.app/api/proxy-query`
- `https://your-domain.vercel.app/api/proxy-create`
- `https://your-domain.vercel.app/api/test-connection`
- `https://your-domain.vercel.app/api/get-channels`

## 자동 배포

- `master` 브랜치에 푸시하면 자동으로 배포됩니다
- Pull Request 시 프리뷰 배포가 생성됩니다

## 성능 최적화

Vercel은 자동으로 다음을 제공합니다:

- ✅ CDN 배포
- ✅ 자동 HTTPS
- ✅ Gzip 압축
- ✅ Edge Network
- ✅ Serverless Functions

## 문제 해결

### 빌드 실패 시

```bash
# 로컬에서 빌드 테스트
npm run build

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

### Serverless Functions 오류 시

- Vercel 대시보드에서 Function Logs 확인
- `@notionhq/client` 패키지가 dependencies에 있는지 확인

## 비용

- **무료 티어**: 월 100GB 대역폭, 100 Serverless Functions 실행
- **Pro**: $20/월 (무제한)

대부분의 소규모 팀은 무료 티어로 충분합니다.
