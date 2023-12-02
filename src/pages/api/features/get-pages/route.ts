// @ts-nocheck

import { APIErrorCode, Client } from '@notionhq/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const notion = new Client({ auth: process.env.NOTION_API_TOKEN });

// Define the schema for the request body
const schema = z.object({
  type: z.enum(['Idea', 'Issue', 'Feedback', 'Not Set']).optional(),
  status: z.enum(['In Process', 'Backlog', 'Planned']).optional()
});

export async function POST(req: NextRequest, res: NextResponse) {
  const req_body = await req.json();

  const validation = schema.safeParse(req_body);

  if (!validation.success) {
    const { errors } = validation.error;

    return NextResponse.json(
      {
        error: { message: 'Invalid request', errors }
      },
      { status: 500 }
    );
  }

  try {
    const validated_params = validation.data;
    const filter = {
      and: [
        {
          property: 'IsActive',
          checkbox: {
            equals: true
          }
        },
        validated_params.status
          ? {
              property: 'Status',
              select: {
                equals: validated_params.status
              }
            }
          : undefined,
        validated_params.type
          ? {
              property: 'Type',
              select: {
                equals: validated_params.type
              }
            }
          : undefined
      ].filter(Boolean) as any
    };
    const databaseId = process.env.NOTION_IC_FEATURES_DB as string;

    const notion_response = await notion.databases.query({
      database_id: databaseId,
      filter: filter
    });

    const pages = notion_response.results.map((page) => {
      return {
        id: page.id,
        name: page.properties.Name.title[0]?.plain_text || '',
        description: extractContentFromNotionText(page).join(' '),
        type: page.properties.Type.select?.name || 'Not Set',
        status: page.properties.Status.select?.name || 'Backlog',
        importance: page.properties.Importance.select?.name || 'Low',
        vote: page.properties.Vote.number || 0,
        initiator: page.properties.Initiator.rich_text[0]?.plain_text || ''
      };
    });
    return NextResponse.json({ data: pages.filter((r) => !!r.name) });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message
      },
      { status: 500 }
    );
  }
}

const extractContentFromNotionText = (notionData) => {
  return notionData.properties.Description.rich_text.map(
    (item) => item.plain_text
  );
};
