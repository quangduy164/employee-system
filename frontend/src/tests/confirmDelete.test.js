import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useHome from "../scripts/homeScript";

/*
 Test logic xác nhận xoá nhân viên
*/

vi.mock("../utils/api", () => ({
  default: {
    // mock GET vì useEffect sẽ gọi khi hook chạy
    get: vi.fn().mockResolvedValue({
      data: []
    }),

    // mock DELETE để test chức năng xoá
    delete: vi.fn().mockResolvedValue({})
  }
}));

import api from "../utils/api";

describe("Confirm Delete", () => {

  it("should delete employee after confirm", async () => {

    const { result } = renderHook(() => useHome());

    // set employee cần xoá
    act(() => {
      result.current.setDeleteEmployee({ id: 5 });
    });

    // gọi confirm delete
    await act(async () => {
      await result.current.confirmDelete();
    });

    // kiểm tra API delete được gọi đúng
    expect(api.delete).toHaveBeenCalledWith("/employees/5");

  });

});