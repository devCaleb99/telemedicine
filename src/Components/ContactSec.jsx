import React from 'react'
import { motion } from 'framer-motion'

const ContactSec = () => {
  return (
    <section id='contact' className='py-20 md:px-15 p-5'>
        <div className='md:grid md:grid-cols-2 gap-10 grid-cols-1 max-sm:space-y-6'>
            <div className='p-4'>
                <h1 className='text-4xl font-extrabold'>
                    We're Here to Help <br className='hidden md:block'/> - Reach Out!
                </h1>
            </div>
            <div className='p-4 '>
                <form action="" className='space-y-3'>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                        <input type="text" className='border-2 placeholder-black p-3 text-xs font-bold rounded-lg' placeholder='Name'/>
                        <input type="text" className='border-2 placeholder-black p-3 text-xs font-bold rounded-lg' placeholder='Email'/>
                    </div>

                    <div className='grid'>
                        <textarea name="" id="" className='border-2 placeholder-black p-3 text-xs font-bold rounded-lg resize-none md:h-[20vh] h-[20vh]' placeholder='Message'></textarea>
                    </div>

                    <div className="pt-5">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-lg font-bold text-xs shadow-lg hover:shadow-xl transition-all flex gap-1.5 items-center">
                          <div>Submit Message</div>
                          <div><i class="fa-solid fa-arrow-right"></i></div>
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>

    </section>
  )
}

export default ContactSec
