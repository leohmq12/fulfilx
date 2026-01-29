import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, useWindowDimensions, View } from "react-native";
import AwardsAccreditations from "../../components/layout/awards-accreditations";
import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/navbar";

export default function HomewareScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="relative min-h-[60vh] lg:min-h-screen">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <Image 
              source={{ uri: "/bg.webp" }}
              className="w-full h-full lg:h-[600px]"
              resizeMode="cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-[60vh] lg:min-h-screen flex items-center justify-center pb-20">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Homeware & Accessories
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Homeware & Accessories
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
                  Mastering Homeware & Accessories with FULFILX. <Text className="text-[#C10016]">Elegance, Efficiency, Exclusivity.</Text>
                </Text>
                
                <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                  Where beautiful products meet flawless delivery. FULFIL.X is the fulfilment partner for homeware and accessories brands that understand details matter. From ceramics and linens to decorative objects and practical essentials, we treat your products with the same care your customers expect, ensuring they arrive in perfect condition and presentation-ready.
                </Text>

                <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                  We blend meticulous handling with operational scale, so you can grow your collection without compromising on the quality of the customer experience.
                </Text>
              </View>

              {/* Right Column - Image */}
              <View className="w-full lg:w-[500px] flex-shrink-0">
                <Image 
                  source={{ uri: "/home.webp" }}
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
                  Bespoke Fulfilment Solutions for <Text className="text-[#C10016]">Home & Living Brands</Text>
                </Text>
                <Text className="font-helvetica font-normal text-lg lg:text-[20px] lg:leading-[40px] text-black">
                  FULFIL.X provides tailored fulfilment designed for the unique profile of homeware, decor, and accessory brands. We recognise that these products demand careful handling, an understanding of aesthetic presentation, and the flexibility to manage diverse collections and seasonal launches.
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
                      Secure, Fragile-Friendly & Organised Storage:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Vases, glassware, textiles and decor items require a considered storage environment. FULFIL.X provides clean, secure, and systematically organised warehousing with designated areas for fragile items. Our facilities support efficient management of diverse collections, from large cushions to delicate tableware, ensuring every item is kept pristine and ready for its journey.
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
                      Specialist Handling & Presentation-Focused Packaging:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      From hand-blown glass and fragile ceramics to heavy candles and soft furnishings, every item is processed with expertise and respect. FULFIL.X specialises in careful picking, protective packing, and elegant gift boxing, utilising materials that ensure safety without sacrificing the premium unboxing moment. We ensure your brand's attention to detail is evident from the very first glance.
                    </Text>
                  </View>
                </View>

                {/* Feature 3 */}
                <View className="flex flex-row items-start gap-4">
                  <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
                    <Image source={{ uri: "/check.svg" }} alt="check" className="w-[19px] h-[16px]" resizeMode="contain"/>
                  </View>
                  <View className="flex-1">
                    <Text className="font-helvetica font-bold text-lg lg:text-[20px] lg:leading-[38px] text-black">
                      Scalability for Collections & Seasonal Launches:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Homeware fulfilment demands accuracy and the capacity to adapt to trends and seasons. FULFIL.X supports curated kit assembly, seasonal collection rotations, and swift adaptation to new product lines. As your brand and product range evolve, our scalable infrastructure enables seamless management of new launches, collaborations, and expansion across sales channels.
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
              With FULFIL.X, homeware and accessories fulfillment transforms from an operational task into a brand-enhancing experience, delivering elegance and reliability from our warehouse to your customer's door.
            </Text>
          </View>
        </View>
        <AwardsAccreditations />
        <Footer />
      </ScrollView>
    </View>
  );
}
