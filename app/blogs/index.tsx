import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Link, Stack, useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

export default function BlogsScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1280;
    const gridItemBasis = isTablet ? '48%' : '31%';
    const router = useRouter();

    const blogs = [
    // Column 1 - Left
    {
      id: 1,
      title: "The Power of Integration",
      description: "Explore how FulFilx elevates luxury fulfillment, offering bespoke services to manage & deliver high-end goods through an extensive courier network & seamless e-commerce platform integrations, ensuring an unmatched experience for your clients.",
      image: "/poi.webp",
      position: { left: 215, top: 200 }
    },
    {
      id: 2,
      title: "Supplements & Vitamins",
      description: "Uncover how FulFilx transforms the fulfillment process for supplements and vitamins through comprehensive services, leveraging an extensive courier network & seamless e-commerce platform integrations, ensuring your health products reach clients efficiently.",
      image: "/sup.webp",
      position: { left: 215, top: 982 }
    },
    {
      id: 3,
      title: "Consumable Goods",
      description: "Discover how FulFilx offers unparalleled services in managing & delivering consumable goods to your clients through an extensive network of couriers and seamless platform integrations, ensuring efficiency and customer satisfaction.",
      image: "/1_con.webp",
      position: { left: 215, top: 1764 }
    },
    // Column 2 - Middle
    {
      id: 4,
      title: "Electronics",
      description: "Discover FulFilx's cutting-edge approach to electronics fulfillment, leveraging an extensive courier network and seamless e-commerce platform integrations to ensure efficient management & delivery of your electronics to clients globally.",
      image: "/mic.webp",
      position: { left: 735, top: 140 }
    },
    {
      id: 5,
      title: "Cosmetics",
      description: "Discover how FulFilx revolutionizes cosmetics fulfillment, offering tailored services, multiple courier options & seamless e-commerce platform integrations to deliver your beauty products flawlessly to clients worldwide.",
      image: "/cos.webp",
      position: { left: 735, top: 922 }
    },
    {
      id: 6,
      title: "Trade Supplies",
      description: "Learn how FulFilx transforms the management and delivery of trade supplies through its extensive courier network and seamless e-commerce platform integrations, ensuring your business stays ahead in the fulfillment center industry.",
      image: "/tra.webp",
      position: { left: 735, top: 1704 }
    },
    // Column 3 - Right
    {
      id: 7,
      title: "Homeware & accessories",
      description: "Discover how FulFilx elevates the fulfillment process for homeware and accessories through specialized services, an extensive courier network, and seamless e-commerce platform integrations, ensuring your products enrich homes worldwide.",
      image: "/home.webp",
      position: { left: 1255, top: 80 }
    },
    {
      id: 8,
      title: "Fashion",
      description: "Explore how FulFilx revolutionizes fashion fulfillment with comprehensive services, including managing and delivering fashion goods through an extensive courier network & seamless integrations with e-commerce platforms.",
      image: "/fas.webp",
      position: { left: 1255, top: 862 }
    },
    {
      id: 9,
      title: "Toys & Games",
      description: "Discover how FulFilx elevates the management and delivery of toys and games through its robust network of couriers and seamless integrations with major e-commerce platforms, ensuring your products delight clients everywhere.",
      image: "/toy.webp",
      position: { left: 1255, top: 1644 }
    }
  ];
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
        style={{ scrollbarGutter: 'stable both-edges' } as any}
      >
        {/* Hero Section */}
        <View className="relative min-h-[60vh] lg:min-h-screen">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <img 
              src="/bg.webp"
              alt="Background pattern"
              className="w-full h-full lg:h-[600px] object-cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-[60vh] lg:min-h-screen flex items-center justify-center pb-20 pt-20 lg:pt-0">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-5xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Blogs
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-lg lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-lg lg:text-[20px] leading-[40px] text-[#C10016]">
                Blogs
              </Text>
            </View>
          </View>
        </View>
        
        {/* Sectors Grid Section */}
        {isMobile ? (
          // Mobile View - Vertical Stack
          <View className="relative w-full px-4 -mt-20 pb-20">
            {/* Main Title Mobile */}
            <Text className="font-helvetica font-bold text-4xl text-black text-center mb-12">
              Blogs
            </Text>

            <View className="flex flex-col gap-12">
              {blogs.map((blog) => (
                <View key={blog.id} className="w-full">
                  {/* Image */}
                  <View 
                    className="w-full h-[250px] rounded-[24px] bg-cover bg-center mb-6"
                    style={{ 
                      backgroundImage: `url(${blog.image})`,
                      backdropFilter: 'blur(12.5px)'
                    } as any}
                  />
                  
                  {/* Content */}
                  <View>
                    <Text className="font-helvetica font-bold text-2xl leading-tight text-black mb-4">
                      {blog.title}
                    </Text>
                    
                    <Text className="font-helvetica font-normal text-lg leading-relaxed text-black mb-4">
                      {blog.description}
                    </Text>
                    
                    <TouchableOpacity 
                      onPress={() => {
                        if (blog.id === 1) router.push('/blogs/power-of-integration');
                      }}
                      disabled={blog.id !== 1}
                      className="flex flex-row items-center gap-[10px]"
                    >
                      <Text className="font-helvetica font-bold text-lg text-[#C10016]">
                        Learn More
                      </Text>
                      <View className="w-[13px] h-[14px]">
                        <img src="/arrow-dark.svg" alt="arrow" className="w-full h-full object-contain" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          // Desktop/Tablet View - Responsive Grid
          <View className="relative w-full px-4 md:px-6 lg:px-10 2xl:px-16 -mt-20 lg:-mt-48 pb-24">
            <View className="w-full max-w-[1500px] mx-auto">
              <Text className="font-helvetica font-bold text-[44px] lg:text-[64px] leading-tight lg:leading-[84px] text-black text-center mb-12 lg:mb-16">
                Blogs
              </Text>
              <View
                className="flex flex-row flex-wrap justify-center lg:justify-between"
                style={{ rowGap: 48, columnGap: 32 } as any}
              >
                {blogs.map((blog) => (
                  <View
                    key={blog.id}
                    className="w-full"
                    style={{ flexBasis: gridItemBasis, maxWidth: 453, flexGrow: 1 }}
                  >
                    <View 
                      className="w-full rounded-[24px] bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${blog.image})`,
                        aspectRatio: 9 / 7,
                        backdropFilter: 'blur(12.5px)'
                      } as any}
                    />
                    
                    <View className="mt-6">
                      <Text className="font-helvetica font-bold text-[24px] lg:text-[28px] leading-tight lg:leading-[84px] text-black">
                        {blog.title}
                      </Text>
                      
                      <Text className="font-helvetica font-normal text-[18px] lg:text-[20px] leading-7 lg:leading-[38px] text-black mb-2">
                        {blog.description}
                      </Text>
                      
                      {blog.id === 1 ? (
                        <Link href="/blogs/power-of-integration" asChild>
                          <TouchableOpacity className="flex flex-row items-center gap-[10px] cursor-pointer">
                            <Text className="font-helvetica font-bold text-[20px] leading-[36px] text-[#C10016]">
                              Learn More
                            </Text>
                            <img src="/arrow-dark.svg" alt="arrow" className="w-[13px] h-[14px]" />
                          </TouchableOpacity>
                        </Link>
                      ) : (
                        <View className="flex flex-row items-center gap-[10px] cursor-pointer">
                          <Text className="font-helvetica font-bold text-[20px] leading-[36px] text-[#C10016]">
                            Learn More
                          </Text>
                          <img src="/arrow-dark.svg" alt="arrow" className="w-[13px] h-[14px]" />
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
        {/* Accomplishments Section */}
        <View className="relative w-full">
          {/* Two Column Layout */}
          <View className="flex flex-col lg:flex-row">
            
            {/* Left Section - White Background */}
            <View className="w-full lg:w-1/2 bg-white relative min-h-[400px] lg:min-h-[520px] flex items-center justify-center py-12 lg:py-0">
              <View className="absolute inset-0">
                <img src="/bg.webp" alt="" className="w-full h-full object-cover" />
              </View>
              {/* Left Section Content - Centered */}
              <View className="max-w-[740px] w-full items-center px-8 z-10">
                
                {/* Heading */}
                <Text className="font-helvetica font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] tracking-tight text-black mb-8 text-center">
                  Our Awards
                </Text>

                {/* Red Line - Centered */}
                <View className="w-[100px] h-[1px] bg-[#C10016] mb-12" />

                {/* Image Grid - Centered */}
                <View className="flex flex-row flex-wrap justify-center gap-4 lg:gap-16 mb-12">
                  <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px]">
                    <img src="/award1.webp" className="w-full h-full object-contain" />
                  </View>
                  <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px]">
                    <img src="/award2.webp" className="w-full h-full object-contain" />
                  </View>
                  <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px]">
                    <img src="/award3.webp" className="w-full h-full object-contain" />
                  </View>
                  <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px]">
                    <img src="/award4.webp" className="w-full h-full object-contain" />
                  </View>
                  <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px]">
                    <img src="/award5.webp" className="w-full h-full object-contain" />
                  </View>
                </View>
              </View>
            </View>

            {/* Right Section - Red Background */}
            <View className="w-full lg:w-1/2 bg-[#DA192F] relative min-h-[400px] lg:min-h-[520px] flex items-center justify-center py-12 lg:py-0">
              {/* Right Section Content - Centered */}
              <View className="max-w-[650px] w-full items-center px-8">
                
                {/* Heading */}
                <Text className="font-helvetica font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] tracking-tight text-white mb-8 text-center">
                  Accreditations
                </Text>

                {/* White Line - Centered */}
                <View className="w-[100px] h-[1px] bg-white mb-12" />

                {/* Subtitle - Centered */}
                <Text className="font-helvetica font-normal text-xl lg:text-[24px] leading-relaxed lg:leading-[44px] text-white mb-12 text-center">
                  Exceptional Quality Service
                </Text>

                {/* CTA Button - Centered */}
                <TouchableOpacity 
                  className="border border-white rounded-[6px] flex flex-row items-center justify-center gap-[10px] px-8 py-4"
                  onPress={() => router.push('/contact')}
                >
                  <Text className="font-helvetica font-bold text-[18px] leading-[36px] text-white">Let&apos;s Talk</Text>
                  <View className="w-4 h-4">
                    <img src="/arrow.svg" alt="arrow" className="w-full h-full object-contain" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </>
    );
}
