import FieldRenderer from '@/components/admin/field-renderer';
import { useAdminTheme } from '@/lib/admin-theme-context';
import type { ContentTypeDefinition } from '@/types/cms';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface ContentFormProps {
  contentType: ContentTypeDefinition;
  initialData?: Record<string, any>;
  initialSlug?: string;
  initialStatus?: string;
  initialSortOrder?: number;
  onSave: (data: {
    data: Record<string, any>;
    slug?: string;
    status: string;
    sort_order: number;
  }) => Promise<void>;
  onDelete?: () => Promise<void>;
  isEditing?: boolean;
}

export default function ContentForm({
  contentType,
  initialData = {},
  initialSlug = '',
  initialStatus = 'draft',
  initialSortOrder = 0,
  onSave,
  onDelete,
  isEditing = false,
}: ContentFormProps) {
  const { isDark } = useAdminTheme();
  const cardBg = isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200';
  const textMain = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';
  const inputBg = isDark ? 'bg-[#111] border-gray-700' : 'bg-gray-50 border-gray-300';

  const [formData, setFormData] = useState<Record<string, any>>(() => {
    // Initialize with defaults from field definitions
    const defaults: Record<string, any> = {};
    contentType.fields.forEach((f) => {
      defaults[f.name] = initialData[f.name] ?? f.defaultValue ?? (f.type === 'array' ? [] : f.type === 'boolean' ? false : '');
    });
    return defaults;
  });
  const [slug, setSlug] = useState(initialSlug);
  const [status, setStatus] = useState(initialStatus);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const updateField = useCallback((name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccess('');
  }, []);

  const handleSave = async (saveStatus?: string) => {
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      // Validate required fields
      for (const field of contentType.fields) {
        if (field.required) {
          const val = formData[field.name];
          if (val === '' || val === null || val === undefined || (Array.isArray(val) && val.length === 0)) {
            setError(`${field.label} is required`);
            setSaving(false);
            return;
          }
        }
      }

      await onSave({
        data: formData,
        slug: contentType.isSingle ? contentType.slug : slug || undefined,
        status: saveStatus || status,
        sort_order: sortOrder,
      });

      setSuccess(saveStatus === 'published' ? 'Published successfully!' : 'Saved successfully!');
      if (saveStatus) setStatus(saveStatus);
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    const confirmed = window.confirm('Are you sure you want to delete this entry? This cannot be undone.');
    if (!confirmed) return;

    setDeleting(true);
    try {
      await onDelete();
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
      setDeleting(false);
    }
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 80 }}>
      <View className="max-w-3xl w-full mx-auto px-4 py-6">
        <View className="mb-6">
          <Text className={`font-helvetica-bold text-xl mb-0.5 ${textMain}`}>
            {isEditing ? `Edit ${contentType.name}` : `New ${contentType.name}`}
          </Text>
          <Text className={`font-helvetica text-sm ${textMuted}`}>{contentType.description}</Text>
        </View>

        {error ? (
          <View className="bg-red-50 border border-red-200 rounded-lg p-2.5 mb-4">
            <Text className="text-red-600 text-sm font-helvetica">{error}</Text>
          </View>
        ) : null}
        {success ? (
          <View className="bg-green-50 border border-green-200 rounded-lg p-2.5 mb-4">
            <Text className="text-green-700 text-sm font-helvetica">{success}</Text>
          </View>
        ) : null}

        <View className={`${cardBg} rounded-lg border p-5 mb-5`}>
          {!contentType.isSingle && (
            <View className="mb-4">
              <Text className={`text-sm font-helvetica-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Slug (URL identifier)</Text>
              <View className={`border rounded-lg px-3 py-2.5 ${inputBg}`}>
                <input
                  type="text"
                  value={slug}
                  onChange={(e: any) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  placeholder="auto-generated-from-title"
                  className="bg-transparent font-helvetica text-sm w-full outline-none"
                  style={{ border: 'none', color: isDark ? '#fff' : '#111', fontFamily: 'inherit', fontSize: 14 }}
                />
              </View>
              <Text className={`text-xs font-helvetica mt-1 ${textMuted}`}>Leave blank to auto-generate.</Text>
            </View>
          )}

          {contentType.fields.map((field) => (
            <FieldRenderer
              key={field.name}
              field={field}
              value={formData[field.name]}
              onChange={(val) => updateField(field.name, val)}
            />
          ))}

          {!contentType.isSingle && (
            <View className="mb-4">
              <Text className={`text-sm font-helvetica-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Sort Order</Text>
              <View className={`border rounded-lg px-3 py-2.5 w-24 ${inputBg}`}>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e: any) => setSortOrder(parseInt(e.target.value) || 0)}
                  className="bg-transparent font-helvetica text-sm w-full outline-none"
                  style={{ border: 'none', color: isDark ? '#fff' : '#111', fontFamily: 'inherit', fontSize: 14 }}
                />
              </View>
              <Text className={`text-xs font-helvetica mt-1 ${textMuted}`}>Lower numbers first. Default 0.</Text>
            </View>
          )}
        </View>

        <View className={`${cardBg} rounded-lg border p-5`}>
          <View className="flex-row items-center mb-3">
            <Text className={`text-sm font-helvetica mr-2 ${textMuted}`}>Status:</Text>
            <View className={`px-2.5 py-0.5 rounded ${
              status === 'published' ? (isDark ? 'bg-green-900/30' : 'bg-green-100') :
              status === 'archived' ? (isDark ? 'bg-gray-700/30' : 'bg-gray-200') :
              isDark ? 'bg-yellow-900/30' : 'bg-amber-100'
            }`}>
              <Text className={`text-xs font-helvetica-bold capitalize ${
                status === 'published' ? (isDark ? 'text-green-400' : 'text-green-700') :
                status === 'archived' ? (isDark ? 'text-gray-400' : 'text-gray-600') :
                isDark ? 'text-yellow-400' : 'text-amber-700'
              }`}>{status}</Text>
            </View>
          </View>

          <View className="flex-row flex-wrap gap-2">
            <TouchableOpacity
              onPress={() => handleSave('draft')}
              disabled={saving}
              className={`rounded-lg px-5 py-2.5 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
              activeOpacity={0.7}
            >
              {saving ? (
                <ActivityIndicator color={isDark ? 'white' : '#374151'} size="small" />
              ) : (
                <Text className={`text-sm font-helvetica-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Save Draft</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSave('published')}
              disabled={saving}
              className="bg-[#C10016] rounded-lg px-5 py-2.5"
              activeOpacity={0.7}
            >
              {saving ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-white text-sm font-helvetica-bold">
                  {status === 'published' ? 'Update & Publish' : 'Publish'}
                </Text>
              )}
            </TouchableOpacity>

            {isEditing && status === 'published' && (
              <TouchableOpacity
                onPress={() => handleSave('archived')}
                disabled={saving}
                className={`rounded-lg px-5 py-2.5 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                activeOpacity={0.7}
              >
                <Text className={`text-sm font-helvetica ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Archive</Text>
              </TouchableOpacity>
            )}

            {isEditing && onDelete && (
              <TouchableOpacity
                onPress={handleDelete}
                disabled={deleting}
                className="bg-red-50 rounded-lg px-5 py-2.5 border border-red-200"
                activeOpacity={0.7}
              >
                {deleting ? (
                  <ActivityIndicator color="#dc2626" size="small" />
                ) : (
                  <Text className="text-red-600 text-sm font-helvetica">Delete</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
