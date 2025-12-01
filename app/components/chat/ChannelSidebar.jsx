'use client';

// src/components/chat/ChannelSidebar.jsx
import React from 'react';

const CHANNELS = [
  { name: '일반', color: 'text-blue-500', icon: 'chat' },
  { name: '공지', color: 'text-red-500', icon: 'campaign' },
  { name: '긴급', color: 'text-orange-500', icon: 'warning' },
  { name: '질문', color: 'text-yellow-500', icon: 'help' },
  { name: '개발', color: 'text-green-500', icon: 'code' },
  { name: '디자인', color: 'text-purple-500', icon: 'palette' },
  { name: '기획', color: 'text-pink-500', icon: 'lightbulb' },
];

export default function ChannelSidebar({
  selectedChannel,
  onChannelSelect,
  showSidebar,
}) {
  return (
    <div
      className={`${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      } fixed lg:relative lg:translate-x-0 w-64 bg-white border-r h-full transition-transform z-20 shadow-lg lg:shadow-none`}
    >
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-indigo-600">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="material-icons">forum</span>
          NotionChat
        </h2>
        <p className="text-xs text-blue-100 mt-1">노션 기반 팀 채팅</p>
      </div>

      {/* Channels */}
      <div className="overflow-y-auto h-[calc(100%-80px)]">
        <div className="p-3">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">
            채널
          </p>
          {CHANNELS.map((channel) => (
            <button
              key={channel.name}
              onClick={() => onChannelSelect(channel.name)}
              className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 mb-1 ${
                selectedChannel === channel.name
                  ? 'bg-blue-50 border-l-4 border-blue-500'
                  : ''
              }`}
            >
              <span className={`material-icons text-sm ${channel.color}`}>
                {channel.icon}
              </span>
              <span
                className={`${
                  selectedChannel === channel.name
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                {channel.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
