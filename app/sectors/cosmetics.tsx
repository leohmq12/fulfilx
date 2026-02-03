import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, useWindowDimensions, View } from "react-native";
import AwardsAccreditations from "../../components/layout/awards-accreditations";
import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/navbar";

export default function CosmeticsScreen() {
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
              Cosmetics
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center mb-12">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Cosmetics
              </Text>
            </View>

            {/* Hero Image */}
            <Image 
              source={{ uri: "/foundation-containers-advertising-assortment.webp" }}
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
                Mastering Cosmetics Fulfillment with FULFILX. <Text className="text-[#C10016]">Precision, Presentation, Purity.</Text>
              </Text>
              
              <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                In the dynamic world of cosmetics, where product integrity, brand perception, and regulatory compliance are just as important as speed and accuracy, specialized fulfillment is essential. FULFIL.X is a trusted fulfillment partner for cosmetic and beauty brands, offering purpose-built solutions that protect product quality while enhancing the end-customer experience.
              </Text>

              <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                From serums and creams to makeup and personal care products, we understand that cosmetics require precise handling, controlled environments, and flawless presentation. With advanced technology, seamless e-commerce integrations, and a global courier network, FULFIL.X ensures your cosmetic fulfillment operation is a natural extension of your brand—reliable, scalable, and impeccably executed.
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
                  Bespoke Fulfillment Solutions for <Text className="text-[#C10016]">Cosmetic Brands</Text>
                </Text>
                <Text className="font-helvetica font-normal text-lg lg:text-[20px] lg:leading-[40px] text-black">
                  FULFIL.X delivers tailored cosmetic fulfillment services designed to meet the unique demands of beauty and personal care brands. We recognize that cosmetics require strict quality control, careful handling, and packaging that reflects brand identity while ensuring product safety and compliance.
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
                      Secure, Temperature-Controlled Storage:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Many cosmetic products are sensitive to heat, light, and humidity. FULFIL.X provides secure, temperature-controlled warehousing to preserve product efficacy, texture, and shelf life. Our facilities are designed to support batch tracking, expiry-date management, and FIFO/FEFO processes, ensuring your products remain compliant and customer-ready at all times.
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
                      Specialist Handling & Brand-Ready Packaging:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      From delicate glass bottles to luxury cosmetic kits, every order is handled with precision and care. FULFIL.X specializes in cosmetic-safe picking, packing, and kitting, using protective, hygienic, and visually refined packaging solutions. Whether your brand calls for minimalist elegance or premium unboxing, we ensure every delivery reinforces your brand promise.
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
                      Compliance, Accuracy & Scalability:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Cosmetic fulfillment demands accuracy and regulatory awareness. FULFIL.X supports labeling requirements, lot and batch control, and full inventory traceability. As your brand grows, our scalable infrastructure and multi-channel integrations allow you to expand into new markets, sales platforms, and regions without disruption.
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
              With FULFIL.X, cosmetic fulfillment becomes more than logistics—it becomes a competitive advantage, delivering consistency, care, and confidence from warehouse to customer.
            </Text>
          </View>
        </View>
        <AwardsAccreditations />
        <Footer />
      </ScrollView>
    </View>
  );
}
