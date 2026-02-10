/**
 * WordPress-style compact sidebar for CMS admin.
 * Theme-aware (dark/light), collapsible to icons.
 */
import { useAdminTheme } from '@/lib/admin-theme-context';
import { useAuth } from '@/lib/auth-context';
import { contentTypes, getSingleTypes, getCollectionTypes } from '@/lib/content-types';
import { useRouter, useSegments } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const router = useRouter();
  const segments = useSegments();
  const { user } = useAuth();
  const { isDark } = useAdminTheme();
  const [contentExpanded, setContentExpanded] = useState(true);

  const currentPath = '/' + segments.join('/');

  const isActive = (path: string) => {
    if (path === '/admin' && currentPath === '/admin') return true;
    if (path !== '/admin' && currentPath.startsWith(path)) return true;
    return false;
  };

  const sidebarBg = isDark ? 'bg-[#0f0f0f] border-r border-gray-800' : 'bg-white border-r border-gray-200';
  const navHover = isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100';
  const activeBg = 'bg-[#C10016]';
  const textMain = isDark ? 'text-gray-200' : 'text-gray-800';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';
  const sectionLabel = isDark ? 'text-gray-500' : 'text-gray-400';

  const navItem = (label: string, path: string, icon: string) => {
    const active = isActive(path);
    return (
      <TouchableOpacity
        key={path}
        onPress={() => router.push(path as any)}
        className={`flex-row items-center px-3 py-2.5 mx-1.5 rounded-md mb-0.5 ${active ? activeBg : navHover}`}
        activeOpacity={0.7}
      >
        <Text className="text-base mr-2.5 w-5 text-center">{icon}</Text>
        {!collapsed && (
          <Text
            className={`text-sm font-helvetica flex-1 ${active ? 'text-white font-medium' : textMain}`}
            numberOfLines={1}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  if (collapsed) {
    return (
      <View className={`w-14 ${sidebarBg} min-h-screen flex flex-col`}>
        <TouchableOpacity onPress={onToggle} className="p-2.5 items-center justify-center">
          <Text className="text-lg">☰</Text>
        </TouchableOpacity>
        <View className="flex-1 pt-2">
          {navItem('', '/admin', '📊')}
          {getSingleTypes().slice(0, 2).map((ct) => navItem('', `/admin/content/${ct.slug}`, ct.icon))}
        {getCollectionTypes().slice(0, 2).map((ct) => navItem('', `/admin/content/${ct.slug}`, ct.icon))}
        </View>
      </View>
    );
  }

  return (
    <View className={`w-52 ${sidebarBg} min-h-screen flex flex-col`}>
      {/* Logo / brand */}
      <View className={`px-3 py-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <View className="flex-row items-center">
          <View className="w-8 h-8 bg-[#C10016] rounded-lg items-center justify-center mr-2.5">
            <Text className="text-white font-bold text-xs">FX</Text>
          </View>
          <View className="flex-1 min-w-0">
            <Text className={`font-helvetica-bold text-sm ${textMain}`}>FULFIL.X</Text>
            <Text className={`font-helvetica text-xs ${textMuted}`}>CMS</Text>
          </View>
        </View>
        {onToggle && (
          <TouchableOpacity onPress={onToggle} className="absolute right-2 top-3 p-1" activeOpacity={0.7}>
            <Text className={`text-sm ${textMuted}`}>◀</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView className="flex-1 py-2" showsVerticalScrollIndicator={false}>
        {navItem('Dashboard', '/admin', '📊')}

        {user?.role === 'developer' && (
          <>
            <View className="mt-3 px-3">
              <Text className={`font-helvetica-bold text-[11px] uppercase tracking-wider py-1.5 ${sectionLabel}`}>
                Developer
              </Text>
            </View>
            {navItem('Database', '/admin/developer', '🗄️')}
          </>
        )}

        <View className="mt-3 px-3">
          <TouchableOpacity
            onPress={() => setContentExpanded(!contentExpanded)}
            className="flex-row items-center justify-between py-1.5"
          >
            <Text className={`font-helvetica-bold text-[11px] uppercase tracking-wider ${sectionLabel}`}>
              Content
            </Text>
            <Text className={`text-xs ${sectionLabel}`}>{contentExpanded ? '▼' : '▶'}</Text>
          </TouchableOpacity>
        </View>
        {contentExpanded && (
          <>
            {navItem('All content', '/admin/content', '📄')}
            <View className="mt-2 px-0">
              <Text className={`font-helvetica-bold text-[10px] uppercase tracking-wider py-1 px-3 ${sectionLabel}`}>
                Pages
              </Text>
              {getSingleTypes().map((ct) =>
                navItem(ct.namePlural, `/admin/content/${ct.slug}`, ct.icon)
              )}
            </View>
            <View className="mt-2 px-0">
              <Text className={`font-helvetica-bold text-[10px] uppercase tracking-wider py-1 px-3 ${sectionLabel}`}>
                Categories
              </Text>
              {getCollectionTypes().map((ct) =>
                navItem(ct.namePlural, `/admin/content/${ct.slug}`, ct.icon)
              )}
            </View>
          </>
        )}

        <View className="mt-3 px-3">
          <Text className={`font-helvetica-bold text-[11px] uppercase tracking-wider py-1.5 ${sectionLabel}`}>
            Media
          </Text>
        </View>
        {navItem('Media Library', '/admin/media', '🖼️')}

        <View className="mt-3 px-3">
          <Text className={`font-helvetica-bold text-[11px] uppercase tracking-wider py-1.5 ${sectionLabel}`}>
            Admin
          </Text>
        </View>
        {navItem('Users', '/admin/users', '👥')}
        {navItem('Settings', '/admin/settings', '⚙️')}
      </ScrollView>

      {/* User footer - compact */}
      <View className={`border-t p-3 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <View className="flex-row items-center mb-2">
          <View className={`w-7 h-7 rounded-full items-center justify-center mr-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <Text className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-700'}`}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View className="flex-1 min-w-0">
            <Text className={`font-helvetica-medium text-xs ${textMain}`} numberOfLines={1}>
              {user?.name || 'User'}
            </Text>
            <Text className={`font-helvetica text-[10px] capitalize ${textMuted}`}>
              {user?.role || 'editor'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
