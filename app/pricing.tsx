import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Image, PanResponder, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

export default function LuxuryScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const isDesktop = width >= 1024;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [weight, setWeight] = useState(0.75);
  
  // Dynamic slider width based on screen width
  const sliderMaxWidth = 600;
  const padding = 64; // Approx padding
  const sliderWidth = isMobile ? Math.min(width - padding, sliderMaxWidth) : sliderMaxWidth;

  const countries = [
  'United Kingdom',
  'United States', 
  'Australia',
  'Bahrain',
  'San Francisco',
  'Saudi Arabia',
  'Georgia',
  'United Arab Emirates'
];
// Shipping cost calculation based on weight and country
const calculateShippingCost = (shippingWeight: number, country: string) => {
  if (!country) return 0;
 // Base prices for different countries (per kg)
  const basePrices = {
    'United Kingdom': 2.5,
    'United States': 8.0,
    'Australia': 9.5,
    'Bahrain': 6.0,
    'San Francisco': 8.5,
    'Saudi Arabia': 5.5,
    'Georgia': 4.5,
    'United Arab Emirates': 5.0
  };
  
  const basePrice = (basePrices as Record<string, number>)[country] || 5.0; // Default price
  
  // Calculate cost: base price * weight + handling fee
  const calculatedCost = (basePrice * shippingWeight) + 1.5; // £1.5 handling fee
  
  return Math.max(calculatedCost, 3.0); // Minimum £3.0
};

// Update shipping cost when weight or country changes
useEffect(() => {
  const cost = calculateShippingCost(weight, selectedCountry);
  setShippingCost(cost);
}, [weight, selectedCountry]);

// Format price to 2 decimal places
const formatPrice = (price: number) => {
  return `£${price.toFixed(2)}`;
};

// Calculate slider position based on weight (0.25 to 10.00)
const sliderPosition = ((weight - 0.25) / 9.75) * sliderWidth;

