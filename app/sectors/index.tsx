import AwardsAccreditations from '@/components/layout/awards-accreditations';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Link, Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

function ExpandableDescription({ text, textClassName, toggleClassName, containerClassName }: { text: string, textClassName?: string, toggleClassName?: string, containerClassName?: string }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View className={containerClassName}>
            <Text 
                className={textClassName} 
                numberOfLines={isExpanded ? undefined : 2}
                ellipsizeMode="tail"
            >
                {text}
            </Text>
            <TouchableOpacity 
                onPress={() => setIsExpanded(!isExpanded)} 
                activeOpacity={0.7}
                className="mt-1 flex flex-row items-center"
            >
                 <img 
                    src="/downr.svg" 
                    alt={isExpanded ? "Collapse" : "Expand"} 
                    className={`w-[14px] h-[8px] object-contain transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                 />
            </TouchableOpacity>
        </View>
    );
}

export default function SectorsScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1280;
    const gridItemBasis = isTablet ? '48%' : '31%';
    const router = useRouter();

    const sectors = [
    // Column 1 - Left
    {
      id: 1,
      title: "Cosmetics",
      description: "Discover how FulFilx revolutionizes cosmetics fulfillment, offering tailored services, multiple courier options & seamless e-commerce platform integrations to deliver your beauty products flawlessly to clients worldwide.",
      image: "/foundation-containers-advertising-assortment.webp",
      link: "/sectors/cosmetics",
      position: { left: 215, top: 200 }
    },
    {
      id: 2,
      title: "Supplements & Health",
      description: "Uncover how FulFilx transforms the fulfillment process for supplements and health products through comprehensive services, leveraging an extensive courier network & seamless e-commerce platform integrations.",
      image: "/closeup-athletic-woman-adding-strawberries-while-making-fruit-salad-kitchen.webp",
      link: "/sectors/supplements-health",
      position: { left: 215, top: 982 }
    },
    {
      id: 3,
      title: "Fragrances",
      description: "Explore our specialized fulfillment for fragrances, ensuring safe handling, compliant shipping, and premium delivery experiences for your perfumes and scents worldwide.",
      image: "/still-life-cosmetic-products.webp",
      link: "/sectors/fragrances",
      position: { left: 215, top: 1764 }
    },
    {
      id: 4,
      title: "Luxury Fulfilment",
      description: "Explore how FulFilx elevates luxury fulfillment, offering bespoke services to manage & deliver high-end goods through an extensive courier network & seamless e-commerce platform integrations.",
      image: "/lux.webp",
      link: "/sectors/luxury-fulfilment",
      position: { left: 215, top: 2546 }
    },
    // Column 2 - Middle
    {
      id: 5,
      title: "Electronics",
      description: "Discover FulFilx's cutting-edge approach to electronics fulfillment, leveraging an extensive courier network and seamless e-commerce platform integrations to ensure efficient management & delivery.",
      image: "/modern-stationary-collection-arrangement.webp",
      link: "/sectors/electronics",
      position: { left: 735, top: 140 }
    },
    {
      id: 6,
      title: "Pet Supplies",
      description: "From food to accessories, FulFilx ensures your pet supply business runs smoothly with efficient inventory management and reliable delivery services for pet owners everywhere.",
      image: "/vecteezy_charming-pampered-pets-play-side-by-side-looking-alert_24653630.webp",
      link: "/sectors/pet-supplies",
      position: { left: 735, top: 922 }
    },
    {
      id: 7,
      title: "Stationery & Gifts",
      description: "Ensure your stationery and gift products are handled with care and delivered on time. FulFilx offers precise picking and packing for delicate and seasonal items.",
      image: "/school-supplies-drawing-instruments-composition.webp",
      link: "/sectors/stationary-gifts",
      position: { left: 735, top: 1704 }
    },
    {
      id: 8,
      title: "Toys & Games",
      description: "Discover how FulFilx elevates the management and delivery of toys and games through its robust network of couriers and seamless integrations with major e-commerce platforms.",
      image: "/kids-playing-dirty-house.webp",
      link: "/sectors/toys-games",
      position: { left: 735, top: 2486 }
    },
    // Column 3 - Right
    {
      id: 9,
      title: "Homeware & Accessories",
      description: "Discover how FulFilx elevates the fulfillment process for homeware and accessories through specialized services, ensuring your products enrich homes worldwide.",
      image: "/homeware.webp",
      link: "/sectors/homeware-accessories",
      position: { left: 1255, top: 80 }
    },
    {
      id: 10,
      title: "Chilled Products",
      description: "FulFilx offers specialized cold chain solutions for chilled products, ensuring your perishable goods arrive fresh and in perfect condition to your customers.",
      image: "/15985a04-f9ed-40d4-8710-158299688474.webp",
      link: "/sectors/chilled-products",
      position: { left: 1255, top: 862 }
    },
    {
      id: 11,
      title: "Fashion & Apparel",
      description: "Explore how FulFilx revolutionizes fashion fulfillment with comprehensive services, including managing and delivering fashion goods through an extensive courier network.",
      image: "/row-fashionable-clothing-hangers.webp",
      link: "/sectors/fashion-apparel",
      position: { left: 1255, top: 1644 }
    },
    {
      id: 12,
      title: "Subscription Boxes",
      description: "Maximize your subscription box business with our kitting and assembly services, delivering a delightful and consistent unboxing experience every month.",
      image: "/what-are-subscription-boxes_8b98e234-fd74-452f-83d0-e2c4c43cb5c8.webp",
      link: "/sectors/subscription-boxes",
      position: { left: 1255, top: 2426 }
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
      >
        {/* Hero Section */}
        <View className="relative min-h-[50vh] lg:min-h-[85vh]">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <img 
              src="/bg.webp"
              alt="Background pattern"
              className="w-full h-full object-cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-[50vh] lg:min-h-[85vh] flex items-center justify-center pb-16">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] lg:leading-[84px] text-black text-center mb-8">
              Sectors
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Sectors
              </Text>
            </View>
          </View>
        </View>

        {isMobile ? (
          // Mobile View - Vertical Stack
          <View className="relative w-full px-4 -mt-20 pb-20">
            
            <View className="flex flex-col gap-12">
              {sectors.map((sector) => (
                <View key={sector.id} className="w-full">
                  <View 
                    className="w-full h-[250px] rounded-[24px] bg-cover bg-center mb-6"
                    style={{ backgroundImage: `url(${sector.image})` } as any}
                  />
                  <Text className="font-helvetica font-bold text-2xl leading-tight text-black mb-4">
                    {sector.title}
                  </Text>
                  <ExpandableDescription 
                    text={sector.description} 
                    textClassName="font-helvetica font-normal text-lg leading-7 text-black mb-1" 
                    toggleClassName="text-sm"
                    containerClassName="mb-4"
                  />
                  
                  <TouchableOpacity 
                      onPress={() => router.push(sector.link as any)}
                      className="flex flex-row items-center gap-[10px]"
                    >
                      <Text className="font-helvetica font-bold text-lg text-[#C10016]">
                        Learn More
                      </Text>
                      <img src="/arrow-dark.svg" alt="arrow" className="w-[13px] h-[14px]" />
                    </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ) : (
          // Desktop/Tablet View - Responsive Grid
          <View className="relative w-full px-4 md:px-6 lg:px-10 2xl:px-16 -mt-20 lg:-mt-48 pb-24">
            <View className="w-full max-w-[1500px] mx-auto">
              
              <View
                className="flex flex-row flex-wrap justify-center lg:justify-between"
                style={{ rowGap: 48, columnGap: 32 } as any}
              >
                {sectors.map((sector) => (
                  <View
                    key={sector.id}
                    className="w-full"
                    style={{ flexBasis: gridItemBasis, maxWidth: 453, flexGrow: 1 }}
                  >
                    <View 
                      className="w-full rounded-[24px] bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${sector.image})`,
                        aspectRatio: 9 / 7,
                        backdropFilter: 'blur(12.5px)'
                      } as any}
                    />
                    
                    <View className="mt-6">
                      <Text className="font-helvetica font-bold text-[24px] lg:text-[28px] leading-tight lg:leading-[84px] text-black">
                        {sector.title}
                      </Text>
                      
                      <ExpandableDescription 
                        text={sector.description} 
                        textClassName="font-helvetica font-normal text-[18px] lg:text-[20px] leading-7 lg:leading-[38px] text-black mb-1" 
                        toggleClassName="text-[16px]"
                        containerClassName="mb-2"
                      />
                      
                      <Link href={sector.link as any} asChild>
                        <TouchableOpacity className="flex flex-row items-center gap-[10px] cursor-pointer">
                          <Text className="font-helvetica font-bold text-[20px] leading-[36px] text-[#C10016]">
                            Learn More
                          </Text>
                          <img src="/arrow-dark.svg" alt="arrow" className="w-[13px] h-[14px]" />
                        </TouchableOpacity>
                      </Link>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Accomplishments Section */}
        <AwardsAccreditations />
        <Footer/>
      </ScrollView>
    </>
    );
}
