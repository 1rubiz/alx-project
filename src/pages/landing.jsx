import { useState } from 'react'
import Auth from '../components/auth';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SplitText from "../components/SplitText";

function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const verifyLogin = () => {
    const email = sessionStorage.getItem('email')
    const password = sessionStorage.getItem('password')
    if (!email || !password) {
      toast.error('You are not authenticated')
      setIsOpen(true)
    } else {
      navigate('/quotes')
    }
  }

  return (
    <div className='p-2 bg-transparent w-full min-h-screen z-50 flex flex-col items-center justify-center pt-16'>
      <Auth isOpen={isOpen} setIsOpen={setIsOpen} />
      <Toaster position="top-right" reverseOrder={false} />
      <div className='min-h-[50dvh] lg:min-h-[40dvh] flex flex-col justify-between'>
        <div className='text-center gap-4'>
          <SplitText
            text="Dot Quotes"
            className="text-6xl md:text-9xl text-white font-semibold text-center"
            delay={150}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
          <p className="text-sm md:text-base text-center text-gray-300 my-2">
            Create, customize, and discover inspiring quotes.<br/> Download and share your thoughts as stunning images.
          </p>
        </div>
        <div className='text-center text-white'>
          <blockquote className='font-bold text-lg'>
            {`"The only way to do great work is to love what you do."`}<br/>
            – Steve Jobs
          </blockquote>
          <div className='w-full'>
            <button onClick={verifyLogin} className='border text-blue-600 bg-white w-full font-bold text-lg py-2 px-6 rounded-md mt-4'>
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing

// const AnimatedDot = () => {
//   return (
//     <motion.div
//       className="absolute z-[100] top-4 left-4 w-4 h-4 bg-blue-500 rounded-full"
//       initial={{ y: 0 }}
//       animate={{
//         y: [0, '95dvh', '80dvh', '95dvh', 0], // Move from top -> bottom -> top
//         x: [0, 80, -30, 0], // Slight horizontal drift for natural feel
//         rotate: [0, 45, -45, 0], // Optional subtle rotation
//       }}
//       transition={{
//         duration: 8, // Total animation duration
//         ease: 'easeInOut',
//         repeat: Infinity,
//         repeatDelay: 5, // Pause before repeating
//       }}
//     />
//   );
// };