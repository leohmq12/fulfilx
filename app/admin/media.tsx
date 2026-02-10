import { useAdminTheme } from '@/lib/admin-theme-context';
import { deleteMedia, getMediaFullUrl, listMedia, uploadMedia, updateMedia } from '@/lib/cms-admin';
import type { MediaItem } from '@/types/cms';
import { Stack } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function MediaLibraryScreen() {
  const { isDark } = useAdminTheme();
  const bg = isDark ? 'bg-[#111]' : 'bg-gray-50';
  const cardBg = isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200';
  const textMain = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [editAlt, setEditAlt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listMedia({ search: search || undefined, limit: 100 });
      if (res.ok) setMedia(res.media);
    } catch {}
    setLoading(false);
  }, [search]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const handleUpload = async (e: any) => {
    const files = e.target?.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (const file of Array.from(files) as File[]) {
      try {
        await uploadMedia(file);
      } catch (err: any) {
        alert(`Failed to upload ${file.name}: ${err.message}`);
      }
    }
    setUploading(false);
    await loadMedia();
  };

  const handleDelete = async (item: MediaItem) => {
    if (!window.confirm(`Delete "${item.original_name}"?`)) return;
    try {
      await deleteMedia(item.id);
      setMedia(prev => prev.filter(m => m.id !== item.id));
      if (selectedItem?.id === item.id) setSelectedItem(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUpdateAlt = async () => {
    if (!selectedItem) return;
    try {
      await updateMedia(selectedItem.id, { alt_text: editAlt });
      setMedia(prev => prev.map(m => m.id === selectedItem.id ? { ...m, alt_text: editAlt } : m));
      setSelectedItem(prev => prev ? { ...prev, alt_text: editAlt } : null);
    } catch {}
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className={`flex-1 flex-row ${bg}`}>
        <ScrollView className="flex-1">
          <View className="px-4 py-6">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className={`font-helvetica-bold text-xl ${textMain}`}>Media Library</Text>
                <Text className={`font-helvetica text-sm mt-0.5 ${textMuted}`}>{media.length} files</Text>
              </View>
              <TouchableOpacity
                onPress={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-[#C10016] rounded-lg px-5 py-3"
                activeOpacity={0.7}
              >
                {uploading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text className="text-white font-helvetica-bold text-sm">+ Upload Files</Text>
                )}
              </TouchableOpacity>
              {/* Hidden file input */}
              <input
                ref={fileInputRef as any}
                type="file"
                accept="image/*,video/*,.pdf,.svg"
                multiple
                onChange={handleUpload}
                style={{ display: 'none' }}
              />
            </View>

            <View className="mb-4">
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search files..."
                placeholderTextColor="#888"
                className={`border rounded-lg px-3 py-2.5 font-helvetica text-sm ${isDark ? 'bg-[#1a1a1a] border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                style={{ outlineStyle: 'none' } as any}
              />
            </View>

            {loading ? (
              <View className="py-16 items-center">
                <ActivityIndicator size="large" color="#C10016" />
              </View>
            ) : media.length === 0 ? (
              <View className={`${cardBg} border rounded-lg p-10 items-center`}>
                <Text className={`text-4xl mb-3 ${textMuted}`}>🖼️</Text>
                <Text className={`font-helvetica-bold text-base mb-1 ${textMain}`}>No media files yet</Text>
                <Text className={`font-helvetica text-sm text-center ${textMuted}`}>
                  Upload files to add images, videos, or PDFs for use in content.
                </Text>
              </View>
            ) : (
              <View className="flex-row flex-wrap gap-3">
                {media.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      setSelectedItem(item);
                      setEditAlt(item.alt_text);
                    }}
                    className={`${cardBg} border rounded-lg overflow-hidden ${
                      selectedItem?.id === item.id ? 'border-[#C10016]' : isDark ? 'border-gray-800' : 'border-gray-200'
                    }`}
                    style={{ width: 160, height: 160 }}
                    activeOpacity={0.7}
                  >
                    {item.mime_type.startsWith('image/') ? (
                      <img
                        src={getMediaFullUrl(item.url)}
                        alt={item.alt_text || item.original_name}
                        style={{ width: '100%', height: 120, objectFit: 'cover' }}
                      />
                    ) : (
                      <View style={{ height: 120 }} className={`items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <Text className="text-3xl">📄</Text>
                      </View>
                    )}
                    <View className="p-2">
                      <Text className={`text-xs font-helvetica ${textMuted}`} numberOfLines={1}>
                        {item.original_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        {selectedItem && (
          <View className={`w-80 p-4 border-l ${isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'}`}>
            <View className="flex-row items-center justify-between mb-3">
              <Text className={`font-helvetica-bold text-sm ${textMain}`}>File Details</Text>
              <TouchableOpacity onPress={() => setSelectedItem(null)}>
                <Text className={`text-lg ${textMuted}`}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedItem.mime_type.startsWith('image/') && (
              <View className={`rounded-lg p-2 mb-3 ${isDark ? 'bg-[#111]' : 'bg-gray-100'}`}>
                <img
                  src={getMediaFullUrl(selectedItem.url)}
                  alt={selectedItem.alt_text || selectedItem.original_name}
                  style={{ width: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 4 }}
                />
              </View>
            )}

            <View className="gap-2 mb-3">
              <View>
                <Text className={`text-xs font-helvetica mb-0.5 ${textMuted}`}>Filename</Text>
                <Text className={`text-sm font-helvetica selectable ${textMain}`}>{selectedItem.original_name}</Text>
              </View>
              <View>
                <Text className={`text-xs font-helvetica mb-0.5 ${textMuted}`}>URL</Text>
                <Text className="text-blue-600 text-xs font-helvetica selectable">{getMediaFullUrl(selectedItem.url)}</Text>
              </View>
              <View className="flex-row gap-4">
                <View>
                  <Text className={`text-xs font-helvetica mb-0.5 ${textMuted}`}>Size</Text>
                  <Text className={`text-sm font-helvetica ${textMain}`}>{formatSize(selectedItem.size)}</Text>
                </View>
                {selectedItem.width && selectedItem.height && (
                  <View>
                    <Text className={`text-xs font-helvetica mb-0.5 ${textMuted}`}>Dimensions</Text>
                    <Text className={`text-sm font-helvetica ${textMain}`}>{selectedItem.width} × {selectedItem.height}</Text>
                  </View>
                )}
              </View>
              <View>
                <Text className={`text-xs font-helvetica mb-0.5 ${textMuted}`}>Type</Text>
                <Text className={`text-sm font-helvetica ${textMain}`}>{selectedItem.mime_type}</Text>
              </View>
            </View>

            <View className="mb-3">
              <Text className={`text-xs font-helvetica mb-1 ${textMuted}`}>Alt Text</Text>
              <TextInput
                value={editAlt}
                onChangeText={setEditAlt}
                placeholder="Describe this image..."
                placeholderTextColor="#888"
                className={`rounded-lg px-3 py-2 font-helvetica text-sm mb-2 ${isDark ? 'bg-[#111] border border-gray-700 text-white' : 'bg-gray-50 border border-gray-300 text-gray-900'}`}
                style={{ outlineStyle: 'none' } as any}
              />
              <TouchableOpacity
                onPress={handleUpdateAlt}
                className={`rounded-lg py-2 items-center ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
                activeOpacity={0.7}
              >
                <Text className={`text-xs font-helvetica ${isDark ? 'text-white' : 'text-gray-800'}`}>Save Alt Text</Text>
              </TouchableOpacity>
            </View>

            <View className="gap-2">
              <TouchableOpacity
                onPress={() => {
                  navigator.clipboard.writeText(getMediaFullUrl(selectedItem.url));
                  alert('URL copied to clipboard!');
                }}
                className={`rounded-lg py-2 items-center ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
                activeOpacity={0.7}
              >
                <Text className={`text-sm font-helvetica ${isDark ? 'text-white' : 'text-gray-800'}`}>Copy URL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(selectedItem)}
                className="bg-red-50 border border-red-200 rounded-lg py-2 items-center"
                activeOpacity={0.7}
              >
                <Text className="text-red-600 text-sm font-helvetica">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
}
