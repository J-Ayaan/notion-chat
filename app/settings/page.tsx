'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  getRoom,
  getCurrentRoom,
  saveRoom,
  deleteRoom,
  addChannel,
  renameChannel,
  deleteChannel,
  getUserProfile,
  saveUserProfile,
  getSettings,
  saveSettings,
} from '../utils/storage';
import { generateInviteLink } from '../utils/room';

export default function SettingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomIdFromUrl = searchParams.get('room');

  const [room, setRoom] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [saved, setSaved] = useState(false);

  // Channel management states
  const [newChannelName, setNewChannelName] = useState('');
  const [editingChannel, setEditingChannel] = useState(null);
  const [editChannelName, setEditChannelName] = useState('');

  // Profile states
  const [profileName, setProfileName] = useState('');
  const [profileAvatar, setProfileAvatar] = useState('');
  const [profileStatus, setProfileStatus] = useState('');
  const [profileStatusMessage, setProfileStatusMessage] = useState('');

  // Room states
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  // Load room and user data
  useEffect(() => {
    const roomId = roomIdFromUrl || getCurrentRoom();

    if (!roomId) {
      router.push('/rooms');
      return;
    }

    const loadedRoom = getRoom(roomId);
    if (!loadedRoom) {
      router.push('/rooms');
      return;
    }

    const loadedProfile = getUserProfile();
    const loadedSettings = getSettings();

    setRoom(loadedRoom);
    setUserProfile(loadedProfile);
    setSettings(loadedSettings);

    // Initialize profile form
    setProfileName(loadedProfile.name);
    setProfileAvatar(loadedProfile.avatar);
    setProfileStatus(loadedProfile.status);
    setProfileStatusMessage(loadedProfile.statusMessage || '');

    // Generate invite link
    setInviteLink(generateInviteLink(roomId));
  }, [roomIdFromUrl, router]);

  // Save profile
  const handleSaveProfile = () => {
    const updated = {
      name: profileName,
      avatar: profileAvatar,
      status: profileStatus,
      statusMessage: profileStatusMessage,
    };
    saveUserProfile(updated);
    setUserProfile(updated);

    // Also update room's myName
    if (room) {
      saveRoom(room.id, { ...room, myName: profileName });
      setRoom({ ...room, myName: profileName });
    }

    showSaveMessage();
  };

  // Save settings
  const handleSaveSettings = () => {
    if (!settings) return;
    saveSettings(settings);
    showSaveMessage();
  };

  // Add channel
  const handleAddChannel = () => {
    if (!newChannelName.trim() || !room) return;

    const channelName = newChannelName.trim();

    if (room.channels.includes(channelName)) {
      alert('이미 존재하는 채널 이름입니다.');
      return;
    }

    addChannel(room.id, channelName);
    const updatedRoom = getRoom(room.id);
    setRoom(updatedRoom);
    setNewChannelName('');
    showSaveMessage();
  };

  // Start editing channel
  const handleStartEditChannel = (channelName) => {
    setEditingChannel(channelName);
    setEditChannelName(channelName);
  };

  // Save channel rename
  const handleSaveChannelRename = () => {
    if (!editChannelName.trim() || !room || !editingChannel) return;

    const newName = editChannelName.trim();

    if (newName === editingChannel) {
      setEditingChannel(null);
      return;
    }

    if (room.channels.includes(newName)) {
      alert('이미 존재하는 채널 이름입니다.');
      return;
    }

    renameChannel(room.id, editingChannel, newName);
    const updatedRoom = getRoom(room.id);
    setRoom(updatedRoom);
    setEditingChannel(null);
    showSaveMessage();
  };

  // Delete channel
  const handleDeleteChannel = (channelName) => {
    if (!room) return;

    if (room.channels.length <= 1) {
      alert('최소 1개의 채널은 필요합니다.');
      return;
    }

    if (window.confirm(`"${channelName}" 채널을 삭제하시겠습니까?`)) {
      deleteChannel(room.id, channelName);
      const updatedRoom = getRoom(room.id);
      setRoom(updatedRoom);
      showSaveMessage();
    }
  };

  // Leave room
  const handleLeaveRoom = () => {
    if (!room) return;

    deleteRoom(room.id);
    router.push('/rooms');
  };

  // Copy invite link
  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    alert('초대 링크가 복사되었습니다!');
  };

  // Show save message
  const showSaveMessage = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!room || !userProfile || !settings) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <span className="material-icons text-6xl text-blue-500 animate-spin mb-4">
            refresh
          </span>
          <p className="text-gray-600">설정을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto p-4 flex items-center gap-4">
          <button
            onClick={() => router.push(`/chat?room=${room.id}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="material-icons">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">설정</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Save Success Message */}
        {saved && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-2 animate-pulse">
            <span className="material-icons">check_circle</span>
            저장되었습니다!
          </div>
        )}

        {/* Room Info Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="material-icons text-blue-600">meeting_room</span>
            채팅방 정보
          </h2>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">채팅방 이름</p>
              <p className="font-semibold text-gray-800">{room.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">참여 채널 수</p>
              <p className="font-semibold text-gray-800">{room.channels.length}개</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">생성일</p>
              <p className="font-semibold text-gray-800">
                {new Date(room.createdAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>
        </section>

        {/* User Profile Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="material-icons text-purple-600">person</span>
            내 프로필
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                이름
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                아바타 (이모지)
              </label>
              <input
                type="text"
                value={profileAvatar}
                onChange={(e) => setProfileAvatar(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="😀"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                상태
              </label>
              <select
                value={profileStatus}
                onChange={(e) => setProfileStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="온라인">온라인</option>
                <option value="자리비움">자리비움</option>
                <option value="다른 용무 중">다른 용무 중</option>
                <option value="오프라인">오프라인</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                상태 메시지
              </label>
              <input
                type="text"
                value={profileStatusMessage}
                onChange={(e) => setProfileStatusMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="커피 마시는 중..."
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-icons">save</span>
              프로필 저장
            </button>
          </div>
        </section>

        {/* Channel Management Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="material-icons text-green-600">tag</span>
            채널 관리
          </h2>

          {/* Add Channel */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              새 채널 추가
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddChannel()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="채널 이름"
              />
              <button
                onClick={handleAddChannel}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1"
              >
                <span className="material-icons">add</span>
                추가
              </button>
            </div>
          </div>

          {/* Channel List */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 mb-2">현재 채널 목록</p>
            {room.channels.map((channelName) => (
              <div
                key={channelName}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
              >
                {editingChannel === channelName ? (
                  <>
                    <input
                      type="text"
                      value={editChannelName}
                      onChange={(e) => setEditChannelName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveChannelRename()}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSaveChannelRename}
                      className="p-1 text-green-600 hover:bg-green-100 rounded"
                      title="저장"
                    >
                      <span className="material-icons text-sm">check</span>
                    </button>
                    <button
                      onClick={() => setEditingChannel(null)}
                      className="p-1 text-gray-600 hover:bg-gray-200 rounded"
                      title="취소"
                    >
                      <span className="material-icons text-sm">close</span>
                    </button>
                  </>
                ) : (
                  <>
                    <span className="material-icons text-gray-400 text-sm">tag</span>
                    <span className="flex-1 text-gray-700">{channelName}</span>
                    <button
                      onClick={() => handleStartEditChannel(channelName)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                      title="이름 변경"
                    >
                      <span className="material-icons text-sm">edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteChannel(channelName)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                      title="삭제"
                    >
                      <span className="material-icons text-sm">delete</span>
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Chat Settings Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="material-icons text-orange-600">settings</span>
            채팅 설정
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                새 메시지 확인 주기
              </label>
              <select
                value={settings.pollingInterval}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    pollingInterval: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={3000}>3초</option>
                <option value={5000}>5초 (권장)</option>
                <option value={10000}>10초</option>
                <option value={30000}>30초</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoScroll}
                  onChange={(e) =>
                    setSettings({ ...settings, autoScroll: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">자동 스크롤</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) =>
                    setSettings({ ...settings, soundEnabled: e.target.checked })
                  }
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">알림음</span>
              </label>
            </div>

            <button
              onClick={handleSaveSettings}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-icons">save</span>
              설정 저장
            </button>
          </div>
        </section>

        {/* Invite Link Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="material-icons text-indigo-600">link</span>
            초대 링크
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            아래 링크를 공유하여 다른 사용자를 이 채팅방에 초대하세요.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
            <button
              onClick={handleCopyInviteLink}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
            >
              <span className="material-icons">content_copy</span>
              복사
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-white rounded-lg shadow-sm p-6 border-2 border-red-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-600">
            <span className="material-icons">warning</span>
            위험 구역
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            채팅방에서 나가면 이 채팅방에 다시 접근할 수 없습니다.
            초대 링크를 통해 다시 입장해야 합니다.
          </p>

          {!showLeaveConfirm ? (
            <button
              onClick={() => setShowLeaveConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              <span className="material-icons">exit_to_app</span>
              채팅방 나가기
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleLeaveRoom}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <span className="material-icons">check</span>
                확인 (나가기)
              </button>
              <button
                onClick={() => setShowLeaveConfirm(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <span className="material-icons">close</span>
                취소
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
