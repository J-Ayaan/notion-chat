# 노션 채팅 SaaS 서비스 개발 기획서
## "NotionChat" - 노션을 백엔드로 쓰는 팀 채팅 솔루션

---

## 📋 프로젝트 개요

### 비전
**"누구나 3분 안에 노션과 연결된 팀 채팅을 시작할 수 있다"**

### 목적
- 노션을 사용하는 팀이 **별도 설치 없이** 바로 사용 가능한 채팅 서비스
- 각 팀이 **자신의 노션 워크스페이스**와 연동
- 개발자가 아니어도 **가이드만 따라하면** 5분 안에 설정 완료
- 완전 **무료** (노션 API와 Vercel 무료 티어 활용)

### 핵심 차별점
✅ 설치 불필요 - 웹 브라우저만 있으면 OK  
✅ 무료 - 서버 비용 없음 (노션이 데이터 저장)  
✅ 보안 - 자신의 노션에만 저장, 제3자 서버 없음  
✅ 임베드 가능 - 노션 페이지에 직접 삽입  
✅ 커스터마이징 - 채널/속성 자유롭게 수정  

---

## 🎯 타겟 사용자

### Primary
- 노션을 업무 도구로 쓰는 스타트업/소규모 팀
- 디스코드/슬랙과 노션을 병행하며 불편함을 느끼는 팀
- 채팅 내역을 노션에 자동 저장하고 싶은 팀

### Secondary
- 프로젝트별 임시 채팅방이 필요한 프리랜서
- 스터디/동아리에서 노션 쓰는 그룹
- 개인 메모/일기를 채팅 형식으로 쓰고 싶은 사람

---

## 🏗️ 서비스 아키텍처 (Multi-Tenant)

### 기술 스택

```
Frontend:
- React 18 + Vite
- Tailwind CSS
- Google Material Icons (NOT Lucide)

Backend:
- Notion API (각 사용자의 Integration)
- Vercel Serverless Functions (프록시 역할만)

Storage:
- 사용자 설정: localStorage (브라우저)
- 채팅 데이터: 각 사용자의 Notion Database

Authentication:
- 없음 (각자 자신의 Notion Token 관리)
- OR Notion OAuth 2.0 (Phase 2)
```

### 데이터 흐름 (Multi-Tenant)

```
[사용자 A 브라우저]                    [사용자 A의 Notion]
    ↓ (Token A, DB ID A)                      ↑
[NotionChat 웹앱]                              |
    ↓                                          |
[Vercel Serverless Function] ----------------→
    (Token 기반 라우팅)
[사용자 B 브라우저]                    [사용자 B의 Notion]
    ↓ (Token B, DB ID B)                      ↑
```

**핵심**: 중앙 서버에 데이터 저장 안 함! 각 사용자가 자신의 Notion과 직접 통신

---

## 🎨 화면 설계

### 1. 랜딩 페이지 (/)

```
┌─────────────────────────────────────────────┐
│                                             │
│         🚀 NotionChat                      │
│                                             │
│    노션과 연결된 팀 채팅을 3분 안에         │
│                                             │
│         [시작하기] [GitHub]                 │
│                                             │
│   ✓ 완전 무료  ✓ 설치 불필요  ✓ 오픈소스    │
│                                             │
│         [사용 예시 스크린샷]                │
│                                             │
│         [어떻게 작동하나요?]                │
│   1. Notion Integration 생성 (1분)         │
│   2. Database 템플릿 복사 (30초)           │
│   3. 설정 입력하고 시작! (30초)            │
│                                             │
└─────────────────────────────────────────────┘
```

### 2. 온보딩 (Setup Wizard)

