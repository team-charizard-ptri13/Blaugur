import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoArrowUpCircle } from "react-icons/io5";
import { SiX } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-secondarycolor text-primarycolor py-12">
      <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-4xl font-literata font-semibold">Blaugur</h2>
          <p className="mt-16 font-extralight font-lexend">&copy; 2024 Company. All Rights Reserved.</p>
        </div>
        <div className="text-center md:text-left mb-8 md:mb-0 font-lexend">
          <p className="font-extralight">Email</p>
          <a href="mailto:hello@augur.com" className="font-normal text-xl">hello@blaugur.com</a>
          <p className="mt-8 font-extralight">Contact Us</p>
          <a href="tel:+19998887654" className="text-xl">+1 999 888-7654</a>
        </div>
        <div className="text-center md:text-right">
          <div className="flex justify-end w-full mb-14">
            <a href="#" className="block mb-4">
              <IoArrowUpCircle className="text-4xl" />
            </a>
          </div>
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="#" aria-label="Instagram">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="#" aria-label="X">
              <SiX className="text-2xl" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
