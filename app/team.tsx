// app/team.tsx
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function TeamScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused] = useState(false);
  
  
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
      >
        {/* Hero Section */}
        <View className="relative min-h-screen">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <Image 
              source={{ uri: "/bg.webp" }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-screen flex items-center justify-center pb-20">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-6xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Meet Our Team
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Team
              </Text>
            </View>
          </View>
        </View>

        {/* Team Section */}
        <View className="w-full bg-white transform -translate-y-20 lg:-translate-y-48">
          {/* Skilled Staff Badge */}
          <View className="flex flex-row justify-center items-center mx-auto w-[240px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] mb-8">
            <Text className="font-helvetica font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
              Skilled Staff
            </Text>
          </View>

          {/* Main Heading */}
          <Text className="text-center font-helvetica font-bold text-4xl lg:text-[64px] leading-tight lg:leading-[74px] tracking-[-0.01em] text-black mb-16 px-4">
            Meet Our Qualified <Text className='text-[#C10016]'>Experts</Text>
          </Text>

          {/* Team Members Grid */}
          <View className="flex flex-col gap-8 px-4 lg:px-8">
            
            {/* First Row */}
            <View className="flex flex-col lg:flex-row justify-center gap-8">
              
{/* Team Member 1 - Nas */}
<View className="relative w-full lg:w-[720px] h-auto lg:h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden group hover:bg-[#C10016] transition-colors duration-300 flex flex-col lg:block p-4 lg:p-0">
  {/* Member Image with Social Icons Popup */}
  <View className="relative lg:absolute w-full lg:w-[300px] h-[300px] lg:h-[340px] lg:left-8 lg:top-4 rounded-[12px] overflow-hidden mb-6 lg:mb-0">
    <Image
      source={{ uri: "/nas.webp" }}
      className="w-full h-full"
      resizeMode="cover"
    />
  </View>
  
  {/* Member Info */}
  <View className="relative lg:absolute lg:left-[360px] lg:top-8 w-full lg:w-[340px]">
    <Text className="font-helvetica font-bold text-2xl lg:text-[26px] leading-tight lg:leading-[80px] text-black group-hover:text-white transition-colors duration-300 mt-2 lg:mt-0">
      Nas
    </Text>
    <Text className="font-helvetica font-normal text-lg lg:text-[18px] leading-snug lg:leading-[38px] text-black group-hover:text-white transition-colors duration-300 mb-4">
      Co-Founder & CEO
    </Text>
    <Text className="font-helvetica font-normal text-base lg:text-[18px] leading-relaxed lg:leading-[30px] text-black group-hover:text-white transition-colors duration-300">
      In the realm of luxury goods, where the value lies not only in the product itself but in the entire customer experience, the importance.
    </Text>
  </View>
  
  {/* Email Icon */}
  <TouchableOpacity className="relative lg:absolute lg:left-[360px] lg:bottom-8 w-12 h-12 bg-[#C10016] group-hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 mt-6 lg:mt-0">
    <Image 
      source={{ uri: "/mail.svg" }}
      className="w-4 h-4"
      resizeMode="contain"
      style={{ tintColor: 'white' }}
    />
  </TouchableOpacity>
</View>

              {/* Team Member 2 - Anson */}
<View className="relative w-full lg:w-[720px] h-auto lg:h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden group hover:bg-[#C10016] transition-colors duration-300 flex flex-col lg:block p-4 lg:p-0">
  {/* Member Image with Social Icons Popup */}
  <View className="relative lg:absolute w-full lg:w-[300px] h-[300px] lg:h-[340px] lg:left-8 lg:top-4 rounded-[12px] overflow-hidden mb-6 lg:mb-0">
    <Image 
      source={{ uri: "/Anson.webp" }}
      className="w-full h-full"
      resizeMode="cover"
    />

  </View>
  
  {/* Member Info */}
  <View className="relative lg:absolute lg:left-[360px] lg:top-8 w-full lg:w-[340px]">
    <Text className="font-helvetica font-bold text-2xl lg:text-[26px] leading-tight lg:leading-[80px] text-black group-hover:text-white transition-colors duration-300 mt-2 lg:mt-0">
      Anson
    </Text>
    <Text className="font-helvetica font-normal text-lg lg:text-[18px] leading-snug lg:leading-[38px] text-black group-hover:text-white transition-colors duration-300 mb-4">
      Operations Manager
    </Text>
    <Text className="font-helvetica font-normal text-base lg:text-[18px] leading-relaxed lg:leading-[30px] text-black group-hover:text-white transition-colors duration-300">
      In the realm of luxury goods, where the value lies not only in the product itself but in the entire customer experience, the importance.
    </Text>
  </View>
  
  {/* Email Icon */}
  <TouchableOpacity className="relative lg:absolute lg:left-[360px] lg:bottom-8 w-12 h-12 bg-[#C10016] group-hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 mt-6 lg:mt-0">
    <Image 
      source={{ uri: "/mail.svg" }}
      className="w-4 h-4"
      resizeMode="contain"
      style={{ tintColor: 'white' }}
    />
  </TouchableOpacity>
</View>

            </View>

            {/* Second Row */}
            <View className="flex flex-col lg:flex-row justify-center gap-8">
              
              {/* Team Member 3 - Nat */}
              <View className="relative w-full lg:w-[720px] h-auto lg:h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden group hover:bg-[#C10016] transition-colors duration-300 flex flex-col lg:block p-4 lg:p-0">
  {/* Member Image with Social Icons Popup */}
  <View className="relative lg:absolute w-full lg:w-[300px] h-[300px] lg:h-[340px] lg:left-8 lg:top-4 rounded-[12px] overflow-hidden mb-6 lg:mb-0">
    <Image 
      source={{ uri: "/Nat.webp" }}
      className="w-full h-full"
      resizeMode="cover"
    />
  </View>
  
  {/* Member Info */}
  <View className="relative lg:absolute lg:left-[360px] lg:top-8 w-full lg:w-[340px]">
    <Text className="font-helvetica font-bold text-2xl lg:text-[26px] leading-tight lg:leading-[80px] text-black group-hover:text-white transition-colors duration-300 mt-2 lg:mt-0">
      Nat
    </Text>
    <Text className="font-helvetica font-normal text-lg lg:text-[18px] leading-snug lg:leading-[38px] text-black group-hover:text-white transition-colors duration-300 mb-4">
      Team Leader - Ops
    </Text>
    <Text className="font-helvetica font-normal text-base lg:text-[18px] leading-relaxed lg:leading-[30px] text-black group-hover:text-white transition-colors duration-300">
      In the realm of luxury goods, where the value lies not only in the product itself but in the entire customer experience, the importance.
    </Text>
  </View>
  
  {/* Email Icon */}
  <TouchableOpacity className="relative lg:absolute lg:left-[360px] lg:bottom-8 w-12 h-12 bg-[#C10016] group-hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 mt-6 lg:mt-0">
    <Image 
      source={{ uri: "/mail.svg" }}
      className="w-4 h-4"
      resizeMode="contain"
      style={{ tintColor: 'white' }}
    />
  </TouchableOpacity>
</View>

              {/* Team Member 4 - Ste */}
<View className="relative w-full lg:w-[720px] h-auto lg:h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden group hover:bg-[#C10016] transition-colors duration-300 flex flex-col lg:block p-4 lg:p-0">
  {/* Member Image with Social Icons Popup */}
  <View className="relative lg:absolute w-full lg:w-[300px] h-[300px] lg:h-[340px] lg:left-8 lg:top-4 rounded-[12px] overflow-hidden mb-6 lg:mb-0">
    <Image 
      source={{ uri: "/Ste.webp" }}
      className="w-full h-full"
      resizeMode="cover"
    />
  </View>
  
  {/* Member Info */}
  <View className="relative lg:absolute lg:left-[360px] lg:top-8 w-full lg:w-[340px]">
    <Text className="font-helvetica font-bold text-2xl lg:text-[26px] leading-tight lg:leading-[80px] text-black group-hover:text-white transition-colors duration-300 mt-2 lg:mt-0">
      Ste
    </Text>
    <Text className="font-helvetica font-normal text-lg lg:text-[18px] leading-snug lg:leading-[38px] text-black group-hover:text-white transition-colors duration-300 mb-4">
      Team Leader - Warehouse
    </Text>
    <Text className="font-helvetica font-normal text-base lg:text-[18px] leading-relaxed lg:leading-[30px] text-black group-hover:text-white transition-colors duration-300">
      In the realm of luxury goods, where the value lies not only in the product itself but in the entire customer experience, the importance.
    </Text>
  </View>
  
  {/* Email Icon */}
  <TouchableOpacity className="relative lg:absolute lg:left-[360px] lg:bottom-8 w-12 h-12 bg-[#C10016] group-hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 mt-6 lg:mt-0">
    <Image 
      source={{ uri: "/mail.svg" }}
      className="w-4 h-4"
      resizeMode="contain"
      style={{ tintColor: 'white' }}
    />
  </TouchableOpacity>
</View>

            </View>

            {/* Third Row - Centered */}
            <View className="flex flex-col lg:flex-row justify-center">
              
              {/* Team Member 5 - Jordy */}
<View className="relative w-full lg:w-[720px] h-auto lg:h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden group hover:bg-[#C10016] transition-colors duration-300 flex flex-col lg:block p-4 lg:p-0">
  {/* Member Image with Social Icons Popup */}
  <View className="relative lg:absolute w-full lg:w-[300px] h-[300px] lg:h-[340px] lg:left-8 lg:top-4 rounded-[12px] overflow-hidden mb-6 lg:mb-0">
    <Image 
      source={{ uri: "/jordy.webp" }}
      className="w-full h-full"
      resizeMode="cover"
    />
  </View>
  
  {/* Member Info */}
  <View className="relative lg:absolute lg:left-[360px] lg:top-8 w-full lg:w-[340px]">
    <Text className="font-helvetica font-bold text-2xl lg:text-[26px] leading-tight lg:leading-[80px] text-black group-hover:text-white transition-colors duration-300 mt-2 lg:mt-0">
      Jordy
    </Text>
    <Text className="font-helvetica font-normal text-lg lg:text-[18px] leading-snug lg:leading-[38px] text-black group-hover:text-white transition-colors duration-300 mb-4">
      Warehouse Manager
    </Text>
    <Text className="font-helvetica font-normal text-base lg:text-[18px] leading-relaxed lg:leading-[30px] text-black group-hover:text-white transition-colors duration-300">
      In the realm of luxury goods, where the value lies not only in the product itself but in the entire customer experience, the importance.
    </Text>
  </View>
  
  {/* Email Icon */}
  <TouchableOpacity className="relative lg:absolute lg:left-[360px] lg:bottom-8 w-12 h-12 bg-[#C10016] group-hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 mt-6 lg:mt-0">
    <Image
      source={{ uri: "/mail.svg" }}
      className="w-4 h-4"
      resizeMode="contain"
      style={{ tintColor: 'white' }}
    />
  </TouchableOpacity>
</View>
            </View>
          </View>
        </View>

        {/* Career Opportunities Section */}
        <View className="relative w-full min-h-auto lg:min-h-[900px] py-12 lg:py-20 overflow-hidden">
          {/* Background Gradient Fix */}
          <View className="absolute inset-0">
            <Image 
              source={{ uri: "/job.webp" }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Content Container - Centered */}
          <View className="relative z-10 max-w-[1500px] mx-auto px-4 lg:px-8 h-full flex items-center">
            {/* 2 Column Layout - Centered vertically */}
            <View className="flex flex-col lg:flex-row gap-10 lg:gap-20 w-full items-center">
              {/* LEFT COLUMN - Centered horizontally */}
              <View className="flex-1 flex flex-col justify-center w-full">
                {/* Badge */}
                <View className="w-[280px] lg:w-[320px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] mb-10 flex items-center justify-center mx-auto lg:mx-0">
                  <Text className="font-helvetica font-medium text-sm lg:text-[16px] tracking-[0.2em] text-[#C10016] uppercase">
                    Career Opportunities
                  </Text>
                </View>

                <Text className="font-helvetica font-bold text-4xl lg:text-[60px] leading-tight lg:leading-[74px] text-white mb-8 text-center lg:text-left">
                  Discover the <Text className="text-[#C10016]">Path</Text> to Your Dream <Text className="text-[#C10016]">Career</Text>
                </Text>

                <Text className="font-helvetica text-lg lg:text-[20px] leading-relaxed lg:leading-[38px] text-white/90 mb-12 max-w-full lg:max-w-[670px] text-center lg:text-left">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer.
                </Text>

                <TouchableOpacity className="bg-[#C10016] rounded-[6px] px-8 py-4 flex flex-row items-center gap-2 w-[200px] mx-auto lg:mx-0">
                  <Text className="font-helvetica font-bold text-[18px] text-white">View All Jobs</Text>
                  <Image source={{ uri: "/arrow.svg" }} className="w-3 h-3" resizeMode="contain" style={{ tintColor: 'white' }} />
                </TouchableOpacity>
              </View>

              {/* RIGHT COLUMN - Fixed card dimensions */}
              <View className="flex-1 flex flex-col justify-center w-full">
                <View className="space-y-6 max-h-[700px] overflow-y-auto lg:overflow-y-hidden lg:hover:overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[#C10016] scrollbar-track-transparent hover:scrollbar-thumb-[#C10016] pr-2 w-full">
    {/* CARD 1 — Dark (Top) */}
    <View className="w-full lg:w-[680px] h-auto lg:h-[225px] bg-[rgba(255,255,255,0.1)] backdrop-blur-[5px] rounded-[20px] p-6 lg:p-8">
      <Text className="font-helvetica font-bold text-xl lg:text-[22px] leading-tight lg:leading-[44px] text-white mb-2">
        Warehouse Manager
      </Text>
      <View className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4 lg:gap-0">
        <Text className="font-helvetica text-sm lg:text-[16px] leading-[26px] text-white/90 max-w-full lg:max-w-[500px]">
          Felis cursus ornare cubilia leo montes penatibus fermentum dapibus convallis. Nisl nunc quis senectus platea.
        </Text>
        <TouchableOpacity className="bg-[#C10016] rounded-[6px] px-8 py-4 flex flex-row items-center gap-3 w-full lg:w-auto justify-center lg:justify-start">
          <Text className="font-helvetica text-[16px] text-white font-bold">View Job</Text>
          <Image source={{ uri: "/arrow.svg" }} className="w-3 h-3" resizeMode="contain" style={{ tintColor: 'white' }} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-wrap gap-4">
        <View className="bg-[rgba(255,255,255,0.1)] rounded-[80px] px-6 py-2">
          <Text className="font-helvetica text-sm lg:text-[16px] text-white">Remote</Text>
        </View>
        <View className="bg-[rgba(255,255,255,0.1)] rounded-[80px] px-6 py-2">
          <Text className="font-helvetica text-sm lg:text-[16px] text-white">Full Time</Text>
        </View>
        <View className="bg-[rgba(255,255,255,0.1)] rounded-[80px] px-6 py-2">
          <Text className="font-helvetica text-sm lg:text-[16px] text-white">Dubai</Text>
        </View>
      </View>
    </View>

    {/* CARD 2 — WHITE (Middle) */}
    <View className="w-full lg:w-[680px] h-auto lg:h-[225px] bg-white rounded-[20px] p-6 lg:p-8 shadow-2xl">
      <Text className="font-helvetica font-bold text-xl lg:text-[22px] leading-tight lg:leading-[44px] text-black mb-2">
        Warehouse Manager
      </Text>
      <View className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4 lg:gap-0">
        <Text className="font-helvetica text-sm lg:text-[16px] leading-[26px] text-black/80 max-w-full lg:max-w-[500px]">
          Felis cursus ornare cubilia leo montes penatibus fermentum dapibus convallis. Nisl nunc quis senectus platea.
        </Text>
        <TouchableOpacity className="bg-[#C10016] rounded-[6px] px-8 py-4 flex flex-row items-center gap-3 w-full lg:w-auto justify-center lg:justify-start">
          <Text className="font-helvetica text-[16px] text-white font-bold">View Job</Text>
          <Image source={{ uri: "/arrow.svg" }} className="w-3 h-3" resizeMode="contain" style={{ tintColor: 'white' }} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-wrap gap-4">
        <View className="bg-[rgba(193,0,22,0.1)] rounded-[80px] px-6 py-2">
          <Text className="font-helvetica text-sm lg:text-[16px] text-[#C10016]">Remote</Text>
        </View>
        <View className="bg-[rgba(193,0,22,0.1)] rounded-[80px] px-6 py-2">
          <Text className="font-helvetica text-sm lg:text-[16px] text-[#C10016]">Full Time</Text>
        </View>
        <View className="bg-[rgba(193,0,22,0.1)] rounded-[80px] px-6 py-2">
          <Text className="font-helvetica text-sm lg:text-[16px] text-[#C10016]">Dubai</Text>
        </View>
      </View>
    </View>

    {/* CARD 3 — Dark (Bottom) */}
    <View className="w-full lg:w-[680px] h-auto lg:h-[225px] bg-[rgba(255,255,255,0.1)] backdrop-blur-[5px] rounded-[20px] p-6 lg:p-8">
      <Text className="font-helvetica font-bold text-xl lg:text-[22px] leading-tight lg:leading-[44px] text-white mb-2">
        Warehouse Manager
      </Text>
      <View className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4 lg:gap-0">
        <Text className="font-helvetica text-sm lg:text-[16px] leading-[26px] text-white/90 max-w-full lg:max-w-[500px]">
          Felis cursus ornare cubilia leo montes penatibus fermentum dapibus convallis. Nisl nunc quis senectus platea.
        </Text>
        <TouchableOpacity className="bg-[#C10016] rounded-[6px] px-8 py-4 flex flex-row items-center gap-3 w-full lg:w-auto justify-center lg:justify-start">
          <Text className="font-helvetica text-[16px] text-white font-bold">View Job</Text>
          <Image source={{ uri: "/arrow.svg" }} className="w-3 h-3" resizeMode="contain" style={{ tintColor: 'white' }} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-wrap gap-4">
        <View className="bg-[rgba(255,255,255,0.1)] rounded-[80px] px-6 py-2">
          <Text className="font-helvetica text-sm lg:text-[16px] text-white">Remote</Text>
        </View>
        <View className="bg-[rgba(255,255,255,0.1)] rounded-[80px] px-6 py-2">
          <Text className="font-helvetica text-sm lg:text-[16px] text-white">Full Time</Text>
        </View>
        <View className="bg-[rgba(255,255,255,0.1)] rounded-[80px] px-6 py-2">
          <Text className="font-helvetica text-sm lg:text-[16px] text-white">Dubai</Text>
        </View>
      </View>
    </View>
    {/*CARD 4 - WHITE */}
        <View className="w-full lg:w-[680px] h-auto lg:h-[225px] bg-white rounded-[20px] p-6 lg:p-8 shadow-2xl">
      <Text className="font-helvetica font-bold text-xl lg:text-[22px] leading-tight lg:leading-[44px] text-black mb-2">
        Warehouse Manager
      </Text>
      <View className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4 lg:gap-0">
        <Text className="font-helvetica text-sm lg:text-[16px] leading-[26px] text-black/80 max-w-full lg:max-w-[500px]">
          Felis cursus ornare cubilia leo montes penatibus fermentum dapibus convallis. Nisl nunc quis senectus platea.
        </Text>
        <TouchableOpacity className="bg-[#C10016] rounded-[6px] px-8 py-4 flex flex-row items-center gap-3 w-full lg:w-auto justify-center lg:justify-start">
          <Text className="font-helvetica text-[16px] text-white font-bold">View Job</Text>
          <Image source={{ uri: "/arrow.svg" }} className="w-3 h-3" resizeMode="contain" style={{ tintColor: 'white' }} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-wrap gap-4">
        <View className="bg-[rgba(193,0,22,0.1)] rounded-[80px] px-6 py-2">
          <Text className="font-helvetica text-sm lg:text-[16px] text-[#C10016]">Remote</Text>
        </View>
        <View className="bg-[rgba(193,0,22,0.1)] rounded-[80px] px-6 py-2">
          <Text className="font-helvetica text-sm lg:text-[16px] text-[#C10016]">Full Time</Text>
        </View>
        <View className="bg-[rgba(193,0,22,0.1)] rounded-[80px] px-6 py-2">
          <Text className="font-helvetica text-sm lg:text-[16px] text-[#C10016]">Dubai</Text>
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
          <View className="relative w-full h-full">
            <View 
              className="flex flex-row absolute top-0 left-6 transition-transform duration-500 ease-in-out"
              style={{ 
                transform: [{ translateX: -currentSlide * 404 }]
              }}
            >
              {/* Original images */}
              {images.map((image) => (
                <View
                  key={image.id}
                  className="w-[380px] h-[380px] mr-6 rounded-[20px] overflow-hidden"
                >
                  <Image source={{ uri: image.src }} className="w-full h-full" resizeMode="cover" />
                </View>
              ))}
              {/* Duplicate images for seamless loop */}
              {images.map((image) => (
                <View
                  key={`${image.id}-duplicate`}
                  className="w-[380px] h-[380px] mr-6 rounded-[20px] overflow-hidden"
                >
                  <Image source={{ uri: image.src }} className="w-full h-full" resizeMode="cover" />
                </View>
              ))}
            </View>
          </View>
        </View>
        {/* Accomplishments Section */}
        <View className="relative w-full">
          {/* Two Column Layout */}
          <View className="flex flex-col lg:flex-row">
            
            {/* Left Section - White Background */}
            <View className="w-full lg:w-1/2 bg-white relative min-h-[520px] flex items-center justify-center py-12 lg:py-0">
              <Image source={{ uri: "/bg.webp" }} className="absolute inset-0 w-full h-full" resizeMode="cover" />
              {/* Left Section Content - Centered */}
              <View className="max-w-[740px] w-full text-center px-8">
                
                {/* Heading */}
                <Text className="font-bold text-[32px] lg:text-[42px] leading-[44px] lg:leading-[54px] tracking-tight text-center text-black mb-8">
                  Our Awards
                </Text>

                {/* Red Line - Centered */}
                <View className="w-[100px] h-[1px] bg-[#C10016] mx-auto mb-12"></View>

                {/* Image Grid - Centered */}
                <View className="flex flex-row justify-center gap-4 lg:gap-16 mb-12 flex-wrap">
                  <Image source={{ uri: "/award1.webp" }} className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px]" resizeMode="cover" />
                  <Image source={{ uri: "/award2.webp" }} className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px]" resizeMode="cover" />
                  <Image source={{ uri: "/award3.webp" }} className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px]" resizeMode="cover" />
                  <Image source={{ uri: "/award4.webp" }} className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px]" resizeMode="cover" />
                  <Image source={{ uri: "/award5.webp" }} className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px]" resizeMode="cover" />
                </View>
              </View>
            </View>

            {/* Right Section - Red Background */}
            <View className="w-full lg:w-1/2 bg-[#DA192F] relative min-h-[520px] flex items-center justify-center py-12 lg:py-0">
              {/* Right Section Content - Centered */}
              <View className="max-w-[650px] w-full text-center px-8">
                
                {/* Heading */}
                <Text className="font-bold text-[32px] lg:text-[42px] leading-[44px] lg:leading-[54px] tracking-tight text-center text-white mb-8">
                  Accreditations
                </Text>

                {/* White Line - Centered */}
                <View className="w-[100px] h-[1px] bg-white mx-auto mb-12"></View>

                {/* Subtitle - Centered */}
                <Text className="font-normal text-[20px] lg:text-[24px] leading-[36px] lg:leading-[44px] text-center text-white mb-12">
                  Exceptional Quality Service
                </Text>

                {/* CTA Button - Centered */}
                <TouchableOpacity 
                  onPress={() => router.push('/contact')}
                  className="border border-white rounded-[6px] flex flex-row items-center justify-center gap-[10px] px-8 py-4 mx-auto"
                >
                  <Text className="text-white font-bold text-[18px] leading-[36px]">Let’s Talk</Text>
                  <Image source={{ uri: "/arrow.svg" }} className="w-4 h-4" resizeMode="contain" style={{ tintColor: 'white' }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Footer/>

      </ScrollView>
    </>
  );
}
