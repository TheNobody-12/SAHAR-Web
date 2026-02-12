import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryItem",
  title: "Gallery Item",
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
          { title: "Events", value: "Events" },
          { title: "Culture", value: "Culture" },
          { title: "Community", value: "Community" },
          { title: "Food", value: "Food" },
          { title: "People", value: "People" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
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
      name: "caption",
      type: "string",
    }),
    defineField({
      name: "event",
      type: "reference",
      to: [{ type: "event" }],
      weak: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
