// src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-icons text-3xl text-blue-600">
              forum
            </span>
            <h1 className="text-2xl font-bold text-gray-800">NotionChat</h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/notion-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span className="material-icons">code</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
            🚀 노션 기반 팀 채팅 솔루션
          </span>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          노션과 연결된 팀 채팅을
          <br />
          <span className="text-blue-600">3분 안에</span>
        </h2>

        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          별도 설치 없이 브라우저에서 바로 시작하는 팀 채팅.
          <br />
          모든 대화는 여러분의 노션에 안전하게 저장됩니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/onboarding')}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2 text-lg font-semibold"
          >
            <span className="material-icons">rocket_launch</span>
            시작하기
          </button>
          <a
            href="#features"
            className="px-8 py-4 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-md text-lg font-semibold"
          >
            더 알아보기
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { icon: 'attach_money', label: '완전 무료', value: '₩0' },
            { icon: 'speed', label: '설정 시간', value: '3분' },
            { icon: 'security', label: '데이터 보안', value: '100%' },
            { icon: 'devices', label: '멀티 플랫폼', value: '지원' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
                <span className="material-icons text-blue-600 text-3xl">
                  {stat.icon}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              왜 NotionChat인가요?
            </h3>
            <p className="text-lg text-gray-600">
              팀 채팅의 새로운 패러다임을 경험하세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'download_done',
                title: '설치 불필요',
                description:
                  '웹 브라우저만 있으면 OK. 앱 설치나 회원가입 없이 바로 시작할 수 있습니다.',
                color: 'blue',
              },
              {
                icon: 'shield',
                title: '완벽한 보안',
                description:
                  '모든 데이터는 여러분의 노션에만 저장됩니다. 제3자 서버에 데이터가 저장되지 않습니다.',
                color: 'green',
              },
              {
                icon: 'flash_on',
                title: '빠른 설정',
                description:
                  '3단계 가이드를 따라하면 3분 안에 팀 채팅을 시작할 수 있습니다.',
                color: 'purple',
              },
              {
                icon: 'palette',
                title: '커스터마이징',
                description:
                  '채널, 속성, 디자인을 자유롭게 수정할 수 있습니다. 노션처럼 유연합니다.',
                color: 'pink',
              },
              {
                icon: 'integration_instructions',
                title: '노션 통합',
                description:
                  '노션 페이지에 직접 임베드하거나, 노션과 완벽하게 연동되어 작동합니다.',
                color: 'indigo',
              },
              {
                icon: 'code',
                title: '오픈소스',
                description:
                  '코드가 100% 공개되어 있어 투명하고 신뢰할 수 있습니다. 기여도 환영합니다!',
                color: 'orange',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 bg-${feature.color}-100 rounded-lg mb-4`}
                >
                  <span
                    className={`material-icons text-${feature.color}-600 text-3xl`}
                  >
                    {feature.icon}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              어떻게 작동하나요?
            </h3>
            <p className="text-lg text-gray-600">
              3단계만 거치면 팀 채팅을 시작할 수 있습니다
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Notion Integration 생성',
                description:
                  'Notion에서 Integration을 만들고 Token을 복사합니다.',
                time: '1분',
              },
              {
                step: '2',
                title: 'Database 템플릿 복사',
                description:
                  '제공된 템플릿을 복사하거나 직접 Database를 만듭니다.',
                time: '30초',
              },
              {
                step: '3',
                title: '설정 입력하고 시작!',
                description:
                  'Token과 Database ID를 입력하면 바로 채팅을 시작할 수 있습니다.',
                time: '30초',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-6 bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <div className="flex-shrink-0 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {item.time}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/onboarding')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2 text-lg font-semibold mx-auto"
            >
              <span className="material-icons">rocket_launch</span>
              지금 시작하기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-icons text-2xl">forum</span>
                <span className="text-xl font-bold">NotionChat</span>
              </div>
              <p className="text-gray-400 text-sm">
                노션 기반 팀 채팅 솔루션
              </p>
            </div>

            <div className="flex gap-6">
              <a
                href="https://github.com/notion-chat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                문서
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                문의
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© 2024 NotionChat. MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
