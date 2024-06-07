'use client';
import { ChangeEvent, useState } from "react";
import Editor, { EditorContentChanged } from "../Editor";

import dynamic from 'next/dynamic';

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
      await sendImg(file);
      console.log('imageId looking on front end', imageId)
      const blogPost = {title: blogTitle, blogBody: editorMarkdownValue, blogImage: imageId}; 
      console.log('blogPost',blogPost)

      const response = await fetch('/api/postBlog', {
        method: 'POST',
        body: JSON.stringify(blogPost)
      })
      
    } else {
      console.log('No file selected');
    }
  }

  function sendImg(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    fetch('/api/image', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('this is my response',data);
      setImageId(data)
      return data;
    })
    .catch(error => console.error('Error:', error));
  }



  return (
    <>
      <form className="border-2 border-red-500 m-10">
      <label htmlFor="name">Blog Title</label><br />
      <input type="text" id="name" name="name" value={blogTitle} onChange={onBlogTitleChange} /><br />
      <input type="file" placeholder="Select Post Image" onChange={handleFileChange}/>
      </form>

      <div className="border-2 border-red-500 m-10">
        <DynamicEditor
        // value={initialMarkdownContent}
        onChange={onEditorContentChanged}
       /> 
     </div>

     <button onClick={handleClick} className="border-2 border-red-500 p-1 m-10 rounded ">Submit Blog</button>
    </>
  );
}
