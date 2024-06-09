import React from "react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push('/login')
  };
  const handleSignupClick = () => {
    router.push('/signup')
  };
  return (
    <div className="bg-backgroundcolor text-primarycolor px-12">
      <nav className="flex justify-between items-center p-4">
        <a href="/" className="text-3xl font-literata font-semibold no-underline">Blaugur</a>
        <div className="flex gap-4">
          <button onClick={handleLoginClick} className="border-none rounded-full py-3 px-8 text-base transition-colors duration-300 transform hover:scale-110 font-lexend cursor-pointer">
            Log In
          </button>
          <button onClick={handleSignupClick} className="bg-secondarycolor text-white border-none rounded-full py-3 px-8 text-base transition-colors duration-300 transform hover:scale-110 font-lexend cursor-pointer">
            Sign Up
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Nav;