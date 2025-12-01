// src/components/common/Button.jsx
import React from 'react';

/**
 * 재사용 가능한 버튼 컴포넌트
 * @param {string} variant - 버튼 스타일 (primary, secondary, danger)
 * @param {string} size - 버튼 크기 (sm, md, lg)
 * @param {string} icon - Material Icons 이름
 * @param {boolean} loading - 로딩 상태
 * @param {boolean} fullWidth - 전체 너비 사용 여부
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  // 변형별 스타일
  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 shadow-sm',
    secondary:
      'bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100',
    danger:
      'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300 shadow-sm',
    outline:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-gray-300 disabled:text-gray-300',
  };

  // 크기별 스타일
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // 전체 너비 스타일
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${widthStyle}
        rounded-lg font-medium transition-colors
        disabled:cursor-not-allowed disabled:opacity-60
        flex items-center justify-center gap-2
        ${className}
      `}
      {...props}
    >
      {loading && (
        <span className="material-icons animate-spin">refresh</span>
      )}
      {icon && !loading && <span className="material-icons">{icon}</span>}
      {children}
    </button>
  );
}
