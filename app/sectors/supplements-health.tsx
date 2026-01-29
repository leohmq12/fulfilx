import AwardsAccreditations from '@/components/layout/awards-accreditations';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';

export default function SupplementsScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 1024;
    const router = useRouter();

    return (
        <>
      <Stack.Screen 
        options={{ 
          headerShown: false,
          header: () => null
        }} 
      />
      
      <Navbar />
      
      {/* Main Scrollable Content */}
      <ScrollView 
        className="flex-1 bg-white"
      >
        {/* Hero Section */}
        <View className="relative min-h-[60vh] lg:min-h-screen">
          <View className="absolute inset-0 z-0">
            <Image 
              source={{ uri: "/bg.webp" }}
              className="w-full h-full lg:h-[600px]"
              resizeMode="cover"
            />
          </View>
          <View className="relative z-10 min-h-[60vh] lg:min-h-screen flex items-center justify-center pb-20">
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Supplements & Health
            </Text>
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Supplements & Health
              </Text>
            </View>
          </View>
        </View>
         {/* Text Content Section - Align with image left edge */}
<View className="relative z-20 bg-white pt-16 lg:pt-32 px-4">
  {/* Heading - Same width as image and left aligned */}
  <View className="w-full lg:max-w-[1296px] mx-auto mb-8">
    <Text className="font-helvetica font-bold text-3xl lg:text-[60px] lg:leading-[80px] text-black text-left">
    Mastering Supplements & Health with FULFILX. <Text className='text-[#C10016]'>Safety, Consistency, Reliability</Text>    </Text>
  </View>

  {/* Paragraph - Same width as image and left aligned */}
  <View className="w-full lg:max-w-[1296px] mx-auto">
    <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black text-left">
      In the fast-growing supplements and health products industry, where consumer trust, product safety, and regulatory compliance are paramount, specialized fulfillment plays a critical role in brand success. FULFIL.X is a leading fulfillment partner for supplement and health brands, offering expert solutions designed to protect product integrity while delivering a seamless customer experience. From vitamins and protein powders to functional health products and wellness consumables, we understand the strict handling, storage, and traceability these products require. With advanced warehouse technology, seamless e-commerce integrations, and an extensive courier network, FULFIL.X ensures your fulfillment operation supports your brand’s credibility, efficiency, and growth.
    </Text>
  </View>
</View>
{/* Bespoke Solutions Section - Two Columns */}
<View className="relative z-20 bg-white py-10 lg:py-20">
  <View className="lg:max-w-[1393px] mx-auto px-4">
    
    {/* Badge - Moved outside the flex container */}
    <View className={`flex flex-row justify-center items-center px-11 py-4 bg-[#C10016] bg-opacity-10 rounded-[120px] w-[320px] mb-6 ${isMobile ? 'mx-auto' : 'ml-[648px]'}`}>
      <Text className="font-helvetica font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
        Bespoke Solutions
      </Text>
    </View>

    <View className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
      
      {/* Left Column - Image */}
      <View className="w-full lg:w-[600px] flex-shrink-0">
        <Image 
          source={{ uri: '/sup.webp' }}
          className="w-full h-[300px] lg:w-[600px] lg:h-[760px] rounded-[30px]"
          resizeMode="cover"
        />
      </View>

      {/* Right Column - Content */}
      <View className="flex-1 lg:max-w-[709px]">
        
        {/* Main Title */}
        <Text className="font-helvetica font-bold text-3xl lg:text-[54px] lg:leading-[68px] tracking-tight text-black mb-6">
          Bespoke Fulfillment Solutions for <Text className="text-[#C10016]">Supplement & Health Brands</Text>
        </Text>

        {/* Description */}
        <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-12">
          FULFIL.X provides tailored fulfillment services specifically designed for the unique needs of supplement and health product brands. We recognize that these products demand rigorous quality control, accurate inventory management, and compliant handling processes to meet both regulatory standards and customer expectations.
        </Text>

        {/* Features List */}
        <View className="">
          
          {/* Feature 1 */}
          <View className="flex flex-row items-start gap-4 mb-12">
            {/* Check Icon */}
            <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
              <Image source={{ uri: "/check.svg" }} alt="check" className="w-[19px] h-[16px]" resizeMode="contain"/>
            </View>
            {/* Feature Text */}
            <View className="flex-1">
              <Text className="font-helvetica font-bold text-lg lg:text-[20px] lg:leading-[38px] text-black">
                Secure, Temperature-Controlled & Compliant Storage:
              </Text>
              <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                Many supplements and health products are sensitive to temperature, moisture, and light. FULFIL.X offers secure, temperature-controlled warehousing environments that help preserve potency, stability, and shelf life. Our systems support batch and lot tracking, expiry date management, and FIFO/FEFO workflows, ensuring full traceability and compliance throughout the supply chain.
              </Text>
            </View>
          </View>

          {/* Feature 2 */}
          <View className="flex flex-row items-start gap-4 mb-12">
            {/* Check Icon */}
            <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
              <Image source={{ uri: "/check.svg" }} alt="check" className="w-[19px] h-[16px]" resizeMode="contain"/>
            </View>
            {/* Feature Text */}
            <View className="flex-1">
              <Text className="font-helvetica font-bold text-lg lg:text-[20px] lg:leading-[38px] text-black">
                Specialist Handling & Protective Packaging:
              </Text>
              <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                From capsules and tablets to powders and liquid supplements, every order is handled with precision and care. FULFIL.X specializes in hygienic picking, packing, and kitting processes, using protective packaging solutions that prevent contamination and damage while maintaining a professional, brand-aligned presentation.
              </Text>
            </View>
          </View>

          {/* Feature 3 */}
          <View className="flex flex-row items-start gap-4">
            {/* Check Icon */}
            <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
              <Image source={{ uri: "/check.svg" }} alt="check" className="w-[19px] h-[16px]" resizeMode="contain"/>
            </View>
            {/* Feature Text */}
            <View className="flex-1">
              <Text className="font-helvetica font-bold text-lg lg:text-[20px] lg:leading-[38px] text-black">
                Accuracy, Traceability & Scalable Growth:
              </Text>
              <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                Supplement fulfillment demands exceptional accuracy and accountability. FULFIL.X delivers end-to-end visibility with real-time inventory tracking, batch-level reporting, and recall-ready traceability. As your brand scales, our flexible infrastructure and multi-channel integrations enable effortless expansion across e-commerce platforms, retail partners, and international markets.
              </Text>
            </View>
          </View>

        </View>
      </View>
    </View>
  </View>
</View>

{/* Conclusion Section */}
<View className="relative z-20 bg-white pt-10 lg:pt-20 pb-16 lg:pb-32 px-4">
  <View className="w-full lg:max-w-[1296px] mx-auto text-center">
    <Text className="font-helvetica font-normal text-xl lg:text-[32px] lg:leading-[52px] text-black">
      With FULFIL.X, supplement and health product fulfillment becomes a foundation of trust—ensuring safety, consistency, and reliability from warehouse to consumer.
    </Text>
  </View>
</View>
        <AwardsAccreditations />
        <Footer />
      </ScrollView>
    </>
    );
}
