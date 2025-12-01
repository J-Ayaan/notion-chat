'use client';

// src/components/onboarding/Step2Database.jsx
import React from 'react';

export default function Step2Database({
  formData,
  setFormData,
  errors,
  onNext,
  onPrev,
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 2: Database 설정</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="material-icons text-green-600">card_giftcard</span>
          옵션 1: 템플릿 복사 (추천)
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          템플릿을 복사하면 필요한 모든 속성이 자동으로 생성됩니다.
        </p>
        <a
          href="https://notion.so/templates/notionchat-template"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          <span className="material-icons">content_copy</span>
          템플릿 복사하기
        </a>
      </div>

      <div className="border-t pt-6 mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="material-icons text-purple-600">edit</span>
          옵션 2: 직접 만들기
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg text-sm">
          <p className="mb-2 font-medium">필수 속성:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>
              <strong>Name</strong> (Title)
            </li>
            <li>
              <strong>채널</strong> (Select): 일반, 공지, 긴급, 질문, 개발, 디자인,
              기획
            </li>
            <li>
              <strong>작성자</strong> (Rich Text 또는 People)
            </li>
            <li>
              <strong>작성일시</strong> (Created Time)
            </li>
          </ul>
        </div>
      </div>

      <label className="block mb-2 font-medium text-gray-700">
        Database URL 또는 ID:
      </label>
      <input
        type="text"
        placeholder="https://notion.so/xxx... 또는 xxx-xxx-xxx"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.databaseId}
        onChange={(e) =>
          setFormData({ ...formData, databaseId: e.target.value })
        }
      />
      {errors.database && (
        <p className="text-red-500 text-sm mb-4 flex items-center gap-1">
          <span className="material-icons text-sm">error</span>
          {errors.database}
        </p>
      )}

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-blue-600">info</span>
          Integration 연결하기:
        </p>
        <p className="text-sm text-gray-700">
          Database 페이지에서 우측 상단 <strong>...</strong> →{' '}
          <strong>Connections</strong> → 방금 만든 Integration 선택
        </p>
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
          onClick={onNext}
          className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          다음 단계로
          <span className="material-icons">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
