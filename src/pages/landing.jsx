import { useState } from 'react'
// import Quotes from './components/quotes'
import Auth from '../components/auth';
import Explore from '../components/explore';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
// import { useToast } from '../components/ui/useToast'; 
import { useNavigate } from 'react-router-dom';

function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  // const { toast } = useToast()
  const navigate = useNavigate()
  const verifyLogin = () => {
    const email = sessionStorage.getItem('email')
    const password = sessionStorage.getItem('password')
    if (!email || !password) {
      toast.error('You are not authenticated')
      // toast({
      //   title: 'You are not authenticated',
      //   variant: 'destructive'
      // })
      setIsOpen(true)
    } else {
      navigate('/quotes')
    }
  }
  // const [isExploreOpen, setIsExploreOpen] = useState(false);

  return (
    <div className='p-2 bg-transparent w-full min-h-screen z-50 flex flex-col items-center justify-center'>
      <Auth isOpen={isOpen} setIsOpen={setIsOpen} />
      {/*<Explore isOpen={isExploreOpen} setIsOpen={setIsExploreOpen} />*/}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex mb-6 pt-2">
        {/*<AnimatedDot />*/}
      </div>
      <div className='flex flex-col backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6 shadow-lg max-w-sm text-white'>
        <img src='/one.jpg' className='bg-blue-600 min-w-48 h-72 rounded-md' />
        {/*<div className='bg-blue-600 w-full h-72 rounded-md'>
            
          </div>*/}
        <div className='my-4 min-w-48'>
          <h1 className='font-bold text-xl'>Welcome to Dot Quotes</h1>
          <p>
            Your personal hub for curated inspiring quotes
          </p>
          <button onClick={verifyLogin} className='border bg-blue-600 text-white w-full font-bold text-lg py-2 px-6 rounded-md mt-4'>
            Explore
          </button>
          <button onClick={() => setIsOpen(true)} className='border text-blue-600 bg-white w-full font-bold text-lg py-2 px-6 rounded-md mt-4 mb-4'>
            Sign in
          </button>
        </div>
      </div>
    </div>
    // <Quotes />
  )
}

export default Landing

const AnimatedDot = () => {
  return (
    <motion.div
      className="absolute z-[100] top-4 left-4 w-4 h-4 bg-blue-500 rounded-full"
      initial={{ y: 0 }}
      animate={{
        y: [0, '95dvh', '80dvh', '95dvh', 0], // Move from top -> bottom -> top
        x: [0, 80, -30, 0], // Slight horizontal drift for natural feel
        rotate: [0, 45, -45, 0], // Optional subtle rotation
      }}
      transition={{
        duration: 8, // Total animation duration
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 5, // Pause before repeating
      }}
    />
  );
};