// src/utils/validators.js
// Notion Token 및 Database ID 검증 로직

/**
 * Notion Integration Token 형식 검증
 * @param {string} token - 검증할 토큰
 * @returns {boolean} 유효성 여부
 */
export const validateNotionToken = (token) => {
  if (!token || typeof token !== 'string') {
    return false;
  }

  // Notion Token 형식: secret_으로 시작하는 50자 문자열
  const regex = /^secret_[a-zA-Z0-9]{43}$/;
  return regex.test(token.trim());
};

/**
 * Database ID 형식 검증 (UUID 형식)
 * @param {string} id - 검증할 Database ID
 * @returns {boolean} 유효성 여부
 */
export const validateDatabaseId = (id) => {
  if (!id || typeof id !== 'string') {
    return false;
  }

  // UUID 형식 (하이픈 있거나 없거나)
  const regex = /^[a-f0-9]{32}$|^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
  const cleanId = id.trim().replace(/-/g, '');
  return regex.test(cleanId);
};

/**
 * URL에서 Database ID 추출
 * @param {string} url - Notion Database URL
 * @returns {string|null} 추출된 Database ID 또는 null
 */
export const extractDatabaseIdFromUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    // URL에서 Database ID 추출
    // 예시: https://notion.so/xxx/abc123def456?v=yyy → abc123def456
    const match = url.match(/([a-f0-9]{32})|([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i);
    return match ? match[0].replace(/-/g, '') : null;
  } catch (error) {
    console.error('Failed to extract database ID from URL:', error);
    return null;
  }
};

/**
 * Notion 연결 테스트
 * @param {string} token - Notion Integration Token
 * @param {string} databaseId - Database ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const testNotionConnection = async (token, databaseId) => {
  try {
    // Token과 Database ID 형식 먼저 검증
    if (!validateNotionToken(token)) {
      return { success: false, error: 'Invalid token format' };
    }

    if (!validateDatabaseId(databaseId)) {
      return { success: false, error: 'Invalid database ID format' };
    }

    // API 호출해서 실제 연결 테스트
    const response = await fetch('/api/test-connection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, databaseId }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, error: data.error || 'Connection failed' };
    }
  } catch (error) {
    console.error('Connection test failed:', error);
    return { success: false, error: error.message || 'Network error' };
  }
};

/**
 * 사용자 이름 검증
 * @param {string} userName - 검증할 사용자 이름
 * @returns {boolean} 유효성 여부
 */
export const validateUserName = (userName) => {
  if (!userName || typeof userName !== 'string') {
    return false;
  }

  const trimmed = userName.trim();
  return trimmed.length >= 1 && trimmed.length <= 50;
};

/**
 * 폴링 주기 검증
 * @param {number} interval - 검증할 폴링 주기 (밀리초)
 * @returns {boolean} 유효성 여부
 */
export const validatePollingInterval = (interval) => {
  if (typeof interval !== 'number') {
    return false;
  }

  // 최소 3초, 최대 60초
  return interval >= 3000 && interval <= 60000;
};
