import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
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
      name: "date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Cultural", value: "Cultural" },
          { title: "Fundraising", value: "Fundraising" },
          { title: "Community", value: "Community" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "location",
      type: "string",
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
      name: "image",
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
      name: "registerUrl",
      type: "url",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "By Date",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
