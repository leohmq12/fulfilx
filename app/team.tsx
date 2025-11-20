// app/team.tsx
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function TeamScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  
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

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Our Team',
          headerShown: false,
        }} 
      />
      
      <Navbar />
      
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
              className="w-full h-full object-cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-screen flex items-center justify-center pt-20">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-[84px] leading-[84px] text-black text-center mb-8">
              Meet Our Team
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-[20px] leading-[40px] text-[#C10016]">
                Team
              </Text>
            </View>
          </View>
        </View>

        {/* Team Section */}
        <View className="w-full bg-white py-20">
          {/* Skilled Staff Badge */}
          <View className="flex flex-row justify-center items-center mx-auto w-[240px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] mb-8">
            <Text className="font-helvetica font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
              Skilled Staff
            </Text>
          </View>

          {/* Main Heading */}
          <Text className="text-center font-helvetica font-bold text-[64px] leading-[74px] tracking-[-0.01em] text-black mb-16">
            Meet Our Qualified <span className='text-[#C10016]'>Experts</span>
          </Text>

          {/* Team Members Grid */}
          <View className="flex flex-col gap-8 px-8">
            
            {/* First Row */}
            <View className="flex flex-row justify-center gap-8">
              
              {/* Team Member 1 - Nas */}
              <View className="relative w-[720px] h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden">
                {/* Member Image */}
                <View className="absolute w-[300px] h-[340px] left-8 top-4 rounded-[12px] overflow-hidden">
                  <img 
                    src="/nas.png" 
                    alt="Nas"
                    className="w-full h-full object-cover"
                  />
                </View>
                
                {/* Member Info */}
                <View className="absolute left-[360px] top-8 w-[340px]">
                  <Text className="font-helvetica font-bold text-[26px] leading-[80px] text-black">
                    Nas
                  </Text>
                  <Text className="font-helvetica font-normal text-[18px] leading-[38px] text-black mb-4">
                    Co-Founder & CEO
                  </Text>
                  <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">
                    In the realm of luxury goods, where the <br/>value lies not only in the product itself but<br/>in the entire customer experience, the importance.
                  </Text>
                </View>
                
                {/* Email Icon */}
                <View className="absolute left-[360px] bottom-8 w-12 h-12 bg-[#C10016] rounded-full flex items-center justify-center cursor-pointer">
                  <img 
                    src="/mail.svg" 
                    alt="Email"
                    className="w-4 h-4 object-contain filter brightness-0 invert"
                  />
                </View>
              </View>

              {/* Team Member 2 - Anson */}
              <View className="relative w-[720px] h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden">
                {/* Member Image */}
                <View className="absolute w-[300px] h-[340px] left-8 top-4 rounded-[12px] overflow-hidden">
                  <img 
                    src="/Anson.png" 
                    alt="Anson"
                    className="w-full h-full object-cover"
                  />
                </View>
                
                {/* Member Info */}
                <View className="absolute left-[360px] top-8 w-[360px]">
                  <Text className="font-helvetica font-bold text-[26px] leading-[80px] text-black">
                    Anson
                  </Text>
                  <Text className="font-helvetica font-normal text-[18px] leading-[38px] text-black mb-4">
                    Operations Manager
                  </Text>
                  <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">
                    In the realm of luxury goods, where the <br/>value lies not only in the product itself but<br/>in the entire customer experience, the importance.
                  </Text>
                </View>
                
                {/* Email Icon */}
                <View className="absolute left-[360px] bottom-8 w-12 h-12 bg-[#C10016] rounded-full flex items-center justify-center cursor-pointer">
                  <img 
                    src="/mail.svg" 
                    alt="Email"
                    className="w-4 h-4 object-contain filter brightness-0 invert"
                  />
                </View>
              </View>

            </View>

            {/* Second Row */}
            <View className="flex flex-row justify-center gap-8">
              
              {/* Team Member 3 - Nat */}
              <View className="relative w-[720px] h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden">
                {/* Member Image */}
                <View className="absolute w-[300px] h-[340px] left-8 top-4 rounded-[12px] overflow-hidden">
                  <img 
                    src="/Nat.png" 
                    alt="Nat"
                    className="w-full h-full object-cover"
                  />
                </View>
                
                {/* Member Info */}
                <View className="absolute left-[360px] top-8 w-[340px]">
                  <Text className="font-helvetica font-bold text-[26px] leading-[80px] text-black">
                    Nat
                  </Text>
                  <Text className="font-helvetica font-normal text-[18px] leading-[38px] text-black mb-4">
                    Team Leader - Ops
                  </Text>
                  <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">
                    In the realm of luxury goods, where the <br/>value lies not only in the product itself but<br/>in the entire customer experience, the importance.
                  </Text>
                </View>
                
                {/* Email Icon */}
                <View className="absolute left-[360px] bottom-8 w-12 h-12 bg-[#C10016] rounded-full flex items-center justify-center cursor-pointer">
                  <img 
                    src="/mail.svg" 
                    alt="Email"
                    className="w-4 h-4 object-contain filter brightness-0 invert"
                  />
                </View>
              </View>

              {/* Team Member 4 - Ste */}
              <View className="relative w-[720px] h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden">
                {/* Member Image */}
                <View className="absolute w-[300px] h-[340px] left-8 top-4 rounded-[12px] overflow-hidden">
                  <img 
                    src="/Ste.png" 
                    alt="Ste"
                    className="w-full h-full object-cover"
                  />
                </View>
                
                {/* Member Info */}
                <View className="absolute left-[360px] top-8 w-[340px]">
                  <Text className="font-helvetica font-bold text-[26px] leading-[80px] text-black">
                    Ste
                  </Text>
                  <Text className="font-helvetica font-normal text-[18px] leading-[38px] text-black mb-4">
                    Team Leader - Warehouse
                  </Text>
                  <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">
                    In the realm of luxury goods, where the value lies not only in the product itself but in the entire customer experience, the importance.
                  </Text>
                </View>
                
                {/* Email Icon */}
                <View className="absolute left-[360px] bottom-8 w-12 h-12 bg-[#C10016] rounded-full flex items-center justify-center cursor-pointer">
                  <img 
                    src="/mail.svg" 
                    alt="Email"
                    className="w-4 h-4 object-contain filter brightness-0 invert"
                  />
                </View>
              </View>

            </View>

            {/* Third Row - Centered */}
            <View className="flex flex-row justify-center">
              
              {/* Team Member 5 - Jordy */}
              <View className="relative w-[720px] h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden">
                {/* Member Image */}
                <View className="absolute w-[300px] h-[340px] left-8 top-4 rounded-[12px] overflow-hidden">
                  <img 
                    src="/jordy.png" 
                    alt="Jordy"
                    className="w-full h-full object-cover"
                  />
                </View>
                
                {/* Member Info */}
                <View className="absolute left-[360px] top-8 w-[340px]">
                  <Text className="font-helvetica font-bold text-[26px] leading-[80px] text-black">
                    Jordy
                  </Text>
                  <Text className="font-helvetica font-normal text-[18px] leading-[38px] text-black mb-4">
                    Warehouse Manager
                  </Text>
                  <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">
                    In the realm of luxury goods, where the value lies not only in the product itself but in the entire customer experience, the importance.
                  </Text>
                </View>
                
                {/* Email Icon */}
                <View className="absolute left-[360px] bottom-8 w-12 h-12 bg-[#C10016] rounded-full flex items-center justify-center cursor-pointer">
                  <img 
                    src="/mail.svg" 
                    alt="Email"
                    className="w-4 h-4 object-contain filter brightness-0 invert"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Career Opportunities Section */}
        <View className="relative w-full min-h-[900px] py-20 overflow-hidden">
          {/* Background Gradient Fix */}
          <View className="absolute inset-0">
            <div 
              className="w-full h-full"
              style={{
                background: `url(/job.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </View>

          {/* Content Container - Centered */}
          <View className="relative z-10 max-w-[1500px] mx-auto px-8 h-full flex items-center">
            {/* 2 Column Layout - Centered vertically */}
            <View className="flex flex-row gap-20 w-full items-center">
              {/* LEFT COLUMN - Centered horizontally */}
              <View className="flex-1 flex flex-col justify-center">
                {/* Badge */}
                <View className="w-[320px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] mb-10 flex items-center justify-center">
                  <Text className="font-helvetica font-medium text-[16px] tracking-[0.2em] text-[#C10016] uppercase">
                    Career Opportunities
                  </Text>
                </View>

                <Text className="font-helvetica font-bold text-[60px] leading-[74px] text-white mb-8">
                  Discover the <Text className="text-[#C10016]">Path</Text> to Your Dream <Text className="text-[#C10016]">Career</Text>
                </Text>

                <Text className="font-helvetica text-[20px] leading-[38px] text-white/90 mb-12 max-w-[670px]">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.
                </Text>

                <button className="bg-[#C10016] hover:bg-[#a00012] rounded-[6px] px-8 py-4 flex flex-row items-center gap-2 w-[200px] transition-all">
                  <Text className="font-helvetica font-bold text-[18px] text-white">View All Jobs</Text>
                  <img src="/arrow.svg" className="w-3 h-3 filter brightness-0 invert" alt="arrow" />
                </button>
              </View>

              {/* RIGHT COLUMN - Fixed card dimensions */}
              <View className="flex-1 flex flex-col justify-center">
                <View className="space-y-6">
                  {/* CARD 1 — Dark (Top) */}
                  <View className="w-[680px] h-[225px] bg-[rgba(255,255,255,0.1)] backdrop-blur-[5px] rounded-[20px] p-8">
                    <Text className="font-helvetica font-bold text-[22px] leading-[44px] text-white mb-2">
                      Warehouse Manager
                    </Text>
                    <View className="flex flex-row items-center justify-between mb-6">
                      <Text className="font-helvetica text-[16px] leading-[26px] text-white/90 max-w-[500px]">
                        Felis cursus ornare cubilia leo montes penatibus fermentum<br/>dapibus convallis. Nisl nunc quis senectus platea.
                      </Text>
                      <button className="bg-[#C10016] hover:bg-[#a00012] rounded-[6px] px-8 py-4 flex flex-row items-center gap-3">
                        <Text className="font-helvetica text-[16px] text-white font-bold">View Job</Text>
                        <img src="/arrow.svg" className="w-3 h-3 filter brightness-0 invert" />
                      </button>
                    </View>
                    <View className="flex flex-row gap-4">
                      <View className="bg-[rgba(255,255,255,0.1)] rounded-[80px] px-6 py-2">
                        <Text className="font-helvetica text-[16px] text-white">Remote</Text>
                      </View>
                      <View className="bg-[rgba(255,255,255,0.1)] rounded-[80px] px-6 py-2">
                        <Text className="font-helvetica text-[16px] text-white">Full Time</Text>
                      </View>
                      <View className="bg-[rgba(255,255,255,0.1)] rounded-[80px] px-6 py-2">
                        <Text className="font-helvetica text-[16px] text-white">Dubai</Text>
                      </View>
                    </View>
                  </View>

                  {/* CARD 2 — WHITE (Middle) */}
                  <View className="w-[680px] h-[225px] bg-white rounded-[20px] p-8 shadow-2xl">
                    <Text className="font-helvetica font-bold text-[22px] leading-[44px] text-black mb-2">
                      Warehouse Manager
                    </Text>
                    <View className="flex flex-row items-center justify-between mb-6">
                      <Text className="font-helvetica text-[16px] leading-[26px] text-black/80 max-w-[500px]">
                        Felis cursus ornare cubilia leo montes penatibus fermentum<br/>dapibus convallis. Nisl nunc quis senectus platea.
                      </Text>
                      <button className="bg-[#C10016] hover:bg-[#a00012] rounded-[6px] px-8 py-4 flex flex-row items-center gap-3">
                        <Text className="font-helvetica text-[16px] text-white font-bold">View Job</Text>
                        <img src="/arrow.svg" className="w-3 h-3 filter brightness-0 invert" />
                      </button>
                    </View>
                    <View className="flex flex-row gap-4">
                      <View className="bg-[rgba(193,0,22,0.1)] rounded-[80px] px-6 py-2">
                        <Text className="font-helvetica text-[16px] text-[#C10016]">Remote</Text>
                      </View>
                      <View className="bg-[rgba(193,0,22,0.1)] rounded-[80px] px-6 py-2">
                        <Text className="font-helvetica text-[16px] text-[#C10016]">Full Time</Text>
                      </View>
                      <View className="bg-[rgba(193,0,22,0.1)] rounded-[80px] px-6 py-2">
                        <Text className="font-helvetica text-[16px] text-[#C10016]">Dubai</Text>
                      </View>
                    </View>
                  </View>

                  {/* CARD 3 — Dark (Bottom) */}
                  <View className="w-[680px] h-[225px] bg-[rgba(255,255,255,0.1)] backdrop-blur-[5px] rounded-[20px] p-8">
                    <Text className="font-helvetica font-bold text-[22px] leading-[44px] text-white mb-2">
                      Warehouse Manager
                    </Text>
                    <View className="flex flex-row items-center justify-between mb-6">
                      <Text className="font-helvetica text-[16px] leading-[26px] text-white/90 max-w-[500px]">
                        Felis cursus ornare cubilia leo montes penatibus fermentum<br/>dapibus convallis. Nisl nunc quis senectus platea.
                      </Text>
                      <button className="bg-[#C10016] hover:bg-[#a00012] rounded-[6px] px-8 py-4 flex flex-row items-center gap-3">
                        <Text className="font-helvetica text-[16px] text-white font-bold">View Job</Text>
                        <img src="/arrow.svg" className="w-3 h-3 filter brightness-0 invert" />
                      </button>
                    </View>
                    <View className="flex flex-row gap-4">
                      <View className="bg-[rgba(255,255,255,0.1)] rounded-[80px] px-6 py-2">
                        <Text className="font-helvetica text-[16px] text-white">Remote</Text>
                      </View>
                      <View className="bg-[rgba(255,255,255,0.1)] rounded-[80px] px-6 py-2">
                        <Text className="font-helvetica text-[16px] text-white">Full Time</Text>
                      </View>
                      <View className="bg-[rgba(255,255,255,0.1)] rounded-[80px] px-6 py-2">
                        <Text className="font-helvetica text-[16px] text-white">Dubai</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Auto-Sliding Gallery with Infinite Loop */}
<View className="relative w-full h-[380px] mt-20 mb-20 overflow-hidden">
  <div 
    className="relative w-full h-full"
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
  >
    <View 
      className="flex flex-row absolute top-0 left-6 transition-transform duration-500 ease-in-out"
      style={{ 
        transform: `translateX(-${currentSlide * 404}px)` 
      }}
    >
      {/* Original images */}
      {images.map((image) => (
        <View
          key={image.id}
          className="w-[380px] h-[380px] mr-6 rounded-[20px] bg-cover bg-center flex-shrink-0 hover:scale-105 transition-transform duration-300"
          style={{ backgroundImage: `url(${image.src})` }}
        />
      ))}
      {/* Duplicate images for seamless loop */}
      {images.map((image) => (
        <View
          key={`${image.id}-duplicate`}
          className="w-[380px] h-[380px] mr-6 rounded-[20px] bg-cover bg-center flex-shrink-0 hover:scale-105 transition-transform duration-300"
          style={{ backgroundImage: `url(${image.src})` }}
        />
      ))}
    </View>
  </div>
</View>
        {/* Accomplishments Section */}
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