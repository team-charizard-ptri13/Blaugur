import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import connectDB from '../../lib/MONGO_DB'
import Blog from '../../Model/Blog'



dotenv.config();

const bucketName = process.env.BUCKET_NAME as string;
const bucketRegion = process.env.BUCKET_REGION as string;
const accessKey = process.env.BUCKET_ACCESS_KEY as string;
const secretKey = process.env.BUCKET_SECRET as string;

interface S3ClientConfig {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
};

const s3Config: S3ClientConfig = {
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
};

const s3 = new S3Client(s3Config);



export async function GET(request:any) {
  try {
    await connectDB();
    
    // Get all blog posts
    const allBlogs = await Blog.find();
    
    // Generate signed URLs for each blog's image
    const blogsWithUrls = await Promise.all(allBlogs.map(async (blog) => {
      const imageId = blog.blog_image;
      const getObjectParams = {
        Bucket: bucketName,
        Key: imageId,
      };
      
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 9999 });
      
      // Add the signed URL to the blog object
      return { ...blog.toObject(), blog_url: url };
    }));

    return NextResponse.json({ message: 'All Blogs fetched successfully', data: blogsWithUrls });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching all blogs' }, { status: 500 });
  }
}