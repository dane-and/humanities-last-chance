
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  isEditing: boolean;
  onDelete: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  isEditing,
  onDelete,
}) => {
  return (
    <div className="flex gap-4 justify-end">
      {isEditing && (
        <Button type="button" variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      )}
      <Button type="submit">
        {isEditing ? 'Update' : 'Create'} Article
      </Button>
    </div>
  );
};

export default FormActions;
