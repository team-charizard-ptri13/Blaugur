'use client';
import React from 'react'
import { useRouter } from "next/navigation";

function login() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    
    if (!password) {
      alert('Please enter a password');
      return;
    }
    
    const loginData = { username: username, password: password };
    
    try{
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(loginData)
      })
      const data = await response.json();
      if (data.message === true) router.push('/feed');
      else alert('Invalid credentials.');
    } catch (err){
      console.log('An error occured in signup page', err)
    }
    
  };


  return (
    // <form onSubmit={handleSubmit}>
      // <input type="text" name="username" id="" placeholder="username" />
      // <input type="text" name="password" placeholder="Password"/>
      // <input type="submit" />
    // </form>
    <div className="max-h-screen min-h-screen">
      <div className="bg-backgroundcolor text-primarycolor px-12 mb-48">
        <nav className="p-4">
          <a href="/" className="text-3xl font-literata font-semibold no-underline">Blaugur</a>
          {/* <div className="flex gap-4">
            <button onClick={handleLoginClick} className="border-none rounded-full py-3 px-8 text-base transition-colors duration-300 transform hover:scale-110 font-lexend cursor-pointer">
              Log In
            </button>
            <button onClick={handleSignupClick} className="bg-secondarycolor text-white border-none rounded-full py-3 px-8 text-base transition-colors duration-300 transform hover:scale-110 font-lexend cursor-pointer">
              Sign Up
            </button>
          </div> */}
        </nav>
      </div>
      <div className="text-textcolor font-light font-lexend bg-backgroundcolor flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border-b-2 border-secondarycolor bg-transparent p-2 w-full transition duration-200 focus:outline-none focus:border-primarycolor"
            />
          </div>
          <div className="mb-8">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border-b-2 border-secondarycolor bg-transparent p-2 w-full transition duration-200 focus:outline-none focus:border-primarycolor"
            />
          </div>
          <div className="flex justify-center mb-4">
            <input
              type="submit"
              value="Log In"
              className="bg-secondarycolor border-none rounded-full py-3 px-8 text-base transition-colors duration-300 transform hover:scale-110 hover:bg-primarycolor hover:text-backgroundcolor cursor-pointer"
            />
          </div>
          <div className="flex justify-center">
            <a className="cursor-pointer transform hover:underline" href="/signup">Register Now</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default login