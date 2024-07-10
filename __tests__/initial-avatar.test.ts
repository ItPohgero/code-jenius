import { expect, test } from "bun:test";
import GetInitialAvatar from "@/hooks/initial-avatar";

test("Get initials for full names", () => {
	expect(GetInitialAvatar("Wahyu", "Agus")).toBe("WA");
	expect(GetInitialAvatar("Nizvy", "Sintia")).toBe("NS");
	expect(GetInitialAvatar("Azkia", "Ghina")).toBe("AG");
	expect(GetInitialAvatar("Azalia", "Mawar")).toBe("AM");
});

test("Get initials for single names", () => {
	expect(GetInitialAvatar("Wahyu", "")).toBe("W");
	expect(GetInitialAvatar("", "Wahyu")).toBe("W");
	expect(GetInitialAvatar("A", "")).toBe("A");
	expect(GetInitialAvatar("", "E")).toBe("E");
});

test("Get initials for empty names", () => {
	expect(GetInitialAvatar("", "")).toBe("");
	expect(GetInitialAvatar("", undefined)).toBe("");
	expect(GetInitialAvatar(undefined, "")).toBe("");
	expect(GetInitialAvatar(undefined, undefined)).toBe("");
});

test("Get initials with mixed case", () => {
	expect(GetInitialAvatar("waHyu", "agus")).toBe("WA");
	expect(GetInitialAvatar("niXvy", "sintia")).toBe("NS");
	expect(GetInitialAvatar("arMando", "eInstein")).toBe("AE");
	expect(GetInitialAvatar("ADA", "lOvelace")).toBe("AL");
});
