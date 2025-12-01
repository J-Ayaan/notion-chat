// src/pages/ChatPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNotionConfig } from '../hooks/useNotionConfig';
import { useMessages } from '../hooks/useMessages';
import ChatHeader from '../components/chat/ChatHeader';
import ChannelSidebar from '../components/chat/ChannelSidebar';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';

export default function ChatPage() {
  const { config } = useNotionConfig();
  const [selectedChannel, setSelectedChannel] = useState('일반');
  const [showSidebar, setShowSidebar] = useState(false);

  const { messages, isLoading, error, isSending, send, refresh, clearError } =
    useMessages(config, selectedChannel, config?.pollingInterval || 5000);

  const messagesEndRef = useRef(null);

  // 자동 스크롤
  const scrollToBottom = () => {
    if (config?.autoScroll !== false) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 채널 선택
  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setShowSidebar(false);
  };

  // 사이드바 토글
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // 메시지 전송
  const handleSendMessage = async (content) => {
    return await send(content, config?.userName);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <ChannelSidebar
        selectedChannel={selectedChannel}
        onChannelSelect={handleChannelSelect}
        showSidebar={showSidebar}
      />

      {/* Overlay for mobile */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <ChatHeader
          selectedChannel={selectedChannel}
          showSidebar={showSidebar}
          toggleSidebar={toggleSidebar}
          onRefresh={refresh}
          isLoading={isLoading}
        />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-start gap-3 mb-4">
              <span className="material-icons">error</span>
              <div className="flex-1">
                <p className="font-semibold mb-1">오류가 발생했습니다</p>
                <p className="text-sm">{error}</p>
              </div>
              <button
                onClick={clearError}
                className="material-icons text-red-700 hover:text-red-900"
              >
                close
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="material-icons text-6xl mb-4 animate-spin">
                refresh
              </span>
              <p>메시지를 불러오는 중...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && messages.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="material-icons text-6xl mb-4">
                chat_bubble_outline
              </span>
              <p className="text-lg font-medium mb-2">
                아직 메시지가 없습니다
              </p>
              <p className="text-sm">첫 메시지를 보내보세요!</p>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput onSend={handleSendMessage} isSending={isSending} />
      </div>
    </div>
  );
}
