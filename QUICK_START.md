# NotionChat 빠른 시작 (5분)

## 체크리스트

### ☐ Step 1: Notion Integration (2분)

```
1. https://www.notion.so/my-integrations 접속
2. "+ New integration" 클릭
3. 이름: NotionChat
4. Submit 클릭
5. Token 복사 → 메모장에 저장
```

**Token 예시**: `ntn_z47654352136HCHDgYwOYmI54e9FpLVKMo7PUQomuRp7T`

---

### ☐ Step 2: Database 생성 (2분)

```
1. Notion에서 새 페이지 생성
2. /database 입력 → Table 선택
3. 컬럼 추가:
   ✓ Name (있음)
   ✓ 채널 (Select) → 옵션: 일반, 공지, 긴급, 질문, 개발, 디자인, 기획
   ✓ 작성자 (Text)
   ✓ 작성일시 (Created time)

4. 우측 상단 ... → Connections → NotionChat 선택
5. URL 복사 → 메모장에 저장
```

**URL 예시**: `https://www.notion.so/workspace/abc123def456?v=xyz`

---

### ☐ Step 3: 앱 실행 (1분)

```bash
# 터미널에서 실행
cd /Users/jeongjungyeong/develop/notion_chat
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

---

### ☐ Step 4: 온보딩 완료

```
1. "시작하기" 클릭
2. Token 붙여넣기 → 다음
3. Database URL 붙여넣기 → 다음
4. 이름 입력 → 채팅 시작하기
```

---

## 테스트 시나리오

### ✅ 기본 테스트

1. 메시지 전송: "안녕하세요!"
2. Notion Database에서 확인
3. 5초 후 자동 새로고침 확인
4. 채널 변경 (공지) → 메시지 전송
5. 설정 변경 → 사용자 이름 변경

### ✅ 다중 사용자 테스트

1. 시크릿 모드로 같은 URL 접속
2. 같은 Token/Database 사용
3. 다른 이름으로 설정
4. 양쪽에서 메시지 주고받기

---

## 자주 발생하는 오류

### 1. "Database not found"
→ **해결**: Database에서 ... → Connections → Integration 추가

### 2. "Invalid token"
→ **해결**: Token 앞뒤 공백 제거 후 재입력

### 3. "Schema mismatch"
→ **해결**: 속성 이름 확인 (`채널`, `작성자`, `작성일시` 정확히)

### 4. 메시지가 안 보여요
→ **해결**: 5초 기다리기 또는 새로고침 버튼 클릭

---

## 확인 사항

```
✅ Notion Integration 생성됨
✅ Database 생성됨
✅ 4개 속성 추가됨 (Name, 채널, 작성자, 작성일시)
✅ Integration이 Database에 연결됨 ⭐ 중요!
✅ npm run dev 실행됨
✅ http://localhost:3000 접속됨
✅ 온보딩 완료됨
```

---

## 다음 단계

- [상세 설정 가이드](./SETUP_GUIDE.md) - 문제 해결
- [배포 가이드](./DEPLOY.md) - Vercel 배포
- [런칭 체크리스트](./LAUNCH_CHECKLIST.md) - 프로덕션 준비

---

**문제가 있나요?** [SETUP_GUIDE.md](./SETUP_GUIDE.md)의 문제 해결 섹션을 확인하세요!
