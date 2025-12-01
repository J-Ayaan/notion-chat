// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useNotionConfig } from './hooks/useNotionConfig';
import ErrorBoundary from './components/common/ErrorBoundary';
import Loading from './components/common/Loading';

// Pages
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';

/**
 * 보호된 라우트 컴포넌트
 * 설정이 완료되지 않았으면 온보딩으로 리디렉션
 */
function ProtectedRoute({ children }) {
  const { isConfigured, isLoading } = useNotionConfig();

  if (isLoading) {
    return <Loading fullScreen message="설정을 불러오는 중..." />;
  }

  if (!isConfigured) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

/**
 * 메인 앱 컴포넌트
 */
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* 랜딩 페이지 */}
          <Route path="/" element={<LandingPage />} />

          {/* 온보딩 페이지 */}
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* 보호된 라우트 */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          {/* 404 페이지 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

/**
 * 404 페이지 컴포넌트
 */
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
          <span className="material-icons text-blue-600 text-5xl">
            explore_off
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          페이지를 찾을 수 없습니다
        </h1>

        <p className="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <span className="material-icons">home</span>
            홈으로 돌아가기
          </a>

          <a
            href="/chat"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            채팅으로 이동
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
