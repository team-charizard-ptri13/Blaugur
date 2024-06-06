import Image from 'next/image';
import React from 'react';
import imgHeader from './images/img-header.png'

const Hero = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-backgroundcolor px-0 py-0">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="w-6/12 h-6/12 relative">
          <Image 
            src={imgHeader}
            alt="Decorative Image" 
          />
        </div>
        <div className="text-center md:text-left text-textcolor">
        <h1 className="text-6xl font-bold font-literata leading-tight">
            The <br className="hidden md:block" />
            <span className="italic">&lt;Developers&gt;</span> <br className="hidden md:block" />
            Library
          </h1>
          <p className="mt-4 font-lexend text-xl">
            A place for all things tech and dev related.
          </p>
          <a href="#" className="text-primarycolor inline-block mt-6 hover:underline">
            Start Reading &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
