
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Add a caption to display below the image'
        }
      ]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Blog', value: 'Blog' },
          { title: 'Interview', value: 'Interview' },
          { title: 'Review', value: 'Review' },
          { title: 'Resource', value: 'Resource' }
        ],
      },
      validation: Rule => Rule.required(),
      initialValue: 'Blog'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
              options: {
                isHighlighted: true
              }
            },
            {
              type: 'string',
              name: 'caption',
              title: 'Caption',
              description: 'Image caption to display',
              options: {
                isHighlighted: true
              }
            }
          ]
        }
      ]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'ID' },
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'content', type: 'text', title: 'Comment' },
            { name: 'date', type: 'datetime', title: 'Posted At' },
            { name: 'likes', type: 'number', title: 'Likes', initialValue: 0 },
            { name: 'dislikes', type: 'number', title: 'Dislikes', initialValue: 0 }
          ],
          preview: {
            select: {
              name: 'name',
              content: 'content',
              date: 'date'
            },
            prepare(selection) {
              const { name, content, date } = selection;
              return {
                title: name || 'Anonymous',
                subtitle: content ? (content.length > 50 ? content.substring(0, 50) + '...' : content) : '',
                description: date ? new Date(date).toLocaleString() : ''
              };
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'mainImage',
      commentCount: 'comments'
    },
    prepare(selection) {
      const { title, category, media, commentCount } = selection;
      const commentsCount = commentCount ? commentCount.length : 0;
      return {
        title,
        subtitle: `${category || 'No category'} • ${commentsCount} ${commentsCount === 1 ? 'comment' : 'comments'}`,
        media
      };
    }
  }
};
