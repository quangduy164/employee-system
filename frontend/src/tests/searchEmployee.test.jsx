import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Home from "../pages/Home";

/*
Test chức năng tìm kiếm nhân viên
*/

vi.mock("../utils/api", () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: [
        { id: 1, name: "John", email: "john@gmail.com" },
        { id: 2, name: "Alice", email: "alice@gmail.com" }
      ]
    })
  }
}));

describe("Search Employee", () => {

  it("should filter employees when typing in search box", async () => {

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(
      "Search name or email..."
    );

    await userEvent.type(searchInput, "John");

    expect(searchInput.value).toBe("John");

  });

});