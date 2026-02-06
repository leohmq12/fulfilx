import Footer from '@/components/layout/footer';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import Animated, { FadeIn, FadeInUp, FadeOut } from 'react-native-reanimated';
import Navbar from './navbar';

const defaultMarkerPositions: Record<string, { x: number; y: number }> = {
  uk: { x: 47.84, y: 15.59 },
  ca: { x: 11.07, y: 50.58 },
  atl: { x: 21.68, y: 43.29 },
  nl: { x: 48.33, y: 19.41 },
  uae: { x: 66.31, y: 39.13 },
  bh: { x: 64.72, y: 36.16 },
  au: { x: 85.55, y: 86.42 },
  sa: { x: 62.94, y: 36.49 },
};



const Typewriter = ({ text, speed = 50, start = false, onComplete }: { text: string, speed?: number, start?: boolean, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!start) {
      setDisplayedText('');
      return;
    }
    
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [start, text, speed]);

  return <span>{displayedText}</span>;
};

const Home: React.FC = () => {
const router = useRouter();
const [startTyping, setStartTyping] = useState(false);
const [firstLineDone, setFirstLineDone] = useState(false);
const chatSectionRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setStartTyping(true);
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  if (chatSectionRef.current) observer.observe(chatSectionRef.current);
  return () => observer.disconnect();
}, []);

const mapOverlayRef = useRef<HTMLDivElement>(null);

const getMarkerPos = (id: string) => defaultMarkerPositions[id] ?? { x: 0, y: 0 };

