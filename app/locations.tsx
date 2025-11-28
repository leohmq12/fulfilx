// app/locations.tsx
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function LocationsScreen() {
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
              Locations
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-[20px] leading-[40px] text-[#C10016]">
                Store Locations
              </Text>
            </View>
          </View>
        </View>
        {/* Get in Touch Section */}
        <View className="w-full bg-white py-20">
          {/* Contact Us Badge */}
          <View className="flex flex-row justify-center items-center mx-auto w-[200px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] mb-8">
            <Text className="font-helvetica font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
              our locations
            </Text>
          </View>

          {/* Get in Touch Heading */}
          <Text className="text-center font-helvetica font-bold text-[64px] leading-[74px] tracking-[-0.01em] text-black mb-16">
            Our Worldwide <span className='text-[#C10016]'>Branches</span>
          </Text>
{/* Cards Container */}
<View className="flex flex-row justify-center items-start gap-8 px-8">
                      {/* UK Office Card */}
<View className="relative w-[350px] h-[381px]">
  {/* Background Card */}
  <View className="absolute w-[350px] h-[334px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
  
  {/* Outer Circle */}
  <View className="absolute w-[124px] h-[124px] left-1/2 transform -translate-x-1/2 top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
  
  {/* Flag Circle - Full flag in circle, no red background */}
  <View className="absolute w-[94px] h-[94px] left-1/2 transform -translate-x-1/2 top-[15px] rounded-full overflow-hidden">
    <img 
      src="/rounduk.png" 
      alt="UK Flag" 
      className="w-full h-full object-cover"
    />
  </View>

  {/* Country Name */}
  <Text className="absolute left-6 top-[110px] font-helvetica font-bold text-[32px] leading-[74px] tracking-[-0.01em] text-black">
    UK
  </Text>

  {/* Contact Info */}
  {/* Phone */}
  <View className="absolute left-6 top-[180px] flex flex-row items-center gap-3 space-y-2">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-2">
      <img src="/phone.svg" alt="Phone" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      +1 234 567 8900
    </Text>
  </View>

  {/* Email */}
  <View className="absolute left-6 top-[225px] flex flex-row items-center gap-3 space-y-6">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-6">
      <img src="/mail.svg" alt="Email" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      info.john@fulfilx.co.uk
    </Text>
  </View>

  {/* Address */}
  <View className="absolute left-6 top-[270px] flex flex-row items-start gap-3 space-y-10">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-10">
      <img src="/map.svg" alt="Location" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[22px] text-black">
      Lorem Ipsum is simply dummy<br/>text of the printing & typing.
    </Text>
  </View>
</View>
{/* US Office Card */}
<View className="relative w-[350px] h-[381px]">
  {/* Background Card */}
  <View className="absolute w-[350px] h-[334px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
  
  {/* Outer Circle */}
  <View className="absolute w-[124px] h-[124px] left-1/2 transform -translate-x-1/2 top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
  
  {/* Flag Circle - Full flag in circle, no red background */}
  <View className="absolute w-[94px] h-[94px] left-1/2 transform -translate-x-1/2 top-[15px] rounded-full overflow-hidden">
    <img 
      src="/roundus.png" 
      alt="US Flag" 
      className="w-full h-full object-cover"
    />
  </View>

  {/* Country Name */}
  <Text className="absolute left-6 top-[110px] font-helvetica font-bold text-[32px] leading-[74px] tracking-[-0.01em] text-black">
    USA
  </Text>

  {/* Contact Info */}
  {/* Phone */}
  <View className="absolute left-6 top-[180px] flex flex-row items-center gap-3 space-y-2">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-2">
      <img src="/phone.svg" alt="Phone" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      +1 234 567 8900
    </Text>
  </View>

  {/* Email */}
  <View className="absolute left-6 top-[225px] flex flex-row items-center gap-3 space-y-6">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-6">
      <img src="/mail.svg" alt="Email" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      info.john@fulfilx.co.uk
    </Text>
  </View>

  {/* Address */}
  <View className="absolute left-6 top-[270px] flex flex-row items-start gap-3 space-y-10">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-10">
      <img src="/map.svg" alt="Location" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[22px] text-black">
      Lorem Ipsum is simply dummy<br/>text of the printing & typing.
    </Text>
  </View>
</View>
{/* US Office Card */}
<View className="relative w-[350px] h-[381px]">
  {/* Background Card */}
  <View className="absolute w-[350px] h-[334px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
  
  {/* Outer Circle */}
  <View className="absolute w-[124px] h-[124px] left-1/2 transform -translate-x-1/2 top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
  
  {/* Flag Circle - Full flag in circle, no red background */}
  <View className="absolute w-[94px] h-[94px] left-1/2 transform -translate-x-1/2 top-[15px] rounded-full overflow-hidden">
    <img 
      src="/roundus.png" 
      alt="US Flag" 
      className="w-full h-full object-cover"
    />
  </View>

  {/* Country Name */}
  <Text className="absolute left-6 top-[110px] font-helvetica font-bold text-[32px] leading-[74px] tracking-[-0.01em] text-black">
    USA
  </Text>

  {/* Contact Info */}
  {/* Phone */}
  <View className="absolute left-6 top-[180px] flex flex-row items-center gap-3 space-y-2">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-2">
      <img src="/phone.svg" alt="Phone" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      +1 234 567 8900
    </Text>
  </View>

  {/* Email */}
  <View className="absolute left-6 top-[225px] flex flex-row items-center gap-3 space-y-6">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-6">
      <img src="/mail.svg" alt="Email" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      info.john@fulfilx.co.uk
    </Text>
  </View>

  {/* Address */}
  <View className="absolute left-6 top-[270px] flex flex-row items-start gap-3 space-y-10">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-10">
      <img src="/map.svg" alt="Location" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[22px] text-black">
      Lorem Ipsum is simply dummy<br/>text of the printing & typing.
    </Text>
  </View>
</View>
                    {/* UAE Office Card */}
<View className="relative w-[350px] h-[381px]">
  {/* Background Card */}
  <View className="absolute w-[350px] h-[334px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
  
  {/* Outer Circle */}
  <View className="absolute w-[124px] h-[124px] left-1/2 transform -translate-x-1/2 top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
  
  {/* Flag Circle - Full flag in circle, no red background */}
  <View className="absolute w-[94px] h-[94px] left-1/2 transform -translate-x-1/2 top-[15px] rounded-full overflow-hidden">
    <img 
      src="/rounduae.png" 
      alt="UAE Flag" 
      className="w-full h-full object-cover"
    />
  </View>

  {/* Country Name */}
  <Text className="absolute left-6 top-[110px] font-helvetica font-bold text-[32px] leading-[74px] tracking-[-0.01em] text-black">
    UAE
  </Text>

  {/* Contact Info */}
  {/* Phone */}
  <View className="absolute left-6 top-[180px] flex flex-row items-center gap-3 space-y-2">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-2">
      <img src="/phone.svg" alt="Phone" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      +1 234 567 8900
    </Text>
  </View>

  {/* Email */}
  <View className="absolute left-6 top-[225px] flex flex-row items-center gap-3 space-y-6">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-6">
      <img src="/mail.svg" alt="Email" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      info.john@fulfilx.co.uk
    </Text>
  </View>

  {/* Address */}
  <View className="absolute left-6 top-[270px] flex flex-row items-start gap-3 space-y-10">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-10">
      <img src="/map.svg" alt="Location" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[22px] text-black">
      Lorem Ipsum is simply dummy<br/>text of the printing & typing.
    </Text>
  </View>
</View>

</View>
{/* Cards Container */}
<View className="flex flex-row flex-wrap justify-center items-start gap-8 px-8 mt-5">
                      {/* Saudi Office Card */}
<View className="relative w-[350px] h-[381px]">
  {/* Background Card */}
  <View className="absolute w-[350px] h-[334px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
  
  {/* Outer Circle */}
  <View className="absolute w-[124px] h-[124px] left-1/2 transform -translate-x-1/2 top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
  
  {/* Flag Circle - Full flag in circle, no red background */}
  <View className="absolute w-[94px] h-[94px] left-1/2 transform -translate-x-1/2 top-[15px] rounded-full overflow-hidden">
    <img 
      src="/roundsaudi.png" 
      alt="Saudi Flag" 
      className="w-full h-full object-cover"
    />
  </View>

  {/* Country Name */}
  <Text className="absolute left-6 top-[110px] font-helvetica font-bold text-[32px] leading-[74px] tracking-[-0.01em] text-black">
    Saudi
  </Text>

  {/* Contact Info */}
  {/* Phone */}
  <View className="absolute left-6 top-[180px] flex flex-row items-center gap-3 space-y-2">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-2">
      <img src="/phone.svg" alt="Phone" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      +1 234 567 8900
    </Text>
  </View>

  {/* Email */}
  <View className="absolute left-6 top-[225px] flex flex-row items-center gap-3 space-y-6">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-6">
      <img src="/mail.svg" alt="Email" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      info.john@fulfilx.co.uk
    </Text>
  </View>

  {/* Address */}
  <View className="absolute left-6 top-[270px] flex flex-row items-start gap-3 space-y-10">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-10">
      <img src="/map.svg" alt="Location" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[22px] text-black">
      Lorem Ipsum is simply dummy<br/>text of the printing & typing.
    </Text>
  </View>
</View>
                    {/* Bahrain Office Card */}
<View className="relative w-[350px] h-[381px]">
  {/* Background Card */}
  <View className="absolute w-[350px] h-[334px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
  
  {/* Outer Circle */}
  <View className="absolute w-[124px] h-[124px] left-1/2 transform -translate-x-1/2 top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
  
  {/* Flag Circle - Full flag in circle, no red background */}
  <View className="absolute w-[94px] h-[94px] left-1/2 transform -translate-x-1/2 top-[15px] rounded-full overflow-hidden">
    <img 
      src="/roundb.png" 
      alt="Bahrain Flag" 
      className="w-full h-full object-cover"
    />
  </View>

  {/* Country Name */}
  <Text className="absolute left-6 top-[110px] font-helvetica font-bold text-[32px] leading-[74px] tracking-[-0.01em] text-black">
    Bahrain
  </Text>

  {/* Contact Info */}
  {/* Phone */}
  <View className="absolute left-6 top-[180px] flex flex-row items-center gap-3 space-y-2">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-2">
      <img src="/phone.svg" alt="Phone" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      +1 234 567 8900
    </Text>
  </View>

  {/* Email */}
  <View className="absolute left-6 top-[225px] flex flex-row items-center gap-3 space-y-6">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-6">
      <img src="/mail.svg" alt="Email" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      info.john@fulfilx.co.uk
    </Text>
  </View>

  {/* Address */}
  <View className="absolute left-6 top-[270px] flex flex-row items-start gap-3 space-y-10">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-10">
      <img src="/map.svg" alt="Location" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[22px] text-black">
      Lorem Ipsum is simply dummy<br/>text of the printing & typing.
    </Text>
  </View>
</View>
                    {/* Australia Office Card */}
<View className="relative w-[350px] h-[381px]">
  {/* Background Card */}
  <View className="absolute w-[350px] h-[334px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
  
  {/* Outer Circle */}
  <View className="absolute w-[124px] h-[124px] left-1/2 transform -translate-x-1/2 top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
  
  {/* Flag Circle - Full flag in circle, no red background */}
  <View className="absolute w-[94px] h-[94px] left-1/2 transform -translate-x-1/2 top-[15px] rounded-full overflow-hidden">
    <img 
      src="/roundaus.png" 
      alt="Australia Flag" 
      className="w-full h-full object-cover"
    />
  </View>

  {/* Country Name */}
  <Text className="absolute left-6 top-[110px] font-helvetica font-bold text-[32px] leading-[74px] tracking-[-0.01em] text-black">
    Australia
  </Text>

  {/* Contact Info */}
  {/* Phone */}
  <View className="absolute left-6 top-[180px] flex flex-row items-center gap-3 space-y-2">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-2">
      <img src="/phone.svg" alt="Phone" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      +1 234 567 8900
    </Text>
  </View>

  {/* Email */}
  <View className="absolute left-6 top-[225px] flex flex-row items-center gap-3 space-y-6">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-6">
      <img src="/mail.svg" alt="Email" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-black">
      info.john@fulfilx.co.uk
    </Text>
  </View>

  {/* Address */}
  <View className="absolute left-6 top-[270px] flex flex-row items-start gap-3 space-y-10">
    <View className="w-[42px] h-[42px] bg-[#C10016] rounded-full flex items-center justify-center mt-10">
      <img src="/map.svg" alt="Location" className="w-4 h-4 object-contain" />
    </View>
    <Text className="font-helvetica font-normal text-[16px] leading-[22px] text-black">
      Lorem Ipsum is simply dummy<br/>text of the printing & typing.
    </Text>
  </View>
</View>

</View>
        </View>
<section className="relative w-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/bg.png)'}}>
  <div className="relative max-w-[1490px] mx-auto px-4 py-16">
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
  List of nations we work with <span className="text-[#C10016]">worldwide</span>
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
        <span className="font-normal text-[18px] leading-[30px] text-black">United States</span>
      </div>

      {/* San Francisco */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/SF.png)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">San Francisco</span>
      </div>

      {/* Georgia */}
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[20px] border border-black/10 bg-cover bg-center rounded-[2px]" style={{backgroundImage: 'url(/G.png)'}}></div>
        <span className="font-normal text-[18px] leading-[30px] text-black">Georgia</span>
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