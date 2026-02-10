/**
 * Top bar for the CMS admin: title area, theme toggle, user menu.
 * WordPress-style compact header; theme-aware.
 */
import { useAdminTheme } from '@/lib/admin-theme-context';
import { useAuth } from '@/lib/auth-context';
import { useRouter, useSegments } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  onMenuPress?: () => void;
}

export default function AdminHeader({ title, subtitle, onMenuPress }: AdminHeaderProps) {
  const { theme, toggleTheme, isDark } = useAdminTheme();
  const { user, logout } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const bg = isDark ? 'bg-[#1a1a1a] border-b border-gray-800' : 'bg-white border-b border-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const hover = isDark ? 'bg-white/5' : 'bg-gray-100';

  return (
    <View
      className={`${bg} px-4 py-3 flex-row items-center justify-between`}
      style={{ minHeight: 48, zIndex: 100 }}
    >
      {/* Left: menu + title */}
      <View className="flex-row items-center flex-1 min-w-0">
        {onMenuPress && (
          <TouchableOpacity
            onPress={onMenuPress}
            className={`p-2 -ml-2 rounded-lg ${hover}`}
            activeOpacity={0.7}
          >
            <Text className="text-lg">{isDark ? '☰' : '☰'}</Text>
          </TouchableOpacity>
        )}
        <View className="ml-3 min-w-0 flex-1">
          {title ? (
            <>
              <Text className={`font-helvetica-bold text-base ${text}`} numberOfLines={1}>
                {title}
              </Text>
              {subtitle ? (
                <Text className={`font-helvetica text-xs ${textMuted} mt-0.5`} numberOfLines={1}>
                  {subtitle}
                </Text>
              ) : null}
            </>
          ) : (
            <Text className={`font-helvetica-bold text-sm ${textMuted}`}>FULFIL.X CMS</Text>
          )}
        </View>
      </View>

      {/* Right: theme toggle + user */}
      <View className="flex-row items-center gap-1">
        <TouchableOpacity
          onPress={toggleTheme}
          className={`p-2 rounded-lg ${hover}`}
          activeOpacity={0.7}
          accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <Text className="text-lg">{isDark ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>

        <View style={{ position: 'relative', zIndex: 1000 }}>
          <TouchableOpacity
            onPress={() => setUserMenuOpen(!userMenuOpen)}
            className={`flex-row items-center gap-2 p-2 rounded-lg ${hover}`}
            activeOpacity={0.7}
          >
            <View
              className={`w-8 h-8 rounded-full items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
            >
              <Text className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-700'}`}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <View className="hidden md:flex flex-col items-start">
              <Text className={`font-helvetica-medium text-xs ${text}`} numberOfLines={1}>
                {user?.name || 'User'}
              </Text>
              <Text className={`font-helvetica text-xs capitalize ${textMuted}`}>
                {user?.role || 'editor'}
              </Text>
            </View>
          </TouchableOpacity>

          {userMenuOpen && (
            <View
              className={`absolute right-0 top-full mt-1 rounded-lg border shadow-lg min-w-[160px] ${
                isDark ? 'bg-[#252525] border-gray-700' : 'bg-white border-gray-200'
              }`}
              style={{ zIndex: 9999, elevation: 9999 }}
            >
              <View className="p-2 border-b border-gray-700">
                <Text className={`font-helvetica-medium text-sm ${text}`}>{user?.name || 'User'}</Text>
                <Text className={`font-helvetica text-xs ${textMuted}`}>{user?.email}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setUserMenuOpen(false);
                  logout();
                }}
                className="p-3 flex-row items-center"
                activeOpacity={0.7}
              >
                <Text className={`font-helvetica text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sign out
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
