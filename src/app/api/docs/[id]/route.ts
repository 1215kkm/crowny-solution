import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const docs: Record<string, string> = {
  'marketplace-plan': 'docs/CROWNY_MARKETPLACE_PLAN.md',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const filePath = docs[id];

  if (!filePath) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = await readFile(fullPath, 'utf-8');

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${id}.md"`,
      },
    });
  } catch (error) {
    console.error('File read error:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
