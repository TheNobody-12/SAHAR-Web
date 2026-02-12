import { defineField, defineType } from "sanity";

export default defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Health", value: "Health" },
          { title: "Education", value: "Education" },
          { title: "Legal", value: "Legal" },
          { title: "Settlement", value: "Settlement" },
          { title: "Employment", value: "Employment" },
          { title: "Other", value: "Other" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "link",
      type: "url",
    }),
    defineField({
      name: "contact",
      type: "string",
    }),
    defineField({
      name: "location",
      type: "string",
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
