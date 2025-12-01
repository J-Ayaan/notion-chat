import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const DEFAULT_CHANNELS = [
  { name: '일반', color: 'blue' },
  { name: '공지', color: 'red' },
  { name: '긴급', color: 'orange' },
  { name: '질문', color: 'yellow' },
  { name: '개발', color: 'green' },
  { name: '디자인', color: 'purple' },
  { name: '기획', color: 'pink' },
];

export async function POST(request: NextRequest) {
  try {
    const { token, databaseId } = await request.json();

    if (!token || !databaseId) {
      return NextResponse.json(
        { error: 'Missing required parameters: token and databaseId' },
        { status: 400 }
      );
    }

    const notion = new Client({ auth: token });

    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    const channelProperty = database.properties['채널'];

    if (!channelProperty || channelProperty.type !== 'select') {
      return NextResponse.json(
        {
          error: 'Database does not have a "채널" select property',
          hint: 'Please add a Select property named "채널" to your database'
        },
        { status: 400 }
      );
    }

    const channels = channelProperty.select.options.map((option: any) => ({
      name: option.name,
      color: option.color,
      id: option.id,
    }));

    if (channels.length === 0) {
      return NextResponse.json({
        channels: DEFAULT_CHANNELS,
        isDefault: true,
      });
    }

    return NextResponse.json({
      channels,
      isDefault: false,
    });

  } catch (error: any) {
    console.error('Get channels error:', error);

    if (error.code === 'unauthorized') {
      return NextResponse.json(
        { error: 'Invalid Notion token' },
        { status: 401 }
      );
    }

    if (error.code === 'object_not_found') {
      return NextResponse.json(
        { error: 'Database not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      channels: DEFAULT_CHANNELS,
      isDefault: true,
      error: error.message,
    });
  }
}
