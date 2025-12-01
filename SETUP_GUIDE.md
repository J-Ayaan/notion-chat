# NotionChat 설정 가이드 (상세)

## 시작하기 전에

- Notion 계정이 필요합니다 (무료 계정 가능)
- 웹 브라우저만 있으면 됩니다
- 총 소요 시간: 약 5분

---

## Step 1: Notion Integration 생성 (2분)

### 1-1. Notion Integrations 페이지 접속

1. 브라우저에서 [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations) 접속
2. Notion 계정으로 로그인

### 1-2. 새 Integration 생성

1. **"+ New integration"** 버튼 클릭
2. 설정 입력:
   - **Name**: `NotionChat` (또는 원하는 이름)
   - **Logo**: 선택사항
   - **Associated workspace**: 본인의 워크스페이스 선택
3. **"Submit"** 버튼 클릭

### 1-3. Token 복사

1. 생성된 Integration 페이지에서 **"Internal Integration Token"** 섹션 찾기
2. **"Show"** 버튼 클릭
3. Token 복사 (형식: `ntn_xxx...` 또는 `secret_xxx...`)
4. ⚠️ **중요**: 이 Token은 안전하게 보관하세요!

### ✅ Step 1 완료!
Token 예시: `ntn_z47654352136HCHDgYwOYmI54e9FpLVKMo7PUQomuRp7T`

---

## Step 2: Notion Database 생성 (2분)

### 2-1. 새 페이지 생성

1. Notion 앱 또는 웹 접속
2. 사이드바에서 **"+ Add a page"** 클릭
3. 페이지 이름: **"팀 메시지 보드"** (또는 원하는 이름)

### 2-2. Database 생성

1. 페이지에서 `/database` 입력 또는 **"Table"** 선택
2. **"New database"** 선택 (Full page 또는 Inline 가능)

### 2-3. 필수 속성 추가

Database에 다음 속성들을 추가해야 합니다:

#### a) Name (Title) - 기본으로 있음
- 타입: **Title**
- 메시지 내용이 저장됩니다

#### b) 채널 (Select)
1. 컬럼 추가: **"+ New property"** 클릭
2. 이름: `채널`
3. 타입: **Select**
4. 옵션 추가:
   - `일반` (파란색)
   - `공지` (빨간색)
   - `긴급` (주황색)
   - `질문` (노란색)
   - `개발` (초록색)
   - `디자인` (보라색)
   - `기획` (분홍색)

#### c) 작성자 (Text)
1. 컬럼 추가
2. 이름: `작성자`
3. 타입: **Text** (또는 People)

#### d) 작성일시 (Created Time)
1. 컬럼 추가
2. 이름: `작성일시`
3. 타입: **Created time**

### 2-4. Integration 연결 ⭐ 중요!

이 단계를 꼭 해야 합니다!

1. Database 페이지 우측 상단의 **"..."** (더보기) 클릭
2. **"Connections"** 또는 **"Add connections"** 클릭
3. 방금 만든 Integration (`NotionChat`) 선택
4. **"Confirm"** 클릭

### 2-5. Database ID 복사

1. Database 페이지 URL 복사
   ```
   예시: https://www.notion.so/myworkspace/abc123def456?v=xyz
   ```

2. URL에서 Database ID 추출:
   - 전체 URL 복사: `https://www.notion.so/myworkspace/abc123def456?v=xyz`
   - 또는 ID만 복사: `abc123def456`
   - 두 가지 모두 가능합니다!

### ✅ Step 2 완료!
Database ID 예시: `abc123def456` 또는 전체 URL

---

## Step 3: NotionChat 설정 (1분)

### 3-1. NotionChat 앱 접속

```bash
# 로컬에서 실행하는 경우
npm run dev
# http://localhost:3000 접속
```

또는 배포된 사이트 접속

### 3-2. 온보딩 시작

1. 랜딩 페이지에서 **"시작하기"** 클릭

### 3-3. Step 1: Integration Token 입력

1. 복사한 Token 붙여넣기
2. 형식 확인: `ntn_xxx...` 또는 `secret_xxx...`
3. **"다음 단계로"** 클릭

### 3-4. Step 2: Database 설정

1. 복사한 Database ID 또는 URL 붙여넣기
2. **"다음 단계로"** 클릭

### 3-5. Step 3: 사용자 이름 입력

1. 이름 입력 (예: `홍길동`)
2. **"채팅 시작하기"** 클릭

### ✅ Step 3 완료!
이제 채팅을 사용할 수 있습니다!

---

## 문제 해결

### ❌ "Invalid Notion token" 오류

**원인**: Token 형식이 잘못되었거나 만료됨

**해결 방법**:
1. Token을 다시 복사 (앞뒤 공백 제거)
2. Integration 페이지에서 Token 재생성
3. 형식 확인: `ntn_` 또는 `secret_`로 시작해야 함

