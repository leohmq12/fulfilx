import React, { useRef, useState } from 'react';
import Footer from './footer';
import Navbar from './navbar';

const defaultMarkerPositions: Record<string, { x: number; y: number }> = {
  uk: { x: 45.84, y: 16.59 },
  ca: { x: 10.57, y: 53.58 },
  us: { x: 14.53, y: 41.47 },
  atl: { x: 21.68, y: 44.29 },
  nl: { x: 48.33, y: 19.41 },
  uae: { x: 66.51, y: 42.13 },
  bh: { x: 64.72, y: 36.16 },
  au: { x: 85.55, y: 86.42 },
  sa: { x: 62.94, y: 36.49 },
};



const Home: React.FC = () => {
const [currentSlide, setCurrentSlide] = useState(0);
const carouselRef = useRef<HTMLDivElement>(null);
const mapOverlayRef = useRef<HTMLDivElement>(null);

const getMarkerPos = (id: string) => defaultMarkerPositions[id] ?? { x: 0, y: 0 };

const testimonials = [
  { image: '/audenza.webp', alt: 'Testimonial 1' },
  { image: '/hot.webp', alt: 'Testimonial 2' },
  { image: '/milk.webp', alt: 'Testimonial 3' },
  { image: '/pops.webp', alt: 'Testimonial 4' },
  { image: '/har.webp', alt: 'Testimonial 5' }
];
const row1Logos = [
    { src: "/amazon.webp", alt: "Amazon" },
    { src: "/shopify.webp", alt: "Shopify" },
    { src: "/tiktok.webp", alt: "TikTok" }
  ];

  const row2Logos = [
    { src: "/ebay.webp", alt: "eBay" },
    { src: "/magento.webp", alt: "Magento" },
    { src: "/etsy.webp", alt: "Etsy" },
    { src: "/woo.webp", alt: "WooCommerce" }
  ];

  const row3Logos = [
    { src: "/onbuy.webp", alt: "OnBuy" },
    { src: "/dpd.webp", alt: "DPD" },
    { src: "/shipstation.webp", alt: "ShipStation" }
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
    const [whyChooseTab, setWhyChooseTab] = useState<'history' | 'mission' | 'vision'>('history');

    const whyChooseContent: Record<typeof whyChooseTab, string> = {
      history:
        'FULFIL.X was born out of frustration. As brand owners, we experienced firsthand the challenges of working with complex fulfilment providers and systems that offered little transparency. Drawing on years of expertise in global logistics, we set out to build a 3PL that does things differently.',
      mission:
        'FULFIL.X exists to disrupt the logistics industry with a radically brand-centric approach to fulfilment. We empower brands to own their customer experience from click to delivery.',
      vision:
        'To redefine fulfilment with a brand-centric approach that gives businesses the transparency, control, and confidence to own their customer experience end to end. FULFIL.X envisions a logistics ecosystem where fulfilment is simple, visible, and aligned with each brand’s identity — enabling faster growth, stronger customer relationships, and seamless delivery experiences that reflect the brand at every touchpoint.',
    };
    return (
        <>
            {/*Navbar*/}
            <Navbar/>
            {/* Home Content */}
<div className="min-h-screen relative bg-white pt-24 md:pt-32 lg:pt-36 overflow-x-hidden">
    {/* PNG Background - MOVE ABOVE WHITE BACKGROUND */}
    <div className="absolute inset-0 z-0">
        <img 
            src="/bg.webp"
            alt="Background pattern"
            className="w-full h-full object-cover"
        />
    </div>

                {/* Main Content */}
                <div className="relative z-10 pb-4">
                    <div className="w-full px-4 md:px-6 lg:px-8 2xl:px-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
                            <div className="flex flex-col items-center lg:items-start">
                                <div className="w-full max-w-[300px] mb-8 mt-10 lg:mt-0">
                                    <div className="flex flex-row items-center justify-center py-3 px-7 gap-2.5 bg-red-50 border border-[#C10016] rounded-full">
                                        <div className="w-1.5 h-1.5 bg-[#C10016] rounded-full" />
                                        <span className="text-[#C10016] text-base md:text-[18px] font-medium tracking-widest text-center">
                                            GET SHIP DONE
                                        </span>
                                        <div className="w-1.5 h-1.5 bg-[#C10016] rounded-full" />
                                    </div>
                                </div>

                                <div className="w-full mb-8 lg:mb-12">
                                    <h1 className="text-4xl lg:text-[50px] font-bold leading-tight text-black text-center lg:text-left">
                                        Bespoke Fulfilment, Built to Help Brands Scale
                                    </h1>
                                </div>

                                <div className="w-full max-w-[759px] mb-12 lg:mb-16">
                                    <p className="text-lg lg:text-[18px] font-helvetica font-thin leading-[2] text-black text-center lg:text-left">
                                        At FulfilX, we are more than just a 3PL. We are your partner in fulfilment. &quot;Your success is Our Success.&quot;
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full">
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
                                      {/* <div className="mt-6 flex justify-end w-full">
                                    <img 
                                        src="/google_rev.webp" 
                                        alt="Google reviews" 
                                        className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[80px] h-auto object-contain mx-auto"
                                    />
                                </div> */}
                            </div>

                            <div className="flex justify-center lg:justify-end w-full">
                                <video 
                                    src="/banner-animation.webm"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full max-w-[520px] sm:max-w-[640px] lg:max-w-[900px] xl:max-w-[1000px] 2xl:max-w-[1100px] max-h-[420px] sm:max-h-[520px] lg:max-h-[650px] object-contain"
                                />
                            </div>
                        </div>

                    </div>
                    <div className=" flex justify-end w-full">
                                    <img 
                                        src="/google_rev.webp" 
                                        alt="Google reviews" 
                                        className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[80px] h-auto object-contain mx-auto"
                                    />
                                </div>
                </div>
                {/* Stats Section */}
<div className="relative w-full min-h-[725px] mt-0 bg-[#A31E1E]">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img 
      src="/redbg.webp"
      alt="Background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Content Container aligned with hero section */}
  <div className="relative z-10 pt-16 lg:pt-32 pb-24">
    <div className="w-full px-4 md:px-6 lg:px-8 2xl:px-16">

      {/* Main Heading */}
      <h2 className="text-3xl lg:text-[54px] font-bold leading-tight lg:leading-[84px] tracking-[-0.01em] text-white mb-10 lg:mb-20">
  The fastest growing 3PL partner assisting in the first, middle, and last mile with Global reach. Helping you expand with ease.      </h2>

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
            <span className="text-4xl lg:text-[54px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em] text-white">Global Hubs</span>
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
      src="/bg.webp"
      alt="Background"
      className="w-full h-full object-cover"
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
    src="/px.webp" 
    alt="Decorative square" 
    className="w-full h-full rounded-[34px] object-cover"
  />
</div>

  {/* Content */}
  <div className="w-full px-4 md:px-6 lg:px-8 2xl:px-16 relative z-10">
  <div className="mx-auto w-full max-w-[1490px]">
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
We work with startup and scale up brands, our bespoke fulfilment services are a
game changer in the 3PL market. We help brands get their logistics right so you can
focus on growing.    </p>
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
  </div>
</section>

<section className="relative w-full h-auto py-20 lg:h-[1020px] overflow-hidden">
  {/* Background with overlay */}
  <div
    className="absolute inset-0 bg-black/65"
    style={{
      backgroundImage: `url('/shiphome.webp')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: 'scaleX(-1)'
    }}
  />

  <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 2xl:px-16 py-16 lg:py-24">
    <div className="mx-auto w-full max-w-[1490px]">
      <h2 className="text-center text-white text-4xl lg:text-[64px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em]">
        We Make Ship Happen
      </h2>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {[
          { title: "Fulfilment Services", img: "/shiphappens1.webp" },
          { title: "Amazon FBA & SFP", img: "/shiphappens2.webp" },
          { title: "Packaging Solutions", img: "/shiphappens3.webp" },
          { title: "Freight Services", img: "/shiphappens4.webp" },
          { title: "Rework & Quality Control", img: "/shiphappens5.webp" },
        ].map((item, i) => (
          <div key={i} className="relative h-[260px] sm:h-[320px] lg:h-[480px] w-full group overflow-hidden rounded-xl">
            <div 
              className="absolute inset-0 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:blur-none group-hover:scale-105 blur-sm scale-100"
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            <h3 className="absolute left-6 bottom-4 lg:left-11 text-white font-normal text-2xl lg:text-[32px] tracking-[-0.01em] rotate-0 lg:rotate-[-90deg] whitespace-nowrap origin-bottom-left">
              {item.title}
            </h3>

            <img 
              src="/arrow.svg"
              alt="arrow"
              className="absolute right-4 top-4 w-6 h-6 opacity-70 group-hover:opacity-100 transition"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button className="flex items-center gap-3 bg-[#C10016] text-white px-8 py-4 rounded-md font-bold text-[18px]">
          View All Services
          <img src="/arrow.svg" className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</section>
<section className="relative w-full bg-white py-16 md:py-32 overflow-hidden">
  {/* Background Image */}
  <img
    src="/inventory.webp"
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
  <div className="w-full px-4 md:px-6 lg:px-8 2xl:px-16">
    <div className="mx-auto w-full max-w-[1490px]">
      <h3 className="text-center text-black font-bold text-[28px] md:text-[40px]">Easy <span className="text-[#C10016]">Setup</span></h3>

 <div className="relative mt-12 md:mt-20 pt-16 md:pt-20 w-full md:-translate-y-6">
      
      {/* Curved connecting line - hidden on mobile/tablet */}
      <div className="hidden lg:block absolute top-[60px] left-0 right-0 w-full pointer-events-none">
        <svg 
          className="w-full h-auto" 
          viewBox="0 0 1132 95" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            opacity="0.15" 
            d="M0.385742 67.1976C88.8857 9.80311 264.486 -4.20236 360.886 79.1976C426.719 82.031 400.386 129.196 700.886 19.1963C822.886 -9.13697 1011.39 160.3024 900.89 68.1976" 
            stroke="#C10016" 
            strokeWidth="2" 
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      {/* Step Circles aligned with text */}
      <style>{`
        @media (min-width: 1024px) {
          // .step-0-circle { transform: translate(clamp(2px, -3vw, -20px), clamp(-40px, -3vw, -20px)); }
          // .step-1-circle { transform: translate(clamp(10px, 3vw, 40px), clamp(10px, 1.5vw, 20px)); }
          // .step-2-circle { transform: translate(clamp(60px, 10vw, 150px), clamp(-30px, -2vw, -10px)); }
          // .step-3-circle { transform: translate(clamp(90px, 16vw, 240px), clamp(0px, 0.5vw, 5px)); }
        }
      `}</style>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 justify-items-center lg:justify-items-stretch ">
  {[
    { 
      step: 1, 
      icon: "/connect.webp", 
      title: "Connect",
      circleBg: "bg-black",
      titleColor: "text-black",
      description: "Get seamless integrations across all your sales channels and get set up within 24 hours.",
    },
    { 
      step: 2, 
      icon: "/invent.webp", 
      title: "Inventory Management",
      circleBg: "bg-[#C10016]",
      titleColor: "text-[#C10016]",
      stepNumberBg: "bg-black",
      description: "We give you real-time visibility and control, helping you reduce stockouts, minimize overstock, and streamline your supply chain.",
    },
    { 
      step: 3, 
      icon: "/pick.webp", 
      title: "Pick & Pack",
      circleBg: "bg-black",
      titleColor: "text-black",
      description: "Our software ensures that your Pick and Pack remain error free and we have maintained a near 100% accuracy record since 2023",
    },
    { 
      step: 4, 
      icon: "/drive.webp", 
      title: "Delivery",
      circleBg: "bg-[#C10016]",
      titleColor: "text-[#C10016]",
      stepNumberBg: "bg-black",
      description: "Real-time tracking, multiple carrier options & automated processes. Delight customers with reliable logistics.",
    }
  ].map((item, i) => (
    <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left w-full max-w-[420px] sm:max-w-none px-2 sm:px-0 min-w-0 ">
      {/* Step Circle with custom positioning */}
      <div 
        className={`relative mb-6 z-10 step-${i}-circle `} 
      >
        {/* Step number */}
        <span className={`absolute -top-2.5 -right-2.5 z-10 text-white text-sm font-bold ${item.stepNumberBg || 'bg-[#C10016]'} rounded-full w-10 h-10 flex items-center justify-center border-4 border-white `}>
          {`0${item.step}`}
        </span>
        
        {/* Main circle with icon */}
        <div className={`w-16 h-16 md:w-[104px] md:h-[104px] rounded-full ${item.circleBg} flex items-center justify-center overflow-hidden p-0 ml-6 shrink-0 `}>
          <img 
            src={item.icon} 
            alt={`${item.title} icon`}
            className="w-18 h-18 object-cover p-2 m-0" 
          />
        </div>
      </div>

      {/* Content Container with custom positioning */}
      <div 
        className={`step-${i}-content min-w-0 w-full`}
      >
        {/* Title */}
        <h3 className={`font-bold text-xl md:text-2xl mb-4 ${item.titleColor} break-words`}>
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-[16px] leading-6 md:leading-[28px] break-words">
          {item.description}
        </p>
      </div>
    </div>
  ))}
      </div>
    </div>
  </div>
</div>
</section>
<section className="relative w-full h-auto py-20 lg:h-[512px]">
  {/* Background Image with Gradient Overlay */}
  <div 
    className="absolute inset-0 w-full h-full"
    style={{
      background: 'linear-gradient(0deg, rgba(193, 0, 22, 0.4), rgba(193, 0, 22, 0.4)), url(/respond.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
  </div>

  <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 2xl:px-16 py-16 lg:py-24">
    <div className="flex flex-col items-center text-center">
      <h1 className="font-bold text-4xl lg:text-[74px] leading-tight lg:leading-[80px] tracking-tight text-white">
        Ready to have a Chat?
      </h1>

      <p className="font-normal text-xl lg:text-[28px] leading-relaxed lg:leading-[44px] text-white mt-6">
        Do not hesitate to say Nǐn hǎo
      </p>

      <button className="mt-10 border border-white rounded-[6px] flex items-center justify-center gap-[10px] px-8 py-4 transition duration-300">
        <span className="text-white font-normal text-[18px] leading-[36px]">Let&apos;s Talk</span>
        <img 
          src="/arrow.svg" 
          alt="Arrow icon" 
          className="w-4 h-4 object-contain"
        />
      </button>
    </div>
  </div>
</section>
<section className="relative w-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/donebg.webp)'}}>
  <div className="relative w-full px-4 md:px-6 lg:px-8 2xl:px-16 py-16">
    
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
      <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-black/25 pb-4">
        <button
          className={`font-bold text-xl lg:text-[28px] leading-[44px] lg:leading-[80px] relative whitespace-nowrap ${
            whyChooseTab === 'history' ? 'text-[#C10016]' : 'text-black'
          }`}
          onClick={() => setWhyChooseTab('history')}
          type="button"
        >
          History
          {whyChooseTab === 'history' && (
            <div className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#C10016]"></div>
          )}
        </button>
        <button
          className={`font-bold text-xl lg:text-[28px] leading-[44px] lg:leading-[80px] relative whitespace-nowrap ${
            whyChooseTab === 'mission' ? 'text-[#C10016]' : 'text-black'
          }`}
          onClick={() => setWhyChooseTab('mission')}
          type="button"
        >
          Mission
          {whyChooseTab === 'mission' && (
            <div className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#C10016]"></div>
          )}
        </button>
        <button
          className={`font-bold text-xl lg:text-[28px] leading-[44px] lg:leading-[80px] relative whitespace-nowrap ${
            whyChooseTab === 'vision' ? 'text-[#C10016]' : 'text-black'
          }`}
          onClick={() => setWhyChooseTab('vision')}
          type="button"
        >
          Vision
          {whyChooseTab === 'vision' && (
            <div className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#C10016]"></div>
          )}
        </button>
      </div>

      {/* Content */}
      <p className="font-normal text-base lg:text-[20px] leading-relaxed lg:leading-[48px] text-black">
        {whyChooseContent[whyChooseTab]}
      </p>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 lg:pt-20">
      
      {/* Orders Shipped */}
<div className="flex items-center gap-4">
  <div className="w-[150px] h-[80px] bg-black/10 rounded-[10px] flex items-center justify-center">
    <span className="font-bold text-3xl lg:text-[40px] leading-[80px] tracking-tight text-black">
      <img src="/reviews.webp" alt="" />
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
        activeDot === 0 ? '/box.webp' :
        activeDot === 1 ? '/peep.webp' :
        activeDot === 2 ? '/shipdone.webp' :
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
    <div className="relative w-full px-4 md:px-6 lg:px-8 2xl:px-16 pt-16 pb-8">
    
    {/* "Global Presence" Badge */}
    <div className="flex justify-center">
      <div className="w-[250px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] flex items-center justify-center">
        <span className="font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
          global presence
        </span>
      </div>
    </div>

    {/* Main Heading */}
    <h2 className="text-center font-bold text-4xl lg:text-[64px] leading-tight lg:leading-[74px] text-black mt-10 lg:mt-16 max-w-[700px] mx-auto px-2">
  Our <span className="text-[#C10016]">Worldwide Network</span>
</h2>

    {/* First Row of Countries */}
    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-16 mt-10 lg:mt-20">
      {/* United Kingdom */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/UK.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">United Kingdom</span>
      </div>

      {/* United States */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/US.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">California</span>
      </div>

      {/* United States */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/US.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">United States</span>
      </div>

      {/* San Francisco */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/US.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">Atlanta</span>
      </div>

      {/* Georgia */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] border border-black/10 bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/NET.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">Netherlands</span>
      </div>

      {/* UAE */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/UAE.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">UAE</span>
      </div>
    </div>

    {/* Second Row of Countries */}
    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-12 mt-6 lg:mt-8">
      {/* Saudi */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/Saudi.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">Saudi</span>
      </div>

      {/* Bahrain */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] border border-black/10 bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/B.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">Bahrain</span>
      </div>

      {/* Australia */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/Aus.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">Australia</span>
      </div>
    </div>

    {/* World Map Image */}
    <div className="relative w-full mt-10 lg:mt-20">
      <img
        src="/world-map.webp"
        alt="World map"
        className="w-full h-auto rounded-lg"
      />

{/* Location Markers */}
<div className="absolute inset-0" ref={mapOverlayRef}>
{/* UK Marker */}
<div
  className="absolute group -translate-x-1/2 -translate-y-1/2"
  style={{ left: `${getMarkerPos('uk').x}%`, top: `${getMarkerPos('uk').y}%` }}
>
  <div className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
    <img src="/UK.webp" alt="UK Flag" className="w-[16px] h-[12px]" />
    <p className="text-sm font-medium text-gray-800">United Kingdom</p>
</div>
    {/* Arrow */}
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>

{/* California Marker */}
<div
  className="absolute group -translate-x-1/2 -translate-y-1/2"
  style={{ left: `${getMarkerPos('ca').x}%`, top: `${getMarkerPos('ca').y}%` }}
>
  <div className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
      <img src="/US.webp" alt="US Flag" className="w-[16px] h-[12px]" />
      <p className="text-sm font-medium text-gray-800">California</p>
    </div>
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>

{/* US Marker */}
<div
  className="absolute group -translate-x-1/2 -translate-y-1/2"
  style={{ left: `${getMarkerPos('us').x}%`, top: `${getMarkerPos('us').y}%` }}
>
  <div className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
      <img src="/US.webp" alt="US Flag" className="w-[16px] h-[12px]" />
      <p className="text-sm font-medium text-gray-800">United States</p>
    </div>
    {/* Arrow */}
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>

{/* Atlanta Marker */}
<div
  className="absolute group -translate-x-1/2 -translate-y-1/2"
  style={{ left: `${getMarkerPos('atl').x}%`, top: `${getMarkerPos('atl').y}%` }}
>
  <div className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
      <img src="/US.webp" alt="US Flag" className="w-[16px] h-[12px]" />
      <p className="text-sm font-medium text-gray-800">Atlanta</p>
    </div>
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>

{/* Netherlands Marker */}
<div
  className="absolute group -translate-x-1/2 -translate-y-1/2"
  style={{ left: `${getMarkerPos('nl').x}%`, top: `${getMarkerPos('nl').y}%` }}
>
  <div className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
      <img src="/NET.webp" alt="Netherlands Flag" className="w-[16px] h-[12px]" />
      <p className="text-sm font-medium text-gray-800">Netherlands</p>
    </div>
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>

{/* UAE Marker */}
<div
  className="absolute group -translate-x-1/2 -translate-y-1/2"
  style={{ left: `${getMarkerPos('uae').x}%`, top: `${getMarkerPos('uae').y}%` }}
>
  <div className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
      <img src="/UAE.webp" alt="UAE Flag" className="w-[16px] h-[12px]" />
      <p className="text-sm font-medium text-gray-800">UAE</p>
    </div>
    {/* Arrow */}
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>

{/* Bahrain Marker */}
<div
  className="absolute group -translate-x-1/2 -translate-y-1/2"
  style={{ left: `${getMarkerPos('bh').x}%`, top: `${getMarkerPos('bh').y}%` }}
>
  <div className="w-[40px] h-[40px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[26.67px] h-[26.67px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[13.33px] h-[13.33px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
      <img src="/B.webp" alt="Bahrain Flag" className="w-[16px] h-[12px]" />
      <p className="text-sm font-medium text-gray-800">Bahrain</p>
    </div>
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>

{/* Australia Marker */}
<div
  className="absolute group -translate-x-1/2 -translate-y-1/2"
  style={{ left: `${getMarkerPos('au').x}%`, top: `${getMarkerPos('au').y}%` }}
>
  <div className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
      <img src="/Aus.webp" alt="AU Flag" className="w-[16px] h-[12px]" />
      <p className="text-sm font-medium text-gray-800">Australia</p>
    </div>
    {/* Arrow */}
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>

{/* Saudi Arabia Marker */}
<div
  className="absolute group -translate-x-1/2 -translate-y-1/2"
  style={{ left: `${getMarkerPos('sa').x}%`, top: `${getMarkerPos('sa').y}%` }}
>
  <div className="w-[40px] h-[40px] border border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
    <div className="w-[26.67px] h-[26.67px] border border-[#C10016] rounded-full flex items-center justify-center">
      <div className="w-[13.33px] h-[13.33px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
   <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
    <img src="/Saudi.webp" alt="Saudi Flag" className="w-[16px] h-[12px]" />
    <p className="text-sm font-medium text-gray-800">Saudi Arabia</p>
    </div>
    {/* Arrow */}
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
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
        url(/leadingbrands.webp)
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
<div className="mt-20 slider-container overflow-hidden">
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
<div className="mt-12 slider-container overflow-hidden">
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
<div className="mt-12 slider-container overflow-hidden">
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
  <div className="relative w-full px-4 md:px-6 lg:px-8 2xl:px-16 pt-16 lg:pt-24 z-10">
    
    {/* "our partners" Badge */}
    <div className="flex justify-start">
      <div className="w-[220px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] flex items-center justify-center">
        <span className="font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
          our partners
        </span>
      </div>
    </div>

    {/* Main Heading */}
    <h2 className="text-left font-bold text-3xl sm:text-4xl lg:text-[64px] leading-tight lg:leading-[80px] tracking-tight text-white mt-10 lg:mt-16 max-w-[960px]">
      Meet the people we make happy
    </h2>

    {/* Navigation Arrows - Aligned with badge and heading */}
    <div className="flex gap-4 mt-8 lg:mt-0 lg:absolute lg:right-4 lg:top-24">
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
  <div className="flex flex-col lg:flex-row">
    
    {/* Left Section - White Background */}
    <div className="w-full lg:w-1/2 bg-white relative min-h-[520px] flex items-center justify-center py-12 lg:py-0">
      <img src="/bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
      {/* Left Section Content - Centered */}
      <div className="max-w-[740px] w-full text-center px-8">
        
        {/* Heading */}
        <h2 className="font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] tracking-tight text-black mb-8">
          Our Awards
        </h2>

        {/* Red Line - Centered */}
        <div className="w-[100px] h-[1px] bg-[#C10016] mx-auto mb-12"></div>

        {/* Image Grid - Centered */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-16 mb-12">
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award1.webp)'}}></div>
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award2.webp)'}}></div>
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award3.webp)'}}></div>
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award4.webp)'}}></div>
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award5.webp)'}}></div>
        </div>

      </div>
    </div>

    {/* Right Section - Red Background */}
    <div className="w-full lg:w-1/2 bg-[#DA192F] relative min-h-[520px] flex items-center justify-center py-12 lg:py-0">
      {/* Right Section Content - Centered */}
      <div className="max-w-[650px] w-full text-center px-8">
        
        {/* Heading */}
        <h2 className="font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] tracking-tight text-white mb-8">
          Accreditations
        </h2>

        {/* White Line - Centered */}
        <div className="w-[100px] h-[1px] bg-white mx-auto mb-12"></div>

        {/* Subtitle - Centered */}
        <p className="font-normal text-xl lg:text-[24px] leading-relaxed lg:leading-[44px] text-white mb-12">
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
