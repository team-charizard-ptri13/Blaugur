'use client';
import { useState } from "react";
import Editor, { EditorContentChanged } from "../Editor";

import dynamic from 'next/dynamic';

const DynamicEditor = dynamic(() => import('../Editor'), { ssr: false });

// const initialMarkdownContent = "**StartInitial** writing *something*...";

export default function Post() {
  const [editorMarkdownValue, setEditorMarkdownValue] = useState<string>("");

  const onEditorContentChanged = (content: EditorContentChanged) => {
    setEditorMarkdownValue(content.markdown);
  };

  const handleClick = () => {
    console.log('markdown', editorMarkdownValue)
  }

  return (
    <div className="border-2 border-red-500 m-10">
      <DynamicEditor
        // value={initialMarkdownContent}
        onChange={onEditorContentChanged}
      /> 
      <button onClick={handleClick} className="border-2 border-red-500 p-1 m-1 rounded ">Submit Blog</button>
    </div>
  );
}
