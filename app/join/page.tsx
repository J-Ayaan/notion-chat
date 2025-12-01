'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getRoom, createRoom, getRooms, setCurrentRoom } from '../utils/storage';
import {
  validateNotionToken,
  validateDatabaseId,
  extractDatabaseIdFromUrl,
} from '../utils/validators';
import { generateRoomId } from '../utils/room';

export default function JoinPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomIdFromUrl = searchParams.get('room');

  const [status, setStatus] = useState('checking'); // checking, exists, needsAuth, invalid, error
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const [notionToken, setNotionToken] = useState('');
  const [databaseId, setDatabaseId] = useState('');
  const [errors, setErrors] = useState<any>({});

  // Check if room exists on mount
  useEffect(() => {
    if (!roomIdFromUrl) {
      setStatus('invalid');
      return;
    }

    // Check if user already has this room
    const existingRoom = getRoom(roomIdFromUrl);

    if (existingRoom) {
      // User already has access to this room
      setStatus('exists');
      setTimeout(() => {
        setCurrentRoom(roomIdFromUrl);
        router.push(`/chat?room=${roomIdFromUrl}`);
      }, 2000);
    } else {
      // User needs to authenticate
      setStatus('needsAuth');
    }
  }, [roomIdFromUrl, router]);

  // Handle join
  const handleJoin = () => {
    const newErrors: any = {};

    // Validate inputs
    if (!roomName.trim()) {
      newErrors.roomName = '채팅방 이름을 입력해주세요.';
    }

    if (!userName.trim()) {
      newErrors.userName = '사용자 이름을 입력해주세요.';
    }

    if (!validateNotionToken(notionToken)) {
      newErrors.notionToken = 'Token 형식이 올바르지 않습니다.';
    }

    const extractedDbId = extractDatabaseIdFromUrl(databaseId) || databaseId;
    if (!validateDatabaseId(extractedDbId)) {
      newErrors.databaseId = 'Database ID 형식이 올바르지 않습니다.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate room ID from credentials
    const generatedRoomId = generateRoomId(notionToken, extractedDbId);

    // Check if generated room ID matches the invite link
    if (generatedRoomId !== roomIdFromUrl) {
      setErrors({
        general:
          '입력한 Token과 Database ID가 이 채팅방과 일치하지 않습니다. 채팅방 관리자에게 올바른 정보를 확인하세요.',
      });
      return;
    }

    // Create room and join
    try {
      const newRoomId = createRoom({
        token: notionToken,
        databaseId: extractedDbId,
        roomName: roomName.trim(),
        userName: userName.trim(),
      });

      if (!newRoomId) {
        setErrors({ general: '채팅방 생성에 실패했습니다.' });
        return;
      }

      // Navigate to chat
      router.push(`/chat?room=${newRoomId}`);
    } catch (error) {
      setErrors({ general: '오류가 발생했습니다. 다시 시도해주세요.' });
    }
  };

  // Render based on status
  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <span className="material-icons text-6xl text-blue-500 animate-spin mb-4">
            refresh
          </span>
          <p className="text-gray-600 text-lg">초대 링크를 확인하는 중...</p>
        </div>
      </div>
    );
  }

  if (status === 'invalid') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <span className="material-icons text-6xl text-red-500 mb-4">error</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">유효하지 않은 초대 링크</h2>
          <p className="text-gray-600 mb-6">
            올바른 초대 링크가 아닙니다. 링크를 다시 확인해주세요.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            홈으로 이동
          </button>
        </div>
      </div>
    );
  }

  if (status === 'exists') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <span className="material-icons text-6xl text-green-500 mb-4 animate-bounce">
            check_circle
          </span>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">이미 참여 중입니다</h2>
          <p className="text-gray-600 mb-6">
            이미 이 채팅방에 참여하고 있습니다. 잠시 후 채팅방으로 이동합니다...
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-500">
            <span className="material-icons animate-spin">refresh</span>
            <span>이동 중...</span>
          </div>
        </div>
      </div>
    );
  }

  // needsAuth status
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="material-icons text-6xl text-blue-500 mb-4">group_add</span>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">채팅방 초대</h2>
          <p className="text-gray-600">
            아래 정보를 입력하여 채팅방에 참여하세요
          </p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 flex items-start gap-3">
            <span className="material-icons">error</span>
            <p>{errors.general}</p>
          </div>
        )}

        {/* Form */}
        <div className="space-y-6">
          {/* Room Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              채팅방 이름
            </label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="팀 A 채팅방"
            />
            {errors.roomName && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="material-icons text-sm">error</span>
                {errors.roomName}
              </p>
            )}
          </div>

          {/* User Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              사용자 이름
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="홍길동"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="material-icons text-sm">error</span>
                {errors.userName}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="material-icons text-purple-600">vpn_key</span>
              인증 정보
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              채팅방에 접근하려면 Notion Integration Token과 Database ID가 필요합니다.
              채팅방 관리자에게 요청하세요.
            </p>
          </div>

          {/* Notion Token */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Notion Integration Token
            </label>
            <input
              type="password"
              value={notionToken}
              onChange={(e) => setNotionToken(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="secret_xxxxxxxxxxxxxxxx"
            />
            {errors.notionToken && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="material-icons text-sm">error</span>
                {errors.notionToken}
              </p>
            )}
          </div>

          {/* Database ID */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Database ID
            </label>
            <input
              type="text"
              value={databaseId}
              onChange={(e) => setDatabaseId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            />
            {errors.databaseId && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="material-icons text-sm">error</span>
                {errors.databaseId}
              </p>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="material-icons text-blue-600">info</span>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1">보안 안내</h4>
                <p className="text-sm text-blue-700">
                  입력한 Token과 Database ID는 오직 브라우저의 로컬 저장소에만 저장되며,
                  외부 서버로 전송되지 않습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => router.push('/')}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              취소
            </button>
            <button
              onClick={handleJoin}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <span className="material-icons">login</span>
              참여하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
