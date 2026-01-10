import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import Slider from '@react-native-community/slider';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function ProductsScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const router = useRouter();
  const [minPriceValue, setMinPriceValue] = useState(80);
  const [maxPriceValue, setMaxPriceValue] = useState(90);
  const minLimit = 0;
  const maxLimit = 200;

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
          <View className="relative z-10 flex items-center justify-center pt-32 lg:pt-60 px-4">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Products
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center mt-4">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Products
              </Text>
            </View>
          </View>
        </View>

        {/* Products Filter and Grid Section */}
        <View className="relative w-full py-12 px-4" style={{ marginTop: isDesktop ? -220 : -60 }}>
          <View className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            
            {/* Left Sidebar - Filters */}
            <View className="w-full lg:w-80 bg-white border border-gray-300 rounded-2xl p-6 h-fit relative lg:sticky lg:top-4 shadow-sm">

              {/* Categories */}
              <View className="mb-8">
                <Text className="font-helvetica font-bold text-xl text-black mb-4">Categories</Text>
                <View className="gap-3">
                  {['Bed Room', 'Ceiling Fans', 'Decorations', 'Kids Room', 'Lamp', 'Living Room', 'Sofa'].map((category) => (
                    <TouchableOpacity key={category}>
                      <Text className="font-helvetica text-base text-black hover:text-gray-600">
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Price Filter */}
              <View className="mb-8">
                <Text className="font-helvetica font-bold text-xl text-black mb-4">Price</Text>
                
                <View className="py-2">
                  <Text className="text-sm text-gray-600 mb-2">Min Price: £{minPriceValue}</Text>
                  <Slider
                    style={{width: '100%', height: 40}}
                    minimumValue={minLimit}
                    maximumValue={maxLimit}
                    value={minPriceValue}
                    onValueChange={setMinPriceValue}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#D9D9D9"
                    thumbTintColor="#000000"
                    step={1}
                  />
                  <Text className="text-sm text-gray-600 mb-2 mt-2">Max Price: £{maxPriceValue}</Text>
                  <Slider
                    style={{width: '100%', height: 40}}
                    minimumValue={minLimit}
                    maximumValue={maxLimit}
                    value={maxPriceValue}
                    onValueChange={setMaxPriceValue}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#D9D9D9"
                    thumbTintColor="#000000"
                    step={1}
                  />
                </View>
                
                <Text className="font-helvetica text-sm text-black opacity-70 mt-2">
                  Price: £{minPriceValue} - £{maxPriceValue}
                </Text>
              </View>

              {/* Filter Button */}
              <TouchableOpacity className="bg-[#C10016] rounded-lg py-3 px-6 flex-row items-center justify-center gap-2 mb-8">
                <Text className="font-helvetica font-bold text-lg text-white">Filter</Text>
                <Image source={require('../public/arrow.svg')} style={{ width: 12, height: 12, tintColor: 'white' }} resizeMode="contain" />
              </TouchableOpacity>

              {/* Brands */}
              <View className="mb-8">
                <Text className="font-helvetica font-bold text-xl text-black mb-4">Brands</Text>
                <View className="gap-3">
                  {['Airi', 'Draven', 'Mantis', 'Veera', 'Zephys', 'Zyra'].map((brand) => (
                    <TouchableOpacity key={brand}>
                      <Text className="font-helvetica text-base text-black hover:text-gray-600">
                        {brand}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Product Tags */}
              <View>
                <Text className="font-helvetica font-bold text-xl text-black mb-4">Product tags</Text>
                <View className="flex-row flex-wrap gap-2">
                  {['chair', 'furniture', 'decor', 'dress', 'light', 'living', 'Sofa', 'Table'].map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      className="border border-black/20 rounded-full px-4 py-2"
                    >
                      <Text className="font-helvetica font-medium text-xs text-black">
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Right Content - Products Grid and Sort */}
            <View className="flex-1">
              
              {/* Sort Bar */}
              <View className="flex-col lg:flex-row justify-between items-center mb-8 gap-4 lg:gap-0">
                <View className="flex-row items-center gap-4">
                  {/* Results Count */}
                  <View className="mt-2">
                    <Text className="font-helvetica text-base text-black">
                      Showing all 15 results
                    </Text>
                  </View>
                </View>
                
                <View className="flex-row items-center gap-6">
                  <View className="flex-row items-center gap-4">
                    {/* View Toggle Icons */}
                    <View className="flex-row items-center gap-2">
                      <TouchableOpacity className="w-6 h-4">
                        <Image source={require('../public/viewas.png')} className="w-5 h-4" resizeMode="contain" />
                      </TouchableOpacity>
                      <TouchableOpacity className="w-6 h-4 opacity-50">
                        <Image source={require('../public/listing.png')} className="w-5 h-4" resizeMode="contain" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  {/* Sort Dropdown (Visual only for now) */}
                  <TouchableOpacity className="flex-row items-center bg-white border border-black/10 rounded-2xl px-4 py-2 gap-2">
                    <Text className="font-helvetica text-sm text-black">Sort by</Text>
                    <Image source={require('../public/downr.svg')} className="w-4 h-4" resizeMode="contain" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Products Grid */}
              <View className="flex-row flex-wrap gap-6">
                {Array.from({ length: 15 }).map((_, index) => (
                  <View key={index} className="w-full md:w-[48%] lg:w-[31%] flex flex-col">
                    {/* Product Image Card */}
                    <View className="bg-white border border-gray-300 rounded-2xl overflow-hidden relative">
                      <View className="w-full h-80 relative">
                        <Image 
                          source={{ uri: `/product-${(index % 5) + 1}.png` }}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                        
                        {/* Overlay Icons (Visible on mobile by default or interactions?) Keeping it simple for now */}
                        <View className="absolute bottom-4 right-4 flex-row gap-2">
                           <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
                              <Image source={require('../public/heart.svg')} className="w-5 h-5" resizeMode="contain" />
                           </TouchableOpacity>
                           <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
                              <Image source={require('../public/cart.svg')} className="w-5 h-5" resizeMode="contain" />
                           </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    
                    {/* Product Info */}
                    <View className="mt-3">
                      <Text className="font-helvetica font-bold text-lg text-black">
                        Product Name Here
                      </Text>
                      <Text className="font-helvetica text-base text-black opacity-70">
                        £80.99
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Pagination Controls */}
              <View className="flex-row justify-center items-center gap-4 mt-12">
                <TouchableOpacity className="w-12 h-12 bg-[#C10016]/10 rounded-full items-center justify-center">
                  <View className="transform rotate-180">
                    <Image source={require('../public/next.svg')} className="w-4 h-4" resizeMode="contain" />
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity className="w-12 h-12 bg-[#C10016]/10 rounded-full items-center justify-center">
                  <Image source={require('../public/next.svg')} className="w-4 h-4" resizeMode="contain" />
                </TouchableOpacity>
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
