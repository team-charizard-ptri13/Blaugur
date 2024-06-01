import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../SQL_DB';



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const queryStr = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const VALUES = [body.username, body.password];
    const result = await db.query(queryStr, VALUES);
    console.log('looking at the ersult of db call',result.rows);
    if (!result.rows.length) {
      return NextResponse.json({ message: false });
    } else{ 
      return NextResponse.json({ message: true });
    }
  } catch (err) {
    console.error('An error occurred:', err);
    return NextResponse.json({ message: 'error during login' });
  }
};