import { useState } from "react";
import { IoClose } from 'react-icons/io5'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Auth = ({ isOpen, setIsOpen }) => {

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`absolute z-50 top-0 left-0 w-full bg-white shadow-lg transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      style={{ height: '100%' }}
    >
      <IoClose className="absolute top-4 right-4 z-50 font-bold text-3xl cursor-pointer" onClick={() => setIsOpen(false)} />
      <AuthForm />
    </div>
  );
};

export default Auth;

const AuthForm = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username')
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')
    if (isLogin) {
      if (formData.email && formData.password) {
        if (email) {
          if (formData.email === email && formData.password === password) {
            // console.log(username, ' has logged in!')
            sessionStorage.setItem('email', formData.email);
            sessionStorage.setItem('password', formData.password);
            sessionStorage.setItem('username', username)
            toast.success('Success')
            navigate('/quotes')
          }
        } else {
          toast.error('Incorrect Credentials')
        }
      } else {
        toast.error('All inputs are required!')
      }
    } else {
      if (formData.email && formData.password && formData.username) {
        localStorage.setItem('email', formData.email);
        localStorage.setItem('password', formData.password);
        localStorage.setItem('username', formData.username)
        sessionStorage.setItem('email', formData.email);
        sessionStorage.setItem('password', formData.password);
        sessionStorage.setItem('username', formData.username)
        toast.success('Success: Account created')
        navigate('/quotes')
      } else {
        toast.error('All inputs are required!!')
      }
    }
    // console.log(isLogin ? 'Logging In:' : 'Signing Up:', formData);
  };

  // Toggle between Login and Signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? 'Login' : 'Signup'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={toggleAuthMode}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? 'Signup' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

// export default AuthForm;
