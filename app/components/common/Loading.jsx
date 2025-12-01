'use client';

// src/components/common/Loading.jsx
import React from 'react';

/**
 * 로딩 스피너 컴포넌트
 * @param {string} size - 크기 (sm, md, lg, xl)
 * @param {string} message - 로딩 메시지
 * @param {boolean} fullScreen - 전체 화면 표시 여부
 */
export default function Loading({
  size = 'md',
  message,
  fullScreen = false,
}) {
  // 크기별 스타일
  const sizeStyles = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl',
  };

  const loadingContent = (
    <div className="flex flex-col items-center justify-center gap-4">
      <span
        className={`material-icons ${sizeStyles[size]} text-blue-600 animate-spin`}
      >
        refresh
      </span>
      {message && <p className="text-gray-600 text-center">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        {loadingContent}
      </div>
    );
  }

  return loadingContent;
}

/**
 * 스켈레톤 로더 컴포넌트
 */
export function Skeleton({ width = '100%', height = '20px', className = '' }) {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded ${className}`}
      style={{ width, height }}
    />
  );
}

/**
 * 메시지 스켈레톤 컴포넌트
 */
export function MessageSkeleton() {
  return (
    <div className="flex gap-3 p-3">
      <Skeleton width="40px" height="40px" className="rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton width="100px" height="16px" />
          <Skeleton width="60px" height="12px" />
        </div>
        <Skeleton width="70%" height="16px" />
      </div>
    </div>
  );
}
