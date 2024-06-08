import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/MONGO_DB';
import Blog from '../../Model/Blog';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        console.log("Connecting to MongoDB...");
        await connectDB();
        console.log("MongoDB connected successfully.");

        console.log("Fetching blogs from database...");
        const blogs = await Blog.find();
        console.log("Blogs fetched successfully:", blogs);

        return NextResponse.json({ message: 'Blogs retrieved successfully', data: blogs });
    } catch (err) {
        console.error('An error occurred during fetching blogs:', err);
        return NextResponse.json({ message: 'Error during fetching blogs', error: err.message }, { status: 500 });
    }
}
