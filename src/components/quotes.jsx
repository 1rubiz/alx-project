import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// import Background from './particles';
import ParticlesBackground from './particles';
import FancyOpenQuote from './fancyOpenQuote';
import FancyCloseQuote from './fancyCloseQuote';

const inspirations = [
  "Believe you can and you're halfway there.",
  "Every day may not be good, but there's something good in every day.",
  "Stay positive, work hard, and make it happen.",
  "Dream big. Start small. Act now.",
  "Your limitation—it's only your imagination.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Push yourself, because no one else is going to do it for you."
];

const Quotes = () => {
  const [inspiration, setInspiration] = useState(inspirations[0]);
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  const getRandomInspiration = () => {
    const randomIndex = Math.floor(Math.random() * inspirations.length);
    setInspiration(inspirations[randomIndex]);
  };

  const fetchQuotes = async () => {
    const data = await fetch('http://localhost:5000/api/generate');
    console.log(data.json());
  }
  // useEffect(() => {
  //   fetchQuotes();
  // }, [])

  return (
    <div className="relative w-screen h-screen bg-transparent flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <div className='flex flex-wrap'>
          <img src="/quotation-mark.png" className='w-8 h-8' alt="" />
          <p className="text-lg mt-4 min-w-full text-white dark:text-gray-300 mb-6">{inspiration}</p>
          <div className='w-full flex justify-end'>
            <img src="/quote.png" alt="" className='w-8 h-8 place-self-start' />
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={getRandomInspiration}
          className="bg-blue-500 my-4 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md focus:outline-none transition duration-300"
        >
          New Inspiration ✨
        </button>
      </div>
    </div>
  );
}

export default Quotes;