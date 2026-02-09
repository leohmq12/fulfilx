import { useAuth } from '@/lib/auth-context';
import { contentTypes } from '@/lib/content-types';
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
  const { user, logout } = useAuth();
  const [contentExpanded, setContentExpanded] = useState(true);

  const currentPath = '/' + segments.join('/');

  const isActive = (path: string) => {
    if (path === '/admin' && currentPath === '/admin') return true;
    if (path !== '/admin' && currentPath.startsWith(path)) return true;
    return false;
  };

  const navItem = (label: string, path: string, icon: string) => (
    <TouchableOpacity
      key={path}
      onPress={() => router.push(path as any)}
      className={`flex-row items-center px-4 py-3 mx-2 rounded-lg mb-0.5 ${
        isActive(path) ? 'bg-[#C10016]' : 'hover:bg-white/5'
      }`}
      activeOpacity={0.7}
    >
      <Text className="text-base mr-3">{icon}</Text>
      {!collapsed && (
        <Text className={`text-sm font-helvetica ${isActive(path) ? 'text-white font-bold' : 'text-gray-300'}`}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (collapsed) {
    return (
      <View className="w-16 bg-[#0a0a0a] border-r border-gray-800 min-h-screen">
        <TouchableOpacity onPress={onToggle} className="p-4 items-center">
          <Text className="text-white text-lg">☰</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="w-64 bg-[#0a0a0a] border-r border-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      <View className="px-4 py-5 border-b border-gray-800 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="w-8 h-8 bg-[#C10016] rounded-lg items-center justify-center mr-3">
            <Text className="text-white font-bold text-sm">FX</Text>
          </View>
          <View>
            <Text className="text-white font-helvetica-bold text-sm">FULFIL.X</Text>
            <Text className="text-gray-500 text-xs font-helvetica">CMS Admin</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onToggle} className="p-1">
          <Text className="text-gray-500 text-lg">◀</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation */}
      <ScrollView className="flex-1 py-4">
        {navItem('Dashboard', '/admin', '📊')}
        
        {/* Content Section */}
        <TouchableOpacity
          onPress={() => setContentExpanded(!contentExpanded)}
          className="flex-row items-center justify-between px-4 py-2 mx-2 mt-4"
        >
          <Text className="text-gray-500 text-xs font-helvetica-bold uppercase tracking-wider">
            Content
          </Text>
          <Text className="text-gray-500 text-xs">{contentExpanded ? '▼' : '▶'}</Text>
        </TouchableOpacity>

        {contentExpanded && (
          <>
            {navItem('All Content', '/admin/content', '📄')}
            {contentTypes.map((ct) =>
              navItem(
                ct.namePlural,
                `/admin/content/${ct.slug}`,
                ct.icon
              )
            )}
          </>
        )}

        {/* Media */}
        <View className="mt-4">
          <Text className="text-gray-500 text-xs font-helvetica-bold uppercase tracking-wider px-4 py-2 mx-2">
            Assets
          </Text>
          {navItem('Media Library', '/admin/media', '🖼️')}
        </View>

        {/* Admin */}
        <View className="mt-4">
          <Text className="text-gray-500 text-xs font-helvetica-bold uppercase tracking-wider px-4 py-2 mx-2">
            Admin
          </Text>
          {navItem('Users', '/admin/users', '👥')}
          {navItem('Settings', '/admin/settings', '⚙️')}
        </View>
      </ScrollView>

      {/* User Footer */}
      <View className="border-t border-gray-800 p-4">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center flex-1">
            <View className="w-8 h-8 bg-gray-700 rounded-full items-center justify-center mr-2">
              <Text className="text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-sm font-helvetica" numberOfLines={1}>
                {user?.name || 'User'}
              </Text>
              <Text className="text-gray-500 text-xs font-helvetica capitalize">
                {user?.role || 'editor'}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={logout}
          className="bg-gray-800 rounded-lg py-2 px-3 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-gray-400 text-xs font-helvetica">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
