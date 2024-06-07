import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';



dotenv.config();

const randomImageName = () => crypto.randomBytes(16).toString('hex');

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


async function uploadFileToS3(buffer: Buffer, fileName: string) {
  const fileBuffer = buffer;
  console.log(fileName);

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,

  };

  const command = new PutObjectCommand(params);
  s3.send(command);
};





export async function POST(request:any){
  try { 

    const formData = await request.formData();
    const file = formData.get('file') as File;

    
    if (!file) {
      return new Response(JSON.stringify({ message: 'No file selected' }));
    }
    
    const uniqueID = randomImageName();
    

    console.log('looking here',file)
    // console.log('looking here at new frile', newFile)


    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, uniqueID);


    return new Response(JSON.stringify(uniqueID));
    } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ message: 'File uploaded failed' }));;
  }
}


// export async function GET(request:any){
//   try {
//     const posts = await Blog.find({})
//     console.log('anything here?',posts)
//     return new Response(JSON.stringify(posts));
//   } catch (err){
//     return new Response(JSON.stringify({ message: 'File uploaded failed' }));;
//   }
// }

export async function GET(request:any) {
  try {
    
    const defaultImage = 'default_user_color.png'
    
    // Generate signed URLs for each blog's image

      const getObjectParams = {
        Bucket: bucketName,
        Key: defaultImage,
      };
      
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 9999 });
      
      // Add the signed URL to the blog object
      // return { defaultImage_url: url };

    return NextResponse.json({ message: 'All Blogs fetched successfully', defaultImage: url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching all blogs' }, { status: 500 });
  }
}






