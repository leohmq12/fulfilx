import { useAuth } from '@/lib/auth-context';
import { useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

/**
 * Wraps admin pages to enforce authentication.
 * Redirects to /admin/login if not authenticated.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const isOnLogin = segments.includes('login' as never);

    if (!isAuthenticated && !isOnLogin) {
      router.replace('/admin/login' as any);
    } else if (isAuthenticated && isOnLogin) {
      router.replace('/admin' as any);
    }
  }, [isAuthenticated, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' }}>
        <ActivityIndicator size="large" color="#C10016" />
      </View>
    );
  }

  return <>{children}</>;
}
