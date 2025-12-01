'use client';

// src/components/chat/ChatInput.jsx
import React, { useState } from 'react';

export default function ChatInput({ onSend, isSending }) {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || isSending) {
      return;
    }

    const success = await onSend(message);

    if (success) {
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    // Enter 키로 전송 (Shift+Enter는 줄바꿈)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white border-t p-4 shadow-lg">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요... (Enter로 전송)"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={!message.trim() || isSending}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-sm"
        >
          {isSending ? (
            <>
              <span className="material-icons animate-spin">refresh</span>
              전송 중...
            </>
          ) : (
            <>
              <span className="material-icons">send</span>
              전송
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-2">
        <span className="material-icons text-xs">info</span> Shift+Enter로
        줄바꿈, Enter로 전송
      </p>
    </div>
  );
}
