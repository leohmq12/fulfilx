import { useAuth } from '@/lib/auth-context';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AdminLoginScreen() {
  const { login } = useAuth();
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
    
    if (!result.ok) {
      setError(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View 
        className="flex-1 items-center justify-center bg-[#0a0a0a]"
        style={{ minHeight: '100vh' }}
      >
        {/* Login Card */}
        <View className="w-full max-w-md px-6">
          {/* Logo */}
          <View className="items-center mb-10">
            <View className="w-16 h-16 bg-[#C10016] rounded-2xl items-center justify-center mb-4">
              <Text className="text-white font-bold text-2xl">FX</Text>
            </View>
            <Text className="text-white font-helvetica-bold text-2xl">FULFIL.X CMS</Text>
            <Text className="text-gray-500 font-helvetica text-sm mt-1">Sign in to manage your content</Text>
          </View>

          {/* Form */}
          <View className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800">
            {/* Error Message */}
            {error ? (
              <View className="bg-red-900/30 border border-red-800 rounded-lg p-3 mb-6">
                <Text className="text-red-400 text-sm font-helvetica text-center">{error}</Text>
              </View>
            ) : null}

            {/* Email Input */}
            <View className="mb-5">
              <Text className="text-gray-400 text-sm font-helvetica mb-2">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="admin@fulfilx.co.uk"
                placeholderTextColor="#555"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                editable={!loading}
                onSubmitEditing={handleLogin}
                className="bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white font-helvetica text-sm"
                style={{ outlineStyle: 'none' } as any}
              />
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-gray-400 text-sm font-helvetica mb-2">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#555"
                secureTextEntry
                editable={!loading}
                onSubmitEditing={handleLogin}
                className="bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white font-helvetica text-sm"
                style={{ outlineStyle: 'none' } as any}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className={`rounded-lg py-3.5 items-center ${loading ? 'bg-[#8a0010]' : 'bg-[#C10016]'}`}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-white font-helvetica-bold text-sm">Sign In</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text className="text-gray-600 text-xs font-helvetica text-center mt-8">
            FULFIL.X Content Management System
          </Text>
        </View>
      </View>
    </>
  );
}
