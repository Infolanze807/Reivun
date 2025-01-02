import React from 'react';
import './splash.css'; // Optional: add custom styles for the splash screen

const SplashScreen = ({ appName, logoSrc }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-800">
      <div className="text-center">
        <div className="mb-8">
          <img
            src={logoSrc}
            alt={`${appName} logo`}
            width={180}
            height={180}
            className="mx-auto rounded-[50%]"
          />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">{appName}</h1>
      </div>
    </div>
  );
};

export default SplashScreen;
