// api/proxy-query.js
// Notion Database에서 메시지 조회를 프록시하는 Serverless Function

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

  const { token, databaseId, channel } = req.body;

  // 필수 파라미터 검증
  if (!token || !databaseId) {
    return res.status(400).json({
      error: 'Missing required parameters: token and databaseId'
    });
  }

  try {
    // 사용자의 Token으로 Notion 클라이언트 생성
    const notion = new Client({ auth: token });

    // Database 쿼리 옵션
    const queryOptions = {
      database_id: databaseId,
      sorts: [
        { property: '작성일시', direction: 'ascending' }
      ],
      page_size: 100, // 최근 100개 메시지
    };

    // 특정 채널 필터링
    if (channel) {
      queryOptions.filter = {
        property: '채널',
        select: { equals: channel },
      };
    }

    // Notion API 호출
    const response = await notion.databases.query(queryOptions);

    // 메시지 데이터 파싱
    const messages = response.results.map((page) => {
      // Name (Title) 속성에서 메시지 내용 추출
      const content = page.properties.Name?.title?.[0]?.text?.content || '';

      // 작성자 추출 (Rich Text 또는 People 타입)
      let author = '익명';
      if (page.properties.작성자?.rich_text?.[0]?.text?.content) {
        author = page.properties.작성자.rich_text[0].text.content;
      } else if (page.properties.작성자?.people?.[0]?.name) {
        author = page.properties.작성자.people[0].name;
      }

      // 채널 추출
      const messageChannel = page.properties.채널?.select?.name || '일반';

      // 작성일시 추출
      const time = page.properties.작성일시?.created_time || page.created_time;

      return {
        id: page.id,
        content,
        author,
        channel: messageChannel,
        time,
      };
    });

    // 성공 응답
    res.status(200).json({ messages });

  } catch (error) {
    console.error('Notion API Error:', error);

    // 에러 타입별 처리
    if (error.code === 'unauthorized') {
      return res.status(401).json({
        error: 'Invalid Notion token. Please check your integration token.'
      });
    }

    if (error.code === 'object_not_found') {
      return res.status(404).json({
        error: 'Database not found. Please ensure the integration is connected to the database.'
      });
    }

    if (error.code === 'rate_limited') {
      return res.status(429).json({
        error: 'API rate limit exceeded. Please try again later.'
      });
    }

    // 일반 에러
    res.status(500).json({
      error: 'Failed to query messages',
      details: error.message
    });
  }
}
