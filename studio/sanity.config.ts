import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "SAHAHR Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ps1r2kj3",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
