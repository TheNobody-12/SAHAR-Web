import { defineField, defineType } from "sanity";

export default defineType({
  name: "program",
  title: "Program",
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
          { title: "Cultural Celebrations", value: "Cultural Celebrations" },
          { title: "Youth & Newcomers", value: "Youth & Newcomers" },
          { title: "Support & Advocacy", value: "Support & Advocacy" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Details",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "ctaLabel",
      type: "string",
    }),
    defineField({
      name: "ctaUrl",
      type: "url",
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) =>
            rule.required().error("Provide descriptive alt text for the image."),
        },
      ],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "heroImage" },
  },
});