### ❌ "Database not found" 오류

**원인**: Integration이 Database에 연결되지 않음

**해결 방법**:
1. Notion Database 페이지 열기
2. 우측 상단 **"..."** → **"Connections"** 클릭
3. Integration 연결 확인
4. 없으면 추가 후 다시 시도

### ❌ "Database schema mismatch" 오류

**원인**: 필수 속성이 없음

**해결 방법**:
필수 속성 확인:
- ✅ Name (Title)
- ✅ 채널 (Select)
- ✅ 작성자 (Text 또는 People)
- ✅ 작성일시 (Created time)

속성 이름이 정확히 일치해야 합니다!

### ❌ Database ID를 찾을 수 없어요

**방법 1**: URL에서 추출
```
https://www.notion.so/workspace/1234567890abcdef?v=xxx
                              ^^^^^^^^^^^^^^^^
                              이 부분이 Database ID
```

**방법 2**: Share → Copy link
1. Database 페이지에서 **"Share"** 클릭
2. **"Copy link"** 클릭
3. URL 전체를 붙여넣기 (앱이 자동으로 ID 추출)

### ❌ 메시지가 전송되지 않아요

**확인사항**:
1. Integration이 Database에 연결되어 있는지 확인
2. 브라우저 콘솔에서 에러 확인 (F12)
3. Notion API Rate Limit 확인 (초당 3회 제한)

### ❌ 메시지가 실시간으로 업데이트되지 않아요

**정상입니다**: 현재는 5초마다 폴링으로 업데이트됩니다.

**변경 방법**:
1. 설정 페이지 (⚙️) 접속
2. "새 메시지 확인 주기" 변경 (3초/5초/10초)

---

## Database 속성 상세 설명

### 완성된 Database 구조

| 속성 이름 | 타입 | 필수 | 설명 |
|----------|------|-----|------|
| Name | Title | ✅ | 메시지 내용 |
| 채널 | Select | ✅ | 채널 분류 (일반, 공지 등) |
| 작성자 | Text | ✅ | 메시지 작성자 이름 |
| 작성일시 | Created time | ✅ | 메시지 생성 시간 |

### 선택 속성 (추가 가능)

| 속성 이름 | 타입 | 설명 |
|----------|------|------|
| 상태 | Select | 메시지 상태 (새 메시지, 확인됨, 완료) |
| 중요도 | Checkbox | 중요 메시지 표시 |
| 태그 | Multi-select | 메시지 태그 |

---

## 테스트 방법

### 1. 첫 메시지 보내기

1. 채팅 화면에서 메시지 입력
2. **"전송"** 버튼 클릭 (또는 Enter)
3. Notion Database에서 메시지 확인

### 2. 채널 전환

1. 좌측 사이드바에서 다른 채널 클릭
2. 해당 채널의 메시지만 표시되는지 확인

### 3. 다중 사용자 테스트

1. 다른 브라우저 또는 시크릿 모드에서 접속
2. 다른 사용자 이름으로 설정
3. 같은 Database ID 사용
4. 메시지 주고받기 테스트

---

## 보안 주의사항

### ⚠️ Token 관리

- **절대 공유하지 마세요**: Token은 비밀번호와 같습니다
- **GitHub 업로드 금지**: .gitignore에 추가 필수
- **주기적 재발급**: 보안을 위해 정기적으로 변경

### 🔒 데이터 보안

- 모든 데이터는 **본인의 Notion**에만 저장
- NotionChat 앱은 데이터를 저장하지 않음
- Token은 **브라우저 localStorage**에만 저장

### 👥 팀 사용 시

- 각 팀원이 같은 Database 사용
- 각 팀원이 같은 Integration 사용 가능
- 또는 각자 Integration 생성 후 같은 Database 연결

---

## 추가 팁

### 💡 Notion에서 메시지 관리

- Notion Database에서 직접 메시지 수정/삭제 가능
- 채널 추가: Select 속성에 옵션 추가
- 필터/정렬: Notion의 View 기능 활용

### 💡 임베드 사용

1. 설정 페이지에서 **"임베드 코드 복사"**
2. Notion 페이지에서 `/embed` 입력
3. 코드 붙여넣기
4. Notion에서 직접 채팅 사용!

### 💡 성능 최적화

- Database에 너무 많은 메시지가 쌓이면 느려질 수 있음
- 주기적으로 오래된 메시지 아카이브 권장
- 또는 월별로 새 Database 생성

---

## 문의 및 지원

- **GitHub Issues**: [프로젝트 저장소](https://github.com/your-repo)
- **이메일**: support@notionchat.app
- **문서**: [README.md](./README.md)

---

**설정이 완료되었나요? 즐거운 채팅 되세요! 🎉**
