'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getRoom, setCurrentRoom, getCurrentRoom } from '../utils/storage';
import { useNotionConfig } from '../hooks/useNotionConfig';
import { useMessages } from '../hooks/useMessages';
import ChatHeader from '../components/chat/ChatHeader';
import ChannelSidebar from '../components/chat/ChannelSidebar';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomIdFromUrl = searchParams.get('room');

  const [room, setRoom] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState('일반');
  const [showSidebar, setShowSidebar] = useState(false);

  // 채팅방 로드
  useEffect(() => {
    const loadRoom = () => {
      // URL에서 roomId 가져오기 또는 현재 선택된 roomId 사용
      const roomId = roomIdFromUrl || getCurrentRoom();

      if (!roomId) {
        // 채팅방이 없으면 rooms 페이지로 이동
        router.push('/rooms');
        return;
      }

      const loadedRoom = getRoom(roomId);

      if (!loadedRoom) {
        // 유효하지 않은 채팅방이면 rooms 페이지로 이동
        router.push('/rooms');
        return;
      }

      // 현재 채팅방 설정 (lastAccessed 업데이트)
      setCurrentRoom(roomId);
      setRoom(loadedRoom);

      // 첫 번째 채널을 기본 선택
      if (loadedRoom.channels && loadedRoom.channels.length > 0) {
        setSelectedChannel(loadedRoom.channels[0]);
      }
    };

    loadRoom();
  }, [roomIdFromUrl, router]);

  // config 생성 (기존 hooks와 호환성 유지)
  const config = room ? {
    notionToken: room.token,
    databaseId: room.databaseId,
    userName: room.myName,
    pollingInterval: 5000,
    autoScroll: true,
  } : null;

  const { messages, isLoading, error, isSending, send, refresh, clearError } =
    useMessages(config, selectedChannel, config?.pollingInterval || 5000);

  const messagesEndRef = useRef(null);

  // 자동 스크롤
  useEffect(() => {
    if (config?.autoScroll !== false) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, config?.autoScroll]);

  // 채널 선택
  const handleChannelSelect = (channel: string) => {
    setSelectedChannel(channel);
    setShowSidebar(false);
  };

  // 사이드바 토글
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // 메시지 전송
  const handleSendMessage = async (content: string) => {
    return await send(content, config?.userName);
  };

  // 채팅방이 로드되지 않았으면 로딩 표시
  if (!room) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <span className="material-icons text-6xl text-blue-500 animate-spin mb-4">
            refresh
          </span>
          <p className="text-gray-600">채팅방을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <ChannelSidebar
        selectedChannel={selectedChannel}
        onChannelSelect={handleChannelSelect}
        showSidebar={showSidebar}
        channels={room.channels}
        roomName={room.name}
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