const testimonials = [
  { image: '/partners/5.webp', alt: 'Partner 5' },
  { image: '/partners/6.webp', alt: 'Partner 6' },
  { image: '/partners/7.webp', alt: 'Partner 7' },
  { image: '/partners/8.webp', alt: 'Partner 8' },
  { image: '/partners/9.webp', alt: 'Partner 9' },
  { image: '/partners/11.webp', alt: 'Partner 11' },
  { image: '/partners/12.webp', alt: 'Partner 12' },
  { image: '/partners/13.webp', alt: 'Partner 13' },
  { image: '/partners/14.webp', alt: 'Partner 14' },
  { image: '/partners/15.webp', alt: 'Partner 15' },
  { image: '/partners/16.webp', alt: 'Partner 16' }
];
const row1Logos = [
    { src: "/couires/amazon.webp", alt: "" },
    { src: "/shopify.webp", alt: "" },
    { src: "/woo.webp", alt: "" }
    
  ];

  const row2Logos = [
    { src: "/ebay.webp", alt: "" },
    { src: "/dpd.webp", alt: "" },
    { src: "/onbuy.webp", alt: "Etsy" },
    { src: "/magento.webp", alt: "" }
    
  ];

  const row3Logos = [
    { src: "/tiktok.webp", alt: "Logo and Font" },
    { src: "/shipstation.webp", alt: "Nicpic" },
    { src: "/etsy.webp", alt: "Opulensi Luxury" },
  ];


    const primaryRed = 'bg-[#C10016]';
    const [activeDot, setActiveDot] = useState(1); // Start with middle dot active

    useEffect(() => {
      const timer = setInterval(() => {
        setActiveDot((prev) => (prev + 1) % 3);
      }, 3000);
      return () => clearInterval(timer);
    }, [activeDot]);
    const [whyChooseTab, setWhyChooseTab] = useState<'history' | 'mission' | 'vision'>('history');
    const [activeShipHappensIndex, setActiveShipHappensIndex] = useState(0);
    const [shipHappensPrevIndex, setShipHappensPrevIndex] = useState<number | null>(null);
    const shipHappensTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const whyChooseContent: Record<typeof whyChooseTab, string> = {
      history:
        'FULFIL.X was born out of frustration. As brand owners, we experienced firsthand the challenges of working with complex fulfilment providers and systems that offered little transparency. Drawing on years of expertise in global logistics, we set out to build a 3PL that does things differently.',
      mission:
        'FULFIL.X exists to disrupt the logistics industry with a radically brand-centric approach to fulfilment. We empower brands to own their customer experience from click to delivery.',
      vision:
        'To redefine fulfilment with a brand-centric approach that gives businesses the transparency, control, and confidence to own their customer experience end to end. FULFIL.X envisions a logistics ecosystem where fulfilment is simple, visible, and aligned with each brand’s identity — enabling faster growth, stronger customer relationships, and seamless delivery experiences that reflect the brand at every touchpoint.',
    };

    const shipHappensItems = [
      { title: "Fulfilment Services", img: "/9E2A9875.webp" },
      { title: "Amazon FBA & SFP", img: "/9E2A9857.webp" },
      { title: "Packaging Solutions", img: "/9E2A0286.webp" },
      { title: "Freight Services", img: "/9E2A9943.webp" },
      { title: "Rework & Quality Control", img: "/9E2A0085.webp" },
    ];

    useEffect(() => {
      return () => {
        if (shipHappensTimerRef.current) clearTimeout(shipHappensTimerRef.current);
      };
    }, []);

    const activateShipHappens = (index: number) => {
      if (index === activeShipHappensIndex) return;
      if (shipHappensTimerRef.current) clearTimeout(shipHappensTimerRef.current);
      setShipHappensPrevIndex(activeShipHappensIndex);
      setActiveShipHappensIndex(index);
      shipHappensTimerRef.current = setTimeout(() => {
        setShipHappensPrevIndex(null);
      }, 750);
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
                                    <p className="text-lg lg:text-[24px] font-helvetica font-thin leading-[2] text-black text-center lg:text-left">
                                        At FULFIL.X, we are more than just a 3PL. We are your partner in fulfilment.
                                        &quot;Your success is Our Success.&quot;
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full">
                                    <button 
                                        onClick={() => router.push('/services')}
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
                                    </button>
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
                    <div className=" flex justify-end w-full " >
                                    <button
                                      type="button"
                                      aria-label="Open Google reviews"
                                      onClick={() =>
                                        window.open(
                                          "https://www.google.com/search?sca_esv=20541e4f21a9d7f7&sxsrf=ANbL-n6la1mt9rMC2V7vLj6jDkpCGr-jEQ:1769008694039&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOXwAv3YEXZKPsl-nUlT6wYhGXlXqsFVh-oyC0tyABjEyjZCBk0CoEdNhj27Sl2hsvpDFgHFs0bQGfY1mnSWew6jYRo_p8GX0AXTemkh_XqBhnnH1O0hKt0daRKCE0qah_J7B7GeROHFzzyEWMS5BWx0syl6v&q=FULFIL.X+-+Storage+and+3pl+For+E-commerce+Brands+Reviews&sa=X&ved=2ahUKEwilh8D29pySAxUXQ0EAHVezKAcQ0bkNegQIKBAH&biw=1536&bih=730&dpr=1.25&aic=0",
                                          "_blank"
                                        )
                                      }
                                      className="w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[200px] xl:max-w-[200px] h-auto mx-auto cursor-pointer transition-transform duration-300 hover:scale-105"
                                    >
                                      <img
                                        src="/google_rev.webp"
                                        alt="Google reviews"
                                        className="w-full h-auto object-contain"
                                      />
                                    </button>
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
  <div className="relative z-10 pt-16 lg:pt-28 pb-24">
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
    src="/9E2A9962.webp" 
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
    <p className="text-lg lg:text-[22px]  font-normal leading-loose lg:leading-[44px] text-black max-w-3xl mb-10">
    Ready to have <span className="text-[#C10016]">Stress-Free Logistics?</span>
    </p>

    {/* CTA Button with icon */}
    <button 
      onClick={() => router.push('/contact')}
      className="inline-flex items-center px-6 py-2 gap-2.5 rounded-md bg-[#C10016] cursor-pointer transition duration-300 hover:brightness-110 mt-8"
    >
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

<section className="relative w-full h-auto py-14 lg:py-16 overflow-hidden">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url('/9E2A9826.webp')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  />
  <div className="absolute inset-0 bg-black/60" />

  <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 2xl:px-16 py-10 lg:py-12">
    <div className="mx-auto w-full max-w-[1490px]">
      <h2
        className="text-center text-white text-4xl lg:text-[64px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em]"
        style={{ textShadow: '0 4px 16px rgba(0,0,0,0.55)' }}
      >
        We Make Ship Happen
      </h2>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
        <div className="lg:col-span-1">
          <div className="flex flex-col gap-3">
            {shipHappensItems.map((item, i) => {
              const isActive = i === activeShipHappensIndex;
              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => activateShipHappens(i)}
                  onFocus={() => activateShipHappens(i)}
                  onClick={() => activateShipHappens(i)}
                  className={[
                    "w-full flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition",
                    "bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/35",
                    isActive ? "bg-white/12 border-white/45" : "",
                  ].join(" ")}
                >
                  <span className="text-white/70 font-medium text-base tabular-nums w-10 shrink-0">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span
                    className="flex-1 text-white font-normal text-[20px] lg:text-[22px] leading-tight"
                    style={{ textShadow: '0 3px 12px rgba(0,0,0,0.6)' }}
                  >
                    {item.title}
                  </span>
                  <img
                    src="/arrow.svg"
                    alt="arrow"
                    className={[
                      "w-5 h-5 object-contain opacity-70 transition",
                      isActive ? "opacity-100 translate-x-0.5" : "",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-full rounded-2xl overflow-hidden border border-white/15 bg-black/20">
            <style>{`
              @keyframes shipHappensSlideIn {
                0% { opacity: 0; transform: translateX(-36px); }
                100% { opacity: 1; transform: translateX(0); }
              }
            `}</style>
            {shipHappensPrevIndex !== null && (
              <img
                src={shipHappensItems[shipHappensPrevIndex]?.img}
                alt={shipHappensItems[shipHappensPrevIndex]?.title}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            )}
            <img
              key={`${activeShipHappensIndex}-${shipHappensItems[activeShipHappensIndex]?.img}`}
              src={shipHappensItems[activeShipHappensIndex]?.img}
              alt={shipHappensItems[activeShipHappensIndex]?.title}
              className="absolute inset-0 w-full h-full object-cover z-0"
              style={{ animation: 'shipHappensSlideIn 750ms cubic-bezier(0.22, 1, 0.36, 1)', willChange: 'transform' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent z-10" />
            <div className="absolute left-6 bottom-6 right-6 z-20">
              <div
                className="text-white font-normal text-2xl lg:text-[32px] tracking-[-0.01em]"
                style={{ textShadow: '0 4px 16px rgba(0,0,0,0.7)' }}
              >
                {shipHappensItems[activeShipHappensIndex]?.title}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button 
          onClick={() => router.push('/services')}
          className="flex items-center gap-3 bg-[#C10016] text-white px-8 py-4 rounded-md font-bold text-[18px]"
        >
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

 <div className="relative mt-12 md:mt-20 pt-16 md:pt-20 w-full md:-translate-y-6 md:-mb-6">
      
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
            opacity="0.25" 
            d="M50.285742 89.1976C88.8857 9.80311 264.486 -4.20236 360.886 69.1976C426.719 72.031 400.386 129.196 700.886 29.1963C822.886 -9.13697 1011.39 115.3024 900.89 48.1976" 
            stroke="#C10016" 
            strokeWidth="2" 
            strokeDasharray="6 7"
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
      description: "We give you real-time visibility and control, helping you reduce stockouts, minimise overstock, and streamline your supply chain.",
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
        <h3 className={`font-bold text-xl md:text-2xl mb-4 ${item.titleColor}`}>
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
<section className="relative w-full h-auto py-20 lg:min-h-[512px] overflow-hidden">
  <div 
    className="absolute inset-0 w-full h-full"
    style={{
      backgroundImage: 'url(/9E2A9909.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  />
  <div className="absolute inset-0 bg-black/45" />

  <div ref={chatSectionRef} className="relative z-10 w-full px-4 md:px-6 lg:px-8 2xl:px-16 py-16 lg:py-24">
    <div className="flex flex-col items-center text-center">
      <h1
        className="font-bold text-4xl lg:text-[74px] text-white leading-tight lg:leading-[80px] tracking-tight min-h-[48px] lg:min-h-[80px]"
        style={{ textShadow: '0 4px 16px rgba(0,0,0,0.65)' }}
      >
        <Typewriter text="Ready to have a Chat?" start={startTyping} onComplete={() => setFirstLineDone(true)} speed={70} />
      </h1>

      <p
        className="font-normal text-xl lg:text-[28px] leading-relaxed lg:leading-[44px] text-white mt-6 min-h-[28px] lg:min-h-[44px]"
        style={{ textShadow: '0 3px 12px rgba(0,0,0,0.6)' }}
      >
        <Typewriter text="Do not hesitate to say Nǐn hǎo" start={firstLineDone} speed={50} />
      </p>

      <button 
        onClick={() => router.push('/contact')}
        className="mt-10 bg-[#C10016]/90 rounded-[10px] flex items-center justify-center gap-[10px] px-8 py-4 transition duration-300 hover:bg-[#C10016] hover:scale-[1.03]"
      >
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
  <div className="space-y-8 lg:col-start-1 lg:row-start-1">
    
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
          className={`font-bold text-xl lg:text-[28px] leading-[44px] lg:leading-[80px] relative whitespace-nowrap transition-colors duration-300 ${
            whyChooseTab === 'history' ? 'text-[#C10016]' : 'text-black hover:text-black/70'
          }`}
          onClick={() => setWhyChooseTab('history')}
          type="button"
        >
          History
          {whyChooseTab === 'history' && (
            <Animated.View 
              entering={FadeIn.duration(400)}
              className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#C10016]"
            />
          )}
        </button>
        <button
          className={`font-bold text-xl lg:text-[28px] leading-[44px] lg:leading-[80px] relative whitespace-nowrap transition-colors duration-300 ${
            whyChooseTab === 'mission' ? 'text-[#C10016]' : 'text-black hover:text-black/70'
          }`}
          onClick={() => setWhyChooseTab('mission')}
          type="button"
        >
          Mission
          {whyChooseTab === 'mission' && (
            <Animated.View 
              entering={FadeIn.duration(500)}
              className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#C10016]"
            />
          )}
        </button>
        <button
          className={`font-bold text-xl lg:text-[28px] leading-[44px] lg:leading-[80px] relative whitespace-nowrap transition-colors duration-300 ${
            whyChooseTab === 'vision' ? 'text-[#C10016]' : 'text-black hover:text-black/70'
          }`}
          onClick={() => setWhyChooseTab('vision')}
          type="button"
        >
          Vision
          {whyChooseTab === 'vision' && (
            <Animated.View 
              entering={FadeIn.duration(500)}
              className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#C10016]"
            />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="relative overflow-hidden min-h-[120px]">
          <Animated.View 
            key={whyChooseTab}
            entering={FadeInUp.springify().damping(20).mass(1).stiffness(60)}
            exiting={FadeOut.duration(200)}
          >
            <p className="font-normal text-base lg:text-[20px] leading-relaxed lg:leading-[48px] text-black">
              {whyChooseContent[whyChooseTab]}
            </p>
          </Animated.View>
      </div>
    </div>

  </div>


      {/* Right Content */}
      <div className="space-y-8 lg:col-start-2 lg:row-start-1 lg:row-span-2">
        {/* Image with Pagination */}
        <div className="relative w-full h-[400px] lg:h-[900px] rounded-[24px] overflow-hidden backdrop-blur-[12.5px]">
          {/* Images with cross-fade animation */}
          {[
            '/9E2A9845-2.webp',
            '/9E2A9900.webp',
            '/9E2A9816.webp'
          ].map((img, index) => (
            <div 
              key={index}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                activeDot === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          
          {/* Pagination Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-[72px] h-[24px] bg-white rounded-[50px] flex items-center justify-center gap-3 shadow-lg">
              {[0, 1, 2].map((index) => (
                <div 
                  key={index}
                  className={`w-[10px] h-[10px] rounded-full cursor-pointer transition-all duration-300 ${
                    activeDot === index ? 'border border-[#C10016]' : 'bg-[#C10016] opacity-20 w-[6px] h-[6px]'
                  }`}
                  onClick={() => setActiveDot(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-start-1 lg:row-start-2">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 pt-10 lg:pt-16">
          {/* Orders Shipped */}
          <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-center sm:text-left sm:gap-4">
            <div className="w-[120px] h-[70px] sm:w-[150px] sm:h-[80px] bg-black/10 rounded-[10px] flex items-center justify-center p-2">
              <button
                type="button"
                aria-label="Open Google reviews"
                onClick={() =>
                  window.open(
                    "https://www.google.com/search?sca_esv=20541e4f21a9d7f7&sxsrf=ANbL-n6la1mt9rMC2V7vLj6jDkpCGr-jEQ:1769008694039&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOXwAv3YEXZKPsl-nUlT6wYhGXlXqsFVh-oyC0tyABjEyjZCBk0CoEdNhj27Sl2hsvpDFgHFs0bQGfY1mnSWew6jYRo_p8GX0AXTemkh_XqBhnnH1O0hKt0daRKCE0qah_J7B7GeROHFzzyEWMS5BWx0syl6v&q=FULFIL.X+-+Storage+and+3pl+For+E-commerce+Brands+Reviews&sa=X&ved=2ahUKEwilh8D29pySAxUXQ0EAHVezKAcQ0bkNegQIKBAH&biw=1536&bih=730&dpr=1.25&aic=0",
                    "_blank"
                  )
                }
                className="flex items-center justify-center w-full h-full max-w-[90px] sm:max-w-[120px] lg:max-w-[80px] cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <img
                  src="/google_rev.webp"
                  alt="Google reviews"
                  className="w-full h-auto object-contain max-w-[90px] sm:max-w-[120px] lg:max-w-[80px] mx-auto"
                />
              </button>
            </div>
            <p className="font-normal text-sm sm:text-lg lg:text-[20px] leading-[20px] sm:leading-[30px] lg:leading-[40px] text-[#C10016]">
              On <br /> Google
            </p>
          </div>

          {/* Courier Partners Globally */}
          <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-center sm:text-left sm:gap-4">
            <div className="w-[120px] h-[70px] sm:w-[150px] sm:h-[80px] bg-black/10 rounded-[10px] flex items-center justify-center">
              <span className="font-bold text-3xl lg:text-[40px] leading-[80px] tracking-tight text-black">
                20+
              </span>
            </div>
            <p className="font-normal text-sm sm:text-lg lg:text-[20px] leading-[20px] sm:leading-[30px] lg:leading-[40px] text-[#C10016]">
              Courier Partners <br /> Globally
            </p>
          </div>

          {/* Customer Satisfaction */}
          <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-center sm:text-left sm:gap-4">
            <div className="w-[120px] h-[70px] sm:w-[150px] sm:h-[80px] bg-black/10 rounded-[10px] flex items-center justify-center">
              <span className="font-bold text-3xl lg:text-[40px] leading-[80px] tracking-tight text-black">
                100+
              </span>
            </div>
            <p className="font-normal text-sm sm:text-lg lg:text-[20px] leading-[20px] sm:leading-[30px] lg:leading-[40px] text-[#C10016]">
              Brands
              <br />
              Managed
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-center sm:text-left sm:gap-4">
            <div className="w-[120px] h-[70px] sm:w-[150px] sm:h-[80px] bg-black/10 rounded-[10px] flex items-center justify-center">
              <span className="font-bold text-3xl lg:text-[40px] leading-[80px] tracking-tight text-black">
                99.5%
              </span>
            </div>
            <p className="font-normal text-sm sm:text-lg lg:text-[20px] leading-[20px] sm:leading-[30px] lg:leading-[40px] text-[#C10016]">
              Accuracy
              <br />
              Rate
            </p>
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

    {/* Countries - single flex so UAE and Saudi wrap together on mobile */}
    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-16 mt-10 lg:mt-20">
      {/* United Kingdom */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/UK.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">United Kingdom</span>
      </div>

      {/* California */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/US.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">California</span>
      </div>

      {/* Atlanta */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/US.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">Atlanta</span>
      </div>

      {/* Netherlands */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] border border-black/10 bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/NET.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">Netherlands</span>
      </div>

      {/* UAE */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/UAE.webp)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">UAE</span>
      </div>

      {/* Saudi - next to UAE so they share a row on mobile */}
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
  tabIndex={0}
  aria-label="United Kingdom location"
  style={{ left: `${getMarkerPos('uk').x}%`, top: `${getMarkerPos('uk').y}%` }}
>
  <div className="w-[24px] h-[24px] sm:w-[48px] sm:h-[48px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
    <img src="/location.webp" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
    <div className="hidden sm:flex w-[32px] h-[32px] border border-[#C10016] rounded-full items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
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
  tabIndex={0}
  aria-label="California location"
  style={{ left: `${getMarkerPos('ca').x}%`, top: `${getMarkerPos('ca').y}%` }}
>
  <div className="w-[24px] h-[24px] sm:w-[48px] sm:h-[48px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
    <img src="/location.webp" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
    <div className="hidden sm:flex w-[32px] h-[32px] border border-[#C10016] rounded-full items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
      <img src="/US.webp" alt="US Flag" className="w-[16px] h-[12px]" />
      <p className="text-sm font-medium text-gray-800">California</p>
    </div>
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
  </div>
</div>



{/* Atlanta Marker */}
<div
  className="absolute group -translate-x-1/2 -translate-y-1/2"
  tabIndex={0}
  aria-label="Atlanta location"
  style={{ left: `${getMarkerPos('atl').x}%`, top: `${getMarkerPos('atl').y}%` }}
>
  <div className="w-[24px] h-[24px] sm:w-[48px] sm:h-[48px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
    <img src="/location.webp" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
    <div className="hidden sm:flex w-[32px] h-[32px] border border-[#C10016] rounded-full items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
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
  tabIndex={0}
  aria-label="Netherlands location"
  style={{ left: `${getMarkerPos('nl').x}%`, top: `${getMarkerPos('nl').y}%` }}
>
  <div className="w-[24px] h-[24px] sm:w-[48px] sm:h-[48px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
    <img src="/location.webp" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
    <div className="hidden sm:flex w-[32px] h-[32px] border border-[#C10016] rounded-full items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
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
  tabIndex={0}
  aria-label="UAE location"
  style={{ left: `${getMarkerPos('uae').x}%`, top: `${getMarkerPos('uae').y}%` }}
>
  <div className="w-[24px] h-[24px] sm:w-[48px] sm:h-[48px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
    <img src="/location.webp" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
    <div className="hidden sm:flex w-[32px] h-[32px] border border-[#C10016] rounded-full items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
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
  tabIndex={0}
  aria-label="Bahrain location"
  style={{ left: `${getMarkerPos('bh').x}%`, top: `${getMarkerPos('bh').y}%` }}
>
  <div className="w-[24px] h-[24px] sm:w-[40px] sm:h-[40px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
    <img src="/location.webp" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
    <div className="hidden sm:flex w-[26.67px] h-[26.67px] border border-[#C10016] rounded-full items-center justify-center">
      <div className="w-[13.33px] h-[13.33px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
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
  tabIndex={0}
  aria-label="Australia location"
  style={{ left: `${getMarkerPos('au').x}%`, top: `${getMarkerPos('au').y}%` }}
>
  <div className="w-[24px] h-[24px] sm:w-[48px] sm:h-[48px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
    <img src="/location.webp" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
    <div className="hidden sm:flex w-[32px] h-[32px] border border-[#C10016] rounded-full items-center justify-center">
      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
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
  tabIndex={0}
  aria-label="Saudi Arabia location"
  style={{ left: `${getMarkerPos('sa').x}%`, top: `${getMarkerPos('sa').y}%` }}
>
  <div className="w-[24px] h-[24px] sm:w-[40px] sm:h-[40px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
    <img src="/location.webp" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
    <div className="hidden sm:flex w-[26.67px] h-[26.67px] border border-[#C10016] rounded-full items-center justify-center">
      <div className="w-[13.33px] h-[13.33px] bg-[#C10016] rounded-full"></div>
    </div>
  </div>
  {/* Hover Popup */}
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
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
<section className="relative w-full min-h-[560px] sm:min-h-[700px] lg:min-h-[800px] py-12 sm:py-16 lg:py-20">
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
    <h2 className="text-center font-bold text-3xl sm:text-4xl lg:text-[74px] leading-tight lg:leading-[80px] tracking-tight text-white mt-10 sm:mt-14 lg:mt-16">
      We Integrate With
    </h2>

<div className="w-full overflow-hidden py-6 sm:py-10">
  {/* First Row - Scroll Left */}
<div className="mt-10 sm:mt-16 lg:mt-20 slider-container overflow-hidden">
  <div className="flex animate-infinite-scroll">
    {[...row1Logos, ...row1Logos].map((logo, index) => (
      <div key={index} className="group relative flex-shrink-0 mx-8 sm:mx-12 lg:mx-16">
        <div className="w-[160px] h-[70px] sm:w-[200px] sm:h-[85px] lg:w-[240px] lg:h-[100px] rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-transparent hover:scale-105">
          <img 
            src={logo.src}
            alt={logo.alt}
            className="h-10 sm:h-12 lg:h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    ))}
  </div>
</div>

{/* Second Row - Scroll Right */}
<div className="mt-8 sm:mt-12 slider-container overflow-hidden">
  <div className="flex animate-infinite-scroll-reverse">
    {[...row2Logos, ...row2Logos].map((logo, index) => (
      <div key={index} className="group relative flex-shrink-0 mx-8 sm:mx-12 lg:mx-16">
        <div className="w-[150px] h-[60px] sm:w-[180px] sm:h-[72px] lg:w-[200px] lg:h-[80px] rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-transparent hover:scale-105">
          <img 
            src={logo.src}
            alt={logo.alt}
            className="h-9 sm:h-11 lg:h-14 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    ))}
  </div>
</div>

{/* Third Row - Scroll Left */}
<div className="mt-8 sm:mt-12 slider-container overflow-hidden">
  <div className="flex animate-infinite-scroll">
    {[...row3Logos, ...row3Logos].map((logo, index) => (
      <div key={index} className="group relative flex-shrink-0 mx-8 sm:mx-12 lg:mx-16">
        <div className="w-[160px] h-[70px] sm:w-[200px] sm:h-[85px] lg:w-[240px] lg:h-[100px] rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-transparent hover:scale-105">
          <img 
            src={logo.src}
            alt={logo.alt}
            className="h-10 sm:h-12 lg:h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    ))}
  </div>
</div>
</div>

  </div>
  <div className="relative w-full px-4 md:px-6 lg:px-8 2xl:px-16 pt-10 sm:pt-12 lg:pt-24 z-10">
    
    {/* "our partners" Badge */}
    <div className="flex justify-start">
      <div className="w-[180px] h-[40px] sm:w-[220px] sm:h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] flex items-center justify-center">
        <span className="font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
          our partners
        </span>
      </div>
    </div>

    {/* Main Heading */}
    <h2 className="text-left font-bold text-3xl sm:text-4xl lg:text-[64px] leading-tight lg:leading-[80px] tracking-tight text-white mt-6 sm:mt-8 lg:mt-16 max-w-[960px]">
     Meet the people we make happy
    </h2>

    <div className="w-full overflow-hidden py-6 sm:py-10">
      <div className="mt-6 sm:mt-8 slider-container overflow-hidden">
        <div className="flex animate-infinite-scroll">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div key={index} className="group relative flex-shrink-0 mx-3 sm:mx-6 lg:mx-8">
              <div className="rounded-[24px] overflow-hidden">
                <img
                  src={testimonial.image}
                  alt={testimonial.alt}
                  className="w-[180px] h-[130px] sm:w-[260px] sm:h-[190px] lg:w-[340px] lg:h-[240px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
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
        <div className="flex flex-row flex-wrap justify-center gap-6 lg:gap-8 mb-8">
            <div className="w-[160px] h-[160px] lg:w-[240px] lg:h-[240px] bg-cover bg-center" style={{backgroundImage: 'url(/award2.webp)'}}></div>
            <div className="w-[160px] h-[160px] lg:w-[240px] lg:h-[240px] bg-cover bg-center" style={{backgroundImage: 'url(/award1.webp)'}}></div>
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

        {/* CTA Button - Centered */}
        <button 
          onClick={() => router.push('/contact')}
          className="border border-white rounded-[6px] flex items-center justify-center gap-[10px] px-8 py-4 transition-colors duration-300 mx-auto"
        >
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
