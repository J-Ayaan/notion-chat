'use client';

// src/hooks/useNotionConfig.js
// 사용자 설정 관리를 위한 커스텀 훅

import { useState, useEffect } from 'react';
import { loadConfig, saveConfig, clearConfig } from '../utils/storage';

/**
 * Notion 설정 관리 훅
 * @returns {Object} 설정 관련 상태 및 함수들
 */
export const useNotionConfig = () => {
  const [config, setConfig] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트 마운트 시 localStorage에서 설정 불러오기
  useEffect(() => {
    const loaded = loadConfig();

    if (loaded && loaded.notionToken && loaded.databaseId) {
      setConfig(loaded);
      setIsConfigured(true);
    }

    setIsLoading(false);
  }, []);

  /**
   * 설정 업데이트 (부분 업데이트 지원)
   * @param {Object} newConfig - 업데이트할 설정 객체
   */
  const updateConfig = (newConfig) => {
    const merged = { ...config, ...newConfig };
    setConfig(merged);
    saveConfig(merged);

    // Token과 Database ID가 있으면 설정 완료로 간주
    if (merged.notionToken && merged.databaseId) {
      setIsConfigured(true);
    }
  };

  /**
   * 설정 초기화 (모든 설정 삭제)
   */
  const reset = () => {
    clearConfig();
    setConfig(null);
    setIsConfigured(false);
  };

  /**
   * 특정 필드만 업데이트
   * @param {string} key - 업데이트할 키
   * @param {*} value - 새로운 값
   */
  const updateField = (key, value) => {
    updateConfig({ [key]: value });
  };

  /**
   * 현재 설정이 유효한지 확인
   * @returns {boolean} 유효성 여부
   */
  const isValid = () => {
    return !!(config?.notionToken && config?.databaseId && config?.userName);
  };

  return {
    config,
    isConfigured,
    isLoading,
    updateConfig,
    updateField,
    reset,
    isValid,
  };
};
