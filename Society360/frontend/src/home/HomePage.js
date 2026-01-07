import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Ecosystem from './Ecosystem';
import Experience from './Experience';
import Footer from './Footer';

function HomePage() {
    return ( 
        <>
          <Navbar/>
          <Hero/>
          <Experience/>
          <Ecosystem/>
          <Footer/>
        </>
     );
}

export default HomePage;