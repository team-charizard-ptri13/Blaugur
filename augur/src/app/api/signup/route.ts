import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../SQL_DB';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('looking here', body);

    const existingUserQuery = 'SELECT * FROM users WHERE username = $1';
    const existingUser = await db.query(existingUserQuery, [body.username]);

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ response: 'exists' }, { status: 400 });
    }

    const VALUES = [body.username, body.password];
    if(body.password !== ''){
      const queryStr = 'INSERT INTO users (username, password) VALUES ($1, $2)';
      await db.query(queryStr, VALUES);
    }
     
      return NextResponse.json({ response: VALUES });
   
  } catch (err) {
    console.error('An error occurred:', err);
    return NextResponse.json({ message: 'error' });
  }

};