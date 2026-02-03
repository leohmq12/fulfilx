import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, useWindowDimensions, View } from "react-native";
import AwardsAccreditations from "../../components/layout/awards-accreditations";
import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/navbar";

export default function ElectronicsScreen() {
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
              Electronics
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center mb-12">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Electronics
              </Text>
            </View>

            {/* Hero Image */}
            <Image 
              source={{ uri: "/modern-stationary-collection-arrangement.webp" }}
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
                Mastering Electronics Fulfilment with FULFILX. <Text className="text-[#C10016]">Precision, Protection, Performance.</Text>
              </Text>
              
              <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                FULFIL.X provides the essential fulfilment partnership for electronics brands, where product integrity, customer trust, and flawless delivery are fundamental to commercial success. We deliver precision-engineered logistics solutions designed to secure sensitive inventory and uphold brand reputation.
              </Text>

              <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                From consumer electronics and smart devices to high-value components and audio equipment, our operation is built to meet the exacting standards of the sector—including comprehensive anti-static protocols, meticulous protective packaging, and complete serialised traceability. Leveraging advanced warehouse systems, rigorous security, and seamless platform integrations, FULFIL.X ensures your electronics fulfilment is a reliable, scalable, and brand-enhancing component of your operation.
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
                  Bespoke Fulfilment Solutions for <Text className="text-[#C10016]">Electronics Brands</Text>
                </Text>
                <Text className="font-helvetica font-normal text-lg lg:text-[20px] lg:leading-[40px] text-black">
                  FULFIL.X delivers tailored electronics fulfilment services designed to meet the stringent demands of technology and gadget brands. We recognise that electronics require secure handling, comprehensive warranty tracking, and packaging that ensures flawless delivery while reinforcing brand quality.
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
                      Secure, Anti-Static & Climate-Controlled Storage:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Electronic components and devices are sensitive to static, moisture, and temperature fluctuations. FULFIL.X provides secure, climate-controlled warehousing with dedicated anti-static zones to prevent damage and preserve functionality. Our facilities support advanced serial number tracking, batch control, and warranty-life management, ensuring full inventory integrity and compliance.
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
                      Specialist Handling & Protective Packaging:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      From fragile circuit boards to premium consumer electronics, every item is handled with technical care and precision. FULFIL.X specialises in electronics-safe picking, packing, and kitting, utilising anti-static, shock-absorbent, and tamper-evident packaging materials. Whether your product requires discreet security or branded unboxing excellence, we ensure every parcel arrives safely and reinforces your brand’s premium standards.
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
                      Compliance, Traceability & Scalability:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Electronics fulfilment demands rigorous accuracy and end-to-end traceability. FULFIL.X supports serialised inventory management, regulatory labelling, and secure data handling throughout the supply chain. As your brand innovates and grows, our scalable infrastructure and multi-channel integrations enable seamless expansion into new markets, retail partnerships, and global regions without operational disruption.
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
              With FULFIL.X, electronics fulfilment transforms from a logistical task into a brand asset—delivering precision, security, and flawless execution from our warehouse to your customer’s hands.
            </Text>
          </View>
        </View>
        <AwardsAccreditations />
        <Footer />
      </ScrollView>
    </View>
  );
}
