import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion} from 'framer-motion';
import MobileNavbar from './MobileNav';
import { useScrollTo } from './useScrollTo.jsx';

const Navbar = () => {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const scrollTo = useScrollTo();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, []);

  const handleLogin = (role) => {
    setIsOpen(false);
    navigate(`/login/${role.toLowerCase()}`);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  }

  return (
    <section id='navbar' className='py-5 px-15 absolute z-50 w-[100%]'>
      <div className='flex items-center justify-between max-md:hidden'>
        <div className='text-4xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent'>
          <h1>i<span className='font-bold'>Care</span></h1>
        </div>
        <div className='flex gap-3 text-xs font-bold p-1 rounded-4xl bg-white/15'>
          <div 
          onClick={() => scrollTo('home')}
          className='p-1.5 px-4 rounded-4xl text-white hover:bg-white hover:text-black'>Home</div>
          <div 
          onClick={() => scrollTo('about')}
          className='p-1.5 px-4 rounded-4xl text-white hover:bg-white hover:text-black'>About</div>
          <div 
          onClick={() => scrollTo('services')}
          className='p-1.5 px-4 rounded-4xl text-white hover:bg-white hover:text-black'>Services</div>
          <div 
          onClick={() => scrollTo('contact')}
          className='p-1.5 px-4 rounded-4xl text-white hover:bg-white hover:text-black'>Contact</div>
        </div>
        <div className='flex gap-3 items-center text-xs font-bold'> 
          <div className=''>
            <a href="" className='text-white'>FAQ</a>
          </div>
          <div className="relative ref={dropdownRef}">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2.5 px-6 rounded-full font-bold text-xs shadow-lg hover:shadow-xl transition-all flex gap-2"
              aria-label="Login options"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              >
              Log in
              <div>
                <i class="fa-solid fa-caret-down"></i>
              </div>
            </motion.button>
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate={isOpen ? 'visible' : 'hidden'}
              className="absolute left-0 mt-2 w-32 bg-white text-gray-800 rounded-md shadow-xl"
            >
              <ul className="py-2">
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    aria-label="Log in as Client"
                    onClick={() => handleLogin('client')}
                  >
                    Client
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    aria-label="Log in as Personnel"
                    onClick={() => handleLogin('personnel')}
                  >
                    Personnel
                 </button>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      <div className='hidden max-sm:block'>
        <MobileNavbar />
      </div>
    </section>
  )
}

export default Navbar
