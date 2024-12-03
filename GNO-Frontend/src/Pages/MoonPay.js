import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { MoonPayBuyWidget } from '@moonpay/moonpay-react';

const MoonPay = () => {
  return (
    <div>
      <Header />
      <div className='text-white flex items-center justify-center h-96'>
      <MoonPayBuyWidget
            variant="overlay"
            baseCurrencyCode="usd"
            baseCurrencyAmount="100"
            defaultCurrencyCode="eth"
            visible
        />
      </div>
      <Footer />
    </div>
  )
}

export default MoonPay
