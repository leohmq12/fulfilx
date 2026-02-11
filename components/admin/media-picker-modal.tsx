/**
 * Modal to pick an image from the media library.
 * Used when editing image fields in content (product, homepage, etc.).
 */
import { getMediaFullUrl, listMedia, uploadMedia } from '@/lib/cms-admin';
import { useAdminTheme } from '@/lib/admin-theme-context';
import type { MediaItem } from '@/types/cms';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface MediaPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  /** If true, only show image types (default true) */
  imagesOnly?: boolean;
}

export default function MediaPickerModal({
  visible,
  onClose,
  onSelect,
  imagesOnly = true,
}: MediaPickerModalProps) {
  const { isDark } = useAdminTheme();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = useCallback(async () => {
    if (!visible) return;
    setLoading(true);
    try {
      const res = await listMedia({ search: search || undefined, limit: 100 });
      if (res.ok) {
        let items = res.media || [];
        if (imagesOnly) items = items.filter((m) => m.mime_type.startsWith('image/'));
        setMedia(items);
      }
    } catch {
      setMedia([]);
    }
    setLoading(false);
  }, [visible, search, imagesOnly]);

  useEffect(() => {
    if (visible) {
      setSearch('');
      loadMedia();
    }
  }, [visible, loadMedia]);

  const handleSelect = (item: MediaItem) => {
    onSelect(item.url);
    onClose();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files) as File[]) {
        if (imagesOnly && !file.type.startsWith('image/')) continue;
        const res = await uploadMedia(file);
        if (res.ok && res.media?.url) {
          onSelect(res.media.url);
          onClose();
          break;
        }
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    }
    setUploading(false);
    e.target.value = '';
  };

  const cardBg = isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200';
  const textMain = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/60 justify-center items-center p-4">
        <View
          className={`rounded-xl max-w-2xl w-full max-h-[85%] ${cardBg} border overflow-hidden`}
        >
          <View className="flex-row items-center justify-between p-4 border-b border-gray-700">
            <Text className={`font-helvetica-bold text-lg ${textMain}`}>
              Pick from Media Library
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-10 h-10 items-center justify-center rounded-lg"
              activeOpacity={0.7}
            >
              <Text className="text-xl text-gray-500">✕</Text>
            </TouchableOpacity>
          </View>

          <View className="p-4 flex-row gap-2">
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search files..."
              placeholderTextColor="#888"
              className={`flex-1 border rounded-lg px-3 py-2.5 font-helvetica text-sm ${
                isDark ? 'bg-[#111] border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
              style={{ outlineStyle: 'none' } as any}
            />
            <TouchableOpacity
              onPress={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-[#C10016] rounded-lg px-4 py-2.5 justify-center"
              activeOpacity={0.7}
            >
              {uploading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-white font-helvetica-bold text-sm">Upload</Text>
              )}
            </TouchableOpacity>
            <input
              ref={fileInputRef as any}
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              style={{ display: 'none' }}
            />
          </View>

          <ScrollView className="flex-1 px-4 pb-4" style={{ maxHeight: 400 }}>
            {loading ? (
              <View className="py-12 items-center">
                <ActivityIndicator size="large" color="#C10016" />
              </View>
            ) : media.length === 0 ? (
              <View className={`${cardBg} border rounded-lg p-8 items-center`}>
                <Text className="text-4xl mb-2 text-gray-500">🖼️</Text>
                <Text className={`font-helvetica text-sm text-center ${textMuted}`}>
                  {search ? 'No images match your search.' : 'No images in library yet. Upload one above.'}
                </Text>
              </View>
            ) : (
              <View className="flex-row flex-wrap gap-3">
                {media.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSelect(item)}
                    className={`${cardBg} border rounded-lg overflow-hidden`}
                    style={{ width: 120, height: 140 }}
                    activeOpacity={0.8}
                  >
                    <img
                      src={getMediaFullUrl(item.url)}
                      alt={item.alt_text || item.original_name}
                      style={{ width: '100%', height: 100, objectFit: 'cover' }}
                    />
                    <View className="p-1.5">
                      <Text
                        className={`text-xs font-helvetica ${textMuted}`}
                        numberOfLines={2}
                      >
                        {item.original_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
