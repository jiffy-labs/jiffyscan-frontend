import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PricingSection from './components/PricingSection';

const Pricing = () => {
  return (
    <div>
        <Navbar/>
        <div className="pt-20 bg-cover bg-transparent" style={{ backgroundImage: "url('/pricingbg.svg')" }}>
        <PricingSection/>
        </div>
        <Footer/>
    </div>
  )
}

export default Pricing