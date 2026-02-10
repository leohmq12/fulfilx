/**
 * CMS Admin API Client
 * Authenticated CRUD operations for the admin dashboard
 */
import type {
  ContentEntry,
  ContentListResponse,
  ContentSingleResponse,
  ContentTypesResponse,
  MediaItem,
  MediaListResponse,
  MediaUploadResponse,
  User,
  UsersListResponse,
} from '@/types/cms';

const CMS_API_URL = process.env.EXPO_PUBLIC_CMS_API_URL || '/api/cms';

/**
 * Resolve full URL for media files (images, etc.).
 * On localhost the API may be on a different port (e.g. 8000) than the app (8081),
 * so relative URLs like /uploads/xxx must be turned into absolute URLs.
 */
export function getMediaFullUrl(urlOrPath: string): string {
  if (!urlOrPath) return '';
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) return urlOrPath;
  try {
    const base = new URL(CMS_API_URL);
    const origin = base.origin; // e.g. http://localhost:8000
    const path = urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
    return `${origin}${path}`;
  } catch {
    return urlOrPath;
  }
}

function getToken(): string | null {
  try {
    return localStorage.getItem('cms_auth_token');
  } catch {
    return null;
  }
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...authHeaders(),
      ...(options?.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok && !data.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }
  return data;
}

// ─── Content API ─────────────────────────────────────────────────────────────

export async function getContentTypes(): Promise<ContentTypesResponse> {
  return apiRequest(`${CMS_API_URL}/content.php`);
}

export async function listContent(
  type: string,
  options?: { status?: string; page?: number; limit?: number; all?: boolean }
): Promise<ContentListResponse> {
  const params = new URLSearchParams({ type });
  if (options?.status) params.set('status', options.status);
  if (options?.page) params.set('page', String(options.page));
  if (options?.limit) params.set('limit', String(options.limit));
  if (options?.all) params.set('all', '1');
  return apiRequest(`${CMS_API_URL}/content.php?${params}`);
}

export async function getContentEntry(id: number): Promise<ContentSingleResponse> {
  return apiRequest(`${CMS_API_URL}/content.php?id=${id}`);
}

export async function getContentBySlug(type: string, slug: string): Promise<ContentSingleResponse> {
  return apiRequest(`${CMS_API_URL}/content.php?type=${type}&slug=${slug}`);
}

export async function createContent(entry: {
  content_type: string;
  slug?: string;
  status?: string;
  data: Record<string, any>;
  sort_order?: number;
}): Promise<{ ok: boolean; id: number; message: string }> {
  return apiRequest(`${CMS_API_URL}/content.php`, {
    method: 'POST',
    body: JSON.stringify(entry),
  });
}

