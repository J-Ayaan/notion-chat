'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNotionConfig } from '../hooks/useNotionConfig';

export default function SettingsPage() {
  const router = useRouter();
  const { config, updateConfig, reset } = useNotionConfig();

  const [formData, setFormData] = useState({
    userName: config?.userName || '',
    notionToken: config?.notionToken || '',
    databaseId: config?.databaseId || '',
    pollingInterval: config?.pollingInterval || 5000,
    autoScroll: config?.autoScroll !== false,
    soundEnabled: config?.soundEnabled || false,
  });

  const [showToken, setShowToken] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [saved, setSaved] = useState(false);

  // config가 로드되면 formData 업데이트
  useEffect(() => {
    if (config) {
      setFormData({
        userName: config.userName || '',
        notionToken: config.notionToken || '',
        databaseId: config.databaseId || '',
        pollingInterval: config.pollingInterval || 5000,
        autoScroll: config.autoScroll !== false,
        soundEnabled: config.soundEnabled || false,
      });
    }
  }, [config]);

  // 설정 저장
  const handleSave = () => {
    updateConfig(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // 설정 초기화
  const handleReset = () => {
    if (window.confirm('정말 모든 설정을 초기화하시겠습니까?')) {
      reset();
      router.push('/onboarding');
    }
  };

  // 임베드 코드 복사
  const handleCopyEmbedCode = () => {
    const embedCode = `<iframe src="${window.location.origin}" width="100%" height="600px" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    alert('임베드 코드가 복사되었습니다!');
  };

  // Token 마스킹
  const maskToken = (token: string) => {
    if (!token) return '';
    return token.substring(0, 10) + '***' + token.substring(token.length - 4);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto p-4 flex items-center gap-4">
          <button
            onClick={() => router.push('/chat')}
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
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-2">
            <span className="material-icons">check_circle</span>
            설정이 저장되었습니다!
          </div>
        )}

        {/* User Info Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="material-icons text-blue-600">person</span>
            사용자 정보
          </h2>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            이름
          </label>
          <input
            type="text"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="홍길동"
          />
        </section>

        {/* Notion Integration Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="material-icons text-purple-600">link</span>
            Notion 연동
          </h2>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Integration Token
            </label>
            <div className="flex gap-2">
              <input
                type={showToken ? 'text' : 'password'}
                value={
                  showToken ? formData.notionToken : maskToken(formData.notionToken)
                }
                onChange={(e) =>
                  setFormData({ ...formData, notionToken: e.target.value })
                }
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="secret_xxxxxxxxxxxxxxxx"
              />
              <button
                onClick={() => setShowToken(!showToken)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <span className="material-icons">
                  {showToken ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Database ID
            </label>
            <input
              type="text"
              value={formData.databaseId}
              onChange={(e) =>
                setFormData({ ...formData, databaseId: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            />
          </div>
        </section>

        {/* Chat Settings Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="material-icons text-green-600">settings</span>
            채팅 설정
          </h2>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              새 메시지 확인 주기
            </label>
            <select
              value={formData.pollingInterval}
              onChange={(e) =>
                setFormData({
                  ...formData,
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
                checked={formData.autoScroll}
                onChange={(e) =>
                  setFormData({ ...formData, autoScroll: e.target.checked })
                }
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">자동 스크롤</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.soundEnabled}
                onChange={(e) =>
                  setFormData({ ...formData, soundEnabled: e.target.checked })
                }
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">알림음</span>
            </label>
          </div>
        </section>

        {/* Embed Code Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="material-icons text-orange-600">code</span>
            임베드 코드
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            노션 페이지에 이 채팅을 임베드하려면 아래 버튼을 클릭하여 코드를
            복사하세요.
          </p>

          <button
            onClick={handleCopyEmbedCode}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <span className="material-icons">content_copy</span>
            코드 복사
          </button>
        </section>

        {/* Danger Zone */}
        <section className="bg-white rounded-lg shadow-sm p-6 border-2 border-red-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-600">
            <span className="material-icons">warning</span>
            위험 구역
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            설정을 초기화하면 모든 데이터가 삭제되고 온보딩 화면으로
            이동합니다.
          </p>

          {!showReset ? (
            <button
              onClick={() => setShowReset(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              <span className="material-icons">delete_forever</span>
              설정 초기화
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <span className="material-icons">check</span>
                확인 (초기화)
              </button>
              <button
                onClick={() => setShowReset(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <span className="material-icons">close</span>
                취소
              </button>
            </div>
          )}
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => router.push('/chat')}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-icons">save</span>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
