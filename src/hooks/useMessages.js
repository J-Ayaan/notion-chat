// src/hooks/useMessages.js
// 메시지 로드, 전송, 실시간 업데이트를 관리하는 훅

import { useState, useCallback } from 'react';
import { queryMessages, sendMessage, getErrorMessage } from '../utils/notionApi';
import { usePolling } from './usePolling';

/**
 * 메시지 관리 훅
 * @param {Object} config - 사용자 설정
 * @param {string} channel - 현재 채널
 * @param {number} pollingInterval - 폴링 주기 (밀리초)
 * @returns {Object} 메시지 관련 상태 및 함수들
 */
export const useMessages = (config, channel = '일반', pollingInterval = 5000) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  /**
   * 메시지 로드
   */
  const loadMessages = useCallback(async () => {
    if (!config || !config.notionToken || !config.databaseId) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const fetchedMessages = await queryMessages(config, channel);
      setMessages(fetchedMessages);
    } catch (err) {
      console.error('Failed to load messages:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [config, channel]);

  /**
   * 메시지 전송
   * @param {string} content - 메시지 내용
   * @param {string} author - 작성자명 (기본값: config.userName)
   */
  const send = useCallback(
    async (content, author = null) => {
      if (!config || !config.notionToken || !config.databaseId) {
        setError('설정이 완료되지 않았습니다.');
        return false;
      }

      if (!content || !content.trim()) {
        setError('메시지 내용을 입력해주세요.');
        return false;
      }

      try {
        setIsSending(true);
        setError(null);

        const authorName = author || config.userName || '익명';

        await sendMessage(config, content, channel, authorName);

        // 메시지 전송 후 즉시 새로고침
        await loadMessages();

        return true;
      } catch (err) {
        console.error('Failed to send message:', err);
        setError(getErrorMessage(err));
        return false;
      } finally {
        setIsSending(false);
      }
    },
    [config, channel, loadMessages]
  );

  /**
   * 수동 새로고침
   */
  const refresh = useCallback(() => {
    loadMessages();
  }, [loadMessages]);

  /**
   * 에러 초기화
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 실시간 폴링 설정
  usePolling(
    loadMessages,
    pollingInterval,
    !!(config && config.notionToken && config.databaseId)
  );

  return {
    messages,
    isLoading,
    error,
    isSending,
    send,
    refresh,
    clearError,
  };
};
