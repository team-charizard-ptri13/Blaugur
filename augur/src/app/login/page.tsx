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

  function addCol(){
    fetch('/api/login', {
      method: 'GET'
    })
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" id="" placeholder="username" />
      <input type="text" name="password" placeholder="Password"/>
      <input type="submit" />
    </form>

    </>
  )
}

export default login