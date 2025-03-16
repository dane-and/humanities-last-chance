
import React from 'react';
import { Input } from '@/components/ui/input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface PageFormFieldsProps {
  title: string;
  slug: string;
  content: string;
  isSystemPage: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditorChange: (content: string) => void;
}

const PageFormFields: React.FC<PageFormFieldsProps> = ({
  title,
  slug,
  content,
  isSystemPage,
  onInputChange,
  onEditorChange,
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input 
          name="title"
          value={title}
          onChange={onInputChange}
          placeholder="Page title"
          disabled={isSystemPage}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Slug</label>
        <Input 
          name="slug"
          value={slug}
          onChange={onInputChange}
          placeholder="url-friendly-slug"
          disabled={isSystemPage}
        />
      </div>
      
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium">Content</label>
        <div className="border border-input rounded-md overflow-hidden">
          <ReactQuill 
            theme="snow"
            value={content}
            onChange={onEditorChange}
            modules={modules}
            formats={formats}
            placeholder="Write your page content here..."
            className="min-h-[400px] bg-background"
          />
        </div>
      </div>
    </div>
  );
};

export default PageFormFields;
