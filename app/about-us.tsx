import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function AboutUsScreen(){
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const { width } = useWindowDimensions();
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
      const images = [
          { id: 1, src: '/bike.webp' },
          { id: 2, src: '/wh.webp' },
          { id: 3, src: '/ct.webp' },
          { id: 4, src: '/box.webp' },
          { id: 5, src: '/happy.webp' }
        ];
        useEffect(() => {
        if (isPaused) return;
      
        const interval = setInterval(() => {
          setCurrentSlide((prev) => {
            const nextSlide = prev + 1;
            // Reset to 0 when we reach the end of original images for seamless loop
            return nextSlide >= images.length ? 0 : nextSlide;
          });
        }, 3000);
      
        return () => clearInterval(interval);
      }, [isPaused, images.length]);
          const [activeDot, setActiveDot] = useState(1); // Start with middle dot active
          const [activeReview, setActiveReview] = useState(0);
      
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'About Us',
          headerShown: false,
        }} 
      />
      
      <Navbar />
      
      {/* Main Scrollable Content */}
      <ScrollView 
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View className="relative min-h-screen">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <img 
              src="/bg.webp"
              alt="Background pattern"
              className="w-full h-full lg:h-[600px] object-cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-screen flex items-center justify-center pb-20">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              About Us
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                About Us
              </Text>
            </View>
          </View>
        </View>
<section className="relative w-full bg-cover bg-center bg-no-repeat">
  <div className="relative max-w-[1490px] mx-auto px-4 py-16">
    
   <div
    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:transform lg:-translate-y-60"
    style={{ marginBottom: width < 1024 ? 0 : -220 }}
   >
  
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
      We Get Ship <span className="text-[#C10016]">Done!</span>
    </h2>
    <div className="space-y-4">
      {/* Content */}
      <p className="font-normal text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[48px] text-black">
        Fulfil.X was born from a vision for something better. Our founders, veterans of the international brand world, grew frustrated with the status quo in fulfilment —the impersonal partnerships, the one-size-fits-all limitations. They knew brands deserved more.
That’s why we exist: to disrupt the 3PL market by putting brands at the center
of everything we do. We operate on a powerful belief, "Your Success is our
Success". You are not just a client; you are a partner in growth.
We are transforming the movement of goods from a logistical task into a
strategic advantage. With innovation as our engine, we provide the dynamic
partnership and streamlined solutions modern brands need to scale and
thrive. 
      </p>
    </div>
    <div className="space-y-4">
        {/* Content */}
        <p className="font-normal text-base sm:text-lg lg:text-[20px] leading-relaxed lg:leading-[48px] text-black">
            Transforming the movement of goods, we’re your dynamic third-party logistics partner. With innovation at our core, we’re here to streamline your supply chain and drive your business forward.
        </p>
    </div>
  </div>
      {/* Right Content */}
      <div className="space-y-8">
        {/* Image with Pagination */}
