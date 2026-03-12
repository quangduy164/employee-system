import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Home from "../pages/Home";

// mock API để tránh gọi backend thật
vi.mock("../utils/api", () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] })
  }
}));

/*
 Test UI của trang Home
*/

describe("Delete Employee UI", () => {

  // test render trang
  it("should render employee list page", () => {

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Employee List")
    ).toBeInTheDocument();

  });

  // test mở modal Add Employee
  it("should open add employee modal when clicking Add button", async () => {

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", {
      name: /add employee/i
    });

    await userEvent.click(button);

    // kiểm tra modal xuất hiện
    expect(
      screen.getByRole("heading", { name: /add employee/i })
    ).toBeInTheDocument();

  });

});