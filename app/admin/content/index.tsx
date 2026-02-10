import { contentTypes } from '@/lib/content-types';
import { useAdminTheme } from '@/lib/admin-theme-context';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ContentOverview() {
  const router = useRouter();
  const { isDark } = useAdminTheme();

  const bg = isDark ? 'bg-[#111]' : 'bg-gray-50';
  const cardBg = isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200';
  const textMain = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className={`flex-1 ${bg}`}>
        <View className="max-w-3xl w-full mx-auto px-4 py-6">
          <Text className={`font-helvetica-bold text-xl mb-4 ${textMain}`}>All content types</Text>
          <View className="gap-2">
            {contentTypes.map((ct) => (
              <TouchableOpacity
                key={ct.slug}
                onPress={() => router.push(`/admin/content/${ct.slug}` as any)}
                className={`${cardBg} border rounded-lg px-4 py-3 flex-row items-center`}
                activeOpacity={0.7}
              >
                <Text className="text-xl mr-3">{ct.icon}</Text>
                <View className="flex-1 min-w-0">
                  <Text className={`font-helvetica-bold text-sm ${textMain}`}>{ct.namePlural}</Text>
                  <Text className={`font-helvetica text-xs mt-0.5 ${textMuted}`} numberOfLines={1}>
                    {ct.description}
                  </Text>
                </View>
                <View className={`px-2.5 py-1 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <Text className={`text-xs font-helvetica ${textMuted}`}>
                    {ct.isSingle ? 'Single' : 'Collection'}
                  </Text>
                </View>
                <Text className={`text-sm ml-2 ${textMuted}`}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
