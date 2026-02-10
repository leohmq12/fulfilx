import ContentForm from '@/components/admin/content-form';
import { useAdminTheme } from '@/lib/admin-theme-context';
import { createContent, listContent, updateContent, deleteContent } from '@/lib/cms-admin';
import { getContentType } from '@/lib/content-types';
import type { ContentEntry } from '@/types/cms';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ContentTypeScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const router = useRouter();
  const { isDark } = useAdminTheme();
  const contentType = getContentType(type || '');

  const bg = isDark ? 'bg-[#111]' : 'bg-gray-50';
  const cardBg = isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200';
  const textMain = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';
  const borderCard = isDark ? 'border-gray-800' : 'border-gray-200';

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
      <View className={`flex-1 ${bg} items-center justify-center`}>
        <Text className="text-red-500 font-helvetica text-lg">Content type "{type}" not found</Text>
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
        <View className={`flex-1 ${bg} items-center justify-center`}>
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
      <ScrollView className={`flex-1 ${bg}`}>
        <View className="max-w-5xl w-full mx-auto px-4 py-6">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className={`font-helvetica-bold text-xl ${textMain}`}>
                {contentType.icon} {contentType.namePlural}
              </Text>
              <Text className={`font-helvetica text-sm mt-0.5 ${textMuted}`}>{contentType.description}</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push(`/admin/content/${type}/create` as any)}
              className="bg-[#C10016] rounded-lg px-4 py-2.5"
              activeOpacity={0.7}
            >
              <Text className="text-white font-helvetica-bold text-sm">+ New {contentType.name}</Text>
            </TouchableOpacity>
          </View>

          {error ? (
            <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <Text className="text-red-600 text-sm font-helvetica">{error}</Text>
            </View>
          ) : null}

          {loading ? (
            <View className="py-16 items-center">
              <ActivityIndicator size="large" color="#C10016" />
            </View>
          ) : entries.length === 0 ? (
            <View className={`${cardBg} border rounded-lg p-10 items-center ${borderCard}`}>
              <Text className={`text-4xl mb-3 ${textMuted}`}>{contentType.icon}</Text>
              <Text className={`font-helvetica-bold text-base mb-1 ${textMain}`}>
                No {contentType.namePlural.toLowerCase()} yet
              </Text>
              <Text className={`font-helvetica text-sm mb-4 ${textMuted}`}>
                Create your first {contentType.name.toLowerCase()} to get started.
              </Text>
              <TouchableOpacity
                onPress={() => router.push(`/admin/content/${type}/create` as any)}
                className="bg-[#C10016] rounded-lg px-5 py-2.5"
                activeOpacity={0.7}
              >
                <Text className="text-white font-helvetica-bold text-sm">+ Create {contentType.name}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="gap-2">
              <View className="flex-row px-3 py-2">
                <Text className={`text-xs font-helvetica-bold uppercase flex-1 ${textMuted}`}>Title / Name</Text>
                <Text className={`text-xs font-helvetica-bold uppercase w-24 text-center ${textMuted}`}>Status</Text>
                <Text className={`text-xs font-helvetica-bold uppercase w-28 text-center ${textMuted}`}>Updated</Text>
                <Text className={`text-xs font-helvetica-bold uppercase w-16 text-center ${textMuted}`}>Order</Text>
              </View>

              {entries.map((entry) => {
                const data = entry.data || {};
                const displayTitle = data.title
                  ? (Array.isArray(data.title) ? data.title.map((t: any) => typeof t === 'string' ? t : t.line).join(' ') : data.title)
                  : data.name || data.author_name || entry.slug || `Entry #${entry.id}`;

                return (
                  <TouchableOpacity
                    key={entry.id}
                    onPress={() => router.push(`/admin/content/${type}/${entry.id}` as any)}
                    className={`${cardBg} border rounded-lg p-3 flex-row items-center ${borderCard}`}
                    activeOpacity={0.7}
                  >
                    <View className="flex-1 min-w-0">
                      <Text className={`font-helvetica-medium text-sm ${textMain}`} numberOfLines={1}>
                        {displayTitle}
                      </Text>
                      {entry.slug && (
                        <Text className={`text-xs font-helvetica mt-0.5 ${textMuted}`}>/{entry.slug}</Text>
                      )}
                    </View>
                    <View className="w-24 items-center">
                      <View className={`px-2 py-0.5 rounded ${
                        entry.status === 'published' ? (isDark ? 'bg-green-900/30' : 'bg-green-100') :
                        entry.status === 'archived' ? (isDark ? 'bg-gray-700/30' : 'bg-gray-200') :
                        isDark ? 'bg-yellow-900/30' : 'bg-amber-100'
                      }`}>
                        <Text className={`text-xs font-helvetica capitalize ${
                          entry.status === 'published' ? (isDark ? 'text-green-400' : 'text-green-700') :
                          entry.status === 'archived' ? (isDark ? 'text-gray-400' : 'text-gray-600') :
                          isDark ? 'text-yellow-400' : 'text-amber-700'
                        }`}>
                          {entry.status}
                        </Text>
                      </View>
                    </View>
                    <Text className={`text-xs font-helvetica w-28 text-center ${textMuted}`}>
                      {new Date(entry.updated_at).toLocaleDateString()}
                    </Text>
                    <Text className={`text-xs font-helvetica w-16 text-center ${textMuted}`}>
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
