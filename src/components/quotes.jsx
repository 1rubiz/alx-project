import { useEffect, useState, useRef } from 'react';
import { FaHeart, FaHeartCrack, FaTrash, FaDownload, FaPencil } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import useQuotesStore from '../stores/quoteStore';
import { motion, AnimatePresence } from "framer-motion";
import CustomQuote from './customQuote';
import ImageUpload from './drag&drop';
import ColorSelector from './colorSelector'
import axios from 'axios'
import toast from 'react-hot-toast';

const Quotes = () => {
  const [inspiration, setInspiration] = useState('Loading ....');
  const [isOpened, setIsOpened] = useState(false);
  const [liked, setLiked] = useState(false)
  const { items, toggleItem, exists, removeItem, clearAll } = useQuotesStore();
  const [showFirst, setShowFirst] = useState(true);
  const [custom, setCustom] = useState(false)
  const [image, setImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const componentRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const api = import.meta.env.VITE_API

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/api/generate`);
      setInspiration(response.data)
      setLoading(false)
    } catch (error) {
      setInspiration("API error!, contact admin - ADMIN")
      toast.error('Error fetching data!')
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const toggleComponents = () => {
    setShowFirst(!showFirst);
  };

  const clearImage = () => {
    setImage(null)
  }

  const openCustom = () => {
    setCustom(true)
    setShowFirst(false)
  }

  const openDownload = () => {
    setCustom(false)
    setShowFirst(false)
  }

  // variable holding framer-motion values
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

  // Helper function to determine if color is light (copy this to parent component)
  const isLightColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  useEffect(() => {
    if (inspiration) {
      setLiked(exists(inspiration))
    }
  }, [inspiration, items])

  const selectQuote = (item) => {
    if (custom) {
      setQuote(item.split('–')[0])
      setAuthor(item.split('–')[1])
    } else {
      setInspiration(item)
    }
    setIsOpened(false)
  }

  return (
    <div className="relative w-screen h-screen pt-16 md:pt-0 overflow-y-scroll md:overflow-y-hidden  bg-transparent md:flex flex-col items-center justify-center p-4">
      {
        !showFirst && (
          <button
            onClick={toggleComponents}
            className="absolute top-5 right-5 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
          >
            Back
          </button>
        )
      }
      {
        isOpened && (
          <div
            className={`absolute z-[100] top-0 right-0 h-screen w-full max-w-md bg-white/30 backdrop-blur-lg dark:bg-gray-800 shadow-lg px-6 transition-transform duration-500 ease-in-out flex items-center justify-center ${isOpened ? 'translate-x-0' : '-translate-x-full'
              }`}
          >
            <IoClose className="absolute top-4 right-4 text-white z-50 font-bold text-3xl cursor-pointer" onClick={() => setIsOpened(false)} />
            <div className='w-full h-[60%] overflow-y-scroll no-scrollbar px-2 flex flex-col gap-2'>
              {
                items.length !== 0 && (
                  <div>
                    <button
                      onClick={clearAll}
                      className="bg-red-500 hover:bg-gray-300 text-xs md:text-base text-white px-4 py-2 rounded-md shadow-md focus:outline-none transition duration-300 flex items-center gap-2"
                    >
                      Clear Favourites
                    </button>
                  </div>
                )
              }
              {
                items ? (
                  items.map((item) =>
                    <div key={item} className='grid grid-cols-6 p-2 shadow-lg my-1 hover:bg-white bg-gray-300 rounded-md'>
                      <div onClick={() => selectQuote(item)} className='col-span-5 text-nowrap max-w-full overflow-x-clip cursor-pointer'>
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
                {
                  loading ? (
                    <div className="flex bg-transparent items-center justify-center min-h-20 w-full bg-gray-100">
                      {/*<!-- Spinning Div -->*/}
                      <div className="w-8 h-8 border-4 border-dashed border-white rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <p className="text-lg mt-4 min-w-full text-white dark:text-gray-300 mb-6">{inspiration}</p>
                  )
                }
                <div className='w-full flex justify-end'>
                  <img src="/quote.png" alt="" className='w-8 h-8 place-self-start' />
                </div>
              </div>

              {/* Buttons */}
              <button
                onClick={fetchQuote}
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
                  onClick={openDownload}
                  className="bg-green-600 hover:bg-green-300 col-span-5 text-xs md:text-base text-white px-4 py-2 rounded-md shadow-md focus:outline-none transition duration-300 flex items-center justify-center gap-2"
                >
                  Download<FaDownload />
                </button>
              </div>
              <div className='w-full flex justify-center items-center gap-2 mb-2'>
                <button
                  onClick={openCustom}
                  className="bg-white w-full col-span-1 hover:bg-gray-300 text-xs md:text-base px-4 py-2 rounded-md shadow-md focus:outline-none transition duration-300 flex items-center justify-center gap-2"
                >
                  Custom Quote <FaPencil />
                </button>
              </div>
            </div>
            {/*favourites*/}
          </motion.div>
        ) : (
          <motion.div
            key="second"
            className="max-w-md lg:max-w-full w-full flex flex-col items-center justify-center"
            initial="enterFromLeft"
            animate="center"
            exit="exitToRight"
            variants={slideVariants}
            transition={{ duration: 0.5 }}
          >
            <section className='w-full flex flex-col p-4 items-center justify-center'>
              {
                image ? (
                  <div className='w-full max-w-md my-2'>
                    <button
                      className='flex items-center bg-red-400 px-6 gap-4'
                      style={{
                        marginTop: '10px',
                        padding: '10px 20px',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                      onClick={clearImage}>Clear Selected Image</button>
                  </div>
                ) : (
                  <ColorSelector 
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    isLightColor={isLightColor}
                  />
                )
              }
              <div ref={componentRef} className={`w-full max-w-md bg-white ${isLightColor(selectedColor) ? 'text-black' : 'text-white'} h-64 relative flex items-center justify-center rounded-md ${image ? 'bg-cover bg-center bg-no-repeat' : 'bg-gray-50'}`}
                style={image ? { backgroundImage: `url(${image})` } : { backgroundColor: selectedColor }}
              >
                {
                  isLightColor(selectedColor) ? <img src="/quotation-mark.png" className='w-8 h-8 absolute top-4 left-4' alt="" /> : <img src="/quote.png" className='w-8 h-8 absolute top-4 left-4 rotate-180' alt="" />
                }
                <p className={`max-w-md px-4 ${image && 'bg-white/10 backdrop-blur-lg text-lg py-8 rounded-md'}`}>
                  {
                    custom ? (
                      quote ? quote : '...'
                    ) : (
                      inspiration.split('–')[0]
                    )
                  }
                </p>
                <p className='absolute bottom-4 left-4'>
                  <span className='font-bold'>Author - </span> 
                  {
                    custom ? (
                      author ? author : 'Anonymous'
                    ) : (
                      inspiration.split('–')[1] ? inspiration.split('–')[1] : 'Anonymous'
                    )
                  }
                </p>
                <img src="/quote.png" alt="" className='w-8 h-8 absolute bottom-4 right-4' />
              </div>
            </section>
            <section className='w-full flex flex-col items-center p-4'>
              {
                custom && (
                  <>
                    <div className='w-full max-w-md flex flex-col my-4 gap-4 bg-white/10 backdrop-blur-lg border-white p-4 rounded-md'>
                      <div className='flex flex-col items-center gap-2 md:flex-row'>
                        <span className='text-white'>Quote: </span>
                        <input 
                          type="text" 
                          value={quote} 
                          onChange={(e) => setQuote(e.target.value)} 
                          className='bg-white/10 backdrop-blur-lg w-full text-white border-white border rounded-md text-base px-2 py-1' />
                      </div>
                      <div className='flex flex-col items-center gap-2 md:flex-row'>
                        <span className='text-white'>Author: </span>
                        <input 
                          type="text" 
                          value={author} 
                          onChange={(e) => setAuthor(e.target.value)} 
                          className='bg-white/10 backdrop-blur-lg border-white text-white border rounded-md text-base px-2 py-1 w-full' />
                      </div>
                      <button
                        onClick={() => setIsOpened(true)}
                        className='flex items-center justify-center text-center text-white bg-teal-500 hover:bg-teal-400 px-6 gap-4'
                        style={{
                          marginTop: '10px',
                          padding: '10px 20px',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Import from Favourites
                      </button>
                    </div>
                  </>
                )
              }
              <CustomQuote componentRef={componentRef} />
              <ImageUpload
                image={image} 
                setImage={setImage}
              />
            </section>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}

export default Quotes;