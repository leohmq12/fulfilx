import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ServicesScreen(){
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
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
      const images = [
          { id: 1, src: '/bike.png' },
          { id: 2, src: '/wh.png' },
          { id: 3, src: '/ct.png' },
          { id: 4, src: '/box.png' },
          { id: 5, src: '/happy.png' }
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
          title: 'Services',
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
              src="/bg.png"
              alt="Background pattern"
              className="w-[1920px] h-[600px] object-cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-screen flex items-center justify-center pb-20">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-[84px] leading-[84px] text-black text-center mb-8">
              Services
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-[20px] leading-[40px] text-[#C10016]">
                Services
              </Text>
            </View>
          </View>
        </View>
   {/* Marquee Text with Colored Words and Separator Circles */}
  <div className="relative overflow-hidden whitespace-nowrap py-4 -mt-56">
    <div className="animate-marquee text-[28px] md:text-[40px] font-bold tracking-tight flex items-center mb-12 gap-16 md:gap-24 text-black">
      {/* First set */}
      <div className="flex items-center gap-16 md:gap-24">
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>

        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
      </div>

      
      
      {/* Duplicated for seamless animation */}
      <div className="flex items-center gap-16 md:gap-24">
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
      </div>
            <div className="flex items-center gap-16 md:gap-24">
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
      </div>
            <div className="flex items-center gap-16 md:gap-24">
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
      </div>
    </div>
  </div>
    <Text className="font-helvetica font-bold text-[54px] leading-[84px] text-black text-center mb-12">
    Core Fulfilment <Text className="text-[#C10016]">Services</Text>
  </Text>
  <View className="relative w-full py-10">
    {/* Content Container */}
    <View className="max-w-[1400px] mx-auto px-4 transform -translate-y-40">
      {/* Pricing Cards Container */}
      <View className="flex flex-row justify-center">
        
        {/* Left Card - Pick & Pack */}
        <View className="w-[496px] bg-white border border-[#D9D9D9] border-r-0 rounded-l-[24px] p-8">
          {/* Title */}
          <Text className="font-helvetica font-medium text-[24px] leading-[74px] tracking-tight text-black mb-4">
            Pick & Pack
          </Text>
          
          {/* Description */}
          <Text className="font-helvetica font-normal text-[16px] leading-[26px] text-black opacity-60 mb-8">
            The essentials to provide with customisability for shipping.
          </Text>
          
          {/* Price */}
          <View className="flex flex-row items-baseline gap-2 mb-8">
          <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              *from
            </Text>
            <Text className="font-helvetica font-medium text-[28px] leading-[74px] tracking-tight text-black">
              £1.27
            </Text>
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              /package
            </Text>
          </View>
          
          {/* Features List */}
          <View className="space-y-4 mb-8">
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Includes Packaging
              </Text>
            </View>
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Includes Labelling
              </Text>
            </View>
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Includes Picking
              </Text>
            </View>
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Includes Packing
              </Text>
            </View>
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Shipping (additional cost)
              </Text>
            </View>
          </View>
          
          {/* Contact Button */}
  <TouchableOpacity 
    className="border border-[#C10016] border-opacity-20 rounded-[6px] py-2 px-4 mt-4 hover:border-opacity-100 transition-all duration-200"
    onPress={() => router.push('/contact')}
  >
    <View className="flex flex-row items-center justify-center gap-3 cursor-pointer">
      <Text className="font-helvetica font-bold text-[18px] leading-[36px] text-[#C10016] hover:opacity-80 transition-opacity duration-200">
        Contact Sales
      </Text>
      <View className="w-3 h-3">
        <img 
          src="/arrow-dark.svg" 
          alt="Arrow" 
          className="w-full h-full object-contain hover:opacity-80 transition-opacity duration-200"
        />
      </View>
    </View>
  </TouchableOpacity>
        </View>
  
        {/* Middle Card - Next Day Shipping (Most Popular) */}
   <View className="w-[500px] bg-white border border-[#D9D9D9] rounded-t-[24px] relative -mt-12">
    {/* Most Popular Badge - Inside card, right aligned withuseRouter title */}
    <View className="absolute top-8 right-8 bg-[#C10016] bg-opacity-10 rounded-[120px] px-6 py-2">
      <Text className="font-helvetica font-medium text-[16px] leading-[40px] text-[#C10016]">
        Most Popular
      </Text>
    </View>
    
    <View className="p-8">
      {/* Title */}
      <Text className="font-helvetica font-medium text-[24px] leading-[74px] tracking-tight text-[#C10016] mb-4">
        Next Day Shipping
      </Text>
            
            {/* Description */}
            <Text className="font-helvetica font-normal text-[16px] leading-[26px] text-black opacity-60 mb-8">
              We offer next day shipping for all orders placed before 3pm.
            </Text>
            
            {/* Price */}
            <View className="flex flex-row items-baseline gap-2 mb-8">
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                *from
              </Text>
              <Text className="font-helvetica font-medium text-[28px] leading-[74px] tracking-tight text-black">
                £2.18
              </Text>
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                /shipment
              </Text>
            </View>
            
            {/* Features List */}
            <View className="space-y-4 mb-8">
              <View className="flex flex-row items-center gap-3">
                  <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
                <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                  Fully Tracked
                </Text>
              </View>
              <View className="flex flex-row items-center gap-3">
                <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
                <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                  Next Day Delivery
                </Text>
              </View>
              <View className="flex flex-row items-center gap-3">
                <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
                <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                  Small to Large Parcels
                </Text>
              </View>
              <View className="flex flex-row items-center gap-3">
                <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
                <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                  International Shipping Available
                </Text>
              </View>
              <View className="flex flex-row items-center gap-3">
                <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
                <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                  Insured Parcels
                </Text>
              </View>
            </View>
            
            {/* Contact Button */}
  <TouchableOpacity 
    className="bg-[#C10016] rounded-[6px] py-2 px-4 mt-16 hover:bg-[#D9001A] active:bg-[#A80012] transition-colors duration-200" 
    onPress={() => router.push('/contact')}
  >
    <View className="flex flex-row items-center justify-center gap-3 cursor-pointer">
      <Text className="font-helvetica font-bold text-[18px] leading-[36px] text-white">
        Contact Sales
      </Text>
      <View className="w-3 h-3">
        <img 
          src="/arrow.svg" 
          alt="Arrow" 
          className="w-full h-full object-contain"
        />
      </View>
    </View>
  </TouchableOpacity>
          </View>
        </View>
  
        {/* Right Card - Storage */}
        <View className="w-[496px] bg-white border border-[#D9D9D9] border-l-0 rounded-r-[24px] p-8">
          {/* Title */}
          <Text className="font-helvetica font-medium text-[24px] leading-[74px] tracking-tight text-black mb-4">
            Storage
          </Text>
          
          {/* Description */}
          <Text className="font-helvetica font-normal text-[16px] leading-[26px] text-black opacity-60 mb-8">
            Affordable storage scalable for your needs.
          </Text>
          
          {/* Price */}
          <View className="flex flex-row items-baseline gap-2 mb-8">
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              *from
            </Text>
            <Text className="font-helvetica font-medium text-[28px] leading-[74px] tracking-tight text-black">
              £0.28p
            </Text>
            <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              /m3 per day
            </Text>
          </View>
          
          {/* Features List */}
          <View className="space-y-4 mb-8">
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Secure Warehousing
              </Text>
            </View>
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Flexible Storage Options
              </Text>
            </View>
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Short & Long Term Storage
              </Text>
            </View>
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Pallet Storage
              </Text>
            </View>
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                      <img 
                          src="/check.svg" 
                          alt="Check" 
                          className="w-full h-full object-contain"
                      />
                  </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Inventory Management
              </Text>
            </View>
          </View>
          
          {/* Contact Button */}
  <TouchableOpacity 
    className="border border-[#C10016] border-opacity-20 rounded-[6px] py-2 px-4 mt-4 hover:border-opacity-100 transition-all duration-200"
    onPress={() => router.push('/contact')}
  >
    <View className="flex flex-row items-center justify-center gap-3 cursor-pointer">
      <Text className="font-helvetica font-bold text-[18px] leading-[36px] text-[#C10016] hover:opacity-80 transition-opacity duration-200">
        Contact Sales
      </Text>
      <View className="w-3 h-3">
        <img 
          src="/arrow-dark.svg" 
          alt="Arrow" 
          className="w-full h-full object-contain hover:opacity-80 transition-opacity duration-200"
        />
      </View>
    </View>
  </TouchableOpacity>
        </View>
      </View>
    </View>
        {/* Disclaimer Text */}
      <Text className="text-center font-helvetica font-normal text-[18px] leading-[36px] text-black transform -translate-y-28">
        <span className="text-[#C10016]">*</span> Pricing shown include our volume discount
      </Text>
  </View>
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
    
    {/* "We integrate with" Badge */}
    <div className="flex justify-center">
      <div className="w-[280px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] flex items-center justify-center">
        <span className="font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
          We integrate with
        </span>
      </div>
    </div>

    {/* Main Heading */}
    <h2 className="text-center font-bold text-[74px] leading-[80px] tracking-tight text-white mt-16">
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
          Our Accomplishments
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
          Advanced Tech Solutions
        </h2>

        {/* White Line - Centered */}
        <div className="w-[100px] h-[1px] bg-white mx-auto mb-12"></div>

        {/* Subtitle - Centered */}
        <p className="font-normal text-[24px] leading-[44px] text-white mb-12">
          Exceptional Quality Service
        </p>

        {/* CTA Button - Centered */}
        <button className="border border-white rounded-[6px] flex items-center justify-center gap-[10px] px-8 py-4 transition-colors duration-300 mx-auto">
          <span className="text-white font-bold text-[18px] leading-[36px]">Let's Talk</span>
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