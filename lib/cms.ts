/**
 * CMS Public Content Client
 * Fetches published content from the CMS API with caching and fallback
 * Used by public-facing website pages
 */
import type { ContentEntry } from '@/types/cms';

function getCmsApiUrl(): string {
  if (typeof window === 'undefined' || !window.location?.origin) return process.env.EXPO_PUBLIC_CMS_API_URL || '/api/cms';
  if (/^https?:\/\/localhost(\d*)(?:\.|$)/i.test(window.location.origin)) return process.env.EXPO_PUBLIC_CMS_API_URL || 'http://localhost:8000/api/cms';
  return window.location.origin + '/api/cms';
}
const CMS_API_URL = getCmsApiUrl();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

/**
 * Fetch published content entries for a given type
 * Falls back to provided default data if CMS is unreachable
 */
export async function getContent<T>(
  type: string,
  fallback: T
): Promise<T> {
  const cacheKey = `list:${type}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  try {
    const res = await fetch(
      `${CMS_API_URL}/content.php?type=${type}&status=published&limit=100`
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();

    if (json.ok && json.entries) {
      // Extract the data field from each entry and return as array
      const data = json.entries.map((entry: ContentEntry) => ({
        _id: entry.id,
        _slug: entry.slug,
        _sort_order: entry.sort_order,
        ...entry.data,
      }));

      cache.set(cacheKey, { data, timestamp: Date.now() });
      return data as T;
    }

    return fallback;
  } catch {
    // CMS unreachable — use fallback
    return fallback;
  }
}

/**
 * Fetch a single content entry (for Single types like Homepage, Contact Info)
 * Returns the data field of the first published entry of that type
 */
export async function getSingleContent<T>(
  type: string,
  fallback: T
): Promise<T> {
  const cacheKey = `single:${type}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  try {
    const res = await fetch(
      `${CMS_API_URL}/content.php?type=${type}&status=published&limit=1`
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();

    if (json.ok && json.entries && json.entries.length > 0) {
      const data = json.entries[0].data;
      cache.set(cacheKey, { data, timestamp: Date.now() });
      return data as T;
    }

    return fallback;
  } catch {
    return fallback;
  }
}

/**
 * Fetch a single content entry by slug
 */
export async function getContentBySlug<T>(
  type: string,
  slug: string,
  fallback: T
): Promise<T> {
  const cacheKey = `slug:${type}:${slug}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  try {
    const res = await fetch(
      `${CMS_API_URL}/content.php?type=${type}&slug=${slug}`
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();

    if (json.ok && json.entry) {
      const data = { _id: json.entry.id, _slug: json.entry.slug, ...json.entry.data };
      cache.set(cacheKey, { data, timestamp: Date.now() });
      return data as T;
    }

    return fallback;
  } catch {
    return fallback;
  }
}

/**
 * Clear the content cache (useful after CMS updates)
 */
export function clearContentCache(): void {
  cache.clear();
}

/**
 * Clear cache for a specific type
 */
export function invalidateType(type: string): void {
  for (const key of cache.keys()) {
    if (key.includes(type)) {
      cache.delete(key);
    }
  }
}
