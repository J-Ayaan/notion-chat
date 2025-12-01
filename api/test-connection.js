// api/test-connection.js
// Notion Token과 Database ID의 유효성을 테스트하는 Serverless Function

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

    // Database 조회로 연결 테스트
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    // 필수 속성 확인
    const properties = database.properties;
    const requiredProps = ['Name', '채널', '작성자', '작성일시'];
    const missingProps = [];

    for (const prop of requiredProps) {
      if (!properties[prop]) {
        missingProps.push(prop);
      }
    }

    if (missingProps.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Database is missing required properties',
        missingProperties: missingProps,
        hint: 'Please use the template or add these properties to your database'
      });
    }

    // 연결 성공
    res.status(200).json({
      success: true,
      message: 'Connection successful',
      databaseTitle: database.title?.[0]?.plain_text || 'Untitled',
    });

  } catch (error) {
    console.error('Connection test error:', error);

    // 에러 타입별 처리
    if (error.code === 'unauthorized') {
      return res.status(401).json({
        success: false,
        error: 'Invalid Notion token',
        hint: 'Please check your integration token'
      });
    }

    if (error.code === 'object_not_found') {
      return res.status(404).json({
        success: false,
        error: 'Database not found',
        hint: 'Make sure the integration is connected to the database'
      });
    }

    if (error.code === 'rate_limited') {
      return res.status(429).json({
        success: false,
        error: 'API rate limit exceeded',
        hint: 'Please try again later'
      });
    }

    // 일반 에러
    res.status(500).json({
      success: false,
      error: 'Connection test failed',
      details: error.message
    });
  }
}
