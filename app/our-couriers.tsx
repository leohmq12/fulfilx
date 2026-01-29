import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';

export default function OurCouriersScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 1024;
    const router = useRouter();

    const row1Logos = [
        { src: "/couires/logo%20amazon.webp", alt: "Amazon" },
        { src: "/couires/logosDHL.webp", alt: "DHL" },
        { src: "/couires/logos%20%20dpd%20%282%29.webp", alt: "DPD" },
        { src: "/couires/logos%20%20evri%20%281%29.webp", alt: "Evri" },
        { src: "/couires/logos%20ROYAL%20mail.webp", alt: "Royal Mail" },
        
    ];

    const row2Logos = [
        { src: "/couires/logo%20anpost.webp", alt: "An Post" },
        { src: "/couires/logo%20%20emx.webp", alt: "EMX" },
        { src: "/couires/logo%20fedx.webp", alt: "FedEx" },
        { src: "/couires/logo%20inpost.webp", alt: "InPost" },
        { src: "/couires/logo%20postnl.webp", alt: "PostNL" },
    ];

    const row3Logos = [
        { src: "/couires/logos%20%20pro%20carrier%20%281%29.webp", alt: "Pro Carrier" },
        { src: "/couires/logo%20samos.webp", alt: "Samos" },
        { src: "/couires/logo%20ups.webp", alt: "UPS" },
        { src: "/couires/logo%20xpres.webp", alt: "Xpress" },
        { src: "/couires/logos%20yodel.webp", alt: "Yodel" },
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
                <View className="relative">
                    {/* PNG Background */}
                    <View className="absolute inset-0 z-0 h-[calc(100%-100px)]">
                        <Image 
                            source={{ uri: "/bg.webp" }}
                            alt="Background pattern"
                            className="w-full h-full lg:h-[600px]"
                            resizeMode="cover"
                        />
                    </View>

                    {/* Hero Content */}
                    <View className="relative z-10 flex items-center justify-center pt-32 lg:pt-60 px-4">
                        {/* Main Title */}
                        <Text className="font-helvetica font-bold text-4xl lg:text-[84px] lg:leading-[84px] text-black text-center mb-8">
                            Our Couriers
                        </Text>
                        
                        {/* Breadcrumb Navigation */}
                        <View className="flex flex-row items-center justify-center mt-4 flex-wrap">
                            <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black">
                                Home
                            </Text>
                            <View className="w-1 h-1 bg-black rounded-full mx-2 lg:mx-4" />
                            <Text className="font-helvetica font-medium text-base lg:text-[20px] lg:leading-[40px] text-[#C10016]">
                                Our Couriers
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Text Content Section */}
                <View className="relative z-20 bg-white pt-16 lg:pt-32 px-4 pb-20">
                    {/* Paragraph */}
                    <View className="w-full lg:max-w-[1296px] mx-auto">
                        <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black text-left mb-8">
                            At FULFIL.X, your growth is our priority and that includes protecting your bottom line. We don’t just connect you to carriers, we build strategic partnerships that translate into real savings and superior service for your brand.
                        </Text>
                        <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black text-left mb-8">
                            Through our collective shipping volume and dedicated carrier management, we negotiate preferential commercial rates with every major carrier. These savings are automatically built into your fulfilment pricing, so you benefit without the hassle of lengthy negotiations or hidden fees.
                        </Text>
                        <Text className="font-helvetica font-bold text-lg lg:text-[22px] lg:leading-[44px] text-black text-left">
                            Your brand deserves a logistics advantage. With FULFILX, you have it.
                        </Text>
                    </View>
                </View>

                {/* Carousel Section */}
                <View className="relative z-20 py-20">
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
                    <div className="relative max-w-[1300px] mx-auto px-4 z-10">
                        {/* Main Heading */}
                        <h2 className="text-center font-bold text-[74px] leading-[80px] tracking-tight text-white mt-16">
                            Our Couriers
                        </h2>

                        <div className="w-full overflow-hidden py-10">
                            {/* First Row - Scroll Left */}
                            <div className="mt-20 slider-container overflow-hidden">
                                <div className="flex animate-infinite-scroll">
                                    {[...row1Logos, ...row1Logos].map((logo, index) => (
                                        <div key={index} className="group relative flex-shrink-0 mx-12">
                                            <div className="w-[240px] h-[100px] rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-transparent hover:scale-105">
                                                <img 
                                                    src={logo.src}
                                                    alt={logo.alt}
                                                    className="w-full h-[80px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Second Row - Scroll Right */}
                            <div className="mt-12 slider-container overflow-hidden">
                                <div className="flex animate-infinite-scroll-reverse">
                                    {[...row2Logos, ...row2Logos].map((logo, index) => (
                                        <div key={index} className="group relative flex-shrink-0 mx-12">
                                            <div className="w-[300px] h-[130px] rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-transparent hover:scale-105">
                                                <img 
                                                    src={logo.src}
                                                    alt={logo.alt}
                                                    className="w-full h-[80px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Third Row - Scroll Left */}
                            <div className="mt-12 slider-container overflow-hidden">
                                <div className="flex animate-infinite-scroll">
                                    {[...row3Logos, ...row3Logos].map((logo, index) => (
                                        <div key={index} className="group relative flex-shrink-0 mx-12">
                                            <div className="w-[340px] h-[150px] rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-transparent hover:scale-105">
                                                <img 
                                                    src={logo.src}
                                                    alt={logo.alt}
                                                    className="w-full h-[80px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </View>

                <Footer />
            </ScrollView>
        </>
    );
};
