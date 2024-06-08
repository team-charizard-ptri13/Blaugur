import React from 'react';
import Image from 'next/image';
import img1 from './images/img-01.png';
import img2 from './images/img-02.png';
import img3 from './images/img-03.png';
import img4 from './images/img-04.png';

interface SectionProps {
  title: string;
  subtitle: string;
  linkText: string;
  imgSrc: any;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, linkText, imgSrc }) => (
  <div className="bg-secondarycolor rounded-lg p-8 flex flex-col md:flex-row justify-between items-center">
    <div className="text-textcolor text-center md:text-left mb-4 md:mb-0">
      <h3 className="text-4xl break-words">{title}</h3>
      <a href="#" className="mt-4 text-primarycolor hover:underline">
        {linkText} &rarr;
      </a>
    </div>
    <div className="w-48s h-48 md:w-48 md:h-48 relative">
      <Image src={imgSrc} alt={title} layout="fill" objectFit="contain" />
    </div>
  </div>
);

const MultiSection: React.FC = () => {
  return (
    <div className="font-lexend font-normal bg-backgroundcolor w-full px-24 py-16 grid gap-8 grid-cols-1 md:grid-cols-2 mb-24">
      <div className="bg-secondarycolor rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-textcolor text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-4xl break-words mb-16">Tell your <br className="hidden md:block" />own story</h3>
          <a href="#" className="mt-4 text-primarycolor hover:underline">
            Start telling yours &rarr;
          </a>
        </div>
        <div className="w-48s h-48 md:w-48 md:h-48 relative">
          <Image src={img1} alt='Tell your own story'/>
        </div>
      </div>
      <div className="bg-secondarycolor rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-textcolor text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-4xl break-words mb-16">Teach your <br className="hidden md:block" />own way</h3>
          <a href="#" className="mt-4 text-primarycolor hover:underline">
            Click to teach your way &rarr;
          </a>
        </div>
        <div className="w-48s h-48 md:w-48 md:h-48 relative">
          <Image src={img2} alt='Teach your own way'/>
        </div>
      </div>
      <div className="bg-secondarycolor rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-textcolor text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-4xl break-words mb-16">Learn from <br className="hidden md:block" />developers</h3>
          <a href="#" className="mt-4 text-primarycolor hover:underline">
            Meet other developers &rarr;
          </a>
        </div>
        <div className="w-48s h-48 md:w-48 md:h-48 relative">
          <Image src={img3} alt='Learn from developers'/>
        </div>
      </div>
      <div className="font-literata bg-primarycolor rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-textcolor text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-backgroundcolor text-5xl break-words mb-12">Join today <br className="hidden md:block" />for free</h3>
          <button className="bg-secondarycolor border-none rounded-full py-3 px-12 text-base transition-colors duration-300 transform hover:scale-110 font-lexend cursor-pointer">
            Join Now
          </button>
        </div>
        <div className="w-48s h-48 md:w-48 md:h-48 relative">
          <Image src={img4} alt='Join today for free'/>
        </div>
      </div>
    </div>
  );
};

export default MultiSection;
