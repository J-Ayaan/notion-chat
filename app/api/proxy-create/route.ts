import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function POST(request: NextRequest) {
  try {
    const { token, databaseId, content, channel, author } = await request.json();

    if (!token || !databaseId || !content || !channel || !author) {
      return NextResponse.json(
        { error: 'Missing required parameters: token, databaseId, content, channel, and author' },
        { status: 400 }
      );
    }

    if (content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message content cannot be empty' },
        { status: 400 }
      );
    }

    if (content.length > 2000) {
      return NextResponse.json(
        { error: 'Message content is too long (max 2000 characters)' },
        { status: 400 }
      );
    }

    const notion = new Client({ auth: token });

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: { content: content.trim() }
            }
          ],
        },
        채널: {
          select: { name: channel },
        },
        작성자: {
          rich_text: [
            {
              text: { content: author }
            }
          ],
        },
      },
    });

    return NextResponse.json({
      success: true,
      pageId: response.id,
      message: 'Message sent successfully',
    });

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
        { error: 'Database not found or integration not connected' },
        { status: 404 }
      );
    }

    if (error.code === 'validation_error') {
      return NextResponse.json(
        {
          error: 'Database schema mismatch. Please check required properties.',
          details: error.message
        },
        { status: 400 }
      );
    }

    if (error.code === 'rate_limited') {
      return NextResponse.json(
        { error: 'API rate limit exceeded' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to send message',
        details: error.message
      },
      { status: 500 }
    );
  }
}
