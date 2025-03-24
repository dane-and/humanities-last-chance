export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Blog", value: "blog" },
          { title: "Interviews", value: "interviews" },
          { title: "Reviews", value: "reviews" },
        ],
      },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              options: {
                list: [
                  { title: "Literature", value: "Literature" },
                  { title: "History", value: "History" },
                  { title: "Philosophy", value: "Philosophy" },
                  { title: "Teaching", value: "Teaching" },
                  { title: "AI", value: "AI" },
                  { title: "Religion", value: "Religion" },
                  { title: "Visual Arts", value: "Visual Arts" },
                  { title: "Architecture", value: "Architecture" },
                  { title: "Music", value: "Music" },
                  { title: "Social Science", value: "Social Science" },
                  { title: "Science", value: "Science" },
                ]
              }
            }
          ]
        }
      ]
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "caption",
          title: "Caption",
          type: "string",
        },
      ],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "comment",
              title: "Comment",
              type: "text",
            },
            {
              name: "date",
              title: "Date",
              type: "datetime",
            },
          ],
        },
      ],
    },
  ],
};
