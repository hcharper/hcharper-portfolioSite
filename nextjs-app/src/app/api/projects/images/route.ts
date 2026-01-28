import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const projectsDir = path.join(process.cwd(), 'public', 'projects');
    
    // Check if directory exists
    if (!fs.existsSync(projectsDir)) {
      return NextResponse.json([]);
    }
    
    const files = fs.readdirSync(projectsDir);
    
    // Filter for image files only
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
    const images = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });
    
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error reading project images:', error);
    return NextResponse.json({ error: 'Failed to fetch project images' }, { status: 500 });
  }
}
