
import React, { useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import sanitizeHtml from 'sanitize-html';

const ContentField = ({
  excerpt,
  content,
  onExcerptChange,
  onContentChange,
}) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link', 'image'
  ];

  // Memoize the content change handler to prevent unnecessary re-renders
  const handleContentChange = useCallback((value) => {
    // Sanitize the HTML content
    const sanitized = sanitizeHtml(value, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'p', 'br', 'ul', 'ol', 'li', 'strong', 'em', 'blockquote', 'pre', 'code']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        'img': ['src', 'alt', 'title', 'width', 'height', 'class'],
        'a': ['href', 'name', 'target', 'rel', 'class'],
        'p': ['style', 'class'],
        'div': ['style', 'class'],
      },
      disallowedTagsMode: 'discard',
      allowedStyles: {
        '*': {
          'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
          'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
          'font-size': [/^\d+(?:px|em|%)$/]
        }
      }
    });
    
    onContentChange(sanitized);
  }, [onContentChange]);

  return (
    <>
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium">Excerpt</label>
        <Textarea 
          name="excerpt"
          value={excerpt}
          onChange={onExcerptChange}
          placeholder="Brief summary of the article"
          rows={2}
        />
      </div>
      
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium">Content</label>
        <div className="border border-input rounded-md overflow-hidden" style={{ minHeight: '300px' }}>
          <ReactQuill 
            theme="snow"
            value={content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            placeholder="Write your article content here..."
            className="bg-background h-full"
            preserveWhitespace={true}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(ContentField);
