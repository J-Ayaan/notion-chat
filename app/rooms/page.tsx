'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRooms, setCurrentRoom, deleteRoom, migrateOldConfig } from '../utils/storage';

export default function RoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    // 구버전 설정 마이그레이션
    migrateOldConfig();

    // 채팅방 목록 로드
    const loadedRooms = getRooms();
    setRooms(loadedRooms);

    // 채팅방이 없으면 온보딩으로
    if (Object.keys(loadedRooms).length === 0) {
      router.push('/onboarding');
    }
  }, [router]);

  const handleSelectRoom = (roomId) => {
    setCurrentRoom(roomId);
    router.push(`/chat?room=${roomId}`);
  };

  const handleAddRoom = () => {
    router.push('/onboarding');
  };

  const handleDeleteRoom = (roomId) => {
    deleteRoom(roomId);
    const updatedRooms = getRooms();
    setRooms(updatedRooms);
    setShowDeleteConfirm(null);

    // 모든 채팅방이 삭제되면 온보딩으로
    if (Object.keys(updatedRooms).length === 0) {
      router.push('/onboarding');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  };

  const roomList = Object.values(rooms).sort(
    (a: any, b: any) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-icons text-3xl text-blue-600">forum</span>
              <h1 className="text-2xl font-bold text-gray-800">내 채팅방</h1>
            </div>
            <button
              onClick={handleAddRoom}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span className="material-icons">add</span>
              새 채팅방
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {roomList.length === 0 ? (
          <div className="text-center py-16">
            <span className="material-icons text-6xl text-gray-300 mb-4">chat_bubble_outline</span>
            <p className="text-gray-500 text-lg mb-6">아직 채팅방이 없습니다</p>
            <button
              onClick={handleAddRoom}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              첫 채팅방 만들기
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {roomList.map((room: any) => (
              <div
                key={room.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer relative group"
                onClick={() => handleSelectRoom(room.id)}
              >
                {/* 삭제 버튼 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteConfirm(room.id);
                  }}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="채팅방 나가기"
                >
                  <span className="material-icons text-xl">delete</span>
                </button>

                {/* 채팅방 정보 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="material-icons text-white text-2xl">forum</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-800 truncate mb-1">
                      {room.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {room.myName} · {room.channels.length}개 채널
                    </p>
                    <p className="text-xs text-gray-400">
                      마지막 접속: {formatDate(room.lastAccessed)}
                    </p>
                  </div>
                </div>

                {/* 채널 미리보기 */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {room.channels.slice(0, 5).map((channel, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      #{channel}
                    </span>
                  ))}
                  {room.channels.length > 5 && (
                    <span className="px-2 py-1 text-gray-400 text-xs">
                      +{room.channels.length - 5}
                    </span>
                  )}
                </div>

                {/* 삭제 확인 다이얼로그 */}
                {showDeleteConfirm === room.id && (
                  <div
                    className="absolute inset-0 bg-white rounded-lg flex flex-col items-center justify-center p-6 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="material-icons text-red-500 text-4xl mb-4">warning</span>
                    <p className="text-center text-gray-700 mb-4">
                      정말 이 채팅방에서 나가시겠습니까?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRoom(room.id);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        나가기
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(null);
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Info Card */}
        {roomList.length > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="material-icons text-blue-600">info</span>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1">채팅방 정보</h4>
                <p className="text-sm text-blue-700">
                  채팅방을 클릭하면 입장합니다. 같은 Token과 Database ID를 사용하는 채팅방은 자동으로 합쳐집니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
