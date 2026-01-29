import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, useWindowDimensions, View } from "react-native";
import AwardsAccreditations from "../../components/layout/awards-accreditations";
import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/navbar";

export default function PetSuppliesScreen() {
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
              Pet Supplies
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Pet Supplies
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
                  Mastering Pet Supply Fulfilment with FULFILX. <Text className="text-[#C10016]">Care, Consistency, Confidence.</Text>
                </Text>
                
                <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                  FULFIL.X specializes in pet supply fulfillment, supporting brands that provide everything from premium pet food and treats to toys, accessories, and wellness products. We understand that pet owners expect consistency, safety, and speed—and that pet brands must uphold these expectations with every order.
                </Text>

                <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                  With advanced fulfillment technology, seamless e-commerce integrations, and a reliable courier network, FULFIL.X ensures your pet products are stored, packed, and delivered with the same care your customers give their pets.
                </Text>
              </View>

              {/* Right Column - Image */}
              <View className="w-full lg:w-[500px] flex-shrink-0">
                <Image 
                  source={{ uri: "/peep.webp" }}
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
                  Bespoke Fulfillment Solutions for <Text className="text-[#C10016]">Pet Supply Brands</Text>
                </Text>
                <Text className="font-helvetica font-normal text-lg lg:text-[20px] lg:leading-[40px] text-black">
                  FULFIL.X offers tailored fulfillment services designed to meet the unique requirements of pet supply brands. We recognise that pet products vary widely in size, weight, and handling needs, from lightweight accessories to bulky or heavy goods. Our solutions are built to support direct-to-consumer, subscription, and retail fulfillment while maintaining accuracy and efficiency at scale.
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
                      Secure & Controlled Storage:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Pet food, treats, and wellness products often require clean, secure, and controlled storage environments to maintain freshness and quality. FULFIL.X provides well-managed warehousing with inventory rotation processes and batch tracking where required, ensuring products remain safe, compliant, and customer-ready.
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
                      Careful Handling, Kitting & Brand-Ready Packaging:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Every order is handled with care and attention to detail. FULFIL.X supports specialist picking, packing, and kitting for pet supply brands, whether assembling subscription boxes, promotional bundles, or seasonal campaigns. We offer brand-ready packaging options that protect products in transit while reinforcing your brand identity and customer connection.
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
                      Accuracy, Scalability & Customer Experience:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Pet brands depend on reliable fulfillment to retain loyal customers. FULFIL.X delivers high order accuracy, real-time inventory visibility, and scalable operations that grow with your business. From fast-moving consumables to premium pet products, we ensure every delivery arrives on time and in perfect condition—helping you build trust with every shipment.
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
              With FULFIL.X, pet supply fulfillment becomes a dependable extension of your brand, delivering care, consistency, and confidence from warehouse to doorstep.
            </Text>
          </View>
        </View>
        <AwardsAccreditations />
        <Footer />
      </ScrollView>
    </View>
  );
}
