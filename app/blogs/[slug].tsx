import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { useContentBySlug } from '@/hooks/useContent';
import { Link, Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

type BlogPostRecord = {
  title?: string;
  description?: string;
  image?: string;
  content?: string;
  author?: string;
  publish_date?: string;
};

const FALLBACK_POST: BlogPostRecord = {
  title: 'Blog Post',
  description: '',
  image: '/bg.webp',
  content: '',
  author: '',
  publish_date: '',
};

export default function BlogSlugScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const safeSlug = typeof slug === 'string' ? slug : '';
  const { data: post } = useContentBySlug<BlogPostRecord>('blog_post', safeSlug, FALLBACK_POST);

  if (!safeSlug) {
    if (typeof window !== 'undefined') router.replace('/blogs');
    return null;
  }

  const title = post?.title ?? 'Blog Post';
  const description = post?.description ?? '';
  const imageUri = post?.image ?? '/bg.webp';
  const content = post?.content ?? '';
  const author = post?.author ?? '';
  const publishDate = post?.publish_date ?? '';

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <Navbar />
      <ScrollView className="flex-1 bg-white">
        <View className="relative">
          <View className="absolute inset-0 z-0 h-[calc(100%-100px)]">
            <Image source={{ uri: '/bg.webp' }} className="w-full h-full lg:h-[600px] object-cover" resizeMode="cover" />
          </View>
          <View className="relative z-10 flex items-center justify-center pt-32 lg:pt-60 px-4">
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] lg:leading-[84px] text-black text-center mb-8">
              {title}
            </Text>
            <View className="flex flex-row flex-wrap items-center justify-center mt-4">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">Home</Text>
              <View className="w-1 h-1 bg-black rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px]">Blogs</Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">{title}</Text>
            </View>
            <View className="w-full flex items-center justify-center mt-8 lg:mt-16">
              <Image
                source={{ uri: imageUri }}
                className="w-full max-w-[1200px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-[20px] object-cover"
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        <View className="bg-white py-10 lg:py-16 px-4">
          <View className="max-w-[800px] mx-auto">
            {(author || publishDate) ? (
              <View className="flex flex-row flex-wrap gap-4 mb-6 text-gray-500">
                {author ? <Text className="font-helvetica text-base">{author}</Text> : null}
                {publishDate ? <Text className="font-helvetica text-base">{publishDate}</Text> : null}
              </View>
            ) : null}
            {description ? (
              <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-8">
                {description}
              </Text>
            ) : null}
            {content ? (
              <View className="font-helvetica text-lg lg:text-[22px] lg:leading-[44px] text-black prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            ) : null}
          </View>
        </View>

        <View className="bg-white py-8 px-4">
          <View className="max-w-[800px] mx-auto">
            <Link href="/blogs" asChild>
              <Text className="font-helvetica font-medium text-[#C10016] text-base lg:text-lg">← Back to Blogs</Text>
            </Link>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}
