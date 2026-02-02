import AwardsAccreditations from '@/components/layout/awards-accreditations';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';

export default function ToysScreen() {
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
        <View className="relative min-h-[50vh] lg:min-h-[85vh]">
          <View className="absolute inset-0 z-0">
            <Image 
              source={{ uri: "/bg.webp" }}
              className="w-full h-full object-cover"
              resizeMode="cover"
            />
          </View>
          <View className="relative z-10 min-h-[50vh] lg:min-h-[85vh] flex items-center justify-center pb-16">
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Toys & Games
            </Text>
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Toys & Games
              </Text>
            </View>
          </View>
        </View>
         {/* Text Content Section - Align with image left edge */}
<View className="relative z-20 bg-white pt-16 lg:pt-32 px-4">
  {/* Heading - Same width as image and left aligned */}
  <View className="w-full lg:max-w-[1296px] mx-auto mb-8">
    <Text className="font-helvetica font-bold text-3xl lg:text-[60px] lg:leading-[80px] text-black text-left">
    Mastering Toys & Games with FULFILX. <Text className='text-[#C10016]'>Safety, Speed, Delight</Text>    </Text>
  </View>

  {/* Paragraph - Same width as image and left aligned */}
  <View className="w-full lg:max-w-[1296px] mx-auto">
    <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black text-left">
      Deliver wonder, without the worry. FULFIL.X is the fulfilment partner for dynamic toys and games brands. We combine secure, compliant logistics with an understanding that every parcel should fuel excitement. From action figures and board games to plush and educational kits, we ensure your products are handled with care, packed for protection, and shipped with the speed that keeps the magic alive from cart to customer.
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
          source={{ uri: '/toy.webp' }}
          className="w-full h-[300px] lg:w-[600px] lg:h-[760px] rounded-[30px]"
          resizeMode="cover"
        />
      </View>

      {/* Right Column - Content */}
      <View className="flex-1 lg:max-w-[709px]">
        
        {/* Main Title */}
        <Text className="font-helvetica font-bold text-3xl lg:text-[54px] lg:leading-[68px] tracking-tight text-black mb-6">
          Bespoke Fulfilment Solutions for <Text className="text-[#C10016]">Toys & Games Brands</Text>
        </Text>

        {/* Description */}
        <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-12">
          FULFIL.X provides tailored fulfilment services crafted for the specific needs of toy manufacturers, game publishers, and collectible brands. We understand the critical importance of product safety standards, batch traceability, and the ability to rapidly scale operations for holiday peaks and promotional launches.
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
                Secure, Compliant & Organised Storage:
              </Text>
              <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                Toys, games, and electronic play items must be stored in clean, secure, and systematically organised environments. FULFIL.X offers warehousing solutions that support strict batch and lot control, age-restriction segregation, and efficient stock rotation. Our facilities are designed to manage high-SKU counts and ensure that all products, from small parts to large playsets, are kept in pristine, ready-to-ship condition.
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
                Specialist Handling & Exciting, Protective Packaging:
              </Text>
              <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                From delicate collectibles and complex board games to bulky outdoor toys, every item is processed with expertise and care. FULFIL.X excels in secure picking, protective packing, and promotional kit assembly, utilising durable, safe, and engaging packaging materials. We ensure every parcel not only arrives intact but also enhances the anticipation and joy of receiving a new toy or game.
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
                Compliance, Traceability & Peak-Season Scalability:
              </Text>
              <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                Fulfilment in this sector demands unwavering accuracy and adherence to strict safety regulations. FULFIL.X supports full product traceability, compliance labelling, and age-appropriate packaging protocols. As demand fluctuates with seasons and trends, our scalable infrastructure and agile processes enable seamless handling of surges, special editions, and expansion into new retail channels and markets.
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
      With FULFIL.X, toys and games fulfilment becomes a strategic pillar of your brand—delivering safety, speed, and delight from our secure warehouse to your eager customers.
    </Text>
  </View>
</View>
        <AwardsAccreditations />
        <Footer />
      </ScrollView>
    </>
    );
}
