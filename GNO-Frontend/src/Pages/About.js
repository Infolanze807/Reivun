import React from 'react'
import Header from './Header'
import Footer from './Footer'

const About = () => {
  return (
    <div>
      <Header />
      <div className='text-white p-24'>
      <div className="max-w-3xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-center mb-6 text-[--green-color]">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to Reivun, the next-generation wallet designed for secure and decentralized management of your digital assets.
      </p>
      <p className="text-lg mb-4">
        Founded in 2024 by the Leviatekh team, Reivun is built on a robust foundation: our proprietary blockchain, ensuring unmatched performance and uncompromising security. Anchored to the stablecoin DAI, we combine innovation, transparency, and stability to revolutionize your financial transactions.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Reivun?</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li className="text-lg">
          <strong>Proprietary Blockchain:</strong> Specifically designed for Reivun, our blockchain provides a unique, high-performance foundation optimized for decentralized asset management.
        </li>
        <li className="text-lg">
          <strong>24/7 Advanced Security:</strong> Our dedicated cybersecurity team works around the clock, 24/7, to monitor network activity and safeguard your funds against potential threats.
        </li>
        <li className="text-lg">
          <strong>Total Decentralization:</strong> With Reivun, you have complete control over your assets—no intermediaries, no third parties. You are the master of your finances.
        </li>
        <li className="text-lg">
          <strong>Guaranteed Stability:</strong> By leveraging the stablecoin DAI, we deliver a seamless and stable financial experience tailored to your daily needs.
        </li>
      </ul>
      <p className="text-lg mt-6">
        At Reivun, we envision a future where autonomy, security, and innovation converge. Backed by Leviatekh, we are redefining the standards of decentralized financial management to offer you a solution that is both reliable and groundbreaking.
      </p>
      <p className="text-lg mt-4">
        Reivun - your trust, secured and decentralized.
      </p>
    </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
