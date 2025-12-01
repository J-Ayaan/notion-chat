// app/utils/room.js
// 채팅방(Room) 관리 유틸리티

/**
 * Token과 Database ID로 Room ID 생성
 * @param {string} token - Notion Integration Token
 * @param {string} databaseId - Notion Database ID
 * @returns {string} Room ID (12자)
 */
export function generateRoomId(token, databaseId) {
  const combined = `${token}:${databaseId}`;
  // Base64 인코딩 후 앞 12자만 사용
  const encoded = btoa(combined);
  return encoded.substring(0, 12).replace(/[+/=]/g, '').toLowerCase();
}

/**
 * Room ID 검증
 * @param {string} roomId - Room ID
 * @returns {boolean}
 */
export function validateRoomId(roomId) {
  return typeof roomId === 'string' && roomId.length === 12;
}

/**
 * 초대 링크 생성
 * @param {string} roomId - Room ID
 * @returns {string} 초대 링크
 */
export function generateInviteLink(roomId) {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}/join?room=${roomId}`;
}

/**
 * URL에서 Room ID 추출
 * @param {string} url - URL 또는 query string
 * @returns {string|null} Room ID
 */
export function extractRoomIdFromUrl(url) {
  try {
    const params = new URLSearchParams(url.includes('?') ? url.split('?')[1] : url);
    return params.get('room');
  } catch {
    return null;
  }
}

/**
 * 기본 채널 목록
 */
export const DEFAULT_CHANNELS = [
  '일반',
  '공지',
  '긴급',
  '질문',
  '개발',
  '디자인',
  '기획',
];
