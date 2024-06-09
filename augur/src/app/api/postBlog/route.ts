import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/MONGO_DB'
import Blog from '../../Model/Blog'
import { create } from 'domain';


export async function POST(req: NextRequest, res: NextResponse) {
    try {
      await connectDB();
      const { title, blogBody, blogImage, created_by }: { title: string, blogBody: string, blogImage: string, created_by: string } = await req.json();  
      // console.log(title, blogBody);
      // console.log('is my created by here?: ', created_by)
  
      const currentDate = new Date();
      
      
      if (!title || !blogBody) {
        return NextResponse.json({ message: 'Both title, blogBody, and blogImage are required' }, { status: 400 });
      }
  
      const newBlogPost = new Blog({ blog_title: title, blog_body: blogBody, blog_image: blogImage,date_created: currentDate, created_by: created_by});
      console.log('full post created',newBlogPost)
      const savedBlog = await newBlogPost.save();
      
      return NextResponse.json({ message: 'Blog POST CREATED SUCCESSFULLY', data: savedBlog });
    } catch (err) {
      console.error('An error occurred:', err);
      return NextResponse.json({ message: 'Error during creating blog post' }, { status: 500 });
    }
  };
  