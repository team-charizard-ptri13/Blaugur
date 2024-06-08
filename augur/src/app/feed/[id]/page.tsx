'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import 'daisyui/dist/full.css';

function BlogDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        console.log('Fetching blog with ID:', id);
        try {
          const response = await fetch(`/api/getBlog?id=${id}`);
          const data = await response.json();
          if (response.ok) {
            console.log('Blog data:', data);
            setBlog(data.data);
          } else {
            console.error('Failed to fetch blog:', data.message);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>No blog found.</div>;
  }

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
            By {blog.username} on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <p>{blog.blog_body}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
