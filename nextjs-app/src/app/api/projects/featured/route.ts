import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/lib/models/project';

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({ featured: true }).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return NextResponse.json({ error: 'Failed to fetch featured projects' }, { status: 500 });
  }
}
