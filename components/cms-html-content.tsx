/**
 * Renders HTML from the CMS rich-text editor (TipTap) on the site.
 * On web: uses a div with dangerouslySetInnerHTML and Tailwind-style classes.
 * On native: strips HTML and shows plain text (rich formatting not shown off-web).
 */
import React from 'react';
import { Platform, Text, View } from 'react-native';

const contentClass =
  'font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left ' +
  '[&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:mb-4 [&_ul]:pl-4 [&_ol]:mb-4 [&_ol]:pl-4 [&_li]:mb-2 ' +
  '[&_strong]:font-bold [&_em]:italic [&_a]:text-[#C10016] [&_a]:underline [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:font-bold [&_h3]:text-lg [&_h3]:mt-3 [&_h3]:mb-2';

function stripHtml(html: string): string {
  if (!html || !html.trim()) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export interface CmsHtmlContentProps {
  html: string;
  className?: string;
}

export function CmsHtmlContent({ html, className = '' }: CmsHtmlContentProps) {
  if (!html || !html.trim()) return null;

  if (Platform.OS === 'web') {
    const combinedClass = `${contentClass} ${className}`.trim();
    return React.createElement('div', {
      dangerouslySetInnerHTML: { __html: html },
      className: combinedClass,
    });
  }

  return (
    <View>
      <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-4">
        {stripHtml(html)}
      </Text>
    </View>
  );
}

export function isCmsHtml(content: string): boolean {
  if (!content || !content.trim()) return false;
  const trimmed = content.trim();
  return trimmed.startsWith('<') || /<\/?(p|ul|ol|li|strong|em|h[1-6]|div|br)\b/i.test(trimmed);
}