```
┌─────────────────────────────────────────────┐
│  [1. Integration] → [2. Database] → [3. 완료]│
├─────────────────────────────────────────────┤
│                                             │
│  Step 1: Notion Integration 생성            │
│                                             │
│  📖 가이드:                                 │
│  1. https://notion.so/my-integrations 접속 │
│  2. "+ New integration" 클릭               │
│  3. 이름: NotionChat (아무거나)             │
│  4. "Submit" 클릭                          │
│  5. "Internal Integration Token" 복사      │
│                                             │
│  [복사한 Token을 여기 붙여넣기]              │
│  secret_xxxxxxxxxxxxxxxx                   │
│                                             │
│  ⚠️ 주의: Token은 절대 공유하지 마세요!     │
│  (브라우저에만 저장되며 서버로 전송 안 됨)   │
│                                             │
│            [이전]  [다음 단계로 →]          │
│                                             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  [1. Integration] → [2. Database] → [3. 완료]│
├─────────────────────────────────────────────┤
│                                             │
│  Step 2: Database 설정                      │
│                                             │
│  옵션 1: 템플릿 복사 (추천) 🎁              │
│  [템플릿 복사하기] → Notion에서 열림         │
│                                             │
│  복사한 Database URL:                       │
│  https://notion.so/xxx?v=yyy               │
│                                             │
│  옵션 2: 직접 만들기 📝                     │
│  필수 속성:                                 │
│  - Name (Title)                            │
│  - 채널 (Select): 일반, 공지, 긴급...       │
│  - 작성자 (Text 또는 People)                │
│  - 작성일시 (Created Time)                  │
│                                             │
│  Database ID (URL에서 추출):                │
│  bea2ba103d09493294a26336015709df          │
│                                             │
│  ℹ️ Integration을 Database에 연결하기:     │
│  Database 우측 상단 ... → Connections →    │
│  NotionChat 선택                           │
│                                             │
│            [이전]  [완료 →]                 │
│                                             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  [1. Integration] → [2. Database] → [3. 완료]│
├─────────────────────────────────────────────┤
│                                             │
│  🎉 설정 완료!                              │
│                                             │
│  ✅ Notion Integration 연결됨               │
│  ✅ Database 연동됨                         │
│                                             │
│  사용자 이름을 설정하세요:                   │
│  [홍길동        ]                           │
│                                             │
│  이제 채팅을 시작할 수 있습니다!             │
│                                             │
│  💡 팁:                                    │
│  - 설정은 언제든 변경 가능 (⚙️ 버튼)       │
│  - 노션에 임베드하려면: 복사 버튼 클릭       │
│  - 채널은 노션 DB에서 직접 추가/수정         │
│                                             │
│              [채팅 시작하기 🚀]             │
│                                             │
└─────────────────────────────────────────────┘
```

### 3. 메인 채팅 화면 (/chat)

```
┌─────────────────────────────────────────────┐
│  [☰] NotionChat  [#일반 ▼]  [🔄] [⚙️]      │  ← Header
├──────────┬──────────────────────────────────┤
│          │                                  │
│ 채널     │  💬 김철수  오후 2:30             │
│          │  안녕하세요!                      │
│ 🔵 일반  │                                  │
│ 🔴 공지  │  💬 이영희  오후 2:35             │
│ 🟠 긴급  │  회의 시간이 3시로 변경됐어요      │
│ 🟡 질문  │                                  │
│ 🟢 개발  │  💬 박민수  오후 2:40             │
│ 🟣 디자인│  확인했습니다 👍                  │
│ 🔴 기획  │                                  │
│          │                                  │
│          │  (자동 스크롤)                    │
│          │                                  │
├──────────┴──────────────────────────────────┤
│  [메시지 입력...]                [전송 ➤]   │
└─────────────────────────────────────────────┘
```

### 4. 설정 화면 (/settings)

