// src/utils/storage.js
// localStorage를 사용한 사용자 설정 관리

const STORAGE_KEY = 'notionchat_config';

/**
 * 설정을 localStorage에 저장
 * @param {Object} config - 저장할 설정 객체
 * @returns {boolean} 저장 성공 여부
 */
export const saveConfig = (config) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Failed to save config:', error);
    return false;
  }
};

/**
 * localStorage에서 설정 불러오기
 * @returns {Object|null} 저장된 설정 객체 또는 null
 */
export const loadConfig = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load config:', error);
    return null;
  }
};

/**
 * localStorage에서 설정 삭제
 */
export const clearConfig = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear config:', error);
    return false;
  }
};

/**
 * 설정의 일부만 업데이트
 * @param {Object} updates - 업데이트할 키-값 쌍
 * @returns {boolean} 업데이트 성공 여부
 */
export const updateConfig = (updates) => {
  try {
    const currentConfig = loadConfig() || {};
    const newConfig = { ...currentConfig, ...updates };
    return saveConfig(newConfig);
  } catch (error) {
    console.error('Failed to update config:', error);
    return false;
  }
};

// Config 구조 예시:
// {
//   notionToken: "secret_xxx",
//   databaseId: "xxx-xxx-xxx",
//   userName: "홍길동",
//   pollingInterval: 5000,
//   theme: "light",
//   autoScroll: true,
//   soundEnabled: false
// }
