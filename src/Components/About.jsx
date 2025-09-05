import React from 'react'
import { motion} from 'framer-motion'

const About = () => {
  return (
    <section id='about' className='p-15 align-middle'>
        <div className='justify-center text-center'>
            <div>
                <h1 className='font-bold text-sm'>About Us</h1>
            </div>
            <div className='text-sm font-extrabold'>
                <p className='p-5 pt-15'>
                    iCare blends cutting-edge technology with human care, making telehealth simple, <br /> personal, and accessible for everyone.  
                </p>
                <p className='py-5'>
                    We're pioneering the future of healthcare with telehealth and <br /> telemedicine solution.
                </p>
            </div>
            <div className="">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6     rounded-full font-bold text-xs shadow-lg hover:shadow-xl transition-all">
                  About iCare
                </motion.button>
            </div>
        </div>
    </section>
  )
}

export default About
