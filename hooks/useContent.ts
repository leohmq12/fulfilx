import { getContent, getSingleContent, getContentBySlug } from '@/lib/cms';
import { useCallback, useEffect, useState } from 'react';

/**
 * Hook to fetch published CMS content for public pages.
 * Fetches collection content (multiple entries) with fallback.
 */
export function useContentList<T>(type: string, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getContent<T>(type, fallback).then((result) => {
      if (!cancelled) {
        setData(result);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [type]);

  return { data, loading };
}

/**
 * Hook to fetch a single type content (Homepage, Contact Info, etc.)
 */
export function useSingleContent<T>(type: string, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getSingleContent<T>(type, fallback).then((result) => {
      if (!cancelled) {
        setData(result);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [type]);

  return { data, loading };
}

/**
 * Hook to fetch a single entry by slug
 */
export function useContentBySlug<T>(type: string, slug: string, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getContentBySlug<T>(type, slug, fallback).then((result) => {
      if (!cancelled) {
        setData(result);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [type, slug]);

  return { data, loading };
}
