// app/locations.tsx
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
        showsVerticalScrollIndicator={false}
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
                Store Locations
              </Text>
            </View>
          </View>
        </View>
        {/* Get in Touch Section */}
        <View className="w-full bg-white transform -translate-y-48">
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
<View className="flex flex-row justify-center items-start gap-8 px-8">
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
      <Image source={{ uri: "/map.svg" }} alt="Location" className="w-full h-full" resizeMode="contain" />
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
      <Image source={{ uri: "/map.svg" }} alt="Location" className="w-full h-full" resizeMode="contain" />
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
      <Image source={{ uri: "/map.svg" }} alt="Location" className="w-full h-full" resizeMode="contain" />
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
      <Image source={{ uri: "/map.svg" }} alt="Location" className="w-full h-full" resizeMode="contain" />
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
      <Image source={{ uri: "/map.svg" }} alt="Location" className="w-full h-full" resizeMode="contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px]  leading-[22px] text-black flex-1 justify-center items-center text-center">
      Melbourne
    </Text>
  </View>
</View>

</View>
        </View>
<View className="relative w-full min-h-screen bg-white">
  <View className="relative w-full min-h-[600px] lg:min-h-[800px] -mt-24 pb-20">
     <Image 
      source={{ uri: "/bg.webp" }}
      alt="Background" 
      className="absolute w-full h-full"
      resizeMode="cover"
    />
    <View className="relative max-w-[1490px] mx-auto px-4 py-16 mt-24">
    {/* "Global Presence" Badge */}
    <View className="flex flex-row justify-center">
      <View className="w-[250px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] flex items-center justify-center">
        <Text className="font-helvetica font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
          global presence
        </Text>
      </View>
    </View>

    {/* Main Heading */}
    <Text className="text-center font-helvetica font-bold text-3xl lg:text-[64px] leading-tight lg:leading-[74px] text-black mt-16 max-w-[700px] mx-auto px-4">
      List of nations we work with <Text className="text-[#C10016]">worldwide</Text>
    </Text>

    {/* First Row of Countries */}
    <View className="flex flex-row flex-wrap justify-center items-center gap-4 lg:gap-16 mt-20">
      {/* United Kingdom */}
      <View className="flex flex-row items-center gap-3">
        <View className="w-[30px] h-[20px] rounded-[2px] overflow-hidden">
          <Image source={{ uri: "/UK.webp" }} className="w-full h-full" resizeMode="cover" />
        </View>
        <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">United Kingdom</Text>
      </View>
 {/* United Kingdom */}
      <View className="flex flex-row items-center gap-3">
        <View className="w-[30px] h-[20px] rounded-[2px] overflow-hidden">
          <Image source={{ uri: "/US.webp" }} className="w-full h-full" resizeMode="cover" />
        </View>
        <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">California</Text>
      </View>
      

      {/* United States */}
      <View className="flex flex-row items-center gap-3">
        <View className="w-[30px] h-[20px] rounded-[2px] overflow-hidden">
           <Image source={{ uri: "/US.webp" }} className="w-full h-full" resizeMode="cover" />
        </View>
        <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">United States</Text>
      </View>

      {/* San Francisco */}
      <View className="flex flex-row items-center gap-3">
        <View className="w-[30px] h-[20px] rounded-[2px] overflow-hidden">
           <Image source={{ uri: "/US.webp" }} className="w-full h-full" resizeMode="cover" />
        </View>
        <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">Atlanta</Text>
      </View>

      {/* Georgia */}
      <View className="flex flex-row items-center gap-3">
        <View className="w-[30px] h-[20px] border border-black/10 rounded-[2px] overflow-hidden">
           <Image source={{ uri: "/NET.webp" }} className="w-full h-full" resizeMode="cover" />
        </View>
        <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">Netherlands</Text>
      </View>

      {/* UAE */}
      <View className="flex flex-row items-center gap-3">
        <View className="w-[30px] h-[20px] rounded-[2px] overflow-hidden">
           <Image source={{ uri: "/UAE.webp" }} className="w-full h-full" resizeMode="cover" />
        </View>
        <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">UAE</Text>
      </View>
    </View>

    {/* Second Row of Countries */}
    <View className="flex flex-row flex-wrap justify-center items-center gap-4 lg:gap-12 mt-8 mb-16">
      {/* Saudi */}
      <View className="flex flex-row items-center gap-3">
        <View className="w-[30px] h-[20px] rounded-[2px] overflow-hidden">
           <Image source={{ uri: "/Saudi.webp" }} className="w-full h-full" resizeMode="cover" />
        </View>
        <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">Saudi</Text>
      </View>

      {/* Bahrain */}
      <View className="flex flex-row items-center gap-3">
        <View className="w-[30px] h-[20px] border border-black/10 rounded-[2px] overflow-hidden">
           <Image source={{ uri: "/B.webp" }} className="w-full h-full" resizeMode="cover" />
        </View>
        <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">Bahrain</Text>
      </View>

      {/* Australia */}
      <View className="flex flex-row items-center gap-3">
        <View className="w-[30px] h-[20px] rounded-[2px] overflow-hidden">
           <Image source={{ uri: "/Aus.webp" }} className="w-full h-full" resizeMode="cover" />
        </View>
        <Text className="font-helvetica font-normal text-[18px] leading-[30px] text-black">Australia</Text>
      </View>
    </View>

    </View>
    {/* World Map Image */}
    <View className="relative w-full h-[300px] lg:h-[698px]">
      <Image 
        source={{ uri: "/world-map.webp" }} 
        alt="World map"
        className="w-full h-full rounded-lg" 
        resizeMode="contain" 
      />
{/* Location Markers - Positioned to match the flags list with hover tooltips */}

