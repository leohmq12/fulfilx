// app/contact.tsx
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';

export default function ContactScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
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
        <View className="relative min-h-[60vh] lg:min-h-screen">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <img 
              src="/bg.webp"
              alt="Background pattern"
              className="w-full h-full lg:h-[600px] object-cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-[60vh] lg:min-h-screen flex items-center justify-center pb-20">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Contact Us
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Contact Us
              </Text>
            </View>
          </View>
        </View>

        {/* Get in Touch Section */}
        <View className="w-full bg-white transform -translate-y-20 lg:-translate-y-48">
          {/* Contact Us Badge */}
          <View className="flex flex-row justify-center items-center mx-auto w-[200px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] mb-8">
            <Text className="font-helvetica font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
              contact us
            </Text>
          </View>

          {/* Get in Touch Heading */}
          <Text className="text-center font-helvetica font-bold text-3xl lg:text-[64px] leading-tight lg:leading-[74px] tracking-[-0.01em] text-black mb-16">
            Get in Touch
          </Text>

          {/* Contact Cards Grid */}
          <View className="flex flex-row flex-wrap justify-center items-start gap-8 px-4 sm:px-8">
            {/* Phone Card */}
            <View className="relative w-full max-w-[350px] h-[227px]">
              {/* Background Card */}
              <View className="absolute w-full h-[180px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
              
              {/* Outer Circle */}
              <View className="absolute w-[124px] h-[124px] left-1/2 -ml-[62px] top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
              
              {/* Inner Red Circle */}
              <View className="absolute w-[94px] h-[94px] left-1/2 -ml-[47px] top-[15px] bg-[#C10016] rounded-full flex items-center justify-center">
                <img 
                  src="/phone.svg" 
                  alt="Phone" 
                  className="w-8 h-8 object-contain"
                />
              </View>

              {/* Call Us Text */}
              <Text className="absolute left-6 top-[129px] font-helvetica font-normal text-[16px] leading-[44px] text-black">
                Call Us
              </Text>

              {/* Phone Number */}
              <Text className="absolute left-6 top-[160px] font-helvetica font-bold text-[18px] leading-[74px] tracking-[-0.01em] text-black">
                +44 161 399 2348
              </Text>
            </View>

            {/* Email Card */}
            <View className="relative w-full max-w-[350px] h-[227px]">
              {/* Background Card */}
              <View className="absolute w-full h-[180px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
              
              {/* Outer Circle */}
              <View className="absolute w-[124px] h-[124px] left-1/2 -ml-[62px] top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
              
              {/* Inner Red Circle */}
              <View className="absolute w-[94px] h-[94px] left-1/2 -ml-[47px] top-[15px] bg-[#C10016] rounded-full flex items-center justify-center">
                <img 
                  src="/mail.svg" 
                  alt="Email" 
                  className="w-8 h-8 object-contain"
                />
              </View>

              {/* Email Us Text */}
              <Text className="absolute left-6 top-[129px] font-helvetica font-normal text-[16px] leading-[44px] text-black">
                Email Us
              </Text>

              {/* Email Address */}
              <Text className="absolute left-6 top-[160px] font-helvetica font-bold text-[18px] leading-[74px] tracking-[-0.01em] text-black">
                info@fulfilx.co.uk
              </Text>
            </View>
            {/* WhatsApp Card */}
            <View className="relative w-full max-w-[350px] h-[227px]">
              {/* Background Card */}
              <View className="absolute w-full h-[180px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
              
              {/* Outer Circle */}
              <View className="absolute w-[124px] h-[124px] left-1/2 -ml-[62px] top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
              
              {/* Inner Red Circle */}
              <View className="absolute w-[94px] h-[94px] left-1/2 -ml-[47px] top-[15px] bg-[#C10016] rounded-full flex items-center justify-center">
                <img 
                  src="/whatsapp.svg" 
                  alt="WhatsApp" 
                  className="w-8 h-8 object-contain"
                />
              </View>

              {/* Email Us Text */}
              <Text className="absolute left-6 top-[129px] font-helvetica font-normal text-[16px] leading-[44px] text-black">
                WhatsApp Us
              </Text>

              {/* Email Address */}
              <Text className="absolute left-6 top-[160px] font-helvetica font-bold text-[18px] leading-[74px] tracking-[-0.01em] text-black">
                +44 161 399 2348
              </Text>
            </View>
            
            {/* Visit Card */}
            <View className="relative w-full max-w-[350px] h-[227px]">
              {/* Background Card */}
              <View className="absolute w-full h-[180px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
              
              {/* Outer Circle */}
              <View className="absolute w-[124px] h-[124px] left-1/2 -ml-[62px] top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
              
              {/* Inner Red Circle */}
              <View className="absolute w-[94px] h-[94px] left-1/2 -ml-[47px] top-[15px] bg-[#C10016] rounded-full flex items-center justify-center">
                <img 
                  src="/map.svg" 
                  alt="Location" 
                  className="w-8 h-8 object-contain"
                />
              </View>

              {/* Visit Us Text */}
              <Text className="absolute left-6 top-[129px] font-helvetica font-normal text-[16px] leading-[44px] text-black">
                Visit Us
              </Text>

              {/* Email Address */}
              <Text className="absolute left-6 top-[160px] font-helvetica font-bold text-[14px] leading-tight lg:leading-[74px] tracking-[-0.01em] text-black pr-2">
                Nile Mill, Oldham, Greater Manchester, OL9 8NT
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Form Section */}
        <div className="relative w-full bg-white transform -translate-y-12 lg:-translate-y-24">
          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row justify-center items-start gap-10 lg:gap-16 px-4 lg:px-8">
            
            {/* Left Column - Image */}
            <div className="w-full lg:w-[720px] h-[300px] sm:h-[420px] lg:h-[936px] rounded-[30px] overflow-hidden">
              <img 
                src="/locate.webp" 
                alt="Contact"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Column - Contact Form */}
            <div className="w-full lg:w-[720px] h-auto lg:h-[936px] bg-white border border-black/10 rounded-[30px] flex flex-col">
              
              {/* Form Content with proper padding */}
              <div className="flex-1 px-6 sm:px-8 lg:px-12 pt-10 lg:pt-12 pb-6">
                {/* Section Title */}
                <h2 className="font-bold text-3xl lg:text-[40px] leading-[1.2] tracking-[-0.01em] text-black mb-8">
                  Contact For <span className='text-[#C10016]'>Queries?</span>
                </h2>

                {/* Form */}
                <div className="space-y-6">
                  
                  {/* Name Row - Two Columns */}
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* First Name */}
                    <div className="flex-1">
                      <label className="block font-medium text-[18px] text-black mb-2">
                        Name <span className='text-[#C10016]'>*</span>
                      </label>
                      <input 
                        type="text"
                        placeholder="First Name"
                        className="w-full h-[50px] bg-white border border-black/10 rounded-[8px] px-4 text-[16px] text-black placeholder:text-black/25 focus:outline-none focus:border-[#C10016]"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="flex-1">
                      <label className="block font-medium text-[18px] text-black mb-2 lg:invisible">
                        Last Name
                      </label>
                      <input 
                        type="text"
                        placeholder="Last Name"
                        className="w-full h-[50px] bg-white border border-black/10 rounded-[8px] px-4 text-[16px] text-black placeholder:text-black/25 focus:outline-none focus:border-[#C10016]"
                      />
                    </div>
                  </div>

                  {/* Brand Name */}
                  <div>
                    <label className="block font-medium text-[18px] text-black mb-2">
                      Brand Name <span className='text-[#C10016]'>*</span>
                    </label>
                    <input 
                      type="text"
                      placeholder="Enter your brand name"
                      className="w-full h-[50px] bg-white border border-black/10 rounded-[8px] px-4 text-[16px] text-black placeholder:text-black/25 focus:outline-none focus:border-[#C10016]"
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block font-medium text-[18px] text-black mb-2">
                      Contact Number for Call Back <span className='text-[#C10016]'>*</span>
                    </label>
                    <input 
                      type="tel"
                      placeholder="e.g. 000 000 0000"
                      className="w-full h-[50px] bg-white border border-black/10 rounded-[8px] px-4 text-[16px] text-black placeholder:text-black/25 focus:outline-none focus:border-[#C10016]"
                    />
                  </div>

                  {/* Ideal Time for Call Back */}
                  <div className="w-full">
                    <label className="block font-medium text-[18px] text-black mb-2">
                      Ideal Time for Call Back <span className="text-[#C10016]">*</span>
                    </label>

                    <div className="relative">
                      <select className="w-full h-[50px] bg-white border border-black/10 rounded-[8px] px-4 pr-10 text-[16px] text-black focus:outline-none focus:border-[#C10016] appearance-none">
                        <option value="">Select your time</option>
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 5PM)</option>
                        <option value="evening">Evening (5PM - 8PM)</option>
                      </select>

                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <img src="/down.svg" alt="" className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block font-medium text-[18px] text-black mb-2">
                      Email Address
                    </label>
                    <input 
                      type="email"
                      placeholder="e.g. john@domain.com"
                      className="w-full h-[50px] bg-white border border-black/10 rounded-[8px] px-4 text-[16px] text-black placeholder:text-black/25 focus:outline-none focus:border-[#C10016]"
                    />
                  </div>

                  {/* Comment or Message */}
                  <div>
                    <label className="block font-medium text-[18px] text-black mb-2">
                      Comment or Message
                    </label>
                    <textarea 
                      placeholder="Type your comment or message here..."
                      rows={3}
                      className="w-full min-h-[104px] bg-white border border-black/10 rounded-[8px] px-4 py-3 text-[16px] text-black placeholder:text-black/25 focus:outline-none focus:border-[#C10016] resize-vertical"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button at the bottom */}
              <div className="px-6 sm:px-8 lg:px-12 pb-10 lg:pb-12">
                <button className="bg-[#C10016] rounded-[6px] px-8 py-4 flex flex-row items-center justify-center gap-3 w-full sm:w-[200px] hover:bg-[#a00012] transition-colors mx-auto lg:mx-0">
                  <span className="font-bold text-[18px] text-white">
                    Submit Now
                  </span>
                  <img 
                    src="/arrow.svg" 
                    alt="Arrow" 
                    className="w-4 h-4 object-contain filter brightness-0 invert"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

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
