import AwardsAccreditations from '@/components/layout/awards-accreditations';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { useContentList } from '@/hooks/useContent';
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

interface Sector {
    _id?: number;
    _slug?: string;
    _sort_order?: number;
    id?: number;
    title: string;
    description: string;
    image: string;
    link?: string;
    position?: { left: number; top: number };
}

const FALLBACK_SECTORS: Sector[] = [
    // Column 1 - Left
    {
      id: 1,
      title: "Cosmetics",
      description: "In the dynamic world of cosmetics, where product integrity, brand perception, and regulatory compliance are just as important as speed and accuracy, specialized fulfillment is essential. FULFIL.X is a trusted fulfillment partner for cosmetic and beauty brands, offering purpose-built solutions that protect product quality while enhancing the end-customer experience.",
      image: "/foundation-containers-advertising-assortment.webp",
      link: "/sectors/cosmetics",
      position: { left: 215, top: 200 }
    },
    {
      id: 2,
      title: "Supplements & Health",
      description: "In the fast-growing supplements and health products industry, where consumer trust, product safety, and regulatory compliance are paramount, specialized fulfillment plays a critical role in brand success. FULFIL.X is a leading fulfillment partner for supplement and health brands, offering expert solutions designed to protect product integrity while delivering a seamless customer experience.",
      image: "/closeup-athletic-woman-adding-strawberries-while-making-fruit-salad-kitchen.webp",
      link: "/sectors/supplements-health",
      position: { left: 215, top: 982 }
    },
    {
      id: 3,
      title: "Fragrances",
      description: "In fragrance, every detail matters—from formulation to presentation to final delivery. FULFIL.X specializes in fragrance fulfillment for brands that value precision, protection, and premium customer experience.",
      image: "/still-life-cosmetic-products.webp",
      link: "/sectors/fragrances",
      position: { left: 215, top: 1764 }
    },
    {
      id: 4,
      title: "Luxury Fulfilment",
      description: "In the world of luxury goods, where value is defined as much by experience as by the product itself, specialist fulfillment is essential. FULFIL.X is a leading provider in luxury fulfillment, delivering services designed to protect brand integrity at every touchpoint. We understand that luxury brands demand absolute consistency—from the moment an order is placed to the final unboxing.",
      image: "/lux.webp",
      link: "/sectors/luxury-fulfilment",
      position: { left: 215, top: 2546 }
    },
    // Column 2 - Middle
    {
      id: 5,
      title: "Electronics",
      description: "FULFIL.X provides the essential fulfilment partnership for electronics brands, where product integrity, customer trust, and flawless delivery are fundamental to commercial success. We deliver precision-engineered logistics solutions designed to secure sensitive inventory and uphold brand reputation.",
      image: "/modern-stationary-collection-arrangement.webp",
      link: "/sectors/electronics",
      position: { left: 735, top: 140 }
    },
    {
      id: 6,
      title: "Pet Supplies",
      description: "FULFIL.X specializes in pet supply fulfillment, supporting brands that provide everything from premium pet food and treats to toys, accessories, and wellness products. We understand that pet owners expect consistency, safety, and speed—and that pet brands must uphold these expectations with every order.",
      image: "/vecteezy_charming-pampered-pets-play-side-by-side-looking-alert_24653630.webp",
      link: "/sectors/pet-supplies",
      position: { left: 735, top: 922 }
    },
    {
      id: 7,
      title: "Stationery & Gifts",
      description: "FULFIL.X provides dedicated fulfilment for stationery and gift brands, where presentation, customer delight, and seasonal agility define commercial success. We deliver tailored logistics solutions designed to protect delicate products and elevate the unboxing experience.",
      image: "/school-supplies-drawing-instruments-composition.webp",
      link: "/sectors/stationary-gifts",
      position: { left: 735, top: 1704 }
    },
    {
      id: 8,
      title: "Toys & Games",
      description: "Deliver wonder, without the worry. FULFIL.X is the fulfilment partner for dynamic toys and games brands. We combine secure, compliant logistics with an understanding that every parcel should fuel excitement. From action figures and board games to plush and educational kits, we ensure your products are handled with care, packed for protection, and shipped with the speed that keeps the magic alive from cart to customer.",
      image: "/kids-playing-dirty-house.webp",
      link: "/sectors/toys-games",
      position: { left: 735, top: 2486 }
    },
    // Column 3 - Right
    {
      id: 9,
      title: "Homeware & Accessories",
      description: "Where beautiful products meet flawless delivery. FULFIL.X is the fulfilment partner for homeware and accessories brands that understand details matter. From ceramics and linens to decorative objects and practical essentials, we treat your products with the same care your customers expect, ensuring they arrive in perfect condition and presentation-ready.",
      image: "/homeware.webp",
      link: "/sectors/homeware-accessories",
      position: { left: 1255, top: 80 }
    },
    {
      id: 10,
      title: "Chilled Products",
      description: "Precision-controlled logistics for climate-dependent brands. FULFIL.X provides the essential cold chain fulfilment for products where specific temperature ranges are critical to integrity and performance. For temperature-sensitive supplements, lab samples, specialised chemicals, or premium beverages, we deliver more than storage—we guarantee a meticulously monitored environment.",
      image: "/15985a04-f9ed-40d4-8710-158299688474.webp",
      link: "/sectors/chilled-products",
      position: { left: 1255, top: 862 }
    },
    {
      id: 11,
      title: "Fashion & Apparel",
      description: "Where brand image meets impeccable execution. FULFIL.X is the strategic fulfilment partner for fashion and apparel brands that value presentation as much as performance. From luxury garments and seasonal collections to high-volume activewear and accessories, we understand that the unboxing experience is a direct reflection of your label.",
      image: "/row-fashionable-clothing-hangers.webp",
      link: "/sectors/fashion-apparel",
      position: { left: 1255, top: 1644 }
    },
    {
      id: 12,
      title: "Subscription Boxes",
      description: "Curate the excitement, we’ll deliver the experience. FULFIL.X is the dedicated fulfilment partner for subscription box brands that thrive on consistency, surprise, and seamless execution. From curated beauty crates and gourmet selections to niche hobby kits and monthly essentials, we transform complex assembly into a streamlined operation. We manage the intricate logistics of multi-item kitting, tailored packaging, and scaled shipping, so you can focus on crafting the perfect unboxing moment that keeps subscribers delighted and loyal.",
      image: "/what-are-subscription-boxes_8b98e234-fd74-452f-83d0-e2c4c43cb5c8.webp",
      link: "/sectors/subscription-boxes",
      position: { left: 1255, top: 2426 }
    }
  ];

export default function SectorsScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1280;
    const gridItemBasis = isTablet ? '48%' : '31%';
    const router = useRouter();

    // ─── Fetch from CMS with fallback ──────────────────────────────────────
    const { data: cmsSectors } = useContentList<Sector[]>('sector', FALLBACK_SECTORS);
    
    // Normalize: generate link from slug if available
    const sectors = cmsSectors.map((sector, i) => ({
      ...sector,
      id: sector._id ?? sector.id ?? i + 1,
      link: sector.link || (sector._slug ? `/sectors/${sector._slug}` : '#'),
    }));

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
