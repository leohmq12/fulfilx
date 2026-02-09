import ContentForm from '@/components/admin/content-form';
import { createContent, listContent, updateContent, deleteContent } from '@/lib/cms-admin';
import { getContentType } from '@/lib/content-types';
import type { ContentEntry } from '@/types/cms';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ContentTypeScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const router = useRouter();
  const contentType = getContentType(type || '');

  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEntries = useCallback(async () => {
    if (!type) return;
    setLoading(true);
    try {
      const res = await listContent(type, { all: true, limit: 100 });
      if (res.ok) {
        setEntries(res.entries);
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, [type]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  if (!contentType) {
    return (
      <View className="flex-1 bg-[#111] items-center justify-center">
        <Text className="text-red-400 font-helvetica text-lg">Content type "{type}" not found</Text>
      </View>
    );
  }

  // Single types: show form directly instead of list
  if (contentType.isSingle) {
    const existingEntry = entries[0];

    const handleSave = async (data: { data: Record<string, any>; slug?: string; status: string; sort_order: number }) => {
      if (existingEntry) {
        await updateContent(existingEntry.id, {
          data: data.data,
          status: data.status,
        });
      } else {
        await createContent({
          content_type: type!,
          slug: contentType.slug,
          status: data.status,
          data: data.data,
        });
      }
      await loadEntries();
    };

    if (loading) {
      return (
        <View className="flex-1 bg-[#111] items-center justify-center">
          <ActivityIndicator size="large" color="#C10016" />
        </View>
      );
    }

    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <ContentForm
          contentType={contentType}
          initialData={existingEntry?.data || {}}
          initialStatus={existingEntry?.status || 'draft'}
          onSave={handleSave}
          isEditing={!!existingEntry}
        />
      </>
    );
  }

  // Collection types: show entries list
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1 bg-[#111]">
        <View className="max-w-5xl w-full mx-auto px-6 py-8">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-white font-helvetica-bold text-2xl">
                {contentType.icon} {contentType.namePlural}
              </Text>
              <Text className="text-gray-500 font-helvetica text-sm mt-1">{contentType.description}</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push(`/admin/content/${type}/create` as any)}
              className="bg-[#C10016] rounded-lg px-5 py-3"
              activeOpacity={0.7}
            >
              <Text className="text-white font-helvetica-bold text-sm">+ New {contentType.name}</Text>
            </TouchableOpacity>
          </View>

          {error ? (
            <View className="bg-red-900/30 border border-red-800 rounded-lg p-3 mb-4">
              <Text className="text-red-400 text-sm font-helvetica">{error}</Text>
            </View>
          ) : null}

          {loading ? (
            <View className="py-20 items-center">
              <ActivityIndicator size="large" color="#C10016" />
            </View>
          ) : entries.length === 0 ? (
            <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-12 items-center">
              <Text className="text-gray-500 text-5xl mb-4">{contentType.icon}</Text>
              <Text className="text-gray-400 font-helvetica-bold text-lg mb-2">
                No {contentType.namePlural.toLowerCase()} yet
              </Text>
              <Text className="text-gray-600 font-helvetica text-sm mb-6">
                Create your first {contentType.name.toLowerCase()} to get started.
              </Text>
              <TouchableOpacity
                onPress={() => router.push(`/admin/content/${type}/create` as any)}
                className="bg-[#C10016] rounded-lg px-6 py-3"
                activeOpacity={0.7}
              >
                <Text className="text-white font-helvetica-bold text-sm">+ Create {contentType.name}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="gap-2">
              {/* Table Header */}
              <View className="flex-row px-4 py-2">
                <Text className="text-gray-500 text-xs font-helvetica-bold uppercase flex-1">Title / Name</Text>
                <Text className="text-gray-500 text-xs font-helvetica-bold uppercase w-24 text-center">Status</Text>
                <Text className="text-gray-500 text-xs font-helvetica-bold uppercase w-32 text-center">Updated</Text>
                <Text className="text-gray-500 text-xs font-helvetica-bold uppercase w-20 text-center">Order</Text>
              </View>

              {entries.map((entry) => {
                // Try to extract a display title from the data
                const data = entry.data || {};
                const displayTitle = data.title
                  ? (Array.isArray(data.title) ? data.title.map((t: any) => typeof t === 'string' ? t : t.line).join(' ') : data.title)
                  : data.name || data.author_name || entry.slug || `Entry #${entry.id}`;

                return (
                  <TouchableOpacity
                    key={entry.id}
                    onPress={() => router.push(`/admin/content/${type}/${entry.id}` as any)}
                    className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 flex-row items-center hover:border-gray-600"
                    activeOpacity={0.7}
                  >
                    <View className="flex-1">
                      <Text className="text-white font-helvetica-medium text-sm" numberOfLines={1}>
                        {displayTitle}
                      </Text>
                      {entry.slug && (
                        <Text className="text-gray-600 text-xs font-helvetica mt-0.5">
                          /{entry.slug}
                        </Text>
                      )}
                    </View>
                    <View className="w-24 items-center">
                      <View className={`px-2.5 py-1 rounded-full ${
                        entry.status === 'published' ? 'bg-green-900/30' :
                        entry.status === 'archived' ? 'bg-gray-700/30' :
                        'bg-yellow-900/30'
                      }`}>
                        <Text className={`text-xs font-helvetica capitalize ${
                          entry.status === 'published' ? 'text-green-400' :
                          entry.status === 'archived' ? 'text-gray-400' :
                          'text-yellow-400'
                        }`}>
                          {entry.status}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-gray-500 text-xs font-helvetica w-32 text-center">
                      {new Date(entry.updated_at).toLocaleDateString()}
                    </Text>
                    <Text className="text-gray-600 text-xs font-helvetica w-20 text-center">
                      {entry.sort_order}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}
