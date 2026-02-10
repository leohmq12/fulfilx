import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

export default function AwardsAccreditations() {
  const router = useRouter();

  return (
    <View className="relative w-full">
      {/* Two Column Layout */}
      <View className="flex flex-col lg:flex-row">
        
        {/* Left Section - White Background */}
        <View className="w-full lg:w-1/2 bg-white relative flex items-center pt-16 lg:pt-32 pb-12">
          <Image 
            source={{ uri: "/bg.webp" }} 
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
          />
          {/* Left Section Content - Centered */}
          <View className="max-w-[740px] w-full items-center px-8">
            
            {/* Heading */}
            <Text className="font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] tracking-tight text-black mb-8 text-center">
              Our Awards
            </Text>

            {/* Red Line - Centered */}
            <View className="w-[100px] h-[1px] bg-[#C10016] mx-auto mb-12" />

            {/* Image Grid - Centered */}
        <View className="flex flex-row flex-wrap justify-center gap-6 lg:gap-8">
          <Image source={{ uri: '/award2.webp' }} className="w-[160px] h-[160px] lg:w-[240px] lg:h-[240px]" resizeMode="contain" />
          <Image source={{ uri: '/award1.webp' }} className="w-[160px] h-[160px] lg:w-[240px] lg:h-[240px]" resizeMode="contain" />
        </View>

          </View>
        </View>

        {/* Right Section - Red Background */}
        <View className="w-full lg:w-1/2 bg-[#DA192F] relative flex items-center pt-16 lg:pt-32 pb-12">
          {/* Right Section Content - Centered */}
          <View className="max-w-[650px] w-full items-center px-8">
            
            {/* Heading */}
            <Text className="font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] tracking-tight text-white mb-8 text-center">
              Accreditations
            </Text>

            {/* White Line - Centered */}
            <View className="w-[100px] h-[1px] bg-white mx-auto mb-12" />

            {/* CTA Button - Centered */}
            <Pressable 
              onPress={() => router.push('/contact')}
              className="border border-white rounded-[6px] flex-row items-center justify-center gap-[10px] px-8 py-4 mx-auto"
            >
              <Text className="text-white font-bold text-[18px] leading-[36px]">Let&apos;s Talk</Text>
              <Image source={{ uri: "/arrow.svg" }} className="w-4 h-4" resizeMode="contain" />
            </Pressable>

          </View>
        </View>

      </View>
    </View>
  );
}
