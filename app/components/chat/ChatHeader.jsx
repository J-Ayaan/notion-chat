'use client';

// src/components/chat/ChatHeader.jsx
import React from 'react';
import { useRouter } from 'next/navigation';

export default function ChatHeader({
  selectedChannel,
  showSidebar,
  toggleSidebar,
  onRefresh,
  isLoading,
}) {
  const router = useRouter();

  return (
    <div className="bg-white border-b p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className="material-icons">
            {showSidebar ? 'close' : 'menu'}
          </span>
        </button>
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="material-icons text-blue-500">tag</span>
          {selectedChannel}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          title="새로고침"
          aria-label="Refresh messages"
        >
          <span
            className={`material-icons ${isLoading ? 'animate-spin' : ''}`}
          >
            refresh
          </span>
        </button>
        <button
          onClick={() => router.push('/settings')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="설정"
          aria-label="Settings"
        >
          <span className="material-icons">settings</span>
        </button>
      </div>
    </div>
  );
}
