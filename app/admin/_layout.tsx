import AdminHeader from '@/components/admin/admin-header';
import AuthGuard from '@/components/admin/auth-guard';
import Sidebar from '@/components/admin/sidebar';
import { AdminThemeProvider, useAdminTheme } from '@/lib/admin-theme-context';
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
  const { isDark } = useAdminTheme();
  const isLoginPage = segments.includes('login' as never);

  if (isLoginPage || !isAuthenticated) {
    return <Slot />;
  }

  const mainBg = isDark ? 'bg-[#111]' : 'bg-gray-50';

  return (
    <View className="flex-1 flex-row" style={{ minHeight: '100vh' }}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <View className={`flex-1 flex-col min-w-0 ${mainBg}`}>
        <View style={{ position: 'relative', zIndex: 50 }}>
          <AdminHeader onMenuPress={() => setSidebarCollapsed((c) => !c)} />
        </View>
        <View className="flex-1 overflow-auto" style={{ position: 'relative', zIndex: 1 }}>
          <Slot />
        </View>
      </View>
    </View>
  );
}

export default function AdminLayout() {
  return (
    <AdminThemeProvider>
      <AuthProvider>
        <Head>
          <title>CMS Admin - FULFIL.X</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <AuthGuard>
          <AdminLayoutInner />
        </AuthGuard>
      </AuthProvider>
    </AdminThemeProvider>
  );
}
