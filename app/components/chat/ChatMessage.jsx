'use client';

// src/components/chat/ChatMessage.jsx
import React from 'react';

export default function ChatMessage({ message }) {
  // 시간 포맷팅
  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return '';
    }
  };

  // 날짜 포맷팅
  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
        return '오늘';
      } else if (date.toDateString() === yesterday.toDateString()) {
        return '어제';
      } else {
        return date.toLocaleDateString('ko-KR', {
          month: 'long',
          day: 'numeric',
        });
      }
    } catch (error) {
      return '';
    }
  };

  // 작성자 첫 글자 (아바타)
  const getInitial = (name) => {
    return name ? name[0].toUpperCase() : '?';
  };

  // 아바타 배경색 (작성자 이름 기반)
  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500',
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  return (
    <div className="flex gap-3 hover:bg-gray-50 p-3 rounded-lg transition-colors">
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full ${getAvatarColor(
          message.author
        )} flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm`}
      >
        {getInitial(message.author)}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-bold text-gray-800">{message.author}</span>
          <span className="text-xs text-gray-500">
            {formatDate(message.time)} {formatTime(message.time)}
          </span>
        </div>
        <div className="text-gray-700 whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
    </div>
  );
}
