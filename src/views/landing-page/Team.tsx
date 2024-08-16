import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import TeamSection from './components/TeamSection'

const Team = () => {
  return (
    <div>
        <Navbar/>
        <div className="pt-20 bg-center bg-auto bg-no-repeat bg-origin-content " style={{ backgroundImage: "url('/')",}}>
        <TeamSection/>
        </div>
        <Footer/>
    </div>
  )
}

export default Team