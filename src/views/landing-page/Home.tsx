import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Product from './Product';
import Testimonials from './Testimonials';
import Chains from './Chains';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="relative bg-center bg-transparent min-h-screen" style={{ backgroundImage: "url('/Bg.svg')" }}>
      <Navbar />
      <div className="pt-16"> {/* Adjust the padding-top value according to the height of the Navbar */}
        <SearchBar />
      </div>
        <Product />

      <Testimonials/>
      <Chains/>
      
      <Footer/>
    </div>
  );
};

export default Home;
