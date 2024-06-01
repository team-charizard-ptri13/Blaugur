import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../SQL_DB';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('looking here', body);
    const queryStr = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    const VALUES = [body.username, body.password];
    await db.query(queryStr, VALUES);
  } catch (err) {
    console.error('An error occurred:', err);
    return NextResponse.json({ message: 'error' });
  }
  return NextResponse.json({ message: 'User sucsessfully has signed up' });
};