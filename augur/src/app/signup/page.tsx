'use client';
import React from 'react'
import { useRouter } from "next/navigation";

function signup() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const loginData = { username: username, password: password };

    try{
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(loginData)
      })
      .then(res=> res.json())
      .then(resData => {
        console.log('response in page.tsx', resData.response)
        if(resData.response==='exists'){
          alert('Username already exists')
        } else if(resData.response[1] === ''){
          alert('Please enter a password')
        } else {
          alert('Signup Successful')
          router.push('/')
        }
      })
    } catch (err){
      console.log('An error occured in signup page', err)
    }
    
  };


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" id="" placeholder="username" />
      <input type="text" name="password" placeholder="Password"/>
      <input type="submit" />
    </form>
  )
}

export default signup