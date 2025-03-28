
import React from 'react';
import { Article } from '@/lib/types/article';
import { useArticleForm } from '@/hooks/article-form';

// Import components
import {
  BasicInfoFields,
  ImageUploadField,
  TagsField,
  ContentField,
  FeaturedToggle,
  FormActions
} from './article-form';
import ImageEditorIntegration from './article-form/ImageEditorIntegration';
import MediaManager from './MediaManager';

interface ArticleFormProps {
  articleList: Article[];
  selectedArticle: Article | null;
  onArticleListUpdate: (updatedList: Article[]) => void;
  onNewArticle: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ 
  articleList, 
  selectedArticle, 
  onArticleListUpdate, 
  onNewArticle 
}) => {
  const {
    formData,
    selectedTags,
    isImageEditorOpen,
    setIsImageEditorOpen,
    handleInputChange,
    handleEditorChange,
    handleSelectChange,
    handleCheckboxChange,
    handleTagsChange,
    handleImageChange,
    handleSaveEditedImage,
    handleSubmit,
    handleDelete,
    handleSaveAsDraft,
    handleSchedulePublication,
    handlePublishDraft
  } = useArticleForm(articleList, selectedArticle, onArticleListUpdate, onNewArticle);

  // Determine if the current article is a draft
  const isDraft = selectedArticle?.isDraft || selectedArticle?.status === 'draft';

  return (
    <div className="md:col-span-3 bg-background p-6 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {selectedArticle ? `Edit Article: ${selectedArticle.title}` : 'New Article'}
        </h2>
        <MediaManager />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BasicInfoFields
            title={formData.title}
            slug={formData.slug}
            author={formData.author}
            date={formData.date}
            category={formData.category}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
          
          <ImageUploadField
            image={formData.image}
            onImageChange={handleImageChange}
            onEditRequest={() => setIsImageEditorOpen(true)}
          />
          
          <TagsField
            selectedTags={selectedTags}
            onTagsChange={handleTagsChange}
          />
          
          <ContentField
            excerpt={formData.excerpt}
            content={formData.content}
            onExcerptChange={handleInputChange}
            onContentChange={handleEditorChange}
          />
          
          <FeaturedToggle
            featured={formData.featured}
            onFeaturedChange={handleCheckboxChange}
          />
        </div>
        
        <FormActions
          isEditing={!!selectedArticle}
          onDelete={handleDelete}
          onSaveAsDraft={handleSaveAsDraft}
          onSchedule={handleSchedulePublication}
          onPublish={handlePublishDraft}
          isDraft={isDraft}
          formData={formData}
        />
      </form>
      
      <ImageEditorIntegration
        image={formData.image}
        isOpen={isImageEditorOpen}
        onClose={() => setIsImageEditorOpen(false)}
        onSave={handleSaveEditedImage}
      />
    </div>
  );
};

export default ArticleForm;
