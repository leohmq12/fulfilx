/**
 * CMS Type Definitions
 * TypeScript interfaces for all CMS data structures
 */

// ─── Field Schema Types ──────────────────────────────────────────────────────
export type FieldType =
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'number'
  | 'boolean'
  | 'image'
  | 'select'
  | 'date'
  | 'url'
  | 'email'
  | 'json'
  | 'array'
  | 'group';

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];           // For 'select' type
  arrayFields?: FieldDefinition[]; // For 'array' type
  groupFields?: FieldDefinition[]; // For 'group' type
  defaultValue?: any;
}

export interface ContentTypeDefinition {
  slug: string;
  name: string;
  namePlural: string;
  icon: string;
  description: string;
  isSingle: boolean;   // Single type (one entry) vs Collection (many entries)
  fields: FieldDefinition[];
}

// ─── API Response Types ──────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  ok: boolean;
  error?: string;
  message?: string;
  data?: T;
}

export interface ContentEntry {
  id: number;
  content_type: string;
  slug: string | null;
  status: 'draft' | 'published' | 'archived';
  data: Record<string, any>;
  sort_order: number;
  created_by: number | null;
  updated_by: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentListResponse {
  ok: boolean;
  entries: ContentEntry[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ContentSingleResponse {
  ok: boolean;
  entry: ContentEntry;
}

export interface ContentTypeOverview {
  content_type: string;
  total: number;
  published: number;
  drafts: number;
}

export interface ContentTypesResponse {
  ok: boolean;
  types: ContentTypeOverview[];
}

// ─── Media Types ─────────────────────────────────────────────────────────────
export interface MediaItem {
  id: number;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  width: number | null;
  height: number | null;
  alt_text: string;
  folder: string;
  url: string;
  uploaded_by: number | null;
  created_at: string;
}

export interface MediaListResponse {
  ok: boolean;
  media: MediaItem[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface MediaUploadResponse {
  ok: boolean;
  media: MediaItem;
}

// ─── User Types ──────────────────────────────────────────────────────────────
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  is_active?: number;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  ok: boolean;
  token: string;
  user: User;
}

export interface UsersListResponse {
  ok: boolean;
  users: User[];
}

// ─── Activity Log Types ──────────────────────────────────────────────────────
export interface ActivityLogEntry {
  id: number;
  user_id: number;
  action: string;
  entity_type: string;
  entity_id: number | null;
  details: string | null;
  created_at: string;
}

// ─── Content Version Types ───────────────────────────────────────────────────
export interface ContentVersion {
  id: number;
  entry_id: number;
  version: number;
  data: Record<string, any>;
  changed_by: number | null;
  created_at: string;
}

// ─── Content Data Shapes (matching existing hardcoded data) ──────────────────

export interface HomepageData {
  hero_headline: string;
  hero_subheading: string;
  hero_cta_text: string;
  hero_bg_image: string;
  hero_video: string;
  stats: Array<{ value: string; label: string; sublabel?: string }>;
  history_text: string;
  mission_text: string;
  vision_text: string;
  why_choose_features: Array<{ title: string; description: string }>;
}

export interface ServiceData {
  category: string;
  title: string[];
  image: string;
  logo: string;
  features: string[];
}

export interface SectorData {
  title: string;
  description: string;
  image: string;
  link: string;
  page_content: string; // rich text
  features: string[];
}

export interface BlogPostData {
  title: string;
  description: string;
  image: string;
  content: string;  // rich text
  author: string;
  publish_date: string;
}

export interface TeamMemberData {
  name: string;
  role: string;
  photo: string;
}

export interface JobListingData {
  title: string;
  description: string;
  tags: string[];
  theme: string;
  is_active: boolean;
}

export interface TestimonialData {
  author_name: string;
  author_photo: string;
  date: string;
  text: string;
  rating: number;
  source: string;
}

export interface PricingPlanData {
  title: string;
  price: string;
  unit: string;
  features: string[];
  is_featured: boolean;
}

export interface LocationData {
  country: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  flag_image: string;
  round_flag_image: string;
  description: string;
  marker_x: number;
  marker_y: number;
}

export interface PartnerData {
  name: string;
  logo: string;
  category: string;
  url: string;
}

export interface SustainabilityData {
  hero_text: string;
  sections: Array<{
    title: string;
    content: string;
    bullets: string[];
  }>;
}

export interface ReturnPolicyData {
  sections: Array<{
    title: string;
    content: string;
  }>;
}

export interface ContactInfoData {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  social_tiktok: string;
  social_instagram: string;
  social_linkedin: string;
  social_facebook: string;
}

export interface SiteSettingsData {
  site_title: string;
  meta_description: string;
  copyright_text: string;
  nav_items: Array<{ label: string; href: string }>;
  footer_quick_links: Array<{ label: string; href: string }>;
  newsletter_heading: string;
  newsletter_subtext: string;
}
