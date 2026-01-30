// app/locations.tsx
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

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

const LocationMarker = ({ left, top, children }: { left: any, top: any, children: React.ReactNode }) => {
  return (
    <View
      style={{
        position: 'absolute',
        left: left,
        top: top,
        zIndex: 100,
        elevation: 5
      }}
    >
      {children}
    </View>
  );
};

export default function LocationsScreen() {
  const router = useRouter();
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const primaryRed = 'bg-[#C10016]';
  const mapOverlayRef = useRef<HTMLDivElement>(null);

  const getMarkerPos = (id: string) => defaultMarkerPositions[id] ?? { x: 0, y: 0 };
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Contact Us',
          headerShown: false,
        }} 
      />
      
      <Navbar />
      
      {/* Main Scrollable Content */}
      <ScrollView 
        className="flex-1 bg-white"
      >
        {/* Hero Section */}
        <View className="relative min-h-screen">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <Image 
              source={{ uri: "/bg.webp" }}
              alt="Background pattern"
              className="w-full h-full lg:h-[600px]"
              resizeMode="cover"
            />
          </View>
          
          {/* Hero Content */}
          <View className="relative z-10 min-h-screen flex items-center justify-center pb-20">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Locations
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Locations
              </Text>
            </View>
          </View>
        </View>
        {/* Get in Touch Section */}
        <View className="w-full bg-white transform -translate-y-48 pt-4 -mb-48">
          {/* Contact Us Badge */}
          <View className="flex flex-row justify-center items-center mx-auto w-[200px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] mb-8">
            <Text className="font-helvetica font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
              our locations
            </Text>
          </View>

          {/* Get in Touch Heading */}
          <Text className="text-center font-helvetica font-bold text-4xl lg:text-[64px] leading-tight lg:leading-[74px] tracking-[-0.01em] text-black mb-16 px-4">
            Our Worldwide <Text className='text-[#C10016]'>Branches</Text>
          </Text>
{/* Cards Container */}
<View className="flex flex-row flex-wrap justify-center items-start gap-8 px-4 lg:px-8">
                      {/* UK Office Card */}
<View className="relative w-full lg:w-[350px] h-[381px]">
  {/* Background Card */}
  <View className="absolute w-full lg:w-[350px] h-[334px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
  
  {/* Outer Circle */}
  <View className="absolute w-[124px] h-[124px] left-1/2 transform -translate-x-1/2 top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
  
  {/* Flag Circle - Full flag in circle, no red background */}
  <View className="absolute w-[94px] h-[94px] left-1/2 transform -translate-x-1/2 top-[15px] rounded-full overflow-hidden">
    <Image 
      source={{ uri: "/rounduk.webp" }}
      alt="UK Flag" 
      className="w-full h-full"
      resizeMode="cover"
    />
  </View>

  {/* Country Name */}
  <Text className="text-center top-[110px] font-helvetica font-bold text-[24px] leading-[74px] tracking-[-0.01em] text-black">
    United Kingdom
  </Text>

  {/* Contact Info */}
  {/* Phone */}
  <View className="absolute left-6 top-[180px] flex flex-row items-center gap-3 space-y-2">
    {/* <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-2">
      <Image source={{ uri: "/phone.svg" }} alt="Phone" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      +1 234 567 8900
    </Text> */}
  </View>

  {/* Email */}
  <View className="absolute left-6 top-[225px] flex flex-row items-center gap-3 space-y-6">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-6">
      <Image source={{ uri: "/mail.svg" }} alt="Email" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      Info@fulfilx.co.uk
    </Text>
  </View>

  {/* Address */}
  <View className="absolute left-6 top-[270px] flex flex-row items-center gap-3 space-y-10">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-10">
      <Image source={{ uri: "/map.svg" }} alt="Location" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[22px] text-black">
      Manchester
    </Text>
  </View>
