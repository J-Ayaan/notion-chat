import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

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

    const properties = database.properties;
    const requiredProps = ['Name', '채널', '작성자', '작성일시'];
    const missingProps = [];

    for (const prop of requiredProps) {
      if (!properties[prop]) {
        missingProps.push(prop);
      }
    }

    if (missingProps.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Database is missing required properties',
          missingProperties: missingProps,
          hint: 'Please use the template or add these properties to your database'
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Connection successful',
      databaseTitle: (database as any).title?.[0]?.plain_text || 'Untitled',
    });

  } catch (error: any) {
    console.error('Connection test error:', error);

    if (error.code === 'unauthorized') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid Notion token',
          hint: 'Please check your integration token'
        },
        { status: 401 }
      );
    }

    if (error.code === 'object_not_found') {
      return NextResponse.json(
        {
          success: false,
          error: 'Database not found',
          hint: 'Make sure the integration is connected to the database'
        },
        { status: 404 }
      );
    }

    if (error.code === 'rate_limited') {
      return NextResponse.json(
        {
          success: false,
          error: 'API rate limit exceeded',
          hint: 'Please try again later'
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Connection test failed',
        details: error.message
      },
      { status: 500 }
    );
  }
}
