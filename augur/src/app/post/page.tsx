'use client';
import { ChangeEvent, useState } from "react";
import Editor, { EditorContentChanged } from "../Editor";

import dynamic from 'next/dynamic';
import { get } from "http";
import Nav from '../../components/Nav';
import { useRouter } from 'next/navigation';
import logo from '../../assets/blaugur-logo-blue.png';
import Image from 'next/image';

const DynamicEditor = dynamic(() => import('../Editor'), { ssr: false });

// const initialMarkdownContent = "**StartInitial** writing *something*...";

export default function Post() {
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [editorMarkdownValue, setEditorMarkdownValue] = useState<string>("");
  const [imageId, setImageId] = useState<string>("");
  const [file, setFile] = useState(null);

  const router = useRouter();

  const onBlogTitleChange =  (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setBlogTitle(event.target.value)
  };

  const onEditorContentChanged = (content: EditorContentChanged) => {
    setEditorMarkdownValue(content.markdown);
  };

  const handleFileChange = (event:any) => {
    setFile(event.target.files[0]);
  };

  const handleClick = async () => {
      // posting to s3
    if (file) {
      const data = await sendImg(file);

      const username = await getUser();
      console.log('what about here', username)

      // console.log('imageId looking on front end', imageId)
      const blogPost = {title: blogTitle, blogBody: editorMarkdownValue, blogImage: data, created_by: username }; 
      console.log('blogPost',blogPost)

  

      const response = await fetch('/api/postBlog', {
        method: 'POST',
        body: JSON.stringify(blogPost)
      });

      alert('Blog Posted Successfully');
      // window.location.reload();
      
    } else {
      console.log('No file selected');
    }
  }


  async function sendImg(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch image data');
      }
  
      const data = await response.json();
      // setImageId(data); // Update state with image ID
      return data; // Return the fetched data
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to be handled in the handleClick function
    }
  }

  async function getUser() {
    try {
      console.log('im hit')
      const response = await fetch('/api/protected')
      const data = await response.json();
      console.log('from fetch in get user',data.username)
      return data.username;
    } catch (err){
      return { message: 'Invalid token' };
    }
  };

  const handleSignIn = () => {
    router.push('/signup');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleHome = () => {
    router.push('/feed')
  }

  const handleUpdate = () => {
    router.push('/update');
  };

  const handleFeed = () => {
    router.push('/feed');
  };

  const handlePost = () => {
    router.push('/post');
  };


  return (
    <>


            {/* Sidebar */}
            
            <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content space-y-4">
           <li>
              <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300" onClick={handleHome}>Home</button>
            </li>
            <li>
              <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300" onClick={handleSignIn}>Sign In</button>
            </li>
            <li>
              <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300" onClick={handleLogin}>Login</button>
            </li>
            <li>
              <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300" onClick={handleFeed}>Feed</button>
            </li>
            <li>
              <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300" onClick={handlePost}>Post</button>
            </li>
            <li>
              <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300" onClick={handleUpdate}>Settings</button>
            </li>
          </ul>
        </div>




    <header className="bg-primarycolor text-primary-content p-0 mb-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div onClick={handleHome} className="cursor-pointer ml-8 relative w-24 h-24">
                <div>
                <Image src={logo} alt="Blaugur Logo"/>
              </div>

                </div>
              {/* <div>
                <h1 className="mt-4 text-backgroundcolor font-literata text-3xl font-semibold">Blaugur</h1>
                <p className="mb-4 text-backgroundcolor text-sm">A Library For Devs</p>
              </div> */}
            </div>
            <label htmlFor="my-drawer" className="btn bg-primarycolor text-white hover:bg-blue-700 drawer-button">Menu</label>
          </header>

      <form className="border-2 border-red-500 m-10">
      <label htmlFor="name">Blog Title</label><br />
      <input type="text" id="name" name="name" value={blogTitle} onChange={onBlogTitleChange} /><br />
      <input type="file" placeholder="Select Post Image" onChange={handleFileChange}/>
      </form>

      <div className="border-2 border-red-500 m-10">
        <DynamicEditor
        value={editorMarkdownValue}
        onChange={onEditorContentChanged}
       /> 
     </div>

     <button onClick={handleClick} className="border-2 border-red-500 p-1 m-10 rounded ">Submit Blog</button>
    </>
  );
}
