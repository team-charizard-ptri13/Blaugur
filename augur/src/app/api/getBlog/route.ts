import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/MONGO_DB';
import Blog from '../../Model/Blog';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        await connectDB();
        const id = req.nextUrl.searchParams.get('id');
        if (!id) {
            console.log('Blog ID is required');
            return NextResponse.json({ message: 'Blog ID is required' }, { status: 400 });
        }
        const blog = await Blog.findById(id);
        if (!blog) {
            console.log('Blog not found');
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }
        console.log('Blog retrieved successfully:', blog);
        return NextResponse.json({ message: 'Blog retrieved successfully', data: blog });
    } catch (err) {
        console.error('An error occurred:', err);
        return NextResponse.json({ message: 'Error during fetching blog' }, { status: 500 });
    }
}
