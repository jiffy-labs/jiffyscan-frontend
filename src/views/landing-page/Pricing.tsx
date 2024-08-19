import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PricingSection from './components/PricingSection';

const Pricing = () => {
  return (
    <div>
        <Navbar/>
        <div className="pt-20 bg-center bg-auto bg-no-repeat bg-origin-content " style={{ backgroundImage: "url('/op.svg')",}}>
        <PricingSection/>
        </div>
        <Footer/>
    </div>
  )
}

export default Pricing