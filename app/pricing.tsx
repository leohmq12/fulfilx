import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { PanResponder, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function LuxuryScreen() {
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [selectedCountry, setSelectedCountry] = useState('');
const [shippingCost, setShippingCost] = useState(0);
const [weight, setWeight] = useState(0.75);
const sliderWidth = 600;

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
        <View className="relative min-h-screen">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <img 
              src="/bg.png"
              alt="Background pattern"
              className="w-full h-full object-contain"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 flex items-center justify-center pt-80">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-[84px] leading-[84px] text-black text-center mb-8">
              Pricing Plans
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center mt-4">
              <Text className="font-helvetica font-normal text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-[20px] leading-[40px] text-[#C10016]">
                Pricing Plans
              </Text>
            </View>
          </View>
        </View>
         {/* Pricing Section */}
        <View className="w-full bg-white py-20">
          {/* Pricing Badge */}
          <View className="flex flex-row justify-center items-center mx-auto w-[200px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] mb-8">
            <Text className="font-helvetica font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
              pricing plans
            </Text>
          </View>

          {/* Pricing Plans */}
          <Text className="text-center font-helvetica font-bold text-[64px] leading-[74px] tracking-[-0.01em] text-black mb-16">
            Pricing <span className='text-[#C10016]'>plans</span> for companies<br/>of all <span className='text-[#C10016]'>sizes</span>
          </Text>
          <Text className="text-center font-helvetica font-normal text-[22px] leading-[36px] tracking-[-0.01em] text-black mb-16">
            We offer competitive pricing plans to fit your organization's needs as well as your <br/>budget. For custom pricing, please <Text 
            className='font-bold text-[#C10016]'
            onPress={() => router.push('/contact')}
        >contact us.
        </Text>
          </Text>
        </View>
    {/* Pricing Section */}
<View className="relative w-full py-40">
  {/* Content Container */}
  <View className="max-w-[1400px] mx-auto px-4 transform -translate-y-40">
    {/* Pricing Cards Container */}
    <View className="flex flex-row justify-center">
      
      {/* Left Card - Pick & Pack */}
      <View className="w-[496px] bg-white border border-[#D9D9D9] border-r-0 rounded-l-[24px] p-8">
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
        <View className="space-y-4 mb-8">
          <View className="flex flex-row items-center gap-3">
            <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
            <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              Includes Packaging
            </Text>
          </View>
          <View className="flex flex-row items-center gap-3">
            <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
            <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              Includes Labelling
            </Text>
          </View>
          <View className="flex flex-row items-center gap-3">
            <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
            <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              Includes Picking
            </Text>
          </View>
          <View className="flex flex-row items-center gap-3">
            <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
            <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              Includes Packing
            </Text>
          </View>
          <View className="flex flex-row items-center gap-3">
            <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
            <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              Shipping (additional cost)
            </Text>
          </View>
        </View>
        
        {/* Contact Button */}
<TouchableOpacity 
  className="border border-[#C10016] border-opacity-20 rounded-[6px] py-2 px-4 mt-4 hover:border-opacity-100 transition-all duration-200"
  onPress={() => router.push('/contact')}
>
  <View className="flex flex-row items-center justify-center gap-3 cursor-pointer">
    <Text className="font-helvetica font-bold text-[18px] leading-[36px] text-[#C10016] hover:opacity-80 transition-opacity duration-200">
      Contact Sales
    </Text>
    <View className="w-3 h-3">
      <img 
        src="/arrow-dark.svg" 
        alt="Arrow" 
        className="w-full h-full object-contain hover:opacity-80 transition-opacity duration-200"
      />
    </View>
  </View>
</TouchableOpacity>
      </View>

      {/* Middle Card - Next Day Shipping (Most Popular) */}
 <View className="w-[500px] bg-white border border-[#D9D9D9] rounded-t-[24px] relative -mt-12">
  {/* Most Popular Badge - Inside card, right aligned with title */}
  <View className="absolute top-8 right-8 bg-[#C10016] bg-opacity-10 rounded-[120px] px-6 py-2">
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
          <View className="space-y-4 mb-8">
            <View className="flex flex-row items-center gap-3">
                <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Fully Tracked
              </Text>
            </View>
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Next Day Delivery
              </Text>
            </View>
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Small to Large Parcels
              </Text>
            </View>
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                International Shipping Available
              </Text>
            </View>
            <View className="flex flex-row items-center gap-3">
              <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
              <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
                Insured Parcels
              </Text>
            </View>
          </View>
          
          {/* Contact Button */}
<TouchableOpacity 
  className="bg-[#C10016] rounded-[6px] py-2 px-4 mt-16 hover:bg-[#D9001A] active:bg-[#A80012] transition-colors duration-200" 
  onPress={() => router.push('/contact')}
>
  <View className="flex flex-row items-center justify-center gap-3 cursor-pointer">
    <Text className="font-helvetica font-bold text-[18px] leading-[36px] text-white">
      Contact Sales
    </Text>
    <View className="w-3 h-3">
      <img 
        src="/arrow.svg" 
        alt="Arrow" 
        className="w-full h-full object-contain"
      />
    </View>
  </View>
</TouchableOpacity>
        </View>
      </View>

      {/* Right Card - Storage */}
      <View className="w-[496px] bg-white border border-[#D9D9D9] border-l-0 rounded-r-[24px] p-8">
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
        <View className="space-y-4 mb-8">
          <View className="flex flex-row items-center gap-3">
            <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
            <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              Secure Warehousing
            </Text>
          </View>
          <View className="flex flex-row items-center gap-3">
            <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
            <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              Flexible Storage Options
            </Text>
          </View>
          <View className="flex flex-row items-center gap-3">
            <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
            <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              Short & Long Term Storage
            </Text>
          </View>
          <View className="flex flex-row items-center gap-3">
            <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
            <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              Pallet Storage
            </Text>
          </View>
          <View className="flex flex-row items-center gap-3">
            <View className="w-4 h-4">
                    <img 
                        src="/check.svg" 
                        alt="Check" 
                        className="w-full h-full object-contain"
                    />
                </View>  
            <Text className="font-helvetica font-normal text-[14px] leading-[26px] text-black opacity-60">
              Inventory Management
            </Text>
          </View>
        </View>
        
        {/* Contact Button */}
<TouchableOpacity 
  className="border border-[#C10016] border-opacity-20 rounded-[6px] py-2 px-4 mt-4 hover:border-opacity-100 transition-all duration-200"
  onPress={() => router.push('/contact')}
>
  <View className="flex flex-row items-center justify-center gap-3 cursor-pointer">
    <Text className="font-helvetica font-bold text-[18px] leading-[36px] text-[#C10016] hover:opacity-80 transition-opacity duration-200">
      Contact Sales
    </Text>
    <View className="w-3 h-3">
      <img 
        src="/arrow-dark.svg" 
        alt="Arrow" 
        className="w-full h-full object-contain hover:opacity-80 transition-opacity duration-200"
      />
    </View>
  </View>
</TouchableOpacity>
      </View>
    </View>
  </View>
      {/* Disclaimer Text */}
    <Text className="text-center font-helvetica font-normal text-[18px] leading-[36px] text-black transform -translate-y-28">
      <span className="text-[#C10016]">*</span> Pricing shown include our volume discount
    </Text>
</View>
<View className="transform -translate-y-36 mb-12">
  {/* Title */}
  <Text className="font-helvetica font-bold text-[64px] leading-[84px] text-black text-center mb-12">
    Key <Text className="text-[#C10016]">Benefits</Text>
  </Text>

  {/* Features - Horizontal Layout */}
  <View className="flex flex-row justify-center items-center gap-16">
    {/* Feature 1 */}
    <View className="flex flex-row items-center gap-4">
      <View className="w-6 h-6">
        <img 
          src="/check.svg" 
          alt="Check" 
          className="w-full h-full object-contain"
        />
      </View>
      <Text className="font-helvetica font-normal text-[24px] leading-[32px] text-black">
        No Minimum Orders
      </Text>
    </View>

    {/* Feature 2 */}
    <View className="flex flex-row items-center gap-4">
      <View className="w-6 h-6">
        <img 
          src="/check.svg" 
          alt="Check" 
          className="w-full h-full object-contain"
        />
      </View>
      <Text className="font-helvetica font-normal text-[24px] leading-[32px] text-black">
        No Setup Fees
      </Text>
    </View>

    {/* Feature 3 */}
    <View className="flex flex-row items-center gap-4">
      <View className="w-6 h-6">
        <img 
          src="/check.svg" 
          alt="Check" 
          className="w-full h-full object-contain"
        />
      </View>
      <Text className="font-helvetica font-normal text-[24px] leading-[32px] text-black">
        Dedicated Account Manager
      </Text>
    </View>
  </View>
</View>
        <View className="relative w-full min-h-[900px] py-20 overflow-hidden">
          {/* Background Gradient Fix */}
          <View className="absolute inset-0">
            <div 
              className="w-full h-full"
              style={{
                background: `url(/job.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </View>
          {/* Content Container - Centered */}
<View className="relative z-10 max-w-[1500px] mx-auto px-8 h-full flex items-center">
  {/* 2 Column Layout - Centered vertically */}
  <View className="flex flex-row gap-20 w-full items-center">

    {/* LEFT COLUMN - Centered horizontally */}
    <View className="flex-1 flex flex-col translate-y-12 transform -translate-x-20">
      <Text className="font-helvetica font-bold text-[60px] leading-[74px] text-white mb-8" selectable={false}>
        Shipping <Text className="text-[#C10016]">Calculator</Text>
      </Text>
      
      {/* Package Weight Section */}
      <View className="mb-16 mt-12">
        {/* Package Weight and Weight Display in same row */}
        <View className="flex flex-row items-center justify-between w-[600px] mb-4">
          <Text className="font-helvetica font-bold text-[22px] leading-[44px] text-white" selectable={false}>
            Package Weight
          </Text>
          
          {/* Weight Display Box - Now aligned horizontally */}
          <View className="border border-white border-opacity-30 rounded-[8px] w-[100px] h-[54px] flex items-center justify-center">
            <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-white text-opacity-70" selectable={false}>
              {weight.toFixed(2)} kg
            </Text>
          </View>
        </View>
        
        {/* Custom Slider */}
        <View className="w-[600px] relative">
          {/* Slider Track */}
          <View className="w-full h-[8px] bg-white bg-opacity-30 rounded-[30px] relative">
            {/* Slider Progress */}
            <View 
              className="h-[8px] bg-[#C10016] rounded-[30px] absolute" 
              style={{ width: sliderPosition }}
            />
          </View>
          
          {/* Slider Handle */}
          <View 
            className="w-6 h-6 bg-[#C10016] rounded-full absolute -top-2"
            style={{ left: sliderPosition - 12 }}
            {...panResponder.panHandlers}
          >
            <View className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </View>
          
          {/* Weight Labels */}
          <View className="flex flex-row justify-between mt-4">
            <Text className="font-helvetica font-normal text-[18px] leading-[44px] text-white" selectable={false}>
              0.25 kg
            </Text>
            <Text className="font-helvetica font-normal text-[18px] leading-[44px] text-white" selectable={false}>
              10 kg
            </Text>
          </View>
        </View>
        
        <Text className="font-helvetica font-normal text-[18px] leading-[44px] text-white text-opacity-50" selectable={false}>
          Select the weight of the package in kilograms.
        </Text>
      </View>

      {/* Destination Country Section */}
      <View className="mt-12">
        <Text className="font-helvetica font-bold text-[22px] leading-[44px] text-white mb-4 transform -translate-y-16" selectable={false}>
          Destination Country
        </Text>
        
        {/* Country Selector Dropdown */}
        <View className="relative z-10">
          <TouchableOpacity 
            className="border border-white border-opacity-30 rounded-[8px] w-[600px] h-[54px] flex flex-row items-center justify-between px-4 py-1 mb-4 transform -translate-y-16"
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            activeOpacity={0.7}
          >
            <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-white text-opacity-70">
              {selectedCountry || 'Select your country'}
            </Text>
            {/* Dropdown Icon with rotation */}
            <View className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
              <img 
                src="/downw.svg" 
                alt="Dropdown arrow" 
                className="w-full h-full object-contain"
              />
            </View>
          </TouchableOpacity>
          
          {/* Dropdown Options */}
          {isDropdownOpen && (
            <View className="absolute top-full left-0 w-[600px] bg-white border border-gray-200 rounded-[8px] mt-1 max-h-48 overflow-y-auto z-50 shadow-lg transform -translate-y-16">
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
        
        <Text className="font-helvetica font-normal text-[18px] leading-[44px] text-white text-opacity-50 transform -translate-y-16 z-0" selectable={false}>
          Select the country to which you want to ship the package
        </Text>
      </View>
    </View>

    {/* RIGHT COLUMN — FIXED, aligned perfectly */}
    <View className="flex-none transform translate-x-20">
      <View className="w-[680px] h-[490px] bg-white rounded-[24px] shadow-lg p-12">
        
        {/* Shipping Cost Title */}
        <Text className="font-helvetica font-bold text-[24px] leading-[44px] text-black justify-start mb-6">
          Shipping Cost
        </Text>
        
        {/* Calculated Price */}
        <Text className="font-helvetica font-bold text-[64px] leading-[44px] text-[#C10016] justify-start mb-4">
          {formatPrice(shippingCost)}
        </Text>
        
        {/* Estimated Cost Description */}
        <Text className="font-helvetica font-normal text-[18px] leading-[44px] text-black opacity-50 justify-start mb-10">
          Estimated shipping cost based on weight and destination country.
        </Text>
        
        {/* Get your Package on its Way! */}
        <Text className="font-helvetica font-bold text-[24px] leading-[44px] text-black justify-start">
          Get your Package on its Way!
        </Text>
        
        {/* Ready to ship description */}
        <Text className="font-helvetica font-normal text-[18px] leading-[44px] text-black opacity-50 justify-start mb-10">
          Ready to ship? Complete your order by confirming the details.
        </Text>
        
        {/* Proceed to Checkout Button */}
<TouchableOpacity 
  className="w-[260px] h-[60px] bg-[#C10016] rounded-[6px] flex flex-row items-center justify-center gap-[10px] mx-auto hover:bg-[#D9001A] transition-colors duration-200"
  activeOpacity={0.8}
>
  <Text className="font-helvetica font-bold text-[18px] leading-[36px] text-white">
    Proceed to Checkout
  </Text>
  <View className="w-3 h-3">
    <img 
      src="/arrow.svg" 
      alt="Arrow" 
      className="w-full h-full object-contain"
    />
  </View>
</TouchableOpacity>

      </View>
    </View>

  </View>
</View>

          </View>
        {/* Accomplishments Section */}
        <section className="relative w-full">
          {/* Two Column Layout */}
          <div className="flex">
            
            {/* Left Section - White Background */}
            <div className="w-1/2 bg-white relative min-h-[520px] flex items-center justify-center">
              <img src="/bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
              {/* Left Section Content - Centered */}
              <div className="max-w-[740px] w-full text-center px-8">
                
                {/* Heading */}
                <h2 className="font-bold text-[42px] leading-[54px] tracking-tight text-black mb-8">
                  Our Accomplishments
                </h2>

                {/* Red Line - Centered */}
                <div className="w-[100px] h-[1px] bg-[#C10016] mx-auto mb-12"></div>

                {/* Image Grid - Centered */}
                <div className="flex justify-center gap-16 mb-12">
                  <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award1.png)'}}></div>
                  <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award2.png)'}}></div>
                  <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award3.png)'}}></div>
                  <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award4.png)'}}></div>
                  <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award5.png)'}}></div>
                </div>
              </div>
            </div>

            {/* Right Section - Red Background */}
            <div className="w-1/2 bg-[#DA192F] relative min-h-[520px] flex items-center justify-center">
              {/* Right Section Content - Centered */}
              <div className="max-w-[650px] w-full text-center px-8">
                
                {/* Heading */}
                <h2 className="font-bold text-[42px] leading-[54px] tracking-tight text-white mb-8">
                  Advanced Tech Solutions
                </h2>

                {/* White Line - Centered */}
                <div className="w-[100px] h-[1px] bg-white mx-auto mb-12"></div>

                {/* Subtitle - Centered */}
                <p className="font-normal text-[24px] leading-[44px] text-white mb-12">
                  Exceptional Quality Service
                </p>

                {/* CTA Button - Centered */}
                <button className="border border-white rounded-[6px] flex items-center justify-center gap-[10px] px-8 py-4 transition-colors duration-300 mx-auto">
                  <span className="text-white font-bold text-[18px] leading-[36px]">Let's Talk</span>
                  <img src="/arrow.svg" alt="arrow" className="w-4 h-4 object-contain" />
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </ScrollView>
    </>
    );
}