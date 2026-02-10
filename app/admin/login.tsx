import { useAdminTheme } from '@/lib/admin-theme-context';
import { useAuth } from '@/lib/auth-context';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AdminLoginScreen() {
  const { login } = useAuth();
  const { isDark, toggleTheme } = useAdminTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('Please enter email and password');
      return;
    }
    setError('');
    setLoading(true);
    const result = await login(email.trim(), password);
    if (!result.ok) setError(result.error || 'Login failed');
    setLoading(false);
  };

  const pageBg = isDark ? 'bg-[#0a0a0a]' : 'bg-gray-100';
  const cardBg = isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200';
  const textMain = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const inputBg = isDark ? 'bg-[#111] border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900';

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className={`flex-1 items-center justify-center ${pageBg}`} style={{ minHeight: '100vh' }}>
        <TouchableOpacity
          onPress={toggleTheme}
          className="absolute top-6 right-6 p-2 rounded-lg opacity-80"
          activeOpacity={0.7}
          accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <Text className="text-2xl">{isDark ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
        <View className="w-full max-w-md px-4">
          <View className="items-center mb-8">
            <View className="w-14 h-14 bg-[#C10016] rounded-xl items-center justify-center mb-3">
              <Text className="text-white font-bold text-xl">FX</Text>
            </View>
            <Text className={`font-helvetica-bold text-xl ${textMain}`}>FULFIL.X CMS</Text>
            <Text className={`font-helvetica text-sm mt-0.5 ${textMuted}`}>Sign in to manage your content</Text>
          </View>

          <View className={`rounded-xl p-6 border ${cardBg}`}>
            {error ? (
              <View className="bg-red-50 border border-red-200 rounded-lg p-2.5 mb-4">
                <Text className="text-red-600 text-sm font-helvetica text-center">{error}</Text>
              </View>
            ) : null}

            <View className="mb-4">
              <Text className={`text-sm font-helvetica mb-1.5 ${textMuted}`}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="admin@fulfilx.co.uk"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                editable={!loading}
                onSubmitEditing={handleLogin}
                className={`border rounded-lg px-3.5 py-2.5 font-helvetica text-sm ${inputBg}`}
                style={{ outlineStyle: 'none' } as any}
              />
            </View>

            <View className="mb-5">
              <Text className={`text-sm font-helvetica mb-1.5 ${textMuted}`}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#888"
                secureTextEntry
                editable={!loading}
                onSubmitEditing={handleLogin}
                className={`border rounded-lg px-3.5 py-2.5 font-helvetica text-sm ${inputBg}`}
                style={{ outlineStyle: 'none' } as any}
              />
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className={`rounded-lg py-3 items-center ${loading ? 'bg-[#8a0010]' : 'bg-[#C10016]'}`}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-white font-helvetica-bold text-sm">Sign In</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text className={`font-helvetica text-xs text-center mt-6 ${textMuted}`}>
            FULFIL.X Content Management System
          </Text>
        </View>
      </View>
    </>
  );
}
