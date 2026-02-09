import type { ContentTypeDefinition } from '@/types/cms';

/**
 * Content Type Schema Definitions
 * These define the structure and fields for each content type in the CMS.
 * The dynamic form renderer reads these to generate admin forms automatically.
 */
export const contentTypes: ContentTypeDefinition[] = [
  // ─── Single Types ────────────────────────────────────────────────────────
  {
    slug: 'homepage',
    name: 'Homepage',
    namePlural: 'Homepage',
    icon: '🏠',
    description: 'Hero section, stats, company history/mission/vision, why choose us features',
    isSingle: true,
    fields: [
      { name: 'hero_headline', label: 'Hero Headline', type: 'text', required: true, placeholder: 'Bespoke Fulfilment, Built to Help Brands Scale' },
      { name: 'hero_subheading', label: 'Hero Subheading', type: 'textarea', placeholder: 'Subheading text...' },
      { name: 'hero_cta_text', label: 'Hero CTA Button Text', type: 'text', placeholder: 'Explore Now' },
      { name: 'hero_bg_image', label: 'Hero Background Image', type: 'image' },
      { name: 'hero_video', label: 'Hero Video URL', type: 'url', placeholder: '/banner-animation.webm' },
      {
        name: 'stats', label: 'Statistics', type: 'array',
        arrayFields: [
          { name: 'value', label: 'Value', type: 'text', required: true, placeholder: '99.97%' },
          { name: 'label', label: 'Label', type: 'text', required: true, placeholder: 'On-Time Deliveries' },
          { name: 'sublabel', label: 'Sub-label', type: 'text', placeholder: 'Optional detail' },
        ],
      },
      { name: 'history_text', label: 'History Tab Content', type: 'textarea' },
      { name: 'mission_text', label: 'Mission Tab Content', type: 'textarea' },
      { name: 'vision_text', label: 'Vision Tab Content', type: 'textarea' },
      {
        name: 'why_choose_features', label: 'Why Choose Us Features', type: 'array',
        arrayFields: [
          { name: 'title', label: 'Feature Title', type: 'text', required: true },
          { name: 'description', label: 'Feature Description', type: 'textarea', required: true },
        ],
      },
    ],
  },
  {
    slug: 'contact_info',
    name: 'Contact Info',
    namePlural: 'Contact Info',
    icon: '📞',
    description: 'Phone, email, address, and social media links used across the site',
    isSingle: true,
    fields: [
      { name: 'phone', label: 'Phone Number', type: 'text', required: true, placeholder: '+44 161 399 2348' },
      { name: 'whatsapp', label: 'WhatsApp Number', type: 'text', placeholder: '+44 745 742 8760' },
      { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'info@fulfilx.co.uk' },
      { name: 'address', label: 'Address', type: 'textarea', required: true, placeholder: 'FULFIL.X HQ, Nile Mill, Oldham...' },
      { name: 'social_tiktok', label: 'TikTok URL', type: 'url' },
      { name: 'social_instagram', label: 'Instagram URL', type: 'url' },
      { name: 'social_linkedin', label: 'LinkedIn URL', type: 'url' },
      { name: 'social_facebook', label: 'Facebook URL', type: 'url' },
    ],
  },
  {
    slug: 'site_settings',
    name: 'Site Settings',
    namePlural: 'Site Settings',
    icon: '⚙️',
    description: 'Site title, meta description, navigation items, footer links',
    isSingle: true,
    fields: [
      { name: 'site_title', label: 'Site Title', type: 'text', required: true, placeholder: 'FulfilX - Your Logistics Partner' },
      { name: 'meta_description', label: 'Meta Description', type: 'textarea', placeholder: 'Professional logistics and fulfillment services' },
      { name: 'copyright_text', label: 'Copyright Text', type: 'text', placeholder: 'Copyright © 2025. FULFIL.X. All rights reserved.' },
      {
        name: 'nav_items', label: 'Navigation Items', type: 'array',
        arrayFields: [
          { name: 'label', label: 'Label', type: 'text', required: true },
          { name: 'href', label: 'URL', type: 'text', required: true },
        ],
      },
      {
        name: 'footer_quick_links', label: 'Footer Quick Links', type: 'array',
        arrayFields: [
          { name: 'label', label: 'Label', type: 'text', required: true },
          { name: 'href', label: 'URL', type: 'text', required: true },
        ],
      },
      { name: 'newsletter_heading', label: 'Newsletter Heading', type: 'text', placeholder: 'Stay Updated' },
      { name: 'newsletter_subtext', label: 'Newsletter Subtext', type: 'textarea' },
    ],
  },
  {
    slug: 'sustainability',
    name: 'Sustainability',
    namePlural: 'Sustainability',
    icon: '🌱',
    description: 'Sustainability commitment content and initiatives',
    isSingle: true,
    fields: [
      { name: 'hero_text', label: 'Hero Text', type: 'textarea', required: true },
      {
        name: 'sections', label: 'Content Sections', type: 'array',
        arrayFields: [
          { name: 'title', label: 'Section Title', type: 'text', required: true },
          {
            name: 'content',
            label: 'Section Content',
            type: 'richtext',
            helpText: 'Optional. Use the toolbar for bold, bullets, headings, etc. Leave empty if using bullet points below.',
          },
          { name: 'bullets', label: 'Bullet Points (one per line)', type: 'textarea', helpText: 'Enter each bullet point on a new line' },
        ],
      },
    ],
  },
  {
    slug: 'return_policy',
    name: 'Return Policy',
    namePlural: 'Return Policy',
    icon: '📋',
    description: 'Return and refund policy content',
    isSingle: true,
    fields: [
      {
        name: 'sections', label: 'Policy Sections', type: 'array',
        arrayFields: [
          { name: 'title', label: 'Section Title', type: 'text', required: true },
          {
            name: 'content',
            label: 'Section Content',
            type: 'richtext',
            required: true,
            helpText: 'Full formatting: bold, italic, headings, bullet and numbered lists, links. Use the toolbar above the editor.',
          },
        ],
      },
    ],
  },

  // ─── Collection Types ────────────────────────────────────────────────────
  {
    slug: 'service',
    name: 'Service',
    namePlural: 'Services',
    icon: '📦',
    description: 'Fulfilment services, VAS, logistics, technology integrations',
    isSingle: false,
    fields: [
      {
        name: 'category', label: 'Category', type: 'select', required: true,
        options: ['Core Fulfilment', 'Warehouse & Storage', 'Value Added', 'Brand Creative', 'Logistics', 'Technology'],
      },
      {
        name: 'title', label: 'Title Lines', type: 'array', required: true,
        helpText: 'Each line of the title (e.g., "D2C" and "Fulfilment")',
        arrayFields: [
          { name: 'line', label: 'Line', type: 'text', required: true },
        ],
      },
      { name: 'image', label: 'Background Image', type: 'image' },
      { name: 'logo', label: 'Icon/Logo SVG', type: 'image' },
      {
        name: 'features', label: 'Features', type: 'array',
        arrayFields: [
          { name: 'feature', label: 'Feature', type: 'text', required: true },
        ],
      },
    ],
  },
  {
    slug: 'sector',
    name: 'Sector',
    namePlural: 'Sectors',
    icon: '🏭',
    description: 'Industry sectors served (Cosmetics, Electronics, Fashion, etc.)',
    isSingle: false,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Cosmetics' },
      { name: 'description', label: 'Short Description', type: 'textarea', required: true },
      { name: 'image', label: 'Cover Image', type: 'image', required: true },
      { name: 'link', label: 'Page Link', type: 'text', required: true, placeholder: '/sectors/cosmetics' },
      { name: 'page_content', label: 'Detailed Page Content', type: 'richtext', helpText: 'Full content for the sector detail page' },
      {
        name: 'features', label: 'Key Features', type: 'array',
        arrayFields: [
          { name: 'feature', label: 'Feature', type: 'text', required: true },
        ],
      },
    ],
  },
  {
    slug: 'blog_post',
    name: 'Blog Post',
    namePlural: 'Blog Posts',
    icon: '📝',
    description: 'Blog articles and news',
    isSingle: false,
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Short Description', type: 'textarea', required: true },
      { name: 'image', label: 'Featured Image', type: 'image', required: true },
      { name: 'content', label: 'Full Content', type: 'richtext' },
      { name: 'author', label: 'Author', type: 'text' },
      { name: 'publish_date', label: 'Publish Date', type: 'date' },
    ],
  },
  {
    slug: 'team_member',
    name: 'Team Member',
    namePlural: 'Team Members',
    icon: '👤',
    description: 'Team members displayed on the Team page',
    isSingle: false,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'John Doe' },
      { name: 'role', label: 'Role/Title', type: 'text', required: true, placeholder: 'Operations Manager' },
      { name: 'photo', label: 'Photo', type: 'image', required: true },
    ],
  },
  {
    slug: 'job_listing',
    name: 'Job Listing',
    namePlural: 'Job Listings',
    icon: '💼',
    description: 'Open positions shown on the Team/Careers page',
    isSingle: false,
    fields: [
      { name: 'title', label: 'Job Title', type: 'text', required: true },
      { name: 'description', label: 'Job Description', type: 'textarea', required: true },
      {
        name: 'tags', label: 'Tags', type: 'array',
        helpText: 'E.g., "Full Time", "UK"',
        arrayFields: [
          { name: 'tag', label: 'Tag', type: 'text', required: true },
        ],
      },
      {
        name: 'theme', label: 'Card Theme', type: 'select',
        options: ['dark', 'light'],
        defaultValue: 'dark',
      },
      { name: 'is_active', label: 'Active', type: 'boolean', defaultValue: true },
    ],
  },
  {
    slug: 'testimonial',
    name: 'Testimonial',
    namePlural: 'Testimonials',
    icon: '⭐',
    description: 'Customer reviews and testimonials',
    isSingle: false,
    fields: [
      { name: 'author_name', label: 'Author Name', type: 'text', required: true },
      { name: 'author_photo', label: 'Author Photo', type: 'image' },
      { name: 'date', label: 'Review Date', type: 'text', placeholder: 'November 11, 2025' },
      { name: 'text', label: 'Review Text', type: 'textarea', required: true },
      { name: 'rating', label: 'Rating (1-5)', type: 'number', defaultValue: 5 },
      { name: 'source', label: 'Source', type: 'text', placeholder: 'Google Reviews' },
    ],
  },
  {
    slug: 'pricing_plan',
    name: 'Pricing Plan',
    namePlural: 'Pricing Plans',
    icon: '💰',
    description: 'Pricing tiers shown on the Pricing page',
    isSingle: false,
    fields: [
      { name: 'title', label: 'Plan Title', type: 'text', required: true, placeholder: 'Pick & Pack' },
      { name: 'price', label: 'Price', type: 'text', required: true, placeholder: '£1.27' },
      { name: 'unit', label: 'Unit', type: 'text', required: true, placeholder: '/package' },
      { name: 'price_prefix', label: 'Price Prefix', type: 'text', placeholder: 'from' },
      {
        name: 'features', label: 'Included Features', type: 'array',
        arrayFields: [
          { name: 'feature', label: 'Feature', type: 'text', required: true },
        ],
      },
      { name: 'is_featured', label: 'Featured Plan', type: 'boolean', defaultValue: false },
    ],
  },
  {
    slug: 'location',
    name: 'Location',
    namePlural: 'Locations',
    icon: '📍',
    description: 'Global office and warehouse locations',
    isSingle: false,
    fields: [
      { name: 'country', label: 'Country', type: 'text', required: true },
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'address', label: 'Full Address', type: 'textarea' },
      { name: 'email', label: 'Contact Email', type: 'email' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'flag_image', label: 'Flag Image', type: 'image' },
      { name: 'round_flag_image', label: 'Round Flag Image', type: 'image' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'marker_x', label: 'Map Marker X (%)', type: 'number', helpText: 'Horizontal position on world map (0-100)' },
      { name: 'marker_y', label: 'Map Marker Y (%)', type: 'number', helpText: 'Vertical position on world map (0-100)' },
    ],
  },
  {
    slug: 'partner',
    name: 'Partner',
    namePlural: 'Partners',
    icon: '🤝',
    description: 'Integration partners, courier partners, and retail partners',
    isSingle: false,
    fields: [
      { name: 'name', label: 'Partner Name', type: 'text', required: true },
      { name: 'logo', label: 'Logo Image', type: 'image', required: true },
      {
        name: 'category', label: 'Category', type: 'select', required: true,
        options: ['Integration', 'Courier', 'Retail', 'Client'],
      },
      { name: 'url', label: 'Website URL', type: 'url' },
    ],
  },
];

/**
 * Get content type definition by slug
 */
export function getContentType(slug: string): ContentTypeDefinition | undefined {
  return contentTypes.find(ct => ct.slug === slug);
}

/**
 * Get all single types
 */
export function getSingleTypes(): ContentTypeDefinition[] {
  return contentTypes.filter(ct => ct.isSingle);
}

/**
 * Get all collection types
 */
export function getCollectionTypes(): ContentTypeDefinition[] {
  return contentTypes.filter(ct => !ct.isSingle);
}
