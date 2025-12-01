// src/utils/notionApi.js
// Notion API 호출을 위한 래퍼 함수들
// 실제 API 호출은 Vercel Serverless Functions를 통해 프록시됨

const API_BASE = '/api';

/**
 * 메시지 조회 (특정 채널 또는 전체)
 * @param {Object} config - 사용자 설정 (token, databaseId 포함)
 * @param {string} channel - 조회할 채널명 (null이면 전체)
 * @returns {Promise<Array>} 메시지 배열
 */
export const queryMessages = async (config, channel = null) => {
  try {
    const response = await fetch(`${API_BASE}/proxy-query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: config.notionToken,
        databaseId: config.databaseId,
        channel,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to load messages');
    }

    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    console.error('Query messages error:', error);
    throw error;
  }
};

/**
 * 새 메시지 전송
 * @param {Object} config - 사용자 설정
 * @param {string} content - 메시지 내용
 * @param {string} channel - 채널명
 * @param {string} author - 작성자명
 * @returns {Promise<Object>} 생성된 메시지 정보
 */
export const sendMessage = async (config, content, channel, author) => {
  try {
    if (!content || !content.trim()) {
      throw new Error('Message content is required');
    }

    const response = await fetch(`${API_BASE}/proxy-create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: config.notionToken,
        databaseId: config.databaseId,
        content: content.trim(),
        channel,
        author,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send message');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Send message error:', error);
    throw error;
  }
};

/**
 * 연결 테스트 (Token 및 Database 유효성 확인)
 * @param {string} token - Notion Integration Token
 * @param {string} databaseId - Database ID
 * @returns {Promise<boolean>} 연결 성공 여부
 */
export const testConnection = async (token, databaseId) => {
  try {
    const response = await fetch(`${API_BASE}/test-connection`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, databaseId }),
    });

    return response.ok;
  } catch (error) {
    console.error('Connection test error:', error);
    return false;
  }
};

/**
 * 채널 목록 조회 (Database의 Select 옵션에서 가져옴)
 * @param {Object} config - 사용자 설정
 * @returns {Promise<Array>} 채널 목록
 */
export const getChannels = async (config) => {
  try {
    const response = await fetch(`${API_BASE}/get-channels`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: config.notionToken,
        databaseId: config.databaseId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get channels');
    }

    const data = await response.json();
    return data.channels || [];
  } catch (error) {
    console.error('Get channels error:', error);
    // 에러 시 기본 채널 반환
    return ['일반', '공지', '긴급', '질문', '개발', '디자인', '기획'];
  }
};

/**
 * API 에러 메시지를 사용자 친화적으로 변환
 * @param {Error} error - API 에러 객체
 * @returns {string} 사용자 친화적 에러 메시지
 */
export const getErrorMessage = (error) => {
  const message = error.message || 'Unknown error';

  if (message.includes('unauthorized') || message.includes('Invalid token')) {
    return 'Notion Token이 유효하지 않습니다. 설정을 확인해주세요.';
  }

  if (message.includes('not_found') || message.includes('Database not found')) {
    return 'Database를 찾을 수 없습니다. Integration이 연결되어 있는지 확인해주세요.';
  }

  if (message.includes('rate_limited')) {
    return 'API 호출 한도를 초과했습니다. 잠시 후 다시 시도해주세요.';
  }

  if (message.includes('Network') || message.includes('fetch')) {
    return '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
  }

  return `오류: ${message}`;
};
