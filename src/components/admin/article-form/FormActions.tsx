
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Trash2, Calendar, Eye, Send } from 'lucide-react';
import ArticlePreview from '@/components/admin/ArticlePreview';
import SchedulePublishDialog from '@/components/admin/SchedulePublishDialog';
import { Article } from '@/lib/types/article';

interface FormActionsProps {
  isEditing: boolean;
  onDelete: () => void;
  onSaveAsDraft: () => void;
  onSchedule: (date: Date) => void;
  onPublish?: () => void;
  isDraft?: boolean;
  formData: Article;
}

const FormActions: React.FC<FormActionsProps> = ({
  isEditing,
  onDelete,
  onSaveAsDraft,
  onSchedule,
  onPublish,
  isDraft,
  formData,
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-end items-center">
      <ArticlePreview article={formData} />
      
      <Button 
        type="button" 
        variant="outline" 
        onClick={onSaveAsDraft}
        className="flex gap-2"
      >
        <Save className="h-4 w-4" />
        Save as Draft
      </Button>
      
      {isDraft && onPublish && (
        <Button
          type="button"
          variant="outline"
          onClick={onPublish}
          className="flex gap-2"
        >
          <Send className="h-4 w-4" />
          Publish Now
        </Button>
      )}
      
      <SchedulePublishDialog 
        onSchedule={onSchedule}
        initialDate={formData.scheduledDate ? new Date(formData.scheduledDate) : undefined}
      />
      
      {isEditing && (
        <Button 
          type="button" 
          variant="destructive" 
          onClick={onDelete}
          className="flex gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      )}
      
      <Button type="submit" className="ml-auto">
        {isEditing ? 'Update' : 'Create'} Article
      </Button>
    </div>
  );
};

export default FormActions;