</View>
{/* US Office Card */}
<View className="relative w-full lg:w-[350px] h-[381px]">
  {/* Background Card */}
  <View className="absolute w-full lg:w-[350px] h-[334px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
  
  {/* Outer Circle */}
  <View className="absolute w-[124px] h-[124px] left-1/2 transform -translate-x-1/2 top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
  
  {/* Flag Circle - Full flag in circle, no red background */}
  <View className="absolute w-[94px] h-[94px] left-1/2 transform -translate-x-1/2 top-[15px] rounded-full overflow-hidden">
    <Image 
      source={{ uri: "/roundus.webp" }}
      alt="US Flag" 
      className="w-full h-full"
      resizeMode="cover"
    />
  </View>

  {/* Country Name */}
  <Text className="text-center top-[110px] font-helvetica font-bold text-[24px] leading-[74px] tracking-[-0.01em] text-black">
    United States of America
  </Text>

  {/* Contact Info */}
  {/* Phone */}
  <View className="absolute left-6 top-[180px] flex flex-row items-center gap-3 space-y-2">
    {/* <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-2">
      <Image source={{ uri: "/phone.svg" }} alt="Phone" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      +1 234 567 8900
    </Text> */}
  </View>

  {/* Email */}
  <View className="absolute left-6 top-[225px] flex flex-row items-center gap-3 space-y-6">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-6">
      <Image source={{ uri: "/mail.svg" }} alt="Email" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      USA@fulfilx.co.uk
    </Text>
  </View>

  {/* Address */}
  <View className="absolute left-6 top-[270px] flex flex-row items-center gap-3 space-y-10">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-10">
      <Image source={{ uri: "/map.svg" }} alt="Location" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[22px] text-black">
      California/Georgia
    </Text>
  </View>
</View>
                    {/* UAE Office Card */}
<View className="relative w-full lg:w-[350px] h-[381px]">
  {/* Background Card */}
  <View className="absolute w-full lg:w-[350px] h-[334px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
  
  {/* Outer Circle */}
  <View className="absolute w-[124px] h-[124px] left-1/2 transform -translate-x-1/2 top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
  
  {/* Flag Circle - Full flag in circle, no red background */}
  <View className="absolute w-[94px] h-[94px] left-1/2 transform -translate-x-1/2 top-[15px] rounded-full overflow-hidden">
    <Image 
      source={{ uri: "/rounduae.webp" }}
      alt="UAE Flag" 
      className="w-full h-full"
      resizeMode="cover"
    />
  </View>

  {/* Country Name */}
  <Text className="text-center top-[110px] font-helvetica font-bold text-[24px] leading-[74px] tracking-[-0.01em] text-black">
    United Arab Emirates
  </Text>

  {/* Contact Info */}
  {/* Phone */}
  <View className="absolute left-6 top-[180px] flex flex-row items-center gap-3 space-y-2">
    {/* <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-2">
      <Image source={{ uri: "/phone.svg" }} alt="Phone" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      +1 234 567 8900
    </Text> */}
  </View>

  {/* Email */}
  <View className="absolute left-6 top-[225px] flex flex-row items-center gap-3 space-y-6">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-6">
      <Image source={{ uri: "/mail.svg" }} alt="Email" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      UAE@fulfilx.co.uk
    </Text>
  </View>

  {/* Address */}
  <View className="absolute left-6 top-[270px] flex flex-row items-center gap-3 space-y-10">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-10">
      <Image source={{ uri: "/map.svg" }} alt="Location" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[22px] text-black">
      Dubai
    </Text>
  </View>
</View>

</View>
{/* Cards Container */}
<View className="flex flex-row flex-wrap justify-center items-start gap-8 px-4 lg:px-8 mt-5">
                      {/* Saudi Office Card */}
<View className="relative w-full lg:w-[350px] h-[381px]">
  {/* Background Card */}
  <View className="absolute w-full lg:w-[350px] h-[334px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
  
  {/* Outer Circle */}
  <View className="absolute w-[124px] h-[124px] left-1/2 transform -translate-x-1/2 top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
  
  {/* Flag Circle - Full flag in circle, no red background */}
  <View className="absolute w-[94px] h-[94px] left-1/2 transform -translate-x-1/2 top-[15px] rounded-full overflow-hidden">
    <Image 
      source={{ uri: "/roundsaudi.webp" }}
      alt="Saudi Flag" 
      className="w-full h-full"
      resizeMode="cover"
    />
  </View>

  {/* Country Name */}
  <Text className=" text-center top-[110px] font-helvetica font-bold text-[24px] leading-[74px] tracking-[-0.01em] text-black">
    Saudi Arabia 
  </Text>

  {/* Contact Info */}
  {/* Phone */}
  <View className="absolute left-6 top-[180px] flex flex-row items-center gap-3 space-y-2">
    {/* <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-2">
      <Image source={{ uri: "/phone.svg" }} alt="Phone" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      +1 234 567 8900
    </Text> */}
  </View>

  {/* Email */}
  <View className="absolute left-6 top-[225px] flex flex-row items-center gap-3 space-y-6">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-6">
      <Image source={{ uri: "/mail.svg" }} alt="Email" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      Saudi@fulfilx.co.uk
    </Text>
  </View>

  {/* Address */}
  <View className="absolute left-6 top-[270px] flex flex-row items-center gap-3 space-y-10">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-10">
      <Image source={{ uri: "/map.svg" }} alt="Location" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[22px] text-black">
      Riyadh
    </Text>
  </View>
