import React from 'react'
import { useScrollTo } from './useScrollTo';

const Footer = () => {
    const scrollTo = useScrollTo();

  return (
    <section className='py-20 md:px-15 p-5 rounded-t-4xl text-white bg-blue-950'>
        <div className='md:grid md:grid-cols-2 grid grid-cols-1 md:h-[40vh] gap-15'>
            <div className='grid content-between'>
                <div>
                    <h1 className='text-xl font-extrabold'>iCare</h1>
                </div>
                <div className='grid grid-cols-2 md:gap-25 text-[0.70rem] font-bold'>
                    <div>
                        <p>2025. All rights reserved.</p>
                    </div>
                    <div className='grid place-content-center'>
                        <p>Privacy Policy</p>
                    </div>
                </div>
            </div>
            <div className='grid max-sm:order-first content-between space-y-15 text-[0.70rem] font-bold'>
                <div className='grid grid-cols-5'>
                    <div onClick={() => scrollTo('home')}>
                        <p>Home</p>
                    </div>
                    <div onClick={() => scrollTo('about')}>
                        <p>About</p>
                    </div>
                    <div onClick={() => scrollTo('services')}>
                        <p>Services</p>
                    </div>
                    <div onClick={() => scrollTo('contact')}>
                        <p>Contact us</p>
                    </div>
                    <div className='grid place-content-end'>
                        <i class="fa-solid fa-arrow-up p-0.5 px-1 rounded-full border" onClick={() => scrollTo('navbar')}></i>
                    </div>
                </div>
                <div className='grid md:grid-cols-3 grid-cols-2 gap-5'>
                    <div className='list-none space-y-1'>
                        <p className='text-gray-300'>Contacts</p>
                        <li className=''>+1 902 789 89 90</li>
                        <li className=''>info@avocadohealth.com</li>
                    </div>
                    <div className='grid list-none place-content-center space-y-1'>
                        <p className='text-gray-300'>Socials</p>
                        <li>Instagram</li>
                        <li>LinkedIn</li>
                    </div>
                    <div className='grid md:place-content-end'>
                        <p>Website by BiNODE</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footer
