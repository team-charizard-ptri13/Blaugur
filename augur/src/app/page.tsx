'use client';

import { set } from "mongoose";
import Link from "next/link"
import React from "react";
import { useState } from "react";


import { useRouter } from "next/navigation";



function Home() {

  const [loginData, setLoginData] = useState({username : '', password : ''});
  const router = useRouter();

  interface LoginData {
    username: string;
    password: string;
  }

  interface ApiResponse {
    message: string;
  }

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const loginData = { username: username, password: password };
    response(loginData);
  };
  
  
    // Send data to the API route for validation
    const response = async (data: LoginData) => {
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        const result: ApiResponse = await res.json(); 
        if (!result.message) {
          alert('Invalid login');
          return;
        } else {
          router.push('/feed');
        }

      } catch (error) {
        console.error('An error occurred:', error);
      }
    };



  return <>
    <h1 className="text-4xl font-semibold">Welcome to Blaugur</h1>
    <h2 className="text-xl font-extralight">A Place For Devs & Their Thoughts</h2>
    <Link className="text-green-400" href="/signup">Signup</Link>

    <form onSubmit={submitLogin}>
      <input type="text" name="username" id="" placeholder="username" />
      <input type="text" name="password" placeholder="Password"/>
      <input type="submit" />
    </form>
  </> 
  
}

export default Home;
