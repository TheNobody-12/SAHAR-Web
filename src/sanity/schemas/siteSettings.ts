import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroHeading",
      type: "string",
    }),
    defineField({
      name: "heroSubheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "impactStats",
      type: "array",
      of: [
        defineArrayMember({
          name: "impactStat",
          title: "Impact Stat",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "value", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "navLinks",
      type: "array",
      of: [
        defineArrayMember({
          name: "navLink",
          title: "Nav Link",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
