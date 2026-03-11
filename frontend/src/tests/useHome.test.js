import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import useHome from "../scripts/homeScript";

vi.mock("../utils/api", () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
    post: vi.fn(),
    put: vi.fn()
  }
}));

import api from "../utils/api";

describe("useHome hook", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch employees", async () => {

    api.get.mockResolvedValue({
      data: [{ id: 1, name: "John", email: "john@gmail.com" }]
    });

    const { result } = renderHook(() => useHome());

    await waitFor(() => {
      expect(result.current.employees.length).toBe(1);
    });

  });

  it("should delete employee", async () => {

    api.get.mockResolvedValue({ data: [] });
    api.delete.mockResolvedValue({});

    const { result } = renderHook(() => useHome());

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });

    act(() => {
      result.current.setDeleteEmployee({ id: 1 });
    });

    await act(async () => {
      await result.current.confirmDelete();
    });

    expect(api.delete).toHaveBeenCalledWith("/employees/1");

  });

  it("should open add modal", async () => {

    api.get.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useHome());

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });

    act(() => {
      result.current.handleOpenAdd();
    });

    expect(result.current.addingEmployee).toBe(true);

  });

});