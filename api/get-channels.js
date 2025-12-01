// api/get-channels.js
// Database의 '채널' Select 속성에서 채널 목록을 가져오는 Serverless Function

import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST 메서드만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, databaseId } = req.body;

  // 필수 파라미터 검증
  if (!token || !databaseId) {
    return res.status(400).json({
      error: 'Missing required parameters: token and databaseId'
    });
  }

  try {
    // 사용자의 Token으로 Notion 클라이언트 생성
    const notion = new Client({ auth: token });

    // Database 정보 조회
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    // '채널' 속성 찾기
    const channelProperty = database.properties['채널'];

    if (!channelProperty || channelProperty.type !== 'select') {
      return res.status(400).json({
        error: 'Database does not have a "채널" select property',
        hint: 'Please add a Select property named "채널" to your database'
      });
    }

    // Select 옵션에서 채널 목록 추출
    const channels = channelProperty.select.options.map(option => ({
      name: option.name,
      color: option.color,
      id: option.id,
    }));

    // 채널이 없으면 기본 채널 반환
    if (channels.length === 0) {
      return res.status(200).json({
        channels: [
          { name: '일반', color: 'blue' },
          { name: '공지', color: 'red' },
          { name: '긴급', color: 'orange' },
          { name: '질문', color: 'yellow' },
          { name: '개발', color: 'green' },
          { name: '디자인', color: 'purple' },
          { name: '기획', color: 'pink' },
        ],
        isDefault: true,
      });
    }

    // 성공 응답
    res.status(200).json({
      channels,
      isDefault: false,
    });

  } catch (error) {
    console.error('Get channels error:', error);

    // 에러 타입별 처리
    if (error.code === 'unauthorized') {
      return res.status(401).json({
        error: 'Invalid Notion token'
      });
    }

    if (error.code === 'object_not_found') {
      return res.status(404).json({
        error: 'Database not found'
      });
    }

    // 일반 에러 - 기본 채널 반환
    res.status(200).json({
      channels: [
        { name: '일반', color: 'blue' },
        { name: '공지', color: 'red' },
        { name: '긴급', color: 'orange' },
        { name: '질문', color: 'yellow' },
        { name: '개발', color: 'green' },
        { name: '디자인', color: 'purple' },
        { name: '기획', color: 'pink' },
      ],
      isDefault: true,
      error: error.message,
    });
  }
}
