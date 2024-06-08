'use client'
import React from 'react'; 
import { ChangeEvent, useState } from "react";

const update = () => {
    const [updatedUserName, setUpdatedUserName] = useState<string>("");
    const [file, setFile] = useState(null);
    

    const onUsernameChange =  (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setUpdatedUserName(event.target.value)
      };

      const handleFileChange = (event:any) => {
        setFile(event.target.files[0]);
      };
    
      const handleClick = async () => {
      //Get the original username via JWT
       const firstUsername = await fetch('/api/protected',{
          method: 'POST'
        })
      const originalUserInfo = await firstUsername.json()

        //////////////////////////////////////////////////////////////////////////////////////////////////
        //If the profile image only has been updated ... post to AWS s3
      if (file && !updatedUserName) {

        //CREATE AND GET IMAGE ID FROM AWS S3
          const formData = new FormData();
          formData.append('file', file);
        
         const awsImageId = await fetch('/api/image', {
           method: 'POST',
           body: formData,
         })
         const awsId = await awsImageId.json()

         const userInfoObj = {originalUserInfo: originalUserInfo, updatedUserName: null, awsImageId: awsId}
          // RUN POSTGRES COMMAND IN HERE
           await fetch('/api/accountUpdateRoute',{
           method: 'POST',
           body: JSON.stringify(userInfoObj)
         })
      } 
        //////////////////////////////////////////////////////////////////////////////////////////////////
        //if the username only was updated ... find the original username
      if(!file && updatedUserName){
        const userInfoObj = {originalUserInfo: originalUserInfo, updatedUserName: updatedUserName, awsImageId: null}
        // RUN POSTGRES COMMAND IN HERE
        await fetch('/api/accountUpdateRoute',{
          method: 'POST',
          body: JSON.stringify(userInfoObj)
        })
      }

        //////////////////////////////////////////////////////////////////////////////////////////////////
        //if username and profile image were updated
         if(file && updatedUserName){
           //CREATE AND GET IMAGE ID FROM AWS S3
           const formData = new FormData();
           formData.append('file', file);
        
            const awsImageId = await fetch('/api/image', {
              method: 'POST',
              body: formData,
            })
            const awsId = await awsImageId.json()

            const userInfoObj = {originalUserInfo: originalUserInfo, updatedUserName: updatedUserName, awsImageId: awsId}
              // RUN POSTGRES COMMAND IN HERE
              await fetch('/api/accountUpdateRoute',{
                method: 'POST',
                body: JSON.stringify(userInfoObj)
            })
          }

        
    }
  

   

    return (

        <div className='flex border-2 flex-col border-red-500 h-screen justify-center items-center'>
            <div className='flex flex-col border-2 h-2/4 w-2/4'>
            <form className="border-2 border-red-500 m-10">
                <input type="text" id="name" name="name" placeholder='User Name' value={updatedUserName} onChange={onUsernameChange} /><br />
                <input type="file" placeholder="Select Post Image" onChange={handleFileChange}/>
            </form>
            <button onClick={handleClick} className="border-2 border-red-500 p-1 m-10 rounded ">Submit Blog</button>
            </div>
        </div>
    )
}

export default update; 


