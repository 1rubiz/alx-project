/* eslint-disable react/prop-types */
import { FaPowerOff } from 'react-icons/fa'
import { useMatch } from 'react-router-dom';

function LogoutButton({setIsOpen}) {
    const match = useMatch('/quotes');
  return (
    <div className='text-xs text-white z-50 fixed bottom-4 right-4 flex items-center justify-between md:just gap-8'>
        <div className=''>Built by Ruby Izekor <a href="#" className='underline md:px-4'>https://www.github.com/1rubiz</a>
        </div>
        {
            match && (
            <span onClick={() => setIsOpen(true)} className='p-2 rounded-md flex items-center justify-center bg-white text-red-400'>
                <FaPowerOff />
            </span>
            )
        }
    </div>
  )
}

export default LogoutButton