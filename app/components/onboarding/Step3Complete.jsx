'use client';

// src/components/onboarding/Step3Complete.jsx
import React from 'react';

export default function Step3Complete({
  formData,
  setFormData,
  errors,
  onComplete,
  onPrev,
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span className="material-icons text-green-500 text-3xl">
          check_circle
        </span>
        설정 완료!
      </h2>

      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-green-700">
            <span className="material-icons text-green-500">check</span>
            Notion Integration 연결됨
          </p>
          <p className="flex items-center gap-2 text-green-700">
            <span className="material-icons text-green-500">check</span>
            Database 연동됨
          </p>
        </div>
      </div>

      <label className="block mb-2 font-medium text-gray-700">
        사용자 이름:
      </label>
      <input
        type="text"
        placeholder="홍길동"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.userName}
        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
      />
      {errors.userName && (
        <p className="text-red-500 text-sm mb-4 flex items-center gap-1">
          <span className="material-icons text-sm">error</span>
          {errors.userName}
        </p>
      )}

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-blue-600">lightbulb</span>
          팁:
        </p>
        <ul className="text-sm space-y-1 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="material-icons text-xs mt-0.5">circle</span>
            설정은 언제든 변경 가능 (⚙️ 버튼)
          </li>
          <li className="flex items-start gap-2">
            <span className="material-icons text-xs mt-0.5">circle</span>
            노션에 임베드하려면 설정에서 코드 복사
          </li>
          <li className="flex items-start gap-2">
            <span className="material-icons text-xs mt-0.5">circle</span>
            채널은 노션 DB에서 직접 추가/수정 가능
          </li>
        </ul>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-icons">arrow_back</span>
          이전
        </button>
        <button
          onClick={onComplete}
          className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          채팅 시작하기
          <span className="material-icons">rocket_launch</span>
        </button>
      </div>
    </div>
  );
}
