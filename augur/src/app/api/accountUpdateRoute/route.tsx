import db from '../../../../SQL_DB'; // Import your database connection
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();  

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //if only the username is being updated, not the profile pic
     if(body.awsImageId === null){
        //update username
       const query = `
       UPDATE users
       SET username = $1
       WHERE id = $2
      `;

       const VALUES = [body.updatedUserName, body.originalUserInfo.userId];
       console.log('VALUES', VALUES)
       // Update the user's username in the database
       await db.query(query, VALUES);
   
       // Return a success response
       return NextResponse.json({ success: true });

    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //if only the user profile pic is being updated, not the username
     if(body.updatedUserName === null){
        //update username
        const query = `
        UPDATE users
        SET user_pic = $1
        WHERE id = $2
      `;

      // console.log(body, 'body')
      // console.log('body.awsImageId', body.awsImageId)

       const VALUES = [body.awsImageId, body.originalUserInfo.userId];
       console.log('VALUES', VALUES)
       // Update the user's username in the database
       await db.query(query, VALUES);
   
       // Return a success response
       return NextResponse.json({ success: true });

    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //if username and profile pic is updated
    if(body.awsImageId && body.updatedUserName){
      // Update the user's username and user_pic in the database
        const query = `
         UPDATE users
         SET username = $1, user_pic = $2
         WHERE id = $3
        `;

        const VALUES = [body.updatedUserName,body.awsImageId, body.originalUserInfo.userId];
       console.log('VALUES', VALUES)
       // Update the user's username in the database
       await db.query(query, VALUES);
   
       // Return a success response
       return NextResponse.json({ success: true });

    }
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json({ success: false, error: 'Failed to update username' });
  }
}
