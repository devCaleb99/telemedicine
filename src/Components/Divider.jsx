import React from 'react'
import { motion } from 'framer-motion';

const Divider = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
    className='flex items-center'
  >
    <div className='flex-1'><hr className='border-1 border-white/20'/></div>
    <div className='md:px-5 px-3'>
      <p className='text-xs font-medium'>OR CONTINUE WITH</p>
    </div>
    <div className='flex-1'><hr className='border-1 border-white/20'/></div>
  </motion.div>
);

export default Divider
