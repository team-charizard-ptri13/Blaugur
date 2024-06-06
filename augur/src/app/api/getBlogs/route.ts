import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/MONGO_DB';
import Blog from '../../Model/Blog';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        await connectDB();
        const blogs = await Blog.find();
        return NextResponse.json({ message: 'Blogs retrieved successfully', data: blogs });
    } catch (err) {
        console.error('An error occurred:', err);
        return NextResponse.json({ message: 'Error during fetching blogs' }, { status: 500 });
    }
}
