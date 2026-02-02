import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, useWindowDimensions, View } from "react-native";
import AwardsAccreditations from "../../components/layout/awards-accreditations";
import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/navbar";

export default function LuxuryFulfilmentScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar />
      
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Luxury Fulfilment
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Luxury Fulfilment
              </Text>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View className="bg-white py-12 lg:py-24">
          <View className="max-w-[1393px] mx-auto px-4">
            <View className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              {/* Left Column - Main Text */}
              <View className="flex-1">
                <Text className="font-helvetica font-bold text-3xl lg:text-[54px] lg:leading-[68px] tracking-tight text-black mb-8">
                  Mastering Luxury Logistics with FULFILX. <Text className="text-[#C10016]">Exclusivity, Excellence, Experience.</Text>
                </Text>
                
                <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                  In the world of luxury goods, where value is defined as much by experience as by the product itself, specialist fulfillment is essential. FULFIL.X is a leading provider in luxury fulfillment, delivering services designed to protect brand integrity at every touchpoint. We understand that luxury brands demand absolute consistency—from the moment an order is placed to the final unboxing.
                </Text>

                <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                  This includes the careful handling of VIP orders and PR packages, where precision, presentation, and discretion are paramount. FULFIL.X upholds the same exacting standards across every shipment, supported by a trusted courier network and advanced e-commerce integrations, ensuring your products are delivered with the refinement, reliability, and exclusivity your customers expect.
                </Text>
              </View>

              {/* Right Column - Image */}
              <View className="w-full lg:w-[500px] flex-shrink-0">
                <Image 
                  source={{ uri: "/lux.webp" }}
                  className="w-full h-[400px] lg:h-[600px] rounded-[30px]"
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Bespoke Solutions Section */}
        <View className="bg-[#F8F8F8] py-16 lg:py-32">
          <View className="max-w-[1393px] mx-auto px-4">
            <View className={`flex flex-row justify-center items-center px-11 py-4 bg-[#C10016] bg-opacity-10 rounded-[120px] w-[320px] mb-12 ${isMobile ? 'mx-auto' : 'ml-0'}`}>
              <Text className="font-helvetica font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
                BESPOKE SOLUTIONS
              </Text>
            </View>

            <View className="flex flex-col lg:flex-row gap-16">
              {/* Left Column - Title */}
              <View className="w-full lg:w-1/3">
                <Text className="font-helvetica font-bold text-3xl lg:text-[54px] lg:leading-[68px] text-black mb-6">
                  Bespoke Fulfillment Solutions for <Text className="text-[#C10016]">Luxury Brands</Text>
                </Text>
                <Text className="font-helvetica font-normal text-lg lg:text-[20px] lg:leading-[40px] text-black">
                  FULFIL.X offers tailored fulfillment services built around the specific needs of luxury brands. We recognise that high-value products require white-glove handling, secure storage, and elevated presentation to maintain their desirability and prestige. From standard customer orders to influencer seeding, VIP shipments, and PR mailers, every order receives the same meticulous attention to detail.
                </Text>
              </View>

              {/* Right Column - Features */}
              <View className="flex-1">
                {/* Feature 1 */}
                <View className="flex flex-row items-start gap-4 mb-12">
                  <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
                    <Image source={{ uri: "/check.svg" }} alt="check" className="w-[19px] h-[16px]" resizeMode="contain"/>
                  </View>
                  <View className="flex-1">
                    <Text className="font-helvetica font-bold text-lg lg:text-[20px] lg:leading-[38px] text-black">
                      Secure, Climate-Controlled Storage:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Luxury goods often require controlled storage conditions to preserve their quality, materials, and craftsmanship. FULFIL.X provides secure, climate-controlled warehousing that protects your products from environmental exposure, ensuring they remain in impeccable condition until delivery.
                    </Text>
                  </View>
                </View>

                {/* Feature 2 */}
                <View className="flex flex-row items-start gap-4 mb-12">
                  <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
                    <Image source={{ uri: "/check.svg" }} alt="check" className="w-[19px] h-[16px]" resizeMode="contain"/>
                  </View>
                  <View className="flex-1">
                    <Text className="font-helvetica font-bold text-lg lg:text-[20px] lg:leading-[38px] text-black">
                      White-Glove Handling, Packaging & Personalisation:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Every stage of our fulfillment process is managed with precision and care. FULFIL.X delivers white-glove handling alongside premium packaging solutions that reflect the standards of your brand. We also offer personalised touches, including handwritten notes, bespoke inserts, and printed ribbon, allowing each delivery—whether a VIP order or PR package—to feel intentional, exclusive, and on-brand.
                    </Text>
                  </View>
                </View>

                {/* Feature 3 (Added for balance, derived from content) */}
                <View className="flex flex-row items-start gap-4">
                  <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
                    <Image source={{ uri: "/check.svg" }} alt="check" className="w-[19px] h-[16px]" resizeMode="contain"/>
                  </View>
                  <View className="flex-1">
                    <Text className="font-helvetica font-bold text-lg lg:text-[20px] lg:leading-[38px] text-black">
                      Trusted Network & Global Reach:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      We uphold the same exacting standards across every shipment, supported by a trusted courier network and advanced e-commerce integrations. This ensures your products are delivered globally with the refinement, reliability, and exclusivity your customers expect, maintaining brand integrity across borders.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Conclusion Section */}
        <View className="bg-white py-16 lg:py-24">
          <View className="max-w-[1000px] mx-auto px-4 text-center">
            <Text className="font-helvetica font-medium text-2xl lg:text-[32px] lg:leading-[52px] text-black text-center">
              With FULFIL.X, luxury fulfillment becomes a seamless extension of your brand promise—delivering refinement, reliability, and exclusivity from our warehouse to your customer.
            </Text>
          </View>
        </View>
        <AwardsAccreditations />
        <Footer />
      </ScrollView>
    </View>
  );
}
