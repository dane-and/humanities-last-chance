
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
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'email', type: 'string', title: 'Email' },
            { name: 'comment', type: 'text', title: 'Comment' },
            { name: 'createdAt', type: 'datetime', title: 'Created At' }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'mainImage'
    },
    prepare(selection) {
      const { title, category, media } = selection;
      return {
        title,
        subtitle: category || 'No category',
        media
      };
    }
  }
};
