import React from 'react'
import Navbar from '../Components/Navbar'
import ResponsiveBackground from '../Components/Background'
import { motion} from 'framer-motion'

const LandingPage = () => {
  return (
    <section id='home' className='nunito container mx-auto relative'>
      <ResponsiveBackground />
      
      <div className='md:grid h-screen md:grid-cols-2 gap-4 md:py-10 p-5 md:p-15 md:items-end grid-cols-1 place-content-end'>
        <div className=''>
          <h1 className='text-4xl font-extrabold text-white'>
            iCare: Your <br />
            Wellness, Our Digital Care
          </h1>

          <div className="py-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-full font-bold text-xs shadow-lg hover:shadow-xl transition-all">
                Get Started
              </motion.button>
          </div>
        </div>
        <div className=''></div>
      </div>

      

    </section>
  )
}

export default LandingPage
