import React from 'react';

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
    const primaryRed = 'bg-[#C10016]';
    
    return (
        <>
            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 w-full py-4 md:py-6 lg:py-8 px-4 md:px-6 lg:px-8 z-50">
                <div className="relative flex items-center justify-between">
                    
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <img 
                            src="/logo.png"
                            alt="FULFILX Logo"
                            className="w-32 h-8 md:w-40 md:h-10 lg:w-48 lg:h-12 object-contain"
                        />
                    </div>

                    {/* Centered Navigation */}
                    <div className="flex-1 flex justify-center">
                        <nav className="hidden lg:flex space-x-6 xl:space-x-8 2xl:space-x-12">
                            <NavItem isActive={true}>Home</NavItem>
                            <NavItem>About Us</NavItem>
                            <NavItem>Services</NavItem>
                            <NavItem>Sectors</NavItem>
                            <NavItem>Team</NavItem>
                            <NavItem>News</NavItem>
                            <NavItem>Contact</NavItem>
                        </nav>
                    </div>

                    {/* CTA Button */}
                    <div className="flex-shrink-0">
                        <a 
                            href="#"
                            className={`
                                flex items-center gap-2 
                                px-4 py-2 md:px-5 md:py-3 lg:px-6 lg:py-3
                                rounded-lg ${primaryRed} text-white 
                                text-sm md:text-base lg:text[18px]
                                transition duration-300 hover:brightness-110 
                                whitespace-nowrap font-helvetica
                            `}
                        >
                            <span>Let's Talk</span>
                            <img 
                                src="/arrow.svg"
                                alt="Arrow icon"
                                className="w-2 h-2 md:w-2 md:h-2 lg:w-3 lg:h-3 object-contain"
                            />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden ml-4">
                        <button 
                            type="button" 
                            className="p-2 rounded-md text-black hover:bg-gray-100 font-sans"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Home Content */}
<div className="min-h-screen relative bg-white pt-40 md:pt-60 lg:pt-80 overflow-auto">
    {/* PNG Background - MOVE ABOVE WHITE BACKGROUND */}
    <div className="absolute inset-0 z-0">
        <img 
            src="/bg.png"
            alt="Background pattern"
            className="w-[1920px] h-[1000px] object-cover"
        />
    </div>

                {/* Main Content */}
                <div className="relative z-10 pb-16">
                    <div className="container mx-auto px-4 md:px-6 lg:px-8">
                        
                        {/* GET SHIP DONE Badge */}
                        <div className="w-full max-w-[300px] mx-auto lg:mx-0 mb-8 -mt-28 lg:mb-12">
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
                            <h1 className="text-[68px] font-bold leading-tight text-black text-center lg:text-left">
                                Fulfilment Built for Brands That Think Bigger
                            </h1>
                        </div>

                        {/* Description */}
                        <div className="w-full max-w-[759px] mx-auto lg:mx-0 mb-12 lg:mb-16">
                            <p className="text-[24px] font-helvetica font-thin leading-[2] text-black text-center lg:text-left">
                                At FulfilX we are more than just a logistics company. Our motto is <br/>
                                "Your success is our success" that's why we see every brand as a partner,
                                not just a customer.
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
<div className="relative w-full min-h-[725px] -mt-[600px] bg-[#A31E1E]">
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
      
      {/* Section Title */}
      <h3 className="text-[28px] font-normal leading-[44px] text-white mb-16">
        Why You Work With Fulfil.X
      </h3>

      {/* Main Heading */}
      <h2 className="text-[54px] font-bold leading-[84px] tracking-[-0.01em] text-white mb-20">
        We Are A Leading one-Stop Logistic Service provider <br/>
        helps to Reach Your exact delivery destination on Time <br/>
        Without Delay & Damages.
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        
        {/* Stat 1 */}
        <div className="w-full">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[54px] font-bold leading-[80px] tracking-[-0.01em] text-white">99.97</span>
            <span
              className="text-[54px] font-bold leading-[80px] tracking-[-0.01em] bg-transparent"
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
            <span className="text-[54px] font-bold leading-[80px] tracking-[-0.01em] text-white">50000</span>
            <span
              className="text-[54px] font-bold leading-[80px] tracking-[-0.01em] bg-transparent"
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
              className="text-[54px] font-bold leading-[80px] tracking-[-0.01em] bg-transparent"
              style={{ color: 'transparent', WebkitTextStroke: '2px white' }}
            >
              2
            </span>
            <span className="text-[54px] font-bold leading-[80px] tracking-[-0.01em] text-white">Continents</span>
          </div>
          <div className="h-px bg-white/10 w-full my-6"></div>
          <p className="text-[20px] font-normal leading-[44px] text-white">United Kingdom & UAE</p>
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
      className="w-1920 h-1000 object-cover"
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
    <h2 className="text-[64px] font-bold leading-[74px] -tracking-[0.01em] text-black max-w-2xl mb-6">
      Do not hesitate to say <span className="text-[#C10016]">Bonjour</span>
    </h2>

    {/* Paragraph */}
    <p className="text-[22px] font-normal leading-[44px] text-black max-w-3xl mb-10">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unkown printer.
    </p>
    <p className="text-[22px] font-normal leading-[44px] text-black max-w-3xl mb-10">
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unkown printer.
    </p>

    {/* CTA Button with icon */}
    <a 
      href="#contact"
      className="inline-flex items-center px-6 py-2 gap-2.5 rounded-md bg-[#C10016] cursor-pointer transition duration-300 hover:brightness-110 mt-6"
    >
      <span className="text-white font-normal text-[18px] leading-[36px]">Let's Talk</span>
      <img 
        src="/arrow.svg" 
        alt="Arrow icon" 
        className="w-4 h-4 object-contain"
      />
    </a>
  </div>
</section>

            </div>
            
        </>
        
    );
};

export default Home;