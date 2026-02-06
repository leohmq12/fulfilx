// app/team.tsx
import AwardsAccreditations from '@/components/layout/awards-accreditations';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Linking, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Job {
  id: number;
  title: string;
  description: string;
  tags: string[];
  theme: string;
}

export default function TeamScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [jobsOffset, setJobsOffset] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGalleryTransitionEnabled, setIsGalleryTransitionEnabled] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedJob) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: Platform.OS !== 'web', 
      }).start();
    }
  }, [selectedJob, fadeAnim]);

  const JOBS = [
    {
      id: 1,
      title: "Fulfilment Associates (Pickers, Packers, Shippers)",
      description: "Are you someone who takes pride in a job well done? Do you believe that careful, accurate work matters? At Fulfil.X, our warehouse team is the essential final step for our brand partners. We’re looking for reliable, detail-oriented individuals to join us as Fulfillment Associates. You’ll be the hands that directly deliver a brand’s promise to their customers.\n\nThis is a hands-on role where your focus and consistency directly impact customer satisfaction and brand loyalty.",
      tags: ["Part Time", "UK"],
      theme: "dark"
    },
    {
      id: 2,
      title: "Fulfilment Associates (Pickers, Packers, Shippers)",
      description: "Are you someone who takes pride in a job well done? Do you believe that careful, accurate work matters? At Fulfil.X, our warehouse team is the essential final step for our brand partners. We’re looking for reliable, detail-oriented individuals to join us as Fulfillment Associates. You’ll be the hands that directly deliver a brand’s promise to their customers.\n\nThis is a hands-on role where your focus and consistency directly impact customer satisfaction and brand loyalty.",
      tags: ["Full Time", "UK"],
      theme: "light"
    },
    {
      id: 3,
      title: "Client Onboarding Specialist",
      description: "We are looking for a meticulous and client-focused Client Onboarding Specialist to be the guiding force for our new brand partners. You will be the architect of their first impression and the project manager of their transition, ensuring their move to Fulfil.X is seamless, efficient, and sets the stage for a long-term, successful partnership.\n\nThis is a critical role where your organization and communication skills directly impact client retention, satisfaction, and our reputation for excellence.",
      tags: ["Full Time", "UK"],
      theme: "dark"
    },
    {
      id: 4,
      title: "Quality & Value-Added Services Specialist",
      description: "At Fulfil.X, we are our brand partners' most trusted extension. We're looking for a meticulous, hands-on problem-solver to fill a vital hybrid role: the Quality & Value-Added Services Specialist. You will be the central hub of excellence on our fulfilment floor—serving as the final checkpoint for quality, the assembler of custom experiences, and the expert who recovers value. Your work directly protects our partners' reputation and elevates their customers' unboxing moments.\n\nThis role is perfect for someone who takes immense pride in precision, thrives on varied tasks, and understands that it’s the details that truly define a brand.",
      tags: ["Full Time", "UK"],
      theme: "light"
    },
    {
      id: 5,
      title: "Marketing Assistant",
      description: "At Fulfil.X, we’re telling a new story in the logistics industry. We’re looking for a dynamic, creative, and organised Marketing Assistant to help us share it. This is a foundational role for someone eager to roll up their sleeves, learn the ins and outs of growth marketing, and play a key part in building awareness for a brand that’s changing the game.\n\nYou’ll support our marketing team across channels, turning strategy into action and helping us connect with the ambitious brands we serve. If you love variety, thrive on detail, and want to see your work have a direct impact, this is your opportunity.",
      tags: ["Full Time", "UK"],
      theme: "dark"
    }
  ];
  
  
  const images = [
    { id: 1, src: '/instagram/frame_4_00-04.webp' },
    { id: 2, src: '/instagram/frame_5_00-27.webp' },
    { id: 3, src: '/instagram/frame_12_01-54.webp' },
    { id: 4, src: '/instagram/frame_15_00-17.webp' },
    { id: 5, src: '/instagram/fulflix%20image.webp' }
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= images.length) return prev;
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);
  useEffect(() => {
    if (currentSlide !== images.length) return;

    const raf =
      typeof requestAnimationFrame === 'function'
        ? requestAnimationFrame
        : (cb: FrameRequestCallback) => setTimeout(cb, 0) as unknown as number;

    const timer = setTimeout(() => {
      setIsGalleryTransitionEnabled(false);
      setCurrentSlide(0);
      raf(() => setIsGalleryTransitionEnabled(true));
    }, 500);

    return () => clearTimeout(timer);
  }, [currentSlide, images.length]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleScroll = () => {
        if (window.location.hash === '#jobs' && jobsOffset > 0 && scrollViewRef.current) {
          // Add a small delay to ensure content is ready
          setTimeout(() => {
            scrollViewRef.current?.scrollTo({ y: jobsOffset, animated: true });
          }, 100);
        }
      };

      // Check on mount/update
      handleScroll();

      // Listen for hash changes
      window.addEventListener('hashchange', handleScroll);
      return () => window.removeEventListener('hashchange', handleScroll);
    }
  }, [jobsOffset]);

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
        ref={scrollViewRef}
        className="flex-1 bg-white"
      >
        {/* Hero Section */}
        <View className="relative min-h-[50vh] lg:min-h-[85vh]">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <Image 
              source={{ uri: "/bg.webp" }}
              className="w-full h-full object-cover"
              resizeMode="cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-[50vh] lg:min-h-[85vh] flex items-center justify-center pb-16">
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
        <View className="w-full bg-white transform -translate-y-20 lg:-translate-y-48 -mb-20 lg:-mb-48 pb-8">

          {/* Main Heading */}
          <Text className="text-center font-helvetica font-bold text-4xl lg:text-[64px] leading-tight lg:leading-[74px] tracking-[-0.01em] text-black mb-16 px-4">
            The <Text className='text-[#C10016]'>Team</Text>
          </Text>

          {/* Team Members Grid */}
          <View className="flex flex-col gap-8 px-4 lg:px-8">
            
            {/* First Row - Nas (Centered & Standing Out) */}
            <View className="flex flex-row justify-center">
              {/* Team Member 1 - Nas */}
              <View className="relative w-full lg:max-w-[900px] h-auto min-h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden group hover:bg-[#C10016] transition-colors duration-300 flex flex-col lg:flex-row items-center p-4 lg:p-8 gap-8 shadow-xl z-10 scale-105">
                {/* Member Image with Social Icons Popup */}
                <View className="relative w-full lg:w-[300px] h-[300px] lg:h-[340px] rounded-[12px] overflow-hidden shrink-0 mb-6 lg:mb-0">
                  <Image
                    source={{ uri: "/nas.webp" }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                
                {/* Member Info */}
                <View className="relative w-full lg:flex-1">
                  <Text className="font-helvetica font-bold text-2xl lg:text-[32px] leading-tight text-black group-hover:text-white transition-colors duration-300 mt-2 lg:mt-0 mb-2">
                    Nas
                  </Text>
                  <Text className="font-helvetica font-normal text-lg lg:text-[20px] leading-snug text-black group-hover:text-white transition-colors duration-300 mb-4 font-medium">
                    CEO & CO-Founder
                  </Text>

                </View>
              </View>
            </View>

            {/* Second Row - Anson & Jordray */}
            <View className="flex flex-col lg:flex-row justify-center gap-8">
              {/* Team Member 2 - Anson */}
              <View className="relative w-full lg:flex-1 h-auto min-h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden group hover:bg-[#C10016] transition-colors duration-300 flex flex-col lg:flex-row items-center p-4 lg:p-8 gap-8 shadow-xl">
                {/* Member Image with Social Icons Popup */}
                <View className="relative w-full lg:w-[300px] h-[300px] lg:h-[340px] rounded-[12px] overflow-hidden shrink-0 mb-6 lg:mb-0">
                  <Image 
                    source={{ uri: "/Anson.webp" }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                
                {/* Member Info */}
                <View className="relative w-full lg:flex-1">
                  <Text className="font-helvetica font-bold text-2xl lg:text-[26px] leading-tight text-black group-hover:text-white transition-colors duration-300 mt-2 lg:mt-0 mb-2">
                    Anson
                  </Text>
                  <Text className="font-helvetica font-normal text-lg lg:text-[18px] leading-snug text-black group-hover:text-white transition-colors duration-300 mb-4">
                    Operations Manager
                  </Text>

                </View>
              </View>

              {/* Team Member 3 - Jordray */}
              <View className="relative w-full lg:flex-1 h-auto min-h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden group hover:bg-[#C10016] transition-colors duration-300 flex flex-col lg:flex-row items-center p-4 lg:p-8 gap-8 shadow-xl">
                {/* Member Image with Social Icons Popup */}
                <View className="relative w-full lg:w-[300px] h-[300px] lg:h-[340px] rounded-[12px] overflow-hidden shrink-0 mb-6 lg:mb-0">
                  <Image 
                    source={{ uri: "/Jordray.webp" }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                
                {/* Member Info */}
                <View className="relative w-full lg:flex-1">
                  <Text className="font-helvetica font-bold text-2xl lg:text-[26px] leading-tight text-black group-hover:text-white transition-colors duration-300 mt-2 lg:mt-0 mb-2">
                    Jordray
                  </Text>
                  <Text className="font-helvetica font-normal text-lg lg:text-[18px] leading-snug text-black group-hover:text-white transition-colors duration-300 mb-4">
                    Warehouse Manager
                  </Text>

                </View>
              </View>
            </View>

            {/* Third Row - Natalie & Stephen */}
            <View className="flex flex-col lg:flex-row justify-center gap-8">
              {/* Team Member 4 - Natalie */}
              <View className="relative w-full lg:flex-1 h-auto min-h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden group hover:bg-[#C10016] transition-colors duration-300 flex flex-col lg:flex-row items-center p-4 lg:p-8 gap-8 shadow-xl">
                {/* Member Image with Social Icons Popup */}
                <View className="relative w-full lg:w-[300px] h-[300px] lg:h-[340px] rounded-[12px] overflow-hidden shrink-0 mb-6 lg:mb-0">
                  <Image 
                    source={{ uri: "/Natalie.webp" }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                
                {/* Member Info */}
                <View className="relative w-full lg:flex-1">
                  <Text className="font-helvetica font-bold text-2xl lg:text-[26px] leading-tight text-black group-hover:text-white transition-colors duration-300 mt-2 lg:mt-0 mb-2">
                    Natalie
                  </Text>
                  <Text className="font-helvetica font-normal text-lg lg:text-[18px] leading-snug text-black group-hover:text-white transition-colors duration-300 mb-4">
                    Marketing Lead
                  </Text>

                </View>
              </View>

              {/* Team Member 5 - Stephen */}
              <View className="relative w-full lg:flex-1 h-auto min-h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden group hover:bg-[#C10016] transition-colors duration-300 flex flex-col lg:flex-row items-center p-4 lg:p-8 gap-8 shadow-xl">
                {/* Member Image with Social Icons Popup */}
                <View className="relative w-full lg:w-[300px] h-[300px] lg:h-[340px] rounded-[12px] overflow-hidden shrink-0 mb-6 lg:mb-0">
                  <Image 
                    source={{ uri: "/Stephen.webp" }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                
                {/* Member Info */}
                <View className="relative w-full lg:flex-1">
                  <Text className="font-helvetica font-bold text-2xl lg:text-[26px] leading-tight text-black group-hover:text-white transition-colors duration-300 mt-2 lg:mt-0 mb-2">
                    Stephen
                  </Text>
                  <Text className="font-helvetica font-normal text-lg lg:text-[18px] leading-snug text-black group-hover:text-white transition-colors duration-300 mb-4">
                    Supervisor
                  </Text>

                </View>
              </View>
            </View>

            {/* Fourth Row - Paulina & Ralph J */}
            <View className="flex flex-col lg:flex-row justify-center gap-8">
              {/* Team Member 6 - Paulina */}
              <View className="relative w-full lg:flex-1 h-auto min-h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden group hover:bg-[#C10016] transition-colors duration-300 flex flex-col lg:flex-row items-center p-4 lg:p-8 gap-8 shadow-xl">
                {/* Member Image with Social Icons Popup */}
                <View className="relative w-full lg:w-[300px] h-[300px] lg:h-[340px] rounded-[12px] overflow-hidden shrink-0 mb-6 lg:mb-0">
                  <Image 
                    source={{ uri: "/Paulina.webp" }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                
                {/* Member Info */}
                <View className="relative w-full lg:flex-1">
                  <Text className="font-helvetica font-bold text-2xl lg:text-[26px] leading-tight text-black group-hover:text-white transition-colors duration-300 mt-2 lg:mt-0 mb-2">
                    Paulina
                  </Text>
                  <Text className="font-helvetica font-normal text-lg lg:text-[18px] leading-snug text-black group-hover:text-white transition-colors duration-300 mb-4">
                    Team Lead
                  </Text>

                </View>
              </View>

              {/* Team Member 7 - Ralph J */}
              <View className="relative w-full lg:flex-1 h-auto min-h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden group hover:bg-[#C10016] transition-colors duration-300 flex flex-col lg:flex-row items-center p-4 lg:p-8 gap-8 shadow-xl">
                {/* Member Image with Social Icons Popup */}
                <View className="relative w-full lg:w-[300px] h-[300px] lg:h-[340px] rounded-[12px] overflow-hidden shrink-0 mb-6 lg:mb-0">
                  <Image 
                    source={{ uri: "/Ralph Smith.webp" }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                
                {/* Member Info */}
                <View className="relative w-full lg:flex-1">
                  <Text className="font-helvetica font-bold text-2xl lg:text-[26px] leading-tight text-black group-hover:text-white transition-colors duration-300 mt-2 lg:mt-0 mb-2">
                    Ralph J
                  </Text>
                  <Text className="font-helvetica font-normal text-lg lg:text-[18px] leading-snug text-black group-hover:text-white transition-colors duration-300 mb-4">
                    Warehouse Team
                  </Text>

                </View>
              </View>
            </View>

            {/* Fifth Row - Ralph A (Centered) */}
            <View className="flex flex-row justify-center">
              {/* Team Member 8 - Ralph A */}
              <View className="relative w-full lg:max-w-[900px] h-auto min-h-[380px] bg-white border border-black/10 backdrop-blur-[12.5px] rounded-[20px] overflow-hidden group hover:bg-[#C10016] transition-colors duration-300 flex flex-col lg:flex-row items-center p-4 lg:p-8 gap-8 shadow-xl">
                {/* Member Image with Social Icons Popup */}
                <View className="relative w-full lg:w-[300px] h-[300px] lg:h-[340px] rounded-[12px] overflow-hidden shrink-0 mb-6 lg:mb-0">
                  <Image 
                    source={{ uri: "/Ralph Aquino.webp" }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                
                {/* Member Info */}
                <View className="relative w-full lg:flex-1">
                  <Text className="font-helvetica font-bold text-2xl lg:text-[26px] leading-tight text-black group-hover:text-white transition-colors duration-300 mt-2 lg:mt-0 mb-2">
                    Ralph A
                  </Text>
                  <Text className="font-helvetica font-normal text-lg lg:text-[18px] leading-snug text-black group-hover:text-white transition-colors duration-300 mb-4">
                    Warehouse Team
                  </Text>

                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Career Opportunities Section */}
        <View 
          id="jobs" 
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            setJobsOffset(layout.y);
          }}
          className="relative w-full min-h-0 lg:min-h-[900px] py-5 lg:py-20 overflow-hidden"
        >
          {/* Background Gradient Fix */}
          <View className="absolute inset-0">
            <Image 
              source={{ uri: "/job.webp" }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Content Container - on mobile no vertical centering to avoid huge gaps */}
          <View className="relative z-10 max-w-[1500px] mx-auto px-4 lg:px-8 h-full flex items-start lg:items-center">
            {/* 2 Column Layout */}
            <View className="flex flex-col lg:flex-row gap-6 lg:gap-20 w-full items-stretch lg:items-center">
              {/* LEFT COLUMN - shrink to content on mobile so no extra gap above/below text */}
              <View className="flex-none lg:flex-1 flex flex-col justify-center w-full">
                {/* Badge */}
                <View className="w-[280px] lg:w-[320px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] mb-5 lg:mb-10 flex items-center justify-center mx-auto lg:mx-0">
                  <Text className="font-helvetica font-medium text-sm lg:text-[16px] tracking-[0.2em] text-[#C10016] uppercase">
                    Career Opportunities
                  </Text>
                </View>

                <Text className="font-helvetica font-bold text-4xl lg:text-[60px] leading-tight lg:leading-[74px] text-white mb-5 lg:mb-8 text-center lg:text-left">
                  Join The <Text className="text-[#C10016]">Dream Team</Text>
                </Text>

                <Text className="font-helvetica text-lg lg:text-[20px] leading-relaxed lg:leading-[38px] text-white/90 mb-8 lg:mb-12 max-w-full lg:max-w-[670px] text-center lg:text-left">
                  Join us as more than an employee. Become a builder, a problem-solver, and a brand
                  advocate. Together, we’ll redefine an industry where exceptional teamwork drives
                  exceptional outcomes.
                </Text>

                <TouchableOpacity className="bg-[#C10016] rounded-[6px] px-8 py-4 flex flex-row items-center gap-2 w-[200px] mx-auto lg:mx-0">
                  <Text className="font-helvetica font-bold text-[18px] text-white">View All Jobs</Text>
                  <Image source={{ uri: "/arrow.svg" }} className="w-3 h-3" resizeMode="contain" style={{ tintColor: 'white' }} />
                </TouchableOpacity>
              </View>

              {/* RIGHT COLUMN - Dynamic with Overlay */}
              <View className="flex-1 flex flex-col justify-center w-full relative h-[360px] lg:h-[700px] min-h-0">
                
                {/* Job Detail Overlay */}
                {selectedJob && (
                  <Animated.View 
                    style={{ 
                      opacity: fadeAnim,
                      transform: [{ scale: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }]
                    }}
                    className="absolute inset-0 z-50 bg-[#1A1A1A] rounded-[20px] p-6 lg:p-8 overflow-hidden border border-white/10"
                  >
                    <View className="flex flex-row justify-between items-start mb-6">
                      <Text className="font-helvetica font-bold text-2xl lg:text-3xl text-white flex-1 pr-4">
                        {selectedJob.title}
                      </Text>
                      <TouchableOpacity onPress={() => setSelectedJob(null)} className="p-2">
                        <Text className="text-white text-lg font-bold">Hide</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <ScrollView className="flex-1 pr-2 scrollbar-thin scrollbar-thumb-[#C10016]">
                      <Text className="font-helvetica text-lg lg:text-xl text-white/90 leading-relaxed mb-8">
                        {selectedJob.description || "No description available."}
                      </Text>
                      
                      <View className="flex flex-row flex-wrap gap-4 mb-8">
                        {selectedJob.tags.map((tag: string, index: number) => (
                          <View key={index} className="bg-[rgba(255,255,255,0.1)] rounded-[80px] px-6 py-2">
                            <Text className="font-helvetica text-sm lg:text-[16px] text-white">{tag}</Text>
                          </View>
                        ))}
                      </View>

                      <TouchableOpacity 
                        onPress={() => Linking.openURL('mailto:Careers@fulfilx.co.uk')}
                        className="bg-[#C10016] rounded-[6px] px-8 py-4 flex flex-row items-center gap-3 w-full justify-center"
                      >
                          <Text className="font-helvetica text-[16px] text-white font-bold">Apply Now</Text>
                          <Image source={{ uri: "/arrow.svg" }} className="w-3 h-3" resizeMode="contain" style={{ tintColor: 'white' }} />
                      </TouchableOpacity>
                    </ScrollView>
                  </Animated.View>
                )}

                {/* Job List */}
                {!selectedJob && (
                <ScrollView 
                  className="w-full"
                  contentContainerStyle={{ gap: 24, paddingBottom: 20 }}
                  showsVerticalScrollIndicator={false}
                >
                  {JOBS.map((job) => (
                    <View 
                      key={job.id} 
                      className={`w-full h-auto min-h-[225px] rounded-[20px] p-6 lg:p-8 ${
                        job.theme === 'dark' 
                          ? 'bg-[rgba(255,255,255,0.1)] backdrop-blur-[5px]' 
                          : 'bg-white shadow-2xl'
                      }`}
                    >
                      <Text className={`font-helvetica font-bold text-xl lg:text-[22px] leading-tight lg:leading-[44px] mb-2 ${
                        job.theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        {job.title}
                      </Text>

                      <View className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4 lg:gap-0">
                        {/* Description / See More */}
                        <View className="flex-1 pr-4">
                          {job.description ? (
                            <View>
                              <Text className={`font-helvetica text-sm lg:text-[16px] leading-[26px] max-w-full lg:max-w-[500px] ${
                                  job.theme === 'dark' ? 'text-white/90' : 'text-black/80'
                              }`} numberOfLines={2}>
                                {job.description}
                              </Text>
                              <TouchableOpacity onPress={() => setSelectedJob(job)}>
                                <Text className="text-[#C10016] font-bold mt-1">See More..</Text>
                              </TouchableOpacity>
                            </View>
                          ) : (
                              <View />
                          )}
                        </View>

                        <TouchableOpacity 
                          onPress={() => setSelectedJob(job)}
                          className="bg-[#C10016] rounded-[6px] px-8 py-4 flex flex-row items-center gap-3 w-full lg:w-auto justify-center lg:justify-start"
                        >
                          <Text className="font-helvetica text-[16px] text-white font-bold">View Job</Text>
                          <Image source={{ uri: "/arrow.svg" }} className="w-3 h-3" resizeMode="contain" style={{ tintColor: 'white' }} />
                        </TouchableOpacity>
                      </View>

                      {/* Tags - Horizontal Wrap */}
                      <View className="flex flex-row flex-wrap gap-4">
                        {job.tags.map((tag: string, index: number) => (
                          <View 
                            key={index} 
                            className={`rounded-[80px] px-6 py-2 ${
                              job.theme === 'dark' 
                                ? 'bg-[rgba(255,255,255,0.1)]' 
                                : 'bg-[rgba(193,0,22,0.1)]'
                            }`}
                          >
                            <Text className={`font-helvetica text-sm lg:text-[16px] ${
                              job.theme === 'dark' ? 'text-white' : 'text-[#C10016]'
                            }`}>
                              {tag}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </ScrollView>
                )}
              </View>
            </View>
          </View>
        </View>
        {/* Auto-Sliding Gallery with Infinite Loop */}
        <View className="relative w-full h-[380px] mt-20 mb-20 overflow-hidden">
          <View className="relative w-full h-full">
            <View 
              className={`flex flex-row absolute top-0 left-6 ${isGalleryTransitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}
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
        <AwardsAccreditations />
        <Footer/>

      </ScrollView>
    </>
  );
}
