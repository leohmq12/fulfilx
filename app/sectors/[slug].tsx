import AwardsAccreditations from '@/components/layout/awards-accreditations';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { useContentBySlug } from '@/hooks/useContent';
import { Link, Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

type SectorRecord = {
  title?: string;
  description?: string;
  image?: string;
  link?: string;
  page_content?: string;
  features?: Array<{ feature?: string }>;
};

const FALLBACK_SECTOR: SectorRecord = {
  title: 'Sector',
  description: '',
  image: '/bg.webp',
  page_content: '',
  features: [],
};

export default function SectorSlugScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const safeSlug = typeof slug === 'string' ? slug : '';
  const { data: sector } = useContentBySlug<SectorRecord>('sector', safeSlug, FALLBACK_SECTOR);

  if (!safeSlug) {
    if (typeof window !== 'undefined') router.replace('/sectors');
    return null;
  }

  const title = sector?.title ?? 'Sector';
  const description = sector?.description ?? '';
  const imageUri = sector?.image ?? '/bg.webp';
  const pageContent = sector?.page_content ?? '';
  const features = (sector?.features ?? []).map((f) => f.feature ?? '').filter(Boolean);

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative w-full pb-12">
          <View className="absolute inset-0 z-0">
            <Image source={{ uri: '/bg.webp' }} className="w-full h-full object-cover" resizeMode="cover" />
          </View>
          <View className="relative z-10 w-full flex flex-col items-center pt-32 lg:pt-48 px-4">
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              {title}
            </Text>
            <View className="flex flex-row items-center justify-center mb-12">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">Home</Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">{title}</Text>
            </View>
            <Image
              source={{ uri: imageUri }}
              className="w-full max-w-[1200px] h-[300px] sm:h-[400px] lg:h-[600px] rounded-[30px] object-cover shadow-lg"
              resizeMode="cover"
            />
          </View>
        </View>

        <View className="bg-white py-8 lg:py-16">
          <View className="max-w-[1393px] mx-auto px-4">
            {description ? (
              <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                {description}
              </Text>
            ) : null}
            {pageContent ? (
              <View className="font-helvetica text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8" dangerouslySetInnerHTML={{ __html: pageContent }} />
            ) : null}
          </View>
        </View>

        {features.length > 0 ? (
          <View className="bg-[#F8F8F8] py-16 lg:py-32">
            <View className="max-w-[1393px] mx-auto px-4">
              <View className="flex flex-col gap-8">
                {features.map((feature, index) => (
                  <View key={index} className="flex flex-row items-start gap-4">
                    <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
                      <Image source={{ uri: '/check.svg' }} alt="check" className="w-[19px] h-[16px]" resizeMode="contain" />
                    </View>
                    <Text className="font-helvetica font-normal text-base lg:text-[20px] lg:leading-[40px] text-black flex-1">{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ) : null}

        <View className="bg-white py-8">
          <View className="max-w-[1393px] mx-auto px-4 flex flex-row">
            <Link href="/sectors" asChild>
              <Text className="font-helvetica font-medium text-[#C10016] text-base lg:text-lg">Back to Sectors</Text>
            </Link>
          </View>
        </View>
        <AwardsAccreditations />
        <Footer />
      </ScrollView>
    </View>
  );
}
