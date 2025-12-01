// src/components/onboarding/Step1Integration.jsx
import React from 'react';

export default function Step1Integration({ formData, setFormData, errors, onNext }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 1: Notion Integration</h2>
      <p className="text-gray-600 mb-6">
        Notion Integration을 생성하고 Token을 복사하세요.
      </p>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="material-icons text-blue-600">menu_book</span>
          가이드:
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>
            <a
              href="https://www.notion.so/my-integrations"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              https://notion.so/my-integrations
            </a>{' '}
            접속
          </li>
          <li>"+ New integration" 클릭</li>
          <li>이름: NotionChat (아무거나 가능)</li>
          <li>"Submit" 클릭</li>
          <li>"Internal Integration Token" 복사</li>
        </ol>
      </div>

      <label className="block mb-2 font-medium text-gray-700">
        Integration Token:
      </label>
      <input
        type="password"
        placeholder="secret_xxx... 또는 ntn_xxx..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.notionToken}
        onChange={(e) =>
          setFormData({ ...formData, notionToken: e.target.value })
        }
      />
      {errors.token && (
        <p className="text-red-500 text-sm mb-4 flex items-center gap-1">
          <span className="material-icons text-sm">error</span>
          {errors.token}
        </p>
      )}

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex items-start gap-2">
          <span className="material-icons text-yellow-600">warning</span>
          <div>
            <p className="text-sm font-semibold text-yellow-800 mb-1">주의사항</p>
            <p className="text-sm text-yellow-700">
              Token은 절대 다른 사람과 공유하지 마세요! 이 Token은 오직 브라우저에만
              저장되며 서버로 전송되지 않습니다.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        다음 단계로
        <span className="material-icons">arrow_forward</span>
      </button>
    </div>
  );
}
