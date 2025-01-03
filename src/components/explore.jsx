import { useState } from "react";
import { IoClose } from 'react-icons/io5'
import toast from "react-hot-toast";
import QuoteGenerator from './QuoteGenerator'

const Explore = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`absolute z-50 top-0 left-0 w-full bg-white shadow-lg transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      style={{ height: '100%' }}
    >
      <IoClose className="absolute top-4 right-4 z-50 font-bold text-3xl cursor-pointer" onClick={() => setIsOpen(false)} />
      <ExploreSheet />
    </div>
  );
};

export default Explore;

const ExploreSheet = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <QuoteGenerator/>
    </div>
  );
};