// api/proxy-create.js
// Notion Database에 새 메시지를 생성하는 Serverless Function

import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리 (CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST 메서드만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, databaseId, content, channel, author } = req.body;

  // 필수 파라미터 검증
  if (!token || !databaseId || !content || !channel || !author) {
    return res.status(400).json({
      error: 'Missing required parameters: token, databaseId, content, channel, and author'
    });
  }

  // 메시지 내용 검증
  if (content.trim().length === 0) {
    return res.status(400).json({
      error: 'Message content cannot be empty'
    });
  }

  if (content.length > 2000) {
    return res.status(400).json({
      error: 'Message content is too long (max 2000 characters)'
    });
  }

  try {
    // 사용자의 Token으로 Notion 클라이언트 생성
    const notion = new Client({ auth: token });

    // Notion Page 생성 (Database에 새 행 추가)
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        // Name (Title): 메시지 내용
        Name: {
          title: [
            {
              text: { content: content.trim() }
            }
          ],
        },
        // 채널 (Select)
        채널: {
          select: { name: channel },
        },
        // 작성자 (Rich Text)
        작성자: {
          rich_text: [
            {
              text: { content: author }
            }
          ],
        },
        // 작성일시는 자동으로 생성됨 (Created Time)
      },
    });

    // 성공 응답
    res.status(200).json({
      success: true,
      pageId: response.id,
      message: 'Message sent successfully',
    });

  } catch (error) {
    console.error('Notion API Error:', error);

    // 에러 타입별 처리
    if (error.code === 'unauthorized') {
      return res.status(401).json({
        error: 'Invalid Notion token'
      });
    }

    if (error.code === 'object_not_found') {
      return res.status(404).json({
        error: 'Database not found or integration not connected'
      });
    }

    if (error.code === 'validation_error') {
      return res.status(400).json({
        error: 'Database schema mismatch. Please check required properties.',
        details: error.message
      });
    }

    if (error.code === 'rate_limited') {
      return res.status(429).json({
        error: 'API rate limit exceeded'
      });
    }

    // 일반 에러
    res.status(500).json({
      error: 'Failed to send message',
      details: error.message
    });
  }
}
