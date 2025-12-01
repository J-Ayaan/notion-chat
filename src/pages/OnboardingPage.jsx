// src/pages/OnboardingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotionConfig } from '../hooks/useNotionConfig';
import {
  validateNotionToken,
  validateDatabaseId,
  extractDatabaseIdFromUrl,
  validateUserName,
} from '../utils/validators';
import Step1Integration from '../components/onboarding/Step1Integration';
import Step2Database from '../components/onboarding/Step2Database';
import Step3Complete from '../components/onboarding/Step3Complete';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { updateConfig } = useNotionConfig();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    notionToken: '',
    databaseId: '',
    userName: '',
  });
  const [errors, setErrors] = useState({});

  // Step 1 검증
  const validateStep1 = () => {
    if (!validateNotionToken(formData.notionToken)) {
      setErrors({
        token:
          'Token 형식이 올바르지 않습니다. secret_ 또는 ntn_으로 시작하는 Notion Integration Token을 입력해주세요.',
      });
      return false;
    }
    setErrors({});
    return true;
  };

  // Step 2 검증
  const validateStep2 = () => {
    // URL에서 ID 추출 시도
    const extractedId =
      extractDatabaseIdFromUrl(formData.databaseId) || formData.databaseId;

    if (!validateDatabaseId(extractedId)) {
      setErrors({
        database:
          'Database ID 또는 URL 형식이 올바르지 않습니다. 32자 UUID 형식이어야 합니다.',
      });
      return false;
    }

    // 추출된 ID로 업데이트
    setFormData({ ...formData, databaseId: extractedId });
    setErrors({});
    return true;
  };

  // Step 3 검증
  const validateStep3 = () => {
    if (!validateUserName(formData.userName)) {
      setErrors({
        userName: '사용자 이름을 입력해주세요 (1-50자).',
      });
      return false;
    }
    setErrors({});
    return true;
  };

  // 다음 단계로
  const handleNext = () => {
    let isValid = false;

    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2) {
      isValid = validateStep2();
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  // 이전 단계로
  const handlePrev = () => {
    setStep(step - 1);
    setErrors({});
  };

  // 온보딩 완료
  const handleComplete = () => {
    if (!validateStep3()) {
      return;
    }

    // 설정 저장
    updateConfig({
      ...formData,
      pollingInterval: 5000,
      theme: 'light',
      autoScroll: true,
      soundEnabled: false,
    });

    // 채팅 페이지로 이동
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((num) => (
            <React.Fragment key={num}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    step >= num
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > num ? (
                    <span className="material-icons">check</span>
                  ) : (
                    num
                  )}
                </div>
                <p
                  className={`text-xs mt-2 ${
                    step >= num ? 'text-blue-500' : 'text-gray-400'
                  }`}
                >
                  {num === 1 && 'Integration'}
                  {num === 2 && 'Database'}
                  {num === 3 && '완료'}
                </p>
              </div>
              {num < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors ${
                    step > num ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Steps */}
        {step === 1 && (
          <Step1Integration
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
          />
        )}

        {step === 2 && (
          <Step2Database
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}

        {step === 3 && (
          <Step3Complete
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onComplete={handleComplete}
            onPrev={handlePrev}
          />
        )}
      </div>
    </div>
  );
}
