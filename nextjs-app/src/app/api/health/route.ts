import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      dbConnected: true
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      timestamp: new Date().toISOString(),
      dbConnected: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
