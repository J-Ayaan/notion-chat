# NotionChat 사용 가이드 📚

NotionChat을 처음 사용하시나요? 이 가이드를 따라하면 3분 안에 팀 채팅을 시작할 수 있습니다!

## 목차

1. [시작하기 전에](#시작하기-전에)
2. [Notion Integration 만들기](#1단계-notion-integration-만들기)
3. [Database 준비하기](#2단계-database-준비하기)
4. [NotionChat 설정하기](#3단계-notionchat-설정하기)
5. [채팅 사용하기](#채팅-사용하기)
6. [팀원 초대하기](#팀원-초대하기)
7. [노션에 임베드하기](#노션에-임베드하기)
8. [문제 해결](#문제-해결)

---

## 시작하기 전에

### 필요한 것
- ✅ Notion 계정 (무료 가능)
- ✅ 웹 브라우저 (Chrome, Firefox, Safari, Edge 등)
- ✅ 약 3분의 시간

### NotionChat이란?
NotionChat은 노션 Database를 백엔드로 사용하는 팀 채팅 솔루션입니다.
- 💰 **완전 무료**: 별도 서버 없이 노션만 있으면 OK
- 🔒 **안전**: 모든 데이터는 여러분의 노션에만 저장
- ⚡ **빠름**: 3분이면 설정 완료

---

## 1단계: Notion Integration 만들기

### 1.1 Integration 페이지 접속

1. [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations) 접속
2. 우측 상단 **"+ New integration"** 버튼 클릭

![Integration 생성](https://via.placeholder.com/800x400?text=New+Integration)

### 1.2 Integration 정보 입력

- **Name**: `NotionChat` (또는 원하는 이름)
- **Associated workspace**: 사용할 워크스페이스 선택
- **Capabilities**: 기본값 유지 (Read content, Update content, Insert content)

### 1.3 Token 복사

1. **Submit** 버튼 클릭
2. **Internal Integration Token** 표시됨
3. **Show** 버튼 클릭 → Token 복사
   - 형식: `ntn_xxxxxxxxxxxxx...` (약 50자)
   - ⚠️ **중요**: 이 Token은 절대 공개하지 마세요!

---

## 2단계: Database 준비하기

### 방법 A: 템플릿 사용 (권장)

1. [NotionChat Database 템플릿](https://notion.so) 접속 (링크 제공)
2. 우측 상단 **Duplicate** 버튼 클릭
3. 본인의 워크스페이스에 복사됨

### 방법 B: 직접 생성

1. 노션에서 새 페이지 생성
2. `/database` 입력 → **Table - Inline** 선택
3. 다음 속성(Property) 추가:

| 속성 이름 | 속성 타입 | 필수 | 설명 |
|---------|---------|-----|-----|
| Name | Title | ✅ | 메시지 내용 |
| 채널 | Select | ✅ | 채널 이름 (일반, 공지 등) |
| 작성자 | Rich Text | ✅ | 메시지 작성자 이름 |
| 작성일시 | Created Time | ✅ | 메시지 작성 시간 |

4. **채널** Select 속성에 다음 옵션 추가:
   - 일반 (파란색)
   - 공지 (빨간색)
   - 긴급 (주황색)
   - 질문 (노란색)
   - 개발 (초록색)
   - 디자인 (보라색)
   - 기획 (분홍색)

### 2.2 Integration 연결 ⚠️ **가장 중요!**

Database를 만든 후 반드시 Integration을 연결해야 합니다:

1. Database 페이지 우측 상단 **⋯ (점 3개)** 클릭
2. **"Add connections"** 또는 **"Connections"** 선택
3. 1단계에서 만든 Integration(NotionChat) 선택
4. **Confirm** 클릭

![Connection 추가](https://via.placeholder.com/800x400?text=Add+Connection)

⚠️ **이 단계를 빼먹으면 "Database not found" 오류가 발생합니다!**

### 2.3 Database ID 복사

1. Database 페이지 URL 확인:
   ```
   https://www.notion.so/workspace/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6?v=...
                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                   이 부분이 Database ID입니다
   ```

2. Database ID는 32자 문자열입니다
3. 복사해서 메모장에 저장

**팁**: URL에서 복사하기 어렵다면:
- Database 페이지 우측 상단 **Share** 클릭
- **Copy link** → 링크에서 ID 부분 추출

---

## 3단계: NotionChat 설정하기

### 3.1 NotionChat 접속

배포된 URL 또는 로컬 개발 서버 접속:
- 배포 버전: `https://your-app.vercel.app`
- 로컬: `http://localhost:3000`

### 3.2 온보딩 진행

#### Step 1: Integration Token 입력
- 1단계에서 복사한 Token 붙여넣기
- 형식: `ntn_xxxxx...` 또는 `secret_xxxxx...`
- **다음** 클릭

#### Step 2: Database ID 입력
- 2단계에서 복사한 Database ID 붙여넣기
- 또는 Database URL 전체를 붙여넣어도 자동으로 ID 추출됨
- **다음** 클릭

#### Step 3: 사용자 이름 입력
- 채팅에 표시될 이름 입력 (예: "홍길동")
- **시작하기** 클릭

### 3.3 설정 완료!

채팅 화면으로 자동 이동됩니다. 🎉

---

## 채팅 사용하기

### 기본 사용법

1. **채널 선택**
   - 좌측 사이드바에서 채널 클릭
   - 모바일: 좌측 상단 메뉴 버튼

2. **메시지 보내기**
   - 하단 입력창에 메시지 입력
   - Enter 키 또는 전송 버튼 클릭
   - Shift + Enter로 줄바꿈

3. **새 메시지 확인**
   - 5초마다 자동으로 새 메시지 확인
   - 수동 새로고침: 우측 상단 새로고침 버튼

4. **설정 변경**
   - 우측 상단 톱니바퀴 아이콘 클릭
   - 이름, 새로고침 주기 등 변경 가능

### 채널별 용도

- **🔵 일반**: 일상적인 대화
- **🔴 공지**: 중요 공지사항
- **🟠 긴급**: 긴급한 사항
- **🟡 질문**: 질문과 답변
- **🟢 개발**: 개발 관련 논의
- **🟣 디자인**: 디자인 관련 논의
- **🩷 기획**: 기획 관련 논의

---

## 팀원 초대하기

### 방법 1: 설정 공유 (같은 채팅방 사용)

팀원들이 같은 채팅방을 사용하려면:

1. **공유할 정보**:
   - Integration Token (1단계에서 생성)
   - Database ID (2단계에서 생성)
   - NotionChat URL

2. **팀원이 해야 할 일**:
   - NotionChat 접속
   - 같은 Token과 Database ID 입력
   - 본인 이름만 다르게 입력
   - 완료!

3. **보안 주의**:
   - Token은 비밀번호처럼 안전하게 공유
   - 슬랙 DM, 암호화된 메신저 사용 권장
   - 절대 공개 채널에 올리지 마세요

### 방법 2: Notion 페이지 공유

Database 페이지를 직접 공유하면:
- 팀원들이 노션에서 직접 메시지 확인/작성 가능
- NotionChat은 별도로 각자 설정 필요

---

## 노션에 임베드하기

### 임베드 코드 생성

1. NotionChat → **설정(⚙️)** → **임베드 코드** 섹션
2. **코드 복사** 버튼 클릭
3. 클립보드에 iframe 코드 복사됨

### 노션 페이지에 추가

1. 노션 페이지에서 `/embed` 입력
2. 복사한 iframe 코드 붙여넣기
3. Enter 키

### 주의사항

- iframe 내부에서도 **각 사용자가 처음 한 번 온보딩 설정** 필요
- localStorage는 도메인별로 독립적이므로 설정이 공유되지 않음
- 더 나은 방법: `/bookmark` 또는 `/link`로 URL 링크 추가

---

## 문제 해결

### "Database not found" 오류

**원인**: Integration이 Database에 연결되지 않음

**해결방법**:
1. Database 페이지 → 우측 상단 **⋯** → **Connections**
2. Integration 연결 확인
3. 없으면 다시 연결

### "Invalid Notion token" 오류

**원인**: Token이 잘못됨

**해결방법**:
1. Token 다시 확인 (공백 없이 전체 복사)
2. [Integration 페이지](https://www.notion.so/my-integrations)에서 Token 재확인
3. 필요시 새 Integration 생성

### 메시지가 보이지 않음

**원인**: Database 속성 이름이 다름

**해결방법**:
1. Database 속성 이름 확인:
   - Name (Title)
   - 채널 (Select)
   - 작성자 (Rich Text)
   - 작성일시 (Created Time)
2. 정확히 한글로 입력되어야 함
3. 템플릿 사용 권장

### 설정 페이지가 비어있음

**원인**: 브라우저 localStorage 문제

**해결방법**:
1. 브라우저 새로고침 (Ctrl/Cmd + Shift + R)
2. 쿠키 및 사이트 데이터 허용 확인
3. 시크릿/프라이빗 모드 사용 중지

### 다른 사람이 보낸 메시지가 안 보임

**원인**:
- 다른 Database를 사용 중
- 채널이 다름

**확인사항**:
1. 같은 Database ID 사용 확인
2. 같은 채널 선택 확인
3. 새로고침 버튼 클릭

---

## 고급 사용법

### 설정 커스터마이징

**설정 페이지**에서 다음을 변경할 수 있습니다:

- **새 메시지 확인 주기**: 3초 / 5초(권장) / 10초 / 30초
- **자동 스크롤**: 새 메시지 시 자동으로 하단 이동
- **알림음**: 새 메시지 알림음 (현재 미지원)

### Database 뷰 커스터마이징

노션 Database에서:
- 필터 추가 (예: 특정 채널만 보기)
- 정렬 변경 (예: 최신순 → 과거순)
- 추가 속성 생성 (예: 태그, 담당자 등)

⚠️ 필수 속성(Name, 채널, 작성자, 작성일시)은 삭제하지 마세요!

### 채널 추가/변경

노션 Database에서:
1. **채널** 속성 클릭
2. **Edit property** → Select 옵션 추가/수정
3. 색상도 변경 가능
4. NotionChat에서 자동으로 반영됨

---

## 자주 묻는 질문 (FAQ)

### Q: 완전히 무료인가요?
A: 네! NotionChat은 MIT 라이센스로 완전 무료입니다. Notion도 무료 플랜으로 사용 가능합니다.

### Q: 데이터는 어디에 저장되나요?
A: 모든 메시지는 여러분의 노션 Database에만 저장됩니다. 별도 서버 없음.

### Q: 몇 명까지 사용할 수 있나요?
A: 제한 없습니다. 하지만 Notion API Rate Limit(초당 3회)를 고려하세요.

### Q: 파일 첨부가 되나요?
A: 현재 버전에서는 텍스트만 지원합니다. 파일은 노션 Database에 직접 추가 가능.

### Q: 모바일에서 사용할 수 있나요?
A: 네! 반응형 디자인으로 모바일 브라우저에서도 사용 가능합니다.

### Q: 오픈소스인가요?
A: 네! [GitHub 레포지토리](https://github.com/J-Ayaan/notion_chat)에서 코드를 확인하고 기여할 수 있습니다.

---

## 추가 지원

더 많은 도움이 필요하신가요?

- 📖 **README**: [README.md](./README.md) 참고
- 🐛 **버그 리포트**: [GitHub Issues](https://github.com/J-Ayaan/notion_chat/issues)
- 💬 **질문**: Issues에 "Question" 라벨로 작성
- 📧 **개발자 연락**: GitHub 프로필 참고

---

**즐거운 채팅 되세요! 🎉**
