
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

const PREDEFINED_TAGS = ['History', 'Literature', 'Philosophy', 'Teaching', 'News'];

interface TagsFieldProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagsField: React.FC<TagsFieldProps> = ({
  selectedTags,
  onTagsChange,
}) => {
  const [customTag, setCustomTag] = useState('');

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      onTagsChange(newTags);
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = selectedTags.filter(t => t !== tag);
    onTagsChange(newTags);
  };

  const handleAddCustomTag = () => {
    if (customTag && customTag.trim() !== '' && !selectedTags.includes(customTag.trim())) {
      const newTag = customTag.trim();
      const newTags = [...selectedTags, newTag];
      onTagsChange(newTags);
      setCustomTag('');
    }
  };

  return (
    <div className="space-y-2 md:col-span-2">
      <label className="text-sm font-medium">Tags</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.map(tag => (
          <div key={tag} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center">
            {tag}
            <button 
              type="button" 
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Select onValueChange={(value) => handleTagSelect(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent>
            {PREDEFINED_TAGS.filter(tag => !selectedTags.includes(tag)).map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex gap-2">
          <Input
            placeholder="Add custom tag"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustomTag();
              }
            }}
          />
          <Button type="button" onClick={handleAddCustomTag}>Add</Button>
        </div>
      </div>
    </div>
  );
};

export default TagsField;
