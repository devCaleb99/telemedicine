import React from 'react'
import { motion,useViewportScroll, useTransform } from 'framer-motion'


const container = {
  hidden: { opacity: 1 }, // Container is always visible
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.7, // Delay between each child animation
    }
  }
};

// Responsive card variants
const cardVariants = {
  hidden: (isMobile) => ({ 
    x: isMobile ? 30 : 100, // Smaller offset on mobile
    opacity: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }),
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

const Services = () => {
  const [isMobile, setIsMobile] = React.useState(false)
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id='services' className='py-20 md:px-15 p-5 w-full overflow-x-hidden'>
      <div className='pb-15 text-center'>
        <h1 className='font-bold text-sm text-gray-500'>Our Services</h1>
      </div>
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ 
          margin: isMobile ? "-50px 0px -20px 0px" : "-100px 0px -100px 0px",
        }}
        variants={container}
        
        className='md:grid md:grid-cols-4 gap-10 grid-cols-1 max-sm:space-y-6 py-9'>

        <motion.div 
        custom={isMobile}
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}

        className='p-4 space-y-25 rounded-xl bg-[rgb(188,225,138)] shadow-md hover:shadow-lg transition-shadow'>
          <div>
            <i class="fa-solid fa-headset text-xl rounded-full p-2 bg-white"></i>
          </div>
          <div>
            <h3 className='text-sm font-bold'>Online Consultations</h3>
            <p className='text-[0.70rem] font-[600] pt-3'>
              Speak with licensed healthcare professionals from the comfort of your home. Fast, easy and secure consultation whenever you need them.
            </p>
          </div>
        </motion.div>

        <motion.div 
        custom={isMobile}
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}

        className='p-4 space-y-25 rounded-xl bg-[rgb(188,225,138)] shadow-md hover:shadow-lg transition-shadow'>
          <div>
            <i class="fa-solid fa-capsules text-xl rounded-full p-2 bg-white"></i>
          </div>
          <div>
            <h3 className='text-sm font-bold'>Prescription Refills</h3>
            <p className='text-[0.70rem] font-[600] pt-3'>Need a prescription refill? Our doctors can easily assess your needs and provide a refill without the hassle of a physical visit.</p>
          </div>
        </motion.div>

        <motion.div 
        custom={isMobile}
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}

        className='p-4 space-y-25 rounded-xl bg-[rgb(188,225,138)] shadow-md hover:shadow-lg transition-shadow'>
          <div>
            <i class="fa-solid fa-laptop-medical text-xl rounded-full p-2 bg-white"></i>
          </div>
          <div>
            <h3 className='text-sm font-bold'>Health Monitoring</h3>
            <p className='text-[0.70rem] font-[600] pt-3'>
              Stay on top of your health with regular check-ins and remote monitoring. We help track your progress and provide guidance every step of the way.
            </p>
          </div>
        </motion.div>

        <motion.div 
        custom={isMobile}
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}

        className='p-4 space-y-25 rounded-xl bg-[rgb(188,225,138)] shadow-md hover:shadow-lg transition-shadow'>
          <div>
            <i class="fa-solid fa-user-nurse text-xl rounded-full p-2 bg-white"></i>
          </div>
          <div>
            <h3 className='text-sm font-bold'>Specialist Referrals</h3>
            <p className='text-[0.70rem] font-[600] pt-3'>
              Get connected to the right specialist for your condition. We help guide you to expert care tailored to your needs.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="text-center pt-9">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6     rounded-full font-bold text-xs shadow-lg hover:shadow-xl transition-all">
            iCare's Services
          </motion.button>
      </div>
    </section>
  )
}

export default Services
