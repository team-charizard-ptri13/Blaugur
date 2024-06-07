import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import JWT from 'jsonwebtoken';
import { cookies } from 'next/headers'



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
    
    // Get username from jwt
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
        // what to do if we don't have a cookie
        return NextResponse.json({ message: 'Token is missing' }, { status: 401 })
    }
    const token = tokenCookie.value
    const SECRET_KEY = process.env.SECRET_KEY;
    if (!SECRET_KEY) {
        throw new Error('env variable is set up wrong')
    }
    const decoded = JWT.verify(token, SECRET_KEY) as { userId: string };
    const userId = decoded.userId;

    console.log('user id: ', userId)

    // return NextResponse.json({ message: true, userId })
    
    // Generate signed URLs for each blog's image
      // const imageId = something
      // const getObjectParams = {
      //   Bucket: bucketName,
      //   Key: imageId,
      // };
      
      // get the signed url
      // const command = new GetObjectCommand(getObjectParams);
      // const url = await getSignedUrl(s3, command, { expiresIn: 9999 });

    // return the signed URL
    // return NextResponse.json({ message: 'All Blogs fetched successfully', data: url });
      return NextResponse.json({ message: 'id fetched successfully'});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching id' }, { status: 500 });
  }
}