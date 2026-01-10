import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import Footer from './footer';
import Navbar from './navbar';

interface NavItemProps {
    children: React.ReactNode;
    isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ children, isActive = false }) => {
    const primaryTextColor = 'text-black';
    const activeTextColor = 'text-[#C10016]';
    
    
    return (
        <a 
            href="#" 
            className={`
                group flex items-center p-2 transition duration-150 ease-in-out 
                hover:opacity-75 focus:outline-none 
                ${isActive ? activeTextColor : primaryTextColor}
            `}
        >
            {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#C10016] mr-2"></div>
            )}
            <span className={`
                text-sm md:text-base lg:text-lg font-sans
                ${isActive ? 'font-medium' : 'font-normal'} 
                whitespace-nowrap
            `}>
                {children}
            </span>
        </a>
    );
};

const Home: React.FC = () => {
const [currentSlide, setCurrentSlide] = useState(0);
const carouselRef = useRef<HTMLDivElement>(null);
const testimonials = [
  { image: '/audenza.png', alt: 'Testimonial 1' },
  { image: '/hot.png', alt: 'Testimonial 2' },
  { image: '/milk.png', alt: 'Testimonial 3' },
  { image: '/pops.png', alt: 'Testimonial 4' },
  { image: '/har.png', alt: 'Testimonial 5' }
];
const row1Logos = [
    { src: "/amazon.png", alt: "Amazon" },
    { src: "/shopify.png", alt: "Shopify" },
    { src: "/tiktok.png", alt: "TikTok" }
  ];

  const row2Logos = [
    { src: "/ebay.png", alt: "eBay" },
    { src: "/magento.png", alt: "Magento" },
    { src: "/etsy.png", alt: "Etsy" },
    { src: "/woo.png", alt: "WooCommerce" }
  ];

  const row3Logos = [
    { src: "/onbuy.png", alt: "OnBuy" },
    { src: "/dpd.png", alt: "DPD" },
    { src: "/shipstation.png", alt: "ShipStation" }
  ];


  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % testimonials.length;
    setCurrentSlide(nextIndex);
    scrollToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + testimonials.length) % testimonials.length;
    setCurrentSlide(prevIndex);
    scrollToSlide(prevIndex);
  };

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = 300 + 32; // 300px width + 32px gap (gap-8)
      carouselRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
    }
  };
    const primaryRed = 'bg-[#C10016]';
    const [activeDot, setActiveDot] = useState(1); // Start with middle dot active
    const router = useRouter();
    return (
        <>
            {/*Navbar*/}
            <Navbar/>
            {/* Home Content */}
<div className="min-h-screen relative bg-white pt-40 md:pt-60 lg:pt-80 overflow-auto">
    {/* PNG Background - MOVE ABOVE WHITE BACKGROUND */}
    <div className="absolute inset-0 z-0">
        <img 
            src="/bg.png"
            alt="Background pattern"
            className="w-full h-full lg:w-[1920px] lg:h-[1000px] object-cover"
        />
    </div>

                {/* Main Content */}
                <div className="relative z-10 pb-16">
                    <div className="container mx-auto px-4 md:px-6 lg:px-8">
                        
                        {/* GET SHIP DONE Badge */}
                        <div className="w-full max-w-[300px] mx-auto lg:mx-0 mb-8 mt-10 lg:-mt-28 lg:mb-12">
                            <div className="flex flex-row items-center justify-center py-3 px-7 gap-2.5 bg-red-50 border border-[#C10016] rounded-full">
                                <div className="w-1.5 h-1.5 bg-[#C10016] rounded-full" />
                                <span className="text-[#C10016] text-base md:text-[18px] font-medium tracking-widest text-center">
                                    GET SHIP DONE
                                </span>
                                <div className="w-1.5 h-1.5 bg-[#C10016] rounded-full" />
                            </div>
                        </div>

                        {/* Main Heading */}
                        <div className="w-full max-w-[900px] mx-auto lg:mx-0 mb-8 lg:mb-12">
                            <h1 className="text-4xl lg:text-[68px] font-bold leading-tight text-black text-center lg:text-left">
                                Bespoke Fulfilment, Built to Help Brands Scale
                            </h1>
                        </div>

                        {/* Description */}
                        <div className="w-full max-w-[759px] mx-auto lg:mx-0 mb-12 lg:mb-16">
                            <p className="text-lg lg:text-[24px] font-helvetica font-thin leading-[2] text-black text-center lg:text-left">
                                At FulfilX, we are more than just a 3PL. We are your Partner in Fulfilment. &quot;Your success is Our Success.&quot;
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                            {/* Explore Now Button */}
                            <a 
                                href="#explore"
                                className={`
                                    flex flex-row items-center gap-2
                                    ${primaryRed} 
                                    px-8 py-4 md:px-10 md:py-5
                                    rounded-lg
                                    transition duration-300 hover:brightness-110
                                `}
                            >
                                <span className="text-white text-base md:text-[18px] font-helvetica">
                                    Explore Now
                                </span>
                                <img 
                                    src="/arrow.svg"
                                    alt="Explore icon"
                                    className="w-2 h-2 md:w-3 md:h-3 lg:w-3 lg:h-4 object-contain"
                                />
                            </a>
                        </div>
                        {/* Image aligned with content but on the right */}
<div className="flex flex-col lg:flex-row items-center justify-between -mt-50 lg:mt-24">
    {/* Left content - can be empty or have other content */}
    <div className="flex-1"></div>
    
    {/* Right aligned image */}
    <div className="flex-1 flex justify-center lg:justify-end -mr-40 transform translate-y-[-250px] lg:translate-y-[-600px] relative z-0">
        <img 
            src="/helement.png"
            alt="Your image description"
            className="max-w-[765px] lg:max-w-[765px] object-contain hidden lg:block"
        />
    </div>
</div>
{/* Middle PNG Section */}
<section className="relative w-full h-[120px]">
  <div className="absolute -top-[480px] left-1/2 -translate-x-1/2 w-[320px] h-[18px]">
    <img 
      src="/stars.png" 
      alt="Design Element" 
      className="w-[320px] h-[18px] object-contain"
    />
  </div>
</section>



                    </div>
                </div>
                {/* Stats Section */}
<div className="relative w-full min-h-[725px] mt-0 lg:-mt-[600px] bg-[#A31E1E]">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img 
      src="/redbg.png"
      alt="Background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Content Container aligned with hero section */}
  <div className="relative z-10 pt-40 pb-24">
    <div className="container mx-auto px-4 md:px-6 lg:px-8">

      {/* Main Heading */}
      <h2 className="text-3xl lg:text-[54px] font-bold leading-tight lg:leading-[84px] tracking-[-0.01em] text-white mb-10 lg:mb-20">
        The fastest growing 3PL partner assisting in the First, Middle, and Last Mile with Global Reach. Helping You Expand with ease.
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        
        {/* Stat 1 */}
        <div className="w-full">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl lg:text-[54px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em] text-white">99.97</span>
            <span
              className="text-4xl lg:text-[54px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em] bg-transparent"
              style={{ color: 'transparent', WebkitTextStroke: '2px white' }}
            >
              %
            </span>
          </div>
          <div className="h-px bg-white/10 w-full my-6"></div>
          <p className="text-[20px] font-normal leading-[44px] text-white">On-Time Deliveries</p>
        </div>

        {/* Stat 2 */}
        <div className="w-full">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl lg:text-[54px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em] text-white">500,000</span>
            <span
              className="text-4xl lg:text-[54px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em] bg-transparent"
              style={{ color: 'transparent', WebkitTextStroke: '2px white' }}
            >
              sqft
            </span>
          </div>
          <div className="h-px bg-white/10 w-full my-6"></div>
          <p className="text-[20px] font-normal leading-[44px] text-white">Warehouse Space</p>
        </div>

        {/* Stat 3 */}
        <div className="w-full">
          <div className="flex items-baseline gap-2 mb-4">
            <span
              className="text-4xl lg:text-[54px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em] bg-transparent"
              style={{ color: 'transparent', WebkitTextStroke: '2px white' }}
            >
              4
            </span>
            <span className="text-4xl lg:text-[54px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em] text-white">Continents</span>
          </div>
          <div className="h-px bg-white/10 w-full my-6"></div>
          <p className="text-[20px] font-normal leading-[44px] text-white">North America, UK & Europe, UAE, Australia</p>
        </div>

      </div>
    </div>
  </div>
</div>
{/* Next Section */}
<section className="relative w-full pt-24 lg:pt-32 pb-16 bg-white overflow-hidden">
    <div className="absolute inset-0">
    <img 
      src="/bg.png"
      alt="Background"
      className="w-full h-full lg:w-[1920px] lg:h-[1000px] object-cover"
    />
  </div>
  {/* Decorative rectangle image - Fixed positioning */}
<div className="absolute hidden lg:block pointer-events-none" 
  style={{ 
    width: '700px',
    height: '640px',
    left: 'calc(50% - 480px/2 + 380px)',
    top: '8rem',
    backdropFilter: 'blur(12.5px)'
  }}>
  <img 
    src="/px.png" 
    alt="Decorative square" 
    className="w-full h-full rounded-[34px] object-cover"
  />
</div>

  {/* Content */}
  <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
    {/* Badge */}
    <div className="inline-flex items-center justify-center px-11 py-4 gap-2.5 rounded-[120px] bg-[#C10016]/10 mb-8">
      <span className="text-[#C10016] font-normal text-[16px] tracking-[0.2em] uppercase">
        We Respond In Real Time
      </span>
    </div>

    {/* Heading */}
    <h2 className="text-4xl lg:text-[64px] font-bold leading-tight lg:leading-[74px] -tracking-[0.01em] text-black max-w-2xl mb-6">
      Looking to Elevate Your <span className="text-[#C10016]">Logistics?</span>
    </h2>

    {/* Paragraph */}
    <p className="text-lg lg:text-[22px] font-normal leading-loose lg:leading-[44px] text-black max-w-3xl mb-10">
    We work with startup and scale up brands our bespoke fulfilment services are a game changer in the 3PL market. We help brands get there logistics right so you can focus on growing.
    </p>
    <p className="text-lg lg:text-[22px] font-normal leading-loose lg:leading-[44px] text-black max-w-3xl mb-10">
    Ready to have <span className="text-[#C10016]">Stress-Free Logistics?</span>
    </p>

    {/* CTA Button with icon */}
    <a 
      href="#contact"
      className="inline-flex items-center px-6 py-2 gap-2.5 rounded-md bg-[#C10016] cursor-pointer transition duration-300 hover:brightness-110 mt-12"
    >
      <span className="text-white font-normal text-[18px] leading-[36px]">Let&apos;s Talk</span>
      <img 
        src="/arrow.svg" 
        alt="Arrow icon" 
        className="w-4 h-4 object-contain"
      />
    </a>
  </div>
</section>
<section className="relative w-full h-auto py-20 lg:h-[1020px] overflow-hidden">
  {/* Background with overlay */}
  <div 
    className="absolute inset-0 bg-black/65"
    style={{
      backgroundImage: `url('/shiphome.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: 'scaleX(-1)'
    }}
  />

  {/* Title lowered slightly */}
  <div className="relative lg:absolute lg:top-32 w-full text-center text-white mb-10 lg:mb-0">
    <h2 className="text-4xl lg:text-[64px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em]">
      We Make Ship Happen
    </h2>
  </div>

  {/* Grid moved slightly upward + reduced spacing */}
  <div className="relative lg:absolute lg:bottom-[150px] lg:left-1/2 lg:-translate-x-1/2 flex flex-col lg:flex-row gap-[20px] items-center px-4">

    {[
      { title: "Fulfilment Services", img: "/shiphappens1.png" },
      { title: "Amazon FBA & SFP", img: "/shiphappens2.png" },
      { title: "Packaging Solutions", img: "/shiphappens3.png" },
      { title: "Freight Services", img: "/shiphappens4.png" },
      { title: "Rework & Quality Control", img: "/shiphappens5.png" },
    ].map((item, i) => (
      <div key={i} className="relative h-[300px] w-full lg:h-[480px] lg:w-[250px] group overflow-hidden rounded-xl">

        {/* Divider line left of each except first - hidden on mobile */}
        {i !== 0 && <div className="absolute -left-0 top-0 h-full w-px bg-white/30 hidden lg:block" />}

        {/* Background blurred image */}
        <div 
          className="absolute inset-0 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:blur-none group-hover:scale-105 blur-sm scale-100"
          style={{
            backgroundImage: `url(${item.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        

        {/* Vertical title */}
        <h3 className="absolute left-6 bottom-4 lg:left-11 text-white font-normal text-2xl lg:text-[32px] tracking-[-0.01em] rotate-0 lg:rotate-[-90deg] whitespace-nowrap origin-bottom-left">
        {item.title}
        </h3>
        {/* Arrow Icon on right */}
        <img 
          src="/arrow.svg"
          alt="arrow"
          className="absolute right-4 top-4 w-6 h-6 opacity-70 group-hover:opacity-100 transition"
        />
      </div>
    ))}
  </div>

  {/* CTA remains at the bottom */}
  <div className="relative lg:absolute lg:bottom-10 lg:left-1/2 lg:-translate-x-1/2 mt-10 lg:mt-0 text-center flex justify-center">
    <button className="flex items-center gap-3 bg-[#C10016] text-white px-8 py-4 rounded-md font-bold text-[18px]">
      View All Services
      <img src="/arrow.svg" className="w-4 h-4" />
    </button>
  </div>
</section>
<section className="relative w-full bg-white py-16 md:py-32 overflow-hidden">
  {/* Background Image */}
  <img
    src="/inventory.png"
    alt="Warehouse background"
    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
  />

   {/* Marquee Text with Colored Words and Separator Circles */}
  <div className="relative overflow-hidden whitespace-nowrap py-4 -mt-10">
    <div className="animate-marquee text-[28px] md:text-[40px] font-bold tracking-tight flex items-center mb-12 gap-16 md:gap-24 text-black">
      {/* First set */}
      <div className="flex items-center gap-16 md:gap-24">
        <span className="flex items-center gap-2">
          <span className="text-black">Real-Time</span>
          <span className="text-[#C10016]">Communication</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Inventory</span>
          <span className="text-[#C10016]">Management</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Warehousing</span>
          <span className="text-[#C10016]">& Distribution</span>
        </span>
      </div>
      
      {/* Duplicated for seamless animation */}
      <div className="flex items-center gap-16 md:gap-24">
        <span className="flex items-center gap-2">
          <span className="text-black">Real-Time</span>
          <span className="text-[#C10016]">Communication</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Inventory</span>
          <span className="text-[#C10016]">Management</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Warehousing</span>
          <span className="text-[#C10016]">& Distribution</span>
        </span>
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
      </div>
    </div>
  </div>
    <h3 className="text-center text-black font-bold text-[28px] md:text-[40px]">Easy <span className="text-[#C10016]">Setup</span></h3>

 <div className="relative max-w-[1400px] mx-auto mt-12 md:mt-20 px-4 pt-20 transform -translate-x-10 -translate-y-6">
      
      {/* Curved connecting line - hidden on mobile, visible on md+ */}
      <div className="hidden md:block absolute top-[60px] left-0 right-0 w-full pointer-events-none">
        <svg 
          className="w-full h-auto" 
          viewBox="0 0 1132 95" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            opacity="0.15" 
            d="M0.385742 27.1976C88.8857 -9.80318 264.486 -4.20236 360.886 68.1976C426.719 92.031 597.386 129.196 748.886 19.1963C822.886 -9.13697 1011.39 -12.3024 1130.89 68.1976" 
            stroke="#C10016" 
            strokeWidth="2" 
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      {/* Step Circles aligned with text */}
      <style>{`
        @media (min-width: 768px) {
          .step-0-circle { transform: translate(-40px, -40px); }
          .step-0-content { transform: translate(-40px, -40px); }
          .step-1-circle { transform: translate(40px, 20px); }
          .step-1-content { transform: translate(40px, 20px); }
          .step-2-circle { transform: translate(150px, -30px); }
          .step-2-content { transform: translate(150px, -30px); }
          .step-3-circle { transform: translate(240px, 5px); }
          .step-3-content { transform: translate(240px, 5px); }
        }
      `}</style>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
  {[
    { 
      step: 1, 
      icon: "/connect.png", 
      title: "Connect",
      circleBg: "bg-black",
      titleColor: "text-black",
      description: "Get seamless integrations across all your sales channels and get set up within 24 hours.",
    },
    { 
      step: 2, 
      icon: "/invent.png", 
      title: "Inventory Management",
      circleBg: "bg-[#C10016]",
      titleColor: "text-[#C10016]",
      stepNumberBg: "bg-black",
      description: "We give you real-time visibility and control, helping you reduce stockouts, minimize overstock, and streamline your supply chain.",
    },
    { 
      step: 3, 
      icon: "/pick.png", 
      title: "Pick & Pack",
      circleBg: "bg-black",
      titleColor: "text-black",
      description: "Our software ensures that your Pick and Pack remain error free and we have maintained a 100% accuracy record since 2023.",
    },
    { 
      step: 4, 
      icon: "/drive.png", 
      title: "Delivery",
      circleBg: "bg-[#C10016]",
      titleColor: "text-[#C10016]",
      stepNumberBg: "bg-black",
      description: "Real-time tracking, multiple carrier options & automated processes. Delight customers with reliable logistics.",
    }
  ].map((item, i) => (
    <div key={i} className="flex flex-col items-start">
      {/* Step Circle with custom positioning */}
      <div 
        className={`relative mb-6 z-10 step-${i}-circle`} 
      >
        {/* Step number */}
        <span className={`absolute -top-2.5 -right-2.5 z-10 text-white text-sm font-bold ${item.stepNumberBg || 'bg-[#C10016]'} rounded-full w-10 h-10 flex items-center justify-center border-4 border-white`}>
          {`0${item.step}`}
        </span>
        
        {/* Main circle with icon */}
        <div className={`w-16 h-16 md:w-[104px] md:h-[104px] rounded-full ${item.circleBg} flex items-center justify-center overflow-hidden`}>
          <img 
            src={item.icon} 
            alt={`${item.title} icon`}
            className="w-18 h-18 object-cover p-2"
          />
        </div>
      </div>

      {/* Content Container with custom positioning */}
      <div 
        className={`step-${i}-content`}
      >
        {/* Title */}
        <h3 className={`font-bold text-xl md:text-2xl mb-4 ${item.titleColor}`}>
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-[16px] leading-6 md:leading-[28px]">
          {item.description}
        </p>
      </div>
    </div>
  ))}
</div>
    </div>
</section>
<section className="relative w-full h-auto py-20 lg:h-[512px]">
  {/* Background Image with Gradient Overlay */}
  <div 
    className="absolute inset-0 w-full h-full"
    style={{
      background: 'linear-gradient(0deg, rgba(193, 0, 22, 0.4), rgba(193, 0, 22, 0.4)), url(/respond.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
  </div>

  {/* Content Container */}
  <div className="relative w-full max-w-[835px] h-auto lg:h-[264px] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:top-[124px] flex flex-col items-center px-4 mx-auto">
    
    {/* Main Heading */}
    <h1 className="relative lg:absolute w-full lg:w-[835px] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:top-0 font-bold text-4xl lg:text-[74px] leading-tight lg:leading-[80px] tracking-tight text-white text-center">
      Ready to have a Chat?
    </h1>
    
    {/* Subheading */}
    <p className="relative lg:absolute w-full lg:w-[403px] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:top-[107px] font-normal text-xl lg:text-[28px] leading-relaxed lg:leading-[44px] text-white text-center mt-6 lg:mt-2">
      Do not hesitate to say Nǐn hǎo
    </p>
    
    {/* Button */}
    <div className="relative lg:absolute w-[160px] h-[60px] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:top-[204px] border border-white rounded-[6px] flex flex-col justify-center items-center gap-[10px] cursor-pointer transition duration-300 mt-10 lg:mt-6">
      <div className="flex flex-row items-center gap-[10px]">
        <span className="text-white font-normal text-[18px] leading-[36px]">Let&apos;s Talk</span>
        <img 
          src="/arrow.svg" 
          alt="Arrow icon" 
        className="w-4 h-4 object-contain"
      />
        
      </div>
    </div>
  </div>
</section>
<section className="relative w-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/donebg.png)'}}>
  <div className="relative max-w-[1490px] mx-auto px-4 py-16">
    
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
  
  {/* Left Content */}
  <div className="space-y-8">
    
    {/* "Why Choose Us" Badge - Now aligned with right content */}
    <div className="w-[240px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] flex items-center justify-center">
      <span className="font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
        Why Choose Us
      </span>
    </div>

    {/* Main Heading */}
    <h2 className="font-bold text-4xl lg:text-[74px] leading-tight lg:leading-[80px] tracking-tight text-black">
      We Get Ship Done!
    </h2>

    {/* History, Mission, Vision Tabs */}
    <div className="space-y-4">
      <div className="flex space-x-8 border-b border-black/25 pb-4 overflow-x-auto">
        <button className="font-bold text-xl lg:text-[28px] leading-[80px] text-[#C10016] relative whitespace-nowrap">
          History
          <div className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#C10016]"></div>
        </button>
        <button className="font-bold text-xl lg:text-[28px] leading-[80px] text-black whitespace-nowrap">
          Mission
        </button>
        <button className="font-bold text-xl lg:text-[28px] leading-[80px] text-black whitespace-nowrap">
          Vision
        </button>
      </div>

      {/* Content */}
      <p className="font-normal text-base lg:text-[20px] leading-relaxed lg:leading-[48px] text-black">
        At FulfilX we are more than just a logistics company. Our motto is &quot;Your success is our success&quot; that&apos;s why we see every brand as a partner, not just a customer. We are on hand to help your business grow and build customer-centric solutions.
      </p>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 lg:pt-20">
      
      {/* Orders Shipped */}
<div className="flex items-center gap-4">
  <div className="w-[150px] h-[80px] bg-black/10 rounded-[10px] flex items-center justify-center">
    <span className="font-bold text-3xl lg:text-[40px] leading-[80px] tracking-tight text-black">
      5-Stars
    </span>
  </div>
  <p className="font-normal text-lg lg:text-[20px] leading-[30px] lg:leading-[40px] text-[#C10016]">
    On <br/> Google
  </p>
</div>

      {/* Courier Partners Globally */}
<div className="flex items-center gap-4">
  <div className="w-[150px] h-[80px] bg-black/10 rounded-[10px] flex items-center justify-center">
    <span className="font-bold text-3xl lg:text-[40px] leading-[80px] tracking-tight text-black">
      20+
    </span>
  </div>
  <p className="font-normal text-lg lg:text-[20px] leading-[30px] lg:leading-[40px] text-[#C10016]">
    Courier Partners <br/> Globally
  </p>
</div>

      {/* Customer Satisfaction */}
<div className="flex items-center gap-4">
  <div className="w-[150px] h-[80px] bg-black/10 rounded-[10px] flex items-center justify-center">
    <span className="font-bold text-3xl lg:text-[40px] leading-[80px] tracking-tight text-black">
      100+
    </span>
  </div>
  <p className="font-normal text-lg lg:text-[20px] leading-[30px] lg:leading-[40px] text-[#C10016]">
    Brands<br/>Managed
  </p>
</div>

    </div>

  </div>


      {/* Right Content */}
      <div className="space-y-8">
        {/* Image with Pagination */}
<div className="relative">
  {/* Image that changes based on active dot */}
  <div 
    className="w-full h-[400px] lg:h-[900px] bg-cover bg-center rounded-[24px] backdrop-blur-[12.5px]"
    style={{
      backgroundImage: `url(${
        activeDot === 0 ? '/box.png' :
        activeDot === 1 ? '/peep.png' :
        activeDot === 2 ? 'shipdone.png' :
        '/image3.jpg'
      })`
    }}
  >
  </div>
  
  {/* Pagination Dots */}
  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
    <div className="w-[72px] h-[24px] bg-white rounded-[50px] flex items-center justify-center gap-3 shadow-lg">
      <div 
        className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
          activeDot === 0 ? 'border border-[#C10016]' : 'bg-[#C10016] opacity-20 w-[6px] h-[6px]'
        }`}
        onClick={() => setActiveDot(0)}
      ></div>
      <div 
        className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
          activeDot === 1 ? 'border border-[#C10016]' : 'bg-[#C10016] opacity-20 w-[6px] h-[6px]'
        }`}
        onClick={() => setActiveDot(1)}
      ></div>
      <div 
        className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
          activeDot === 2 ? 'border border-[#C10016]' : 'bg-[#C10016] opacity-20 w-[6px] h-[6px]'
        }`}
        onClick={() => setActiveDot(2)}
      ></div>
    </div>
  </div>
</div>
      </div>

    </div>

    

  </div>
    <div className="relative max-w-[1490px] mx-auto px-4 py-16">
    
    {/* "Global Presence" Badge */}
    <div className="flex justify-center">
      <div className="w-[250px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] flex items-center justify-center">
        <span className="font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
          global presence
        </span>
      </div>
    </div>

    {/* Main Heading */}
    <h2 className="text-center font-bold text-[64px] leading-[74px] text-black mt-16 max-w-[700px] mx-auto">
  Our <span className="text-[#C10016]">Worldwide Network</span>
</h2>

    {/* First Row of Countries */}
    <div className="flex justify-center items-center gap-16 mt-20">
      {/* United Kingdom */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/UK.png)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">United Kingdom</span>
      </div>

      {/* United States */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/US.png)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">California</span>
      </div>

      {/* San Francisco */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/AT.png)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">Atlanta</span>
      </div>

      {/* Georgia */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] border border-black/10 bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/NET.png)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">Netherlands</span>
      </div>

      {/* UAE */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/UAE.png)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">UAE</span>
      </div>
    </div>

    {/* Second Row of Countries */}
    <div className="flex justify-center items-center gap-12 mt-8">
      {/* Saudi */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/Saudi.png)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">Saudi</span>
      </div>

      {/* Bahrain */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] border border-black/10 bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/B.png)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">Bahrain</span>
      </div>

      {/* Australia */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/Aus.png)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">Australia</span>
      </div>
    </div>

    {/* World Map Image */}
    <div className="relative w-full h-[698px] mt-20">
      <div className="w-full h-full bg-cover bg-center rounded-lg" style={{backgroundImage: 'url(/world-map.png)'}}></div>
      
{/* Location Markers */}
{/* UK Marker */}
<div className="absolute left-[49%] top-[30%] group">
  <div className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
    <img src="/UK.png" alt="UK Flag" className="w-[16px] h-[12px]" />
    <p className="text-sm font-medium text-gray-800">United Kingdom</p>
</div>
    {/* Arrow */}
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>

{/* US Marker */}
<div className="absolute left-[13%] top-[51%] group">
  <div className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
      <img src="/US.png" alt="US Flag" className="w-[16px] h-[12px]" />
      <p className="text-sm font-medium text-gray-800">United States</p>
    </div>
    {/* Arrow */}
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>

{/* UAE Marker */}
<div className="absolute left-[54%] top-[60%] group">
  <div className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
      <img src="/UAE.png" alt="UAE Flag" className="w-[16px] h-[12px]" />
      <p className="text-sm font-medium text-gray-800">UAE</p>
    </div>
    {/* Arrow */}
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>

{/* Australia Marker */}
<div className="absolute left-[86%] top-[70%] group">
  <div className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
      <img src="/Aus.png" alt="AU Flag" className="w-[16px] h-[12px]" />
      <p className="text-sm font-medium text-gray-800">Australia</p>
    </div>
    {/* Arrow */}
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>

{/* Small UK Marker */}
<div className="absolute left-[25%] top-[62%] group">
  <div className="w-[40px] h-[40px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[26.67px] h-[26.67px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[13.33px] h-[13.33px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
   <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
    <img src="/Saudi.png" alt="Saudi Flag" className="w-[16px] h-[12px]" />
    <p className="text-sm font-medium text-gray-800">Saudi Arabia</p>
    </div>
    {/* Arrow */}
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>
    </div>
  </div>
</section>
<section className="relative w-full min-h-[800px] py-20">
  {/* Background with Linear Gradient */}
  <div 
    className="absolute inset-0 w-full h-full"
    style={{
      background: `
        linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
        linear-gradient(0deg, #C10016, #C10016),
        url(/leadingbrands.png)
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'normal, hue, normal'
    }}
  >
  </div>

  {/* Content */}
  <div className="relative max-w-[1300px] mx-auto px-4 z-10">
    
    {/* Main Heading */}
    <h2 className="text-center font-bold text-[74px] leading-[80px] tracking-tight text-white mt-16">
      We Integrate With
    </h2>

