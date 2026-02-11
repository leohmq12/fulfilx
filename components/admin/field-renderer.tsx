import MediaPickerModal from '@/components/admin/media-picker-modal';
import RichTextEditor from '@/components/admin/rich-text-editor';
import { useAdminTheme } from '@/lib/admin-theme-context';
import { getMediaFullUrl } from '@/lib/cms-admin';
import type { FieldDefinition } from '@/types/cms';
import React, { useState } from 'react';
import { Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface FieldRendererProps {
  field: FieldDefinition;
  value: any;
  onChange: (value: any) => void;
}

export default function FieldRenderer({ field, value, onChange }: FieldRendererProps) {
  const { isDark } = useAdminTheme();
  const inputClass = isDark
    ? 'bg-[#111] border border-gray-700 rounded-lg px-3 py-2.5 text-white font-helvetica text-sm'
    : 'bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 font-helvetica text-sm';
  const arrayInputClass = isDark
    ? 'bg-[#1a1a1a] border border-gray-700 rounded px-3 py-2 text-white font-helvetica text-sm'
    : 'bg-white border border-gray-300 rounded px-3 py-2 text-gray-900 font-helvetica text-sm';

  switch (field.type) {
    case 'text':
    case 'url':
    case 'email':
      return (
        <FieldWrapper field={field} isDark={isDark}>
          <TextInput
            value={value ?? ''}
            onChangeText={onChange}
            placeholder={field.placeholder || ''}
            placeholderTextColor={isDark ? '#555' : '#888'}
            keyboardType={field.type === 'email' ? 'email-address' : field.type === 'url' ? 'url' : 'default'}
            className={inputClass}
            style={{ outlineStyle: 'none' } as any}
          />
        </FieldWrapper>
      );

    case 'textarea':
      return (
        <FieldWrapper field={field} isDark={isDark}>
          <TextInput
            value={value ?? ''}
            onChangeText={onChange}
            placeholder={field.placeholder || ''}
            placeholderTextColor={isDark ? '#555' : '#888'}
            multiline
            numberOfLines={4}
            className={`${inputClass} min-h-[100px]`}
            style={{ outlineStyle: 'none', textAlignVertical: 'top' } as any}
          />
        </FieldWrapper>
      );

    case 'richtext':
      return (
        <FieldWrapper field={field} isDark={isDark}>
          <RichTextEditor
            value={value ?? ''}
            onChange={onChange}
            placeholder={field.placeholder || 'Start writing...'}
          />
        </FieldWrapper>
      );

    case 'number':
      return (
        <FieldWrapper field={field} isDark={isDark}>
          <TextInput
            value={value !== undefined && value !== null ? String(value) : ''}
            onChangeText={(text) => {
              const num = parseFloat(text);
              onChange(isNaN(num) ? text : num);
            }}
            placeholder={field.placeholder || '0'}
            placeholderTextColor={isDark ? '#555' : '#888'}
            keyboardType="numeric"
            className={inputClass}
            style={{ outlineStyle: 'none' } as any}
          />
        </FieldWrapper>
      );

    case 'boolean':
      return (
        <FieldWrapper field={field} isDark={isDark}>
          <View className="flex-row items-center">
            <Switch
              value={!!value}
              onValueChange={onChange}
              trackColor={{ false: isDark ? '#333' : '#d1d5db', true: '#C10016' }}
              thumbColor={value ? '#fff' : isDark ? '#888' : '#9ca3af'}
            />
            <Text className={`text-sm font-helvetica ml-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {value ? 'Yes' : 'No'}
            </Text>
          </View>
        </FieldWrapper>
      );

    case 'select':
      return (
        <FieldWrapper field={field} isDark={isDark}>
          <View className="flex-row flex-wrap gap-2">
            {(field.options || []).map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => onChange(option)}
                className={`px-3 py-2 rounded-lg border ${
                  value === option
                    ? 'bg-[#C10016] border-[#C10016]'
                    : isDark ? 'bg-[#111] border-gray-700' : 'bg-white border-gray-300'
                }`}
                activeOpacity={0.7}
              >
                <Text className={`text-sm font-helvetica ${
                  value === option ? 'text-white font-bold' : isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </FieldWrapper>
      );

    case 'date':
      return (
        <FieldWrapper field={field} isDark={isDark}>
          <TextInput
            value={value ?? ''}
            onChangeText={onChange}
            placeholder={field.placeholder || 'YYYY-MM-DD'}
            placeholderTextColor={isDark ? '#555' : '#888'}
            className={inputClass}
            style={{ outlineStyle: 'none' } as any}
          />
        </FieldWrapper>
      );

    case 'image':
      return (
        <ImageFieldRenderer
          field={field}
          value={value}
          onChange={onChange}
          isDark={isDark}
          inputClass={inputClass}
        />
      );

    case 'array':
      return <ArrayFieldRenderer field={field} value={value} onChange={onChange} isDark={isDark} arrayInputClass={arrayInputClass} />;

    case 'group':
      return <GroupFieldRenderer field={field} value={value} onChange={onChange} isDark={isDark} />;

    default:
      return (
        <FieldWrapper field={field} isDark={isDark}>
          <TextInput
            value={typeof value === 'string' ? value : JSON.stringify(value ?? '')}
            onChangeText={onChange}
            placeholder={field.placeholder || ''}
            placeholderTextColor={isDark ? '#555' : '#888'}
            className={inputClass}
            style={{ outlineStyle: 'none' } as any}
          />
        </FieldWrapper>
      );
  }
}

// ─── Image Field (with media library picker) ──────────────────────────────────

function ImageFieldRenderer({
  field,
  value,
  onChange,
  isDark,
  inputClass,
}: FieldRendererProps & { isDark: boolean; inputClass: string }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const displayUrl = value && (value.startsWith('http') || value.startsWith('//')) ? value : (value ? getMediaFullUrl(value) : '');

  return (
    <FieldWrapper field={field} isDark={isDark}>
      <View className="flex-row gap-2">
        <TextInput
          value={value ?? ''}
          onChangeText={onChange}
          placeholder={field.placeholder || '/uploads/...'}
          placeholderTextColor={isDark ? '#555' : '#888'}
          className={`flex-1 ${inputClass}`}
          style={{ outlineStyle: 'none' } as any}
        />
        <TouchableOpacity
          onPress={() => setPickerOpen(true)}
          className={`rounded-lg px-4 py-2.5 justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
          activeOpacity={0.7}
        >
          <Text className={`text-sm font-helvetica font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Pick from library
          </Text>
        </TouchableOpacity>
      </View>
      {value ? (
        <View className={`mt-2 rounded-lg p-2 border ${isDark ? 'bg-[#111] border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
          <img
            src={displayUrl}
            alt="Preview"
            style={{ maxWidth: 200, maxHeight: 120, objectFit: 'contain', borderRadius: 4 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </View>
      ) : null}
      <MediaPickerModal
        visible={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => { onChange(url); setPickerOpen(false); }}
        imagesOnly
      />
    </FieldWrapper>
  );
}

// ─── Field Wrapper ───────────────────────────────────────────────────────────

function FieldWrapper({ field, children, isDark }: { field: FieldDefinition; children: React.ReactNode; isDark: boolean }) {
  return (
    <View className="mb-4">
      <View className="flex-row items-center mb-1.5">
        <Text className={`text-sm font-helvetica-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {field.label}
        </Text>
        {field.required && (
          <Text className="text-[#C10016] text-sm ml-1">*</Text>
        )}
      </View>
      {field.helpText && (
        <Text className={`text-xs font-helvetica mb-1.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{field.helpText}</Text>
      )}
      {children}
    </View>
  );
}

// ─── Array Field ─────────────────────────────────────────────────────────────

function ArrayFieldRenderer({
  field,
  value,
  onChange,
  isDark,
  arrayInputClass,
}: FieldRendererProps & { isDark: boolean; arrayInputClass: string }) {
  const items = Array.isArray(value) ? value : [];
  const subFields = field.arrayFields || [];

  const addItem = () => {
    const newItem: Record<string, any> = {};
    subFields.forEach((sf) => {
      newItem[sf.name] = sf.defaultValue ?? '';
    });
    onChange([...items, subFields.length === 1 ? '' : newItem]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_: any, i: number) => i !== index));
  };

  const updateItem = (index: number, newValue: any) => {
    const updated = [...items];
    updated[index] = newValue;
    onChange(updated);
  };

  const isSingleField = subFields.length === 1;

  return (
    <FieldWrapper field={field} isDark={isDark}>
      {items.map((item: any, index: number) => (
        <View key={index} className="flex-row items-start mb-2 gap-2">
          <View className="flex-1">
            {isSingleField ? (
              <FieldRenderer
                field={subFields[0]}
                value={typeof item === 'string' ? item : (item?.[subFields[0].name] ?? '')}
                onChange={(val) => updateItem(index, isSingleField ? val : { [subFields[0].name]: val })}
              />
            ) : (
              <View className={`border rounded-lg p-3 ${isDark ? 'bg-[#111] border-gray-700' : 'bg-gray-50 border-gray-300'}`}>
                {subFields.map((sf) => (
                  <View key={sf.name} className="mb-2 last:mb-0">
                    <FieldRenderer
                      field={sf}
                      value={item?.[sf.name] ?? ''}
                      onChange={(val) => updateItem(index, { ...item, [sf.name]: val })}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={() => removeItem(index)}
            className="bg-red-900/30 border border-red-800 rounded-lg px-3 py-3 mt-0"
            activeOpacity={0.7}
          >
            <Text className="text-red-400 text-sm">✕</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        onPress={addItem}
        className={`border border-dashed rounded-lg py-2 items-center mt-1 ${isDark ? 'border-gray-600' : 'border-gray-400'}`}
        activeOpacity={0.7}
      >
        <Text className={`text-sm font-helvetica ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+ Add {field.label.replace(/s$/, '')}</Text>
      </TouchableOpacity>
    </FieldWrapper>
  );
}

// ─── Group Field ─────────────────────────────────────────────────────────────

function GroupFieldRenderer({ field, value, onChange, isDark }: FieldRendererProps & { isDark?: boolean }) {
  const groupValue = value && typeof value === 'object' ? value : {};
  const subFields = field.groupFields || [];
  const dark = isDark ?? true;

  const updateField = (name: string, val: any) => {
    onChange({ ...groupValue, [name]: val });
  };

  return (
    <FieldWrapper field={field} isDark={dark}>
      <View className={`border rounded-lg p-4 ${dark ? 'bg-[#111] border-gray-700' : 'bg-gray-50 border-gray-300'}`}>
        {subFields.map((sf) => (
          <FieldRenderer
            key={sf.name}
            field={sf}
            value={groupValue[sf.name]}
            onChange={(val) => updateField(sf.name, val)}
          />
        ))}
      </View>
    </FieldWrapper>
  );
}