{/* United Kingdom */}
<LocationMarker left="69.84%" top="16.59%">
  <View className="group relative items-center">
    <View className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-3 py-1.5 rounded shadow-sm pointer-events-none flex flex-row items-center gap-2">
      <Image source={{ uri: "/UK.webp" }} className="w-5 h-3 rounded-[1px]" resizeMode="cover" />
      <Text className="text-black text-xs font-bold whitespace-nowrap">United Kingdom</Text>
    </View>
    <View className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm cursor-pointer">
      <View className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
        <View className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></View>
      </View>
    </View>
  </View>
</LocationMarker>

{/* California */}
<LocationMarker left="10.57%" top="53.58%">
  <View className="group relative items-center">
    <View className="absolute left-14 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-3 py-1.5 rounded shadow-sm pointer-events-none flex flex-row items-center gap-2 z-50">
      <Image source={{ uri: "/US.webp" }} className="w-5 h-3 rounded-[1px]" resizeMode="cover" />
      <Text className="text-black text-xs font-bold whitespace-nowrap">California</Text>
    </View>
    <View className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm cursor-pointer">
      <View className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
        <View className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></View>
      </View>
    </View>
  </View>
</LocationMarker>

{/* United States */}
<LocationMarker left="14.53%" top="41.47%">
  <View className="group relative items-center">
    <View className="absolute left-14 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-3 py-1.5 rounded shadow-sm pointer-events-none flex flex-row items-center gap-2 z-50">
      <Image source={{ uri: "/US.webp" }} className="w-5 h-3 rounded-[1px]" resizeMode="cover" />
      <Text className="text-black text-xs font-bold whitespace-nowrap">United States</Text>
    </View>
    <View className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm cursor-pointer">
      <View className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
        <View className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></View>
      </View>
    </View>
  </View>
</LocationMarker>

