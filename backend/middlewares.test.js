import { describe, it, expect, vi } from "vitest";
import jwt from "jsonwebtoken";
import { auth } from "./middlewares.js";

vi.mock("jsonwebtoken", () => ({
  default: {
    verify: vi.fn(),
  },
}));

describe("auth middleware", () => {
  it("should return 401 if no token is provided", () => {
    const req = { cookies: {} };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "No token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", () => {
    const req = { cookies: { token: "invalid_token" } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid token" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next and set req.userId if token is valid", () => {
    const req = { cookies: { token: "valid_token" } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    jwt.verify.mockReturnValue({ userId: "user123" });

    auth(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("valid_token", process.env.JWT_SECRET);
    expect(req.userId).toBe("user123");
    expect(next).toHaveBeenCalled();
  });
});
