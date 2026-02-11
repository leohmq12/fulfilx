import MediaPickerModal from '@/components/admin/media-picker-modal';
import { getMediaFullUrl } from '@/lib/cms-admin';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-blue-400 underline' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'max-w-full rounded' },
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-sm max-w-none min-h-[200px] p-4 focus:outline-none text-white',
      },
    },
  });

  // Sync external value changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value]);

  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  if (!editor) return null;

  return (
    <div style={{ backgroundColor: '#111', border: '1px solid #374151', borderRadius: 8, overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        padding: '8px 12px',
        borderBottom: '1px solid #374151',
        backgroundColor: '#0a0a0a',
      }}>
        <ToolbarButton
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="B"
          style={{ fontWeight: 'bold' }}
        />
        <ToolbarButton
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="I"
          style={{ fontStyle: 'italic' }}
        />
        <ToolbarButton
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          label="S"
          style={{ textDecoration: 'line-through' }}
        />
        <ToolbarDivider />
        <ToolbarButton
          active={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          label="H1"
        />
        <ToolbarButton
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="H2"
        />
        <ToolbarButton
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          label="H3"
        />
        <ToolbarDivider />
        <ToolbarButton
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="• List"
        />
        <ToolbarButton
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          label="1. List"
        />
        <ToolbarButton
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          label="❝"
        />
        <ToolbarDivider />
        <ToolbarButton
          active={editor.isActive('link')}
          onClick={() => {
            if (editor.isActive('link')) {
              editor.chain().focus().unsetLink().run();
            } else {
              const url = window.prompt('Enter URL:');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }
          }}
          label="🔗"
        />
        <ToolbarButton
          active={false}
          onClick={() => {
            const url = window.prompt('Enter image URL:');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          label="🖼 URL"
        />
        <ToolbarButton
          active={false}
          onClick={() => setImagePickerOpen(true)}
          label="🖼 Lib"
        />
        <MediaPickerModal
          visible={imagePickerOpen}
          onClose={() => setImagePickerOpen(false)}
          onSelect={(path) => {
            const src = getMediaFullUrl(path);
            editor.chain().focus().setImage({ src }).run();
            setImagePickerOpen(false);
          }}
          imagesOnly
        />
        <ToolbarDivider />
        <ToolbarButton
          active={false}
          onClick={() => editor.chain().focus().undo().run()}
          label="↶"
          disabled={!editor.can().undo()}
        />
        <ToolbarButton
          active={false}
          onClick={() => editor.chain().focus().redo().run()}
          label="↷"
          disabled={!editor.can().redo()}
        />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Styles */}
      <style>{`
        .ProseMirror {
          min-height: 200px;
          padding: 16px;
          color: #e5e7eb;
          font-family: 'HelveticaNowDisplay-Regular', sans-serif;
          font-size: 14px;
          line-height: 1.6;
        }
        .ProseMirror:focus {
          outline: none;
        }
        .ProseMirror p {
          margin: 0 0 8px 0;
        }
        .ProseMirror h1 { font-size: 24px; font-weight: bold; margin: 16px 0 8px; color: #fff; }
        .ProseMirror h2 { font-size: 20px; font-weight: bold; margin: 14px 0 6px; color: #fff; }
        .ProseMirror h3 { font-size: 16px; font-weight: bold; margin: 12px 0 4px; color: #fff; }
        .ProseMirror ul, .ProseMirror ol { padding-left: 20px; margin: 8px 0; }
        .ProseMirror li { margin: 2px 0; }
        .ProseMirror blockquote {
          border-left: 3px solid #C10016;
          padding-left: 12px;
          margin: 8px 0;
          color: #9ca3af;
        }
        .ProseMirror a { color: #60a5fa; text-decoration: underline; }
        .ProseMirror img { max-width: 100%; border-radius: 4px; margin: 8px 0; }
        .ProseMirror code { background: #1f2937; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
        .ProseMirror pre { background: #1f2937; padding: 12px; border-radius: 6px; overflow-x: auto; }
        .ProseMirror hr { border-color: #374151; margin: 16px 0; }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: '${placeholder || "Start writing..."}';
          color: #555;
          float: left;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}

// ─── Toolbar Components ──────────────────────────────────────────────────────

function ToolbarButton({
  active,
  onClick,
  label,
  style,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: active ? '#C10016' : 'transparent',
        color: disabled ? '#555' : active ? '#fff' : '#9ca3af',
        border: 'none',
        borderRadius: 4,
        padding: '4px 8px',
        cursor: disabled ? 'default' : 'pointer',
        fontSize: 12,
        fontFamily: 'HelveticaNowDisplay-Medium, sans-serif',
        minWidth: 28,
        textAlign: 'center',
        ...style,
      }}
    >
      {label}
    </button>
  );
}

function ToolbarDivider() {
  return (
    <div style={{ width: 1, height: 20, backgroundColor: '#374151', margin: '0 4px', alignSelf: 'center' }} />
  );
}