export async function updateContent(
  id: number,
  updates: {
    slug?: string;
    status?: string;
    data?: Record<string, any>;
    sort_order?: number;
  }
): Promise<{ ok: boolean; message: string }> {
  return apiRequest(`${CMS_API_URL}/content.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function deleteContent(id: number): Promise<{ ok: boolean; message: string }> {
  return apiRequest(`${CMS_API_URL}/content.php?id=${id}`, {
    method: 'DELETE',
  });
}

// ─── Media API ───────────────────────────────────────────────────────────────

export async function listMedia(
  options?: { folder?: string; search?: string; page?: number; limit?: number }
): Promise<MediaListResponse> {
  const params = new URLSearchParams();
  if (options?.folder) params.set('folder', options.folder);
  if (options?.search) params.set('search', options.search);
  if (options?.page) params.set('page', String(options.page));
  if (options?.limit) params.set('limit', String(options.limit));
  return apiRequest(`${CMS_API_URL}/media.php?${params}`);
}

export async function uploadMedia(
  file: File,
  options?: { folder?: string; alt_text?: string }
): Promise<MediaUploadResponse> {
  const token = getToken();
  const formData = new FormData();
  formData.append('file', file);
  if (options?.folder) formData.append('folder', options.folder);
  if (options?.alt_text) formData.append('alt_text', options.alt_text);

  const res = await fetch(`${CMS_API_URL}/media.php`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  return res.json();
}

export async function updateMedia(
  id: number,
  updates: { alt_text?: string; folder?: string }
): Promise<{ ok: boolean; message: string }> {
  return apiRequest(`${CMS_API_URL}/media.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function deleteMedia(id: number): Promise<{ ok: boolean; message: string }> {
  return apiRequest(`${CMS_API_URL}/media.php?id=${id}`, {
    method: 'DELETE',
  });
}

// ─── Users API ───────────────────────────────────────────────────────────────

export async function listUsers(): Promise<UsersListResponse> {
  return apiRequest(`${CMS_API_URL}/users.php`);
}

export async function createUser(user: {
  email: string;
  password: string;
  name: string;
  role: string;
}): Promise<{ ok: boolean; id: number; message: string }> {
  return apiRequest(`${CMS_API_URL}/users.php`, {
    method: 'POST',
    body: JSON.stringify(user),
  });
}

export async function updateUser(
  id: number,
  updates: { name?: string; email?: string; role?: string; is_active?: number; password?: string }
): Promise<{ ok: boolean; message: string }> {
  return apiRequest(`${CMS_API_URL}/users.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function deactivateUser(id: number): Promise<{ ok: boolean; message: string }> {
  return apiRequest(`${CMS_API_URL}/users.php?id=${id}`, {
    method: 'DELETE',
  });
}

// ─── Versions API ────────────────────────────────────────────────────────────

export async function listVersions(
  entryId: number
): Promise<{ ok: boolean; versions: Array<{ id: number; entry_id: number; version: number; data: Record<string, any>; changed_by: number; changed_by_name: string; created_at: string }> }> {
  return apiRequest(`${CMS_API_URL}/versions.php?entry_id=${entryId}`);
}

export async function restoreVersion(
  versionId: number
): Promise<{ ok: boolean; message: string }> {
  return apiRequest(`${CMS_API_URL}/versions.php`, {
    method: 'POST',
    body: JSON.stringify({ version_id: versionId }),
  });
}

// ─── Activity Log API ────────────────────────────────────────────────────────

export async function getActivityLog(
  limit: number = 20
): Promise<{ ok: boolean; activities: Array<{ id: number; user_id: number; user_name: string; action: string; entity_type: string; entity_id: number; details: string; created_at: string }> }> {
  return apiRequest(`${CMS_API_URL}/activity.php?limit=${limit}`);
}

// ─── Auth API ────────────────────────────────────────────────────────────────

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ ok: boolean; message?: string; error?: string }> {
  return apiRequest(`${CMS_API_URL}/auth.php?action=change-password`, {
    method: 'POST',
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });
}

// ─── Developer API (developer role only) ─────────────────────────────────────

export async function developerListTables(): Promise<{
  ok: boolean;
  tables: Array<{ name: string; type: string }>;
}> {
  return apiRequest(`${CMS_API_URL}/developer.php`);
}

export async function developerGetTable(
  table: string,
  limit?: number
): Promise<{
  ok: boolean;
  table: string;
  columns: Array<{ cid: number; name: string; type: string; notnull: number; dflt_value: unknown; pk: number }>;
  rows: Record<string, unknown>[];
  count: number;
}> {
  const params = new URLSearchParams({ table });
  if (limit != null) params.set('limit', String(limit));
  return apiRequest(`${CMS_API_URL}/developer.php?${params}`);
}

export async function developerRunQuery(query: string): Promise<{
  ok: boolean;
  rows: Record<string, unknown>[];
  count: number;
  affectedRows?: number;
  lastInsertId?: number | null;
}> {
  return apiRequest(`${CMS_API_URL}/developer.php`, {
    method: 'POST',
    body: JSON.stringify({ query }),
  });
}

// ─── Seed API (creates default content + developer user if missing) ─────────

export async function runSeed(): Promise<{
  ok: boolean;
  seeded?: string[];
  skipped?: string[];
  error?: string;
}> {
  return apiRequest(`${CMS_API_URL}/seed.php`, { method: 'POST' });
}
