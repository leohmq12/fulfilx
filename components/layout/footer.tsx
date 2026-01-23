import { Link } from 'expo-router';
import React, { useState } from 'react';

const Footer = () => {
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  return (
<footer className="w-full relative min-h-[400px]" style={{ backgroundImage: "url(/footerbg.webp)", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
  <div className="w-full px-4 md:px-6 lg:px-8 2xl:px-16 py-16 lg:py-6">
  <div className="mx-auto w-full max-w-[1490px]">
    <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16">

      {/* Left Column (Logo + Subscribe) */}
      <div className="flex flex-col gap-6 w-full lg:w-2/5">
        <div className="h-16 w-full max-w-[320px]">
          <img src="/wlogo.webp" alt="logo" />
        </div>

        <p className="text-[18px] font-normal text-white">
          Subscribe to receive Fulfil.X updates
        </p>

        <div className="w-full border border-white/20 rounded-lg flex items-center px-4 h-14">
          <input
            className="bg-transparent text-white font-normal placeholder-white/40 outline-none flex-1"
            type="email"
            placeholder="Enter your mail id"
          />
          <div className="h-6 w-6 rounded flex items-center justify-center cursor-pointer">
            <img src="/sub.svg" alt="plane" className='w-6 h-6 object-contain' />
          </div>
        </div>

        <label 
          className="flex items-center gap-3 mt-3 cursor-pointer"
          onClick={() => setAgreedToPolicy(!agreedToPolicy)}
        >
          <div className={`h-5 w-5 rounded ${agreedToPolicy ? 'bg-white' : 'bg-transparent border-2 border-white'} flex items-center justify-center`}>
            {agreedToPolicy && (
              <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            )}
          </div>
          <span className="text-white/90 font-normal text-base">
            I agree to the privacy policy
          </span>
        </label>

        <div className="mt-4">
          <p className="text-3xl font-normal text-white mb-4">
            Find us on the socials
          </p>
          <div className="flex gap-4">
            <button 
              className="h-14 w-14 bg-[#C10016] rounded-full flex items-center justify-center hover:bg-[#a00012] transition-colors"
              aria-label="Facebook"
            >
              <img src="/fb.svg" alt="facebook" className='w-6 h-6 object-contain' />
            </button>
            <button 
              className="h-14 w-14 bg-[#C10016] rounded-full flex items-center justify-center hover:bg-[#a00012] transition-colors"
              aria-label="Instagram"
            >
              <img src="/ig.svg" alt="instagram" className='w-6 h-6 object-contain' />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section - Right Column */}
      <div className="w-full lg:w-3/5">
        {/* Contact Container */}
        <div 
          className="w-full min-w-0 pt-4 px-6 pb-7 rounded-[20px] bg-white/10 border border-white/20"
        >
          {/* Warehouse Buttons Row */}
          <button className="flex flex-col sm:flex-row gap-4 mb-3">
            <div 
              className="flex justify-center items-center py-4 px-8"
              style={{
                background: '#C10016',
                borderRadius: '60px',
                minWidth: '200px',
              }}
            >
              <span className="text-white font-bold text-xl">
                UK Warehouse
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-white font-bold text-xl">
                UAE Warehouse
              </span>
            </div>
          </button>
          {/* Contact Info Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  
  {/* Phone */}
  <div className="flex items-center gap-4">
    <div 
      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: '#C10016' }}
    >
      <img src="/phone.svg" alt="phone" className="w-5 h-5" />
    </div>
    <span className="text-white text-lg font-normal">
      +44 161 399 2348
    </span>
  </div>

  {/* Email */}
  <div className="flex items-center gap-4">
    <div 
      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: '#C10016' }}
    >
      <img src="/mail.svg" alt="email" className="w-5 h-5" />
    </div>
    <span className="text-white text-lg font-normal">
      info@fulfilx.co.uk
    </span>
  </div>

  {/* Address */}
  <div className="flex items-center gap-4">
    <div 
      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: '#C10016' }}
    >
      <img src="/map.svg" alt="location" className="w-5 h-5" />
    </div>
    <div className="text-white text-left">
      <div className="font-bold text-lg">FulfilX HQ</div>
      <div className="text-base font-normal">
        Nile Mill, Oldham,
        Greater Manchester,
        OL9 8NT
      </div>
    </div>
  </div>
</div>

        </div>
        {/* Quick Links Section */}
<div className="w-full mt-16 mb-8">
  
  {/* Quick Links Title - Left Aligned */}
  <div className="text-left mb-1">
    <h3 className="text-white font-bold text-2xl sm:text-3xl leading-tight tracking-tight">
      Quick Links
    </h3>
  </div>

  {/* Links Grid - Left Aligned */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 w-full">
    
    {/* Column 1 */}
<div 
  className="text-white font-normal text-left text-base sm:text-[18px] leading-10 sm:leading-[60px]"
>
  <Link href="/" asChild>
    <a className="block hover:text-[#C10016] transition-colors cursor-pointer">Home</a>
  </Link>
  <Link href="/about-us" asChild>
    <a className="block hover:text-[#C10016] transition-colors cursor-pointer">About Us</a>
  </Link>
  <Link href="/services" asChild>
    <a className="block hover:text-[#C10016] transition-colors cursor-pointer">Services</a>
  </Link>
  <Link href="/sectors" asChild>
    <a className="block hover:text-[#C10016] transition-colors cursor-pointer">Sectors</a>
  </Link>
  <Link href="/blogs" asChild>
    <a className="block hover:text-[#C10016] transition-colors cursor-pointer">Blogs</a>
  </Link>
</div>

{/* Column 2 */}
<div 
  className="text-white font-normal text-left text-base sm:text-[18px] leading-10 sm:leading-[60px]"
>
  <Link href="/team" asChild>
    <a className="block hover:text-[#C10016] transition-colors cursor-pointer">Team</a>
  </Link>
  <Link href="/pricing" asChild>
    <a className="block hover:text-[#C10016] transition-colors cursor-pointer">Pricing</a>
  </Link>
  
  <Link href="/locations" asChild>
    <a className="block hover:text-[#C10016] transition-colors cursor-pointer">Store Locations</a>
  </Link>
    <Link href="/contact" asChild>
    <a className="block hover:text-[#C10016] transition-colors cursor-pointer">Contact Us</a>
  </Link>
</div>

{/* Column 3 */}
<div 
  className="text-white font-normal text-left text-base sm:text-[18px] leading-10 sm:leading-[60px]"
>

  <Link href="/" asChild>
    <a className="block hover:text-[#C10016] transition-colors cursor-pointer">Shipping</a>
  </Link>
  <Link href="/" asChild>
    <a className="block hover:text-[#C10016] transition-colors cursor-pointer">Returning Policy</a>
  </Link>
  <Link href="/team" asChild>
    <a className="block hover:text-[#C10016] transition-colors cursor-pointer">Career</a>
  </Link>
</div>

  </div>
</div>
      </div>

    </div>

    {/* Bottom Copyright */}
     {/* Bottom Copyright - Positioned at bottom */}
  <div className="relative border-t border-white/10 pt-4 text-center">
    <p className="text-white text-[16px] opacity-90">
      Copyright © 2025. <span className='text-[#C10016]'>Fulfil X</span>. All rights reserved.
    </p>
  </div>
  </div>
  </div>
</footer>
  );
};

export default Footer;
