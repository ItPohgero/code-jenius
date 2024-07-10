import IsValidImageUrl from "@/hooks/valid-image";
import { expect, test } from "bun:test";

test("Valid image URLs", () => {
	expect(IsValidImageUrl("http://example.com/image.jpg")).toBe(true);
	expect(IsValidImageUrl("http://example.com/image.jpeg")).toBe(true);
	expect(IsValidImageUrl("http://example.com/image.png")).toBe(true);
	expect(IsValidImageUrl("https://example.com/path/to/image.JPG")).toBe(true);
});

test("Invalid image URLs", () => {
	expect(IsValidImageUrl("example")).toBe(false);
	expect(IsValidImageUrl("http://example")).toBe(false);
	expect(IsValidImageUrl("http://example.apk")).toBe(false);
	expect(IsValidImageUrl("http://example.png?image")).toBe(false);
	expect(IsValidImageUrl("http://example.png?image")).toBe(false);
});
