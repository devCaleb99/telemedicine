import React from 'react'
import Navbar from '../Components/Navbar'
import FrontImg from '../assets/iCare1.jpg'
import ResponsiveBackground from '../Components/Background'
import { motion} from 'framer-motion'
import About from '../Components/About'
import LandingPage from '../Components/LandingPage'
import Mission from '../Components/Mission'
import Services from '../Components/Services'
import Experience from '../Components/Experience'
import Footer from '../Components/Footer'
import ContactSec from '../Components/ContactSec'
import Login from './ClientLogin'
import PersonnelLogin from './PersonnelLogin'

const Home = () => {
  return (
    <section className='nunito container mx-auto'>
    
        <Navbar />
 
      <LandingPage />

      <Mission />

      <About />

      <Services />

      <Experience/>

      <ContactSec />

      <Footer />
    </section>
  )
}

export default Home
