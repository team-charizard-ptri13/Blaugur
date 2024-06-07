import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../SQL_DB';
import JWT from 'jsonwebtoken';
import { cookies } from 'next/headers'
import dotenv from 'dotenv'
import { describe } from 'node:test';
dotenv.config({ path: '../../../.env'})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const queryStr = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const VALUES = [body.username, body.password];
    const result = await db.query(queryStr, VALUES);
    console.log('looking at the result of db call',result.rows);
    if (!result.rows.length) {
      return NextResponse.json({ message: false });
    } else{ 
      const id = result.rows[0].id;
      const SECRET_KEY = process.env.SECRET_KEY

      if (!SECRET_KEY) {
        throw new Error('env variable is set up wrong')
      }
      const token = JWT.sign({ userId: id }, SECRET_KEY, {
        expiresIn: '1h',
      });
      cookies().set('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });
      return NextResponse.json({ message: true });
    }
  } catch (err) {
    console.error('An error occurred:', err);
    return NextResponse.json({ message: 'error during login' });
  }
};

