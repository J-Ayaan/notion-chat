'use client';

// src/hooks/usePolling.js
// 일정 주기로 함수를 실행하는 폴링 훅

import { useEffect, useRef } from 'react';

/**
 * 폴링 훅
 * @param {Function} callback - 주기적으로 실행할 함수
 * @param {number} interval - 폴링 주기 (밀리초)
 * @param {boolean} enabled - 폴링 활성화 여부
 */
export const usePolling = (callback, interval = 5000, enabled = true) => {
  const savedCallback = useRef();
  const intervalRef = useRef();

  // callback이 변경될 때마다 최신 callback 저장
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 폴링 시작/중지
  useEffect(() => {
    if (!enabled || !interval) {
      return;
    }

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    // 즉시 한 번 실행
    tick();

    // 주기적으로 실행
    intervalRef.current = setInterval(tick, interval);

    // 클린업
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [interval, enabled]);

  // 수동으로 폴링 중지하는 함수
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 수동으로 폴링 재시작하는 함수
  const restart = () => {
    stop();
    if (enabled && interval) {
      intervalRef.current = setInterval(() => {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }, interval);
    }
  };

  return { stop, restart };
};
