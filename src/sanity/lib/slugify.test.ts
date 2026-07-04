import { describe, it, expect } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
  it("removes extensions and lowercases", () => {
    expect(slugify("Happy-New-Year.jpg")).toBe("happy-new-year");
  });

  it("replaces spaces and special characters with dashes", () => {
    expect(slugify("Dance Performance 2026!")).toBe("dance-performance-2026");
  });

  it("collapses multiple dashes", () => {
    expect(slugify("festival---highlights.png")).toBe("festival-highlights");
  });

  it("trims leading and trailing dashes", () => {
    expect(slugify("-AGM 2026-")).toBe("agm-2026");
  });

  it("handles diacritics", () => {
    expect(slugify("Saṃskṛta Program.jpeg")).toBe("samskrta-program");
  });
});
