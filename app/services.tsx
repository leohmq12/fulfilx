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
  
  // Transform the services data to match VAS structure
  const fulfillmentServicesItems = [
    {
      title: ['D2C', 'Fulfilment'],
      img: '/shiphappens1.jpg', // Reusing existing VAS image
      logo: '/d2c.svg',
      features: [
        'Direct-to-consumer pick, pack & dispatch.',
        'Same-day dispatch cut-off options.',
        'Branded packaging, inserts, gift notes.',
        'Order tracking and customer notifications.'
      ]
    },
    {
      title: ['B2B', 'Fulfilment'],
      img: '/qc.webp', // Reusing existing VAS image
      logo: '/b2b.svg',
      features: [
        'Bulk & palletised shipments',
        'Retail-compliant carton & pallet prep',
        'ASN / EDI support',
        'Wholesale distribution fulfilment - Argos, Currys, Harrods, Selfridges, QVC, Macy\'s, Bloomingdale\'s, Nordstrom, Costco, Saks Fifth Avenue, Fenwick, Pets at Home, Sephora'
      ]
    },
    {
      title: ['Amazon', 'Fulfilment'],
      img: '/shiphappens3.webp', // Reusing existing VAS image
      logo: '/amf.svg',
      features: [
        'FBA Prep: Labelling, polybagging, bundling, carton prep, pallet prep.',
        'FBM Fulfilment: Same-day pick & pack for Amazon orders.',
        'Amazon Vendor (1P) Support: Retailer-specific prep, pallet config, paperwork.'
      ]
    },
    {
      title: ['Marketplace', 'Fulfilment'],
      img: '/shiphappens4.webp', // Reusing existing VAS image
      logo: '/fms.svg',
      features: [
        'Fulfilled-by-Merchant support for TikTok Shop, Etsy, Instagram, etc.',
        'Compliance packaging if required.'
      ]
    }
  ];

  // Add state management for active service
  const [activeFulfillmentIndex, setActiveFulfillmentIndex] = useState(0);
  const [fulfillmentPrevIndex, setFulfillmentPrevIndex] = useState<number | null>(null);
  const fulfillmentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (fulfillmentTimerRef.current) clearTimeout(fulfillmentTimerRef.current);
    };
  }, []);

  const activateFulfillment = (index: number) => {
    if (index === activeFulfillmentIndex) return;
    if (fulfillmentTimerRef.current) clearTimeout(fulfillmentTimerRef.current);
    setFulfillmentPrevIndex(activeFulfillmentIndex);
    setActiveFulfillmentIndex(index);
    fulfillmentTimerRef.current = setTimeout(() => {
      setFulfillmentPrevIndex(null);
    }, 750);
  };

  return (
    <section className="relative w-full h-auto py-14 lg:py-16 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/65"
        style={{
          backgroundImage: `url('/vas.webp')`, // Reusing existing VAS background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scaleX(-1)'
        }}
      />

      <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 2xl:px-12 py-10 lg:py-12">
        <div className="mx-auto w-full max-w-[1490px]">
          <style>{`
            @keyframes servicesSlideIn {
              0% { opacity: 0; transform: translateX(-36px); }
              100% { opacity: 1; transform: translateX(0); }
            }
          `}</style>

          <h2 className="text-center text-white text-4xl lg:text-[64px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em]">
            Core Fulfilment <span className="text-[#C10016]">Services</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-1">
              <div className="flex flex-col gap-3">
                {fulfillmentServicesItems.map((item, i) => {
                  const isActive = i === activeFulfillmentIndex;
                  return (
                    <button
                      key={item.title.join(' ')}
                      type="button"
                      onMouseEnter={() => activateFulfillment(i)}
                      onFocus={() => activateFulfillment(i)}
                      onClick={() => activateFulfillment(i)}
                      className={[
                        "w-full flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition",
                        "bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/35",
                        isActive ? "bg-white/12 border-white/45" : "",
                      ].join(" ")}
                    >
                      <img src={item.logo} alt="" className="w-10 h-10 shrink-0" />
                      <span className="flex-1 text-white font-normal text-[20px] lg:text-[22px] leading-tight">
                        <span className="block">{item.title[0]}</span>
                        <span className="block">{item.title[1]}</span>
                      </span>
                      <img
                        src="/arrow.svg"
                        alt="arrow"
                        className={[
                          "w-5 h-5 object-contain opacity-70 transition",
                          isActive ? "opacity-100 translate-x-0.5" : "",
                        ].join(" ")}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="relative w-full h-[320px] sm:h-[420px] lg:h-full rounded-2xl overflow-hidden border border-white/15 bg-black/20">
                {fulfillmentPrevIndex !== null && (
                  <img
                    src={fulfillmentServicesItems[fulfillmentPrevIndex]?.img}
                    alt={fulfillmentServicesItems[fulfillmentPrevIndex]?.title.join(' ')}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <img
                  key={`${activeFulfillmentIndex}-${fulfillmentServicesItems[activeFulfillmentIndex]?.img}`}
                  src={fulfillmentServicesItems[activeFulfillmentIndex]?.img}
                  alt={fulfillmentServicesItems[activeFulfillmentIndex]?.title.join(' ')}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  style={{ animation: 'servicesSlideIn 750ms cubic-bezier(0.22, 1, 0.36, 1)', willChange: 'transform' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute left-6 bottom-6 right-6 z-20">
                  <div className="text-white font-normal text-2xl lg:text-[32px] tracking-[-0.01em]">
                    {fulfillmentServicesItems[activeFulfillmentIndex]?.title[0]} {fulfillmentServicesItems[activeFulfillmentIndex]?.title[1]}
                  </div>
                  <div className="mt-6 space-y-3 max-w-[560px]">
                    {(fulfillmentServicesItems[activeFulfillmentIndex]?.features ?? []).map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <img src="/checkw.svg" alt="Check" className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span className="text-white text-[16px] leading-[22px]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button className="flex items-center gap-3 bg-[#C10016] text-white px-8 py-4 rounded-md font-bold text-[18px]">
              Contact Sales
              <img src="/arrow.svg" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
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
      <View className="flex-row flex-wrap justify-center gap-6 px-5 lg:px-20">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <View 
                key={service.id} 
                className="w-[300px] lg:w-[350px] min-h-[334px] bg-white/10 border border-[#D9D9D9]/50 rounded-[20px] backdrop-blur-[20px] p-8 flex flex-col justify-between"
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
                <TouchableOpacity className="flex-row items-center gap-2 mt-6 relative z-10">
                  <Text className="font-helvetica font-bold text-[16px] leading-normal text-[#C10016]">
                    Contact Sales
                  </Text>
                  <Arrow />
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
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
        'DDU',
        'DDP',
        'IOR Globally',
        'EOR Globally',
        'Hazardous Goods',
        'IOSS/Non IOSS',
        'USA taxes & Duties'
      ]
    }
  ];

  const Check = CheckIco;
  const Arrow = ArrowIco;

  return (
    <View className="w-full px-4 relative">
      {/* Centered container */}
      <View className="flex-row flex-wrap justify-center gap-6 px-5 lg:px-20">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <View 
                key={service.id} 
                className="w-[300px] lg:w-[470px] min-h-[550px] lg:min-h-[650px] bg-white/10 border border-[#D9D9D9]/50 rounded-[20px] backdrop-blur-[20px] p-4 lg:p-8 flex flex-col justify-between"
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
      <View className="flex-row flex-wrap justify-center gap-6 px-5 lg:px-20">
          {services.map((service) => {
            const IconComponent = service.icon;
            const cardClassName =
              service.id === 1 || service.id === 2
                ? "w-[300px] lg:w-[500px] min-h-[440px] bg-white/10 border border-[#D9D9D9]/50 rounded-[20px] backdrop-blur-[20px] p-8 flex flex-col justify-between relative overflow-hidden lg:pr-[240px]"
                : "w-[300px] lg:w-[500px] min-h-[440px] bg-white/10 border border-[#D9D9D9]/50 rounded-[20px] backdrop-blur-[20px] p-8 flex flex-col justify-between relative overflow-hidden";
            return (
              <View 
                key={service.id} 
                className={cardClassName}
              >
                <View className="relative z-10">
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

                {service.id === 2 && (
                  <View className="hidden lg:block absolute w-[200px] h-[200px] right-8 top-1/2 transform -translate-y-1/2 z-0">
                    <img src="/r.webp" alt="Right Image" className="w-full h-full object-contain" />
                  </View>
                )}

                {service.id === 1 && (
                  <View className="hidden lg:block absolute w-[175px] h-[285px] right-8 top-1/2 transform -translate-y-1/2 z-0">
                    {/* Group 1160445156 */}
                    <View className="absolute w-[80px] h-[80px] left-[95px] top-0 group">
                      <View className="absolute w-full h-full rounded-full bg-[#D9D9D9] opacity-40 group-hover:bg-[#C10016] group-hover:opacity-100 transition-colors duration-300" />
                      <img src="/shopify.svg" alt="Icon 1" className="absolute w-[45px] h-[45px] left-[17.5px] top-[17.5px]" />
                    </View>
                    
                    {/* Group 1160445158 */}
                    <View className="absolute w-[80px] h-[80px] left-[95px] top-[95px] group">
                      <View className="absolute w-full h-full rounded-full bg-[#D9D9D9] opacity-40 group-hover:bg-[#C10016] group-hover:opacity-100 transition-colors duration-300" />
                      <img src="/amazon.svg" alt="Icon 2" className="absolute w-[45px] h-[45px] left-[17.5px] top-[17.5px]" />
                    </View>
                    
                    {/* Group 1160445160 */}
                    <View className="absolute w-[80px] h-[80px] left-[95px] top-[190px] group">
                      <View className="absolute w-full h-full rounded-full bg-[#D9D9D9] opacity-40 group-hover:bg-[#C10016] group-hover:opacity-100 transition-colors duration-300" />
                      <img src="/etsy.svg" alt="Icon 3" className="absolute w-[45px] h-[45px] left-[17.5px] top-[17.5px]" />
                    </View>
                    
                    {/* Group 1160445157 */}
                    <View className="absolute w-[80px] h-[80px] left-0 top-[15px] group">
                      <View className="absolute w-full h-full rounded-full bg-[#D9D9D9] opacity-40 group-hover:bg-[#C10016] group-hover:opacity-100 transition-colors duration-300" />
                      <img src="/woo.svg" alt="Icon 4" className="absolute w-[45px] h-[45px] left-[17.5px] top-[17.5px]" />
                    </View>
                    
                    {/* Group 1160445159 */}
                    <View className="absolute w-[80px] h-[80px] left-0 top-[110px] group">
                      <View className="absolute w-full h-full rounded-full bg-[#D9D9D9] opacity-40 group-hover:bg-[#C10016] group-hover:opacity-100 transition-colors duration-300" />
                      <img src="/tiktok.svg" alt="Icon 5" className="absolute w-[39px] h-[39px] left-[20.5px] top-[20.5px]" />
                    </View>
                    
                    {/* Group 1160445161 */}
                    <View className="absolute w-[80px] h-[80px] left-0 top-[205px] group">
                      <View className="absolute w-full h-full rounded-full bg-[#D9D9D9] opacity-40 group-hover:bg-[#C10016] group-hover:opacity-100 transition-colors duration-300" />
                      <img src="/ebay.svg" alt="Icon 6" className="absolute w-[45px] h-[45px] left-[17.5px] top-[17.5px]" />
                    </View>
                  </View>
                )}
              </View>
            );
          })}
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
     { image: '/Amazon.png', alt: 'Testimonial 1' },
  { image: '/Argos-Logo.png', alt: 'Testimonial 2' },
  { image: '/bloomingdales-logo.png', alt: 'Testimonial 3' },
  { image: '/Boots.png', alt: 'Testimonial 4' },
  { image: '/Costco_Wholesale.png', alt: 'Testimonial 5' }, 
  { image: '/Currys.png', alt: 'Testimonial 5' },
  { image: '/Fenwick.png', alt: 'Testimonial 5' },
  { image: '/Harrods.png', alt: 'Testimonial 5' },
  { image: '/Nordstrom.png', alt: 'Testimonial 5' },
  { image: '/PetsAtHome.png', alt: 'Testimonial 5' },
  { image: '/QVC.png', alt: 'Testimonial 5' },
  { image: '/Saks_Fifth_Avenue.png', alt: 'Testimonial 5' },
  { image: '/Selfridges.png', alt: 'Testimonial 5' },
  { image: '/Sephora.png', alt: 'Testimonial 5' },
  { image: '/Superdrug.png', alt: 'Testimonial 5' }
    ];
    const row1Logos = [
    { src: "/amazon.webp", alt: "" },
    { src: "/shopify.webp", alt: "" },
    { src: "/woo.webp", alt: "" }
    
  ];

  const row2Logos = [
    { src: "/ebay.webp", alt: "" },
    { src: "/dpd.webp", alt: "" },
    { src: "/onbuy.webp", alt: "Etsy" },
    { src: "/magento.webp", alt: "" }
    
  ];

  const row3Logos = [
    { src: "/tiktok.webp", alt: "Logo and Font" },
    { src: "/shipstation.webp", alt: "Nicpic" },
    { src: "/etsy.webp", alt: "Opulensi Luxury" },
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
      
    const valueAddedServicesItems = [
      {
        title: ['Kitting', '& Assembly'],
        img: '/shiphappens1.jpg',
        logo: '/k.svg',
        features: ['Custom product bundling', 'Multi-SKU assembly', 'Promotional packaging', 'Retail-ready kits'],
      },
      {
        title: ['Quality Control', '(QC)'],
        img: '/qc.webp',
        logo: '/q.svg',
        features: ['Inspection & verification', 'Product sampling', 'Defect analysis', 'Compliance checks'],
      },
      {
        title: ['Recommence', 'Services'],
        img: '/shiphappens3.webp',
        logo: '/r.svg',
        features: ['Returns processing', 'Product refurbishment', 'Quality inspection', 'Restocking services'],
      },
      {
        title: ['Product', 'Personalisation'],
        img: '/shiphappens4.webp',
        logo: '/p.svg',
        features: ['Custom engraving', 'Laser etching', 'Branded packaging', 'Gift message inserts'],
      },
    ];

    const brandCreativeServicesItems = [
      {
        title: ['Content', 'Creation'],
        img: '/shiphappens1.jpg',
        logo: '/cc.svg',
        features: ['Product photography', 'Lifestyle shoots', 'Short-form video content', 'Editing, retouching, creative direction'],
      },
      {
        title: ['Brand Launch &', 'Growth Support'],
        img: '/blgs.webp',
        logo: '/blgs.svg',
        features: ['Shopify store setup (basic)', 'Packaging coordination', 'Logistic planning', 'International expansion scaling support'],
      },
      {
        title: ['Custom Packaging', 'Supply'],
        img: '/shiphappens3.webp',
        logo: '/r.svg',
        features: ['Branded boxes', 'Stickers', 'Tissue papers', 'Bulk ordering options for clients'],
      },
    ];

    const [activeVasIndex, setActiveVasIndex] = useState(0);
    const [vasPrevIndex, setVasPrevIndex] = useState<number | null>(null);
    const vasTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [activeBrandCreativeIndex, setActiveBrandCreativeIndex] = useState(0);
    const [brandCreativePrevIndex, setBrandCreativePrevIndex] = useState<number | null>(null);
    const brandCreativeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      return () => {
        if (vasTimerRef.current) clearTimeout(vasTimerRef.current);
        if (brandCreativeTimerRef.current) clearTimeout(brandCreativeTimerRef.current);
      };
    }, []);

    const activateVas = (index: number) => {
      if (index === activeVasIndex) return;
      if (vasTimerRef.current) clearTimeout(vasTimerRef.current);
      setVasPrevIndex(activeVasIndex);
      setActiveVasIndex(index);
      vasTimerRef.current = setTimeout(() => {
        setVasPrevIndex(null);
      }, 750);
    };

    const activateBrandCreative = (index: number) => {
      if (index === activeBrandCreativeIndex) return;
      if (brandCreativeTimerRef.current) clearTimeout(brandCreativeTimerRef.current);
      setBrandCreativePrevIndex(activeBrandCreativeIndex);
      setActiveBrandCreativeIndex(index);
      brandCreativeTimerRef.current = setTimeout(() => {
        setBrandCreativePrevIndex(null);
      }, 750);
    };
      
  
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
<section className="relative w-full h-auto py-14 lg:py-16 overflow-hidden">
  <div
    className="absolute inset-0 bg-black/65"
    style={{
      backgroundImage: `url('/vas.webp')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: 'scaleX(-1)'
    }}
  />

  <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 2xl:px-12 py-10 lg:py-12">
    <div className="mx-auto w-full max-w-[1490px]">
      <style>{`
        @keyframes servicesSlideIn {
          0% { opacity: 0; transform: translateX(-36px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <h2 className="text-center text-white text-4xl lg:text-[64px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em]">
        Value Added <span className="text-[#C10016]">Services (VAS)</span>
      </h2>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
        <div className="lg:col-span-1">
          <div className="flex flex-col gap-3">
            {valueAddedServicesItems.map((item, i) => {
              const isActive = i === activeVasIndex;
              return (
                <button
                  key={item.title.join(' ')}
                  type="button"
                  onMouseEnter={() => activateVas(i)}
                  onFocus={() => activateVas(i)}
                  onClick={() => activateVas(i)}
                  className={[
                    "w-full flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition",
                    "bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/35",
                    isActive ? "bg-white/12 border-white/45" : "",
                  ].join(" ")}
                >
                  <img src={item.logo} alt="" className="w-10 h-10 shrink-0" />
                  <span className="flex-1 text-white font-normal text-[20px] lg:text-[22px] leading-tight">
                    <span className="block">{item.title[0]}</span>
                    <span className="block">{item.title[1]}</span>
                  </span>
                  <img
                    src="/arrow.svg"
                    alt="arrow"
                    className={[
                      "w-5 h-5 object-contain opacity-70 transition",
                      isActive ? "opacity-100 translate-x-0.5" : "",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-full rounded-2xl overflow-hidden border border-white/15 bg-black/20">
            {vasPrevIndex !== null && (
              <img
                src={valueAddedServicesItems[vasPrevIndex]?.img}
                alt={valueAddedServicesItems[vasPrevIndex]?.title.join(' ')}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <img
              key={`${activeVasIndex}-${valueAddedServicesItems[activeVasIndex]?.img}`}
              src={valueAddedServicesItems[activeVasIndex]?.img}
              alt={valueAddedServicesItems[activeVasIndex]?.title.join(' ')}
              className="absolute inset-0 w-full h-full object-cover z-10"
              style={{ animation: 'servicesSlideIn 750ms cubic-bezier(0.22, 1, 0.36, 1)', willChange: 'transform' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <div className="absolute left-6 bottom-6 right-6 z-20">
              <div className="text-white font-normal text-2xl lg:text-[32px] tracking-[-0.01em]">
                {valueAddedServicesItems[activeVasIndex]?.title[0]} {valueAddedServicesItems[activeVasIndex]?.title[1]}
              </div>
              <div className="mt-6 space-y-3 max-w-[560px]">
                {(valueAddedServicesItems[activeVasIndex]?.features ?? []).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <img src="/checkw.svg" alt="Check" className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-white text-[16px] leading-[22px]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button className="flex items-center gap-3 bg-[#C10016] text-white px-8 py-4 rounded-md font-bold text-[18px]">
          Contact Sales
          <img src="/arrow.svg" className="w-4 h-4" />
        </button>
      </div>
    </div>
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
    Logistics, Freight & <Text className="text-[#C10016]">International</Text>
  </Text>
  <LogisticsServicesSection/>
</View>
<section className="relative w-full h-auto py-14 lg:py-16 overflow-hidden">
  <div
    className="absolute inset-0 bg-black/65"
    style={{
      backgroundImage: `url('/bcs.webp')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: 'scaleX(-1)'
    }}
  />

  <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 2xl:px-12 py-10 lg:py-12">
    <div className="mx-auto w-full max-w-[1490px]">
      <h2 className="text-center text-white text-4xl lg:text-[64px] font-bold leading-tight lg:leading-[80px] tracking-[-0.01em]">
        Brand & Creative <span className="text-[#C10016]">Services</span>
      </h2>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
        <div className="lg:col-span-1">
          <div className="flex flex-col gap-3">
            {brandCreativeServicesItems.map((item, i) => {
              const isActive = i === activeBrandCreativeIndex;
              return (
                <button
                  key={item.title.join(' ')}
                  type="button"
                  onMouseEnter={() => activateBrandCreative(i)}
                  onFocus={() => activateBrandCreative(i)}
                  onClick={() => activateBrandCreative(i)}
                  className={[
                    "w-full flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition",
                    "bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/35",
                    isActive ? "bg-white/12 border-white/45" : "",
                  ].join(" ")}
                >
                  <img src={item.logo} alt="" className="w-10 h-10 shrink-0" />
                  <span className="flex-1 text-white font-normal text-[20px] lg:text-[22px] leading-tight">
                    <span className="block">{item.title[0]}</span>
                    <span className="block">{item.title[1]}</span>
                  </span>
                  <img
                    src="/arrow.svg"
                    alt="arrow"
                    className={[
                      "w-5 h-5 object-contain opacity-70 transition",
                      isActive ? "opacity-100 translate-x-0.5" : "",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-full rounded-2xl overflow-hidden border border-white/15 bg-black/20">
            {brandCreativePrevIndex !== null && (
              <img
                src={brandCreativeServicesItems[brandCreativePrevIndex]?.img}
                alt={brandCreativeServicesItems[brandCreativePrevIndex]?.title.join(' ')}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <img
              key={`${activeBrandCreativeIndex}-${brandCreativeServicesItems[activeBrandCreativeIndex]?.img}`}
              src={brandCreativeServicesItems[activeBrandCreativeIndex]?.img}
              alt={brandCreativeServicesItems[activeBrandCreativeIndex]?.title.join(' ')}
              className="absolute inset-0 w-full h-full object-cover z-10"
              style={{ animation: 'servicesSlideIn 750ms cubic-bezier(0.22, 1, 0.36, 1)', willChange: 'transform' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <div className="absolute left-6 bottom-6 right-6 z-20">
              <div className="text-white font-normal text-2xl lg:text-[32px] tracking-[-0.01em]">
                {brandCreativeServicesItems[activeBrandCreativeIndex]?.title[0]} {brandCreativeServicesItems[activeBrandCreativeIndex]?.title[1]}
              </div>
              <div className="mt-6 space-y-3 max-w-[560px]">
                {(brandCreativeServicesItems[activeBrandCreativeIndex]?.features ?? []).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <img src="/checkw.svg" alt="Check" className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-white text-[16px] leading-[22px]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button className="flex items-center gap-3 bg-[#C10016] text-white px-8 py-4 rounded-md font-bold text-[18px]">
          Contact Sales
          <img src="/arrow.svg" className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</section>
{/* Technology & Integrations Section */}
<View className="relative py-20"> {/* Add vertical padding */}
  <Text className="font-helvetica font-bold text-3xl lg:text-[54px] lg:leading-[84px] text-black text-center relative z-10 transform -translate-y-8">
    Technology & <Text className="text-[#C10016]">Integrations</Text>
  </Text>
  <TechnologyIntegrationsSection/>
</View>
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
    {/* <div className="flex justify-center">
      <div className="w-[280px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] flex items-center justify-center">
        <span className="font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
          We integrate with
        </span>
      </div>
    </div> */}

    {/* Main Heading */}
    <h2 className="text-center font-bold text-4xl lg:text-[74px] leading-tight lg:leading-[80px] tracking-tight text-white mt-8 lg:mt-16">
      Meet the People we make happy
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
      We Integrate With
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
          Our Awards
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
          Accreditations
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
