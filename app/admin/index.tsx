import { useAdminTheme } from '@/lib/admin-theme-context';
import { useAuth } from '@/lib/auth-context';
import { contentTypes } from '@/lib/content-types';
import { getActivityLog, getContentTypes } from '@/lib/cms-admin';
import type { ContentTypeOverview } from '@/types/cms';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AdminDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const { isDark } = useAdminTheme();
  const [typeStats, setTypeStats] = useState<ContentTypeOverview[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    loadActivity();
  }, []);

  const loadStats = async () => {
    try {
      const res = await getContentTypes();
      if (res.ok && res.types) setTypeStats(res.types);
    } catch {}
    setLoading(false);
  };

  const loadActivity = async () => {
    try {
      const res = await getActivityLog(10);
      if (res.ok && res.activities) setActivities(res.activities);
    } catch {}
  };

  const getStatsForType = (slug: string) => typeStats.find((t) => t.content_type === slug);
  const totalEntries = typeStats.reduce((sum, t) => sum + t.total, 0);
  const totalPublished = typeStats.reduce((sum, t) => sum + t.published, 0);
  const totalDrafts = typeStats.reduce((sum, t) => sum + t.drafts, 0);

  const bg = isDark ? 'bg-[#111]' : 'bg-gray-50';
  const cardBg = isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200';
  const textMain = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';
  const borderCard = isDark ? 'border-gray-800' : 'border-gray-200';

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className={`flex-1 ${bg}`}>
        <View className="max-w-5xl w-full mx-auto px-4 py-6">
          <View className="mb-6">
            <Text className={`font-helvetica-bold text-2xl mb-0.5 ${textMain}`}>Dashboard</Text>
            <Text className={`font-helvetica text-sm ${textMuted}`}>
              Manage your website content.
            </Text>
          </View>

          {/* Stats row - compact */}
          <View className="flex-row flex-wrap gap-3 mb-6">
            <View className={`${cardBg} border rounded-lg p-4 min-w-[140px] flex-1`}>
              <Text className={`text-xs font-helvetica uppercase tracking-wider mb-0.5 ${textMuted}`}>
                Total
              </Text>
              <Text className={`font-helvetica-bold text-2xl ${textMain}`}>
                {loading ? '—' : totalEntries}
              </Text>
            </View>
            <View className={`${cardBg} border rounded-lg p-4 min-w-[140px] flex-1`}>
              <Text className={`text-xs font-helvetica uppercase tracking-wider mb-0.5 ${textMuted}`}>
                Published
              </Text>
              <Text className="font-helvetica-bold text-2xl text-green-600">
                {loading ? '—' : totalPublished}
              </Text>
            </View>
            <View className={`${cardBg} border rounded-lg p-4 min-w-[140px] flex-1`}>
              <Text className={`text-xs font-helvetica uppercase tracking-wider mb-0.5 ${textMuted}`}>
                Drafts
              </Text>
              <Text className="font-helvetica-bold text-2xl text-amber-600">
                {loading ? '—' : totalDrafts}
              </Text>
            </View>
            <View className={`${cardBg} border rounded-lg p-4 min-w-[140px] flex-1`}>
              <Text className={`text-xs font-helvetica uppercase tracking-wider mb-0.5 ${textMuted}`}>
                Content types
              </Text>
              <Text className={`font-helvetica-bold text-2xl ${textMain}`}>{contentTypes.length}</Text>
            </View>
          </View>

          {user?.role === 'developer' && (
            <TouchableOpacity
              onPress={() => router.push('/admin/developer' as any)}
              className={`${cardBg} border rounded-lg p-4 mb-6 flex-row items-center`}
              activeOpacity={0.7}
            >
              <Text className="text-2xl mr-3">🗄️</Text>
              <View className="flex-1">
                <Text className={`font-helvetica-bold text-base ${textMain}`}>Database</Text>
                <Text className={`font-helvetica text-sm ${textMuted}`}>
                  View tables and run read-only SELECT queries (developer only).
                </Text>
              </View>
              <Text className={`font-helvetica text-sm ${textMuted}`}>Open →</Text>
            </TouchableOpacity>
          )}

          {totalEntries === 0 && !loading && (
            <View className={`rounded-lg p-4 mb-6 ${isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
              <Text className="font-helvetica-bold text-base text-blue-700 mb-1">Getting started</Text>
              <Text className={`font-helvetica text-sm ${isDark ? 'text-blue-300/80' : 'text-blue-800/80'}`}>
                Start by adding content. Use Contact Info and Site Settings first for site-wide settings.
              </Text>
            </View>
          )}

          <Text className={`font-helvetica-bold text-lg mb-3 ${textMain}`}>Content types</Text>
          <View className="flex-row flex-wrap gap-3">
            {contentTypes.map((ct) => {
              const stats = getStatsForType(ct.slug);
              return (
                <TouchableOpacity
                  key={ct.slug}
                  onPress={() => router.push(`/admin/content/${ct.slug}` as any)}
                  className={`${cardBg} border rounded-lg p-4`}
                  style={{ flexBasis: '30%', minWidth: 220 }}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center mb-2">
                    <Text className="text-xl mr-2">{ct.icon}</Text>
                    <View className="flex-1 min-w-0">
                      <Text className={`font-helvetica-bold text-sm ${textMain}`} numberOfLines={1}>
                        {ct.namePlural}
                      </Text>
                      <Text className={`font-helvetica text-xs ${textMuted}`}>
                        {ct.isSingle ? 'Single' : 'Collection'}
                      </Text>
                    </View>
                  </View>
                  <Text className={`text-xs font-helvetica mb-2 ${textMuted}`} numberOfLines={2}>
                    {ct.description}
                  </Text>
                  {stats ? (
                    <View className="flex-row gap-2">
                      <Text className="text-green-600 text-xs font-helvetica">{stats.published} published</Text>
                      {stats.drafts > 0 && (
                        <Text className="text-amber-600 text-xs font-helvetica">{stats.drafts} drafts</Text>
                      )}
                    </View>
                  ) : (
                    <Text className={`text-xs font-helvetica ${textMuted}`}>No entries yet</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {activities.length > 0 && (
            <View className="mt-6">
              <Text className={`font-helvetica-bold text-lg mb-3 ${textMain}`}>Recent activity</Text>
              <View className={`${cardBg} border rounded-lg overflow-hidden ${borderCard}`}>
                {activities.map((act: any, i: number) => (
                  <View
                    key={act.id}
                    className={`px-4 py-2.5 flex-row items-center ${i < activities.length - 1 ? (isDark ? 'border-b border-gray-800' : 'border-b border-gray-100') : ''}`}
                  >
                    <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <Text className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-700'}`}>
                        {(act.user_name || '?').charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-1 min-w-0">
                      <Text className={`text-sm font-helvetica ${textMuted}`}>
                        <Text className={textMain}>{act.user_name || 'System'}</Text>
                        {' '}
                        {act.action === 'create' ? 'created' : act.action === 'update' ? 'updated' : act.action === 'delete' ? 'deleted' : act.action}
                        {act.entity_type ? ` ${act.entity_type}` : ''}
                      </Text>
                    </View>
                    <Text className={`text-xs font-helvetica ${textMuted}`}>
                      {new Date(act.created_at).toLocaleString()}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}
