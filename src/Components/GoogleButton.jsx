import React from 'react'
import { motion } from 'framer-motion';

const GoogleButton = ({ icon, delay }) => (
  <motion.button
    type="button"
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className='w-full p-3 text-xs font-bold rounded-lg bg-white/20 backdrop-blur-lg shadow-glass hover:bg-white/30 transition-all flex items-center justify-center gap-2'
  >
    <span><i class="fa-brands fa-google"></i></span> Google
  </motion.button>
);

export default GoogleButton
