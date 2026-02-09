import ContentForm from '@/components/admin/content-form';
import { createContent } from '@/lib/cms-admin';
import { getContentType } from '@/lib/content-types';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function CreateContentScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const router = useRouter();
  const contentType = getContentType(type || '');

  if (!contentType) {
    return (
      <View className="flex-1 bg-[#111] items-center justify-center">
        <Text className="text-red-400 font-helvetica text-lg">Content type not found</Text>
      </View>
    );
  }

  const handleSave = async (formData: { data: Record<string, any>; slug?: string; status: string; sort_order: number }) => {
    const res = await createContent({
      content_type: type!,
      slug: formData.slug,
      status: formData.status,
      data: formData.data,
      sort_order: formData.sort_order,
    });

    if (res.ok && res.id) {
      router.replace(`/admin/content/${type}/${res.id}` as any);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Back button */}
      <View className="bg-[#111] border-b border-gray-800 px-6 py-3">
        <TouchableOpacity
          onPress={() => router.push(`/admin/content/${type}` as any)}
          className="flex-row items-center"
          activeOpacity={0.7}
        >
          <Text className="text-gray-400 text-sm font-helvetica">← Back to {contentType.namePlural}</Text>
        </TouchableOpacity>
      </View>

      <ContentForm
        contentType={contentType}
        onSave={handleSave}
      />
    </>
  );
}
