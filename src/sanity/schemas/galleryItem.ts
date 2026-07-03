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
      name: "cultureGroup",
      title: "Culture Group",
      description: "E.g., Indian, Pakistani, Bangladeshi, etc. Useful for grouping performances.",
      type: "string",
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video (YouTube/Vimeo URL)", value: "video_url" },
          { title: "Video (Direct File Upload)", value: "video_file" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube or Vimeo URL",
      hidden: ({ document }) => document?.mediaType !== "video_url",
    }),
    defineField({
      name: "videoFile",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/*"
      },
      hidden: ({ document }) => document?.mediaType !== "video_file",
    }),
    defineField({
      name: "image",
      title: "Image / Thumbnail",
      description: "Upload an image. If this is a video, upload a thumbnail for the gallery grid.",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required().error("An image or thumbnail is required."),
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
