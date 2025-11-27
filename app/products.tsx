import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function ProductsScreen() {
const [priceRange, setPriceRange] = useState<[number, number]>([80, 90]);
const minPrice = 0;
const maxPrice = 200;

const handlePriceChange = (index: number, value: string) => {
  const newPriceRange = [...priceRange];
  newPriceRange[index] = parseInt(value);
  
  // Ensure min doesn't exceed max and vice versa
  if (index === 0 && newPriceRange[0] > newPriceRange[1]) {
    newPriceRange[0] = newPriceRange[1];
  } else if (index === 1 && newPriceRange[1] < newPriceRange[0]) {
    newPriceRange[1] = newPriceRange[0];
  }
  
  setPriceRange(newPriceRange as [number, number]);
};
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
              Products
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center mt-4">
              <Text className="font-helvetica font-normal text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-[20px] leading-[40px] text-[#C10016]">
                Products
              </Text>
            </View>
          </View>
        </View>

        {/* Products Filter and Grid Section */}
        <section className="relative w-full py-12 px-4">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            
            {/* Left Sidebar - Filters */}
            <div className="w-full lg:w-80 bg-white border border-gray-300 backdrop-blur-sm rounded-2xl p-6 h-fit sticky top-4">

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-helvetica font-bold text-xl text-black mb-4">Categories</h3>
                <ul className="space-y-3">
                  {['Bed Room', 'Ceiling Fans', 'Decorations', 'Kids Room', 'Lamp', 'Living Room', 'Sofa'].map((category) => (
                    <li key={category}>
                      <Text className="font-helvetica text-base text-black cursor-pointer hover:text-gray-600">
                        {category}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
              {/*Price Filter*/}
              <div className="mb-8">
  <h3 className="font-helvetica font-bold text-xl text-black mb-4">Price</h3>
  
  {/* Slider Container */}
  <div className="relative pt-6 pb-2">
    {/* Track */}
    <div className="w-full h-0.5 bg-black opacity-15 rounded-full"></div>
    
    {/* Selected Range */}
    <div 
      className="absolute top-6 h-0.5 bg-black rounded-full"
      style={{
        left: `${(priceRange[0] / maxPrice) * 100}%`,
        width: `${((priceRange[1] - priceRange[0]) / maxPrice) * 100}%`
      }}
    ></div>
    
    {/* Min Price Thumb */}
    <input
      type="range"
      min={minPrice}
      max={maxPrice}
      value={priceRange[0]}
      onChange={(e) => handlePriceChange(0, e.target.value)}
      className="absolute top-6 w-full h-0.5 opacity-0 cursor-pointer z-10"
    />
    <div 
      className="absolute top-5 w-3 h-3 bg-black rounded-full cursor-pointer transform -translate-x-2"
      style={{ left: `${(priceRange[0] / maxPrice) * 100}%` }}
    ></div>
    
    {/* Max Price Thumb */}
    <input
      type="range"
      min={minPrice}
      max={maxPrice}
      value={priceRange[1]}
      onChange={(e) => handlePriceChange(1, e.target.value)}
      className="absolute top-6 w-full h-0.5 opacity-0 cursor-pointer z-10"
    />
    <div 
      className="absolute top-5 w-3 h-3 bg-black rounded-full cursor-pointer transform -translate-x-2"
      style={{ left: `${(priceRange[1] / maxPrice) * 100}%` }}
    ></div>
  </div>
  
  <Text className="font-helvetica text-sm text-black opacity-70 mt-4">
    Price: £{priceRange[0]} - £{priceRange[1]}
  </Text>
</div>

              {/* Filter Button */}
              <button className=" bg-[#C10016] rounded-lg py-3 px-6 flex items-center justify-center gap-2 mb-8">
                <Text className="font-helvetica font-bold text-lg text-white">Filter</Text>
                <div className="w-3 h-3">
                    <img src="arrow.svg" alt="arrow" />
                </div>
              </button>

              {/* Brands */}
              <div className="mb-8">
                <h3 className="font-helvetica font-bold text-xl text-black mb-4">Brands</h3>
                <ul className="space-y-3">
                  {['Airi', 'Draven', 'Mantis', 'Veera', 'Zephys', 'Zyra'].map((brand) => (
                    <li key={brand}>
                      <Text className="font-helvetica text-base text-black cursor-pointer hover:text-gray-600">
                        {brand}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Tags */}
              <div>
                <h3 className="font-helvetica font-bold text-xl text-black mb-4">Product tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['chair', 'furniture', 'decor', 'dress', 'light', 'living', 'Sofa', 'Table'].map((tag) => (
                    <button
                      key={tag}
                      className="border border-black border-opacity-20 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <Text className="font-helvetica font-medium text-xs text-black">
                        {tag}
                      </Text>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Products Grid and Sort */}
            <div className="flex-1">
              
              {/* Sort Bar */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                        {/* Results Count */}
              <div className="mt-2">
                <Text className="font-helvetica text-base text-black">
                  Showing all 15 results
                </Text>
              </div>
                </div>
                <div className="flex justify-between items-center mb-8">
  <div className="flex items-center gap-4">
    {/* View Toggle Icons */}
    <div className="flex items-center gap-2">
      <div className="w-6 h-4 bg-transparent cursor-pointer">
        <img src="/viewas.png" alt="view" className="w-5 h-4" />
      </div>
      <div className="w-6 h-4 bg-transparent opacity-50 cursor-pointer">
        <img src="listing.png" alt="list" className="w-5 h-4" />
      </div>
    </div>
  </div>
  
  {/* Sort Dropdown */}
  <div className="relative flex items-center ml-6">
    <select className="appearance-none bg-white border border-black border-opacity-10 rounded-2xl px-4 py-2 pr-8 font-helvetica text-sm text-black cursor-pointer">
      <option>Sort by</option>
      <option>Price: Low to High</option>
      <option>Price: High to Low</option>
      <option>Newest</option>
      <option>Popular</option>
    </select>
    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none">
      <img src="downr.svg" alt="down" className="w-4 h-4" />
    </div>
  </div>
</div>
              </div>
{/* Products Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {Array.from({ length: 15 }).map((_, index) => (
    <div key={index} className="flex flex-col">
      {/* Product Image Card with Hover Effects */}
      <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden relative group">
        <div className="w-full h-80 relative">
          <img 
            src={`/product-${(index % 5) + 1}.png`} 
            alt={`Product ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-product.png';
            }}
          />
          
          {/* Hover Overlay with Icons */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
            {/* Icon 1 - View */}
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gray-100">
              <img src="/heart.svg" alt="Add to wishlist" className="w-5 h-5" />
            </button>
            
            {/* Icon 2 - Cart */}
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-200 hover:bg-gray-100">
              <img src="/eye.svg" alt="QuickView" className="w-5 h-5" />
            </button>
            
            {/* Icon 3 - Heart */}
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-100 hover:bg-gray-100">
              <img src="/cart.svg" alt="Add to cart" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="mt-3">
        <Text className="font-helvetica font-bold text-lg text-black block">
          Product Name Here
        </Text>
        <Text className="font-helvetica text-base text-black opacity-70 block">
          £80.99
        </Text>
      </div>
    </div>
  ))}
</div>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button className="w-12 h-12 bg-[rgba(193,0,22,0.1)] rounded-full flex items-center justify-center hover:bg-[#C10016] transition-colors duration-300 group">
                  <div className="w-4 h-4 transform rotate-180 -translate-y-1">
                    <img src="next.svg" alt="back" />
                  </div>
                </button>
                
                <button className="w-12 h-12 bg-[rgba(193,0,22,0.1)] rounded-full flex items-center justify-center hover:bg-[rgba(193,0,22,0.8)] transition-colors duration-300">
                  <div className="w-4 h-4">
                    <img src="next.svg" alt="next" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
        
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
        </ScrollView></>
    )
}