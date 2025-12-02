import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Import SVG icons (make sure these files exist in your assets folder)
// If using Expo web, you can use regular img tags for SVG files
const D2CIcon = () => <img src="/d2c.svg" alt="D2C Icon" width={60} height={60} />;
const B2BIcon = () => <img src="/b2b.svg" alt="B2B Icon" width={60} height={60} />;
const AmazonIcon = () => <img src="/amf.svg" alt="Amazon Icon" width={58} height={60} />;
const MarketplaceIcon = () => <img src="/fms.svg" alt="Marketplace Icon" width={60} height={60} />;
const ArrowIcon = () => <img src="/arrow-dark.svg" alt="Arrow" width={10} height={10} />;
const CheckIcon = () => <img src="/check.svg" alt="Check" width={14} height={14} />;

const FulfillmentServicesSection = () => {
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
      <Text className="font-helvetica font-bold text-[54px] leading-[84px] text-black text-center mb-6">
        Core Fulfilment <Text className="text-[#C10016]">Services</Text>
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          flexDirection: 'row',
          paddingHorizontal: 180,
        }}
      >
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <View 
              key={service.id}
              style={{ marginHorizontal: 12 }} 
              className="w-[350px] h-[430px] bg-white border border-[#D9D9D9] rounded-[20px] backdrop-blur-[12.5px] flex-shrink-0 p-8 flex flex-col"
            >
              {/* Icon */}
              <View className="mb-4">
                <IconComponent />
              </View>
              
              {/* Title - FIXED: removed leading-[74px] */}
              <Text className="font-helvetica font-bold text-[20px] leading-snug text-black">
                {service.title}
              </Text>
              
              {/* Features */}
              <View className="mt-4 space-y-4 flex-1">
                {service.features.map((feature, index) => (
                  <View key={index} className="flex-row items-baseline gap-3">
                    <CheckIcon />
                    <Text className="font-helvetica text-[16px] leading-[22px] text-black flex-1">
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
              
              {/* Contact Sales Button */}
              <TouchableOpacity className="flex-row items-center gap-2 translate-y-6">
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
          paddingHorizontal: 365,
        }}
      >
        {/* Inner container with flex row and gap */}
        <View style={{ flexDirection: 'row', gap: 20, paddingHorizontal: 16 }}>
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <View 
                key={service.id} 
                className="w-[350px] h-[334px] bg-white/10 border border-[#D9D9D9]/50 rounded-[20px] backdrop-blur-[20px] flex-shrink-0 p-8 flex flex-col"
              >
                {/* Icon */}
                <View className="mb-4">
                  <IconComponent />
                </View>
                
                {/* Title */}
                <Text className="font-helvetica font-bold text-[20px] leading-normal text-black mb-3">
                  {service.title}
                </Text>
                
                {/* Features */}
                <View className="space-y-2 flex-1">
                  {service.features.map((feature, index) => (
                    <View key={index} className="flex-row items-baseline gap-3">
                      <Check />
                      <Text className="font-helvetica text-[16px] leading-[22px] text-black">
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
                
                {/* Contact Sales Button */}
                <TouchableOpacity className="flex-row items-center gap-2 translate-y-6">
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

export default function ServicesScreen(){
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const testimonials = [
      { image: '/audenza.png', alt: 'Testimonial 1' },
      { image: '/hot.png', alt: 'Testimonial 2' },
      { image: '/milk.png', alt: 'Testimonial 3' },
      { image: '/pops.png', alt: 'Testimonial 4' },
      { image: '/har.png', alt: 'Testimonial 5' }
    ];
    const row1Logos = [
        { src: "/amazon.png", alt: "Amazon" },
        { src: "/shopify.png", alt: "Shopify" },
        { src: "/tiktok.png", alt: "TikTok" }
      ];
    
      const row2Logos = [
        { src: "/ebay.png", alt: "eBay" },
        { src: "/magento.png", alt: "Magento" },
        { src: "/etsy.png", alt: "Etsy" },
        { src: "/woo.png", alt: "WooCommerce" }
      ];
    
      const row3Logos = [
        { src: "/onbuy.png", alt: "OnBuy" },
        { src: "/dpd.png", alt: "DPD" },
        { src: "/shipstation.png", alt: "ShipStation" }
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
          { id: 1, src: '/bike.png' },
          { id: 2, src: '/wh.png' },
          { id: 3, src: '/ct.png' },
          { id: 4, src: '/box.png' },
          { id: 5, src: '/happy.png' }
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
              src="/bg.png"
              alt="Background pattern"
              className="w-[1920px] h-[600px] object-cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-screen flex items-center justify-center pb-20">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-[84px] leading-[84px] text-black text-center mb-8">
              Services
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-[20px] leading-[40px] text-[#C10016]">
                Services
              </Text>
            </View>
          </View>
        </View>
   
   {/* Marquee Text with Colored Words and Separator Circles */}
  <div className="relative overflow-hidden whitespace-nowrap py-4 -mt-56">
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
      src="/bg.png"
      alt="Background pattern"
      className="w-full h-full object-cover" /* Change to full width/height */
    />
  </View>
  <Text className="font-helvetica font-bold text-[54px] leading-[84px] text-black text-center relative z-10">
    Warehouse & Storage <Text className="text-[#C10016]">Services</Text>
  </Text>
  <WarehouseServicesSection/>
</View>
<section className="relative w-full h-[916px] overflow-hidden">
  {/* Background with overlay */}
  <div 
    className="absolute inset-0 bg-black/65"
    style={{
      backgroundImage: `url('/vas.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: 'scaleX(-1)'
    }}
  />

  {/* Title lowered slightly */}
  <div className="absolute top-32 w-full text-center text-white">
    <h2 className="text-[64px] font-bold leading-[80px] tracking-[-0.01em]">
      Value Added <span className='text-[#C10016]'>Services (VAS)</span>
    </h2>
  </div>

  {/* Grid moved slightly upward + reduced spacing */}
  <div className="absolute bottom-[150px] left-1/2 -translate-x-1/2 flex gap-[20px]">

    {[
      { 
        line1:"Kitting", 
        line2:"& Assembly",
        img: "/shiphappens1.png", 
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
        img: "/qc.png", 
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
        img: "/shiphappens3.png", 
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
        img: "/shiphappens4.png", 
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
        {i !== 0 && <div className="absolute -left-0 top-0 h-full w-px bg-white/30" />}

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
<section className="relative w-full h-[916px] overflow-hidden">
  {/* Background with overlay */}
  <div 
    className="absolute inset-0 bg-black/65"
    style={{
      backgroundImage: `url('/bcs.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: 'scaleX(-1)'
    }}
  />

  {/* Title lowered slightly */}
  <div className="absolute top-32 w-full text-center text-white">
    <h2 className="text-[64px] font-bold leading-[80px] tracking-[-0.01em]">
      Brand & Creative <span className='text-[#C10016]'>Services</span>
    </h2>
  </div>

  {/* Grid moved slightly upward + reduced spacing */}
  <div className="absolute bottom-[150px] left-1/2 -translate-x-1/2 flex gap-[20px]">

    {[
      { 
        line1:"Content", 
        line2:"Creation",
        img: "/shiphappens1.png", 
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
        img: "/blgs.png", 
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
        img: "/shiphappens3.png", 
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
        {i !== 0 && <div className="absolute -left-0 top-0 h-full w-px bg-white/30" />}

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
        url(/leadingbrands.png)
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
    <h2 className="text-center font-bold text-[74px] leading-[80px] tracking-tight text-white mt-16">
      Leading Brands...
    </h2>

<div className="w-full overflow-hidden py-10">
  {/* First Row - Scroll Left */}
<div className="mt-20 slider-container">
  <div className="flex animate-infinite-scroll">
    {[...row1Logos, ...row1Logos].map((logo, index) => (
      <div key={index} className="group relative flex-shrink-0 mx-16">
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
      <div key={index} className="group relative flex-shrink-0 mx-16">
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
      <div key={index} className="group relative flex-shrink-0 mx-16">
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
    <h2 className="text-left font-bold text-[64px] leading-[80px] tracking-tight text-white mt-16 max-w-[960px]">
      Meet the people we make happy
    </h2>

    {/* Navigation Arrows - Aligned with badge and heading */}
    <div className="absolute right-4 top-24 flex gap-4">
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
        <Footer/>
      </ScrollView>
    </>
  );
}