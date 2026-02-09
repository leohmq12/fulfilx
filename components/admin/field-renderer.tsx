import RichTextEditor from '@/components/admin/rich-text-editor';
import type { FieldDefinition } from '@/types/cms';
import React from 'react';
import { Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface FieldRendererProps {
  field: FieldDefinition;
  value: any;
  onChange: (value: any) => void;
}

const inputClass = "bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white font-helvetica text-sm";

export default function FieldRenderer({ field, value, onChange }: FieldRendererProps) {
  switch (field.type) {
    case 'text':
    case 'url':
    case 'email':
      return (
        <FieldWrapper field={field}>
          <TextInput
            value={value ?? ''}
            onChangeText={onChange}
            placeholder={field.placeholder || ''}
            placeholderTextColor="#555"
            keyboardType={field.type === 'email' ? 'email-address' : field.type === 'url' ? 'url' : 'default'}
            className={inputClass}
            style={{ outlineStyle: 'none' } as any}
          />
        </FieldWrapper>
      );

    case 'textarea':
      return (
        <FieldWrapper field={field}>
          <TextInput
            value={value ?? ''}
            onChangeText={onChange}
            placeholder={field.placeholder || ''}
            placeholderTextColor="#555"
            multiline
            numberOfLines={4}
            className={`${inputClass} min-h-[100px]`}
            style={{ outlineStyle: 'none', textAlignVertical: 'top' } as any}
          />
        </FieldWrapper>
      );

    case 'richtext':
      return (
        <FieldWrapper field={field}>
          <RichTextEditor
            value={value ?? ''}
            onChange={onChange}
            placeholder={field.placeholder || 'Start writing...'}
          />
        </FieldWrapper>
      );

    case 'number':
      return (
        <FieldWrapper field={field}>
          <TextInput
            value={value !== undefined && value !== null ? String(value) : ''}
            onChangeText={(text) => {
              const num = parseFloat(text);
              onChange(isNaN(num) ? text : num);
            }}
            placeholder={field.placeholder || '0'}
            placeholderTextColor="#555"
            keyboardType="numeric"
            className={inputClass}
            style={{ outlineStyle: 'none' } as any}
          />
        </FieldWrapper>
      );

    case 'boolean':
      return (
        <FieldWrapper field={field}>
          <View className="flex-row items-center">
            <Switch
              value={!!value}
              onValueChange={onChange}
              trackColor={{ false: '#333', true: '#C10016' }}
              thumbColor={value ? '#fff' : '#888'}
            />
            <Text className="text-gray-400 text-sm font-helvetica ml-3">
              {value ? 'Yes' : 'No'}
            </Text>
          </View>
        </FieldWrapper>
      );

    case 'select':
      return (
        <FieldWrapper field={field}>
          <View className="flex-row flex-wrap gap-2">
            {(field.options || []).map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => onChange(option)}
                className={`px-4 py-2 rounded-lg border ${
                  value === option
                    ? 'bg-[#C10016] border-[#C10016]'
                    : 'bg-[#111] border-gray-700'
                }`}
                activeOpacity={0.7}
              >
                <Text className={`text-sm font-helvetica ${
                  value === option ? 'text-white font-bold' : 'text-gray-400'
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
        <FieldWrapper field={field}>
          <TextInput
            value={value ?? ''}
            onChangeText={onChange}
            placeholder={field.placeholder || 'YYYY-MM-DD'}
            placeholderTextColor="#555"
            className={inputClass}
            style={{ outlineStyle: 'none' } as any}
          />
        </FieldWrapper>
      );

    case 'image':
      return (
        <FieldWrapper field={field}>
          <TextInput
            value={value ?? ''}
            onChangeText={onChange}
            placeholder={field.placeholder || '/path/to/image.webp'}
            placeholderTextColor="#555"
            className={inputClass}
            style={{ outlineStyle: 'none' } as any}
          />
          {value ? (
            <View className="mt-2 bg-[#111] rounded-lg p-2 border border-gray-800">
              <img
                src={value}
                alt="Preview"
                style={{ maxWidth: 200, maxHeight: 120, objectFit: 'contain', borderRadius: 4 }}
              />
            </View>
          ) : null}
          <Text className="text-gray-600 text-xs mt-1 font-helvetica">
            Enter image path (e.g., /image.webp) or upload via Media Library.
          </Text>
        </FieldWrapper>
      );

    case 'array':
      return <ArrayFieldRenderer field={field} value={value} onChange={onChange} />;

    case 'group':
      return <GroupFieldRenderer field={field} value={value} onChange={onChange} />;

    default:
      return (
        <FieldWrapper field={field}>
          <TextInput
            value={typeof value === 'string' ? value : JSON.stringify(value ?? '')}
            onChangeText={onChange}
            placeholder={field.placeholder || ''}
            placeholderTextColor="#555"
            className={inputClass}
            style={{ outlineStyle: 'none' } as any}
          />
        </FieldWrapper>
      );
  }
}

// ─── Field Wrapper ───────────────────────────────────────────────────────────

function FieldWrapper({ field, children }: { field: FieldDefinition; children: React.ReactNode }) {
  return (
    <View className="mb-5">
      <View className="flex-row items-center mb-2">
        <Text className="text-gray-300 text-sm font-helvetica-medium">
          {field.label}
        </Text>
        {field.required && (
          <Text className="text-[#C10016] text-sm ml-1">*</Text>
        )}
      </View>
      {field.helpText && (
        <Text className="text-gray-600 text-xs font-helvetica mb-2">{field.helpText}</Text>
      )}
      {children}
    </View>
  );
}

// ─── Array Field ─────────────────────────────────────────────────────────────

function ArrayFieldRenderer({ field, value, onChange }: FieldRendererProps) {
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
    <FieldWrapper field={field}>
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
              <View className="bg-[#111] border border-gray-700 rounded-lg p-3">
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
        className="border border-dashed border-gray-600 rounded-lg py-2.5 items-center mt-1"
        activeOpacity={0.7}
      >
        <Text className="text-gray-400 text-sm font-helvetica">+ Add {field.label.replace(/s$/, '')}</Text>
      </TouchableOpacity>
    </FieldWrapper>
  );
}

// ─── Group Field ─────────────────────────────────────────────────────────────

function GroupFieldRenderer({ field, value, onChange }: FieldRendererProps) {
  const groupValue = value && typeof value === 'object' ? value : {};
  const subFields = field.groupFields || [];

  const updateField = (name: string, val: any) => {
    onChange({ ...groupValue, [name]: val });
  };

  return (
    <FieldWrapper field={field}>
      <View className="bg-[#111] border border-gray-700 rounded-lg p-4">
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