const panResponder = useRef(
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Use dx (delta X) instead of moveX for relative movement
      const currentPosition = ((weight - 0.25) / 9.75) * sliderWidth;
      const newPosition = Math.max(0, Math.min(sliderWidth, currentPosition + gestureState.dx));
      const newWeight = 0.25 + (newPosition / sliderWidth) * 9.75;
      setWeight(Number(newWeight.toFixed(2)));
    },
    onPanResponderRelease: () => {
      // Optional: Add any final logic when user releases
    },
    onPanResponderTerminationRequest: () => false, // Prevent gesture termination
  })
).current;
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
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View className="relative min-h-[60vh] lg:min-h-screen">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <Image 
              source={require('../public/bg.png')}
              className="w-full h-full object-cover"
              resizeMode="cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-[60vh] lg:min-h-screen flex items-center justify-center pb-20 pt-20 lg:pt-60 px-4">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Pricing Plans
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center mt-4">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Pricing Plans
              </Text>
            </View>
          </View>
        </View>

         {/* Pricing Section */}
        <View className="w-full bg-white px-4" style={{ marginTop: isDesktop ? -192 : -60 }}>
          {/* Pricing Badge */}
          <View className="flex flex-row justify-center items-center mx-auto w-[200px] h-[48px] bg-[#C10016]/10 rounded-[120px] mb-8">
            <Text className="font-helvetica font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
              pricing plans
            </Text>
          </View>

          {/* Pricing Plans */}
          <Text className="text-center font-helvetica font-bold text-3xl lg:text-[64px] leading-tight lg:leading-[74px] tracking-[-0.01em] text-black mb-8 lg:mb-16">
            Pricing <Text className='text-[#C10016]'>plans</Text> for companies{'\n'}of all <Text className='text-[#C10016]'>sizes</Text>
          </Text>
          <Text className="text-center font-helvetica font-normal text-lg lg:text-[22px] leading-relaxed lg:leading-[36px] tracking-[-0.01em] text-black mb-16 max-w-[800px] mx-auto">
            We offer competitive pricing plans to fit your organization&apos;s needs as well as your budget. For custom pricing, please <Text 
            className='font-bold text-[#C10016]'
            onPress={() => router.push('/contact')}
        >contact us.
        </Text>
          </Text>
        </View>

    {/* Pricing Cards Section */}
    <View className="relative w-full py-10">
      {/* Content Container */}
      <View className="max-w-[1400px] mx-auto px-4" style={{ marginTop: isDesktop ? -160 : -40 }}>
        {/* Pricing Cards Container */}
        <View className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8 lg:gap-0">
          
          {/* Left Card - Pick & Pack */}
          <View className="w-full max-w-[500px] lg:w-[496px] bg-white border border-[#D9D9D9] lg:border-r-0 rounded-[24px] lg:rounded-r-none lg:rounded-l-[24px] p-8">
            {/* Title */}
            <Text className="font-helvetica font-medium text-[24px] leading-[74px] tracking-tight text-black mb-4">
              Pick & Pack
            </Text>
            
            {/* Description */}
            <Text className="font-helvetica font-normal text-[16px] leading-[26px] text-black opacity-60 mb-8">
              The essentials to provide with customisability for shipping.
            </Text>
            
            {/* Price */}
            <View className="flex flex-row items-baseline gap-2 mb-8">
            <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                *from
              </Text>
              <Text className="font-helvetica font-medium text-[28px] leading-[74px] tracking-tight text-black">
                £1.27
              </Text>
                <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                /package
              </Text>
            </View>
            
            {/* Features List */}
            <View className="gap-4 mb-8">
              {[
                'Includes Packaging',
                'Includes Labelling',
                'Includes Picking',
                'Includes Packing',
                'Shipping (additional cost)'
              ].map((feature, i) => (
                <View key={i} className="flex flex-row items-center gap-3">
                  <View className="w-4 h-4">
                    <Image source={require('../public/check.svg')} className="w-full h-full" resizeMode="contain" />
                  </View>  
                  <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
            
            {/* Contact Button */}
            <TouchableOpacity 
              className="border border-[#C10016]/20 rounded-[6px] py-2 px-4 mt-4"
              onPress={() => router.push('/contact')}
            >
              <View className="flex flex-row items-center justify-center gap-3">
                <Text className="font-helvetica font-bold text-[18px] leading-[36px] text-[#C10016]">
                  Contact Sales
                </Text>
                <View className="w-3 h-3">
                  <Image source={require('../public/arrow-dark.svg')} className="w-full h-full" resizeMode="contain" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Middle Card - Next Day Shipping (Most Popular) */}
          <View className="w-full max-w-[500px] lg:w-[500px] bg-white border border-[#D9D9D9] rounded-[24px] lg:rounded-b-none lg:rounded-t-[24px] relative z-10 shadow-lg lg:shadow-none" style={{ marginTop: isDesktop ? -48 : 0 }}>
            {/* Most Popular Badge */}
            <View className="absolute top-8 right-8 bg-[#C10016]/10 rounded-[120px] px-6 py-2">
              <Text className="font-helvetica font-medium text-[16px] leading-[40px] text-[#C10016]">
                Most Popular
              </Text>
            </View>
            
            <View className="p-8">
              {/* Title */}
              <Text className="font-helvetica font-medium text-[24px] leading-[74px] tracking-tight text-[#C10016] mb-4">
                Next Day Shipping
              </Text>
              
              {/* Description */}
              <Text className="font-helvetica font-normal text-[16px] leading-[26px] text-black opacity-60 mb-8">
                We offer next day shipping for all orders placed before 3pm.
              </Text>
              
              {/* Price */}
              <View className="flex flex-row items-baseline gap-2 mb-8">
                <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                  *from
                </Text>
                <Text className="font-helvetica font-medium text-[28px] leading-[74px] tracking-tight text-black">
                  £2.18
                </Text>
                <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                  /shipment
                </Text>
              </View>
              
              {/* Features List */}
              <View className="gap-4 mb-8">
                {[
                  'Fully Tracked',
                  'Next Day Delivery',
                  'Small to Large Parcels',
                  'International Shipping Available',
                  'Insured Parcels'
                ].map((feature, i) => (
                  <View key={i} className="flex flex-row items-center gap-3">
                    <View className="w-4 h-4">
                      <Image source={require('../public/check.svg')} className="w-full h-full" resizeMode="contain" />
                    </View>  
                    <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
              
              {/* Contact Button */}
              <TouchableOpacity 
                className="bg-[#C10016] rounded-[6px] py-2 px-4 mt-16" 
                onPress={() => router.push('/contact')}
              >
                <View className="flex flex-row items-center justify-center gap-3">
                  <Text className="font-helvetica font-bold text-[18px] leading-[36px] text-white">
                    Contact Sales
                  </Text>
                  <View className="w-3 h-3">
                    <Image source={require('../public/arrow.svg')} className="w-full h-full" resizeMode="contain" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Right Card - Storage */}
          <View className="w-full max-w-[500px] lg:w-[496px] bg-white border border-[#D9D9D9] lg:border-l-0 rounded-[24px] lg:rounded-l-none lg:rounded-r-[24px] p-8">
            {/* Title */}
            <Text className="font-helvetica font-medium text-[24px] leading-[74px] tracking-tight text-black mb-4">
              Storage
            </Text>
            
            {/* Description */}
            <Text className="font-helvetica font-normal text-[16px] leading-[26px] text-black opacity-60 mb-8">
              Affordable storage scalable for your needs.
            </Text>
            
            {/* Price */}
            <View className="flex flex-row items-baseline gap-2 mb-8">
                <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                *from
              </Text>
              <Text className="font-helvetica font-medium text-[28px] leading-[74px] tracking-tight text-black">
                £0.28p
              </Text>
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                /m3 per day
              </Text>
            </View>
            
            {/* Features List */}
            <View className="gap-4 mb-8">
              {[
                'Secure Warehousing',
                'Flexible Storage Options',
                'Short & Long Term Storage',
                'Pallet Storage',
                'Inventory Management'
              ].map((feature, i) => (
                <View key={i} className="flex flex-row items-center gap-3">
                  <View className="w-4 h-4">
                    <Image source={require('../public/check.svg')} className="w-full h-full" resizeMode="contain" />
                  </View>  
                  <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
            
            {/* Contact Button */}
            <TouchableOpacity 
              className="border border-[#C10016]/20 rounded-[6px] py-2 px-4 mt-4"
              onPress={() => router.push('/contact')}
            >
              <View className="flex flex-row items-center justify-center gap-3">
                <Text className="font-helvetica font-bold text-[18px] leading-[36px] text-[#C10016]">
                  Contact Sales
                </Text>
                <View className="w-3 h-3">
                  <Image source={require('../public/arrow-dark.svg')} className="w-full h-full" resizeMode="contain" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Key Benefits */}
      <View className="mt-20 mb-12">
        <Text className="font-helvetica font-bold text-4xl lg:text-[64px] leading-tight lg:leading-[84px] text-black text-center mb-12">
          Key <Text className="text-[#C10016]">Benefits</Text>
        </Text>

        <View className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16 px-4">
          {['No Minimum Orders', 'No Setup Fees', 'Dedicated Account Manager'].map((benefit, i) => (
            <View key={i} className="flex flex-row items-center gap-4">
              <View className="w-6 h-6">
                <Image source={require('../public/check.svg')} className="w-full h-full" resizeMode="contain" />
              </View>
              <Text className="font-helvetica font-normal text-xl lg:text-[24px] leading-[32px] text-black">
                {benefit}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>

        {/* Shipping Calculator Section */}
        <View className="relative w-full min-h-[900px] py-20 overflow-hidden">
          {/* Background Gradient */}
          <View className="absolute inset-0">
             <Image 
                source={require('../public/job.png')} 
                className="w-full h-full" 
                resizeMode="cover" 
             />
          </View>
          
          {/* Content Container */}
          <View className="relative z-10 max-w-[1500px] mx-auto px-4 lg:px-8 h-full flex items-center">
            <View className="flex flex-col lg:flex-row gap-12 lg:gap-20 w-full items-center">

              {/* LEFT COLUMN */}
              <View className="flex-1 w-full lg:w-auto items-center lg:items-start" style={{ transform: isDesktop ? [{translateX: -80}, {translateY: 48}] : [] }}>
                <Text className="font-helvetica font-bold text-4xl lg:text-[60px] leading-tight lg:leading-[74px] text-white mb-8 text-center lg:text-left">
                  Shipping <Text className="text-[#C10016]">Calculator</Text>
                </Text>
                
                {/* Package Weight Section */}
                <View className="mb-16 mt-12 w-full max-w-[600px]">
                  <View className="flex flex-row items-center justify-between w-full mb-4">
                    <Text className="font-helvetica font-bold text-[22px] leading-[44px] text-white">
                      Package Weight
                    </Text>
                    
                    <View className="border border-white/30 rounded-[8px] w-[100px] h-[54px] items-center justify-center">
                      <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-white/70">
                        {weight.toFixed(2)} kg
                      </Text>
                    </View>
                  </View>
                  
                  {/* Custom Slider */}
                  <View className="w-full relative" style={{ width: sliderWidth }}>
                    <View className="w-full h-[8px] bg-white/30 rounded-[30px] relative">
                      <View 
                        className="h-[8px] bg-[#C10016] rounded-[30px] absolute" 
                        style={{ width: sliderPosition }}
                      />
                    </View>
                    
                    <View 
                      className="w-6 h-6 bg-[#C10016] rounded-full absolute -top-2"
                      style={{ left: Math.max(0, Math.min(sliderPosition - 12, sliderWidth - 24)) }}
                      {...panResponder.panHandlers}
                    >
                      <View className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </View>
                    
                    <View className="flex flex-row justify-between mt-4">
                      <Text className="font-helvetica font-normal text-[18px] leading-[44px] text-white">
                        0.25 kg
                      </Text>
                      <Text className="font-helvetica font-normal text-[18px] leading-[44px] text-white">
                        10 kg
                      </Text>
                    </View>
                  </View>
                  
                  <Text className="font-helvetica font-normal text-[18px] leading-[44px] text-white/50">
                    Select the weight of the package in kilograms.
                  </Text>
                </View>

                {/* Destination Country Section */}
                <View className="mt-12 w-full max-w-[600px]">
                  <Text className="font-helvetica font-bold text-[22px] leading-[44px] text-white mb-4" style={{ marginTop: isDesktop ? -64 : 0 }}>
                    Destination Country
                  </Text>
                  
                  {/* Country Selector Dropdown */}
                  <View className="relative z-10" style={{ marginTop: isDesktop ? -64 : 0 }}>
                    <TouchableOpacity 
                      className="border border-white/30 rounded-[8px] w-full h-[54px] flex flex-row items-center justify-between px-4 py-1 mb-4"
                      onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                      activeOpacity={0.7}
                    >
                      <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-white/70">
                        {selectedCountry || 'Select your country'}
                      </Text>
                      <View className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                        <Image source={require('../public/downw.svg')} className="w-full h-full" resizeMode="contain" />
                      </View>
                    </TouchableOpacity>
                    
                    {/* Dropdown Options */}
                    {isDropdownOpen && (
                      <View className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-[8px] mt-1 max-h-48 overflow-y-auto z-50 shadow-lg">
                        {countries.map((country, index) => (
                          <TouchableOpacity
                            key={index}
                            className={`px-4 py-3 border-b border-gray-100 last:border-b-0 active:bg-gray-50 ${
                              selectedCountry === country ? 'bg-red-50' : ''
                            }`}
                            onPress={() => {
                              setSelectedCountry(country);
                              setIsDropdownOpen(false);
                            }}
                            activeOpacity={0.6}
                          >
                            <Text className={`font-helvetica font-normal text-[16px] leading-[24px] ${
                              selectedCountry === country ? 'text-[#C10016]' : 'text-black'
                            }`}>
                              {country}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                  
                  <Text className="font-helvetica font-normal text-[18px] leading-[44px] text-white/50 z-0" style={{ marginTop: isDesktop ? -64 : 0 }}>
                    Select the country to which you want to ship the package
                  </Text>
                </View>
              </View>

              {/* RIGHT COLUMN */}
              <View className="flex-none w-full lg:w-auto flex justify-center items-center" style={{ transform: isDesktop ? [{translateX: 80}] : [] }}>
                <View className="w-full max-w-[680px] lg:w-[680px] h-auto lg:h-[490px] bg-white rounded-[24px] shadow-lg p-8 lg:p-12">
                  <Text className="font-helvetica font-bold text-[24px] leading-[44px] text-black justify-start mb-6">
                    Shipping Cost
                  </Text>
                  
                  <Text className="font-helvetica font-bold text-[64px] leading-[44px] text-[#C10016] justify-start mb-4">
                    {formatPrice(shippingCost)}
                  </Text>
                  
                  <Text className="font-helvetica font-normal text-[18px] leading-[44px] text-black opacity-50 justify-start mb-10">
                    Estimated shipping cost based on weight and destination country.
                  </Text>
                  
                  <Text className="font-helvetica font-bold text-[24px] leading-[44px] text-black justify-start">
                    Get your Package on its Way!
                  </Text>
                  
                  <Text className="font-helvetica font-normal text-[18px] leading-[44px] text-black opacity-50 justify-start mb-10">
                    Ready to ship? Complete your order by confirming the details.
                  </Text>
                  
                  <TouchableOpacity 
                    className="w-[260px] h-[60px] bg-[#C10016] rounded-[6px] flex flex-row items-center justify-center gap-[10px] mx-auto"
                    activeOpacity={0.8}
                  >
                    <Text className="font-helvetica font-bold text-[18px] leading-[36px] text-white">
                      Proceed to Checkout
                    </Text>
                    <View className="w-3 h-3">
                      <Image source={require('../public/arrow.svg')} className="w-full h-full" resizeMode="contain" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </View>

        {/* Accomplishments Section */}
        <View className="w-full flex-col lg:flex-row">
          
          {/* Left Section - White Background */}
          <View className="w-full lg:w-1/2 bg-white relative min-h-[400px] lg:min-h-[520px] items-center justify-center py-12 lg:py-0">
             <View className="absolute inset-0">
                <Image source={require('../public/bg.png')} className="w-full h-full" resizeMode="cover" />
             </View>
            {/* Left Section Content */}
            <View className="max-w-[740px] w-full items-center px-8 z-10">
              <Text className="font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] text-black mb-8 text-center">
                Our Accomplishments
              </Text>

              <View className="w-[100px] h-[1px] bg-[#C10016] mb-12" />

              <View className="flex-row flex-wrap justify-center gap-4 lg:gap-16 mb-12">
                 {[1, 2, 3, 4, 5].map((i) => (
                    <View key={i} className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px]">
                       <Image source={{ uri: `/award${i}.png` }} className="w-full h-full" resizeMode="contain" />
                    </View>
                 ))}
              </View>
            </View>
          </View>

          {/* Right Section - Red Background */}
          <View className="w-full lg:w-1/2 bg-[#DA192F] relative min-h-[400px] lg:min-h-[520px] items-center justify-center py-12 lg:py-0">
            <View className="max-w-[650px] w-full items-center px-8">
              <Text className="font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] text-white mb-8 text-center">
                Advanced Tech Solutions
              </Text>

              <View className="w-[100px] h-[1px] bg-white mb-12" />

              <Text className="font-normal text-xl lg:text-[24px] leading-relaxed lg:leading-[44px] text-white mb-12 text-center">
                Exceptional Quality Service
              </Text>

              <TouchableOpacity className="border border-white rounded-[6px] flex-row items-center justify-center gap-[10px] px-8 py-4">
                <Text className="text-white font-bold text-[18px] leading-[36px]">Let&apos;s Talk</Text>
                <Image source={require('../public/arrow.svg')} className="w-4 h-4" resizeMode="contain" style={{ tintColor: 'white' }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </>
    );
}
