import { useAdminTheme } from '@/lib/admin-theme-context';
import { useAuth } from '@/lib/auth-context';
import {
  changePassword,
  getIntegrationSettings,
  runSeed,
  updateIntegrationSettings,
  type IntegrationSettings,
} from '@/lib/cms-admin';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const { user } = useAuth();
  const { isDark } = useAdminTheme();
  const bg = isDark ? 'bg-[#111]' : 'bg-gray-50';
  const cardBg = isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200';
  const textMain = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');
  const [integration, setIntegration] = useState<IntegrationSettings>({
    replit_website_url: '',
    replit_website_api_key: '',
    replit_newsletter_url: '',
    replit_newsletter_api_key: '',
  });
  const [integrationLoading, setIntegrationLoading] = useState(true);
  const [integrationSaving, setIntegrationSaving] = useState(false);
  const [integrationError, setIntegrationError] = useState('');
  const [integrationSuccess, setIntegrationSuccess] = useState('');

  function getCmsApiUrl(): string {
  if (typeof window === 'undefined' || !window.location?.origin) return process.env.EXPO_PUBLIC_CMS_API_URL || '/api/cms';
  if (/^https?:\/\/localhost(\d*)(?:\.|$)/i.test(window.location?.origin ?? '')) return process.env.EXPO_PUBLIC_CMS_API_URL || 'http://localhost:8000/api/cms';
  return (window.location?.origin ?? '') + '/api/cms';
}
const CMS_API_URL = getCmsApiUrl();

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

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (user?.role !== 'admin') return;
      setIntegrationLoading(true);
      try {
        const res = await getIntegrationSettings();
        if (!cancelled && res.ok && res.settings) setIntegration(res.settings);
      } catch {
        if (!cancelled) setIntegration({ replit_website_url: '', replit_website_api_key: '', replit_newsletter_url: '', replit_newsletter_api_key: '' });
      } finally {
        if (!cancelled) setIntegrationLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [user?.role]);

  const handleSaveIntegration = async () => {
    setIntegrationError('');
    setIntegrationSuccess('');
    setIntegrationSaving(true);
    try {
      const res = await updateIntegrationSettings(integration);
      if (res.ok) {
        setIntegrationSuccess('Integration settings saved. Contact and newsletter forms will use these URLs and keys.');
      } else {
        setIntegrationError(res.error || 'Failed to save');
      }
    } catch (err: any) {
      setIntegrationError(err.message || 'Request failed');
    }
    setIntegrationSaving(false);
  };

  const handleSeed = async () => {
    setSeedMessage('');
    setSeeding(true);
    try {
      const res = await runSeed();
      if (res.ok) {
        const parts = [];
        if (res.seeded?.length) parts.push(`Seeded: ${res.seeded.join(', ')}`);
        if (res.skipped?.length) parts.push(`Skipped (existing): ${res.skipped.join(', ')}`);
        setSeedMessage(parts.length ? parts.join('\n') : 'Seed completed.');
      } else {
        setSeedMessage(res.error || 'Seed failed.');
      }
    } catch (err: any) {
      setSeedMessage(err.message || 'Request failed. Is the API running at ' + CMS_API_URL + '?');
    }
    setSeeding(false);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className={`flex-1 ${bg}`}>
        <View className="max-w-3xl w-full mx-auto px-4 py-6">
          <Text className={`font-helvetica-bold text-xl mb-4 ${textMain}`}>Settings</Text>

          <View className={`${cardBg} border rounded-lg p-5 mb-5`}>
            <Text className={`font-helvetica-bold text-base mb-3 ${textMain}`}>Profile</Text>
            <View className="gap-2">
              <View className="flex-row">
                <Text className={`font-helvetica w-24 ${textMuted}`}>Name:</Text>
                <Text className={`font-helvetica ${textMain}`}>{user?.name}</Text>
              </View>
              <View className="flex-row">
                <Text className={`font-helvetica w-24 ${textMuted}`}>Email:</Text>
                <Text className={`font-helvetica ${textMain}`}>{user?.email}</Text>
              </View>
              <View className="flex-row">
                <Text className={`font-helvetica w-24 ${textMuted}`}>Role:</Text>
                <Text className={`font-helvetica capitalize ${textMain}`}>{user?.role}</Text>
              </View>
            </View>
          </View>

          <View className={`${cardBg} border rounded-lg p-5 mb-5`}>
            <Text className={`font-helvetica-bold text-base mb-3 ${textMain}`}>Change Password</Text>

            {error ? (
              <View className="bg-red-50 border border-red-200 rounded-lg p-2.5 mb-3">
                <Text className="text-red-600 text-sm font-helvetica">{error}</Text>
              </View>
            ) : null}
            {success ? (
              <View className="bg-green-50 border border-green-200 rounded-lg p-2.5 mb-3">
                <Text className="text-green-700 text-sm font-helvetica">{success}</Text>
              </View>
            ) : null}

            <View className="gap-3">
              <View>
                <Text className={`text-sm font-helvetica mb-1 ${textMuted}`}>Current Password</Text>
                <TextInput
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry
                  className={`rounded-lg px-3 py-2.5 font-helvetica text-sm ${isDark ? 'bg-[#111] border border-gray-700 text-white' : 'bg-gray-50 border border-gray-300 text-gray-900'}`}
                  style={{ outlineStyle: 'none' } as any}
                />
              </View>
              <View>
                <Text className={`text-sm font-helvetica mb-1 ${textMuted}`}>New Password</Text>
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  placeholder="Min 8 characters"
                  placeholderTextColor="#888"
                  className={`rounded-lg px-3 py-2.5 font-helvetica text-sm ${isDark ? 'bg-[#111] border border-gray-700 text-white' : 'bg-gray-50 border border-gray-300 text-gray-900'}`}
                  style={{ outlineStyle: 'none' } as any}
                />
              </View>
              <View>
                <Text className={`text-sm font-helvetica mb-1 ${textMuted}`}>Confirm New Password</Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  className={`rounded-lg px-3 py-2.5 font-helvetica text-sm ${isDark ? 'bg-[#111] border border-gray-700 text-white' : 'bg-gray-50 border border-gray-300 text-gray-900'}`}
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

          {user?.role === 'admin' && (
            <View className={`${cardBg} border rounded-lg p-5 mb-5`}>
              <Text className={`font-helvetica-bold text-base mb-2 ${textMain}`}>CMS Setup</Text>
              <Text className={`font-helvetica text-sm mb-3 ${textMuted}`}>
                Run this once to initialize the database on a fresh server. Safe to run multiple times.
              </Text>
              <TouchableOpacity
                onPress={handleSetup}
                className={`rounded-lg py-2.5 items-center ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
                activeOpacity={0.7}
              >
                <Text className={`font-helvetica text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Run Database Setup</Text>
              </TouchableOpacity>
            </View>
          )}

          <View className={`${cardBg} border rounded-lg p-5 mb-5`}>
            <Text className={`font-helvetica-bold text-base mb-2 ${textMain}`}>Seed content & developer user</Text>
            <Text className={`font-helvetica text-sm mb-3 ${textMuted}`}>
              Seeds default content types and creates developer@fulfilx.co if missing. Uses the API URL below.
            </Text>
            {seedMessage ? (
              <View className={`rounded-lg p-2.5 mb-3 ${seedMessage.startsWith('Request failed') ? 'bg-red-50 border border-red-200' : isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'}`}>
                <Text className={`text-sm font-helvetica ${seedMessage.startsWith('Request failed') ? 'text-red-700' : textMuted}`}>{seedMessage}</Text>
              </View>
            ) : null}
            <TouchableOpacity
              onPress={handleSeed}
              disabled={seeding}
              className={`rounded-lg py-2.5 items-center ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
              activeOpacity={0.7}
            >
              {seeding ? (
                <ActivityIndicator size="small" color={isDark ? '#fff' : '#333'} />
              ) : (
                <Text className={`font-helvetica text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Run seed</Text>
              )}
            </TouchableOpacity>
          </View>

          {user?.role === 'admin' && (
            <View className={`${cardBg} border rounded-lg p-5 mb-5`}>
              <Text className={`font-helvetica-bold text-base mb-2 ${textMain}`}>Integrations (Replit / API - Only For Experts)</Text>
              <Text className={`font-helvetica text-sm mb-3 ${textMuted}`}>
                Configure the Replit webhook URL and API keys used by the contact form and newsletter. Leave blank to keep existing values. Saved values are used by the server when forwarding submissions.
              </Text>
              {integrationError ? (
                <View className="bg-red-50 border border-red-200 rounded-lg p-2.5 mb-3">
                  <Text className="text-red-600 text-sm font-helvetica">{integrationError}</Text>
                </View>
              ) : null}
              {integrationSuccess ? (
                <View className="bg-green-50 border border-green-200 rounded-lg p-2.5 mb-3">
                  <Text className="text-green-700 text-sm font-helvetica">{integrationSuccess}</Text>
                </View>
              ) : null}
              {integrationLoading ? (
                <View className="py-4 items-center">
                  <ActivityIndicator size="small" color={isDark ? '#fff' : '#333'} />
                </View>
              ) : (
                <View className="gap-3">
                  <View>
                    <Text className={`text-sm font-helvetica mb-1 ${textMuted}`}>Contact webhook URL (Replit)</Text>
                    <TextInput
                      value={integration.replit_website_url}
                      onChangeText={(v) => setIntegration((s) => ({ ...s, replit_website_url: v }))}
                      placeholder="https://ordrcrm.com/api/webhooks/website"
                      placeholderTextColor="#888"
                      autoCapitalize="none"
                      autoCorrect={false}
                      className={`rounded-lg px-3 py-2.5 font-helvetica text-sm ${isDark ? 'bg-[#111] border border-gray-700 text-white' : 'bg-gray-50 border border-gray-300 text-gray-900'}`}
                      style={{ outlineStyle: 'none' } as any}
                    />
                  </View>
                  <View>
                    <Text className={`text-sm font-helvetica mb-1 ${textMuted}`}>Contact API key</Text>
                    <TextInput
                      value={integration.replit_website_api_key}
                      onChangeText={(v) => setIntegration((s) => ({ ...s, replit_website_api_key: v }))}
                      placeholder="web_..."
                      placeholderTextColor="#888"
                      secureTextEntry
                      autoCapitalize="none"
                      className={`rounded-lg px-3 py-2.5 font-helvetica text-sm ${isDark ? 'bg-[#111] border border-gray-700 text-white' : 'bg-gray-50 border border-gray-300 text-gray-900'}`}
                      style={{ outlineStyle: 'none' } as any}
                    />
                  </View>
                  <View>
                    <Text className={`text-sm font-helvetica mb-1 ${textMuted}`}>Newsletter webhook URL (Replit)</Text>
                    <TextInput
                      value={integration.replit_newsletter_url}
                      onChangeText={(v) => setIntegration((s) => ({ ...s, replit_newsletter_url: v }))}
                      placeholder="https://.../api/webhooks/newsletter"
                      placeholderTextColor="#888"
                      autoCapitalize="none"
                      autoCorrect={false}
                      className={`rounded-lg px-3 py-2.5 font-helvetica text-sm ${isDark ? 'bg-[#111] border border-gray-700 text-white' : 'bg-gray-50 border border-gray-300 text-gray-900'}`}
                      style={{ outlineStyle: 'none' } as any}
                    />
                  </View>
                  <View>
                    <Text className={`text-sm font-helvetica mb-1 ${textMuted}`}>Newsletter API key</Text>
                    <TextInput
                      value={integration.replit_newsletter_api_key}
                      onChangeText={(v) => setIntegration((s) => ({ ...s, replit_newsletter_api_key: v }))}
                      placeholder="nws_..."
                      placeholderTextColor="#888"
                      secureTextEntry
                      autoCapitalize="none"
                      className={`rounded-lg px-3 py-2.5 font-helvetica text-sm ${isDark ? 'bg-[#111] border border-gray-700 text-white' : 'bg-gray-50 border border-gray-300 text-gray-900'}`}
                      style={{ outlineStyle: 'none' } as any}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={handleSaveIntegration}
                    disabled={integrationSaving}
                    className="bg-[#C10016] rounded-lg py-3 items-center"
                    activeOpacity={0.7}
                  >
                    {integrationSaving ? (
                      <ActivityIndicator color="white" size="small" />
                    ) : (
                      <Text className="text-white font-helvetica-bold text-sm">Save integration settings</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          <View className={`${cardBg} border rounded-lg p-5`}>
            <Text className={`font-helvetica-bold text-base mb-2 ${textMain}`}>API Info</Text>
            <View className="gap-2">
              <View>
                <Text className={`text-xs font-helvetica ${textMuted}`}>CMS API URL</Text>
                <Text className={`text-sm font-helvetica selectable ${textMain}`}>{CMS_API_URL}</Text>
              </View>
              <View>
                <Text className={`text-xs font-helvetica ${textMuted}`}>Content Endpoint</Text>
                <Text className={`text-sm font-helvetica selectable ${textMain}`}>{CMS_API_URL}/content.php?type=&#123;type&#125;</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
