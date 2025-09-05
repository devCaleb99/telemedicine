import React from 'react'
import { motion} from 'framer-motion'

const container = {
  hidden: { opacity: 1 }, // Container is always visible
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.7, // Delay between each child animation
    }
  }
};

const cardVariants = {
  hidden: { 
    x: 100, 
    opacity: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      mass: 0.1
    }
  }
};

const Mission = () => {
  return (
    <section className='py-20 overflow-x-hidden'>
        <div className='md:px-15 p-5 pb-15 text-center'>
            <p className='font-bold text-sm hover:text-purple-900 transition-colors duration-300'>Our Mission</p>
        </div>
        <div className='grid md:grid-cols-3 md:gap-10 md:px-15 p-5 md:text-sm font-medium text-center'>
             <motion.div whileHover={{ y: -5 }} className='p-3'>
                <p>
                    Our mission is to deliver seamless healthcare experiences that fit into your life, no matter where you are.
                </p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className='p-3'>
                <p>
                    iCare brings the future of healthcare to your fingertips with compassion and innovation.
                </p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className='p-3'>
                <p>
                    We connect you to the care you need, blending technology and empathy to support your wellbeing.
                </p>
            </motion.div>
        </div>
        <motion.div
         initial="hidden"
         whileInView="show"
         viewport={{ margin: "-100px 0px -100px 0px" }}
         variants={container}

         className='md:grid md:grid-cols-3 gap-10 md:px-15 max-sm:py-10 p-5 grid-cols-1 max-sm:space-y-6'>
            <motion.div 
                variants={cardVariants}

                whileHover={{ scale: 1.02 }}
                className='h-full p-3 space-y-2 rounded-xl bg-[rgb(188,225,138)] shadow-md hover:shadow-lg transition-shadow'>
                <div className='h-[60%] min-h-[200px] rounded-xl' style={{
                  backgroundImage: 'url(src/assets/tteele.jpg)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}></div>
                <div className='rounded-xl p-2 text-center'>
                    <h3 className='text-sm font-bold'>Seamless Healthcare</h3>
                    <p className='text-[0.70rem] font-[600] pt-3'>
                       Instant access to care with our easy-to-use platform, designed to fit into your busy lifestyle.
                    </p>
                </div>
            </motion.div>

            <motion.div 
                
                variants={cardVariants}

                whileHover={{ scale: 1.02 }}
                className='h-full rounded-xl p-3 space-y-2 bg-[rgb(216,245,173)] shadow-md hover:shadow-lg transition-shadow'>
                <div className='h-[60%] min-h-[200px] rounded-xl' style={{
                    backgroundImage: 'url(src/assets/ttele2.jpg)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}></div>
                <div className='rounded-xl p-2 text-center'>
                    <h3 className='text-sm font-bold'>Future of Telehealth</h3>
                    <p className='text-[0.70rem] font-[600] pt-3'>
                    Advanced technology at your fingertips, ensuring innovative and compassionate healthcare.
                    </p>
                </div>
            </motion.div>
            <motion.div 
                variants={cardVariants}

                whileHover={{ scale: 1.02 }}
                className='h-full p-3 rounded-xl space-y-2 bg-[rgb(236,253,187)] shadow-md hover:shadow-lg transition-shadow'>
                <div className='h-[60%] min-h-[200px] rounded-xl' style={{
                    backgroundImage: 'url(src/assets/icare.ttt.jpg)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}></div>
                <div className='rounded-xl p-2 text-center'>
                    <h3 className='text-sm font-bold'>Personalised care</h3>
                    <p className='text-[0.70rem] font-[600] pt-3'>
                        A perfect blend of technology and empathy, connecting you with healthcare professionals who understand your needs.
                    </p>
                </div>
            </motion.div>
        </motion.div>

        <div className="text-center py-9">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6     rounded-full font-bold text-xs shadow-lg hover:shadow-xl transition-all">
                  iCare's Mission
            </motion.button>
        </div>


    </section>
  )
}

export default Mission