```
┌─────────────────────────────────────────────┐
│  [←] 설정                                   │
├─────────────────────────────────────────────┤
│                                             │
│  👤 사용자 정보                             │
│  이름: [홍길동        ]                     │
│                                             │
│  🔗 Notion 연동                             │
│  Integration Token:                        │
│  secret_****************************       │
│  [변경하기]                                 │
│                                             │
│  Database ID:                              │
│  bea2ba103d09493294a26336015709df          │
│  [변경하기]                                 │
│                                             │
│  ⚙️ 채팅 설정                               │
│  새 메시지 확인 주기:                        │
│  [5초 ▼] (3초 / 5초 / 10초)                │
│                                             │
│  자동 스크롤: [✓]                           │
│  알림음: [ ]                                │
│                                             │
│  🎨 테마                                    │
│  [○ 라이트] [● 다크]                        │
│                                             │
│  📦 데이터                                  │
│  [설정 내보내기] [설정 초기화]               │
│                                             │
│  📋 임베드 코드                             │
│  노션에 이 채팅을 임베드하려면:              │
│  [코드 복사]                                │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 💻 핵심 구현 로직

### 프로젝트 구조 (SaaS 버전)

```
notion-chat-saas/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx          # 랜딩 페이지
│   │   ├── OnboardingPage.jsx       # 온보딩 (3단계)
│   │   ├── ChatPage.jsx             # 메인 채팅
│   │   └── SettingsPage.jsx         # 설정
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── ChatMessage.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   └── ChannelSidebar.jsx
│   │   ├── onboarding/
│   │   │   ├── Step1Integration.jsx
│   │   │   ├── Step2Database.jsx
│   │   │   └── Step3Complete.jsx
│   │   └── common/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       └── Loading.jsx
│   ├── hooks/
│   │   ├── useNotionConfig.js       # 사용자 설정 관리
│   │   ├── useMessages.js           # 메시지 로직
│   │   └── usePolling.js            # 실시간 폴링
│   ├── utils/
│   │   ├── notionApi.js             # Notion API 래퍼
│   │   ├── storage.js               # localStorage 관리
│   │   └── validators.js            # Token/ID 검증
│   ├── App.jsx
│   └── main.jsx
├── api/
│   ├── proxy-query.js               # 프록시: 메시지 조회
│   └── proxy-create.js              # 프록시: 메시지 전송
├── public/
│   ├── notion-template.json         # Database 템플릿
│   └── embed-code.html              # 임베드 코드 샘플
├── .env.example
├── package.json
└── README.md                        # 사용자 가이드
```

### 1. 설정 저장 (storage.js)

```javascript
// src/utils/storage.js

const STORAGE_KEY = 'notionchat_config';

export const saveConfig = (config) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Failed to save config:', error);
    return false;
  }
};

export const loadConfig = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load config:', error);
    return null;
  }
};

export const clearConfig = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Config 구조:
// {
//   notionToken: "secret_xxx",
//   databaseId: "xxx-xxx-xxx",
//   userName: "홍길동",
//   pollingInterval: 5000,
//   theme: "light"
// }
```

### 2. 설정 검증 (validators.js)

```javascript
// src/utils/validators.js

export const validateNotionToken = (token) => {
  // Notion Token 형식: secret_으로 시작하는 50자 문자열
  const regex = /^secret_[a-zA-Z0-9]{43}$/;
  return regex.test(token.trim());
};

export const validateDatabaseId = (id) => {
  // UUID 형식 (하이픈 있거나 없거나)
  const regex = /^[a-f0-9]{32}$|^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
  return regex.test(id.trim().replace(/-/g, ''));
};

