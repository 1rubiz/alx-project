import React, { useEffect, useState } from 'react';
import { FaHeart, FaHeartCrack, FaCircleStop, FaTrash } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import useQuotesStore from '../stores/quoteStore';
import quotes from '../lib/quotes';
import { motion, AnimatePresence } from "framer-motion";
import CustomQuote from './customQuote';
import ImageUpload from './drag&drop';

const Quotes = () => {
  const [inspiration, setInspiration] = useState(quotes[0]);
  const [isOpened, setIsOpened] = useState(false);
  const [liked, setLiked] = useState(false)
  const { items, toggleItem, exists, removeItem, clearAll } = useQuotesStore();
  const [showFirst, setShowFirst] = useState(true);

  const toggleComponents = () => {
    setShowFirst(!showFirst);
  };

  const slideVariants = {
    enterFromLeft: {
      x: "-100%",
      opacity: 0,
    },
    enterFromRight: {
      x: "100%",
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exitToLeft: {
      x: "-100%",
      opacity: 0,
    },
    exitToRight: {
      x: "100%",
      opacity: 0,
    },
  };

  useEffect(() => {
    if (inspiration) {
      setLiked(exists(inspiration))
    }
  }, [inspiration, items])


  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  const getRandomInspiration = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setInspiration(quotes[randomIndex]);
  };

  const selectQuote = (item) => {
    setInspiration(item)
    setIsOpened(false)
  }

  return (
    <div className="relative w-screen h-screen bg-transparent flex flex-col items-center justify-center p-4">
      <button
        onClick={toggleComponents}
        className="absolute top-5 right-5 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
      >
        Toggle
      </button>
      <AnimatePresence mode="wait">
        {showFirst ? (
          <motion.div
            key="first"
            className=""
            initial="enterFromRight"
            animate="center"
            exit="exitToLeft"
            variants={slideVariants}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
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
            <div className="max-w-md my-4 w-full bg-white/10 backdrop-blur-lg dark:bg-gray-800 rounded-lg shadow-lg px-6 py-2">
              <div className='text-center grid grid-cols-12 items-center justify-between my-2 gap-2'>
                <button
                  onClick={() => setIsOpened(true)}
                  className="bg-blue-500 hover:bg-blue-600 col-span-5 text-white text-xs md:text-base px-4 py-2 rounded-md shadow-md focus:outline-none transition duration-300"
                >
                  Favourites ✨
                </button>
                <button
                  onClick={() => toggleItem(inspiration)}
                  className={`${liked ? 'bg-red-500 hover:bg-red-300' : 'bg-gray-400 hover:bg-blue-200'}  text-white px-4 py-2 col-span-2 flex items-center justify-center rounded-md shadow-md focus:outline-none transition duration-300`}
                >
                  {
                    liked ? <FaHeart className='w-full h-6' /> : <FaHeartCrack className='w-full h-6' />
                  }
                </button>
                <button
                  className="bg-green-600 hover:bg-green-300 col-span-5 text-xs md:text-base text-white px-4 py-2 rounded-md shadow-md focus:outline-none transition duration-300 flex items-center justify-center gap-2"
                >
                  Download
                </button>
                {/*<button
                  onClick={clearAll}
                  className="bg-gray-600 hover:bg-gray-300 text-xs md:text-base text-white px-4 py-2 rounded-md shadow-md focus:outline-none transition duration-300 flex items-center gap-2"
                >
                  Clear Favourites
                </button>*/}
              </div>
              <div className='w-full flex justify-center items-center gap-2 mb-2'>
                <button
                  onClick={() => setShowFirst(false)}
                  className="bg-white col-span-1 hover:bg-gray-300 text-xs md:text-base px-4 py-2 rounded-md shadow-md focus:outline-none transition duration-300 flex items-center justify-center gap-2"
                >
                  Custom Quote
                </button>
              </div>
            </div>
            {/*favourites*/}
            {
              isOpened && (
                <div
                  className={`absolute z-[100] top-0 right-0 h-screen w-full max-w-md bg-white/10 backdrop-blur-lg dark:bg-gray-800 rounded-lg shadow-lg px-6 transition-transform duration-500 ease-in-out flex items-center justify-center ${isOpened ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                  <IoClose className="absolute top-4 right-4 text-white z-50 font-bold text-3xl cursor-pointer" onClick={() => setIsOpened(false)} />
                  <div className='w-full h-[60%] overflow-y-scroll no-scrollbar px-2 flex flex-col gap-4'>
                    {
                      items ? (
                        items.map((item) =>
                          <div key={item} className='grid grid-cols-6 p-2 shadow-lg my-2'>
                            <div onClick={() => selectQuote(item)} className='col-span-5 text-nowrap max-w-full overflow-x-clip text-gray-300 cursor-pointer'>
                              {item}
                            </div>
                            <div className='col-span-1 text-red-400 flex items-center cursor-pointer justify-center'>
                              <FaTrash onClick={() => removeItem(item)} />
                            </div>
                          </div>
                        )
                      ) : 'Your favourites will appear here'
                    }
                  </div>
                </div>
              )
            }
          </motion.div>
        ) : (
          <motion.div
            key="second"
            className="max-w-md w-full flex flex-col items-center justify-center"
            initial="enterFromLeft"
            animate="center"
            exit="exitToRight"
            variants={slideVariants}
            transition={{ duration: 0.5 }}
          >
            <CustomQuote />
            <ImageUpload />
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}

export default Quotes;