</View>
                    {/* Bahrain Office Card */}
<View className="relative w-full lg:w-[350px] h-[381px]">
  {/* Background Card */}
  <View className="absolute w-full lg:w-[350px] h-[334px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
  
  {/* Outer Circle */}
  <View className="absolute w-[124px] h-[124px] left-1/2 transform -translate-x-1/2 top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
  
  {/* Flag Circle - Full flag in circle, no red background */}
  <View className="absolute w-[94px] h-[94px] left-1/2 transform -translate-x-1/2 top-[15px] rounded-full overflow-hidden">
    <Image 
      source={{ uri: "/roundb.webp" }}
      alt="Bahrain Flag" 
      className="w-full h-full"
      resizeMode="cover"
    />
  </View>

  {/* Country Name */}
  <Text className="text-center top-[110px] font-helvetica font-bold text-[24px] leading-[74px] tracking-[-0.01em] text-black">
    Bahrain
  </Text>

  {/* Contact Info */}
  {/* Phone */}
  <View className="absolute left-6 top-[180px] flex flex-row items-center gap-3 space-y-2">
    {/* <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-2">
      <Image source={{ uri: "/phone.svg" }} alt="Phone" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      +1 234 567 8900
    </Text> */}
  </View>

  {/* Email */}
  <View className="absolute left-6 top-[225px] flex flex-row items-center gap-3 space-y-6">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-6">
      <Image source={{ uri: "/mail.svg" }} alt="Email" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      Bahrain@fulfilx.co.uk
    </Text>
  </View>

  {/* Address */}
  <View className="absolute left-6 top-[270px] flex flex-row items-center gap-3 space-y-10">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-10">
      <Image source={{ uri: "/map.svg" }} alt="Location" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[22px] text-black">
      Manama
    </Text>
  </View>
</View>
                    {/* Australia Office Card */}
<View className="relative w-full lg:w-[350px] h-[381px]">
  {/* Background Card */}
  <View className="absolute w-full lg:w-[350px] h-[334px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
  
  {/* Outer Circle */}
  <View className="absolute w-[124px] h-[124px] left-1/2 transform -translate-x-1/2 top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
  
  {/* Flag Circle - Full flag in circle, no red background */}
  <View className="absolute w-[94px] h-[94px] left-1/2 transform -translate-x-1/2 top-[15px] rounded-full overflow-hidden">
    <Image 
      source={{ uri: "/roundaus.webp" }}
      alt="Australia Flag" 
      className="w-full h-full"
      resizeMode="cover"
    />
  </View>

  {/* Country Name */}
  <Text className="text-center top-[110px] font-helvetica font-bold text-[24px] leading-[74px] tracking-[-0.01em] text-black">
    Australia
  </Text>

  {/* Contact Info */}
  {/* Phone */}
  <View className="absolute left-6 top-[180px] flex flex-row items-center gap-3 space-y-2">
    {/* <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-2">
      <Image source={{ uri: "/phone.svg" }} alt="Phone" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      +1 234 567 8900
    </Text> */}
  </View>

  {/* Email */}
  <View className="absolute left-6 top-[225px] flex flex-row items-center gap-3 space-y-6">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-6">
      <Image source={{ uri: "/mail.svg" }} alt="Email" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      Austailia@fulfilx.co.uk
    </Text>
  </View>

  {/* Address */}
  <View className="absolute left-6 top-[270px] flex flex-row items-center gap-3 space-y-10">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-10">
      <Image source={{ uri: "/map.svg" }} alt="Location" className="w-4 h-4" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px]  leading-[22px] text-black flex-1 justify-center items-center text-center">
      Melbourne
    </Text>
  </View>
</View>

