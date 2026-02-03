import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, useWindowDimensions, View } from "react-native";
import AwardsAccreditations from "../../components/layout/awards-accreditations";
import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/navbar";

export default function StationaryGiftsScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="relative w-full pb-12">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <Image 
              source={{ uri: "/bg.webp" }}
              className="w-full h-full object-cover"
              resizeMode="cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 w-full flex flex-col items-center pt-32 lg:pt-48 px-4">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Stationery & Gifts
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center mb-12">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Stationery & Gifts
              </Text>
            </View>

            {/* Hero Image */}
            <Image 
              source={{ uri: "/school-supplies-drawing-instruments-composition.webp" }}
              className="w-full max-w-[1200px] h-[300px] sm:h-[400px] lg:h-[600px] rounded-[30px] object-cover shadow-lg"
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Content Section */}
        <View className="bg-white py-8 lg:py-16">
          <View className="max-w-[1393px] mx-auto px-4">
            <View className="w-full">
              <Text className="font-helvetica font-bold text-3xl lg:text-[54px] lg:leading-[68px] tracking-tight text-black mb-8">
                Mastering Stationery & Gift Fulfilment with FULFILX. <Text className="text-[#C10016]">Presentation, Precision, Personalisation.</Text>
              </Text>
              
              <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                FULFIL.X provides dedicated fulfilment for stationery and gift brands, where presentation, customer delight, and seasonal agility define commercial success. We deliver tailored logistics solutions designed to protect delicate products and elevate the unboxing experience.
              </Text>

              <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                From fine writing instruments and artisanal paper goods to curated gift sets and seasonal collections, our operation is built to meet the aesthetic and operational demands of the sector—including meticulous packaging, creative kitting, and responsive seasonal scaling. Leveraging attentive warehouse systems, brand-aligned processes, and seamless platform integrations, FULFIL.X ensures your stationery and gift fulfilment is a reliable, scalable, and brand-enhancing component of your operation.
              </Text>
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
                  Bespoke Fulfilment Solutions for <Text className="text-[#C10016]">Stationery & Gift Brands</Text>
                </Text>
                <Text className="font-helvetica font-normal text-lg lg:text-[20px] lg:leading-[40px] text-black">
                  FULFIL.X delivers tailored fulfilment services designed for the unique profile of stationery, paper goods, and gift brands. We recognise that these products require careful handling, an eye for aesthetic presentation, and the operational flexibility to manage peak seasons and personalised orders.
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
                      Secure, Dry & Organised Storage:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Paper products, delicate ornaments, and curated gifts are sensitive to moisture, pressure, and disorganisation. FULFIL.X provides clean, dry, and meticulously organised warehousing to protect product quality and ensure flawless order readiness. Our facilities support SKU-intensive inventories, gift wrapping stations, and efficient pick-and-pack processes for both individual items and complex gift sets.
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
                      From embossed notebooks and fountain pens to fragile ceramics and seasonal decorations, every item is handled with consideration and care. FULFIL.X specialises in presentation-perfect picking, packing, and gift kitting, utilising protective, sustainable, and brand-reflective packaging solutions. Whether your brand requires elegant simplicity or festive celebration, we ensure every delivery delights and reinforces your brand&apos;s unique character.
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
                      Personalisation, Scalability & Seasonal Agility:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Stationery and gift fulfilment demands high accuracy and the capacity for personal touches. FULFIL.X supports gift messaging, bespoke kit assembly, and swift adaptation to seasonal peaks. As your brand grows and your collections evolve, our scalable infrastructure and multi-channel integrations enable seamless management of promotions, new launches, and expansion into new sales platforms without compromising on quality or customer experience.
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
              With FULFIL.X, stationery and gift fulfilment transforms from an operational requirement into a key brand ambassador—delivering beauty, care, and flawless execution from our warehouse to your customer&apos;s door.
            </Text>
          </View>
        </View>
        <AwardsAccreditations />
        <Footer />
      </ScrollView>
    </View>
  );
}
