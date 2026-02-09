import { contentTypes } from '@/lib/content-types';
import { getActivityLog, getContentTypes } from '@/lib/cms-admin';
import type { ContentTypeOverview } from '@/types/cms';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AdminDashboard() {
  const router = useRouter();
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
      if (res.ok && res.types) {
        setTypeStats(res.types);
      }
    } catch {
      // CMS may not be set up yet
    }
    setLoading(false);
  };

  const loadActivity = async () => {
    try {
      const res = await getActivityLog(10);
      if (res.ok && res.activities) {
        setActivities(res.activities);
      }
    } catch {}
  };

  const getStatsForType = (slug: string) => {
    return typeStats.find((t) => t.content_type === slug);
  };

  const totalEntries = typeStats.reduce((sum, t) => sum + t.total, 0);
  const totalPublished = typeStats.reduce((sum, t) => sum + t.published, 0);
  const totalDrafts = typeStats.reduce((sum, t) => sum + t.drafts, 0);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1 bg-[#111]">
        <View className="max-w-6xl w-full mx-auto px-6 py-8">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-white font-helvetica-bold text-3xl mb-2">Dashboard</Text>
            <Text className="text-gray-500 font-helvetica">
              Manage your website content from here.
            </Text>
          </View>

          {/* Stats Cards */}
          <View className="flex-row flex-wrap gap-4 mb-8">
            <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 min-w-[180px] flex-1">
              <Text className="text-gray-500 text-xs font-helvetica uppercase tracking-wider mb-1">
                Total Entries
              </Text>
              <Text className="text-white font-helvetica-bold text-3xl">
                {loading ? '...' : totalEntries}
              </Text>
            </View>
            <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 min-w-[180px] flex-1">
              <Text className="text-gray-500 text-xs font-helvetica uppercase tracking-wider mb-1">
                Published
              </Text>
              <Text className="text-green-400 font-helvetica-bold text-3xl">
                {loading ? '...' : totalPublished}
              </Text>
            </View>
            <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 min-w-[180px] flex-1">
              <Text className="text-gray-500 text-xs font-helvetica uppercase tracking-wider mb-1">
                Drafts
              </Text>
              <Text className="text-yellow-400 font-helvetica-bold text-3xl">
                {loading ? '...' : totalDrafts}
              </Text>
            </View>
            <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 min-w-[180px] flex-1">
              <Text className="text-gray-500 text-xs font-helvetica uppercase tracking-wider mb-1">
                Content Types
              </Text>
              <Text className="text-white font-helvetica-bold text-3xl">{contentTypes.length}</Text>
            </View>
          </View>

          {/* Quick Setup */}
          {totalEntries === 0 && !loading && (
            <View className="bg-blue-900/20 border border-blue-800 rounded-xl p-6 mb-8">
              <Text className="text-blue-400 font-helvetica-bold text-lg mb-2">
                Getting Started
              </Text>
              <Text className="text-blue-300/70 font-helvetica text-sm mb-4">
                Your CMS is set up and ready. Start by adding content to your website.
                Click on any content type below to create your first entry.
              </Text>
              <Text className="text-blue-300/50 font-helvetica text-xs">
                Tip: Start with "Contact Info" and "Site Settings" to configure your site-wide content.
              </Text>
            </View>
          )}

          {/* Content Types Grid */}
          <View className="mb-4">
            <Text className="text-white font-helvetica-bold text-xl mb-4">Content Types</Text>
          </View>
          <View className="flex-row flex-wrap gap-4">
            {contentTypes.map((ct) => {
              const stats = getStatsForType(ct.slug);
              return (
                <TouchableOpacity
                  key={ct.slug}
                  onPress={() => router.push(`/admin/content/${ct.slug}` as any)}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 hover:border-gray-600"
                  style={{ flexBasis: '30%', minWidth: 250 }}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center mb-3">
                    <Text className="text-2xl mr-3">{ct.icon}</Text>
                    <View className="flex-1">
                      <Text className="text-white font-helvetica-bold text-base">{ct.namePlural}</Text>
                      <Text className="text-gray-500 text-xs font-helvetica">
                        {ct.isSingle ? 'Single type' : 'Collection'}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-gray-500 text-xs font-helvetica mb-3" numberOfLines={2}>
                    {ct.description}
                  </Text>
                  {stats ? (
                    <View className="flex-row gap-3">
                      <Text className="text-green-400 text-xs font-helvetica">
                        {stats.published} published
                      </Text>
                      {stats.drafts > 0 && (
                        <Text className="text-yellow-400 text-xs font-helvetica">
                          {stats.drafts} drafts
                        </Text>
                      )}
                    </View>
                  ) : (
                    <Text className="text-gray-600 text-xs font-helvetica">No entries yet</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Recent Activity */}
          {activities.length > 0 && (
            <View className="mt-8">
              <Text className="text-white font-helvetica-bold text-xl mb-4">Recent Activity</Text>
              <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl">
                {activities.map((act: any, i: number) => (
                  <View
                    key={act.id}
                    className={`px-5 py-3 flex-row items-center ${i < activities.length - 1 ? 'border-b border-gray-800' : ''}`}
                  >
                    <View className="w-8 h-8 bg-gray-700 rounded-full items-center justify-center mr-3">
                      <Text className="text-white text-xs font-bold">
                        {(act.user_name || '?').charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-300 text-sm font-helvetica">
                        <Text className="text-white font-helvetica-medium">{act.user_name || 'System'}</Text>
                        {' '}
                        {act.action === 'create' ? 'created' :
                         act.action === 'update' ? 'updated' :
                         act.action === 'delete' ? 'deleted' :
                         act.action === 'login' ? 'logged in' :
                         act.action === 'upload' ? 'uploaded' :
                         act.action}
                        {act.entity_type ? ` a ${act.entity_type}` : ''}
                      </Text>
                    </View>
                    <Text className="text-gray-600 text-xs font-helvetica">
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
