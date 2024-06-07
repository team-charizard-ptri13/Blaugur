import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../SQL_DB';
import JWT from 'jsonwebtoken';
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('looking here', body);
    
    const existingUserQuery = 'SELECT * FROM users WHERE username = $1';
    const existingUser = await db.query(existingUserQuery, [body.username]);

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ response: 'exists' }, { status: 400 });
    }
    const SECRET_KEY = process.env.SECRET_KEY

    if (!SECRET_KEY) {
      throw new Error('env variable is set up wrong')
    }

    const VALUES = [body.username, body.password];
    if(body.password !== ''){
      const queryStr = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
      const result = await db.query(queryStr, VALUES);
      const id = result.rows[0].id;
      const token = JWT.sign({ userId: id }, SECRET_KEY, {
        expiresIn: '1h',
      });
      cookies().set('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });
    } else throw new Error('Empty string for password')

    return NextResponse.json({ response: VALUES });
   
  } catch (err) {
    console.error('An error occurred:', err);
    return NextResponse.json({ message: 'error' });
  }

};