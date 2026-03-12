import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useHome from "../scripts/homeScript";

/*
 Test logic edit employee
*/

describe("Edit Employee Logic", () => {

  // test set employee để sửa
  it("should set editing employee", () => {

    const { result } = renderHook(() => useHome());

    const employee = {
      id: 1,
      name: "John",
      email: "john@gmail.com"
    };

    act(() => {
      result.current.setEditingEmployee(employee);
    });

    expect(result.current.editingEmployee.id).toBe(1);

  });

});