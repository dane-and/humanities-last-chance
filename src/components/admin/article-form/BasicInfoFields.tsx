
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BasicInfoFieldsProps {
  title: string;
  slug: string;
  author: string;
  date: string;
  category: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  title,
  slug,
  author,
  date,
  category,
  onInputChange,
  onSelectChange,
}) => {
  // Log the incoming props to debug
  console.log('BasicInfoFields props:', { title, slug, author, date, category });
  
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input 
          name="title"
          value={title || ''}
          onChange={onInputChange}
          placeholder="Article title"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Slug</label>
        <Input 
          name="slug"
          value={slug || ''}
          onChange={onInputChange}
          placeholder="url-friendly-slug (optional)"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Author (optional)</label>
        <Input 
          name="author"
          value={author || ''}
          onChange={onInputChange}
          placeholder="Author name (optional)"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Date</label>
        <Input 
          name="date"
          value={date || ''}
          onChange={onInputChange}
          placeholder="Month DD, YYYY"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select 
          value={category || 'Blog'} 
          onValueChange={(value) => onSelectChange('category', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Blog">Blog</SelectItem>
            <SelectItem value="Interview">Interview</SelectItem>
            <SelectItem value="Review">Review</SelectItem>
            <SelectItem value="Resource">Resource</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default BasicInfoFields;
