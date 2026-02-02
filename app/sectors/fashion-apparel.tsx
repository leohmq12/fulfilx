import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, useWindowDimensions, View } from "react-native";
import AwardsAccreditations from "../../components/layout/awards-accreditations";
import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/navbar";

export default function FashionScreen() {
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
              Fashion & Apparel
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Fashion & Apparel
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
                  Mastering Fashion & Apparel with FULFILX. <Text className="text-[#C10016]">Elegance, Efficiency, Exclusivity.</Text>
                </Text>
                
                <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                  Where brand image meets impeccable execution. FULFIL.X is the strategic fulfilment partner for fashion and apparel brands that value presentation as much as performance. From luxury garments and seasonal collections to high-volume activewear and accessories, we understand that the unboxing experience is a direct reflection of your label.
                </Text>

                <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                  We combine garment-care expertise with agile logistics, ensuring every item is handled with precision, packed with care, and delivered with speed to meet the fast-paced demands of the industry.
                </Text>
              </View>

              {/* Right Column - Image */}
              <View className="w-full lg:w-[500px] flex-shrink-0">
                <Image 
                  source={{ uri: "/fas.webp" }}
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
                  Bespoke Fulfilment for <Text className="text-[#C10016]">Fashion & Apparel</Text>
                </Text>
                <Text className="font-helvetica font-normal text-lg lg:text-[20px] lg:leading-[40px] text-black">
                  FULFIL.X delivers tailored logistics services designed for the unique lifecycle of fashion products. We support everything from curated launches and size-heavy SKUs to returns management and seasonal changeovers, providing the flexibility your brand needs to stay ahead.
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
                      Secure, Organised & Size-Optimised Storage:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Apparel requires systematic, accessible, and pristine storage to prevent damage and ensure rapid picking. FULFIL.X provides clean, secure warehousing with custom solutions for hanging garments, folded items, and accessory bins. Our systems are optimised for complex size and colour variations, enabling efficient inventory management and flawless order accuracy.
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
                      Specialist Garment Handling & Brand-Centric Packaging:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      From delicate silks and structured outerwear to technical fabrics, every item is processed with specialist care. FULFIL.X offers hand-finishing services, including de-tagging, steaming, folding, and premium garment bagging. We utilise custom and sustainable packaging—from branded boxes to tissue and seals—to create a refined unboxing moment that elevates your brand.
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
                      Agile Returns Management & Seasonal Scalability:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Fashion fulfilment demands agility, especially with high return rates and seasonal peaks. FULFIL.X provides streamlined returns processing, including quality checks, repackaging, and rapid restocking. Our scalable operations and multi-carrier network seamlessly support flash sales, new collections, and expansion into new markets and sales channels.
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
              With FULFIL.X, fashion fulfilment becomes a seamless extension of your brand&apos;s ethos—delivering quality, care, and confidence from our wardrobe to your customer&apos;s door.
            </Text>
          </View>
        </View>
        <AwardsAccreditations />
        <Footer />
      </ScrollView>
    </View>
  );
}
