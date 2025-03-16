
import { toast } from 'sonner';
import { Article } from '../../../lib/types/article';
import { getScheduledFromStorage, saveScheduledToStorage } from '../../../lib/utils/storage/articleStorage';

/**
 * Handle scheduling article publication
 */
export const handleSchedulePublication = async (
  formData: Article,
  selectedTags: string[],
  publishDate: Date,
  onNewArticle: () => void
): Promise<void> => {
  // Validate form
  if (!formData.title.trim()) {
    toast.error("Title is required");
    return;
  }
  
  if (!formData.content.trim()) {
    toast.error("Content is required");
    return;
  }
  
  try {
    const scheduled = getScheduledFromStorage();
    let updatedScheduled: Article[];
    
    const scheduledArticle: Article = {
      ...formData,
      tags: selectedTags,
      scheduledDate: publishDate.toISOString(),
      status: 'scheduled' as const, // Use const assertion to ensure literal type
      lastModified: new Date().toISOString()
    };
    
    // Check if we're updating an existing scheduled article
    const existingIndex = scheduled.findIndex(item => item.id === formData.id);
    
    if (existingIndex >= 0) {
      // Update existing scheduled article
      updatedScheduled = scheduled.map((item, index) => 
        index === existingIndex ? scheduledArticle : item
      );
    } else {
      // Create new scheduled article
      const newScheduled: Article = {
        ...scheduledArticle,
        id: formData.id || crypto.randomUUID(),
        comments: []
      };
      
      updatedScheduled = [...scheduled, newScheduled];
    }
    
    await saveScheduledToStorage(updatedScheduled);
    toast.success(`Article scheduled for publication on ${publishDate.toLocaleDateString()}`);
    onNewArticle();
    
    // Dispatch custom event for other components to know data has changed
    const event = new CustomEvent('scheduledUpdated');
    window.dispatchEvent(event);
  } catch (error) {
    console.error('Error scheduling article:', error);
    toast.error("Error scheduling article. Please try again.");
  }
};
