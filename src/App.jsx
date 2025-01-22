import Quotes from './components/quotes'
import { Link, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'
import Landing from './pages/landing';
import ParticlesBackground from './components/particles';
import { Toaster } from "@/components/ui/toaster"
import { FaPowerOff, FaCaretRight } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const email = sessionStorage.getItem('email')
  const username = sessionStorage.getItem('username')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(()=>{
    if(email){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  }, [email])
  return (
    <>      
      <div className="absolute w-full h-screen top-0 left-0 -z-0">
        <ParticlesBackground />
      </div>
      <div className='z-50 absolute w-full'>
        <Router>
          <div className='text-3xl fixed z-[70] font-bold text-white top-4 left-4 flex items-center'>
            <Link to="/">   Dot Quotes </Link>
            {username && <span className='flex items-center gap-2'><FaCaretRight /> {username}</span>}
          </div>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/quotes' element={<Quotes />} />
          </Routes>
          <Logout isOpen={isOpen} setIsOpen={setIsOpen} />
        </Router>
      </div>
      <div className='text-xs text-white z-50 fixed bottom-4 right-4 flex items-center justify-between md:just gap-8'>
        <div className=''>Built by Ruby Izekor <a href="#" className='underline md:px-4'>https://www.github.com/1rubiz</a>
        </div>
        {
          isLoggedIn && (
            <span onClick={() => setIsOpen(true)} className='p-2 rounded-md flex items-center justify-center bg-white text-red-400'>
              <FaPowerOff />
            </span>
          )
        }
      </div>
      <Toaster />
    </>
  )
}

export default App

const Logout = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };
  const logout = () => {
    sessionStorage.clear()
    toast.success('Log out successfull!')
    setIsOpen(false)
    navigate('/')
  }

  return (
    <div
      className={`absolute z-[80] flex items-center justify-center top-0 left-0 w-full bg-white shadow-lg transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      style={{ height: '100%' }}
    >
      <IoClose className="absolute top-4 right-4 z-50 font-bold text-3xl cursor-pointer" onClick={() => setIsOpen(false)} />
      <div className='flex flex-col w-full md:max-w-md shadow-md p-4 text-center'>
        <h1 className='text-xl'>
          Do you want logout?
        </h1>
        <p className='text-red-500 text-xs mb-4'>This action is irreversable!</p>
        <div className='w-full flex items-center justify-center gap-6'>
          <button onClick={logout} className='text-red-600 border px-4 py-2 rounded-md hover:bg-red-200'>Log Out</button>
          <button className='text-gray-700 border px-4 py-2 rounded-md hover:bg-gray-200' onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};