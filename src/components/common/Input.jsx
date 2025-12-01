// src/components/common/Input.jsx
import React from 'react';

/**
 * 재사용 가능한 입력 필드 컴포넌트
 * @param {string} label - 라벨 텍스트
 * @param {string} error - 에러 메시지
 * @param {string} helperText - 도움말 텍스트
 * @param {string} icon - Material Icons 이름
 */
export default function Input({
  label,
  error,
  helperText,
  icon,
  fullWidth = true,
  className = '',
  ...props
}) {
  const hasError = !!error;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {/* Label */}
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <span className="material-icons text-xl">{icon}</span>
          </div>
        )}

        <input
          className={`
            w-full px-4 py-2.5 border rounded-lg
            ${icon ? 'pl-11' : ''}
            ${
              hasError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }
            focus:outline-none focus:ring-2
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-colors
          `}
          {...props}
        />
      </div>

      {/* Error Message */}
      {hasError && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <span className="material-icons text-sm">error</span>
          {error}
        </p>
      )}

      {/* Helper Text */}
      {helperText && !hasError && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
