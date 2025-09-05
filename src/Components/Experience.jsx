import React from 'react'
import { motion} from 'framer-motion'

const Experience = () => {
  return (
    <section className='py-20 md:px-15 place-content-center h-[70vh] rounded-4xl bg-blue-950'>
        <div className='text-center'>
            <div className='p-10'>
                <h1 className='text-4xl font-bold text-white'>
                    Experience Care Like Never <br className='hidden md:block'/> Before - Talk to Us Now!
                </h1>
            </div>
            <div className="pt-9">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-white to-pink-500 text-black py-3 px-6     rounded-full font-bold text-xs shadow-lg hover:shadow-xl transition-all">
                  Chat Us!
                </motion.button>
            </div>
        </div>
    </section>
  )
}

export default Experience