<div className="w-full overflow-hidden py-10">
  {/* First Row - Scroll Left */}
<div className="mt-20 slider-container">
  <div className="flex animate-infinite-scroll">
    {[...row1Logos, ...row1Logos].map((logo, index) => (
      <div key={index} className="group relative flex-shrink-0 mx-16">
        <div className="w-[240px] h-[100px] rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-transparent hover:scale-105">
          <img 
            src={logo.src}
            alt={logo.alt}
            className="h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    ))}
  </div>
</div>

{/* Second Row - Scroll Right */}
<div className="mt-12 slider-container">
  <div className="flex animate-infinite-scroll-reverse">
    {[...row2Logos, ...row2Logos].map((logo, index) => (
      <div key={index} className="group relative flex-shrink-0 mx-16">
        <div className="w-[200px] h-[80px] rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-transparent hover:scale-105">
          <img 
            src={logo.src}
            alt={logo.alt}
            className="h-14 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    ))}
  </div>
</div>

{/* Third Row - Scroll Left */}
<div className="mt-12 slider-container">
  <div className="flex animate-infinite-scroll">
    {[...row3Logos, ...row3Logos].map((logo, index) => (
      <div key={index} className="group relative flex-shrink-0 mx-16">
        <div className="w-[240px] h-[100px] rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-transparent hover:scale-105">
          <img 
            src={logo.src}
            alt={logo.alt}
            className="h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    ))}
  </div>
</div>
</div>

  </div>
  <div className="relative max-w-[1490px] mx-auto px-4 pt-24 z-10">
    
    {/* "our partners" Badge */}
    <div className="flex justify-start">
      <div className="w-[220px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] flex items-center justify-center">
        <span className="font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
          our partners
        </span>
      </div>
    </div>

    {/* Main Heading */}
    <h2 className="text-left font-bold text-[64px] leading-[80px] tracking-tight text-white mt-16 max-w-[960px]">
      Meet the people we make happy
    </h2>

    {/* Navigation Arrows - Aligned with badge and heading */}
    <div className="absolute right-4 top-24 flex gap-4">
      {/* Left Arrow */}
      <button 
        onClick={prevSlide}
        className="w-[56px] h-[56px] bg-[rgba(193,0,22,0.1)] rounded-full flex items-center justify-center hover:bg-[#C10016] transition-colors duration-300 group"
      >
        <img src="/next.svg" alt="Previous" className="w-4 h-4 transform rotate-180" />
      </button>

      {/* Right Arrow */}
      <button 
        onClick={nextSlide}
        className="w-[56px] h-[56px] bg-[rgba(193,0,22,0.1)] rounded-full flex items-center justify-center hover:bg-[rgba(193,0,22,0.8)] transition-colors duration-300"
      >
        <img src="/next.svg" alt="Next" className="w-4 h-4" />
      </button>
    </div>

    {/* Working Testimonial Cards Carousel */}
    <div className="relative mt-8">
      <div 
        ref={carouselRef}
        className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className={`min-w-[300px] h-[220px] bg-cover bg-center rounded-[24px] flex-shrink-0 transition-all duration-500 ${
              index === currentSlide ? 'scale-105 opacity-100 shadow-2xl' : 'scale-95 opacity-70'
            }`}
            style={{backgroundImage: `url(${testimonial.image})`}}
          >
            {/* You can add overlay content here */}
          </div>
        ))}
      </div>
    </div>

  </div>
</section>
<section className="relative w-full">
  {/* Two Column Layout */}
  <div className="flex">
    
    {/* Left Section - White Background */}
    <div className="w-1/2 bg-white relative min-h-[520px] flex items-center justify-center">
      <img src="/bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
      {/* Left Section Content - Centered */}
      <div className="max-w-[740px] w-full text-center px-8">
        
        {/* Heading */}
        <h2 className="font-bold text-[42px] leading-[54px] tracking-tight text-black mb-8">
          Our Awards
        </h2>

        {/* Red Line - Centered */}
        <div className="w-[100px] h-[1px] bg-[#C10016] mx-auto mb-12"></div>

        {/* Image Grid - Centered */}
        <div className="flex justify-center gap-16 mb-12">
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award1.png)'}}></div>
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award2.png)'}}></div>
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award3.png)'}}></div>
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award4.png)'}}></div>
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award5.png)'}}></div>
        </div>

      </div>
    </div>

    {/* Right Section - Red Background */}
    <div className="w-1/2 bg-[#DA192F] relative min-h-[520px] flex items-center justify-center">
      {/* Right Section Content - Centered */}
      <div className="max-w-[650px] w-full text-center px-8">
        
        {/* Heading */}
        <h2 className="font-bold text-[42px] leading-[54px] tracking-tight text-white mb-8">
          Accreditations
        </h2>

        {/* White Line - Centered */}
        <div className="w-[100px] h-[1px] bg-white mx-auto mb-12"></div>

        {/* Subtitle - Centered */}
        <p className="font-normal text-[24px] leading-[44px] text-white mb-12">
          Exceptional Quality Service
        </p>

        {/* CTA Button - Centered */}
        <button className="border border-white rounded-[6px] flex items-center justify-center gap-[10px] px-8 py-4 transition-colors duration-300 mx-auto">
          <span className="text-white font-bold text-[18px] leading-[36px]">Let&apos;s Talk</span>
          <img src="/arrow.svg" alt="arrow" className="w-4 h-4 object-contain" />
        </button>

      </div>
    </div>

  </div>
</section>
<Footer/>
</div>
        </>
        
    );
};

export default Home;
