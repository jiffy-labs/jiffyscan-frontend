import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import TeamSection2 from './components/TeamSection2';

const About = () => {
  return (
    <div>
        <Navbar/>
        <div className="pt-20 bg-center bg-auto bg-no-repeat bg-origin-content " style={{ backgroundImage: "url('/')",}}>
        <TeamSection2/>
        </div>
        <Footer/>
    </div>
  )
}

export default About;