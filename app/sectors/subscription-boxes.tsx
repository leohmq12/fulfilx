import AwardsAccreditations from '@/components/layout/awards-accreditations';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';

export default function SubscriptionScreen() {
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
              Subscription Boxes
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center mb-12">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Subscription Boxes
              </Text>
            </View>

            {/* Hero Image */}
            <Image 
              source={{ uri: "/box.webp" }}
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
                Mastering Subscription Boxes with FULFILX. <Text className='text-[#C10016]'>Consistency, Surprise, Execution</Text>
              </Text>
              
              <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                Curate the excitement, we’ll deliver the experience. FULFIL.X is the dedicated fulfilment partner for subscription box brands that thrive on consistency, surprise, and seamless execution. From curated beauty crates and gourmet selections to niche hobby kits and monthly essentials, we transform complex assembly into a streamlined operation. We manage the intricate logistics of multi-item kitting, tailored packaging, and scaled shipping, so you can focus on crafting the perfect unboxing moment that keeps subscribers delighted and loyal.
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
                  Bespoke Fulfilment for <Text className="text-[#C10016]">Subscription Models</Text>
                </Text>
                <Text className="font-helvetica font-normal text-lg lg:text-[20px] lg:leading-[40px] text-black">
                  FULFIL.X delivers tailored logistics engineered for the unique rhythm of subscription services. We support dynamic product rotations, limited-edition collaborations, and flexible billing cycles, providing the operational backbone that allows your concept to scale without compromise.
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
                      Secure, Dynamic & SKU-Intensive Storage:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Subscription boxes require flawless inventory coordination across hundreds of individual components. FULFIL.X provides highly organised, secure warehousing with dedicated zones for bulk components and assembly stations. Our systems are built for complex SKU management, precise quantity tracking, and efficient pick-and-pack processes that ensure every box is complete and accurate.
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
                      Specialist Kitting & Themed, Branded Packaging:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      From assembling individual items to creating themed, presentation-ready boxes, every step is handled with meticulous care. FULFIL.X specialises in custom kitting, including the insertion of promotional materials, personalised notes, and curated collateral. We utilise tailored packaging that builds anticipation, reinforcing your brand story from the outside in.
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
                      Scalable Operations & Cycle-Driven Logistics:
                    </Text>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                      Subscription fulfilment demands pinpoint timing and the ability to scale with your member base. FULFIL.X synchronises with your billing cycle to ensure seamless monthly, quarterly, or seasonal dispatches. Our scalable infrastructure and carrier integrations effortlessly manage growth surges, new box variations, and expansion into different subscription tiers or markets.
                    </Text>
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
      With FULFIL.X, subscription box fulfilment becomes a reliable engine for growth—delivering consistency, creativity, and connection with every curated delivery.
    </Text>
  </View>
</View>
        <AwardsAccreditations />
        <Footer />
      </ScrollView>
    </>
    );
}
