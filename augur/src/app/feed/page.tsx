// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import 'daisyui/dist/full.css';

// function Feed() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       console.log('Fetching all blogs');
//       try {
//         const response = await fetch('/api/getBlogs');
//         const data = await response.json();
//         if (response.ok) {
//           console.log('Blogs data:', data);
//           setBlogs(data.data);
//         } else {
//           console.error('Failed to fetch blogs:', data.message);
//         }
//       } catch (error) {
//         console.error('An error occurred:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-base-200 p-4">
//       <div className="drawer drawer-mobile">
//         {/* Drawer toggle checkbox */}
//         <input id="my-drawer" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content">
//           {/* Header */}
//           <header className="bg-primary text-primary-content p-4 rounded-lg mb-4 flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold">Blaugur</h1>
//               <p className="text-sm">Medium but better</p>
//             </div>
//             <label htmlFor="my-drawer" className="btn bg-blue-900 text-white hover:bg-blue-700 drawer-button">Menu</label>
//           </header>

//           {/* Alert */}
//           <div className="alert alert-info shadow-lg mb-4">
//             <div>
//               <span>Welcome to Blaugur! Check out our latest posts below</span>
//             </div>
//           </div>

//           {/* Blog Feed */}
//           <div className="grid grid-cols-1 gap-4">
//             {blogs.length === 0 ? (
//               <p>No blogs available</p>
//             ) : (
//               blogs.map((post) => (
//                 <div key={post._id} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300">
//                   <div className="card-body">
//                     <h2 className="card-title">{post.blog_title}</h2>
//                     <p className="text-sm text-gray-500">
//                       By {post.username} on {new Date(post.createdAt).toLocaleDateString()}
//                     </p>
//                     <p>{post.blog_body}</p>
//                     <div className="card-actions justify-end">
//                       <Link href={`/feed/${post._id}`}>
//                         <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300">Read More</button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Divider */}
//           <div className="divider my-8"></div>

//           {/* Footer */}
//           <footer className="footer footer-center p-4 bg-primary text-primary-content mt-8">
//             <div>
//               <p>&copy; 2024 Blaugur. All rights reserved.</p>
//             </div>
//           </footer>
//         </div>

//         {/* Sidebar */}
//         <div className="drawer-side">
//           <label htmlFor="my-drawer" className="drawer-overlay"></label>
//           <ul className="menu p-4 w-80 bg-base-100 text-base-content space-y-4">
//             <li>
//               <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300">Sign In</button>
//             </li>
//             <li>
//               <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300">Log in</button>
//             </li>
//             <li>
//               <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300">Feed</button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Feed;




'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import 'daisyui/dist/full.css';
import { useRouter } from 'next/navigation';
import { Number } from 'mongoose';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/feed')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
      });
  }, []);

  const router = useRouter();


  // some dummy data for blog posts
  // const dummyData = [
  //   {
  //     title: 'MongoDB Tutorial',
  //     author: 'John Doe',
  //     date: 'June 3, 2024',
  //     snippet: 'MongoDB is a popular NoSQL database...',
  //     blog_image: '3fe219e42ae80cdf6b33fb899a38294e'
  //   },
    // {
    //   title: 'Rickroll Tutorial',
    //   author: 'Rick Astley',
    //   date: 'April 1, 2024',
    //   snippet: 'Never gonna give you up, never gonna let you down...',
    // },
    // {
    //   title: 'React tutorial',
    //   author: 'Matt Severyn',
    //   date: 'June 3, 2024',
    //   snippet: 'React is the best framework for web development...',
    // },
  // ];

  

  const handleSignIn = () => {
    router.push('/signup');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  function truncateText(text:string, maxLength:number) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }




  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="drawer drawer-mobile">

        {/* Drawer toggle checkbox */}
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          
          {/* Header */}
          <header className="bg-primary text-primary-content p-4 rounded-lg mb-4 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Blaugur</h1>
              <p className="text-sm">A Library For Devs</p>
            </div>
            <label htmlFor="my-drawer" className="btn bg-blue-900 text-white hover:bg-blue-700 drawer-button">Menu</label>
          </header>

          {/* Alert */}
          <div className="alert alert-info shadow-lg mb-4">
            <div>
              <span>Welcome to Blaugur! Check out our latest posts below</span>
            </div>
          </div>

          {/* Blog Feed */}
          <div className="grid grid-cols-1 gap-4">
            {posts.map((post:any, index:number) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300">

                <div className="card-body">
                  <div>
                    <img src={post.blog_url} alt="blog post image" className="rounded-t-lg" style={{ width: '150px', height: '150px', objectFit: 'cover' }}/>
                  </div>
                  <h2 className="card-title">{post.blog_title}</h2>
                  <p className="text-sm text-gray-500">
                    By {post.created_by} on {post.date_created}
                  </p>
                  <p>{truncateText(post.blog_body,100)}</p>
                  <div className="card-actions justify-end">
                    <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300">Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="divider my-8"></div>

          {/* Footer */}
          <footer className="footer footer-center p-4 bg-primary text-primary-content mt-8">
            <div>
              <p>&copy; 2024 Blaugur. All rights reserved.</p>
            </div>
          </footer>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content space-y-4">
            <li>
              <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300" onClick={handleSignIn}>Sign In</button>
            </li>
            <li>
              <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300" onClick={handleLogin}>Login</button>
            </li>
            <li>
              <button className="btn bg-blue-900 text-white hover:bg-blue-700 transition-shadow duration-300">Feed</button>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Feed;