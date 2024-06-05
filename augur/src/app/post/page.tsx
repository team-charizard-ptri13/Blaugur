'use client';
import { ChangeEvent, useState } from "react";
import Editor, { EditorContentChanged } from "../Editor";

import dynamic from 'next/dynamic';

const DynamicEditor = dynamic(() => import('../Editor'), { ssr: false });

// const initialMarkdownContent = "**StartInitial** writing *something*...";

export default function Post() {
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [editorMarkdownValue, setEditorMarkdownValue] = useState<string>("");

  const onBlogTitleChange =  (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setBlogTitle(event.target.value)
    // console.log(blogTitle)
  };

  const onEditorContentChanged = (content: EditorContentChanged) => {
    setEditorMarkdownValue(content.markdown);
  };

  const handleClick = async () => {
    const blogPost = {title: blogTitle, blogBody: editorMarkdownValue}; 
    console.log(blogPost)
    const response = await fetch('/api/postBlog', {
      method: 'POST',
      body: JSON.stringify(blogPost)
    })
    console.log('markdown', editorMarkdownValue)
  }

  return (
    <>
      <form className="border-2 border-red-500 m-10">
      <label htmlFor="name">Blog Title</label><br />
      <input type="text" id="name" name="name" value={blogTitle} onChange={onBlogTitleChange} /><br />
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
