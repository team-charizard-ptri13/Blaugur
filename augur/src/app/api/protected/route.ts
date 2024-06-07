import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../SQL_DB';
import JWT from 'jsonwebtoken';
import { cookies } from 'next/headers'
import dotenv from 'dotenv'
dotenv.config({ path: '../../../.env'})

export async function GET(req: NextRequest) {
  try {
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

    return NextResponse.json({ message: true, userId })
  } catch (err) {
    console.error('An error occurred:', err);
    return NextResponse.json({ message: 'Invalid token' });
  }
};