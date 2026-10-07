import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MenuSection from '../components/MenuSection';
import PreOrderSystem from '../components/PreOrderSystem';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MenuSection />
        <PreOrderSystem />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
