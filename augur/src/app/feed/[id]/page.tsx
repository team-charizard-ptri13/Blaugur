'use client';

import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation'

import 'daisyui/dist/full.css';
import { set } from 'mongoose';
import { response } from 'express';
import { The_Nautigal } from 'next/font/google';
import Markdown from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import marked from 'marked';

function BlogDetail() {
  const router = useRouter();

  
  const [blog, setBlog] = useState<Blog>({_id: {}, blog_title: '', blog_body: '', blog_image: '', created_by: '', date_created: '', blog_url: '', createdAt: '', updatedAt: '', __v: 0});
  const [loading, setLoading] = useState(true);

  interface Blog {
    _id: object;
    blog_title: string;
    blog_body: string;
    blog_image: string;
    created_by: string;
    date_created: string;
    blog_url: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }


  const pathname = usePathname()
  const searchParams = useSearchParams()
  let url = `${pathname}`
  url = url.slice(6)

  useEffect(() => {
    console.log('blog state: ', blog);
  }, [blog]); // Log the state whenever it changes
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('url: ', url);
  
        const response = await fetch('/api/blogpost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: url }),
        });
        const data = await response.json();
        setBlog(data.data);
      } catch (error) {
        console.log('error in use fetch data:', error);
      }
    };
  
    fetchData();
  }, []);




  return (
    <div className="min-h-screen bg-base-200 p-4">
      <header className="bg-primary text-primary-content p-4 rounded-lg mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blaugur</h1>
        <button className="btn bg-blue-900 text-white hover:bg-blue-700" onClick={() => router.push('/feed')}>Back to Feed</button>
      </header>

      <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="card-body">
          <h2 className="card-title">{blog.blog_title}</h2>
          <p className="text-sm text-gray-500">
            By {blog.created_by} on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <div>
            <img src={blog.blog_url} alt="Blog Image" className="rounded-lg w-full h-60 object-cover" />
          </div>
          <div>{blog.blog_body}</div>
        </div>
      </div>
    </div>
  );


}



export default BlogDetail;