</View>
        </View>

        <section className="relative w-full bg-white overflow-hidden mt-20">
          <div className="relative w-full px-4 md:px-6 lg:px-8 2xl:px-16">
            <div className="flex justify-center">
              <div className="w-[250px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] flex items-center justify-center">
                <span className="font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
                  global presence
                </span>
              </div>
            </div>

            <h2 className="text-center font-bold text-4xl lg:text-[64px] leading-tight lg:leading-[74px] text-black mt-6 lg:mt-6 max-w-[700px] mx-auto px-2">
              Our <span className="text-[#C10016]">Worldwide Network</span>
            </h2>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-16 mt-10 lg:mt-20">
              <div className="flex items-center gap-3">
                <div
                  className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]"
                  style={{ backgroundImage: 'url(/UK.webp)' }}
                ></div>
                <span className="font-normal text-[18px] leading-[30px] text-black">United Kingdom</span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]"
                  style={{ backgroundImage: 'url(/US.webp)' }}
                ></div>
                <span className="font-normal text-[18px] leading-[30px] text-black">California</span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]"
                  style={{ backgroundImage: 'url(/US.webp)' }}
                ></div>
                <span className="font-normal text-[18px] leading-[30px] text-black">Atlanta</span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-[30px] h-[20px] border border-black/10 bg-cover bg-center rounded-[2px]"
                  style={{ backgroundImage: 'url(/NET.webp)' }}
                ></div>
                <span className="font-normal text-[18px] leading-[30px] text-black">Netherlands</span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]"
                  style={{ backgroundImage: 'url(/UAE.webp)' }}
                ></div>
                <span className="font-normal text-[18px] leading-[30px] text-black">UAE</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-12 mt-6 lg:mt-8">
              <div className="flex items-center gap-3">
                <div
                  className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]"
                  style={{ backgroundImage: 'url(/Saudi.webp)' }}
                ></div>
                <span className="font-normal text-[18px] leading-[30px] text-black">Saudi</span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-[30px] h-[20px] border border-black/10 bg-cover bg-center rounded-[2px]"
                  style={{ backgroundImage: 'url(/B.webp)' }}
                ></div>
                <span className="font-normal text-[18px] leading-[30px] text-black">Bahrain</span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]"
                  style={{ backgroundImage: 'url(/Aus.webp)' }}
                ></div>
                <span className="font-normal text-[18px] leading-[30px] text-black">Australia</span>
              </div>
            </div>

            <div className="relative w-full mt-10 lg:mt-20">
              <img src="/world-map.webp" alt="World map" className="w-full h-auto rounded-lg" />

              <div className="absolute inset-0" ref={mapOverlayRef}>
                <div
                  className="absolute group -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${getMarkerPos('uk').x}%`, top: `${getMarkerPos('uk').y}%` }}
                >
                  <div className="w-[24px] h-[24px] sm:w-[48px] sm:h-[48px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
                    <img src="/location.png" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
                    <div className="hidden sm:flex w-[32px] h-[32px] border border-[#C10016] rounded-full items-center justify-center">
                      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
                      <img src="/UK.webp" alt="UK Flag" className="w-[16px] h-[12px]" />
                      <p className="text-sm font-medium text-gray-800">United Kingdom</p>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                  </div>
                </div>

                <div
                  className="absolute group -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${getMarkerPos('ca').x}%`, top: `${getMarkerPos('ca').y}%` }}
                >
                  <div className="w-[24px] h-[24px] sm:w-[48px] sm:h-[48px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
                    <img src="/location.png" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
                    <div className="hidden sm:flex w-[32px] h-[32px] border border-[#C10016] rounded-full items-center justify-center">
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

                

                <div
                  className="absolute group -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${getMarkerPos('atl').x}%`, top: `${getMarkerPos('atl').y}%` }}
                >
                  <div className="w-[24px] h-[24px] sm:w-[48px] sm:h-[48px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
                    <img src="/location.png" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
                    <div className="hidden sm:flex w-[32px] h-[32px] border border-[#C10016] rounded-full items-center justify-center">
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

                <div
                  className="absolute group -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${getMarkerPos('nl').x}%`, top: `${getMarkerPos('nl').y}%` }}
                >
                  <div className="w-[24px] h-[24px] sm:w-[48px] sm:h-[48px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
                    <img src="/location.png" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
                    <div className="hidden sm:flex w-[32px] h-[32px] border border-[#C10016] rounded-full items-center justify-center">
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

                <div
                  className="absolute group -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${getMarkerPos('uae').x}%`, top: `${getMarkerPos('uae').y}%` }}
                >
                  <div className="w-[24px] h-[24px] sm:w-[48px] sm:h-[48px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
                    <img src="/location.png" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
                    <div className="hidden sm:flex w-[32px] h-[32px] border border-[#C10016] rounded-full items-center justify-center">
                      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
                      <img src="/UAE.webp" alt="UAE Flag" className="w-[16px] h-[12px]" />
                      <p className="text-sm font-medium text-gray-800">UAE</p>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                  </div>
                </div>

                <div
                  className="absolute group -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${getMarkerPos('bh').x}%`, top: `${getMarkerPos('bh').y}%` }}
                >
                  <div className="w-[24px] h-[24px] sm:w-[40px] sm:h-[40px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
                    <img src="/location.png" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
                    <div className="hidden sm:flex w-[26.67px] h-[26.67px] border border-[#C10016] rounded-full items-center justify-center">
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

                <div
                  className="absolute group -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${getMarkerPos('au').x}%`, top: `${getMarkerPos('au').y}%` }}
                >
                  <div className="w-[24px] h-[24px] sm:w-[48px] sm:h-[48px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
                    <img src="/location.png" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
                    <div className="hidden sm:flex w-[32px] h-[32px] border border-[#C10016] rounded-full items-center justify-center">
                      <div className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
                      <img src="/Aus.webp" alt="AU Flag" className="w-[16px] h-[12px]" />
                      <p className="text-sm font-medium text-gray-800">Australia</p>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                  </div>
                </div>

                <div
                  className="absolute group -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${getMarkerPos('sa').x}%`, top: `${getMarkerPos('sa').y}%` }}
                >
                  <div className="w-[24px] h-[24px] sm:w-[40px] sm:h-[40px] sm:border sm:border-[#C10016] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 sm:hover:scale-110">
                    <img src="/location.png" alt="Location marker" className="w-[18px] h-[18px] object-contain sm:hidden" />
                    <div className="hidden sm:flex w-[26.67px] h-[26.67px] border border-[#C10016] rounded-full items-center justify-center">
                      <div className="w-[13.33px] h-[13.33px] bg-[#C10016] rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-white px-6 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap flex items-center gap-2">
                      <img src="/Saudi.webp" alt="Saudi Flag" className="w-[16px] h-[12px]" />
                      <p className="text-sm font-medium text-gray-800">Saudi Arabia</p>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accomplishments Section */}
        <View className="relative w-full mt-4">
          {/* Two Column Layout */}
          <View className="flex flex-col lg:flex-row ">
            
            {/* Left Section - White Background */}
            <View className="w-full lg:w-1/2 bg-white relative min-h-[400px] lg:min-h-[520px] flex items-center justify-center py-12 lg:py-0">
              <Image source={{ uri: "/bg.webp" }} className="absolute inset-0 w-full h-full" resizeMode="cover" />
              {/* Left Section Content - Centered */}
              <View className="max-w-[740px] w-full items-center px-8">
                
                {/* Heading */}
                <Text className="font-helvetica font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] tracking-tight text-black mb-8 text-center">
                  Our Awards
                </Text>

                {/* Red Line - Centered */}
                <View className="w-[100px] h-[1px] bg-[#C10016] mx-auto mb-12"></View>

                {/* Image Grid - Centered */}
                <View className="flex flex-row flex-wrap justify-center gap-4 lg:gap-16 mb-12">
                  <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] overflow-hidden">
                     <Image source={{ uri: "/award1.webp" }} className="w-full h-full" resizeMode="contain" />
                  </View>
                  <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] overflow-hidden">
                     <Image source={{ uri: "/award2.webp" }} className="w-full h-full" resizeMode="contain" />
                  </View>
                  <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] overflow-hidden">
                     <Image source={{ uri: "/award3.webp" }} className="w-full h-full" resizeMode="contain" />
                  </View>
                  <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] overflow-hidden">
                     <Image source={{ uri: "/award4.webp" }} className="w-full h-full" resizeMode="contain" />
                  </View>
                  <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] overflow-hidden">
                     <Image source={{ uri: "/award5.webp" }} className="w-full h-full" resizeMode="contain" />
                  </View>
                </View>
              </View>
            </View>

            {/* Right Section - Red Background */}
            <View className="w-full lg:w-1/2 bg-[#DA192F] relative min-h-[400px] lg:min-h-[520px] flex items-center justify-center py-12 lg:py-0">
              {/* Right Section Content - Centered */}
              <View className="max-w-[650px] w-full items-center px-8">
                
                {/* Heading */}
                <Text className="font-helvetica font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] tracking-tight text-white mb-8 text-center">
                  Accreditations
                </Text>

                {/* White Line - Centered */}
                <View className="w-[100px] h-[1px] bg-white mx-auto mb-12"></View>


                {/* CTA Button - Centered */}
                <TouchableOpacity 
                  onPress={() => router.push('/contact')}
                  className="border border-white rounded-[6px] flex flex-row items-center justify-center gap-[10px] px-8 py-4"
                >
                  <Text className="text-white font-helvetica font-bold text-[18px] leading-[36px]">Let&apos;s Talk</Text>
                  <Image source={{ uri: "/arrow.svg" }} alt="arrow" className="w-4 h-4" resizeMode="contain" />
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
