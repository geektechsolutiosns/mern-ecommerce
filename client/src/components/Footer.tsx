import { FC } from 'react';
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer: FC = () => {
  return (
    <div className='mt-5 bg-[#121134] text-white py-8 text-center'>
      <div className='max-w-6xl mx-auto'>
        <p className='text-lg'>Connect with Us</p>
        <div className='flex justify-center items-center mt-4'>
          <a href='#' className='mx-4 hover:text-gray-300'>
           <FaFacebook className="text-2xl"/>
          </a>
          <a href='#' className='mx-4 hover:text-gray-300'>
            <FaTwitter className="text-2xl"/>
          </a>
          <a href='#' className='mx-4 hover:text-gray-300'>
            <FaInstagram className="text-2xl"/>
          </a>
        </div>
        <p className='mt-4'>© 2024 Dhamala Ecom. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