<div className="relative">
  {/* Image that changes based on active dot */}
  <div 
    className="w-full h-[400px] lg:h-[700px] bg-cover bg-center rounded-[24px] backdrop-blur-[12.5px]"
    style={{
      backgroundImage: `url(${
        activeDot === 0 ? '/box.webp' :
        activeDot === 1 ? '/peep.webp' :
        activeDot === 2 ? 'shipdone.webp' :
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
</section>
{/* Timeline Section */}
<View className="relative w-full py-40">
  {/* Background Image */}
  <View className="absolute inset-0">
    <img 
      src="/shiphome.webp" 
      alt="Background" 
      className="w-full h-full object-cover"
    />
  </View>
  
  {/* Black Overlay */}
  <View className="absolute inset-0 bg-black bg-opacity-50" />
  
  {/* Vertical Center Line - Hidden on mobile */}
  <View className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white bg-opacity-10 transform -translate-x-1/2" />
  
  {/* Timeline Items Container */}
<View className="relative max-w-[1400px] mx-auto px-4">
    {/* Item 1 - Image Left, Content Right */}
<View className="flex flex-col lg:flex-row items-center justify-between mb-20 lg:mb-40 w-full">
  {/* Left Side - Image */}
  <View className="w-full h-[300px] lg:w-[500px] lg:h-[500px] rounded-[32px] backdrop-blur-[12.5px] bg-cover bg-center mb-8 lg:mb-0" 
    style={{backgroundImage: 'url(/trolley.webp)'} as any} />
  
  {/* Center Dot - Hidden on mobile */}
  <View className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-[40px] h-[40px] bg-[#C10016] rounded-full" />
  
  {/* Right Side - Content */}
  <View className="w-full lg:w-[451px]">
    <Text className="font-medium text-6xl lg:text-[94px] leading-tight lg:leading-[74px] tracking-tight text-white mb-4 lg:mb-20 text-left lg:text-right">01.</Text>
    <Text className="font-helvetica font-bold text-3xl lg:text-[40px] leading-tight lg:leading-[74px] tracking-tight text-white mb-4 text-left lg:text-right">
      Humble <Text className="text-[#C10016]">Beginnings</Text>
    </Text>
    <Text className="font-helvetica font-normal text-lg lg:text-[22px] leading-relaxed lg:leading-[42px] text-white text-left lg:text-right">
      FULFIL.X started with our founders from a storage unit to get a proof of concept
    </Text>
  </View>
</View>

{/* Item 2 - Content Left, Image Right */}
<View className="flex flex-col-reverse lg:flex-row items-center justify-between mb-20 lg:mb-60 w-full">
  {/* Left Side - Content */}
  <View className="w-full lg:w-[460px]">
    <Text className="font-medium text-6xl lg:text-[94px] leading-tight lg:leading-[74px] tracking-tight text-white mb-4 lg:mb-20 text-left">02.</Text>
    <Text className="font-helvetica font-bold text-3xl lg:text-[40px] leading-tight lg:leading-[74px] tracking-tight text-white mb-4 text-left">
      New <Text className="text-[#C10016]">HQ</Text>
    </Text>
    <Text className="font-helvetica font-normal text-lg lg:text-[22px] leading-relaxed lg:leading-[42px] text-white text-left">
      Rapidly expanding our new warehouse to 50,000sqft
    </Text>
  </View>
  
  {/* Center Dot */}
  <View className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-[40px] h-[40px] bg-[#C10016] rounded-full" />
  
  {/* Right Side - Image */}
  <View className="w-full h-[300px] lg:w-[500px] lg:h-[500px] rounded-[32px] backdrop-blur-[12.5px] bg-cover bg-center mb-8 lg:mb-0" 
    style={{backgroundImage: 'url(/head.webp)'} as any} />
</View>

{/* Item 3 */}
<View className="flex flex-col lg:flex-row items-center justify-between w-full">
  {/* Left Side - Image */}
  <View className="w-full h-[300px] lg:w-[500px] lg:h-[500px] rounded-[32px] backdrop-blur-[12.5px] bg-cover bg-center lg:transform lg:-translate-x-40 mb-8 lg:mb-0" 
    style={{backgroundImage: 'url(/trolley.webp)'} as any} />
  
  {/* Center Dot */}
  <View className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-[40px] h-[40px] bg-[#C10016] rounded-full" />
  
  {/* Right Side - Content */}
  <View className="w-full lg:w-[451px] lg:transform lg:translate-x-40">
    <Text className="font-medium text-6xl lg:text-[94px] leading-tight lg:leading-[74px] tracking-tight text-white mb-4 lg:mb-20 text-left lg:text-right">03.</Text>
    <Text className="font-helvetica font-bold text-3xl lg:text-[40px] leading-tight lg:leading-[74px] tracking-tight text-white mb-4 text-left lg:text-right">
      Expa<Text className="text-[#C10016]">nsion</Text>
    </Text>
    <Text className="font-helvetica font-normal text-lg lg:text-[22px] leading-relaxed lg:leading-[42px] text-white text-left lg:text-right">
      Phase 1 of global expansion FULFIL.X UAE, Australia and USA is open, handling IOR and Fulfilment services.
    </Text>
  </View>
</View>
</View>
</View>
<View className="relative z-20 py-20">
    <View className="absolute inset-0">
    <img 
      src="/bg.webp" 
      alt="Background" 
      className="w-full h-full object-cover"
    />
  </View>
  <View className="max-w-[1393px] mx-auto px-4">
    
    {/* Badge */}
    <View className="flex flex-row justify-center items-center px-6 sm:px-11 py-4 bg-[#C10016] bg-opacity-10 rounded-[120px] w-full max-w-[348px] mb-6 mx-auto lg:mx-0 lg:ml-[648px]">
      <Text className="font-helvetica font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
        why we&apos;re different?
      </Text>
    </View>

    <View className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
      
      {/* Image - LEFT side */}
      <View className="w-full lg:w-[600px] flex-shrink-0">
        <View 
          className="w-full h-[320px] sm:h-[460px] lg:w-[600px] lg:h-[940px] rounded-[30px] bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/same.webp)',
            backdropFilter: 'blur(12.5px)'
          } as any}
        />
      </View>

      {/* Content - RIGHT side */}
      <View className="flex-1 w-full lg:max-w-[709px]">
        
        {/* Main Title */}
        <Text className="font-helvetica font-bold text-3xl lg:text-[54px] leading-tight lg:leading-[68px] tracking-tight text-black mb-6">
          Why Choose FulfilX?
        </Text>
        {/* Features List */}
        <View className="">
          
          {/* Feature 1 */}
          <View className="flex flex-row items-start gap-4 mb-4">
            {/* Check Icon */}
            <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
              <img src="/check.svg" alt="check" className="w-[19px] h-[16px]"/>
            </View>
            {/* Feature Text */}
            <View className="flex-1">
              <Text className="font-helvetica font-bold text-lg sm:text-[20px] leading-relaxed lg:leading-[38px] text-black">
                Cutting Edge Technology:
              </Text>
              <Text className="font-helvetica font-normal text-base sm:text-[18px] lg:text-[20px] leading-relaxed lg:leading-[40px] text-black">
                Embracing the latest advancements, we leverage state-of-the-art
technology to optimise every aspect of your logistics process. From real
time tracking to predictive analytics, we keep your goods moving
efficiently.
              </Text>
            </View>
          </View>

          {/* Feature 2 */}
          <View className="flex flex-row items-start gap-4 mb-4">
            {/* Check Icon */}
            <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
              <img src="/check.svg" alt="check" className="w-[19px] h-[16px]"/>
            </View>
            {/* Feature Text */}
            <View className="flex-1">
              <Text className="font-helvetica font-bold text-lg sm:text-[20px] leading-relaxed lg:leading-[38px] text-black">
                Agile Solutions:
              </Text>
              <Text className="font-helvetica font-normal text-base sm:text-[18px] lg:text-[20px] leading-relaxed lg:leading-[40px] text-black">
                In today’s fast-paced world, flexibility is key. Our agile solutions are
tailored to meet your unique needs, ensuring seamless operations and
swift adaptability to changing market demands.
              </Text>
            </View>
          </View>
          {/* Feature 3 */}
          <View className="flex flex-row items-start gap-4 mb-4">
            {/* Check Icon */}
            <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
              <img src="/check.svg" alt="check" className="w-[19px] h-[16px]"/>
            </View>
            {/* Feature Text */}
            <View className="flex-1">
              <Text className="font-helvetica font-bold text-lg sm:text-[20px] leading-relaxed lg:leading-[38px] text-black">
                Experienced Expertise:
              </Text>
              <Text className="font-helvetica font-normal text-base sm:text-[18px] lg:text-[20px] leading-relaxed lg:leading-[40px] text-black">
                Blending youthful energy with years of industry experience, our team
brings a fresh perspective to logistics management. We’re not afraid to think
outside the box and challenge the status quo to deliver innovative
solutions.
              </Text>
            </View>
          </View>
                    {/* Feature 4 */}
          <View className="flex flex-row items-start gap-4 mb-4">
            {/* Check Icon */}
            <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
              <img src="/check.svg" alt="check" className="w-[19px] h-[16px]"/>
            </View>
            {/* Feature Text */}
            <View className="flex-1">
              <Text className="font-helvetica font-bold text-lg sm:text-[20px] leading-relaxed lg:leading-[38px] text-black">
                Customer-Centric Approach
              </Text>
              <Text className="font-helvetica font-normal text-base sm:text-[18px] lg:text-[20px] leading-relaxed lg:leading-[40px] text-black">
                Your satisfaction is our top priority. We listen, understand, and
collaborate closely with you to develop customised strategies that drive
value for your business.
              </Text>
            </View>
          </View>
                    {/* Feature 5 */}
          <View className="flex flex-row items-start gap-4 mb-10">
            {/* Check Icon */}
            <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
              <img src="/check.svg" alt="check" className="w-[19px] h-[16px]"/>
            </View>
            {/* Feature Text */}
            <View className="flex-1">
              <Text className="font-helvetica font-bold text-[20px] leading-[38px] text-black">
                Sustainability:
              </Text>
              <Text className="font-helvetica font-normal text-[20px] leading-[40px] text-black">
                Committed to reducing our environmental footprint, we integrate
sustainable practices into every aspect of our operations. Together, we
can build a greener future while achieving your logistics goals.
              </Text>
            </View>
          </View>

        </View>
      </View>
    </View>
  </View>
</View>
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
    
    {/* "We integrate with" Badge */}
    <div className="flex justify-center">
      <div className="w-[280px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] flex items-center justify-center">
        <span className="font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
          We integrate with
        </span>
      </div>
    </div>

    {/* Main Heading */}
    <h2 className="text-center font-bold text-4xl lg:text-[74px] leading-tight lg:leading-[80px] tracking-tight text-white mt-16">
      Leading Brands...
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
    <h2 className="text-left font-bold text-4xl lg:text-[64px] leading-tight lg:leading-[80px] tracking-tight text-white mt-16 max-w-[960px]">
      Meet the people we make happy
    </h2>

    {/* Navigation Arrows - Aligned with badge and heading */}
    <div className="absolute right-4 top-24 lg:top-24 flex gap-4">
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
{/* Reviews Section */}
<View className="relative w-full py-20">
  {/* Background Image */}
  <View className="absolute inset-0">
    <img 
      src="/bg.webp" 
      alt="Background" 
      className="w-full h-full object-cover"
    />
  </View>
  
  {/* White Overlay with Opacity */}
  <View className="absolute inset-0" />
  
  {/* Content Container */}
  <View className="relative max-w-[1400px] mx-auto px-4 z-10">
    
    {/* "OUR REVIEWS" Badge */}
    <View className="flex flex-row justify-center items-center px-11 py-4 bg-[#C10016] bg-opacity-10 rounded-[120px] w-[250px]">
      <Text className="font-helvetica font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
        OUR REVIEWS
      </Text>
    </View>

    {/* Header Section */}
    <View className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-0">
      {/* Left Side - Title */}
      <View className="max-w-[600px]">
        <Text className="font-helvetica font-bold text-4xl lg:text-[64px] leading-tight lg:leading-[80px] tracking-tight text-black lg:transform lg:-translate-y-20">
          What our client says
        </Text>
      </View>
      
      {/* Right Side - Rating */}
      <View className="text-left lg:text-right w-full lg:w-auto">
        <Text className="font-helvetica font-normal text-5xl lg:text-[60px] leading-tight lg:leading-[80px] tracking-tight text-black lg:translate-x-16 lg:transform lg:-translate-y-12">
          (5.0)
        </Text>
        {/* Logo/Image */}
        <View className="w-[180px] h-[72px] lg:w-[247px] lg:h-[100px] bg-cover bg-center mt-4 lg:mt-0 lg:transform lg:-translate-x-52 lg:-translate-y-32" 
          style={{backgroundImage: 'url(/GR.webp)'} as any} />
      </View>
    </View>

    {/* Review Cards Grid */}
    <View className="flex flex-col lg:flex-row gap-8 mb-16">
      
      {/* Review Card 1 */}
      <View className="flex-1 bg-white border border-[#D9D9D9] rounded-[20px] p-8">
        <View className="flex flex-row items-start gap-6 mb-6">
          {/* Avatar */}
          <View className="w-[80px] h-[80px] rounded-full bg-cover bg-center" 
            style={{backgroundImage: 'url(/A.webp)'} as any} />
          
          {/* User Info */}
          <View className="flex-1">
            <Text className="font-helvetica font-bold text-[20px] leading-[38px] text-black">
              John Doe
            </Text>
            <Text className="font-helvetica font-normal text-[16px] leading-[38px] text-black opacity-50">
              November 11, 2025
            </Text>
          </View>
          
          {/* Logo */}
          <View className="w-[32px] h-[32px] bg-cover bg-center" 
            style={{backgroundImage: 'url(/Goo.webp)'} as any} />
        </View>
        
        {/* Star Rating */}
        <View className="flex flex-row gap-2 mb-6">
        <img src="reviews.webp" alt="stars" />
        </View>
        
        {/* Review Text */}
        <Text className="font-helvetica font-normal text-[20px] leading-[38px] text-black opacity-70">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
        </Text>
      </View>

      {/* Repeat for Review Cards 2 and 3 with same structure */}
      {/* Review Card 2 */}
      <View className="flex-1 bg-white border border-[#D9D9D9] rounded-[20px] p-8">
        <View className="flex flex-row items-start gap-6 mb-6">
          {/* Avatar */}
          <View className="w-[80px] h-[80px] rounded-full bg-cover bg-center" 
            style={{backgroundImage: 'url(/N.webp)'} as any} />
          
          {/* User Info */}
          <View className="flex-1">
            <Text className="font-helvetica font-bold text-[20px] leading-[38px] text-black">
              John Doe
            </Text>
            <Text className="font-helvetica font-normal text-[16px] leading-[38px] text-black opacity-50">
              November 11, 2025
            </Text>
          </View>
          
          {/* Logo */}
          <View className="w-[32px] h-[32px] bg-cover bg-center" 
            style={{backgroundImage: 'url(/Goo.webp)'} as any} />
        </View>
        {/* Star Rating */}
        <View className="flex flex-row gap-2 mb-6">
        <img src="reviews.webp" alt="stars" />
        </View>
        
        {/* Review Text */}
        <Text className="font-helvetica font-normal text-[20px] leading-[38px] text-black opacity-70">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
        </Text>
      </View>
      
      {/* Review Card 3 */}
      <View className="flex-1 bg-white border border-[#D9D9D9] rounded-[20px] p-8">
        <View className="flex flex-row items-start gap-6 mb-6">
          {/* Avatar */}
          <View className="w-[80px] h-[80px] rounded-full bg-cover bg-center" 
            style={{backgroundImage: 'url(/V.webp)'} as any} />
          
          {/* User Info */}
          <View className="flex-1">
            <Text className="font-helvetica font-bold text-[20px] leading-[38px] text-black">
              John Doe
            </Text>
            <Text className="font-helvetica font-normal text-[16px] leading-[38px] text-black opacity-50">
              November 11, 2025
            </Text>
          </View>
          
          {/* Logo */}
          <View className="w-[32px] h-[32px] bg-cover bg-center" 
            style={{backgroundImage: 'url(/Goo.webp)'} as any} />
        </View>
        {/* Star Rating */}
        <View className="flex flex-row gap-2 mb-6">
        <img src="reviews.webp" alt="stars" />
        </View>
        {/* Review Text */}
        <Text className="font-helvetica font-normal text-[20px] leading-[38px] text-black opacity-70">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
        </Text>
      </View>
    </View>
{/* Pagination Dots */}
<View className="flex items-center">
  <View className="w-[72px] h-[24px] bg-[#C10016] rounded-[50px] flex flex-row items-center justify-center gap-3">
    <TouchableOpacity onPress={() => setActiveReview(0)}>
      <View 
        className={`w-[10px] h-[10px] rounded-full ${
          activeReview === 0 ? 'border border-white' : 'bg-white bg-opacity-50 w-[6px] h-[6px]'
        }`}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setActiveReview(1)}>
      <View 
        className={`w-[10px] h-[10px] rounded-full ${
          activeReview === 1 ? 'border border-white' : 'bg-white bg-opacity-50 w-[6px] h-[6px]'
        }`}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setActiveReview(2)}>
      <View 
        className={`w-[10px] h-[10px] rounded-full ${
          activeReview === 2 ? 'border border-white' : 'bg-white bg-opacity-50 w-[6px] h-[6px]'
        }`}
      />
    </TouchableOpacity>
  </View>
</View>
  </View>
</View>

{/* Auto-Sliding Gallery with Infinite Loop */}
{(() => {
  const galleryGap = 24;
  const galleryHorizontalPadding = 24;
  const galleryCardWidth = Math.min(380, Math.max(240, width - galleryHorizontalPadding * 2));
  const galleryStep = galleryCardWidth + galleryGap;
  return (
<View className="relative w-full mt-15 mb-20 overflow-hidden" style={{ height: galleryCardWidth }}>
  <div 
    className="relative w-full h-full"
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
  >
    <View 
      className="flex flex-row absolute top-0 left-6 transition-transform duration-500 ease-in-out"
      style={{ 
        transform: `translateX(-${currentSlide * galleryStep}px)` 
      }}
    >
      {/* Original images */}
      {images.map((image) => (
        <View
          key={image.id}
          className="rounded-[20px] bg-cover bg-center flex-shrink-0 hover:scale-105 transition-transform duration-300"
          style={{ backgroundImage: `url(${image.src})`, width: galleryCardWidth, height: galleryCardWidth, marginRight: galleryGap } as any}
        />
      ))}
      {/* Duplicate images for seamless loop */}
      {images.map((image) => (
        <View
          key={`${image.id}-duplicate`}
          className="rounded-[20px] bg-cover bg-center flex-shrink-0 hover:scale-105 transition-transform duration-300"
          style={{ backgroundImage: `url(${image.src})`, width: galleryCardWidth, height: galleryCardWidth, marginRight: galleryGap } as any}
        />
      ))}
    </View>
  </div>
</View>
  );
})()}
{/* Accomplishments Section */}
        <section className="relative w-full">
          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Section - White Background */}
            <div className="w-full lg:w-1/2 bg-white relative min-h-[400px] lg:min-h-[520px] flex items-center justify-center py-12 lg:py-0">
              <img src="/bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
              {/* Left Section Content - Centered */}
              <div className="max-w-[740px] w-full text-center px-8">
                
                {/* Heading */}
                <h2 className="font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] tracking-tight text-black mb-8">
                  Our Accomplishments
                </h2>

                {/* Red Line - Centered */}
                <div className="w-[100px] h-[1px] bg-[#C10016] mx-auto mb-12"></div>

                {/* Image Grid - Centered */}
                <div className="flex flex-wrap justify-center gap-4 lg:gap-16 mb-12">
                  <div className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award1.webp)'}}></div>
                  <div className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award2.webp)'}}></div>
                  <div className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award3.webp)'}}></div>
                  <div className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award4.webp)'}}></div>
                  <div className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award5.webp)'}}></div>
                </div>
              </div>
            </div>

            {/* Right Section - Red Background */}
            <div className="w-full lg:w-1/2 bg-[#DA192F] relative min-h-[400px] lg:min-h-[520px] flex items-center justify-center py-12 lg:py-0">
              {/* Right Section Content - Centered */}
              <div className="max-w-[650px] w-full text-center px-8">
                
                {/* Heading */}
                <h2 className="font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] tracking-tight text-white mb-8">
                  Advanced Tech Solutions
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
      </ScrollView>
    </>
  );
}
