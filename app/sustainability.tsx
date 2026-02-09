import { CmsHtmlContent, isCmsHtml } from '@/components/cms-html-content';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { useSingleContent } from '@/hooks/useContent';
import { Stack, useRouter } from 'expo-router';
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';

interface SustainabilitySection {
  title: string;
  content?: string;
  bullets?: string;
}

interface SustainabilityData {
  hero_text?: string;
  sections?: SustainabilitySection[];
}

const FALLBACK_SUSTAINABILITY: SustainabilityData = {
  hero_text: 'Our Commitment to Sustainability',
  sections: [
    { title: 'Our Commitment to Sustainability', content: "At FULFIL.X, sustainability is embedded into everything we do. As a UK-based 3PL with global fulfilment hubs, we recognise our responsibility to reduce environmental impact while supporting our clients' growth in a responsible way.\n\nWe design our operations to be digital-first and paperless wherever possible, minimising unnecessary resource use across our workflows. Our fulfilment processes are optimised to calculate the smallest possible packaging size for every shipment, reducing waste and improving transport efficiency.\n\nTo lower emissions, we consolidate courier collections and offer carbon-friendly shipping options to our clients. We also actively invest in environmental initiatives, including tree planting as a business, to help offset our footprint." },
    { title: 'Sustainable Materials & Waste Reduction', bullets: "95% of all cardboard waste is recycled\nPallet wrap plastics are recycled through specialist partners\nTransitioning fully to paper tape and paper void fill\nUse of biodegradable shipping bags as standard\nPackaging choices designed to minimise excess materials" },
    { title: 'Responsible Operations', bullets: "Low-energy LED lighting across our facilities\nLow-energy heating systems to reduce consumption\nDigital systems replacing paper-based processes" },
    { title: 'Circular Economy Support', content: 'FULFIL.X goes beyond fulfilment by supporting responsible brand returns, offering recycling solutions for:', bullets: "E-waste\nClothing and textiles\nOther recyclable product categories" },
    { title: 'Supporting Our People', content: 'We believe sustainability includes people as well as the planet. Our ride-to-work scheme encourages greener commuting choices and supports employee wellbeing.' },
    { title: '', content: 'Sustainability is not a one-time initiative at FULFIL.X — it is an ongoing commitment. We continually review our processes, materials, and partnerships to ensure we are delivering fulfilment solutions that are efficient, responsible, and future-focused.' },
  ],
};

function parseBullets(bullets: string | undefined): string[] {
  if (!bullets || typeof bullets !== 'string') return [];
  return bullets.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}

export default function SustainabilityScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const router = useRouter();

  const { data } = useSingleContent<SustainabilityData>('sustainability', FALLBACK_SUSTAINABILITY);
  const sections = data.sections ?? FALLBACK_SUSTAINABILITY.sections ?? [];

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
                    <View className="relative z-10 flex items-center justify-center pt-20 lg:pt-60 px-4">
                        {/* Main Title */}
                        <Text className="font-helvetica font-bold text-3xl lg:text-[84px] lg:leading-[84px] text-black text-center mb-6">
                            Sustainability
                        </Text>
                        
                        {/* Breadcrumb Navigation */}
                        <View className="flex flex-row items-center justify-center mt-2 flex-wrap">
                            <Text className="font-helvetica font-normal text-sm lg:text-[20px] lg:leading-[40px] text-black">
                                Home
                            </Text>
                            <View className="w-1 h-1 bg-black rounded-full mx-2 lg:mx-4" />
                            <Text className="font-helvetica font-medium text-sm lg:text-[20px] lg:leading-[40px] text-[#C10016]">
                                Sustainability
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Text Content Section */}
                <View className="relative z-20 bg-white pt-10 lg:pt-32 px-4 pb-10">
                    <View className="w-full lg:max-w-[1296px] mx-auto">
                        {data.hero_text ? (
                            <Text className="font-helvetica font-bold text-2xl lg:text-[32px] lg:leading-[42px] text-black text-left mb-8">
                                {data.hero_text}
                            </Text>
                        ) : null}
                        {sections.map((section, idx) => (
                            <View key={idx}>
                                {section.title ? (
                                    <Text className={idx === 0 && !data.hero_text ? 'font-helvetica font-bold text-2xl lg:text-[32px] lg:leading-[42px] text-black text-left mb-8' : 'font-helvetica font-bold text-xl lg:text-[24px] lg:leading-[32px] text-black text-left mb-6 mt-8'}>
                                        {section.title}
                                    </Text>
                                ) : null}
                                {section.content
                                    ? isCmsHtml(section.content)
                                        ? <CmsHtmlContent html={section.content} className="mb-8" />
                                        : section.content.split(/\n\n+/).map((para, i) => (
                                            <Text key={i} className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-8">
                                                {para.replace(/\n/g, ' ')}
                                            </Text>
                                        ))
                                    : null}
                                {parseBullets(section.bullets).length > 0 ? (
                                    <View className="mb-8 pl-4">
                                        {parseBullets(section.bullets).map((item, i) => (
                                            <Text key={i} className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-2">
                                                • {item}
                                            </Text>
                                        ))}
                                    </View>
                                ) : null}
                            </View>
                        ))}
                    </View>
                </View>

                <Footer />
            </ScrollView>
        </>
    );
};
