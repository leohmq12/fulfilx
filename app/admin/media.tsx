import { deleteMedia, getMediaFullUrl, listMedia, uploadMedia, updateMedia } from '@/lib/cms-admin';
import type { MediaItem } from '@/types/cms';
import { Stack } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function MediaLibraryScreen() {
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
      <View className="flex-1 flex-row bg-[#111]">
        {/* Main Content */}
        <ScrollView className="flex-1">
          <View className="px-6 py-8">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
              <View>
                <Text className="text-white font-helvetica-bold text-2xl">Media Library</Text>
                <Text className="text-gray-500 font-helvetica text-sm mt-1">{media.length} files</Text>
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

            {/* Search */}
            <View className="mb-6">
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search files..."
                placeholderTextColor="#555"
                className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white font-helvetica text-sm"
                style={{ outlineStyle: 'none' } as any}
              />
            </View>

            {/* Grid */}
            {loading ? (
              <View className="py-20 items-center">
                <ActivityIndicator size="large" color="#C10016" />
              </View>
            ) : media.length === 0 ? (
              <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-12 items-center">
                <Text className="text-gray-500 text-5xl mb-4">🖼️</Text>
                <Text className="text-gray-400 font-helvetica-bold text-lg mb-2">No media files yet</Text>
                <Text className="text-gray-600 font-helvetica text-sm text-center mb-2">
                  This is normal when you haven’t uploaded anything yet. Click “Upload Files” to add images, videos, or PDFs.
                </Text>
                <Text className="text-gray-700 font-helvetica text-xs text-center">
                  Files you upload here can be used in content (e.g. blog images, team photos).
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
                    className={`bg-[#1a1a1a] border rounded-lg overflow-hidden ${
                      selectedItem?.id === item.id ? 'border-[#C10016]' : 'border-gray-800'
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
                      <View style={{ height: 120 }} className="items-center justify-center bg-gray-800">
                        <Text className="text-3xl">📄</Text>
                      </View>
                    )}
                    <View className="p-2">
                      <Text className="text-gray-400 text-xs font-helvetica" numberOfLines={1}>
                        {item.original_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Detail Panel */}
        {selectedItem && (
          <View className="w-80 bg-[#1a1a1a] border-l border-gray-800 p-5">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white font-helvetica-bold text-sm">File Details</Text>
              <TouchableOpacity onPress={() => setSelectedItem(null)}>
                <Text className="text-gray-500 text-lg">✕</Text>
              </TouchableOpacity>
            </View>

            {/* Preview */}
            {selectedItem.mime_type.startsWith('image/') && (
              <View className="bg-[#111] rounded-lg p-2 mb-4">
                <img
                  src={getMediaFullUrl(selectedItem.url)}
                  alt={selectedItem.alt_text || selectedItem.original_name}
                  style={{ width: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 4 }}
                />
              </View>
            )}

            {/* Info */}
            <View className="gap-3 mb-4">
              <View>
                <Text className="text-gray-500 text-xs font-helvetica mb-0.5">Filename</Text>
                <Text className="text-white text-sm font-helvetica" selectable>{selectedItem.original_name}</Text>
              </View>
              <View>
                <Text className="text-gray-500 text-xs font-helvetica mb-0.5">URL</Text>
                <Text className="text-blue-400 text-xs font-helvetica" selectable>{getMediaFullUrl(selectedItem.url)}</Text>
              </View>
              <View className="flex-row gap-4">
                <View>
                  <Text className="text-gray-500 text-xs font-helvetica mb-0.5">Size</Text>
                  <Text className="text-gray-300 text-sm font-helvetica">{formatSize(selectedItem.size)}</Text>
                </View>
                {selectedItem.width && selectedItem.height && (
                  <View>
                    <Text className="text-gray-500 text-xs font-helvetica mb-0.5">Dimensions</Text>
                    <Text className="text-gray-300 text-sm font-helvetica">
                      {selectedItem.width} × {selectedItem.height}
                    </Text>
                  </View>
                )}
              </View>
              <View>
                <Text className="text-gray-500 text-xs font-helvetica mb-0.5">Type</Text>
                <Text className="text-gray-300 text-sm font-helvetica">{selectedItem.mime_type}</Text>
              </View>
            </View>

            {/* Alt Text */}
            <View className="mb-4">
              <Text className="text-gray-400 text-xs font-helvetica mb-1">Alt Text</Text>
              <TextInput
                value={editAlt}
                onChangeText={setEditAlt}
                placeholder="Describe this image..."
                placeholderTextColor="#555"
                className="bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-white font-helvetica text-sm mb-2"
                style={{ outlineStyle: 'none' } as any}
              />
              <TouchableOpacity
                onPress={handleUpdateAlt}
                className="bg-gray-700 rounded-lg py-2 items-center"
                activeOpacity={0.7}
              >
                <Text className="text-white text-xs font-helvetica">Save Alt Text</Text>
              </TouchableOpacity>
            </View>

            {/* Actions */}
            <View className="gap-2">
              <TouchableOpacity
                onPress={() => {
                  navigator.clipboard.writeText(getMediaFullUrl(selectedItem.url));
                  alert('URL copied to clipboard!');
                }}
                className="bg-gray-700 rounded-lg py-2.5 items-center"
                activeOpacity={0.7}
              >
                <Text className="text-white text-sm font-helvetica">Copy URL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(selectedItem)}
                className="bg-red-900/20 border border-red-900 rounded-lg py-2.5 items-center"
                activeOpacity={0.7}
              >
                <Text className="text-red-400 text-sm font-helvetica">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
}
