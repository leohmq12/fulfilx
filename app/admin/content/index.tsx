import { contentTypes } from '@/lib/content-types';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ContentOverview() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1 bg-[#111]">
        <View className="max-w-5xl w-full mx-auto px-6 py-8">
          <Text className="text-white font-helvetica-bold text-2xl mb-6">All Content Types</Text>

          <View className="gap-3">
            {contentTypes.map((ct) => (
              <TouchableOpacity
                key={ct.slug}
                onPress={() => router.push(`/admin/content/${ct.slug}` as any)}
                className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 flex-row items-center hover:border-gray-600"
                activeOpacity={0.7}
              >
                <Text className="text-2xl mr-4">{ct.icon}</Text>
                <View className="flex-1">
                  <Text className="text-white font-helvetica-bold text-base">{ct.namePlural}</Text>
                  <Text className="text-gray-500 text-xs font-helvetica mt-0.5">{ct.description}</Text>
                </View>
                <View className="px-3 py-1 rounded-full bg-gray-800">
                  <Text className="text-gray-400 text-xs font-helvetica">
                    {ct.isSingle ? 'Single' : 'Collection'}
                  </Text>
                </View>
                <Text className="text-gray-600 text-lg ml-3">→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
