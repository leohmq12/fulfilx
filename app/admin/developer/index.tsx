/**
 * Developer panel – database browser (developer role only).
 * Lists tables, view table schema + data, run any SQL (SELECT, INSERT, UPDATE, DELETE, etc.).
 */
import {
  developerGetTable,
  developerListTables,
  developerRunQuery,
} from '@/lib/cms-admin';
import { useAdminTheme } from '@/lib/admin-theme-context';
import { useAuth } from '@/lib/auth-context';
import { Stack, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function DeveloperDatabaseScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { isDark } = useAdminTheme();

  const [tables, setTables] = useState<Array<{ name: string; type: string }>>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [columns, setColumns] = useState<Array<{ name: string; type: string; pk: number }>>([]);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [error, setError] = useState('');
  const [customQuery, setCustomQuery] = useState('');
  const [queryResult, setQueryResult] = useState<Record<string, unknown>[] | null>(null);
  const [queryMeta, setQueryMeta] = useState<{ affectedRows?: number; lastInsertId?: number | null } | null>(null);
  const [queryLoading, setQueryLoading] = useState(false);

  const isDeveloper = user?.role === 'developer';

  const bg = isDark ? 'bg-[#111]' : 'bg-gray-50';
  const cardBg = isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200';
  const textMain = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';
  const borderCard = isDark ? 'border-gray-800' : 'border-gray-200';

  const loadTables = useCallback(async () => {
    if (!isDeveloper) return;
    setLoading(true);
    setError('');
    try {
      const res = await developerListTables();
      if (res.ok) setTables(res.tables);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load tables');
    }
    setLoading(false);
  }, [isDeveloper]);

  const loadTable = useCallback(
    async (table: string) => {
      setSelectedTable(table);
      setTableLoading(true);
      setError('');
      setQueryResult(null);
      try {
        const res = await developerGetTable(table, 100);
        if (res.ok) {
          setColumns(
            res.columns.map((c) => ({ name: c.name, type: c.type || '', pk: c.pk || 0 }))
          );
          setRows(res.rows);
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Failed to load table');
      }
      setTableLoading(false);
    },
    []
  );

  const runQuery = async () => {
    const q = customQuery.trim();
    if (!q) return;
    setQueryLoading(true);
    setError('');
    setQueryMeta(null);
    try {
      const res = await developerRunQuery(q);
      if (res.ok) {
        setQueryResult(res.rows);
        if (res.affectedRows != null || res.lastInsertId != null) {
          setQueryMeta({
            affectedRows: res.affectedRows,
            lastInsertId: res.lastInsertId ?? null,
          });
        } else {
          setQueryMeta(null);
        }
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Query failed');
      setQueryResult(null);
      setQueryMeta(null);
    }
    setQueryLoading(false);
  };

  useEffect(() => {
    loadTables();
  }, [loadTables]);

  useEffect(() => {
    if (!isDeveloper) {
      router.replace('/admin');
      return;
    }
  }, [isDeveloper, router]);

  if (!isDeveloper) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className={`flex-1 ${bg} items-center justify-center p-6`}>
          <Text className={`font-helvetica text-center ${textMain}`}>
            Developer access required. Sign in with a developer account.
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/admin')}
            className="mt-4 bg-[#C10016] rounded-lg px-6 py-3"
          >
            <Text className="text-white font-helvetica-bold text-sm">Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className={`flex-1 ${bg}`}>
        <View className="max-w-6xl w-full mx-auto px-4 py-6">
          <View className="mb-4">
            <Text className={`font-helvetica-bold text-xl ${textMain}`}>Database</Text>
            <Text className={`font-helvetica text-sm mt-0.5 ${textMuted}`}>
              View tables and run any SQL (SELECT, INSERT, UPDATE, DELETE). Developer only.
            </Text>
          </View>

          {error ? (
            <View className="bg-red-50 border border-red-200 rounded-lg p-2.5 mb-4">
              <Text className="text-red-600 text-sm font-helvetica">{error}</Text>
            </View>
          ) : null}

          <View className="flex-row gap-4 flex-wrap">
            {/* Tables list */}
            <View className={`${cardBg} border rounded-lg flex-1 min-w-[200px] max-w-[280px]`}>
              <View className={`px-4 py-3 border-b ${borderCard}`}>
                <Text className={`font-helvetica-bold text-sm ${textMain}`}>Tables</Text>
              </View>
              <View className="p-2">
                {loading ? (
                  <View className="py-8 items-center">
                    <ActivityIndicator size="small" color="#C10016" />
                  </View>
                ) : (
                  tables.map((t) => (
                    <TouchableOpacity
                      key={t.name}
                      onPress={() => loadTable(t.name)}
                      className={`px-3 py-2 rounded-lg mb-0.5 ${
                        selectedTable === t.name
                          ? 'bg-[#C10016]'
                          : isDark
                            ? 'bg-white/5'
                            : 'bg-gray-100'
                      }`}
                    >
                      <Text
                        className={`font-helvetica text-sm ${
                          selectedTable === t.name ? 'text-white' : textMain
                        }`}
                      >
                        {t.name}
                      </Text>
                      <Text
                        className={`font-helvetica text-[10px] ${
                          selectedTable === t.name ? 'text-white/80' : textMuted
                        }`}
                      >
                        {t.type}
                      </Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </View>

            {/* Table content */}
            <View className={`${cardBg} border rounded-lg flex-1 min-w-[300px]`}>
              <View className={`px-4 py-3 border-b ${borderCard}`}>
                <Text className={`font-helvetica-bold text-sm ${textMain}`}>
                  {selectedTable || 'Select a table'}
                </Text>
              </View>
              <View className="p-4">
                {!selectedTable ? (
                  <Text className={`font-helvetica text-sm ${textMuted}`}>
                    Click a table to view its schema and first 100 rows.
                  </Text>
                ) : tableLoading ? (
                  <View className="py-8 items-center">
                    <ActivityIndicator size="small" color="#C10016" />
                  </View>
                ) : (
                  <>
                    {columns.length > 0 && (
                      <View className="mb-3">
                        <Text className={`font-helvetica-bold text-xs mb-1 ${textMuted}`}>
                          Columns
                        </Text>
                        <View className="flex-row flex-wrap gap-2">
                          {columns.map((c) => (
                            <View
                              key={c.name}
                              className={`px-2 py-1 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}
                            >
                              <Text className={`font-helvetica text-xs ${textMain}`}>
                                {c.name}
                                {c.pk ? ' (PK)' : ''}
                              </Text>
                              <Text className={`font-helvetica text-[10px] ${textMuted}`}>
                                {c.type}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                    <Text className={`font-helvetica-bold text-xs mb-1 ${textMuted}`}>
                      Rows ({rows.length})
                    </Text>
                    <ScrollView horizontal className="mb-4" showsHorizontalScrollIndicator>
                      <View>
                        <View className="flex-row border-b border-gray-600 mb-1">
                          {columns.map((col) => (
                            <View
                              key={col.name}
                              className="px-2 py-1.5 min-w-[100px] max-w-[180px]"
                            >
                              <Text
                                className={`font-helvetica-bold text-xs ${textMain}`}
                                numberOfLines={1}
                              >
                                {col.name}
                              </Text>
                            </View>
                          ))}
                        </View>
                        {rows.slice(0, 50).map((row, i) => (
                          <View
                            key={i}
                            className={`flex-row border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
                          >
                            {columns.map((col) => (
                              <View
                                key={col.name}
                                className="px-2 py-1 min-w-[100px] max-w-[180px]"
                              >
                                <Text
                                  className={`font-helvetica text-xs ${textMuted}`}
                                  numberOfLines={1}
                                >
                                  {row[col.name] != null
                                    ? String(row[col.name])
                                    : 'NULL'}
                                </Text>
                              </View>
                            ))}
                          </View>
                        ))}
                        {rows.length > 50 && (
                          <Text className={`font-helvetica text-xs mt-1 ${textMuted}`}>
                            … and {rows.length - 50} more rows
                          </Text>
                        )}
                      </View>
                    </ScrollView>
                  </>
                )}
              </View>
            </View>
          </View>

          {/* Custom SQL query */}
          <View className={`${cardBg} border rounded-lg mt-6 p-4`}>
            <Text className={`font-helvetica-bold text-sm mb-2 ${textMain}`}>
              Run SQL query
            </Text>
            <TextInput
              value={customQuery}
              onChangeText={setCustomQuery}
              placeholder="SELECT * FROM users; UPDATE ...; DELETE ..."
              placeholderTextColor="#888"
              multiline
              numberOfLines={2}
              className={`border rounded-lg px-3 py-2 font-mono text-sm mb-2 ${isDark ? 'bg-[#111] border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
              style={{ outlineStyle: 'none', minHeight: 56 }}
            />
            <TouchableOpacity
              onPress={runQuery}
              disabled={queryLoading || !customQuery.trim()}
              className="bg-[#C10016] rounded-lg py-2 px-4 self-start"
            >
              {queryLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-white font-helvetica-bold text-sm">Run query</Text>
              )}
            </TouchableOpacity>
            {(queryResult !== null || queryMeta !== null) && (
              <View className="mt-3">
                {queryMeta && (
                  <View className={`rounded-lg p-2.5 mb-2 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'}`}>
                    <Text className={`font-helvetica text-sm ${textMain}`}>
                      {queryMeta.affectedRows != null && `Affected rows: ${queryMeta.affectedRows}`}
                      {queryMeta.affectedRows != null && queryMeta.lastInsertId != null && '  ·  '}
                      {queryMeta.lastInsertId != null && `Last insert ID: ${queryMeta.lastInsertId}`}
                    </Text>
                  </View>
                )}
                {queryResult !== null && queryResult.length > 0 && (
                  <>
                    <Text className={`font-helvetica text-xs mb-1 ${textMuted}`}>
                      Result: {queryResult.length} row(s)
                    </Text>
                    <ScrollView horizontal className="border rounded border-gray-600" style={{ maxHeight: 200 }}>
                      <View className="p-2">
                        <View>
                          <View className="flex-row flex-wrap gap-2 mb-1">
                            {Object.keys(queryResult[0]).map((k) => (
                              <Text key={k} className={`font-helvetica-bold text-xs ${textMain}`}>
                                {k}
                              </Text>
                            ))}
                          </View>
                          {queryResult.slice(0, 20).map((row, i) => (
                            <View key={i} className="flex-row flex-wrap gap-2 border-t border-gray-700 py-1">
                              {Object.entries(row).map(([k, v]) => (
                                <Text
                                  key={k}
                                  className={`font-helvetica text-xs ${textMuted}`}
                                  numberOfLines={1}
                                >
                                  {String(v ?? 'NULL')}
                                </Text>
                              ))}
                            </View>
                          ))}
                          {queryResult.length > 20 && (
                            <Text className={`text-xs mt-1 ${textMuted}`}>
                              … and {queryResult.length - 20} more
                            </Text>
                          )}
                        </View>
                      </View>
                    </ScrollView>
                  </>
                )}
                {queryResult !== null && queryResult.length === 0 && !queryMeta && (
                  <Text className={`font-helvetica text-sm ${textMuted}`}>No rows returned.</Text>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