{/* Atlanta */}
<LocationMarker left="21.68%" top="44.29%">
  <View className="group relative items-center">
    <View className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-3 py-1.5 rounded shadow-sm pointer-events-none flex flex-row items-center gap-2">
      <Image source={{ uri: "/US.webp" }} className="w-5 h-3 rounded-[1px]" resizeMode="cover" />
      <Text className="text-black text-xs font-bold whitespace-nowrap">Atlanta</Text>
    </View>
    <View className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm cursor-pointer">
      <View className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
        <View className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></View>
      </View>
    </View>
  </View>
</LocationMarker>

{/* Netherlands */}
<LocationMarker left="48.33%" top="19.41%">
  <View className="group relative items-center">
    <View className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-3 py-1.5 rounded shadow-sm pointer-events-none flex flex-row items-center gap-2">
      <Image source={{ uri: "/NET.webp" }} className="w-5 h-3 rounded-[1px]" resizeMode="cover" />
      <Text className="text-black text-xs font-bold whitespace-nowrap">Netherlands</Text>
    </View>
    <View className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm cursor-pointer">
      <View className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
        <View className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></View>
      </View>
    </View>
  </View>
</LocationMarker>

{/* UAE */}
<LocationMarker left="66.51%" top="42.13%">
  <View className="group relative items-center">
    <View className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-3 py-1.5 rounded shadow-sm pointer-events-none flex flex-row items-center gap-2">
      <Image source={{ uri: "/UAE.webp" }} className="w-5 h-3 rounded-[1px]" resizeMode="cover" />
      <Text className="text-black text-xs font-bold whitespace-nowrap">UAE</Text>
    </View>
    <View className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm cursor-pointer">
      <View className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
        <View className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></View>
      </View>
    </View>
  </View>
</LocationMarker>

{/* Saudi */}
<LocationMarker left="62.94%" top="36.49%">
  <View className="group relative items-center">
    <View className="absolute left-14 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-3 py-1.5 rounded shadow-sm pointer-events-none flex flex-row items-center gap-2 z-50">
      <Image source={{ uri: "/Saudi.webp" }} className="w-5 h-3 rounded-[1px]" resizeMode="cover" />
      <Text className="text-black text-xs font-bold whitespace-nowrap">Saudi</Text>
    </View>
    <View className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm cursor-pointer">
      <View className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
        <View className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></View>
      </View>
    </View>
  </View>
</LocationMarker>

{/* Bahrain */}
<LocationMarker left="64.72%" top="36.16%">
  <View className="group relative items-center">
    <View className="absolute left-14 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-3 py-1.5 rounded shadow-sm pointer-events-none flex flex-row items-center gap-2 z-50">
      <Image source={{ uri: "/B.webp" }} className="w-5 h-3 rounded-[1px]" resizeMode="cover" />
      <Text className="text-black text-xs font-bold whitespace-nowrap">Bahrain</Text>
    </View>
    <View className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm cursor-pointer">
      <View className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
        <View className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></View>
      </View>
    </View>
  </View>
</LocationMarker>

{/* Australia */}
<LocationMarker left="85.55%" top="86.42%">
  <View className="group relative items-center">
    <View className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-3 py-1.5 rounded shadow-sm pointer-events-none flex flex-row items-center gap-2">
      <Image source={{ uri: "/Aus.webp" }} className="w-5 h-3 rounded-[1px]" resizeMode="cover" />
      <Text className="text-black text-xs font-bold whitespace-nowrap">Australia</Text>
    </View>
    <View className="w-[48px] h-[48px] border border-[#C10016] rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm cursor-pointer">
      <View className="w-[32px] h-[32px] border border-[#C10016] rounded-full flex items-center justify-center">
        <View className="w-[16px] h-[16px] bg-[#C10016] rounded-full"></View>
      </View>
    </View>
  </View>
</LocationMarker>
    </View>
  </View>
</View>

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

                {/* Subtitle - Centered */}
                <Text className="font-helvetica font-normal text-xl lg:text-[24px] leading-relaxed lg:leading-[44px] text-white mb-12 text-center">
                  Exceptional Quality Service
                </Text>

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
