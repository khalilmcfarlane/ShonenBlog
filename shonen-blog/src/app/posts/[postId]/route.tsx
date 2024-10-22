/*
Code for retrieving post from DB would be similar to this below:

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');
 
  try {
    if (!postId) throw new Error('PostId required');
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const posts = await sql`SELECT * FROM Posts WHERE postId == ${postId};`;
  return NextResponse.json({ posts }, { status: 200 });

  // Import into [postId]/page.tsx and display info 
}

*/