import { useAuth } from '@/lib/auth-context';
import { createUser, deactivateUser, listUsers, updateUser } from '@/lib/cms-admin';
import type { User } from '@/types/cms';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function UsersScreen() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'editor' });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await listUsers();
      if (res.ok) setUsers(res.users);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => { loadUsers(); }, []);

  const handleCreate = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError('All fields are required');
      return;
    }
    setCreating(true);
    setError('');
    try {
      await createUser(newUser);
      setShowCreate(false);
      setNewUser({ name: '', email: '', password: '', role: 'editor' });
      await loadUsers();
    } catch (err: any) {
      setError(err.message);
    }
    setCreating(false);
  };

  const handleDeactivate = async (userId: number) => {
    if (!window.confirm('Deactivate this user?')) return;
    try {
      await deactivateUser(userId);
      await loadUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleReactivate = async (userId: number) => {
    try {
      await updateUser(userId, { is_active: 1 });
      await loadUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1 bg-[#111]">
        <View className="max-w-4xl w-full mx-auto px-6 py-8">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-white font-helvetica-bold text-2xl">Users</Text>
              <Text className="text-gray-500 font-helvetica text-sm mt-1">Manage CMS admin users</Text>
            </View>
            {isAdmin && (
              <TouchableOpacity
                onPress={() => setShowCreate(!showCreate)}
                className="bg-[#C10016] rounded-lg px-5 py-3"
                activeOpacity={0.7}
              >
                <Text className="text-white font-helvetica-bold text-sm">
                  {showCreate ? 'Cancel' : '+ New User'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {error ? (
            <View className="bg-red-900/30 border border-red-800 rounded-lg p-3 mb-4">
              <Text className="text-red-400 text-sm font-helvetica">{error}</Text>
            </View>
          ) : null}

          {/* Create User Form */}
          {showCreate && (
            <View className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-6">
              <Text className="text-white font-helvetica-bold text-lg mb-4">Create New User</Text>
              <View className="gap-4">
                <View>
                  <Text className="text-gray-400 text-sm font-helvetica mb-1">Name</Text>
                  <TextInput
                    value={newUser.name}
                    onChangeText={(t) => setNewUser(p => ({ ...p, name: t }))}
                    placeholder="Full name"
                    placeholderTextColor="#555"
                    className="bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white font-helvetica text-sm"
                    style={{ outlineStyle: 'none' } as any}
                  />
                </View>
                <View>
                  <Text className="text-gray-400 text-sm font-helvetica mb-1">Email</Text>
                  <TextInput
                    value={newUser.email}
                    onChangeText={(t) => setNewUser(p => ({ ...p, email: t }))}
                    placeholder="user@fulfilx.co.uk"
                    placeholderTextColor="#555"
                    className="bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white font-helvetica text-sm"
                    style={{ outlineStyle: 'none' } as any}
                  />
                </View>
                <View>
                  <Text className="text-gray-400 text-sm font-helvetica mb-1">Password</Text>
                  <TextInput
                    value={newUser.password}
                    onChangeText={(t) => setNewUser(p => ({ ...p, password: t }))}
                    placeholder="Min 8 characters"
                    placeholderTextColor="#555"
                    secureTextEntry
                    className="bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white font-helvetica text-sm"
                    style={{ outlineStyle: 'none' } as any}
                  />
                </View>
                <View>
                  <Text className="text-gray-400 text-sm font-helvetica mb-1">Role</Text>
                  <View className="flex-row gap-3">
                    {(['editor', 'admin'] as const).map((role) => (
                      <TouchableOpacity
                        key={role}
                        onPress={() => setNewUser(p => ({ ...p, role }))}
                        className={`px-4 py-2 rounded-lg border ${
                          newUser.role === role ? 'bg-[#C10016] border-[#C10016]' : 'bg-[#111] border-gray-700'
                        }`}
                      >
                        <Text className={`text-sm font-helvetica capitalize ${
                          newUser.role === role ? 'text-white font-bold' : 'text-gray-400'
                        }`}>{role}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={handleCreate}
                  disabled={creating}
                  className="bg-[#C10016] rounded-lg py-3 items-center mt-2"
                  activeOpacity={0.7}
                >
                  {creating ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text className="text-white font-helvetica-bold text-sm">Create User</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Users List */}
          {loading ? (
            <View className="py-20 items-center">
              <ActivityIndicator size="large" color="#C10016" />
            </View>
          ) : (
            <View className="gap-2">
              {users.map((u) => (
                <View key={u.id} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 flex-row items-center">
                  <View className="w-10 h-10 bg-gray-700 rounded-full items-center justify-center mr-4">
                    <Text className="text-white font-bold">{u.name.charAt(0).toUpperCase()}</Text>
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-white font-helvetica-medium text-sm">{u.name}</Text>
                      {u.id === currentUser?.id && (
                        <Text className="text-gray-600 text-xs font-helvetica">(you)</Text>
                      )}
                    </View>
                    <Text className="text-gray-500 text-xs font-helvetica">{u.email}</Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full mr-3 ${
                    u.role === 'admin' ? 'bg-purple-900/30' : 'bg-blue-900/30'
                  }`}>
                    <Text className={`text-xs font-helvetica capitalize ${
                      u.role === 'admin' ? 'text-purple-400' : 'text-blue-400'
                    }`}>{u.role}</Text>
                  </View>
                  {!u.is_active ? (
                    <View className="flex-row items-center gap-2">
                      <View className="px-2 py-1 rounded bg-gray-800">
                        <Text className="text-gray-500 text-xs">Inactive</Text>
                      </View>
                      {isAdmin && u.id !== currentUser?.id && (
                        <TouchableOpacity
                          onPress={() => handleReactivate(u.id)}
                          className="bg-green-900/20 border border-green-900 rounded px-2 py-1"
                        >
                          <Text className="text-green-400 text-xs">Reactivate</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : isAdmin && u.id !== currentUser?.id ? (
                    <TouchableOpacity
                      onPress={() => handleDeactivate(u.id)}
                      className="bg-red-900/20 border border-red-900 rounded px-3 py-1"
                    >
                      <Text className="text-red-400 text-xs">Deactivate</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}
