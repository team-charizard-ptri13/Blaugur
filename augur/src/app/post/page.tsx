'use client';
import { ChangeEvent, useState } from "react";
import Editor, { EditorContentChanged } from "../Editor";

import dynamic from 'next/dynamic';
import { get } from "http";


const DynamicEditor = dynamic(() => import('../Editor'), { ssr: false });

// const initialMarkdownContent = "**StartInitial** writing *something*...";

export default function Post() {
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [editorMarkdownValue, setEditorMarkdownValue] = useState<string>("");
  const [imageId, setImageId] = useState<string>("");
  const [file, setFile] = useState(null);

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


  return (
    <>
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
