import { useAuth } from '@/lib/auth-context';
import { changePassword } from '@/lib/cms-admin';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const CMS_API_URL = process.env.EXPO_PUBLIC_CMS_API_URL || '/api/cms';

  const handleChangePassword = async () => {
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword) {
      setError('All fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setSaving(true);
    try {
      const res = await changePassword(currentPassword, newPassword);
      if (res.ok) {
        setSuccess('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(res.error || 'Failed to change password');
      }
    } catch (err: any) {
      setError(err.message);
    }
    setSaving(false);
  };

  const handleSetup = async () => {
    const email = window.prompt('Admin email:');
    const password = window.prompt('Admin password:');
    const name = window.prompt('Admin name:') || 'Admin';

    if (!email || !password) return;

    try {
      const res = await fetch(`${CMS_API_URL}/setup.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      alert(data.message || JSON.stringify(data));
    } catch (err: any) {
      alert('Setup failed: ' + err.message);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1 bg-[#111]">
        <View className="max-w-3xl w-full mx-auto px-6 py-8">
          <Text className="text-white font-helvetica-bold text-2xl mb-6">Settings</Text>

          {/* Profile Info */}
          <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6">
            <Text className="text-white font-helvetica-bold text-lg mb-4">Profile</Text>
            <View className="gap-3">
              <View className="flex-row">
                <Text className="text-gray-500 font-helvetica w-24">Name:</Text>
                <Text className="text-white font-helvetica">{user?.name}</Text>
              </View>
              <View className="flex-row">
                <Text className="text-gray-500 font-helvetica w-24">Email:</Text>
                <Text className="text-white font-helvetica">{user?.email}</Text>
              </View>
              <View className="flex-row">
                <Text className="text-gray-500 font-helvetica w-24">Role:</Text>
                <Text className="text-white font-helvetica capitalize">{user?.role}</Text>
              </View>
            </View>
          </View>

          {/* Change Password */}
          <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6">
            <Text className="text-white font-helvetica-bold text-lg mb-4">Change Password</Text>

            {error ? (
              <View className="bg-red-900/30 border border-red-800 rounded-lg p-3 mb-4">
                <Text className="text-red-400 text-sm font-helvetica">{error}</Text>
              </View>
            ) : null}
            {success ? (
              <View className="bg-green-900/30 border border-green-800 rounded-lg p-3 mb-4">
                <Text className="text-green-400 text-sm font-helvetica">{success}</Text>
              </View>
            ) : null}

            <View className="gap-4">
              <View>
                <Text className="text-gray-400 text-sm font-helvetica mb-1">Current Password</Text>
                <TextInput
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry
                  className="bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white font-helvetica text-sm"
                  style={{ outlineStyle: 'none' } as any}
                />
              </View>
              <View>
                <Text className="text-gray-400 text-sm font-helvetica mb-1">New Password</Text>
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  placeholder="Min 8 characters"
                  placeholderTextColor="#555"
                  className="bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white font-helvetica text-sm"
                  style={{ outlineStyle: 'none' } as any}
                />
              </View>
              <View>
                <Text className="text-gray-400 text-sm font-helvetica mb-1">Confirm New Password</Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  className="bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white font-helvetica text-sm"
                  style={{ outlineStyle: 'none' } as any}
                />
              </View>
              <TouchableOpacity
                onPress={handleChangePassword}
                disabled={saving}
                className="bg-[#C10016] rounded-lg py-3 items-center"
                activeOpacity={0.7}
              >
                {saving ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text className="text-white font-helvetica-bold text-sm">Change Password</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* CMS Setup */}
          {user?.role === 'admin' && (
            <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6">
              <Text className="text-white font-helvetica-bold text-lg mb-2">CMS Setup</Text>
              <Text className="text-gray-500 font-helvetica text-sm mb-4">
                Run this once to initialize the database on a fresh server. Safe to run multiple times.
              </Text>
              <TouchableOpacity
                onPress={handleSetup}
                className="bg-gray-700 rounded-lg py-3 items-center"
                activeOpacity={0.7}
              >
                <Text className="text-white font-helvetica text-sm">Run Database Setup</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* API Info */}
          <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
            <Text className="text-white font-helvetica-bold text-lg mb-2">API Info</Text>
            <View className="gap-2">
              <View>
                <Text className="text-gray-500 text-xs font-helvetica">CMS API URL</Text>
                <Text className="text-gray-300 text-sm font-helvetica" selectable>
                  {CMS_API_URL}
                </Text>
              </View>
              <View>
                <Text className="text-gray-500 text-xs font-helvetica">Content Endpoint</Text>
                <Text className="text-gray-300 text-sm font-helvetica" selectable>
                  {CMS_API_URL}/content.php?type=&#123;type&#125;
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
