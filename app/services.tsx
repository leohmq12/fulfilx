import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

// Import SVG icons (make sure these files exist in your assets folder)
// If using Expo web, you can use regular img tags for SVG files
const D2CIcon = () => <img src="/d2c.svg" alt="D2C Icon" width={60} height={60} />;
const B2BIcon = () => <img src="/b2b.svg" alt="B2B Icon" width={60} height={60} />;
const AmazonIcon = () => <img src="/amf.svg" alt="Amazon Icon" width={58} height={60} />;
const MarketplaceIcon = () => <img src="/fms.svg" alt="Marketplace Icon" width={60} height={60} />;
const ArrowIcon = () => <img src="/arrow-dark.svg" alt="Arrow" width={10} height={10} />;
const CheckIcon = () => <img src="/check.svg" alt="Check" width={14} height={14} />;

const FulfillmentServicesSection = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const services = [
    {
      id: 1,
      title: 'D2C Fulfilment',
      icon: D2CIcon,
      features: [
        'Direct-to-consumer pick, pack & dispatch.',
        'Same-day dispatch cut-off options.',
        'Branded packaging, inserts, gift notes.',
        'Order tracking and customer notifications.'
      ]
    },
    {
      id: 2,
      title: 'B2B Fulfilment',
      icon: B2BIcon,
      features: [
        'Bulk & palletised shipments',
        'Retail-compliant carton & pallet prep',
        'ASN / EDI support',
        'Wholesale distribution fulfilment - Argos, Currys, Harrods, Selfridges, QVC, Macy\'s, Bloomingdale\'s, Nordstrom, Costco, Saks Fifth Avenue, Fenwick, Pets at Home, Sephora'
      ]
    },
    {
      id: 3,
      title: 'Amazon Fulfilment',
      icon: AmazonIcon,
      features: [
        'FBA Prep: Labelling, polybagging, bundling, carton prep, pallet prep.',
        'FBM Fulfilment: Same-day pick & pack for Amazon orders.',
        'Amazon Vendor (1P) Support: Retailer-specific prep, pallet config, paperwork.'
      ]
    },
    {
      id: 4,
      title: 'Marketplace Fulfilment (FMS Orders)',
      icon: MarketplaceIcon,
      features: [
        'Fulfilled-by-Merchant support for TikTok Shop, Etsy, Instagram, etc.',
        'Compliance packaging if required.'
      ]
    }
  ];

  return (
    <View className="w-full px-4 py-4 transform -translate-y-10">
      <Text className="font-helvetica font-bold text-3xl lg:text-[54px] lg:leading-[84px] text-black text-center mb-6">
        Core Fulfilment <Text className="text-[#C10016]">Services</Text>
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          flexDirection: 'row',
          paddingHorizontal: isMobile ? 20 : 180,
        }}
      >
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <View 
              key={service.id}
              style={{ marginHorizontal: 12 }} 
              className="w-[300px] lg:w-[350px] min-h-[430px] bg-white border border-[#D9D9D9] rounded-[20px] backdrop-blur-[12.5px] flex-shrink-0 p-8 flex flex-col justify-between"
            >
              <View>
                {/* Icon */}
                <View className="mb-4">
                  <IconComponent />
                </View>
                
                {/* Title */}
                <Text className="font-helvetica font-bold text-[20px] leading-snug text-black">
                  {service.title}
                </Text>
                
                {/* Features */}
                <View className="mt-4 space-y-4">
                  {service.features.map((feature, index) => (
                    <View key={index} className="flex-row items-baseline gap-3">
                      <CheckIcon />
                      <Text className="font-helvetica text-[16px] leading-[22px] text-black flex-1">
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              
              {/* Contact Sales Button */}
              <TouchableOpacity className="flex-row items-center gap-2 mt-6">
                <Text className="font-helvetica font-bold text-[16px] leading-normal text-[#C10016]">
                  Contact Sales
                </Text>
                <ArrowIcon />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
// Import your SVG icons
const GeneralStorageIcon = () => <img src="/gs.svg" alt="General Storage" width={50} height={50} />;
const FoodStorageIcon = () => <img src="/fs.svg" alt="Food Storage" width={50} height={50} />;
const DangerousGoodsIcon = () => <img src="/dg.svg" alt="Dangerous Goods" width={50} height={50} />;
const Arrow = () => <img src="/arrow-dark.svg" alt="Arrow" width={10} height={10} />;
const Check = () => <img src="/check.svg" alt="Check" width={14} height={14} />;

const WarehouseServicesSection = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const services = [
    {
      id: 1,
      title: 'General Storage',
      icon: GeneralStorageIcon,
      features: [
        'Ambient warehousing',
        'Pallet storage Oversized & bulk storage',
        'Live inventory visibility',
        'Cycle counts & stock takes'
      ]
    },
    {
      id: 2,
      title: 'Food Storage',
      icon: FoodStorageIcon,
      features: [
        'Non-perishable food storage',
        'Fully certified under Food Hygiene Standards'
      ]
    },
    {
      id: 3,
      title: 'Dangerous Goods (Light) – Optional Future Offering',
      icon: DangerousGoodsIcon,
      features: [
        'Class 2 (aerosols) & Class 3 (flammable liquids) handling (planned capability)'
      ]
    }
  ];

  return (
    <View className="w-full px-4 py-12">
      {/* Centered container */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: isMobile ? 20 : 365,
        }}
      >
        {/* Inner container with flex row and gap */}
        <View style={{ flexDirection: 'row', gap: 20, paddingHorizontal: 16 }}>
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <View 
                key={service.id} 
                className="w-[300px] lg:w-[350px] min-h-[334px] bg-white/10 border border-[#D9D9D9]/50 rounded-[20px] backdrop-blur-[20px] flex-shrink-0 p-8 flex flex-col justify-between"
              >
                <View>
                  {/* Icon */}
                  <View className="mb-4">
                    <IconComponent />
                  </View>
                  
                  {/* Title */}
                  <Text className="font-helvetica font-bold text-[20px] leading-normal text-black mb-3">
                    {service.title}
                  </Text>
                  
                  {/* Features */}
                  <View className="space-y-2">
                    {service.features.map((feature, index) => (
                      <View key={index} className="flex-row items-baseline gap-3">
                        <Check />
                        <Text className="font-helvetica text-[16px] leading-[22px] text-black flex-1">
                          {feature}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                {/* Contact Sales Button */}
                <TouchableOpacity className="flex-row items-center gap-2 mt-6">
                  <Text className="font-helvetica font-bold text-[16px] leading-normal text-[#C10016]">
                    Contact Sales
                  </Text>
                  <Arrow />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
const ImportExportIcon = () => <img src="/ie.svg" alt="General Storage" width={40} height={40} />;
const PalletTransportIcon = () => <img src="/pht.svg" alt="Food Storage" width={40} height={40} />;
const InternationalShippingIcon = () => <img src="/is.svg" alt="Dangerous Goods" width={40} height={40} />;
const ArrowIco = () => <img src="/arrow-dark.svg" alt="Arrow" width={10} height={10} />;
const CheckIco = () => <img src="/check.svg" alt="Check" width={14} height={14} />;

const LogisticsServicesSection = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const services = [
    {
      id: 1,
      title: 'Import & Export Handling',
      icon: ImportExportIcon,
      imageUrl: '/ie.webp', // Add your image URLs here
      features: [
        'UK import management (port-to-warehouse)',
        'Export shipping to global destinations',
        'Customs documentation support',
        'Container de-stuffing & consolidation',
        'Multi-supplier import consolidation',
        'UAE expansion support with COD options',
        'Importer of Record (IOR) services'
      ]
    },
    {
      id: 2,
      title: 'Pallet Handling & Transport',
      icon: PalletTransportIcon,
      imageUrl: '/ph.webp', // Add your image URLs here
      features: [
        'Pallet collections',
        'Pallet deliveries',
        'Bulk freight handling',
        'Pallet storage'  
      ]
    },
    {
      id: 3,
      title: 'International Shipping',
      icon: InternationalShippingIcon,
      imageUrl: '/is.jpg', // Add your image URLs here
      features: [
        'Lorem Ipsum is simply dummy text',
        'Printing and typesetting industry',
        'Lorem Ipsum is simply dummy text',
        'Printing and typesetting industry',
        'Lorem Ipsum is simply dummy text',
        'Printing and typesetting industry',
        'Lorem Ipsum is simply dummy text'
      ]
    }
  ];

  const Check = CheckIco;
  const Arrow = ArrowIco;

  return (
    <View className="w-full px-4">
      {/* Centered container */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: isMobile ? 20 : 200,
        }}
      >
        {/* Inner container with flex row and gap */}
        <View style={{ flexDirection: 'row', gap: 20 }}>
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <View 
                key={service.id} 
                className="w-[300px] lg:w-[470px] min-h-[550px] lg:min-h-[650px] bg-white/10 border border-[#D9D9D9]/50 rounded-[20px] backdrop-blur-[20px] flex-shrink-0 p-4 lg:p-8 flex flex-col justify-between"
              >
                <View>
                  {/* Image Container with cutting icon */}
                  <View className="relative w-full h-[200px] lg:h-[280px] mb-12 overflow-visible">
                    {/* Image Placeholder - Replace with actual image */}
                    <View className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-[12px] overflow-hidden">
                      <img src={service.imageUrl} className="w-full h-full" style={{ objectFit: 'cover' }} />
                    </View>
                    
                    {/* Icon cutting through bottom-right corner */}
                    <View className="absolute -bottom-10 right-2 lg:right-7 z-10">
                      <View className="w-20 h-20 rounded-full bg-transparent">
                        <View className="w-full h-full rounded-full bg-white p-1">
                          <View className="w-full h-full rounded-full flex items-center justify-center">
                            <IconComponent />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  
                  {/* Title */}
                  <Text className="font-helvetica font-bold text-[20px] leading-normal text-black mb-3">
                    {service.title}
                  </Text>
                  
                  {/* Features */}
                  <View className="space-y-2">
                    {service.features.map((feature, index) => (
                      <View key={index} className="flex-row items-baseline gap-3">
                        <Check />
                        <Text className="font-helvetica text-[16px] leading-[22px] text-black flex-1">
                          {feature}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                {/* Contact Sales Button */}
                <TouchableOpacity className="flex-row items-center gap-2 mt-6">
                  <Text className="font-helvetica font-bold text-[16px] leading-normal text-[#C10016]">
                    Contact Sales
                  </Text>
                  <Arrow />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
const PlatformIntegrationsIcon = () => <img src="/pi.svg" alt="General Storage" width={54} height={54} />;
const ClientReportingIcon = () => <img src="/cr.svg" alt="Food Storage" width={54} height={54} />;
const Arrows = () => <img src="/arrow-dark.svg" alt="Arrow" width={10} height={10} />;
const Checks = () => <img src="/check.svg" alt="Check" width={14} height={14} />;

const TechnologyIntegrationsSection = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const services = [
    {
      id: 1,
      title: 'Platform Integrations',
      icon: PlatformIntegrationsIcon,
      features: [
        'Shopify',
        'WooCommerce',
        'Amazon',
        'TikTok Shop',
        'Etsy',
        'eBay',
        'Custom integrations available'
      ]
    },
    {
      id: 2,
      title: 'Client Reporting',
      icon: ClientReportingIcon,
      features: [
        'Real-time fulfilment dashboards',
        'Inventory reports',
        'Courier performance analytics'
      ]
    },
  ];

  const Check = Checks;
  const Arrow = Arrows;
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const featureIconMap = {
    'Shopify': 0,
    'WooCommerce': 3,
    'Amazon': 1,
    'TikTok Shop': 4,
    'Etsy': 2,
    'eBay': 5,
    'Custom integrations available': null // No icon for this

  }
  return (
    <View className="w-full px-4">
      {/* Centered container */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: isMobile ? 20 : 270,
        }}
      >
        {/* Inner container with flex row and gap */}
        <View style={{ flexDirection: 'row', gap: 20, position: 'relative' }}>
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <View 
                key={service.id} 
                className="w-[300px] lg:w-[620px] min-h-[440px] bg-white/10 border border-[#D9D9D9]/50 rounded-[20px] backdrop-blur-[20px] flex-shrink-0 p-8 flex flex-col justify-between"
              >
                <View>
                  {/* Icon inside card - KEEP THIS */}
                      <View className="w-20 h-20 rounded-full bg-transparent mb-4">
                        <View className="w-full h-full rounded-full bg-white p-1">
                          <View className="w-full h-full rounded-full flex items-center justify-center">
                            <IconComponent />
                          </View>
                        </View>
                      </View>
                  
                  {/* Title */}
                  <Text className="font-helvetica font-bold text-[20px] leading-normal text-black mb-3">
                    {service.title}
                  </Text>
                  
                  {/* Features */}
                  <View className="space-y-2">
                    {service.features.map((feature, index) => (
                      <View key={index} className="flex-row items-baseline gap-3">
                        <Check />
                        <Text className="font-helvetica text-[16px] leading-[22px] text-black flex-1">
                          {feature}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                {/* Contact Sales Button */}
                <TouchableOpacity className="flex-row items-center gap-2 mt-6">
                  <Text className="font-helvetica font-bold text-[16px] leading-normal text-[#C10016]">
                    Contact Sales
                  </Text>
                  <Arrow />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
      
      {/* ADDITIONAL ICON SETS - POSITIONED ABSOLUTELY OUTSIDE */}
      
      {/* Left Icon Set - Group 1160445162 */}
      <View className="hidden lg:block absolute w-[208px] h-[342px] left-[640px] top-1/2 transform -translate-y-1/2">
        {/* Group 1160445156 */}
        <View className="absolute w-[94px] h-[94px] left-[114px] top-0">
          <View className="absolute w-full h-full rounded-full bg-[#D9D9D9] opacity-40" />
          <img src="/shopify.svg" alt="Icon 1" className="absolute w-[48px] h-[48px] left-[23px] top-[23px]" />
        </View>
        
        {/* Group 1160445158 */}
        <View className="absolute w-[94px] h-[94px] left-[114px] top-[114px]">
          <View className="absolute w-full h-full rounded-full bg-[#D9D9D9] opacity-40" />
          <img src="/amazon.svg" alt="Icon 2" className="absolute w-[48px] h-[48px] left-[23px] top-[23px]" />
        </View>
        
        {/* Group 1160445160 */}
        <View className="absolute w-[94px] h-[94px] left-[114px] top-[228px]">
          <View className="absolute w-full h-full rounded-full bg-[#D9D9D9] opacity-40" />
          <img src="/etsy.svg" alt="Icon 3" className="absolute w-[48px] h-[48px] left-[23px] top-[23px]" />
        </View>
        
        {/* Group 1160445157 */}
        <View className="absolute w-[94px] h-[94px] left-0 top-[20px]">
          <View className="absolute w-full h-full rounded-full bg-[#D9D9D9] opacity-40" />
          <img src="/woo.svg" alt="Icon 4" className="absolute w-[48px] h-[48px] left-[23px] top-[23px]" />
        </View>
        
        {/* Group 1160445159 */}
        <View className="absolute w-[94px] h-[94px] left-0 top-[134px]">
          <View className="absolute w-full h-full rounded-full bg-[#D9D9D9] opacity-40" />
          <img src="/tiktok.svg" alt="Icon 5" className="absolute w-[42px] h-[42px] left-[26px] top-[26px]" />
        </View>
        
        {/* Group 1160445161 */}
        <View className="absolute w-[94px] h-[94px] left-0 top-[248px]">
          <View className="absolute w-full h-full rounded-full bg-[#D9D9D9] opacity-40" />
          <img src="/ebay.svg" alt="Icon 6" className="absolute w-[48px] h-[48px] left-[22px] top-[22px]" />
        </View>
      </View>
      
      {/* Right Image - image 82 */}
      <View className="hidden lg:block absolute w-[253px] h-[253px] right-[390px] top-1/2 transform -translate-y-1/2">
        <img src="/r.webp" alt="Right Image" className="w-full h-full" />
      </View>
    </View>
  );
};

export default function ServicesScreen(){
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const testimonials = [
      { image: '/audenza.webp', alt: 'Testimonial 1' },
      { image: '/hot.webp', alt: 'Testimonial 2' },
      { image: '/milk.webp', alt: 'Testimonial 3' },
      { image: '/pops.webp', alt: 'Testimonial 4' },
      { image: '/har.webp', alt: 'Testimonial 5' }
    ];
    const row1Logos = [
        { src: "/amazon.webp", alt: "Amazon" },
        { src: "/shopify.webp", alt: "Shopify" },
        { src: "/tiktok.webp", alt: "TikTok" }
      ];
    
      const row2Logos = [
        { src: "/ebay.webp", alt: "eBay" },
        { src: "/magento.webp", alt: "Magento" },
        { src: "/etsy.webp", alt: "Etsy" },
        { src: "/woo.webp", alt: "WooCommerce" }
      ];
    
      const row3Logos = [
        { src: "/onbuy.webp", alt: "OnBuy" },
        { src: "/dpd.webp", alt: "DPD" },
        { src: "/shipstation.webp", alt: "ShipStation" }
      ];
    
      const nextSlide = () => {
        const nextIndex = (currentSlide + 1) % testimonials.length;
        setCurrentSlide(nextIndex);
        scrollToSlide(nextIndex);
      };
    
      const prevSlide = () => {
        const prevIndex = (currentSlide - 1 + testimonials.length) % testimonials.length;
        setCurrentSlide(prevIndex);
        scrollToSlide(prevIndex);
      };
    
      const scrollToSlide = (index: number) => {
        if (carouselRef.current) {
          const slideWidth = 300 + 32; // 300px width + 32px gap (gap-8)
          carouselRef.current.scrollTo({
            left: index * slideWidth,
            behavior: 'smooth'
          });
        }
      };
      const images = [
          { id: 1, src: '/bike.webp' },
          { id: 2, src: '/wh.webp' },
          { id: 3, src: '/ct.webp' },
          { id: 4, src: '/box.webp' },
          { id: 5, src: '/happy.webp' }
        ];
        useEffect(() => {
        if (isPaused) return;
      
        const interval = setInterval(() => {
          setCurrentSlide((prev) => {
            const nextSlide = prev + 1;
            // Reset to 0 when we reach the end of original images for seamless loop
            return nextSlide >= images.length ? 0 : nextSlide;
          });
        }, 3000);
      
        return () => clearInterval(interval);
      }, [isPaused, images.length]);
          const [activeDot, setActiveDot] = useState(1); // Start with middle dot active
          const [activeReview, setActiveReview] = useState(0);
      
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Services',
          headerShown: false,
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
              src="/bg.webp"
              alt="Background pattern"
              className="w-full h-full lg:h-[600px] object-cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-screen flex items-center justify-center pb-20">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-6xl lg:text-[84px] leading-[84px] text-black text-center mb-8">
              Services
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Services
              </Text>
            </View>
          </View>
        </View>
   
   {/* Marquee Text with Colored Words and Separator Circles */}
  <div className="relative overflow-hidden whitespace-nowrap py-4 -mt-24 md:-mt-40 lg:-mt-56">
    <div className="animate-marquee text-[28px] md:text-[40px] font-bold tracking-tight flex items-center mb-12 gap-16 md:gap-24 text-black">
      {/* First set */}
      <div className="flex items-center gap-16 md:gap-24">
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>

        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
      </div>

      {/* Duplicated for seamless animation */}
      <div className="flex items-center gap-16 md:gap-24">
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
      </div>
      <div className="flex items-center gap-16 md:gap-24">
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
      </div>
      <div className="flex items-center gap-16 md:gap-24">
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
        
        <span className="flex items-center gap-2">
          <span className="text-black">Ship</span>
          <span className="text-[#C10016]">Happens</span>
        </span>
        <div className="w-6 h-6 rounded-full border-2 border-black bg-transparent"></div>
      </div>
    </div>
  </div>
  
  {/* Core Fulfilment Services Section */}
  <FulfillmentServicesSection />
  {/* Warehouse Section */}
<View className="relative py-20"> {/* Add vertical padding */}
  {/* PNG Background */}
  <View className="absolute inset-0 z-0">
    <img 
      src="/bg.webp"
      alt="Background pattern"
      className="w-full h-full object-cover" /* Change to full width/height */
    />
  </View>
  <Text className="font-helvetica font-bold text-3xl lg:text-[54px] lg:leading-[84px] text-black text-center relative z-10">
    Warehouse & Storage <Text className="text-[#C10016]">Services</Text>
  </Text>
  <WarehouseServicesSection/>
</View>
<section className="relative w-full h-auto min-h-[916px] overflow-hidden py-20 lg:py-0">
  {/* Background with overlay */}
  <div 
    className="absolute inset-0 bg-black/65"
    style={{
      backgroundImage: `url('/vas.webp')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: 'scaleX(-1)'
    }}
  />

  {/* Title lowered slightly */}
  <div className="relative lg:absolute lg:top-32 w-full text-center text-white mb-12 lg:mb-0">
    <h2 className="text-4xl lg:text-[64px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em]">
      Value Added <span className='text-[#C10016]'>Services (VAS)</span>
    </h2>
  </div>

  {/* Grid moved slightly upward + reduced spacing */}
  <div className="relative lg:absolute lg:bottom-[150px] lg:left-1/2 lg:-translate-x-1/2 flex flex-col lg:flex-row gap-[20px] items-center">

    {[
      { 
        line1:"Kitting", 
        line2:"& Assembly",
        img: "/shiphappens1.webp", 
        logo:"/k.svg",
        features: [
          "Custom product bundling",
          "Multi-SKU assembly",
          "Promotional packaging",
          "Retail-ready kits"
        ]
      },
      { 
        line1:"Quality Control", 
        line2: "(QC)",
        img: "/qc.webp", 
        logo: "/q.svg",
        features: [
          "Inspection & verification",
          "Product sampling",
          "Defect analysis",
          "Compliance checks"
        ]
      },
      {
        line1:"Recommence",
        line2:"Services",
        img: "/shiphappens3.webp", 
        logo: "/r.svg",
        features: [
          "Returns processing",
          "Product refurbishment",
          "Quality inspection",
          "Restocking services"
        ]
      },
      { 
        line1: "Product", 
        line2: "Personalisation", 
        img: "/shiphappens4.webp", 
        logo: "/p.svg",
        features: [
          "Custom engraving",
          "Laser etching",
          "Branded packaging",
          "Gift message inserts"
        ]
      },
    ].map((item, i) => (
      <div key={i} className="relative h-[480px] w-[250px] group overflow-hidden">
        {/* Divider line left of each except first */}
        {i !== 0 && <div className="hidden lg:block absolute -left-0 top-0 h-full w-px bg-white/30" />}

        {/* Background blurred image */}
        <div 
          className="absolute inset-0 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:blur-none group-hover:scale-105 blur-sm scale-100"
          style={{
            backgroundImage: `url(${item.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Logo at top - Aligned left */}
        <div className="flex justify-start translate-x-4 translate-y-32">
          <img 
            src={item.logo}
            alt={`${item.line1} ${item.line2} Logo`}
            className="w-12 h-12"
          />
        </div>
        
        {/* Title */}
        <h3 className="absolute left-4 bottom-52 text-white font-normal text-[24px] tracking-[-0.01em] whitespace-nowrap">
          {item.line1}<br />{item.line2}
        </h3>

        {/* Features - Hidden by default, shows on hover */}
        <div className="absolute left-4 top-[280px] w-[220px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.features.map((feature, index) => (
            <div key={index} className="flex items-baseline gap-2 mb-3">
              <img 
                src="/checkw.svg" 
                alt="Check" 
                className="w-4 h-4 flex-shrink-0"
              />
              <span className="text-white text-[16px] leading-[22px]">
                {feature}
              </span>
            </div>
          ))}
        </div>
        <button 
  className="absolute left-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 cursor-pointer"
  onClick={() => {
    // Add your click handler here
    console.log(`Contact Sales for ${item.line1} ${item.line2}`);
  }}
>
  <span className="text-white font-bold text-[16px] leading-normal">
    Contact Sales
  </span>
  <img 
    src="/arrow.svg" 
    alt="Arrow" 
    className="w-3 h-3"
  />
</button>
      </div>
    ))}
  </div>
</section>
{/* Logistics Section */}
<View className="relative py-20"> {/* Add vertical padding */}
  {/* PNG Background */}
  <View className="absolute inset-0 z-0">
    <img 
      src="/bg.webp"
      alt="Background pattern"
      className="w-full h-full object-cover" /* Change to full width/height */
    />
  </View>
  <Text className="font-helvetica font-bold text-3xl lg:text-[54px] lg:leading-[84px] text-black text-center relative z-10 transform -translate-y-10">
    Logistics, Frieght & <Text className="text-[#C10016]">International</Text>
  </Text>
  <LogisticsServicesSection/>
</View>
{}{/* Technology & Integrations Section */}
<View className="relative py-20"> {/* Add vertical padding */}
  <Text className="font-helvetica font-bold text-3xl lg:text-[54px] lg:leading-[84px] text-black text-center relative z-10 transform -translate-y-8">
    Technology & <Text className="text-[#C10016]">Integrations</Text>
  </Text>
  <TechnologyIntegrationsSection/>
</View>
<section className="relative w-full h-auto min-h-[916px] overflow-hidden py-20 lg:py-0">
  {/* Background with overlay */}
  <div 
    className="absolute inset-0 bg-black/65"
    style={{
      backgroundImage: `url('/bcs.webp')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: 'scaleX(-1)'
    }}
  />
  {/* Title lowered slightly */}
  <div className="relative lg:absolute lg:top-32 w-full text-center text-white mb-12 lg:mb-0">
    <h2 className="text-4xl lg:text-[64px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em]">
      Brand & Creative <span className='text-[#C10016]'>Services</span>
    </h2>
  </div>

  {/* Grid moved slightly upward + reduced spacing */}
  <div className="relative lg:absolute lg:bottom-[150px] lg:left-1/2 lg:-translate-x-1/2 flex flex-col lg:flex-row gap-[20px] items-center">

    {[
      { 
        line1:"Content", 
        line2:"Creation",
        img: "/shiphappens1.webp", 
        logo:"/cc.svg",
        features: [
          "Product photography",
          "Lifestyle shoots",
          "Short-form video content",
          "Editing, retouching, creative direction"
        ]
      },
      { 
        line1:"Brand Launch &", 
        line2: "Growth Support",
        img: "/blgs.webp", 
        logo: "/blgs.svg",
        features: [
          "Shopify store setup (basic)",
          "Packaging coordination",
          "Logistic planning",
          "International expansion scaling support"
        ]
      },
      {
        line1:"Custom Packaging",
        line2:"Supply",
        img: "/shiphappens3.webp", 
        logo: "/r.svg",
        features: [
          "Branded boxes",
          "Stickers",
          "Tissue papers",
          "Bulk ordering options for clients"
        ]
      },
    ].map((item, i) => (
      <div key={i} className="relative h-[480px] w-[250px] group overflow-hidden">
        {/* Divider line left of each except first */}
        {i !== 0 && <div className="hidden lg:block absolute -left-0 top-0 h-full w-px bg-white/30" />}

        {/* Background blurred image */}
        <div 
          className="absolute inset-0 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:blur-none group-hover:scale-105 blur-sm scale-100"
          style={{
            backgroundImage: `url(${item.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Logo at top - Aligned left */}
        <div className="flex justify-start translate-x-4 translate-y-32">
          <img 
            src={item.logo}
            alt={`${item.line1} ${item.line2} Logo`}
            className="w-12 h-12"
          />
        </div>
        
        {/* Title */}
        <h3 className="absolute left-4 bottom-52 text-white font-normal text-[24px] tracking-[-0.01em] whitespace-nowrap">
          {item.line1}<br />{item.line2}
        </h3>

        {/* Features - Hidden by default, shows on hover */}
        <div className="absolute left-4 top-[280px] w-[220px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.features.map((feature, index) => (
            <div key={index} className="flex items-baseline gap-2 mb-3">
              <img 
                src="/checkw.svg" 
                alt="Check" 
                className="w-4 h-4 flex-shrink-0"
              />
              <span className="text-white text-[16px] leading-[22px]">
                {feature}
              </span>
            </div>
          ))}
        </div>
        <button 
  className="absolute left-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 cursor-pointer"
  onClick={() => {
    // Add your click handler here
    console.log(`Contact Sales for ${item.line1} ${item.line2}`);
  }}
>
  <span className="text-white font-bold text-[16px] leading-normal">
    Contact Sales
  </span>
  <img 
    src="/arrow.svg" 
    alt="Arrow" 
    className="w-3 h-3"
  />
</button>
      </div>
    ))}
  </div>
</section>
  <section className="relative w-full min-h-[800px] py-20">
  {/* Background with Linear Gradient */}
  <div 
    className="absolute inset-0 w-full h-full"
    style={{
      background: `
        linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
        linear-gradient(0deg, #C10016, #C10016),
        url(/leadingbrands.webp)
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'normal, hue, normal'
    }}
  >
  </div>

  {/* Content */}
  <div className="relative max-w-[1300px] mx-auto px-4 z-10">
    
    {/* "We integrate with" Badge */}
    <div className="flex justify-center">
      <div className="w-[280px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] flex items-center justify-center">
        <span className="font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
          We integrate with
        </span>
      </div>
    </div>

    {/* Main Heading */}
    <h2 className="text-center font-bold text-4xl lg:text-[74px] leading-tight lg:leading-[80px] tracking-tight text-white mt-8 lg:mt-16">
      Leading Brands...
    </h2>

<div className="w-full overflow-hidden py-10">
  {/* First Row - Scroll Left */}
<div className="mt-20 slider-container">
  <div className="flex animate-infinite-scroll">
    {[...row1Logos, ...row1Logos].map((logo, index) => (
      <div key={index} className="group relative flex-shrink-0 mx-8 lg:mx-16">
        <div className="w-[240px] h-[100px] rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-transparent hover:scale-105">
          <img 
            src={logo.src}
            alt={logo.alt}
            className="h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    ))}
  </div>
</div>

{/* Second Row - Scroll Right */}
<div className="mt-12 slider-container">
  <div className="flex animate-infinite-scroll-reverse">
    {[...row2Logos, ...row2Logos].map((logo, index) => (
      <div key={index} className="group relative flex-shrink-0 mx-8 lg:mx-16">
        <div className="w-[200px] h-[80px] rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-transparent hover:scale-105">
          <img 
            src={logo.src}
            alt={logo.alt}
            className="h-14 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    ))}
  </div>
</div>

{/* Third Row - Scroll Left */}
<div className="mt-12 slider-container">
  <div className="flex animate-infinite-scroll">
    {[...row3Logos, ...row3Logos].map((logo, index) => (
      <div key={index} className="group relative flex-shrink-0 mx-8 lg:mx-16">
        <div className="w-[240px] h-[100px] rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-transparent hover:scale-105">
          <img 
            src={logo.src}
            alt={logo.alt}
            className="h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    ))}
  </div>
</div>
</div>

  </div>
  <div className="relative max-w-[1490px] mx-auto px-4 pt-24 z-10">
    
    {/* "our partners" Badge */}
    <div className="flex justify-start">
      <div className="w-[220px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] flex items-center justify-center">
        <span className="font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
          our partners
        </span>
      </div>
    </div>

    {/* Main Heading */}
    <h2 className="text-left font-bold text-3xl lg:text-[64px] leading-tight lg:leading-[80px] tracking-tight text-white mt-8 lg:mt-16 max-w-[960px]">
      Meet the people we make happy
    </h2>

    {/* Navigation Arrows - Aligned with badge and heading */}
    <div className="relative mt-4 lg:absolute lg:right-4 lg:top-24 flex gap-4 justify-end lg:justify-start">
      {/* Left Arrow */}
      <button 
        onClick={prevSlide}
        className="w-[56px] h-[56px] bg-[rgba(193,0,22,0.1)] rounded-full flex items-center justify-center hover:bg-[#C10016] transition-colors duration-300 group"
      >
        <img src="/next.svg" alt="Previous" className="w-4 h-4 transform rotate-180" />
      </button>

      {/* Right Arrow */}
      <button 
        onClick={nextSlide}
        className="w-[56px] h-[56px] bg-[rgba(193,0,22,0.1)] rounded-full flex items-center justify-center hover:bg-[rgba(193,0,22,0.8)] transition-colors duration-300"
      >
        <img src="/next.svg" alt="Next" className="w-4 h-4" />
      </button>
    </div>

    {/* Working Testimonial Cards Carousel */}
    <div className="relative mt-8">
      <div 
        ref={carouselRef}
        className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className={`min-w-[300px] h-[220px] bg-cover bg-center rounded-[24px] flex-shrink-0 transition-all duration-500 ${
              index === currentSlide ? 'scale-105 opacity-100 shadow-2xl' : 'scale-95 opacity-70'
            }`}
            style={{backgroundImage: `url(${testimonial.image})`}}
          >
            {/* You can add overlay content here */}
          </div>
        ))}
      </div>
    </div>

  </div>
</section>
<section className="relative w-full">
  {/* Two Column Layout */}
  <div className="flex flex-col lg:flex-row">
    
    {/* Left Section - White Background */}
    <div className="w-full lg:w-1/2 bg-white relative min-h-[400px] lg:min-h-[520px] flex items-center justify-center py-12 lg:py-0">
      <img src="/bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
      {/* Left Section Content - Centered */}
      <div className="max-w-[740px] w-full text-center px-8">
        
        {/* Heading */}
        <h2 className="font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] tracking-tight text-black mb-8">
          Our Accomplishments
        </h2>

        {/* Red Line - Centered */}
        <div className="w-[100px] h-[1px] bg-[#C10016] mx-auto mb-12"></div>

        {/* Image Grid - Centered */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mb-12">
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award1.webp)'}}></div>
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award2.webp)'}}></div>
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award3.webp)'}}></div>
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award4.webp)'}}></div>
          <div className="w-[84px] h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award5.webp)'}}></div>
        </div>

      </div>
    </div>

    {/* Right Section - Red Background */}
    <div className="w-full lg:w-1/2 bg-[#DA192F] relative min-h-[400px] lg:min-h-[520px] flex items-center justify-center py-12 lg:py-0">
      {/* Right Section Content - Centered */}
      <div className="max-w-[650px] w-full text-center px-8">
        
        {/* Heading */}
        <h2 className="font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] tracking-tight text-white mb-8">
          Advanced Tech Solutions
        </h2>

        {/* White Line - Centered */}
        <div className="w-[100px] h-[1px] bg-white mx-auto mb-12"></div>

        {/* Subtitle - Centered */}
        <p className="font-normal text-xl lg:text-[24px] leading-relaxed lg:leading-[44px] text-white mb-12">
          Exceptional Quality Service
        </p>

        {/* CTA Button - Centered */}
        <button className="border border-white rounded-[6px] flex items-center justify-center gap-[10px] px-8 py-4 transition-colors duration-300 mx-auto">
          <span className="text-white font-bold text-[18px] leading-[36px]">Let&apos;s Talk</span>
          <img src="/arrow.svg" alt="arrow" className="w-4 h-4 object-contain" />
        </button>

      </div>
    </div>

  </div>
</section>
        <Footer/>
      </ScrollView>
    </>
  );
}
