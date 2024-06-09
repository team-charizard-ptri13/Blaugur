"use client";
import React, { useState } from 'react';


function Page() {

  function sendImg(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    fetch('/api/image', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

  const [file, setFile] = useState(null);

  const handleFileChange = (event:any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    if (file) {
      sendImg(file);
    } else {
      console.log('No file selected');
    }
  };

  return (
    <>
      <div>page</div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default Page;
