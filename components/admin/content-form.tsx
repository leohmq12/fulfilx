import FieldRenderer from '@/components/admin/field-renderer';
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
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
      <View className="max-w-3xl w-full mx-auto px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-white font-helvetica-bold text-2xl mb-1">
            {isEditing ? `Edit ${contentType.name}` : `New ${contentType.name}`}
          </Text>
          <Text className="text-gray-500 font-helvetica text-sm">{contentType.description}</Text>
        </View>

        {/* Messages */}
        {error ? (
          <View className="bg-red-900/30 border border-red-800 rounded-lg p-3 mb-6">
            <Text className="text-red-400 text-sm font-helvetica">{error}</Text>
          </View>
        ) : null}
        {success ? (
          <View className="bg-green-900/30 border border-green-800 rounded-lg p-3 mb-6">
            <Text className="text-green-400 text-sm font-helvetica">{success}</Text>
          </View>
        ) : null}

        {/* Form Card */}
        <View className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-6 mb-6">
          {/* Slug (for collection types only) */}
          {!contentType.isSingle && (
            <View className="mb-5">
              <Text className="text-gray-300 text-sm font-helvetica-medium mb-2">Slug (URL identifier)</Text>
              <View className="bg-[#111] border border-gray-700 rounded-lg px-4 py-3">
                <input
                  type="text"
                  value={slug}
                  onChange={(e: any) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  placeholder="auto-generated-from-title"
                  className="bg-transparent text-white font-helvetica text-sm w-full outline-none"
                  style={{ border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 14 }}
                />
              </View>
              <Text className="text-gray-600 text-xs font-helvetica mt-1">
                URL-friendly identifier. Leave blank to auto-generate.
              </Text>
            </View>
          )}

          {/* Dynamic Fields */}
          {contentType.fields.map((field) => (
            <FieldRenderer
              key={field.name}
              field={field}
              value={formData[field.name]}
              onChange={(val) => updateField(field.name, val)}
            />
          ))}

          {/* Sort Order (for collection types) */}
          {!contentType.isSingle && (
            <View className="mb-5">
              <Text className="text-gray-300 text-sm font-helvetica-medium mb-2">Sort Order</Text>
              <View className="bg-[#111] border border-gray-700 rounded-lg px-4 py-3 w-24">
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e: any) => setSortOrder(parseInt(e.target.value) || 0)}
                  className="bg-transparent text-white font-helvetica text-sm w-full outline-none"
                  style={{ border: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 14 }}
                />
              </View>
              <Text className="text-gray-600 text-xs font-helvetica mt-1">
                Lower numbers appear first. Default is 0.
              </Text>
            </View>
          )}
        </View>

        {/* Status & Actions */}
        <View className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-6">
          {/* Current Status */}
          <View className="flex-row items-center mb-4">
            <Text className="text-gray-400 text-sm font-helvetica mr-3">Status:</Text>
            <View className={`px-3 py-1 rounded-full ${
              status === 'published' ? 'bg-green-900/30 border border-green-800' :
              status === 'archived' ? 'bg-gray-700/30 border border-gray-600' :
              'bg-yellow-900/30 border border-yellow-800'
            }`}>
              <Text className={`text-xs font-helvetica-bold capitalize ${
                status === 'published' ? 'text-green-400' :
                status === 'archived' ? 'text-gray-400' :
                'text-yellow-400'
              }`}>
                {status}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row flex-wrap gap-3">
            <TouchableOpacity
              onPress={() => handleSave('draft')}
              disabled={saving}
              className="bg-gray-700 rounded-lg px-6 py-3"
              activeOpacity={0.7}
            >
              {saving ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-white text-sm font-helvetica-medium">Save Draft</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSave('published')}
              disabled={saving}
              className="bg-[#C10016] rounded-lg px-6 py-3"
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
                className="bg-gray-800 rounded-lg px-6 py-3 border border-gray-700"
                activeOpacity={0.7}
              >
                <Text className="text-gray-400 text-sm font-helvetica">Archive</Text>
              </TouchableOpacity>
            )}

            {isEditing && onDelete && (
              <TouchableOpacity
                onPress={handleDelete}
                disabled={deleting}
                className="bg-red-900/20 rounded-lg px-6 py-3 border border-red-900"
                activeOpacity={0.7}
              >
                {deleting ? (
                  <ActivityIndicator color="#ef4444" size="small" />
                ) : (
                  <Text className="text-red-400 text-sm font-helvetica">Delete</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
