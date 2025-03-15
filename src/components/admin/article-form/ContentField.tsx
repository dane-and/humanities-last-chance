
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ContentFieldProps {
  excerpt: string;
  content: string;
  onExcerptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onContentChange: (content: string) => void;
}

const ContentField: React.FC<ContentFieldProps> = ({
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
        <div className="border border-input rounded-md overflow-hidden">
          <ReactQuill 
            theme="snow"
            value={content}
            onChange={onContentChange}
            modules={modules}
            formats={formats}
            placeholder="Write your article content here..."
            className="min-h-[300px] bg-background"
          />
        </div>
      </div>
    </>
  );
};

export default ContentField;
