import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faHandshake,
  faAddressBook,
  faQuestion,
  faTimes,
  faBars,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = window.innerWidth < 768 ? -80 : -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  }, []);

  const handleLogin = (role) => {
    setIsDropdownOpen(false);
    setIsOpen(false);
    navigate(`/login/${role.toLowerCase()}`);
  };

  const menuItems = [
    { name: 'Home', icon: faHome, section: 'home' },
    { name: 'About', icon: faUsers, section: 'about' },
    { name: 'Services', icon: faHandshake, section: 'services' },
    { name: 'Contact', icon: faAddressBook, section: 'contact' },
    { name: 'FAQ', icon: faQuestion },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-white/15 shadow-glass">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
        >
          <h1 className="font-bold">iCare</h1>
        </motion.div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 p-1 px-3 rounded-xl bg-white/20 backdrop-blur-lg shadow-glass"
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            className="text-black text-md"
          />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm z-40"
            >
              <div className="absolute inset-0 bg-white/20 backdrop-blur-xl shadow-2xl flex flex-col overflow-y-auto pb-50">
                <div className="p-8 pt-24">
                  <ul className="space-y-6">
                    {menuItems.map((item, index) => (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { delay: index * 0.1 },
                        }}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button
                          onClick={() => scrollToSection(item.section)}
                          className="w-full flex items-center text-xl p-4 rounded-xl bg-white/30 hover:bg-white/50 transition-all text-left"
                        >
                          <FontAwesomeIcon
                            icon={item.icon}
                            className="mr-3 text-purple-800 text-xl"
                          />
                          {item.name}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto p-8">
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium shadow-lg flex items-center gap-2 justify-center"
                      aria-label="Login options"
                      aria-expanded={isDropdownOpen}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      Log in
                      <div>
                        <FontAwesomeIcon icon={faCaretDown} />
                      </div>
                    </motion.button>
                    <motion.div
                      className="absolute left-0 top-full my-2 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md shadow-xl z-50"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate={isDropdownOpen ? 'visible' : 'hidden'}
                    >
                      <ul className="py-2">
                        <li>
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-white/20 transition-colors"
                            aria-label="Log in as Client"
                            onClick={() => handleLogin('client')}
                          >
                            Client
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-white/20 transition-colors"
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
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MobileNavbar;