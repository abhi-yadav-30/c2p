import { describe, it, expect } from "vitest";
import { validateEmail, validatePassword, sanitizeText } from "./validation";

describe("validation utils", () => {
  describe("validateEmail", () => {
    it("should return true for valid emails from popular domains", () => {
      expect(validateEmail("test@gmail.com")).toBe(true);
      expect(validateEmail("user@yahoo.com")).toBe(true);
      expect(validateEmail("student@rvce.edu.in")).toBe(true);
    });

    it("should return false for invalid emails", () => {
      expect(validateEmail("invalid-email")).toBe(false);
      expect(validateEmail("user@.com")).toBe(false);
      expect(validateEmail("@gmail.com")).toBe(false);
    });

    it("should return false for valid emails from unpopular domains", () => {
      expect(validateEmail("test@example.com")).toBe(false);
      expect(validateEmail("admin@mycompany.org")).toBe(false);
    });
  });

  describe("validatePassword", () => {
    it("should return true for strong passwords", () => {
      expect(validatePassword("Strong@123")).toBe(true);
      expect(validatePassword("Pass!word8")).toBe(true);
    });

    it("should return false for weak passwords", () => {
      expect(validatePassword("weakpass")).toBe(false); // No number, no special char, no uppercase
      expect(validatePassword("Weakpass1")).toBe(false); // No special char
      expect(validatePassword("Str@1")).toBe(false); // Too short
    });
  });

  describe("sanitizeText", () => {
    it("should remove leading and trailing spaces", () => {
      expect(sanitizeText("  hello world  ")).toBe("hello world");
    });

    it("should replace multiple spaces with a single space", () => {
      expect(sanitizeText("hello    world")).toBe("hello world");
    });
  });
});
