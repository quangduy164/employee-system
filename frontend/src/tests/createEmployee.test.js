import { describe, it, expect, vi } from "vitest";
import api from "../utils/api";

describe("Create employee", () => {

  it("should call API when create", async () => {

    api.post = vi.fn().mockResolvedValue({});

    await api.post("/employees", {
      name: "John",
      email: "john@gmail.com",
      password: "123456"
    });

    expect(api.post).toHaveBeenCalled();

  });

});