import AuthGuard from '@/components/admin/auth-guard';
import Sidebar from '@/components/admin/sidebar';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Slot, useSegments } from 'expo-router';
import Head from 'expo-router/head';
import React, { useState } from 'react';
import { View } from 'react-native';
import '../../global.css';

function AdminLayoutInner() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const isLoginPage = segments.includes('login' as never);

  // Don't show sidebar on login page
  if (isLoginPage || !isAuthenticated) {
    return <Slot />;
  }

  return (
    <View className="flex-1 flex-row bg-[#111]" style={{ minHeight: '100vh' }}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <View className="flex-1 overflow-auto">
        <Slot />
      </View>
    </View>
  );
}

export default function AdminLayout() {
  return (
    <AuthProvider>
      <Head>
        <title>CMS Admin - FULFIL.X</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AuthGuard>
        <AdminLayoutInner />
      </AuthGuard>
    </AuthProvider>
  );
}