export const extractDatabaseIdFromUrl = (url) => {
  // URL에서 Database ID 추출
  // 예: https://notion.so/xxx/abc123?v=yyy → abc123
  const match = url.match(/([a-f0-9]{32})|([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i);
  return match ? match[0].replace(/-/g, '') : null;
};

export const testNotionConnection = async (token, databaseId) => {
  try {
    const response = await fetch('/api/test-connection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, databaseId }),
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
```

### 3. 설정 훅 (useNotionConfig.js)

```javascript
// src/hooks/useNotionConfig.js
import { useState, useEffect } from 'react';
import { loadConfig, saveConfig, clearConfig } from '../utils/storage';

export const useNotionConfig = () => {
  const [config, setConfig] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const loaded = loadConfig();
    if (loaded && loaded.notionToken && loaded.databaseId) {
      setConfig(loaded);
      setIsConfigured(true);
    }
  }, []);

  const updateConfig = (newConfig) => {
    const merged = { ...config, ...newConfig };
    setConfig(merged);
    saveConfig(merged);
    setIsConfigured(true);
  };

  const reset = () => {
    clearConfig();
    setConfig(null);
    setIsConfigured(false);
  };

  return {
    config,
    isConfigured,
    updateConfig,
    reset,
  };
};
```

### 4. Notion API 래퍼 (Multi-Tenant)

```javascript
// src/utils/notionApi.js

const API_BASE = '/api';

// 각 사용자의 Token을 요청에 포함
export const queryMessages = async (config, channel) => {
  const response = await fetch(`${API_BASE}/proxy-query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: config.notionToken,
      databaseId: config.databaseId,
      channel,
    }),
  });
  
  if (!response.ok) throw new Error('Failed to load messages');
  return response.json();
};

export const sendMessage = async (config, content, channel, author) => {
  const response = await fetch(`${API_BASE}/proxy-create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: config.notionToken,
      databaseId: config.databaseId,
      content,
      channel,
      author,
    }),
  });
  
  if (!response.ok) throw new Error('Failed to send message');
  return response.json();
};
```

### 5. Serverless Function (프록시)

```javascript
// api/proxy-query.js
import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, databaseId, channel } = req.body;

  // 입력 검증
  if (!token || !databaseId) {
    return res.status(400).json({ error: 'Missing token or databaseId' });
  }

  try {
    // 사용자의 Token으로 Notion 클라이언트 생성
    const notion = new Client({ auth: token });

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: channel ? {
        property: '채널',
        select: { equals: channel },
      } : undefined,
      sorts: [{ property: '작성일시', direction: 'ascending' }],
      page_size: 100,
    });

    const messages = response.results.map((page) => ({
      id: page.id,
      content: page.properties.Name?.title[0]?.text.content || '',
      author: page.properties.작성자?.rich_text[0]?.text.content || 
              page.properties.작성자?.people[0]?.name || '익명',
      channel: page.properties.채널?.select?.name || '일반',
      time: page.properties.작성일시?.created_time || page.created_time,
    }));

    res.status(200).json({ messages });
  } catch (error) {
    console.error('Notion API Error:', error);
    
    // 에러 타입별 처리
    if (error.code === 'unauthorized') {
      return res.status(401).json({ error: 'Invalid Notion token' });
    }
    if (error.code === 'object_not_found') {
      return res.status(404).json({ error: 'Database not found or not connected' });
    }
    
    res.status(500).json({ error: 'Failed to query messages' });
  }
}
```

```javascript
// api/proxy-create.js
import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, databaseId, content, channel, author } = req.body;

  if (!token || !databaseId || !content || !channel || !author) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const notion = new Client({ auth: token });

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [{ text: { content } }],
        },
        채널: {
          select: { name: channel },
        },
        작성자: {
          rich_text: [{ text: { content: author } }],
        },
      },
    });

    res.status(200).json({ success: true, pageId: response.id });
  } catch (error) {
    console.error('Notion API Error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}
```

### 6. 온보딩 페이지 (OnboardingPage.jsx)

```javascript
// src/pages/OnboardingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotionConfig } from '../hooks/useNotionConfig';
import { validateNotionToken, validateDatabaseId, extractDatabaseIdFromUrl } from '../utils/validators';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { updateConfig } = useNotionConfig();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    notionToken: '',
    databaseId: '',
    userName: '',
  });
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    if (!validateNotionToken(formData.notionToken)) {
      setErrors({ token: 'Invalid token format. Must start with secret_' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    const dbId = extractDatabaseIdFromUrl(formData.databaseId) || formData.databaseId;
    if (!validateDatabaseId(dbId)) {
      setErrors({ database: 'Invalid database ID or URL' });
      return false;
    }
    setFormData({ ...formData, databaseId: dbId });
    setErrors({});
    return true;
  };

  const handleComplete = () => {
    if (!formData.userName.trim()) {
      setErrors({ userName: 'Please enter your name' });
      return;
    }
    
    updateConfig(formData);
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= num ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}>
                {num}
              </div>
              {num < 3 && (
                <div className={`w-20 h-1 ${step > num ? 'bg-blue-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Integration Token */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Step 1: Notion Integration</h2>
            <p className="text-gray-600 mb-6">
              Notion Integration을 생성하고 Token을 복사하세요.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">📖 가이드:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>
                  <a href="https://www.notion.so/my-integrations" target="_blank" className="text-blue-600 underline">
                    https://notion.so/my-integrations
                  </a> 접속
                </li>
                <li>"+ New integration" 클릭</li>
                <li>이름: NotionChat (아무거나 가능)</li>
                <li>"Submit" 클릭</li>
                <li>"Internal Integration Token" 복사</li>
              </ol>
            </div>

            <label className="block mb-2 font-medium">Integration Token:</label>
            <input
              type="password"
              placeholder="secret_xxxxxxxxxxxxxxxx"
              className="w-full px-4 py-3 border rounded-lg mb-2"
              value={formData.notionToken}
              onChange={(e) => setFormData({ ...formData, notionToken: e.target.value })}
            />
            {errors.token && <p className="text-red-500 text-sm mb-4">{errors.token}</p>}
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm">
                ⚠️ <strong>주의:</strong> Token은 절대 다른 사람과 공유하지 마세요!
                이 Token은 오직 브라우저에만 저장되며 서버로 전송되지 않습니다.
              </p>
            </div>

            <button
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              다음 단계로 →
            </button>
          </div>
        )}

        {/* Step 2: Database */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Step 2: Database 설정</h2>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3">옵션 1: 템플릿 복사 (추천) 🎁</h3>
              <a
                href="https://notion.so/templates/notionchat-template"
                target="_blank"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 mb-4"
              >
                템플릿 복사하기
              </a>
              <p className="text-sm text-gray-600">
                템플릿을 복사하면 필요한 모든 속성이 자동으로 생성됩니다.
              </p>
            </div>

            <div className="border-t pt-6 mb-6">
              <h3 className="font-semibold mb-3">옵션 2: 직접 만들기 📝</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                <p className="mb-2">필수 속성:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Name (Title)</li>
                  <li>채널 (Select): 일반, 공지, 긴급, 질문, 개발, 디자인, 기획</li>
                  <li>작성자 (Rich Text 또는 People)</li>
                  <li>작성일시 (Created Time)</li>
                </ul>
              </div>
            </div>

            <label className="block mb-2 font-medium">Database URL 또는 ID:</label>
            <input
              type="text"
              placeholder="https://notion.so/xxx... 또는 xxx-xxx-xxx"
              className="w-full px-4 py-3 border rounded-lg mb-2"
              value={formData.databaseId}
              onChange={(e) => setFormData({ ...formData, databaseId: e.target.value })}
            />
            {errors.database && <p className="text-red-500 text-sm mb-4">{errors.database}</p>}

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm font-semibold mb-2">ℹ️ Integration 연결하기:</p>
              <p className="text-sm">
                Database 페이지에서 우측 상단 <strong>...</strong> → <strong>Connections</strong> → 
                방금 만든 Integration 선택
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 py-3 rounded-lg hover:bg-gray-300"
              >
                ← 이전
              </button>
              <button
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
              >
                다음 단계로 →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Complete */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">🎉 설정 완료!</h2>
            
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="flex items-center gap-2 mb-2">
                <span className="text-green-500">✅</span>
                Notion Integration 연결됨
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-500">✅</span>
                Database 연동됨
              </p>
            </div>

            <label className="block mb-2 font-medium">사용자 이름:</label>
            <input
              type="text"
              placeholder="홍길동"
              className="w-full px-4 py-3 border rounded-lg mb-2"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            />
            {errors.userName && <p className="text-red-500 text-sm mb-4">{errors.userName}</p>}

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="font-semibold mb-2">💡 팁:</p>
              <ul className="text-sm space-y-1">
                <li>• 설정은 언제든 변경 가능 (⚙️ 버튼)</li>
                <li>• 노션에 임베드하려면 설정에서 코드 복사</li>
                <li>• 채널은 노션 DB에서 직접 추가/수정 가능</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 py-3 rounded-lg hover:bg-gray-300"
              >
                ← 이전
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
              >
                채팅 시작하기 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 7. 메인 앱 (App.jsx) - Google Material Icons

```javascript
// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useNotionConfig } from './hooks/useNotionConfig';

import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const { isConfigured } = useNotionConfig();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route 
          path="/chat" 
          element={isConfigured ? <ChatPage /> : <Navigate to="/onboarding" />} 
        />
        <Route 
          path="/settings" 
          element={isConfigured ? <SettingsPage /> : <Navigate to="/onboarding" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 8. 채팅 페이지 (Google Material Icons)

```javascript
// src/pages/ChatPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotionConfig } from '../hooks/useNotionConfig';
import { useMessages } from '../hooks/useMessages';

// Google Material Icons (CDN 방식)
// index.html에 추가: <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

const CHANNELS = [
  { name: '일반', color: 'text-blue-500' },
  { name: '공지', color: 'text-red-500' },
  { name: '긴급', color: 'text-orange-500' },
  { name: '질문', color: 'text-yellow-500' },
  { name: '개발', color: 'text-green-500' },
  { name: '디자인', color: 'text-purple-500' },
  { name: '기획', color: 'text-pink-500' },
];

export default function ChatPage() {
  const navigate = useNavigate();
  const { config } = useNotionConfig();
  const [selectedChannel, setSelectedChannel] = useState('일반');
  const [showSidebar, setShowSidebar] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  
  const { messages, isLoading, error, send, refresh } = useMessages(
    config,
    selectedChannel,
    config?.pollingInterval || 5000
  );
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    await send(inputMessage, config.userName);
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:relative lg:translate-x-0 w-64 bg-white border-r h-full transition-transform z-20`}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">채널</h2>
        </div>
        <div className="overflow-y-auto">
          {CHANNELS.map((channel) => (
            <button
              key={channel.name}
              onClick={() => {
                setSelectedChannel(channel.name);
                setShowSidebar(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-2 ${
                selectedChannel === channel.name ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
            >
              <span className={`material-icons text-sm ${channel.color}`}>circle</span>
              {channel.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <span className="material-icons">
                {showSidebar ? 'close' : 'menu'}
              </span>
            </button>
            <h1 className="text-xl font-bold">#{selectedChannel}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              className="p-2 hover:bg-gray-100 rounded-lg"
              disabled={isLoading}
              title="새로고침"
            >
              <span className={`material-icons ${isLoading ? 'animate-spin' : ''}`}>
                refresh
              </span>
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title="설정"
            >
              <span className="material-icons">settings</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg flex items-center gap-2">
              <span className="material-icons">error</span>
              오류: {error}
            </div>
          )}
          
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="material-icons text-6xl mb-4">chat_bubble_outline</span>
              <p>아직 메시지가 없습니다</p>
              <p className="text-sm">첫 메시지를 보내보세요!</p>
            </div>
          )}
          
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {msg.author[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold">{msg.author}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.time).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className="material-icons">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 📦 Database 템플릿

### Notion Template JSON (자동 복사용)

```json
{
  "object": "database",
  "title": [
    {
      "type": "text",
      "text": {
        "content": "팀 메시지 보드"
      }
    }
  ],
  "description": [
    {
      "type": "text",
      "text": {
        "content": "NotionChat 메시지 저장소 - 팀 소통을 위한 채팅 데이터베이스"
      }
    }
  ],
  "properties": {
    "Name": {
      "type": "title",
      "title": {}
    },
    "채널": {
      "type": "select",
      "select": {
        "options": [
          {"name": "일반", "color": "blue"},
          {"name": "공지", "color": "red"},
          {"name": "긴급", "color": "orange"},
          {"name": "질문", "color": "yellow"},
          {"name": "개발", "color": "green"},
          {"name": "디자인", "color": "purple"},
          {"name": "기획", "color": "pink"}
        ]
      }
    },
    "작성자": {
      "type": "rich_text",
      "rich_text": {}
    },
    "상태": {
      "type": "select",
      "select": {
        "options": [
          {"name": "새 메시지", "color": "red"},
          {"name": "확인됨", "color": "yellow"},
          {"name": "완료", "color": "green"}
        ]
      }
    },
    "중요도": {
      "type": "checkbox",
      "checkbox": {}
    },
    "작성일시": {
      "type": "created_time",
      "created_time": {}
    }
  }
}
```

---

## 🚀 배포 전략

### Phase 1: MVP 런칭 (2주)
- ✅ 기본 기능 구현 (메시지 송수신, 채널)
- ✅ 온보딩 플로우 완성
- ✅ Vercel 무료 배포
- ✅ 랜딩 페이지 + 사용 가이드

### Phase 2: 사용자 획득 (1개월)
- 📣 ProductHunt 런칭
- 📣 Reddit (r/Notion, r/productivity) 홍보
- 📣 Medium/Tistory 블로그 포스팅
- 📊 Google Analytics 설치
- 💬 사용자 피드백 수집

### Phase 3: 기능 확장 (2개월)
- 🔔 알림 기능
- 🖼️ 이미지 첨부
- 🔍 메시지 검색
- 📱 PWA (오프라인 지원)
- 🌙 다크 모드

### Phase 4: 프리미엄 (3개월+)
- 💎 Pro 버전 (Notion OAuth 자동 연동)
- 🤖 AI 요약 기능
- 📊 통계 대시보드
- 🔒 암호화 채팅방

---

## 💰 수익화 전략 (선택)

### Freemium 모델

**Free Tier (영구 무료)**
- ✅ 기본 채팅 기능
- ✅ 5개 채널
- ✅ 무제한 메시지
- ✅ 100개 메시지 조회 제한

**Pro Tier ($5/월)**
- ✨ Notion OAuth (자동 연동)
- ✨ 무제한 채널
- ✨ 무제한 메시지 조회
- ✨ 이미지/파일 첨부
- ✨ AI 요약
- ✨ 우선 지원

### 대안: 완전 무료 + 기부
- GitHub Sponsors
- Buy Me a Coffee
- 오픈소스 유지

---

## 📊 성공 지표 (KPI)

### 초기 목표 (3개월)
- 🎯 MAU (월간 활성 사용자): 1,000명
- 🎯 설치 완료율: 50%
- 🎯 재방문율: 30%
- 🎯 평균 메시지/일: 10개

### 성장 목표 (1년)
- 🚀 MAU: 10,000명
- 🚀 Pro 전환율: 5%
- 🚀 MRR (월 반복 수익): $2,500

---

## 🛠️ 개발 시작 명령어 (Claude Code용)

```bash
# 프로젝트 생성
npm create vite@latest notionchat-saas -- --template react
cd notionchat-saas

# 의존성 설치
npm install
npm install react-router-dom
npm install @notionhq/client
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Tailwind 설정 (tailwind.config.js)
# content: ["./index.html", "./src/**/*.{js,jsx}"]

# Google Material Icons 추가 (index.html <head>)
# <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

# 개발 서버 실행
npm run dev
```

### Claude Code 프롬프트

```
다음 SaaS 서비스를 개발해주세요:

프로젝트명: NotionChat - 노션 연동 팀 채팅 SaaS

핵심 기능:
1. Multi-tenant 아키텍처 (각 사용자가 자신의 Notion 연결)
2. 3단계 온보딩 (Integration Token → Database → 완료)
3. 모바일 최적화 채팅 UI
4. 설정 페이지 (Token/DB 관리)
5. 실시간 폴링 (5초 간격)

기술 스택:
- React 18 + Vite
- React Router (페이지 라우팅)
- Tailwind CSS
- Google Material Icons (NOT Lucide)
- localStorage (사용자 설정 저장)
- Vercel Serverless Functions (Notion API 프록시)

페이지 구조:
- / : 랜딩 페이지
- /onboarding : 3단계 온보딩 (Token → DB → 완료)
- /chat : 메인 채팅 화면
- /settings : 설정 관리

보안:
- 사용자의 Notion Token은 localStorage에만 저장
- Serverless Function은 단순 프록시 역할만 (저장 안 함)
- 입력 검증 (Token 형식, Database ID 형식)

주요 컴포넌트:
- src/pages/OnboardingPage.jsx (3단계 wizard)
- src/pages/ChatPage.jsx (메인 채팅 UI)
- src/pages/SettingsPage.jsx (설정)
- src/hooks/useNotionConfig.js (설정 관리)
- src/hooks/useMessages.js (메시지 로직)
- src/utils/storage.js (localStorage)
- src/utils/validators.js (Token/ID 검증)
- api/proxy-query.js (메시지 조회)
- api/proxy-create.js (메시지 전송)

첨부된 기획서의 코드를 참고해서 완전히 동작하는 SaaS 앱을 만들어주세요.
특히 온보딩 UX가 직관적이고 친절해야 합니다.

Google Material Icons 사용:
- menu, close, send, refresh, settings, circle, chat_bubble_outline, error 등
- CDN: <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

---

## 📝 README.md 샘플

````markdown
# NotionChat 🚀

노션을 백엔드로 사용하는 팀 채팅 솔루션

## ✨ 특징

- 🆓 **완전 무료** - 서버 비용 없음
- 🔒 **안전** - 자신의 노션에만 저장
- 📱 **모바일 최적화** - 어디서나 사용
- 🎨 **커스터마이징** - 채널/속성 자유 수정
- ⚡ **빠른 설정** - 3분이면 충분

## 🚀 빠른 시작

1. https://notionchat.app 접속
2. "시작하기" 클릭
3. 가이드 따라 설정 (3분)
4. 채팅 시작!

## 📖 설정 가이드

### 1. Notion Integration 생성
[자세한 가이드 보기](docs/setup-guide.md)

### 2. Database 템플릿 복사
[템플릿 링크](https://notion.so/templates/notionchat)

### 3. 연결하고 시작!

## 🛠️ 로컬 개발

```bash
npm install
npm run dev
```

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

## 💬 문의

- GitHub Issues: [github.com/yourname/notionchat](https://github.com)
- Email: hello@notionchat.app
````

---

## 🎓 다음 단계

1. ✅ **이 기획서 검토** - 수정/추가 사항 체크
2. 🚀 **Claude Code로 개발 시작**
3. 🧪 **로컬 테스트**
4. 🌐 **Vercel 배포**
5. 📣 **런칭 및 홍보**

---

## 📞 추가 질문

이 SaaS 버전 기획서는 **실제로 서비스화 가능한 구조**입니다!

- 각 사용자가 자신의 노션 연결
- 보안 문제 해결 (Token을 서버에 저장 안 함)
- 확장 가능한 아키텍처
- 무료로 운영 가능 (Vercel 무료 티어)

추가로 궁금한 점이나 수정하고 싶은 부분이 있으면 말씀해주세요! 🙌