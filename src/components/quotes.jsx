import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-gray-800 dark:bg-gray-900 flex items-center justify-center p-4" style={{ backgroundImage: "url('/one.jpg')" }}>
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        {/* SVG Animation Placeholder */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-24 h-24 animate-bounce text-blue-500"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" />
            <path
              d="M30 50 Q 50 20, 70 50 T 110 50"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </div>

        {/*Display*/}
        <StyledWrapper>
          <div className={`book ${isOpened ? 'opened' : ''}`}>
            <p>Hello</p>
            <div className="cover">
              <h1 className="text-2xl font-bold mt-4 text-gray-800 dark:text-gray-100 mb-4">
                Daily Inspiration
              </h1>
            </div>
          </div>
          {/*<button onClick={handleClick}>Toggle Book</button>*/}
        </StyledWrapper>

        {/*<p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{inspiration}</p>*/}

        {/* Buttons */}
        <button
          onClick={handleClick}
          className="bg-blue-500 my-4 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md focus:outline-none transition duration-300"
        >
          New Inspiration ✨
        </button>
      </div>
    </div>
  );
}


const StyledWrapper = styled.div`
  .book {
    position: relative;
    border-radius: 10px;
    width: 100%;
    height: 400px;
    background-color: whitesmoke;
    -webkit-box-shadow: 1px 1px 7px #000;
    box-shadow: 1px 1px 7px #000;
    -webkit-transform: preserve-3d;
    -ms-transform: preserve-3d;
    transform: preserve-3d;
    -webkit-perspective: 2000px;
    perspective: 2000px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    transition: transform 0.5s;
  }

  .cover {
    top: 0;
    position: absolute;
    background-color: #f3f4f6;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform-origin: 0;
    -ms-transform-origin: 0;
    transform-origin: 0;
    -webkit-box-shadow: 1px 1px 12px #000;
    box-shadow: 1px 1px 12px #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .book.opened .cover {
    -webkit-transform: rotateY(-80deg);
    -ms-transform: rotateY(-80deg);
    transform: rotateY(-80deg);
  }

  p {
    font-size: 20px;
    font-weight: bolder;
  }

  button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #45a049;
  }
`;

export default Quotes;