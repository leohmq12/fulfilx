import ContentForm from '@/components/admin/content-form';
import { deleteContent, getContentEntry, updateContent } from '@/lib/cms-admin';
import { getContentType } from '@/lib/content-types';
import type { ContentEntry } from '@/types/cms';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

export default function EditContentScreen() {
  const { type, id } = useLocalSearchParams<{ type: string; id: string }>();
  const router = useRouter();
  const contentType = getContentType(type || '');
  const entryId = parseInt(id || '0');

  const [entry, setEntry] = useState<ContentEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEntry = useCallback(async () => {
    if (!entryId) return;
    setLoading(true);
    try {
      const res = await getContentEntry(entryId);
      if (res.ok && res.entry) {
        setEntry(res.entry);
      } else {
        setError('Entry not found');
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, [entryId]);

  useEffect(() => {
    loadEntry();
  }, [loadEntry]);

  if (!contentType) {
    return (
      <View className="flex-1 bg-[#111] items-center justify-center">
        <Text className="text-red-400 font-helvetica text-lg">Content type not found</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 bg-[#111] items-center justify-center">
        <ActivityIndicator size="large" color="#C10016" />
      </View>
    );
  }

  if (error || !entry) {
    return (
      <View className="flex-1 bg-[#111] items-center justify-center">
        <Text className="text-red-400 font-helvetica text-lg mb-4">{error || 'Entry not found'}</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-gray-700 rounded-lg px-6 py-3"
        >
          <Text className="text-white font-helvetica">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSave = async (formData: { data: Record<string, any>; slug?: string; status: string; sort_order: number }) => {
    await updateContent(entryId, {
      data: formData.data,
      slug: formData.slug,
      status: formData.status,
      sort_order: formData.sort_order,
    });
  };

  const handleDelete = async () => {
    await deleteContent(entryId);
    router.replace(`/admin/content/${type}` as any);
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
        initialData={entry.data}
        initialSlug={entry.slug || ''}
        initialStatus={entry.status}
        initialSortOrder={entry.sort_order}
        onSave={handleSave}
        onDelete={handleDelete}
        isEditing
      />
    </>
  );
}
