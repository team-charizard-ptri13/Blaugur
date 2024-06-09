import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// import mongo db

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
    Key: randomImageName(),
    Body: fileBuffer,

  };

  const command = new PutObjectCommand(params);
  s3.send(command);
};


export async function POST(request:any){
  try { 

    const formData = await request.formData();
    const file = formData.get('file') as File;

    console.log('looking here',file)

    if (!file) {
      return new Response(JSON.stringify({ message: 'No file selected' }));
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);

    console.log('is this my url?',fileName)


    
    return new Response(JSON.stringify({ fileName }));
    } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ message: 'File uploaded failed' }));;
  }
}

export async function GET(request:any){
  try { 



    // const command = new GetObjectCommand({
    //   Bucket: bucketName,
    //   Key: fileName,
    // });
    // const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    // return new Response(JSON.stringify({ url }));
  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ message: 'File not found' }));
  }
}






