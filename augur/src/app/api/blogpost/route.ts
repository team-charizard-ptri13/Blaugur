import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { NextRequest, NextResponse } from 'next/server';
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



export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    
    console.log('im here')
    // const { id } = req.body;
    const body = await req.json();  
    const { id } = body;
    console.log('Received id:', id);

    const blog = await Blog.findById(id)


    
    // Generate signed URLs for each blog's image
    
      const imageId = blog.blog_image;

      const getObjectParams = {
        Bucket: bucketName,
        Key: imageId,
      };
      
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 9999 });
      
      const blogData = {
        ...blog._doc,
        blog_url: url,
      };

      
        // const id = req.nextUrl.searchParams.get('id');
        // if (!id) {
        //     console.log('Blog ID is required');
        //     return NextResponse.json({ message: 'Blog ID is required' }, { status: 400 });
        // }
        // const blog = await Blog.findById(id);
        // if (!blog) {
        //     console.log('Blog not found');
        //     return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        // }
        // console.log('Blog retrieved successfully:', blog);


  

    return NextResponse.json({ message: 'Blog fetched successfully', data: blogData });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching all blogs' }, { status: 500 });
  }
}








// export async function GET(req: NextRequest, res: NextResponse) {
//     try {
//         await connectDB();
//         const id = req.nextUrl.searchParams.get('id');
//         if (!id) {
//             console.log('Blog ID is required');
//             return NextResponse.json({ message: 'Blog ID is required' }, { status: 400 });
//         }
//         const blog = await Blog.findById(id);
//         if (!blog) {
//             console.log('Blog not found');
//             return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
//         }
//         console.log('Blog retrieved successfully:', blog);
//         return NextResponse.json({ message: 'Blog retrieved successfully', data: blog });
//     } catch (err) {
//         console.error('An error occurred:', err);
//         return NextResponse.json({ message: 'Error during fetching blog' }, { status: 500 });
//     }
// }
