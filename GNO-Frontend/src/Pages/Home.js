import React, { useEffect, useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import Footer from './Footer';
import Trust from './Trust';
import User from './User';
import SplashScreen from './Spalash'; // Your loader component
import logo from '../Images/gno-wallet.jpeg'; // Import the logo image

const Home = () => {
  const [isPWA, setIsPWA] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Detect if the app is running as a PWA
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true // For iOS
    ) {
      setIsPWA(true); // Set isPWA to true if it’s a PWA
    }

    // Simulate loading time (e.g., 2 seconds)
    const timer = setTimeout(() => {
      setLoading(false); // Hide splash screen after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div>
      {isPWA && loading ? (
        <SplashScreen
          appName="Reivun"
          logoSrc={logo} // Directly use the imported logo
        />
      ) : (
        <>
          <Header />
          <HeroSection />
          <User />
          <Trust />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
