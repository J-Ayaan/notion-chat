import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function POST(request: NextRequest) {
  try {
    const { token, databaseId, channel } = await request.json();

    if (!token || !databaseId) {
      return NextResponse.json(
        { error: 'Missing required parameters: token and databaseId' },
        { status: 400 }
      );
    }

    const notion = new Client({ auth: token });

    const queryOptions: any = {
      database_id: databaseId,
      sorts: [{ property: '작성일시', direction: 'ascending' }],
      page_size: 100,
    };

    if (channel) {
      queryOptions.filter = {
        property: '채널',
        select: { equals: channel },
      };
    }

    const response = await notion.databases.query(queryOptions);

    const messages = response.results.map((page: any) => ({
      id: page.id,
      content: page.properties.Name?.title[0]?.text.content || '',
      author:
        page.properties.작성자?.rich_text[0]?.text.content ||
        page.properties.작성자?.people[0]?.name ||
        '익명',
      channel: page.properties.채널?.select?.name || '일반',
      time: page.properties.작성일시?.created_time || page.created_time,
    }));

    return NextResponse.json({ messages });
  } catch (error: any) {
    console.error('Notion API Error:', error);

    if (error.code === 'unauthorized') {
      return NextResponse.json(
        { error: 'Invalid Notion token' },
        { status: 401 }
      );
    }

    if (error.code === 'object_not_found') {
      return NextResponse.json(
        { error: 'Database not found or not connected' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to query messages' },
      { status: 500 }
    );
  }
}
