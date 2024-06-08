'use client'
import React from 'react'; 
import { ChangeEvent, useState } from "react";
import { useRouter } from 'next/navigation';

const update = () => {
    const [updatedUserName, setUpdatedUserName] = useState<string>("");
    const [file, setFile] = useState(null);
    const router = useRouter();
    

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
  

   const onBackToFeed = () => {
      router.push('/feed')
   }

    return (
      <div className="flex flex-col  bg-base-200 p-4 ">

      <header className="bg-primarycolor text-primary-content p-4 rounded-lg  flex justify-between items-center ">
            <div>
              <h1 className="text-3xl font-bold hover:text-yellow-300" onClick={onBackToFeed} >Blaugur</h1>
              <p className="text-sm">A Library For Devs</p>
            </div>
          </header>

          
        <div className='flex border-2 flex-col min-h-screen justify-center items-center rounded border-none	'>
          
            <div className='flex flex-col border-4 h-2/4 w-2/4 font-literata bg-secondarycolor rounded-3xl p-8 border-double 	'>
            <form className="border-2 border-backgroundcolor rounded ">
                <input className="w-full "type="text" id="name" name="name" placeholder='New Username' value={updatedUserName} onChange={onUsernameChange} /><br />
            </form>
            <form className="border-2 border-inherit rounded flex flex-col mt-5 ">
            <label className='text-center' htmlFor='file'>Select New Profile Pic</label>
             <input type="file" title="Update Profile Picture" name="profile picture" onChange={handleFileChange}/>
            </form>

            <button onClick={handleClick} className="border-2 p-1  mt-5 rounded "> Update Account</button>
            <button onClick={onBackToFeed} className="border-2 border-red-500 p-1 mt-5 rounded "> Back To Feed</button>
            </div>
        </div>
        
        {/* Footer */}
        <footer className="footer footer-center p-4 bg-primary text-primary-content bg-primarycolor">
            <div>
              <p>&copy; 2024 Blaugur. All rights reserved.</p>
            </div>
          </footer>
       
        </div>
    )
}

export default update; 


